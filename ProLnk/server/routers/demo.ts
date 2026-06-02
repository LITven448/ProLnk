/**
 * Demo / Preview seed router.
 *
 * Powers the founder-facing PREVIEW mode: idempotently seeds a complete,
 * self-contained slice of the live product (5 DFW pros, a demo homeowner with
 * 1-2 service requests, and a live matching offer) so every gated screen — the
 * pro offer feed, admin matching console, and homeowner request tracking —
 * shows real data. Everything is tagged "[DEMO]" and fully reversible via
 * `demo.reset`.
 *
 * GATING: these procedures are preview-key gated (not auth gated) so the founder
 * can drive them from the preview UI without admin-login friction. They refuse
 * to run unless the caller passes the matching preview key. All data created is
 * "[DEMO]"-tagged and reset-able, so this is safe.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { createOfferForOpportunity, ensureJobOffersInfra } from "./matching";
import { makeRequestTrackingToken } from "../_core/requestToken";

// Default mirrors VITE_PREVIEW_KEY's documented default so the demo works
// out of the box but can be rotated via env.
const PREVIEW_KEY = process.env.PREVIEW_KEY || "prolnk-preview-2026";

const DEMO_TAG = "[DEMO]";
const DFW_ZIPS = ["75201", "75202", "75204", "75206", "75230", "75001"];

const DEMO_PARTNERS = [
  { trade: "Plumbing", name: "[DEMO] Lone Star Plumbing", email: "demo+plumbing@prolnk.io", tier: "pro" },
  { trade: "HVAC", name: "[DEMO] North Texas Air & Heat", email: "demo+hvac@prolnk.io", tier: "crew" },
  { trade: "Electrical", name: "[DEMO] Metroplex Electric", email: "demo+electrical@prolnk.io", tier: "pro" },
  { trade: "Roofing & Gutters", name: "[DEMO] DFW Roofing Co", email: "demo+roofing@prolnk.io", tier: "company" },
  { trade: "Handyman", name: "[DEMO] Dallas Handyman Pros", email: "demo+handyman@prolnk.io", tier: "scout" },
];

// Demo service requests — categories deliberately match demo pros' trades and a
// DFW ZIP they cover, so the matching engine produces real offers.
const DEMO_REQUESTS = [
  {
    category: "Plumbing",
    zip: "75201",
    address: "1200 Main St, Dallas, TX 75201",
    description: "[DEMO] Kitchen sink is leaking under the cabinet and the disposal stopped working.",
    estimatedValue: 450,
    name: "[DEMO] Jordan Homeowner",
    email: "demo.homeowner@prolnk.io",
    phone: "214-555-0142",
  },
  {
    category: "HVAC",
    zip: "75206",
    address: "4500 Cedar Springs Rd, Dallas, TX 75206",
    description: "[DEMO] AC isn't cooling below 80 and is making a rattling noise — needs a diagnostic.",
    estimatedValue: 800,
    name: "[DEMO] Jordan Homeowner",
    email: "demo.homeowner@prolnk.io",
    phone: "214-555-0142",
  },
];

function assertPreviewKey(key: string | undefined) {
  if (!key || key !== PREVIEW_KEY) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Invalid preview key. Demo seeding requires a valid preview key.",
    });
  }
}

async function seedPartners(db: any) {
  const zipsJson = JSON.stringify(DFW_ZIPS);
  const results: Array<{ businessName: string; trade: string; partnerId: number; created: boolean }> = [];
  for (const d of DEMO_PARTNERS) {
    const existing = await db.execute(sql`SELECT id FROM partners WHERE contactEmail = ${d.email} LIMIT 1`);
    const existingId = (existing?.[0]?.[0] as { id?: number } | undefined)?.id ?? null;
    if (existingId) {
      await db.execute(sql`
        UPDATE partners SET
          businessName = ${d.name}, businessType = ${d.trade}, serviceArea = 'Dallas, TX',
          serviceZipCodes = ${zipsJson}, serviceRadiusMiles = 25, maxZipCodes = 60,
          status = 'active', tier = ${d.tier}, suspendedAt = NULL, weeklyLeadCap = 15,
          rating = '4.70', avgLeadResponseHours = '3.00', approvedAt = NOW(), updatedAt = NOW()
        WHERE id = ${existingId}
      `);
      results.push({ businessName: d.name, trade: d.trade, partnerId: existingId, created: false });
    } else {
      await db.execute(sql`
        INSERT INTO partners (
          businessName, businessType, serviceArea, serviceZipCodes, serviceRadiusMiles,
          maxZipCodes, contactName, contactEmail, status, tier, weeklyLeadCap,
          rating, avgLeadResponseHours, appliedAt, approvedAt, updatedAt
        ) VALUES (
          ${d.name}, ${d.trade}, 'Dallas, TX', ${zipsJson}, 25, 60,
          ${d.name.replace("[DEMO] ", "")}, ${d.email}, 'active', ${d.tier}, 15,
          '4.70', '3.00', NOW(), NOW(), NOW()
        )
      `);
      const idRow = await db.execute(sql`SELECT id FROM partners WHERE contactEmail = ${d.email} LIMIT 1`);
      const pid = Number((idRow?.[0]?.[0] as { id?: number } | undefined)?.id ?? 0);
      results.push({ businessName: d.name, trade: d.trade, partnerId: pid, created: true });
    }
  }
  return results;
}

async function findDemoOpportunity(db: any, req: (typeof DEMO_REQUESTS)[number]): Promise<number | null> {
  const rows = await db.execute(sql`
    SELECT id FROM opportunities
    WHERE homeownerEmail = ${req.email}
      AND opportunityCategory = ${req.category}
      AND jobZip = ${req.zip}
    ORDER BY id DESC LIMIT 1
  `);
  const id = (rows?.[0]?.[0] as { id?: number } | undefined)?.id ?? null;
  return id != null ? Number(id) : null;
}

export const demoRouter = router({
  seedAll: publicProcedure
    .input(z.object({ previewKey: z.string() }))
    .mutation(async ({ input }) => {
      assertPreviewKey(input.previewKey);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      await ensureJobOffersInfra();

      const partners = await seedPartners(db);

      const requests: Array<{
        opportunityId: number;
        category: string;
        zip: string;
        offerId: number | null;
        trackingToken: string;
        created: boolean;
      }> = [];

      for (const req of DEMO_REQUESTS) {
        let opportunityId = await findDemoOpportunity(db, req);
        let created = false;
        if (!opportunityId) {
          const result = await (db as any).execute(
            `INSERT INTO opportunities
               (intakeSource, opportunityType, opportunityCategory, description,
                jobZip, jobAddress, estimatedJobValue,
                homeownerName, homeownerEmail, homeownerPhone, submittedByUserId,
                adminReviewStatus, status, routingPosition)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending_review', 'new', 0)`,
            [
              "homeowner",
              req.category,
              req.category,
              req.description,
              req.zip,
              req.address,
              String(req.estimatedValue),
              req.name,
              req.email,
              req.phone,
              null,
            ]
          );
          opportunityId = Number((result?.[0]?.insertId ?? result?.insertId) as number);
          created = true;
        }

        let offerId: number | null = null;
        if (opportunityId) {
          try {
            offerId = await createOfferForOpportunity(opportunityId);
          } catch (err) {
            console.warn("[demo.seedAll] createOfferForOpportunity failed:", err);
          }
        }

        requests.push({
          opportunityId,
          category: req.category,
          zip: req.zip,
          offerId,
          trackingToken: opportunityId ? makeRequestTrackingToken(opportunityId) : "",
          created,
        });
      }

      const firstReq = requests[0];
      return {
        success: true,
        partners,
        requests,
        homeownerTrackingPath: firstReq?.opportunityId
          ? `/my-request/${firstReq.opportunityId}?token=${firstReq.trackingToken}`
          : null,
        message: `Seeded ${partners.length} demo pros and ${requests.length} demo requests with live matching offers.`,
      };
    }),

  reset: publicProcedure
    .input(z.object({ previewKey: z.string() }))
    .mutation(async ({ input }) => {
      assertPreviewKey(input.previewKey);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      await ensureJobOffersInfra();

      // Collect demo opportunity ids first so we can clean their offers.
      const oppRows = await db.execute(sql`
        SELECT id FROM opportunities
        WHERE homeownerName LIKE ${DEMO_TAG + "%"}
           OR homeownerEmail = 'demo.homeowner@prolnk.io'
           OR description LIKE ${DEMO_TAG + "%"}
      `);
      const oppIds = ((oppRows as any) || []).map((r: any) => Number(r[0]?.id ?? r.id)).filter((n: number) => !!n);

      let deletedOffers = 0;
      for (const oid of oppIds) {
        const res = await db.execute(sql`DELETE FROM jobOffers WHERE opportunityId = ${oid}`);
        deletedOffers += Number((res as any)?.[0]?.affectedRows ?? 0);
      }

      let deletedOpps = 0;
      if (oppIds.length > 0) {
        const res = await db.execute(sql`
          DELETE FROM opportunities
          WHERE homeownerName LIKE ${DEMO_TAG + "%"}
             OR homeownerEmail = 'demo.homeowner@prolnk.io'
             OR description LIKE ${DEMO_TAG + "%"}
        `);
        deletedOpps = Number((res as any)?.[0]?.affectedRows ?? oppIds.length);
      }

      // Demo pros are referenced by FKs only via the offers/opps we just removed.
      const proRes = await db.execute(sql`DELETE FROM partners WHERE businessName LIKE ${DEMO_TAG + "%"}`);
      const deletedPros = Number((proRes as any)?.[0]?.affectedRows ?? 0);

      return {
        success: true,
        deletedPros,
        deletedOpportunities: deletedOpps,
        deletedOffers,
        message: "Demo data cleared. Re-run Seed demo data for a clean slate.",
      };
    }),
});
