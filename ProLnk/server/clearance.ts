/**
 * Trust Model — Phase 1 clearance helpers (self-healing DDL + computed tier).
 *
 * The roster/credential tables in this DB were created by raw SQL (0004). The
 * production DB now has a sequence-default on `id`, so inserts that OMIT `id` get
 * one auto-assigned (concurrency-safe). These helpers add the Phase-1 columns
 * idempotently (mirroring the app's ensureXInfra() self-heal pattern) so no
 * migration is required, and expose `computeTier()`.
 *
 * Tier ladder (Phase 1 only surfaces 0/1; 2/3 are Phase 2/3):
 *   0 = Listed     (on a roster, nothing verified)
 *   1 = Home-Ready (a clear/passed background check exists)
 */

import { sql } from "drizzle-orm";
import { getDb } from "./db";
import { asRows, firstRow } from "./_core/dbRows";

let clearanceInfraEnsured = false;

/**
 * Idempotently add the Phase-1 columns. MySQL/TiDB doesn't support
 * `ADD COLUMN IF NOT EXISTS` everywhere, so each ALTER is wrapped in a try/catch
 * (a duplicate-column error just means it's already there — treat as ensured),
 * exactly like the other ensureXInfra() helpers in this codebase.
 */
export async function ensureClearanceInfra(): Promise<void> {
  if (clearanceInfraEnsured) return;
  const db = await getDb();
  if (!db) return;

  const alters: string[] = [
    // partners: account type branch + company attestation
    "ALTER TABLE partners ADD COLUMN accountType VARCHAR(20) NULL",
    "ALTER TABLE partners ADD COLUMN businessLicenseNo VARCHAR(100) NULL",
    "ALTER TABLE partners ADD COLUMN staffVettingAttestedAt TIMESTAMP NULL",
    // partnerEmployees: roster invite + portable ProPass linkage + cached tier
    "ALTER TABLE partnerEmployees ADD COLUMN inviteToken VARCHAR(64) NULL",
    "ALTER TABLE partnerEmployees ADD COLUMN inviteSentAt TIMESTAMP NULL",
    "ALTER TABLE partnerEmployees ADD COLUMN rosterStatus VARCHAR(20) NULL",
    "ALTER TABLE partnerEmployees ADD COLUMN proPassId INT NULL",
    "ALTER TABLE partnerEmployees ADD COLUMN computedTier INT NULL",
  ];

  for (const ddl of alters) {
    try {
      await (db as any).execute(ddl);
    } catch {
      // Column already exists (or DDL not permitted) — treat as ensured.
    }
  }

  // Index for fast token lookups on the public invite link.
  try {
    await (db as any).execute("CREATE INDEX idx_pe_invite ON partnerEmployees (inviteToken)");
  } catch {
    // Index already exists — ignore.
  }

  clearanceInfraEnsured = true;
}

export type TierInput = {
  /** A proPassCards.id, if the person has a ProPass. */
  passId?: number | null;
  /** A partnerEmployees.id, used to find a linked ProPass if passId isn't given. */
  employeeId?: number | null;
};

/**
 * Computes the Phase-1 clearance tier (0 or 1) for a person.
 *   Tier 1 if a clear/passed background check exists on their ProPass, else Tier 0.
 * Full 0–3 ladder (work-auth, fingerprint, etc.) lands in Phase 2/3.
 */
export async function computeTier(input: TierInput): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  let passId = input.passId ?? null;

  // Resolve a ProPass from the roster entry if we weren't handed one directly.
  if (!passId && input.employeeId) {
    await ensureClearanceInfra();
    const peRows = await (db as any).execute(
      sql`SELECT proPassId FROM partnerEmployees WHERE id = ${input.employeeId} LIMIT 1`,
    );
    const pe = firstRow(peRows);
    if (pe?.proPassId) passId = Number(pe.proPassId);
  }

  if (!passId) return 0;

  const passRows = await (db as any).execute(
    sql`SELECT backgroundCheckStatus, backgroundCheckExpiresAt FROM proPassCards WHERE id = ${passId} LIMIT 1`,
  );
  const pass = firstRow(passRows);
  if (!pass) return 0;

  const status = String(pass.backgroundCheckStatus ?? "");
  const isClear = status === "clear" || status === "passed";
  if (!isClear) return 0;

  // Time-boxed: an expired check drops the tier back to 0.
  if (pass.backgroundCheckExpiresAt && new Date(pass.backgroundCheckExpiresAt) < new Date()) {
    return 0;
  }

  return 1;
}

/** Persist the cached tier on a roster row (best-effort). */
export async function cacheEmployeeTier(employeeId: number, tier: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await ensureClearanceInfra();
  try {
    await (db as any).execute(
      sql`UPDATE partnerEmployees SET computedTier = ${tier} WHERE id = ${employeeId}`,
    );
  } catch {
    // best-effort cache only
  }
}

export { asRows, firstRow };
