import { adminProcedure, protectedProcedure, publicProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb, getPartnerByUserId } from "../db";
import {
  partners,
  proUplineChain,
  jobCommissionEvent,
  commissionPayout,
} from "../../drizzle/schema";
import { eq, and, asc } from "drizzle-orm";
import { z } from "zod";
import { Decimal } from "decimal.js";

// ─── Canonical ProLnk Commission Rates ────────────────────────────────────────
//
// ALL Founding Network members (Charter / Founding / Level 3 / Level 4) receive
// the same commission package — tier only affects recruiting position, not rate.
//
// Platform fee: 6–15% of job value (varies by trade). Default assumption: 12%.
// The completing pro keeps their tier% of the platform fee on every job they complete.
// Their upline earns network overrides from ProLnk's share (not from the pro's share).
//
// Stream 1 — Own job keep rate (Business tier max)
//   Core: 40% | Pro: 50% | Business: 60%
//
// Stream 2 — Network job overrides (% of platform fee, from ProLnk's share)
//   Direct recruit (L1): 7%
//   L1's recruit  (L2): 4%
//   L2's recruit  (L3): 2%
//   L3's recruit  (L4): 1%
//
// Platform minimum retention: 20% of platform fee after all commissions paid.
// Check (Business): 60% + 7% + 4% + 2% + 1% = 74% → ProLnk keeps 26% minimum ✓

const COMMISSION_RATES = {
  own_job:    new Decimal(0.60), // Business tier: 60% of platform fee (Core 40%, Pro 50%)
  network_l1: new Decimal(0.07), // Direct recruit: 7%
  network_l2: new Decimal(0.04), // Two levels up: 4%
  network_l3: new Decimal(0.02), // Three levels up: 2%
  network_l4: new Decimal(0.01), // Four levels up: 1%
};

// Platform fee percentage applied to job value (default 12%; trade-specific rates
// can be passed by callers for accurate calculations)
const DEFAULT_PLATFORM_FEE_RATE = new Decimal(0.12);

// All founding network members use the same rate regardless of tier
const FOUNDING_NETWORK_KEEP_RATE = COMMISSION_RATES.own_job;

type PayoutType = "own_job" | "network_l1" | "network_l2" | "network_l3" | "network_l4";

interface CommissionDistribution {
  recipientUserId: string;
  payoutType: PayoutType;
  amount: Decimal;
  rateApplied: Decimal;
}

