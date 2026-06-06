/**
 * Trust Model — Phase 2 dispatch config + self-healing DDL.
 *
 * "Verification is graduated by the JOB SITE, not set at signup." Each job
 * (opportunities row) carries a `siteType`; the platform derives a `requiredTier`
 * that every on-site individual's ProPass must currently meet (see computeTier in
 * ./clearance.ts). At dispatch the company may only assign roster members whose
 * live tier >= requiredTier, and we LOG the cleared roster per job — that log is
 * the exportable "everyone on this site is Tier-N cleared as of <date>" proof.
 *
 * Everything here is ADDITIVE + self-healing (try/catch ALTERs, no destructive
 * migrations), mirroring ensureClearanceInfra() in ./clearance.ts. The DB has a
 * sequence-default on `id`, so inserts OMIT `id`.
 */

import { sql } from "drizzle-orm";
import { getDb } from "./db";
import { asRows, firstRow } from "./_core/dbRows";

export const SITE_TYPES = [
  "residential",
  "commercial",
  "property_mgmt",
  "school_k12",
  "government",
  "childcare",
  "healthcare",
] as const;

export type SiteType = (typeof SITE_TYPES)[number];

export const DEFAULT_SITE_TYPE: SiteType = "residential";

/**
 * siteType → requiredTier (each on-site person's ProPass must currently meet this).
 *
 * ⚠️ POLICY DEFAULT — TUNABLE. This is the product/legal baseline from the Trust
 * Model spec (§3 job-site requirement matrix), NOT a hard rule. The exact required
 * tier per state / school district / facility is a PRODUCT + LEGAL decision and is
 * expected to be overridable per-jurisdiction (e.g. a per-state/district override
 * table) without touching dispatch code. Keep this as the data-driven default only.
 *
 *   Tier 1 = Home-Ready       (identity + criminal background check)
 *   Tier 2 = Site-Ready       (Tier 1 + work-authorization verified)  [Phase 2]
 *   Tier 3 = Institution-Ready (Tier 2 + fingerprint/state clearance) [Phase 3]
 *
 * NOTE: computeTier() currently only surfaces 0/1 (Phase 1). Site types whose
 * requiredTier is 2 or 3 will therefore gate correctly the moment Phase 2/3
 * credential types make computeTier return >=2/3 — no dispatch change needed.
 */
export const SITE_TYPE_REQUIRED_TIER: Record<SiteType, number> = {
  residential: 1,
  commercial: 2,
  property_mgmt: 2,
  school_k12: 3,
  government: 3,
  childcare: 3,
  healthcare: 3,
};

export const TIER_LABELS: Record<number, string> = {
  0: "Listed",
  1: "Home-Ready",
  2: "Site-Ready",
  3: "Institution-Ready",
};

/** Normalize an arbitrary string to a known SiteType (defaults to residential). */
export function normalizeSiteType(value: unknown): SiteType {
  const v = String(value ?? "").trim().toLowerCase();
  return (SITE_TYPES as readonly string[]).includes(v) ? (v as SiteType) : DEFAULT_SITE_TYPE;
}

/**
 * Required ProPass tier for a given site type.
 *
 * Tunable seam: a per-jurisdiction override would slot in here (look up
 * state/district override, fall back to SITE_TYPE_REQUIRED_TIER). Left as the
 * default-only lookup until that policy decision is made.
 */
export function requiredTierForSiteType(siteType: SiteType): number {
  return SITE_TYPE_REQUIRED_TIER[siteType] ?? SITE_TYPE_REQUIRED_TIER[DEFAULT_SITE_TYPE];
}

let dispatchInfraEnsured = false;

/**
 * Idempotently add Phase-2 dispatch infra:
 *   - opportunities.siteType  (the job's site classification)
 *   - job_clearance_log       (per-assignment audit trail / clearance proof)
 *
 * Each statement is wrapped in try/catch (duplicate-column / table-exists just
 * means it's already there), exactly like ensureClearanceInfra().
 */
export async function ensureDispatchInfra(): Promise<void> {
  if (dispatchInfraEnsured) return;
  const db = await getDb();
  if (!db) return;

  const stmts: string[] = [
    // The job's site classification → drives requiredTier at dispatch.
    `ALTER TABLE opportunities ADD COLUMN siteType VARCHAR(32) NULL DEFAULT '${DEFAULT_SITE_TYPE}'`,

    // Per-assignment clearance audit log. id is sequence-default (omit on insert).
    // No FKs (raw-SQL tables here don't use them); ids are plain INTs.
    `CREATE TABLE IF NOT EXISTS job_clearance_log (
       id INT NOT NULL PRIMARY KEY,
       opportunityId INT NOT NULL,
       personId INT NULL,
       proPassId INT NULL,
       partnerId INT NULL,
       tierAtAssignment INT NOT NULL DEFAULT 0,
       requiredTier INT NOT NULL DEFAULT 0,
       snapshotJson TEXT NULL,
       clearedBy INT NULL,
       clearedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
     )`,
  ];

  for (const ddl of stmts) {
    try {
      await (db as any).execute(sql.raw(ddl));
    } catch {
      // Column/table already exists (or DDL not permitted) — treat as ensured.
    }
  }

  // Sequence-default for the new table's id (mirrors ensureDbSequences()), so
  // inserts can OMIT id. Best-effort: if the table was created by another path
  // that already attached a sequence, the CREATE SEQUENCE simply fails → ignored.
  try {
    const mx: any = await (db as any).execute(
      sql.raw("SELECT COALESCE(MAX(id),0)+1 AS n FROM `job_clearance_log`"),
    );
    const start = Number(firstRow(mx)?.n ?? 1) || 1;
    await (db as any).execute(sql.raw("DROP SEQUENCE IF EXISTS `seq_job_clearance_log`"));
    await (db as any).execute(
      sql.raw(`CREATE SEQUENCE \`seq_job_clearance_log\` START WITH ${start} NOCACHE`),
    );
    await (db as any).execute(
      sql.raw(
        "ALTER TABLE `job_clearance_log` ALTER COLUMN `id` SET DEFAULT (NEXTVAL(`seq_job_clearance_log`))",
      ),
    );
  } catch {
    // Sequence already attached — ignore.
  }

  try {
    await (db as any).execute(
      sql.raw("CREATE INDEX idx_jcl_opp ON job_clearance_log (opportunityId)"),
    );
  } catch {
    // Index already exists — ignore.
  }

  dispatchInfraEnsured = true;
}

export { asRows, firstRow };
