import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Brain, Camera, CloudLightning, ShieldCheck, Users, RefreshCw,
  CheckCircle, AlertTriangle, Clock, Zap, Activity, Bot,
  DollarSign, Cpu, Gavel,
  TrendingUp, Map, Star, HeartHandshake, Wrench,
  XCircle, Terminal, ChevronDown, ChevronUp,
  RotateCcw, FileText, Filter,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AgentRun {
  at: string;
  duration: string;
  result: "ok" | "warn" | "error";
  message: string;
}

interface AgentEntry {
  name: string;
  status: "active" | "standby" | "error";
  lastRun?: string;
  nextRun?: string;
  jobsToday?: number;
  errorsToday?: number;
  successRate?: number;
  avgResponseMs?: number;
  recentRuns?: AgentRun[];
}

interface AgentCategory {
  label: string;
  color: string;
  icon: React.ElementType;
  agents: AgentEntry[];
}

// ─── Mock recent-run generator ─────────────────────────────────────────────────

function mkRuns(good: number, warn: number, bad: number): AgentRun[] {
  const pool: AgentRun[] = [
    { at: "2m ago",  duration: "840ms",  result: "ok",    message: "Completed normally" },
    { at: "14m ago", duration: "1.2s",   result: "ok",    message: "Completed normally" },
    { at: "28m ago", duration: "920ms",  result: "ok",    message: "Completed normally" },
    { at: "42m ago", duration: "1.1s",   result: "warn",  message: "Slow response — API latency spike detected" },
    { at: "1h ago",  duration: "880ms",  result: "ok",    message: "Completed normally" },
    { at: "1.5h ago",duration: "2.4s",   result: "warn",  message: "Retried once before succeeding" },
    { at: "2h ago",  duration: "—",      result: "error", message: "Timeout after 30s — DB query exceeded limit" },
    { at: "3h ago",  duration: "760ms",  result: "ok",    message: "Completed normally" },
  ];
  const selected: AgentRun[] = [];
  let i = 0;
  while (selected.length < 5 && i < pool.length) {
    const r = pool[i];
    if (r.result === "ok" && good > 0) { selected.push(r); good--; }
    else if (r.result === "warn" && warn > 0) { selected.push(r); warn--; }
    else if (r.result === "error" && bad > 0) { selected.push(r); bad--; }
    i++;
  }
  while (selected.length < 5) selected.push(pool[selected.length % pool.length]);
  return selected.slice(0, 5);
}

// ─── Agent Categories (47 agents) ─────────────────────────────────────────────

