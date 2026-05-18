export interface MemoryEntry {
  agentId: string;
  key: string;
  value: unknown;
  timestamp: number;
  ttl?: number;
  metadata?: Record<string, unknown>;
}

export interface MemoryStalenessConfig {
  [key: string]: number;
}

export interface Mem0Config {
  apiKey: string;
  baseUrl: string;
  orgId: string;
  userId: string;
}

export interface ZepConfig {
  apiKey: string;
  baseUrl: string;
  sessionTTL: number;
}

export interface AgentMemoryContext {
  agentId: string;
  sessionId: string;
  userId?: string;
}

export interface MemoryQueryResult {
  found: boolean;
  value?: unknown;
  isStale: boolean;
  age?: number;
}

export interface ZepMemoryRecord {
  agentId: string;
  timestamp: number;
  action: string;
  result: unknown;
  metadata: {
    success: boolean;
    duration?: number;
    error?: string;
  };
}

export interface AgentDecision {
  agentId: string;
  decision: string;
  reasoning: string;
  timestamp: number;
  outcome?: unknown;
}
