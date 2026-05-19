import { useState, useMemo } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, DollarSign, Target, Zap, Check, ChevronDown, ChevronUp,
  Plus, Minus,
} from "lucide-react";

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BASE_MONTHLY = 1247;
const BASE_PACE    = 1580;
const SCENARIOS = [
  { id: "jobs",    label: "Add 2 more jobs/month", delta: 624,  color: "#2dd4bf" },
  { id: "recruit", label: "Recruit 3 partners",    delta: 189,  color: "#a78bfa" },
  { id: "tier",    label: "Upgrade tier",          delta: 312,  color: "#fbbf24" },
];

const MILESTONES = [
  { label: "Earn $1,000/mo",   target: 1000,  current: 1247, achieved: true },
  { label: "Earn $2,500/mo",   target: 2500,  current: 1173, achieved: false },
  { label: "Reach Elite Tier", target: 100,   current: 62,   achieved: false, isPercent: true },
  { label: "Earn $10,000/mo",  target: 10000, current: 1247, achieved: false },
];

function buildProjectionData(baseMonthly: number, optimisticBoost: number) {
  const now = new Date();
  const currentMonth = now.getMonth();
  return MONTHS_SHORT.map((m, i) => {
    const offset = (i - currentMonth + 12) % 12;
    const growthBase = baseMonthly * Math.pow(1.025, offset);
    const growthOpt  = (baseMonthly + optimisticBoost) * Math.pow(1.04, offset);
    return {
      month: m,
      Conservative: Math.round(growthBase),
      Optimistic:   Math.round(growthOpt),
    };
  });
}

