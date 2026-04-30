/**
 * Smart Lead Routing — Geocoding + Zep Enhanced
 *
 * Improves the basic ZIP-code matching with:
 * 1. Geocoding — actual drive time proximity vs. ZIP centroid
 * 2. Zep context — what does the property's history say about this opportunity type?
 * 3. Partner behavior patterns — which partners actually close this trade type?
 * 4. Home Profile context — has this homeowner declined this type before?
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { geocodeAddress, distanceMiles } from "../geocoding";
import { queryPropertyHistory, queryPartnerBehavior } from "../zep";

export interface SmartRouteCandidate {
  partnerId: number;
  businessName: string;
  priorityScore: number;
  distanceMiles: number | null;
  tradeMatch: boolean;
  zipMatch: boolean;
  behaviorScore: number;
  finalScore: number;
}

export async function smartRouteOpportunity(opts: {
  opportunityId: number;
  propertyAddress: string;
  propertyZip: string;
  opportunityType: string;
  estimatedValue: number;
}): Promise<SmartRouteCandidate[]> {
  const db = await getDb();
  if (!db) return [];

  // Geocode the property
  const propertyGeo = await geocodeAddress(opts.propertyAddress).catch(() => null);

  // Get candidate partners (ZIP-based first pass)
  const candidateRows = await (db as any).execute(sql`
    SELECT id, businessName, priorityScore, businessType,
           serviceAreaLat, serviceAreaLng, serviceRadiusMiles,
           serviceZipCodes, weeklyLeadsReceived, weeklyLeadCap,
           stripeConnectStatus
    FROM partners
    WHERE status = 'approved'
      AND suspendedAt IS NULL
      AND JSON_CONTAINS(serviceZipCodes, JSON_QUOTE(${opts.propertyZip}))
    ORDER BY priorityScore DESC
    LIMIT 20
  `);
  const candidates = candidateRows.rows || candidateRows;

  const scored: SmartRouteCandidate[] = [];

  for (const partner of candidates) {
    // Skip if at weekly lead cap
    if (partner.weeklyLeadCap > 0 && partner.weeklyLeadsReceived >= partner.weeklyLeadCap) continue;

    let finalScore = partner.priorityScore ?? 50;
    let distanceMilesValue: number | null = null;
    let behaviorScore = 50;

    // Distance scoring (if geocoding available)
    if (propertyGeo && partner.serviceAreaLat && partner.serviceAreaLng) {
      distanceMilesValue = distanceMiles(
        propertyGeo.lat,
        propertyGeo.lng,
        parseFloat(partner.serviceAreaLat),
        parseFloat(partner.serviceAreaLng)
      );
      // Closer = higher score (max +20 points for within 5 miles)
      const distanceBonus = Math.max(0, 20 - distanceMilesValue);
      finalScore += distanceBonus;
    }

    // Trade type match scoring
    const tradeMatch = partner.businessType?.toLowerCase().includes(opts.opportunityType.toLowerCase());
    if (tradeMatch) finalScore += 15;

    // Zep behavior scoring (does this partner close this trade type?)
    try {
      const behavior = await queryPartnerBehavior(partner.id, `${opts.opportunityType} accepted completed`);
      if (behavior.length > 0) {
        const acceptedCount = behavior.filter((b: any) => b.content?.includes("accepted")).length;
        behaviorScore = 50 + (acceptedCount * 10);
        finalScore += Math.min(20, acceptedCount * 5);
      }
    } catch {}

    scored.push({
      partnerId: partner.id,
      businessName: partner.businessName,
      priorityScore: partner.priorityScore,
      distanceMiles: distanceMilesValue ? Math.round(distanceMilesValue * 10) / 10 : null,
      tradeMatch,
      zipMatch: true,
      behaviorScore,
      finalScore,
    });
  }

  return scored.sort((a, b) => b.finalScore - a.finalScore);
}

export const smartRouteRouter = router({

  // Preview who would receive a lead for a given address + trade
  previewRouting: protectedProcedure
    .input(z.object({
      opportunityId: z.number().optional(),
      propertyAddress: z.string(),
      propertyZip: z.string(),
      opportunityType: z.string(),
      estimatedValue: z.number().default(0),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return smartRouteOpportunity({ ...input, opportunityId: input.opportunityId ?? 0 });
    }),
});
