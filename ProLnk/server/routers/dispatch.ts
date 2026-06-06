/**
 * Dispatch Router — Trust Model Phase 2 (job-site clearance gating + proof).
 *
 * The guarantee: when a company is awarded a job, it may only assign roster
 * members whose CURRENT ProPass tier meets the job's site-derived requiredTier,
 * and the platform LOGS the cleared roster per job. That log is the exportable
 * "every person on this site is Tier-N cleared as of <date>" record — the moat.
 *
 * Mirrors roster.ts / proPass.ts conventions:
 *   - resolves the caller's partner (company) via ctx.user.id (company-scoped)
 *   - uses dbRows helpers (asRows/firstRow) for raw db.execute() reads
 *   - self-healing DDL via ensureDispatchInfra() / ensureClearanceInfra()
 *   - ids are DB sequence-default → OMIT id on insert, read back via NEXTVAL where needed
 *
 * Tier policy (siteType → requiredTier) lives in ../dispatch.ts and is TUNABLE.
 *
 * 🚨 LEGAL — DELIBERATELY NOT BUILT HERE:
 *   - No citizenship / I-9 / work-authorization ADJUDICATION. This router only
 *     reads the computed ProPass tier (from ../clearance.ts). Whether a credential
 *     legally satisfies work-authorization (and the I-9/E-Verify employer duty) is
 *     a counsel-gated decision that must live in the credential-verification layer,
 *     not in dispatch gating. See TRUST_VERIFICATION_MODEL.md §9.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { asRows, firstRow } from "../_core/dbRows";
import { getDb } from "../db";
import { computeTier, ensureClearanceInfra } from "../clearance";
import {
  ensureDispatchInfra,
  normalizeSiteType,
  requiredTierForSiteType,
  TIER_LABELS,
} from "../dispatch";

async function resolveCallerPartner(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await (db as any).execute(
    sql`SELECT id, businessName, contactEmail FROM partners WHERE userId = ${userId} LIMIT 1`,
  );
  return firstRow(rows) ?? null;
}

/** Load an opportunity + its site-derived required tier. */
async function loadJobContext(jobId: number) {
  const db = await getDb();
  if (!db) return null;
  await ensureDispatchInfra();
  const rows = await (db as any).execute(sql`
    SELECT id, siteType, opportunityCategory, jobAddress, jobZip
    FROM opportunities WHERE id = ${jobId} LIMIT 1
  `);
  const job = firstRow(rows);
  if (!job) return null;
  const siteType = normalizeSiteType(job.siteType);
  const requiredTier = requiredTierForSiteType(siteType);
  return { job, siteType, requiredTier };
}

