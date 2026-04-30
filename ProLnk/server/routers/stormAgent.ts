/**
 * Storm Agent Router
 * Admin-facing tRPC procedures for the Storm Tracking Agent.
 */
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { runStormScan, fetchStormAlerts } from "../storm-agent";

export const stormAgentRouter = router({
  // --- Get recent storm events (admin) ---
  listEvents: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return [];
    const rows = await (db as any).execute(
      sql`SELECT * FROM stormEvents ORDER BY createdAt DESC LIMIT 50`
    );
    return (rows.rows || rows) as any[];
  }),

  // --- Get storm leads for a specific event ---
  getEventLeads: protectedProcedure
    .input(z.object({ stormEventId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(
        sql`SELECT sl.*, p.businessName as partnerName
            FROM stormLeads sl
            LEFT JOIN partners p ON p.id = sl.dispatchedToPartnerId
            WHERE sl.stormEventId = ${input.stormEventId}
            ORDER BY sl.priority DESC, sl.createdAt ASC LIMIT 200`
      );
      return (rows.rows || rows) as any[];
    }),

  // --- Manual storm scan trigger (admin) ---
  triggerScan: protectedProcedure
    .input(z.object({ state: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const result = await runStormScan({ state: input.state, adminUserId: ctx.user.id });
      return result;
    }),

  // --- Preview active NOAA alerts (admin) ---
  previewAlerts: protectedProcedure
    .input(z.object({ state: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const alerts = await fetchStormAlerts(input.state ?? "TX");
      return alerts;
    }),

  // --- Get storm agent stats (admin) ---
  getStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return null;
    const [totals] = await (db as any).execute(
      sql`SELECT
        COUNT(*) as totalEvents,
        SUM(leadsGenerated) as totalLeads,
        SUM(propertiesAffected) as totalProperties,
        MAX(createdAt) as lastScanAt
      FROM stormEvents`
    ) as any[];
    const row = (totals?.rows || totals)?.[0] ?? totals;
    return {
      totalEvents: Number(row?.totalEvents ?? 0),
      totalLeads: Number(row?.totalLeads ?? 0),
      totalProperties: Number(row?.totalProperties ?? 0),
      lastScanAt: row?.lastScanAt ?? null,
    };
  }),

  // --- Dispatch a storm lead to a partner ---
  dispatchLead: protectedProcedure
    .input(z.object({ stormLeadId: z.number(), partnerId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await (db as any).execute(
        sql`UPDATE stormLeads SET
          status = 'dispatched',
          dispatchedToPartnerId = ${input.partnerId},
          dispatchedAt = NOW()
        WHERE id = ${input.stormLeadId}`
      );
      return { success: true };
    }),
});
