import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";
import {
  D, MetricCard, SectionHeader, DataTable, BarChart,
  DCard, ActivityItem, StatusBadge,
} from "@/components/DashboardShared";
import {
  Bot, Zap, CheckCircle, AlertTriangle, Brain, Camera,
  Mail, DollarSign, Shield, Users, CloudLightning, Clock,
  Activity, ChevronRight, ChevronDown,
} from "lucide-react";

// ─── Agent Definitions ────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Master Controller",
    desc: "Routes tasks, coordinates all sub-agents, manages priorities and escalations.",
    status: "active" as const,
    actionsToday: 847,
    successRate: 99.2,
    lastAction: "Routed 3 leads to Lead Router — 12:02 PM",
    color: D.cyan,
    icon: Brain,
    children: ["photo-ai", "lead-router", "storm-watch", "comms", "finance", "trustypro", "waitlist"],
  },
  {
    id: "photo-ai",
    name: "Photo AI",
    role: "Visual Intelligence",
    desc: "Analyzes job photos to detect damage, estimate scope, and generate lead opportunities.",
    status: "active" as const,
    actionsToday: 284,
    successRate: 97.8,
    lastAction: "Processed 12 photos — 9 opportunities detected — 11:58 AM",
    color: D.purple,
    icon: Camera,
    children: [],
  },
  {
    id: "lead-router",
    name: "Lead Router",
    role: "Opportunity Distributor",
    desc: "Matches detected opportunities to the best-fit verified partner based on tier, ZIP, and category.",
    status: "active" as const,
    actionsToday: 214,
    successRate: 96.3,
    lastAction: "Matched 7 leads to partners — avg response 4.2 min — 11:45 AM",
    color: D.green,
    icon: Zap,
    children: [],
  },
  {
    id: "storm-watch",
    name: "Storm Watch",
    role: "Weather Intelligence",
    desc: "Monitors severe weather events and pre-alerts roofing/exterior partners before storm surge.",
    status: "active" as const,
    actionsToday: 38,
    successRate: 100,
    lastAction: "Hail risk elevated — Frisco/Allen — 14 partners alerted — 11:45 AM",
    color: D.amber,
    icon: CloudLightning,
    children: [],
  },
  {
    id: "comms",
    name: "Comms Agent",
    role: "Communications Manager",
    desc: "Sends automated emails, SMS, and in-app notifications to partners and homeowners.",
    status: "active" as const,
    actionsToday: 412,
    successRate: 98.5,
    lastAction: "Weekly digest sent to 112 partners — 11:30 AM",
    color: D.teal,
    icon: Mail,
    children: [],
  },
  {
    id: "finance",
    name: "Finance Agent",
    role: "Payment Automation",
    desc: "Processes commission calculations, triggers Stripe payouts, and flags disputes.",
    status: "active" as const,
    actionsToday: 67,
    successRate: 99.8,
    lastAction: "Payout batch: $2,140 to 6 partners — 11:30 AM",
    color: D.lime,
    icon: DollarSign,
    children: [],
  },
  {
    id: "trustypro",
    name: "TrustyPro Agent",
    role: "Homeowner Concierge",
    desc: "Processes homeowner photo scans, matches to pros, and manages Home Health Vault data.",
    status: "active" as const,
    actionsToday: 89,
    successRate: 95.4,
    lastAction: "4 new homeowner scans processed — ZIP 75034 — 11:15 AM",
    color: D.pink,
    icon: Shield,
    children: [],
  },
  {
    id: "waitlist",
    name: "Waitlist Agent",
    role: "Growth Automation",
    desc: "Manages waitlist signups, sends confirmation sequences, and segments by type and ZIP.",
    status: "active" as const,
    actionsToday: 134,
    successRate: 99.1,
    lastAction: "4 new signups processed — welcome sequence triggered — 11:00 AM",
    color: D.orange,
    icon: Users,
    children: [],
  },
];

const agentMap = Object.fromEntries(AGENTS.map(a => [a.id, a]));

// ─── Org Chart Node ───────────────────────────────────────────────────────────

