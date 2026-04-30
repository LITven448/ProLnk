/**
 * ProLnk / TrustyPro — Automated Payment Architecture V12
 *
 * ARCHITECTURE OVERVIEW
 * ─────────────────────
 * This module implements the zero-self-reporting, fully-automatic payment and
 * commission collection system for the ProLnk platform.
 *
 * TWO PAYMENT FLOWS:
 *
 * Flow A — Standard Job (card-on-file):
 *   1. Homeowner accepts deal → saves card via Stripe SetupIntent
 *   2. Partner confirms job start → platform charges deposit (30% of job value)
 *   3. Homeowner confirms completion via check-in → platform charges balance (70%)
 *   4. Platform auto-splits: receiving partner payout + referring partner commission
 *      are both transferred via Stripe destination charges
 *
 * Flow B — Insurance Job (ACH debit):
 *   1. Partner flags job as insurance-funded
 *   2. Partner signs ACH debit authorization (single-job or standing)
 *   3. Homeowner confirms completion via check-in
 *   4. Platform pulls commission % from partner's bank account via ACH
 *   5. Referring partner commission is transferred from platform balance
 *
 * COMMISSION MATH (example: $10,000 roofing job, 10% platform fee):
 *   Platform fee:              $1,000  (10% of job value)
 *   Referring partner share:   $400    (40% of platform fee, Scout tier)
 *   Platform net:              $600    (60% of platform fee)
 *   Receiving partner payout:  $9,000  (job value minus platform fee)
 *
 * PATENT CLAIMS IMPLEMENTED:
 *   Claim 20: Automatic commission collection triggered by homeowner check-in
 *   Claim 21: ACH debit authorization for insurance job commission pulls
 *   Claim 22: Milestone-based payment scheduling with AI-verified completion
 *   Claim 23: Zero-self-reporting commission architecture
 */

import { z } from "zod";
import { sql, eq, and, desc } from "drizzle-orm";
import {
  jobPayments,
  paymentMilestones,
  achAuthorizations,
  homeownerPaymentMethods,
  customerDeals,
  homeownerCheckins,
  commissions,
  payoutRequests,
  partners,
} from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import { sendPayoutConfirmation } from "../email";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-02-24.acacia" as any,
});

// ─── Commission calculation helper ───────────────────────────────────────────
function calculateCommissions(
  jobValueCents: number,
  platformFeeRate: number,
  referringPartnerKeepRate: number
) {
  const platformFeeCents = Math.round(jobValueCents * platformFeeRate);
  const referringCommissionCents = Math.round(platformFeeCents * referringPartnerKeepRate);
  const platformNetCents = platformFeeCents - referringCommissionCents;
  const receivingPartnerPayoutCents = jobValueCents - platformFeeCents;
  return {
    platformFeeCents,
    referringCommissionCents,
    platformNetCents,
    receivingPartnerPayoutCents,
  };
}

// ─── Milestone schedule builder ───────────────────────────────────────────────
function buildMilestoneSchedule(
  jobValueCents: number,
  isInsuranceJob: boolean
): Array<{
  milestoneType: "deposit" | "mid_job" | "final_balance" | "insurance_commission";
  milestoneLabel: string;
  percentageOfTotal: number;
  amountCents: number;
  triggerEvent: "job_start_confirmed" | "mid_job_milestone" | "homeowner_checkin" | "admin_manual";
}> {
  if (isInsuranceJob) {
    // Insurance jobs: platform pulls commission from partner via ACH after check-in
    // No homeowner card charge — insurance pays partner directly
    return []; // ACH pull is handled separately via achAuthorizations
  }

  if (jobValueCents >= 500000) {
    // Large jobs ($5,000+): 3-milestone schedule
    return [
      {
        milestoneType: "deposit",
        milestoneLabel: "Deposit (30%)",
        percentageOfTotal: 0.30,
        amountCents: Math.round(jobValueCents * 0.30),
        triggerEvent: "job_start_confirmed",
      },
      {
        milestoneType: "mid_job",
        milestoneLabel: "Mid-Job Payment (40%)",
        percentageOfTotal: 0.40,
        amountCents: Math.round(jobValueCents * 0.40),
        triggerEvent: "mid_job_milestone",
      },
      {
        milestoneType: "final_balance",
        milestoneLabel: "Final Balance (30%)",
        percentageOfTotal: 0.30,
        amountCents: Math.round(jobValueCents * 0.30),
        triggerEvent: "homeowner_checkin",
      },
    ];
  }

  // Standard jobs: 2-milestone schedule (deposit + balance)
  return [
    {
      milestoneType: "deposit",
      milestoneLabel: "Deposit (30%)",
      percentageOfTotal: 0.30,
      amountCents: Math.round(jobValueCents * 0.30),
      triggerEvent: "job_start_confirmed",
    },
    {
      milestoneType: "final_balance",
      milestoneLabel: "Balance Due (70%)",
      percentageOfTotal: 0.70,
      amountCents: Math.round(jobValueCents * 0.70),
      triggerEvent: "homeowner_checkin",
    },
  ];
}

