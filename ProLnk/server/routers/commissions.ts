import { adminProcedure, protectedProcedure, publicProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import {
  partners,
  proUplineChain,
  jobCommissionEvent,
  commissionPayout,
} from "../../drizzle/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { Decimal } from "decimal.js";

// ─── ProLnk Commission Engine — All Three Streams ─────────────────────────────
//
// How the platform fee works:
//   - Homeowner hires a pro. Pro completes the job and keeps 100% of job revenue.
//   - ProLnk charges a platform fee (6–15% of job value, varies by trade) SEPARATELY.
//   - That platform fee is what gets distributed across the three streams below.
//
// Stream 1: Home Origination Rights
//   The first pro to document a property in ProLnk holds permanent origination rights.
//   They earn 1.5% of the platform fee on EVERY job completed at that address, forever,
//   whether or not they do the work.
//
// Stream 2: Network Job Commissions
//   Flows UP the recruiting chain from the completing pro.
//   Direct recruiter (L1): 7% of platform fee
//   L1's recruiter  (L2): 4% of platform fee
//   L2's recruiter  (L3): 2% of platform fee
//   L3's recruiter  (L4): 1% of platform fee
//
// Stream 3: Network Subscription Commissions
//   Flows UP the recruiting chain from any active $149/mo subscriber.
//   L1 recruiter: 12% of $149 = $17.88/mo
//   L2:            6% of $149 =  $8.94/mo
//   L3:            3% of $149 =  $4.47/mo
//   L4:          1.5% of $149 =  $2.24/mo
//
// Founding Network keep rate (72%):
//   All founding members (Charter/Founding/L3/L4) locked at 72% of match value.
//   This is the rate applied when ProLnk assigns a DIRECT LEAD to a pro — the pro
//   earns 72% of the platform fee for that matched job as a lead acquisition bonus.
//   Non-founding pros tier from 12% → 70% based on job volume.
//
// ProLnk minimum retention: 20% of platform fee after all payouts.
//
// Real example — $5,000 HVAC job, platform fee 12% = $600:
//   Charter Member (home origination): 1.5% × $600 = $9.00
//   Founding Member (L1 network):        7% × $600 = $42.00
//   Charter Member  (L2 network):        4% × $600 = $24.00
//   Total distributed:                               $75.00
//   ProLnk retains:                      $600 - $75 = $525.00 (87.5%)
//   HVAC contractor:                     keeps $4,400 (100% of job revenue)

const PLATFORM_FEE = {
  default:   new Decimal(0.12),
  min:       new Decimal(0.06),
  max:       new Decimal(0.15),
};

// Stream 1
const ORIGINATION_RATE = new Decimal(0.015); // 1.5% of platform fee

// Stream 2 — Network job commission cascade
const NETWORK_JOB = {
  l1: new Decimal(0.07),
  l2: new Decimal(0.04),
  l3: new Decimal(0.02),
  l4: new Decimal(0.01),
};

// Stream 3 — Network subscription commission cascade
const SUBSCRIPTION_MONTHLY = new Decimal(149);
const NETWORK_SUB = {
  l1: new Decimal(0.12),
  l2: new Decimal(0.06),
  l3: new Decimal(0.03),
  l4: new Decimal(0.015),
};

// Founding network direct-lead keep rate (72% of platform fee as lead bonus)
const FOUNDING_KEEP_RATE = new Decimal(0.72);
const PROLNK_MIN_RETENTION = new Decimal(0.20);

type NetworkLevel = "l1" | "l2" | "l3" | "l4";
type PayoutType = "origination" | "network_job_l1" | "network_job_l2" | "network_job_l3" | "network_job_l4" | "subscription_l1" | "subscription_l2" | "subscription_l3" | "subscription_l4";

interface Payout {
  recipientUserId: string;
  payoutType: PayoutType;
  amount: Decimal;
  rateApplied: Decimal;
  description: string;
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const commissionsRouter = router({

  // ── Stream 1+2: Full job commission breakdown ────────────────────────────
  // Returns a complete breakdown of all parties who earn from a single job.
  // Pass originationHolderUserId if the property has a documented origination holder.
  calculateJobCommission: publicProcedure
    .input(z.object({
      jobValue:                 z.number().positive(),
      platformFeeRate:          z.number().min(0.06).max(0.15).optional(),
      includeOriginationHolder: z.boolean().optional().default(false),
      directLeadBonus:          z.boolean().optional().default(false),
    }))
    .query(({ input }) => {
      const jobValue   = new Decimal(input.jobValue);
      const feeRate    = new Decimal(input.platformFeeRate ?? PLATFORM_FEE.default.toNumber());
      const platFee    = jobValue.mul(feeRate);

      const breakdown: { party: string; stream: string; rate: string; amount: number }[] = [];
      let totalOut = new Decimal(0);

      // Stream 1 — Origination (if property is documented)
      if (input.includeOriginationHolder) {
        const amt = platFee.mul(ORIGINATION_RATE);
        breakdown.push({ party: "Origination Holder", stream: "Home Origination", rate: "1.5% of platform fee", amount: amt.toDecimalPlaces(2).toNumber() });
        totalOut = totalOut.add(amt);
      }

      // Stream 2 — Network job cascade (up to 4 levels)
      const levels: [NetworkLevel, string][] = [["l1","Direct recruiter"], ["l2","L2 recruiter"], ["l3","L3 recruiter"], ["l4","L4 recruiter"]];
      for (const [lvl, label] of levels) {
        const rate = NETWORK_JOB[lvl];
        const amt  = platFee.mul(rate);
        breakdown.push({ party: label, stream: "Network Job Commission", rate: `${(rate.mul(100)).toFixed(0)}% of platform fee`, amount: amt.toDecimalPlaces(2).toNumber() });
        totalOut = totalOut.add(amt);
      }

      // Direct-lead bonus for founding member (if ProLnk assigned this lead)
      let directLeadAmt = new Decimal(0);
      if (input.directLeadBonus) {
        directLeadAmt = platFee.mul(FOUNDING_KEEP_RATE);
        breakdown.push({ party: "Completing Pro (Founding)", stream: "Direct Lead Bonus", rate: "72% of platform fee", amount: directLeadAmt.toDecimalPlaces(2).toNumber() });
        totalOut = totalOut.add(directLeadAmt);
      }

      const prolnkRetains = platFee.minus(totalOut);
      const retentionRate = prolnkRetains.div(platFee).mul(100).toDecimalPlaces(1).toNumber();

      return {
        jobValue:        input.jobValue,
        feeRate:         feeRate.toNumber(),
        platformFee:     platFee.toDecimalPlaces(2).toNumber(),
        breakdown,
        totalDistributed: totalOut.toDecimalPlaces(2).toNumber(),
        prolnkRetains:   prolnkRetains.toDecimalPlaces(2).toNumber(),
        prolnkRetentionPct: retentionRate,
        meetsMinRetention: prolnkRetains.div(platFee).gte(PROLNK_MIN_RETENTION),
        contractorKeeps: jobValue.minus(platFee).toDecimalPlaces(2).toNumber(),
      };
    }),

  // ── Stream 3: Monthly subscription commission breakdown ────────────────
  // Shows what 4-level upline earns monthly from a single active subscriber.
  calculateSubscriptionCommission: publicProcedure
    .input(z.object({
      subscriberCount: z.number().int().positive().optional().default(1),
    }))
    .query(({ input }) => {
      const sub    = SUBSCRIPTION_MONTHLY.mul(input.subscriberCount);
      const levels = [
        { level: "L1 (direct recruiter)", rate: NETWORK_SUB.l1 },
        { level: "L2",                    rate: NETWORK_SUB.l2 },
        { level: "L3",                    rate: NETWORK_SUB.l3 },
        { level: "L4",                    rate: NETWORK_SUB.l4 },
      ];
      const breakdown = levels.map(({ level, rate }) => ({
        level,
        ratePct: rate.mul(100).toNumber(),
        perSubscriberMonthly: SUBSCRIPTION_MONTHLY.mul(rate).toDecimalPlaces(2).toNumber(),
        totalMonthly:         sub.mul(rate).toDecimalPlaces(2).toNumber(),
      }));
      const totalOut = breakdown.reduce((s, b) => s + b.totalMonthly, 0);
      return {
        subscriberCount: input.subscriberCount,
        subscriptionFee: SUBSCRIPTION_MONTHLY.toNumber(),
        totalSubscriptionRevenue: sub.toDecimalPlaces(2).toNumber(),
        breakdown,
        totalDistributed: parseFloat(totalOut.toFixed(2)),
        prolnkRetains: parseFloat((sub.toNumber() - totalOut).toFixed(2)),
      };
    }),

  // ── Full income projection for a founding member ──────────────────────
  // Combines all three streams over a month to project total earnings.
  projectMonthlyIncome: publicProcedure
    .input(z.object({
      // Own jobs this month
      ownJobsCompleted: z.number().int().min(0).default(0),
      avgJobValue:      z.number().positive().default(3500),
      platformFeeRate:  z.number().min(0.06).max(0.15).optional(),
      // Properties you hold origination rights on that had jobs this month
      originationJobsCount: z.number().int().min(0).default(0),
      originationAvgJobValue: z.number().positive().default(3500),
      // Network jobs — how many jobs each level of your downline completed
      networkJobsL1: z.number().int().min(0).default(0),
      networkJobsL2: z.number().int().min(0).default(0),
      networkJobsL3: z.number().int().min(0).default(0),
      networkJobsL4: z.number().int().min(0).default(0),
      networkAvgJobValue: z.number().positive().default(3500),
      // Network subscriptions — how many active subscribers at each level
      subsL1: z.number().int().min(0).default(0),
      subsL2: z.number().int().min(0).default(0),
      subsL3: z.number().int().min(0).default(0),
      subsL4: z.number().int().min(0).default(0),
    }))
    .query(({ input }) => {
      const feeRate = new Decimal(input.platformFeeRate ?? PLATFORM_FEE.default.toNumber());
      const ownPlatFee   = new Decimal(input.avgJobValue).mul(feeRate);
      const netPlatFee   = new Decimal(input.networkAvgJobValue).mul(feeRate);
      const origPlatFee  = new Decimal(input.originationAvgJobValue).mul(feeRate);

      // Stream 1 — Origination income this month
      const originationIncome = origPlatFee.mul(ORIGINATION_RATE).mul(input.originationJobsCount);

      // Stream 2 — Network job override income
      const networkJobIncome =
        netPlatFee.mul(NETWORK_JOB.l1).mul(input.networkJobsL1)
        .add(netPlatFee.mul(NETWORK_JOB.l2).mul(input.networkJobsL2))
        .add(netPlatFee.mul(NETWORK_JOB.l3).mul(input.networkJobsL3))
        .add(netPlatFee.mul(NETWORK_JOB.l4).mul(input.networkJobsL4));

      // Stream 3 — Subscription override income (monthly)
      const subscriptionIncome =
        SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l1).mul(input.subsL1)
        .add(SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l2).mul(input.subsL2))
        .add(SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l3).mul(input.subsL3))
        .add(SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l4).mul(input.subsL4));

      // Own jobs — contractor keeps job revenue; if ProLnk assigned lead, also gets 72% of platform fee
      const ownSubscriptionCost = SUBSCRIPTION_MONTHLY; // they pay $149/mo

      const totalGross = originationIncome.add(networkJobIncome).add(subscriptionIncome);
      const netAfterSub = totalGross.minus(ownSubscriptionCost);

      return {
        streams: {
          origination: {
            label: "Home Origination Rights (Stream 1)",
            jobCount: input.originationJobsCount,
            rateApplied: "1.5% of platform fee per job",
            income: originationIncome.toDecimalPlaces(2).toNumber(),
          },
          networkJobs: {
            label: "Network Job Commissions (Stream 2)",
            detail: {
              l1: { jobs: input.networkJobsL1, rateApplied: "7%", income: netPlatFee.mul(NETWORK_JOB.l1).mul(input.networkJobsL1).toDecimalPlaces(2).toNumber() },
              l2: { jobs: input.networkJobsL2, rateApplied: "4%", income: netPlatFee.mul(NETWORK_JOB.l2).mul(input.networkJobsL2).toDecimalPlaces(2).toNumber() },
              l3: { jobs: input.networkJobsL3, rateApplied: "2%", income: netPlatFee.mul(NETWORK_JOB.l3).mul(input.networkJobsL3).toDecimalPlaces(2).toNumber() },
              l4: { jobs: input.networkJobsL4, rateApplied: "1%", income: netPlatFee.mul(NETWORK_JOB.l4).mul(input.networkJobsL4).toDecimalPlaces(2).toNumber() },
            },
            income: networkJobIncome.toDecimalPlaces(2).toNumber(),
          },
          subscriptions: {
            label: "Network Subscription Commissions (Stream 3)",
            detail: {
              l1: { subs: input.subsL1, rate: "12% × $149/mo", income: SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l1).mul(input.subsL1).toDecimalPlaces(2).toNumber() },
              l2: { subs: input.subsL2, rate: "6% × $149/mo",  income: SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l2).mul(input.subsL2).toDecimalPlaces(2).toNumber() },
              l3: { subs: input.subsL3, rate: "3% × $149/mo",  income: SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l3).mul(input.subsL3).toDecimalPlaces(2).toNumber() },
              l4: { subs: input.subsL4, rate: "1.5% × $149/mo",income: SUBSCRIPTION_MONTHLY.mul(NETWORK_SUB.l4).mul(input.subsL4).toDecimalPlaces(2).toNumber() },
            },
            income: subscriptionIncome.toDecimalPlaces(2).toNumber(),
          },
        },
        summary: {
          totalGrossIncome:    totalGross.toDecimalPlaces(2).toNumber(),
          ownSubscriptionCost: ownSubscriptionCost.toDecimalPlaces(2).toNumber(),
          netMonthlyIncome:    netAfterSub.toDecimalPlaces(2).toNumber(),
          annualProjection:    netAfterSub.mul(12).toDecimalPlaces(2).toNumber(),
        },
      };
    }),

  // ── Get earnings for a partner in a specific month (DB) ──────────────────
  getEarnings: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      period:    z.string().regex(/^\d{4}-\d{2}$/),
    }))
    .query(async ({ input }) => {
      const { partnerId, period } = input;
      const db = await getDb();
      if (!db) return { period, totalEarned: 0, payoutCount: 0, byStream: {} };

      const payouts = await db.query.commissionPayout.findMany({
        where: and(
          eq(commissionPayout.recipientUserId, partnerId.toString()),
          eq(commissionPayout.payoutMonth, period)
        ),
      });

      const byStream: Record<string, number> = {};
      let totalEarned = new Decimal(0);

      for (const p of payouts) {
        const amt = new Decimal(p.amount.toString());
        totalEarned = totalEarned.add(amt);
        byStream[p.payoutType] = (byStream[p.payoutType] ?? 0) + amt.toDecimalPlaces(2).toNumber();
      }

      return {
        period,
        totalEarned: totalEarned.toDecimalPlaces(2).toNumber(),
        payoutCount: payouts.length,
        byStream,
      };
    }),

  // ── Get the upline chain for a pro ────────────────────────────────────────
  getUplinkChain: protectedProcedure
    .input(z.object({ proUserId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const uplineChain = await db.query.proUplineChain.findMany({
        where: eq(proUplineChain.proUserId, input.proUserId),
        orderBy: asc(proUplineChain.levelsAbove),
      });

      return uplineChain.map((link) => ({
        level: link.levelsAbove,
        uplineUserId: link.uplineUserId,
        networkLevel: link.uplineNetworkLevel,
      }));
    }),

  // ── Distribute commissions on job completion (admin / job completion flow) ─
  // Writes Stream 1 (origination) + Stream 2 (network job) payouts to DB.
  // Stream 3 (subscriptions) runs on a separate monthly cron.
  distributeJobCommissions: adminProcedure
    .input(z.object({
      jobId:                  z.string(),
      completingProId:        z.string(),
      originationHolderUserId: z.string().optional(),
      jobValue:               z.number().positive(),
      platformFeeRate:        z.number().min(0.06).max(0.15).optional(),
    }))
    .mutation(async ({ input }) => {
      const { jobId, completingProId } = input;
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const completingPro = await db.query.partners.findFirst({
        where: eq(partners.id, parseInt(completingProId)),
      });
      if (!completingPro) throw new Error("Completing pro not found");

      const jobValue = new Decimal(input.jobValue);
      const feeRate  = new Decimal(input.platformFeeRate ?? PLATFORM_FEE.default.toNumber());
      const platFee  = jobValue.mul(feeRate);

      const [event] = await db
        .insert(jobCommissionEvent)
        .values({
          proUserId:        completingProId,
          jobId,
          jobValue:         jobValue,
          jobCompletedAt:   new Date(),
          platformFeeGross: platFee,
          platformFeeNet:   platFee,
          status:           "pending",
        })
        .returning();

      const payouts: Payout[] = [];
      const payoutMonth = new Date().toISOString().slice(0, 7);

      // Stream 1 — Origination payout
      if (input.originationHolderUserId) {
        const amt = platFee.mul(ORIGINATION_RATE);
        payouts.push({
          recipientUserId: input.originationHolderUserId,
          payoutType:      "origination",
          amount:          amt,
          rateApplied:     ORIGINATION_RATE,
          description:     `Home origination: 1.5% × $${platFee.toDecimalPlaces(2)}`,
        });
      }

      // Stream 2 — Network job cascade (4 levels up from completing pro)
      const uplineLinks = await db.query.proUplineChain.findMany({
        where:   eq(proUplineChain.proUserId, completingProId),
        orderBy: asc(proUplineChain.levelsAbove),
      });

      const levelMap: Record<number, { type: PayoutType; rate: Decimal }> = {
        1: { type: "network_job_l1", rate: NETWORK_JOB.l1 },
        2: { type: "network_job_l2", rate: NETWORK_JOB.l2 },
        3: { type: "network_job_l3", rate: NETWORK_JOB.l3 },
        4: { type: "network_job_l4", rate: NETWORK_JOB.l4 },
      };

      for (const link of uplineLinks.slice(0, 4)) {
        const entry = levelMap[link.levelsAbove];
        if (!entry) continue;
        const amt = platFee.mul(entry.rate);
        payouts.push({
          recipientUserId: link.uplineUserId,
          payoutType:      entry.type,
          amount:          amt,
          rateApplied:     entry.rate,
          description:     `Network L${link.levelsAbove}: ${(entry.rate.mul(100)).toFixed(0)}% × $${platFee.toDecimalPlaces(2)} platform fee`,
        });
      }

      // Persist payouts
      for (const payout of payouts) {
        await db.insert(commissionPayout).values({
          jobCommissionEventId: event.id,
          recipientUserId:      payout.recipientUserId,
          sourceProUserId:      completingProId,
          payoutType:           payout.payoutType,
          rateApplied:          payout.rateApplied,
          amount:               payout.amount,
          status:               "pending",
          payoutMonth,
        });

        const pid = parseInt(payout.recipientUserId);
        const partner = await db.query.partners.findFirst({ where: eq(partners.id, pid) });
        if (partner) {
          const updated = new Decimal(partner.monthlyCommissionEarned?.toString() || "0").add(payout.amount);
          await db.update(partners)
            .set({ monthlyCommissionEarned: updated })
            .where(eq(partners.id, pid));
        }
      }

      const totalOut = payouts.reduce((s, p) => s.add(p.amount), new Decimal(0));

      return {
        jobCommissionEventId: event.id,
        platformFee:          platFee.toDecimalPlaces(2).toNumber(),
        payoutsCreated:       payouts.length,
        totalDistributed:     totalOut.toDecimalPlaces(2).toNumber(),
        prolnkRetains:        platFee.minus(totalOut).toDecimalPlaces(2).toNumber(),
        payouts:              payouts.map(p => ({ ...p, amount: p.amount.toDecimalPlaces(2).toNumber(), rateApplied: p.rateApplied.toNumber() })),
        payoutMonth,
      };
    }),
});