export const commissionsRouter = router({
  // ── Calculate commission breakdown for a given job value ───────────────────
  // Returns what the completing pro earns plus hypothetical network override amounts.
  calculateCommission: publicProcedure
    .input(
      z.object({
        jobValue: z.number().positive(),
        platformFeeRate: z.number().min(0.06).max(0.15).optional(), // defaults to 0.12
      })
    )
    .query(async ({ input }) => {
      const { jobValue } = input;
      const feeRate = new Decimal(input.platformFeeRate ?? DEFAULT_PLATFORM_FEE_RATE.toNumber());

      const jobValueDecimal = new Decimal(jobValue);
      const platformFee = jobValueDecimal.mul(feeRate);
      const proKeep = platformFee.mul(COMMISSION_RATES.own_job);

      return {
        jobValue,
        platformFeeRate: feeRate.toNumber(),
        platformFee: platformFee.toDecimalPlaces(2).toNumber(),
        proKeepRate: COMMISSION_RATES.own_job.toNumber(),
        proKeep: proKeep.toDecimalPlaces(2).toNumber(),
        networkOverrides: {
          l1: platformFee.mul(COMMISSION_RATES.network_l1).toDecimalPlaces(2).toNumber(),
          l2: platformFee.mul(COMMISSION_RATES.network_l2).toDecimalPlaces(2).toNumber(),
          l3: platformFee.mul(COMMISSION_RATES.network_l3).toDecimalPlaces(2).toNumber(),
          l4: platformFee.mul(COMMISSION_RATES.network_l4).toDecimalPlaces(2).toNumber(),
        },
        prolnkRetains: platformFee
          .minus(proKeep)
          .minus(platformFee.mul(COMMISSION_RATES.network_l1))
          .minus(platformFee.mul(COMMISSION_RATES.network_l2))
          .minus(platformFee.mul(COMMISSION_RATES.network_l3))
          .minus(platformFee.mul(COMMISSION_RATES.network_l4))
          .toDecimalPlaces(2)
          .toNumber(),
      };
    }),

  // ── Get earnings for a partner in a specific month ─────────────────────────
  getEarnings: protectedProcedure
    .input(
      z.object({
        partnerId: z.number(),
        period: z.string().regex(/^\d{4}-\d{2}$/),
      })
    )
    .query(async ({ input, ctx }) => {
      const { partnerId, period } = input;
      const db = await getDb();
      if (!db) return { period, totalEarned: 0, payoutCount: 0, payoutTypes: [] };

      // Ownership guard (prevent IDOR): non-admins may only read their own earnings.
      if (ctx.user.role !== "admin") {
        const ownPartner = await getPartnerByUserId(ctx.user.id);
        if (!ownPartner || ownPartner.id !== partnerId) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized to view these earnings." });
        }
      }

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
        totalEarned: totalEarned.toDecimalPlaces(2).toNumber(),
        payoutCount: payouts.length,
        payoutTypes: payouts.map((p) => ({
          type: p.payoutType,
          amount: new Decimal(p.amount.toString()).toDecimalPlaces(2).toNumber(),
        })),
      };
    }),

  // ── Get the upline chain for a pro ─────────────────────────────────────────
  getUplinkChain: protectedProcedure
    .input(z.object({ proUserId: z.string() }))
    .query(async ({ input }) => {
      const { proUserId } = input;
      const db = await getDb();
      if (!db) return [];

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

  // ── Distribute commissions to completing pro + 4-level upline ──────────────
  // Called when a job is marked complete. Admin-only — triggered by job completion flow.
  distributeCommissions: adminProcedure
    .input(
      z.object({
        jobId: z.string(),
        sourceProId: z.string(),
        jobValue: z.number().positive(),
        platformFeeRate: z.number().min(0.06).max(0.15).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { jobId, sourceProId, jobValue } = input;
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const sourcePro = await db.query.partners.findFirst({
        where: eq(partners.id, parseInt(sourceProId)),
      });
      if (!sourcePro) throw new Error("Source pro not found");

      const jobValueDecimal = new Decimal(jobValue);
      const feeRate = new Decimal(input.platformFeeRate ?? DEFAULT_PLATFORM_FEE_RATE.toNumber());
      const platformFeeGross = jobValueDecimal.mul(feeRate);

      // Record the job commission event
      const [event] = await db
        .insert(jobCommissionEvent)
        .values({
          proUserId: sourceProId,
          jobId,
          jobValue: jobValueDecimal,
          jobCompletedAt: new Date(),
          platformFeeGross,
          platformFeeNet: platformFeeGross,
          status: "pending",
        })
        .returning();

      const distributions: CommissionDistribution[] = [];

      // Completing pro: keep rate (Business 60% / Pro 50% / Core 40%) of platform fee
      distributions.push({
        recipientUserId: sourceProId,
        payoutType: "own_job",
        amount: platformFeeGross.mul(FOUNDING_NETWORK_KEEP_RATE),
        rateApplied: FOUNDING_NETWORK_KEEP_RATE,
      });

      // 4-level upline network overrides
      const uplineLinks = await db.query.proUplineChain.findMany({
        where: eq(proUplineChain.proUserId, sourceProId),
        orderBy: asc(proUplineChain.levelsAbove),
      });

      const levelToPayoutType: Record<number, PayoutType> = {
        1: "network_l1",
        2: "network_l2",
        3: "network_l3",
        4: "network_l4",
      };

      for (const link of uplineLinks.slice(0, 4)) {
        const payoutType = levelToPayoutType[link.levelsAbove];
        if (!payoutType) continue;
        const rate = COMMISSION_RATES[payoutType];
        distributions.push({
          recipientUserId: link.uplineUserId,
          payoutType,
          amount: platformFeeGross.mul(rate),
          rateApplied: rate,
        });
      }

      // Persist all payouts and update partner earnings
      const payoutMonth = new Date().toISOString().slice(0, 7);

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

        const pid = parseInt(dist.recipientUserId);
        const partner = await db.query.partners.findFirst({ where: eq(partners.id, pid) });
        if (partner) {
          const updated = new Decimal(partner.monthlyCommissionEarned?.toString() || "0").add(dist.amount);
          await db.update(partners).set({ monthlyCommissionEarned: updated }).where(eq(partners.id, pid));
        }
      }

      return {
        jobCommissionEventId: event.id,
        distributions: distributions.map((d) => ({
          ...d,
          amount: d.amount.toDecimalPlaces(2).toNumber(),
          rateApplied: d.rateApplied.toNumber(),
        })),
        payoutMonth,
      };
    }),
});