export const dispatchRouter = router({

  // ── Site-type + required tier for a job (read-only helper for the UI) ────────
  jobClearanceRequirement: protectedProcedure
    .input(z.object({ jobId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const ctxJob = await loadJobContext(input.jobId);
      if (!ctxJob) throw new TRPCError({ code: "NOT_FOUND", message: "Job not found." });
      return {
        jobId: ctxJob.job.id,
        siteType: ctxJob.siteType,
        requiredTier: ctxJob.requiredTier,
        requiredTierLabel: TIER_LABELS[ctxJob.requiredTier] ?? `Tier ${ctxJob.requiredTier}`,
      };
    }),

  // ── Eligible workers: the caller's roster filtered by current tier >= required ─
  eligibleWorkers: protectedProcedure
    .input(z.object({ jobId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { eligible: [], ineligible: [], requiredTier: 0, siteType: "residential" };
      await ensureClearanceInfra();
      await ensureDispatchInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "No partner profile for this account." });

      const ctxJob = await loadJobContext(input.jobId);
      if (!ctxJob) throw new TRPCError({ code: "NOT_FOUND", message: "Job not found." });
      const { siteType, requiredTier } = ctxJob;

      // Company-scoped: only this partner's active roster.
      const rows = await (db as any).execute(sql`
        SELECT pe.id, pe.firstName, pe.lastName, pe.email, pe.phone, pe.role,
               pe.proPassId, pp.passCode, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt
        FROM partnerEmployees pe
        LEFT JOIN proPassCards pp ON pe.proPassId = pp.id
        WHERE pe.partnerId = ${partner.id}
          AND (pe.rosterStatus IS NULL OR pe.rosterStatus <> 'removed')
        ORDER BY pe.firstName, pe.lastName
      `);
      const roster = asRows(rows);

      const eligible: any[] = [];
      const ineligible: any[] = [];
      for (const e of roster) {
        // Live tier (computeTier already drops expired checks back down).
        const tier = await computeTier({ passId: e.proPassId ?? null, employeeId: e.id });
        const entry = {
          personId: e.id,
          proPassId: e.proPassId ?? null,
          name: `${e.firstName ?? ""} ${e.lastName ?? ""}`.trim(),
          email: e.email ?? null,
          phone: e.phone ?? null,
          role: e.role ?? null,
          tier,
          tierLabel: TIER_LABELS[tier] ?? `Tier ${tier}`,
        };
        if (tier >= requiredTier) eligible.push(entry);
        else ineligible.push({ ...entry, reason: `Needs ${TIER_LABELS[requiredTier] ?? `Tier ${requiredTier}`}` });
      }

      return {
        jobId: ctxJob.job.id,
        siteType,
        requiredTier,
        requiredTierLabel: TIER_LABELS[requiredTier] ?? `Tier ${requiredTier}`,
        eligible,
        ineligible,
      };
    }),

  // ── Assign workers: re-validate tier, reject if any fails, log the cleared set ─
  assignWorkers: protectedProcedure
    .input(z.object({
      jobId: z.number().int().positive(),
      personIds: z.array(z.number().int().positive()).min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await ensureClearanceInfra();
      await ensureDispatchInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "No partner profile for this account." });

      const ctxJob = await loadJobContext(input.jobId);
      if (!ctxJob) throw new TRPCError({ code: "NOT_FOUND", message: "Job not found." });
      const { siteType, requiredTier } = ctxJob;

      const uniqueIds = Array.from(new Set(input.personIds));

      // Load the named roster rows — company-scoped (can't assign someone else's staff).
      const rows = await (db as any).execute(sql`
        SELECT pe.id, pe.firstName, pe.lastName, pe.email, pe.proPassId,
               pp.passCode, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt
        FROM partnerEmployees pe
        LEFT JOIN proPassCards pp ON pe.proPassId = pp.id
        WHERE pe.partnerId = ${partner.id}
          AND (pe.rosterStatus IS NULL OR pe.rosterStatus <> 'removed')
          AND pe.id IN (${sql.join(uniqueIds.map((id) => sql`${id}`), sql`, `)})
      `);
      const found = asRows(rows);
      const foundIds = new Set(found.map((r) => Number(r.id)));

      // Anyone requested but not on this partner's roster → reject the whole batch.
      const missing = uniqueIds.filter((id) => !foundIds.has(id));
      if (missing.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `These workers aren't on your active roster: ${missing.join(", ")}.`,
        });
      }

      // Re-validate EACH person's live tier. Reject the batch if any falls short
      // (an all-or-nothing guarantee — a partial clear can't be exported as "cleared").
      const cleared: Array<{ row: any; tier: number }> = [];
      const failures: Array<{ personId: number; name: string; tier: number }> = [];
      for (const r of found) {
        const tier = await computeTier({ passId: r.proPassId ?? null, employeeId: r.id });
        if (tier >= requiredTier) cleared.push({ row: r, tier });
        else failures.push({ personId: Number(r.id), name: `${r.firstName ?? ""} ${r.lastName ?? ""}`.trim(), tier });
      }
      if (failures.length) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message:
            `Cannot assign — ${failures.length} worker(s) don't meet ${TIER_LABELS[requiredTier] ?? `Tier ${requiredTier}`} for this ${siteType} site: ` +
            failures.map((f) => `${f.name} (${TIER_LABELS[f.tier] ?? `Tier ${f.tier}`})`).join(", "),
        });
      }

      // Write one clearance-log row per cleared person (the audit trail / proof).
      // id is sequence-default → OMIT it; snapshot captures the state at assignment.
      const clearedAt = new Date();
      for (const { row, tier } of cleared) {
        const snapshot = {
          siteType,
          requiredTier,
          personId: Number(row.id),
          proPassId: row.proPassId ?? null,
          name: `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
          passCode: row.passCode ?? null,
          backgroundCheckStatus: row.backgroundCheckStatus ?? null,
          backgroundCheckExpiresAt: row.backgroundCheckExpiresAt ?? null,
          tierAtAssignment: tier,
          clearedAt: clearedAt.toISOString(),
        };
        await (db as any).execute(sql`
          INSERT INTO job_clearance_log
            (opportunityId, personId, proPassId, partnerId, tierAtAssignment, requiredTier, snapshotJson, clearedBy, clearedAt)
          VALUES
            (${ctxJob.job.id}, ${Number(row.id)}, ${row.proPassId ?? null}, ${partner.id},
             ${tier}, ${requiredTier}, ${JSON.stringify(snapshot)}, ${ctx.user.id}, NOW())
        `);
      }

      return {
        success: true,
        jobId: ctxJob.job.id,
        siteType,
        requiredTier,
        assignedCount: cleared.length,
        assigned: cleared.map(({ row, tier }) => ({
          personId: Number(row.id),
          name: `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim(),
          tier,
        })),
        message: `${cleared.length} worker(s) cleared and logged for this ${siteType} job.`,
      };
    }),

  // ── Clearance proof: the exportable logged cleared roster for a job ──────────
  clearanceProof: protectedProcedure
    .input(z.object({ jobId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      await ensureDispatchInfra();

      const partner = await resolveCallerPartner(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "No partner profile for this account." });

      const ctxJob = await loadJobContext(input.jobId);
      if (!ctxJob) throw new TRPCError({ code: "NOT_FOUND", message: "Job not found." });

      // Company-scoped: only this partner's logged clearances for the job.
      const rows = await (db as any).execute(sql`
        SELECT jcl.id, jcl.personId, jcl.proPassId, jcl.tierAtAssignment, jcl.requiredTier,
               jcl.snapshotJson, jcl.clearedAt,
               pe.firstName, pe.lastName, pe.email, pe.role,
               pp.passCode, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt
        FROM job_clearance_log jcl
        LEFT JOIN partnerEmployees pe ON jcl.personId = pe.id
        LEFT JOIN proPassCards pp ON jcl.proPassId = pp.id
        WHERE jcl.opportunityId = ${ctxJob.job.id} AND jcl.partnerId = ${partner.id}
        ORDER BY jcl.clearedAt DESC, pe.firstName, pe.lastName
      `);
      const log = asRows(rows);

      const clearedRoster = log.map((r) => ({
        personId: r.personId,
        proPassId: r.proPassId ?? null,
        name: `${r.firstName ?? ""} ${r.lastName ?? ""}`.trim(),
        email: r.email ?? null,
        role: r.role ?? null,
        passCode: r.passCode ?? null,
        tierAtAssignment: r.tierAtAssignment,
        tierLabel: TIER_LABELS[r.tierAtAssignment] ?? `Tier ${r.tierAtAssignment}`,
        backgroundCheckStatus: r.backgroundCheckStatus ?? null,
        backgroundCheckExpiresAt: r.backgroundCheckExpiresAt ?? null,
        clearedAt: r.clearedAt,
      }));

      return {
        jobId: ctxJob.job.id,
        company: partner.businessName,
        siteType: ctxJob.siteType,
        requiredTier: ctxJob.requiredTier,
        requiredTierLabel: TIER_LABELS[ctxJob.requiredTier] ?? `Tier ${ctxJob.requiredTier}`,
        generatedAt: new Date().toISOString(),
        clearedCount: clearedRoster.length,
        clearedRoster,
        // Marketing-safe phrasing per §9.4 — state what we verified, never "guaranteed safe".
        statement:
          clearedRoster.length > 0
            ? `${clearedRoster.length} assigned worker(s) verified at ${TIER_LABELS[ctxJob.requiredTier] ?? `Tier ${ctxJob.requiredTier}`} or above for this ${ctxJob.siteType} site, as of assignment.`
            : "No cleared workers have been logged for this job yet.",
      };
    }),
});
