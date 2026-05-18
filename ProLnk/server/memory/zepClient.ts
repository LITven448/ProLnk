import { ZepConfig, ZepMemoryRecord } from "../_core/memoryTypes";

export class ZepClient {
  private apiKey: string;
  private baseUrl: string;
  private sessionTTL: number;

  constructor(config: ZepConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
    this.sessionTTL = config.sessionTTL;
  }

  async addMemory(
    sessionId: string,
    record: ZepMemoryRecord
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/sessions/${sessionId}/memory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            messages: [
              {
                timestamp: new Date(record.timestamp).toISOString(),
                content: `[${record.agentId}] ${record.action}: ${JSON.stringify(record.result)}`,
                role: "system",
              },
            ],
            metadata: {
              agentId: record.agentId,
              action: record.action,
              ...record.metadata,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error(
          `[Zep] Add memory failed: ${response.statusText}`
        );
        return false;
      }
      return true;
    } catch (err) {
      console.error(
        `[Zep] Add memory error: ${err instanceof Error ? err.message : String(err)}`
      );
      return false;
    }
  }

  async getMemory(sessionId: string): Promise<ZepMemoryRecord[] | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/sessions/${sessionId}/memory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.messages || [];
    } catch (err) {
      console.error(
        `[Zep] Get memory error: ${err instanceof Error ? err.message : String(err)}`
      );
      return null;
    }
  }

  async searchMemory(
    sessionId: string,
    query: string,
    limit: number = 5
  ): Promise<ZepMemoryRecord[] | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/sessions/${sessionId}/memory/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            query,
            limit,
          }),
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error(
        `[Zep] Search memory error: ${err instanceof Error ? err.message : String(err)}`
      );
      return null;
    }
  }

  async createSession(agentId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            metadata: {
              agentId,
              createdAt: new Date().toISOString(),
            },
            ttl: this.sessionTTL,
          }),
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.uuid;
    } catch (err) {
      console.error(
        `[Zep] Create session error: ${err instanceof Error ? err.message : String(err)}`
      );
      return null;
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/v1/sessions/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.ok;
    } catch (err) {
      console.error(
        `[Zep] Delete session error: ${err instanceof Error ? err.message : String(err)}`
      );
      return false;
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey && !!this.baseUrl;
  }
}
