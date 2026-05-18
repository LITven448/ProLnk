import { Mem0Client } from "../memory/mem0Client";
import { ZepClient } from "../memory/zepClient";
import {
  memoryConfig,
  getMem0Configured,
  getZepConfigured,
} from "./memory";
import {
  MemoryQueryResult,
  ZepMemoryRecord,
  AgentMemoryContext,
} from "./memoryTypes";

class MemoryService {
  private mem0: Mem0Client | null;
  private zep: ZepClient | null;
  private sessionCache: Map<string, string> = new Map();

  constructor() {
    if (getMem0Configured()) {
      this.mem0 = new Mem0Client(memoryConfig.mem0);
    }
    if (getZepConfigured()) {
      this.zep = new ZepClient(memoryConfig.zep);
    }
  }

  async getMemory(
    agentId: string,
    key: string
  ): Promise<MemoryQueryResult> {
    if (!this.mem0 && !this.zep) {
      return { found: false, isStale: false };
    }

    const staleTtl = memoryConfig.staleness[key] || 3600;
    const now = Date.now();

    if (this.mem0) {
      try {
        const result = await this.mem0.retrieveMemory(agentId, key);
        if (result) {
          const parsed = this.parseMemoryValue(result);
          const age = now - (parsed.timestamp || 0);
          const isStale = age > staleTtl * 1000;

          return {
            found: true,
            value: parsed.value,
            isStale,
            age: Math.floor(age / 1000),
          };
        }
      } catch (err) {
        console.error(`[MemoryService] Mem0 get error: ${err}`);
      }
    }

    return { found: false, isStale: false };
  }

  async setMemory(
    agentId: string,
    key: string,
    value: unknown,
    ttl?: number
  ): Promise<boolean> {
    if (!this.mem0 && !this.zep) {
      return false;
    }

    const timestamp = Date.now();

    if (this.mem0) {
      try {
        const message = `Stored ${key}: ${JSON.stringify(value)}`;
        const success = await this.mem0.storeMemory(agentId, message, {
          key,
          timestamp,
          ttl: ttl || memoryConfig.staleness[key],
        });

        if (success) return true;
      } catch (err) {
        console.error(`[MemoryService] Mem0 set error: ${err}`);
      }
    }

    if (this.zep) {
      try {
        const sessionId = await this.getOrCreateSession(agentId);
        if (sessionId) {
          const record: ZepMemoryRecord = {
            agentId,
            timestamp,
            action: `set_${key}`,
            result: value,
            metadata: {
              success: true,
              duration: 0,
            },
          };

          return await this.zep.addMemory(sessionId, record);
        }
      } catch (err) {
        console.error(`[MemoryService] Zep set error: ${err}`);
      }
    }

    return false;
  }

  async check(agentId: string, query: string): Promise<boolean> {
    if (!this.mem0 && !this.zep) return false;

    if (this.mem0) {
      try {
        const result = await this.mem0.retrieveMemory(agentId, query);
        return !!result;
      } catch (err) {
        console.error(`[MemoryService] Check error: ${err}`);
      }
    }

    return false;
  }

  async logDecision(
    agentId: string,
    decision: string,
    reasoning: string,
    outcome?: unknown
  ): Promise<boolean> {
    if (!this.zep) return false;

    try {
      const sessionId = await this.getOrCreateSession(agentId);
      if (sessionId) {
        const record: ZepMemoryRecord = {
          agentId,
          timestamp: Date.now(),
          action: "decision",
          result: {
            decision,
            reasoning,
            outcome,
          },
          metadata: {
            success: true,
          },
        };

        return await this.zep.addMemory(sessionId, record);
      }
    } catch (err) {
      console.error(`[MemoryService] Log decision error: ${err}`);
    }

    return false;
  }

  async logAction(
    agentId: string,
    action: string,
    result: unknown,
    duration: number,
    error?: string
  ): Promise<boolean> {
    if (!this.zep) return false;

    try {
      const sessionId = await this.getOrCreateSession(agentId);
      if (sessionId) {
        const record: ZepMemoryRecord = {
          agentId,
          timestamp: Date.now(),
          action,
          result,
          metadata: {
            success: !error,
            duration,
            error,
          },
        };

        return await this.zep.addMemory(sessionId, record);
      }
    } catch (err) {
      console.error(`[MemoryService] Log action error: ${err}`);
    }

    return false;
  }

  async searchMemory(
    agentId: string,
    query: string,
    limit: number = 5
  ): Promise<ZepMemoryRecord[] | null> {
    if (!this.zep) return null;

    try {
      const sessionId = await this.getOrCreateSession(agentId);
      if (sessionId) {
        return await this.zep.searchMemory(sessionId, query, limit);
      }
    } catch (err) {
      console.error(`[MemoryService] Search error: ${err}`);
    }

    return null;
  }

  async clearStale(agentId: string, maxAge: number): Promise<boolean> {
    if (!this.mem0) return false;

    try {
      return await this.mem0.clearMemory(agentId);
    } catch (err) {
      console.error(`[MemoryService] Clear stale error: ${err}`);
    }

    return false;
  }

  private async getOrCreateSession(agentId: string): Promise<string | null> {
    if (!this.zep) return null;

    const cacheKey = `session_${agentId}`;
    if (this.sessionCache.has(cacheKey)) {
      return this.sessionCache.get(cacheKey) || null;
    }

    try {
      const sessionId = await this.zep.createSession(agentId);
      if (sessionId) {
        this.sessionCache.set(cacheKey, sessionId);
        return sessionId;
      }
    } catch (err) {
      console.error(`[MemoryService] Create session error: ${err}`);
    }

    return null;
  }

  private parseMemoryValue(
    raw: string
  ): { value: unknown; timestamp: number } {
    try {
      const parsed = JSON.parse(raw);
      return {
        value: parsed.value || parsed,
        timestamp: parsed.timestamp || Date.now(),
      };
    } catch {
      return { value: raw, timestamp: Date.now() };
    }
  }

  isConfigured(): boolean {
    return !!this.mem0 || !!this.zep;
  }
}

export const memoryService = new MemoryService();