function OrgNode({ agentId, onSelect, selectedId, depth = 0 }: {
  agentId: string;
  onSelect: (id: string) => void;
  selectedId: string | null;
  depth?: number;
}) {
  const agent = agentMap[agentId];
  if (!agent) return null;
  const Icon = agent.icon;
  const isSelected = selectedId === agentId;
  const isOrchestrator = depth === 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node */}
      <button
        onClick={() => onSelect(agentId)}
        className="relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl transition-all cursor-pointer"
        style={{
          backgroundColor: isSelected ? `${agent.color}25` : D.card,
          border: `2px solid ${isSelected ? agent.color : D.border}`,
          minWidth: isOrchestrator ? 160 : 120,
          boxShadow: isSelected ? `0 0 20px ${agent.color}40` : "none",
        }}
      >
        {/* Status dot */}
        <div
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border-2 animate-pulse"
          style={{
            backgroundColor: agent.status === "active" ? D.green : D.amber,
            borderColor: D.bg,
          }}
        />
        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: isOrchestrator ? 44 : 36,
            height: isOrchestrator ? 44 : 36,
            background: `linear-gradient(135deg, ${agent.color}30, ${agent.color}60)`,
            color: agent.color,
          }}
        >
          <Icon className={isOrchestrator ? "w-5 h-5" : "w-4 h-4"} />
        </div>
        <p className={`font-bold text-center leading-tight ${isOrchestrator ? "text-sm" : "text-xs"}`} style={{ color: D.text }}>
          {agent.name}
        </p>
        <p className="text-[10px] text-center" style={{ color: D.muted }}>{agent.role}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: D.green }} />
          <span className="text-[10px] font-semibold" style={{ color: D.green }}>{agent.actionsToday} today</span>
        </div>
      </button>

      {/* Children */}
      {agent.children.length > 0 && (
        <>
          {/* Vertical connector */}
          <div className="w-0.5 h-6" style={{ backgroundColor: D.border }} />
          {/* Horizontal bar */}
          <div className="relative flex items-start">
            {agent.children.length > 1 && (
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: D.border }}
              />
            )}
            <div className="flex gap-4">
              {agent.children.map(childId => (
                <div key={childId} className="flex flex-col items-center">
                  <div className="w-0.5 h-6" style={{ backgroundColor: D.border }} />
                  <OrgNode agentId={childId} onSelect={onSelect} selectedId={selectedId} depth={depth + 1} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AIAgentsDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>("orchestrator");
  const selected = selectedId ? agentMap[selectedId] : null;

  const totalActions = AGENTS.reduce((s, a) => s + a.actionsToday, 0);
  const avgSuccess = (AGENTS.reduce((s, a) => s + a.successRate, 0) / AGENTS.length).toFixed(1);

  return (
    <AdminLayout title="AI Agents Dashboard" subtitle="Real-time agent status, org chart, and accountability tracking">
      <div className="p-6 space-y-6 overflow-y-auto" style={{ backgroundColor: D.bg, minHeight: "100%" }}>
        {/* Pre-Launch Banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#00D4FF15", border: "1px solid #00D4FF33" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "#00D4FF" }} />
          <div>
            <span className="text-xs font-bold" style={{ color: "#00D4FF" }}>Pre-Launch Mode</span>
            <span className="text-xs ml-2" style={{ color: "#7B809A" }}>Data shown represents projections and targets. Live metrics will populate after launch.</span>
          </div>
        </div>

        {/* ── KPIs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Actions Today" value={totalActions.toLocaleString()} sub="Across all 8 agents" trend={14.2} color={D.cyan} icon={<Activity className="w-4 h-4" />} />
          <MetricCard label="Avg Success Rate" value={`${avgSuccess}%`} sub="All agents combined" trend={0.4} color={D.green} icon={<CheckCircle className="w-4 h-4" />} />
          <MetricCard label="Active Agents" value="8 / 8" sub="All systems nominal" trend={0} color={D.lime} icon={<Bot className="w-4 h-4" />} />
          <MetricCard label="Automations / Hour" value="~142" sub="Peak: 214 at 11 AM" trend={8.7} color={D.purple} icon={<Zap className="w-4 h-4" />} />
        </div>

        {/* ── Org Chart ── */}
        <DCard>
          <SectionHeader title="Agent Org Chart" subtitle="Click any agent to see details — live status indicators" />
          <div className="overflow-x-auto pb-4">
            <div className="flex justify-center pt-2" style={{ minWidth: 900 }}>
              <OrgNode agentId="orchestrator" onSelect={setSelectedId} selectedId={selectedId} />
            </div>
          </div>
        </DCard>

        {/* ── Agent Detail + Accountability Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Selected Agent Detail */}
          {selected && (
            <DCard style={{ borderColor: `${selected.color}40` }}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${selected.color}30, ${selected.color}60)`, color: selected.color }}
                >
                  <selected.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black" style={{ color: D.text }}>{selected.name}</h3>
                  <p className="text-xs" style={{ color: D.muted }}>{selected.role}</p>
                </div>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: D.muted }}>{selected.desc}</p>
              <div className="space-y-2">
                {[
                  { label: "Status",         value: <StatusBadge status={selected.status} /> },
                  { label: "Actions Today",  value: selected.actionsToday.toLocaleString() },
                  { label: "Success Rate",   value: `${selected.successRate}%` },
                  { label: "Last Action",    value: selected.lastAction },
                ].map(s => (
                  <div key={s.label} className="flex items-start justify-between gap-2 py-1.5" style={{ borderBottom: `1px solid ${D.border}` }}>
                    <span className="text-xs flex-shrink-0" style={{ color: D.muted }}>{s.label}</span>
                    <span className="text-xs font-semibold text-right" style={{ color: D.text }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </DCard>
          )}

          {/* Accountability Grid */}
          <DCard className="lg:col-span-2">
            <SectionHeader title="Agent Accountability" subtitle="All agents — actions and performance today" />
            <DataTable
              accentCol="name"
              columns={[
                { key: "name",    label: "Agent" },
                { key: "role",    label: "Role" },
                { key: "actions", label: "Actions", align: "right" },
                { key: "success", label: "Success%", align: "right" },
                { key: "status",  label: "Status" },
              ]}
              rows={AGENTS.map(a => ({
                name:    a.name,
                role:    a.role,
                actions: a.actionsToday.toLocaleString(),
                success: `${a.successRate}%`,
                status:  <StatusBadge status={a.status} />,
              }))}
            />
          </DCard>
        </div>

        {/* ── Actions Chart + Live Feed ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DCard>
            <SectionHeader title="Actions by Agent" subtitle="Today's automation volume" />
            <BarChart
              data={AGENTS.map(a => ({ label: a.name.split(" ")[0], value: a.actionsToday }))}
              color={D.cyan}
              height={150}
            />
          </DCard>

          <DCard>
            <SectionHeader title="Live Agent Feed" subtitle="Most recent automations" />
            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              {AGENTS.map(a => (
                <ActivityItem
                  key={a.id}
                  time={a.lastAction.split("—").pop()?.trim() ?? ""}
                  type="success"
                  message={`[${a.name}] ${a.lastAction.split("—")[0].trim()}`}
                  icon={<a.icon className="w-3.5 h-3.5" />}
                />
              ))}
            </div>
          </DCard>
        </div>

      </div>
    </AdminLayout>
  );
}
