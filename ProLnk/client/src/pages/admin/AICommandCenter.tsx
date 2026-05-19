import React from 'react';
import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Brain, Zap, Shield, DollarSign, MessageSquare, Camera,
  Navigation, ChevronDown, RefreshCw, Clock, CheckCircle,
  Activity, Database, Server, Play,
} from "lucide-react";

type AgentStatus = "Active" | "Idle" | "Processing";

type Agent = {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  actionsToday: number;
  successRate: number;
  lastAction: string;
  icon: React.ReactNode;
  color: string;
};

type FeedItem = {
  id: number;
  ts: string;
  agent: string;
  message: string;
  type: "info" | "success" | "warn";
};

const AGENTS: Agent[] = [
  {
    id: "photo-ai",
    name: "Photo AI Agent",
    role: "Computer vision & opportunity detection",
    status: "Active",
    actionsToday: 412,
    successRate: 98.6,
    lastAction: "2 min ago",
    icon: <Camera className="w-5 h-5″ />,
    color: "#A855F7″,
  },
  {
    id: "lead-router",
    name: "Lead Router",
    role: "Opportunity matching & assignment",
    status: "Active",
    actionsToday: 287,
    successRate: 99.1,
    lastAction: "< 1 min ago",
    icon: <Navigation className="w-5 h-5″ />,
    color: "#00D4FF",
  },
  {
    id: "storm-intel",
    name: "Storm Intelligence",
    role: "NOAA weather integration & alerts",
    status: "Processing",
    actionsToday: 64,
    successRate: 97.8,
    lastAction: "8 min ago",
    icon: <Zap className="w-5 h-5″ />,
    color: "#FFB300″,
  },
  {
    id: "compliance",
    name: "Compliance Monitor",
    role: "TCPA, CCPA, RESPA enforcement",
    status: "Idle",
    actionsToday: 91,
    successRate: 99.9,
    lastAction: "23 min ago",
    icon: <Shield className="w-5 h-5″ />,
    color: "#00E676″,
  },
  {
    id: "payout-proc",
    name: "Payout Processor",
    role: "Commission calculation & disbursement",
    status: "Idle",
    actionsToday: 38,
    successRate: 99.5,
    lastAction: "41 min ago",
    icon: <DollarSign className="w-5 h-5″ />,
    color: "#F97316″,
  },
  {
    id: "comms-agent",
    name: "Comms Agent",
    role: "Email, SMS, and push notifications",
    status: "Active",
    actionsToday: 1955,
    successRate: 97.3,
    lastAction: "< 1 min ago",
    icon: <MessageSquare className="w-5 h-5″ />,
    color: "#EC4899″,
  },
];

