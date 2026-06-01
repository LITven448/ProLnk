/**
 * Stripe Connect Payout Rail (gated, no-op until activated)
 * ===========================================================
 *
 * This module is the SAFE, GATED payout rail that disburses `commission_payout`
 * rows to pros via Stripe Connect Transfers. It is fully inert until Andrew
 * flips it on — every exported function and every tRPC procedure no-ops and
 * returns a clear "Connect not enabled" status when the gate is closed. Nothing
 * here throws on the disabled path, and NONE of this touches the working
 * charge-IN flow in server/routers/stripe.ts or its handleStripeWebhook().
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ACTIVATION STEPS FOR ANDREW (do these in order):
 *
 *   1. In the Stripe Dashboard, enable Connect:
 *        Dashboard → Settings → Connect → "Get started" / enable Express accounts.
 *        (Platform profile must be completed so connected accounts can be created.)
 *
 *   2. Set the environment variable to turn this rail ON:
 *        STRIPE_CONNECT_ENABLED=true
 *      (STRIPE_SECRET_KEY must already be set — it is for the charge-in flow.)
 *
 *   3. Each pro completes onboarding:
 *        Client calls tRPC `stripeConnect.createOnboardingLink` → redirect the pro
 *        to the returned URL. Stripe walks them through KYC + bank details, then
 *        returns them to the app. `stripeConnect.getAccountStatus` reports when
 *        `payoutsEnabled` becomes true.
 *
 *   4. Disbursement then runs automatically:
 *        - Daily Inngest cron `daily-commission-disbursement` (09:00 UTC), and/or
 *        - POST /api/agents/disburse-payouts (x-agent-secret), and/or
 *        - tRPC `stripeConnect.triggerPayouts` (admin).
 *      Each pays out `commission_payout` rows in status 'pending' whose recipient
 *      pro has a Connect account with payouts enabled, then marks them 'paid'.
 *
 * Until step 2 is done, all of the above safely no-op.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { z } from "zod";
import { sql } from "drizzle-orm";
import type Stripe from "stripe";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";

// ── Gate ─────────────────────────────────────────────────────────────────────

export function isConnectEnabled(): boolean {
  return (
    process.env.STRIPE_CONNECT_ENABLED === "true" &&
    !!process.env.STRIPE_SECRET_KEY
  );
}

const DISABLED_STATUS = {
  enabled: false as const,
  reason: "Connect not enabled" as const,
};

let _stripe: Stripe | null = null;

/** Returns a Stripe client only when the rail is enabled; otherwise null (never throws). */
async function getStripe(): Promise<Stripe | null> {
  if (!isConnectEnabled()) return null;
  if (_stripe) return _stripe;
  const { default: StripeCtor } = await import("stripe");
  _stripe = new StripeCtor(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia" as any,
  });
  return _stripe;
}

async function execRows(db: any, query: ReturnType<typeof sql>): Promise<any[]> {
  const res = await db.execute(query);
  return res.rows || res || [];
}

// ── Connected-account onboarding ──────────────────────────────────────────────

/**
 * Self-heal: ensure the partners table has the Connect columns this rail needs.
 * Idempotent — mirrors ensureJobOffersInfra(). The base columns already exist in
 * the schema; the ADD COLUMN statements are no-ops on production DBs that have
 * them and silently recover on any DB that somehow predates them.
 */
let _infraEnsured = false;
export async function ensureConnectPayoutInfra(): Promise<void> {
  if (_infraEnsured) return;
  const db = await getDb();
  if (!db) return;
  const stmts = [
    "ALTER TABLE `partners` ADD COLUMN `stripeConnectAccountId` varchar(255)",
    "ALTER TABLE `partners` ADD COLUMN `stripeConnectStatus` varchar(255) NOT NULL DEFAULT 'not_connected'",
    "ALTER TABLE `commission_payout` ADD COLUMN `stripe_transfer_id` varchar(255)",
  ];
  for (const s of stmts) {
    try {
      await (db as any).execute(s);
    } catch {
      // Column already exists — expected and ignored.
    }
  }
  _infraEnsured = true;
}

