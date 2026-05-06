import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout, { T } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Cpu, DollarSign, Megaphone, HeartHandshake, Brain, Scale, Wrench,
  Activity, Zap, ShieldCheck, AlertTriangle, CheckCircle, XCircle,
  ChevronRight, ArrowUpRight, Clock, Eye, RefreshCw, Loader2,
  TrendingUp, TrendingDown, CircleDot, Server, Wifi, WifiOff
} from "lucide-react";

// ── Design tokens ──
const DEPT_COLORS: Record<string, string> = {
  "Operations": "#17C1E8",
  "Revenue & Finance": "#82D616",
  "Marketing & Growth": "#7928CA",
  "Customer Success": "#FBB140",
  "Intelligence & Strategy": "#1A73E8",
  "Legal & Compliance": "#EA0606",
  "Platform & Engineering": "#6B7280",
};

const DEPT_ICONS: Record<string, React.ReactNode> = {
  "Operations": <Cpu className="h-5 w-5" />,
  "Revenue & Finance": <DollarSign className="h-5 w-5" />,
  "Marketing & Growth": <Megaphone className="h-5 w-5" />,
  "Customer Success": <HeartHandshake className="h-5 w-5" />,
  "Intelligence & Strategy": <Brain className="h-5 w-5" />,
  "Legal & Compliance": <Scale className="h-5 w-5" />,
  "Platform & Engineering": <Wrench className="h-5 w-5" />,
};

const TIER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  budget: { bg: "#E8F9FC", text: "#0E7490", label: "Budget" },
  reasoning: { bg: "#EDE9FE", text: "#6D28D9", label: "Reasoning" },
  supreme: { bg: "#FEE2E2", text: "#DC2626", label: "Supreme" },
  vision: { bg: "#DBEAFE", text: "#1D4ED8", label: "Vision" },
};

const STATUS_BADGE: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "#ECFDF5", text: "#059669", dot: "#10B981" },
  idle: { bg: "#F3F4F6", text: "#6B7280", dot: "#9CA3AF" },
  error: { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" },
  suspended: { bg: "#FFF7ED", text: "#D97706", dot: "#F59E0B" },
  disabled: { bg: "#F3F4F6", text: "#9CA3AF", dot: "#D1D5DB" },
};

const TRIGGER_ICONS: Record<string, React.ReactNode> = {
  event: <Zap className="h-3.5 w-3.5 text-amber-500" />,
  schedule: <Clock className="h-3.5 w-3.5 text-blue-500" />,
  on_demand: <Eye className="h-3.5 w-3.5 text-purple-500" />,
};

type Tab = "org" | "financials" | "audit" | "events" | "activity";

