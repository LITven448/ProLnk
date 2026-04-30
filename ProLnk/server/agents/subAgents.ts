/**
 * Remaining Sub-Agents
 *
 * - Origination Lock Agent — enforces address-level origination locking
 * - Profile Completion Agent — nudges incomplete profiles
 * - Partner Retention Agent (enhanced) — churn prediction + win-back
 * - Referral Agent — tracks partner-to-partner referrals, bonuses
 * - Materials Pricing Agent — basic pricing intelligence from ATTOM + market data
 * - Warranty Tracker Agent — tracks appliance/system warranties from vault data
 * - Alert Triage Agent — categorizes and routes compliance alerts
 * - Outreach Agent — AI-written personalized partner outreach
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { dashboard, aiHandled } from "../notify";
import { queryPropertyHistory, recordPropertyCondition } from "../zep";
import { addAgentMemory, searchAgentMemory } from "../memory";

// ─── Origination Lock Agent ───────────────────────────────────────────────────

/**
 * When a partner takes the first photo at a property address,
 * lock them as the originator for ALL future opportunities at that address.
 * This is the patent-pending mechanism — first-mover gets the commission.
 */
export async function enforceOriginationLock(opts: {
  propertyAddress: string;
  sourcePartnerId: number;
  jobId: number;
}): Promise<{ locked: boolean; lockedPartnerId: number; isFirstVisit: boolean }> {
  const db = await getDb();
  if (!db) return { locked: false, lockedPartnerId: opts.sourcePartnerId, isFirstVisit: true };

  try {
    // Check if this address already has an originator in propertyProfiles
    const profileRows = await (db as any).execute(sql`
      SELECT id, homeownerName FROM propertyProfiles
      WHERE LOWER(address) LIKE LOWER(${`%${opts.propertyAddress.slice(0, 20)}%`})
      LIMIT 1
    `);
    const existingProfile = (profileRows.rows || profileRows)[0];

    if (!existingProfile) {
      // First visit to this address — create property profile with originator
      await (db as any).execute(sql`
        INSERT INTO propertyProfiles (address, totalJobsLogged, tradesServiced, detectionHistory)
        VALUES (${opts.propertyAddress}, 1, '[]', '[]')
        ON DUPLICATE KEY UPDATE totalJobsLogged = totalJobsLogged + 1
      `);

      // Record origination in Zep property entity
      await recordPropertyCondition({
        address: opts.propertyAddress,
        component: "origination_lock",
        condition: "good",
        notes: `First documented by partner ${opts.sourcePartnerId} via job ${opts.jobId}`,
        source: "origination_lock_agent",
        partnerId: opts.sourcePartnerId,
      }).catch(() => {});

      return { locked: true, lockedPartnerId: opts.sourcePartnerId, isFirstVisit: true };
    }

    // Address already documented — check who has origination
    const originRows = await (db as any).execute(sql`
      SELECT o.sourcePartnerId, COUNT(*) as cnt
      FROM opportunities o
      JOIN jobs j ON o.jobId = j.id
      WHERE LOWER(j.serviceAddress) LIKE LOWER(${`%${opts.propertyAddress.slice(0, 20)}%`})
        AND o.sourcePartnerId IS NOT NULL
      GROUP BY o.sourcePartnerId
      ORDER BY cnt DESC
      LIMIT 1
    `);
    const original = (originRows.rows || originRows)[0];

    const lockedPartnerId = original?.sourcePartnerId ?? opts.sourcePartnerId;

    return {
      locked: true,
      lockedPartnerId,
      isFirstVisit: false,
    };
  } catch (err) {
    console.error("[OriginationLock] Error:", err);
    return { locked: false, lockedPartnerId: opts.sourcePartnerId, isFirstVisit: true };
  }
}

// ─── Profile Completion Agent ─────────────────────────────────────────────────

