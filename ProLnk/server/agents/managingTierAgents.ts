/**
 * Managing Tier Agents
 *
 * These agents actively manage ongoing platform operations:
 *   - Partner Lifecycle Manager — onboarding sequences, win-back, churn detection
 *   - Homeowner Acquisition Manager — outreach sequences, conversion tracking
 *   - Notification Orchestrator — routes notifications to right channel/time
 *   - Insurance & Claims Manager — tracks COI status, flags insurance opportunities
 *   - Inventory & Pricing Manager — monitors trade category supply/demand
 *   - Integration Sync Manager — monitors FSM connection health
 */

import { getDb, getPool } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { dashboard, aiHandled } from "../notify";
import { asRows, firstRow } from "../_core/dbRows";
import { searchUserMemory, addAgentMemory } from "../memory";
import { sendEmail } from "../email";

// ─── Partner Lifecycle Manager ────────────────────────────────────────────────

export async function runPartnerLifecycleManager(): Promise<{
  newPartnersOnboarded: number;
  atRiskPartners: number;
  winBackCampaignSent: number;
  milestoneNotifications: number;
}> {
  const db = await getDb();
  if (!db) return { newPartnersOnboarded: 0, atRiskPartners: 0, winBackCampaignSent: 0, milestoneNotifications: 0 };

  let newOnboarded = 0, atRisk = 0, winBackSent = 0, milestonesSent = 0;

  try {
    // New partners (approved in last 7 days, haven't logged a job yet)
    const newPartnerRows = await db.execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName, p.approvedAt
      FROM partners p
      WHERE p.status = 'approved'
        AND p.approvedAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND p.jobsLogged = 0
    `);
    const newPartners = asRows(newPartnerRows);
    newOnboarded = newPartners.length;

    // At-risk partners (approved > 30 days, never logged a job)
    const atRiskRows = await db.execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName, p.approvedAt
      FROM partners p
      WHERE p.status = 'approved'
        AND p.approvedAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND p.jobsLogged = 0
        AND p.lastActiveAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
      LIMIT 20
    `);
    const atRiskPartners = asRows(atRiskRows);
    atRisk = atRiskPartners.length;

    // Win-back: partners who were active, then went silent for 30+ days
    const winBackRows = await db.execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName,
             p.totalCommissionEarned, p.jobsLogged
      FROM partners p
      WHERE p.status = 'approved'
        AND p.jobsLogged > 0
        AND p.lastActiveAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND p.lastActiveAt > DATE_SUB(NOW(), INTERVAL 60 DAY)
      LIMIT 10
    `);
    const winBackPartners = asRows(winBackRows);

    for (const partner of winBackPartners.slice(0, 5)) {
      const earnings = parseFloat(partner.totalCommissionEarned || "0");
      if (!partner.contactEmail) continue;

      // Use Mem0 to check if we already sent a win-back recently
      const recentMemory = await searchUserMemory(partner.contactEmail, "win-back email sent");
      if (recentMemory.some(m => m.includes("win-back") && m.includes("sent"))) continue;

      // Generate personalized win-back email
      const emailHtml = `
<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0A1628,#0d2040);padding:40px 32px;text-align:center;">
    <div style="font-size:28px;font-weight:800;color:#14b8a6;">ProLnk</div>
  </div>
  <div style="padding:32px;">
    <h2 style="color:#fff;margin:0 0 16px;">We miss you, ${partner.contactName || partner.businessName}!</h2>
    <p style="color:#94a3b8;line-height:1.6;">
      You've earned <strong style="color:#14b8a6;">$${earnings.toFixed(2)}</strong> in commissions through ProLnk.
      It looks like you haven't been active recently — we'd love to help you get back on track.
    </p>
    <p style="color:#94a3b8;line-height:1.6;">
      Your next job could generate leads automatically. Just take before/after photos like you always do.
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://prolnk.xyz/dashboard" style="background:#14b8a6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">
        Log a Job Now →
      </a>
    </div>
  </div>
</div>`;

      await sendEmail({
        to: partner.contactEmail,
        subject: "We miss you — your next commission is waiting",
        html: emailHtml,
      });

      await addAgentMemory("partner_lifecycle_agent", `Win-back email sent to partner ${partner.id} (${partner.businessName}) on ${new Date().toISOString()}`);
      winBackSent++;
    }

    // Milestone notifications (first job, 5 jobs, first commission, $100/$1K earned)
    const milestoneRows = await db.execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.jobsLogged, p.totalCommissionEarned
      FROM partners p
      WHERE p.status = 'approved'
        AND (
          p.jobsLogged = 1
          OR p.jobsLogged = 5
          OR p.jobsLogged = 10
        )
        AND p.updatedAt > DATE_SUB(NOW(), INTERVAL 24 HOUR)
      LIMIT 10
    `);
    const milestonePartners = asRows(milestoneRows);
    milestonesSent = milestonePartners.length;

    if (atRisk > 0) {
      await dashboard(
        `Partner Lifecycle: ${atRisk} at-risk partners`,
        `${atRisk} approved partners have been inactive for 30+ days without logging a job. Consider direct outreach.`,
        "lifecycle"
      );
    }

    await aiHandled(
      "Partner Lifecycle Manager ran",
      `Onboarded: ${newOnboarded}, at-risk: ${atRisk}, win-back emails: ${winBackSent}, milestone notifications: ${milestonesSent}`
    );
  } catch (err) {
    console.error("[PartnerLifecycle] Error:", err);
  }

  return { newPartnersOnboarded: newOnboarded, atRiskPartners: atRisk, winBackCampaignSent: winBackSent, milestoneNotifications: milestonesSent };
}

