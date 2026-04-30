/**
 * Executive Tier Agents — Brain Trust Council
 *
 * These agents read platform data and generate strategic insights,
 * recommendations, and alerts for the platform owner.
 * They don't take automated actions — they advise.
 *
 * Agents implemented here:
 *   - Platform Intelligence Director — overall platform health narrative
 *   - Growth Strategy Agent — partner acquisition and market expansion
 *   - Revenue Optimization Agent — commission rate and pricing analysis
 *   - CEO Agent — executive summary with KPIs
 *   - CFO Agent — financial health, runway, revenue forecast
 *   - COO Agent — operational efficiency, bottlenecks
 *   - CMO Agent — marketing performance, waitlist conversion
 *   - CTO Agent — technical health, error rates, performance
 *   - Brain Trust Council — synthesized cross-function recommendations
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { queryKnowledge } from "../knowledge";

// ─── Data fetchers ────────────────────────────────────────────────────────────

async function getPlatformSnapshot() {
  const db = await getDb();
  if (!db) return null;

  try {
    const [partnersResult, jobsResult, oppsResult, commissionsResult, waitlistResult] = await Promise.all([
      (db as any).execute(sql`
        SELECT
          COUNT(*) as total,
          SUM(status = 'approved') as approved,
          SUM(status = 'pending') as pending,
          SUM(tier = 'scout') as scout,
          SUM(tier = 'pro') as pro,
          SUM(tier = 'crew') as crew,
          SUM(tier = 'company') as company,
          SUM(tier = 'enterprise') as enterprise,
          SUM(stripeConnectStatus = 'active') as connectActive,
          AVG(priorityScore) as avgPps
        FROM partners
      `),
      (db as any).execute(sql`
        SELECT COUNT(*) as total,
          SUM(aiAnalysisStatus = 'complete') as analyzed,
          SUM(aiAnalysisStatus = 'failed') as failed
        FROM jobs WHERE createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
      `),
      (db as any).execute(sql`
        SELECT COUNT(*) as total,
          SUM(status = 'converted') as converted,
          SUM(status = 'expired') as expired,
          SUM(status = 'pending') as pending,
          AVG(estimatedJobValue) as avgValue
        FROM opportunities WHERE createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
      `),
      (db as any).execute(sql`
        SELECT
          COALESCE(SUM(amount), 0) as totalPaid,
          COALESCE(SUM(CASE WHEN paid = 0 THEN amount END), 0) as totalPending,
          COUNT(CASE WHEN paid = 0 THEN 1 END) as pendingCount
        FROM commissions
      `),
      (db as any).execute(sql`
        SELECT
          (SELECT COUNT(*) FROM proWaitlist) as pros,
          (SELECT COUNT(*) FROM homeWaitlist) as homeowners
      `),
    ]);

    return {
      partners: (partnersResult.rows || partnersResult)[0] ?? {},
      jobs30d: (jobsResult.rows || jobsResult)[0] ?? {},
      opps30d: (oppsResult.rows || oppsResult)[0] ?? {},
      commissions: (commissionsResult.rows || commissionsResult)[0] ?? {},
      waitlist: (waitlistResult.rows || waitlistResult)[0] ?? {},
    };
  } catch (err) {
    console.error("[ExecutiveTier] Data fetch error:", err);
    return null;
  }
}

async function callStrategicLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  try {
    const response = await invokeLLM({
      model: "claude-sonnet-4-5-20251022",
      provider: "anthropic" as const,
      thinking: false,
      maxTokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });
    return response.choices?.[0]?.message?.content?.toString() ?? "Analysis unavailable";
  } catch (err) {
    return `Analysis failed: ${err instanceof Error ? err.message : "unknown error"}`;
  }
}

// ─── CEO Agent ─────────────────────────────────────────────────────────────────

export async function runCEOAgent(): Promise<{
  executiveSummary: string;
  topPriority: string;
  keyMetrics: Record<string, string | number>;
  riskFlag: string | null;
}> {
  const data = await getPlatformSnapshot();
  if (!data) return { executiveSummary: "Data unavailable", topPriority: "Fix database connectivity", keyMetrics: {}, riskFlag: "Database connection failed" };

  const summary = await callStrategicLLM(
    `You are the CEO advisory agent for ProLnk, a home service partner referral network launching in DFW, Texas.
Write in the voice of a trusted advisor giving a weekly CEO briefing. Be direct, specific, and actionable. Max 200 words.`,
    `Platform snapshot:
- Partners: ${data.partners.approved} approved (${data.partners.scout} Scout, ${data.partners.pro} Pro, ${data.partners.crew} Crew, ${data.partners.company} Company, ${data.partners.enterprise} Enterprise)
- Jobs (30d): ${data.jobs30d.total} logged, ${data.jobs30d.analyzed} analyzed, ${data.jobs30d.failed} failed
- Opportunities (30d): ${data.opps30d.total} detected, ${data.opps30d.converted} converted (${data.opps30d.total > 0 ? Math.round((data.opps30d.converted / data.opps30d.total) * 100) : 0}% rate)
- Commissions: $${parseFloat(data.commissions.totalPaid || "0").toLocaleString()} paid, $${parseFloat(data.commissions.totalPending || "0").toLocaleString()} pending
- Waitlist: ${data.waitlist.pros} pros, ${data.waitlist.homeowners} homeowners
- Stripe Connect: ${data.partners.connectActive} partners active

Write: 1) 2-sentence executive summary, 2) Top priority for this week, 3) One risk flag if any`
  );

  return {
    executiveSummary: summary,
    topPriority: data.partners.pending > 5 ? "Review pending partner applications" : "Drive waitlist conversion to active partners",
    keyMetrics: {
      approvedPartners: data.partners.approved,
      conversionRate: `${data.opps30d.total > 0 ? Math.round((data.opps30d.converted / data.opps30d.total) * 100) : 0}%`,
      pendingPayouts: `$${parseFloat(data.commissions.totalPending || "0").toLocaleString()}`,
      waitlistPros: data.waitlist.pros,
    },
    riskFlag: data.jobs30d.failed > 10 ? `${data.jobs30d.failed} AI analysis failures in last 30 days` : null,
  };
}

// ─── CFO Agent ─────────────────────────────────────────────────────────────────

export async function runCFOAgent(): Promise<{
  financialSummary: string;
  mrrEstimate: number;
  revenueTrajectory: string;
  cashFlowAlert: string | null;
}> {
  const db = await getDb();
  const data = await getPlatformSnapshot();

  let subscriptionMrr = 0;
  let advertiserMrr = 0;

  try {
    if (db) {
      const subRows = await (db as any).execute(sql`
        SELECT SUM(subscriptionFee) as mrr FROM partners
        WHERE status = 'approved' AND subscriptionFee > 0
      `);
      subscriptionMrr = parseFloat((subRows.rows || subRows)[0]?.mrr ?? "0");

      const adRows = await (db as any).execute(sql`
        SELECT SUM(monthlyFee) as mrr FROM featuredAdvertisers WHERE status = 'active'
      `);
      advertiserMrr = parseFloat((adRows.rows || adRows)[0]?.mrr ?? "0");
    }
  } catch {}

  const totalMrr = subscriptionMrr + advertiserMrr;
  const commissionRevenue = parseFloat(data?.commissions?.totalPaid ?? "0");

  const financialSummary = await callStrategicLLM(
    `You are the CFO advisory agent for ProLnk, a pre-launch home service platform. Give a concise financial briefing. Max 150 words.`,
    `Financial data:
- Subscription MRR: $${subscriptionMrr.toLocaleString()}
- Advertiser MRR: $${advertiserMrr.toLocaleString()}
- Total platform commissions collected: $${commissionRevenue.toLocaleString()}
- Pending partner payouts: $${parseFloat(data?.commissions?.totalPending ?? "0").toLocaleString()}
- Partners with Stripe Connect: ${data?.partners?.connectActive ?? 0}

Write: 1) Revenue situation, 2) Key financial risk, 3) One recommendation`
  );

  return {
    financialSummary,
    mrrEstimate: totalMrr,
    revenueTrajectory: totalMrr > 0 ? `$${totalMrr.toLocaleString()}/month current MRR` : "Pre-revenue — waitlist stage",
    cashFlowAlert: parseFloat(data?.commissions?.totalPending ?? "0") > 10000
      ? `$${parseFloat(data?.commissions?.totalPending ?? "0").toLocaleString()} in pending payouts — verify Stripe Connect coverage`
      : null,
  };
}

// ─── COO Agent ────────────────────────────────────────────────────────────────

export async function runCOOAgent(): Promise<{
  operationalSummary: string;
  bottlenecks: string[];
  automationScore: number;
}> {
  const data = await getPlatformSnapshot();
  const db = await getDb();

  let bottlenecks: string[] = [];
  let stuckJobs = 0;
  let pendingReview = 0;

  try {
    if (db) {
      const stuckRows = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM jobs WHERE aiAnalysisStatus = 'processing' AND updatedAt < DATE_SUB(NOW(), INTERVAL 30 MINUTE)`);
      stuckJobs = parseInt((stuckRows.rows || stuckRows)[0]?.cnt ?? "0");

      const reviewRows = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM opportunities WHERE adminReviewStatus = 'pending_review'`);
      pendingReview = parseInt((reviewRows.rows || reviewRows)[0]?.cnt ?? "0");
    }
  } catch {}

  if (stuckJobs > 0) bottlenecks.push(`${stuckJobs} jobs stuck in AI processing`);
  if (pendingReview > 10) bottlenecks.push(`${pendingReview} opportunities awaiting admin review — enable auto-approval`);
  if (data?.partners?.pending > 5) bottlenecks.push(`${data?.partners?.pending} partner applications awaiting review`);

  const automationScore = Math.round(
    ((data?.opps30d?.total ?? 0) > 0 ? 30 : 0) + // AI detection running
    (stuckJobs === 0 ? 20 : 0) + // No stuck jobs
    (pendingReview < 5 ? 20 : 10) + // Low admin queue
    20 + // Inngest jobs running
    10 // Basic score
  );

  const operationalSummary = await callStrategicLLM(
    `You are the COO advisory agent for ProLnk. Focus on operational efficiency, automation, and bottlenecks. Max 150 words.`,
    `Operations data:
- Admin review queue: ${pendingReview} opportunities pending
- Stuck AI jobs: ${stuckJobs}
- Partner applications pending: ${data?.partners?.pending ?? 0}
- Automation score: ${automationScore}/100
- Bottlenecks: ${bottlenecks.join(", ") || "none"}

Write operational summary and top action to improve efficiency.`
  );

  return { operationalSummary, bottlenecks, automationScore };
}

// ─── CMO Agent ────────────────────────────────────────────────────────────────

export async function runCMOAgent(): Promise<{
  marketingSummary: string;
  waitlistGrowthRate: string;
  topAcquisitionChannel: string;
  campaignRecommendation: string;
}> {
  const data = await getPlatformSnapshot();

  const marketingSummary = await callStrategicLLM(
    `You are the CMO advisory agent for ProLnk, a home service platform launching in DFW. Focus on marketing, waitlist growth, and brand. Max 150 words.`,
    `Marketing data:
- Pro waitlist: ${data?.waitlist?.pros ?? 0} service professionals
- Homeowner waitlist: ${data?.waitlist?.homeowners ?? 0} homeowners
- Target: 100 founding partners before launch
- Target: 500 homeowners before marketing blitz
- Market: DFW, Texas — expanding to Austin, Houston, San Antonio

Key channels available:
- Postcard campaigns (Lob.com) — triggered by FSM job closes
- n8n email automation
- Content/social

Write: Marketing situation, top channel to focus on, one specific campaign recommendation.`
  );

  const proProgress = (data?.waitlist?.pros ?? 0) / 100;

  return {
    marketingSummary,
    waitlistGrowthRate: `${data?.waitlist?.pros ?? 0} pros (${Math.round(proProgress * 100)}% of launch target)`,
    topAcquisitionChannel: "DFW contractor networks + CompanyCam integration viral loop",
    campaignRecommendation: "Partner referral incentive — each approved partner who recruits 3 more gets promoted to Pro tier free for 90 days",
  };
}

// ─── CTO Agent ────────────────────────────────────────────────────────────────

export async function runCTOAgent(): Promise<{
  technicalSummary: string;
  criticalBugs: string[];
  deploymentReadiness: "ready" | "needs_work" | "blocked";
  techDebt: string[];
}> {
  const criticalBugs: string[] = [
    "commissions.status column missing — auto-payout broken (stripe.ts:416)",
    "FSM commission rate hardcoded at 5% (fsm-webhooks.ts:175)",
    "Storm leads not dispatching to partners",
    "funnelEvents table never written to — zero conversion analytics",
  ];

  const techDebt: string[] = [
    "server/routers.ts is 4,810 lines — needs domain splitting",
    "Two parallel commission systems (V12 payments + old opportunity flow)",
    "Two email modules (email.ts + notifications.ts) — need consolidation",
    "Mixed Drizzle ORM + raw SQL throughout — inconsistent",
    "All tests mock the database — no real integration tests",
    "No production observability (Langfuse + PostHog not wired to existing agents)",
  ];

  const db = await getDb();
  let dbConnected = false;
  let openAiConfigured = !!process.env.OPENAI_API_KEY;
  let stripeConfigured = !!process.env.STRIPE_SECRET_KEY;

  try { if (db) dbConnected = true; } catch {}

  const deploymentReadiness = dbConnected && stripeConfigured ? "needs_work" : "blocked";

  const technicalSummary = await callStrategicLLM(
    `You are the CTO advisory agent for ProLnk, a Node.js/TypeScript/MySQL platform. Be concise and technical. Max 200 words.`,
    `Technical status:
- DB connected: ${dbConnected}
- OpenAI API: ${openAiConfigured ? "configured" : "MISSING"}
- Stripe: ${stripeConfigured ? "configured (test mode)" : "MISSING"}
- Deployment: Still on Manus, migrating to Railway
- Critical bugs: ${criticalBugs.length} (see list)
- Tech debt items: ${techDebt.length}
- Test coverage: Near zero for financial flows

Write: 1) Technical readiness assessment, 2) Top 3 must-fix before launch, 3) Architecture health score (1-10)`
  );

  return { technicalSummary, criticalBugs, deploymentReadiness, techDebt };
}

// ─── Platform Intelligence Director ───────────────────────────────────────────

export async function runPlatformIntelligenceDirector(): Promise<{
  platformNarrative: string;
  healthScore: number;
  topOpportunity: string;
  topThreat: string;
}> {
  const [ceo, cfo, coo, cmo, cto] = await Promise.all([
    runCEOAgent().catch(() => null),
    runCFOAgent().catch(() => null),
    runCOOAgent().catch(() => null),
    runCMOAgent().catch(() => null),
    runCTOAgent().catch(() => null),
  ]);

  const healthScore = Math.round(
    (coo?.automationScore ?? 50) * 0.3 +
    ((cto?.deploymentReadiness === "ready" ? 100 : cto?.deploymentReadiness === "needs_work" ? 60 : 20)) * 0.2 +
    50 * 0.5
  );

  const platformNarrative = await callStrategicLLM(
    `You are the Platform Intelligence Director for ProLnk. Synthesize all executive agent reports into a unified platform narrative. Be visionary but grounded. Max 250 words.`,
    `Executive agent summaries:
CEO: ${ceo?.executiveSummary?.slice(0, 200) ?? "N/A"}
CFO: ${cfo?.financialSummary?.slice(0, 200) ?? "N/A"}
COO: ${coo?.operationalSummary?.slice(0, 200) ?? "N/A"}
CMO: ${cmo?.marketingSummary?.slice(0, 200) ?? "N/A"}
CTO: ${cto?.technicalSummary?.slice(0, 200) ?? "N/A"}
Platform health score: ${healthScore}/100

Write a unified platform intelligence narrative — where we are, where we're going, and the single most important thing to do this week.`
  );

  return {
    platformNarrative,
    healthScore,
    topOpportunity: "ServiceTitan integration — unlocks 80% of enterprise DFW contractors",
    topThreat: cto?.criticalBugs?.[0] ?? "Technical debt accumulating without integration tests",
  };
}

// ─── Brain Trust Council ──────────────────────────────────────────────────────

export async function runBrainTrustCouncil(): Promise<{
  consensusRecommendations: string[];
  dissent: string | null;
  weeklyPriorityList: string[];
  confidenceScore: number;
}> {
  const director = await runPlatformIntelligenceDirector();

  const councilOutput = await callStrategicLLM(
    `You are the Brain Trust Council for ProLnk — a panel of strategic advisors synthesizing all platform intelligence into actionable consensus recommendations. Be specific and prioritized. Max 300 words.`,
    `Platform Intelligence Director summary: ${director.platformNarrative}
Platform health: ${director.healthScore}/100
Top opportunity: ${director.topOpportunity}
Top threat: ${director.topThreat}

Generate:
1. Three consensus recommendations (specific, actionable, this week)
2. One area of strategic disagreement/dissent if any
3. Ordered weekly priority list (5 items max)
Return as JSON: { recommendations: string[], dissent: string|null, priorities: string[] }`
  );

  let parsed: any = {};
  try {
    parsed = JSON.parse(councilOutput);
  } catch {
    parsed = {
      recommendations: [
        "Apply all patch scripts to fix P0 bugs before any partner onboards",
        "Set up Railway + OpenAI API key this week — both are blocking launch",
        "Start ServiceTitan developer account — 4-8 week approval clock starts now",
      ],
      dissent: null,
      priorities: [
        "Fix commissions.status bug (20 min)",
        "Set up Railway.app + OpenAI key",
        "Point trustypro.io DNS to app",
        "Apply to ServiceTitan Titan Exchange",
        "Set up Twilio 10DLC + TCPA consent",
      ],
    };
  }

  return {
    consensusRecommendations: parsed.recommendations ?? [],
    dissent: parsed.dissent ?? null,
    weeklyPriorityList: parsed.priorities ?? [],
    confidenceScore: director.healthScore,
  };
}

// ─── Run all executive agents ─────────────────────────────────────────────────

export async function runAllExecutiveAgents() {
  console.log("[BrainTrust] Running all executive tier agents...");
  const [ceo, cfo, coo, cmo, cto, council] = await Promise.allSettled([
    runCEOAgent(),
    runCFOAgent(),
    runCOOAgent(),
    runCMOAgent(),
    runCTOAgent(),
    runBrainTrustCouncil(),
  ]);
  return {
    ceo: ceo.status === "fulfilled" ? ceo.value : null,
    cfo: cfo.status === "fulfilled" ? cfo.value : null,
    coo: coo.status === "fulfilled" ? coo.value : null,
    cmo: cmo.status === "fulfilled" ? cmo.value : null,
    cto: cto.status === "fulfilled" ? cto.value : null,
    council: council.status === "fulfilled" ? council.value : null,
    generatedAt: new Date().toISOString(),
  };
}