export async function runProfileCompletionAgent(): Promise<{
  incompletePartners: number;
  incompleteHomeowners: number;
  nudgesSent: number;
}> {
  const db = await getDb();
  if (!db) return { incompletePartners: 0, incompleteHomeowners: 0, nudgesSent: 0 };

  let nudgesSent = 0;

  try {
    // Partners missing key profile elements
    const incompletePartnerRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM partners
      WHERE status = 'approved'
        AND (
          description IS NULL OR description = ''
          OR (SELECT COUNT(*) FROM partnerIntegrations WHERE partnerId = partners.id) = 0
        )
    `);
    const incompletePartners = parseInt((incompletePartnerRows.rows || incompletePartnerRows)[0]?.cnt ?? "0");

    // Homeowners without completed setup
    const incompleteHoRows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM homeownerProfiles WHERE setupComplete = 0
    `);
    const incompleteHomeowners = parseInt((incompleteHoRows.rows || incompleteHoRows)[0]?.cnt ?? "0");

    if (incompletePartners > 10) {
      await dashboard(
        `${incompletePartners} partners have incomplete profiles`,
        `Missing: business description, FSM integration, or service area. Complete profiles get 15 more PPS points.`,
        "profile_completion"
      );
    }

    return { incompletePartners, incompleteHomeowners, nudgesSent };
  } catch {
    return { incompletePartners: 0, incompleteHomeowners: 0, nudgesSent: 0 };
  }
}

// ─── Referral Agent ───────────────────────────────────────────────────────────

export async function runReferralAgent(): Promise<{
  activeReferrals: number;
  pendingBonuses: number;
  topReferrers: Array<{ partnerName: string; referralCount: number; bonusEarned: number }>;
}> {
  const db = await getDb();
  if (!db) return { activeReferrals: 0, pendingBonuses: 0, topReferrers: [] };

  try {
    const referralRows = await (db as any).execute(sql`
      SELECT
        p.businessName, p.partnersReferred, p.referralCount,
        p.totalCommissionEarned,
        (SELECT COUNT(*) FROM partners referred WHERE referred.referredByPartnerId = p.id AND referred.status = 'approved') as confirmedReferrals
      FROM partners p
      WHERE p.partnersReferred > 0 OR p.referralCount > 0
      ORDER BY p.partnersReferred DESC
      LIMIT 10
    `);
    const referrers = referralRows.rows || referralRows;

    const topReferrers = referrers.map((r: any) => ({
      partnerName: r.businessName,
      referralCount: parseInt(r.confirmedReferrals || "0"),
      bonusEarned: 0, // TODO: calculate from commission records
    }));

    const activeReferrals = referrers.reduce((s: number, r: any) => s + parseInt(r.confirmedReferrals || "0"), 0);

    return { activeReferrals, pendingBonuses: 0, topReferrers };
  } catch {
    return { activeReferrals: 0, pendingBonuses: 0, topReferrers: [] };
  }
}

// ─── Materials Pricing Agent ──────────────────────────────────────────────────

/**
 * Basic materials pricing intelligence.
 * Currently uses hardcoded DFW market rates from knowledge base.
 * Future: integrate with supplier APIs or Home Depot/Lowes pricing.
 */
export async function getMaterialsPricing(tradeType: string, jobScope?: string): Promise<{
  estimatedMaterialCost: number;
  estimatedLaborCost: number;
  totalEstimate: number;
  confidence: "high" | "medium" | "low";
  source: string;
}> {
  // DFW market rate knowledge base (from knowledge/trades/ files)
  const PRICING_DB: Record<string, { materials: number; labor: number }> = {
    roofing: { materials: 6000, labor: 4500 },
    hvac: { materials: 2500, labor: 1500 },
    hvac_maintenance: { materials: 50, labor: 120 },
    electrical: { materials: 400, labor: 800 },
    plumbing: { materials: 300, labor: 600 },
    fencing: { materials: 1800, labor: 1200 },
    landscaping: { materials: 800, labor: 1200 },
    pest_control: { materials: 80, labor: 120 },
    water_mitigation: { materials: 1500, labor: 3000 },
    foundation: { materials: 2000, labor: 6000 },
    tree_service: { materials: 200, labor: 1200 },
    gutter_cleaning: { materials: 20, labor: 200 },
    pressure_washing: { materials: 30, labor: 250 },
    interior_painting: { materials: 400, labor: 800 },
    exterior_painting: { materials: 600, labor: 1200 },
    flooring: { materials: 1500, labor: 1200 },
  };

  const key = tradeType.toLowerCase().replace(/[^a-z_]/g, "_");
  const pricing = PRICING_DB[key] ?? { materials: 500, labor: 800 };

  // Adjust for job scope if provided
  const scopeMultiplier = jobScope?.includes("full") || jobScope?.includes("replace") ? 1.5
    : jobScope?.includes("repair") ? 0.6
    : 1.0;

  return {
    estimatedMaterialCost: Math.round(pricing.materials * scopeMultiplier),
    estimatedLaborCost: Math.round(pricing.labor * scopeMultiplier),
    totalEstimate: Math.round((pricing.materials + pricing.labor) * scopeMultiplier),
    confidence: PRICING_DB[key] ? "medium" : "low",
    source: "ProLnk DFW Market Rate Database",
  };
}