async function partnerForUser(db: any, userId: number): Promise<any | null> {
  const rows = await execRows(
    db,
    sql`SELECT id, contactEmail, businessName, stripeConnectAccountId, stripeConnectStatus
        FROM partners WHERE userId = ${userId} LIMIT 1`
  );
  return rows[0] ?? null;
}

export const stripeConnectRouter = router({
  /**
   * createOnboardingLink — creates an Express connected account for the calling
   * partner (if they don't have one), stores the id, and returns an account
   * onboarding link. No-ops cleanly when Connect is disabled.
   */
  createOnboardingLink: protectedProcedure
    .input(
      z.object({
        origin: z.string().url().or(z.string().min(1)),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const stripe = await getStripe();
      if (!stripe) return { ...DISABLED_STATUS, url: null };

      await ensureConnectPayoutInfra();
      const db = await getDb();
      if (!db) return { enabled: true as const, url: null, reason: "Database unavailable" };

      const partner = await partnerForUser(db, ctx.user.id);
      if (!partner) {
        return { enabled: true as const, url: null, reason: "Partner profile not found" };
      }

      let accountId: string | null = partner.stripeConnectAccountId ?? null;
      if (!accountId) {
        const account = await stripe.accounts.create({
          type: "express",
          country: "US",
          email: partner.contactEmail ?? undefined,
          capabilities: { transfers: { requested: true } },
          business_profile: partner.businessName ? { name: partner.businessName } : undefined,
          metadata: { partnerId: String(partner.id) },
        });
        accountId = account.id;
        await db.execute(sql`
          UPDATE partners
          SET stripeConnectAccountId = ${accountId},
              stripeConnectStatus = 'pending'
          WHERE id = ${partner.id}
        `);
      }

      const link = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${input.origin}/dashboard/payouts?connect=refresh`,
        return_url: `${input.origin}/dashboard/payouts?connect=return`,
        type: "account_onboarding",
      });

      return { enabled: true as const, url: link.url, accountId, reason: null };
    }),

  /**
   * getAccountStatus — reports whether the calling partner's connected account is
   * onboarded / charges_enabled / payouts_enabled. No-ops when disabled.
   */
  getAccountStatus: protectedProcedure.query(async ({ ctx }) => {
    const stripe = await getStripe();
    if (!stripe) {
      return {
        ...DISABLED_STATUS,
        connected: false,
        onboarded: false,
        chargesEnabled: false,
        payoutsEnabled: false,
      };
    }

    const db = await getDb();
    if (!db) {
      return {
        enabled: true as const,
        reason: "Database unavailable",
        connected: false,
        onboarded: false,
        chargesEnabled: false,
        payoutsEnabled: false,
      };
    }

    const partner = await partnerForUser(db, ctx.user.id);
    const accountId: string | null = partner?.stripeConnectAccountId ?? null;
    if (!accountId) {
      return {
        enabled: true as const,
        reason: null,
        connected: false,
        onboarded: false,
        chargesEnabled: false,
        payoutsEnabled: false,
      };
    }

    const account = await stripe.accounts.retrieve(accountId);
    const chargesEnabled = !!account.charges_enabled;
    const payoutsEnabled = !!account.payouts_enabled;
    const onboarded = !!account.details_submitted && payoutsEnabled;

    await db
      .execute(
        sql`UPDATE partners
            SET stripeConnectStatus = ${onboarded ? "active" : account.details_submitted ? "pending" : "not_connected"}
            WHERE id = ${partner.id}`
      )
      .catch(() => {});

    return {
      enabled: true as const,
      reason: null,
      connected: true,
      onboarded,
      chargesEnabled,
      payoutsEnabled,
      accountId,
    };
  }),

  /**
   * triggerPayouts — admin-callable manual disbursement run.
   */
  triggerPayouts: adminProcedure.mutation(async () => {
    return disbursePendingPayouts();
  }),
});

// ── Disbursement ──────────────────────────────────────────────────────────────

export interface DisbursementResult {
  enabled: boolean;
  reason?: string;
  paid: number;
  skipped: number;
  errors: number;
  transferred?: number;
}

/**
 * disbursePendingPayouts — finds `commission_payout` rows in status 'pending'
 * whose recipient pro has a Connect account with payouts_enabled, creates a
 * Stripe Transfer for the amount, and marks the row 'paid' with the transfer id
 * + paidAt. Idempotent (re-checks status before transferring; records the
 * transfer id) and defensive (per-row try/catch). No-ops when Connect disabled.
 *
 * NOTE on recipient resolution: the commission engine writes the pro's id into
 * `commission_payout.recipient_user_id`. We resolve that id to a `partners` row
 * (matching either partners.id or partners.userId) to find the connected
 * account. Only rows whose recipient resolves to an `active` connected account
 * are paid; everything else is skipped (not failed).
 */
export async function disbursePendingPayouts(opts?: { limit?: number }): Promise<DisbursementResult> {
  if (!isConnectEnabled()) {
    return { ...DISABLED_STATUS, paid: 0, skipped: 0, errors: 0 };
  }

  const stripe = await getStripe();
  if (!stripe) {
    return { ...DISABLED_STATUS, paid: 0, skipped: 0, errors: 0 };
  }

  await ensureConnectPayoutInfra();
  const db = await getDb();
  if (!db) {
    return { enabled: true, reason: "Database unavailable", paid: 0, skipped: 0, errors: 0 };
  }

  const limit = opts?.limit ?? 200;

  // RECIPIENT ID CONTRACT (SEAM-2 + SEAM-3): commission_payout.recipient_user_id
  // is an upline/originator pro id written by the ONE cascade engine
  // (commissionCascadeEngine.ts). ALL payout-bearing job completions now flow
  // through that engine — both the matched loop (routers.ts completeJob) AND FSM
  // webhooks (fsm-webhooks.ts autoCloseCommission) — so they share this single
  // recipient id-space. The engine resolves uplines from pro_upline_chain /
  // pro_network_profile joined to proWaitlist, so recipient_user_id is a
  // proWaitlist.id (network-profile user id). This join resolves that recipient to a
  // partners row via THREE paths: partners.id, partners.userId, OR the email
  // fallback (proWaitlist.email = partners.contactEmail). Rows that resolve to no
  // active connected account are SKIPPED (not failed). Confirm proWaitlist↔partners
  // linkage (preferably the email fallback) before enabling Connect in production.
  const rows = await execRows(
    db,
    sql`
      SELECT cp.id, cp.amount, cp.recipient_user_id, cp.status, cp.payout_type, cp.payout_month,
             p.id AS partnerId, p.stripeConnectAccountId AS accountId, p.stripeConnectStatus AS connectStatus
      FROM commission_payout cp
      LEFT JOIN proWaitlist pw
        ON pw.id = CAST(cp.recipient_user_id AS UNSIGNED)
      LEFT JOIN partners p
        ON p.id = CAST(cp.recipient_user_id AS UNSIGNED)
        OR p.userId = CAST(cp.recipient_user_id AS UNSIGNED)
        OR (pw.email IS NOT NULL AND p.contactEmail = pw.email)
      WHERE cp.status = 'pending'
      ORDER BY cp.created_at ASC
      LIMIT ${limit}
    `
  );

  let paid = 0;
  let skipped = 0;
  let errors = 0;
  let transferred = 0;

  for (const row of rows) {
    try {
      const accountId: string | null = row.accountId ?? null;
      const connectStatus: string | null = row.connectStatus ?? null;
      if (!accountId || connectStatus !== "active") {
        skipped++;
        continue;
      }

      const amountCents = Math.round(parseFloat(String(row.amount ?? "0")) * 100);
      if (!Number.isFinite(amountCents) || amountCents <= 0) {
        skipped++;
        continue;
      }

      // Idempotency: re-confirm this row is still 'pending' immediately before paying.
      const fresh = await execRows(
        db,
        sql`SELECT status, stripe_transfer_id FROM commission_payout WHERE id = ${row.id} LIMIT 1`
      );
      if (!fresh[0] || fresh[0].status !== "pending" || fresh[0].stripe_transfer_id) {
        skipped++;
        continue;
      }

      const transfer = await stripe.transfers.create(
        {
          amount: amountCents,
          currency: "usd",
          destination: accountId,
          description: `ProLnk commission payout #${row.id} (${row.payout_type ?? "commission"})`,
          metadata: {
            commissionPayoutId: String(row.id),
            payoutType: String(row.payout_type ?? ""),
            payoutMonth: String(row.payout_month ?? ""),
          },
        },
        { idempotencyKey: `commission_payout_${row.id}` }
      );

      await db.execute(sql`
        UPDATE commission_payout
        SET status = 'paid',
            stripe_transfer_id = ${transfer.id},
            paid_at = NOW()
        WHERE id = ${row.id} AND status = 'pending'
      `);

      paid++;
      transferred += amountCents;
    } catch (err: any) {
      errors++;
      console.error(`[disbursePendingPayouts] payout row ${row?.id} failed:`, err?.message ?? err);
    }
  }

  return { enabled: true, paid, skipped, errors, transferred };
}

