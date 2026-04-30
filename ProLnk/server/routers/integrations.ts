/**
 * ProLnk Integrations tRPC Router
 *
 * Procedures for managing partner integrations:
 * - List connected integrations for the current partner
 * - Connect / disconnect integrations
 * - Get intake queue stats
 * - Admin: view all integrations across all partners
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router as createTRPCRouter } from "../_core/trpc";
import {
  getIntegrationsByPartnerId,
  upsertIntegration,
  disconnectIntegration,
  getIntakeQueueStats,
} from "../intake-router";
import { getPartnerByUserId } from "../db";
import { getDb } from "../db";
import { partnerIntegrations, photoIntakeQueue } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const integrationsRouter = createTRPCRouter({
  // --- Partner: List my integrations -----------------------------------------
  listMine: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerByUserId(ctx.user.id);
    if (!partner) return [];
    return getIntegrationsByPartnerId(partner.id);
  }),

  // --- Partner: Connect an integration ---------------------------------------
  connect: protectedProcedure
    .input(
      z.object({
        source: z.enum(["companycam", "jobber", "housecall_pro", "google_drive", "servicetitan", "field_app"]),
        // API key / token provided by the partner
        apiKey: z.string().optional(),
        accessToken: z.string().optional(),
        externalAccountId: z.string().optional(),
        externalAccountName: z.string().optional(),
        // Webhook secret for HMAC verification
        webhookSecret: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });
      }

      const metadata = input.webhookSecret
        ? JSON.stringify({ webhookSecret: input.webhookSecret })
        : undefined;

      const integrationId = await upsertIntegration(partner.id, input.source, {
        accessToken: input.accessToken ?? input.apiKey ?? null,
        externalAccountId: input.externalAccountId ?? null,
        externalAccountName: input.externalAccountName ?? null,
        status: "active",
        metadata: metadata ?? null,
        lastSyncAt: new Date(),
      });

      return { success: true, integrationId };
    }),

  // --- Partner: Disconnect an integration ------------------------------------
  disconnect: protectedProcedure
    .input(z.object({ integrationId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });
      }

      // Verify this integration belongs to the current partner
      const integrations = await getIntegrationsByPartnerId(partner.id);
      const integration = integrations.find((i) => i.id === input.integrationId);
      if (!integration) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Integration not found" });
      }

      await disconnectIntegration(input.integrationId);
      return { success: true };
    }),

  // --- Partner: Get intake queue stats ---------------------------------------
  queueStats: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerByUserId(ctx.user.id);
    if (!partner) return { total: 0, pending: 0, processing: 0, completed: 0, failed: 0 };
    return getIntakeQueueStats(partner.id);
  }),

  // --- Partner: Get recent intake queue items ---------------------------------
  recentQueue: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];

      const db = await getDb();
      if (!db) return [];

      return db
        .select()
        .from(photoIntakeQueue)
        .where(eq(photoIntakeQueue.partnerId, partner.id))
        .orderBy(desc(photoIntakeQueue.receivedAt))
        .limit(input.limit);
    }),

  // --- Admin: List all integrations across all partners ----------------------
  adminListAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(partnerIntegrations)
      .orderBy(desc(partnerIntegrations.connectedAt));
  }),

  // --- Admin: Get global intake queue stats ----------------------------------
  adminQueueStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return getIntakeQueueStats();
  }),

  // --- Admin: Get recent intake queue items (all partners) -------------------
  adminRecentQueue: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const db = await getDb();
      if (!db) return [];

      return db
        .select()
        .from(photoIntakeQueue)
        .orderBy(desc(photoIntakeQueue.receivedAt))
        .limit(input.limit);
    }),
});
