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

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { dashboard, aiHandled } from "../notify";
import { searchUserMemory, addAgentMemory } from "../memory";
import { sendEmail } from "../email";

// Re-export from email module
async function sendEmail(opts: { to: string; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.FROM_EMAIL ?? "ProLnk <noreply@prolnk.io>", to: [opts.to], subject: opts.subject, html: opts.html }),
  });
  return res.ok;
}

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
    const newPartnerRows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName, p.approvedAt
      FROM partners p
      WHERE p.status = 'approved'
        AND p.approvedAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND p.jobsLogged = 0
    `);
    const newPartners = newPartnerRows.rows || newPartnerRows;
    newOnboarded = newPartners.length;

    // At-risk partners (approved > 30 days, never logged a job)
    const atRiskRows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName, p.approvedAt
      FROM partners p
      WHERE p.status = 'approved'
        AND p.approvedAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND p.jobsLogged = 0
        AND p.lastActiveAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
      LIMIT 20
    `);
    const atRiskPartners = atRiskRows.rows || atRiskRows;
    atRisk = atRiskPartners.length;

    // Win-back: partners who were active, then went silent for 30+ days
    const winBackRows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.contactEmail, p.contactName,
             p.totalCommissionEarned, p.jobsLogged
      FROM partners p
      WHERE p.status = 'approved'
        AND p.jobsLogged > 0
        AND p.lastActiveAt < DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND p.lastActiveAt > DATE_SUB(NOW(), INTERVAL 60 DAY)
      LIMIT 10
    `);
    const winBackPartners = winBackRows.rows || winBackRows;

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
      <a href="https://prolnk.io/dashboard" style="background:#14b8a6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">
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
    const milestoneRows = await (db as any).execute(sql`
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
    const milestonePartners = milestoneRows.rows || milestoneRows;
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
    const incompleteRows = await (db as any).execute(sql`
      SELECT hp.id, hp.displayName, u.email, u.name, hp.createdAt
      FROM homeownerProfiles hp
      JOIN users u ON hp.userId = u.id
      WHERE hp.setupComplete = 0
        AND hp.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND u.email IS NOT NULL
      LIMIT 20
    `);
    const incomplete = incompleteRows.rows || incompleteRows;
    const outreachSent = incomplete.length;

    // Check conversion rate from postcard → signup
    const postcardConversionRows = await (db as any).execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(convertedToSignup = 1) as converted
      FROM postcardQueue
      WHERE sentAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);
    const pcData = (postcardConversionRows.rows || postcardConversionRows)[0];
    const conversionRate = pcData?.total > 0
      ? `${Math.round((pcData.converted / pcData.total) * 100)}%`
      : "No data yet";

    // Top converting ZIPs from waitlist
    const zipRows = await (db as any).execute(sql`
      SELECT zipCode, COUNT(*) as cnt FROM homeWaitlist
      WHERE zipCode IS NOT NULL
      GROUP BY zipCode ORDER BY cnt DESC LIMIT 5
    `);
    const topZips = (zipRows.rows || zipRows).map((r: any) => r.zipCode).filter(Boolean);

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
  const db = await getDb();
  if (!db) return { connectedIntegrations: 0, failedIntegrations: 0, staleSyncs: 0, healthReport: "Database unavailable" };

  try {
    const integrationRows = await (db as any).execute(sql`
      SELECT source, status, COUNT(*) as cnt,
             MAX(lastSyncAt) as lastSync,
             SUM(status = 'active') as activeCount,
             SUM(status = 'error') as errorCount
      FROM partnerIntegrations
      GROUP BY source, status
    `);
    const integrations = integrationRows.rows || integrationRows;

    const connected = integrations.filter((i: any) => i.status === "active").reduce((s: number, i: any) => s + parseInt(i.activeCount || "0"), 0);
    const failed = integrations.filter((i: any) => i.status === "error").reduce((s: number, i: any) => s + parseInt(i.errorCount || "0"), 0);

    // Stale syncs (last sync > 24 hours ago for active integrations)
    const staleRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM partnerIntegrations
      WHERE status = 'active'
        AND (lastSyncAt IS NULL OR lastSyncAt < DATE_SUB(NOW(), INTERVAL 24 HOUR))
    `);
    const staleSyncs = parseInt((staleRows.rows || staleRows)[0]?.cnt ?? "0");

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
        ? "All integrations healthy"
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
}> {
  const db = await getDb();
  if (!db) return { insuranceOpportunities: 0, expiredCois: 0, claimsDetectedThisMonth: 0 };

  try {
    // Opportunities flagged as potential insurance claims
    const claimRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM homeownerScanOffers
      WHERE isInsuranceClaim = 1 AND createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
    `).catch(() => ({ rows: [{ cnt: "0" }] }));
    const claimsDetected = parseInt((claimRows.rows || claimRows)[0]?.cnt ?? "0");

    // Expired COIs on active partners
    const expiredRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM companyBriefcases
      WHERE (generalLiabilityExpiresAt < NOW() OR workersCompExpiresAt < NOW())
        AND status = 'active'
    `).catch(() => ({ rows: [{ cnt: "0" }] }));
    const expiredCois = parseInt((expiredRows.rows || expiredRows)[0]?.cnt ?? "0");

    // Insurance opportunities from opportunities table
    const insuranceOppRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM opportunities
      WHERE description LIKE '%insurance%' OR description LIKE '%storm%' OR description LIKE '%hail%'
    `);
    const insuranceOpps = parseInt((insuranceOppRows.rows || insuranceOppRows)[0]?.cnt ?? "0");

    if (expiredCois > 0) {
      await dashboard(
        `Insurance: ${expiredCois} expired COIs on active partners`,
        `These partners' Briefcases will be downgraded if COIs aren't renewed.`,
        "insurance"
      );
    }

    return {
      insuranceOpportunities: insuranceOpps,
      expiredCois,
      claimsDetectedThisMonth: claimsDetected,
    };
  } catch {
    return { insuranceOpportunities: 0, expiredCois: 0, claimsDetectedThisMonth: 0 };
  }
}

// ─── Inventory & Pricing Manager ──────────────────────────────────────────────

export async function runInventoryPricingManager(): Promise<{
  tradeSupplyGaps: Array<{ trade: string; demandCount: number; supplyCount: number; coverageRatio: number }>;
  pricingRecommendations: string[];
}> {
  const db = await getDb();
  if (!db) return { tradeSupplyGaps: [], pricingRecommendations: [] };

  try {
    // Find trade categories with high demand (opportunities) but low supply (partners)
    const demandRows = await (db as any).execute(sql`
      SELECT opportunityCategory, COUNT(*) as demandCount
      FROM opportunities
      WHERE createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND status != 'expired'
      GROUP BY opportunityCategory
      ORDER BY demandCount DESC
      LIMIT 15
    `);
    const demand = demandRows.rows || demandRows;

    const supplyRows = await (db as any).execute(sql`
      SELECT businessType, COUNT(*) as supplyCount
      FROM partners
      WHERE status = 'approved'
      GROUP BY businessType
    `);
    const supply = supplyRows.rows || supplyRows;

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

    return { tradeSupplyGaps: gaps, pricingRecommendations };
  } catch {
    return { tradeSupplyGaps: [], pricingRecommendations: [] };
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
