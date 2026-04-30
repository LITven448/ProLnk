/**
 * Checkr Background Check Router
 *
 * Automated background checks for partner onboarding.
 * When a partner is approved, they get an invitation to complete
 * a background check. Results come back via webhook and update
 * their Pro Pass automatically.
 *
 * FCRA Requirements:
 *   1. Show "Summary of Your Rights" disclosure before check
 *   2. Get written consent
 *   3. If denying based on report: 2-step adverse action process
 *      a) Pre-adverse notice with copy of report (5 business day wait)
 *      b) Final adverse action notice
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";

const CHECKR_API_KEY = process.env.CHECKR_API_KEY ?? "";
const CHECKR_BASE = "https://api.checkr.com/v1";

function checkrAuth(): string {
  return `Basic ${Buffer.from(CHECKR_API_KEY + ":").toString("base64")}`;
}

async function checkrPost(path: string, body: Record<string, unknown>) {
  if (!CHECKR_API_KEY) throw new Error("CHECKR_API_KEY not configured");
  const res = await fetch(`${CHECKR_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: checkrAuth(), "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Checkr API error (${res.status}): ${err}`);
  }
  return res.json();
}

// ─── Create candidate + invite ────────────────────────────────────────────────

export async function initiateBackgroundCheck(opts: {
  partnerEmail: string;
  firstName: string;
  lastName: string;
  phone?: string;
  partnerId: number;
  passId?: number;
}): Promise<{ invitationUrl: string | null; candidateId: string | null }> {
  try {
    // Create candidate
    const candidate = await checkrPost("/candidates", {
      email: opts.partnerEmail,
      first_name: opts.firstName,
      last_name: opts.lastName,
      phone: opts.phone,
    }) as any;

    // Store candidateId
    const db = await getDb();
    if (db) {
      await (db as any).execute(sql`
        UPDATE partners SET checkrCandidateId = ${candidate.id} WHERE id = ${opts.partnerId}
      `);
      if (opts.passId) {
        await (db as any).execute(sql`
          UPDATE proPassCards SET checkrCandidateId = ${candidate.id} WHERE id = ${opts.passId}
        `);
      }
    }

    // Send invitation
    const invitation = await checkrPost("/invitations", {
      candidate_id: candidate.id,
      package: "basic_plus", // Criminal + sex offender + SSN trace + county search
      work_locations: [{ country: "US", state: "TX" }],
    }) as any;

    return { invitationUrl: invitation.invitation_url, candidateId: candidate.id };
  } catch (err) {
    console.error("[Checkr] Failed to initiate background check:", err);
    return { invitationUrl: null, candidateId: null };
  }
}

// ─── Webhook handler ──────────────────────────────────────────────────────────

export async function handleCheckrWebhook(payload: any): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const type = payload.type;
  const report = payload.data?.object;
  if (!report) return;

  const candidateId = report.candidate_id;

  if (type === "report.completed") {
    const status = report.status; // "clear", "consider", "suspended"

    // Update Pro Pass
    await (db as any).execute(sql`
      UPDATE proPassCards SET
        checkrReportId = ${report.id},
        backgroundCheckStatus = ${status},
        backgroundCheckDate = NOW(),
        backgroundCheckExpiresAt = DATE_ADD(NOW(), INTERVAL 2 YEAR),
        updatedAt = NOW()
      WHERE checkrCandidateId = ${candidateId}
    `);

    // Update partner record
    await (db as any).execute(sql`
      UPDATE partners SET backgroundCheckVerifiedAt = ${status === "clear" ? new Date() : null}
      WHERE checkrCandidateId = ${candidateId}
    `);

    // Notify admin if not clear
    if (status !== "clear") {
      const partnerRows = await (db as any).execute(sql`
        SELECT businessName, contactEmail FROM partners WHERE checkrCandidateId = ${candidateId} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (partner) {
        await notifyOwner({
          title: `⚠️ Background Check: ${status.toUpperCase()} — ${partner.businessName}`,
          content: `Partner ${partner.businessName} (${partner.contactEmail}) returned a "${status}" background check result. Review before approving access.`,
        }).catch(() => {});
      }
    }

    console.log(`[Checkr] Report completed for candidate ${candidateId}: ${status}`);
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const checkrRouter = router({

  // Partner: get my background check status
  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await (db as any).execute(sql`
      SELECT checkrCandidateId, backgroundCheckVerifiedAt FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (rows.rows || rows)[0];
    if (!partner) return null;

    // Get Pro Pass background check status
    if (partner.checkrCandidateId) {
      const passRows = await (db as any).execute(sql`
        SELECT backgroundCheckStatus, backgroundCheckDate, backgroundCheckExpiresAt
        FROM proPassCards WHERE checkrCandidateId = ${partner.checkrCandidateId} LIMIT 1
      `);
      return (passRows.rows || passRows)[0] ?? null;
    }
    return { backgroundCheckStatus: "not_submitted" };
  }),

  // Admin: initiate a background check for a partner
  adminInitiate: protectedProcedure
    .input(z.object({
      partnerId: z.number().int().positive(),
      passId: z.number().int().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`
        SELECT contactEmail, contactName, businessName FROM partners WHERE id = ${input.partnerId} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND" });

      const nameParts = (partner.contactName || partner.businessName || "").split(" ");
      const result = await initiateBackgroundCheck({
        partnerEmail: partner.contactEmail,
        firstName: nameParts[0] || "Unknown",
        lastName: nameParts.slice(1).join(" ") || "Unknown",
        partnerId: input.partnerId,
        passId: input.passId,
      });

      if (!result.invitationUrl) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create Checkr invitation" });
      }

      return { invitationUrl: result.invitationUrl, candidateId: result.candidateId };
    }),

  // Admin: list all pending background checks
  adminListPending: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return [];
    const rows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.checkrCandidateId,
             pp.backgroundCheckStatus, pp.backgroundCheckDate, pp.backgroundCheckExpiresAt
      FROM partners p
      LEFT JOIN proPassCards pp ON p.checkrCandidateId = pp.checkrCandidateId
      WHERE p.status = 'approved'
        AND (p.checkrCandidateId IS NULL OR pp.backgroundCheckStatus NOT IN ('clear'))
      ORDER BY p.approvedAt DESC LIMIT 100
    `);
    return rows.rows || rows;
  }),
});