// ─── Warranty Tracker Agent ───────────────────────────────────────────────────

export async function runWarrantyTrackerAgent(): Promise<{
  warrantiesTracked: number;
  expiringSoon: Array<{ propertyAddress: string; system: string; expiresDate: string }>;
}> {
  const db = await getDb();
  if (!db) return { warrantiesTracked: 0, expiringSoon: [] };

  try {
    // Look for appliance/system ages in home maintenance logs
    const warrantyRows = await (db as any).execute(sql`
      SELECT hml.systemType, hml.servicedAt, hml.notes, p.address,
             DATEDIFF(NOW(), hml.servicedAt) as daysSinceService
      FROM homeMaintenanceLogs hml
      JOIN properties p ON hml.propertyId = p.id
      WHERE hml.systemType IN ('hvac', 'water_heater', 'appliances', 'roofing')
        AND hml.servicedAt > DATE_SUB(NOW(), INTERVAL 10 YEAR)
      ORDER BY hml.servicedAt ASC
      LIMIT 100
    `).catch(() => ({ rows: [] }));

    const logs = warrantyRows.rows || warrantyRows;

    // Typical warranty periods
    const warrantyPeriods: Record<string, number> = {
      hvac: 10 * 365,        // 10-year compressor warranty typical
      water_heater: 6 * 365, // 6-year tank warranty typical
      appliances: 5 * 365,   // 5-year major appliance
      roofing: 25 * 365,     // 25-year shingle warranty
    };

    const expiringSoon = logs
      .filter((log: any) => {
        const warrantyDays = warrantyPeriods[log.systemType] ?? 3650;
        const daysUntilExpiry = warrantyDays - parseInt(log.daysSinceService || "0");
        return daysUntilExpiry > 0 && daysUntilExpiry < 365; // Expiring within a year
      })
      .slice(0, 10)
      .map((log: any) => {
        const warrantyDays = warrantyPeriods[log.systemType] ?? 3650;
        const expiryDate = new Date(new Date(log.servicedAt).getTime() + warrantyDays * 24 * 60 * 60 * 1000);
        return {
          propertyAddress: log.address,
          system: log.systemType,
          expiresDate: expiryDate.toLocaleDateString(),
        };
      });

    return { warrantiesTracked: logs.length, expiringSoon };
  } catch {
    return { warrantiesTracked: 0, expiringSoon: [] };
  }
}

// ─── Alert Triage Agent ───────────────────────────────────────────────────────

export async function runAlertTriageAgent(alerts: Array<{ type: string; content: string; partnerId?: number }>): Promise<
  Array<{ alert: any; tier: "ai_handled" | "dashboard" | "email"; priority: "urgent" | "normal" | "low"; assignedAction: string }>
> {
  const ALERT_ROUTING: Record<string, { tier: "ai_handled" | "dashboard" | "email"; priority: "urgent" | "normal" | "low"; action: string }> = {
    coi_expiring_soon: { tier: "dashboard", priority: "normal", action: "Send renewal reminder to partner" },
    coi_expired: { tier: "dashboard", priority: "urgent", action: "Restrict partner + send urgent renewal notice" },
    background_check_stale: { tier: "dashboard", priority: "normal", action: "Request background check renewal" },
    license_expiring_soon: { tier: "dashboard", priority: "normal", action: "Send license renewal reminder" },
    auto_suspended: { tier: "email", priority: "urgent", action: "Partner suspended — review and confirm" },
    payout_failure: { tier: "email", priority: "urgent", action: "Stripe transfer failed — investigate immediately" },
    fraud_flag: { tier: "email", priority: "urgent", action: "Potential fraud detected — manual review required" },
    weekly_cap_reset: { tier: "ai_handled", priority: "low", action: "Automated — no action needed" },
    storm_detected: { tier: "ai_handled", priority: "low", action: "Storm agent handling automatically" },
  };

  return alerts.map(alert => {
    const routing = ALERT_ROUTING[alert.type] ?? {
      tier: "dashboard" as const,
      priority: "normal" as const,
      action: "Review and handle",
    };
    return { alert, ...routing };
  });
}

