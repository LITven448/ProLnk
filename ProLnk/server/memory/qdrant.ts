/**
 * Qdrant Vector Database — Semantic search for ProLnk
 * Collections:
 *   - properties: Home embeddings for similarity matching
 *   - partners: Pro skill/service embeddings for lead routing
 *   - jobs: Historical job embeddings for AI recommendations
 */
import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL || "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

let client: QdrantClient | null = null;

export function getQdrantClient(): QdrantClient {
  if (!client) {
    client = new QdrantClient({
      url: QDRANT_URL,
      ...(QDRANT_API_KEY ? { apiKey: QDRANT_API_KEY } : {}),
    });
  }
  return client;
}

// Collection names
export const COLLECTIONS = {
  PROPERTIES: "prolnk_properties",
  PARTNERS: "prolnk_partners",
  JOBS: "prolnk_jobs",
} as const;

// Vector dimensions — OpenAI text-embedding-3-small = 1536
const VECTOR_SIZE = 1536;

export async function ensureCollections(): Promise<void> {
  const qdrant = getQdrantClient();

  for (const collection of Object.values(COLLECTIONS)) {
    try {
      await qdrant.getCollection(collection);
    } catch {
      await qdrant.createCollection(collection, {
        vectors: {
          size: VECTOR_SIZE,
          distance: "Cosine",
        },
      });
      console.log(`[Qdrant] Created collection: ${collection}`);
    }
  }
}

// Embed text using OpenAI
async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not set");

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  const data = await res.json() as any;
  return data.data[0].embedding;
}

// Upsert a property embedding
export async function upsertProperty(params: {
  id: string;
  address: string;
  city: string;
  state: string;
  detectedIssues: string[];
  serviceHistory: string[];
}): Promise<void> {
  const qdrant = getQdrantClient();
  const text = [
    params.address,
    params.city,
    params.state,
    ...params.detectedIssues,
    ...params.serviceHistory,
  ].join(" ");

  const vector = await embedText(text);

  await qdrant.upsert(COLLECTIONS.PROPERTIES, {
    points: [{
      id: params.id,
      vector,
      payload: {
        address: params.address,
        city: params.city,
        state: params.state,
        detectedIssues: params.detectedIssues,
      },
    }],
  });
}

// Upsert a partner embedding
export async function upsertPartner(params: {
  id: string;
  businessName: string;
  trade: string;
  serviceArea: string;
  skills: string[];
}): Promise<void> {
  const qdrant = getQdrantClient();
  const text = [
    params.businessName,
    params.trade,
    params.serviceArea,
    ...params.skills,
  ].join(" ");

  const vector = await embedText(text);

  await qdrant.upsert(COLLECTIONS.PARTNERS, {
    points: [{
      id: params.id,
      vector,
      payload: {
        businessName: params.businessName,
        trade: params.trade,
        serviceArea: params.serviceArea,
      },
    }],
  });
}

// Find best matching partners for a property issue
export async function findMatchingPartners(params: {
  issueDescription: string;
  city: string;
  limit?: number;
}): Promise<Array<{ id: string; score: number; payload: Record<string, unknown> }>> {
  const qdrant = getQdrantClient();
  const vector = await embedText(`${params.issueDescription} ${params.city}`);

  const results = await qdrant.search(COLLECTIONS.PARTNERS, {
    vector,
    limit: params.limit ?? 5,
    with_payload: true,
  });

  return results.map(r => ({
    id: String(r.id),
    score: r.score,
    payload: (r.payload as Record<string, unknown>) ?? {},
  }));
}

// Find similar properties
export async function findSimilarProperties(params: {
  address: string;
  issues: string[];
  limit?: number;
}): Promise<Array<{ id: string; score: number; payload: Record<string, unknown> }>> {
  const qdrant = getQdrantClient();
  const vector = await embedText([params.address, ...params.issues].join(" "));

  const results = await qdrant.search(COLLECTIONS.PROPERTIES, {
    vector,
    limit: params.limit ?? 10,
    with_payload: true,
  });

  return results.map(r => ({
    id: String(r.id),
    score: r.score,
    payload: (r.payload as Record<string, unknown>) ?? {},
  }));
}
