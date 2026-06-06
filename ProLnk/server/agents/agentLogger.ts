/**
 * Agent Logger & Registry — single source of truth
 * ────────────────────────────────────────────────
 * - KNOWN_AGENTS: the agents that ACTUALLY exist as functions in the codebase
 *   (server/agents/*.ts + server/compliance-agent.ts + server/storm-agent.ts).
 *   This is the honest registry the admin dashboard reads — no inflated counts.
 * - ensureAgentInfra(): self-heals the agentActivityLog table if missing
 *   (mirrors the ensureJobOffersInfra pattern).
 * - recordAgentActivity() / withAgentRun(): defensive writers that log a row to
 *   agentActivityLog. Logging must NEVER break an agent run — all failures swallowed.
 */
import { getDb } from "../db";
import { sql } from "drizzle-orm";

export type KnownAgentTier =
  | "Founding Network"
  | "Executive"
  | "Managing"
  | "Supreme Court"
  | "Standalone";

export type KnownAgent = {
  agentId: string;
  name: string;
  tier: KnownAgentTier;
  triggerType: "event" | "schedule" | "on_demand";
  description: string;
};

// ── The REAL agents that exist as functions in the codebase ──────────────
export const KNOWN_AGENTS: KnownAgent[] = [
  // ── Founding Network (server/agents/foundingNetworkAgents.ts) ──
  { agentId: "founding-enrollment", name: "Enrollment Agent", tier: "Founding Network", triggerType: "event", description: "Validates applicants against tier caps and assigns network position" },
  { agentId: "founding-commission-distribution", name: "Commission Distribution", tier: "Founding Network", triggerType: "event", description: "Distributes platform fees across the network on job completion" },
  { agentId: "founding-origination-lock", name: "Home Origination Lock", tier: "Founding Network", triggerType: "event", description: "Locks permanent property origination rights to the first claimant" },
  { agentId: "founding-photo-attribution", name: "Photo Attribution", tier: "Founding Network", triggerType: "event", description: "Tracks photo → AI analysis → commission attribution chain" },
  { agentId: "founding-genealogy", name: "Network Genealogy", tier: "Founding Network", triggerType: "on_demand", description: "Maintains the 4-level recruiting tree" },
  { agentId: "founding-compliance-check", name: "Compliance Check", tier: "Founding Network", triggerType: "schedule", description: "Flags inactive network members against the 90-day threshold" },
  { agentId: "founding-tier-promotion", name: "Tier Promotion", tier: "Founding Network", triggerType: "schedule", description: "Handles tier fills and routing-position updates" },

  // ── Executive Tier (server/agents/executiveTier.ts) ──
  { agentId: "exec-ceo", name: "CEO Agent", tier: "Executive", triggerType: "schedule", description: "Platform health review and strategic decisions" },
  { agentId: "exec-cfo", name: "CFO Agent", tier: "Executive", triggerType: "schedule", description: "Revenue tracking and financial alerts" },
  { agentId: "exec-coo", name: "COO Agent", tier: "Executive", triggerType: "schedule", description: "Operational throughput and bottleneck analysis" },
  { agentId: "exec-cmo", name: "CMO Agent", tier: "Executive", triggerType: "schedule", description: "Marketing priorities and content calendar" },
  { agentId: "exec-cto", name: "CTO Agent", tier: "Executive", triggerType: "schedule", description: "Platform health and engineering prioritization" },
  { agentId: "exec-platform-intel", name: "Platform Intelligence Director", tier: "Executive", triggerType: "schedule", description: "Cross-platform intelligence synthesis" },
  { agentId: "exec-brain-trust", name: "Brain Trust Council", tier: "Executive", triggerType: "on_demand", description: "Multi-persona advisory board for major decisions" },

  // ── Managing Tier (server/agents/managingTierAgents.ts) ──
  { agentId: "mgr-partner-lifecycle", name: "Partner Lifecycle Manager", tier: "Managing", triggerType: "schedule", description: "Manages partner onboarding, activation, and churn" },
  { agentId: "mgr-homeowner-acquisition", name: "Homeowner Acquisition Manager", tier: "Managing", triggerType: "schedule", description: "Drives homeowner signups and re-engagement" },
  { agentId: "mgr-integration-sync", name: "Integration Sync Manager", tier: "Managing", triggerType: "schedule", description: "Syncs FSM and third-party integration data" },
  { agentId: "mgr-insurance-claims", name: "Insurance Claims Manager", tier: "Managing", triggerType: "event", description: "Coordinates insurance claim workflows" },
  { agentId: "mgr-inventory-pricing", name: "Inventory & Pricing Manager", tier: "Managing", triggerType: "schedule", description: "Updates material cost data across trades" },

  // ── Supreme Court (server/agents/supremeCourtAgents.ts) ──
  { agentId: "sc-privacy", name: "Privacy Guardian", tier: "Supreme Court", triggerType: "event", description: "Validates PII handling against privacy laws" },
  { agentId: "sc-brand-safety", name: "Brand Safety Reviewer", tier: "Supreme Court", triggerType: "event", description: "Checks content for brand and trademark safety" },
  { agentId: "sc-ethics", name: "Ethics Reviewer", tier: "Supreme Court", triggerType: "event", description: "Reviews high-stakes decisions for ethics compliance" },

  // ── Standalone / Specialist agents ──
  { agentId: "data-integrity", name: "Data Integrity Agent", tier: "Standalone", triggerType: "schedule", description: "Scans for data corruption and inconsistencies" },
  { agentId: "commission-audit", name: "Commission Audit Agent", tier: "Standalone", triggerType: "schedule", description: "Audits commission calculations for accuracy" },
  { agentId: "home-profile-match", name: "Home Profile Match Agent", tier: "Standalone", triggerType: "event", description: "Matches home profiles to relevant partners and services" },
  { agentId: "seasonal-maintenance", name: "Seasonal Maintenance Agent", tier: "Standalone", triggerType: "schedule", description: "Generates seasonal maintenance checklists for homeowners" },
  { agentId: "storm-scan", name: "Storm Agent", tier: "Standalone", triggerType: "schedule", description: "NOAA / Tomorrow.io weather detection and roof/HVAC alerts" },
  { agentId: "compliance-scan", name: "Compliance Scan Agent", tier: "Standalone", triggerType: "schedule", description: "License and insurance expiry scanning" },
];

