/**
 * Graphiti Integration — Temporal Knowledge Graph (replaces Zep)
 *
 * Graphiti is an open-source temporal knowledge graph built for AI agents.
 * Same conceptual model as Zep (bi-temporal facts) but self-hostable and
 * built on Neo4j under the hood.
 *
 * Env vars required (when ready to enable):
 *   GRAPHITI_API_URL  — e.g. http://graphiti:8000 or hosted endpoint
 *   GRAPHITI_API_KEY  — optional, depending on deployment
 *
 * Until the Graphiti service is provisioned, every export here is a safe
 * no-op so callers (smart routing, scout assessments, sub-agents, etc.)
 * continue to work without throwing.
 *
 * Session/group_id conventions match the old Zep contract so we don't have
 * to refactor every call site:
 *   property:{address-slug}
 *   partner:{partnerId}
 *   homeowner:{email-slug}
 *   assessment:{assessmentId}
 */

function toSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function graphitiEnabled(): boolean {
  return !!process.env.GRAPHITI_API_URL;
}

async function postEpisode(groupId: string, name: string, body: Record<string, unknown>): Promise<void> {
  if (!graphitiEnabled()) return;
  try {
    const url = `${process.env.GRAPHITI_API_URL!.replace(/\/+$/, "")}/messages`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.GRAPHITI_API_KEY) headers["Authorization"] = `Bearer ${process.env.GRAPHITI_API_KEY}`;
    await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        group_id: groupId,
        messages: [{
          name,
          role_type: "assistant",
          role: "prolnk_system",
          content: JSON.stringify(body),
          timestamp: new Date().toISOString(),
        }],
      }),
    });
  } catch (err) {
    console.error("[Graphiti] postEpisode failed:", err instanceof Error ? err.message : err);
  }
}

async function searchGraph(groupId: string, query: string, limit = 10): Promise<any[]> {
  if (!graphitiEnabled()) return [];
  try {
    const url = `${process.env.GRAPHITI_API_URL!.replace(/\/+$/, "")}/search`;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.GRAPHITI_API_KEY) headers["Authorization"] = `Bearer ${process.env.GRAPHITI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ group_ids: [groupId], query, max_facts: limit }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.facts ?? [];
  } catch {
    return [];
  }
}

// ─── Property Memory ──────────────────────────────────────────────────────────

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
  await postEpisode(`property:${toSlug(data.address)}`, "condition_recorded", {
    event: "condition_recorded",
    ...data,
    recordedAt: new Date().toISOString(),
  });
}

export async function queryPropertyHistory(address: string, query: string): Promise<any[]> {
  return searchGraph(`property:${toSlug(address)}`, query, 10);
}

export async function getPropertyContext(address: string): Promise<string | null> {
  const facts = await searchGraph(`property:${toSlug(address)}`, "summary", 20);
  if (!facts.length) return null;
  return facts.map((f: any) => f?.fact ?? f?.content ?? "").filter(Boolean).join("\n");
}

export async function recordJobAtProperty(data: {
  address: string;
  serviceType: string;
  partnerName: string;
  jobValue?: number;
  completedAt: Date;
  notes?: string;
}): Promise<void> {
  await postEpisode(`property:${toSlug(data.address)}`, "job_completed", {
    event: "job_completed",
    ...data,
    completedAt: data.completedAt.toISOString(),
  });
}

// ─── Partner Memory ───────────────────────────────────────────────────────────

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
  await postEpisode(`partner:${data.partnerId}`, data.event, {
    ...data,
    recordedAt: new Date().toISOString(),
  });
}

export async function queryPartnerBehavior(partnerId: number, query: string): Promise<any[]> {
  return searchGraph(`partner:${partnerId}`, query, 5);
}

// ─── Homeowner Memory ─────────────────────────────────────────────────────────

export async function recordHomeownerPreference(data: {
  homeownerEmail: string;
  preference: string;
  value: string;
  context?: string;
}): Promise<void> {
  await postEpisode(`homeowner:${toSlug(data.homeownerEmail)}`, "preference_recorded", {
    event: "preference_recorded",
    ...data,
    recordedAt: new Date().toISOString(),
  });
}

export async function getHomeownerContext(email: string): Promise<string | null> {
  const facts = await searchGraph(`homeowner:${toSlug(email)}`, "preferences", 20);
  if (!facts.length) return null;
  return facts.map((f: any) => f?.fact ?? f?.content ?? "").filter(Boolean).join("\n");
}

// ─── Scout Assessment Memory ──────────────────────────────────────────────────

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
  const groupId = `property:${toSlug(data.address)}`;
  await postEpisode(groupId, "scout_assessment_complete", {
    event: "scout_assessment_complete",
    assessmentId: data.assessmentId,
    healthScore: data.healthScore,
    totalFindings: data.findings.length,
    criticalFindings: data.findings.filter(f => ["safety_hazard", "code_violation"].includes(f.urgency)).length,
    totalEstimatedCost: data.findings.reduce((s, f) => s + (f.estimatedRepairCost || 0), 0),
    assessedAt: new Date().toISOString(),
    scoutPartnerId: data.scoutPartnerId,
  });

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
}

// ─── Health Check ─────────────────────────────────────────────────────────────

export async function checkGraphitiConnection(): Promise<boolean> {
  if (!graphitiEnabled()) return false;
  try {
    const url = `${process.env.GRAPHITI_API_URL!.replace(/\/+$/, "")}/healthcheck`;
    const res = await fetch(url);
    return res.ok;
  } catch {
    return false;
  }
}

// Back-compat alias used by older callers
export const checkZepConnection = checkGraphitiConnection;
