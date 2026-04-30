import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { partners } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { getPartnerByUserId } from "../db";
import { DFW_ZIP_CODES, TIER_ZIP_LIMITS, getMaxZipsForTier, isValidDFWZip } from "../../shared/dfw-zipcodes";

export const serviceAreaRouter = router({
  // Get all DFW zip codes with tier limit info for the current partner
  getServiceAreaData: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerByUserId(ctx.user.id);
    if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
    const tier = partner.tier ?? "scout";
    const maxAllowed = getMaxZipsForTier(tier);
    const currentZips: string[] = Array.isArray((partner as any).serviceZipCodes)
      ? (partner as any).serviceZipCodes
      : [];
    return {
      currentZips,
      maxAllowed,
      tier,
      tierLimits: TIER_ZIP_LIMITS,
      allZips: DFW_ZIP_CODES,
      remainingSlots: Math.max(0, maxAllowed - currentZips.length),
    };
  }),

  // Update partner's selected service zip codes (tier-enforced)
  updateServiceZipCodes: protectedProcedure
    .input(
      z.object({
        zipCodes: z.array(z.string().regex(/^\d{5}$/)).min(1).max(999),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
      const tier = partner.tier ?? "scout";
      const maxAllowed = getMaxZipsForTier(tier);
      // Validate all zips are in DFW service area
      const invalidZips = input.zipCodes.filter((z) => !isValidDFWZip(z));
      if (invalidZips.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `These zip codes are not in the DFW service area: ${invalidZips.join(", ")}`,
        });
      }
      // Enforce tier limit
      if (input.zipCodes.length > maxAllowed) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `Your ${tier} plan allows up to ${maxAllowed} zip codes. You selected ${input.zipCodes.length}. Upgrade to add more coverage.`,
        });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db
        .update(partners)
        .set({
          serviceZipCodes: input.zipCodes as any,
          maxZipCodes: maxAllowed,
        })
        .where(eq(partners.id, partner.id));
      return { success: true, savedZips: input.zipCodes.length, maxAllowed };
    }),

  // Admin: get coverage density analysis
  getCoverageDensity: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const allPartners = await db
      .select({
        id: partners.id,
        businessName: partners.businessName,
        businessType: partners.businessType,
        tier: partners.tier,
        serviceZipCodes: partners.serviceZipCodes,
        status: partners.status,
      })
      .from(partners)
      .where(eq(partners.status, "approved"));
    const zipCoverage: Record<string, { count: number; partners: string[]; trades: string[] }> = {};
    for (const p of allPartners) {
      const zips: string[] = Array.isArray((p as any).serviceZipCodes) ? (p as any).serviceZipCodes : [];
      for (const zip of zips) {
        if (!zipCoverage[zip]) zipCoverage[zip] = { count: 0, partners: [], trades: [] };
        zipCoverage[zip].count++;
        zipCoverage[zip].partners.push(p.businessName);
        if (!zipCoverage[zip].trades.includes(p.businessType)) {
          zipCoverage[zip].trades.push(p.businessType);
        }
      }
    }
    const coveredZips = new Set(Object.keys(zipCoverage));
    const gaps = DFW_ZIP_CODES.filter((z) => !coveredZips.has(z.zip)).map((z) => ({
      zip: z.zip,
      city: z.city,
      submarket: z.submarket,
      medianHomeValue: z.medianHomeValue,
    }));
    return { zipCoverage, gaps, totalCovered: coveredZips.size, totalDFW: DFW_ZIP_CODES.length };
  }),
});
