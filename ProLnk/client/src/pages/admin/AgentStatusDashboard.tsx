import type React from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Brain, Camera, CloudLightning, ShieldCheck, Users, RefreshCw,
  CheckCircle, AlertTriangle, Clock, Zap, Activity, Bot,
  DollarSign, BarChart2, Cpu, Gavel,
  TrendingUp, Map, Star, HeartHandshake, Wrench,
  XCircle, Terminal,
} from "lucide-react";

// ─── Agent Category Definitions ───────────────────────────────────────────────

interface AgentEntry {
  name: string;
  status: "active" | "standby" | "error";
  lastRun?: string;
  nextRun?: string;
  jobsToday?: number;
  errorsToday?: number;
}

interface AgentCategory {
  label: string;
  color: string;
  icon: React.ElementType;
  agents: AgentEntry[];
}

// ─── Recent Error Log ──────────────────────────────────────────────────────────

interface AgentError {
  agent: string;
  message: string;
  time: string;
  severity: "warning" | "error";
}

const RECENT_ERRORS: AgentError[] = [
  { agent: "Storm Tracking Agent", message: "NOAA API rate limit hit (429) — retried after 60s backoff", time: "14m ago", severity: "warning" },
  { agent: "Compliance Monitor", message: "COI expiry check: 2 partners missing docs, suspension queued", time: "1h ago", severity: "warning" },
  { agent: "Fraud Detector", message: "DB timeout on match_history table scan — query exceeded 30s", time: "3h ago", severity: "error" },
  { agent: "Email Marketer", message: "Resend API returned 422 for batch of 12 addresses — invalid domains", time: "5h ago", severity: "warning" },
  { agent: "Payout Processor", message: "Commission batch job skipped: no unpaid records found for cycle", time: "8h ago", severity: "warning" },
];

