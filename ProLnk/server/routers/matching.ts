/**
 * Matching tRPC router — the assignment half of the real job loop.
 *
 *   findMatches(opportunityId)        admin: ranked eligible partners
 *   createOffer(opportunityId)        admin: offer the job to the top-ranked partner
 *   respondToOffer(offerId, accept)   partner: accept (→ assigned) or decline (→ cascade)
 *   getPartnerOffers()                partner: my open/recent offers
 *
 * Plus exported helpers used by cron/admin:
 *   sweepExpiredOffers()              expire stale offers and cascade to the next partner
 *   ensureJobOffersInfra()            idempotent runtime schema guard (table + columns)
 */

import { z } from "zod";
import { and, desc, eq, inArray, lt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { jobOffers, opportunities, partners } from "../../drizzle/schema";
import { rankPartnersForOpportunity, type RankedPartner } from "../matching-engine";
import { sendJobOfferNotification, sendProMatchedNotification } from "../email";
import { sendOfferAlertSMS, sendProMatchedSMS } from "../sms";

const OFFER_TTL_MS = 24 * 60 * 60 * 1000;

let infraEnsured = false;

/** Idempotently ensure the jobOffers table and the new opportunity columns exist.
 *  Production DBs skip embedded migrations once `users` exists, so we self-heal here.
 *  Best-effort: every statement is independently try/caught. */
export async function ensureJobOffersInfra(): Promise<void> {
  if (infraEnsured) return;
  const db = await getDb();
  if (!db) return;
  const stmts = [
    `CREATE TABLE IF NOT EXISTS \`jobOffers\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`opportunityId\` int NOT NULL,
      \`partnerId\` int NOT NULL,
      \`status\` varchar(30) NOT NULL DEFAULT 'offered',
      \`rank\` int,
      \`score\` decimal(8,2),
      \`reasons\` json,
      \`offeredAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`expiresAt\` timestamp NULL,
      \`respondedAt\` timestamp NULL,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT \`jobOffers_id\` PRIMARY KEY(\`id\`)
    )`,
    `ALTER TABLE \`opportunities\` ADD \`intakeSource\` varchar(50) DEFAULT 'ai_photo'`,
    `ALTER TABLE \`opportunities\` ADD \`jobZip\` varchar(20)`,
    `ALTER TABLE \`opportunities\` ADD \`jobAddress\` varchar(500)`,
    `ALTER TABLE \`opportunities\` ADD \`homeownerName\` varchar(255)`,
    `ALTER TABLE \`opportunities\` ADD \`homeownerEmail\` varchar(320)`,
    `ALTER TABLE \`opportunities\` ADD \`homeownerPhone\` varchar(30)`,
    `ALTER TABLE \`opportunities\` ADD \`submittedByUserId\` int`,
    `ALTER TABLE \`opportunities\` ADD \`assignedPartnerId\` int`,
    `ALTER TABLE \`opportunities\` ADD \`assignedAt\` timestamp NULL`,
    `ALTER TABLE \`opportunities\` MODIFY \`jobId\` int NULL`,
    `ALTER TABLE \`opportunities\` MODIFY \`sourcePartnerId\` int NULL`,
  ];
  for (const s of stmts) {
    try {
      await (db as any).execute(s);
    } catch {
      // Column/table already exists — expected and ignored.
    }
  }
  infraEnsured = true;
}

async function notifyPartner(
  partnerId: number,
  title: string,
  message: string,
  metadata: Record<string, unknown>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await (db as any).execute(
      `INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl, metadata)
       VALUES (?, 'new_lead', ?, ?, '/partner/offers', ?)`,
      [partnerId, title, message, JSON.stringify(metadata)]
    );
  } catch {
    // partnerNotifications uses a non-auto-increment id in some envs; fall back silently.
  }

  // Fire real email + SMS to the pro. Each channel is independently guarded so a
  // delivery failure (or missing API keys) never breaks offer creation/cascade.
  const opportunityId = typeof metadata.opportunityId === "number" ? metadata.opportunityId : null;
  if (opportunityId == null) return;
  try {
    const [partner] = await db
      .select({
        businessName: partners.businessName,
        contactName: partners.contactName,
        contactEmail: partners.contactEmail,
        contactPhone: partners.contactPhone,
      })
      .from(partners)
      .where(eq(partners.id, partnerId))
      .limit(1);
    const [opp] = await db
      .select({
        trade: opportunities.opportunityCategory,
        type: opportunities.opportunityType,
        description: opportunities.description,
        jobZip: opportunities.jobZip,
        jobAddress: opportunities.jobAddress,
        estimatedValue: opportunities.estimatedJobValue,
        expiresAt: opportunities.leadExpiresAt,
      })
      .from(opportunities)
      .where(eq(opportunities.id, opportunityId))
      .limit(1);
    if (!partner || !opp) return;

    const trade = opp.trade || opp.type || "Home Service";
    const location = opp.jobZip || opp.jobAddress || "";
    const estValue = opp.estimatedValue != null ? Number(opp.estimatedValue) : null;

    if (partner.contactEmail) {
      try {
        await sendJobOfferNotification({
          to: partner.contactEmail,
          partnerName: partner.contactName || partner.businessName || "Partner",
          trade,
          location,
          scope: opp.description || "",
          estimatedValue: estValue,
          expiresAt: opp.expiresAt ?? null,
        });
      } catch (err) {
        console.error("[Matching] sendJobOfferNotification failed:", err);
      }
    }
    if (partner.contactPhone) {
      try {
        await sendOfferAlertSMS(partner.contactPhone, {
          trade,
          zip: opp.jobZip || location || "your area",
          estimatedValue: estValue,
        });
      } catch (err) {
        console.error("[Matching] sendOfferAlertSMS failed:", err);
      }
    }
  } catch (err) {
    console.error("[Matching] offer notification lookup failed:", err);
  }
}