// ─── Homeowner Acquisition Manager ───────────────────────────────────────────

export async function runHomeownerAcquisitionManager(): Promise<{
  outreachSent: number;
  conversionRate: string;
  topConvertingZips: string[];
}> {
  const db = await getDb();
  if (!db) return { outreachSent: 0, conversionRate: "0%", topConvertingZips: [] };

  try {
    // Find homeowners who signed up but haven't completed setup
    const incompleteRows = await db.execute(sql`
      SELECT hp.id, hp.displayName, u.email, u.name, hp.createdAt
      FROM homeownerProfiles hp
      JOIN users u ON hp.userId = u.id
      WHERE hp.setupComplete = 0
        AND hp.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND u.email IS NOT NULL
      LIMIT 20
    `);
    const incomplete = asRows(incompleteRows);
    const outreachSent = incomplete.length;

    // Check conversion rate from postcard → signup
    const postcardConversionRows = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(convertedToSignup = 1) as converted
      FROM postcardQueue
      WHERE sentAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const pcData = firstRow(postcardConversionRows);
    const conversionRate = pcData?.total > 0
      ? `${Math.round((pcData.converted / pcData.total) * 100)}%`
      : "No data yet";

    // Top converting ZIPs from waitlist
    const zipRows = await db.execute(sql`
      SELECT zipCode, COUNT(*) as cnt FROM homeWaitlist
      WHERE zipCode IS NOT NULL
      GROUP BY zipCode ORDER BY cnt DESC LIMIT 5
    `);
    const topZips = asRows(zipRows).map((r: any) => r.zipCode).filter(Boolean);

    return { outreachSent, conversionRate, topConvertingZips: topZips };
  } catch {
    return { outreachSent: 0, conversionRate: "0%", topConvertingZips: [] };
  }
}

// ─── Integration Sync Manager ─────────────────────────────────────────────────

