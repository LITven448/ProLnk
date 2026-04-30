/**
 * Knowledge Base — Qdrant Vector Store
 *
 * Platform knowledge (commission rules, trade categories, compliance requirements,
 * DFW coverage map, Scout protocols) is stored as markdown files in /knowledge/
 * and embedded into Qdrant for fast semantic retrieval.
 *
 * Agents query the knowledge base to answer platform-specific questions
 * without hallucinating or guessing.
 *
 * Install: pnpm add @qdrant/js-client-rest
 * Self-hosted: docker run -p 6333:6333 qdrant/qdrant
 * Cloud: cloud.qdrant.io
 */

let _qdrantClient: any = null;

const COLLECTION_NAME = "platform_knowledge";
const EMBEDDING_MODEL = "text-embedding-3-small";

async function getQdrantClient() {
  if (!_qdrantClient) {
    const url = process.env.QDRANT_URL ?? "http://localhost:6333";
    const apiKey = process.env.QDRANT_API_KEY;
    try {
      const { QdrantClient } = await import("@qdrant/js-client-rest");
      _qdrantClient = new QdrantClient({ url, apiKey });
    } catch {
      console.warn("[Qdrant] SDK not installed. Run: pnpm add @qdrant/js-client-rest");
      return null;
    }
  }
  return _qdrantClient;
}

async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
    });
    if (!res.ok) return [];
    const data = await res.json() as any;
    return data.data?.[0]?.embedding ?? [];
  } catch {
    return [];
  }
}

// ─── Query knowledge base ─────────────────────────────────────────────────────

/**
 * Query the platform knowledge base for context relevant to a question.
 * Used by all agents to answer platform-specific questions.
 */
export async function queryKnowledge(question: string, limit = 5): Promise<string> {
  const qdrant = await getQdrantClient();
  if (!qdrant) return "";

  try {
    const embedding = await embedText(question);
    if (!embedding.length) return "";

    const results = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit,
      with_payload: true,
    });

    if (!results.length) return "";

    return results
      .map((r: any) => (r.payload?.content as string) || "")
      .filter(Boolean)
      .join("\n\n---\n\n");
  } catch (err) {
    console.error("[Qdrant] Knowledge query failed:", err);
    return "";
  }
}

/**
 * Query with a specific filter (e.g., only compliance documents).
 */
export async function queryKnowledgeByCategory(
  question: string,
  category: "platform" | "compliance" | "trades" | "dfw",
  limit = 3
): Promise<string> {
  const qdrant = await getQdrantClient();
  if (!qdrant) return "";

  try {
    const embedding = await embedText(question);
    if (!embedding.length) return "";

    const results = await qdrant.search(COLLECTION_NAME, {
      vector: embedding,
      limit,
      with_payload: true,
      filter: {
        must: [{ key: "category", match: { value: category } }],
      },
    });

    return results
      .map((r: any) => (r.payload?.content as string) || "")
      .filter(Boolean)
      .join("\n\n---\n\n");
  } catch {
    return "";
  }
}

// ─── Upsert a knowledge document ──────────────────────────────────────────────

export async function upsertKnowledgeDocument(doc: {
  id: string;
  content: string;
  title: string;
  category: string;
  filePath: string;
}): Promise<boolean> {
  const qdrant = await getQdrantClient();
  if (!qdrant) return false;

  try {
    // Ensure collection exists
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some((c: any) => c.name === COLLECTION_NAME);

    if (!exists) {
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: { size: 1536, distance: "Cosine" },
      });
      console.log(`[Qdrant] Created collection: ${COLLECTION_NAME}`);
    }

    const embedding = await embedText(doc.content);
    if (!embedding.length) return false;

    // Generate a deterministic numeric ID from the string ID
    const numericId = Math.abs(doc.id.split("").reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0)) % 1000000000;

    await qdrant.upsert(COLLECTION_NAME, {
      points: [{
        id: numericId,
        vector: embedding,
        payload: {
          content: doc.content,
          title: doc.title,
          category: doc.category,
          filePath: doc.filePath,
          docId: doc.id,
          updatedAt: new Date().toISOString(),
        },
      }],
    });

    return true;
  } catch (err) {
    console.error("[Qdrant] Upsert failed:", err);
    return false;
  }
}

// ─── Health check ─────────────────────────────────────────────────────────────

export async function checkQdrantConnection(): Promise<boolean> {
  const qdrant = await getQdrantClient();
  if (!qdrant) return false;
  try {
    await qdrant.getCollections();
    return true;
  } catch {
    return false;
  }
}

export async function getKnowledgeBaseStats(): Promise<{ collections: number; documentCount: number } | null> {
  const qdrant = await getQdrantClient();
  if (!qdrant) return null;
  try {
    const collections = await qdrant.getCollections();
    const targetCollection = collections.collections.find((c: any) => c.name === COLLECTION_NAME);
    if (!targetCollection) return { collections: collections.collections.length, documentCount: 0 };

    const info = await qdrant.getCollection(COLLECTION_NAME);
    return {
      collections: collections.collections.length,
      documentCount: info.points_count ?? 0,
    };
  } catch {
    return null;
  }
}