export const KNOWN_AGENT_IDS = new Set(KNOWN_AGENTS.map((a) => a.agentId));

// ── Self-heal: ensure the agentActivityLog table exists ──────────────────
let infraEnsured = false;
export async function ensureAgentInfra(): Promise<void> {
  if (infraEnsured) return;
  const db = await getDb();
  if (!db) return;
  const stmts = [
    `CREATE TABLE IF NOT EXISTS \`agentActivityLog\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`agentId\` varchar(80) NOT NULL,
      \`action\` varchar(255) NOT NULL,
      \`outcome\` varchar(20) NOT NULL DEFAULT 'success',
      \`details\` text,
      \`inputTokens\` int DEFAULT 0,
      \`outputTokens\` int DEFAULT 0,
      \`costCents\` int DEFAULT 0,
      \`durationMs\` int DEFAULT 0,
      \`relatedEntityType\` varchar(60),
      \`relatedEntityId\` varchar(120),
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT \`agentActivityLog_id\` PRIMARY KEY(\`id\`)
    )`,
    `CREATE INDEX \`idx_agentActivityLog_agentId\` ON \`agentActivityLog\` (\`agentId\`)`,
    `CREATE INDEX \`idx_agentActivityLog_createdAt\` ON \`agentActivityLog\` (\`createdAt\`)`,
  ];
  for (const s of stmts) {
    try {
      await (db as any).execute(s);
    } catch {
      // Table/index already exists — expected and ignored.
    }
  }
  infraEnsured = true;
}

// ── Defensive activity writer — never throws ─────────────────────────────
export async function recordAgentActivity(params: {
  agentId: string;
  action: string;
  outcome?: "success" | "failure" | "pending" | "blocked";
  details?: string;
  durationMs?: number;
  costCents?: number;
}): Promise<void> {
  try {
    await ensureAgentInfra();
    const db = await getDb();
    if (!db) return;
    await (db as any).execute(
      sql`INSERT INTO \`agentActivityLog\`
        (\`agentId\`, \`action\`, \`outcome\`, \`details\`, \`durationMs\`, \`costCents\`)
       VALUES (${params.agentId}, ${params.action.slice(0, 255)}, ${params.outcome ?? "success"}, ${params.details ? params.details.slice(0, 2000) : null}, ${Math.max(0, Math.round(params.durationMs ?? 0))}, ${Math.max(0, Math.round(params.costCents ?? 0))})`,
    );
  } catch {
    // Logging must never break an agent run.
  }
}

// ── Wrap an agent run: logs start/finish/error, returns the run result ───
export async function withAgentRun<T>(
  meta: { agentId: string; action: string },
  fn: () => Promise<T>,
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    let summary: string | undefined;
    try {
      if (result && typeof result === "object") {
        summary = JSON.stringify(result).slice(0, 500);
      }
    } catch {
      summary = undefined;
    }
    await recordAgentActivity({
      agentId: meta.agentId,
      action: meta.action,
      outcome: "success",
      details: summary,
      durationMs: Date.now() - start,
    });
    return result;
  } catch (err: any) {
    await recordAgentActivity({
      agentId: meta.agentId,
      action: meta.action,
      outcome: "failure",
      details: String(err?.message ?? err).slice(0, 500),
      durationMs: Date.now() - start,
    });
    throw err;
  }
}
