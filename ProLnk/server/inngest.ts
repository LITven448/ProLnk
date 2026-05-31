import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "prolnk",
  name: "ProLnk",
  ...(process.env.INNGEST_EVENT_KEY ? { eventKey: process.env.INNGEST_EVENT_KEY } : {}),
});

export const nightlyPayoutSweep = inngest.createFunction(
  { id: "nightly-payout-sweep", name: "Nightly Payout Sweep", retries: 3, triggers: [{ cron: "30 2 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    logger.info("Starting nightly payout sweep");
    const result = await step.run("run-payout-sweep", async () => {
      const { getDb } = await import("./db");
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2025-02-24.acacia" as any });

      const db = await getDb();
      if (!db) return { swept: 0, errors: 0 };

      const rows = await db.execute(`
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
          const receivingCents = Math.round(parseFloat(jp.receivingPartnerPayout || "0") * 100);
          if (receivingCents >= 2500) {
            const transfer = await stripe.transfers.create({
              amount: receivingCents,
              currency: "usd",
              destination: jp.receivingStripeId,
              description: `ProLnk payout — Job Payment #${jp.id}`,
              metadata: { jobPaymentId: String(jp.id), sweep: "nightly" },
            });
            await db.execute(`
              UPDATE jobPayments SET status = 'paid_out', stripeTransferId = '${transfer.id}', updatedAt = NOW()
              WHERE id = ${jp.id}
            `);
            swept++;
          }
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

export const sweepExpiredLeadsJob = inngest.createFunction(
  { id: "sweep-expired-leads", name: "Sweep Expired Leads", retries: 2, triggers: [{ cron: "*/5 * * * *" }] },
  async ({ step }: { step: any }) => {
    return step.run("sweep", async () => {
      const { sweepExpiredLeads } = await import("./intake-router");
      return sweepExpiredLeads();
    });
  }
);

export const sweepExpiredOffersJob = inngest.createFunction(
  { id: "sweep-expired-offers", name: "Sweep Expired Job Offers", retries: 2, triggers: [{ cron: "*/15 * * * *" }] },
  async ({ step }: { step: any }) => {
    return step.run("sweep-offers", async () => {
      const { sweepExpiredOffers } = await import("./routers/matching");
      return sweepExpiredOffers();
    });
  }
);

export const nightlyComplianceScan = inngest.createFunction(
  { id: "nightly-compliance-scan", name: "Nightly Compliance Scan", retries: 2, triggers: [{ cron: "0 3 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("compliance-scan", async () => {
      const { runComplianceScan } = await import("./compliance-agent");
      const result = await runComplianceScan();
      logger.info(`Compliance scan: ${JSON.stringify(result)}`);
      return result;
    });
  }
);

export const nightlyStormScan = inngest.createFunction(
  { id: "nightly-storm-scan", name: "Nightly Storm Scan", retries: 2, triggers: [{ cron: "0 4 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    const stormResult = await step.run("storm-scan", async () => {
      const { runStormScan } = await import("./storm-agent");
      return runStormScan();
    });
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

export const nightlyPpsRecalculation = inngest.createFunction(
  { id: "nightly-pps-recalc", name: "Nightly PPS Recalculation", retries: 2, triggers: [{ cron: "0 2 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("pps-recalc", async () => {
      const { recalculateAllPartnerScores } = await import("./routers/partnerScore");
      const result = await recalculateAllPartnerScores();
      logger.info(`PPS recalc: ${result.updated} updated, ${result.errors} errors`);
      return result;
    });
  }
);

export const quarterlyBriefcaseReview = inngest.createFunction(
  { id: "quarterly-briefcase-review", name: "Quarterly Briefcase Review", retries: 2, triggers: [{ cron: "0 6 1 */3 *" }] },
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

export const biweeklyWaitlistEmail = inngest.createFunction(
  { id: "biweekly-waitlist-email", name: "Bi-Weekly Waitlist Email", retries: 2, triggers: [{ cron: "0 9 */14 * *" }] },
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

export const nightlyPostcardProcessor = inngest.createFunction(
  { id: "nightly-postcard-queue", name: "Nightly Postcard Queue", retries: 2, triggers: [{ cron: "0 1 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("process-postcards", async () => {
      const { processPostcardQueue } = await import("./lob");
      const result = await processPostcardQueue(100);
      logger.info(`Postcard queue: ${JSON.stringify(result)}`);
      return result;
    });
  }
);

export const dailyMarketingAutomation = inngest.createFunction(
  { id: "daily-marketing-automation", name: "Daily Marketing Automation", retries: 2, triggers: [{ cron: "0 8 * * *" }] },
  async ({ step }: { step: any }) => {
    return step.run("run-marketing", async () => {
      const { runDailyMarketingAutomation } = await import("./marketing-automation");
      return runDailyMarketingAutomation();
    });
  }
);

export const dailyCommissionDisbursement = inngest.createFunction(
  { id: "daily-commission-disbursement", name: "Daily Commission Disbursement", retries: 3, triggers: [{ cron: "0 9 * * *" }] },
  async ({ step, logger }: { step: any; logger: any }) => {
    return step.run("disburse-commission-payouts", async () => {
      const { disbursePendingPayouts } = await import("./routers/stripeConnect");
      const result = await disbursePendingPayouts();
      logger.info(`Commission disbursement: ${JSON.stringify(result)}`);
      return result;
    });
  }
);

export const functions = [
  nightlyPayoutSweep,
  dailyCommissionDisbursement,
  sweepExpiredLeadsJob,
  sweepExpiredOffersJob,
  nightlyComplianceScan,
  nightlyStormScan,
  nightlyPpsRecalculation,
  quarterlyBriefcaseReview,
  biweeklyWaitlistEmail,
  nightlyPostcardProcessor,
  dailyMarketingAutomation,
];
