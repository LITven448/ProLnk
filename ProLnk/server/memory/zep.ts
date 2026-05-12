/**
 * Zep — Temporal / long-term episodic memory
 * Stores: property service history timeline, homeowner interaction history
 * Use for: "What happened at 123 Main St over the past 2 years?"
 *          "When was the last HVAC service at this address?"
 *          "Show me the full timeline of this homeowner's requests"
 */
import { ZepClient } from "@getzep/zep-cloud";

let zepClient: ZepClient | null = null;

function getZepClient(): ZepClient {
  if (!zepClient) {
    const apiKey = process.env.ZEP_API_KEY;
    if (!apiKey) {
      throw new Error("ZEP_API_KEY not set — get one at app.getzep.com");
    }
    zepClient = new ZepClient({ apiKey });
  }
  return zepClient;
}

// Session ID helpers — Zep organizes memory by sessions
function propertySessionId(address: string): string {
  return `property_${address.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

function homeownerSessionId(userId: string): string {
  return `homeowner_${userId}`;
}

function partnerSessionId(partnerId: string): string {
  return `partner_${partnerId}`;
}

// ─── Property Timeline (the Home Health Vault backbone) ───────────────────────

// Log an event to a property's timeline
export async function logPropertyEvent(params: {
  address: string;
  eventType: "service_completed" | "photo_scan" | "issue_detected" | "quote_requested" | "inspection";
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const client = getZepClient();
    const sessionId = propertySessionId(params.address);

    // Ensure session exists
    try {
      await client.memory.getSession(sessionId);
    } catch {
      await client.memory.addSession({
        sessionId,
        metadata: {
          address: params.address,
          type: "property_timeline",
          createdAt: new Date().toISOString(),
        },
      });
    }

    // Add the event as a message
    await client.memory.add(sessionId, {
      messages: [{
        role: "system",
        roleType: "system",
        content: `[${params.eventType.toUpperCase()}] ${params.description}`,
        metadata: {
          eventType: params.eventType,
          timestamp: new Date().toISOString(),
          ...params.metadata,
        },
      }],
    });
  } catch (err) {
    console.warn("[Zep] Failed to log property event:", err);
  }
}

// Get full timeline for a property
export async function getPropertyTimeline(params: {
  address: string;
  limit?: number;
}): Promise<Array<{ content: string; timestamp: string; eventType: string }>> {
  try {
    const client = getZepClient();
    const sessionId = propertySessionId(params.address);
    const memory = await client.memory.get(sessionId);

    return (memory.messages || []).slice(0, params.limit ?? 50).map((m: any) => ({
      content: m.content,
      timestamp: m.metadata?.timestamp ?? m.createdAt ?? "",
      eventType: m.metadata?.eventType ?? "event",
    }));
  } catch (err) {
    console.warn("[Zep] Failed to get property timeline:", err);
    return [];
  }
}

// Search property history semantically
export async function searchPropertyHistory(params: {
  address: string;
  query: string;
}): Promise<string> {
  try {
    const client = getZepClient();
    const sessionId = propertySessionId(params.address);
    const results = await client.memory.search(sessionId, {
      text: params.query,
      limit: 5,
    });

    if (!results || results.length === 0) return "";
    return results.map((r: any) => r.message?.content ?? "").filter(Boolean).join("\n");
  } catch (err) {
    console.warn("[Zep] Property search failed:", err);
    return "";
  }
}

// ─── Homeowner Session Memory ─────────────────────────────────────────────────

// Log a homeowner interaction
export async function logHomeownerInteraction(params: {
  userId: string;
  role: "user" | "assistant";
  content: string;
}): Promise<void> {
  try {
    const client = getZepClient();
    const sessionId = homeownerSessionId(params.userId);

    try {
      await client.memory.getSession(sessionId);
    } catch {
      await client.memory.addSession({
        sessionId,
        metadata: { userId: params.userId, type: "homeowner" },
      });
    }

    await client.memory.add(sessionId, {
      messages: [{
        role: params.role,
        roleType: params.role === "user" ? "user" : "assistant",
        content: params.content,
      }],
    });
  } catch (err) {
    console.warn("[Zep] Failed to log homeowner interaction:", err);
  }
}

// Get homeowner context for AI
export async function getHomeownerContext(userId: string): Promise<string> {
  try {
    const client = getZepClient();
    const sessionId = homeownerSessionId(userId);
    const memory = await client.memory.get(sessionId);
    return memory.context ?? "";
  } catch (err) {
    console.warn("[Zep] Failed to get homeowner context:", err);
    return "";
  }
}

// ─── Partner Session Memory ───────────────────────────────────────────────────

export async function logPartnerInteraction(params: {
  partnerId: string;
  role: "user" | "assistant";
  content: string;
}): Promise<void> {
  try {
    const client = getZepClient();
    const sessionId = partnerSessionId(params.partnerId);

    try {
      await client.memory.getSession(sessionId);
    } catch {
      await client.memory.addSession({
        sessionId,
        metadata: { partnerId: params.partnerId, type: "partner" },
      });
    }

    await client.memory.add(sessionId, {
      messages: [{
        role: params.role,
        roleType: params.role === "user" ? "user" : "assistant",
        content: params.content,
      }],
    });
  } catch (err) {
    console.warn("[Zep] Failed to log partner interaction:", err);
  }
}

export async function getPartnerContext(partnerId: string): Promise<string> {
  try {
    const client = getZepClient();
    const sessionId = partnerSessionId(partnerId);
    const memory = await client.memory.get(sessionId);
    return memory.context ?? "";
  } catch (err) {
    console.warn("[Zep] Failed to get partner context:", err);
    return "";
  }
}
