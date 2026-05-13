import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const propertyEnrichmentRouter = router({
  enrichAddress: publicProcedure
    .input(z.object({
      address: z.string().min(5),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const apiKey = process.env.ATTOM_API_KEY;
      if (!apiKey) return null;

      try {
        const address2 = [input.city, input.state || "TX", input.zip].filter(Boolean).join(" ");
        const url = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=${encodeURIComponent(input.address)}&address2=${encodeURIComponent(address2)}`;

        const response = await fetch(url, {
          headers: { apikey: apiKey, Accept: "application/json" },
        });

        if (!response.ok) return null;
        const data = await response.json() as any;
        const prop = data?.property?.[0];
        if (!prop) return null;

        const building = prop.building || {};
        const lot = prop.lot || {};
        const summary = prop.summary || {};

        return {
          squareFeet: building.size?.bldgsize || building.size?.livingsize || null,
          yearBuilt: summary.yearbuilt || null,
          bedrooms: building.rooms?.beds || null,
          bathrooms: building.rooms?.bathstotal || building.rooms?.bathsfull || null,
          propertyType: summary.proptype || null,
          stories: building.summary?.levels || null,
          lotSizeAcres: lot.lotsize2 || null,
          garage: building.parking?.garagetype || null,
          pool: building.interior?.pooltype || null,
          // Extra ATTOM data stored but not shown to user upfront
          assessedValue: prop.assessment?.assessed?.assdttlvalue || null,
          marketValue: prop.assessment?.market?.mktttlvalue || null,
          lastSalePrice: prop.sale?.amount?.saleamt || null,
          lastSaleDate: prop.sale?.salesearchdate || null,
        };
      } catch {
        return null;
      }
    }),
});
