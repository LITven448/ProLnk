/**
 * CompanyOrgChart.tsx
 *
 * Full 47-agent company org chart — Paperclip-style visual with:
 * - Multi-LLM Supreme Court layer (CEO reasoning check)
 * - Self-learning feedback loop
 * - Per-company agent clusters (ProLnk Residential, TrustyPro, ProLnk Media)
 * - Correct LLM assignment per agent role
 * - Live status dots
 * - Click-to-expand agent detail panel
 * - Activity History tab
 */

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D } from "@/components/DashboardShared";
import {
  Brain, Cpu, Shield, Megaphone, DollarSign, Users, Radar,
  Zap, Mail, Camera, CloudLightning, BarChart3, Bot, RefreshCw,
  CheckCircle, AlertTriangle, Clock, Activity, ChevronRight, X,
  Scale, Gavel, Star, Network, ArrowRight, RotateCcw, GitBranch,
  Building2, Home, Film, Globe, History, List,
  Target, Link2, Eye,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type AgentStatus = "active" | "idle" | "warning" | "offline";

interface Agent {
  id: string;
  name: string;
  role: string;
  company: "ProLnk OS" | "ProLnk Residential" | "TrustyPro" | "ProLnk Media";
  layer: "supreme-court" | "orchestrator" | "manager" | "specialist" | "utility";
  status: AgentStatus;
  actionsToday: number;
  successRate: number;
  lastAction: string;
  llm: string;
  llmReason: string;
  color: string;
  icon: React.ComponentType<any>;
  reportsTo?: string;
  manages?: string[];
  selfLearns?: boolean;
  description: string;
}

interface ActivityEntry {
  id: string;
  agentId: string;
  agentName: string;
  company: string;
  action: string;
  outcome: "success" | "fail" | "pending";
  timestamp: string;
  color: string;
}

// ─── Agent Definitions (47 total) ─────────────────────────────────────────────

const AGENTS: Agent[] = [
  // ── Supreme Court Layer (3 agents) ──────────────────────────────────────────
  {
    id: "sc-gpt4",
    name: "GPT-4o Judge",
    role: "Supreme Court — Reasoning Validator",
    company: "ProLnk OS",
    layer: "supreme-court",
    status: "active",
    actionsToday: 48,
    successRate: 99.8,
    lastAction: "Validated decision: partner tier upgrade policy — approved",
    llm: "GPT-4o",
    llmReason: "GPT-4o excels at structured reasoning, logical consistency checks, and multi-step decision validation.",
    color: "#FFD700",
    icon: Gavel,
    description: "Reviews all high-stakes decisions. Cross-validates reasoning with Claude and Gemini before any irreversible action is taken.",
    selfLearns: true,
  },
  {
    id: "sc-claude",
    name: "Claude Arbiter",
    role: "Supreme Court — Ethics & Risk Check",
    company: "ProLnk OS",
    layer: "supreme-court",
    status: "active",
    actionsToday: 42,
    successRate: 99.6,
    lastAction: "Ethics check: partner commission rate change — approved",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet is the industry leader for nuanced ethical reasoning, risk analysis, and identifying unintended consequences.",
    color: "#FFD700",
    icon: Scale,
    description: "Provides ethical and risk analysis on all major decisions. Flags potential legal, reputational, or financial risks before execution.",
    selfLearns: true,
  },
  {
    id: "sc-gemini",
    name: "Gemini Analyst",
    role: "Supreme Court — Data Verification",
    company: "ProLnk OS",
    layer: "supreme-court",
    status: "active",
    actionsToday: 38,
    successRate: 99.4,
    lastAction: "Data verification: revenue projection model — confirmed",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro has the largest context window (1M tokens) and excels at cross-referencing large datasets for statistical verification.",
    color: "#FFD700",
    icon: Star,
    description: "Verifies data integrity and statistical accuracy of all reports and projections. Third vote in the Supreme Court consensus system.",
    selfLearns: true,
  },

  // ── Orchestrator Layer (1 agent) ─────────────────────────────────────────────
  {
    id: "orch-main",
    name: "Head of Operations",
    role: "Chief Operations Agent — All Companies",
    company: "ProLnk OS",
    layer: "orchestrator",
    status: "active",
    actionsToday: 1247,
    successRate: 98.9,
    lastAction: "Routed 12 tasks across 8 manager agents",
    llm: "o1-mini",
    llmReason: "OpenAI o1-mini is purpose-built for complex multi-step planning, task decomposition, and routing decisions — ideal for an orchestrator.",
    color: "#00D4FF",
    icon: Network,
    manages: ["mgr-prolnk", "mgr-tp", "mgr-media", "mgr-finance", "mgr-comms", "mgr-ops", "mgr-growth", "mgr-data"],
    description: "The central brain of ProLnk OS. Routes all tasks to the correct manager agent, monitors system health, and escalates to the Supreme Court when needed.",
    selfLearns: true,
  },

  // ── Manager Layer (8 agents) ─────────────────────────────────────────────────
  {
    id: "mgr-prolnk",
    name: "Head of ProLnk Residential",
    role: "Manager — ProLnk Residential",
    company: "ProLnk Residential",
    layer: "manager",
    status: "active",
    actionsToday: 284,
    successRate: 98.4,
    lastAction: "Coordinated lead routing + partner payout batch",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet is best for coordinating complex multi-agent workflows, structured planning, and partner relationship management.",
    color: "#17C1E8",
    icon: Brain,
    reportsTo: "orch-main",
    manages: ["spec-photo", "spec-lead-router", "spec-partner-health", "spec-storm"],
    description: "Oversees all ProLnk Residential operations. Coordinates photo AI, lead routing, partner health monitoring, and storm watch.",
    selfLearns: true,
  },
  {
    id: "mgr-tp",
    name: "Head of TrustyPro",
    role: "Manager — TrustyPro",
    company: "TrustyPro",
    layer: "manager",
    status: "active",
    actionsToday: 189,
    successRate: 97.8,
    lastAction: "Processed 8 home scans — 24 issues flagged",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet handles nuanced homeowner data, issue categorization, and pro matching logic with high accuracy.",
    color: "#82D616",
    icon: Shield,
    reportsTo: "orch-main",
    manages: ["spec-scan", "spec-vault", "spec-homeowner-crm", "spec-tp-match"],
    description: "Oversees all TrustyPro operations. Manages home scanning pipeline, Home Health Vault, homeowner CRM, and pro matching engine.",
    selfLearns: true,
  },
  {
    id: "mgr-media",
    name: "Head of ProLnk Media",
    role: "Manager — ProLnk Media",
    company: "ProLnk Media",
    layer: "manager",
    status: "active",
    actionsToday: 124,
    successRate: 98.1,
    lastAction: "Campaign performance report generated for 8 advertisers",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro excels at processing large volumes of campaign data, ad performance metrics, and multi-advertiser analytics.",
    color: "#FBB140",
    icon: Megaphone,
    reportsTo: "orch-main",
    manages: ["spec-ad-placement", "spec-campaign-opt", "spec-media-crm"],
    description: "Oversees all ProLnk Media operations. Manages ad placement optimization, campaign performance, and advertiser CRM.",
    selfLearns: false,
  },
  {
    id: "mgr-finance",
    name: "Head of Finance",
    role: "Manager — Financial Operations",
    company: "ProLnk OS",
    layer: "manager",
    status: "active",
    actionsToday: 312,
    successRate: 99.8,
    lastAction: "Payout batch: $4,368 to Apex Roofing — confirmed",
    llm: "Claude 3 Opus",
    llmReason: "Claude 3 Opus is the most reliable model for financial reasoning, compliance checks, and high-stakes numerical accuracy.",
    color: "#82D616",
    icon: DollarSign,
    reportsTo: "orch-main",
    manages: ["spec-payout", "spec-commission", "spec-invoice", "spec-tax"],
    description: "Oversees all financial operations across all companies. Manages payouts, commissions, invoicing, and tax preparation.",
    selfLearns: true,
  },
  {
    id: "mgr-comms",
    name: "Head of Communications",
    role: "Manager — Communications",
    company: "ProLnk OS",
    layer: "manager",
    status: "active",
    actionsToday: 847,
    successRate: 99.1,
    lastAction: "Weekly digest sent to 112 partners — 94% open rate",
    llm: "GPT-4o",
    llmReason: "GPT-4o produces the most natural, engaging copy for partner and homeowner communications — highest open and response rates.",
    color: "#EC407A",
    icon: Mail,
    reportsTo: "orch-main",
    manages: ["spec-email", "spec-sms", "spec-partner-comms", "spec-homeowner-comms"],
    description: "Oversees all communications across all companies. Manages email campaigns, SMS alerts, partner digests, and homeowner notifications.",
    selfLearns: true,
  },
  {
    id: "mgr-ops",
    name: "Head of Platform Operations",
    role: "Manager — Platform Operations",
    company: "ProLnk OS",
    layer: "manager",
    status: "active",
    actionsToday: 214,
    successRate: 98.6,
    lastAction: "Platform health check: all systems nominal",
    llm: "Rule-based + GPT-4o",
    llmReason: "Platform ops uses deterministic rule-based logic for routine checks, with GPT-4o escalation for anomaly diagnosis.",
    color: "#7928CA",
    icon: Cpu,
    reportsTo: "orch-main",
    manages: ["spec-health-monitor", "spec-webhook", "spec-integration", "spec-error-handler"],
    description: "Oversees platform operations. Monitors system health, manages webhooks, integrations, and error handling across all services.",
    selfLearns: false,
  },
  {
    id: "mgr-growth",
    name: "Head of Growth",
    role: "Manager — Growth & Marketing",
    company: "ProLnk OS",
    layer: "manager",
    status: "active",
    actionsToday: 156,
    successRate: 97.4,
    lastAction: "Waitlist campaign: 4 new signups — ZIP 75034",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet is best for growth strategy, campaign planning, and synthesizing multi-channel marketing performance data.",
    color: "#FF6B35",
    icon: Radar,
    reportsTo: "orch-main",
    manages: ["spec-waitlist", "spec-seo", "spec-social", "spec-referral"],
    description: "Oversees growth and marketing across all companies. Manages waitlist campaigns, SEO, social media, and referral programs.",
    selfLearns: true,
  },
  {
    id: "mgr-data",
    name: "Head of Data & Intelligence",
    role: "Manager — Data & Intelligence",
    company: "ProLnk OS",
    layer: "manager",
    status: "active",
    actionsToday: 412,
    successRate: 99.2,
    lastAction: "Data pipeline: 1,247 records processed — 0 errors",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro's 1M-token context window is ideal for processing large data pipelines, analytics, and ML training oversight.",
    color: "#26C6DA",
    icon: BarChart3,
    reportsTo: "orch-main",
    manages: ["spec-analytics", "spec-reporting", "spec-ml-train", "spec-data-quality"],
    description: "Oversees all data operations. Manages analytics pipelines, reporting, ML model training, and data quality assurance.",
    selfLearns: true,
  },

  // ── Specialist Layer (28 agents) ─────────────────────────────────────────────
  // ProLnk Residential specialists
  {
    id: "spec-photo",
    name: "Photo AI",
    role: "Specialist — Photo Intelligence",
    company: "ProLnk Residential",
    layer: "specialist",
    status: "active",
    actionsToday: 284,
    successRate: 97.8,
    lastAction: "12 photos processed — 9 opportunities detected",
    llm: "GPT-4o Vision",
    llmReason: "GPT-4o Vision is the leading multimodal model for analyzing construction/home photos and identifying specific trade opportunities.",
    color: "#17C1E8",
    icon: Camera,
    reportsTo: "mgr-prolnk",
    description: "Analyzes partner job photos to detect upsell opportunities for adjacent home services. Core IP of ProLnk.",
    selfLearns: true,
  },
  {
    id: "spec-lead-router",
    name: "Lead Router",
    role: "Specialist — Lead Matching",
    company: "ProLnk Residential",
    layer: "specialist",
    status: "active",
    actionsToday: 214,
    successRate: 98.2,
    lastAction: "7 leads matched — avg response 4.2 min",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet excels at structured matching logic — evaluating trade type, location, partner tier, and capacity simultaneously.",
    color: "#17C1E8",
    icon: GitBranch,
    reportsTo: "mgr-prolnk",
    description: "Routes detected leads to the best-matched partner based on trade, location, tier, and capacity.",
    selfLearns: true,
  },
  {
    id: "spec-partner-health",
    name: "Partner Health Agent",
    role: "Specialist — Partner Monitoring",
    company: "ProLnk Residential",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 98.9,
    lastAction: "Churn risk flagged: DFW Plumbing Pro — 14 days inactive",
    llm: "GPT-4o",
    llmReason: "GPT-4o is best for behavioral pattern analysis and generating personalized re-engagement messages for at-risk partners.",
    color: "#17C1E8",
    icon: Activity,
    reportsTo: "mgr-prolnk",
    description: "Monitors partner engagement, flags churn risks, and triggers re-engagement workflows automatically.",
    selfLearns: true,
  },
  {
    id: "spec-storm",
    name: "Storm Watch Agent",
    role: "Specialist — Weather Intelligence",
    company: "ProLnk Residential",
    layer: "specialist",
    status: "idle",
    actionsToday: 12,
    successRate: 99.1,
    lastAction: "Storm alert: ZIP 75034 — hail risk — 3 partners notified",
    llm: "Rule-based + Weather API",
    llmReason: "Storm detection is deterministic — rule-based logic processes weather API data with no LLM needed for core alerts.",
    color: "#17C1E8",
    icon: CloudLightning,
    reportsTo: "mgr-prolnk",
    description: "Monitors weather data to detect storm events and proactively alert partners and homeowners in affected areas.",
    selfLearns: false,
  },

  // TrustyPro specialists
  {
    id: "spec-scan",
    name: "Home Scan AI",
    role: "Specialist — Property Analysis",
    company: "TrustyPro",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 95.4,
    lastAction: "5-room scan: 4 issues detected — roof wear, HVAC filter",
    llm: "GPT-4o Vision",
    llmReason: "GPT-4o Vision is the most accurate model for identifying home condition issues from photos across 100+ categories.",
    color: "#82D616",
    icon: Camera,
    reportsTo: "mgr-tp",
    description: "Analyzes homeowner-submitted photos to identify property issues, maintenance needs, and improvement opportunities.",
    selfLearns: true,
  },
  {
    id: "spec-vault",
    name: "Vault Agent",
    role: "Specialist — Home Health Vault",
    company: "TrustyPro",
    layer: "specialist",
    status: "active",
    actionsToday: 47,
    successRate: 99.6,
    lastAction: "12 new Home Health records written to vault",
    llm: "Rule-based",
    llmReason: "Vault operations are deterministic CRUD — no LLM needed for structured data storage and retrieval.",
    color: "#82D616",
    icon: Shield,
    reportsTo: "mgr-tp",
    description: "Manages the Home Health Vault — stores, organizes, and retrieves homeowner property data securely.",
    selfLearns: false,
  },
  {
    id: "spec-homeowner-crm",
    name: "Homeowner CRM Agent",
    role: "Specialist — Homeowner Relations",
    company: "TrustyPro",
    layer: "specialist",
    status: "active",
    actionsToday: 34,
    successRate: 98.7,
    lastAction: "Follow-up sent: 8 homeowners with pending scans",
    llm: "GPT-4o",
    llmReason: "GPT-4o generates the most empathetic, personalized homeowner communications — critical for trust-based relationships.",
    color: "#82D616",
    icon: Users,
    reportsTo: "mgr-tp",
    description: "Manages homeowner relationships, follow-ups, scan reminders, and satisfaction surveys.",
    selfLearns: true,
  },
  {
    id: "spec-tp-match",
    name: "TrustyPro Match Agent",
    role: "Specialist — Pro Matching",
    company: "TrustyPro",
    layer: "specialist",
    status: "active",
    actionsToday: 28,
    successRate: 97.2,
    lastAction: "3 pro matches sent for roof wear — ZIP 75034",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet handles multi-criteria matching (trade, location, ratings, availability) with high precision.",
    color: "#82D616",
    icon: GitBranch,
    reportsTo: "mgr-tp",
    description: "Matches homeowner issues to the best ProLnk partner based on trade, location, and ratings.",
    selfLearns: true,
  },

  // ProLnk Media specialists
  {
    id: "spec-ad-placement",
    name: "Ad Placement Agent",
    role: "Specialist — Ad Optimization",
    company: "ProLnk Media",
    layer: "specialist",
    status: "active",
    actionsToday: 48,
    successRate: 98.4,
    lastAction: "A/B test: Apex Insurance — variant B winning (4.8% CTR)",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro processes large ad performance datasets and multi-variant test results with superior speed and accuracy.",
    color: "#FBB140",
    icon: Megaphone,
    reportsTo: "mgr-media",
    description: "Optimizes ad placement across the ProLnk platform. Runs A/B tests and adjusts placement based on performance data.",
    selfLearns: true,
  },
  {
    id: "spec-campaign-opt",
    name: "Campaign Optimizer",
    role: "Specialist — Campaign Performance",
    company: "ProLnk Media",
    layer: "specialist",
    status: "active",
    actionsToday: 34,
    successRate: 97.8,
    lastAction: "Campaign report: State Farm DFW — 4.2x ROI confirmed",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro's data analysis capabilities make it ideal for multi-advertiser ROI calculations and budget optimization.",
    color: "#FBB140",
    icon: BarChart3,
    reportsTo: "mgr-media",
    description: "Monitors and optimizes advertiser campaign performance. Generates ROI reports and recommends budget adjustments.",
    selfLearns: true,
  },
  {
    id: "spec-media-crm",
    name: "Advertiser CRM Agent",
    role: "Specialist — Advertiser Relations",
    company: "ProLnk Media",
    layer: "specialist",
    status: "idle",
    actionsToday: 12,
    successRate: 98.9,
    lastAction: "Renewal reminder sent: 4 contracts expiring in 30 days",
    llm: "GPT-4o",
    llmReason: "GPT-4o writes the most compelling advertiser renewal and upsell communications.",
    color: "#FBB140",
    icon: Users,
    reportsTo: "mgr-media",
    description: "Manages advertiser relationships, renewal reminders, contract tracking, and satisfaction surveys.",
    selfLearns: false,
  },

  // Finance specialists
  {
    id: "spec-payout",
    name: "Payout Agent",
    role: "Specialist — Partner Payouts",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 99.9,
    lastAction: "Payout batch: $4,368 to Apex Roofing — confirmed",
    llm: "Claude 3 Opus",
    llmReason: "Claude 3 Opus provides the highest accuracy for financial transaction validation and error detection.",
    color: "#82D616",
    icon: DollarSign,
    reportsTo: "mgr-finance",
    description: "Processes all partner commission payouts via Stripe. Handles batch payments, retries, and payout confirmations.",
    selfLearns: false,
  },
  {
    id: "spec-commission",
    name: "Commission Tracker",
    role: "Specialist — Commission Calculation",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 124,
    successRate: 99.8,
    lastAction: "Commission: Job #4821 — $8,400 gross, $689 commission",
    llm: "Claude 3 Opus",
    llmReason: "Claude 3 Opus handles complex tier-based commission calculations with the highest numerical accuracy.",
    color: "#82D616",
    icon: BarChart3,
    reportsTo: "mgr-finance",
    description: "Tracks all job completions and calculates partner commissions in real time. Handles tier-based rate adjustments.",
    selfLearns: false,
  },
  {
    id: "spec-invoice",
    name: "Invoice Agent",
    role: "Specialist — Invoicing",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 34,
    successRate: 99.7,
    lastAction: "Invoice batch: $3,600 sent to 4 media advertisers",
    llm: "Rule-based",
    llmReason: "Invoice generation is template-driven and deterministic — no LLM needed.",
    color: "#82D616",
    icon: DollarSign,
    reportsTo: "mgr-finance",
    description: "Generates and sends invoices to advertisers and subscription partners. Tracks payment status and sends reminders.",
    selfLearns: false,
  },
  {
    id: "spec-tax",
    name: "Tax Prep Agent",
    role: "Specialist — Tax & Compliance",
    company: "ProLnk OS",
    layer: "specialist",
    status: "idle",
    actionsToday: 8,
    successRate: 99.5,
    lastAction: "Q1 tax summary generated — ready for review",
    llm: "Claude 3 Opus",
    llmReason: "Claude 3 Opus is the most reliable model for tax compliance, 1099 preparation, and IRS regulation interpretation.",
    color: "#82D616",
    icon: Scale,
    reportsTo: "mgr-finance",
    description: "Prepares tax summaries, 1099s for partners, and quarterly financial reports. Ensures compliance with IRS requirements.",
    selfLearns: false,
  },

  // Comms specialists
  {
    id: "spec-email",
    name: "Email Agent",
    role: "Specialist — Email Campaigns",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 284,
    successRate: 99.2,
    lastAction: "Weekly digest: 112 partners — 94% open rate",
    llm: "GPT-4o",
    llmReason: "GPT-4o produces the most engaging email copy with high open rates across partner and homeowner segments.",
    color: "#EC407A",
    icon: Mail,
    reportsTo: "mgr-comms",
    description: "Manages all email communications via Resend. Handles partner digests, homeowner alerts, and advertiser reports.",
    selfLearns: true,
  },
  {
    id: "spec-sms",
    name: "SMS Agent",
    role: "Specialist — SMS Alerts",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 147,
    successRate: 98.8,
    lastAction: "Storm alert SMS: 8 partners in ZIP 75034 — delivered",
    llm: "Rule-based",
    llmReason: "SMS alerts are short, templated, and time-sensitive — rule-based logic ensures instant delivery without LLM latency.",
    color: "#EC407A",
    icon: Zap,
    reportsTo: "mgr-comms",
    description: "Sends SMS alerts for time-sensitive events: storm warnings, lead notifications, and payout confirmations.",
    selfLearns: false,
  },
  {
    id: "spec-partner-comms",
    name: "Partner Comms Agent",
    role: "Specialist — Partner Messaging",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 212,
    successRate: 99.1,
    lastAction: "8 partner check-ins sent — 2 churn risks flagged",
    llm: "GPT-4o",
    llmReason: "GPT-4o generates personalized partner check-ins and re-engagement messages that feel human, not automated.",
    color: "#EC407A",
    icon: Users,
    reportsTo: "mgr-comms",
    description: "Manages all partner-facing communications including onboarding sequences, check-ins, and re-engagement campaigns.",
    selfLearns: true,
  },
  {
    id: "spec-homeowner-comms",
    name: "Homeowner Comms Agent",
    role: "Specialist — Homeowner Messaging",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 98.7,
    lastAction: "Scan reminder: 12 homeowners with incomplete profiles",
    llm: "GPT-4o",
    llmReason: "GPT-4o produces warm, trust-building homeowner communications that drive scan completion and pro match acceptance.",
    color: "#EC407A",
    icon: Mail,
    reportsTo: "mgr-comms",
    description: "Manages all homeowner-facing communications including scan reminders, issue alerts, and pro match notifications.",
    selfLearns: true,
  },

  // Ops specialists
  {
    id: "spec-health-monitor",
    name: "Health Monitor",
    role: "Specialist — System Health",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 1440,
    successRate: 99.9,
    lastAction: "All systems nominal — 0 errors in last 60 min",
    llm: "Rule-based",
    llmReason: "System health monitoring is deterministic — threshold-based rules with no LLM needed for routine checks.",
    color: "#7928CA",
    icon: Activity,
    reportsTo: "mgr-ops",
    description: "Continuously monitors system health across all ProLnk OS services. Alerts the Ops Manager on degradation or failures.",
    selfLearns: false,
  },
  {
    id: "spec-webhook",
    name: "Webhook Agent",
    role: "Specialist — Webhook Processing",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 312,
    successRate: 99.7,
    lastAction: "n8n webhook: 47 events processed — 0 failures",
    llm: "Rule-based",
    llmReason: "Webhook processing is event-driven and deterministic — rule-based routing ensures low latency and reliability.",
    color: "#7928CA",
    icon: Zap,
    reportsTo: "mgr-ops",
    description: "Processes all incoming webhooks from n8n, Stripe, and third-party integrations. Routes events to the correct agent.",
    selfLearns: false,
  },
  {
    id: "spec-integration",
    name: "Integration Agent",
    role: "Specialist — Third-party Integrations",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 98.4,
    lastAction: "CompanyCam sync: 34 new photos ingested",
    llm: "Rule-based",
    llmReason: "API integrations are deterministic — rule-based adapters handle CompanyCam, Stripe, Resend, and RESO connections.",
    color: "#7928CA",
    icon: GitBranch,
    reportsTo: "mgr-ops",
    description: "Manages integrations with CompanyCam, Stripe, Resend, RESO/MLS, and other third-party services.",
    selfLearns: false,
  },
  {
    id: "spec-error-handler",
    name: "Error Handler",
    role: "Specialist — Error Recovery",
    company: "ProLnk OS",
    layer: "specialist",
    status: "idle",
    actionsToday: 4,
    successRate: 97.8,
    lastAction: "Auto-retry: payout failure for partner #P-284 — resolved",
    llm: "Rule-based + GPT-4o",
    llmReason: "Routine errors use rule-based retry logic. Complex or novel errors escalate to GPT-4o for diagnosis and resolution.",
    color: "#7928CA",
    icon: RefreshCw,
    reportsTo: "mgr-ops",
    description: "Catches and recovers from errors across all agents. Implements retry logic and escalates unresolvable issues.",
    selfLearns: false,
  },

  // Growth specialists
  {
    id: "spec-waitlist",
    name: "Waitlist Agent",
    role: "Specialist — Waitlist Management",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 47,
    successRate: 99.3,
    lastAction: "4 new signups — welcome sequence triggered",
    llm: "GPT-4o",
    llmReason: "GPT-4o personalizes welcome sequences and referral nudges based on signup source and profile data.",
    color: "#FF6B35",
    icon: Users,
    reportsTo: "mgr-growth",
    description: "Manages waitlist signups for ProLnk and TrustyPro. Triggers welcome sequences and tracks conversion to active users.",
    selfLearns: true,
  },
  {
    id: "spec-seo",
    name: "SEO Agent",
    role: "Specialist — Search Optimization",
    company: "ProLnk OS",
    layer: "specialist",
    status: "idle",
    actionsToday: 12,
    successRate: 96.8,
    lastAction: "Weekly SEO report: +12% organic traffic",
    llm: "Claude 3.5 Sonnet",
    llmReason: "Claude 3.5 Sonnet produces the highest-quality SEO content and keyword strategy recommendations.",
    color: "#FF6B35",
    icon: Radar,
    reportsTo: "mgr-growth",
    description: "Monitors and optimizes SEO performance across all ProLnk OS websites. Generates content recommendations and tracks rankings.",
    selfLearns: true,
  },
  {
    id: "spec-social",
    name: "Social Media Agent",
    role: "Specialist — Social Content",
    company: "ProLnk OS",
    layer: "specialist",
    status: "idle",
    actionsToday: 8,
    successRate: 97.2,
    lastAction: "Instagram post scheduled: ProLnk partner spotlight",
    llm: "GPT-4o",
    llmReason: "GPT-4o creates the most engaging, platform-native social content for Instagram, LinkedIn, and Facebook.",
    color: "#FF6B35",
    icon: Megaphone,
    reportsTo: "mgr-growth",
    description: "Creates and schedules social media content for ProLnk and TrustyPro. Monitors engagement and responds to comments.",
    selfLearns: true,
  },
  {
    id: "spec-referral",
    name: "Referral Agent",
    role: "Specialist — Referral Programs",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 34,
    successRate: 98.1,
    lastAction: "Referral credit: $50 to partner P-112 — 2 new signups",
    llm: "Rule-based",
    llmReason: "Referral tracking and credit issuance are deterministic — rule-based logic handles all calculations reliably.",
    color: "#FF6B35",
    icon: ArrowRight,
    reportsTo: "mgr-growth",
    description: "Manages partner and homeowner referral programs. Tracks referrals, issues credits, and optimizes referral incentives.",
    selfLearns: true,
  },

  // Data specialists
  {
    id: "spec-analytics",
    name: "Analytics Agent",
    role: "Specialist — Business Analytics",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 124,
    successRate: 99.4,
    lastAction: "Executive dashboard updated: all KPIs refreshed",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro processes the largest data volumes for KPI calculation and dashboard refresh with minimal latency.",
    color: "#26C6DA",
    icon: BarChart3,
    reportsTo: "mgr-data",
    description: "Generates business analytics and KPI reports for all 7 executive dashboards. Refreshes data every 15 minutes.",
    selfLearns: true,
  },
  {
    id: "spec-reporting",
    name: "Reporting Agent",
    role: "Specialist — Automated Reports",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 89,
    successRate: 99.6,
    lastAction: "Weekly partner performance report generated",
    llm: "Gemini 1.5 Pro",
    llmReason: "Gemini 1.5 Pro synthesizes large datasets into clear, structured reports faster than other models.",
    color: "#26C6DA",
    icon: BarChart3,
    reportsTo: "mgr-data",
    description: "Generates and distributes automated reports to partners, advertisers, and the admin team on a scheduled basis.",
    selfLearns: false,
  },
  {
    id: "spec-ml-train",
    name: "ML Training Agent",
    role: "Specialist — Model Training",
    company: "ProLnk OS",
    layer: "specialist",
    status: "idle",
    actionsToday: 4,
    successRate: 98.2,
    lastAction: "Photo AI model: retrained on 284 new labeled examples",
    llm: "Fine-tuned GPT-4o",
    llmReason: "Fine-tuned GPT-4o is used for the self-learning loop — domain-specific training data improves photo detection accuracy over time.",
    color: "#26C6DA",
    icon: Brain,
    reportsTo: "mgr-data",
    description: "Manages the self-learning loop. Collects labeled examples from agent actions and retrains models to improve accuracy.",
    selfLearns: true,
  },
  {
    id: "spec-data-quality",
    name: "Data Quality Agent",
    role: "Specialist — Data Integrity",
    company: "ProLnk OS",
    layer: "specialist",
    status: "active",
    actionsToday: 312,
    successRate: 99.8,
    lastAction: "Data pipeline: 1,247 records validated — 0 errors",
    llm: "Rule-based",
    llmReason: "Data validation is schema-driven and deterministic — rule-based checks catch duplicates, nulls, and type mismatches instantly.",
    color: "#26C6DA",
    icon: CheckCircle,
    reportsTo: "mgr-data",
    description: "Validates all data flowing through the ProLnk OS pipeline. Catches duplicates, missing fields, and schema violations.",
    selfLearns: false,
  },

  // ── Utility Layer (7 agents) ─────────────────────────────────────────────────
  {
    id: "util-notif",
    name: "Notification Agent",
    role: "Utility — Push Notifications",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 412,
    successRate: 99.7,
    lastAction: "Owner notification: 3 new partner applications",
    llm: "Rule-based",
    llmReason: "Push notifications are event-triggered and templated — no LLM needed.",
    color: "#AEAEAE",
    icon: Zap,
    reportsTo: "orch-main",
    description: "Sends push notifications to the admin owner for critical events: new applications, disputes, and system alerts.",
    selfLearns: false,
  },
  {
    id: "util-scheduler",
    name: "Scheduler Agent",
    role: "Utility — Task Scheduling",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 284,
    successRate: 99.9,
    lastAction: "Scheduled: payout batch at 9 AM tomorrow",
    llm: "Rule-based",
    llmReason: "Cron-based scheduling is deterministic — no LLM needed for time-based task management.",
    color: "#AEAEAE",
    icon: Clock,
    reportsTo: "orch-main",
    description: "Manages all scheduled tasks across ProLnk OS. Triggers cron jobs, batch processes, and time-based workflows.",
    selfLearns: false,
  },
  {
    id: "util-audit",
    name: "Audit Agent",
    role: "Utility — Audit Trail",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 1247,
    successRate: 100,
    lastAction: "Audit log: 1,247 agent actions recorded",
    llm: "Rule-based",
    llmReason: "Audit logging is append-only and deterministic — immutable records require no LLM processing.",
    color: "#AEAEAE",
    icon: CheckCircle,
    reportsTo: "orch-main",
    description: "Records all agent actions to an immutable audit log. Provides full traceability for compliance and debugging.",
    selfLearns: false,
  },
  {
    id: "util-backup",
    name: "Backup Agent",
    role: "Utility — Data Backup",
    company: "ProLnk OS",
    layer: "utility",
    status: "idle",
    actionsToday: 3,
    successRate: 100,
    lastAction: "Daily backup: 2.4 GB — S3 confirmed",
    llm: "Rule-based",
    llmReason: "Backup operations are scheduled and deterministic — no LLM needed.",
    color: "#AEAEAE",
    icon: RefreshCw,
    reportsTo: "orch-main",
    description: "Performs daily database and file backups to S3. Monitors backup integrity and alerts on failures.",
    selfLearns: false,
  },
  {
    id: "util-security",
    name: "Security Agent",
    role: "Utility — Security Monitoring",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 2880,
    successRate: 99.9,
    lastAction: "Security scan: 0 anomalies detected",
    llm: "Rule-based + GPT-4o",
    llmReason: "Routine security checks are rule-based. Novel attack patterns escalate to GPT-4o for behavioral analysis.",
    color: "#AEAEAE",
    icon: Shield,
    reportsTo: "orch-main",
    description: "Monitors all API calls and user actions for security anomalies. Blocks suspicious activity and alerts the admin.",
    selfLearns: false,
  },
  {
    id: "util-rate-limit",
    name: "Rate Limiter",
    role: "Utility — API Rate Limiting",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 847,
    successRate: 100,
    lastAction: "Rate limit enforced: 3 requests throttled",
    llm: "Rule-based",
    llmReason: "Rate limiting is deterministic threshold enforcement — no LLM needed.",
    color: "#AEAEAE",
    icon: Zap,
    reportsTo: "orch-main",
    description: "Enforces API rate limits across all ProLnk OS services to prevent abuse and manage LLM costs.",
    selfLearns: false,
  },
  {
    id: "util-cost",
    name: "Cost Monitor",
    role: "Utility — LLM Cost Tracking",
    company: "ProLnk OS",
    layer: "utility",
    status: "active",
    actionsToday: 1440,
    successRate: 99.8,
    lastAction: "Daily LLM cost: $12.40 — within budget",
    llm: "Rule-based",
    llmReason: "Cost tracking is arithmetic — rule-based aggregation of API usage logs with threshold alerts.",
    color: "#AEAEAE",
    icon: DollarSign,
    reportsTo: "orch-main",
    description: "Tracks LLM API costs in real time. Alerts when daily spend exceeds thresholds and optimizes model selection.",
    selfLearns: true,
  },
];

// ─── Mock Activity History ─────────────────────────────────────────────────────

const ACTIVITY_HISTORY: ActivityEntry[] = [
  { id: "a1",  agentId: "spec-photo",         agentName: "Photo AI",              company: "ProLnk Residential", action: "12 photos processed — 9 upsell opportunities detected (roofing, gutters, HVAC)",                outcome: "success", timestamp: "2 min ago",  color: "#17C1E8" },
  { id: "a2",  agentId: "spec-lead-router",   agentName: "Lead Router",           company: "ProLnk Residential", action: "Roofing lead matched to Apex Roofing (ZIP 75034) — response time 3.8 min",                    outcome: "success", timestamp: "4 min ago",  color: "#17C1E8" },
  { id: "a3",  agentId: "mgr-finance",        agentName: "Head of Finance",       company: "ProLnk OS",          action: "Payout batch approved: $4,368 to Apex Roofing — Stripe transfer initiated",                   outcome: "success", timestamp: "8 min ago",  color: "#82D616" },
  { id: "a4",  agentId: "spec-scan",          agentName: "Home Scan AI",          company: "TrustyPro",          action: "5-room scan complete: 4 issues flagged — roof wear (high), HVAC filter (medium), 2 cosmetic",  outcome: "success", timestamp: "11 min ago", color: "#82D616" },
  { id: "a5",  agentId: "spec-email",         agentName: "Email Agent",           company: "ProLnk OS",          action: "Weekly partner digest sent to 112 partners — 94% open rate, 23% click-through",                outcome: "success", timestamp: "15 min ago", color: "#EC407A" },
  { id: "a6",  agentId: "spec-partner-health",agentName: "Partner Health Agent",  company: "ProLnk Residential", action: "Churn risk flagged: DFW Plumbing Pro — 14 days inactive — re-engagement sequence triggered",    outcome: "success", timestamp: "22 min ago", color: "#17C1E8" },
  { id: "a7",  agentId: "sc-claude",          agentName: "Claude Arbiter",        company: "ProLnk OS",          action: "Ethics check: partner commission rate change from 8% to 9% — risk assessment: LOW — approved",   outcome: "success", timestamp: "28 min ago", color: "#FFD700" },
  { id: "a8",  agentId: "spec-ad-placement",  agentName: "Ad Placement Agent",    company: "ProLnk Media",       action: "A/B test concluded: Apex Insurance variant B wins (4.8% CTR vs 3.1%) — variant B deployed",     outcome: "success", timestamp: "35 min ago", color: "#FBB140" },
  { id: "a9",  agentId: "spec-waitlist",      agentName: "Waitlist Agent",        company: "ProLnk OS",          action: "4 new waitlist signups (2 ProLnk, 2 TrustyPro) — welcome sequences triggered",                 outcome: "success", timestamp: "41 min ago", color: "#FF6B35" },
  { id: "a10", agentId: "spec-error-handler", agentName: "Error Handler",         company: "ProLnk OS",          action: "Payout retry for partner #P-284 — Stripe timeout — retry #2 succeeded",                       outcome: "success", timestamp: "48 min ago", color: "#7928CA" },
  { id: "a11", agentId: "spec-storm",         agentName: "Storm Watch Agent",     company: "ProLnk Residential", action: "Hail alert: ZIP 75034 — 3 roofing partners notified via SMS",                                 outcome: "success", timestamp: "1 hr ago",   color: "#17C1E8" },
  { id: "a12", agentId: "spec-ml-train",      agentName: "ML Training Agent",     company: "ProLnk OS",          action: "Photo AI model retrained on 284 new labeled examples — accuracy improved from 94.2% to 95.4%", outcome: "success", timestamp: "2 hr ago",   color: "#26C6DA" },
  { id: "a13", agentId: "spec-tp-match",      agentName: "TrustyPro Match Agent", company: "TrustyPro",          action: "3 pro matches sent for roof wear (ZIP 75034) — homeowner accepted match #2 within 12 min",     outcome: "success", timestamp: "2 hr ago",   color: "#82D616" },
  { id: "a14", agentId: "util-audit",         agentName: "Audit Agent",           company: "ProLnk OS",          action: "Audit log checkpoint: 1,247 agent actions recorded — 0 anomalies",                            outcome: "success", timestamp: "3 hr ago",   color: "#AEAEAE" },
  { id: "a15", agentId: "spec-commission",    agentName: "Commission Tracker",    company: "ProLnk OS",          action: "Commission calculated: Job #4821 — $8,400 gross, 8.2% tier rate, $689 commission",             outcome: "success", timestamp: "3 hr ago",   color: "#82D616" },
];

// ─── Status Colors ─────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<AgentStatus, string> = {
  active:  "#82D616",
  idle:    "#FBB140",
  warning: "#EA0606",
  offline: "#AEAEAE",
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  active:  "Active",
  idle:    "Idle",
  warning: "Warning",
  offline: "Offline",
};

