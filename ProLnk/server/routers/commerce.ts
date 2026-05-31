/**
 * Commerce tRPC router — Phase 1 affiliate "shop this rendering".
 *
 *   getProductSuggestions({ renderingId })   public: stored or freshly-generated
 *   trackProductClick({ productSuggestionId }) public: record click, return URL
 *   recordConversion({ productSuggestionId }) public: mark converted (postback)
 *   getCommerceMetrics()                      admin: impressions/clicks/CTR/conv
 *
 * Conversion instrumentation lives in the `productClicks` table; the metrics
 * endpoint is how we SEE the conversion number that unlocks the marketplace
 * phase. See server/commerce.ts for the strategy hook + env vars.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import {
  productSuggestions,
  productClicks,
  roomMakeoverSessions,
} from "../../drizzle/schema";
import { suggestProductsForRendering, type RenderingContext } from "../commerce";

let infraEnsured = false;

/** Idempotently ensure the commerce tables exist. Production DBs skip embedded
 *  migrations once `users` exists, so we self-heal here. Best-effort. */
export async function ensureCommerceInfra(): Promise<void> {
  if (infraEnsured) return;
  const db = await getDb();
  if (!db) return;
  const stmts = [
    `CREATE TABLE IF NOT EXISTS \`productSuggestions\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`renderingId\` int,
      \`sessionId\` varchar(128),
      \`category\` varchar(60) NOT NULL,
      \`productName\` varchar(500) NOT NULL,
      \`retailer\` varchar(60) NOT NULL,
      \`affiliateUrl\` varchar(2000) NOT NULL,
      \`imageUrl\` varchar(2000),
      \`price\` decimal(10,2),
      \`position\` varchar(120),
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT \`productSuggestions_id\` PRIMARY KEY(\`id\`)
    )`,
    `CREATE TABLE IF NOT EXISTS \`productClicks\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`productSuggestionId\` int NOT NULL,
      \`userId\` int,
      \`sessionId\` varchar(128),
      \`clickedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`converted\` boolean NOT NULL DEFAULT false,
      \`convertedAt\` timestamp NULL,
      \`orderValue\` decimal(10,2),
      CONSTRAINT \`productClicks_id\` PRIMARY KEY(\`id\`)
    )`,
    `CREATE INDEX \`idx_productSuggestions_rendering\` ON \`productSuggestions\` (\`renderingId\`)`,
    `CREATE INDEX \`idx_productClicks_suggestion\` ON \`productClicks\` (\`productSuggestionId\`)`,
  ];
  for (const s of stmts) {
    try {
      await (db as any).execute(s);
    } catch {
      // Already exists — expected and ignored.
    }
  }
  infraEnsured = true;
}

const PHASE_1_AFFILIATE_RATE = 0.05;

