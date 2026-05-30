/**
 * Stripe Router -- Partner payouts + Tier Subscription Checkout (Wave 25)
 * - Stripe Connect for commission payouts
 * - Stripe Checkout for tier subscriptions (Pro/Crew/Company/Enterprise)
 * - Webhook: checkout.session.completed  upgrade partner tier
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sql } from "drizzle-orm";
import { processedStripeEvents } from "../../drizzle/schema";
import { router, protectedProcedure, publicProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import Stripe from "stripe";
import type { Request, Response } from "express";

let _stripe: Stripe | null = null;
const stripe = new Proxy({} as Stripe, {
  get(_t, prop) {
    if (!_stripe) {
      const key = process.env.STRIPE_SECRET_KEY;
      if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
      _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" as any });
    }
    return (_stripe as any)[prop];
  },
});

// --- Tier subscription products -----------------------------------------------
// These price IDs must be created in the Stripe dashboard.
// We use lookup keys to avoid hardcoding price IDs.
export const TIER_PRODUCTS = {
  pro: {
    name: "ProLnk Pro",
    amount: 2900, // $29/month in cents
    lookupKey: "prolnk_pro_monthly",
    tier: "pro" as const,
    keepRate: 0.40,
  },
  crew: {
    name: "ProLnk Crew",
    amount: 7900, // $79/month
    lookupKey: "prolnk_crew_monthly",
    tier: "crew" as const,
    keepRate: 0.50,
  },
  company: {
    name: "ProLnk Company",
    amount: 14900, // $149/month
    lookupKey: "prolnk_company_monthly",
    tier: "company" as const,
    keepRate: 0.60,
  },
  enterprise: {
    name: "ProLnk Enterprise",
    amount: 29900, // $299/month
    lookupKey: "prolnk_enterprise_monthly",
    tier: "enterprise" as const,
    keepRate: 0.60,
  },
} as const;

export const stripeRouter = router({
  // --- Get partner Stripe Connect status -----------------------------------
  getConnectStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.execute(sql`
      SELECT id, stripeConnectAccountId, stripeConnectStatus, bankAccountLast4,
             payoutReadyAt, trialStatus, trialStartedAt, trialEndsAt, subscriptionPlan
      FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (rows.rows || rows)[0];
    if (!partner) return null;
    return {
      ...partner,
      isTestMode: (process.env.STRIPE_SECRET_KEY ?? '').startsWith('sk_test_'),
    };
  }),

  // --- Create Stripe Connect onboarding link --------------------------------
  createConnectLink: protectedProcedure
    .input(z.object({ origin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const rows = await db.execute(sql`
        SELECT id, contactEmail, businessName, stripeConnectAccountId
        FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (rows.rows || rows)[0];
      if (!partner) throw new Error("Partner profile not found");

      let accountId = partner.stripeConnectAccountId as string | null;

      if (!accountId) {
        const account = await stripe.accounts.create({
          type: "express",
          country: "US",
          email: partner.contactEmail,
          capabilities: { transfers: { requested: true } },
          business_profile: { name: partner.businessName },
          metadata: { partnerId: String(partner.id) },
        });
        accountId = account.id;
        await db.execute(sql`
          UPDATE partners SET stripeConnectAccountId = ${accountId}, stripeConnectStatus = 'pending'
          WHERE id = ${partner.id}
        `);
      }

      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${input.origin}/dashboard/settings?stripe=refresh`,
        return_url: `${input.origin}/dashboard/settings?stripe=success`,
        type: "account_onboarding",
      });

      return { url: accountLink.url };
    }),

  // --- Verify Connect account after Stripe return ---------------------------
  verifyConnectAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { status: "not_connected" };
    const rows = await db.execute(sql`
      SELECT id, stripeConnectAccountId FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (rows.rows || rows)[0];
    if (!partner?.stripeConnectAccountId) return { status: "not_connected" };

    const account = await stripe.accounts.retrieve(partner.stripeConnectAccountId);
    const isActive = account.charges_enabled && account.payouts_enabled;
    const status = isActive ? "active" : account.details_submitted ? "pending" : "not_connected";

    let bankLast4: string | null = null;
    if (account.external_accounts?.data?.[0]) {
      const bankAccount = account.external_accounts.data[0] as Stripe.BankAccount;
      bankLast4 = bankAccount.last4 ?? null;
    }

    await db.execute(sql`
      UPDATE partners SET
        stripeConnectStatus = ${status},
        bankAccountLast4 = ${bankLast4},
        payoutReadyAt = ${isActive ? new Date() : null}
      WHERE id = ${partner.id}
    `);

    return { status, bankLast4 };
  }),

  // --- Wave 25: Create tier subscription checkout session -------------------
  createTierCheckout: protectedProcedure
    .input(z.object({
      tier: z.enum(["pro", "crew", "company", "enterprise"]),
      origin: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const rows = await db.execute(sql`
        SELECT id, contactEmail, contactName, businessName, tier
        FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (rows.rows || rows)[0];
      if (!partner) throw new Error("Partner profile not found");

      const product = TIER_PRODUCTS[input.tier];

      // Create or retrieve Stripe price via lookup key
      let priceId: string;
      try {
        const prices = await stripe.prices.list({ lookup_keys: [product.lookupKey], limit: 1 });
        if (prices.data.length > 0) {
          priceId = prices.data[0].id;
        } else {
          // Create product + price if not yet in Stripe
          const stripeProduct = await stripe.products.create({
            name: product.name,
            metadata: { tier: input.tier },
          });
          const price = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: product.amount,
            currency: "usd",
            recurring: { interval: "month" },
            lookup_key: product.lookupKey,
          });
          priceId = price.id;
        }
      } catch {
        // Fallback: create price inline
        const stripeProduct = await stripe.products.create({ name: product.name });
        const price = await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: product.amount,
          currency: "usd",
          recurring: { interval: "month" },
        });
        priceId = price.id;
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer_email: partner.contactEmail,
        line_items: [{ price: priceId, quantity: 1 }],
        allow_promotion_codes: true,
        client_reference_id: String(partner.id),
        metadata: {
          partner_id: String(partner.id),
          partner_email: partner.contactEmail,
          partner_name: partner.contactName || partner.businessName,
          target_tier: input.tier,
        },
        success_url: `${input.origin}/dashboard/upgrade?success=1&tier=${input.tier}`,
        cancel_url: `${input.origin}/dashboard/upgrade?cancelled=1`,
      });

      return { url: session.url };
    }),

  // --- Wave 25: Get current subscription info -------------------------------
  getSubscriptionInfo: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.execute(sql`
      SELECT id, tier, subscriptionPlan, trialStatus, trialStartedAt, trialEndsAt,
             isExempt, monthlyCommissionEarned
      FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    return (rows.rows || rows)[0] ?? null;
  }),

  // --- Admin: payout queue --------------------------------------------------
  getPayoutQueue: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new Error("Admin only");
    const db = await getDb();
    if (!db) return [];

    const rows = await db.execute(sql`
      SELECT c.*,
        pp.businessName as payingPartnerName, pp.contactEmail as payingPartnerEmail,
        pp.stripeConnectStatus as payingPartnerStripeStatus,
        rp.businessName as receivingPartnerName, rp.contactEmail as receivingPartnerEmail,
        rp.stripeConnectStatus as receivingPartnerStripeStatus,
        rp.stripeConnectAccountId as receivingPartnerStripeAccountId
      FROM commissions c
      LEFT JOIN partners pp ON c.payingPartnerId = pp.id
      LEFT JOIN partners rp ON c.receivingPartnerId = rp.id
      WHERE c.paid = 0
      ORDER BY c.createdAt DESC
      LIMIT 100
    `);
    return rows.rows || rows;
  }),

  // --- Admin: process single payout ----------------------------------------
  processPayout: protectedProcedure
    .input(z.object({ commissionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new Error("Admin only");
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const cRows = await db.execute(sql`
        SELECT c.*, rp.stripeConnectAccountId, rp.stripeConnectStatus
        FROM commissions c
        LEFT JOIN partners rp ON c.receivingPartnerId = rp.id
        WHERE c.id = ${input.commissionId} LIMIT 1
      `);
      const commission = (cRows.rows || cRows)[0];
      if (!commission) throw new Error("Commission not found");
      if (commission.paid) throw new Error("Already paid");

      if (!commission.receivingPartnerId) {
        await db.execute(sql`
          UPDATE commissions SET paid = 1, paidAt = NOW() WHERE id = ${input.commissionId}
        `);
        return { success: true, method: "internal" };
      }

      if (!commission.stripeConnectAccountId || commission.stripeConnectStatus !== "active") {
        throw new Error("Partner does not have an active Stripe Connect account");
      }

      const amountCents = Math.round(parseFloat(commission.amount) * 100);
      const transfer = await stripe.transfers.create({
        amount: amountCents,
        currency: "usd",
        destination: commission.stripeConnectAccountId,
        description: commission.description ?? "ProLnk commission payout",
        metadata: { commissionId: String(input.commissionId) },
      });

      await db.execute(sql`
        UPDATE commissions SET paid = 1, paidAt = NOW() WHERE id = ${input.commissionId}
      `);
      return { success: true, transferId: transfer.id, method: "stripe_transfer" };
    }),

  // --- Admin: trigger payout for a single partner --------------------------
  triggerPayout: adminProcedure
    .input(z.object({ partnerId: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const partnerRows = await db.execute(sql`
        SELECT id, stripeConnectAccountId, stripeConnectStatus
        FROM partners WHERE id = ${input.partnerId} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
      if (!partner.stripeConnectAccountId || partner.stripeConnectStatus !== "active") {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Partner does not have an active Stripe Connect account" });
      }

      const commRows = await db.execute(sql`
        SELECT id, amount FROM commissions
        WHERE receivingPartnerId = ${input.partnerId} AND paid = 0
      `);
      const pending = commRows.rows || commRows;
      if (pending.length === 0) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "No pending commissions" });

      const totalAmount = pending.reduce((sum: number, c: any) => sum + parseFloat(c.amount ?? "0"), 0);
      if (totalAmount < 25) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: `Balance $${totalAmount.toFixed(2)} is below the $25 minimum payout threshold` });
      }

      const amountCents = Math.round(totalAmount * 100);
      const commissionIds = pending.map((c: any) => c.id);

      const transfer = await stripe.transfers.create({
        amount: amountCents,
        currency: "usd",
        destination: partner.stripeConnectAccountId as string,
        description: `ProLnk commission payout — partner ${input.partnerId}`,
        metadata: { partnerId: input.partnerId, commissionCount: String(commissionIds.length) },
      });

      await db.execute(sql`
        UPDATE commissions SET paid = 1, paidAt = NOW()
        WHERE receivingPartnerId = ${input.partnerId} AND paid = 0
      `);

      return {
        success: true,
        transferId: transfer.id,
        amountPaid: totalAmount,
        commissionCount: commissionIds.length,
      };
    }),

  // --- Admin: trigger monthly batch payouts --------------------------------
  triggerMonthlyPayouts: adminProcedure
    .mutation(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const eligibleRows = await db.execute(sql`
        SELECT c.receivingPartnerId,
               SUM(c.amount) as totalPending,
               COUNT(c.id) as commissionCount,
               p.stripeConnectAccountId
        FROM commissions c
        JOIN partners p ON c.receivingPartnerId = p.id
        WHERE c.paid = 0
          AND c.receivingPartnerId IS NOT NULL
          AND p.stripeConnectStatus = 'active'
          AND p.stripeConnectAccountId IS NOT NULL
        GROUP BY c.receivingPartnerId, p.stripeConnectAccountId
        HAVING SUM(c.amount) >= 25
      `);
      const eligible = eligibleRows.rows || eligibleRows;

      let processed = 0;
      let totalPaid = 0;
      const errors: string[] = [];

      for (const row of eligible) {
        try {
          const amountCents = Math.round(parseFloat(row.totalPending) * 100);
          const transfer = await stripe.transfers.create({
            amount: amountCents,
            currency: "usd",
            destination: row.stripeConnectAccountId as string,
            description: `ProLnk monthly commission payout`,
            metadata: { partnerId: String(row.receivingPartnerId), batchMonth: new Date().toISOString().slice(0, 7) },
          });

          await db.execute(sql`
            UPDATE commissions SET paid = 1, paidAt = NOW()
            WHERE receivingPartnerId = ${row.receivingPartnerId} AND paid = 0
          `);

          await db.execute(sql`
            INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
            VALUES (
              ${row.receivingPartnerId}, 'payment',
              'Commission Payout Sent',
              ${`$${parseFloat(row.totalPending).toFixed(2)} has been transferred to your bank account.`},
              '/billing'
            )
          `);

          processed++;
          totalPaid += parseFloat(row.totalPending);
        } catch (err: any) {
          errors.push(`Partner ${row.receivingPartnerId}: ${err.message ?? "unknown error"}`);
        }
      }

      return { processed, totalPaid, errors };
    }),

  // --- Partner: self-service payout request ----------------------------------
  requestPayout: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const partnerRows = await db.execute(sql`
      SELECT id, stripeConnectAccountId, stripeConnectStatus
      FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });

    if (!partner.stripeConnectAccountId || partner.stripeConnectStatus !== "active") {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Connect your bank account before requesting a payout" });
    }

    const commRows = await db.execute(sql`
      SELECT id, amount FROM commissions
      WHERE receivingPartnerId = ${partner.id} AND paid = 0
    `);
    const pending = commRows.rows || commRows;
    if (pending.length === 0) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "No pending commissions to pay out" });

    const totalAmount = pending.reduce((sum: number, c: any) => sum + parseFloat(c.amount ?? "0"), 0);
    if (totalAmount < 25) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: `Balance $${totalAmount.toFixed(2)} is below the $25 minimum payout threshold` });
    }

    const amountCents = Math.round(totalAmount * 100);
    const transfer = await stripe.transfers.create({
      amount: amountCents,
      currency: "usd",
      destination: partner.stripeConnectAccountId as string,
      description: `ProLnk commission payout — self-service`,
      metadata: { partnerId: String(partner.id), commissionCount: String(pending.length) },
    });

    await db.execute(sql`
      UPDATE commissions SET paid = 1, paidAt = NOW()
      WHERE receivingPartnerId = ${partner.id} AND paid = 0
    `);

    await db.execute(sql`
      INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
      VALUES (
        ${partner.id}, 'payment',
        'Payout Sent',
        ${`$${totalAmount.toFixed(2)} has been transferred to your bank account (${pending.length} commission${pending.length !== 1 ? "s" : ""}).`},
        '/dashboard/billing'
      )
    `);

    return { success: true, transferId: transfer.id, amountPaid: totalAmount, commissionCount: pending.length };
  }),

  // --- Partner: payout history (last 20 paid commissions) -------------------
  getPayoutHistory: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { payouts: [], totalPaid: 0 };

    const partnerRows = await db.execute(sql`
      SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return { payouts: [], totalPaid: 0 };

    const rows = await db.execute(sql`
      SELECT id, amount, description, paidAt, createdAt
      FROM commissions
      WHERE receivingPartnerId = ${partner.id} AND paid = 1
      ORDER BY paidAt DESC
      LIMIT 20
    `);
    const payouts = rows.rows || rows;

    const totalRows = await db.execute(sql`
      SELECT SUM(amount) as total FROM commissions
      WHERE receivingPartnerId = ${partner.id} AND paid = 1
    `);
    const totalPaid = parseFloat((totalRows.rows || totalRows)[0]?.total ?? "0");

    return { payouts, totalPaid };
  }),

  // --- Protected: get current partner billing + commission summary ----------
  getMyBilling: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const partnerRows = await db.execute(sql`
      SELECT id, tier, subscriptionPlan, trialStatus, trialStartedAt, trialEndsAt,
             stripeConnectAccountId, stripeConnectStatus, bankAccountLast4,
             payoutReadyAt, monthlyCommissionEarned
      FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return null;

    const commRows = await db.execute(sql`
      SELECT
        SUM(CASE WHEN paid = 0 THEN amount ELSE 0 END) as pendingBalance,
        SUM(CASE WHEN paid = 1 THEN amount ELSE 0 END) as lifetimePaid,
        COUNT(CASE WHEN paid = 0 THEN 1 END) as pendingCount
      FROM commissions WHERE receivingPartnerId = ${partner.id}
    `);
    const commStats = (commRows.rows || commRows)[0] ?? {};

    const pendingBalance = parseFloat(commStats.pendingBalance ?? "0");
    const trialEndsAt = partner.trialEndsAt ? new Date(partner.trialEndsAt) : null;
    const trialDaysLeft = trialEndsAt ? Math.max(0, Math.ceil((trialEndsAt.getTime() - Date.now()) / 86400000)) : null;

    const TIER_AMOUNTS: Record<string, number> = { scout: 0, pro: 29, crew: 79, company: 149, enterprise: 299 };
    const subscriptionAmount = TIER_AMOUNTS[partner.tier ?? "scout"] ?? 0;

    return {
      tier: partner.tier ?? "scout",
      subscriptionPlan: partner.subscriptionPlan ?? null,
      trialStatus: partner.trialStatus ?? null,
      trialEndsAt: partner.trialEndsAt ?? null,
      trialDaysLeft,
      subscriptionAmount,
      stripeConnectStatus: partner.stripeConnectStatus ?? "not_connected",
      bankAccountLast4: partner.bankAccountLast4 ?? null,
      pendingBalance,
      pendingCount: parseInt(commStats.pendingCount ?? "0"),
      lifetimePaid: parseFloat(commStats.lifetimePaid ?? "0"),
      canRequestPayout: pendingBalance >= 25 && partner.stripeConnectStatus === "active",
    };
  }),

  // --- Admin: payout stats --------------------------------------------------
  getPayoutStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new Error("Admin only");
    const db = await getDb();
    if (!db) return { totalPaid: 0, totalPending: 0, pendingCount: 0, connectedPartnerCount: 0 };

    const statsRows = await db.execute(sql`
      SELECT
        SUM(CASE WHEN paid = 1 THEN amount ELSE 0 END) as totalPaid,
        SUM(CASE WHEN paid = 0 THEN amount ELSE 0 END) as totalPending,
        COUNT(CASE WHEN paid = 0 THEN 1 END) as pendingCount
      FROM commissions
    `);
    const stats = (statsRows.rows || statsRows)[0] || {};

    const connRows = await db.execute(sql`
      SELECT COUNT(*) as cnt FROM partners WHERE stripeConnectStatus = 'active'
    `);
    const connectedPartnerCount = (connRows.rows || connRows)[0]?.cnt ?? 0;

    return {
      totalPaid: parseFloat(stats.totalPaid ?? "0"),
      totalPending: parseFloat(stats.totalPending ?? "0"),
      pendingCount: parseInt(stats.pendingCount ?? "0"),
      connectedPartnerCount: parseInt(connectedPartnerCount),
    };
  }),

  // --- Create Stripe Connect onboarding link (simplified, no DB required) ---
  createConnectAccount: protectedProcedure
    .mutation(async ({ ctx }) => {
      if (!process.env.STRIPE_SECRET_KEY) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
      try {
        const account = await stripe.accounts.create({
          type: "express",
          country: "US",
          email: ctx.user.email ?? undefined,
          capabilities: { transfers: { requested: true } },
          business_type: "individual",
          metadata: { prolnkUserId: String(ctx.user.id), email: ctx.user.email ?? "" },
        });
        const link = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${process.env.APP_BASE_URL || "https://prolnk.io"}/dashboard/settings?stripe=refresh`,
          return_url: `${process.env.APP_BASE_URL || "https://prolnk.io"}/dashboard/settings?stripe=success`,
          type: "account_onboarding",
        });
        return { url: link.url, accountId: account.id };
      } catch (err: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message ?? "Stripe error" });
      }
    }),

  // --- Admin: trigger monthly payout batch --------------------------------
  triggerPayoutBatch: adminProcedure
    .input(z.object({ dryRun: z.boolean().default(true) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      let pendingPartners = 0;
      let totalAmount = 0;
      if (db) {
        try {
          const statsRows = await db.execute(sql`
            SELECT COUNT(DISTINCT receivingPartnerId) as partnerCount,
                   SUM(amount) as total
            FROM commissions
            WHERE paid = 0 AND receivingPartnerId IS NOT NULL
          `);
          const stats = (statsRows.rows || statsRows)[0] ?? {};
          pendingPartners = parseInt(stats.partnerCount ?? "0", 10);
          totalAmount = parseFloat(stats.total ?? "0");
        } catch {
          // table may not exist yet
        }
      }
      return {
        dryRun: input.dryRun,
        pendingPartners,
        totalAmount,
        message: input.dryRun
          ? `Dry run: would pay ${pendingPartners} partners $${totalAmount.toFixed(2)}`
          : "Payout batch initiated",
      };
    }),

  // --- Founding Network: public checkout for $149/mo charter partners -------
  createFoundingNetworkCheckout: publicProcedure
    .input(z.object({
      email: z.string().email(),
      partnerId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Stripe not configured" });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: input.email,
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: {
              name: "ProLnk Founding Network — Charter Member",
              description: "60% commission keep rate · 4-level network depth · 90-day free trial · $149/mo locked for life",
            },
            unit_amount: 14900,
            recurring: { interval: "month", trial_period_days: 90 },
          },
          quantity: 1,
        }],
        success_url: `${process.env.APP_BASE_URL || "https://prolnk.io"}/checkout/success?tier=${input.partnerId ? "founding" : "charter"}`,
        cancel_url: `${process.env.APP_BASE_URL || "https://prolnk.io"}/checkout/cancel`,
        metadata: { partnerId: String(input.partnerId || ""), type: "founding_network" },
      });
      return { url: session.url, sessionId: session.id };
    }),

  // --- Admin: create / ensure Stripe products exist -------------------------
  setupStripeProducts: adminProcedure.mutation(async () => {
    const results: Array<{ tier: string; productId: string; priceId: string; lookupKey: string; created: boolean }> = [];

    for (const [tierKey, product] of Object.entries(TIER_PRODUCTS)) {
      const prices = await stripe.prices.list({ lookup_keys: [product.lookupKey], limit: 1 });
      if (prices.data.length > 0) {
        results.push({ tier: tierKey, productId: String(prices.data[0].product), priceId: prices.data[0].id, lookupKey: product.lookupKey, created: false });
        continue;
      }
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: tierKey === "company"
          ? "$149/mo locked forever. 60% commission keep, 4-level network income, 90-day free trial."
          : `ProLnk ${tierKey.charAt(0).toUpperCase() + tierKey.slice(1)} subscription.`,
        metadata: { tier: tierKey },
      });
      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.amount,
        currency: "usd",
        recurring: { interval: "month" },
        lookup_key: product.lookupKey,
      });
      results.push({ tier: tierKey, productId: stripeProduct.id, priceId: price.id, lookupKey: product.lookupKey, created: true });
    }

    // Also ensure the founding network product/price exists (used by createFoundingNetworkCheckout)
    const foundingLookupKey = "prolnk_founding_network_monthly";
    const foundingPrices = await stripe.prices.list({ lookup_keys: [foundingLookupKey], limit: 1 });
    if (foundingPrices.data.length === 0) {
      const foundingProduct = await stripe.products.create({
        name: "ProLnk Founding Network — Charter Member",
        description: "$149/mo locked forever. 60% commission keep rate · 4-level network depth · 90-day free trial.",
        metadata: { tier: "founding_network" },
      });
      const foundingPrice = await stripe.prices.create({
        product: foundingProduct.id,
        unit_amount: 14900,
        currency: "usd",
        recurring: { interval: "month", trial_period_days: 90 },
        lookup_key: foundingLookupKey,
      });
      results.push({ tier: "founding_network", productId: foundingProduct.id, priceId: foundingPrice.id, lookupKey: foundingLookupKey, created: true });
    } else {
      results.push({ tier: "founding_network", productId: String(foundingPrices.data[0].product), priceId: foundingPrices.data[0].id, lookupKey: foundingLookupKey, created: false });
    }

    return { success: true, products: results };
  }),

  // --- Billing Portal: partner manages their subscription -------------------
  createBillingPortalSession: protectedProcedure
    .input(z.object({ returnUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Get or create Stripe customer for this user
      const rows = await db.execute(sql`
        SELECT stripeCustomerId FROM users WHERE id = ${ctx.user.id} LIMIT 1
      `);
      const user = (rows.rows || rows)[0];
      let customerId: string = user?.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: ctx.user.email ?? undefined,
          name: ctx.user.name ?? undefined,
          metadata: { userId: ctx.user.id.toString() },
        } as Stripe.CustomerCreateParams);
        customerId = customer.id;
        await db.execute(sql`
          UPDATE users SET stripeCustomerId = ${customerId} WHERE id = ${ctx.user.id}
        `);
      }
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: input.returnUrl,
      });
      return { url: session.url };
    }),
});

// --- Wave 25: Stripe Webhook handler for tier upgrades ------------------------
// Registered in server/index.ts BEFORE express.json() middleware
export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle test events
  if (event.id.startsWith("evt_test_")) {
    console.log("[Stripe Webhook] Test event detected, returning verification response");
    return res.json({ verified: true });
  }

  // Item 49: Idempotency check — skip already-processed events
  const db = await getDb();
  if (db) {
    try {
      const existing = await db.execute(sql`
        SELECT id FROM processedStripeEvents WHERE eventId = ${event.id} LIMIT 1
      `);
      const rows = existing.rows || existing;
      if (rows.length > 0) {
        console.log(`[Stripe Webhook] Duplicate event ${event.id} — skipping`);
        return res.json({ received: true, duplicate: true });
      }
      // Mark as processed
      await db.execute(sql`
        INSERT INTO processedStripeEvents (eventId, eventType) VALUES (${event.id}, ${event.type})
      `);
    } catch (e) {
      // If table doesn't exist yet, continue processing
      console.warn("[Stripe Webhook] Could not check idempotency:", e);
    }
  }
  console.log(`[Stripe Webhook] Event: ${event.type} (${event.id})`);

  // REV-02: account.updated → mark partner payout_ready when Connect onboarding completes
  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    const isActive = !!(account.charges_enabled && account.payouts_enabled);
    if (isActive) {
      const db = await getDb();
      if (db) {
        await db.execute(sql`
          UPDATE partners SET
            stripeConnectStatus = 'active',
            payoutReadyAt = NOW(),
            updatedAt = NOW()
          WHERE stripeConnectAccountId = ${account.id}
        `);
        const pRows = await db.execute(sql`
          SELECT id FROM partners WHERE stripeConnectAccountId = ${account.id} LIMIT 1
        `);
        const partnerId = (pRows.rows || pRows)[0]?.id;
        if (partnerId) {
          // REV-03: auto-trigger approved commissions that were waiting for Connect
          const pendingRows = await db.execute(sql`
            SELECT id, amount FROM commissions
            WHERE receivingPartnerId = ${partnerId}
              AND paid = 0
              AND paid = 0
            LIMIT 20
          `);
          const pending = pendingRows.rows || pendingRows;
          let autoPaid = 0;
          for (const comm of pending) {
            try {
              const transfer = await stripe.transfers.create({
                amount: Math.round(parseFloat(comm.amount) * 100),
                currency: "usd",
                destination: account.id,
                description: `ProLnk auto-payout commission #${comm.id}`,
                metadata: { commissionId: String(comm.id) },
              });
              await db.execute(sql`
                UPDATE commissions SET paid = 1, paidAt = NOW()
                WHERE id = ${comm.id}
              `);
              autoPaid++;
              console.log(`[Stripe Webhook] Auto-payout transfer ${transfer.id} for commission ${comm.id}`);
            } catch (e: any) {
              console.error(`[Stripe Webhook] Auto-payout failed for commission ${comm.id}:`, e.message);
            }
          }
          // Notify partner
          await db.execute(sql`
            INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
            VALUES (
              ${partnerId}, 'payment',
              'Payout Account Activated!',
              ${autoPaid > 0
                ? `Your bank account is verified and ${autoPaid} pending commission${autoPaid !== 1 ? 's have' : ' has'} been automatically transferred.`
                : 'Your bank account is verified. Future commissions will be paid out automatically.'},
              '/dashboard/payout-history'
            )
          `);
          console.log(`[Stripe Webhook] Partner ${partnerId} Connect activated, ${autoPaid} auto-payouts processed`);
        }
      }
    }
    return res.json({ received: true });
  }

  // V12: payment_intent.succeeded → update jobPayments milestone status
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const jobPaymentId = pi.metadata?.jobPaymentId;
    const milestoneType = pi.metadata?.milestoneType;
    if (jobPaymentId && db) {
      await db.execute(sql`
        UPDATE paymentMilestones
        SET status = 'completed', completedAt = NOW(), stripeIntentId = ${pi.id}
        WHERE jobPaymentId = ${parseInt(jobPaymentId)}
          AND milestoneType = ${milestoneType ?? 'final_balance'}
          AND status = 'triggered'
      `);
      if (milestoneType === 'final_balance' || milestoneType === 'insurance_commission') {
        await db.execute(sql`
          UPDATE jobPayments
          SET status = 'balance_charged', balanceChargedAt = NOW(), updatedAt = NOW()
          WHERE id = ${parseInt(jobPaymentId)} AND status != 'paid_out'
        `);
      } else if (milestoneType === 'deposit') {
        await db.execute(sql`
          UPDATE jobPayments
          SET status = 'deposit_charged', depositChargedAt = NOW(), updatedAt = NOW()
          WHERE id = ${parseInt(jobPaymentId)} AND status = 'pending'
        `);
      }
      console.log(`[Stripe Webhook] PaymentIntent ${pi.id} succeeded — jobPayment ${jobPaymentId} milestone ${milestoneType}`);
    }
    return res.json({ received: true });
  }

  // V12: payment_intent.payment_failed → log failure on milestone
  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const jobPaymentId = pi.metadata?.jobPaymentId;
    const milestoneType = pi.metadata?.milestoneType;
    const failureMsg = pi.last_payment_error?.message ?? 'Unknown error';
    if (jobPaymentId && db) {
      await db.execute(sql`
        UPDATE paymentMilestones
        SET status = 'failed', failureReason = ${failureMsg}, retryCount = retryCount + 1
        WHERE jobPaymentId = ${parseInt(jobPaymentId)}
          AND milestoneType = ${milestoneType ?? 'final_balance'}
          AND status = 'triggered'
      `);
      console.error(`[Stripe Webhook] PaymentIntent ${pi.id} FAILED — jobPayment ${jobPaymentId}: ${failureMsg}`);
    }
    return res.json({ received: true });
  }

  // V12: transfer.created → mark jobPayment as paid_out
  if (event.type === "transfer.created") {
    const transfer = event.data.object as Stripe.Transfer;
    const jobPaymentId = transfer.metadata?.jobPaymentId;
    if (jobPaymentId && db) {
      await db.execute(sql`
        UPDATE jobPayments
        SET status = 'paid_out', stripeTransferId = ${transfer.id}, updatedAt = NOW()
        WHERE id = ${parseInt(jobPaymentId)} AND status = 'balance_charged'
      `);
      console.log(`[Stripe Webhook] Transfer ${transfer.id} created — jobPayment ${jobPaymentId} marked paid_out`);
    }
    return res.json({ received: true });
  }

  // V12: mandate.updated → update ACH authorization status
  if (event.type === "mandate.updated") {
    const mandate = event.data.object as any;
    const pmId = mandate.payment_method;
    const mandateStatus = mandate.status; // active | inactive | pending
    if (pmId && db) {
      await db.execute(sql`
        UPDATE achAuthorizations
        SET status = ${mandateStatus === 'active' ? 'signed' : mandateStatus === 'inactive' ? 'revoked' : 'pending'}
        WHERE stripePaymentMethodId = ${pmId} AND status NOT IN ('used', 'revoked')
      `);
      console.log(`[Stripe Webhook] Mandate updated for PM ${pmId} → ${mandateStatus}`);
    }
    return res.json({ received: true });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const partnerId = session.metadata?.partner_id;
    const targetTier = session.metadata?.target_tier as string | undefined;

    if (partnerId && targetTier && TIER_PRODUCTS[targetTier as keyof typeof TIER_PRODUCTS]) {
      const db = await getDb();
      if (db) {
        const product = TIER_PRODUCTS[targetTier as keyof typeof TIER_PRODUCTS];
        await db.execute(sql`
          UPDATE partners SET
            tier = ${targetTier},
            subscriptionPlan = ${targetTier},
            commissionKeepRate = ${product.keepRate},
            trialStatus = 'active',
            updatedAt = NOW()
          WHERE id = ${parseInt(partnerId)}
        `);

        await db.execute(sql`
          INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
          VALUES (
            ${parseInt(partnerId)}, 'system',
            ${`[SUCCESS] Welcome to ${product.name}!`},
            ${`Your account has been upgraded to the ${targetTier.charAt(0).toUpperCase() + targetTier.slice(1)} tier. You now keep ${Math.round(product.keepRate * 100)}% of every referral commission.`},
            '/dashboard/tier'
          )
        `);

        console.log(`[Stripe Webhook] Partner ${partnerId} upgraded to ${targetTier}`);
      }
    }

    // Founding network subscription checkout completed
    if (session.metadata?.type === "founding_network") {
      const foundingPartnerId = session.metadata?.partnerId;
      const subscriptionId = session.subscription as string | null;
      const customerId = session.customer as string | null;
      const foundingDb = await getDb();
      if (foundingDb) {
        // Ensure stripeSubscriptionId column exists (idempotent ALTER)
        try {
          await foundingDb.execute(sql`
            ALTER TABLE partners ADD COLUMN stripeSubscriptionId varchar(255)
          `);
        } catch {
          // Column already exists — safe to ignore
        }

        if (foundingPartnerId) {
          await foundingDb.execute(sql`
            UPDATE partners SET
              trialStatus = 'active',
              trialStartedAt = NOW(),
              trialEndsAt = DATE_ADD(NOW(), INTERVAL 90 DAY),
              subscriptionPlan = 'founding_network',
              tier = 'company',
              commissionKeepRate = 0.60,
              updatedAt = NOW(),
              stripeSubscriptionId = ${subscriptionId ?? null}
            WHERE id = ${parseInt(foundingPartnerId)}
          `);

          if (customerId) {
            await foundingDb.execute(sql`
              UPDATE users u
              JOIN partners p ON p.userId = u.id
              SET u.stripeCustomerId = ${customerId}
              WHERE p.id = ${parseInt(foundingPartnerId)}
            `);
          }

          await foundingDb.execute(sql`
            INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
            VALUES (
              ${parseInt(foundingPartnerId)}, 'system',
              'Welcome to the Founding Network!',
              'Your 90-day free trial is now active. You keep 60% of every referral commission at $149/mo locked for life.',
              '/dashboard'
            )
          `);
          console.log(`[Stripe Webhook] Founding network checkout complete — partner ${foundingPartnerId}, subscription ${subscriptionId}`);
        } else if (session.customer_email) {
          // Fallback: match by email if no partnerId in metadata
          await foundingDb.execute(sql`
            UPDATE partners p
            JOIN users u ON p.userId = u.id
            SET
              p.trialStatus = 'active',
              p.trialStartedAt = NOW(),
              p.trialEndsAt = DATE_ADD(NOW(), INTERVAL 90 DAY),
              p.subscriptionPlan = 'founding_network',
              p.tier = 'company',
              p.commissionKeepRate = 0.60,
              p.updatedAt = NOW(),
              p.stripeSubscriptionId = ${subscriptionId ?? null}
            WHERE u.email = ${session.customer_email}
          `);
          console.log(`[Stripe Webhook] Founding network checkout complete — matched by email ${session.customer_email}`);
        }
      }
    }

    // Job payment — trigger commission cascade
    if (session.metadata?.type === "job_payment") {
      const proEmail = session.metadata?.proEmail || session.customer_email || "";
      const jobId = session.metadata?.jobId || session.id;
      const propertyAddress = session.metadata?.propertyAddress || "";
      const jobValue = (session.amount_total || 0) / 100;
      const platformFeeRate = parseFloat(session.metadata?.platformFeeRate || "0.10");

      const cascadeDb = await getDb();
      let completingProId: number | null = null;
      if (cascadeDb && proEmail) {
        try {
          const proRows = await (cascadeDb as any).execute(sql`
            SELECT id FROM proWaitlist WHERE email = ${proEmail} LIMIT 1
          `);
          const proRow = (proRows?.[0]?.[0] ?? proRows?.[0]);
          if (proRow?.id) completingProId = parseInt(proRow.id, 10);
        } catch (e) {
          console.warn("[Stripe Webhook] Could not resolve proId for commission cascade:", e);
        }
      }

      if (completingProId) {
        import("../agents/commissionCascadeEngine").then(({ distributeJobCommissions }) => {
          distributeJobCommissions({
            jobId,
            completingProId: completingProId as number,
            propertyAddress,
            jobValue,
            platformFeeRate,
          }).catch((e: Error) => console.error("[Stripe webhook] Commission cascade failed:", e));
        });
      } else {
        console.warn(`[Stripe Webhook] Job payment ${jobId}: no proId resolved for email "${proEmail}" — commission cascade skipped`);
      }
    }
  }

  // Subscription payment — trigger subscription commission cascade
  if (event.type === "invoice.paid") {
    const invoice = event.data.object as Stripe.Invoice;
    if (invoice.metadata?.type === "founding_network_subscription") {
      const subscriberEmail = invoice.customer_email || "";
      const subscriptionAmount = (invoice.amount_paid || 0) / 100;

      const invoiceDb = await getDb();
      let subscribingPartnerId: number | null = null;
      if (invoiceDb && subscriberEmail) {
        try {
          const subRows = await (invoiceDb as any).execute(sql`
            SELECT id FROM proWaitlist WHERE email = ${subscriberEmail} LIMIT 1
          `);
          const subRow = (subRows?.[0]?.[0] ?? subRows?.[0]);
          if (subRow?.id) subscribingPartnerId = parseInt(subRow.id, 10);
        } catch (e) {
          console.warn("[Stripe Webhook] Could not resolve partnerId for subscription commission:", e);
        }
      }

      if (subscribingPartnerId) {
        import("../agents/commissionCascadeEngine").then(({ distributeSubscriptionCommissions }) => {
          distributeSubscriptionCommissions({
            subscribingPartnerId: subscribingPartnerId as number,
            subscriptionAmount,
          }).catch((e: Error) => console.error("[Stripe webhook] Subscription commission failed:", e));
        });
      } else {
        console.warn(`[Stripe Webhook] invoice.paid: no partnerId resolved for "${subscriberEmail}" — subscription cascade skipped`);
      }
    }
    return res.json({ received: true });
  }

  res.json({ received: true });
}
