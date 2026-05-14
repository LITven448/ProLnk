// Home Health Vault — stores scan results and property data in memory stack
// Uses dynamic imports to gracefully handle missing packages

export interface HomeHealthRecord {
  homeId: string;
  scanDate: string;
  healthScore: number;
  issues: Array<{ name: string; severity: string; description: string }>;
  overallCondition: string;
  summary: string;
}

export async function storeHomeHealthData(
  homeId: string,
  scanResult: { issues: HomeHealthRecord['issues']; overallCondition: string; healthScore?: number; summary: string },
  propertyData?: { squareFeet?: number | null; yearBuilt?: number | null; bedrooms?: number | null; bathrooms?: number | null }
): Promise<void> {
  try {
    const { upsertProperty } = await import("./qdrant.js");
    const features = [
      scanResult.healthScore ?? 50,
      scanResult.issues.filter(i => i.severity === 'urgent').length,
      scanResult.issues.filter(i => i.severity === 'moderate').length,
      propertyData?.squareFeet ? Math.log(propertyData.squareFeet) : 0,
      propertyData?.yearBuilt ? (2026 - propertyData.yearBuilt) / 50 : 0,
    ];
    while (features.length < 10) features.push(0);
    await upsertProperty(homeId, features as [number,number,number,number,number,number,number,number,number,number], {
      homeId, scanDate: new Date().toISOString(), healthScore: scanResult.healthScore ?? 50,
      overallCondition: scanResult.overallCondition, issueCount: scanResult.issues.length,
    });
  } catch { /* qdrant not available */ }

  try {
    const { addMemory } = await import("./mem0.js");
    const urgentIssues = scanResult.issues.filter(i => i.severity === 'urgent').map(i => i.name).join(', ');
    const content = [
      `Home ${homeId} scanned on ${new Date().toLocaleDateString()}`,
      `Health score: ${scanResult.healthScore ?? 'unknown'}/100 — ${scanResult.overallCondition}`,
      urgentIssues ? `Urgent issues: ${urgentIssues}` : 'No urgent issues',
      `Summary: ${scanResult.summary}`,
      propertyData?.yearBuilt ? `Built ${propertyData.yearBuilt}, ${propertyData.squareFeet ?? '?'} sqft` : '',
    ].filter(Boolean).join('. ');
    await addMemory({ userId: homeId, userType: 'homeowner', content, metadata: { type: 'home_scan', homeId } });
  } catch { /* mem0 not available */ }
}

export async function getHomeHistory(homeId: string): Promise<HomeHealthRecord[]> {
  try {
    const { searchMemories } = await import("./mem0.js");
    const memories = await searchMemories({ userId: homeId, userType: 'homeowner', query: 'home scan health score issues', limit: 20 });
    return memories.map(m => ({
      homeId, scanDate: new Date().toISOString(), healthScore: 50,
      issues: [], overallCondition: 'unknown', summary: m.memory,
    }));
  } catch { return []; }
}

export async function findHomesWithSimilarIssues(
  address: string, issues: string[], limit = 5
): Promise<Array<{ homeId: string; similarity: number }>> {
  try {
    const { findSimilarProperties } = await import("./qdrant.js");
    const features = new Array(10).fill(0) as [number,number,number,number,number,number,number,number,number,number];
    features[1] = issues.filter(i => i.toLowerCase().includes('urgent')).length;
    const results = await findSimilarProperties(features, limit);
    return results.map(r => ({ homeId: String(r.id), similarity: r.score }));
  } catch { return []; }
}
