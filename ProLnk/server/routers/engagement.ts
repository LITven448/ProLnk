import { z } from "zod";
import { publicProcedure, protectedProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import { partnerCheckIns, partnerSpotlights, notificationPreferences } from "../../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

export const engagementRouter = router({
  // ── Check-Ins ──
  createCheckIn: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      type: z.enum(["job_start", "job_complete", "site_visit", "inspection", "follow_up"]),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      address: z.string().optional(),
      notes: z.string().optional(),
      photoUrl: z.string().optional(),
      jobId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const [checkIn] = await db.insert(partnerCheckIns).values({
        ...input,
        checkedInAt: new Date(),
      });
      return { success: true, id: checkIn.insertId };
    }),

  getCheckIns: protectedProcedure
    .input(z.object({
      partnerId: z.number().optional(),
      limit: z.number().default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions = input.partnerId ? eq(partnerCheckIns.partnerId, input.partnerId) : undefined;
      const results = await db.select().from(partnerCheckIns)
        .where(conditions)
        .orderBy(desc(partnerCheckIns.checkedInAt))
        .limit(input.limit);
      return results;
    }),

  getCheckInStats: protectedProcedure.query(async () => {
    const db = await getDb();
    const [stats] = await db.select({
      total: sql<number>`COUNT(*)`,
      today: sql<number>`SUM(CASE WHEN DATE(checkedInAt) = CURDATE() THEN 1 ELSE 0 END)`,
      thisWeek: sql<number>`SUM(CASE WHEN checkedInAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END)`,
      uniquePartners: sql<number>`COUNT(DISTINCT partnerId)`,
    }).from(partnerCheckIns);
    return stats;
  }),

  // ── Spotlights ──
  getSpotlights: publicProcedure
    .input(z.object({ featuredOnly: z.boolean().default(false) }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions = input.featuredOnly ? eq(partnerSpotlights.featured, true) : undefined;
      const results = await db.select().from(partnerSpotlights)
        .where(conditions)
        .orderBy(partnerSpotlights.displayOrder);
      return results;
    }),

  createSpotlight: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      headline: z.string(),
      story: z.string(),
      photoUrl: z.string().optional(),
      featured: z.boolean().default(false),
      displayOrder: z.number().default(99),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const [result] = await db.insert(partnerSpotlights).values(input);
      return { success: true, id: result.insertId };
    }),

  toggleSpotlightFeatured: protectedProcedure
    .input(z.object({ id: z.number(), featured: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.update(partnerSpotlights)
        .set({ featured: input.featured })
        .where(eq(partnerSpotlights.id, input.id));
      return { success: true };
    }),

  deleteSpotlight: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(partnerSpotlights).where(eq(partnerSpotlights.id, input.id));
      return { success: true };
    }),

  // ── Notification Preferences ──
  getNotificationPreferences: protectedProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [prefs] = await db.select().from(notificationPreferences)
        .where(eq(notificationPreferences.userId, input.userId));
      return prefs || null;
    }),

  updateNotificationPreferences: protectedProcedure
    .input(z.object({
      userId: z.number(),
      emailEnabled: z.boolean().optional(),
      smsEnabled: z.boolean().optional(),
      pushEnabled: z.boolean().optional(),
      weeklyDigest: z.boolean().optional(),
      stormAlerts: z.boolean().optional(),
      commissionAlerts: z.boolean().optional(),
      referralAlerts: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { userId, ...prefs } = input;
      const existing = await db.select().from(notificationPreferences)
        .where(eq(notificationPreferences.userId, userId));
      
      if (existing.length > 0) {
        await db.update(notificationPreferences)
          .set(prefs)
          .where(eq(notificationPreferences.userId, userId));
      } else {
        await db.insert(notificationPreferences).values({ userId, ...prefs });
      }
      return { success: true };
    }),
});