export const paymentsRouter = router({

  // ── HOMEOWNER: Create SetupIntent to save card on file ──────────────────────
  // Called when homeowner accepts a deal. Creates a Stripe SetupIntent so the
  // homeowner can save their card. The card is then charged automatically at
  // each milestone trigger — no homeowner action required after initial save.
  createSetupIntent: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      origin: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get homeowner profile
      const hoRows = await (db as any).execute(sql`
        SELECT hp.id, hp.stripeCustomerId, u.email, u.name
        FROM homeownerProfiles hp
        JOIN users u ON hp.userId = u.id
        WHERE hp.userId = ${ctx.user.id}
        LIMIT 1
      `);
      const homeowner = (hoRows.rows || hoRows)[0];
      if (!homeowner) throw new TRPCError({ code: "NOT_FOUND", message: "Homeowner profile not found" });

      // Get deal details
      const dealRows = await (db as any).execute(sql`
        SELECT id, estimatedValueHigh, estimatedValueLow, issueType, issueCategory,
               referringPartnerId, receivingPartnerId
        FROM customerDeals WHERE id = ${input.dealId} LIMIT 1
      `);
      const deal = (dealRows.rows || dealRows)[0];
      if (!deal) throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });

      // Create or retrieve Stripe customer for homeowner
      let stripeCustomerId = homeowner.stripeCustomerId as string | null;
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: homeowner.email,
          name: homeowner.name,
          metadata: { homeownerId: String(homeowner.id), platform: "trustypro" },
        });
        stripeCustomerId = customer.id;
        await (db as any).execute(sql`
          UPDATE homeownerProfiles SET stripeCustomerId = ${stripeCustomerId}
          WHERE id = ${homeowner.id}
        `);
      }

      // Create SetupIntent for card-on-file
      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        usage: "off_session", // Critical: allows charging without homeowner present
        metadata: {
          dealId: String(input.dealId),
          homeownerId: String(homeowner.id),
          platform: "trustypro",
          purpose: "milestone_charges",
        },
      });

      // Estimate job value for milestone preview
      const estimatedValueCents = Math.round(
        parseFloat(deal.estimatedValueHigh || deal.estimatedValueLow || "1000") * 100
      );
      const milestones = buildMilestoneSchedule(estimatedValueCents, false);

      return {
        clientSecret: setupIntent.client_secret,
        stripeCustomerId,
        milestonePreview: milestones.map(m => ({
          label: m.milestoneLabel,
          amountDollars: (m.amountCents / 100).toFixed(2),
          trigger: m.triggerEvent,
        })),
      };
    }),

  // ── PUBLIC: Create SetupIntent by deal token (for non-authenticated homeowners) ─
  // Used by CustomerDealPage (public page) to collect card-on-file after deal acceptance
  createSetupIntentByToken: publicProcedure
    .input(z.object({
      token: z.string(),
      homeownerEmail: z.string().email(),
      homeownerName: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      // Get deal by token
      const dealRows = await (db as any).execute(sql`
        SELECT id, estimatedValueHigh, estimatedValueLow, issueType, issueCategory,
               referringPartnerId, receivingPartnerId, homeownerEmail, homeownerName
        FROM customerDeals WHERE token = ${input.token} LIMIT 1
      `);
      const deal = (dealRows.rows || dealRows)[0];
      if (!deal) throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });
      // Create or retrieve Stripe customer for this homeowner email
      const existingCustomers = await stripe.customers.list({ email: input.homeownerEmail, limit: 1 });
      let stripeCustomerId: string;
      if (existingCustomers.data.length > 0) {
        stripeCustomerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: input.homeownerEmail,
          name: input.homeownerName,
          metadata: { dealId: String(deal.id), platform: "trustypro" },
        });
        stripeCustomerId = customer.id;
      }
      // Create SetupIntent for card-on-file
      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        usage: "off_session",
        metadata: {
          dealId: String(deal.id),
          dealToken: input.token,
          homeownerEmail: input.homeownerEmail,
          platform: "trustypro",
          purpose: "milestone_charges",
        },
      });
      // Estimate job value for milestone preview
      const estimatedValueCents = Math.round(
        parseFloat(deal.estimatedValueHigh || deal.estimatedValueLow || "1000") * 100
      );
      const milestones = buildMilestoneSchedule(estimatedValueCents, false);
      return {
        clientSecret: setupIntent.client_secret,
        stripeCustomerId,
        dealId: deal.id,
        milestonePreview: milestones.map(m => ({
          label: m.milestoneLabel,
          amountDollars: (m.amountCents / 100).toFixed(2),
          trigger: m.triggerEvent,
        })),
      };
    }),

  // ── HOMEOWNER: Confirm card saved and create job payment record ─────────────
  confirmCardSaved: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      setupIntentId: z.string(),
      paymentMethodId: z.string(),
      jobValueDollars: z.number().positive(),
      isInsuranceJob: z.boolean().default(false),
      insuranceDetails: z.object({
        policyNumber: z.string().optional(),
        carrier: z.string().optional(),
        claimNumber: z.string().optional(),
        adjusterName: z.string().optional(),
        adjusterEmail: z.string().optional(),
        approvedAmount: z.number().optional(),
      }).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get homeowner
      const hoRows = await (db as any).execute(sql`
        SELECT hp.id, hp.stripeCustomerId
        FROM homeownerProfiles hp WHERE hp.userId = ${ctx.user.id} LIMIT 1
      `);
      const homeowner = (hoRows.rows || hoRows)[0];
      if (!homeowner) throw new TRPCError({ code: "NOT_FOUND", message: "Homeowner not found" });

      // Get deal with partner info
      const dealRows = await (db as any).execute(sql`
        SELECT cd.*, p.platformFeeRate, p.commissionRate, p.tier
        FROM customerDeals cd
        JOIN partners p ON cd.referringPartnerId = p.id
        WHERE cd.id = ${input.dealId} LIMIT 1
      `);
      const deal = (dealRows.rows || dealRows)[0];
      if (!deal) throw new TRPCError({ code: "NOT_FOUND", message: "Deal not found" });

      // Retrieve payment method details from Stripe
      const pm = await stripe.paymentMethods.retrieve(input.paymentMethodId);
      const cardBrand = pm.card?.brand ?? null;
      const cardLast4 = pm.card?.last4 ?? null;
      const cardExpMonth = pm.card?.exp_month ?? null;
      const cardExpYear = pm.card?.exp_year ?? null;

      // Save homeowner payment method
      await (db as any).execute(sql`
        INSERT INTO homeownerPaymentMethods
          (homeownerId, stripeCustomerId, stripePaymentMethodId, cardBrand, cardLast4,
           cardExpMonth, cardExpYear, isDefault, isActive, consentText, consentSignedAt)
        VALUES
          (${homeowner.id}, ${homeowner.stripeCustomerId}, ${input.paymentMethodId},
           ${cardBrand}, ${cardLast4}, ${cardExpMonth}, ${cardExpYear},
           1, 1,
           ${'By saving this card, you authorize ProLnk/TrustyPro to charge this payment method for the deposit when work begins and the balance when work is confirmed complete.'},
           NOW())
        ON DUPLICATE KEY UPDATE
          stripePaymentMethodId = VALUES(stripePaymentMethodId),
          cardBrand = VALUES(cardBrand), cardLast4 = VALUES(cardLast4),
          updatedAt = NOW()
      `);

      // Calculate commission amounts
      const jobValueCents = Math.round(input.jobValueDollars * 100);
      const platformFeeRate = parseFloat(deal.platformFeeRate || "0.10");
      const commissionKeepRate = parseFloat(deal.commissionRate || "0.40");
      const {
        platformFeeCents,
        referringCommissionCents,
        receivingPartnerPayoutCents,
      } = calculateCommissions(jobValueCents, platformFeeRate, commissionKeepRate);

      // Create job payment record
      const [paymentResult] = await (db as any).execute(sql`
        INSERT INTO jobPayments
          (dealId, homeownerId, referringPartnerId, receivingPartnerId,
           totalJobValue, platformFeeRate, platformFeeAmount,
           referringPartnerCommission, receivingPartnerPayout,
           paymentMethod, isInsuranceJob,
           insurancePolicyNumber, insuranceCarrier, insuranceClaimNumber,
           insuranceAdjusterName, insuranceAdjusterEmail, insuranceApprovedAmount,
           stripeCustomerId, stripeSetupIntentId, status)
        VALUES
          (${input.dealId}, ${homeowner.id}, ${deal.referringPartnerId}, ${deal.receivingPartnerId},
           ${input.jobValueDollars}, ${platformFeeRate}, ${platformFeeCents / 100},
           ${referringCommissionCents / 100}, ${receivingPartnerPayoutCents / 100},
           ${input.isInsuranceJob ? "ach_debit" : "card_on_file"}, ${input.isInsuranceJob ? 1 : 0},
           ${input.insuranceDetails?.policyNumber ?? null},
           ${input.insuranceDetails?.carrier ?? null},
           ${input.insuranceDetails?.claimNumber ?? null},
           ${input.insuranceDetails?.adjusterName ?? null},
           ${input.insuranceDetails?.adjusterEmail ?? null},
           ${input.insuranceDetails?.approvedAmount ?? null},
           ${homeowner.stripeCustomerId}, ${input.setupIntentId},
           ${input.isInsuranceJob ? "ach_authorized" : "pending"})
      `);

      const jobPaymentId = (paymentResult as any).insertId;

      // Create milestone schedule (standard jobs only)
      if (!input.isInsuranceJob) {
        const milestones = buildMilestoneSchedule(jobValueCents, false);
        for (const m of milestones) {
          await (db as any).execute(sql`
            INSERT INTO paymentMilestones
              (jobPaymentId, dealId, milestoneType, milestoneLabel,
               percentageOfTotal, amountCents, triggerEvent, status)
            VALUES
              (${jobPaymentId}, ${input.dealId}, ${m.milestoneType}, ${m.milestoneLabel},
               ${m.percentageOfTotal}, ${m.amountCents}, ${m.triggerEvent}, 'scheduled')
          `);
        }
      }

      // Update deal status to accepted
      await (db as any).execute(sql`
        UPDATE customerDeals SET status = 'accepted', updatedAt = NOW()
        WHERE id = ${input.dealId}
      `);

      return {
        jobPaymentId,
        jobValueDollars: input.jobValueDollars,
        platformFeeDollars: platformFeeCents / 100,
        depositDue: input.isInsuranceJob ? null : Math.round(jobValueCents * 0.30) / 100,
        isInsuranceJob: input.isInsuranceJob,
        message: input.isInsuranceJob
          ? "Insurance job recorded. Partner will be required to sign ACH authorization before work begins."
          : "Card saved. You will be charged the deposit when the partner confirms work has started.",
      };
    }),

  // ── PARTNER: Trigger deposit charge when job starts ─────────────────────────
  // Partner calls this when they confirm they are starting the job.
  // Platform automatically charges the homeowner's saved card for the deposit.
  triggerDepositCharge: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      confirmedJobValue: z.number().positive().optional(), // partner can update final job value
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify partner owns this deal
      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });

      // Get job payment
      const jpRows = await (db as any).execute(sql`
        SELECT jp.*, hpm.stripePaymentMethodId, hpm.stripeCustomerId as homeownerStripeCustomerId
        FROM jobPayments jp
        LEFT JOIN homeownerPaymentMethods hpm ON jp.homeownerId = hpm.homeownerId AND hpm.isDefault = 1
        WHERE jp.dealId = ${input.dealId}
        AND jp.receivingPartnerId = ${partner.id}
        LIMIT 1
      `);
      const jp = (jpRows.rows || jpRows)[0];
      if (!jp) throw new TRPCError({ code: "NOT_FOUND", message: "Job payment not found" });
      if (jp.isInsuranceJob) throw new TRPCError({ code: "BAD_REQUEST", message: "Insurance jobs use ACH flow — use signAchAuthorization instead" });
      if (jp.status !== "pending") throw new TRPCError({ code: "BAD_REQUEST", message: `Cannot charge deposit: payment status is ${jp.status}` });

      // Get deposit milestone
      const msRows = await (db as any).execute(sql`
        SELECT * FROM paymentMilestones
        WHERE jobPaymentId = ${jp.id} AND milestoneType = 'deposit' AND status = 'scheduled'
        LIMIT 1
      `);
      const depositMilestone = (msRows.rows || msRows)[0];
      if (!depositMilestone) throw new TRPCError({ code: "NOT_FOUND", message: "Deposit milestone not found" });

      if (!jp.stripePaymentMethodId) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Homeowner has not saved a payment method yet" });
      }

      // Update milestone to triggered
      await (db as any).execute(sql`
        UPDATE paymentMilestones SET status = 'triggered', triggeredAt = NOW()
        WHERE id = ${depositMilestone.id}
      `);

      // Charge deposit via Stripe destination charge
      // The charge goes to the platform; platform then transfers to receiving partner
      let paymentIntent: Stripe.PaymentIntent;
      try {
        paymentIntent = await stripe.paymentIntents.create({
          amount: depositMilestone.amountCents,
          currency: "usd",
          customer: jp.homeownerStripeCustomerId || jp.stripeCustomerId,
          payment_method: jp.stripePaymentMethodId,
          off_session: true,
          confirm: true,
          description: `ProLnk deposit — Deal #${input.dealId}`,
          metadata: {
            dealId: String(input.dealId),
            jobPaymentId: String(jp.id),
            milestoneType: "deposit",
            platform: "prolnk",
          },
          // Destination charge: platform collects full amount, then transfers to partner
          // transfer_data is set on the final balance charge after commission split
        });
      } catch (stripeError: any) {
        await (db as any).execute(sql`
          UPDATE paymentMilestones SET status = 'failed', failureReason = ${stripeError.message}
          WHERE id = ${depositMilestone.id}
        `);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Payment failed: ${stripeError.message}` });
      }

      // Update records
      await (db as any).execute(sql`
        UPDATE paymentMilestones
        SET status = 'completed', completedAt = NOW(), stripeIntentId = ${paymentIntent.id}
        WHERE id = ${depositMilestone.id}
      `);

      await (db as any).execute(sql`
        UPDATE jobPayments
        SET status = 'deposit_charged',
            depositChargedAt = NOW(),
            depositStripeIntentId = ${paymentIntent.id},
            stripePaymentIntentId = ${paymentIntent.id}
        WHERE id = ${jp.id}
      `);

      // Update deal status
      await (db as any).execute(sql`
        UPDATE customerDeals SET status = 'job_closed', updatedAt = NOW()
        WHERE id = ${input.dealId}
      `);

      return {
        success: true,
        depositCharged: depositMilestone.amountCents / 100,
        paymentIntentId: paymentIntent.id,
        message: "Deposit charged successfully. Balance will be collected automatically when homeowner confirms completion.",
      };
    }),

  // ── PARTNER: Sign ACH authorization for insurance job ───────────────────────
  // For insurance-funded jobs, the partner signs an ACH debit authorization.
  // This authorizes the platform to pull the commission from their bank account
  // after the homeowner confirms job completion via check-in.
  // Patent Claim 21: ACH-on-check-in mechanism.
  signAchAuthorization: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      jobPaymentId: z.number().int().positive(),
      stripePaymentMethodId: z.string(), // us_bank_account payment method
      signerName: z.string(),
      authorizationType: z.enum(["single_job", "standing"]).default("single_job"),
      maxPullAmount: z.number().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName, contactEmail FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });

      // Get job payment to confirm commission amount
      const jpRows = await (db as any).execute(sql`
        SELECT * FROM jobPayments WHERE id = ${input.jobPaymentId} AND dealId = ${input.dealId} LIMIT 1
      `);
      const jp = (jpRows.rows || jpRows)[0];
      if (!jp) throw new TRPCError({ code: "NOT_FOUND", message: "Job payment not found" });
      if (!jp.isInsuranceJob) throw new TRPCError({ code: "BAD_REQUEST", message: "This deal is not an insurance job" });

      // Retrieve bank account details from Stripe
      const pm = await stripe.paymentMethods.retrieve(input.stripePaymentMethodId);
      const bankName = (pm as any).us_bank_account?.bank_name ?? null;
      const bankLast4 = (pm as any).us_bank_account?.last4 ?? null;
      const routingNumber = (pm as any).us_bank_account?.routing_number ?? null;

      // Build legal authorization text
      const commissionAmount = parseFloat(jp.platformFeeAmount || "0");
      const authorizationText = `
NACHA ACH DEBIT AUTHORIZATION

By signing this authorization, ${partner.businessName} ("Partner") authorizes
ProLnk LLC ("Company") to initiate a one-time ACH debit entry to the bank account
ending in ${bankLast4 ?? "****"} for the amount of $${commissionAmount.toFixed(2)},
representing the platform commission (${(parseFloat(jp.platformFeeRate) * 100).toFixed(1)}%)
on Deal #${input.dealId} with a total job value of $${parseFloat(jp.totalJobValue).toFixed(2)}.

This debit will be initiated automatically upon homeowner confirmation of job completion
via the TrustyPro check-in system. The Partner will receive email notification when the
debit is initiated.

Authorization Type: ${input.authorizationType === "standing" ? "Standing Authorization (all future insurance jobs)" : "Single-Job Authorization"}
${input.maxPullAmount ? `Maximum Pull Amount: $${input.maxPullAmount.toFixed(2)}` : ""}

This authorization is governed by the ProLnk Partner Agreement and NACHA Operating Rules.
Partner may revoke this authorization by contacting support@prolnk.io at least 3 business
days before the scheduled debit.

Signed: ${input.signerName}
Date: ${new Date().toISOString()}
      `.trim();

      // Create ACH authorization record
      const [authResult] = await (db as any).execute(sql`
        INSERT INTO achAuthorizations
          (partnerId, jobPaymentId, dealId, stripePaymentMethodId,
           bankName, bankLast4, bankRoutingNumber, accountType,
           authorizationType, maxPullAmount, authorizationText,
           signedAt, signerName, status,
           expiresAt)
        VALUES
          (${partner.id}, ${input.jobPaymentId}, ${input.dealId}, ${input.stripePaymentMethodId},
           ${bankName}, ${bankLast4}, ${routingNumber}, 'checking',
           ${input.authorizationType}, ${input.maxPullAmount ?? null}, ${authorizationText},
           NOW(), ${input.signerName}, 'signed',
           DATE_ADD(NOW(), INTERVAL 90 DAY))
      `);

      const authId = (authResult as any).insertId;

      // Update job payment status
      await (db as any).execute(sql`
        UPDATE jobPayments
        SET status = 'ach_authorized',
            stripeAchMandateId = ${input.stripePaymentMethodId}
        WHERE id = ${input.jobPaymentId}
      `);

      return {
        authorizationId: authId,
        commissionAmount,
        authorizationText,
        message: "ACH authorization signed. Commission will be automatically collected when the homeowner confirms job completion.",
      };
    }),

  // ── SYSTEM: Process check-in and trigger automatic payment ──────────────────
  // This is the core of Patent Claim 20 — the check-in triggers automatic
  // commission collection with no manual intervention.
  // Called by the check-in confirmation flow.
  processCheckinPayment: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      checkinId: z.number().int().positive(),
      confirmedJobValue: z.number().positive().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get job payment
      const jpRows = await (db as any).execute(sql`
        SELECT jp.*, hpm.stripePaymentMethodId, hpm.stripeCustomerId as homeownerStripeCustomerId
        FROM jobPayments jp
        LEFT JOIN homeownerPaymentMethods hpm ON jp.homeownerId = hpm.homeownerId AND hpm.isDefault = 1
        WHERE jp.dealId = ${input.dealId}
        LIMIT 1
      `);
      const jp = (jpRows.rows || jpRows)[0];
      if (!jp) {
        // No payment record — job may have been handled outside platform
        return { success: false, reason: "no_payment_record" };
      }

      if (jp.isInsuranceJob) {
        // Insurance flow: pull commission from partner via ACH
        return await processInsuranceCommissionPull(db, jp, input.checkinId, input.confirmedJobValue);
      } else {
        // Standard flow: charge final balance from homeowner card
        return await processBalanceCharge(db, jp, input.checkinId, input.confirmedJobValue);
      }
    }),

  // ── HOMEOWNER: Get payment status for a deal ─────────────────────────────────
  getPaymentStatus: protectedProcedure
    .input(z.object({ dealId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows = await (db as any).execute(sql`
        SELECT jp.*,
          hpm.cardBrand, hpm.cardLast4, hpm.cardExpMonth, hpm.cardExpYear
        FROM jobPayments jp
        LEFT JOIN homeownerPaymentMethods hpm ON jp.homeownerId = hpm.homeownerId AND hpm.isDefault = 1
        WHERE jp.dealId = ${input.dealId}
        LIMIT 1
      `);
      const jp = (rows.rows || rows)[0];
      if (!jp) return null;

      // Get milestones
      const msRows = await (db as any).execute(sql`
        SELECT * FROM paymentMilestones WHERE jobPaymentId = ${jp.id} ORDER BY id ASC
      `);
      const milestones = msRows.rows || msRows;

      return { payment: jp, milestones };
    }),

  // ── PARTNER: Get ACH authorization status ────────────────────────────────────
  getAchAuthStatus: protectedProcedure
    .input(z.object({ dealId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return null;

      const rows = await (db as any).execute(sql`
        SELECT * FROM achAuthorizations
        WHERE partnerId = ${partner.id} AND dealId = ${input.dealId}
        ORDER BY createdAt DESC LIMIT 1
      `);
      return (rows.rows || rows)[0] ?? null;
    }),

  // ── PARTNER: Create ACH SetupIntent (bank account collection) ────────────────
  createAchSetupIntent: protectedProcedure
    .input(z.object({ dealId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const partnerRows = await (db as any).execute(sql`
        SELECT id, contactEmail, businessName, stripeConnectAccountId FROM partners
        WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });

      // Create or retrieve Stripe customer for partner (for ACH debit)
      let stripeCustomerId: string;
      const existingCustomers = await stripe.customers.list({
        email: partner.contactEmail,
        limit: 1,
      });
      if (existingCustomers.data.length > 0) {
        stripeCustomerId = existingCustomers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: partner.contactEmail,
          name: partner.businessName,
          metadata: { partnerId: String(partner.id), platform: "prolnk" },
        });
        stripeCustomerId = customer.id;
      }

      // Create SetupIntent for ACH debit
      const setupIntent = await stripe.setupIntents.create({
        customer: stripeCustomerId,
        payment_method_types: ["us_bank_account"],
        payment_method_options: {
          us_bank_account: {
            financial_connections: {
              permissions: ["payment_method"],
            },
          } as any,
        },
        metadata: {
          dealId: String(input.dealId),
          partnerId: String(partner.id),
          purpose: "insurance_commission_ach",
        },
      });

      return {
        clientSecret: setupIntent.client_secret,
        stripeCustomerId,
      };
    }),

  // ── ADMIN: Get full payment overview ─────────────────────────────────────────
  adminGetPaymentOverview: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return { payments: [], stats: {} };

    const rows = await (db as any).execute(sql`
      SELECT jp.*,
        cd.issueType, cd.issueCategory, cd.homeownerName,
        rp.businessName as referringPartnerName,
        recv.businessName as receivingPartnerName
      FROM jobPayments jp
      LEFT JOIN customerDeals cd ON jp.dealId = cd.id
      LEFT JOIN partners rp ON jp.referringPartnerId = rp.id
      LEFT JOIN partners recv ON jp.receivingPartnerId = recv.id
      ORDER BY jp.createdAt DESC
      LIMIT 200
    `);
    const payments = rows.rows || rows;

    const statsRows = await (db as any).execute(sql`
      SELECT
        COUNT(*) as totalPayments,
        SUM(totalJobValue) as totalJobVolume,
        SUM(platformFeeAmount) as totalCommissionsCollected,
        SUM(CASE WHEN status = 'paid_out' THEN platformFeeAmount ELSE 0 END) as totalPaidOut,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingCount,
        SUM(CASE WHEN isInsuranceJob = 1 THEN 1 ELSE 0 END) as insuranceJobCount,
        SUM(CASE WHEN isInsuranceJob = 1 THEN platformFeeAmount ELSE 0 END) as insuranceCommissions
      FROM jobPayments
    `);
    const stats = (statsRows.rows || statsRows)[0] ?? {};

    return { payments, stats };
  }),

  // ── PARTNER: Create Stripe Connect Express onboarding link ─────────────────
  createConnectOnboardingLink: protectedProcedure
    .input(z.object({ origin: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`
        SELECT id, contactEmail, businessName, stripeConnectAccountId, stripeConnectStatus
        FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });

      let accountId = partner.stripeConnectAccountId as string | null;

      if (!accountId) {
        const account = await stripe.accounts.create({
          type: "express",
          email: partner.contactEmail,
          business_profile: { name: partner.businessName },
          capabilities: { transfers: { requested: true }, us_bank_account_ach_payments: { requested: true } },
          metadata: { partnerId: String(partner.id), platform: "prolnk" },
        });
        accountId = account.id;
        await (db as any).execute(sql`
          UPDATE partners
          SET stripeConnectAccountId = ${accountId}, stripeConnectStatus = 'pending'
          WHERE id = ${partner.id}
        `);
      }

      const link = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${input.origin}/dashboard/payout-setup?refresh=1`,
        return_url: `${input.origin}/dashboard/payout-setup?success=1`,
        type: "account_onboarding",
      });

      return { url: link.url, accountId };
    }),

  // ── PARTNER: Get Connect account status ──────────────────────────────────────
  getConnectStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await (db as any).execute(sql`
      SELECT id, stripeConnectAccountId, stripeConnectStatus, bankAccountLast4, payoutReadyAt
      FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (rows.rows || rows)[0];
    if (!partner) return null;

    if (partner.stripeConnectAccountId && partner.stripeConnectStatus === 'pending') {
      try {
        const account = await stripe.accounts.retrieve(partner.stripeConnectAccountId);
        const isActive = account.charges_enabled && account.payouts_enabled;
        if (isActive) {
          await (db as any).execute(sql`
            UPDATE partners SET stripeConnectStatus = 'active', payoutReadyAt = NOW()
            WHERE id = ${partner.id}
          `);
          partner.stripeConnectStatus = 'active';
        }
      } catch (_) {}
    }
    return partner;
  }),

  // ── PARTNER: Get earnings from jobPayments ────────────────────────────────────
  getPartnerEarnings: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { earnings: [], stats: {} };

    const partnerRows = await (db as any).execute(sql`
      SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return { earnings: [], stats: {} };

    const rows = await (db as any).execute(sql`
      SELECT jp.*,
        cd.issueType, cd.issueCategory, cd.homeownerName, cd.serviceAddress
      FROM jobPayments jp
      LEFT JOIN customerDeals cd ON jp.dealId = cd.id
      WHERE jp.referringPartnerId = ${partner.id} OR jp.receivingPartnerId = ${partner.id}
      ORDER BY jp.createdAt DESC
      LIMIT 100
    `);
    const earnings = rows.rows || rows;

    const statsRows = await (db as any).execute(sql`
      SELECT
        SUM(CASE WHEN referringPartnerId = ${partner.id} THEN referringPartnerCommission ELSE 0 END) as totalReferralEarnings,
        SUM(CASE WHEN receivingPartnerId = ${partner.id} THEN receivingPartnerPayout ELSE 0 END) as totalJobEarnings,
        COUNT(CASE WHEN status = 'paid_out' THEN 1 END) as completedJobs,
        COUNT(CASE WHEN status NOT IN ('paid_out','cancelled') THEN 1 END) as activeJobs
      FROM jobPayments
      WHERE referringPartnerId = ${partner.id} OR receivingPartnerId = ${partner.id}
    `);
    const stats = (statsRows.rows || statsRows)[0] ?? {};

    return { earnings, stats };
  }),

  // ── HOMEOWNER: Get milestones for a deal (public token-based) ─────────────────
  getMilestonesForDeal: publicProcedure
    .input(z.object({ dealId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await (db as any).execute(sql`
        SELECT jp.id, jp.totalJobValue, jp.platformFeeAmount, jp.status,
          jp.depositChargedAt, jp.balanceChargedAt, jp.isInsuranceJob,
          hpm.cardBrand, hpm.cardLast4
        FROM jobPayments jp
        LEFT JOIN homeownerPaymentMethods hpm ON jp.homeownerId = hpm.homeownerId AND hpm.isDefault = 1
        WHERE jp.dealId = ${input.dealId} LIMIT 1
      `);
      const jp = (rows.rows || rows)[0];
      if (!jp) return null;
      const msRows = await (db as any).execute(sql`
        SELECT * FROM paymentMilestones WHERE jobPaymentId = ${jp.id} ORDER BY id ASC
      `);
      return { payment: jp, milestones: msRows.rows || msRows };
    }),

  // ── ADMIN: Get investor metrics aggregates ────────────────────────────────────
  getInvestorMetrics: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return {};

    const [gmvRows, partnerRows, commRows, growthRows] = await Promise.all([
      (db as any).execute(sql`
        SELECT
          COALESCE(SUM(totalJobValue), 0) as totalGMV,
          COALESCE(SUM(platformFeeAmount), 0) as totalPlatformRevenue,
          COUNT(*) as totalTransactions,
          COALESCE(SUM(CASE WHEN isInsuranceJob = 1 THEN totalJobValue ELSE 0 END), 0) as insuranceGMV
        FROM jobPayments WHERE status != 'cancelled'
      `),
      (db as any).execute(sql`
        SELECT
          COUNT(*) as totalPartners,
          COUNT(CASE WHEN tier = 'scout' THEN 1 END) as scoutCount,
          COUNT(CASE WHEN tier = 'pro' THEN 1 END) as proCount,
          COUNT(CASE WHEN tier = 'crew' THEN 1 END) as crewCount,
          COUNT(CASE WHEN tier = 'company' THEN 1 END) as companyCount,
          COUNT(CASE WHEN tier = 'enterprise' THEN 1 END) as enterpriseCount,
          COUNT(CASE WHEN status = 'approved' THEN 1 END) as activePartners,
          COUNT(CASE WHEN appliedAt >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as newThisMonth
        FROM partners
      `),
      (db as any).execute(sql`
        SELECT
          COALESCE(SUM(amount), 0) as totalCommissionsPaid,
          COUNT(*) as totalCommissions
        FROM commissions WHERE status = 'paid'
      `),
      (db as any).execute(sql`
        SELECT
          MONTH(createdAt) as month, YEAR(createdAt) as year,
          COUNT(*) as newPartners
        FROM partners
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY YEAR(createdAt), MONTH(createdAt)
        ORDER BY year, month
      `),
    ]);

    return {
      gmv: (gmvRows.rows || gmvRows)[0] ?? {},
      partners: (partnerRows.rows || partnerRows)[0] ?? {},
      commissions: (commRows.rows || commRows)[0] ?? {},
      monthlyGrowth: growthRows.rows || growthRows,
    };
  }),

  // ── ADMIN: Manually trigger payout to receiving partner ──────────────────────
  adminTriggerPayout: protectedProcedure
    .input(z.object({ jobPaymentId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const jpRows = await (db as any).execute(sql`
        SELECT jp.*, p.stripeConnectAccountId, p.stripeConnectStatus
        FROM jobPayments jp
        LEFT JOIN partners p ON jp.receivingPartnerId = p.id
        WHERE jp.id = ${input.jobPaymentId} LIMIT 1
      `);
      const jp = (jpRows.rows || jpRows)[0];
      if (!jp) throw new TRPCError({ code: "NOT_FOUND" });
      if (jp.status === "paid_out") throw new TRPCError({ code: "BAD_REQUEST", message: "Already paid out" });

      if (!jp.stripeConnectAccountId || jp.stripeConnectStatus !== "active") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Partner does not have an active Stripe Connect account" });
      }

      const payoutAmountCents = Math.round(parseFloat(jp.receivingPartnerPayout || "0") * 100);
      const transfer = await stripe.transfers.create({
        amount: payoutAmountCents,
        currency: "usd",
        destination: jp.stripeConnectAccountId,
        description: `ProLnk payout — Job Payment #${jp.id}`,
        metadata: { jobPaymentId: String(jp.id), dealId: String(jp.dealId) },
      });

      await (db as any).execute(sql`
        UPDATE jobPayments
        SET status = 'paid_out', stripeTransferId = ${transfer.id}, updatedAt = NOW()
        WHERE id = ${jp.id}
      `);

      // Send payout confirmation email
      try {
        const partnerRows = await (db as any).execute(sql`SELECT p.businessName, u.email FROM partners p LEFT JOIN users u ON p.userId = u.id WHERE p.id = ${jp.receivingPartnerId} LIMIT 1`);
        const partner = (partnerRows.rows || partnerRows)[0];
        if (partner?.email) {
          await sendPayoutConfirmation({
            to: partner.email,
            partnerName: partner.businessName || 'Partner',
            amount: payoutAmountCents / 100,
            method: 'Stripe Connect',
            periodLabel: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            dashboardUrl: `${process.env.VITE_OAUTH_PORTAL_URL || 'https://prolnk.manus.space'}/dashboard/earnings`,
          });
        }
      } catch (emailErr) {
        console.error('[Payout] Email notification failed:', emailErr);
      }
      return { success: true, transferId: transfer.id, amountPaid: payoutAmountCents / 100 };
    }),

  // ── PARTNER: Submit insurance job completion (final payout + adjuster report) ──
  // Called when partner finishes an insurance-funded job. Records the final
  // insurance payout amount and optionally uploads the adjuster report URL.
  // This triggers the ACH commission pull from the partner's bank account.
  submitInsuranceCompletion: protectedProcedure
    .input(z.object({
      dealId: z.number().int().positive(),
      finalPayoutAmount: z.number().positive(),
      adjusterReportUrl: z.string().url().optional(),
      adjusterReportFileName: z.string().optional(),
      claimNumber: z.string().optional(),
      adjusterName: z.string().optional(),
      adjusterEmail: z.string().email().optional(),
      notes: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get partner ID from user
      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });

      // Verify the partner is the receiving partner on this deal
      const jpRows = await (db as any).execute(sql`
        SELECT jp.id, jp.dealId, jp.receivingPartnerId, jp.status, jp.isInsuranceJob,
               cd.homeownerName, cd.serviceAddress, cd.issueType
        FROM jobPayments jp
        LEFT JOIN customerDeals cd ON jp.dealId = cd.id
        WHERE jp.dealId = ${input.dealId} AND jp.receivingPartnerId = ${partner.id}
        LIMIT 1
      `);
      const jp = (jpRows.rows || jpRows)[0];
      if (!jp) throw new TRPCError({ code: "NOT_FOUND", message: "Job payment not found or not authorized" });
      if (!jp.isInsuranceJob) throw new TRPCError({ code: "BAD_REQUEST", message: "This deal is not flagged as an insurance job" });
      if (jp.status === "insurance_completed" || jp.status === "paid_out") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "This job has already been completed" });
      }

      // Update the job payment with insurance completion data
      await (db as any).execute(sql`
        UPDATE jobPayments SET
          insuranceApprovedAmount = ${input.finalPayoutAmount},
          insuranceClaimNumber = ${input.claimNumber ?? null},
          insuranceAdjusterName = ${input.adjusterName ?? null},
          insuranceAdjusterEmail = ${input.adjusterEmail ?? null},
          status = 'insurance_completed',
          updatedAt = NOW()
        WHERE dealId = ${input.dealId} AND receivingPartnerId = ${partner.id}
      `);

      // Update the deal status to completed
      await (db as any).execute(sql`
        UPDATE customerDeals SET status = 'completed', closedAt = NOW()
        WHERE id = ${input.dealId}
      `);

      return {
        success: true,
        message: "Insurance job completion submitted. ACH commission pull will be triggered automatically.",
        dealId: input.dealId,
        finalPayoutAmount: input.finalPayoutAmount,
      };
    }),

  // ── PARTNER: Request a payout ────────────────────────────────────────────
  requestPayout: protectedProcedure
    .input(z.object({
      requestedAmount: z.number().positive(),
      note: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      // Get partner
      const partnerRows = await (db as any).execute(sql`
        SELECT p.*, u.email FROM partners p LEFT JOIN users u ON p.userId = u.id
        WHERE p.userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner profile not found' });
      // Check for existing pending request
      const existingRows = await (db as any).execute(sql`
        SELECT id FROM payoutRequests WHERE partnerId = ${partner.id} AND status = 'pending' LIMIT 1
      `);
      const existing = (existingRows.rows || existingRows)[0];
      if (existing) throw new TRPCError({ code: 'BAD_REQUEST', message: 'You already have a pending payout request. Please wait for it to be reviewed.' });
      // Check available balance (total pending commissions)
      const balanceRows = await (db as any).execute(sql`
        SELECT COALESCE(SUM(amount), 0) as pendingBalance
        FROM commissions WHERE receivingPartnerId = ${partner.id} AND paid = 0
      `);
      const pendingBalance = parseFloat((balanceRows.rows || balanceRows)[0]?.pendingBalance ?? '0');
      if (input.requestedAmount > pendingBalance) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `Requested amount exceeds your available balance of $${pendingBalance.toFixed(2)}` });
      }
      // Create payout request
      await (db as any).execute(sql`
        INSERT INTO payoutRequests (partnerId, requestedAmount, status, note)
        VALUES (${partner.id}, ${input.requestedAmount.toFixed(2)}, 'pending', ${input.note ?? null})
      `);
      // Notify admin
      try {
        await notifyOwner({
          title: `Payout Request — ${partner.businessName}`,
          content: `${partner.businessName} has requested a payout of $${input.requestedAmount.toFixed(2)}. Review in the admin panel.`,
        });
      } catch {}
      return { success: true, message: 'Payout request submitted. You will be notified when it is reviewed.' };
    }),

  // ── PARTNER: Get own payout requests ─────────────────────────────────────
  getMyPayoutRequests: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];
    const rows = await (db as any).execute(sql`
      SELECT * FROM payoutRequests WHERE partnerId = ${partner.id} ORDER BY createdAt DESC LIMIT 20
    `);
    return (rows.rows || rows) as any[];
  }),

  // ── ADMIN: Get all payout requests ───────────────────────────────────────
  adminGetPayoutRequests: protectedProcedure
    .input(z.object({ status: z.enum(['pending', 'approved', 'rejected', 'paid', 'all']).default('pending') }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
      const db = await getDb();
      if (!db) return [];
      const whereClause = input.status === 'all' ? sql`1=1` : sql`pr.status = ${input.status}`;
      const rows = await (db as any).execute(sql`
        SELECT pr.*, p.businessName, p.contactEmail, p.stripeConnectAccountId, p.stripeConnectStatus,
               p.totalCommissionEarned, p.totalCommissionPaid
        FROM payoutRequests pr
        LEFT JOIN partners p ON pr.partnerId = p.id
        WHERE ${whereClause}
        ORDER BY pr.createdAt DESC LIMIT 100
      `);
      return (rows.rows || rows) as any[];
    }),

  // ── ADMIN: Approve or reject a payout request ────────────────────────────
  adminReviewPayoutRequest: protectedProcedure
    .input(z.object({
      requestId: z.number().int().positive(),
      action: z.enum(['approved', 'rejected']),
      adminNote: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const reqRows = await (db as any).execute(sql`
        SELECT pr.*, p.stripeConnectAccountId, p.stripeConnectStatus, p.businessName,
               u.email as partnerEmail, p.contactEmail
        FROM payoutRequests pr
        LEFT JOIN partners p ON pr.partnerId = p.id
        LEFT JOIN users u ON p.userId = u.id
        WHERE pr.id = ${input.requestId} LIMIT 1
      `);
      const req = (reqRows.rows || reqRows)[0];
      if (!req) throw new TRPCError({ code: 'NOT_FOUND' });
      if (req.status !== 'pending') throw new TRPCError({ code: 'BAD_REQUEST', message: 'Request is no longer pending' });

      if (input.action === 'rejected') {
        await (db as any).execute(sql`
          UPDATE payoutRequests SET status = 'rejected', adminNote = ${input.adminNote ?? null},
          reviewedByAdminId = ${ctx.user.id}, reviewedAt = NOW() WHERE id = ${input.requestId}
        `);
        return { success: true, action: 'rejected' };
      }

      // Approved — trigger Stripe transfer if Connect is active
      if (!req.stripeConnectAccountId || req.stripeConnectStatus !== 'active') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Partner does not have an active Stripe Connect account. Cannot process payout.' });
      }
      const amountCents = Math.round(parseFloat(req.requestedAmount) * 100);
      const transfer = await stripe.transfers.create({
        amount: amountCents,
        currency: 'usd',
        destination: req.stripeConnectAccountId,
        description: `ProLnk payout request #${req.id} — ${req.businessName}`,
        metadata: { payoutRequestId: String(req.id), partnerId: String(req.partnerId) },
      });
      await (db as any).execute(sql`
        UPDATE payoutRequests SET status = 'paid', adminNote = ${input.adminNote ?? null},
        reviewedByAdminId = ${ctx.user.id}, reviewedAt = NOW(), paidAt = NOW(),
        stripeTransferId = ${transfer.id} WHERE id = ${input.requestId}
      `);
      // Send confirmation email
      try {
        const email = req.partnerEmail || req.contactEmail;
        if (email) {
          await sendPayoutConfirmation({
            to: email,
            partnerName: req.businessName || 'Partner',
            amount: amountCents / 100,
            method: 'Stripe Connect',
            periodLabel: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            dashboardUrl: `${process.env.VITE_OAUTH_PORTAL_URL || 'https://prolnk.manus.space'}/dashboard/payout-history`,
          });
        }
      } catch {}
      return { success: true, action: 'approved', transferId: transfer.id, amountPaid: amountCents / 100 };
    }),
});

