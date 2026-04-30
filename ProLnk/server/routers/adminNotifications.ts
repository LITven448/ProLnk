/**
 * Admin Notifications Router
 * Backend for the Notification Center OS dashboard.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";

export const adminNotificationsRouter = router({
  // Get notifications for admin dashboard
  getNotifications: protectedProcedure
    .input(z.object({
      filter: z.enum(["all", "unread", "email"]).default("unread"),
      limit: z.number().default(100),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];

      const whereClause = input.filter === "unread" ? sql`isRead = 0`
        : input.filter === "email" ? sql`tier = 'email'`
        : sql`1=1`;

      const rows = await (db as any).execute(sql`
        SELECT * FROM notificationLog
        WHERE ${whereClause}
        ORDER BY createdAt DESC
        LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  // Mark notifications read
  markNotificationsRead: protectedProcedure
    .input(z.object({
      ids: z.array(z.number()).optional(),
      all: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      if (input.all) {
        await (db as any).execute(sql`UPDATE notificationLog SET isRead = 1, readAt = NOW() WHERE isRead = 0`);
      } else if (input.ids?.length) {
        await (db as any).execute(sql`
          UPDATE notificationLog SET isRead = 1, readAt = NOW()
          WHERE id IN (${sql.join(input.ids.map(id => sql`${id}`), sql`, `)})
        `);
      }
      return { success: true };
    }),

  // Get platform health summary for dashboard
  getPlatformHealth: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return {};

    const [statsRows, pendingRows, recentPayouts] = await Promise.all([
      (db as any).execute(sql`
        SELECT
          (SELECT COUNT(*) FROM partners WHERE status = 'pending') as pendingApplications,
          (SELECT COUNT(*) FROM opportunities WHERE status = 'pending' AND adminReviewStatus = 'pending_review') as pendingOpportunities,
          (SELECT COUNT(*) FROM commissions WHERE paid = 0) as unpaidCommissions,
          (SELECT COALESCE(SUM(amount), 0) FROM commissions WHERE paid = 0) as unpaidAmount,
          (SELECT COUNT(*) FROM companyBriefcases WHERE status = 'draft') as incompleteBriefcases,
          (SELECT COUNT(*) FROM stormLeads WHERE status = 'pending') as pendingStormLeads,
          (SELECT COUNT(*) FROM bidBoardProjects WHERE status = 'open' AND biddingDeadline < DATE_ADD(NOW(), INTERVAL 24 HOUR)) as closingSoonBids
      `),
      (db as any).execute(sql`
        SELECT COUNT(*) as cnt FROM photoIntakeQueue WHERE status = 'pending' AND receivedAt > DATE_SUB(NOW(), INTERVAL 1 HOUR)
      `),
      (db as any).execute(sql`
        SELECT COUNT(*) as cnt, COALESCE(SUM(receivingPartnerPayout), 0) as total
        FROM jobPayments WHERE status = 'paid_out' AND updatedAt > DATE_SUB(NOW(), INTERVAL 24 HOUR)
      `),
    ]);

    const stats = (statsRows.rows || statsRows)[0] ?? {};
    const pending = (pendingRows.rows || pendingRows)[0] ?? {};
    const payouts = (recentPayouts.rows || recentPayouts)[0] ?? {};

    return {
      ...stats,
      photosProcessingNow: parseInt(pending.cnt ?? "0"),
      payoutsLast24h: parseInt(payouts.cnt ?? "0"),
      payoutVolumelast24h: parseFloat(payouts.total ?? "0"),
    };
  }),
});
