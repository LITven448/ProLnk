import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { sendAgentWelcome } from "../email";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const realEstateAgentsRouter = router({
  listAgents: adminProcedure
    .input(z.object({ page: z.number().default(1), limit: z.number().default(20), search: z.string().optional() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const rows = await db.execute(sql`
        SELECT rea.*, p.businessName, p.contactName, p.contactEmail, p.contactPhone, p.serviceArea, p.status as partnerStatus, p.tier,
               (SELECT COUNT(*) FROM agentHomeownerReferrals WHERE agentId = rea.id) as totalReferrals,
               (SELECT COALESCE(SUM(agentEarnedAmount),0) FROM agentPerpetualCommissions WHERE agentId = rea.id AND paid = FALSE) as unpaidPerpetual,
               (SELECT COALESCE(SUM(proLnkReferralFee),0) FROM agentHomeownerReferrals WHERE agentId = rea.id AND referralFeePaidAt IS NULL AND saleStatus = 'closed') as unpaidReferralFees
        FROM realEstateAgents rea JOIN partners p ON p.id = rea.partnerId
        ORDER BY rea.createdAt DESC LIMIT ${input.limit} OFFSET ${offset}
      `) as any;
      const countRow = await db.execute(sql`SELECT COUNT(*) as total FROM realEstateAgents`) as any;
      const agents = Array.isArray(rows[0]) ? rows[0] : rows;
      const total = (Array.isArray(countRow[0]) ? countRow[0][0] : countRow[0])?.total ?? 0;
      return { agents, total, page: input.page, limit: input.limit };
    }),

  getAgentDetail: adminProcedure
    .input(z.object({ agentId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const agentRows = await db.execute(sql`
        SELECT rea.*, p.businessName, p.contactName, p.contactEmail, p.contactPhone, p.serviceArea, p.tier
        FROM realEstateAgents rea JOIN partners p ON p.id = rea.partnerId WHERE rea.id = ${input.agentId} LIMIT 1
      `) as any;
      const agent = Array.isArray(agentRows[0]) ? agentRows[0][0] : agentRows[0];
      if (!agent) throw new TRPCError({ code: "NOT_FOUND" });
      const referrals = await db.execute(sql`SELECT * FROM agentHomeownerReferrals WHERE agentId = ${input.agentId} ORDER BY createdAt DESC LIMIT 50`) as any;
      const perpetual = await db.execute(sql`
        SELECT apc.*, ahr.homeownerName, ahr.propertyAddress FROM agentPerpetualCommissions apc
        JOIN agentHomeownerReferrals ahr ON ahr.id = apc.referralId WHERE apc.agentId = ${input.agentId} ORDER BY apc.createdAt DESC LIMIT 50
      `) as any;
      return { agent, referrals: Array.isArray(referrals[0]) ? referrals[0] : referrals, perpetualCommissions: Array.isArray(perpetual[0]) ? perpetual[0] : perpetual };
    }),

  registerAgent: adminProcedure
    .input(z.object({
      partnerId: z.number(), licenseNumber: z.string().optional(), brokerageName: z.string().optional(),
      mlsId: z.string().optional(), serviceZipCodes: z.array(z.string()).optional(),
      averageHomeSalePrice: z.number().optional(),
      proLnkReferralRate: z.number().min(0).max(1).default(0.10),
      homeownerRecruitRate: z.number().min(0).max(1).default(0.25),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const existing = await db.execute(sql`SELECT id FROM realEstateAgents WHERE partnerId = ${input.partnerId} LIMIT 1`) as any;
      const row = Array.isArray(existing[0]) ? existing[0][0] : existing[0];
      if (row?.id) throw new TRPCError({ code: "CONFLICT", message: "Already registered as a real estate agent." });
      await db.execute(sql`
        INSERT INTO realEstateAgents (partnerId, licenseNumber, brokerageName, mlsId, serviceZipCodes, averageHomeSalePrice, proLnkReferralRate, homeownerRecruitRate)
        VALUES (${input.partnerId}, ${input.licenseNumber ?? null}, ${input.brokerageName ?? null}, ${input.mlsId ?? null},
                ${input.serviceZipCodes ? JSON.stringify(input.serviceZipCodes) : null}, ${input.averageHomeSalePrice ?? null},
                ${input.proLnkReferralRate}, ${input.homeownerRecruitRate})
      `);
      // Send welcome email to agent
      try {
        const partnerRows = await db.execute(sql`SELECT p.businessName, p.contactName, p.contactEmail FROM partners p WHERE p.id = ${input.partnerId} LIMIT 1`) as any;
        const partner = Array.isArray(partnerRows[0]) ? partnerRows[0][0] : partnerRows[0];
        const agentRows = await db.execute(sql`SELECT id FROM realEstateAgents WHERE partnerId = ${input.partnerId} LIMIT 1`) as any;
        const agent = Array.isArray(agentRows[0]) ? agentRows[0][0] : agentRows[0];
        if (partner?.contactEmail && agent?.id) {
          const referralCode = `AGENT-${String(agent.id).padStart(5, '0')}`;
          await sendAgentWelcome({
            to: partner.contactEmail,
            agentName: partner.contactName || partner.businessName || 'Agent',
            referralCode,
            dashboardUrl: `${process.env.VITE_OAUTH_PORTAL_URL || 'https://prolnk.manus.space'}/agent-portal`,
          });
        }
      } catch (emailErr) {
        console.error('[Agent] Welcome email failed:', emailErr);
      }
      return { success: true };
    }),
  logTrustyProToAgentReferral: adminProcedure
    .input(z.object({
      agentId: z.number(), homeownerName: z.string(), homeownerEmail: z.string().optional(),
      homeownerPhone: z.string().optional(), propertyAddress: z.string().optional(), notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`
        INSERT INTO agentHomeownerReferrals (agentId, homeownerName, homeownerEmail, homeownerPhone, propertyAddress, referralDirection, notes)
        VALUES (${input.agentId}, ${input.homeownerName}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null},
                ${input.propertyAddress ?? null}, 'trustypro_to_agent', ${input.notes ?? null})
      `);
      await db.execute(sql`UPDATE realEstateAgents SET totalReferralsSent = totalReferralsSent + 1 WHERE id = ${input.agentId}`);
      return { success: true };
    }),

  logAgentToTrustyProReferral: adminProcedure
    .input(z.object({
      agentId: z.number(), homeownerName: z.string(), homeownerEmail: z.string().optional(),
      homeownerPhone: z.string().optional(), propertyAddress: z.string().optional(),
      homeownerUserId: z.number().optional(), notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`
        INSERT INTO agentHomeownerReferrals (agentId, homeownerName, homeownerEmail, homeownerPhone, propertyAddress, referralDirection, homeownerUserId, notes)
        VALUES (${input.agentId}, ${input.homeownerName}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null},
                ${input.propertyAddress ?? null}, 'agent_to_trustypro', ${input.homeownerUserId ?? null}, ${input.notes ?? null})
      `);
      return { success: true };
    }),

  recordHomeSale: adminProcedure
    .input(z.object({
      referralId: z.number(), salePrice: z.number(),
      agentCommissionPercent: z.number().default(0.03), saleClosedAt: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const refRows = await db.execute(sql`
        SELECT ahr.*, rea.proLnkReferralRate FROM agentHomeownerReferrals ahr
        JOIN realEstateAgents rea ON rea.id = ahr.agentId WHERE ahr.id = ${input.referralId} LIMIT 1
      `) as any;
      const ref = Array.isArray(refRows[0]) ? refRows[0][0] : refRows[0];
      if (!ref) throw new TRPCError({ code: "NOT_FOUND" });
      const agentCommission = input.salePrice * input.agentCommissionPercent;
      const proLnkFee = agentCommission * Number(ref.proLnkReferralRate);
      await db.execute(sql`
        UPDATE agentHomeownerReferrals SET saleStatus = 'closed', salePrice = ${input.salePrice},
          agentCommissionAmount = ${agentCommission}, proLnkReferralFee = ${proLnkFee},
          saleClosedAt = ${input.saleClosedAt ? new Date(input.saleClosedAt) : new Date()} WHERE id = ${input.referralId}
      `);
      await db.execute(sql`UPDATE realEstateAgents SET totalSalesCompleted = totalSalesCompleted + 1, totalOwed = totalOwed + ${proLnkFee} WHERE id = ${ref.agentId}`);
      return { success: true, agentCommission, proLnkFee };
    }),

  markReferralFeePaid: adminProcedure
    .input(z.object({ referralId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`UPDATE agentHomeownerReferrals SET referralFeePaidAt = NOW() WHERE id = ${input.referralId}`);
      return { success: true };
    }),

  distributePerpetualCommission: adminProcedure
    .input(z.object({ homeownerUserId: z.number(), opportunityId: z.number(), proLnkCommissionAmount: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const refRows = await db.execute(sql`
        SELECT ahr.*, rea.homeownerRecruitRate, rea.id as realEstateAgentId FROM agentHomeownerReferrals ahr
        JOIN realEstateAgents rea ON rea.id = ahr.agentId
        WHERE ahr.homeownerUserId = ${input.homeownerUserId} AND ahr.referralDirection = 'agent_to_trustypro' AND ahr.perpetualCommissionActive = TRUE LIMIT 1
      `) as any;
      const ref = Array.isArray(refRows[0]) ? refRows[0][0] : refRows[0];
      if (!ref) return { distributed: false, reason: "No recruiting agent found" };
      const agentEarned = input.proLnkCommissionAmount * Number(ref.homeownerRecruitRate);
      await db.execute(sql`
        INSERT INTO agentPerpetualCommissions (agentId, referralId, opportunityId, proLnkCommissionAmount, agentEarnedAmount)
        VALUES (${ref.realEstateAgentId}, ${ref.id}, ${input.opportunityId}, ${input.proLnkCommissionAmount}, ${agentEarned})
      `);
      await db.execute(sql`UPDATE agentHomeownerReferrals SET totalPerpetualEarned = totalPerpetualEarned + ${agentEarned} WHERE id = ${ref.id}`);
      await db.execute(sql`UPDATE realEstateAgents SET totalEarned = totalEarned + ${agentEarned}, totalOwed = totalOwed + ${agentEarned} WHERE id = ${ref.realEstateAgentId}`);
      return { distributed: true, agentEarned };
    }),

  // ── AGENT SELF-SERVICE: Get my agent profile and dashboard data ─────────────
  getMyAgentProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const partnerRows = await db.execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`) as any;
    const partner = Array.isArray(partnerRows[0]) ? partnerRows[0][0] : partnerRows[0];
    if (!partner) return null;
    const agentRows = await db.execute(sql`
      SELECT rea.*, p.businessName, p.contactName, p.contactEmail, p.tier
      FROM realEstateAgents rea JOIN partners p ON p.id = rea.partnerId
      WHERE rea.partnerId = ${partner.id} LIMIT 1
    `) as any;
    const agent = Array.isArray(agentRows[0]) ? agentRows[0][0] : agentRows[0];
    if (!agent) return null;
    const referralCode = `AGENT-${String(agent.id).padStart(5, '0')}`;
    const referrals = await db.execute(sql`SELECT * FROM agentHomeownerReferrals WHERE agentId = ${agent.id} ORDER BY createdAt DESC LIMIT 50`) as any;
    const perpetual = await db.execute(sql`
      SELECT apc.*, ahr.homeownerName, ahr.propertyAddress FROM agentPerpetualCommissions apc
      JOIN agentHomeownerReferrals ahr ON ahr.id = apc.referralId
      WHERE apc.agentId = ${agent.id} ORDER BY apc.createdAt DESC LIMIT 50
    `) as any;
    return {
      agent: { ...agent, referralCode },
      referrals: Array.isArray(referrals[0]) ? referrals[0] : referrals,
      perpetualCommissions: Array.isArray(perpetual[0]) ? perpetual[0] : perpetual,
    };
  }),

  // ── AGENT SELF-SERVICE: Submit a new homeowner referral ──────────────────────
  submitHomeownerReferral: protectedProcedure
    .input(z.object({
      homeownerName: z.string(),
      homeownerEmail: z.string().email().optional(),
      homeownerPhone: z.string().optional(),
      propertyAddress: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const partnerRows = await db.execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`) as any;
      const partner = Array.isArray(partnerRows[0]) ? partnerRows[0][0] : partnerRows[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "Partner account required" });
      const agentRows = await db.execute(sql`SELECT id FROM realEstateAgents WHERE partnerId = ${partner.id} LIMIT 1`) as any;
      const agent = Array.isArray(agentRows[0]) ? agentRows[0][0] : agentRows[0];
      if (!agent) throw new TRPCError({ code: "FORBIDDEN", message: "Real estate agent registration required" });
      await db.execute(sql`
        INSERT INTO agentHomeownerReferrals (agentId, homeownerName, homeownerEmail, homeownerPhone, propertyAddress, referralDirection, notes)
        VALUES (${agent.id}, ${input.homeownerName}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null},
                ${input.propertyAddress ?? null}, 'agent_to_trustypro', ${input.notes ?? null})
      `);
      return { success: true };
    }),

  acceptAgentAgreement: protectedProcedure
    .input(z.object({
      fullName: z.string().min(2),
      agreementVersion: z.string().default("1.0"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`
        UPDATE realEstateAgents rea
        JOIN partners p ON p.id = rea.partnerId
        SET rea.agreementSignedAt = NOW(), rea.agreementSignedBy = ${input.fullName},
            rea.agreementVersion = ${input.agreementVersion}, rea.updatedAt = NOW()
        WHERE p.userId = ${ctx.user.id}
      `);
      return { success: true };
    }),

  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.execute(sql`
      SELECT COUNT(*) as totalAgents, SUM(totalReferralsSent) as totalReferrals,
             SUM(totalSalesCompleted) as totalSales, SUM(totalOwed) as totalOwed, SUM(totalEarned) as totalEarned
      FROM realEstateAgents
    `) as any;
    const stats = Array.isArray(rows[0]) ? rows[0][0] : rows[0];
    const unpaidFees = await db.execute(sql`SELECT COALESCE(SUM(proLnkReferralFee),0) as total FROM agentHomeownerReferrals WHERE saleStatus = 'closed' AND referralFeePaidAt IS NULL`) as any;
    const unpaidPerp = await db.execute(sql`SELECT COALESCE(SUM(agentEarnedAmount),0) as total FROM agentPerpetualCommissions WHERE paid = FALSE`) as any;
    return {
      ...stats,
      unpaidReferralFees: (Array.isArray(unpaidFees[0]) ? unpaidFees[0][0] : unpaidFees[0])?.total ?? 0,
      unpaidPerpetualCommissions: (Array.isArray(unpaidPerp[0]) ? unpaidPerp[0][0] : unpaidPerp[0])?.total ?? 0,
    };
  }),
});
