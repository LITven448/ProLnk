/**
 * Admin Commission Dispute Router
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";

export const adminDisputesRouter = router({

  getCommissionDisputes: protectedProcedure
    .input(z.object({
      status: z.enum(["open", "under_review", "resolved_approved", "resolved_denied", "all"]).default("open"),
      limit: z.number().default(50),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];

      const whereClause = input.status === "all" ? sql`c.disputeStatus != 'none'`
        : sql`c.disputeStatus = ${input.status}`;

      const rows = await (db as any).execute(sql`
        SELECT c.*,
          pp.businessName as payingPartnerName, pp.contactEmail as payingPartnerEmail,
          rp.businessName as receivingPartnerName, rp.contactEmail as receivingPartnerEmail,
          o.opportunityType
        FROM commissions c
        LEFT JOIN partners pp ON c.payingPartnerId = pp.id
        LEFT JOIN partners rp ON c.receivingPartnerId = rp.id
        LEFT JOIN opportunities o ON c.opportunityId = o.id
        WHERE ${whereClause}
        ORDER BY c.disputeOpenedAt DESC
        LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  resolveCommissionDispute: protectedProcedure
    .input(z.object({
      commissionId: z.number().int().positive(),
      status: z.enum(["resolved_approved", "resolved_denied"]),
      note: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await (db as any).execute(sql`
        UPDATE commissions SET
          disputeStatus = ${input.status},
          disputeResolvedAt = NOW(),
          disputeResolvedBy = ${ctx.user.id},
          disputeResolutionNote = ${input.note ?? null}
        WHERE id = ${input.commissionId}
          AND disputeStatus IN ('open', 'under_review')
      `);

      // If approved dispute, mark commission as unpaid (re-open for clawback)
      if (input.status === "resolved_approved") {
        await (db as any).execute(sql`
          UPDATE commissions SET paid = 0, paidAt = NULL
          WHERE id = ${input.commissionId} AND paid = 1
        `);
      }

      return { success: true };
    }),

  flagForReview: protectedProcedure
    .input(z.object({ commissionId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await (db as any).execute(sql`
        UPDATE commissions SET disputeStatus = 'under_review', updatedAt = NOW()
        WHERE id = ${input.commissionId}
      `);
      return { success: true };
    }),
});