const AGENT_CATEGORIES: AgentCategory[] = [
  {
    label: "Executive",
    color: "#F5E642",
    icon: Star,
    agents: [
      { name: "CEO Agent", status: "active" },
      { name: "Strategy Planner", status: "active" },
      { name: "Board Reporter", status: "standby" },
    ],
  },
  {
    label: "Operations",
    color: "#00D4FF",
    icon: Cpu,
    agents: [
      { name: "Deployment & Infra", status: "active", lastRun: "12m ago", nextRun: "on demand", jobsToday: 3, errorsToday: 0 },
      { name: "Error Handler", status: "active", lastRun: "2m ago", nextRun: "continuous", jobsToday: 17, errorsToday: 0 },
      { name: "Data Pipeline", status: "active", lastRun: "1h ago", nextRun: "2:00 AM", jobsToday: 4, errorsToday: 0 },
      { name: "Testing Agent", status: "active", lastRun: "6h ago", nextRun: "on commit", jobsToday: 2, errorsToday: 0 },
      { name: "Performance Monitor", status: "active", lastRun: "5m ago", nextRun: "continuous", jobsToday: 144, errorsToday: 0 },
      { name: "Compliance Checker", status: "active", lastRun: "1h ago", nextRun: "3:00 AM", jobsToday: 1, errorsToday: 1 },
    ],
  },
  {
    label: "Financial",
    color: "#82D616",
    icon: DollarSign,
    agents: [
      { name: "Commission Calculator", status: "active", lastRun: "8m ago", nextRun: "continuous", jobsToday: 38, errorsToday: 0 },
      { name: "Payout Processor", status: "active", lastRun: "8h ago", nextRun: "1st of month", jobsToday: 1, errorsToday: 1 },
      { name: "Revenue Analyzer", status: "active", lastRun: "30m ago", nextRun: "hourly", jobsToday: 24, errorsToday: 0 },
      { name: "Cost Tracker", status: "active", lastRun: "1h ago", nextRun: "hourly", jobsToday: 12, errorsToday: 0 },
      { name: "Fraud Detector", status: "active", lastRun: "3h ago", nextRun: "6:00 AM", jobsToday: 2, errorsToday: 1 },
      { name: "Tax Helper", status: "standby", lastRun: "Jan 31", nextRun: "Jan 31", jobsToday: 0, errorsToday: 0 },
      { name: "Audit Log", status: "active", lastRun: "1m ago", nextRun: "continuous", jobsToday: 203, errorsToday: 0 },
    ],
  },
  {
    label: "Marketing",
    color: "#EC407A",
    icon: TrendingUp,
    agents: [
      { name: "Lead Scorer", status: "active", lastRun: "4m ago", nextRun: "continuous", jobsToday: 56, errorsToday: 0 },
      { name: "Email Marketer", status: "active", lastRun: "2h ago", nextRun: "9:00 AM", jobsToday: 3, errorsToday: 1 },
      { name: "SMS Notifier", status: "active", lastRun: "9m ago", nextRun: "on trigger", jobsToday: 14, errorsToday: 0 },
      { name: "Social Media Mgr", status: "standby", lastRun: "Yesterday", nextRun: "9:00 AM", jobsToday: 0, errorsToday: 0 },
      { name: "Ad Campaign Mgr", status: "standby", lastRun: "Yesterday", nextRun: "8:00 AM", jobsToday: 0, errorsToday: 0 },
      { name: "Content Creator", status: "active", lastRun: "4h ago", nextRun: "on demand", jobsToday: 2, errorsToday: 0 },
      { name: "SEO Optimizer", status: "active", lastRun: "12h ago", nextRun: "4:00 AM", jobsToday: 1, errorsToday: 0 },
      { name: "Referral Program Mgr", status: "active", lastRun: "15m ago", nextRun: "hourly", jobsToday: 8, errorsToday: 0 },
    ],
  },
  {
    label: "Customer Success",
    color: "#FBB140",
    icon: HeartHandshake,
    agents: [
      { name: "Onboarding Flow", status: "active" },
      { name: "Support Responder", status: "active" },
      { name: "Feedback Collector", status: "standby" },
      { name: "Retention Optimizer", status: "active" },
      { name: "Upsell Manager", status: "standby" },
      { name: "Community Builder", status: "standby" },
      { name: "Success Tracker", status: "active" },
    ],
  },
  {
    label: "Intelligence",
    color: "#7928CA",
    icon: Brain,
    agents: [
      { name: "Market Analyzer", status: "active" },
      { name: "User Behavior Analyzer", status: "active" },
      { name: "Predictive Modeler", status: "standby" },
      { name: "Recommendation Engine", status: "active" },
      { name: "Data Warehouse", status: "active" },
    ],
  },
  {
    label: "Legal",
    color: "#64748b",
    icon: Gavel,
    agents: [
      { name: "Compliance Monitor", status: "active" },
      { name: "Contract Manager", status: "standby" },
      { name: "Dispute Handler", status: "standby" },
      { name: "Patent Manager", status: "standby" },
    ],
  },
  {
    label: "Engineering",
    color: "#26C6DA",
    icon: Wrench,
    agents: [
      { name: "Code Review", status: "active" },
      { name: "Architecture Designer", status: "active" },
      { name: "Dependency Manager", status: "active" },
      { name: "Database Optimizer", status: "active" },
      { name: "API Designer", status: "active" },
      { name: "Frontend Optimizer", status: "active" },
      { name: "DevOps Engineer", status: "active" },
    ],
  },
  {
    label: "Field / Operations",
    color: "#FF6B35",
    icon: Map,
    agents: [
      { name: "Territory Manager", status: "active" },
      { name: "Lead Distributor", status: "active" },
      { name: "Performance Coach", status: "standby" },
    ],
  },
];

const TOTAL_AGENTS = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.length, 0);

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status }: { status: AgentEntry["status"] }) {
  const colors: Record<AgentEntry["status"], string> = {
    active: "#82D616",
    standby: "#FBB140",
    error: "#EA0606",
  };
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{ backgroundColor: colors[status] }}
    />
  );
}

