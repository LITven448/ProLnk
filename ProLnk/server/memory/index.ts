/**
 * Memory Layer — ProLnk / TrustyPro
 *
 * Stack:
 *   Mem0    → Short-term session memory (preferences, conversation context)
 *   Zep     → Long-term temporal memory (property timeline, service history)
 *   Qdrant  → Vector semantic search (lead matching, similar properties)
 *   LangGraph → Stateful agent pipelines (photo → issues → match → notify)
 *
 * All exports are safe no-ops if underlying packages are not installed.
 */

// Safe re-exports with try/catch to prevent crash if packages missing
export * from "./qdrant.js"; // Qdrant has local fallback, always safe

// Lazy safe exports for packages that might not be installed
export async function addMemorySafe(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
  content: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const { addMemory } = await import("./mem0.js");
    await addMemory(params);
  } catch (err) {
    // mem0ai not available yet — silently skip
  }
}

export async function searchMemoriesSafe(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
  query: string;
  limit?: number;
}): Promise<Array<{ id: string; memory: string; score: number }>> {
  try {
    const { searchMemories } = await import("./mem0.js");
    return await searchMemories(params);
  } catch {
    return [];
  }
}

export async function logPropertyEventSafe(params: {
  address: string;
  eventType: "service_completed" | "photo_scan" | "issue_detected" | "quote_requested" | "inspection";
  description: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const { logPropertyEvent } = await import("./zep.js");
    await logPropertyEvent(params);
  } catch {
    // zep-cloud not available yet — silently skip
  }
}

export async function getPropertyTimelineSafe(params: {
  address: string;
  limit?: number;
}): Promise<Array<{ content: string; timestamp: string; eventType: string }>> {
  try {
    const { getPropertyTimeline } = await import("./zep.js");
    return await getPropertyTimeline(params);
  } catch {
    return [];
  }
}

export async function runLeadRoutingPipelineSafe(params: {
  propertyAddress: string;
  photoUrl: string;
}): Promise<{
  detectedIssues: string[];
  matchedPartners: Array<{ id: string; score: number; trade: string }>;
  notificationsSent: boolean;
}> {
  try {
    const { runLeadRoutingPipeline } = await import("./langgraph-agents.js");
    return await runLeadRoutingPipeline(params);
  } catch {
    return { detectedIssues: [], matchedPartners: [], notificationsSent: false };
  }
}