const INITIAL_FEED: FeedItem[] = [
  { id: 1,  ts: "14:32:01″, agent: "Photo AI",    message: "Detected 3 opportunities in job #4821 — HVAC, Foundation, Roofing",      type: "success" },
  { id: 2,  ts: "14:31:47″, agent: "Lead Router", message: "Routed roofing lead #4821-C to partner Martinez (92% match score)",        type: "success" },
  { id: 3,  ts: "14:31:33″, agent: "Comms Agent", message: "Sent match notification SMS to Sarah Martinez (+1-214-555-0182)",           type: "info"    },
  { id: 4,  ts: "14:31:18″, agent: "Photo AI",    message: "Analyzed 5 photos for job #4820 — 1 opportunity detected (Gutters)",       type: "success" },
  { id: 5,  ts: "14:30:55″, agent: "Storm Intel", message: "Hail event detected in ZIP 75201 — escalating to storm lead queue",        type: "warn"    },
  { id: 6,  ts: "14:30:41″, agent: "Lead Router", message: "Re-scored 14 stale leads in Dallas Metro — 3 upgraded to priority",        type: "info"    },
  { id: 7,  ts: "14:30:22″, agent: "Compliance",  message: "Verified TCPA opt-in status for 47 new homeowner contacts",                type: "success" },
  { id: 8,  ts: "14:29:58″, agent: "Photo AI",    message: "Detected 5 opportunities in job #4819 — Plumbing, Electrical, Paint, Deck, AC", type: "success" },
  { id: 9,  ts: "14:29:44″, agent: "Comms Agent", message: "Delivered 28 weekly performance digest emails — 94.2% open rate",          type: "success" },
  { id: 10, ts: "14:29:31″, agent: "Lead Router", message: "Matched HVAC emergency lead to on-call partner Chen (1.2mi radius)",       type: "success" },
  { id: 11, ts: "14:29:17″, agent: "Payout Proc", message: "Calculated $2,841 in commissions for 18 closed jobs — awaiting approval",  type: "info"    },
  { id: 12, ts: "14:28:59″, agent: "Storm Intel", message: "Scanning NOAA feed for ZIP codes 75201–75230 — 0 active alerts",           type: "info"    },
  { id: 13, ts: "14:28:44″, agent: "Photo AI",    message: "Job #4818 photos unclear — flagged for manual review",                     type: "warn"    },
  { id: 14, ts: "14:28:30″, agent: "Comms Agent", message: "Triggered 6 win-back sequences for partners inactive 14+ days",            type: "info"    },
  { id: 15, ts: "14:28:14″, agent: "Compliance",  message: "Flagged 2 messages for RESPA review — held from delivery queue",           type: "warn"    },
  { id: 16, ts: "14:28:00″, agent: "Lead Router", message: "Created 9 new match requests from photo scan batch #482",                  type: "success" },
  { id: 17, ts: "14:27:46″, agent: "Photo AI",    message: "Processed 8 jobs in batch #482 — 22 opportunities flagged",                type: "success" },
  { id: 18, ts: "14:27:31″, agent: "Payout Proc", message: "Monthly payout report ready — $14,280 total, 62 partners",                 type: "success" },
  { id: 19, ts: "14:27:17″, agent: "Comms Agent", message: "Welcome email sequence triggered for 3 newly approved partners",           type: "info"    },
  { id: 20, ts: "14:27:02″, agent: "Storm Intel", message: "Wind advisory in ZIP 76051 — notifying 8 roofing partners in area",        type: "warn"    },
];

const SCAN_OPTIONS = ["Storm Sweep", "Compliance Check", "Lead Re-Score", "Payout Calculation"];

const STATUS_COLORS: Record<AgentStatus, { dot: string; badge: string; text: string }> = {
  Active:     { dot: "#00E676″, badge: "bg-green-500/20",  text: "text-green-400"  },
  Processing: { dot: "#FFB300″, badge: "bg-amber-500/20",  text: "text-amber-400"  },
  Idle:       { dot: "#8B91A8″, badge: "bg-slate-600/40",  text: "text-slate-400"  },
};

const FEED_TYPE_COLORS = {
  success: "text-green-400″,
  warn:    "text-amber-400″,
  info:    "text-slate-400″,
};

export default function AICommandCenter() {
  const [scanOpen, setScanOpen]     = useState(false);
  const [scanning, setScanning]     = useState<string | null>(null);
  const [feed, setFeed]             = useState<FeedItem[]>(INITIAL_FEED);
  const [totalActions, setTotalActions] = useState(2847);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now(),
        ts: new Date().toLocaleTimeString("en-US", { hour12: false }),
        agent: ["Photo AI", "Lead Router", "Comms Agent", "Storm Intel"][Math.floor(Math.random() * 4)],
        message: [
          "Processed new photo batch — 3 opportunities detected",
          "Matched incoming lead to 2 eligible partners",
          "Sent 5 availability nudges to idle partners",
          "NOAA feed scan complete — no active storm events",
        ][Math.floor(Math.random() * 4)],
        type: (["info", "success", "success"] as const)[Math.floor(Math.random() * 3)],
      };
      setFeed(prev => [newItem, ...prev.slice(0, 19)]);
      setTotalActions(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  function runScan(option: string) {
    setScanning(option);
    setScanOpen(false);
    setTimeout(() => setScanning(null), 3200);
  }

  return (
    <AdminLayout>
      <div className="space-y-6 min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3″>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #A855F720, #00D4FF20)", border: "1px solid #A855F740″ }}>
              <Brain className="w-6 h-6″ style={{ color: "#A855F7" }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">AI Command Center</h1>
              <div className="flex items-center gap-2 mt-0.5″>
                <span className="relative flex h-2 w-2″>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75″ style={{ backgroundColor: "#00E676" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2″ style={{ backgroundColor: "#00E676" }} />
                </span>
                <span className="text-sm" style={{ color: "#00E676″ }}>All 47 agents operational</span>
              </div>
            </div>
          </div>

          {/* Manual scan button */}
          <div className="relative">
            <button
              onClick={() => setScanOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg, #A855F720, #00D4FF20)", border: "1px solid #A855F740″, color: "#F0F2FF" }}
            >
              {scanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" style={{ color: "#A855F7″ }} />
                  Running: {scanning}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4″ style={{ color: "#A855F7" }} />
                  Run Manual Scan
                  <ChevronDown className="w-4 h-4″ style={{ color: "#8B91A8" }} />
                </>
              )}
            </button>
            {scanOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-10″ style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}>
                {SCAN_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => runScan(opt)}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5″
                    style={{ color: "#F0F2FF" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Performance metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          {[
            { label: "Total Actions Today", value: totalActions.toLocaleString(), color: "#00D4FF", icon: <Activity className="w-4 h-4″ /> },
            { label: "Success Rate",         value: "98.2%",                       color: "#00E676″, icon: <CheckCircle className="w-4 h-4" /> },
            { label: "Avg Latency",          value: "340ms",                       color: "#A855F7″, icon: <Clock className="w-4 h-4" /> },
            { label: "Opportunities Generated", value: "47″,                       color: "#FFB300", icon: <Zap className="w-4 h-4" /> },
          ].map(m => (
            <div
              key={m.label}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${m.color}08, ${m.color}18)`, border: `1px solid ${m.color}30` }}
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: m.color }} />
              <div className="flex items-center justify-between mb-3″>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#8B91A8″ }}>{m.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${m.color}20`, color: m.color }}>{m.icon}</div>
              </div>
              <p className="text-3xl font-black" style={{ color: "#F0F2FF" }}>{m.value}</p>
            </div>
          ))}
        </div>

        {/* Agent grid + live feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6″>

          {/* Agent cards — 2 col, spans 2 of 3 */}
          <div className="lg:col-span-2 space-y-4″>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#8B91A8″ }}>Active Agents</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4″>
              {AGENTS.map(agent => {
                const st = STATUS_COLORS[agent.status];
                return (
                  <div
                    key={agent.id}
                    className="rounded-2xl p-5 flex flex-col gap-3″
                    style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}
                  >
                    {/* Agent header */}
                    <div className="flex items-start justify-between gap-2″>
                      <div className="flex items-center gap-3″>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0″ style={{ background: `${agent.color}20`, color: agent.color }}>
                          {agent.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: "#F0F2FF" }}>{agent.name}</p>
                          <p className="text-xs mt-0.5″ style={{ color: "#8B91A8" }}>{agent.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0″>
                        {agent.status !== "Idle" && (
                          <span className="relative flex h-2 w-2″>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75″ style={{ backgroundColor: st.dot }} />
                            <span className="relative inline-flex rounded-full h-2 w-2″ style={{ backgroundColor: st.dot }} />
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${st.badge} ${st.text}`}>
                          {agent.status}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3″>
                      <div className="rounded-lg p-2.5″ style={{ background: "#13161E" }}>
                        <p className="text-xs" style={{ color: "#8B91A8″ }}>Actions today</p>
                        <p className="text-lg font-black mt-0.5″ style={{ color: agent.color }}>{agent.actionsToday.toLocaleString()}</p>
                      </div>
                      <div className="rounded-lg p-2.5″ style={{ background: "#13161E" }}>
                        <p className="text-xs" style={{ color: "#8B91A8″ }}>Success rate</p>
                        <p className="text-lg font-black mt-0.5″ style={{ color: "#00E676" }}>{agent.successRate}%</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "#555B72″ }}>Last: {agent.lastAction}</span>
                      <button className="text-xs font-semibold px-3 py-1 rounded-lg transition-colors hover:bg-white/5″ style={{ color: agent.color }}>
                        View Logs
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live feed */}
          <div className="flex flex-col gap-3″>
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#8B91A8″ }}>Live Agent Feed</p>
            <div
              ref={feedRef}
              className="rounded-2xl overflow-hidden flex-1″
              style={{ background: "#1A1E2A", border: "1px solid #252A3A", maxHeight: 640, overflowY: "auto" }}
            >
              {feed.map(item => (
                <div
                  key={item.id}
                  className="px-4 py-3 border-b transition-colors"
                  style={{ borderColor: "#252A3A" }}
                >
                  <div className="flex items-center gap-2 mb-1″>
                    <span className="text-xs font-mono" style={{ color: "#555B72″ }}>{item.ts}</span>
                    <span className="text-xs font-bold" style={{ color: "#A855F7″ }}>[{item.agent}]</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${FEED_TYPE_COLORS[item.type]}`}>{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Memory usage */}
        <div className="rounded-2xl p-6″ style={{ background: "#1A1E2A", border: "1px solid #252A3A" }}>
          <div className="flex items-center gap-2 mb-5″>
            <Database className="w-5 h-5″ style={{ color: "#00D4FF" }} />
            <p className="text-sm font-bold" style={{ color: "#F0F2FF" }}>Memory Usage</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4″>
            {[
              { name: "Qdrant Vector DB",         value: "2,840 vectors", used: 71, color: "#00D4FF",  sub: "Opportunity embeddings" },
              { name: "Mem0 User Memories",        value: "147 memories",  used: 29, color: "#A855F7″,  sub: "Partner preferences & context" },
              { name: "Zep Conversation Histories", value: "84 histories", used: 42, color: "#14B8A6″,  sub: "Active conversation threads" },
            ].map(m => (
              <div key={m.name} className="rounded-xl p-4″ style={{ background: "#13161E", border: "1px solid #252A3A" }}>
                <div className="flex items-center justify-between mb-2″>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#F0F2FF" }}>{m.name}</p>
                    <p className="text-xs mt-0.5″ style={{ color: "#8B91A8" }}>{m.sub}</p>
                  </div>
                  <Server className="w-4 h-4 flex-shrink-0″ style={{ color: m.color }} />
                </div>
                <p className="text-xl font-black mt-2 mb-3″ style={{ color: m.color }}>{m.value}</p>
                <div className="w-full rounded-full h-1.5″ style={{ background: "#252A3A" }}>
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${m.used}%`, backgroundColor: m.color }} />
                </div>
                <p className="text-xs mt-1″ style={{ color: "#555B72" }}>{m.used}% capacity</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
