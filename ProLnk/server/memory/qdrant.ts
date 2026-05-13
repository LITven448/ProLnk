/**
 * Qdrant Vector Database — Semantic search for ProLnk
 * Collections:
 *   - properties: Home embeddings for similarity matching
 *   - partners: Pro skill/service embeddings for lead routing
 *   - jobs: Historical job embeddings for AI recommendations
 *
 * LOCAL FALLBACK: When QDRANT_URL is unset or set to "local",
 * uses an in-memory Map with cosine similarity — no cloud account needed.
 */
import { QdrantClient } from "@qdrant/js-client-rest";

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

const USE_LOCAL = !QDRANT_URL || QDRANT_URL === "local";

// Collection names
export const COLLECTIONS = {
  PROPERTIES: "prolnk_properties",
  PARTNERS: "prolnk_partners",
  JOBS: "prolnk_jobs",
} as const;

type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];

// Vector dimensions — OpenAI text-embedding-3-small = 1536
const VECTOR_SIZE = 1536;

// ---------------------------------------------------------------------------
// In-memory store
// ---------------------------------------------------------------------------

interface VectorPoint {
  vector: number[];
  payload: Record<string, unknown>;
}

const inMemoryStore = new Map<CollectionName, Map<string, VectorPoint>>();

function getCollection(name: CollectionName): Map<string, VectorPoint> {
  if (!inMemoryStore.has(name)) {
    inMemoryStore.set(name, new Map());
  }
  return inMemoryStore.get(name)!;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

function localUpsert(
  collection: CollectionName,
  id: string,
  vector: number[],
  payload: Record<string, unknown>,
): void {
  getCollection(collection).set(id, { vector, payload });
}

function localSearch(
  collection: CollectionName,
  queryVector: number[],
  limit: number,
): Array<{ id: string; score: number; payload: Record<string, unknown> }> {
  const store = getCollection(collection);
  const results: Array<{ id: string; score: number; payload: Record<string, unknown> }> = [];

  for (const [id, point] of store.entries()) {
    results.push({
      id,
      score: cosineSimilarity(queryVector, point.vector),
      payload: point.payload,
    });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Qdrant Cloud client (used only when QDRANT_URL is a real URL)
// ---------------------------------------------------------------------------

let cloudClient: QdrantClient | null = null;

function getQdrantClient(): QdrantClient {
  if (!cloudClient) {
    cloudClient = new QdrantClient({
      url: QDRANT_URL!,
      ...(QDRANT_API_KEY ? { apiKey: QDRANT_API_KEY } : {}),
    });
  }
  return cloudClient;
}

export async function ensureCollections(): Promise<void> {
  if (USE_LOCAL) {
    for (const name of Object.values(COLLECTIONS)) {
      getCollection(name as CollectionName);
    }
    console.log("[Qdrant] Using in-memory vector store (local mode)");
    return;
  }

  const qdrant = getQdrantClient();
  for (const collection of Object.values(COLLECTIONS)) {
    try {
      await qdrant.getCollection(collection);
    } catch {
      await qdrant.createCollection(collection, {
        vectors: { size: VECTOR_SIZE, distance: "Cosine" },
      });
      console.log(`[Qdrant] Created collection: ${collection}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Embedding
// ---------------------------------------------------------------------------

async function embedText(text: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    // Deterministic pseudo-embedding for local dev when no OpenAI key is set.
    // Not semantically meaningful but keeps the interface working end-to-end.
    const seed = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const vec: number[] = [];
    let x = seed;
    for (let i = 0; i < VECTOR_SIZE; i++) {
      x = (x * 1664525 + 1013904223) & 0xffffffff;
      vec.push(((x >>> 0) / 0xffffffff) * 2 - 1);
    }
    const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
    return vec.map(v => v / mag);
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "text-embedding-3-small", input: text }),
  });

  const data = (await res.json()) as { data: Array<{ embedding: number[] }> };
  return data.data[0].embedding;
}

// ---------------------------------------------------------------------------
// Public API — same interface regardless of mode
// ---------------------------------------------------------------------------

export async function upsertProperty(params: {
  id: string;
  address: string;
  city: string;
  state: string;
  detectedIssues: string[];
  serviceHistory: string[];
}): Promise<void> {
  const text = [
    params.address,
    params.city,
    params.state,
    ...params.detectedIssues,
    ...params.serviceHistory,
  ].join(" ");

  const vector = await embedText(text);

  if (USE_LOCAL) {
    localUpsert(COLLECTIONS.PROPERTIES, params.id, vector, {
      address: params.address,
      city: params.city,
      state: params.state,
      detectedIssues: params.detectedIssues,
    });
    return;
  }

  await getQdrantClient().upsert(COLLECTIONS.PROPERTIES, {
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

export async function upsertPartner(params: {
  id: string;
  businessName: string;
  trade: string;
  serviceArea: string;
  skills: string[];
}): Promise<void> {
  const text = [
    params.businessName,
    params.trade,
    params.serviceArea,
    ...params.skills,
  ].join(" ");

  const vector = await embedText(text);

  if (USE_LOCAL) {
    localUpsert(COLLECTIONS.PARTNERS, params.id, vector, {
      businessName: params.businessName,
      trade: params.trade,
      serviceArea: params.serviceArea,
    });
    return;
  }

  await getQdrantClient().upsert(COLLECTIONS.PARTNERS, {
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

export async function findMatchingPartners(params: {
  issueDescription: string;
  city: string;
  limit?: number;
}): Promise<Array<{ id: string; score: number; payload: Record<string, unknown> }>> {
  const vector = await embedText(`${params.issueDescription} ${params.city}`);
  const limit = params.limit ?? 5;

  if (USE_LOCAL) {
    return localSearch(COLLECTIONS.PARTNERS, vector, limit);
  }

  const results = await getQdrantClient().search(COLLECTIONS.PARTNERS, {
    vector,
    limit,
    with_payload: true,
  });

  return results.map(r => ({
    id: String(r.id),
    score: r.score,
    payload: (r.payload as Record<string, unknown>) ?? {},
  }));
}

export async function findSimilarProperties(params: {
  address: string;
  issues: string[];
  limit?: number;
}): Promise<Array<{ id: string; score: number; payload: Record<string, unknown> }>> {
  const vector = await embedText([params.address, ...params.issues].join(" "));
  const limit = params.limit ?? 10;

  if (USE_LOCAL) {
    return localSearch(COLLECTIONS.PROPERTIES, vector, limit);
  }

  const results = await getQdrantClient().search(COLLECTIONS.PROPERTIES, {
    vector,
    limit,
    with_payload: true,
  });

  return results.map(r => ({
    id: String(r.id),
    score: r.score,
    payload: (r.payload as Record<string, unknown>) ?? {},
  }));
}
