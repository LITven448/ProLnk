import { memoryService } from "./memoryService";

export interface AgentConfig {
  id: string;
  name: string;
  stalenessKey?: string;
}

export interface WrappedAgentResult<T> {
  success: boolean;
  data?: T;
  cached: boolean;
  fromMemory: boolean;
  duration: number;
  error?: string;
}

export class AgentWrapper {
  static async execute<T>(
    config: AgentConfig,
    handler: () => Promise<T>,
    cacheKey?: string
  ): Promise<WrappedAgentResult<T>> {
    const startTime = Date.now();
    const key = cacheKey || `${config.id}_result`;

    try {
      if (!memoryService.isConfigured()) {
        const data = await handler();
        return {
          success: true,
          data,
          cached: false,
          fromMemory: false,
          duration: Date.now() - startTime,
        };
      }

      const memory = await memoryService.getMemory(config.id, key);

      if (memory.found && !memory.isStale) {
        return {
          success: true,
          data: memory.value as T,
          cached: true,
          fromMemory: true,
          duration: Date.now() - startTime,
        };
      }

      const data = await handler();
      const duration = Date.now() - startTime;

      await memoryService.setMemory(config.id, key, data);

      return {
        success: true,
        data,
        cached: false,
        fromMemory: false,
        duration,
      };
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorMsg =
        err instanceof Error ? err.message : String(err);

      await memoryService.logAction(
        config.id,
        "execute",
        null,
        duration,
        errorMsg
      );

      return {
        success: false,
        cached: false,
        fromMemory: false,
        duration,
        error: errorMsg,
      };
    }
  }

  static async executeWithDecision<T>(
    config: AgentConfig,
    decision: string,
    reasoning: string,
    handler: () => Promise<T>
  ): Promise<WrappedAgentResult<T>> {
    const startTime = Date.now();

    try {
      const data = await handler();
      const duration = Date.now() - startTime;

      await memoryService.logDecision(
        config.id,
        decision,
        reasoning,
        data
      );

      await memoryService.logAction(
        config.id,
        `decision_${decision}`,
        data,
        duration
      );

      return {
        success: true,
        data,
        cached: false,
        fromMemory: false,
        duration,
      };
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorMsg =
        err instanceof Error ? err.message : String(err);

      await memoryService.logDecision(
        config.id,
        decision,
        reasoning,
        { error: errorMsg }
      );

      return {
        success: false,
        cached: false,
        fromMemory: false,
        duration,
        error: errorMsg,
      };
    }
  }

  static async checkMemory(
    agentId: string,
    query: string
  ): Promise<boolean> {
    if (!memoryService.isConfigured()) return false;
    return memoryService.check(agentId, query);
  }

  static async searchMemory(
    agentId: string,
    query: string,
    limit?: number
  ): Promise<any[] | null> {
    if (!memoryService.isConfigured()) return null;
    return memoryService.searchMemory(agentId, query, limit);
  }
}