const LAYER_ORDER = ["supreme-court", "orchestrator", "manager", "specialist", "utility"];
const LAYER_LABEL: Record<string, string> = {
  "supreme-court": "Supreme Court — Multi-LLM Reasoning Validators",
  "orchestrator":  "Head of Operations",
  "manager":       "Manager Agents",
  "specialist":    "Specialist Agents",
  "utility":       "Utility Agents",
};
const LAYER_COLOR: Record<string, string> = {
  "supreme-court": "#FFD700",
  "orchestrator":  "#00D4FF",
  "manager":       "#17C1E8",
  "specialist":    "#82D616",
  "utility":       "#AEAEAE",
};

const COMPANY_CONFIG = [
  { id: "ProLnk Residential", label: "ProLnk Residential", color: "#17C1E8", icon: Home },
  { id: "TrustyPro",          label: "TrustyPro",          color: "#82D616", icon: Shield },
  { id: "ProLnk Media",       label: "ProLnk Media",       color: "#FBB140", icon: Film },
  { id: "ProLnk OS",          label: "ProLnk OS (Shared)", color: "#00D4FF", icon: Globe },
];

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({ agent, onClick, isSelected }: { agent: Agent; onClick: () => void; isSelected: boolean }) {
  const Icon = agent.icon;
  const statusColor = STATUS_COLOR[agent.status];
  useEffect(() => { document.title = "AI Org Chart — ProLnk Admin"; }, []);

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all cursor-pointer text-center"
      style={{
        background: isSelected ? `${agent.color}22` : `${D.card}`,
        border: `1.5px solid ${isSelected ? agent.color : D.border}`,
        minWidth: 100,
        maxWidth: 120,
        boxShadow: isSelected ? `0 0 0 2px ${agent.color}44` : "none",
      }}
    >
      <div className="relative">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${agent.color}22` }}>
          <Icon className="w-4 h-4" style={{ color: agent.color }} />
        </div>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: statusColor, borderColor: D.card }} />
      </div>
      <span className="text-xs font-semibold leading-tight" style={{ color: D.text }}>{agent.name}</span>
      <span className="text-[10px]" style={{ color: D.muted }}>{agent.llm}</span>
      <span className="text-[10px]" style={{ color: D.dim }}>{agent.actionsToday.toLocaleString()} actions</span>
    </button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function AgentDetailPanel({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const Icon = agent.icon;
  return (
    <div className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col shadow-2xl overflow-y-auto" style={{ background: D.card, borderLeft: `1px solid ${D.border}` }}>
      <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${D.border}` }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${agent.color}22` }}>
            <Icon className="w-5 h-5" style={{ color: agent.color }} />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: D.text }}>{agent.name}</div>
            <div className="text-xs" style={{ color: D.muted }}>{agent.company}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X className="w-4 h-4" style={{ color: D.muted }} /></button>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${STATUS_COLOR[agent.status]}22`, color: STATUS_COLOR[agent.status] }}>{STATUS_LABEL[agent.status]}</span>
          {agent.selfLearns && <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FFD70022", color: "#FFD700" }}>Self-Learning</span>}
        </div>

        <p className="text-sm leading-relaxed" style={{ color: D.muted }}>{agent.description}</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Actions Today", value: agent.actionsToday.toLocaleString() },
            { label: "Success Rate",  value: `${agent.successRate}%` },
            { label: "LLM Model",     value: agent.llm },
            { label: "Layer",         value: agent.layer.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) },
          ].map(s => (
            <div key={s.label} className="p-2 rounded-lg" style={{ background: D.bg }}>
              <div className="text-xs" style={{ color: D.muted }}>{s.label}</div>
              <div className="text-sm font-bold" style={{ color: D.text }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Why this LLM */}
        <div className="p-3 rounded-lg" style={{ background: "#17C1E811", border: "1px solid #17C1E833" }}>
          <div className="text-xs font-semibold mb-1" style={{ color: "#17C1E8" }}>WHY {agent.llm.toUpperCase()}</div>
          <div className="text-xs leading-relaxed" style={{ color: D.muted }}>{agent.llmReason}</div>
        </div>

        <div className="p-3 rounded-lg" style={{ background: D.bg }}>
          <div className="text-xs font-semibold mb-1" style={{ color: D.muted }}>LAST ACTION</div>
          <div className="text-sm" style={{ color: D.text }}>{agent.lastAction}</div>
        </div>

        {agent.reportsTo && (
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: D.muted }}>REPORTS TO</div>
            <div className="text-sm font-medium" style={{ color: agent.color }}>{AGENTS.find(a => a.id === agent.reportsTo)?.name ?? agent.reportsTo}</div>
          </div>
        )}

        {agent.manages && agent.manages.length > 0 && (
          <div>
            <div className="text-xs font-semibold mb-2" style={{ color: D.muted }}>MANAGES ({agent.manages.length})</div>
            <div className="space-y-1">
              {agent.manages.map(id => {
                const sub = AGENTS.find(a => a.id === id);
                if (!sub) return null;
                const SubIcon = sub.icon;
                return (
                  <div key={id} className="flex items-center gap-2 p-1.5 rounded" style={{ background: D.bg }}>
                    <SubIcon className="w-3 h-3" style={{ color: sub.color }} />
                    <span className="text-xs" style={{ color: D.text }}>{sub.name}</span>
                    <span className="ml-auto text-[10px]" style={{ color: D.muted }}>{sub.llm}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent activity for this agent */}
        <div>
          <div className="text-xs font-semibold mb-2" style={{ color: D.muted }}>RECENT ACTIVITY</div>
          <div className="space-y-1">
            {ACTIVITY_HISTORY.filter(a => a.agentId === agent.id).slice(0, 3).map(a => (
              <div key={a.id} className="p-2 rounded text-xs" style={{ background: D.bg }}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-medium" style={{ color: a.outcome === "success" ? "#82D616" : "#EA0606" }}>{a.outcome === "success" ? "✓" : "✗"} {a.timestamp}</span>
                </div>
                <div style={{ color: D.muted }}>{a.action}</div>
              </div>
            ))}
            {ACTIVITY_HISTORY.filter(a => a.agentId === agent.id).length === 0 && (
              <div className="text-xs" style={{ color: D.dim }}>No recent activity in log</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Self-Learning Loop Diagram ───────────────────────────────────────────────

function SelfLearningLoop() {
  const steps = [
    { icon: Bot,         label: "Agent Acts",       color: "#17C1E8" },
    { icon: CheckCircle, label: "Outcome Logged",   color: "#82D616" },
    { icon: Brain,       label: "ML Training",      color: "#26C6DA" },
    { icon: RotateCcw,   label: "Model Retrained",  color: "#FBB140" },
    { icon: Zap,         label: "Agent Improves",   color: "#EC407A" },
  ];
  return (
    <div className="p-4 rounded-xl mb-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
      <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: D.muted }}>Self-Learning Feedback Loop — ProLnk OS</div>
      <div className="flex items-center gap-2 flex-wrap">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${s.color}22` }}>
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <span className="text-xs text-center" style={{ color: D.muted, maxWidth: 64 }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: D.dim }} />}
            </div>
          );
        })}
        <div className="flex items-center gap-1 ml-1">
          <RotateCcw className="w-4 h-4" style={{ color: "#FFD700" }} />
          <span className="text-xs font-bold" style={{ color: "#FFD700" }}>Continuous Loop</span>
        </div>
      </div>
    </div>
  );
}

// ─── Per-Company View ─────────────────────────────────────────────────────────

function PerCompanyView({ onSelectAgent, selectedAgent }: { onSelectAgent: (a: Agent | null) => void; selectedAgent: Agent | null }) {
  return (
    <div className="space-y-8">
      {/* Shared ProLnk OS layer at top */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: "#00D4FF44" }} />
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "#00D4FF22", color: "#00D4FF" }}>
            ProLnk OS — Shared Intelligence Layer
          </span>
          <div className="h-px flex-1" style={{ background: "#00D4FF44" }} />
        </div>
        {/* Supreme Court */}
        <div className="p-4 rounded-xl mb-4" style={{ background: "#FFD70011", border: "1.5px dashed #FFD70066" }}>
          <div className="text-xs font-bold mb-3 text-center" style={{ color: "#FFD700" }}>
            Supreme Court — 2-of-3 consensus required before any high-stakes action
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {AGENTS.filter(a => a.layer === "supreme-court").map(a => (
              <AgentCard key={a.id} agent={a} onClick={() => onSelectAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
            ))}
          </div>
        </div>
        {/* Orchestrator */}
        <div className="flex justify-center mb-2">
          {AGENTS.filter(a => a.layer === "orchestrator").map(a => (
            <AgentCard key={a.id} agent={a} onClick={() => onSelectAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
          ))}
        </div>
      </div>

      {/* Per-company columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {COMPANY_CONFIG.filter(c => c.id !== "ProLnk OS").map(company => {
          const companyAgents = AGENTS.filter(a => a.company === company.id);
          const CIcon = company.icon;
          return (
            <div key={company.id} className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${company.color}44` }}>
              {/* Company header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: `${company.color}11` }}>
                <CIcon className="w-4 h-4" style={{ color: company.color }} />
                <span className="text-sm font-bold" style={{ color: company.color }}>{company.label}</span>
                <span className="ml-auto text-xs" style={{ color: D.muted }}>{companyAgents.length} agents</span>
              </div>
              {/* Agents */}
              <div className="p-3 flex flex-wrap gap-2 justify-center" style={{ background: D.card }}>
                {companyAgents.map(a => (
                  <AgentCard key={a.id} agent={a} onClick={() => onSelectAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
                ))}
                {companyAgents.length === 0 && (
                  <div className="text-xs py-4" style={{ color: D.dim }}>No dedicated agents</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ProLnk OS shared agents */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: "#00D4FF22" }} />
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "#00D4FF11", color: "#00D4FF" }}>
            ProLnk OS Shared Agents ({AGENTS.filter(a => a.company === "ProLnk OS" && a.layer !== "supreme-court" && a.layer !== "orchestrator").length})
          </span>
          <div className="h-px flex-1" style={{ background: "#00D4FF22" }} />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {AGENTS.filter(a => a.company === "ProLnk OS" && a.layer !== "supreme-court" && a.layer !== "orchestrator").map(a => (
            <AgentCard key={a.id} agent={a} onClick={() => onSelectAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Activity History View ─────────────────────────────────────────────────────

function ActivityHistoryView() {
  const [filterCompany, setFilterCompany] = useState("All");
  const filtered = filterCompany === "All" ? ACTIVITY_HISTORY : ACTIVITY_HISTORY.filter(a => a.company === filterCompany);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <select
          value={filterCompany}
          onChange={e => setFilterCompany(e.target.value)}
          className="text-xs px-2 py-1.5 rounded-lg border"
          style={{ background: D.bg, color: D.text, borderColor: D.border }}
        >
          {["All", "ProLnk Residential", "TrustyPro", "ProLnk Media", "ProLnk OS"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="text-xs" style={{ color: D.muted }}>{filtered.length} entries</span>
      </div>

      <div className="space-y-2">
        {filtered.map(entry => (
          <div key={entry.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: entry.outcome === "success" ? "#82D616" : "#EA0606" }} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-xs font-bold" style={{ color: entry.color }}>{entry.agentName}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: `${entry.color}22`, color: entry.color }}>{entry.company}</span>
                <span className="ml-auto text-[10px]" style={{ color: D.dim }}>{entry.timestamp}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: D.muted }}>{entry.action}</p>
            </div>
            <span className="text-[10px] font-bold flex-shrink-0" style={{ color: entry.outcome === "success" ? "#82D616" : "#EA0606" }}>
              {entry.outcome === "success" ? "✓ OK" : "✗ FAIL"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Accountability View ─────────────────────────────────────────────────────
// Shows each agent's KPIs, ownership areas, and current performance per company

function AccountabilityView({ onSelectAgent, selectedAgent, filterCompany }: { onSelectAgent: (a: Agent | null) => void; selectedAgent: Agent | null; filterCompany: string }) {
  const agents = filterCompany === "All" ? AGENTS : AGENTS.filter(a => a.company === filterCompany);

  // Group by company
  const grouped = COMPANY_CONFIG.map(c => ({
    ...c,
    agents: agents.filter(a => a.company === c.id),
  })).filter(g => g.agents.length > 0);

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4" style={{ color: "#00D4FF" }} />
          <span className="text-sm font-bold" style={{ color: D.text }}>Accountability Chart</span>
        </div>
        <p className="text-xs" style={{ color: D.muted }}>Each agent's ownership area, KPIs, and current performance. Click any agent for details.</p>
      </div>

      {grouped.map(company => {
        const CIcon = company.icon;
        return (
          <div key={company.id}>
            <div className="flex items-center gap-2 mb-4">
              <CIcon className="w-4 h-4" style={{ color: company.color }} />
              <span className="text-sm font-bold" style={{ color: company.color }}>{company.label}</span>
              <span className="text-xs" style={{ color: D.muted }}>({company.agents.length} agents)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Agent</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Role / Ownership</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>LLM</th>
                    <th className="text-center px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Status</th>
                    <th className="text-right px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Actions Today</th>
                    <th className="text-right px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Success Rate</th>
                    <th className="text-left px-3 py-2 font-semibold" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>Last Action</th>
                  </tr>
                </thead>
                <tbody>
                  {company.agents.map(agent => {
                    const Icon = agent.icon;
                    const isSelected = selectedAgent?.id === agent.id;
                    return (
                      <tr
                        key={agent.id}
                        onClick={() => onSelectAgent(isSelected ? null : agent)}
                        className="cursor-pointer transition-all"
                        style={{ background: isSelected ? `${agent.color}11` : "transparent" }}
                      >
                        <td className="px-3 py-2.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${agent.color}22` }}>
                              <Icon className="w-3 h-3" style={{ color: agent.color }} />
                            </div>
                            <span className="font-bold" style={{ color: D.text }}>{agent.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>{agent.role}</td>
                        <td className="px-3 py-2.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold" style={{ background: `${agent.color}22`, color: agent.color }}>{agent.llm}</span>
                        </td>
                        <td className="px-3 py-2.5 text-center" style={{ borderBottom: `1px solid ${D.border}` }}>
                          <span className="w-2 h-2 rounded-full inline-block" style={{ background: STATUS_COLOR[agent.status] }} />
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono font-bold" style={{ color: D.text, borderBottom: `1px solid ${D.border}` }}>{agent.actionsToday.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-right font-mono" style={{ color: agent.successRate >= 98 ? "#82D616" : agent.successRate >= 90 ? "#FBB140" : "#EA0606", borderBottom: `1px solid ${D.border}` }}>{agent.successRate}%</td>
                        <td className="px-3 py-2.5 max-w-[250px] truncate" style={{ color: D.muted, borderBottom: `1px solid ${D.border}` }}>{agent.lastAction}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Dependability View ──────────────────────────────────────────────────────
// Shows which agents depend on which — upstream/downstream chains per company

function DependabilityView({ onSelectAgent, selectedAgent, filterCompany }: { onSelectAgent: (a: Agent | null) => void; selectedAgent: Agent | null; filterCompany: string }) {
  const agents = filterCompany === "All" ? AGENTS : AGENTS.filter(a => a.company === filterCompany);

  // Build dependency map: who reports to whom and who manages whom
  const getUpstream = (agent: Agent): Agent | undefined => {
    if (!agent.reportsTo) return undefined;
    return AGENTS.find(a => a.id === agent.reportsTo);
  };

  const getDownstream = (agent: Agent): Agent[] => {
    return (agent.manages ?? []).map(id => AGENTS.find(a => a.id === id)).filter(Boolean) as Agent[];
  };

  // Group by company
  const grouped = COMPANY_CONFIG.map(c => ({
    ...c,
    agents: agents.filter(a => a.company === c.id),
  })).filter(g => g.agents.length > 0);

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-xl" style={{ background: D.card, border: `1px solid ${D.border}` }}>
        <div className="flex items-center gap-2 mb-2">
          <Link2 className="w-4 h-4" style={{ color: "#17C1E8" }} />
          <span className="text-sm font-bold" style={{ color: D.text }}>Dependability Map</span>
        </div>
        <p className="text-xs" style={{ color: D.muted }}>Shows upstream (reports to) and downstream (manages) dependencies for every agent. Reveals single points of failure and critical chains.</p>
      </div>

      {grouped.map(company => {
        const CIcon = company.icon;
        return (
          <div key={company.id}>
            <div className="flex items-center gap-2 mb-4">
              <CIcon className="w-4 h-4" style={{ color: company.color }} />
              <span className="text-sm font-bold" style={{ color: company.color }}>{company.label}</span>
            </div>

            <div className="space-y-2">
              {company.agents.map(agent => {
                const Icon = agent.icon;
                const upstream = getUpstream(agent);
                const downstream = getDownstream(agent);
                const isSelected = selectedAgent?.id === agent.id;

                return (
                  <div
                    key={agent.id}
                    onClick={() => onSelectAgent(isSelected ? null : agent)}
                    className="p-3 rounded-xl cursor-pointer transition-all"
                    style={{ background: D.card, border: `1.5px solid ${isSelected ? agent.color : D.border}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${agent.color}22` }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: agent.color }} />
                        </div>
                        <div>
                          <span className="text-xs font-bold" style={{ color: D.text }}>{agent.name}</span>
                          <span className="text-[10px] ml-2" style={{ color: D.muted }}>{agent.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold" style={{ color: agent.successRate >= 98 ? "#82D616" : "#FBB140" }}>{agent.successRate}%</span>
                        <span className="w-2 h-2 rounded-full" style={{ background: STATUS_COLOR[agent.status] }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[10px]">
                      {/* Upstream */}
                      <div className="flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 rotate-180" style={{ color: "#7928CA" }} />
                        <span style={{ color: D.muted }}>Reports to:</span>
                        {upstream ? (
                          <span className="font-bold" style={{ color: upstream.color }}>{upstream.name}</span>
                        ) : (
                          <span style={{ color: D.dim }}>None (top-level)</span>
                        )}
                      </div>

                      {/* Downstream */}
                      {downstream.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap">
                          <ArrowRight className="w-3 h-3" style={{ color: "#82D616" }} />
                          <span style={{ color: D.muted }}>Manages:</span>
                          {downstream.slice(0, 5).map(d => (
                            <span key={d.id} className="px-1.5 py-0.5 rounded" style={{ background: `${d.color}15`, color: d.color, fontWeight: 700 }}>{d.name}</span>
                          ))}
                          {downstream.length > 5 && <span style={{ color: D.dim }}>+{downstream.length - 5} more</span>}
                        </div>
                      )}
                    </div>

                    {/* Critical chain warning */}
                    {downstream.length >= 5 && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] px-2 py-1 rounded" style={{ background: "#FBB14022", color: "#FBB140" }}>
                        <AlertTriangle className="w-3 h-3" />
                        <span className="font-bold">Critical node — manages {downstream.length} agents. Failure here cascades.</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CompanyOrgChart() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [view, setView] = useState<"company" | "org" | "grid" | "history" | "accountability" | "dependability">("company");
  const [filterCompany, setFilterCompany] = useState<string>("All");

  const companies = ["All", "ProLnk OS", "ProLnk Residential", "TrustyPro", "ProLnk Media"];

  const filteredAgents = filterCompany === "All"
    ? AGENTS
    : AGENTS.filter(a => a.company === filterCompany);

  const totalActions = AGENTS.reduce((s, a) => s + a.actionsToday, 0);
  const avgSuccess = (AGENTS.reduce((s, a) => s + a.successRate, 0) / AGENTS.length).toFixed(1);
  const activeCount = AGENTS.filter(a => a.status === "active").length;

  return (
    <AdminLayout title="ProLnk OS — Agent Command Center" subtitle="47 AI agents across ProLnk Residential, TrustyPro & ProLnk Media">
      <div className="flex flex-col h-full overflow-hidden" style={{ background: D.bg }}>

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-6 py-3 flex-shrink-0" style={{ background: D.card, borderBottom: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-6">
            {[
              { label: "Total Agents",  value: "47",                              color: "#00D4FF" },
              { label: "Active Now",    value: `${activeCount}`,                  color: "#82D616" },
              { label: "Actions Today", value: totalActions.toLocaleString(),     color: "#FBB140" },
              { label: "Avg Success",   value: `${avgSuccess}%`,                  color: "#17C1E8" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs" style={{ color: D.muted }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {view !== "company" && view !== "history" && (
              <select
                value={filterCompany}
                onChange={e => setFilterCompany(e.target.value)}
                className="text-xs px-2 py-1.5 rounded-lg border"
                style={{ background: D.bg, color: D.text, borderColor: D.border }}
              >
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}

            <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${D.border}` }}>
              {([
                { id: "company", label: "By Company", icon: Building2 },
                { id: "org",     label: "Org Chart",  icon: Network },
                { id: "accountability", label: "Accountability", icon: Target },
                { id: "dependability",  label: "Dependability",  icon: Link2 },
                { id: "grid",    label: "Grid",        icon: List },
                { id: "history", label: "History",     icon: History },
              ] as const).map(v => {
                const VIcon = v.icon;
                return (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all"
                    style={{ background: view === v.id ? "#00D4FF" : D.bg, color: view === v.id ? "#fff" : D.muted }}
                  >
                    <VIcon className="w-3 h-3" />
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto p-6">
          <SelfLearningLoop />

          {view === "company" && (
            <PerCompanyView onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} />
          )}

          {view === "org" && (
            <div className="space-y-8">
              {LAYER_ORDER.map(layer => {
                const layerAgents = filteredAgents.filter(a => a.layer === layer);
                if (layerAgents.length === 0) return null;
                return (
                  <div key={layer}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1" style={{ background: `${LAYER_COLOR[layer]}44` }} />
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: `${LAYER_COLOR[layer]}22`, color: LAYER_COLOR[layer] }}>
                        {LAYER_LABEL[layer]} ({layerAgents.length})
                      </span>
                      <div className="h-px flex-1" style={{ background: `${LAYER_COLOR[layer]}44` }} />
                    </div>
                    {layer === "supreme-court" && (
                      <div className="p-4 rounded-xl mb-2" style={{ background: "#FFD70011", border: "1.5px dashed #FFD70066" }}>
                        <div className="text-xs font-bold mb-3 text-center" style={{ color: "#FFD700" }}>
                          Multi-LLM Consensus Required — 2 of 3 must agree before any high-stakes action executes
                        </div>
                        <div className="flex justify-center gap-4 flex-wrap">
                          {layerAgents.map(a => (
                            <AgentCard key={a.id} agent={a} onClick={() => setSelectedAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
                          ))}
                        </div>
                      </div>
                    )}
                    {layer !== "supreme-court" && (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {layerAgents.map(a => (
                          <AgentCard key={a.id} agent={a} onClick={() => setSelectedAgent(selectedAgent?.id === a.id ? null : a)} isSelected={selectedAgent?.id === a.id} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {view === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map(agent => {
                const Icon = agent.icon;
                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
                    className="text-left p-4 rounded-xl transition-all"
                    style={{ background: D.card, border: `1.5px solid ${selectedAgent?.id === agent.id ? agent.color : D.border}` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${agent.color}22` }}>
                          <Icon className="w-4 h-4" style={{ color: agent.color }} />
                        </div>
                        <div>
                          <div className="text-sm font-bold" style={{ color: D.text }}>{agent.name}</div>
                          <div className="text-xs" style={{ color: D.muted }}>{agent.company}</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: `${STATUS_COLOR[agent.status]}22`, color: STATUS_COLOR[agent.status] }}>
                        {STATUS_LABEL[agent.status]}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="p-1.5 rounded" style={{ background: D.bg }}>
                        <div className="text-[10px]" style={{ color: D.muted }}>Actions</div>
                        <div className="text-xs font-bold" style={{ color: D.text }}>{agent.actionsToday.toLocaleString()}</div>
                      </div>
                      <div className="p-1.5 rounded" style={{ background: D.bg }}>
                        <div className="text-[10px]" style={{ color: D.muted }}>Success</div>
                        <div className="text-xs font-bold" style={{ color: D.text }}>{agent.successRate}%</div>
                      </div>
                      <div className="p-1.5 rounded col-span-1" style={{ background: D.bg }}>
                        <div className="text-[10px]" style={{ color: D.muted }}>LLM</div>
                        <div className="text-[10px] font-bold truncate" style={{ color: agent.color }}>{agent.llm}</div>
                      </div>
                    </div>
                    <p className="text-xs line-clamp-2" style={{ color: D.muted }}>{agent.lastAction}</p>
                  </button>
                );
              })}
            </div>
          )}

          {view === "accountability" && <AccountabilityView onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} filterCompany={filterCompany} />}

          {view === "dependability" && <DependabilityView onSelectAgent={setSelectedAgent} selectedAgent={selectedAgent} filterCompany={filterCompany} />}

          {view === "history" && <ActivityHistoryView />}
        </div>
      </div>

      {selectedAgent && (
        <AgentDetailPanel agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </AdminLayout>
  );
}
