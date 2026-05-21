/**
 * Graphiti — Temporal / long-term episodic memory (replaces Zep)
 *
 * Same shape as the old Zep client — these helpers no-op when
 * GRAPHITI_API_URL is not set so the rest of the system keeps working.
 *
 * Group IDs:
 *   property_<slug>
 *   homeowner_<userId>
 *   partner_<partnerId>
 */

function propertyGroupId(address: string): string {
  return `property_${address.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

function homeownerGroupId(userId: string): string {
  return `homeowner_${userId}`;
}

function partnerGroupId(partnerId: string): string {
  return `partner_${partnerId}`;
}

function enabled(): boolean {
  return !!process.env.GRAPHITI_API_URL;
}

function baseUrl(): string {
  return process.env.GRAPHITI_API_URL!.replace(/\/+$/, "");
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.GRAPHITI_API_KEY) h["Authorization"] = `Bearer ${process.env.GRAPHITI_API_KEY}`;
  return h;
}

async function addEpisode(groupId: string, name: string, content: string, metadata?: Record<string, unknown>): Promise<void> {
  if (!enabled()) return;
  try {
    await fetch(`${baseUrl()}/messages`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        group_id: groupId,
        messages: [{
          name,
          role_type: "assistant",
          role: "prolnk_system",
          content,
          timestamp: new Date().toISOString(),
          source_description: metadata ? JSON.stringify(metadata) : undefined,
        }],
      }),
    });
  } catch (err) {
    console.warn("[Graphiti] addEpisode failed:", err instanceof Error ? err.message : err);
  }
}

async function searchFacts(groupId: string, query: string, limit = 10): Promise<any[]> {
  if (!enabled()) return [];
  try {
    const res = await fetch(`${baseUrl()}/search`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ group_ids: [groupId], query, max_facts: limit }),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.facts ?? [];
  } catch {
    return [];
  }
}

// ─── Property Timeline ────────────────────────────────────────────────────────

export async function logPropertyEvent(params: {
  address: string;
  eventType: "service_completed" | "photo_scan" | "issue_detected" | "quote_requested" | "inspection";
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  await addEpisode(
    propertyGroupId(params.address),
    params.eventType,
    `[${params.eventType.toUpperCase()}] ${params.description}`,
    { eventType: params.eventType, timestamp: new Date().toISOString(), ...params.metadata },
  );
}

export async function getPropertyTimeline(params: {
  address: string;
  limit?: number;
}): Promise<Array<{ content: string; timestamp: string; eventType: string }>> {
  const facts = await searchFacts(propertyGroupId(params.address), "timeline", params.limit ?? 50);
  return facts.map((f: any) => ({
    content: f?.fact ?? f?.content ?? "",
    timestamp: f?.valid_at ?? f?.created_at ?? "",
    eventType: f?.name ?? "event",
  }));
}

export async function searchPropertyHistory(params: {
  address: string;
  query: string;
}): Promise<string> {
  const facts = await searchFacts(propertyGroupId(params.address), params.query, 5);
  return facts.map((f: any) => f?.fact ?? f?.content ?? "").filter(Boolean).join("\n");
}

// ─── Homeowner Session Memory ─────────────────────────────────────────────────

export async function logHomeownerInteraction(params: {
  userId: string;
  role: "user" | "assistant";
  content: string;
}): Promise<void> {
  await addEpisode(
    homeownerGroupId(params.userId),
    `${params.role}_message`,
    params.content,
    { role: params.role },
  );
}

export async function getHomeownerContext(userId: string): Promise<string> {
  const facts = await searchFacts(homeownerGroupId(userId), "context", 20);
  return facts.map((f: any) => f?.fact ?? f?.content ?? "").filter(Boolean).join("\n");
}

// ─── Partner Memory ───────────────────────────────────────────────────────────

export async function logPartnerInteraction(params: {
  partnerId: string;
  role: "user" | "assistant";
  content: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  await addEpisode(
    partnerGroupId(params.partnerId),
    `${params.role}_message`,
    params.content,
    { role: params.role, ...params.metadata },
  );
}

export async function getPartnerContext(partnerId: string): Promise<string> {
  const facts = await searchFacts(partnerGroupId(partnerId), "context", 20);
  return facts.map((f: any) => f?.fact ?? f?.content ?? "").filter(Boolean).join("\n");
}