const AGENT_CATEGORIES: AgentCategory[] = [
  {
    label: "Executive",
    color: "#F5E642",
    icon: Star,
    agents: [
      { name: "CEO Agent",        status: "active",  lastRun: "5m ago",  successRate: 99, avgResponseMs: 420, recentRuns: mkRuns(5,0,0) },
      { name: "Strategy Planner", status: "active",  lastRun: "12m ago", successRate: 98, avgResponseMs: 680, recentRuns: mkRuns(4,1,0) },
      { name: "Board Reporter",   status: "standby", lastRun: "2d ago",  successRate: 100, avgResponseMs: 910, recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Operations",
    color: "#00D4FF",
    icon: Cpu,
    agents: [
      { name: "Deployment & Infra",  status: "active",  lastRun: "12m ago", nextRun: "on demand", jobsToday: 3,   errorsToday: 0, successRate: 100, avgResponseMs: 340,  recentRuns: mkRuns(5,0,0) },
      { name: "Error Handler",       status: "active",  lastRun: "2m ago",  nextRun: "continuous", jobsToday: 17,  errorsToday: 0, successRate: 100, avgResponseMs: 120,  recentRuns: mkRuns(5,0,0) },
      { name: "Data Pipeline",       status: "active",  lastRun: "1h ago",  nextRun: "2:00 AM",    jobsToday: 4,   errorsToday: 0, successRate: 97,  avgResponseMs: 2100, recentRuns: mkRuns(4,1,0) },
      { name: "Testing Agent",       status: "active",  lastRun: "6h ago",  nextRun: "on commit",  jobsToday: 2,   errorsToday: 0, successRate: 96,  avgResponseMs: 4200, recentRuns: mkRuns(4,1,0) },
      { name: "Performance Monitor", status: "active",  lastRun: "5m ago",  nextRun: "continuous", jobsToday: 144, errorsToday: 0, successRate: 100, avgResponseMs: 88,   recentRuns: mkRuns(5,0,0) },
      { name: "Compliance Checker",  status: "active",  lastRun: "1h ago",  nextRun: "3:00 AM",    jobsToday: 1,   errorsToday: 1, successRate: 82,  avgResponseMs: 1840, recentRuns: mkRuns(3,1,1) },
    ],
  },
  {
    label: "Financial",
    color: "#82D616",
    icon: DollarSign,
    agents: [
      { name: "Commission Calculator", status: "active",  lastRun: "8m ago",  nextRun: "continuous",    jobsToday: 38,  errorsToday: 0, successRate: 100, avgResponseMs: 210,  recentRuns: mkRuns(5,0,0) },
      { name: "Payout Processor",      status: "active",  lastRun: "8h ago",  nextRun: "1st of month",  jobsToday: 1,   errorsToday: 1, successRate: 88,  avgResponseMs: 3400, recentRuns: mkRuns(3,1,1) },
      { name: "Revenue Analyzer",      status: "active",  lastRun: "30m ago", nextRun: "hourly",        jobsToday: 24,  errorsToday: 0, successRate: 98,  avgResponseMs: 560,  recentRuns: mkRuns(5,0,0) },
      { name: "Cost Tracker",          status: "active",  lastRun: "1h ago",  nextRun: "hourly",        jobsToday: 12,  errorsToday: 0, successRate: 100, avgResponseMs: 310,  recentRuns: mkRuns(5,0,0) },
      { name: "Fraud Detector",        status: "active",  lastRun: "3h ago",  nextRun: "6:00 AM",       jobsToday: 2,   errorsToday: 1, successRate: 75,  avgResponseMs: 8200, recentRuns: mkRuns(2,1,2) },
      { name: "Tax Helper",            status: "standby", lastRun: "Jan 31",  nextRun: "Jan 31",        jobsToday: 0,   errorsToday: 0, successRate: 100, avgResponseMs: 0,    recentRuns: mkRuns(5,0,0) },
      { name: "Audit Log",             status: "active",  lastRun: "1m ago",  nextRun: "continuous",    jobsToday: 203, errorsToday: 0, successRate: 100, avgResponseMs: 45,   recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Marketing",
    color: "#EC407A",
    icon: TrendingUp,
    agents: [
      { name: "Lead Scorer",          status: "active",  lastRun: "4m ago",     nextRun: "continuous", jobsToday: 56, errorsToday: 0, successRate: 99,  avgResponseMs: 320,  recentRuns: mkRuns(5,0,0) },
      { name: "Email Marketer",       status: "active",  lastRun: "2h ago",     nextRun: "9:00 AM",    jobsToday: 3,  errorsToday: 1, successRate: 84,  avgResponseMs: 1200, recentRuns: mkRuns(3,1,1) },
      { name: "SMS Notifier",         status: "active",  lastRun: "9m ago",     nextRun: "on trigger", jobsToday: 14, errorsToday: 0, successRate: 98,  avgResponseMs: 440,  recentRuns: mkRuns(5,0,0) },
      { name: "Social Media Mgr",     status: "standby", lastRun: "Yesterday",  nextRun: "9:00 AM",    jobsToday: 0,  errorsToday: 0, successRate: 97,  avgResponseMs: 880,  recentRuns: mkRuns(5,0,0) },
      { name: "Ad Campaign Mgr",      status: "standby", lastRun: "Yesterday",  nextRun: "8:00 AM",    jobsToday: 0,  errorsToday: 0, successRate: 95,  avgResponseMs: 1100, recentRuns: mkRuns(5,0,0) },
      { name: "Content Creator",      status: "active",  lastRun: "4h ago",     nextRun: "on demand",  jobsToday: 2,  errorsToday: 0, successRate: 100, avgResponseMs: 2800, recentRuns: mkRuns(5,0,0) },
      { name: "SEO Optimizer",        status: "active",  lastRun: "12h ago",    nextRun: "4:00 AM",    jobsToday: 1,  errorsToday: 0, successRate: 100, avgResponseMs: 4100, recentRuns: mkRuns(5,0,0) },
      { name: "Referral Program Mgr", status: "active",  lastRun: "15m ago",    nextRun: "hourly",     jobsToday: 8,  errorsToday: 0, successRate: 98,  avgResponseMs: 620,  recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Customer Success",
    color: "#FBB140",
    icon: HeartHandshake,
    agents: [
      { name: "Onboarding Flow",    status: "active",  lastRun: "8m ago",    successRate: 99,  avgResponseMs: 540,  recentRuns: mkRuns(5,0,0) },
      { name: "Support Responder",  status: "active",  lastRun: "3m ago",    successRate: 97,  avgResponseMs: 380,  recentRuns: mkRuns(5,0,0) },
      { name: "Feedback Collector", status: "standby", lastRun: "Yesterday", successRate: 100, avgResponseMs: 720,  recentRuns: mkRuns(5,0,0) },
      { name: "Retention Optimizer",status: "active",  lastRun: "1h ago",    successRate: 94,  avgResponseMs: 1600, recentRuns: mkRuns(4,1,0) },
      { name: "Upsell Manager",     status: "standby", lastRun: "Yesterday", successRate: 96,  avgResponseMs: 840,  recentRuns: mkRuns(5,0,0) },
      { name: "Community Builder",  status: "standby", lastRun: "2d ago",    successRate: 100, avgResponseMs: 960,  recentRuns: mkRuns(5,0,0) },
      { name: "Success Tracker",    status: "active",  lastRun: "20m ago",   successRate: 100, avgResponseMs: 290,  recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Intelligence",
    color: "#7928CA",
    icon: Brain,
    agents: [
      { name: "Market Analyzer",      status: "active",  lastRun: "2h ago",  successRate: 98,  avgResponseMs: 2200, recentRuns: mkRuns(4,1,0) },
      { name: "User Behavior Analyzer",status: "active", lastRun: "45m ago", successRate: 99,  avgResponseMs: 1400, recentRuns: mkRuns(5,0,0) },
      { name: "Predictive Modeler",   status: "standby", lastRun: "3h ago",  successRate: 95,  avgResponseMs: 6800, recentRuns: mkRuns(5,0,0) },
      { name: "Recommendation Engine",status: "active",  lastRun: "6m ago",  successRate: 97,  avgResponseMs: 480,  recentRuns: mkRuns(5,0,0) },
      { name: "Data Warehouse",       status: "active",  lastRun: "30m ago", successRate: 100, avgResponseMs: 3100, recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Legal",
    color: "#64748b",
    icon: Gavel,
    agents: [
      { name: "Compliance Monitor", status: "active",  lastRun: "1h ago",    successRate: 92,  avgResponseMs: 1800, recentRuns: mkRuns(3,2,0) },
      { name: "Contract Manager",   status: "standby", lastRun: "Yesterday", successRate: 100, avgResponseMs: 2400, recentRuns: mkRuns(5,0,0) },
      { name: "Dispute Handler",    status: "standby", lastRun: "3d ago",    successRate: 100, avgResponseMs: 1200, recentRuns: mkRuns(5,0,0) },
      { name: "Patent Manager",     status: "standby", lastRun: "1w ago",    successRate: 100, avgResponseMs: 890,  recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Engineering",
    color: "#26C6DA",
    icon: Wrench,
    agents: [
      { name: "Code Review",           status: "active", lastRun: "22m ago", successRate: 100, avgResponseMs: 3800, recentRuns: mkRuns(5,0,0) },
      { name: "Architecture Designer", status: "active", lastRun: "4h ago",  successRate: 100, avgResponseMs: 5100, recentRuns: mkRuns(5,0,0) },
      { name: "Dependency Manager",    status: "active", lastRun: "6h ago",  successRate: 98,  avgResponseMs: 1600, recentRuns: mkRuns(4,1,0) },
      { name: "Database Optimizer",    status: "active", lastRun: "2h ago",  successRate: 96,  avgResponseMs: 4200, recentRuns: mkRuns(4,1,0) },
      { name: "API Designer",          status: "active", lastRun: "8h ago",  successRate: 100, avgResponseMs: 2900, recentRuns: mkRuns(5,0,0) },
      { name: "Frontend Optimizer",    status: "active", lastRun: "3h ago",  successRate: 99,  avgResponseMs: 1800, recentRuns: mkRuns(5,0,0) },
      { name: "DevOps Engineer",       status: "active", lastRun: "18m ago", successRate: 100, avgResponseMs: 640,  recentRuns: mkRuns(5,0,0) },
    ],
  },
  {
    label: "Field / Operations",
    color: "#FF6B35",
    icon: Map,
    agents: [
      { name: "Territory Manager", status: "active",  lastRun: "35m ago", successRate: 98,  avgResponseMs: 740,  recentRuns: mkRuns(5,0,0) },
      { name: "Lead Distributor",  status: "active",  lastRun: "4m ago",  successRate: 99,  avgResponseMs: 280,  recentRuns: mkRuns(5,0,0) },
      { name: "Performance Coach", status: "standby", lastRun: "Yesterday", successRate: 100, avgResponseMs: 1100, recentRuns: mkRuns(5,0,0) },
    ],
  },
];

const TOTAL_AGENTS = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.length, 0);

const RECENT_ERRORS = [
  { agent: "Storm Tracking Agent", message: "NOAA API rate limit hit (429) — retried after 60s backoff", time: "14m ago", severity: "warning" as const },
  { agent: "Compliance Monitor",   message: "COI expiry check: 2 partners missing docs, suspension queued", time: "1h ago", severity: "warning" as const },
  { agent: "Fraud Detector",       message: "DB timeout on match_history table scan — query exceeded 30s", time: "3h ago", severity: "error" as const },
  { agent: "Email Marketer",       message: "Resend API returned 422 for batch of 12 addresses — invalid domains", time: "5h ago", severity: "warning" as const },
  { agent: "Payout Processor",     message: "Commission batch job skipped: no unpaid records found for cycle", time: "8h ago", severity: "warning" as const },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusDot({ status, pulse = false }: { status: AgentEntry["status"]; pulse?: boolean }) {
  const map: Record<AgentEntry["status"], string> = {
    active:  "#82D616",
    standby: "#FBB140",
    error:   "#EA0606",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${pulse && status === "active" ? "animate-pulse" : ""}`}
      style={{ backgroundColor: map[status] }}
    />
  );
}

function RunBadge({ result }: { result: AgentRun["result"] }) {
  const map = {
    ok:    { bg: "#82D61618", border: "#82D61640", color: "#82D616", label: "OK" },
    warn:  { bg: "#FBB14018", border: "#FBB14040", color: "#FBB140", label: "WARN" },
    error: { bg: "#EA060618", border: "#EA060640", color: "#EA0606", label: "ERR" },
  };
  const s = map[result];
  return (
    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {s.label}
    </span>
  );
}

function SuccessBar({ pct }: { pct: number }) {
  const color = pct >= 95 ? "#82D616" : pct >= 85 ? "#FBB140" : "#EA0606";
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 rounded-full overflow-hidden" style={{ background: "#ffffff10" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] font-bold" style={{ color }}>{pct}%</span>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function AgentStatusDashboard() {
  const { data: platformStats } = trpc.admin.getNetworkStats.useQuery();
  const { data: stormStats }    = trpc.stormAgent.getStats.useQuery();

  const [filterCat,     setFilterCat]     = useState<string>("All");
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [autoRefresh,   setAutoRefresh]   = useState(false);
  const [tick,          setTick]          = useState(0);

  const refresh = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(refresh, 15000);
    return () => clearInterval(id);
  }, [autoRefresh, refresh]);

  const activeCount  = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "active").length, 0);
  const standbyCount = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "standby").length, 0);
  const errorCount   = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "error").length, 0);
  const healthPct    = Math.round((activeCount / TOTAL_AGENTS) * 100);
  const totalJobsToday   = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.reduce((as, a) => as + (a.jobsToday ?? 0), 0), 0);
  const totalErrorsToday = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.reduce((as, a) => as + (a.errorsToday ?? 0), 0), 0);

  const catLabels = ["All", ...AGENT_CATEGORIES.map(c => c.label)];
  const visibleCats = filterCat === "All"
    ? AGENT_CATEGORIES
    : AGENT_CATEGORIES.filter(c => c.label === filterCat);

  return (
    <AdminLayout>
    <div className="p-6 space-y-6" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* ── Hero Banner ───────────────────────────────────────────────────────── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0e2040 60%, #0f2d4a 100%)" }}>
        <div className="px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #00D4FF30, #7928CA40)" }}>
              <Bot className="w-7 h-7" style={{ color: "#00D4FF" }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-white tracking-tight">{TOTAL_AGENTS} Agents Deployed</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ background: "#82D61620", border: "1px solid #82D61650", color: "#82D616" }}>
                  AGaaS v1.0
                </span>
              </div>
              <p className="text-sm mt-0.5" style={{ color: "#7eb8d4" }}>
                Autonomous Growth-as-a-Service — AI agents running the platform 24/7
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#82D61618", border: "1px solid #82D61640" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "#82D616" }}>{activeCount} Active</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#FBB14018", border: "1px solid #FBB14040" }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FBB140" }} />
              <span className="text-xs font-bold" style={{ color: "#FBB140" }}>{standbyCount} Standby</span>
            </div>
            {errorCount > 0 ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#EA060618", border: "1px solid #EA060640" }}>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-red-400">{errorCount} Error</span>
              </div>
            ) : (
              <Badge variant="outline" className="border-green-500/50 text-green-400 gap-1">
                <CheckCircle className="h-3 w-3" />
                All Systems Operational
              </Badge>
            )}
            {/* Auto-refresh toggle */}
            <button
              onClick={() => setAutoRefresh(r => !r)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: autoRefresh ? "#00D4FF20" : "#ffffff08",
                border: `1px solid ${autoRefresh ? "#00D4FF50" : "#ffffff18"}`,
                color: autoRefresh ? "#00D4FF" : "#7eb8d4",
              }}
            >
              <RefreshCw className={`w-3 h-3 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Live" : "Auto-Refresh"}
            </button>
          </div>
        </div>

        {/* Overall system health bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span style={{ color: "#7eb8d4" }}>System Health</span>
            <span className="font-bold" style={{ color: healthPct >= 90 ? "#82D616" : "#FBB140" }}>{healthPct}% Healthy</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "#ffffff12" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${healthPct}%`,
                background: healthPct >= 90
                  ? "linear-gradient(90deg, #82D616, #00D4FF)"
                  : healthPct >= 75
                  ? "linear-gradient(90deg, #FBB140, #82D616)"
                  : "linear-gradient(90deg, #EA0606, #FBB140)",
              }}
            />
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-t" style={{ borderColor: "#ffffff12" }}>
          {[
            { label: "Total Partners",    value: platformStats?.totalPartners ?? "—",      icon: Users,          color: "#00D4FF" },
            { label: "Jobs Logged",       value: platformStats?.totalJobs ?? "—",          icon: Camera,         color: "#00D4FF" },
            { label: "Storm Leads",       value: stormStats?.totalLeads ?? "—",             icon: CloudLightning, color: "#7928CA" },
            { label: "Agent Jobs Today",  value: totalJobsToday,                            icon: Activity,       color: "#82D616" },
            { label: "Errors Today",      value: totalErrorsToday,                          icon: AlertTriangle,  color: totalErrorsToday > 0 ? "#EA0606" : "#82D616" },
          ].map((stat, i) => (
            <div key={stat.label} className="px-5 py-3 flex items-center gap-3" style={{ borderLeft: i > 0 ? "1px solid #ffffff10" : undefined }}>
              <stat.icon className="w-4 h-4 flex-shrink-0" style={{ color: stat.color }} />
              <div>
                <div className="text-lg font-black text-white leading-none">{stat.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "#7eb8d4" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Filter ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#7eb8d4" }} />
        {catLabels.map(label => {
          const cat = AGENT_CATEGORIES.find(c => c.label === label);
          const active = filterCat === label;
          return (
            <button
              key={label}
              onClick={() => setFilterCat(label)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: active ? (cat?.color ?? "#00D4FF") + "25" : "#ffffff08",
                border: `1px solid ${active ? (cat?.color ?? "#00D4FF") + "60" : "#ffffff15"}`,
                color: active ? (cat?.color ?? "#00D4FF") : "#7eb8d4",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Agent Grid ────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {visibleCats.map((cat) => {
          const CatIcon = cat.icon;
          const catActive = cat.agents.filter(a => a.status === "active").length;
          return (
            <div key={cat.label}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}22` }}>
                  <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                </div>
                <h2 className="text-sm font-bold" style={{ color: cat.color }}>{cat.label}</h2>
                <span className="text-xs text-muted-foreground">{catActive}/{cat.agents.length} active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {cat.agents.map((agent) => {
                  const isExpanded = expandedAgent === `${cat.label}::${agent.name}`;
                  return (
                    <div
                      key={agent.name}
                      className="rounded-xl overflow-hidden transition-all"
                      style={{
                        background: "#0D1F38",
                        border: `1px solid ${isExpanded ? cat.color + "50" : "#ffffff12"}`,
                      }}
                    >
                      {/* Agent row */}
                      <div className="flex items-center gap-3 px-4 py-3">
                        <StatusDot status={agent.status} pulse />
                        <span className="text-sm font-semibold text-white flex-1 truncate">{agent.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {agent.successRate !== undefined && (
                            <SuccessBar pct={agent.successRate} />
                          )}
                          {agent.avgResponseMs !== undefined && agent.avgResponseMs > 0 && (
                            <span className="text-[10px] font-mono" style={{ color: "#7eb8d4" }}>
                              {agent.avgResponseMs >= 1000
                                ? `${(agent.avgResponseMs / 1000).toFixed(1)}s`
                                : `${agent.avgResponseMs}ms`}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setExpandedAgent(isExpanded ? null : `${cat.label}::${agent.name}`)}
                          className="flex-shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors"
                        >
                          {isExpanded
                            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                            : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 px-4 pb-2.5 text-[10px]" style={{ color: "#5a7a94" }}>
                        {agent.lastRun && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {agent.lastRun}
                          </span>
                        )}
                        {agent.nextRun && (
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" /> {agent.nextRun}
                          </span>
                        )}
                        {agent.jobsToday !== undefined && (
                          <span>{agent.jobsToday} jobs</span>
                        )}
                        {!!agent.errorsToday && (
                          <span style={{ color: "#EA0606" }}>{agent.errorsToday} err</span>
                        )}
                      </div>

                      {/* Expandable detail */}
                      {isExpanded && (
                        <div className="border-t px-4 py-3 space-y-3" style={{ borderColor: "#ffffff10" }}>
                          <p className="text-xs font-semibold" style={{ color: "#7eb8d4" }}>Last 5 Runs</p>
                          <div className="space-y-1.5">
                            {(agent.recentRuns ?? []).map((run, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px]">
                                <RunBadge result={run.result} />
                                <span className="font-mono text-muted-foreground">{run.at}</span>
                                <span className="font-mono" style={{ color: "#7eb8d4" }}>{run.duration}</span>
                                <span className="flex-1 text-muted-foreground truncate">{run.message}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs gap-1.5 flex-1"
                              onClick={() => toast.success(`Restarting ${agent.name}…`)}
                            >
                              <RotateCcw className="w-3 h-3" />
                              Restart Agent
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs gap-1.5 flex-1"
                              onClick={() => toast.info(`Opening logs for ${agent.name}`)}
                            >
                              <FileText className="w-3 h-3" />
                              View Logs
                            </Button>
                          </div>
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

      {/* ── Recent Agent Errors ────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Recent Agent Errors (Last 5)
        </h2>
        <Card className="border border-border">
          <CardContent className="pt-4 pb-2">
            {RECENT_ERRORS.length === 0 ? (
              <div className="flex items-center gap-2 py-4 justify-center text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">No errors in the last 24 hours</span>
              </div>
            ) : (
              <div className="space-y-2">
                {RECENT_ERRORS.map((err, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2 px-3 rounded-lg"
                    style={{
                      background: err.severity === "error" ? "#EA060608" : "#FBB14008",
                      borderLeft: `3px solid ${err.severity === "error" ? "#EA0606" : "#FBB140"}`,
                    }}
                  >
                    {err.severity === "error"
                      ? <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-500" />
                      : <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#FBB140" }} />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold">{err.agent}</span>
                        <span className="text-[10px] text-muted-foreground">{err.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{err.message}</p>
                    </div>
                    <Terminal className="w-3 h-3 flex-shrink-0 text-muted-foreground/40 mt-0.5" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Legend ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground pb-2">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Active — running, processing jobs</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FBB140" }} /> Standby — deployed, awaiting trigger</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Error — needs attention</div>
      </div>

    </div>
    </AdminLayout>
  );
}
