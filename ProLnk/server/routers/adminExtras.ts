/**
 * adminExtras.ts — Additional admin procedures for static admin pages
 * Covers: revenue forecast, payout history, NPS manager, onboarding funnel,
 * partner health, tier upgrade center, service categories, task manager,
 * lead quality center, storm watch, churn prediction, commission strategy,
 * seasonal campaigns, geo expansion, franchise territories
 */
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { sendTierUpgradeCongrats } from "../email";
import { notifyOwner } from "../_core/notification";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const adminExtrasRouter = router({
  // ── Revenue Forecast ──────────────────────────────────────────────────────
  getRevenueSummary: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        YEAR(createdAt) as yr,
        MONTH(createdAt) as mo,
        SUM(CAST(amount AS DECIMAL(12,2))) as total,
        COUNT(*) as count,
        commissionType
      FROM commissions
      WHERE paid = 1
      GROUP BY yr, mo, commissionType
      ORDER BY yr DESC, mo DESC
      LIMIT 48
    `);
    const data = (rows[0] ?? rows) as any[];

    // Monthly totals
    const monthly: Record<string, { revenue: number; commissions: number; net: number }> = {};
    for (const r of data) {
      const key = `${r.yr}-${String(r.mo).padStart(2, "0")}`;
      if (!monthly[key]) monthly[key] = { revenue: 0, commissions: 0, net: 0 };
      const amt = Number(r.total ?? 0);
      if (r.commissionType === "platform_fee") monthly[key].revenue += amt;
      if (r.commissionType === "referral_commission") monthly[key].commissions += amt;
      if (r.commissionType === "prolink_net") monthly[key].net += amt;
    }

    const months = Object.entries(monthly)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({ month, ...v }));

    // YTD
    const now = new Date();
    const ytd = months
      .filter((m) => m.month.startsWith(String(now.getFullYear())))
      .reduce((acc, m) => acc + m.net, 0);

    // Forecast: simple 3-month average × 12
    const last3 = months.slice(-3);
    const avgMonthly = last3.length ? last3.reduce((a, m) => a + m.net, 0) / last3.length : 0;
    const forecast = Math.round(avgMonthly * 12);

    return { months, ytd, forecast, avgMonthly };
  }),

  // ── Payout History ────────────────────────────────────────────────────────
  getPayoutHistory: adminProcedure
    .input(z.object({ page: z.number().default(1), limit: z.number().default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const rows = await (db as any).execute(sql`
        SELECT c.id, c.amount, c.commissionType, c.paidAt, c.jobValue,
          rp.businessName AS partnerName, rp.tier AS partnerTier,
          o.issueType AS serviceType
        FROM commissions c
        LEFT JOIN partners rp ON c.receivingPartnerId = rp.id
        LEFT JOIN opportunities o ON c.opportunityId = o.id
        WHERE c.paid = 1
        ORDER BY c.paidAt DESC
        LIMIT ${input.limit} OFFSET ${offset}
      `);
      const countRows = await (db as any).execute(sql`SELECT COUNT(*) as total FROM commissions WHERE paid = 1`);
      const total = Number((countRows[0] ?? countRows)[0]?.total ?? 0);
      return { payouts: (rows[0] ?? rows) as any[], total, page: input.page, limit: input.limit };
    }),

  // ── NPS Survey Manager ────────────────────────────────────────────────────
  getNpsSurveys: adminProcedure
    .input(z.object({ limit: z.number().default(100) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await (db as any).execute(sql`
        SELECT s.id, s.score, s.category, s.comment, s.completedAt, s.followUpOk,
          s.homeownerEmail, s.homeownerName,
          p.businessName AS partnerName
        FROM npsSurveys s
        LEFT JOIN partners p ON s.partnerId = p.id
        WHERE s.completedAt IS NOT NULL
        ORDER BY s.completedAt DESC
        LIMIT ${input.limit}
      `);
      const stats = await (db as any).execute(sql`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN score >= 9 THEN 1 ELSE 0 END) as promoters,
          SUM(CASE WHEN score <= 6 THEN 1 ELSE 0 END) as detractors,
          AVG(score) as avgScore
        FROM npsSurveys WHERE completedAt IS NOT NULL
      `);
      const s = ((stats[0] ?? stats) as any[])[0] ?? {};
      const total = Number(s.total ?? 0);
      const promoters = Number(s.promoters ?? 0);
      const detractors = Number(s.detractors ?? 0);
      const npsScore = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0;
      return {
        surveys: (rows[0] ?? rows) as any[],
        stats: { total, promoters, detractors, npsScore, avgScore: Number(s.avgScore ?? 0) },
      };
    }),

  // ── Onboarding Funnel ─────────────────────────────────────────────────────
  getOnboardingFunnel: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN jobsLogged > 0 THEN 1 ELSE 0 END) as hasLoggedJob,
        SUM(CASE WHEN referralCount > 0 THEN 1 ELSE 0 END) as hasReferral,
        SUM(CASE WHEN tier != 'scout' THEN 1 ELSE 0 END) as upgraded
      FROM partners
    `);
    const data = ((rows[0] ?? rows) as any[])[0] ?? {};
    const total = Number(data.total ?? 0);
    const approved = Number(data.approved ?? 0);
    return {
      stages: [
        { label: "Applications Received", count: total, pct: 100 },
        { label: "Approved", count: approved, pct: total > 0 ? Math.round((approved / total) * 100) : 0 },
        { label: "Logged First Job", count: Number(data.hasLoggedJob ?? 0), pct: approved > 0 ? Math.round((Number(data.hasLoggedJob ?? 0) / approved) * 100) : 0 },
        { label: "Made First Referral", count: Number(data.hasReferral ?? 0), pct: approved > 0 ? Math.round((Number(data.hasReferral ?? 0) / approved) * 100) : 0 },
        { label: "Upgraded Tier", count: Number(data.upgraded ?? 0), pct: approved > 0 ? Math.round((Number(data.upgraded ?? 0) / approved) * 100) : 0 },
      ],
      pending: Number(data.pending ?? 0),
      rejected: Number(data.rejected ?? 0),
    };
  }),

  // ── Partner Health Dashboard ──────────────────────────────────────────────
  getPartnerHealth: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.tier, p.serviceArea, p.status,
        p.jobsLogged, p.referralCount, p.totalCommissionEarned,
        p.createdAt,
        COALESCE(pv.trustScore, 0) as trustScore,
        COALESCE(pv.badgeLevel, 'none') as badgeLevel,
        COALESCE(AVG(pr.rating), 0) as avgRating,
        COUNT(DISTINCT pr.id) as reviewCount,
        MAX(j.createdAt) as lastJobDate
      FROM partners p
      LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
      LEFT JOIN partnerReviews pr ON pr.partnerId = p.id AND pr.flagged = false
      LEFT JOIN jobs j ON j.partnerId = p.id
      WHERE p.status = 'approved'
      GROUP BY p.id, p.businessName, p.tier, p.serviceArea, p.status, p.jobsLogged, p.referralCount, p.totalCommissionEarned, p.createdAt, pv.trustScore, pv.badgeLevel
      ORDER BY p.totalCommissionEarned DESC
      LIMIT 200
    `);
    const partners = (rows[0] ?? rows) as any[];
    // Health scoring
    const scored = partners.map((p: any) => {
      let score = 0;
      if (Number(p.jobsLogged) > 0) score += 25;
      if (Number(p.jobsLogged) > 5) score += 15;
      if (Number(p.referralCount) > 0) score += 20;
      if (Number(p.trustScore) > 50) score += 20;
      if (Number(p.avgRating) >= 4.5) score += 20;
      const daysSinceLastJob = p.lastJobDate
        ? Math.floor((Date.now() - new Date(p.lastJobDate).getTime()) / 86400000)
        : 999;
      if (daysSinceLastJob > 90) score -= 20;
      return { ...p, healthScore: Math.max(0, Math.min(100, score)), daysSinceLastJob };
    });
    const atRisk = scored.filter((p: any) => p.healthScore < 40).length;
    const healthy = scored.filter((p: any) => p.healthScore >= 70).length;
    return { partners: scored, atRisk, healthy, total: scored.length };
  }),

  // ── Tier Upgrade Center ───────────────────────────────────────────────────
  getTierUpgradeCandidates: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.tier, p.jobsLogged, p.referralCount,
        p.totalCommissionEarned, p.serviceArea,
        COALESCE(pv.trustScore, 0) as trustScore
      FROM partners p
      LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
      WHERE p.status = 'approved'
      ORDER BY p.totalCommissionEarned DESC
    `);
    const partners = (rows[0] ?? rows) as any[];
    const UPGRADE_THRESHOLDS: Record<string, { jobs: number; referrals: number; nextTier: string }> = {
      scout: { jobs: 3, referrals: 2, nextTier: "pro" },
      pro: { jobs: 10, referrals: 5, nextTier: "crew" },
      crew: { jobs: 25, referrals: 15, nextTier: "company" },
      company: { jobs: 999, referrals: 999, nextTier: "enterprise" },
    };
    const candidates = partners
      .map((p: any) => {
        const thresholds = UPGRADE_THRESHOLDS[p.tier] ?? UPGRADE_THRESHOLDS.scout;
        const jobsMet = Number(p.jobsLogged) >= thresholds.jobs;
        const referralsMet = Number(p.referralCount) >= thresholds.referrals;
        const readyToUpgrade = jobsMet && referralsMet;
        return { ...p, thresholds, jobsMet, referralsMet, readyToUpgrade };
      })
      .filter((p: any) => p.tier !== "company" && p.tier !== "enterprise");
    return {
      candidates,
      readyCount: candidates.filter((p: any) => p.readyToUpgrade).length,
      totalCandidates: candidates.length,
    };
  }),

  // ── Service Categories ────────────────────────────────────────────────────
  getServiceCategoryStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        COALESCE(serviceCategory, businessType, 'Other') as category,
        COUNT(*) as partnerCount,
        SUM(jobsLogged) as totalJobs,
        SUM(referralCount) as totalReferrals,
        SUM(CAST(totalCommissionEarned AS DECIMAL(12,2))) as totalRevenue,
        AVG(CAST(totalCommissionEarned AS DECIMAL(12,2))) as avgRevenue
      FROM partners
      WHERE status = 'approved'
      GROUP BY category
      ORDER BY totalJobs DESC
    `);
    return (rows[0] ?? rows) as any[];
  }),

  // ── Task Manager ─────────────────────────────────────────────────────────
  getAdminTasks: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    // Derive tasks from real data
    const [pending, disputes, inactive, unpaid] = await Promise.all([
      (db as any).execute(sql`SELECT COUNT(*) as c FROM partnerApplications WHERE status = 'pending'`),
      (db as any).execute(sql`SELECT COUNT(*) as c FROM commissions WHERE disputeStatus = 'open'`),
      (db as any).execute(sql`SELECT COUNT(*) as c FROM partners WHERE status = 'approved' AND jobsLogged = 0 AND DATEDIFF(NOW(), createdAt) > 30`),
      (db as any).execute(sql`SELECT COUNT(*) as c FROM commissions WHERE paid = 0 AND CAST(amount AS DECIMAL) >= 100`),
    ]);
    const tasks = [
      { id: 1, type: "applications", title: "Pending Partner Applications", count: Number(((pending[0] ?? pending) as any[])[0]?.c ?? 0), priority: "high", href: "/admin/applications" },
      { id: 2, type: "disputes", title: "Open Commission Disputes", count: Number(((disputes[0] ?? disputes) as any[])[0]?.c ?? 0), priority: "high", href: "/admin/disputes" },
      { id: 3, type: "inactive", title: "Inactive Partners (30+ days, no jobs)", count: Number(((inactive[0] ?? inactive) as any[])[0]?.c ?? 0), priority: "medium", href: "/admin/partners" },
      { id: 4, type: "payouts", title: "Partners Ready for Payout ($100+)", count: Number(((unpaid[0] ?? unpaid) as any[])[0]?.c ?? 0), priority: "medium", href: "/admin/commissions" },
    ];
    return tasks.filter((t) => t.count > 0);
  }),

  // ── Lead Quality Center ───────────────────────────────────────────────────
  getLeadQualityStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        o.issueType as serviceType,
        COUNT(*) as totalLeads,
        SUM(CASE WHEN o.status = 'converted' THEN 1 ELSE 0 END) as converted,
        SUM(CASE WHEN o.status = 'expired' THEN 1 ELSE 0 END) as expired,
        SUM(CASE WHEN o.status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        AVG(CAST(o.estimatedValue AS DECIMAL(12,2))) as avgValue
      FROM opportunities o
      GROUP BY o.issueType
      ORDER BY totalLeads DESC
      LIMIT 30
    `);
    const overall = await (db as any).execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as converted,
        AVG(CAST(estimatedValue AS DECIMAL(12,2))) as avgValue
      FROM opportunities
    `);
    const ov = ((overall[0] ?? overall) as any[])[0] ?? {};
    return {
      byCategory: (rows[0] ?? rows) as any[],
      overall: {
        total: Number(ov.total ?? 0),
        converted: Number(ov.converted ?? 0),
        conversionRate: Number(ov.total ?? 0) > 0 ? Math.round((Number(ov.converted ?? 0) / Number(ov.total ?? 0)) * 100) : 0,
        avgValue: Number(ov.avgValue ?? 0),
      },
    };
  }),

  // ── Churn Prediction ─────────────────────────────────────────────────────
  getChurnRisk: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT p.id, p.businessName, p.tier, p.createdAt, p.jobsLogged, p.referralCount,
        MAX(j.createdAt) as lastActivity
      FROM partners p
      LEFT JOIN jobs j ON j.partnerId = p.id
      WHERE p.status = 'approved'
      GROUP BY p.id, p.businessName, p.tier, p.createdAt, p.jobsLogged, p.referralCount
      ORDER BY lastActivity ASC
      LIMIT 100
    `);
    const partners = (rows[0] ?? rows) as any[];
    const withRisk = partners.map((p: any) => {
      const daysSince = p.lastActivity
        ? Math.floor((Date.now() - new Date(p.lastActivity).getTime()) / 86400000)
        : Math.floor((Date.now() - new Date(p.createdAt).getTime()) / 86400000);
      let riskScore = 0;
      if (daysSince > 90) riskScore += 40;
      else if (daysSince > 60) riskScore += 25;
      else if (daysSince > 30) riskScore += 10;
      if (Number(p.jobsLogged) === 0) riskScore += 30;
      if (Number(p.referralCount) === 0) riskScore += 20;
      if (p.tier === "scout") riskScore += 10;
      const riskLevel = riskScore >= 60 ? "high" : riskScore >= 30 ? "medium" : "low";
      return { ...p, daysSince, riskScore, riskLevel };
    });
    return {
      partners: withRisk.sort((a: any, b: any) => b.riskScore - a.riskScore),
      highRisk: withRisk.filter((p: any) => p.riskLevel === "high").length,
      mediumRisk: withRisk.filter((p: any) => p.riskLevel === "medium").length,
    };
  }),

  // ── Commission Strategy ───────────────────────────────────────────────────
  getCommissionBreakdown: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        p.tier,
        COUNT(DISTINCT c.receivingPartnerId) as partnerCount,
        SUM(CAST(c.amount AS DECIMAL(12,2))) as totalPaid,
        AVG(CAST(c.amount AS DECIMAL(12,2))) as avgPaid,
        SUM(CASE WHEN c.commissionType = 'platform_fee' THEN CAST(c.amount AS DECIMAL(12,2)) ELSE 0 END) as platformFees,
        SUM(CASE WHEN c.commissionType = 'referral_commission' THEN CAST(c.amount AS DECIMAL(12,2)) ELSE 0 END) as referralCommissions,
        SUM(CASE WHEN c.commissionType = 'prolink_net' THEN CAST(c.amount AS DECIMAL(12,2)) ELSE 0 END) as prolinkNet
      FROM commissions c
      JOIN partners p ON c.receivingPartnerId = p.id
      WHERE c.paid = 1
      GROUP BY p.tier
      ORDER BY totalPaid DESC
    `);
    return (rows[0] ?? rows) as any[];
  }),

  // ── Seasonal Campaigns ────────────────────────────────────────────────────
  getSeasonalCampaignStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await (db as any).execute(sql`
      SELECT
        MONTH(createdAt) as month,
        MONTHNAME(createdAt) as monthName,
        COUNT(*) as leads,
        SUM(CASE WHEN status = 'converted' THEN 1 ELSE 0 END) as conversions,
        AVG(CAST(estimatedValue AS DECIMAL(12,2))) as avgValue
      FROM opportunities
      GROUP BY month, monthName
      ORDER BY month
    `);
    return (rows[0] ?? rows) as any[];
  }),

  // ── Geo Expansion Map ─────────────────────────────────────────────────────
  getGeoExpansionData: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    // Partner density by service area
    const rows = await (db as any).execute(sql`
      SELECT
        serviceArea,
        COUNT(*) as partnerCount,
        SUM(jobsLogged) as totalJobs,
        SUM(referralCount) as totalReferrals,
        GROUP_CONCAT(DISTINCT tier ORDER BY tier SEPARATOR ',') as tiers
      FROM partners
      WHERE status = 'approved' AND serviceArea IS NOT NULL
      GROUP BY serviceArea
      ORDER BY partnerCount DESC
      LIMIT 50
    `);
    return (rows[0] ?? rows) as any[];
  }),

  // ── Franchise Territories ─────────────────────────────────────────────────
  getFranchiseTerritoryData: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    // Use serviceZipCodes coverage data
    const rows = await (db as any).execute(sql`
      SELECT
        p.id, p.businessName, p.tier, p.serviceArea,
        p.serviceZipCodes, p.maxZipCodes,
        p.jobsLogged, p.referralCount,
        CAST(p.totalCommissionEarned AS DECIMAL(12,2)) as totalCommissionEarned
      FROM partners p
      WHERE p.status = 'approved' AND p.serviceZipCodes IS NOT NULL
      ORDER BY p.totalCommissionEarned DESC
      LIMIT 100
    `);
    return (rows[0] ?? rows) as any[];
  }),

  // ── Storm Watch ───────────────────────────────────────────────────────────
  // ── Force Tier Upgrade ───────────────────────────────────────────────────
  forceTierUpgrade: adminProcedure
    .input(z.object({
      partnerId: z.number(),
      newTier: z.enum(["scout", "pro", "crew", "company", "enterprise"]),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const TIER_KEEP_RATES: Record<string, number> = {
        scout: 60, pro: 65, crew: 70, company: 75, enterprise: 80,
      };
      const keepRate = TIER_KEEP_RATES[input.newTier] ?? 65;
      // Get current partner info
      const rows = await db.execute(sql`
        SELECT p.id, p.businessName, p.tier, u.email, u.name
        FROM partners p LEFT JOIN users u ON u.id = p.userId
        WHERE p.id = ${input.partnerId} LIMIT 1
      `) as any;
      const partner = (Array.isArray(rows[0]) ? rows[0] : rows)[0];
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
      // Update tier
      await db.execute(sql`UPDATE partners SET tier = ${input.newTier}, updatedAt = NOW() WHERE id = ${input.partnerId}`);
      // Send congratulations email
      if (partner.email) {
        await sendTierUpgradeCongrats({
          to: partner.email,
          partnerName: partner.name || partner.businessName,
          newTierName: input.newTier.charAt(0).toUpperCase() + input.newTier.slice(1),
          keepRate,
          dashboardUrl: `${process.env.APP_BASE_URL || 'https://prolnk.io'}/dashboard`,
        }).catch(() => {});
      }
      await notifyOwner({
        title: `Tier Upgraded: ${partner.businessName}`,
        content: `${partner.businessName} upgraded from ${partner.tier} → ${input.newTier} (keep rate: ${keepRate}%).`,
      }).catch(() => {});
      return { success: true, previousTier: partner.tier, newTier: input.newTier };
    }),

  getStormWatchData: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const events = await (db as any).execute(sql`
      SELECT se.id, se.eventType, se.severity, se.affectedZips, se.affectedCity,
        se.detectedAt, se.leadsGenerated, se.status,
        COUNT(DISTINCT o.id) as opportunityCount
      FROM stormEvents se
      LEFT JOIN opportunities o ON o.stormEventId = se.id
      GROUP BY se.id, se.eventType, se.severity, se.affectedZips, se.affectedCity, se.detectedAt, se.leadsGenerated, se.status
      ORDER BY se.detectedAt DESC
      LIMIT 50
    `);
    const stats = await (db as any).execute(sql`
      SELECT
        COUNT(*) as totalEvents,
        SUM(leadsGenerated) as totalLeads,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as activeEvents
      FROM stormEvents
    `);
    const s = ((stats[0] ?? stats) as any[])[0] ?? {};
    return {
      events: (events[0] ?? events) as any[],
      stats: {
        totalEvents: Number(s.totalEvents ?? 0),
        totalLeads: Number(s.totalLeads ?? 0),
        activeEvents: Number(s.activeEvents ?? 0),
      },
    };
  }),
});
