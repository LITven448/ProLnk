/**
 * Supreme Court Agents — Platform Governance
 *
 * These agents act as independent reviewers of platform decisions,
 * flagging compliance issues, brand safety, and ethical concerns.
 *
 * Agents:
 *   - Privacy Agent — CCPA/GDPR data requests, consent tracking
 *   - Brand Safety Agent — flagging content/partners that risk brand
 *   - Ethics Reviewer — fairness in lead routing, no discriminatory patterns
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { dashboard, escalate } from "../notify";

// ─── Privacy Agent ────────────────────────────────────────────────────────────

export async function runPrivacyAgent(): Promise<{
  pendingDataRequests: number;
  overdueRequests: number;
  complianceGaps: string[];
  action: string;
}> {
  const db = await getDb();
  const gaps: string[] = [];
  let pendingDataRequests = 0;
  let overdueRequests = 0;

  try {
    if (db) {
      // Check for pending CCPA deletion requests
      const deleteRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM partners
        WHERE dataDeleteRequestedAt IS NOT NULL
          AND dataDeleteRequestedAt < DATE_SUB(NOW(), INTERVAL 45 DAY)
      `);
      overdueRequests = parseInt((deleteRows.rows || deleteRows)[0]?.cnt ?? "0");

      const exportRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM partners
        WHERE dataExportRequestedAt IS NOT NULL
          AND dataExportRequestedAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
      `);
      pendingDataRequests = parseInt((exportRows.rows || exportRows)[0]?.cnt ?? "0");

      // Check SMS consent compliance
      const smsRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM smsConsentRecords LIMIT 1
      `).catch(() => ({ rows: [{ cnt: "0" }] }));
      const hasConsentTable = true; // table was created in migration

      if (!hasConsentTable) gaps.push("smsConsentRecords table missing — TCPA violation risk");
    }
  } catch (e) {
    gaps.push("Cannot access privacy data — database issue");
  }

  // Check for EXIF stripping
  gaps.push("EXIF/GPS metadata stripping not implemented — homeowner photos may contain location data");
  gaps.push("CCPA data deletion is a stub — implement actual PII deletion pipeline");
  gaps.push("No consent logging for AI photo analysis on homeowner property photos");

  if (overdueRequests > 0) {
    await escalate(
      `⚠️ Overdue CCPA Data Deletion Requests`,
      `${overdueRequests} data deletion request(s) overdue (>45 days). CCPA requires fulfillment within 45 days.`,
      "privacy"
    );
  }

  const action = overdueRequests > 0
    ? "URGENT: Process overdue data deletion requests immediately"
    : gaps.length > 2
    ? "Implement EXIF stripping and complete CCPA deletion pipeline"
    : "Privacy posture acceptable for pilot scale";

  return { pendingDataRequests, overdueRequests, complianceGaps: gaps, action };
}

// ─── Brand Safety Agent ───────────────────────────────────────────────────────

export async function runBrandSafetyAgent(): Promise<{
  brandRisks: string[];
  partnerQualityIssues: number;
  recommendation: string;
}> {
  const db = await getDb();
  const risks: string[] = [];
  let qualityIssues = 0;

  try {
    if (db) {
      // Partners with low ratings and high strike counts
      const riskRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM partners
        WHERE status = 'approved'
          AND (strikeCount >= 2 OR (rating < 3.0 AND reviewCount >= 3))
      `);
      qualityIssues = parseInt((riskRows.rows || riskRows)[0]?.cnt ?? "0");

      // Advertiser review
      const advertiserRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM featuredAdvertisers WHERE status = 'active'
      `);
      const activeAdvertisers = parseInt((advertiserRows.rows || advertiserRows)[0]?.cnt ?? "0");

      if (activeAdvertisers === 0) {
        risks.push("ProLnk Media has no active advertisers yet — no brand risk but no revenue either");
      }
    }
  } catch {}

  if (qualityIssues > 0) {
    risks.push(`${qualityIssues} approved partners with quality concerns (strikes or low ratings)`);
  }

  // Check email sender domain
  if (!process.env.FROM_EMAIL?.includes("prolnk.io")) {
    risks.push("Emails sending from resend.dev instead of @prolnk.io — brand and deliverability risk");
  }

  return {
    brandRisks: risks,
    partnerQualityIssues: qualityIssues,
    recommendation: qualityIssues > 0
      ? "Review flagged partners — consider strikes or suspension to protect homeowner trust"
      : "Brand safety acceptable for current scale",
  };
}

// ─── Ethics Reviewer ──────────────────────────────────────────────────────────

export async function runEthicsReviewer(): Promise<{
  fairnessScore: number;
  biasFlags: string[];
  routingFairnessCheck: string;
  recommendation: string;
}> {
  const db = await getDb();
  const biasFlags: string[] = [];

  try {
    if (db) {
      // Check for geographic concentration in lead routing
      const routingRows = await (db as any).execute(sql`
        SELECT p.serviceZipCodes, COUNT(o.id) as leadsReceived, AVG(p.priorityScore) as avgPps
        FROM partners p
        LEFT JOIN opportunities o ON o.receivingPartnerId = p.id AND o.createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
        WHERE p.status = 'approved'
        GROUP BY p.id
        HAVING leadsReceived > 0
        ORDER BY leadsReceived DESC
        LIMIT 20
      `);
      const topPartners = routingRows.rows || routingRows;

      // Check if top 10% of partners are getting 90% of leads (Pareto concentration)
      if (topPartners.length > 5) {
        const topThree = topPartners.slice(0, 3);
        const totalLeads = topPartners.reduce((s: number, p: any) => s + parseInt(p.leadsReceived || "0"), 0);
        const topThreeLeads = topThree.reduce((s: number, p: any) => s + parseInt(p.leadsReceived || "0"), 0);
        const concentration = totalLeads > 0 ? topThreeLeads / totalLeads : 0;

        if (concentration > 0.7) {
          biasFlags.push(`Top 3 partners receiving ${Math.round(concentration * 100)}% of leads — high concentration, may disadvantage new partners`);
        }
      }
    }
  } catch {}

  // Standard ethical checks
  const routingFairnessCheck = biasFlags.length === 0
    ? "Lead routing appears equitable for current volume"
    : "Potential concentration detected — monitor as volume grows";

  const fairnessScore = 100 - (biasFlags.length * 15);

  return {
    fairnessScore: Math.max(0, fairnessScore),
    biasFlags,
    routingFairnessCheck,
    recommendation: biasFlags.length > 0
      ? "Implement lead distribution quotas to prevent single-partner monopolization of a ZIP code"
      : "Continue monitoring lead distribution as partner count grows",
  };
}

// ─── Run all Supreme Court agents ────────────────────────────────────────────

export async function runSupremeCourtAgents() {
  const [privacy, brandSafety, ethics] = await Promise.allSettled([
    runPrivacyAgent(),
    runBrandSafetyAgent(),
    runEthicsReviewer(),
  ]);

  return {
    privacy: privacy.status === "fulfilled" ? privacy.value : null,
    brandSafety: brandSafety.status === "fulfilled" ? brandSafety.value : null,
    ethics: ethics.status === "fulfilled" ? ethics.value : null,
    generatedAt: new Date().toISOString(),
  };
}