export const commerceRouter = router({
  // Return stored suggestions for a rendering, generating + persisting them on
  // first request. Records an "impression" view implicitly via the returned set.
  getProductSuggestions: publicProcedure
    .input(z.object({ renderingId: z.number() }))
    .query(async ({ input }) => {
      await ensureCommerceInfra();
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const existing = await db
        .select()
        .from(productSuggestions)
        .where(eq(productSuggestions.renderingId, input.renderingId));
      if (existing.length > 0) return existing;

      // Generate from the rendering's room/style context.
      let context: RenderingContext = {};
      try {
        const [session] = await db
          .select()
          .from(roomMakeoverSessions)
          .where(eq(roomMakeoverSessions.id, input.renderingId))
          .limit(1);
        if (session) {
          const answers = (session.styleAnswers ?? {}) as Record<string, string>;
          context = {
            roomType: session.roomType,
            designStyle: answers.designStyle ?? null,
            colorPalette: answers.colorPalette ?? null,
            budget: answers.budget ?? null,
            keepItems: answers.keepItems ?? null,
          };
        }
      } catch {
        // No session row — generate from defaults.
      }

      const suggestions = await suggestProductsForRendering(context);
      if (suggestions.length === 0) return [];

      try {
        await db.insert(productSuggestions).values(
          suggestions.map((s) => ({
            renderingId: input.renderingId,
            sessionId: null,
            category: s.category,
            productName: s.productName,
            retailer: s.retailer,
            affiliateUrl: s.affiliateUrl,
            imageUrl: s.imageUrl,
            price: s.price != null ? String(s.price) : null,
            position: s.position,
          })),
        );
      } catch {
        // Persist best-effort; still return the generated set below.
      }

      const stored = await db
        .select()
        .from(productSuggestions)
        .where(eq(productSuggestions.renderingId, input.renderingId));
      return stored.length > 0
        ? stored
        : suggestions.map((s, i) => ({
            id: -1 - i,
            renderingId: input.renderingId,
            sessionId: null,
            category: s.category,
            productName: s.productName,
            retailer: s.retailer,
            affiliateUrl: s.affiliateUrl,
            imageUrl: s.imageUrl,
            price: s.price != null ? String(s.price) : null,
            position: s.position,
            createdAt: new Date(),
          }));
    }),

  // Record a click (conversion instrumentation) and return the affiliate URL the
  // client should redirect/open.
  trackProductClick: publicProcedure
    .input(
      z.object({
        productSuggestionId: z.number(),
        sessionId: z.string().max(128).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ensureCommerceInfra();
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [suggestion] = await db
        .select()
        .from(productSuggestions)
        .where(eq(productSuggestions.id, input.productSuggestionId))
        .limit(1);
      if (!suggestion) throw new TRPCError({ code: "NOT_FOUND" });

      try {
        await db.insert(productClicks).values({
          productSuggestionId: input.productSuggestionId,
          userId: (ctx as any).user?.id ?? null,
          sessionId: input.sessionId ?? null,
        });
      } catch {
        // Click logging is best-effort; never block the redirect.
      }

      return { affiliateUrl: suggestion.affiliateUrl };
    }),

  // Future affiliate-network postback: mark a click as converted with an order
  // value so commission can be estimated/reconciled.
  // SECURITY REVIEW: public + trusts client-supplied orderValue with no signature
  // verification. Acceptable while estimate-only, but before any real payout is
  // derived from `converted`/`orderValue` this MUST verify an affiliate-network
  // HMAC/signature (or move behind a server-to-server secret) to prevent
  // click/commission inflation. Left public intentionally — affiliate network is the caller.
  recordConversion: publicProcedure
    .input(
      z.object({
        productSuggestionId: z.number(),
        orderValue: z.number().nonnegative().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      await ensureCommerceInfra();
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const res = await db
        .update(productClicks)
        .set({
          converted: true,
          convertedAt: new Date(),
          orderValue: input.orderValue != null ? String(input.orderValue) : null,
        })
        .where(
          and(
            eq(productClicks.productSuggestionId, input.productSuggestionId),
            eq(productClicks.converted, false),
          ),
        );
      return { success: true, updated: (res as any)?.rowsAffected ?? null };
    }),

  // The conversion number: impressions, clicks, CTR, conversions, est commission.
  getCommerceMetrics: adminProcedure.query(async () => {
    await ensureCommerceInfra();
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [impRow] = await db
      .select({ impressions: sql<number>`COUNT(*)` })
      .from(productSuggestions);

    const [clickRow] = await db
      .select({
        clicks: sql<number>`COUNT(*)`,
        conversions: sql<number>`SUM(CASE WHEN \`converted\` = true THEN 1 ELSE 0 END)`,
        orderVolume: sql<number>`COALESCE(SUM(\`orderValue\`), 0)`,
      })
      .from(productClicks);

    const impressions = Number(impRow?.impressions ?? 0);
    const clicks = Number(clickRow?.clicks ?? 0);
    const conversions = Number(clickRow?.conversions ?? 0);
    const orderVolume = Number(clickRow?.orderVolume ?? 0);

    const ctr = impressions > 0 ? clicks / impressions : 0;
    const conversionRate = clicks > 0 ? conversions / clicks : 0;
    const estCommission = orderVolume * PHASE_1_AFFILIATE_RATE;

    return {
      impressions,
      clicks,
      ctr: Number(ctr.toFixed(4)),
      conversions,
      conversionRate: Number(conversionRate.toFixed(4)),
      orderVolume: Number(orderVolume.toFixed(2)),
      affiliateRate: PHASE_1_AFFILIATE_RATE,
      estCommission: Number(estCommission.toFixed(2)),
    };
  }),
});