// ─── Outreach Agent ───────────────────────────────────────────────────────────

export async function generatePartnerOutreach(opts: {
  targetType: "waitlist_pro" | "inactive_partner" | "new_partner" | "upsell";
  partnerName: string;
  partnerEmail: string;
  context?: string;
}): Promise<{ subject: string; html: string; text: string }> {
  const OUTREACH_PROMPTS: Record<string, string> = {
    waitlist_pro: "This person signed up for the ProLnk pro waitlist. Write a warm, personal outreach email explaining what ProLnk is and what to expect as a founding partner. Focus on the commission earning potential.",
    inactive_partner: "This partner joined ProLnk but hasn't logged any jobs in 30+ days. Write a re-engagement email that's encouraging, not shaming. Highlight how easy it is to start with CompanyCam integration.",
    new_partner: "This partner was just approved. Write an exciting welcome email that walks them through their first 3 steps to earning their first commission.",
    upsell: "This Scout-tier partner has been active for 60 days and earning commissions. Write an email explaining the benefits of upgrading to Pro tier (55% commission rate vs 40%, 15 ZIP codes vs 5).",
  };

  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic" as const,
    thinking: false,
    maxTokens: 1024,
    messages: [
      {
        role: "system",
        content: `You write personalized outreach emails for ProLnk, a home service partner referral network. Write in a direct, warm, conversational tone. No corporate speak. Sound like a founder reaching out personally. ${OUTREACH_PROMPTS[opts.targetType] ?? ""}`,
      },
      {
        role: "user",
        content: `Write an outreach email for: ${opts.partnerName} (${opts.partnerEmail})
${opts.context ? `Context: ${opts.context}` : ""}
Return JSON: { subject: string, html: string, text: string }`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "outreach_email",
        strict: true,
        schema: {
          type: "object",
          properties: { subject: { type: "string" }, html: { type: "string" }, text: { type: "string" } },
          required: ["subject", "html", "text"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? JSON.parse(content) : content;
  return parsed;
}

// ─── Ask-a-Pro Agent (enhanced) ───────────────────────────────────────────────

export async function runAskAProAgent(question: string, homeownerContext?: string): Promise<{
  answer: string;
  recommendedTrade: string | null;
  urgency: "immediate" | "routine" | "optional" | null;
  estimatedCost: string | null;
}> {
  const { queryKnowledge } = await import("../knowledge");
  const knowledgeContext = await queryKnowledge(question);

  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic" as const,
    thinking: false,
    maxTokens: 512,
    messages: [
      {
        role: "system",
        content: `You are "Ask a Pro" — TrustyPro's home advice expert. Answer homeowner questions about home maintenance, repair, and improvement. Be specific, practical, and DFW-aware. Always recommend connecting with a verified TrustyPro professional when work is involved.

Platform knowledge context: ${knowledgeContext.slice(0, 500)}`,
      },
      {
        role: "user",
        content: `Homeowner question: ${question}
${homeownerContext ? `Their home context: ${homeownerContext}` : ""}

Return JSON: { answer: string, recommendedTrade: string|null, urgency: "immediate"|"routine"|"optional"|null, estimatedCost: string|null }`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "pro_answer",
        strict: true,
        schema: {
          type: "object",
          properties: {
            answer: { type: "string" },
            recommendedTrade: { type: ["string", "null"] },
            urgency: { type: ["string", "null"], enum: ["immediate", "routine", "optional", null] },
            estimatedCost: { type: ["string", "null"] },
          },
          required: ["answer", "recommendedTrade", "urgency", "estimatedCost"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices?.[0]?.message?.content;
  return typeof content === "string" ? JSON.parse(content) : content;
}