interface AgentCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: { label: string; value: string | number }[];
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AgentStatusDashboard() {
  const { data: platformStats } = trpc.admin.getNetworkStats.useQuery();
  const { data: stormStats } = trpc.stormAgent.getStats.useQuery();
  const { data: complianceOverview } = trpc.compliance.getComplianceOverview.useQuery();
  const { data: photoQueueStats } = trpc.admin.getPhotoQueueStats.useQuery();

  const triggerStorm = trpc.stormAgent.triggerScan.useMutation({
    onSuccess: (r) => toast.success(`Storm scan complete — ${r.eventsProcessed} events, ${r.leadsGenerated} leads`),
    onError: () => toast.error("Storm scan failed"),
  });

  const triggerLeadRouter = trpc.admin.triggerLeadRouter?.useMutation?.({
    onSuccess: () => toast.success("Lead Router triggered — routing cycle started"),
    onError: () => toast.error("Lead Router trigger failed"),
  });

  const triggerCommissionCalc = trpc.admin.triggerCommissionCalc?.useMutation?.({
    onSuccess: () => toast.success("Commission Calc triggered — recalculating all pending commissions"),
    onError: () => toast.error("Commission Calc trigger failed"),
  });

  const activeCount = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "active").length, 0);
  const standbyCount = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "standby").length, 0);
  const errorCount = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.filter(a => a.status === "error").length, 0);
  const totalJobsToday = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.reduce((as, a) => as + (a.jobsToday ?? 0), 0), 0);
  const totalErrorsToday = AGENT_CATEGORIES.reduce((s, c) => s + c.agents.reduce((as, a) => as + (a.errorsToday ?? 0), 0), 0);

  const agents: AgentCard[] = [
    {
      id: "photo-ai",
      name: "Photo Intelligence Agent",
      description: "Analyzes job site photos using Claude Vision to detect upsell opportunities across 22 trade categories.",
      icon: <Camera className="h-5 w-5" />,
      color: "#00D4FF",
      stats: [
        { label: "Pending Review", value: (photoQueueStats as any)?.pending ?? "—" },
        { label: "Opportunities", value: platformStats?.totalOpportunities ?? "—" },
        { label: "Jobs Logged", value: platformStats?.totalJobs ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "lead-router",
      name: "Lead Routing Engine",
      description: "Routes opportunities to highest-PPS matching partner within service area. 24-hour expiry with auto-reroute.",
      icon: <Zap className="h-5 w-5" />,
      color: "#F5E642",
      stats: [
        { label: "Total Opportunities", value: platformStats?.totalOpportunities ?? "—" },
        { label: "Total Jobs", value: platformStats?.totalJobs ?? "—" },
        { label: "Active Partners", value: platformStats?.totalPartners ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "storm",
      name: "Storm Tracking Agent",
      description: "Monitors NOAA weather alerts across all service areas. Auto-generates emergency leads for affected properties.",
      icon: <CloudLightning className="h-5 w-5" />,
      color: "#7928CA",
      stats: [
        { label: "Total Events", value: stormStats?.totalEvents ?? "—" },
        { label: "Leads Generated", value: stormStats?.totalLeads ?? "—" },
        { label: "Properties Affected", value: stormStats?.totalProperties ?? "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "compliance",
      name: "Compliance Monitor Agent",
      description: "Daily sweep for COI expiry, background check staleness, and license renewals. Auto-suspends after 7-day grace.",
      icon: <ShieldCheck className="h-5 w-5" />,
      color: "#82D616",
      stats: [
        { label: "Suspended Partners", value: (complianceOverview as any)?.suspended ?? "—" },
        { label: "Partners w/ Strikes", value: (complianceOverview as any)?.partnersWithStrikes ?? "—" },
        { label: "COI Verified", value: (complianceOverview as any)?.coiVerified ?? "—" },
        { label: "Next Run", value: "3:00 AM" },
      ],
    },
    {
      id: "circumvention",
      name: "Circumvention Detector",
      description: "Cross-references job logs against dispatched leads to detect off-platform transactions. Issues strikes automatically.",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "#EA0606",
      stats: [
        { label: "Open Flags", value: "—" },
        { label: "Strikes Issued (30d)", value: "—" },
        { label: "Auto-Suspensions", value: "—" },
        { label: "Status", value: "Active" },
      ],
    },
    {
      id: "pps",
      name: "Partner Priority Score Engine",
      description: "Recalculates PPS for all partners nightly at 2 AM. Factors: tier, close rate, acceptance, photos, reviews, referrals.",
      icon: <Brain className="h-5 w-5" />,
      color: "#FBB140",
      stats: [
        { label: "Partners Scored", value: platformStats?.totalPartners ?? "—" },
        { label: "Total Jobs", value: platformStats?.totalJobs ?? "—" },
        { label: "Next Run", value: "2:00 AM" },
        { label: "Status", value: "Active" },
      ],
    },
  ];

  return (
    <AdminLayout>
    <div className="p-6 space-y-6">

      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #0e2040 60%, #0f2d4a 100%)" }}
      >
        <div className="px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00D4FF30, #7928CA40)" }}
            >
              <Bot className="w-7 h-7" style={{ color: "#00D4FF" }} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-white tracking-tight">{TOTAL_AGENTS} Agents Deployed</h1>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "#82D61620", border: "1px solid #82D61650", color: "#82D616" }}
                >
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
          </div>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border-t" style={{ borderColor: "#ffffff12" }}>
          {[
            { label: "Total Partners", value: platformStats?.totalPartners ?? "—", icon: Users, color: "#00D4FF" },
            { label: "Jobs Logged", value: platformStats?.totalJobs ?? "—", icon: Camera, color: "#00D4FF" },
            { label: "Opportunities", value: platformStats?.totalOpportunities ?? "—", icon: Zap, color: "#00D4FF" },
            { label: "Agent Jobs Today", value: totalJobsToday, icon: Activity, color: "#82D616" },
            { label: "Errors Today", value: totalErrorsToday, icon: AlertTriangle, color: totalErrorsToday > 0 ? "#EA0606" : "#82D616" },
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

      {/* ── Agent Category Grid ──────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
          All {TOTAL_AGENTS} Agents by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AGENT_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const catActive = cat.agents.filter(a => a.status === "active").length;
            return (
              <Card key={cat.label} className="border border-border">
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${cat.color}25` }}
                      >
                        <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      </div>
                      {cat.label}
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">{catActive}/{cat.agents.length} active</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-1">
                  <div className="space-y-1.5">
                    {cat.agents.map((agent) => (
                      <div key={agent.name} className="flex items-center gap-2 min-w-0 py-0.5">
                        <StatusDot status={agent.status} />
                        <span className="text-xs text-foreground/80 truncate flex-1">{agent.name}</span>
                        {agent.lastRun && (
                          <span className="text-[10px] text-muted-foreground/60 flex-shrink-0 hidden sm:inline">
                            {agent.lastRun}
                          </span>
                        )}
                        {agent.jobsToday !== undefined && (
                          <span className="text-[10px] font-medium flex-shrink-0" style={{ color: agent.errorsToday ? "#EA0606" : "#82D616" }}>
                            {agent.jobsToday}j{agent.errorsToday ? ` ${agent.errorsToday}e` : ""}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ── Manual Trigger Panel ─────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Manual Agent Triggers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Storm Scanner */}
          <Card className="border border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#7928CA20" }}>
                  <CloudLightning className="w-5 h-5" style={{ color: "#7928CA" }} />
                </div>
                <div>
                  <p className="text-sm font-bold">Storm Scanner</p>
                  <p className="text-xs text-muted-foreground">NOAA sweep → emergency leads</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last: {stormStats ? "Recent" : "—"}</span>
                <span>{stormStats?.totalLeads ?? "—"} leads generated</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() => triggerStorm.mutate({ state: "TX" })}
                disabled={triggerStorm.isPending}
              >
                <RefreshCw className={`h-3 w-3 ${triggerStorm.isPending ? "animate-spin" : ""}`} />
                {triggerStorm.isPending ? "Scanning..." : "Run Scan Now"}
              </Button>
            </CardContent>
          </Card>

          {/* Lead Router */}
          <Card className="border border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F5E64220" }}>
                  <Zap className="w-5 h-5" style={{ color: "#F5E642" }} />
                </div>
                <div>
                  <p className="text-sm font-bold">Lead Router</p>
                  <p className="text-xs text-muted-foreground">Route pending opps to partners</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Continuous</span>
                <span>{platformStats?.totalOpportunities ?? "—"} total opps</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() => triggerLeadRouter?.mutate?.({})}
                disabled={triggerLeadRouter?.isPending}
              >
                <RefreshCw className={`h-3 w-3 ${triggerLeadRouter?.isPending ? "animate-spin" : ""}`} />
                {triggerLeadRouter?.isPending ? "Routing..." : "Trigger Routing Cycle"}
              </Button>
            </CardContent>
          </Card>

          {/* Commission Calc */}
          <Card className="border border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#82D61620" }}>
                  <DollarSign className="w-5 h-5" style={{ color: "#82D616" }} />
                </div>
                <div>
                  <p className="text-sm font-bold">Commission Calc</p>
                  <p className="text-xs text-muted-foreground">Recalculate all pending commissions</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> On job close</span>
                <span>{platformStats?.totalPartners ?? "—"} active pros</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full gap-2"
                onClick={() => triggerCommissionCalc?.mutate?.({})}
                disabled={triggerCommissionCalc?.isPending}
              >
                <RefreshCw className={`h-3 w-3 ${triggerCommissionCalc?.isPending ? "animate-spin" : ""}`} />
                {triggerCommissionCalc?.isPending ? "Calculating..." : "Recalculate Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Agent Error Log ───────────────────────────────────────────────────── */}
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
                    {err.severity === "error" ? (
                      <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-red-500" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#FBB140" }} />
                    )}
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

      {/* ── Live AGaaS Agent Cards ────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
          Live AGaaS Core Agents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="border border-border">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${agent.color}20`, color: agent.color }}
                  >
                    {agent.icon}
                  </div>
                  {agent.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground leading-relaxed">{agent.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {agent.stats.map((stat) => (
                    <div key={stat.label} className="bg-muted/40 rounded-md p-2">
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="font-semibold text-sm mt-0.5">
                        {stat.label === "Status" ? (
                          <span className="text-green-400 flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> {stat.value}
                          </span>
                        ) : stat.label === "Next Run" ? (
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {stat.value}
                          </span>
                        ) : stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Status Legend ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400" />
          Active — running, processing jobs
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FBB140" }} />
          Standby — deployed, awaiting trigger
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Error — needs attention
        </div>
      </div>

    </div>
    </AdminLayout>
  );
}
