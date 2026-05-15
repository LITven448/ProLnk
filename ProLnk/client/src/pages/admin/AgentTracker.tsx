import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { T } from "@/components/AdminLayout";
import {
  Bot, Brain, Radar, Shield, Zap, Camera, DollarSign, Mail,
  Users, TrendingUp, AlertTriangle, CheckCircle, Clock, RefreshCw,
  Activity, Eye, MessageSquare, BarChart3, Webhook, CloudLightning,
  ChevronDown, ChevronRight, Circle,
} from "lucide-react";

// ─── Agent Definitions ──────────────────────────────────────────────────────

type AgentStatus = "active" | "idle" | "processing" | "error" | "standby";

interface AgentLog {
  time: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface Agent {
  id: string;
  name: string;
  role: string;
  domain: string;
  icon: React.ElementType;
  color: string;
  status: AgentStatus;
  lastAction: string;
  actionsToday: number;
  successRate: number;
  reportsTo: string | null;
  manages: string[];
  logs: AgentLog[];
}

const STATUS_COLORS: Record<AgentStatus, string> = {
  active:     "#82D616",
  idle:       "#7B809A",
  processing: "#17C1E8",
  error:      "#EA0606",
  standby:    "#FBB140",
};

const STATUS_LABELS: Record<AgentStatus, string> = {
  active:     "Active",
  idle:       "Idle",
  processing: "Processing",
  error:      "Error",
  standby:    "Standby",
};

const AGENTS: Agent[] = [
  {
    id: "orchestrator",
    name: "Head of Operations",
    role: "Chief Operations Agent",
    domain: "Platform-Wide",
    icon: Brain,
    color: "#7928CA",
    status: "active",
    lastAction: "Coordinated photo intake pipeline — 3 jobs queued",
    actionsToday: 142,
    successRate: 99.3,
    reportsTo: null,
    manages: ["photo-ai", "lead-router", "storm-watch", "comms-agent", "finance-agent"],
    logs: [
      { time: "12:01 PM", message: "Dispatched 3 photo analysis tasks to Photo AI", type: "info" },
      { time: "11:58 AM", message: "Lead routing cycle complete — 7 leads distributed", type: "success" },
      { time: "11:45 AM", message: "Storm Watch alert escalated to notification queue", type: "warning" },
      { time: "11:30 AM", message: "Finance reconciliation triggered — 2 payouts pending", type: "info" },
    ],
  },
  {
    id: "photo-ai",
    name: "Photo AI",
    role: "Visual Intelligence Agent",
    domain: "ProLnk + TrustyPro",
    icon: Camera,
    color: "#17C1E8",
    status: "processing",
    lastAction: "Analyzing 3 job photos — HVAC, roofing, landscaping",
    actionsToday: 87,
    successRate: 94.2,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "12:02 PM", message: "Analyzing photo set: job-4821 (HVAC unit, 2 photos)", type: "info" },
      { time: "11:59 AM", message: "Detected: cracked fascia board + gutter separation — routed to Exterior Pro", type: "success" },
      { time: "11:47 AM", message: "Low confidence detection on job-4818 — flagged for manual review", type: "warning" },
      { time: "11:32 AM", message: "Processed 12 photos across 5 jobs — 9 opportunities detected", type: "success" },
    ],
  },
  {
    id: "lead-router",
    name: "Lead Router",
    role: "Opportunity Distribution Agent",
    domain: "ProLnk Residential",
    icon: Zap,
    color: "#FBB140",
    status: "active",
    lastAction: "Matched HVAC opportunity to 2 verified partners in 75034",
    actionsToday: 63,
    successRate: 97.8,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "12:00 PM", message: "Matched opportunity #4821 → 2 HVAC partners in ZIP 75034", type: "success" },
      { time: "11:55 AM", message: "No eligible partners found for ZIP 75013 — expanding radius to 15mi", type: "warning" },
      { time: "11:40 AM", message: "Routed 7 opportunities across 5 service categories", type: "success" },
      { time: "11:20 AM", message: "Partner tier filter applied — Scout partners excluded from $8K+ jobs", type: "info" },
    ],
  },
  {
    id: "storm-watch",
    name: "Storm Watch",
    role: "Predictive Event Agent",
    domain: "ProLnk + TrustyPro",
    icon: CloudLightning,
    color: "#EA0606",
    status: "standby",
    lastAction: "Monitoring NWS feed — no active weather events in DFW",
    actionsToday: 14,
    successRate: 100,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "11:45 AM", message: "NWS alert: Hail risk elevated for Frisco/Allen — pre-alert queued for roofing partners", type: "warning" },
      { time: "10:30 AM", message: "Weather scan complete — no active events in monitored ZIP codes", type: "info" },
      { time: "9:15 AM", message: "Post-storm job surge detected: +34% roofing inquiries in 75035", type: "success" },
      { time: "8:00 AM", message: "Daily weather scan initiated for 47 monitored ZIP codes", type: "info" },
    ],
  },
  {
    id: "comms-agent",
    name: "Comms Agent",
    role: "Communication & Notification Agent",
    domain: "ProLnk + TrustyPro",
    icon: Mail,
    color: "#EC407A",
    status: "active",
    lastAction: "Sent 4 waitlist confirmation emails — 100% delivery",
    actionsToday: 231,
    successRate: 99.1,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "12:01 PM", message: "Sent waitlist confirmation to 4 new homeowner signups", type: "success" },
      { time: "11:50 AM", message: "Partner tier upgrade notification sent to 2 partners", type: "success" },
      { time: "11:30 AM", message: "Weekly digest queued for 147 active partners", type: "info" },
      { time: "11:00 AM", message: "Resend API healthy — all queued messages delivered", type: "success" },
    ],
  },
  {
    id: "finance-agent",
    name: "Finance Agent",
    role: "Commission & Payout Agent",
    domain: "ProLnk Residential",
    icon: DollarSign,
    color: "#82D616",
    status: "idle",
    lastAction: "Reconciled 3 closed jobs — $847 in commissions pending",
    actionsToday: 28,
    successRate: 100,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "11:30 AM", message: "Reconciled job-4811: $412 commission pending for Apex Roofing", type: "info" },
      { time: "11:28 AM", message: "Reconciled job-4809: $285 commission pending for DFW Plumbing", type: "info" },
      { time: "10:45 AM", message: "Payout batch processed — $2,140 disbursed to 6 partners", type: "success" },
      { time: "9:00 AM", message: "Daily commission audit complete — no discrepancies found", type: "success" },
    ],
  },
  {
    id: "trustypro-agent",
    name: "TrustyPro Agent",
    role: "Homeowner Intelligence Agent",
    domain: "TrustyPro",
    icon: Shield,
    color: "#4F46E5",
    status: "active",
    lastAction: "Processed 2 home scan uploads — 14 issues flagged across 100+ categories",
    actionsToday: 41,
    successRate: 96.5,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "11:58 AM", message: "Home scan #HS-221: 14 issues detected — roof, HVAC, exterior", type: "success" },
      { time: "11:40 AM", message: "Homeowner match: 3 verified pros sent to homeowner in 75034", type: "success" },
      { time: "11:15 AM", message: "Home Health Vault updated for 2 homeowners", type: "info" },
      { time: "10:30 AM", message: "Waitlist priority score recalculated for 18 homeowners", type: "info" },
    ],
  },
  {
    id: "waitlist-agent",
    name: "Waitlist Agent",
    role: "Waitlist & Onboarding Agent",
    domain: "ProLnk + TrustyPro",
    icon: Users,
    color: "#26C6DA",
    status: "active",
    lastAction: "Processed 4 new homeowner signups — referral codes generated",
    actionsToday: 19,
    successRate: 100,
    reportsTo: "orchestrator",
    manages: [],
    logs: [
      { time: "12:01 PM", message: "4 new homeowner waitlist signups processed — priority scores assigned", type: "success" },
      { time: "11:30 AM", message: "ZIP density map updated: 75034 now has 23 homeowners on waitlist", type: "info" },
      { time: "10:45 AM", message: "Referral code PARTNER-42 credited: 2 homeowner signups attributed", type: "success" },
      { time: "9:30 AM", message: "Daily waitlist analytics report generated", type: "info" },
    ],
  },
];

