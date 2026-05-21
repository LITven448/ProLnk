/**
 * LangGraph — Stateful AI agent orchestration
 * Used for: complex multi-step flows that need state across steps
 *   - Lead routing: scan photo → detect issues → find pros → send notifications
 *   - Home onboarding: collect address → scan photos → build vault → match pros
 *   - Storm response: detect event → find affected properties → notify partners → track responses
 */
import { StateGraph, END, START } from "@langchain/langgraph";
import { searchMemories, addMemory } from "./mem0.js";
import { logPropertyEvent, getPropertyTimeline } from "./graphiti.js";
import { findMatchingPartners, upsertProperty } from "./qdrant.js";

// ─── Lead Routing Graph ───────────────────────────────────────────────────────

interface LeadRoutingState {
  propertyAddress: string;
  photoUrl: string;
  detectedIssues: string[];
  matchedPartners: Array<{ id: string; score: number; trade: string }>;
  notificationsSent: boolean;
  error?: string;
}

async function analyzePhoto(state: LeadRoutingState): Promise<Partial<LeadRoutingState>> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !state.photoUrl) {
    return { detectedIssues: [] };
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: "Analyze this home photo. List specific maintenance issues detected, one per line. Focus on HVAC, roofing, plumbing, electrical, structural, and safety concerns." },
            { type: "image_url", image_url: { url: state.photoUrl } },
          ],
        }],
        max_tokens: 500,
      }),
    });
    const data = await res.json() as any;
    const text = data.choices?.[0]?.message?.content ?? "";
    const issues = text.split("\n").filter((l: string) => l.trim().length > 5);
    return { detectedIssues: issues };
  } catch (err) {
    console.error("[LangGraph] Photo analysis failed:", err);
    return { detectedIssues: [], error: String(err) };
  }
}

async function storeInMemory(state: LeadRoutingState): Promise<Partial<LeadRoutingState>> {
  if (state.detectedIssues.length === 0) return {};

  // Log to Zep property timeline
  await logPropertyEvent({
    address: state.propertyAddress,
    eventType: "photo_scan",
    description: `AI scan detected ${state.detectedIssues.length} issues: ${state.detectedIssues.slice(0, 3).join(", ")}`,
    metadata: { issueCount: state.detectedIssues.length },
  });

  // Store in Qdrant for semantic matching
  await upsertProperty({
    id: Buffer.from(state.propertyAddress).toString("base64").slice(0, 20),
    address: state.propertyAddress,
    city: state.propertyAddress.split(",").slice(-2, -1)[0]?.trim() ?? "",
    state: state.propertyAddress.split(",").slice(-1)[0]?.trim() ?? "TX",
    detectedIssues: state.detectedIssues,
    serviceHistory: [],
  });

  return {};
}

async function routeToPartners(state: LeadRoutingState): Promise<Partial<LeadRoutingState>> {
  if (state.detectedIssues.length === 0) return { matchedPartners: [] };

  const issueText = state.detectedIssues.join(" ");
  const matches = await findMatchingPartners({
    issueDescription: issueText,
    city: state.propertyAddress.split(",").slice(-2, -1)[0]?.trim() ?? "",
    limit: 3,
  });

  return {
    matchedPartners: matches.map(m => ({
      id: m.id,
      score: m.score,
      trade: String(m.payload.trade ?? "General"),
    })),
  };
}

async function sendNotifications(state: LeadRoutingState): Promise<Partial<LeadRoutingState>> {
  if (state.matchedPartners.length === 0) return { notificationsSent: false };

  // Log notifications to property timeline
  await logPropertyEvent({
    address: state.propertyAddress,
    eventType: "quote_requested",
    description: `Lead routed to ${state.matchedPartners.length} partners: ${state.matchedPartners.map(p => p.trade).join(", ")}`,
    metadata: { partnerIds: state.matchedPartners.map(p => p.id) },
  });

  console.log(`[LangGraph] Notified ${state.matchedPartners.length} partners for ${state.propertyAddress}`);
  return { notificationsSent: true };
}

// Build the lead routing graph
export function buildLeadRoutingGraph() {
  const graph = new StateGraph<LeadRoutingState>({
    channels: {
      propertyAddress: { value: (x: string, y?: string) => y ?? x },
      photoUrl: { value: (x: string, y?: string) => y ?? x },
      detectedIssues: { value: (x: string[], y?: string[]) => y ?? x, default: () => [] },
      matchedPartners: { value: (x: any[], y?: any[]) => y ?? x, default: () => [] },
      notificationsSent: { value: (x: boolean, y?: boolean) => y ?? x, default: () => false },
      error: { value: (x: string | undefined, y?: string) => y ?? x },
    },
  });

  graph
    .addNode("analyze_photo", analyzePhoto)
    .addNode("store_in_memory", storeInMemory)
    .addNode("route_to_partners", routeToPartners)
    .addNode("send_notifications", sendNotifications)
    .addEdge(START, "analyze_photo")
    .addEdge("analyze_photo", "store_in_memory")
    .addEdge("store_in_memory", "route_to_partners")
    .addEdge("route_to_partners", "send_notifications")
    .addEdge("send_notifications", END);

  return graph.compile();
}

// ─── Run the lead routing pipeline ───────────────────────────────────────────

export async function runLeadRoutingPipeline(params: {
  propertyAddress: string;
  photoUrl: string;
}): Promise<{
  detectedIssues: string[];
  matchedPartners: Array<{ id: string; score: number; trade: string }>;
  notificationsSent: boolean;
}> {
  try {
    const graph = buildLeadRoutingGraph();
    const result = await graph.invoke({
      propertyAddress: params.propertyAddress,
      photoUrl: params.photoUrl,
      detectedIssues: [],
      matchedPartners: [],
      notificationsSent: false,
    });

    return {
      detectedIssues: result.detectedIssues,
      matchedPartners: result.matchedPartners,
      notificationsSent: result.notificationsSent,
    };
  } catch (err) {
    console.error("[LangGraph] Lead routing pipeline failed:", err);
    return { detectedIssues: [], matchedPartners: [], notificationsSent: false };
  }
}
