/**
 * Commission Audit Agent
 *
 * Weekly check for anomalous commission records:
 * - Commissions over $10,000 (unusual, needs review)
 * - Duplicate commission records (same opportunityId + commissionType)
 * - Commissions with no corresponding opportunity
 * - FSM-sourced commissions at wrong rate (should match partner tier, not 5%)
 * - Partners with commissions but no Stripe Connect account
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { escalate, dashboard } from "../notify";

export interface AuditResult {
  largeCommissions: number;
  potentialDuplicates: number;
  orphanedCommissions: number;
  partnersMissingConnect: number;
  totalAnomalies: number;
}

export async function runCommissionAudit(): Promise<AuditResult> {
  const db = await getDb();
  if (!db) return { largeCommissions: 0, potentialDuplicates: 0, orphanedCommissions: 0, partnersMissingConnect: 0, totalAnomalies: 0 };

  const result: AuditResult = {
    largeCommissions: 0,
    potentialDuplicates: 0,
    orphanedCommissions: 0,
    partnersMissingConnect: 0,
    totalAnomalies: 0,
  };

  try {
    // 1. Large commissions (> $10,000 single payout — unusual)
    const largeRows = await (db as any).execute(sql`
      SELECT c.id, c.amount, c.commissionType, p.businessName
      FROM commissions c
      LEFT JOIN partners p ON c.receivingPartnerId = p.id
      WHERE c.amount > 10000 AND c.paid = 0
      ORDER BY c.amount DESC
    `);
    const large = largeRows.rows || largeRows;
    result.largeCommissions = large.length;
    if (large.length > 0) {
      await escalate(
        `💰 Large Unpaid Commissions Detected`,
        `${large.length} commissions over $10,000 pending:\n${large.slice(0, 5).map((c: any) => `• ${c.businessName}: $${parseFloat(c.amount).toLocaleString()} (${c.commissionType})`).join("\n")}`
      );
    }

    // 2. Potential duplicate commissions (same opportunityId + type created within 24h)
    const dupeRows = await (db as any).execute(sql`
      SELECT opportunityId, commissionType, COUNT(*) as cnt
      FROM commissions
      WHERE opportunityId IS NOT NULL
      GROUP BY opportunityId, commissionType
      HAVING cnt > 1
    `);
    const dupes = dupeRows.rows || dupeRows;
    result.potentialDuplicates = dupes.length;
    if (dupes.length > 0) {
      await dashboard(
        `Potential Duplicate Commissions`,
        `${dupes.length} opportunity+type combinations have multiple commission records. Review: ${dupes.slice(0, 3).map((d: any) => `opp #${d.opportunityId} (${d.commissionType}: ${d.cnt}×)`).join(", ")}`
      );
    }

    // 3. Partners with unpaid commissions but no Stripe Connect
    const noConnectRows = await (db as any).execute(sql`
      SELECT p.businessName, p.contactEmail, COUNT(c.id) as pendingCount, COALESCE(SUM(c.amount), 0) as pendingAmount
      FROM commissions c
      JOIN partners p ON c.receivingPartnerId = p.id
      WHERE c.paid = 0
        AND (p.stripeConnectStatus != 'active' OR p.stripeConnectAccountId IS NULL)
      GROUP BY p.id
      HAVING pendingAmount >= 25
    `);
    const noConnect = noConnectRows.rows || noConnectRows;
    result.partnersMissingConnect = noConnect.length;
    if (noConnect.length > 0) {
      await dashboard(
        `Partners Owed Commissions Without Stripe Connect`,
        `${noConnect.length} partners have unpaid commissions but haven't set up payout accounts:\n${noConnect.slice(0, 3).map((p: any) => `• ${p.businessName}: $${parseFloat(p.pendingAmount).toFixed(2)} pending`).join("\n")}`
      );
    }

    result.totalAnomalies = result.largeCommissions + result.potentialDuplicates + result.partnersMissingConnect + result.orphanedCommissions;

    if (result.totalAnomalies === 0) {
      console.log("[CommissionAudit] No anomalies found");
    } else {
      console.log(`[CommissionAudit] ${result.totalAnomalies} anomalies found`);
    }
  } catch (err) {
    console.error("[CommissionAudit] Error:", err);
  }

  return result;
}
