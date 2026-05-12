/**
 * Mem0 — Short-term / session memory layer
 * Stores: homeowner preferences, partner profile facts, conversation context
 * Use for: "this user prefers HVAC pros with 5+ years", "they mentioned their roof is 8 years old"
 */
import MemoryClient from "mem0ai";

let mem0Client: MemoryClient | null = null;

function getMem0Client(): MemoryClient {
  if (!mem0Client) {
    const apiKey = process.env.MEM0_API_KEY;
    if (!apiKey) {
      throw new Error("MEM0_API_KEY not set — get one at app.mem0.ai");
    }
    mem0Client = new MemoryClient({ apiKey });
  }
  return mem0Client;
}

// Add a memory for a user
export async function addMemory(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
  content: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const client = getMem0Client();
    await client.add(
      [{ role: "user", content: params.content }],
      {
        user_id: `${params.userType}_${params.userId}`,
        metadata: params.metadata,
      }
    );
  } catch (err) {
    console.warn("[Mem0] Failed to add memory:", err);
  }
}

// Search memories relevant to a query
export async function searchMemories(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
  query: string;
  limit?: number;
}): Promise<Array<{ id: string; memory: string; score: number }>> {
  try {
    const client = getMem0Client();
    const results = await client.search(params.query, {
      user_id: `${params.userType}_${params.userId}`,
      limit: params.limit ?? 5,
    });
    return (results as any[]).map((r: any) => ({
      id: r.id,
      memory: r.memory,
      score: r.score ?? 1,
    }));
  } catch (err) {
    console.warn("[Mem0] Search failed:", err);
    return [];
  }
}

// Get all memories for a user
export async function getAllMemories(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
}): Promise<Array<{ id: string; memory: string; createdAt: string }>> {
  try {
    const client = getMem0Client();
    const results = await client.getAll({
      user_id: `${params.userType}_${params.userId}`,
    });
    return (results as any[]).map((r: any) => ({
      id: r.id,
      memory: r.memory,
      createdAt: r.created_at,
    }));
  } catch (err) {
    console.warn("[Mem0] GetAll failed:", err);
    return [];
  }
}

// Build a memory-enriched system prompt for AI conversations
export async function buildMemoryContext(params: {
  userId: string;
  userType: "homeowner" | "partner" | "admin";
  currentQuery: string;
}): Promise<string> {
  const memories = await searchMemories({
    userId: params.userId,
    userType: params.userType,
    query: params.currentQuery,
    limit: 5,
  });

  if (memories.length === 0) return "";

  return `\n\nRelevant context about this user:\n${memories.map(m => `- ${m.memory}`).join("\n")}`;
}
