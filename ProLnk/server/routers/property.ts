import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createLogger } from "../_core/logger";

const logger = createLogger("property");

const ATTOM_BASE = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

/**
 * ATTOM expandedprofile response — much richer than `detail`.
 * Includes building.parking, interior.fplc, lot.poolType, building.summary.levels,
 * assessment data, owner info (we ignore), etc.
 */
interface AttomExpandedResponse {
  status?: { code: number; msg: string };
  property?: Array<{
    address?: { oneLine?: string };
    area?: { subdName?: string };
    building?: {
      construction?: { propertyStructureMajorImprovementsYear?: string; roofCover?: string; foundationType?: string };
      interior?: { fplcCount?: number; fplcInd?: string };
      parking?: { garageType?: string; prkgSize?: number; prkgSpaces?: string };
      rooms?: { bathsFull?: number; bathsHalf?: number; bathsTotal?: number; beds?: number; roomsTotal?: number };
      size?: { bldgSize?: number; grossSize?: number; livingSize?: number; universalSize?: number };
      summary?: { levels?: number; storyDesc?: string };
    };
    summary?: { propClass?: string; propIndicator?: number; propLandUse?: string; propType?: string; propertyType?: string; yearBuilt?: number };
    lot?: { lotSize1?: number; lotSize2?: number; poolType?: string; zoningType?: string };
    utilities?: { coolingType?: string; heatingFuel?: string; heatingType?: string };
    assessment?: { assessed?: { assdTtlValue?: number; assdImprValue?: number; assdLandValue?: number }; tax?: { taxAmt?: number; taxYear?: number } };
  }>;
}

async function attomFetch<T>(endpoint: string, params: Record<string, string>): Promise<T | null> {
  const apiKey = process.env.ATTOM_API_KEY;
  if (!apiKey) {
    logger.warn("ATTOM_API_KEY missing — skipping lookup");
    return null;
  }
  const url = new URL(`${ATTOM_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json", apikey: apiKey },
    });
    if (!res.ok) {
      logger.warn(`ATTOM ${endpoint} returned ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    logger.error(`ATTOM ${endpoint} failed`, err);
    return null;
  }
}

export const propertyRouter = router({
  // Look up property by full address — used at signup to pre-populate home profile
  lookupByAddress: publicProcedure
    .input(z.object({
      address: z.string().min(1).max(200),
      city: z.string().min(1).max(100),
      state: z.string().min(2).max(2),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    }))
    .query(async ({ input }) => {
      return await logger.track("property:lookupByAddress", async () => {
        const address1 = input.address.trim().toUpperCase();
        const address2 = `${input.city.trim().toUpperCase()}, ${input.state.trim().toUpperCase()} ${input.zipCode.trim()}`;

        const result = await attomFetch<AttomExpandedResponse>("/property/expandedprofile", {
          address1,
          address2,
        });

        if (!result || result.status?.code !== 0 || !result.property?.length) {
          return {
            found: false as const,
            source: "attom" as const,
          };
        }

        const p = result.property[0];
        const bld = p.building ?? {};
        const summary = p.summary ?? {};
        const lot = p.lot ?? {};
        const util = p.utilities ?? {};
        const area = p.area ?? {};
        const interior = bld.interior ?? {};
        const parking = bld.parking ?? {};
        const construction = bld.construction ?? {};
        const assessment = p.assessment ?? {};

        // Map ATTOM property type to friendly homeType
        const propType = summary.propType ?? summary.propClass ?? summary.propLandUse ?? "";
        const homeType =
          /SFR|SINGLE/i.test(propType) ? "single_family" :
          /TOWN/i.test(propType) ? "townhouse" :
          /CONDO/i.test(propType) ? "condo" :
          /MULTI|DUPLEX/i.test(propType) ? "multi_family" :
          /MOBILE|MANUFACTURED/i.test(propType) ? "mobile" :
          "single_family";

        // Garage spaces — may come as string or number
        const garageSpacesRaw = parking.prkgSpaces;
        const garageSpaces = typeof garageSpacesRaw === "string" ? parseInt(garageSpacesRaw, 10) || null
          : typeof garageSpacesRaw === "number" ? garageSpacesRaw : null;

        // Pool — comes as "NO POOL" or pool type string
        const hasPool = typeof lot.poolType === "string" && !/no\s*pool/i.test(lot.poolType) && lot.poolType.trim().length > 0;

        // Fireplace
        const hasFireplace = (interior.fplcCount ?? 0) > 0 || /Y/i.test(interior.fplcInd ?? "");
        const fireplaceCount = interior.fplcCount ?? null;

        return {
          found: true as const,
          source: "attom" as const,
          confirmedAddress: p.address?.oneLine ?? null,
          subdivision: area.subdName ?? null,

          // Bedrooms / bathrooms
          bedrooms: bld.rooms?.beds ?? null,
          bathrooms: bld.rooms?.bathsTotal ?? null,
          bathroomsFull: bld.rooms?.bathsFull ?? null,
          bathroomsHalf: bld.rooms?.bathsHalf ?? null,
          totalRooms: bld.rooms?.roomsTotal ?? null,

          // Size
          squareFootage: bld.size?.livingSize ?? bld.size?.universalSize ?? bld.size?.bldgSize ?? null,
          grossSqFt: bld.size?.grossSize ?? null,

          // Lot
          lotSizeSqFt: lot.lotSize2 ?? null,
          lotSizeAcres: lot.lotSize1 ?? null,
          zoning: lot.zoningType ?? null,

          // Build info
          yearBuilt: summary.yearBuilt ?? null,
          majorRenovationYear: construction.propertyStructureMajorImprovementsYear ? parseInt(construction.propertyStructureMajorImprovementsYear, 10) || null : null,
          stories: bld.summary?.levels ?? null,
          storyDescription: bld.summary?.storyDesc ?? null,

          // Type
          homeType,
          propertyType: propType || null,

          // Parking
          garageSpaces,
          garageType: parking.garageType ?? null,
          garageSqFt: parking.prkgSize ?? null,

          // Construction
          roofMaterial: construction.roofCover ?? null,
          foundationType: construction.foundationType ?? null,

          // Interior features
          hasFireplace,
          fireplaceCount,

          // Outdoor features
          hasPool,
          poolType: hasPool ? lot.poolType : null,

          // Systems
          coolingType: util.coolingType ?? null,
          heatingType: util.heatingType ?? null,
          heatingFuel: util.heatingFuel ?? null,

          // Value (for context — not displayed, but useful for analytics)
          assessedValue: assessment.assessed?.assdTtlValue ?? null,
          annualTax: assessment.tax?.taxAmt ?? null,
        };
      });
    }),
});
