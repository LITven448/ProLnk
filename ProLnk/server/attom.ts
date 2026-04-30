/**
 * ATTOM Data — Property Intelligence
 * Moved to server/attom.ts (the _core/attom.ts was a stub, this is the full implementation)
 *
 * API: api.gateway.attomdata.com
 * Cost: ~$0.10-0.50 per lookup
 */

const ATTOM_API_KEY = process.env.ATTOM_API_KEY ?? "";
const ATTOM_BASE = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

export interface AttomPropertyData {
  yearBuilt: number | null;
  squareFootage: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  lotSizeSqFt: number | null;
  stories: number | null;
  estimatedValue: number | null;
  roofMaterial: string | null;
  roofType: string | null;
  heatingType: string | null;
  coolingType: string | null;
  garageSpaces: number | null;
  poolPresent: boolean;
  lastSaleDate: string | null;
  lastSalePrice: number | null;
}

export async function getPropertyData(address: string, city: string, state: string, zip?: string): Promise<AttomPropertyData | null> {
  if (!ATTOM_API_KEY) {
    console.warn("[ATTOM] API key not configured");
    return null;
  }
  try {
    const params = new URLSearchParams({
      address1: address,
      address2: [city, state, zip].filter(Boolean).join(", "),
    });
    const res = await fetch(`${ATTOM_BASE}/property/detail?${params}`, {
      headers: { APIKey: ATTOM_API_KEY, Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json() as any;
    const prop = data.property?.[0];
    if (!prop) return null;
    return {
      yearBuilt: prop.summary?.yearbuilt ?? null,
      squareFootage: prop.building?.size?.livingsize ?? null,
      bedrooms: prop.building?.rooms?.beds ?? null,
      bathrooms: prop.building?.rooms?.bathsFull ?? null,
      lotSizeSqFt: prop.lot?.lotsize2 ?? null,
      stories: prop.building?.summary?.levels ?? null,
      estimatedValue: prop.avm?.amount?.value ?? null,
      roofMaterial: prop.building?.construction?.roofCover ?? null,
      roofType: prop.building?.construction?.roofShape ?? null,
      heatingType: prop.building?.construction?.heatingtype ?? null,
      coolingType: prop.building?.construction?.aircondtype ?? null,
      garageSpaces: prop.building?.parking?.garagetype ? 1 : 0,
      poolPresent: prop.lot?.poolInd === "Y",
      lastSaleDate: prop.sale?.salesearchdate ?? null,
      lastSalePrice: prop.sale?.amount?.saleamt ?? null,
    };
  } catch { return null; }
}

export async function enrichHomeownerProperty(propertyId: number, address: string, city: string, state: string, zip?: string): Promise<void> {
  const data = await getPropertyData(address, city, state, zip);
  if (!data) return;
  const { getDb } = await import("./db");
  const { sql } = await import("drizzle-orm");
  const db = await getDb();
  if (!db) return;
  try {
    await (db as any).execute(sql`
      UPDATE properties SET
        yearBuilt = COALESCE(yearBuilt, ${data.yearBuilt}),
        squareFootage = COALESCE(squareFootage, ${data.squareFootage}),
        bedrooms = COALESCE(bedrooms, ${data.bedrooms}),
        hasPool = COALESCE(hasPool, ${data.poolPresent ? 1 : 0}),
        updatedAt = NOW()
      WHERE id = ${propertyId}
    `);
    console.log(`[ATTOM] Enriched property ${propertyId}: ${data.yearBuilt} built, ${data.squareFootage} sqft`);
  } catch {}
}

export function estimateRoofAge(yearBuilt: number | null): {
  estimatedAge: number | null;
  urgency: "immediate" | "within_5_years" | "monitor" | "new";
} {
  if (!yearBuilt) return { estimatedAge: null, urgency: "monitor" };
  const age = new Date().getFullYear() - yearBuilt;
  return {
    estimatedAge: age,
    urgency: age >= 25 ? "immediate" : age >= 18 ? "within_5_years" : age >= 10 ? "monitor" : "new",
  };
}