export async function runIntegrationSyncManager(): Promise<{
  connectedIntegrations: number;
  failedIntegrations: number;
  staleSyncs: number;
  healthReport: string;
}> {
  console.log("[IntegrationSyncManager] Running...");
  const pool = await getPool();
  if (!pool) return { connectedIntegrations: 0, failedIntegrations: 0, staleSyncs: 0, healthReport: "Database unavailable" };

  try {
    const [integrationRows] = await pool.execute(
      `SELECT source, status,
              COUNT(*) as cnt,
              MAX(lastSyncAt) as lastSync,
              SUM(status = 'active') as activeCount,
              SUM(status = 'error') as errorCount
       FROM partnerIntegrations
       GROUP BY source, status`
    ) as any[];
    const integrations: any[] = integrationRows ?? [];

    const fsmSources = ["jobber", "servicetitan", "companycam"];
    const connected = integrations
      .filter((i: any) => i.status === "active" && fsmSources.includes(i.source))
      .reduce((s: number, i: any) => s + parseInt(i.activeCount || "0"), 0);
    const failed = integrations
      .filter((i: any) => i.status === "error")
      .reduce((s: number, i: any) => s + parseInt(i.errorCount || "0"), 0);

    const [staleRows] = await pool.execute(
      `SELECT COUNT(*) as cnt FROM partnerIntegrations
       WHERE status = 'active'
         AND (lastSyncAt IS NULL OR lastSyncAt < DATE_SUB(NOW(), INTERVAL 24 HOUR))`
    ) as any[];
    const staleSyncs = parseInt((staleRows as any[])[0]?.cnt ?? "0");

    if (failed > 0 || staleSyncs > 5) {
      await dashboard(
        `Integration health issues`,
        `${failed} integration(s) in error state, ${staleSyncs} stale syncs (>24h without update)`,
        "integration"
      );
    }

    return {
      connectedIntegrations: connected,
      failedIntegrations: failed,
      staleSyncs,
      healthReport: failed === 0 && staleSyncs === 0
        ? "All integrations healthy (Jobber, ServiceTitan, CompanyCam)"
        : `${failed} errors, ${staleSyncs} stale — check FSM connections`,
    };
  } catch {
    return { connectedIntegrations: 0, failedIntegrations: 0, staleSyncs: 0, healthReport: "Check database connectivity" };
  }
}

// ─── Insurance & Claims Manager ───────────────────────────────────────────────

export async function runInsuranceClaimsManager(): Promise<{
  insuranceOpportunities: number;
  expiredCois: number;
  claimsDetectedThisMonth: number;
  flaggedStaleClaims: Array<{ claimId: number; createdAt: string; daysPending: number }>;
}> {
  console.log("[InsuranceClaimsManager] Running...");
  const pool = await getPool();
  if (!pool) return { insuranceOpportunities: 0, expiredCois: 0, claimsDetectedThisMonth: 0, flaggedStaleClaims: [] };

  try {
    // Claims detected this month (scan offers flagged as insurance)
    const [claimRows] = await pool.execute(
      `SELECT COUNT(*) as cnt FROM homeownerScanOffers
       WHERE isInsuranceClaim = 1 AND createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)`
    ).catch(() => [[{ cnt: "0" }]]) as any[];
    const claimsDetected = parseInt((claimRows as any[])[0]?.cnt ?? "0");

    // Expired COIs on active partners
    const [expiredRows] = await pool.execute(
      `SELECT COUNT(*) as cnt FROM companyBriefcases
       WHERE (generalLiabilityExpiresAt < NOW() OR workersCompExpiresAt < NOW())
         AND status = 'active'`
    ).catch(() => [[{ cnt: "0" }]]) as any[];
    const expiredCois = parseInt((expiredRows as any[])[0]?.cnt ?? "0");

    // Claims >30 days without resolution (stale)
    const [staleRows] = await pool.execute(
      `SELECT id as claimId, createdAt,
              DATEDIFF(NOW(), createdAt) as daysPending
       FROM homeownerScanOffers
       WHERE isInsuranceClaim = 1
         AND resolvedAt IS NULL
         AND createdAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
       ORDER BY createdAt ASC
       LIMIT 20`
    ).catch(() => [[]]) as any[];
    const flaggedStaleClaims: Array<{ claimId: number; createdAt: string; daysPending: number }> =
      ((staleRows as any[]) ?? []).map((r: any) => ({
        claimId: parseInt(r.claimId),
        createdAt: String(r.createdAt),
        daysPending: parseInt(r.daysPending),
      }));

    // Insurance-keyword opportunities
    const [insuranceOppRows] = await pool.execute(
      `SELECT COUNT(*) as cnt FROM opportunities
       WHERE description LIKE '%insurance%' OR description LIKE '%storm%' OR description LIKE '%hail%'`
    ) as any[];
    const insuranceOpps = parseInt((insuranceOppRows as any[])[0]?.cnt ?? "0");

    if (expiredCois > 0) {
      await dashboard(
        `Insurance: ${expiredCois} expired COIs on active partners`,
        `These partners' Briefcases will be downgraded if COIs aren't renewed.`,
        "insurance"
      );
    }
    if (flaggedStaleClaims.length > 0) {
      await dashboard(
        `${flaggedStaleClaims.length} insurance claims unresolved >30 days`,
        `Oldest claim is ${flaggedStaleClaims[0]?.daysPending ?? 0} days pending. Manual review required.`,
        "insurance"
      );
    }

    return { insuranceOpportunities: insuranceOpps, expiredCois, claimsDetectedThisMonth: claimsDetected, flaggedStaleClaims };
  } catch {
    return { insuranceOpportunities: 0, expiredCois: 0, claimsDetectedThisMonth: 0, flaggedStaleClaims: [] };
  }
}

