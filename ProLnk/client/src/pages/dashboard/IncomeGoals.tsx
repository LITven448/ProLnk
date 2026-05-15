import { useState } from "react";
import {
  Target, TrendingUp, Plus, Star, Lightbulb, CheckCircle,
  ChevronDown, DollarSign, Users, MapPin,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface Goal {
  id: string;
  label: string;
  category: string;
  period: string;
  target: number;
  current: number;
  color: string;
  exceeded?: boolean;
}

const GOALS: Goal[] = [
  { id: "g1", label: "Monthly Commission Goal", category: "Commission", period: "May 2026", target: 3000, current: 3200, color: "#10B981", exceeded: true },
  { id: "g2", label: "Monthly Passive Income", category: "Network", period: "May 2026", target: 500, current: 247, color: "#00B5B8" },
  { id: "g3", label: "Annual Income Goal", category: "Total", period: "2026 YTD", target: 40000, current: 14847, color: "#8B5CF6" },
];

const CHART_DATA = [
  { month: "Jan", actual: 1840, goal: 3333 },
  { month: "Feb", actual: 2100, goal: 3333 },
  { month: "Mar", actual: 2480, goal: 3333 },
  { month: "Apr", actual: 2950, goal: 3333 },
  { month: "May", actual: 3200, goal: 3333 },
  { month: "Jun", actual: null, goal: 3333 },
  { month: "Jul", actual: null, goal: 3333 },
  { month: "Aug", actual: null, goal: 3333 },
  { month: "Sep", actual: null, goal: 3333 },
  { month: "Oct", actual: null, goal: 3333 },
  { month: "Nov", actual: null, goal: 3333 },
  { month: "Dec", actual: null, goal: 3333 },
];

const TIPS = [
  {
    icon: DollarSign,
    color: "#10B981",
    headline: "2 more jobs to lock in $3K consistently",
    detail: "You hit $3,200 this month. Adding 2 recurring jobs keeps you above target even in slow weeks.",
  },
  {
    icon: Users,
    color: "#00B5B8",
    headline: "Recruit 1 partner → +$70/mo passive",
    detail: "Each active L1 recruit earning avg. $7,000/mo nets you $70/mo in network override at 1%.",
  },
  {
    icon: MapPin,
    color: "#8B5CF6",
    headline: "Expand to ZIP 75070 for more volume",
    detail: "McKinney ZIP 75070 shows 3× lead density vs. your current primary zone. Unlock it in Service Areas.",
  },
];

const PERIODS = ["Monthly", "Quarterly", "Annual"];
const CATEGORIES = ["Commission", "Network", "Total"];

function ProgressRing({ pct, color, size = 96, stroke = 9 }: { pct: number; color: string; size?: number; stroke?: number }) {
  const capped = Math.min(pct, 100);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (capped / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1E3A5F" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.7s ease" }}
      />
    </svg>
  );
}

function fmt(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;
}

