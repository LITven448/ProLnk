import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb, getPartnerByUserId } from "../db";
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
      if (!db) throw new Error("Database unavailable");
      const { type, ...rest } = input;
      // Map incoming type to schema's checkInType enum (best-effort)
      const checkInType = (["job_start", "job_complete", "site_visit"].includes(type)
        ? type
        : "site_visit") as "job_start" | "job_complete" | "site_visit" | "job_progress" | "estimate";
      const [checkIn] = await db.insert(partnerCheckIns).values({ ...rest, checkInType });
      return { success: true, id: (checkIn as any).insertId };
    }),

  getCheckIns: protectedProcedure
    .input(z.object({
      partnerId: z.number().optional(),
      limit: z.number().default(50),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const conditions = input.partnerId ? eq(partnerCheckIns.partnerId, input.partnerId) : undefined;
      return db.select().from(partnerCheckIns)
        .where(conditions)
        .orderBy(desc(partnerCheckIns.createdAt))
        .limit(input.limit);
    }),

  getCheckInStats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, today: 0, thisWeek: 0, uniquePartners: 0 };
    const [stats] = await db.select({
      total: sql<number>`COUNT(*)`,
      today: sql<number>`SUM(CASE WHEN DATE(createdAt) = CURDATE() THEN 1 ELSE 0 END)`,
      thisWeek: sql<number>`SUM(CASE WHEN createdAt >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END)`,
      uniquePartners: sql<number>`COUNT(DISTINCT partnerId)`,
    }).from(partnerCheckIns);
    return stats;
  }),

  // ── Spotlights ──
  getSpotlights: publicProcedure
    .input(z.object({ featuredOnly: z.boolean().default(false) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const conditions = input.featuredOnly ? eq(partnerSpotlights.isActive, true) : undefined;
      return db.select().from(partnerSpotlights)
        .where(conditions)
        .orderBy(partnerSpotlights.displayOrder);
    }),

  createSpotlight: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      headline: z.string(),
      story: z.string(),
      photoUrl: z.string().optional(),
      isActive: z.boolean().default(true),
      displayOrder: z.number().default(99),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [result] = await db.insert(partnerSpotlights).values(input);
      return { success: true, id: (result as any).insertId };
    }),

  toggleSpotlightActive: protectedProcedure
    .input(z.object({ id: z.number(), isActive: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.update(partnerSpotlights)
        .set({ isActive: input.isActive })
        .where(eq(partnerSpotlights.id, input.id));
      return { success: true };
    }),

  deleteSpotlight: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const partner = await getPartnerByUserId(ctx.user.id);
      const [spotlight] = await db.select().from(partnerSpotlights)
        .where(eq(partnerSpotlights.id, input.id)).limit(1);
      if (!spotlight) return { success: true };
      const isAdmin = ctx.user.role === "admin";
      if (!isAdmin && (!partner || spotlight.partnerId !== partner.id)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized to delete this spotlight." });
      }

      await db.delete(partnerSpotlights).where(eq(partnerSpotlights.id, input.id));
      return { success: true };
    }),

  // ── Notification Preferences ──
  // Schema stores per-(userId, channel, category) rows
  getNotificationPreferences: protectedProcedure
    .input(z.object({ userId: z.number().optional() }).optional())
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(notificationPreferences)
        .where(eq(notificationPreferences.userId, ctx.user.id));
    }),

  updateNotificationPreference: protectedProcedure
    .input(z.object({
      userId: z.number().optional(),
      channel: z.enum(["email", "sms", "push", "in_app"]),
      category: z.string(),
      enabled: z.boolean(),
      frequency: z.enum(["instant", "daily_digest", "weekly_digest", "never"]).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const { channel, category, enabled, frequency } = input;
      const userId = ctx.user.id;
      const existing = await db.select().from(notificationPreferences)
        .where(and(
          eq(notificationPreferences.userId, userId),
          eq(notificationPreferences.channel, channel),
          eq(notificationPreferences.category, category),
        ));
      if (existing.length > 0) {
        await db.update(notificationPreferences)
          .set({ enabled, ...(frequency ? { frequency } : {}) })
          .where(and(
            eq(notificationPreferences.userId, userId),
            eq(notificationPreferences.channel, channel),
            eq(notificationPreferences.category, category),
          ));
      } else {
        await db.insert(notificationPreferences).values({ userId, channel, category, enabled, ...(frequency ? { frequency } : {}) });
      }
      return { success: true };
    }),
});
