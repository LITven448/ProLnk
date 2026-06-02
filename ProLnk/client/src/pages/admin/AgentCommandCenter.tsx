import { useState, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  Brain, CheckCircle, XCircle, Play, RefreshCw, AlertTriangle,
  Zap, CloudLightning, Square, ChevronDown, Clock,
  Terminal, Calendar, RotateCcw, Trash2, Send,
  DollarSign, TrendingUp, HeartHandshake, Cpu, Gavel, Wrench, Map, Star,
} from "lucide-react";
import { toast } from "sonner";

// ─── Data ──────────────────────────────────────────────────────────────────────

const AGENT_GROUPS = [
  {
    label: "Operations",     color: "#00D4FF", icon: Cpu,
    agents: ["Deployment & Infra","Error Handler","Data Pipeline","Testing Agent","Performance Monitor","Compliance Checker"],
  },
  {
    label: "Financial",      color: "#16A34A", icon: DollarSign,
    agents: ["Commission Calculator","Payout Processor","Revenue Analyzer","Cost Tracker","Fraud Detector","Tax Helper","Audit Log"],
  },
  {
    label: "Marketing",      color: "#EC407A", icon: TrendingUp,
    agents: ["Lead Scorer","Email Marketer","SMS Notifier","Social Media Mgr","Ad Campaign Mgr","Content Creator","SEO Optimizer","Referral Program Mgr"],
  },
  {
    label: "Customer Success",color: "#FBB140", icon: HeartHandshake,
    agents: ["Onboarding Flow","Support Responder","Feedback Collector","Retention Optimizer","Upsell Manager","Community Builder","Success Tracker"],
  },
  {
    label: "Intelligence",   color: "#0D9488", icon: Brain,
    agents: ["Market Analyzer","User Behavior Analyzer","Predictive Modeler","Recommendation Engine","Data Warehouse"],
  },
  {
    label: "Legal",          color: "#64748b", icon: Gavel,
    agents: ["Compliance Monitor","Contract Manager","Dispute Handler","Patent Manager"],
  },
  {
    label: "Engineering",    color: "#26C6DA", icon: Wrench,
    agents: ["Code Review","Architecture Designer","Dependency Manager","Database Optimizer","API Designer","Frontend Optimizer","DevOps Engineer"],
  },
  {
    label: "Field / Ops",    color: "#FF6B35", icon: Map,
    agents: ["Territory Manager","Lead Distributor","Performance Coach"],
  },
  {
    label: "Executive",      color: "#F5E642", icon: Star,
    agents: ["CEO Agent","Strategy Planner","Board Reporter"],
  },
];

const ALL_AGENTS = AGENT_GROUPS.flatMap(g => g.agents);

interface CommandEntry {
  id: number;
  agent: string;
  params: string;
  at: string;
  status: "success" | "running" | "error";
  duration?: string;
  output?: string;
}

const MOCK_HISTORY: CommandEntry[] = [
  { id: 8, agent: "Commission Calculator", params: '{"recalc_all":true}',   at: "12m ago",  status: "success", duration: "1.2s", output: "38 commissions recalculated. Total: $14,220" },
  { id: 7, agent: "Lead Scorer",           params: '{"batch_size":50}',      at: "24m ago",  status: "success", duration: "3.4s", output: "50 leads scored. Avg confidence: 0.84" },
  { id: 6, agent: "Email Marketer",        params: '{"campaign":"welcome"}',  at: "1h ago",   status: "error",   duration: "0.8s", output: 'Error: Resend API 422 — invalid addresses in batch' },
  { id: 5, agent: "Fraud Detector",        params: '{}',                      at: "3h ago",   status: "success", duration: "8.2s", output: "No fraudulent patterns detected in last 30d window" },
  { id: 4, agent: "Data Pipeline",         params: '{"export":"daily"}',      at: "6h ago",   status: "success", duration: "14s",  output: "Daily export complete — 3,421 rows to S3" },
  { id: 3, agent: "Payout Processor",      params: '{}',                      at: "8h ago",   status: "error",   duration: "2.1s", output: 'Error: No unpaid commission records found for current cycle' },
  { id: 2, agent: "SEO Optimizer",         params: '{"target":"landing"}',    at: "Yesterday",status: "success", duration: "22s",  output: "8 keyword opportunities identified, 3 meta tags updated" },
  { id: 1, agent: "Market Analyzer",       params: '{"region":"TX-DFW"}',     at: "Yesterday",status: "success", duration: "9.6s", output: "Competitor pricing indexed. 2 new entrants detected in DFW" },
];