function buildStreamData(baseMonthly: number, optimisticBoost: number) {
  const now = new Date();
  const currentMonth = now.getMonth();
  return MONTHS_SHORT.map((m, i) => {
    const offset = (i - currentMonth + 12) % 12;
    const factor = Math.pow(1.03, offset);
    const total = (baseMonthly + optimisticBoost * 0.5) * factor;
    return {
      month: m,
      "Direct Commission":    Math.round(total * 0.62),
      "Network Override":     Math.round(total * 0.20),
      "Subscription Override":Math.round(total * 0.18),
    };
  });
}

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${Math.round(n).toLocaleString()}`;
}

export default function EarningsForecast() {
  const [activeScenarios, setActiveScenarios] = useState<Set<string>>(new Set());
  const [showHowTo, setShowHowTo] = useState(false);

  const toggleScenario = (id: string) => {
    setActiveScenarios((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const optimisticBoost = useMemo(
    () => SCENARIOS.filter((s) => activeScenarios.has(s.id)).reduce((sum, s) => sum + s.delta, 0),
    [activeScenarios]
  );

  const projectedMonthly = BASE_PACE + optimisticBoost;
  const projectedAnnual  = projectedMonthly * 12;

  const projectionData = useMemo(
    () => buildProjectionData(BASE_MONTHLY, optimisticBoost),
    [optimisticBoost]
  );

  const streamData = useMemo(
    () => buildStreamData(BASE_MONTHLY, optimisticBoost),
    [optimisticBoost]
  );

  return (
    <PartnerLayout>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-teal-400" />
            Earnings Forecast
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your projected income trajectory</p>
        </div>

        {/* Current Pace Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "This month pace",      value: fmt(BASE_MONTHLY),     icon: DollarSign, color: "text-slate-300" },
            { label: "Projected this month", value: fmt(projectedMonthly), icon: TrendingUp,  color: "text-teal-400" },
            { label: "On track for (annual)",value: fmt(projectedAnnual),  icon: Zap,         color: "text-yellow-400" },
          ].map((c) => (
            <div key={c.label} className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <c.icon className={`w-4 h-4 ${c.color}`} />
                <p className="text-xs text-muted-foreground">{c.label}</p>
              </div>
              <p className={`text-3xl font-black ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* What-if Scenarios */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">What-If Scenarios</p>
          <p className="text-xs text-muted-foreground">Toggle scenarios to see their impact on your projection</p>
          <div className="flex flex-wrap gap-3">
            {SCENARIOS.map((s) => {
              const active = activeScenarios.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleScenario(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    active
                      ? "border-teal-400 bg-teal-400/10 text-white"
                      : "border-slate-600 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {active ? <Minus className="w-3.5 h-3.5 text-teal-400" /> : <Plus className="w-3.5 h-3.5" />}
                  {s.label}
                  <span className={`text-xs font-bold ${active ? "text-teal-400" : "text-slate-500"}`}>
                    +{fmt(s.delta)}/mo
                  </span>
                </button>
              );
            })}
          </div>
          {optimisticBoost > 0 && (
            <div className="bg-teal-400/5 border border-teal-400/20 rounded-xl px-4 py-2.5 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs text-teal-300 font-medium">
                Combined impact: +{fmt(optimisticBoost)}/mo → {fmt(projectedMonthly)}/mo projected
              </span>
            </div>
          )}
        </div>

        {/* 12-Month Projection Chart */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-1">12-Month Projection</p>
          <p className="text-xs text-muted-foreground mb-4">Conservative vs Optimistic trajectory</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={projectionData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradOpt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(v: number, name: string) => [fmt(v), name]}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              <Area type="monotone" dataKey="Conservative" stroke="#64748b" fill="url(#gradCons)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="Optimistic" stroke="#2dd4bf" fill="url(#gradOpt)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stream Breakdown Forecast */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-1">Income Stream Forecast</p>
          <p className="text-xs text-muted-foreground mb-4">12-month stacked breakdown by stream</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={streamData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
              />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "#94a3b8" }}
                formatter={(v: number, name: string) => [fmt(v), name]}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
              <Bar dataKey="Direct Commission"     stackId="a" fill="#2dd4bf" />
              <Bar dataKey="Network Override"      stackId="a" fill="#a78bfa" />
              <Bar dataKey="Subscription Override" stackId="a" fill="#34d399" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone Tracker */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-foreground">Milestone Tracker</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MILESTONES.map((m) => {
              const pct = m.achieved
                ? 100
                : m.isPercent
                ? m.current
                : Math.min(99, Math.round((m.current / m.target) * 100));
              return (
                <div
                  key={m.label}
                  className={`rounded-xl p-4 border ${
                    m.achieved
                      ? "border-teal-400/40 bg-teal-400/5"
                      : "border-slate-700 bg-slate-900/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{m.label}</span>
                    {m.achieved ? (
                      <span className="flex items-center gap-1 text-xs text-teal-400 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Achieved
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">{pct}%</span>
                    )}
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: m.achieved ? "#2dd4bf" : "#6366f1",
                      }}
                    />
                  </div>
                  {!m.achieved && !m.isPercent && (
                    <p className="text-[10px] text-slate-500 mt-1">
                      {fmt(m.current)} of {fmt(m.target)} target
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* How to reach $5K/month */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowHowTo(!showHowTo)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold text-foreground">How to reach $5,000/month</span>
            </div>
            {showHowTo ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {showHowTo && (
            <div className="px-5 pb-5 space-y-3">
              {[
                {
                  step: "1",
                  title: "Increase to 12 jobs/month",
                  impact: "+$2,890/mo",
                  desc: "At your current avg job value, 4 more jobs/month adds $2,890 in direct commission.",
                  color: "text-teal-400",
                },
                {
                  step: "2",
                  title: "Recruit 6 active partners",
                  impact: "+$1,050/mo",
                  desc: "6 partners each earning $2,500/mo generates $1,050 in network overrides.",
                  color: "text-purple-400",
                },
                {
                  step: "3",
                  title: "Earn subscription overrides",
                  impact: "+$107/mo recurring",
                  desc: "6 partners × $149/mo × 12% = $107 in automatic monthly subscription override.",
                  color: "text-green-400",
                },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 bg-slate-900/50 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold">{s.title}</span>
                      <span className={`text-sm font-bold ${s.color}`}>{s.impact}</span>
                    </div>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </PartnerLayout>
  );
}
