import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createLogger } from "../_core/logger";

const logger = createLogger("property");

const ATTOM_BASE = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

interface AttomDetailResponse {
  status?: { code: number; msg: string; total?: number };
  property?: Array<{
    address?: {
      oneLine?: string;
      line1?: string;
      line2?: string;
      locality?: string;
      countrySubd?: string;
      postal1?: string;
    };
    building?: {
      rooms?: { beds?: number; bathstotal?: number; bathsfull?: number; bathshalf?: number };
      size?: { universalsize?: number; livingsize?: number; bldgsize?: number };
      summary?: { story?: string; stories?: number; bldgType?: string };
      construction?: { roofcover?: string; foundationtype?: string };
      interior?: { fplccount?: number };
      parking?: { prkgSpaces?: number; garagetype?: string };
    };
    summary?: { yearbuilt?: number; proptype?: string; propclass?: string; proplandusedesc?: string };
    lot?: { lotsize1?: number; lotsize2?: number };
    utilities?: { coolingtype?: string; heatingfuel?: string; heatingtype?: string };
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

        const result = await attomFetch<AttomDetailResponse>("/property/detail", {
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

        // Map ATTOM property type to friendly homeType
        const propType = summary.proptype ?? summary.propclass ?? "";
        const homeType =
          /SFR|SINGLE/i.test(propType) ? "single_family" :
          /TOWN/i.test(propType) ? "townhouse" :
          /CONDO/i.test(propType) ? "condo" :
          /MULTI|DUPLEX/i.test(propType) ? "multi_family" :
          /MOBILE|MANUFACTURED/i.test(propType) ? "mobile" :
          "single_family";

        return {
          found: true as const,
          source: "attom" as const,
          confirmedAddress: p.address?.oneLine ?? null,
          // Bedrooms / bathrooms
          bedrooms: bld.rooms?.beds ?? null,
          bathrooms: bld.rooms?.bathstotal ?? null,
          // Size
          squareFootage: bld.size?.universalsize ?? bld.size?.livingsize ?? bld.size?.bldgsize ?? null,
          // Lot
          lotSizeSqFt: lot.lotsize2 ?? null,
          lotSizeAcres: lot.lotsize1 ?? null,
          // Build info
          yearBuilt: summary.yearbuilt ?? null,
          stories: bld.summary?.stories ?? null,
          // Type
          homeType,
          propertyType: propType || null,
          // Garage
          garageSpaces: bld.parking?.prkgSpaces ?? null,
          garageType: bld.parking?.garagetype ?? null,
          // Construction
          roofMaterial: bld.construction?.roofcover ?? null,
          foundationType: bld.construction?.foundationtype ?? null,
          // Systems
          coolingType: util.coolingtype ?? null,
          heatingType: util.heatingtype ?? null,
          heatingFuel: util.heatingfuel ?? null,
        };
      });
    }),
});