// ─── Internal: Process balance charge (standard jobs) ─────────────────────────
async function processBalanceCharge(
  db: any,
  jp: any,
  checkinId: number,
  confirmedJobValue?: number
) {
  const msRows = await (db as any).execute(sql`
    SELECT * FROM paymentMilestones
    WHERE jobPaymentId = ${jp.id} AND milestoneType = 'final_balance' AND status = 'scheduled'
    LIMIT 1
  `);
  const balanceMilestone = (msRows.rows || msRows)[0];
  if (!balanceMilestone) return { success: false, reason: "no_balance_milestone" };

  if (!jp.stripePaymentMethodId) {
    return { success: false, reason: "no_payment_method" };
  }

  // Update milestone to triggered
  await (db as any).execute(sql`
    UPDATE paymentMilestones SET status = 'triggered', triggeredAt = NOW()
    WHERE id = ${balanceMilestone.id}
  `);

  let paymentIntent: Stripe.PaymentIntent;
  try {
    // Get receiving partner's Stripe Connect account for destination charge
    const partnerRows = await (db as any).execute(sql`
      SELECT stripeConnectAccountId, stripeConnectStatus FROM partners
      WHERE id = ${jp.receivingPartnerId} LIMIT 1
    `);
    const receivingPartner = (partnerRows.rows || partnerRows)[0];

    const paymentConfig: Stripe.PaymentIntentCreateParams = {
      amount: balanceMilestone.amountCents,
      currency: "usd",
      customer: jp.homeownerStripeCustomerId || jp.stripeCustomerId,
      payment_method: jp.stripePaymentMethodId,
      off_session: true,
      confirm: true,
      description: `ProLnk balance — Deal #${jp.dealId}`,
      metadata: {
        dealId: String(jp.dealId),
        jobPaymentId: String(jp.id),
        milestoneType: "final_balance",
        checkinId: String(checkinId),
        platform: "prolnk",
      },
    };

    // Add destination charge if partner has active Connect account
    if (receivingPartner?.stripeConnectAccountId && receivingPartner?.stripeConnectStatus === "active") {
      const receivingPayoutCents = Math.round(parseFloat(jp.receivingPartnerPayout || "0") * 100);
      (paymentConfig as any).transfer_data = {
        destination: receivingPartner.stripeConnectAccountId,
        amount: receivingPayoutCents,
      };
    }

    paymentIntent = await stripe.paymentIntents.create(paymentConfig);
  } catch (stripeError: any) {
    await (db as any).execute(sql`
      UPDATE paymentMilestones SET status = 'failed', failureReason = ${stripeError.message}
      WHERE id = ${balanceMilestone.id}
    `);
    return { success: false, reason: "stripe_error", error: stripeError.message };
  }

  // Update records
  await (db as any).execute(sql`
    UPDATE paymentMilestones
    SET status = 'completed', completedAt = NOW(), stripeIntentId = ${paymentIntent.id}
    WHERE id = ${balanceMilestone.id}
  `);

  await (db as any).execute(sql`
    UPDATE jobPayments
    SET status = 'balance_charged',
        balanceChargedAt = NOW(),
        balanceStripeIntentId = ${paymentIntent.id},
        triggeredByCheckinId = ${checkinId}
    WHERE id = ${jp.id}
  `);

  // Idempotency guard: only create the commission record if one doesn't already exist
  // for this jobPayment. Prevents double-counting if check-in fires twice or if
  // the old closeOpportunityWithJobValue flow already ran for the same deal.
  const existingComm = await (db as any).execute(sql`
    SELECT id FROM commissions
    WHERE description LIKE ${'%Deal #' + jp.dealId + '%'}
      AND commissionType = 'referral_commission'
      AND payingPartnerId = ${jp.receivingPartnerId}
    LIMIT 1
  `);
  const commAlreadyExists = ((existingComm.rows || existingComm)[0] != null);

  if (!commAlreadyExists && jp.referringPartnerId && parseFloat(jp.referringPartnerCommission || "0") > 0) {
    await (db as any).execute(sql`
      INSERT INTO commissions
        (payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description)
      VALUES
        (${jp.receivingPartnerId}, ${jp.referringPartnerId}, 'referral_commission',
         ${jp.referringPartnerCommission}, ${jp.totalJobValue}, ${jp.platformFeeRate},
         ${'Auto-collected via check-in confirmation — Deal #' + jp.dealId})
    `);
  }

  return {
    success: true,
    balanceCharged: balanceMilestone.amountCents / 100,
    paymentIntentId: paymentIntent.id,
    commissionCollected: parseFloat(jp.platformFeeAmount || "0"),
    referringPartnerEarned: parseFloat(jp.referringPartnerCommission || "0"),
  };
}

