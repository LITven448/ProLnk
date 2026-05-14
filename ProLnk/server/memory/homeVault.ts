/**
 * Home Health Vault — TrustyPro memory layer
 *
 * Stores home scan results and property facts across two backends:
 *   Qdrant  → Vector embeddings of scan text for semantic retrieval
 *   Mem0    → Structured key facts (year built, health score, issues)
 *
 * Collection used: prolnk_properties (already defined in qdrant.ts)
 */

import { upsertProperty, findSimilarProperties, COLLECTIONS } from "./qdrant.js";
import { addMemory, searchMemories } from "./mem0.js";

export interface ScanResult {
  scanId: string;
  scannedAt: string;
  photoUrls?: string[];
  detectedIssues: string[];
  healthScore: number;
  recommendations: string[];
  aiConfidence?: number;
}

export interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  yearBuilt?: number;
  squareFootage?: number;
  homeownerId: string;
}

export interface HomeHealthRecord {
  scanId: string;
  scannedAt: string;
  detectedIssues: string[];
  healthScore: number;
  recommendations: string[];
  address: string;
  aiConfidence?: number;
}

/**
 * Stores a home health scan result in both Qdrant (vector search) and Mem0 (key facts).
 * Safe no-op if either backend is unavailable.
 */
export async function storeHomeHealthData(
  homeId: string,
  scanResult: ScanResult,
  propertyData: PropertyData,
): Promise<void> {
  const qdrantResult = upsertProperty({
    id: `${homeId}_${scanResult.scanId}`,
    address: propertyData.address,
    city: propertyData.city,
    state: propertyData.state,
    detectedIssues: scanResult.detectedIssues,
    serviceHistory: scanResult.recommendations,
  }).catch(err => {
    console.warn("[HomeVault] Qdrant upsert failed:", err);
  });

  const issuesSummary =
    scanResult.detectedIssues.length > 0
      ? `Issues found: ${scanResult.detectedIssues.join(", ")}.`
      : "No issues detected.";

  const factsSummary = [
    `Home scan recorded for ${propertyData.address}, ${propertyData.city}, ${propertyData.state}.`,
    propertyData.yearBuilt ? `Year built: ${propertyData.yearBuilt}.` : null,
    `Health score: ${scanResult.healthScore}/100.`,
    issuesSummary,
    scanResult.recommendations.length > 0
      ? `Recommendations: ${scanResult.recommendations.join("; ")}.`
      : null,
    `Scan ID: ${scanResult.scanId}. Scanned at: ${scanResult.scannedAt}.`,
  ]
    .filter(Boolean)
    .join(" ");

  const mem0Result = addMemory({
    userId: homeId,
    userType: "homeowner",
    content: factsSummary,
    metadata: {
      scanId: scanResult.scanId,
      homeId,
      healthScore: scanResult.healthScore,
      detectedIssues: scanResult.detectedIssues,
      scannedAt: scanResult.scannedAt,
      address: propertyData.address,
      type: "home_health_scan",
    },
  }).catch(err => {
    console.warn("[HomeVault] Mem0 store failed:", err);
  });

  if (propertyData.homeownerId) {
    const ownerLinkResult = addMemory({
      userId: propertyData.homeownerId,
      userType: "homeowner",
      content: `Homeowner linked to property at ${propertyData.address}, ${propertyData.city} (home ID: ${homeId}).`,
      metadata: {
        homeId,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        type: "home_ownership_link",
      },
    }).catch(err => {
      console.warn("[HomeVault] Mem0 owner link failed:", err);
    });
    await Promise.all([qdrantResult, mem0Result, ownerLinkResult]);
  } else {
    await Promise.all([qdrantResult, mem0Result]);
  }
}

/**
 * Retrieves all stored health records for a home by searching Mem0 memories.
 * Returns a timeline of scans, issues, and improvements sorted newest-first.
 */
export async function getHomeHistory(homeId: string): Promise<HomeHealthRecord[]> {
  let memories: Array<{ id: string; memory: string; score: number }> = [];
  try {
    memories = await searchMemories({
      userId: homeId,
      userType: "homeowner",
      query: "home health scan issues recommendations score",
      limit: 20,
    });
  } catch (err) {
    console.warn("[HomeVault] Mem0 search failed:", err);
    return [];
  }

  const records: HomeHealthRecord[] = memories
    .filter(m => {
      const lower = m.memory.toLowerCase();
      return lower.includes("health score") || lower.includes("scan") || lower.includes("scan id");
    })
    .map(m => {
      const scanIdMatch = m.memory.match(/Scan ID: ([^\s.]+)/);
      const scannedAtMatch = m.memory.match(/Scanned at: ([^.]+)/);
      const healthScoreMatch = m.memory.match(/Health score: (\d+)/);
      const addressMatch = m.memory.match(/for ([^,]+, [^,]+, \w+)/);
      const issuesMatch = m.memory.match(/Issues found: ([^.]+)/);
      const recommendationsMatch = m.memory.match(/Recommendations: ([^.]+)/);

      return {
        scanId: scanIdMatch?.[1] ?? m.id,
        scannedAt: scannedAtMatch?.[1]?.trim() ?? new Date().toISOString(),
        healthScore: healthScoreMatch ? parseInt(healthScoreMatch[1], 10) : 0,
        address: addressMatch?.[1] ?? "",
        detectedIssues: issuesMatch
          ? issuesMatch[1].split(", ").map(s => s.trim()).filter(Boolean)
          : [],
        recommendations: recommendationsMatch
          ? recommendationsMatch[1].split("; ").map(s => s.trim()).filter(Boolean)
          : [],
      } satisfies HomeHealthRecord;
    });

  return records.sort((a, b) =>
    new Date(b.scannedAt).getTime() - new Date(a.scannedAt).getTime(),
  );
}

/**
 * Finds homes with similar issues using Qdrant vector search.
 * Useful for AI to recommend pros who've fixed the same problems nearby.
 */
export async function findHomesWithSimilarIssues(params: {
  address: string;
  issues: string[];
  limit?: number;
}): Promise<Array<{ id: string; score: number; address: string; detectedIssues: string[] }>> {
  try {
    const results = await findSimilarProperties({
      address: params.address,
      issues: params.issues,
      limit: params.limit ?? 10,
    });

    return results.map(r => ({
      id: r.id,
      score: r.score,
      address: String(r.payload.address ?? ""),
      detectedIssues: Array.isArray(r.payload.detectedIssues)
        ? (r.payload.detectedIssues as string[])
        : [],
    }));
  } catch (err) {
    console.warn("[HomeVault] Qdrant similarity search failed:", err);
    return [];
  }
}
