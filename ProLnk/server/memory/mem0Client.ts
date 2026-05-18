import { Mem0Config } from "../_core/memoryTypes";

export class Mem0Client {
  private apiKey: string;
  private baseUrl: string;
  private orgId: string;
  private userId: string;

  constructor(config: Mem0Config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl;
    this.orgId = config.orgId;
    this.userId = config.userId;
  }

  async storeMemory(
    agentId: string,
    message: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/memories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${this.apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `[${agentId}] ${message}`,
            },
          ],
          metadata: {
            agentId,
            ...metadata,
          },
        }),
      });

      if (!response.ok) {
        console.error(`[Mem0] Store failed: ${response.statusText}`);
        return false;
      }
      return true;
    } catch (err) {
      console.error(`[Mem0] Store error: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  async retrieveMemory(
    agentId: string,
    query: string
  ): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseUrl}/memories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const memories = data.results || [];

      const relevant = memories.filter(
        (m: any) => m.metadata?.agentId === agentId && m.content?.includes(query)
      );

      if (relevant.length === 0) return null;

      return relevant[0].content;
    } catch (err) {
      console.error(`[Mem0] Retrieve error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  }

  async clearMemory(agentId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/memories`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${this.apiKey}`,
        },
      });

      if (!response.ok) return false;

      const data = await response.json();
      const memories = data.results || [];
      const toDelete = memories.filter((m: any) => m.metadata?.agentId === agentId);

      for (const mem of toDelete) {
        await fetch(`${this.baseUrl}/memories/${mem.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Token ${this.apiKey}`,
          },
        });
      }

      return true;
    } catch (err) {
      console.error(`[Mem0] Clear error: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey && !!this.baseUrl && !!this.orgId;
  }
}
