/**
 * Agent Command Center Router
 * ─────────────────────────────
 * Provides the Paperclip-style dashboard inside ProLnk OS.
 * All agents are event-driven — zero polling, zero crawling.
 */
import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql, desc, eq, and, gte } from "drizzle-orm";
import {
  agentRegistry,
  agentEventBus,
  agentActivityLog,
  agentDailyMetrics,
  supremeCourtAudit,
} from "../../drizzle/schema";

// ── All 45 agents organized by department ────────────────────────────
const AGENT_SEED: {
  agentId: string; name: string; department: string;
  llmTier: "budget" | "reasoning" | "supreme" | "vision";
  llmModel: string; triggerType: "event" | "schedule" | "on_demand";
  triggerDescription: string; description: string;
  parentAgentId: string | null; monthlyBudgetCents: number;
}[] = [
  // ── OPERATIONS (8) ──
  { agentId: "ops-ceo", name: "CEO Orchestrator", department: "Operations", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Reacts to inter-department events and escalations", description: "Routes events to child agents, makes escalation decisions, coordinates cross-department workflows", parentAgentId: null, monthlyBudgetCents: 1500 },
  { agentId: "ops-diagnostic", name: "Diagnostic Engine", department: "Operations", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "on_demand", triggerDescription: "Triggered by homeowner starting a diagnostic session", description: "Multi-turn conversational AI that diagnoses home issues and generates internal job value estimates", parentAgentId: "ops-ceo", monthlyBudgetCents: 5000 },
  { agentId: "ops-vision", name: "Vision Analyzer", department: "Operations", llmTier: "vision", llmModel: "GPT-4o Vision", triggerType: "on_demand", triggerDescription: "Triggered when homeowner uploads a photo", description: "Analyzes home photos for damage, wear, and maintenance issues", parentAgentId: "ops-diagnostic", monthlyBudgetCents: 2000 },
  { agentId: "ops-lead-router", name: "Lead Router", department: "Operations", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: lead.created or lead.expiry_timer", description: "Routes leads to best-matched partner. Fires on exact expiry time — no polling.", parentAgentId: "ops-ceo", monthlyBudgetCents: 500 },
  { agentId: "ops-partner-matcher", name: "Partner Matcher", department: "Operations", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: lead.needs_matching", description: "Scores partners by proximity, rating, availability, tier, and response speed", parentAgentId: "ops-lead-router", monthlyBudgetCents: 3500 },
  { agentId: "ops-storm", name: "Storm Response Coordinator", department: "Operations", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Webhook: NWS severe weather alert push", description: "Receives NWS webhook, publishes storm.detected event to 6+ agents simultaneously. Zero scanning.", parentAgentId: "ops-ceo", monthlyBudgetCents: 200 },
  { agentId: "ops-compliance", name: "Compliance Monitor", department: "Operations", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: license/COI expiry date timer fires", description: "Fires on exact expiry date — not polling. Auto-suspends expired accounts.", parentAgentId: "ops-ceo", monthlyBudgetCents: 300 },
  { agentId: "ops-exchange", name: "Exchange Manager", department: "Operations", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: job.deadline or bid.submitted", description: "Manages Exchange marketplace. Jobs close on exact deadline — no sweep.", parentAgentId: "ops-ceo", monthlyBudgetCents: 300 },

  // ── REVENUE & FINANCE (7) ──
  { agentId: "fin-cfo", name: "CFO Agent", department: "Revenue & Finance", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Weekly summary + event: spend > $500 approval", description: "Weekly financial summary, approves spend over $500", parentAgentId: null, monthlyBudgetCents: 1000 },
  { agentId: "fin-billing", name: "Billing Processor", department: "Revenue & Finance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: Stripe webhook (invoice/payment/payout)", description: "Processes Stripe webhooks, manages partner payouts", parentAgentId: "fin-cfo", monthlyBudgetCents: 300 },
  { agentId: "fin-forecast", name: "Revenue Forecaster", department: "Revenue & Finance", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "schedule", triggerDescription: "Weekly on Monday 6 AM", description: "Generates weekly revenue projections from pipeline data", parentAgentId: "fin-cfo", monthlyBudgetCents: 500 },
  { agentId: "fin-materials", name: "Materials Pricing Agent", department: "Revenue & Finance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Daily at 6 AM (12 trades)", description: "Updates material cost data for 100+ items across 12 trades", parentAgentId: "fin-cfo", monthlyBudgetCents: 400 },
  { agentId: "fin-tax", name: "Tax & Compliance Accountant", department: "Revenue & Finance", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "schedule", triggerDescription: "Monthly P&L + quarterly tax prep", description: "Monthly P&L, quarterly tax prep, year-end filing support", parentAgentId: "fin-cfo", monthlyBudgetCents: 300 },
  { agentId: "fin-subscription", name: "Subscription Manager", department: "Revenue & Finance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: subscription.changed / trial.expiring", description: "Handles tier upgrades/downgrades, trial expirations", parentAgentId: "fin-cfo", monthlyBudgetCents: 200 },
  { agentId: "fin-commission", name: "Commission Calculator", department: "Revenue & Finance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: job.completed", description: "Calculates partner commissions per completed job", parentAgentId: "fin-cfo", monthlyBudgetCents: 200 },

  // ── MARKETING & GROWTH (7) ──
  { agentId: "mkt-cmo", name: "CMO Agent", department: "Marketing & Growth", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Weekly strategy + event: campaign performance alert", description: "Sets marketing priorities, approves content calendar", parentAgentId: null, monthlyBudgetCents: 800 },
  { agentId: "mkt-content", name: "Content Creator", department: "Marketing & Growth", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: content.scheduled or storm.detected", description: "Writes blog posts, social media, email campaigns. Storm events trigger emergency content.", parentAgentId: "mkt-cmo", monthlyBudgetCents: 1200 },
  { agentId: "mkt-seo", name: "SEO Optimizer", department: "Marketing & Growth", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Weekly analysis on Sunday night", description: "Analyzes rankings, suggests content updates", parentAgentId: "mkt-cmo", monthlyBudgetCents: 200 },
  { agentId: "mkt-ads", name: "Paid Media Manager", department: "Marketing & Growth", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: daily conversion data + storm.detected", description: "Adjusts Google/Meta ad bids based on conversion data. Storm events trigger geo-targeted surge.", parentAgentId: "mkt-cmo", monthlyBudgetCents: 300 },
  { agentId: "mkt-referral", name: "Referral Engine", department: "Marketing & Growth", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: referral.action (click/signup/convert)", description: "Tracks referral links, triggers reward payouts", parentAgentId: "mkt-cmo", monthlyBudgetCents: 200 },
  { agentId: "mkt-email", name: "Email Nurture Agent", department: "Marketing & Growth", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: user.action or drip.schedule_timer", description: "Sends personalized drip sequences based on user behavior", parentAgentId: "mkt-cmo", monthlyBudgetCents: 200 },
  { agentId: "mkt-reputation", name: "Reputation Manager", department: "Marketing & Growth", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: review.posted or mention.detected", description: "Monitors reviews, drafts responses, flags negative sentiment", parentAgentId: "mkt-cmo", monthlyBudgetCents: 200 },

  // ── CUSTOMER SUCCESS (6) ──
  { agentId: "cs-lead", name: "Customer Success Lead", department: "Customer Success", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: support.ticket or escalation.triggered", description: "Triages support tickets, escalates complex issues", parentAgentId: null, monthlyBudgetCents: 800 },
  { agentId: "cs-dispute", name: "Dispute Resolver", department: "Customer Success", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: dispute.filed", description: "Analyzes disputes, proposes resolution, tracks outcomes", parentAgentId: "cs-lead", monthlyBudgetCents: 500 },
  { agentId: "cs-concierge", name: "Homeowner Concierge", department: "Customer Success", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "on_demand", triggerDescription: "Homeowner opens chat or asks a question", description: "Answers homeowner questions, schedules appointments", parentAgentId: "cs-lead", monthlyBudgetCents: 400 },
  { agentId: "cs-partner-coach", name: "Partner Success Coach", department: "Customer Success", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: partner.underperforming (weekly analysis)", description: "Analyzes partner metrics, sends coaching recommendations", parentAgentId: "cs-lead", monthlyBudgetCents: 800 },
  { agentId: "cs-nps", name: "NPS & Feedback Analyst", department: "Customer Success", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: survey.completed", description: "Processes NPS surveys, identifies trends, flags issues", parentAgentId: "cs-lead", monthlyBudgetCents: 200 },
  { agentId: "cs-onboarding", name: "Onboarding Guide", department: "Customer Success", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: user.signup", description: "Walks new homeowners/partners through setup", parentAgentId: "cs-lead", monthlyBudgetCents: 200 },

  // ── INTELLIGENCE & STRATEGY (5) ──
  { agentId: "intel-market", name: "Market Intelligence Agent", department: "Intelligence & Strategy", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "schedule", triggerDescription: "Daily scan at 7 AM", description: "Monitors competitor pricing, market trends, new entrants", parentAgentId: null, monthlyBudgetCents: 500 },
  { agentId: "intel-demand", name: "Demand Forecaster", department: "Intelligence & Strategy", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Weekly + event: storm.detected or season.change", description: "Predicts demand by trade, zip code, season", parentAgentId: "intel-market", monthlyBudgetCents: 400 },
  { agentId: "intel-partner-perf", name: "Partner Performance Analyst", department: "Intelligence & Strategy", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Nightly batch at 2 AM", description: "Scores partners, identifies top/bottom performers", parentAgentId: "intel-market", monthlyBudgetCents: 200 },
  { agentId: "intel-pricing", name: "Pricing Optimizer", department: "Intelligence & Strategy", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "schedule", triggerDescription: "Weekly recalibration on Sunday", description: "Adjusts quote ranges based on market data and actuals", parentAgentId: "intel-market", monthlyBudgetCents: 300 },
  { agentId: "intel-advisor", name: "Strategic Advisor (Brain Trust)", department: "Intelligence & Strategy", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "on_demand", triggerDescription: "On-demand when Andrew requests", description: "Multi-persona advisory board simulation for big decisions", parentAgentId: null, monthlyBudgetCents: 500 },

  // ── LEGAL & COMPLIANCE — THE SUPREME COURT (5) ──
  { agentId: "legal-justice", name: "Chief Justice (Validator)", department: "Legal & Compliance", llmTier: "supreme", llmModel: "Claude Opus 4.6", triggerType: "event", triggerDescription: "Event: any high-stakes decision requiring validation", description: "Cross-model validation of all content, spend, and partner actions. Uses different model family to catch hallucinations.", parentAgentId: null, monthlyBudgetCents: 4000 },
  { agentId: "legal-ip", name: "IP & Patent Monitor", department: "Legal & Compliance", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: feature.deployed or content.published", description: "Checks new features/content against patent databases for IP violations", parentAgentId: "legal-justice", monthlyBudgetCents: 300 },
  { agentId: "legal-respa", name: "RESPA Compliance Agent", department: "Legal & Compliance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: real_estate_referral.created", description: "Validates real estate referral commissions against RESPA rules", parentAgentId: "legal-justice", monthlyBudgetCents: 200 },
  { agentId: "legal-content", name: "Content Compliance Scanner", department: "Legal & Compliance", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: content.ready_for_review", description: "Checks all published content for trademark/copyright violations", parentAgentId: "legal-justice", monthlyBudgetCents: 700 },
  { agentId: "legal-privacy", name: "Data Privacy Guardian", department: "Legal & Compliance", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: data.access or data.export_request", description: "Ensures PII handling complies with state privacy laws", parentAgentId: "legal-justice", monthlyBudgetCents: 200 },

  // ── PLATFORM & ENGINEERING (7) ──
  { agentId: "eng-cto", name: "CTO Agent", department: "Platform & Engineering", llmTier: "reasoning", llmModel: "Claude Sonnet 4.6", triggerType: "event", triggerDescription: "Event: system.alert or weekly review timer", description: "Monitors platform health, prioritizes engineering work", parentAgentId: null, monthlyBudgetCents: 500 },
  { agentId: "eng-uptime", name: "Uptime Monitor", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: health_check.failed (external ping service)", description: "Reacts to failed health checks from external ping. No internal polling.", parentAgentId: "eng-cto", monthlyBudgetCents: 100 },
  { agentId: "eng-error", name: "Error Triage Agent", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: error.spike_detected (threshold alert)", description: "Analyzes error logs when error rate exceeds threshold, categorizes issues", parentAgentId: "eng-cto", monthlyBudgetCents: 200 },
  { agentId: "eng-db", name: "Database Optimizer", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Weekly analysis on Saturday night", description: "Analyzes slow queries, suggests index optimizations", parentAgentId: "eng-cto", monthlyBudgetCents: 100 },
  { agentId: "eng-security", name: "Security Scanner", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Weekly scan on Sunday night", description: "Checks for vulnerabilities, outdated dependencies", parentAgentId: "eng-cto", monthlyBudgetCents: 100 },
  { agentId: "eng-deploy", name: "Deployment Manager", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "event", triggerDescription: "Event: code.merged or deploy.triggered", description: "Manages CI/CD pipeline, rollback decisions", parentAgentId: "eng-cto", monthlyBudgetCents: 100 },
  { agentId: "eng-perf", name: "Performance Analyst", department: "Platform & Engineering", llmTier: "budget", llmModel: "GPT-4o Mini", triggerType: "schedule", triggerDescription: "Weekly report on Monday morning", description: "Analyzes page load times, API latency, user experience metrics", parentAgentId: "eng-cto", monthlyBudgetCents: 100 },
];

// ── Department metadata ──────────────────────────────────────────────
const DEPARTMENTS = [
  { id: "operations", name: "Operations", color: "#17C1E8", icon: "Cpu" },
  { id: "revenue", name: "Revenue & Finance", color: "#82D616", icon: "DollarSign" },
  { id: "marketing", name: "Marketing & Growth", color: "#7928CA", icon: "Megaphone" },
  { id: "customer-success", name: "Customer Success", color: "#FBB140", icon: "HeartHandshake" },
  { id: "intelligence", name: "Intelligence & Strategy", color: "#1A73E8", icon: "Brain" },
  { id: "legal", name: "Legal & Compliance", color: "#EA0606", icon: "Scale" },
  { id: "engineering", name: "Platform & Engineering", color: "#6B7280", icon: "Wrench" },
];

// ── Event Bus: publish helper (used by agents) ──────────────────────
export async function publishEvent(eventType: string, publisherAgentId: string, payload: Record<string, unknown>, consumedBy?: string[]) {
  const db = await getDb();
  await db!.insert(agentEventBus).values({
    eventType,
    publisherAgentId,
    payload: JSON.stringify(payload),
    consumedBy: consumedBy ? JSON.stringify(consumedBy) : null,
  });
}

// ── Activity Logger: log an agent action ────────────────────────────
export async function logAgentActivity(params: {
  agentId: string;
  action: string;
  outcome: "success" | "failure" | "pending" | "blocked";
  details?: string;
  inputTokens?: number;
  outputTokens?: number;
  costCents?: number;
  durationMs?: number;
  relatedEntityType?: string;
  relatedEntityId?: string;
}) {
  const db = await getDb();
  await db!.insert(agentActivityLog).values({
    agentId: params.agentId,
    action: params.action,
    outcome: params.outcome,
    details: params.details ?? null,
    inputTokens: params.inputTokens ?? 0,
    outputTokens: params.outputTokens ?? 0,
    costCents: params.costCents ?? 0,
    durationMs: params.durationMs ?? 0,
    relatedEntityType: params.relatedEntityType ?? null,
    relatedEntityId: params.relatedEntityId ?? null,
  });

  // Update registry stats
  await db!.execute(sql`
    UPDATE agentRegistry
    SET totalActionsLifetime = totalActionsLifetime + 1,
        currentMonthSpendCents = currentMonthSpendCents + ${params.costCents ?? 0},
        lastActiveAt = NOW()
    WHERE agentId = ${params.agentId}
  `);
}

// ── Supreme Court: log a ruling ─────────────────────────────────────
export async function logSupremeCourtRuling(params: {
  requestingAgentId: string;
  actionAttempted: string;
  category: "content" | "spend" | "partner_action" | "data_access" | "pricing" | "legal";
  ruling: "approved" | "blocked" | "escalated";
  reason: string;
  validatorModel?: string;
  confidencePercent?: number;
}) {
  const db = await getDb();
  await db!.insert(supremeCourtAudit).values({
    requestingAgentId: params.requestingAgentId,
    actionAttempted: params.actionAttempted,
    category: params.category,
    ruling: params.ruling,
    reason: params.reason,
    validatorModel: params.validatorModel ?? "Claude Opus 4.6",
    confidencePercent: params.confidencePercent?.toString() ?? "95.00",
  });
}

// ═══════════════════════════════════════════════════════════════════════
// tRPC ROUTER
// ═══════════════════════════════════════════════════════════════════════
export const commandCenterRouter = router({
  // ── Seed all 45 agents ──────────────────────────────────────────────
  seedAgents: protectedProcedure.mutation(async () => {
    const db = await getDb();
    let seeded = 0;
    for (const a of AGENT_SEED) {
      const existing = await db!.select().from(agentRegistry).where(eq(agentRegistry.agentId, a.agentId)).limit(1);
      if (existing.length === 0) {
        await db!.insert(agentRegistry).values({
          agentId: a.agentId,
          name: a.name,
          department: a.department,
          llmTier: a.llmTier,
          llmModel: a.llmModel,
          triggerType: a.triggerType,
          triggerDescription: a.triggerDescription,
          description: a.description,
          status: "active",
          parentAgentId: a.parentAgentId,
          monthlyBudgetCents: a.monthlyBudgetCents,
        });
        seeded++;
      }
    }
    return { seeded, total: AGENT_SEED.length };
  }),

  // ── System Pulse (top bar) ──────────────────────────────────────────
  getSystemPulse: protectedProcedure.query(async () => {
    const db = await getDb();
    const agentsResult = await db!.execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors,
        SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) as suspended,
        SUM(currentMonthSpendCents) as monthSpendCents,
        SUM(monthlyBudgetCents) as monthBudgetCents
      FROM agentRegistry
    `);
    const row = (agentsResult as unknown as any[][])[0]?.[0] ?? {};

    // Today's spend
    const today = new Date().toISOString().slice(0, 10);
    const todayResult = await db!.execute(sql`
      SELECT COALESCE(SUM(costCents), 0) as todaySpend
      FROM agentActivityLog
      WHERE DATE(createdAt) = ${today}
    `);
    const todaySpend = (todayResult as unknown as any[][])[0]?.[0]?.todaySpend ?? 0;

    // Pending Supreme Court decisions
    const pendingResult = await db!.execute(sql`
      SELECT COUNT(*) as pending
      FROM supremeCourtAudit
      WHERE ruling = 'escalated'
    `);
    const pending = (pendingResult as unknown as any[][])[0]?.[0]?.pending ?? 0;

    // Today's blocks
    const blockResult = await db!.execute(sql`
      SELECT COUNT(*) as blocks
      FROM supremeCourtAudit
      WHERE ruling = 'blocked' AND DATE(createdAt) = ${today}
    `);
    const blocks = (blockResult as unknown as any[][])[0]?.[0]?.blocks ?? 0;

    // Recent events count (last hour)
    const eventResult = await db!.execute(sql`
      SELECT COUNT(*) as recentEvents
      FROM agentEventBus
      WHERE createdAt > DATE_SUB(NOW(), INTERVAL 1 HOUR)
    `);
    const recentEvents = (eventResult as unknown as any[][])[0]?.[0]?.recentEvents ?? 0;

    return {
      totalAgents: Number(row.total ?? 0),
      activeAgents: Number(row.active ?? 0),
      errorAgents: Number(row.errors ?? 0),
      suspendedAgents: Number(row.suspended ?? 0),
      todaySpendCents: Number(todaySpend),
      monthSpendCents: Number(row.monthSpendCents ?? 0),
      monthBudgetCents: Number(row.monthBudgetCents ?? 0),
      pendingDecisions: Number(pending),
      todayBlocks: Number(blocks),
      recentEvents: Number(recentEvents),
    };
  }),

  // ── Org Chart (all agents grouped by department) ────────────────────
  getOrgChart: protectedProcedure.query(async () => {
    const db = await getDb();
    const allAgents = await db!.select().from(agentRegistry).orderBy(agentRegistry.department, agentRegistry.name);
    return { departments: DEPARTMENTS, agents: allAgents };
  }),

  // ── Agent Detail ────────────────────────────────────────────────────
  getAgentDetail: protectedProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [agent] = await db!.select().from(agentRegistry).where(eq(agentRegistry.agentId, input.agentId)).limit(1);
      if (!agent) throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });

      // Recent activity (last 50)
      const activities = await db!.select().from(agentActivityLog)
        .where(eq(agentActivityLog.agentId, input.agentId))
        .orderBy(desc(agentActivityLog.createdAt))
        .limit(50);

      // Daily metrics (last 30 days)
      const metrics = await db!.select().from(agentDailyMetrics)
        .where(eq(agentDailyMetrics.agentId, input.agentId))
        .orderBy(desc(agentDailyMetrics.date))
        .limit(30);

      // Recent events published by this agent
      const events = await db!.select().from(agentEventBus)
        .where(eq(agentEventBus.publisherAgentId, input.agentId))
        .orderBy(desc(agentEventBus.createdAt))
        .limit(20);

      return { agent, activities, metrics, events };
    }),

  // ── Activity Feed (all agents, paginated) ───────────────────────────
  getActivityFeed: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50), offset: z.number().min(0).default(0) }))
    .query(async ({ input }) => {
      const db = await getDb();
      const activities = await db!.select().from(agentActivityLog)
        .orderBy(desc(agentActivityLog.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return activities;
    }),

  // ── Financial Dashboard ─────────────────────────────────────────────
  getFinancials: protectedProcedure.query(async () => {
    const db = await getDb();

    // Per-department spend this month
    const deptResult = await db!.execute(sql`
      SELECT department,
        SUM(currentMonthSpendCents) as spend,
        SUM(monthlyBudgetCents) as budget,
        COUNT(*) as agentCount
      FROM agentRegistry
      GROUP BY department
      ORDER BY spend DESC
    `);

    // Top spenders this month
    const topResult = await db!.execute(sql`
      SELECT agentId, name, department, currentMonthSpendCents as spend, monthlyBudgetCents as budget
      FROM agentRegistry
      ORDER BY currentMonthSpendCents DESC
      LIMIT 10
    `);

    // Daily spend trend (last 30 days)
    const trendResult = await db!.execute(sql`
      SELECT DATE(createdAt) as date, SUM(costCents) as spend, COUNT(*) as actions
      FROM agentActivityLog
      WHERE createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    `);

    return {
      departmentSpend: (deptResult as unknown as any[][])[0] ?? [],
      topSpenders: (topResult as unknown as any[][])[0] ?? [],
      dailyTrend: (trendResult as unknown as any[][])[0] ?? [],
    };
  }),

  // ── Supreme Court Audit Log ─────────────────────────────────────────
  getAuditLog: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      const rulings = await db!.select().from(supremeCourtAudit)
        .orderBy(desc(supremeCourtAudit.createdAt))
        .limit(input.limit);
      return rulings;
    }),

  // ── Event Bus Feed ──────────────────────────────────────────────────
  getEventFeed: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(50) }))
    .query(async ({ input }) => {
      const db = await getDb();
      const events = await db!.select().from(agentEventBus)
        .orderBy(desc(agentEventBus.createdAt))
        .limit(input.limit);
      return events;
    }),

  // ── Seed demo activity data ─────────────────────────────────────────
  seedDemoData: protectedProcedure.mutation(async () => {
    const db = await getDb();
    const now = Date.now();
    let activityCount = 0;
    let eventCount = 0;
    let auditCount = 0;

    // Seed 30 days of daily metrics for all agents
    for (const a of AGENT_SEED) {
      for (let d = 29; d >= 0; d--) {
        const date = new Date(now - d * 86400000).toISOString().slice(0, 10);
        const actions = Math.floor(Math.random() * 20) + 2;
        const successes = Math.floor(actions * (0.85 + Math.random() * 0.14));
        const failures = actions - successes;
        const inputTok = actions * (a.llmTier === "budget" ? 1500 : a.llmTier === "reasoning" ? 4000 : a.llmTier === "supreme" ? 4000 : 5000);
        const outputTok = actions * (a.llmTier === "budget" ? 800 : a.llmTier === "reasoning" ? 2500 : a.llmTier === "supreme" ? 2000 : 2000);
        const costCents = Math.round(
          a.llmTier === "budget" ? actions * 0.1 :
          a.llmTier === "reasoning" ? actions * 1.2 :
          a.llmTier === "supreme" ? actions * 3.5 :
          actions * 1.5
        );
        await db!.insert(agentDailyMetrics).values({
          agentId: a.agentId,
          date,
          actionsCompleted: actions,
          successCount: successes,
          failureCount: failures,
          totalInputTokens: inputTok,
          totalOutputTokens: outputTok,
          totalCostCents: costCents,
          avgResponseMs: Math.floor(Math.random() * 3000) + 500,
        });
      }
    }

    // Seed recent activity log entries
    const sampleActions = [
      { agentId: "ops-lead-router", action: "Routed lead #4821 to Partner #67", outcome: "success" as const, details: "Partner accepted in 4 min, job value $2,800" },
      { agentId: "ops-partner-matcher", action: "Matched Partner #23 to emergency HVAC call", outcome: "success" as const, details: "Homeowner rated 5 stars after service" },
      { agentId: "ops-diagnostic", action: "Diagnosed roof issue from uploaded photo", outcome: "failure" as const, details: "Partner reported misidentification: hail vs age-related wear" },
      { agentId: "ops-diagnostic", action: "Completed plumbing diagnostic session", outcome: "success" as const, details: "Internal estimate $1,200 — within 8% of actual invoice" },
      { agentId: "ops-storm", action: "Received NWS hail alert for Collin County", outcome: "success" as const, details: "Published storm.detected event — 6 agents responded" },
      { agentId: "fin-commission", action: "Calculated commission for Job #3847", outcome: "success" as const, details: "Partner #45 earned $168 (12% of $1,400 job)" },
      { agentId: "fin-billing", action: "Processed Stripe payout to Partner #12", outcome: "success" as const, details: "$2,340 transferred to connected account" },
      { agentId: "mkt-content", action: "Published blog: 'DFW Hail Season Prep Guide'", outcome: "success" as const, details: "1,240 words, SEO score 92/100" },
      { agentId: "mkt-ads", action: "Increased Google Ads bid for 75024 zip", outcome: "success" as const, details: "Storm surge targeting — CPC $2.40 → $3.80" },
      { agentId: "cs-dispute", action: "Resolved commission dispute #891", outcome: "success" as const, details: "Partner agreed to adjusted amount after evidence review" },
      { agentId: "cs-concierge", action: "Answered homeowner question about HVAC maintenance", outcome: "success" as const, details: "Recommended annual tune-up, connected to Partner #34" },
      { agentId: "intel-demand", action: "Updated Q2 demand forecast for roofing", outcome: "success" as const, details: "Projected 34% increase due to hail season" },
      { agentId: "legal-justice", action: "Validated blog post for trademark compliance", outcome: "success" as const, details: "No violations found — approved for publication" },
      { agentId: "legal-content", action: "Blocked social media post with competitor logo", outcome: "blocked" as const, details: "Cannot use competitor logos without permission" },
      { agentId: "eng-error", action: "Triaged error spike in /api/trpc/diagnostic.start", outcome: "success" as const, details: "Root cause: timeout on large photo upload — increased limit" },
      { agentId: "eng-uptime", action: "Responded to health check failure on API endpoint", outcome: "success" as const, details: "Auto-restart resolved — downtime: 12 seconds" },
      { agentId: "ops-compliance", name: "Compliance Monitor", action: "Suspended Partner #89 — COI expired", outcome: "success" as const, details: "Auto-suspension triggered on exact expiry date. Partner notified." },
      { agentId: "fin-forecast", action: "Generated weekly revenue projection", outcome: "success" as const, details: "Projected $48,200 MRR — up 6% from last week" },
      { agentId: "mkt-referral", action: "Processed referral conversion for Partner #56", outcome: "success" as const, details: "Referral link → signup → first job completed. $50 bonus triggered." },
      { agentId: "legal-respa", action: "Validated real estate agent referral commission", outcome: "success" as const, details: "Commission structure compliant with RESPA Section 8" },
    ];

    for (const sa of sampleActions) {
      const tier = AGENT_SEED.find(a => a.agentId === sa.agentId)?.llmTier ?? "budget";
      await db!.insert(agentActivityLog).values({
        agentId: sa.agentId,
        action: sa.action,
        outcome: sa.outcome,
        details: sa.details,
        inputTokens: tier === "budget" ? 1500 : tier === "reasoning" ? 4000 : 4000,
        outputTokens: tier === "budget" ? 800 : tier === "reasoning" ? 2500 : 2000,
        costCents: tier === "budget" ? 1 : tier === "reasoning" ? 12 : 35,
        durationMs: Math.floor(Math.random() * 4000) + 500,
      });
      activityCount++;
    }

    // Seed event bus entries
    const sampleEvents = [
      { eventType: "storm.detected", publisherAgentId: "ops-storm", payload: { type: "hail", counties: ["Collin", "Denton"], severity: "Enhanced", timestamp: new Date().toISOString() }, consumedBy: ["ops-lead-router", "mkt-content", "mkt-ads", "intel-demand", "fin-forecast", "cs-lead"] },
      { eventType: "lead.created", publisherAgentId: "ops-lead-router", payload: { leadId: 4821, serviceType: "roofing", zipCode: "75024", urgency: "high" }, consumedBy: ["ops-partner-matcher"] },
      { eventType: "lead.expired", publisherAgentId: "ops-lead-router", payload: { leadId: 4819, reason: "no_response", expiryTime: new Date().toISOString() }, consumedBy: ["ops-lead-router"] },
      { eventType: "job.completed", publisherAgentId: "ops-exchange", payload: { jobId: 3847, partnerId: 45, actualValue: 1400 }, consumedBy: ["fin-commission", "cs-nps", "intel-partner-perf"] },
      { eventType: "content.ready_for_review", publisherAgentId: "mkt-content", payload: { contentId: "blog-hail-prep", type: "blog_post", wordCount: 1240 }, consumedBy: ["legal-content", "legal-justice"] },
      { eventType: "spend.requested", publisherAgentId: "mkt-ads", payload: { amount: 200, purpose: "Storm surge Google Ads", campaign: "hail-response-75024" }, consumedBy: ["fin-cfo", "legal-justice"] },
      { eventType: "partner.underperforming", publisherAgentId: "intel-partner-perf", payload: { partnerId: 89, metric: "acceptance_rate", value: 0.23, threshold: 0.50 }, consumedBy: ["cs-partner-coach"] },
      { eventType: "compliance.violation", publisherAgentId: "ops-compliance", payload: { partnerId: 89, type: "coi_expired", expiryDate: "2026-04-10" }, consumedBy: ["ops-ceo", "cs-lead"] },
    ];

    for (const se of sampleEvents) {
      await db!.insert(agentEventBus).values({
        eventType: se.eventType,
        publisherAgentId: se.publisherAgentId,
        payload: JSON.stringify(se.payload),
        consumedBy: JSON.stringify(se.consumedBy),
      });
      eventCount++;
    }

    // Seed Supreme Court audit entries
    const sampleRulings = [
      { requestingAgentId: "mkt-content", actionAttempted: "Publish blog: 'Best Roofers in Frisco'", category: "content" as const, ruling: "approved" as const, reason: "No trademark violations, factually accurate, SEO-optimized", confidencePercent: 97 },
      { requestingAgentId: "mkt-ads", actionAttempted: "Increase Google Ads budget by $200", category: "spend" as const, ruling: "blocked" as const, reason: "Exceeds weekly spend authority ($100 max without CFO approval)", confidencePercent: 99 },
      { requestingAgentId: "mkt-cmo", actionAttempted: "Send promotional email to 5,000 homeowners", category: "content" as const, ruling: "approved" as const, reason: "CAN-SPAM compliant, unsubscribe link present, no misleading claims", confidencePercent: 95 },
      { requestingAgentId: "mkt-content", actionAttempted: "Use competitor's logo in comparison graphic", category: "legal" as const, ruling: "blocked" as const, reason: "Trademark violation — cannot use competitor logos without written permission", confidencePercent: 99 },
      { requestingAgentId: "ops-compliance", actionAttempted: "Auto-suspend Partner #89 for expired COI", category: "partner_action" as const, ruling: "approved" as const, reason: "COI expired 3 days ago, partner notified twice, suspension justified", confidencePercent: 98 },
      { requestingAgentId: "intel-pricing", actionAttempted: "Adjust roofing quote range +15% for storm season", category: "pricing" as const, ruling: "approved" as const, reason: "Market data supports increase, within historical variance", confidencePercent: 88 },
      { requestingAgentId: "fin-billing", actionAttempted: "Process $5,200 payout to Partner #12", category: "spend" as const, ruling: "approved" as const, reason: "Amount matches completed jobs, no dispute flags", confidencePercent: 96 },
      { requestingAgentId: "legal-respa", actionAttempted: "Approve real estate referral fee of 25%", category: "legal" as const, ruling: "escalated" as const, reason: "RESPA Section 8 requires review — fee exceeds typical range for this service type", confidencePercent: 72 },
    ];

    for (const sr of sampleRulings) {
      await db!.insert(supremeCourtAudit).values({
        requestingAgentId: sr.requestingAgentId,
        actionAttempted: sr.actionAttempted,
        category: sr.category,
        ruling: sr.ruling,
        reason: sr.reason,
        validatorModel: "Claude Opus 4.6",
        confidencePercent: sr.confidencePercent.toString(),
      });
      auditCount++;
    }

    // Update registry stats from seeded metrics
    for (const a of AGENT_SEED) {
      await db!.execute(sql`
        UPDATE agentRegistry SET
          currentMonthSpendCents = (SELECT COALESCE(SUM(totalCostCents), 0) FROM agentDailyMetrics WHERE agentId = ${a.agentId} AND date >= DATE_FORMAT(NOW(), '%Y-%m-01')),
          totalActionsLifetime = (SELECT COALESCE(SUM(actionsCompleted), 0) FROM agentDailyMetrics WHERE agentId = ${a.agentId}),
          successRatePercent = (SELECT ROUND(COALESCE(SUM(successCount) / NULLIF(SUM(actionsCompleted), 0) * 100, 100), 2) FROM agentDailyMetrics WHERE agentId = ${a.agentId}),
          avgResponseMs = (SELECT COALESCE(AVG(avgResponseMs), 0) FROM agentDailyMetrics WHERE agentId = ${a.agentId}),
          lastActiveAt = NOW()
        WHERE agentId = ${a.agentId}
      `);
    }

    return { activityCount, eventCount, auditCount, metricsSeeded: AGENT_SEED.length * 30 };
  }),
});
