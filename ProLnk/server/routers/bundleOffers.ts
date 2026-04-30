import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { partners } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { generateBundleOffer, type DetectedIssue, type ProCapability } from "../jobBundler";

const issueInputSchema = z.object({
  id: z.string(),
  type: z.string(),
  category: z.string(),
  confidence: z.number(),
  estimatedValue: z.number(),
  description: z.string(),
  photoUrl: z.string().optional(),
});

export const bundleOffersRouter = router({
  // Admin: get bundle engine stats (static for now, DB table added in future migration)
  stats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, pending: 0, sent: 0, accepted: 0, declined: 0, avgIssuesPerBundle: 0, avgProsPerBundle: 0, totalEstimatedValue: 0, activePartners: 0 };
    const [partnerCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(partners)
      .where(eq(partners.status, "approved"));

    return {
      total: 0,
      pending: 0,
      sent: 0,
      accepted: 0,
      declined: 0,
      avgIssuesPerBundle: 0,
      avgProsPerBundle: 0,
      totalEstimatedValue: 0,
      activePartners: partnerCount?.count ?? 0,
    };
  }),

  // Admin / homeowner: generate a bundle for a set of detected issues
  createBundle: protectedProcedure
    .input(z.object({
      addressId: z.string(),
      issues: z.array(issueInputSchema),
      requestedByHomeowner: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, bundle: null };
      // Get qualified partners from DB
      const allPartners = await db
        .select({
          id: partners.id,
          businessName: partners.businessName,
          businessType: partners.businessType,
          priorityScore: partners.priorityScore,
          tier: partners.tier,
          serviceArea: partners.serviceArea,
        })
        .from(partners)
        .where(eq(partners.status, "approved"));

      const partnerList: ProCapability[] = allPartners.map((p: typeof allPartners[0]) => ({
        partnerId: p.id,
        partnerName: p.businessName || "Unknown",
        serviceTypes: p.businessType ? [p.businessType] : [],
        serviceCategories: p.businessType ? [p.businessType] : [],
        priorityScore: p.priorityScore || 50,
        verificationBadge: "bronze" as const,
        avgResponseHours: 4,
        closeRate: 0.5,
        reviewScore: 4.0,
        tier: (p.tier as string) || "scout",
      }));

      const bundle = generateBundleOffer(
        input.addressId,
        input.issues as DetectedIssue[],
        partnerList,
        { requestedByHomeowner: input.requestedByHomeowner }
      );

      return { success: true, bundle };
    }),

  // Public: generate a bundle preview (no auth required — for homeowner-initiated requests)
  previewBundle: publicProcedure
    .input(z.object({
      addressId: z.string(),
      issues: z.array(issueInputSchema),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { bundle: null };
      const allPartners = await db
        .select({
          id: partners.id,
          businessName: partners.businessName,
          businessType: partners.businessType,
          priorityScore: partners.priorityScore,
          tier: partners.tier,
        })
        .from(partners)
        .where(eq(partners.status, "approved"));

      const partnerList: ProCapability[] = allPartners.map((p: typeof allPartners[0]) => ({
        partnerId: p.id,
        partnerName: p.businessName || "Unknown",
        serviceTypes: p.businessType ? [p.businessType] : [],
        serviceCategories: p.businessType ? [p.businessType] : [],
        priorityScore: p.priorityScore || 50,
        verificationBadge: "bronze" as const,
        avgResponseHours: 4,
        closeRate: 0.5,
        reviewScore: 4.0,
        tier: (p.tier as string) || "scout",
      }));

      const bundle = generateBundleOffer(
        input.addressId,
        input.issues as DetectedIssue[],
        partnerList,
        { requestedByHomeowner: true }
      );

      return { bundle };
    }),

  // Returns bundle offers for a given address (from opportunities table)
  getMyBundles: publicProcedure
    .input(z.object({
      addressId: z.string(),
      homeownerId: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      // Return opportunities that were auto-generated for this address
      const rows = await (db as any).execute(sql`
        SELECT o.id, o.issueType, o.description, o.estimatedValue, o.status,
               o.createdAt, p.businessName as partnerName, p.tier as partnerTier,
               p.id as partnerId
        FROM opportunities o
        LEFT JOIN partners p ON p.id = o.assignedPartnerId
        WHERE o.addressId = ${input.addressId}
          AND o.source IN ('ai_scan', 'homeowner_upload', 'bundle')
        ORDER BY o.createdAt DESC
        LIMIT 20
      `);
      return (rows[0] || []) as any[];
    }),
});
