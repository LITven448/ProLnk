/**
 * Inngest — Durable Background Jobs
 *
 * Replaces all setInterval/setTimeout background jobs with durable,
 * retryable Inngest functions. Jobs persist across server restarts.
 *
 * Register the Inngest serve handler in server/_core/index.ts:
 *   import { serve } from "inngest/express";
 *   import { inngest, functions } from "../inngest";
 *   app.use("/api/inngest", serve({ client: inngest, functions }));
 *
 * Install: pnpm add inngest
 */

import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "prolnk",
  name: "ProLnk",
  ...(process.env.INNGEST_EVENT_KEY ? { eventKey: process.env.INNGEST_EVENT_KEY } : {}),
});

// ─── Nightly Payout Sweep ─────────────────────────────────────────────────────
export const nightlyPayoutSweep = inngest.createFunction(
  { id: "nightly-payout-sweep", name: "Nightly Payout Sweep", retries: 3 },
  { cron: "30 2 * * *" }, // 2:30 AM daily
  async ({ step, logger }: { step: any; logger: any }) => {
    logger.info("Starting nightly payout sweep");
    const result = await step.run("run-payout-sweep", async () => {
      const { getDb } = await import("./db");
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2025-02-24.acacia" as any });
      const { sql } = await import("drizzle-orm");

      const db = await getDb();
      if (!db) return { swept: 0, errors: 0 };

      const rows = await (db as any).execute(`
        SELECT jp.id, jp.dealId, jp.receivingPartnerId, jp.receivingPartnerPayout,
               jp.referringPartnerId, jp.referringPartnerCommission,
               rp.stripeConnectAccountId as receivingStripeId,
               rp.businessName as receivingName,
               ref.stripeConnectAccountId as referringStripeId,
               ref.businessName as referringName
        FROM jobPayments jp
        LEFT JOIN partners rp ON jp.receivingPartnerId = rp.id
        LEFT JOIN partners ref ON jp.referringPartnerId = ref.id
        WHERE jp.status = 'balance_charged'
          AND rp.stripeConnectStatus = 'active'
          AND rp.stripeConnectAccountId IS NOT NULL
          AND jp.stripeTransferId IS NULL
        LIMIT 50
      `);
      const payments = rows.rows || rows;

      let swept = 0;
      let errors = 0;

      for (const jp of payments) {
        try {
          // Pay receiving partner
          const receivingCents = Math.round(parseFloat(jp.receivingPartnerPayout || "0") * 100);
          if (receivingCents >= 2500) { // $25 minimum
            const transfer = await stripe.transfers.create({
              amount: receivingCents,
              currency: "usd",
              destination: jp.receivingStripeId,
              description: `ProLnk payout — Job Payment #${jp.id}`,
              metadata: { jobPaymentId: String(jp.id), sweep: "nightly" },
            });
            await (db as any).execute(`
              UPDATE jobPayments SET status = 'paid_out', stripeTransferId = '${transfer.id}', updatedAt = NOW()
              WHERE id = ${jp.id}
            `);
            swept++;
          }

          // Pay referring partner commission (THIS WAS MISSING BEFORE)
          if (jp.referringStripeId && jp.referringPartnerCommission) {
            const referringCents = Math.round(parseFloat(jp.referringPartnerCommission) * 100);
            if (referringCents >= 2500) {
              await stripe.transfers.create({
                amount: referringCents,
                currency: "usd",
                destination: jp.referringStripeId,
                description: `ProLnk referral commission — Job Payment #${jp.id}`,
                metadata: { jobPaymentId: String(jp.id), type: "referral_commission" },
              });
            }
          }
        } catch (err: any) {
          errors++;
          console.error(`[PayoutSweep] Failed for ${jp.id}:`, err.message);
        }
      }

      return { swept, errors, total: payments.length };
    });
    logger.info(`Payout sweep complete: ${result.swept} paid, ${result.errors} errors`);
    return result;
  }
);

// ─── Lead Expiry Sweep ────────────────────────────────────────────────────────
export const sweepExpiredLeadsJob = inngest.createFunction(
  { id: "sweep-expired-leads", name: "Sweep Expired Leads", retries: 2 },
  { cron: "*/5 * * * *" }, // every 5 minutes
  async ({ step }: { step: any }) => {
    return step.run("sweep", async () => {
      const { sweepExpiredLeads } = await import("./intake-router");
      return sweepExpiredLeads();
    });
  }
);

// ─── Nightly Compliance Scan ──────────────────────────────────────────────────
export const nightlyComplianceScan = inngest.createFunction(
  { id: "nightly-compliance-scan", name: "Nightly Compliance Scan", retries: 2 },
  { cron: "0 3 * * *" }, // 3 AM daily
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("compliance-scan", async () => {
      const { runComplianceScan } = await import("./compliance-agent");
      const result = await runComplianceScan();
      logger.info(`Compliance scan: ${JSON.stringify(result)}`);
      return result;
    });
  }
);

