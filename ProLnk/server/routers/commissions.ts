import { adminProcedure, protectedProcedure, publicProcedure } from "@/server/_core/trpc";
import { router } from "@/server/_core/trpc";
import { db } from "@/server/_core/db";
import {
  partners,
  proUplineChain,
  jobCommissionEvent,
  commissionPayout,
} from "@/drizzle/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { Decimal } from "decimal.js";

// Commission cascade rates
const COMMISSION_RATES = {
  own_job: new Decimal(1.0), // 100%
  network_l1: new Decimal(0.4), // 40%
  network_l2: new Decimal(0.25), // 25%
  network_l3: new Decimal(0.1), // 10%
};

const DEFAULT_PLATFORM_FEE_RATE = new Decimal(0.12); // 12%

interface CommissionDistribution {
  recipientUserId: string;
  payoutType: "own_job" | "network_l1" | "network_l2" | "network_l3";
  amount: Decimal;
  rateApplied: Decimal;
}

export const commissionsRouter = router({
  // Calculate commission for a given job value and pro tier
  calculateCommission: publicProcedure
    .input(
      z.object({
        jobValue: z.number().positive(),
        sourceProTier: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { jobValue, sourceProTier } = input;

      const jobValueDecimal = new Decimal(jobValue);
      const platformFee = jobValueDecimal.mul(DEFAULT_PLATFORM_FEE_RATE);

      // Get commission rate for this tier (default scout=0.4)
      const tierRates: Record<string, string> = {
        scout: "0.40",
        pro: "0.55",
        crew: "0.65",
        company: "0.72",
        enterprise: "0.78",
      };

      const commissionRate = new Decimal(tierRates[sourceProTier] || "0.40");
      const commission = platformFee.mul(commissionRate);

      return {
        jobValue,
        platformFee: platformFee.toNumber(),
        commissionRate: commissionRate.toNumber(),
        commission: commission.toNumber(),
      };
    }),

  // Get earnings for a partner in a specific period
  getEarnings: protectedProcedure
    .input(
      z.object({
        partnerId: z.number(),
        period: z.string().regex(/^\d{4}-\d{2}$/), // "2025-03"
      })
    )
    .query(async ({ input }) => {
      const { partnerId, period } = input;

      // Get all payouts for this partner in this month
      const payouts = await db.query.commissionPayout.findMany({
        where: and(
          eq(commissionPayout.recipientUserId, partnerId.toString()),
          eq(commissionPayout.payoutMonth, period)
        ),
      });

      const totalEarned = payouts.reduce(
        (sum, payout) => sum.add(new Decimal(payout.amount.toString())),
        new Decimal(0)
      );

      return {
        period,
        totalEarned: totalEarned.toNumber(),
        payoutCount: payouts.length,
        payoutTypes: payouts.map((p) => ({
          type: p.payoutType,
          amount: new Decimal(p.amount.toString()).toNumber(),
        })),
      };
    }),

  // Get the upline chain for a pro
  getUplinkChain: protectedProcedure
    .input(z.object({ proUserId: z.string() }))
    .query(async ({ input }) => {
      const { proUserId } = input;

      const uplineChain = await db.query.proUplineChain.findMany({
        where: eq(proUplineChain.proUserId, proUserId),
        orderBy: asc(proUplineChain.levelsAbove),
      });

      return uplineChain.map((link) => ({
        level: link.levelsAbove,
        uplineUserId: link.uplineUserId,
        networkLevel: link.uplineNetworkLevel,
      }));
    }),

  // Distribute commissions to all recipients (own job + upline)
  distributeCommissions: adminProcedure
    .input(
      z.object({
        jobId: z.string(),
        sourceProId: z.string(),
        jobValue: z.number().positive(),
      })
    )
    .mutation(async ({ input }) => {
      const { jobId, sourceProId, jobValue } = input;

      // Get source pro's tier and rate info
      const sourcePro = await db.query.partners.findFirst({
        where: eq(partners.id, parseInt(sourceProId)),
      });

      if (!sourcePro) {
        throw new Error("Source pro not found");
      }

      const jobValueDecimal = new Decimal(jobValue);
      const platformFeeGross = jobValueDecimal.mul(DEFAULT_PLATFORM_FEE_RATE);

      // Create job commission event
      const [event] = await db
        .insert(jobCommissionEvent)
        .values({
          proUserId: sourceProId,
          jobId,
          jobValue: jobValueDecimal,
          jobCompletedAt: new Date(),
          platformFeeGross: platformFeeGross,
          platformFeeNet: platformFeeGross,
          status: "pending",
        })
        .returning();

      // Prepare distributions
      const distributions: CommissionDistribution[] = [];

      // Own job: source pro gets full platform fee
      distributions.push({
        recipientUserId: sourceProId,
        payoutType: "own_job",
        amount: platformFeeGross,
        rateApplied: COMMISSION_RATES.own_job,
      });

      // Get upline chain
      const uplineLinks = await db.query.proUplineChain.findMany({
        where: eq(proUplineChain.proUserId, sourceProId),
        orderBy: asc(proUplineChain.levelsAbove),
      });

      // Distribute to upline (L1, L2, L3)
      const payoutTypeMap: Record<number, "network_l1" | "network_l2" | "network_l3"> = {
        1: "network_l1",
        2: "network_l2",
        3: "network_l3",
      };

      for (const link of uplineLinks.slice(0, 3)) {
        const payoutType = payoutTypeMap[link.levelsAbove];
        if (!payoutType) continue;

        const rate = COMMISSION_RATES[payoutType];
        const amount = platformFeeGross.mul(rate);

        distributions.push({
          recipientUserId: link.uplineUserId,
          payoutType,
          amount,
          rateApplied: rate,
        });
      }

      // Insert all payouts
      const payoutMonth = new Date().toISOString().slice(0, 7); // "2025-03"

      for (const dist of distributions) {
        await db.insert(commissionPayout).values({
          jobCommissionEventId: event.id,
          recipientUserId: dist.recipientUserId,
          sourceProUserId: sourceProId,
          payoutType: dist.payoutType,
          rateApplied: dist.rateApplied,
          amount: dist.amount,
          status: "pending",
          payoutMonth,
        });
      }

      // Update partner earnings
      for (const dist of distributions) {
        const partnerId = parseInt(dist.recipientUserId);
        const partner = await db.query.partners.findFirst({
          where: eq(partners.id, partnerId),
        });

        if (partner) {
          const newEarnings = new Decimal(partner.monthlyCommissionEarned?.toString() || "0").add(
            dist.amount
          );

          await db
            .update(partners)
            .set({ monthlyCommissionEarned: newEarnings })
            .where(eq(partners.id, partnerId));
        }
      }

      return {
        jobCommissionEventId: event.id,
        distributions: distributions.map((d) => ({
          ...d,
          amount: d.amount.toNumber(),
        })),
        payoutMonth,
      };
    }),
});
