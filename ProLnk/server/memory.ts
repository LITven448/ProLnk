/**
 * Mem0 Integration — Short-Term & Session Memory
 *
 * Mem0 handles the "soft" preference memory — what this homeowner
 * said in a conversation, what a partner tends to do, what this
 * agent has learned about its domain.
 *
 * Three memory layers:
 *   - user memory: homeowner style prefs, communication prefs
 *   - session memory: current conversation context
 *   - agent memory: what each agent has learned (lead routing patterns, etc.)
 *
 * Install: pnpm add mem0ai
 * Self-hosted: mem0 connects to Qdrant for vector storage
 */

let _mem0Client: any = null;

async function getMem0Client() {
  if (!_mem0Client) {
    try {
      const { default: MemoryClient } = await import("mem0ai");
      _mem0Client = new MemoryClient({
        apiKey: process.env.MEM0_API_KEY || "m0-local",
        // For self-hosted against Qdrant:
        // host: process.env.MEM0_HOST,
      });
    } catch {
      console.warn("[Mem0] SDK not installed. Run: pnpm add mem0ai");
      return null;
    }
  }
  return _mem0Client;
}

// ─── User Memory (Homeowner Preferences) ─────────────────────────────────────

export async function addUserMemory(userId: string, memory: string): Promise<void> {
  const mem0 = await getMem0Client();
  if (!mem0) return;
  try {
    await mem0.add([{ role: "user", content: memory }], { user_id: userId });
  } catch (err) {
    console.error("[Mem0] Failed to add user memory:", err);
  }
}

export async function searchUserMemory(userId: string, query: string, limit = 5): Promise<string[]> {
  const mem0 = await getMem0Client();
  if (!mem0) return [];
  try {
    const results = await mem0.search(query, { user_id: userId, limit });
    return (results ?? []).map((r: any) => r.memory || r.text || "");
  } catch {
    return [];
  }
}

export async function getUserMemoryContext(userId: string): Promise<string> {
  const memories = await searchUserMemory(userId, "style preferences budget design priorities");
  if (!memories.length) return "";
  return `Known homeowner preferences: ${memories.join(". ")}`;
}

// ─── Agent Memory ─────────────────────────────────────────────────────────────

export async function addAgentMemory(agentId: string, memory: string): Promise<void> {
  const mem0 = await getMem0Client();
  if (!mem0) return;
  try {
    await mem0.add([{ role: "assistant", content: memory }], { agent_id: agentId });
  } catch (err) {
    console.error("[Mem0] Failed to add agent memory:", err);
  }
}

export async function searchAgentMemory(agentId: string, query: string, limit = 5): Promise<string[]> {
  const mem0 = await getMem0Client();
  if (!mem0) return [];
  try {
    const results = await mem0.search(query, { agent_id: agentId, limit });
    return (results ?? []).map((r: any) => r.memory || r.text || "");
  } catch {
    return [];
  }
}

// ─── Session Memory ───────────────────────────────────────────────────────────

export async function addSessionMemory(sessionId: string, role: "user" | "assistant", content: string): Promise<void> {
  const mem0 = await getMem0Client();
  if (!mem0) return;
  try {
    await mem0.add([{ role, content }], { run_id: sessionId });
  } catch (err) {
    console.error("[Mem0] Failed to add session memory:", err);
  }
}

export async function getSessionMemory(sessionId: string): Promise<Array<{ role: string; content: string }>> {
  const mem0 = await getMem0Client();
  if (!mem0) return [];
  try {
    const memories = await mem0.getAll({ run_id: sessionId });
    return (memories ?? []).map((m: any) => ({ role: "assistant", content: m.memory || m.text || "" }));
  } catch {
    return [];
  }
}

// ─── Specific use cases ───────────────────────────────────────────────────────

/**
 * Remember homeowner room makeover style preferences for future sessions.
 * Called after every makeover session is completed.
 */
export async function rememberMakeoverPreferences(opts: {
  homeownerEmail: string;
  roomType: string;
  designStyle: string;
  colorPalette: string;
  budget: string;
  priorities: string[];
  additionalNotes?: string;
}): Promise<void> {
  const memory = `Homeowner ${opts.homeownerEmail} prefers ${opts.designStyle} style for ${opts.roomType} with ${opts.colorPalette} colors, budget ${opts.budget}. Top priorities: ${opts.priorities.join(", ")}.${opts.additionalNotes ? ` Notes: ${opts.additionalNotes}` : ""}`;
  await addUserMemory(opts.homeownerEmail, memory);
}

/**
 * Remember partner lead preferences from their accept/decline history.
 * Called by lead routing agent after each acceptance/decline.
 */
export async function rememberPartnerLeadPattern(opts: {
  partnerId: number;
  action: "accepted" | "declined";
  opportunityType: string;
  estimatedValue: number;
  reason?: string;
}): Promise<void> {
  const memory = `Partner ${opts.partnerId} ${opts.action} a ${opts.opportunityType} lead worth $${opts.estimatedValue.toFixed(0)}${opts.reason ? ` (reason: ${opts.reason})` : ""}`;
  await addAgentMemory("lead_routing_agent", memory);
}

/**
 * Get context for the room makeover AI conversation.
 * Injects past preferences into the system prompt.
 */
export async function getMakeoverContext(homeownerEmail: string): Promise<string> {
  return getUserMemoryContext(homeownerEmail);
}

/**
 * Get context for the lead routing agent.
 * Returns learned patterns about which partners accept which lead types.
 */
export async function getRoutingContext(opportunityType: string): Promise<string> {
  const memories = await searchAgentMemory("lead_routing_agent", `${opportunityType} acceptance patterns`);
  if (!memories.length) return "";
  return `Lead routing context: ${memories.join(". ")}`;
}