export default function IncomeGoals() {
  const [newPeriod, setNewPeriod] = useState("Monthly");
  const [newCategory, setNewCategory] = useState("Commission");
  const [newTarget, setNewTarget] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleAdd() {
    if (!newTarget) return;
    setShowForm(false);
    setNewTarget("");
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white px-4 py-8 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#00B5B8]/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-[#00B5B8]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Income Goals</h1>
            <p className="text-sm text-[#94A3B8]">Set targets, hit them</p>
          </div>
        </div>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {GOALS.map(goal => {
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <div key={goal.id} className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl p-5 flex flex-col items-center text-center">
              <p className="text-sm font-semibold text-[#94A3B8] mb-3">{goal.label}</p>
              <div className="relative mb-3">
                <ProgressRing pct={pct} color={goal.color} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold" style={{ color: goal.color }}>{pct}%</span>
                </div>
              </div>
              <p className="text-lg font-bold mb-0.5">{fmt(goal.current)}</p>
              <p className="text-xs text-[#64748B]">of {fmt(goal.target)} goal</p>
              <p className="text-xs text-[#64748B] mt-0.5">{goal.period}</p>
              {goal.exceeded ? (
                <div className="mt-3 flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-xs font-semibold px-3 py-1 rounded-full border border-[#10B981]/30">
                  <CheckCircle className="w-3.5 h-3.5" /> EXCEEDED
                </div>
              ) : (
                <div className="mt-3 text-xs font-medium px-3 py-1 rounded-full border" style={{ color: goal.color, borderColor: goal.color + "40", background: goal.color + "10" }}>
                  {pct >= 80 ? "On track" : pct >= 50 ? "On pace" : "Needs attention"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Milestone */}
      <div className="bg-gradient-to-r from-[#F59E0B]/10 to-[#0D2137] border border-[#F59E0B]/30 rounded-2xl p-5 mb-8 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
          <Star className="w-5 h-5 text-[#F59E0B]" />
        </div>
        <div>
          <p className="font-semibold">Milestone Reward: Elite Earner</p>
          <p className="text-sm text-[#94A3B8] mt-0.5">Hit $5,000/month to unlock the <span className="text-[#F59E0B] font-semibold">Elite Earner</span> badge + featured partner spotlight on the directory.</p>
        </div>
        <div className="ml-auto text-right hidden sm:block">
          <p className="text-lg font-bold text-[#F59E0B]">$3,200</p>
          <p className="text-xs text-[#64748B]">$1,800 to go</p>
        </div>
      </div>

      {/* Projection Chart */}
      <div className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-[#00B5B8]" />
          <h2 className="font-semibold">2026 Earnings Projection</h2>
          <span className="text-xs text-[#64748B] ml-1">vs. annual goal pace ($3,333/mo)</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={CHART_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradGoal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F" />
            <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{ background: "#0D2137", border: "1px solid #1E3A5F", borderRadius: 12, fontSize: 12 }}
              labelStyle={{ color: "#94A3B8" }}
              formatter={(v: number) => [`$${v?.toLocaleString() ?? "—"}`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
            <Area type="monotone" dataKey="goal" name="Goal Pace" stroke="#8B5CF6" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#gradGoal)" dot={false} />
            <Area type="monotone" dataKey="actual" name="Actual" stroke="#10B981" strokeWidth={2} fill="url(#gradActual)" dot={false} connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
          <h2 className="font-semibold">AI Recommendations</h2>
        </div>
        <div className="space-y-3">
          {TIPS.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div key={i} className="bg-[#0D2137] border border-[#1E3A5F] rounded-xl p-4 flex gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tip.color + "20" }}>
                  <Icon className="w-5 h-5" style={{ color: tip.color }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{tip.headline}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{tip.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Goal */}
      <div className="bg-[#0D2137] border border-[#1E3A5F] rounded-2xl p-5">
        <button
          onClick={() => setShowForm(p => !p)}
          className="flex items-center gap-2 text-[#00B5B8] font-semibold text-sm hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Goal
        </button>
        {showForm && (
          <div className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Period</label>
                <div className="relative">
                  <select value={newPeriod} onChange={e => setNewPeriod(e.target.value)}
                    className="w-full appearance-none bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8] pr-8">
                    {PERIODS.map(p => <option key={p}>{p}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#4B5563] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Category</label>
                <div className="relative">
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
                    className="w-full appearance-none bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8] pr-8">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#4B5563] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Target Amount ($)</label>
              <input type="number" value={newTarget} onChange={e => setNewTarget(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4B5563] focus:outline-none focus:border-[#00B5B8]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">Start Date</label>
                <input type="date" value={newStart} onChange={e => setNewStart(e.target.value)}
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8]" />
              </div>
              <div>
                <label className="block text-xs text-[#94A3B8] mb-1 font-medium">End Date</label>
                <input type="date" value={newEnd} onChange={e => setNewEnd(e.target.value)}
                  className="w-full bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00B5B8]" />
              </div>
            </div>
            <button onClick={handleAdd}
              className="flex items-center gap-2 bg-[#00B5B8] hover:bg-[#009EA1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors">
              <CheckCircle className="w-4 h-4" />
              Save Goal
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
