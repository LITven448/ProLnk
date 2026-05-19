import type React from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  TrendingUp, ArrowRight, FlaskConical, MapPin,
  Clock, BarChart2, ChevronRight,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const FUNNEL_STAGES = [
  { label: "Awareness",  count: 2840, pct: 100, color: "#6366f1" },
  { label: "Interest",   count: 847,  pct: 29.8, color: "#8b5cf6" },
  { label: "Applied",    count: 412,  pct: 48.6, color: "#a78bfa" },
  { label: "Approved",   count: 287,  pct: 69.7, color: "#2dd4bf" },
  { label: "Active",     count: 147,  pct: 51.2, color: "#34d399" },
];

const DROPOFF = [
  { transition: "Visits → Waitlist",    from: 2840, to: 847,  cr: 29.8 },
  { transition: "Waitlist → Apply",     from: 847,  to: 412,  cr: 48.6 },
  { transition: "Apply → Approve",      from: 412,  to: 287,  cr: 69.7 },
  { transition: "Approve → Active",     from: 287,  to: 147,  cr: 51.2 },
];

const TRADE_DONUT = [
  { name: "Roofing",    value: 34, color: "#6366f1" },
  { name: "HVAC",       value: 24, color: "#2dd4bf" },
  { name: "Plumbing",   value: 18, color: "#34d399" },
  { name: "Electrical", value: 14, color: "#f59e0b" },
  { name: "Other",      value: 10, color: "#64748b" },
];

const CITIES = [
  { city: "Dallas",    count: 210 },
  { city: "Frisco",    count: 147 },
  { city: "Plano",     count: 134 },
  { city: "McKinney",  count: 112 },
  { city: "Allen",     count: 98  },
];

const EXPERIMENTS = [
  {
    id: "E1",
    name: "Subject Line A/B Test",
    variantA: '"Get early access to ProLnk"',
    variantB: '"Join 500 pros earning with ProLnk"',
    winner: "B",
    lift: "+34% open rate",
    status: "Concluded",
  },
  {
    id: "E2",
    name: "CTA Button Test",
    variantA: '"Sign Up Free"',
    variantB: '"Claim your spot"',
    winner: "B",
    lift: "+18% click-through",
    status: "Concluded",
  },
  {
    id: "E3",
    name: "Landing Page Layout",
    variantA: "Single column",
    variantB: "Side-by-side hero",
    winner: null,
    lift: "—",
    status: "Running",
  },
];