/** Resolve the partner row for the authenticated user. */
async function partnerIdForUser(userId: number): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select({ id: partners.id })
    .from(partners)
    .where(eq(partners.userId, userId))
    .limit(1);
  return rows[0]?.id ?? null;
}

/** Create an offer to the highest-ranked partner not already offered/declined.
 *  Returns the created offer id, or null if no eligible partner remains. */
export async function createOfferForOpportunity(opportunityId: number): Promise<number | null> {
  await ensureJobOffersInfra();
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const ranked: RankedPartner[] = await rankPartnersForOpportunity(opportunityId);
  if (ranked.length === 0) return null;

  // Exclude partners already offered this opportunity (any status) to avoid loops.
  const prior = await db
    .select({ partnerId: jobOffers.partnerId })
    .from(jobOffers)
    .where(eq(jobOffers.opportunityId, opportunityId));
  const seen = new Set(prior.map((p) => p.partnerId));

  const next = ranked.find((r) => !seen.has(r.partnerId));
  if (!next) return null;

  const rank = ranked.indexOf(next);
  const expiresAt = new Date(Date.now() + OFFER_TTL_MS);
  const [res] = await db.insert(jobOffers).values({
    opportunityId,
    partnerId: next.partnerId,
    status: "offered",
    rank,
    score: String(next.score),
    reasons: next.reasons,
    offeredAt: new Date(),
    expiresAt,
  });
  const offerId = (res as any).insertId as number;

  await db
    .update(opportunities)
    .set({ status: "sent", sentAt: new Date(), receivingPartnerId: next.partnerId, leadExpiresAt: expiresAt })
    .where(eq(opportunities.id, opportunityId));

  await notifyPartner(
    next.partnerId,
    "New Job Offer",
    "You have a new job offer. You have 24 hours to accept before it routes to the next partner.",
    { opportunityId, offerId, score: next.score }
  );

  return offerId;
}

/** Advance the cascade after a decline/expiry: mark current offer terminal then
 *  create the next offer. Returns the next offer id (or null if exhausted). */
async function cascade(opportunityId: number): Promise<number | null> {
  const nextOfferId = await createOfferForOpportunity(opportunityId);
  if (nextOfferId === null) {
    const db = await getDb();
    if (db) {
      await db
        .update(opportunities)
        .set({ status: "expired" })
        .where(eq(opportunities.id, opportunityId));
    }
  }
  return nextOfferId;
}

/** Cron/admin entry point: expire stale 'offered' offers and cascade each. */
export async function sweepExpiredOffers(): Promise<{ expired: number; cascaded: number }> {
  await ensureJobOffersInfra();
  const db = await getDb();
  if (!db) return { expired: 0, cascaded: 0 };
  const now = new Date();
  const stale = await db
    .select()
    .from(jobOffers)
    .where(and(eq(jobOffers.status, "offered"), lt(jobOffers.expiresAt, now)));
  let cascaded = 0;
  for (const offer of stale) {
    await db
      .update(jobOffers)
      .set({ status: "expired", respondedAt: now })
      .where(eq(jobOffers.id, offer.id));
    const next = await cascade(offer.opportunityId);
    if (next !== null) cascaded++;
  }
  if (stale.length > 0) {
    console.log(`[Matching] Swept ${stale.length} expired offers, cascaded ${cascaded}`);
  }
  return { expired: stale.length, cascaded };
}

