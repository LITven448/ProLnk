/**
 * Stripe Router -- Partner payouts + Tier Subscription Checkout (Wave 25)
 * - Stripe Connect for commission payouts
 * - Stripe Checkout for tier subscriptions (Pro/Crew/Company/Enterprise)
 * - Webhook: checkout.session.completed  upgrade partner tier
 */
import { z } from "zod";
import { sql } from "drizzle-orm";
import { processedStripeEvents } from "../../drizzle/schema";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import Stripe from "stripe";
import type { Request, Response } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia" as any,
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
    keepRate: 0.55,
  },
  crew: {
    name: "ProLnk Crew",
    amount: 7900, // $79/month
    lookupKey: "prolnk_crew_monthly",
    tier: "crew" as const,
    keepRate: 0.65,
  },
  company: {
    name: "ProLnk Company",
    amount: 14900, // $149/month
    lookupKey: "prolnk_company_monthly",
    tier: "company" as const,
    keepRate: 0.72,
  },
  enterprise: {
    name: "ProLnk Enterprise",
    amount: 29900, // $299/month
    lookupKey: "prolnk_enterprise_monthly",
    tier: "enterprise" as const,
    keepRate: 0.78,
  },
} as const;

export const stripeRouter = router({
  // --- Get partner Stripe Connect status -----------------------------------
  getConnectStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await (db as any).execute(sql`
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
      const rows = await (db as any).execute(sql`
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
        await (db as any).execute(sql`
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
    const rows = await (db as any).execute(sql`
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

    await (db as any).execute(sql`
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

      const rows = await (db as any).execute(sql`
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
        success_url: `${input.origin}/dashboard/tier?upgrade=success&tier=${input.tier}`,
        cancel_url: `${input.origin}/dashboard/tier?upgrade=cancelled`,
      });

      return { url: session.url };
    }),

  // --- Wave 25: Get current subscription info -------------------------------
  getSubscriptionInfo: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await (db as any).execute(sql`
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

    const rows = await (db as any).execute(sql`
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

      const cRows = await (db as any).execute(sql`
        SELECT c.*, rp.stripeConnectAccountId, rp.stripeConnectStatus
        FROM commissions c
        LEFT JOIN partners rp ON c.receivingPartnerId = rp.id
        WHERE c.id = ${input.commissionId} LIMIT 1
      `);
      const commission = (cRows.rows || cRows)[0];
      if (!commission) throw new Error("Commission not found");
      if (commission.paid) throw new Error("Already paid");

      if (!commission.receivingPartnerId) {
        await (db as any).execute(sql`
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

      await (db as any).execute(sql`
        UPDATE commissions SET paid = 1, paidAt = NOW() WHERE id = ${input.commissionId}
      `);
      return { success: true, transferId: transfer.id, method: "stripe_transfer" };
    }),

  // --- Admin: payout stats --------------------------------------------------
  getPayoutStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new Error("Admin only");
    const db = await getDb();
    if (!db) return { totalPaid: 0, totalPending: 0, pendingCount: 0, connectedPartnerCount: 0 };

    const statsRows = await (db as any).execute(sql`
      SELECT
        SUM(CASE WHEN paid = 1 THEN amount ELSE 0 END) as totalPaid,
        SUM(CASE WHEN paid = 0 THEN amount ELSE 0 END) as totalPending,
        COUNT(CASE WHEN paid = 0 THEN 1 END) as pendingCount
      FROM commissions
    `);
    const stats = (statsRows.rows || statsRows)[0] || {};

    const connRows = await (db as any).execute(sql`
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

  // --- Billing Portal: partner manages their subscription -------------------
  createBillingPortalSession: protectedProcedure
    .input(z.object({ returnUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Get or create Stripe customer for this user
      const rows = await (db as any).execute(sql`
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
        await (db as any).execute(sql`
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
      const existing = await (db as any).execute(sql`
        SELECT id FROM processedStripeEvents WHERE eventId = ${event.id} LIMIT 1
      `);
      const rows = existing.rows || existing;
      if (rows.length > 0) {
        console.log(`[Stripe Webhook] Duplicate event ${event.id} — skipping`);
        return res.json({ received: true, duplicate: true });
      }
      // Mark as processed
      await (db as any).execute(sql`
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
        await (db as any).execute(sql`
          UPDATE partners SET
            stripeConnectStatus = 'active',
            payoutReadyAt = NOW(),
            updatedAt = NOW()
          WHERE stripeConnectAccountId = ${account.id}
        `);
        const pRows = await (db as any).execute(sql`
          SELECT id FROM partners WHERE stripeConnectAccountId = ${account.id} LIMIT 1
        `);
        const partnerId = (pRows.rows || pRows)[0]?.id;
        if (partnerId) {
          // REV-03: auto-trigger approved commissions that were waiting for Connect
          const pendingRows = await (db as any).execute(sql`
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
              await (db as any).execute(sql`
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
          await (db as any).execute(sql`
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
      await (db as any).execute(sql`
        UPDATE paymentMilestones
        SET status = 'completed', completedAt = NOW(), stripeIntentId = ${pi.id}
        WHERE jobPaymentId = ${parseInt(jobPaymentId)}
          AND milestoneType = ${milestoneType ?? 'final_balance'}
          AND status = 'triggered'
      `);
      if (milestoneType === 'final_balance' || milestoneType === 'insurance_commission') {
        await (db as any).execute(sql`
          UPDATE jobPayments
          SET status = 'balance_charged', balanceChargedAt = NOW(), updatedAt = NOW()
          WHERE id = ${parseInt(jobPaymentId)} AND status != 'paid_out'
        `);
      } else if (milestoneType === 'deposit') {
        await (db as any).execute(sql`
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
      await (db as any).execute(sql`
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
      await (db as any).execute(sql`
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
      await (db as any).execute(sql`
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
        await (db as any).execute(sql`
          UPDATE partners SET
            tier = ${targetTier},
            subscriptionPlan = ${targetTier},
            commissionKeepRate = ${product.keepRate},
            trialStatus = 'active',
            updatedAt = NOW()
          WHERE id = ${parseInt(partnerId)}
        `);

        // In-app notification to partner
        await (db as any).execute(sql`
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
  }

  res.json({ received: true });
}