// ── Connect webhook (account.updated, transfer.*) ─────────────────────────────

/**
 * handleConnectWebhook — small dedicated handler for Connect account + transfer
 * events. Registered at POST /api/stripe/connect-webhook. Gated + defensive:
 * verifies the signature with STRIPE_CONNECT_WEBHOOK_SECRET (falls back to
 * STRIPE_WEBHOOK_SECRET) and updates the partner's connect status on
 * account.updated. No-ops (200) when Connect is disabled so Stripe stops
 * retrying. Does NOT touch the charge-in webhook in stripe.ts.
 */
export async function handleConnectWebhook(req: any, res: any): Promise<void> {
  if (!isConnectEnabled()) {
    res.json({ received: true, enabled: false });
    return;
  }

  const stripe = await getStripe();
  if (!stripe) {
    res.json({ received: true, enabled: false });
    return;
  }

  const sig = req.headers["stripe-signature"] as string;
  const secret =
    process.env.STRIPE_CONNECT_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err: any) {
    console.error("[Connect Webhook] Signature verification failed:", err?.message);
    res.status(400).send(`Webhook Error: ${err?.message}`);
    return;
  }

  try {
    const db = await getDb();

    if (event.type === "account.updated" && db) {
      const account = event.data.object as Stripe.Account;
      const payoutsEnabled = !!account.payouts_enabled;
      const chargesEnabled = !!account.charges_enabled;
      const status = payoutsEnabled && chargesEnabled ? "active" : account.details_submitted ? "pending" : "not_connected";
      await db.execute(sql`
        UPDATE partners
        SET stripeConnectStatus = ${status},
            payoutReadyAt = ${status === "active" ? new Date() : null}
        WHERE stripeConnectAccountId = ${account.id}
      `);
      console.log(`[Connect Webhook] account.updated ${account.id} → ${status}`);
    }

    if ((event.type === "transfer.created" || event.type === "transfer.updated") && db) {
      const transfer = event.data.object as Stripe.Transfer;
      const payoutId = transfer.metadata?.commissionPayoutId;
      if (payoutId) {
        await db.execute(sql`
          UPDATE commission_payout
          SET status = 'paid',
              stripe_transfer_id = ${transfer.id},
              paid_at = COALESCE(paid_at, NOW())
          WHERE id = ${parseInt(payoutId, 10)} AND status = 'pending'
        `);
        console.log(`[Connect Webhook] ${event.type} → commission_payout ${payoutId} reconciled to transfer ${transfer.id}`);
      }
    }
  } catch (err: any) {
    console.error("[Connect Webhook] handler error:", err?.message ?? err);
  }

  res.json({ received: true });
}
