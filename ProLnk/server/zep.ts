/**
 * Zep v2 Integration — Long-Term Memory Layer
 *
 * Zep v2 uses a bi-temporal knowledge graph. Every fact stored has
 * valid_from/valid_to timestamps, enabling queries like:
 *   "What was the condition of this roof as of March 2024?"
 *
 * This makes it perfect for the Home Health Vault — tracking property
 * system conditions over time as each service visit adds new data.
 *
 * Session ID conventions:
 *   Property: "property:{address-slug}"
 *   Partner:  "partner:{partnerId}"
 *   Homeowner: "homeowner:{email-slug}"
 *   Scout:    "assessment:{assessmentId}"
 *
 * Install: pnpm add @getzep/zep-cloud
 */

let _zepClient: any = null;

async function getZepClient() {
  if (!_zepClient) {
    const apiKey = process.env.ZEP_API_KEY;
    if (!apiKey) return null;
    try {
      const { ZepClient } = await import("@getzep/zep-cloud");
      _zepClient = new ZepClient({ apiKey });
    } catch (err) {
      console.warn("[Zep] SDK not installed. Run: pnpm add @getzep/zep-cloud");
      return null;
    }
  }
  return _zepClient;
}

function toSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 80);
}

// ─── Property Memory ──────────────────────────────────────────────────────────

/**
 * Record a home system condition observation to the property's Zep memory.
 * Called after every photo waterfall Tier 3 analysis.
 */
export async function recordPropertyCondition(data: {
  address: string;
  component: string;
  condition: "good" | "fair" | "poor" | "critical" | "unknown";
  estimatedAge?: number;
  notes: string;
  source: string;
  partnerId?: number;
  estimatedRepairCost?: number;
  tradeType?: string;
  photoUrl?: string;
}): Promise<void> {
  const zep = await getZepClient();
  if (!zep) return;

  const sessionId = `property:${toSlug(data.address)}`;

  try {
    // Ensure session exists
    try {
      await zep.memory.getSession(sessionId);
    } catch {
      await zep.memory.addSession({ sessionId, metadata: { address: data.address, type: "property" } });
    }

    await zep.memory.add(sessionId, {
      messages: [{
        roleType: "assistant",
        role: "home_health_scanner",
        content: JSON.stringify({
          event: "condition_recorded",
          component: data.component,
          condition: data.condition,
          estimatedAge: data.estimatedAge,
          notes: data.notes,
          source: data.source,
          partnerId: data.partnerId,
          estimatedRepairCost: data.estimatedRepairCost,
          tradeType: data.tradeType,
          photoUrl: data.photoUrl,
          recordedAt: new Date().toISOString(),
        }),
      }],
    });
  } catch (err) {
    console.error("[Zep] Failed to record property condition:", err);
  }
}

/**
 * Query a property's history for a specific system or condition.
 */
export async function queryPropertyHistory(address: string, query: string): Promise<any[]> {
  const zep = await getZepClient();
  if (!zep) return [];

  const sessionId = `property:${toSlug(address)}`;

  try {
    const results = await zep.memory.search(sessionId, { text: query, limit: 10 });
    return results?.results ?? [];
  } catch {
    return [];
  }
}

/**
 * Get the full property context (summary of all known facts).
 */
export async function getPropertyContext(address: string): Promise<string | null> {
  const zep = await getZepClient();
  if (!zep) return null;

  const sessionId = `property:${toSlug(address)}`;

  try {
    const memory = await zep.memory.get(sessionId);
    return memory?.context ?? null;
  } catch {
    return null;
  }
}

/**
 * Record a completed job to the property's history.
 */
export async function recordJobAtProperty(data: {
  address: string;
  serviceType: string;
  partnerName: string;
  jobValue?: number;
  completedAt: Date;
  notes?: string;
}): Promise<void> {
  const zep = await getZepClient();
  if (!zep) return;

  const sessionId = `property:${toSlug(data.address)}`;

  try {
    try { await zep.memory.getSession(sessionId); } catch {
      await zep.memory.addSession({ sessionId, metadata: { address: data.address, type: "property" } });
    }

    await zep.memory.add(sessionId, {
      messages: [{
        roleType: "assistant",
        role: "prolnk_system",
        content: JSON.stringify({
          event: "job_completed",
          serviceType: data.serviceType,
          partnerName: data.partnerName,
          jobValue: data.jobValue,
          completedAt: data.completedAt.toISOString(),
          notes: data.notes,
        }),
      }],
    });
  } catch (err) {
    console.error("[Zep] Failed to record job at property:", err);
  }
}

// ─── Partner Memory ───────────────────────────────────────────────────────────

/**
 * Record a partner action for behavioral learning.
 * Used by the PPS engine to understand partner patterns.
 */