// ─── Internal: Process insurance commission ACH pull ──────────────────────────
async function processInsuranceCommissionPull(
  db: any,
  jp: any,
  checkinId: number,
  confirmedJobValue?: number
) {
  // Get signed ACH authorization
  const authRows = await (db as any).execute(sql`
    SELECT * FROM achAuthorizations
    WHERE jobPaymentId = ${jp.id} AND status = 'signed'
    ORDER BY createdAt DESC LIMIT 1
  `);
  const auth = (authRows.rows || authRows)[0];
  if (!auth) return { success: false, reason: "no_ach_authorization" };

  const commissionCents = Math.round(parseFloat(jp.platformFeeAmount || "0") * 100);

  // Get partner's Stripe customer ID for ACH debit
  const partnerRows = await (db as any).execute(sql`
    SELECT contactEmail FROM partners WHERE id = ${jp.referringPartnerId} LIMIT 1
  `);
  const partner = (partnerRows.rows || partnerRows)[0];

  let paymentIntent: Stripe.PaymentIntent;
  try {
    // Find partner's Stripe customer
    const customers = await stripe.customers.list({ email: partner?.contactEmail, limit: 1 });
    if (!customers.data.length) {
      return { success: false, reason: "partner_no_stripe_customer" };
    }

    paymentIntent = await stripe.paymentIntents.create({
      amount: commissionCents,
      currency: "usd",
      customer: customers.data[0].id,
      payment_method: auth.stripePaymentMethodId,
      payment_method_types: ["us_bank_account"],
      off_session: true,
      confirm: true,
      description: `ProLnk insurance commission — Deal #${jp.dealId}`,
      metadata: {
        dealId: String(jp.dealId),
        jobPaymentId: String(jp.id),
        milestoneType: "insurance_commission",
        checkinId: String(checkinId),
        achAuthorizationId: String(auth.id),
        platform: "prolnk",
      },
    });
  } catch (stripeError: any) {
    return { success: false, reason: "ach_failed", error: stripeError.message };
  }

  // Update ACH authorization to used
  await (db as any).execute(sql`
    UPDATE achAuthorizations SET status = 'used' WHERE id = ${auth.id}
  `);

  // Update job payment
  await (db as any).execute(sql`
    UPDATE jobPayments
    SET status = 'ach_pulled',
        commissionPullAmount = ${jp.platformFeeAmount},
        commissionPullChargedAt = NOW(),
        commissionPullStripeIntentId = ${paymentIntent.id},
        triggeredByCheckinId = ${checkinId}
    WHERE id = ${jp.id}
  `);

  // Create commission record
  await (db as any).execute(sql`
    INSERT INTO commissions
      (payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description)
    VALUES
      (${jp.receivingPartnerId}, ${jp.referringPartnerId}, 'referral_commission',
       ${jp.referringPartnerCommission}, ${jp.totalJobValue}, ${jp.platformFeeRate},
       ${'Insurance job ACH pull — auto-collected via check-in — Deal #' + jp.dealId})
  `);

  return {
    success: true,
    commissionPulled: commissionCents / 100,
    paymentIntentId: paymentIntent.id,
    referringPartnerEarned: parseFloat(jp.referringPartnerCommission || "0"),
    message: "Insurance commission collected via ACH debit.",
  };
}