export const matchingRouter = router({
  findMatches: adminProcedure
    .input(z.object({ opportunityId: z.number() }))
    .query(async ({ input }) => {
      await ensureJobOffersInfra();
      return rankPartnersForOpportunity(input.opportunityId);
    }),

  createOffer: adminProcedure
    .input(z.object({ opportunityId: z.number() }))
    .mutation(async ({ input }) => {
      const offerId = await createOfferForOpportunity(input.opportunityId);
      if (offerId === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No eligible partner available for this opportunity",
        });
      }
      return { offerId };
    }),

  respondToOffer: protectedProcedure
    .input(z.object({ offerId: z.number(), accept: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ensureJobOffersInfra();
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [offer] = await db
        .select()
        .from(jobOffers)
        .where(eq(jobOffers.id, input.offerId))
        .limit(1);
      if (!offer) throw new TRPCError({ code: "NOT_FOUND", message: "Offer not found" });

      const myPartnerId = await partnerIdForUser(ctx.user.id);
      if (ctx.user.role !== "admin" && myPartnerId !== offer.partnerId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not your offer" });
      }
      if (offer.status !== "offered") {
        throw new TRPCError({ code: "BAD_REQUEST", message: `Offer already ${offer.status}` });
      }

      const now = new Date();
      if (input.accept) {
        await db
          .update(jobOffers)
          .set({ status: "accepted", respondedAt: now })
          .where(eq(jobOffers.id, offer.id));
        await db
          .update(opportunities)
          .set({
            status: "assigned",
            assignedPartnerId: offer.partnerId,
            receivingPartnerId: offer.partnerId,
            assignedAt: now,
            acceptedAt: now,
          })
          .where(eq(opportunities.id, offer.opportunityId));

        // Notify the homeowner that a pro was matched. Fully defensive — no-op if
        // we have no homeowner contact, and never breaks the acceptance.
        try {
          const [opp] = await db
            .select({
              homeownerName: opportunities.homeownerName,
              homeownerEmail: opportunities.homeownerEmail,
              homeownerPhone: opportunities.homeownerPhone,
              trade: opportunities.opportunityCategory,
              type: opportunities.opportunityType,
            })
            .from(opportunities)
            .where(eq(opportunities.id, offer.opportunityId))
            .limit(1);
          const [pro] = await db
            .select({ businessName: partners.businessName })
            .from(partners)
            .where(eq(partners.id, offer.partnerId))
            .limit(1);
          if (opp && pro) {
            const trade = opp.trade || opp.type || "Home Service";
            if (opp.homeownerEmail) {
              try {
                await sendProMatchedNotification(opp.homeownerEmail, {
                  homeownerName: opp.homeownerName ?? undefined,
                  businessName: pro.businessName || "A verified pro",
                  trade,
                });
              } catch (err) {
                console.error("[Matching] sendProMatchedNotification failed:", err);
              }
            }
            if (opp.homeownerPhone) {
              try {
                await sendProMatchedSMS(opp.homeownerPhone, {
                  businessName: pro.businessName || "A verified pro",
                  trade,
                });
              } catch (err) {
                console.error("[Matching] sendProMatchedSMS failed:", err);
              }
            }
          }
        } catch (err) {
          console.error("[Matching] homeowner match notification lookup failed:", err);
        }

        return { status: "accepted" as const, opportunityId: offer.opportunityId };
      }

      // Decline → mark and cascade to next-ranked partner.
      await db
        .update(jobOffers)
        .set({ status: "declined", respondedAt: now })
        .where(eq(jobOffers.id, offer.id));
      const nextOfferId = await cascade(offer.opportunityId);
      return { status: "declined" as const, nextOfferId };
    }),

  getPartnerOffers: protectedProcedure
    .input(z.object({ statuses: z.array(z.string()).optional() }).optional())
    .query(async ({ ctx, input }) => {
      await ensureJobOffersInfra();
      const db = await getDb();
      if (!db) return [];
      const myPartnerId = await partnerIdForUser(ctx.user.id);
      if (!myPartnerId) return [];

      const offers = await db
        .select()
        .from(jobOffers)
        .where(eq(jobOffers.partnerId, myPartnerId))
        .orderBy(desc(jobOffers.offeredAt))
        .limit(100);

      const filtered = input?.statuses?.length
        ? offers.filter((o) => input.statuses!.includes(o.status))
        : offers;
      if (filtered.length === 0) return [];

      const oppIds = Array.from(new Set(filtered.map((o) => o.opportunityId)));
      const opps = await db
        .select()
        .from(opportunities)
        .where(inArray(opportunities.id, oppIds));
      const oppById = new Map(opps.map((o) => [o.id, o]));

      return filtered.map((o) => {
        const opp = oppById.get(o.opportunityId);
        return {
          offerId: o.id,
          opportunityId: o.opportunityId,
          status: o.status,
          rank: o.rank,
          score: o.score != null ? Number(o.score) : null,
          reasons: o.reasons ?? [],
          offeredAt: o.offeredAt,
          expiresAt: o.expiresAt,
          respondedAt: o.respondedAt,
          opportunity: opp
            ? {
                category: opp.opportunityCategory,
                type: opp.opportunityType,
                description: opp.description,
                zip: opp.jobZip,
                address: opp.jobAddress,
                estimatedValue: opp.estimatedJobValue != null ? Number(opp.estimatedJobValue) : null,
                status: opp.status,
              }
            : null,
        };
      });
    }),
});