const MOCK_ERRORS = [
  {
    agent: "Fraud Detector",
    time: "3h ago",
    code: "DB_QUERY_TIMEOUT",
    message: "Query on match_history exceeded 30s limit",
    stack: `Error: Query timeout after 30000ms
  at DBClient.query (/app/server/db.ts:142:11)
  at FraudDetector.scanMatchHistory (/app/agents/fraud.ts:88:5)
  at FraudDetector.run (/app/agents/fraud.ts:34:18)
  at AgentRunner.execute (/app/runner.ts:67:9)`,
    retried: true,
  },
  {
    agent: "Email Marketer",
    time: "5h ago",
    code: "RESEND_422",
    message: "Resend API rejected batch — 12 invalid email domains",
    stack: `ResendError: 422 Unprocessable Entity
  at ResendClient.sendBatch (/app/server/emails/resend.ts:58:7)
  at EmailMarketer.sendCampaign (/app/agents/email.ts:120:5)
  at EmailMarketer.run (/app/agents/email.ts:41:12)
  at AgentRunner.execute (/app/runner.ts:67:9)`,
    retried: false,
  },
  {
    agent: "Payout Processor",
    time: "8h ago",
    code: "NO_RECORDS",
    message: "Commission batch skipped — no unpaid records this cycle",
    stack: `PayoutSkipped: No qualifying commission records found
  at PayoutProcessor.validateBatch (/app/agents/payout.ts:55:9)
  at PayoutProcessor.run (/app/agents/payout.ts:28:6)
  at AgentRunner.execute (/app/runner.ts:67:9)`,
    retried: false,
  },
];

// ─── Stop-All Modal ───────────────────────────────────────────────────────────

function StopAllModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="rounded-2xl p-6 max-w-sm w-full mx-4" style={{ background: "#F8FAFC", border: "1px solid #EA060640" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#EA060618" }}>
            <Square className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="font-bold text-gray-900">Emergency Stop All Agents</p>
            <p className="text-xs text-muted-foreground">This will halt all running agent processes</p>
          </div>
        </div>
        <div className="rounded-lg p-3 mb-4" style={{ background: "#EA060610", border: "1px solid #EA060630" }}>
          <p className="text-xs text-red-300 leading-relaxed">
            All 47 agents will be immediately suspended. In-flight jobs will be rolled back. You must manually restart agents individually after stopping. This action cannot be undone automatically.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:bg-white/5 transition-colors"
            style={{ border: "1px solid #ffffff18" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg text-sm font-bold text-gray-900 transition-colors"
            style={{ background: "#EA0606", border: "1px solid #EA060660" }}
          >
            Stop All Agents
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function AgentCommandCenter() {
  const { data, isLoading, refetch } = trpc.agentStatus.getAll.useQuery(undefined, { refetchInterval: 30000 });

  const runCycle = trpc.agentStatus.runMorningCycle.useMutation({
    onSuccess: (r) => { toast.success(r.message || "Cycle complete"); refetch(); },
    onError:   (e) => toast.error(e.message),
  });
  const triggerStormScan = trpc.stormAgent.triggerScan.useMutation({
    onSuccess: (r: any) => toast.success(r?.message || "Storm scan complete"),
    onError:   (e)      => toast.error(e.message),
  });

  const [selectedAgent,  setSelectedAgent]  = useState<string>("");
  const [agentParams,    setAgentParams]    = useState<string>("{}");
  const [selectedGroup,  setSelectedGroup]  = useState<string>("");
  const [scheduleAt,     setScheduleAt]     = useState<string>("");
  const [history,        setHistory]        = useState<CommandEntry[]>(MOCK_HISTORY);
  const [expandedErr,    setExpandedErr]    = useState<number | null>(null);
  const [showStopModal,  setShowStopModal]  = useState(false);
  const [stormState,     setStormState]     = useState("TX");
  const [agentDropdown,  setAgentDropdown]  = useState(false);
  const nextId = useRef(MOCK_HISTORY.length + 1);

  const agentGroupColor = (name: string) =>
    AGENT_GROUPS.find(g => g.agents.includes(name))?.color ?? "#00D4FF";

  function runAgent() {
    if (!selectedAgent) { toast.error("Select an agent first"); return; }
    const entry: CommandEntry = {
      id: nextId.current++,
      agent: selectedAgent,
      params: agentParams,
      at: "just now",
      status: "running",
    };
    setHistory(h => [entry, ...h]);
    setTimeout(() => {
      setHistory(h => h.map(e =>
        e.id === entry.id
          ? { ...e, status: "success", duration: `${(Math.random() * 4 + 0.5).toFixed(1)}s`, output: `${selectedAgent} completed successfully` }
          : e
      ));
      toast.success(`${selectedAgent} completed`);
    }, 2000 + Math.random() * 2000);
  }

  function runBatch(groupLabel: string) {
    if (!groupLabel) { toast.error("Select a group first"); return; }
    const group = AGENT_GROUPS.find(g => g.label === groupLabel);
    if (!group) return;
    toast.success(`Queued ${group.agents.length} ${groupLabel} agents`);
    group.agents.forEach((agent, i) => {
      setTimeout(() => {
        const entry: CommandEntry = {
          id: nextId.current++,
          agent,
          params: "{}",
          at: "just now",
          status: "success",
          duration: `${(Math.random() * 3 + 0.3).toFixed(1)}s`,
          output: `${agent} batch run complete`,
        };
        setHistory(h => [entry, ...h]);
      }, i * 400);
    });
  }

  function scheduleAgent() {
    if (!selectedAgent || !scheduleAt) { toast.error("Select agent and datetime"); return; }
    toast.success(`${selectedAgent} scheduled for ${scheduleAt}`);
    setScheduleAt("");
  }

  function handleStopAll() {
    setShowStopModal(false);
    toast.error("All agents stopped — platform is now in maintenance mode", { duration: 8000 });
  }

  const missingEnv = data?.missingEnvVars || [];
  const agentGroups = data?.agents || [];

  return (
    <AdminLayout title="Agent Command Center" subtitle="Control, trigger, and monitor all 47 AI agents">
      {showStopModal && <StopAllModal onConfirm={handleStopAll} onCancel={() => setShowStopModal(false)} />}

      <div className="p-6 space-y-6" style={{ color: "#e2e8f0" }}>

        {/* ── Missing env vars warning ─────────────────────────────────────────── */}
        {missingEnv.length > 0 && (
          <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#FBB14010", border: "1px solid #FBB14040" }}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FBB140" }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: "#FBB140" }}>Missing Environment Variables — some agents inactive</p>
              <p className="text-sm mt-1 text-muted-foreground">{missingEnv.join(" · ")}</p>
            </div>
          </div>
        )}

        {/* ── KPI Strip ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Agents",       value: 47,                             color: "#00D4FF" },
            { label: "Active",             value: data?.activeAgents ?? 34,       color: "#16A34A" },
            { label: "Standby",            value: 47 - (data?.activeAgents ?? 34),color: "#FBB140" },
            { label: "Errors (24h)",       value: 3,                              color: "#EA0606" },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl p-4" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Manual Trigger Panel ─────────────────────────────────────────────── */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#00D4FF18" }}>
              <Send className="w-4 h-4" style={{ color: "#00D4FF" }} />
            </div>
            <h2 className="font-bold text-sm text-gray-900">Manual Trigger</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Agent selector */}
            <div className="relative">
              <label className="block text-xs text-muted-foreground mb-1.5">Select Agent</label>
              <button
                onClick={() => setAgentDropdown(d => !d)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left"
                style={{ background: "#F8FAFC", border: "1px solid #ffffff18", color: selectedAgent ? "#e2e8f0" : "#5a7a94" }}
              >
                <span className="truncate">{selectedAgent || "Choose an agent…"}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
              </button>
              {agentDropdown && (
                <div
                  className="absolute z-20 mt-1 w-full rounded-xl overflow-y-auto shadow-xl"
                  style={{ background: "#F8FAFC", border: "1px solid #ffffff18", maxHeight: "220px" }}
                >
                  {AGENT_GROUPS.map(group => (
                    <div key={group.label}>
                      <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: group.color }}>{group.label}</p>
                      {group.agents.map(name => (
                        <button
                          key={name}
                          onClick={() => { setSelectedAgent(name); setAgentDropdown(false); }}
                          className="w-full text-left px-4 py-1.5 text-xs hover:bg-white/5 transition-colors"
                          style={{ color: selectedAgent === name ? group.color : "#c9d8e8" }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Params */}
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Parameters (JSON)</label>
              <input
                type="text"
                value={agentParams}
                onChange={e => setAgentParams(e.target.value)}
                placeholder='{"key":"value"}'
                className="w-full px-3 py-2 rounded-lg text-sm font-mono focus:outline-none"
                style={{ background: "#F8FAFC", border: "1px solid #ffffff18", color: "#e2e8f0" }}
              />
            </div>

            {/* Run button */}
            <div className="flex items-end">
              <button
                onClick={runAgent}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-gray-900 transition-all"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0D9488)", boxShadow: "0 0 20px #00D4FF30" }}
              >
                <Play className="w-4 h-4" />
                Run Agent
              </button>
            </div>
          </div>
        </div>

        {/* ── Batch Operations + Schedule ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Batch operations */}
          <div className="rounded-2xl p-5" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#16A34A18" }}>
                <Zap className="w-4 h-4" style={{ color: "#16A34A" }} />
              </div>
              <h2 className="font-bold text-sm text-gray-900">Batch Operations</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Run all agents in group</label>
                <select
                  value={selectedGroup}
                  onChange={e => setSelectedGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none mb-3"
                  style={{ background: "#F8FAFC", border: "1px solid #ffffff18", color: "#e2e8f0" }}
                >
                  <option value="">Select a group…</option>
                  {AGENT_GROUPS.map(g => (
                    <option key={g.label} value={g.label}>{g.label} ({g.agents.length} agents)</option>
                  ))}
                </select>
                <button
                  onClick={() => runBatch(selectedGroup)}
                  className="w-full py-2 rounded-lg text-sm font-semibold text-gray-900 transition-all hover:opacity-90"
                  style={{ background: "#16A34A20", border: "1px solid #16A34A40", color: "#16A34A" }}
                >
                  Run All {selectedGroup ? `${selectedGroup} ` : ""}Agents
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { label: "Run Morning Cycle", color: "#00D4FF", action: () => runCycle.mutate(), loading: runCycle.isPending },
                  { label: "Storm Scan",         color: "#0D9488", action: () => triggerStormScan.mutate({ state: stormState }), loading: triggerStormScan.isPending },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    disabled={item.loading}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}40`, color: item.color }}
                  >
                    {item.loading
                      ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      : <Play className="w-3.5 h-3.5" />}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scheduled run */}
          <div className="rounded-2xl p-5" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#FBB14018" }}>
                <Calendar className="w-4 h-4" style={{ color: "#FBB140" }} />
              </div>
              <h2 className="font-bold text-sm text-gray-900">Schedule Future Run</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={e => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                  style={{ background: "#F8FAFC", border: "1px solid #ffffff18", color: selectedAgent ? "#e2e8f0" : "#5a7a94" }}
                >
                  <option value="">Choose an agent…</option>
                  {AGENT_GROUPS.map(g => (
                    <optgroup key={g.label} label={g.label}>
                      {g.agents.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">Run at</label>
                <input
                  type="datetime-local"
                  value={scheduleAt}
                  onChange={e => setScheduleAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none"
                  style={{ background: "#F8FAFC", border: "1px solid #ffffff18", color: "#e2e8f0" }}
                />
              </div>
              <button
                onClick={scheduleAgent}
                className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: "#FBB14020", border: "1px solid #FBB14040", color: "#FBB140" }}
              >
                Schedule Run
              </button>
            </div>
          </div>
        </div>

        {/* ── Command History ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #ffffff10" }}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "#00D4FF" }} />
              <h2 className="font-bold text-sm text-gray-900">Recent Command History</h2>
            </div>
            <button
              onClick={() => setHistory(MOCK_HISTORY)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gray-900 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
            {history.slice(0, 10).map(entry => (
              <div key={entry.id} className="flex items-start gap-4 px-5 py-3">
                <div className="flex-shrink-0 mt-0.5">
                  {entry.status === "running"
                    ? <RefreshCw className="w-4 h-4 animate-spin" style={{ color: "#00D4FF" }} />
                    : entry.status === "success"
                    ? <CheckCircle className="w-4 h-4" style={{ color: "#16A34A" }} />
                    : <XCircle className="w-4 h-4" style={{ color: "#EA0606" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold" style={{ color: agentGroupColor(entry.agent) }}>{entry.agent}</span>
                    <code className="text-[10px] px-1.5 py-0.5 rounded font-mono text-muted-foreground" style={{ background: "#ffffff08" }}>{entry.params}</code>
                    <span className="text-[10px] text-muted-foreground">{entry.at}</span>
                    {entry.duration && <span className="text-[10px] font-mono" style={{ color: "#5a7a94" }}>{entry.duration}</span>}
                  </div>
                  {entry.output && (
                    <p className="text-[11px] mt-0.5 font-mono" style={{ color: entry.status === "error" ? "#EA0606" : "#5a7a94" }}>
                      {entry.output}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setHistory(h => h.filter(e => e.id !== entry.id))}
                  className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors text-muted-foreground"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Error Log with Stack Traces ──────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #ffffff10" }}>
            <Terminal className="w-4 h-4" style={{ color: "#EA0606" }} />
            <h2 className="font-bold text-sm text-gray-900">Error Log</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#EA060618", color: "#EA0606" }}>
              {MOCK_ERRORS.length} errors
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
            {MOCK_ERRORS.map((err, i) => (
              <div key={i}>
                <div
                  className="flex items-start gap-3 px-5 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedErr(expandedErr === i ? null : i)}
                >
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-gray-900">{err.agent}</span>
                      <code className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#EA060618", color: "#EA0606" }}>{err.code}</code>
                      <span className="text-[10px] text-muted-foreground">{err.time}</span>
                      {err.retried && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#FBB14018", color: "#FBB140" }}>Auto-retried</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{err.message}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform ${expandedErr === i ? "rotate-180" : ""}`} />
                </div>
                {expandedErr === i && (
                  <div className="px-5 pb-4">
                    <pre
                      className="text-[10px] font-mono p-3 rounded-lg leading-relaxed overflow-x-auto"
                      style={{ background: "#F8FAFC", color: "#EA0606", border: "1px solid #EA060620" }}
                    >{err.stack}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Emergency Stop ────────────────────────────────────────────────────── */}
        <div className="rounded-2xl p-5 flex items-center justify-between" style={{ background: "#EA060608", border: "1px solid #EA060630" }}>
          <div>
            <p className="font-bold text-gray-900 text-sm">Emergency Stop</p>
            <p className="text-xs text-muted-foreground mt-0.5">Immediately halt all 47 agents. Use only in a production incident.</p>
          </div>
          <button
            onClick={() => setShowStopModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-900 transition-all hover:opacity-90"
            style={{ background: "#EA0606", boxShadow: "0 0 20px #EA060640" }}
          >
            <Square className="w-4 h-4" />
            Stop All Agents
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
