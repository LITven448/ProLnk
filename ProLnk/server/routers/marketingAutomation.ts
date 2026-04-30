/**
 * Marketing Automation Router
 * Admin procedures for manually triggering and monitoring marketing automation campaigns.
 */
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const marketingAutomationRouter = router({
  // Get stats for all automation campaigns
  getCampaignStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const stats = await (db as any).execute(
      sql`SELECT 
            campaignKey,
            COUNT(*) AS totalSent,
            MAX(sentAt) AS lastSentAt,
            COUNT(CASE WHEN sentAt > DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) AS sentThisWeek,
            COUNT(CASE WHEN sentAt > DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) AS sentThisMonth
          FROM marketingEmailLog
          GROUP BY campaignKey
          ORDER BY lastSentAt DESC
          LIMIT 100`
    ) as any;

    const rows = Array.isArray(stats) ? stats : stats?.rows ?? [];
    return rows.map((r: any) => ({
      campaignKey: r.campaignKey as string,
      totalSent: Number(r.totalSent ?? 0),
      lastSentAt: r.lastSentAt ? new Date(r.lastSentAt).toISOString() : null,
      sentThisWeek: Number(r.sentThisWeek ?? 0),
      sentThisMonth: Number(r.sentThisMonth ?? 0),
    }));
  }),

  // Get summary counts for the dashboard
  getAutomationSummary: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { totalEmailsSent: 0, emailsThisWeek: 0, emailsThisMonth: 0, activeCampaigns: 0 };

    const result = await (db as any).execute(
      sql`SELECT
            COUNT(*) AS totalEmailsSent,
            COUNT(CASE WHEN sentAt > DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) AS emailsThisWeek,
            COUNT(CASE WHEN sentAt > DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) AS emailsThisMonth,
            COUNT(DISTINCT campaignKey) AS activeCampaigns
          FROM marketingEmailLog`
    ) as any;

    const row = Array.isArray(result) ? result[0] : (result?.rows ?? [])[0];
    return {
      totalEmailsSent: Number(row?.totalEmailsSent ?? 0),
      emailsThisWeek: Number(row?.emailsThisWeek ?? 0),
      emailsThisMonth: Number(row?.emailsThisMonth ?? 0),
      activeCampaigns: Number(row?.activeCampaigns ?? 0),
    };
  }),

  // Manual trigger: run all v1 campaigns (seasonal, win-back, tier milestone)
  triggerV1Campaigns: adminProcedure.mutation(async () => {
    try {
      const { runDailyMarketingAutomation } = await import("../marketing-automation");
      await runDailyMarketingAutomation();
      return { success: true, message: "V1 campaigns triggered (seasonal, win-back, tier milestone)" };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: weekly partner digest
  triggerWeeklyDigest: adminProcedure.mutation(async () => {
    try {
      const { runWeeklyPartnerDigest } = await import("../marketing-automation-v2");
      const result = await runWeeklyPartnerDigest();
      return { success: true, ...result };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: referral nudge engine
  triggerReferralNudge: adminProcedure.mutation(async () => {
    try {
      const { runReferralNudgeEngine } = await import("../marketing-automation-v2");
      const result = await runReferralNudgeEngine();
      return { success: true, ...result };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: deal expiry urgency push
  triggerDealExpiryPush: adminProcedure.mutation(async () => {
    try {
      const { runDealExpiryUrgencyPush } = await import("../marketing-automation-v2");
      const result = await runDealExpiryUrgencyPush();
      return { success: true, ...result };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: NPS follow-up sequence
  triggerNpsFollowUp: adminProcedure.mutation(async () => {
    try {
      const { runNpsFollowUpSequence } = await import("../marketing-automation-v2");
      const result = await runNpsFollowUpSequence();
      return { success: true, ...result };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: partner leaderboard broadcast
  triggerLeaderboardBroadcast: adminProcedure.mutation(async () => {
    try {
      const { runLeaderboardBroadcast } = await import("../marketing-automation-v2");
      const result = await runLeaderboardBroadcast();
      return { success: true, sent: result.sent, error: result.error };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: scan re-engagement
  triggerScanReEngagement: adminProcedure.mutation(async () => {
    try {
      const { runScanReEngagement } = await import("../marketing-automation-v2");
      const result = await runScanReEngagement();
      return { success: true, ...result };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),

  // Manual trigger: run all v2 campaigns
  triggerAllV2: adminProcedure.mutation(async () => {
    try {
      const { runExtendedMarketingAutomation } = await import("../marketing-automation-v2");
      await runExtendedMarketingAutomation();
      return { success: true, message: "All v2 campaigns triggered" };
    } catch (err: any) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
    }
  }),
});
