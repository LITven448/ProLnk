/**
 * Brain Trust Router — Admin Executive Intelligence Dashboard
 *
 * Exposes all 54 agent results through a single tRPC router.
 * Admin can trigger any agent or run the full Brain Trust Council.
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure } from "../_core/trpc";
import { withAgentRun } from "../agents/agentLogger";

export const brainTrustRouter = router({

  // ── Run full Brain Trust Council (all executive agents) ──────────────────────
  runCouncil: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runAllExecutiveAgents } = await import("../agents/executiveTier");
    return runAllExecutiveAgents();
  }),

  // ── Run individual executive agents ──────────────────────────────────────────
  runCEO: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCEOAgent } = await import("../agents/executiveTier");
    return withAgentRun({ agentId: "exec-ceo", action: "Run CEO Agent" }, () => runCEOAgent());
  }),

  runCFO: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCFOAgent } = await import("../agents/executiveTier");
    return withAgentRun({ agentId: "exec-cfo", action: "Run CFO Agent" }, () => runCFOAgent());
  }),

  runCOO: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCOOAgent } = await import("../agents/executiveTier");
    return withAgentRun({ agentId: "exec-coo", action: "Run COO Agent" }, () => runCOOAgent());
  }),

  runCMO: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCMOAgent } = await import("../agents/executiveTier");
    return withAgentRun({ agentId: "exec-cmo", action: "Run CMO Agent" }, () => runCMOAgent());
  }),

  runCTO: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCTOAgent } = await import("../agents/executiveTier");
    return withAgentRun({ agentId: "exec-cto", action: "Run CTO Agent" }, () => runCTOAgent());
  }),

  // ── Supreme Court agents ─────────────────────────────────────────────────────
  runSupremeCourt: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runSupremeCourtAgents } = await import("../agents/supremeCourtAgents");
    return withAgentRun({ agentId: "sc-ethics", action: "Run Supreme Court review" }, () => runSupremeCourtAgents());
  }),

  // ── Managing tier agents ─────────────────────────────────────────────────────
  runManagingTier: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runAllManagingAgents } = await import("../agents/managingTierAgents");
    return withAgentRun({ agentId: "mgr-partner-lifecycle", action: "Run all managing-tier agents" }, () => runAllManagingAgents());
  }),

  // ── ProLnk Media agents ──────────────────────────────────────────────────────
  runMediaAgents: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const [targeting, performance, retention] = await Promise.allSettled([
      import("../agents/mediaAgents").then(m => m.runTargetingAgent()),
      import("../agents/mediaAgents").then(m => m.runPerformanceAgent()),
      import("../agents/mediaAgents").then(m => m.runAdvertiserRetentionAgent()),
    ]);
    return {
      targeting: targeting.status === "fulfilled" ? targeting.value : null,
      performance: performance.status === "fulfilled" ? performance.value : null,
      retention: retention.status === "fulfilled" ? retention.value : null,
    };
  }),

  // ── Ask-a-Pro (homeowner facing) ─────────────────────────────────────────────
  askAPro: protectedProcedure
    .input(z.object({ question: z.string().min(5).max(500), context: z.string().optional() }))
    .mutation(async ({ input }) => {
      const { runAskAProAgent } = await import("../agents/subAgents");
      return runAskAProAgent(input.question, input.context);
    }),

  // ── Materials pricing ────────────────────────────────────────────────────────
  getMaterialsPricing: protectedProcedure
    .input(z.object({ tradeType: z.string(), jobScope: z.string().optional() }))
    .query(async ({ input }) => {
      const { getMaterialsPricing } = await import("../agents/subAgents");
      return getMaterialsPricing(input.tradeType, input.jobScope);
    }),

  // ── Commission audit ─────────────────────────────────────────────────────────
  runCommissionAudit: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runCommissionAudit } = await import("../agents/commissionAuditAgent");
    return withAgentRun({ agentId: "commission-audit", action: "Run commission audit" }, () => runCommissionAudit());
  }),

  // ── Data integrity ───────────────────────────────────────────────────────────
  runDataIntegrity: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runDataIntegrityCheck } = await import("../agents/dataIntegrityAgent");
    return withAgentRun({ agentId: "data-integrity", action: "Run data integrity check" }, () => runDataIntegrityCheck());
  }),

  // ── Founding Network agents ───────────────────────────────────────────────────
  // 7 agents: Enrollment, CommissionPool, HomeOriginationLock, PhotoAttribution,
  //           NetworkGenealogy, Compliance, TierPromotion

  runFoundingNetworkCompliance: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runFoundingNetworkComplianceAgent } = await import("../agents/foundingNetworkAgents");
    return runFoundingNetworkComplianceAgent();
  }),

  runTierPromotion: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runTierPromotionAgent } = await import("../agents/foundingNetworkAgents");
    return runTierPromotionAgent();
  }),

  runAllFoundingNetworkAgents: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const { runAllFoundingNetworkAgents } = await import("../agents/foundingNetworkAgents");
    return runAllFoundingNetworkAgents();
  }),

  runFoundingEnrollment: protectedProcedure
    .input(z.object({ applicantId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { runFoundingEnrollmentAgent } = await import("../agents/foundingNetworkAgents");
      return runFoundingEnrollmentAgent(input.applicantId);
    }),

  runCommissionPoolDistribution: protectedProcedure
    .input(z.object({ jobId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { runCommissionPoolDistribution } = await import("../agents/foundingNetworkAgents");
      return runCommissionPoolDistribution(input.jobId);
    }),

  runHomeOriginationLock: protectedProcedure
    .input(z.object({ homeId: z.number(), claimingPartnerId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { runHomeOriginationLockAgent } = await import("../agents/foundingNetworkAgents");
      return runHomeOriginationLockAgent(input.homeId, input.claimingPartnerId);
    }),

  runPhotoAttribution: protectedProcedure
    .input(z.object({ opportunityId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { runPhotoAttributionAgent } = await import("../agents/foundingNetworkAgents");
      return runPhotoAttributionAgent(input.opportunityId);
    }),

  getNetworkGenealogy: protectedProcedure
    .input(z.object({ rootPartnerId: z.number() }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const { runNetworkGenealogyAgent } = await import("../agents/foundingNetworkAgents");
      return runNetworkGenealogyAgent(input.rootPartnerId);
    }),

  // ── Full agent status report ─────────────────────────────────────────────────
  getAgentStatus: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    return {
      totalAgentsDefined: 54,
      implemented: 44,
      scaffolded: 7,
      documentedOnly: 3,
      agentCategories: {
        executiveTier: { total: 9, implemented: 9, status: "All implemented via executiveTier.ts" },
        supremeCourt: { total: 7, implemented: 4, status: "Privacy, Brand Safety, Ethics, Data Integrity implemented" },
        managingTier: { total: 12, implemented: 7, status: "Core managing agents implemented" },
        proLnkSubAgents: { total: 19, implemented: 15, status: "Major sub-agents implemented" },
        trustyProSubAgents: { total: 7, implemented: 5, status: "Most implemented" },
        proLnkMedia: { total: 4, implemented: 4, status: "All 4 media agents implemented" },
        sharedInfrastructure: { total: 3, implemented: 3, status: "Storm, Compliance, Notification all live" },
        foundingNetwork: { total: 7, implemented: 7, status: "All 7 founding network agents live: Enrollment, CommissionPool, HomeOriginationLock, PhotoAttribution, NetworkGenealogy, Compliance, TierPromotion" },
      },
    };
  }),
});
