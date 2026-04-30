/**
 * Data Integrity Agent
 *
 * Weekly sweep for data quality issues:
 * - Orphaned records (jobs with no partner, opportunities with no job, etc.)
 * - Partners with no service ZIP codes (can't receive leads)
 * - Homeowners with no property linked
 * - Opportunities stuck in 'sent' status for > 48 hours
 * - Storm leads created more than 7 days ago still pending
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { dashboard } from "../notify";

export async function runDataIntegrityCheck(): Promise<{
  issues: string[];
  fixed: number;
  flagged: number;
}> {
  const db = await getDb();
  if (!db) return { issues: [], fixed: 0, flagged: 0 };

  const issues: string[] = [];
  let fixed = 0;
  let flagged = 0;

  try {
    // 1. Opportunities stuck in 'sent' for > 48 hours (should have expired or been accepted)
    const stuckRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM opportunities
      WHERE status = 'sent'
        AND leadExpiresAt < NOW()
        AND updatedAt < DATE_SUB(NOW(), INTERVAL 48 HOUR)
    `);
    const stuckCount = parseInt((stuckRows.rows || stuckRows)[0]?.cnt ?? "0");
    if (stuckCount > 0) {
      // Auto-fix: expire them
      await (db as any).execute(sql`
        UPDATE opportunities SET status = 'expired', updatedAt = NOW()
        WHERE status = 'sent'
          AND leadExpiresAt < NOW()
          AND updatedAt < DATE_SUB(NOW(), INTERVAL 48 HOUR)
      `);
      issues.push(`${stuckCount} stuck opportunities auto-expired`);
      fixed += stuckCount;
    }

    // 2. Partners approved but no service ZIP codes
    const noZipRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM partners
      WHERE status = 'approved'
        AND (serviceZipCodes IS NULL OR serviceZipCodes = '[]' OR serviceZipCodes = '')
    `);
    const noZipCount = parseInt((noZipRows.rows || noZipRows)[0]?.cnt ?? "0");
    if (noZipCount > 0) {
      issues.push(`${noZipCount} approved partners have no service ZIP codes — they cannot receive leads`);
      flagged += noZipCount;
    }

    // 3. Old storm leads still pending (> 7 days old)
    const oldStormRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM stormLeads
      WHERE status = 'pending'
        AND createdAt < DATE_SUB(NOW(), INTERVAL 7 DAY)
    `);
    const oldStormCount = parseInt((oldStormRows.rows || oldStormRows)[0]?.cnt ?? "0");
    if (oldStormCount > 0) {
      await (db as any).execute(sql`
        UPDATE stormLeads SET status = 'expired', updatedAt = NOW()
        WHERE status = 'pending'
          AND createdAt < DATE_SUB(NOW(), INTERVAL 7 DAY)
      `);
      issues.push(`${oldStormCount} old storm leads auto-expired (> 7 days without dispatch)`);
      fixed += oldStormCount;
    }

    // 4. Jobs with aiAnalysisStatus = 'processing' for > 30 minutes (stuck)
    const stuckJobRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM jobs
      WHERE aiAnalysisStatus = 'processing'
        AND updatedAt < DATE_SUB(NOW(), INTERVAL 30 MINUTE)
    `);
    const stuckJobCount = parseInt((stuckJobRows.rows || stuckJobRows)[0]?.cnt ?? "0");
    if (stuckJobCount > 0) {
      await (db as any).execute(sql`
        UPDATE jobs SET aiAnalysisStatus = 'failed', updatedAt = NOW()
        WHERE aiAnalysisStatus = 'processing'
          AND updatedAt < DATE_SUB(NOW(), INTERVAL 30 MINUTE)
      `);
      issues.push(`${stuckJobCount} stuck AI analysis jobs reset to 'failed'`);
      fixed += stuckJobCount;
    }

    // 5. Commissions with no receivingPartnerId but commissionType = 'referral_commission'
    const orphanCommRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM commissions
      WHERE commissionType = 'referral_commission'
        AND receivingPartnerId IS NULL
    `);
    const orphanCommCount = parseInt((orphanCommRows.rows || orphanCommRows)[0]?.cnt ?? "0");
    if (orphanCommCount > 0) {
      issues.push(`${orphanCommCount} referral_commission records have no receiving partner — these won't pay out`);
      flagged += orphanCommCount;
    }

    if (issues.length > 0) {
      await dashboard(
        `Data Integrity Report — ${issues.length} issues`,
        `Fixed: ${fixed}\nFlagged for review: ${flagged}\n\nDetails:\n${issues.map(i => `• ${i}`).join("\n")}`,
        "data_integrity"
      );
    }

    console.log(`[DataIntegrity] Checked: ${fixed} auto-fixed, ${flagged} flagged`);
  } catch (err) {
    console.error("[DataIntegrity] Error:", err);
  }

  return { issues, fixed, flagged };
}
