import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";

export const propertyEnrichmentRouter = router({
  enrichAddress: publicProcedure
    .input(z.object({
      address: z.string().min(5),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const apiKey = process.env.BATCHDATA_API_KEY;

      if (!apiKey) return null;

      try {
        const response = await fetch("https://api.batchdata.com/api/v1/property/lookup", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [{
              address: {
                street: input.address,
                city: input.city || "",
                state: input.state || "TX",
                zip: input.zip || "",
              },
            }],
          }),
        });

        if (!response.ok) return null;

        const data = await response.json() as Record<string, unknown>;
        const results = (data?.results as Record<string, unknown>[] | undefined);
        const first = results?.[0] as Record<string, unknown> | undefined;
        const prop = (first?.propertyInfo ?? first) as Record<string, unknown> | undefined;
        if (!prop) return null;

        return {
          squareFeet: (prop.buildingSquareFeet ?? prop.squareFeet ?? null) as number | null,
          yearBuilt: (prop.yearBuilt ?? null) as number | null,
          bedrooms: (prop.bedrooms ?? null) as number | null,
          bathrooms: (prop.bathrooms ?? null) as number | null,
          lotSizeAcres: (prop.lotAcres ?? null) as number | null,
          propertyType: (prop.propertyType ?? null) as string | null,
          stories: (prop.stories ?? null) as number | null,
          garage: (prop.garageType ?? null) as string | null,
          pool: (prop.pool ?? null) as boolean | null,
        };
      } catch {
        return null;
      }
    }),
});