// ─── Status Dot ─────────────────────────────────────────────────────────────

function StatusDot({ status, size = 8 }: { status: AgentStatus; size?: number }) {
  const color = STATUS_COLORS[status];
  const isPulsing = status === "active" || status === "processing";
  useEffect(() => { document.title = "Agent Tracker — ProLnk Admin"; }, []);

  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {isPulsing && (
        <span
          className="absolute inline-flex rounded-full opacity-75 animate-ping"
          style={{ width: size, height: size, backgroundColor: color }}
        />
      )}
      <span
        className="relative inline-flex rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </span>
  );
}

// ─── Agent Card ─────────────────────────────────────────────────────────────

function AgentCard({
  agent,
  isSelected,
  onClick,
  isRoot,
}: {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
  isRoot?: boolean;
}) {
  const Icon = agent.icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group focus:outline-none"
    >
      {/* Icon circle */}
      <div
        className="relative flex items-center justify-center rounded-2xl transition-all"
        style={{
          width: isRoot ? 72 : 56,
          height: isRoot ? 72 : 56,
          background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)`,
          border: `2px solid ${isSelected ? agent.color : agent.color + "55"}`,
          boxShadow: isSelected ? `0 0 0 3px ${agent.color}33, 0 8px 24px ${agent.color}33` : "none",
          transform: isSelected ? "scale(1.08)" : "scale(1)",
        }}
      >
        <Icon
          style={{ color: agent.color, width: isRoot ? 28 : 22, height: isRoot ? 28 : 22 }}
        />
        {/* Status dot */}
        <span className="absolute -top-1 -right-1">
          <StatusDot status={agent.status} size={10} />
        </span>
      </div>
      {/* Name */}
      <div className="text-center">
        <p
          className="text-xs font-semibold leading-tight"
          style={{ color: isSelected ? agent.color : T.text, maxWidth: 80 }}
        >
          {agent.name}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>{agent.role.split(" ")[0]}</p>
      </div>
    </button>
  );
}

// ─── Org Chart ──────────────────────────────────────────────────────────────

function OrgChart({
  agents,
  selectedId,
  onSelect,
}: {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const root = agents.find(a => a.reportsTo === null)!;
  const children = agents.filter(a => a.reportsTo === root.id);

  return (
    <div className="flex flex-col items-center gap-0 select-none">
      {/* Root node */}
      <AgentCard
        agent={root}
        isSelected={selectedId === root.id}
        onClick={() => onSelect(root.id)}
        isRoot
      />

      {/* Connector line down */}
      <div style={{ width: 2, height: 28, backgroundColor: T.border }} />

      {/* Horizontal connector bar */}
      <div className="relative flex items-start justify-center" style={{ width: "100%" }}>
        {/* Horizontal line spanning children */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: `calc(50% - ${((children.length - 1) * 120) / 2}px)`,
            width: (children.length - 1) * 120,
            height: 2,
            backgroundColor: T.border,
          }}
        />
        {/* Children */}
        <div className="flex items-start gap-8 flex-wrap justify-center">
          {children.map(child => (
            <div key={child.id} className="flex flex-col items-center gap-0">
              {/* Vertical connector up */}
              <div style={{ width: 2, height: 28, backgroundColor: T.border }} />
              <AgentCard
                agent={child}
                isSelected={selectedId === child.id}
                onClick={() => onSelect(child.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Agent Detail Panel ─────────────────────────────────────────────────────

function AgentDetailPanel({ agent }: { agent: Agent }) {
  const Icon = agent.icon;
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-4 px-5 py-4"
        style={{ background: `linear-gradient(135deg, ${agent.color}11, ${agent.color}22)`, borderBottom: `1px solid ${T.border}` }}
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{ width: 48, height: 48, background: `linear-gradient(135deg, ${agent.color}33, ${agent.color}55)` }}
        >
          <Icon style={{ color: agent.color, width: 22, height: 22 }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold truncate" style={{ color: T.text }}>{agent.name}</h3>
            <StatusDot status={agent.status} size={8} />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[agent.status] + "22", color: STATUS_COLORS[agent.status] }}>
              {STATUS_LABELS[agent.status]}
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: T.muted }}>{agent.role} · {agent.domain}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x" style={{ borderBottom: `1px solid ${T.border}` }}>
        {[
          { label: "Actions Today", value: agent.actionsToday.toLocaleString(), icon: Activity },
          { label: "Success Rate", value: `${agent.successRate}%`, icon: CheckCircle },
          { label: "Reports To", value: agent.reportsTo ? AGENTS.find(a => a.id === agent.reportsTo)?.name ?? "—" : "None (Root)", icon: Users },
        ].map(({ label, value, icon: StatIcon }) => (
          <div key={label} className="flex flex-col items-center justify-center py-3 px-2 text-center">
            <StatIcon className="w-3.5 h-3.5 mb-1" style={{ color: agent.color }} />
            <p className="text-sm font-bold" style={{ color: T.text }}>{value}</p>
            <p className="text-[10px]" style={{ color: T.muted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Last action */}
      <div className="px-5 py-3" style={{ borderBottom: `1px solid ${T.border}` }}>
        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: T.muted }}>Last Action</p>
        <p className="text-sm" style={{ color: T.text }}>{agent.lastAction}</p>
      </div>

      {/* Activity log */}
      <div className="flex-1 overflow-y-auto px-5 py-3">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: T.muted }}>Activity Log</p>
        <div className="space-y-2">
          {agent.logs.map((log, i) => {
            const logColor = log.type === "success" ? "#82D616" : log.type === "warning" ? "#FBB140" : log.type === "error" ? "#EA0606" : T.muted;
            return (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-[10px] font-mono flex-shrink-0 mt-0.5" style={{ color: T.dim }}>{log.time}</span>
                <Circle className="w-1.5 h-1.5 flex-shrink-0 mt-1.5" style={{ color: logColor, fill: logColor }} />
                <p className="text-xs leading-relaxed" style={{ color: T.text }}>{log.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Accountability Chart (flat grid) ───────────────────────────────────────

function AccountabilityChart({
  agents,
  selectedId,
  onSelect,
}: {
  agents: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {agents.map(agent => {
        const Icon = agent.icon;
        const isSelected = selectedId === agent.id;
        return (
          <button
            key={agent.id}
            onClick={() => onSelect(agent.id)}
            className="flex flex-col gap-3 p-4 rounded-2xl text-left transition-all focus:outline-none"
            style={{
              backgroundColor: isSelected ? agent.color + "11" : T.surface,
              border: `1.5px solid ${isSelected ? agent.color : T.border}`,
              boxShadow: isSelected ? `0 4px 16px ${agent.color}22` : "none",
            }}
          >
            {/* Icon + status */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${agent.color}22, ${agent.color}44)` }}
              >
                <Icon style={{ color: agent.color, width: 18, height: 18 }} />
              </div>
              <div className="flex items-center gap-1.5">
                <StatusDot status={agent.status} size={7} />
                <span className="text-[10px] font-semibold" style={{ color: STATUS_COLORS[agent.status] }}>
                  {STATUS_LABELS[agent.status]}
                </span>
              </div>
            </div>
            {/* Name + role */}
            <div>
              <p className="text-sm font-semibold leading-tight" style={{ color: T.text }}>{agent.name}</p>
              <p className="text-[11px] mt-0.5" style={{ color: T.muted }}>{agent.role}</p>
            </div>
            {/* Stats */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold" style={{ color: T.text }}>{agent.actionsToday}</p>
                <p className="text-[10px]" style={{ color: T.muted }}>Actions today</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold" style={{ color: agent.successRate >= 98 ? "#82D616" : agent.successRate >= 90 ? "#FBB140" : "#EA0606" }}>
                  {agent.successRate}%
                </p>
                <p className="text-[10px]" style={{ color: T.muted }}>Success</p>
              </div>
            </div>
            {/* Last action */}
            <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: T.muted }}>
              {agent.lastAction}
            </p>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AgentTracker() {
  const [selectedId, setSelectedId] = useState<string | null>("orchestrator");
  const [view, setView] = useState<"org" | "grid">("org");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [agents, setAgents] = useState<Agent[]>(AGENTS);

  // Simulate live status refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // Rotate statuses slightly to simulate live activity
      setAgents(prev => prev.map(a => ({
        ...a,
        actionsToday: a.actionsToday + Math.floor(Math.random() * 3),
      })));
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const selectedAgent = agents.find(a => a.id === selectedId) ?? null;

  const activeCount    = agents.filter(a => a.status === "active").length;
  const processingCount = agents.filter(a => a.status === "processing").length;
  const totalActions   = agents.reduce((sum, a) => sum + a.actionsToday, 0);

  return (
    <AdminLayout title="Agent Tracker" subtitle="Real-time AI agent activity and accountability">
      <div className="p-6 flex flex-col gap-6 min-h-0 overflow-y-auto">

        {/* ── Header Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Agents",    value: agents.length,    color: T.accent,   icon: Bot },
            { label: "Active Now",      value: activeCount + processingCount, color: "#82D616", icon: Activity },
            { label: "Actions Today",   value: totalActions.toLocaleString(), color: "#FBB140", icon: Zap },
            { label: "Avg Success Rate", value: `${(agents.reduce((s, a) => s + a.successRate, 0) / agents.length).toFixed(1)}%`, color: "#7928CA", icon: TrendingUp },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${color}22, ${color}44)` }}
              >
                <Icon style={{ color, width: 18, height: 18 }} />
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: T.text }}>{value}</p>
                <p className="text-xs" style={{ color: T.muted }}>{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── View Toggle + Refresh ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: T.bg, border: `1px solid ${T.border}` }}>
            {(["org", "grid"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: view === v ? T.accent : "transparent",
                  color: view === v ? "#FFFFFF" : T.muted,
                }}
              >
                {v === "org" ? "Org Chart" : "Grid View"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: T.muted }}>
            <RefreshCw className="w-3.5 h-3.5" />
            Last refresh: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left: Chart */}
          <div
            className="flex-1 rounded-2xl overflow-auto p-6"
            style={{ backgroundColor: T.surface, border: `1px solid ${T.border}`, minHeight: 400 }}
          >
            <h2 className="text-sm font-bold mb-6" style={{ color: T.text }}>
              {view === "org" ? "Agent Org Chart" : "Agent Accountability Grid"}
            </h2>
            {view === "org" ? (
              <OrgChart agents={agents} selectedId={selectedId} onSelect={setSelectedId} />
            ) : (
              <AccountabilityChart agents={agents} selectedId={selectedId} onSelect={setSelectedId} />
            )}
          </div>

          {/* Right: Detail Panel */}
          <div className="w-full lg:w-80 flex-shrink-0">
            {selectedAgent ? (
              <AgentDetailPanel agent={selectedAgent} />
            ) : (
              <div
                className="flex flex-col items-center justify-center h-64 rounded-2xl"
                style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
              >
                <Bot className="w-8 h-8 mb-3" style={{ color: T.dim }} />
                <p className="text-sm font-medium" style={{ color: T.muted }}>Select an agent to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Legend ── */}
        <div
          className="flex flex-wrap items-center gap-4 px-5 py-3 rounded-2xl"
          style={{ backgroundColor: T.surface, border: `1px solid ${T.border}` }}
        >
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: T.muted }}>Status Legend</span>
          {(Object.entries(STATUS_LABELS) as [AgentStatus, string][]).map(([status, label]) => (
            <div key={status} className="flex items-center gap-1.5">
              <StatusDot status={status} size={8} />
              <span className="text-xs" style={{ color: T.text }}>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