const TIME_TO_ACTIVE = [
  { range: "1–3d",  count: 28 },
  { range: "4–6d",  count: 61 },
  { range: "7–10d", count: 37 },
  { range: "11–14d",count: 14 },
  { range: "15d+",  count: 7  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const crColor = (cr: number) =>
  cr >= 60 ? "#34d399" : cr >= 40 ? "#f59e0b" : "#ef4444";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProspectPipeline() {
  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-teal-400" />
            Prospect Pipeline
          </h1>
          <p className="text-slate-400 mt-1 text-sm">From awareness to active partner</p>
        </div>

        {/* Funnel Visualization */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h2 className="text-white font-semibold text-base mb-5 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-teal-400" />
            Prospect Funnel
          </h2>
          <div className="space-y-3">
            {FUNNEL_STAGES.map((stage, i) => (
              <div key={stage.label} className="flex items-center gap-4">
                <div className="w-24 text-right text-xs font-medium text-slate-400 flex-shrink-0">
                  {stage.label}
                </div>
                <div className="flex-1 relative h-9 flex items-center">
                  <div
                    className="h-full rounded-lg flex items-center px-3 transition-all"
                    style={{
                      width: `${(stage.count / FUNNEL_STAGES[0].count) * 100}%`,
                      background: stage.color + "33",
                      borderLeft: `3px solid ${stage.color}`,
                      minWidth: 80,
                    }}
                  >
                    <span className="text-xs font-bold text-white">{stage.count.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-14 text-right text-xs flex-shrink-0">
                  {i === 0 ? (
                    <span className="text-slate-500">—</span>
                  ) : (
                    <span style={{ color: crColor(stage.pct) }} className="font-semibold">
                      {stage.pct}%
                    </span>
                  )}
                </div>
                {i < FUNNEL_STAGES.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 ml-28">
            <span className="text-xs text-slate-500">Bar width = relative volume</span>
            <span className="text-xs text-slate-500">%  = conversion from prior stage</span>
          </div>
        </div>

        {/* Drop-off Analysis */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-white font-semibold text-base">Drop-Off Analysis</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3">Stage Transition</th>
                  <th className="text-center px-4 py-3">From</th>
                  <th className="text-center px-4 py-3">To</th>
                  <th className="text-center px-4 py-3">Conv. Rate</th>
                  <th className="text-center px-4 py-3">Trend</th>
                  <th className="text-right px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {DROPOFF.map((row) => (
                  <tr key={row.transition} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-3 text-white font-medium">{row.transition}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{row.from.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{row.to.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="text-sm font-bold"
                        style={{ color: crColor(row.cr) }}
                      >
                        {row.cr}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="w-20 mx-auto h-1.5 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${row.cr}%`, background: crColor(row.cr) }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-colors">
                        Improve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Pipeline by Trade — Donut */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-white font-semibold text-base mb-4">Pipeline by Trade</h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={TRADE_DONUT}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {TRADE_DONUT.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                    formatter={(v: number) => [`${v}%`, ""]}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {TRADE_DONUT.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
                    <span className="text-sm text-slate-300 flex-1">{entry.name}</span>
                    <span className="text-sm font-bold text-white">{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline by City */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              Top DFW Cities
            </h2>
            <div className="space-y-3">
              {[...CITIES].sort((a, b) => b.count - a.count).map((city, i) => {
                const maxCount = Math.max(...CITIES.map((c) => c.count));
                return (
                  <div key={city.city} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i < 3 ? "bg-teal-500/20 text-teal-400" : "bg-slate-700 text-slate-400"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="w-20 text-sm text-slate-300 flex-shrink-0">{city.city}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(city.count / maxCount) * 100}%`, background: "#2dd4bf" }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white w-8 text-right">{city.count}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Conversion Experiments */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-white font-semibold text-base flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-purple-400" />
              Conversion Experiments
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-700">
            {EXPERIMENTS.map((exp) => (
              <div key={exp.id} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{exp.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ml-2 ${
                    exp.status === "Running"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-teal-500/20 text-teal-400"
                  }`}>
                    {exp.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs mb-3">
                  <div className={`flex items-start gap-2 p-2 rounded-lg ${exp.winner === "A" ? "bg-teal-500/10 border border-teal-500/20" : "bg-slate-700/40"}`}>
                    <span className="font-bold text-slate-400 flex-shrink-0">A:</span>
                    <span className="text-slate-300">{exp.variantA}</span>
                    {exp.winner === "A" && <span className="ml-auto text-teal-400 font-bold">Winner</span>}
                  </div>
                  <div className={`flex items-start gap-2 p-2 rounded-lg ${exp.winner === "B" ? "bg-teal-500/10 border border-teal-500/20" : "bg-slate-700/40"}`}>
                    <span className="font-bold text-slate-400 flex-shrink-0">B:</span>
                    <span className="text-slate-300">{exp.variantB}</span>
                    {exp.winner === "B" && <span className="ml-auto text-teal-400 font-bold">Winner</span>}
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  Lift: <span className="font-semibold text-white">{exp.lift}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time-to-Active */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-white font-semibold text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Time-to-Active
            </h2>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">6.2 days</div>
              <div className="text-xs text-slate-400">avg from apply to first job</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={TIME_TO_ACTIVE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="range" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }}
                labelStyle={{ color: "#f1f5f9", fontWeight: 600 }}
                itemStyle={{ color: "#94a3b8" }}
                formatter={(v: number) => [v, "Partners"]}
              />
              <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-2">
            <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs text-slate-400">
              48% of partners complete their first job within 6 days of approval
            </span>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