export default function AgentCommandCenter() {
  const [activeTab, setActiveTab] = useState<Tab>("org");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const { data: pulse, refetch: refetchPulse } = trpc.commandCenter.getSystemPulse.useQuery();
  const { data: orgData } = trpc.commandCenter.getOrgChart.useQuery();
  const { data: financials } = trpc.commandCenter.getFinancials.useQuery(undefined, { enabled: activeTab === "financials" });
  const { data: auditLog } = trpc.commandCenter.getAuditLog.useQuery({ limit: 50 }, { enabled: activeTab === "audit" });
  const { data: eventFeed } = trpc.commandCenter.getEventFeed.useQuery({ limit: 50 }, { enabled: activeTab === "events" });
  const { data: activityFeed } = trpc.commandCenter.getActivityFeed.useQuery({ limit: 50, offset: 0 }, { enabled: activeTab === "activity" });
  const { data: agentDetail } = trpc.commandCenter.getAgentDetail.useQuery(
    { agentId: selectedAgentId! },
    { enabled: !!selectedAgentId }
  );

  const seedAgents = trpc.commandCenter.seedAgents.useMutation({
    onSuccess: (r) => { toast.success(`Seeded ${r.seeded} agents (${r.total} total)`); refetchPulse(); },
    onError: () => toast.error("Failed to seed agents"),
  });
  const seedDemo = trpc.commandCenter.seedDemoData.useMutation({
    onSuccess: (r) => { toast.success(`Seeded ${r.activityCount} activities, ${r.eventCount} events, ${r.auditCount} rulings, ${r.metricsSeeded} metric rows`); refetchPulse(); },
    onError: () => toast.error("Failed to seed demo data"),
  });

  // Group agents by department
  const agentsByDept = useMemo(() => {
    if (!orgData?.agents) return {};
    const map: Record<string, typeof orgData.agents> = {};
    for (const a of orgData.agents) {
      if (!map[a.department]) map[a.department] = [];
      map[a.department].push(a);
    }
    return map;
  }, [orgData]);

  const cents = (c: number) => `$${(c / 100).toFixed(2)}`;
  const pct = (n: number | string | null) => `${Number(n ?? 0).toFixed(1)}%`;

  return (
    <AdminLayout>
      <div className="space-y-6 pb-12">
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: T.text }}>Agent Command Center</h1>
            <p className="text-sm mt-1" style={{ color: T.muted }}>
              Real-time visibility into all {pulse?.totalAgents ?? 45} autonomous agents
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => seedAgents.mutate()} disabled={seedAgents.isPending}>
              {seedAgents.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Server className="h-4 w-4 mr-1" />}
              Seed Agents
            </Button>
            <Button variant="outline" size="sm" onClick={() => seedDemo.mutate()} disabled={seedDemo.isPending}>
              {seedDemo.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Activity className="h-4 w-4 mr-1" />}
              Seed Demo Data
            </Button>
            <Button variant="outline" size="sm" onClick={() => refetchPulse()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── System Pulse Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <PulseCard icon={<Wifi className="h-5 w-5" />} label="Active Agents" value={`${pulse?.activeAgents ?? 0}/${pulse?.totalAgents ?? 0}`} color={T.green} />
          <PulseCard icon={<AlertTriangle className="h-5 w-5" />} label="Errors" value={String(pulse?.errorAgents ?? 0)} color={pulse?.errorAgents ? T.red : T.green} />
          <PulseCard icon={<DollarSign className="h-5 w-5" />} label="Today's Spend" value={cents(pulse?.todaySpendCents ?? 0)} color={T.accent} />
          <PulseCard icon={<TrendingUp className="h-5 w-5" />} label="Month Spend" value={`${cents(pulse?.monthSpendCents ?? 0)} / ${cents(pulse?.monthBudgetCents ?? 0)}`} color={T.blue} />
          <PulseCard icon={<Scale className="h-5 w-5" />} label="Pending Rulings" value={String(pulse?.pendingDecisions ?? 0)} color={pulse?.pendingDecisions ? T.amber : T.green} />
          <PulseCard icon={<Zap className="h-5 w-5" />} label="Events (1h)" value={String(pulse?.recentEvents ?? 0)} color={T.purple} />
        </div>

        {/* ── Tab Navigation ── */}
        <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "#F0F2F5" }}>
          {([
            { id: "org" as Tab, label: "Org Chart", icon: <Server className="h-4 w-4" /> },
            { id: "financials" as Tab, label: "Financials", icon: <DollarSign className="h-4 w-4" /> },
            { id: "audit" as Tab, label: "Supreme Court", icon: <Scale className="h-4 w-4" /> },
            { id: "events" as Tab, label: "Event Bus", icon: <Zap className="h-4 w-4" /> },
            { id: "activity" as Tab, label: "Activity Feed", icon: <Activity className="h-4 w-4" /> },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedAgentId(null); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{
                backgroundColor: activeTab === tab.id ? "#FFFFFF" : "transparent",
                color: activeTab === tab.id ? T.text : T.muted,
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="flex gap-6">
          {/* Main content */}
          <div className={selectedAgentId ? "flex-1 min-w-0" : "w-full"}>
            {activeTab === "org" && <OrgChartView agentsByDept={agentsByDept} onSelect={setSelectedAgentId} selectedId={selectedAgentId} />}
            {activeTab === "financials" && <FinancialsView data={financials} />}
            {activeTab === "audit" && <AuditView rulings={auditLog ?? []} />}
            {activeTab === "events" && <EventBusView events={eventFeed ?? []} />}
            {activeTab === "activity" && <ActivityFeedView activities={activityFeed ?? []} />}
          </div>

          {/* Agent Detail Slide-in */}
          {selectedAgentId && agentDetail && (
            <div className="w-[420px] flex-shrink-0">
              <AgentDetailPanel data={agentDetail} onClose={() => setSelectedAgentId(null)} />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

function PulseCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <div>
          <p className="text-xs font-medium" style={{ color: T.muted }}>{label}</p>
          <p className="text-base font-bold" style={{ color: T.text }}>{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Org Chart ──
function OrgChartView({ agentsByDept, onSelect, selectedId }: {
  agentsByDept: Record<string, any[]>;
  onSelect: (id: string) => void;
  selectedId: string | null;
}) {
  const deptOrder = ["Operations", "Revenue & Finance", "Marketing & Growth", "Customer Success", "Intelligence & Strategy", "Legal & Compliance", "Platform & Engineering"];

  return (
    <div className="space-y-4">
      {deptOrder.map(dept => {
        const agents = agentsByDept[dept] ?? [];
        if (!agents.length) return null;
        const color = DEPT_COLORS[dept] ?? T.accent;
        const heads = agents.filter((a: any) => !a.parentAgentId);
        const children = agents.filter((a: any) => a.parentAgentId);

        return (
          <Card key={dept} className="border-0 shadow-sm overflow-hidden">
            <div className="px-5 py-3 flex items-center gap-2" style={{ borderLeft: `4px solid ${color}`, backgroundColor: `${color}08` }}>
              <span style={{ color }}>{DEPT_ICONS[dept]}</span>
              <h3 className="font-semibold text-sm" style={{ color: T.text }}>{dept}</h3>
              <Badge variant="outline" className="ml-auto text-xs">{agents.length} agents</Badge>
            </div>
            <CardContent className="p-3">
              {/* Department heads */}
              {heads.map((a: any) => (
                <div key={a.agentId}>
                  <AgentNode agent={a} isHead onSelect={onSelect} isSelected={selectedId === a.agentId} color={color} />
                  {/* Child agents */}
                  <div className="ml-8 pl-4 border-l-2 space-y-0.5" style={{ borderColor: `${color}30` }}>
                    {children.filter((c: any) => c.parentAgentId === a.agentId).map((c: any) => (
                      <AgentNode key={c.agentId} agent={c} isHead={false} onSelect={onSelect} isSelected={selectedId === c.agentId} color={color} />
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function AgentNode({ agent, isHead, onSelect, isSelected, color }: {
  agent: any; isHead: boolean; onSelect: (id: string) => void; isSelected: boolean; color: string;
}) {
  const status = STATUS_BADGE[agent.status] ?? STATUS_BADGE.active;
  const tier = TIER_COLORS[agent.llmTier] ?? TIER_COLORS.budget;
  const trigger = agent.triggerType as string;

  return (
    <button
      onClick={() => onSelect(agent.agentId)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all hover:shadow-sm"
      style={{
        backgroundColor: isSelected ? `${color}10` : "transparent",
        border: isSelected ? `1px solid ${color}40` : "1px solid transparent",
      }}
    >
      {/* Status dot */}
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: status.dot }} />

      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-medium text-sm truncate ${isHead ? "font-semibold" : ""}`} style={{ color: T.text }}>
            {agent.name}
          </span>
          {isHead && <ArrowUpRight className="h-3 w-3 flex-shrink-0" style={{ color }} />}
        </div>
        <p className="text-xs truncate" style={{ color: T.muted }}>{agent.triggerDescription}</p>
      </div>

      {/* Trigger type */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {TRIGGER_ICONS[trigger]}
        <span className="text-xs" style={{ color: T.muted }}>{trigger === "event" ? "Event" : trigger === "schedule" ? "Sched" : "Demand"}</span>
      </div>

      {/* LLM tier badge */}
      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium" style={{ backgroundColor: tier.bg, color: tier.text }}>
        {tier.label}
      </span>

      {/* Spend */}
      <span className="text-xs font-mono flex-shrink-0" style={{ color: T.muted }}>
        ${((agent.currentMonthSpendCents ?? 0) / 100).toFixed(0)}
      </span>

      <ChevronRight className="h-4 w-4 flex-shrink-0" style={{ color: T.dim }} />
    </button>
  );
}

// ── Agent Detail Panel ──
function AgentDetailPanel({ data, onClose }: { data: any; onClose: () => void }) {
  const { agent, activities, metrics, events } = data;
  const status = STATUS_BADGE[agent.status] ?? STATUS_BADGE.active;
  const tier = TIER_COLORS[agent.llmTier] ?? TIER_COLORS.budget;
  const color = DEPT_COLORS[agent.department] ?? T.accent;

  const successCount = activities?.filter((a: any) => a.outcome === "success").length ?? 0;
  const failureCount = activities?.filter((a: any) => a.outcome === "failure").length ?? 0;
  const blockedCount = activities?.filter((a: any) => a.outcome === "blocked").length ?? 0;

  return (
    <Card className="border-0 shadow-lg sticky top-4">
      <div className="px-5 py-4 flex items-start justify-between" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.dot }} />
            <h3 className="font-bold text-lg" style={{ color: T.text }}>{agent.name}</h3>
          </div>
          <p className="text-xs mt-1" style={{ color: T.muted }}>{agent.department}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
      </div>

      <CardContent className="p-5 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Identity */}
        <div className="space-y-2">
          <p className="text-sm" style={{ color: T.text }}>{agent.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: tier.bg, color: tier.text }}>
              🧠 {agent.llmModel}
            </span>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${color}15`, color }}>
              {agent.triggerType === "event" ? "⚡ Event-Driven" : agent.triggerType === "schedule" ? "🕐 Scheduled" : "👆 On-Demand"}
            </span>
          </div>
          <p className="text-xs" style={{ color: T.muted }}>
            <strong>Trigger:</strong> {agent.triggerDescription}
          </p>
        </div>

        {/* Performance Scorecard */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: T.muted }}>Performance Scorecard</h4>
          <div className="grid grid-cols-2 gap-2">
            <MiniStat label="Success Rate" value={`${Number(agent.successRatePercent ?? 100).toFixed(1)}%`} color={Number(agent.successRatePercent ?? 100) >= 90 ? T.green : T.amber} />
            <MiniStat label="Avg Response" value={`${((agent.avgResponseMs ?? 0) / 1000).toFixed(1)}s`} color={T.accent} />
            <MiniStat label="Lifetime Actions" value={String(agent.totalActionsLifetime ?? 0)} color={T.blue} />
            <MiniStat label="Month Spend" value={`$${((agent.currentMonthSpendCents ?? 0) / 100).toFixed(2)}`} color={T.purple} />
          </div>
        </div>

        {/* Wins & Failures */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: T.muted }}>Recent Outcomes</h4>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4" style={{ color: T.green }} />
              <span className="text-sm font-semibold" style={{ color: T.text }}>{successCount}</span>
              <span className="text-xs" style={{ color: T.muted }}>wins</span>
            </div>
            <div className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4" style={{ color: T.red }} />
              <span className="text-sm font-semibold" style={{ color: T.text }}>{failureCount}</span>
              <span className="text-xs" style={{ color: T.muted }}>failures</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" style={{ color: T.amber }} />
              <span className="text-sm font-semibold" style={{ color: T.text }}>{blockedCount}</span>
              <span className="text-xs" style={{ color: T.muted }}>blocked</span>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: T.muted }}>Recent Activity</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {(activities ?? []).slice(0, 15).map((a: any, i: number) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-md" style={{ backgroundColor: a.outcome === "failure" ? "#FEF2F2" : a.outcome === "blocked" ? "#FFF7ED" : "#F9FAFB" }}>
                <div className="mt-0.5">
                  {a.outcome === "success" ? <CheckCircle className="h-3.5 w-3.5" style={{ color: T.green }} /> :
                   a.outcome === "failure" ? <XCircle className="h-3.5 w-3.5" style={{ color: T.red }} /> :
                   a.outcome === "blocked" ? <ShieldCheck className="h-3.5 w-3.5" style={{ color: T.amber }} /> :
                   <Clock className="h-3.5 w-3.5" style={{ color: T.muted }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: T.text }}>{a.action}</p>
                  {a.details && <p className="text-xs mt-0.5" style={{ color: T.muted }}>{a.details}</p>}
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs" style={{ color: T.dim }}>{a.durationMs}ms</span>
                    <span className="text-xs" style={{ color: T.dim }}>${(a.costCents / 100).toFixed(2)}</span>
                    <span className="text-xs" style={{ color: T.dim }}>{a.inputTokens + a.outputTokens} tok</span>
                  </div>
                </div>
              </div>
            ))}
            {(!activities || activities.length === 0) && (
              <p className="text-xs text-center py-4" style={{ color: T.muted }}>No activity recorded yet</p>
            )}
          </div>
        </div>

        {/* Events Published */}
        {events && events.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: T.muted }}>Events Published</h4>
            <div className="space-y-1.5">
              {events.slice(0, 8).map((e: any, i: number) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ backgroundColor: "#F9FAFB" }}>
                  <Zap className="h-3 w-3 flex-shrink-0 text-amber-500" />
                  <span className="text-xs font-mono font-medium" style={{ color: T.text }}>{e.eventType}</span>
                  <span className="text-xs ml-auto" style={{ color: T.dim }}>
                    → {JSON.parse(e.consumedBy || "[]").length} consumers
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${color}10` }}>
      <p className="text-xs" style={{ color: T.muted }}>{label}</p>
      <p className="text-base font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

// ── Financials View ──
function FinancialsView({ data }: { data: any }) {
  if (!data) return <div className="text-center py-12" style={{ color: T.muted }}>Loading financials...</div>;

  return (
    <div className="space-y-4">
      {/* Department Spend */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Spend by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(data.departmentSpend ?? []).map((d: any, i: number) => {
              const pctUsed = d.budget > 0 ? Math.min((Number(d.spend) / Number(d.budget)) * 100, 100) : 0;
              const color = DEPT_COLORS[d.department] ?? T.accent;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span style={{ color }}>{DEPT_ICONS[d.department]}</span>
                      <span className="text-sm font-medium" style={{ color: T.text }}>{d.department}</span>
                      <span className="text-xs" style={{ color: T.muted }}>({d.agentCount} agents)</span>
                    </div>
                    <span className="text-sm font-mono" style={{ color: T.text }}>
                      ${(Number(d.spend) / 100).toFixed(2)} / ${(Number(d.budget) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pctUsed}%`, backgroundColor: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Spenders */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Top 10 Spenders This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {(data.topSpenders ?? []).map((a: any, i: number) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-md" style={{ backgroundColor: i < 3 ? "#FFFBEB" : "#F9FAFB" }}>
                <span className="text-xs font-bold w-5 text-center" style={{ color: i < 3 ? T.amber : T.muted }}>#{i + 1}</span>
                <span className="text-sm font-medium flex-1" style={{ color: T.text }}>{a.name}</span>
                <span className="text-xs" style={{ color: T.muted }}>{a.department}</span>
                <span className="text-sm font-mono font-semibold" style={{ color: T.text }}>${(Number(a.spend) / 100).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Trend */}
      {data.dailyTrend && data.dailyTrend.length > 0 && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Daily Spend Trend (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-32">
              {(data.dailyTrend as any[]).map((d: any, i: number) => {
                const maxSpend = Math.max(...(data.dailyTrend as any[]).map((x: any) => Number(x.spend)));
                const h = maxSpend > 0 ? (Number(d.spend) / maxSpend) * 100 : 0;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group relative">
                    <div className="absolute -top-6 hidden group-hover:block text-xs px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap" style={{ backgroundColor: T.surface, color: T.text, border: `1px solid ${T.border}` }}>
                      {d.date}: ${(Number(d.spend) / 100).toFixed(2)} ({d.actions} actions)
                    </div>
                    <div className="w-full rounded-t transition-all" style={{ height: `${Math.max(h, 2)}%`, backgroundColor: T.accent, opacity: 0.7 }} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── Supreme Court Audit ──
function AuditView({ rulings }: { rulings: any[] }) {
  const rulingColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    approved: { bg: "#ECFDF5", text: "#059669", icon: <CheckCircle className="h-4 w-4" style={{ color: "#059669" }} /> },
    blocked: { bg: "#FEF2F2", text: "#DC2626", icon: <XCircle className="h-4 w-4" style={{ color: "#DC2626" }} /> },
    escalated: { bg: "#FFF7ED", text: "#D97706", icon: <AlertTriangle className="h-4 w-4" style={{ color: "#D97706" }} /> },
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5" style={{ color: T.red }} />
          <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Supreme Court — Governance Audit Log</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {rulings.map((r: any, i: number) => {
            const style = rulingColors[r.ruling] ?? rulingColors.approved;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: style.bg }}>
                <div className="mt-0.5">{style.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: T.text }}>{r.actionAttempted}</span>
                    <Badge variant="outline" className="text-xs" style={{ borderColor: style.text, color: style.text }}>{r.ruling.toUpperCase()}</Badge>
                    <Badge variant="outline" className="text-xs">{r.category}</Badge>
                  </div>
                  <p className="text-xs mt-1" style={{ color: T.muted }}>{r.reason}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs" style={{ color: T.dim }}>Requester: {r.requestingAgentId}</span>
                    <span className="text-xs" style={{ color: T.dim }}>Validator: {r.validatorModel}</span>
                    <span className="text-xs" style={{ color: T.dim }}>Confidence: {Number(r.confidencePercent).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
          {rulings.length === 0 && <p className="text-center py-8 text-sm" style={{ color: T.muted }}>No rulings yet. Seed demo data to populate.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Event Bus View ──
function EventBusView({ events }: { events: any[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Event Bus — Inter-Agent Communication</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {events.map((e: any, i: number) => {
            let consumers: string[] = [];
            try { consumers = JSON.parse(e.consumedBy || "[]"); } catch {}
            let payload: Record<string, unknown> = {};
            try { payload = JSON.parse(e.payload || "{}"); } catch {}

            return (
              <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: "#F9FAFB", border: `1px solid ${T.border}` }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-sm font-mono font-semibold" style={{ color: T.text }}>{e.eventType}</span>
                  <span className="text-xs" style={{ color: T.muted }}>from <strong>{e.publisherAgentId}</strong></span>
                  <span className="text-xs ml-auto" style={{ color: T.dim }}>
                    {new Date(e.createdAt).toLocaleString()}
                  </span>
                </div>
                {consumers.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs" style={{ color: T.muted }}>→</span>
                    {consumers.map((c, j) => (
                      <span key={j} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${T.accent}15`, color: T.accent }}>{c}</span>
                    ))}
                  </div>
                )}
                <div className="mt-1.5 text-xs font-mono p-2 rounded" style={{ backgroundColor: "#F0F2F5", color: T.muted }}>
                  {JSON.stringify(payload, null, 0).slice(0, 200)}
                </div>
              </div>
            );
          })}
          {events.length === 0 && <p className="text-center py-8 text-sm" style={{ color: T.muted }}>No events yet. Seed demo data to populate.</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// ── Activity Feed View ──
function ActivityFeedView({ activities }: { activities: any[] }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5" style={{ color: T.accent }} />
          <CardTitle className="text-sm font-semibold" style={{ color: T.text }}>Global Activity Feed</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {activities.map((a: any, i: number) => (
            <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors">
              <div className="mt-0.5">
                {a.outcome === "success" ? <CheckCircle className="h-4 w-4" style={{ color: T.green }} /> :
                 a.outcome === "failure" ? <XCircle className="h-4 w-4" style={{ color: T.red }} /> :
                 a.outcome === "blocked" ? <ShieldCheck className="h-4 w-4" style={{ color: T.amber }} /> :
                 <Clock className="h-4 w-4" style={{ color: T.muted }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F0F2F5", color: T.accent }}>{a.agentId}</span>
                  <span className="text-sm font-medium truncate" style={{ color: T.text }}>{a.action}</span>
                </div>
                {a.details && <p className="text-xs mt-0.5 truncate" style={{ color: T.muted }}>{a.details}</p>}
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-xs font-mono" style={{ color: T.muted }}>${(a.costCents / 100).toFixed(2)}</span>
                <span className="text-xs" style={{ color: T.dim }}>{a.durationMs}ms</span>
              </div>
            </div>
          ))}
          {activities.length === 0 && <p className="text-center py-8 text-sm" style={{ color: T.muted }}>No activity yet. Seed demo data to populate.</p>}
        </div>
      </CardContent>
    </Card>
  );
}