export async function recordPartnerAction(data: {
  partnerId: number;
  partnerName: string;
  event: "lead_accepted" | "lead_declined" | "job_completed" | "lead_expired";
  opportunityType?: string;
  estimatedValue?: number;
  reason?: string;
  responseTimeHours?: number;
  zipCode?: string;
}): Promise<void> {
  const zep = await getZepClient();
  if (!zep) return;

  const sessionId = `partner:${data.partnerId}`;

  try {
    try { await zep.memory.getSession(sessionId); } catch {
      await zep.memory.addSession({
        sessionId,
        metadata: { partnerId: data.partnerId, partnerName: data.partnerName, type: "partner" },
      });
    }

    await zep.memory.add(sessionId, {
      messages: [{
        roleType: "assistant",
        role: "prolnk_system",
        content: JSON.stringify({
          ...data,
          recordedAt: new Date().toISOString(),
        }),
      }],
    });
  } catch (err) {
    console.error("[Zep] Failed to record partner action:", err);
  }
}

/**
 * Query partner's behavioral patterns.
 * Example: "what trade types does this partner tend to decline?"
 */
export async function queryPartnerBehavior(partnerId: number, query: string): Promise<any[]> {
  const zep = await getZepClient();
  if (!zep) return [];

  const sessionId = `partner:${partnerId}`;

  try {
    const results = await zep.memory.search(sessionId, { text: query, limit: 5 });
    return results?.results ?? [];
  } catch {
    return [];
  }
}

// ─── Homeowner Memory ─────────────────────────────────────────────────────────

/**
 * Record homeowner preferences (style, budget, priorities).
 * Called from room makeover conversations and homeowner settings.
 */
export async function recordHomeownerPreference(data: {
  homeownerEmail: string;
  preference: string;
  value: string;
  context?: string;
}): Promise<void> {
  const zep = await getZepClient();
  if (!zep) return;

  const sessionId = `homeowner:${toSlug(data.homeownerEmail)}`;

  try {
    try { await zep.memory.getSession(sessionId); } catch {
      await zep.memory.addSession({
        sessionId,
        metadata: { email: data.homeownerEmail, type: "homeowner" },
      });
    }

    await zep.memory.add(sessionId, {
      messages: [{
        roleType: "user",
        role: "homeowner",
        content: JSON.stringify({
          event: "preference_recorded",
          preference: data.preference,
          value: data.value,
          context: data.context,
          recordedAt: new Date().toISOString(),
        }),
      }],
    });
  } catch (err) {
    console.error("[Zep] Failed to record homeowner preference:", err);
  }
}

/**
 * Get homeowner's style and preference context for AI prompts.
 */
export async function getHomeownerContext(email: string): Promise<string | null> {
  const zep = await getZepClient();
  if (!zep) return null;

  const sessionId = `homeowner:${toSlug(email)}`;

  try {
    const memory = await zep.memory.get(sessionId);
    return memory?.context ?? null;
  } catch {
    return null;
  }
}

// ─── Scout Assessment Memory ──────────────────────────────────────────────────

/**
 * Record all findings from a Scout assessment to the property's memory.
 * Creates a comprehensive property intelligence record in Zep.
 */
export async function recordScoutAssessment(data: {
  address: string;
  assessmentId: number;
  healthScore: number;
  findings: Array<{
    componentName: string;
    condition: string;
    urgency: string;
    estimatedRepairCost?: number;
    tradeType: string;
    notes?: string;
  }>;
  scoutPartnerId: number;
}): Promise<void> {
  const zep = await getZepClient();
  if (!zep) return;

  const sessionId = `property:${toSlug(data.address)}`;

  try {
    try { await zep.memory.getSession(sessionId); } catch {
      await zep.memory.addSession({ sessionId, metadata: { address: data.address, type: "property" } });
    }

    // Record the assessment summary
    await zep.memory.add(sessionId, {
      messages: [{
        roleType: "assistant",
        role: "scout_system",
        content: JSON.stringify({
          event: "scout_assessment_complete",
          assessmentId: data.assessmentId,
          healthScore: data.healthScore,
          totalFindings: data.findings.length,
          criticalFindings: data.findings.filter(f => ["safety_hazard","code_violation"].includes(f.urgency)).length,
          totalEstimatedCost: data.findings.reduce((s, f) => s + (f.estimatedRepairCost || 0), 0),
          tradeSummary: Object.entries(
            data.findings.reduce((acc, f) => ({ ...acc, [f.tradeType]: (acc[f.tradeType] || 0) + 1 }), {} as Record<string, number>)
          ).map(([trade, count]) => ({ trade, count })),
          assessedAt: new Date().toISOString(),
          scoutPartnerId: data.scoutPartnerId,
        }),
      }],
    });

    // Record each finding individually
    for (const finding of data.findings) {
      await recordPropertyCondition({
        address: data.address,
        component: finding.componentName,
        condition: finding.condition as any,
        notes: finding.notes || `${finding.urgency} urgency`,
        source: `scout_assessment_${data.assessmentId}`,
        partnerId: data.scoutPartnerId,
        estimatedRepairCost: finding.estimatedRepairCost,
        tradeType: finding.tradeType,
      });
    }
  } catch (err) {
    console.error("[Zep] Failed to record scout assessment:", err);
  }
}

// ─── Bulk Zep Health Check ────────────────────────────────────────────────────

export async function checkZepConnection(): Promise<boolean> {
  const zep = await getZepClient();
  if (!zep) return false;
  try {
    // Try a lightweight API call
    await zep.memory.getSession("health-check").catch(() => {});
    return true;
  } catch {
    return false;
  }
}