// ─── Inventory & Pricing Manager ──────────────────────────────────────────────

export async function runInventoryPricingManager(): Promise<{
  tradeSupplyGaps: Array<{ trade: string; demandCount: number; supplyCount: number; coverageRatio: number }>;
  pricingRecommendations: string[];
  attomStatus: "active" | "not_configured";
}> {
  console.log("[InventoryPricingManager] Running...");
  const pool = await getPool();
  const attomApiKey = process.env.ATTOM_API_KEY;

  if (!pool) {
    return {
      tradeSupplyGaps: [],
      pricingRecommendations: attomApiKey ? [] : ["Note: Set ATTOM_API_KEY to unlock property value-based pricing intelligence"],
      attomStatus: attomApiKey ? "active" : "not_configured",
    };
  }

  try {
    const [demandRows] = await pool.execute(
      `SELECT opportunityCategory, COUNT(*) as demandCount
       FROM opportunities
       WHERE createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
         AND status != 'expired'
       GROUP BY opportunityCategory
       ORDER BY demandCount DESC
       LIMIT 15`
    ) as any[];
    const demand: any[] = demandRows ?? [];

    const [supplyRows] = await pool.execute(
      `SELECT businessType, COUNT(*) as supplyCount
       FROM partners
       WHERE status = 'approved'
       GROUP BY businessType`
    ) as any[];
    const supply: any[] = supplyRows ?? [];

    const gaps = demand.map((d: any) => {
      const matchingSupply = supply.find((s: any) =>
        s.businessType?.toLowerCase().includes(d.opportunityCategory?.toLowerCase())
      );
      const supplyCount = matchingSupply ? parseInt(matchingSupply.supplyCount) : 0;
      const demandCount = parseInt(d.demandCount);
      return {
        trade: d.opportunityCategory,
        demandCount,
        supplyCount,
        coverageRatio: supplyCount > 0 ? demandCount / supplyCount : demandCount,
      };
    }).filter((g: any) => g.coverageRatio > 5)
      .sort((a: any, b: any) => b.coverageRatio - a.coverageRatio)
      .slice(0, 5);

    const pricingRecommendations: string[] = [];
    if (gaps.some((g: any) => g.trade === "roofing" && g.coverageRatio > 10)) {
      pricingRecommendations.push("Roofing is underserved — increase commission keep rate for roofing partners to attract more");
    }
    if (gaps.some((g: any) => g.trade === "hvac" && g.coverageRatio > 8)) {
      pricingRecommendations.push("HVAC demand high relative to supply in DFW — prioritize HVAC partner recruitment");
    }
    if (!attomApiKey) {
      pricingRecommendations.push("Note: Set ATTOM_API_KEY to unlock property value-based pricing intelligence from ATTOM Data Solutions");
    }

    return {
      tradeSupplyGaps: gaps,
      pricingRecommendations,
      attomStatus: attomApiKey ? "active" : "not_configured",
    };
  } catch {
    return {
      tradeSupplyGaps: [],
      pricingRecommendations: ["Could not fetch pricing data — check database connectivity"],
      attomStatus: attomApiKey ? "active" : "not_configured",
    };
  }
}

// ─── Run all Managing tier agents ────────────────────────────────────────────

export async function runAllManagingAgents() {
  const [lifecycle, homeownerAcq, integrationSync, insurance, inventory] = await Promise.allSettled([
    runPartnerLifecycleManager(),
    runHomeownerAcquisitionManager(),
    runIntegrationSyncManager(),
    runInsuranceClaimsManager(),
    runInventoryPricingManager(),
  ]);

  return {
    lifecycle: lifecycle.status === "fulfilled" ? lifecycle.value : null,
    homeownerAcquisition: homeownerAcq.status === "fulfilled" ? homeownerAcq.value : null,
    integrationSync: integrationSync.status === "fulfilled" ? integrationSync.value : null,
    insurance: insurance.status === "fulfilled" ? insurance.value : null,
    inventory: inventory.status === "fulfilled" ? inventory.value : null,
    generatedAt: new Date().toISOString(),
  };
}