// ─── Nightly Storm Scan ───────────────────────────────────────────────────────
export const nightlyStormScan = inngest.createFunction(
  { id: "nightly-storm-scan", name: "Nightly Storm Scan", retries: 2 },
  { cron: "0 4 * * *" }, // 4 AM daily
  async ({ step, logger }: { step: any; logger: any }) => {
    const stormResult = await step.run("storm-scan", async () => {
      const { runStormScan } = await import("./storm-agent");
      return runStormScan();
    });

    // Dispatch any storm leads found
    if (stormResult.leadsGenerated > 0) {
      await step.run("dispatch-storm-leads", async () => {
        const { dispatchPendingStormLeads } = await import("./storm-dispatch");
        return dispatchPendingStormLeads({ limit: 200 });
      });
    }

    logger.info(`Storm scan: ${JSON.stringify(stormResult)}`);
    return stormResult;
  }
);

// ─── Nightly PPS Recalculation ────────────────────────────────────────────────
export const nightlyPpsRecalculation = inngest.createFunction(
  { id: "nightly-pps-recalc", name: "Nightly PPS Recalculation", retries: 2 },
  { cron: "0 2 * * *" }, // 2 AM daily
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("pps-recalc", async () => {
      const { recalculateAllPartnerScores } = await import("./routers/partnerScore");
      const result = await recalculateAllPartnerScores();
      logger.info(`PPS recalc: ${result.updated} updated, ${result.errors} errors`);
      return result;
    });
  }
);

// ─── Quarterly Briefcase Review ───────────────────────────────────────────────
export const quarterlyBriefcaseReview = inngest.createFunction(
  { id: "quarterly-briefcase-review", name: "Quarterly Briefcase Review", retries: 2 },
  { cron: "0 6 1 */3 *" }, // 6 AM on the 1st of every 3rd month
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("briefcase-review", async () => {
      const { runBriefcaseQuarterlyReview } = await import("./routers/briefcase");
      const { runProPassQuarterlyReview } = await import("./routers/proPass");
      const [briefcaseResult, passResult] = await Promise.all([
        runBriefcaseQuarterlyReview(),
        runProPassQuarterlyReview(),
      ]);
      logger.info(`Briefcase review: ${JSON.stringify(briefcaseResult)}`);
      logger.info(`Pro Pass review: ${JSON.stringify(passResult)}`);
      return { briefcaseResult, passResult };
    });
  }
);

// ─── Bi-Weekly Waitlist Progress Email ────────────────────────────────────────
export const biweeklyWaitlistEmail = inngest.createFunction(
  { id: "biweekly-waitlist-email", name: "Bi-Weekly Waitlist Email", retries: 2 },
  { cron: "0 9 */14 * *" }, // 9 AM every 14 days
  async ({ step, logger }: { step: any; logger: any }) => {
    const [proResult, homeResult] = await Promise.all([
      step.run("send-pro-email", async () => {
        const { sendWaitlistProgressEmails } = await import("./waitlist-ai");
        return sendWaitlistProgressEmails("pro");
      }),
      step.run("send-home-email", async () => {
        const { sendWaitlistProgressEmails } = await import("./waitlist-ai");
        return sendWaitlistProgressEmails("homeowner");
      }),
    ]);
    logger.info(`Waitlist emails: pro=${JSON.stringify(proResult)}, home=${JSON.stringify(homeResult)}`);
    return { proResult, homeResult };
  }
);

// ─── Nightly Postcard Queue Processor ────────────────────────────────────────
export const nightlyPostcardProcessor = inngest.createFunction(
  { id: "nightly-postcard-queue", name: "Nightly Postcard Queue", retries: 2 },
  { cron: "0 1 * * *" }, // 1 AM daily
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("process-postcards", async () => {
      const { processPostcardQueue } = await import("./lob");
      const result = await processPostcardQueue(100);
      logger.info(`Postcard queue: ${JSON.stringify(result)}`);
      return result;
    });
  }
);

// ─── Daily Marketing Automation ───────────────────────────────────────────────
export const dailyMarketingAutomation = inngest.createFunction(
  { id: "daily-marketing-automation", name: "Daily Marketing Automation", retries: 2 },
  { cron: "0 8 * * *" }, // 8 AM daily
  async ({ step }: { step: any }) => {
    return step.run("run-marketing", async () => {
      const { runDailyMarketingAutomation } = await import("./marketing-automation");
      return runDailyMarketingAutomation();
    });
  }
);

// ─── Export all functions ─────────────────────────────────────────────────────
export const functions = [
  nightlyPayoutSweep,
  sweepExpiredLeadsJob,
  nightlyComplianceScan,
  nightlyStormScan,
  nightlyPpsRecalculation,
  quarterlyBriefcaseReview,
  biweeklyWaitlistEmail,
  nightlyPostcardProcessor,
  dailyMarketingAutomation,
];
