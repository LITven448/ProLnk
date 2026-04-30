/**
 * ATTOM Property Enrichment Helper
 * Fetches property details from the ATTOM Data API and returns structured data.
 * Gracefully no-ops if ATTOM_API_KEY is not set.
 *
 * Docs: https://api.developer.attomdata.com/docs
 *
 * Usage:
 *   const data = await enrichProperty({ address: "123 Main St", city: "Dallas", state: "TX", zip: "75201" });
 */

const ATTOM_API_KEY = process.env.ATTOM_API_KEY;
const ATTOM_BASE_URL = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

export interface AttomPropertyData {
  attomId?: string;
  yearBuilt?: number;
  squareFootage?: number;
  lotSizeSqFt?: number;
  bedrooms?: number;
  bathrooms?: number;
  stories?: number;
  garageSpaces?: number;
  poolIndicator?: boolean;
  roofMaterial?: string;
  foundationType?: string;
  heatingType?: string;
  coolingType?: string;
  lastSaleDate?: string;
  lastSalePrice?: number;
  estimatedValue?: number;
  taxAssessedValue?: number;
  ownerName?: string;
  ownerOccupied?: boolean;
  propertyType?: string;
  rawResponse?: Record<string, unknown>;
}

export async function enrichProperty(params: {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
}): Promise<AttomPropertyData | null> {
  if (!ATTOM_API_KEY) {
    console.log(`[ATTOM] No ATTOM_API_KEY — skipping enrichment for: ${params.address}`);
    return null;
  }

  const queryParams = new URLSearchParams({
    address1: params.address,
    ...(params.city ? { address2: `${params.city}, ${params.state ?? ""} ${params.zip ?? ""}`.trim() } : {}),
  });

  try {
    const res = await fetch(`${ATTOM_BASE_URL}/property/detail?${queryParams.toString()}`, {
      headers: {
        apikey: ATTOM_API_KEY,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`[ATTOM] API error ${res.status} for ${params.address}`);
      return null;
    }

    const json = await res.json() as { property?: any[] };
    const prop = json?.property?.[0];
    if (!prop) return null;

    const building = prop.building ?? {};
    const lot = prop.lot ?? {};
    const sale = prop.sale ?? {};
    const assessment = prop.assessment ?? {};
    const owner = prop.owner ?? {};

    const result: AttomPropertyData = {
      attomId: prop.identifier?.attomId ? String(prop.identifier.attomId) : undefined,
      yearBuilt: building.yearbuilt ? Number(building.yearbuilt) : undefined,
      squareFootage: building.size?.bldgsize ? Number(building.size.bldgsize) : undefined,
      lotSizeSqFt: lot.lotsize1 ? Number(lot.lotsize1) : undefined,
      bedrooms: building.rooms?.beds ? Number(building.rooms.beds) : undefined,
      bathrooms: building.rooms?.bathstotal ? Number(building.rooms.bathstotal) : undefined,
      stories: building.stories ? Number(building.stories) : undefined,
      garageSpaces: building.parking?.garagetype ? 1 : undefined,
      poolIndicator: building.pool === "Y",
      roofMaterial: building.construction?.roofcover ?? undefined,
      foundationType: building.construction?.foundationtype ?? undefined,
      heatingType: building.utilities?.heatingtype ?? undefined,
      coolingType: building.utilities?.coolingtype ?? undefined,
      lastSaleDate: sale.salesearchdate ?? undefined,
      lastSalePrice: sale.amount?.saleamt ? Number(sale.amount.saleamt) : undefined,
      estimatedValue: assessment.market?.mktttlvalue ? Number(assessment.market.mktttlvalue) : undefined,
      taxAssessedValue: assessment.assessed?.assdttlvalue ? Number(assessment.assessed.assdttlvalue) : undefined,
      ownerName: owner.owner1?.fullname ?? undefined,
      ownerOccupied: owner.absenteeInd === "O",
      propertyType: prop.summary?.proptype ?? undefined,
      rawResponse: prop,
    };

    console.log(`[ATTOM] Enriched ${params.address}: yearBuilt=${result.yearBuilt}, sqft=${result.squareFootage}, value=$${result.estimatedValue ?? "?"}`);
    return result;
  } catch (err) {
    console.error("[ATTOM] Fetch error:", err);
    return null;
  }
}

/**
 * Enrich a property record and return a partial update object
 * suitable for merging into the properties or homeWaitlist table.
 */
export async function getPropertyEnrichmentFields(params: {
  address: string;
  city?: string;
  state?: string;
  zip?: string;
}): Promise<Partial<{
  yearBuilt: number;
  squareFootage: number;
  lotSizeSqFt: number;
  bedrooms: number;
  hasPool: boolean;
  estimatedValue: number;
  lastSalePrice: number;
  ownerName: string;
  attomEnrichedAt: Date;
  attomRawData: string;
}>> {
  const data = await enrichProperty(params);
  if (!data) return {};
  return {
    ...(data.yearBuilt !== undefined && { yearBuilt: data.yearBuilt }),
    ...(data.squareFootage !== undefined && { squareFootage: data.squareFootage }),
    ...(data.lotSizeSqFt !== undefined && { lotSizeSqFt: data.lotSizeSqFt }),
    ...(data.bedrooms !== undefined && { bedrooms: data.bedrooms }),
    ...(data.poolIndicator !== undefined && { hasPool: data.poolIndicator }),
    ...(data.estimatedValue !== undefined && { estimatedValue: data.estimatedValue }),
    ...(data.lastSalePrice !== undefined && { lastSalePrice: data.lastSalePrice }),
    ...(data.ownerName !== undefined && { ownerName: data.ownerName }),
    attomEnrichedAt: new Date(),
    attomRawData: JSON.stringify(data.rawResponse ?? {}),
  };
}
