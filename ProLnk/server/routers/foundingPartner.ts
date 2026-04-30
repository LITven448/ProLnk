/**
 * Founding Partner Router
 * All endpoints for the founding partner program.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import {
  enrollFoundingPartner,
  checkFoundingPartnerRequirements,
  getFoundingPartnerEarnings,
  registerHomeOrigination,
  buildNetworkChain,
  FOUNDING_PARTNER_RATES,
} from "../foundingPartner";

export const foundingPartnerRouter = router({

  // ── Public: get enrollment count and availability ────────────────────────────
  getEnrollmentStatus: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { enrolled: 0, remaining: 100, isOpen: true };
    const rows = await (db as any).execute(sql`
      SELECT COUNT(*) as cnt FROM foundingPartnerStatus WHERE status != 'churned'
    `);
    const enrolled = parseInt((rows.rows || rows)[0]?.cnt ?? "0");
    return {
      enrolled,
      remaining: Math.max(0, 100 - enrolled),
      isOpen: enrolled < 100,
      rates: FOUNDING_PARTNER_RATES,
    };
  }),

  // ── Check my requirements progress ──────────────────────────────────────────
  checkMyRequirements: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) throw new TRPCError({ code: "NOT_FOUND" });
    return checkFoundingPartnerRequirements(partner.id);
  }),

  // ── Get my founding partner status and earnings ──────────────────────────────
  getMyStatus: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return null;
    const fpRows = await (db as any).execute(sql`
      SELECT * FROM foundingPartnerStatus WHERE partnerId = ${partner.id} LIMIT 1
    `);
    const fpStatus = (fpRows.rows || fpRows)[0];
    if (!fpStatus) return null;
    return getFoundingPartnerEarnings(partner.id);
  }),

  // ── Get my network (who I've recruited and their recruits) ───────────────────
  getMyNetwork: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];

    const rows = await (db as any).execute(sql`
      SELECT nc.networkLevel, nc.joinedAt,
             p.businessName, p.businessType, p.tier, p.status,
             p.jobsLogged, p.totalCommissionEarned,
             (SELECT SUM(commissionAmount) FROM networkJobCommissions
              WHERE foundingPartnerId = ${partner.id} AND doingPartnerId = p.id) as earnedFromThis
      FROM partnerNetworkChain nc
      JOIN partners p ON nc.memberPartnerId = p.id
      WHERE nc.foundingPartnerId = ${partner.id}
        AND nc.isActive = 1
      ORDER BY nc.networkLevel ASC, p.jobsLogged DESC
      LIMIT 100
    `);
    return rows.rows || rows;
  }),

  // ── Get my origination rights (homes I own) ──────────────────────────────────
  getMyOriginatedHomes: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return [];

      const rows = await (db as any).execute(sql`
        SELECT ho.*,
          (SELECT COUNT(*) FROM originationCommissions WHERE homeOriginatorId = ho.id) as jobCount,
          (SELECT SUM(commissionAmount) FROM originationCommissions WHERE homeOriginatorId = ho.id AND paid = 0) as pendingCommission
        FROM homeOriginators ho
        WHERE ho.originatingPartnerId = ${partner.id}
          AND ho.isActive = 1
        ORDER BY ho.totalOriginationEarned DESC
        LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  // ── Get network earnings breakdown ───────────────────────────────────────────
  getEarningsBreakdown: protectedProcedure
    .input(z.object({
      period: z.enum(["all", "this_month", "last_month"]).default("this_month"),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return null;

      const dateFilter = input.period === "this_month"
        ? sql`AND MONTH(createdAt) = MONTH(NOW()) AND YEAR(createdAt) = YEAR(NOW())`
        : input.period === "last_month"
        ? sql`AND MONTH(createdAt) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)) AND YEAR(createdAt) = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH))`
        : sql`1=1`;

      const [jobComms, subComms, origComms] = await Promise.all([
        (db as any).execute(sql`
          SELECT networkLevel, SUM(commissionAmount) as total, COUNT(*) as cnt
          FROM networkJobCommissions
          WHERE foundingPartnerId = ${partner.id} AND ${dateFilter}
          GROUP BY networkLevel ORDER BY networkLevel
        `),
        (db as any).execute(sql`
          SELECT networkLevel, SUM(commissionAmount) as total, COUNT(*) as cnt
          FROM subscriptionNetworkCommissions
          WHERE foundingPartnerId = ${partner.id} AND ${dateFilter}
          GROUP BY networkLevel ORDER BY networkLevel
        `),
        (db as any).execute(sql`
          SELECT SUM(commissionAmount) as total, COUNT(*) as cnt
          FROM originationCommissions
          WHERE originatingPartnerId = ${partner.id} AND ${dateFilter}
        `),
      ]);

      return {
        jobCommissions: jobComms.rows || jobComms,
        subscriptionCommissions: subComms.rows || subComms,
        originationCommissions: (origComms.rows || origComms)[0] ?? { total: 0, cnt: 0 },
      };
    }),

  // ── Admin: enroll a founding partner ────────────────────────────────────────
  adminEnroll: protectedProcedure
    .input(z.object({ partnerId: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      return enrollFoundingPartner({ partnerId: input.partnerId, enrolledBy: ctx.user.id });
    }),

  // ── Admin: list all founding partners ───────────────────────────────────────
  adminListFoundingPartners: protectedProcedure
    .input(z.object({ status: z.enum(["all", "trial", "active", "suspended"]).default("all") }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];
      const whereClause = input.status === "all" ? sql`1=1` : sql`fps.status = ${input.status}`;
      const rows = await (db as any).execute(sql`
        SELECT fps.*, p.businessName, p.contactEmail, p.businessType, p.tier,
               p.jobsLogged, p.partnersReferred,
               (SELECT COUNT(*) FROM partnerNetworkChain WHERE foundingPartnerId = fps.partnerId) as networkSize,
               (SELECT COUNT(*) FROM homeOriginators WHERE originatingPartnerId = fps.partnerId) as homesOriginated
        FROM foundingPartnerStatus fps
        JOIN partners p ON fps.partnerId = p.id
        WHERE ${whereClause}
        ORDER BY fps.enrollmentNumber ASC
      `);
      return rows.rows || rows;
    }),

  // ── Admin: view network for a founding partner ───────────────────────────────
  adminViewNetwork: protectedProcedure
    .input(z.object({ foundingPartnerId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT nc.*, p.businessName, p.businessType, p.tier, p.status as partnerStatus,
               p.jobsLogged, p.totalCommissionEarned,
               rp.businessName as recruitedByName
        FROM partnerNetworkChain nc
        JOIN partners p ON nc.memberPartnerId = p.id
        LEFT JOIN partners rp ON nc.recruitedByPartnerId = rp.id
        WHERE nc.foundingPartnerId = ${input.foundingPartnerId}
        ORDER BY nc.networkLevel, nc.joinedAt
      `);
      return rows.rows || rows;
    }),

  // ── Admin: manually process subscription commissions for a billing period ────
  adminProcessSubscriptionCommissions: protectedProcedure
    .input(z.object({ billingPeriod: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { processSubscriptionNetworkCommissions } = await import("../foundingPartner");
      return processSubscriptionNetworkCommissions(input.billingPeriod);
    }),

  // ── Get enrollment FAQ/description ──────────────────────────────────────────
  getProgram: publicProcedure.query(() => ({
    title: "ProLnk Founding Partner Program",
    subtitle: "The first 100 licensed, verified home service professionals to join ProLnk.",
    description: "This is a permanent status — not a tier, not a title. Once the 100 slots close, they're closed forever. Founding Partners are the people who believed in the platform early, helped build the network, and get rewarded for that for the life of their membership.",
    benefits: [
      {
        title: "Locked Subscription Rate",
        description: "$149/month forever — you get the $249/month feature set at the founder price. Locked in permanently regardless of future price increases.",
        icon: "🔒",
      },
      {
        title: "Maximum Commission Keep Rate",
        description: "You keep 78% of every referral commission — the highest rate on the platform, normally reserved for Enterprise tier.",
        icon: "💰",
      },
      {
        title: "Network Job Commissions",
        description: "Every time a pro in your network closes a job, you earn from ProLnk's platform fee: L1=7%, L2=4%, L3=2%, L4=1%. Runs automatically, forever, on every job.",
        icon: "🔄",
      },
      {
        title: "Network Subscription Commissions",
        description: "Earn from your network's monthly subscriptions: L1=12%, L2=6%, L3=3%, L4=1.5%. The more pros you bring in, the more recurring monthly income.",
        icon: "📅",
      },
      {
        title: "Home Origination Rights",
        description: "Every address you document becomes yours permanently. Earn 1.5% of the platform fee on every job at that address, forever, as long as the home is active on TrustyPro.",
        icon: "🏠",
      },
      {
        title: "Priority Lead Routing",
        description: "Your jobs come first. Highest PPS priority routing in the network.",
        icon: "⚡",
      },
      {
        title: "TrustyPro Verified Badge",
        description: "Top-tier verification badge for instant credibility with homeowners.",
        icon: "✅",
      },
      {
        title: "Founding Partner Events",
        description: "Exclusive gatherings, experiential rewards, and direct access to the founding team.",
        icon: "🎉",
      },
    ],
    requirements: [
      "Active contractor license (verified)",
      "Pass ProLnk background check",
      "General liability insurance (verified COI)",
      "Complete onboarding (profile, service area, Briefcase, Stripe Connect)",
      "Minimum 15 homes added to the system",
      "Minimum 5 service professionals referred to join",
      "$149/month subscription (after 90-day free trial at launch)",
      "Active participation — feedback and activity",
    ],
    rates: FOUNDING_PARTNER_RATES,
  })),
});
