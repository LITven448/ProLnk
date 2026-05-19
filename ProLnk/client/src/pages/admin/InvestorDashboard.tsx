import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users, Home, DollarSign, TrendingUp, Target, Award,
  ArrowUpRight, ArrowDownRight, CheckCircle, Circle,
  Database, Network, Cpu, Mail,
} from "lucide-react";

const MRR_DATA = [
  { month: "Dec 25″, actual: 8200,  projected: 8200  },
  { month: "Jan 26″, actual: 12400, projected: 12000 },
  { month: "Feb 26″, actual: 17800, projected: 16400 },
  { month: "Mar 26″, actual: 24100, projected: 22100 },
  { month: "Apr 26″, actual: 34000, projected: 29800 },
  { month: "May 26″, actual: null,  projected: 40200 },
  { month: "Jun 26″, actual: null,  projected: 53400 },
  { month: "Jul 26″, actual: null,  projected: 70900 },
];

const METRICS = [
  {
    label: "Partners Active",
    value: "147″,
    sub: "DFW network",
    icon: Users,
    color: "text-teal-400″,
    trend: "+18 this month",
    up: true,
  },
  {
    label: "Homeowners Waitlisted",
    value: "847″,
    sub: "confirmed addresses",
    icon: Home,
    color: "text-blue-400″,
    trend: "+124 this week",
    up: true,
  },
  {
    label: "Monthly Revenue",
    value: "$34K",
    sub: "MRR — May 2026″,
    icon: DollarSign,
    color: "text-green-400″,
    trend: "+$6.2K vs Apr",
    up: true,
  },
  {
    label: "MRR Growth",
    value: "18.2%",
    sub: "month-over-month",
    icon: TrendingUp,
    color: "text-purple-400″,
    trend: "12-month avg: 16.4%",
    up: true,
  },
  {
    label: "Avg LTV",
    value: "$2,847″,
    sub: "per active partner",
    icon: Award,
    color: "text-amber-400″,
    trend: "+7.1% vs last qtr",
    up: true,
  },
  {
    label: "CAC",
    value: "$147″,
    sub: "cost to acquire partner",
    icon: Target,
    color: "text-pink-400″,
    trend: "↓ 9.8% vs last qtr",
    up: false,
  },
];

const UNIT_ECON = [
  { label: "Revenue per partner",     value: "$1,027 / mo" },
  { label: "Gross margin",             value: "86%"         },
  { label: "Payback period",           value: "4.3 months"  },
  { label: "Network effect multiplier",value: "2.3×"        },
];

const MILESTONES = [
  {
    partners: "500″,
    label: "Break-even",
    detail: "Fixed costs covered — ~Jul 2026″,
    done: false,
    progress: 29,
  },
  {
    partners: "1,000″,
    label: "$1M ARR",
    detail: "Seed proof-of-scale — ~Sep 2026″,
    done: false,
    progress: 15,
  },
  {
    partners: "2,125″,
    label: "Founding network full",
    detail: "All charter slots locked — waitlist closes",
    done: false,
    progress: 7,
  },
  {
    partners: "10,000″,
    label: "$10M ARR",
    detail: "Series A target — 2027″,
    done: false,
    progress: 1,
  },
];

const MOAT = [
  {
    icon: Database,
    title: "Home Health Vault Data",
    body: "50M+ US homes. Structural health, maintenance history, appliance records. Data moat grows with every scan — a permanent asset no competitor can replicate.",
    color: "from-teal-500/20 to-teal-900/10 border-teal-500/30″,
    badge: "50M homes",
  },
  {
    icon: Network,
    title: "Network Income Lock-in",
    body: "5-stream income system with 4-level referral cascade makes switching cost prohibitive. Each partner recruits partners — compounding acquisition at near-zero marginal cost.",
    color: "from-purple-500/20 to-purple-900/10 border-purple-500/30″,
    badge: "5 income streams",
  },
  {
    icon: Cpu,
    title: "AI Feedback Loop",
    body: "47 autonomous agents improve match quality continuously. Every job closed feeds the model. Data moat compounds — early mover advantage becomes structural.",
    color: "from-blue-500/20 to-blue-900/10 border-blue-500/30″,
    badge: "47 AI agents",
  },
];

export default function InvestorDashboard() {
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4″>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3″>
              <TrendingUp className="w-8 h-8 text-teal-400″ />
              Investor Dashboard
            </h1>
            <p className="text-slate-400 mt-1 text-sm">ProLnk Platform Metrics — real-time snapshot</p>
          </div>
          <div className="flex items-center gap-3″>
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
              Seed Round 2026
            </span>
            <span className="text-xs text-slate-500″>Updated May 2026</span>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4″>
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredMetric(i)}
                onMouseLeave={() => setHoveredMetric(null)}
                className={`
                  relative bg-[#0f1829] rounded-2xl p-5 border transition-all duration-200 cursor-default
                  ${hoveredMetric === i ? "border-slate-500 shadow-lg shadow-teal-900/20 scale-105″ : "border-slate-700/50"}
                `}
              >
                <div className={`inline-flex p-2 rounded-xl mb-3 bg-slate-800`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <div className={`text-2xl font-black ${m.color} leading-none mb-1`}>{m.value}</div>
                <div className="text-xs text-slate-300 font-semibold mb-1 leading-tight">{m.label}</div>
                <div className="text-[10px] text-slate-500 mb-2 leading-tight">{m.sub}</div>
                <div className={`text-[10px] font-semibold flex items-center gap-0.5 ${m.up ? "text-green-400" : "text-red-400"}`}>
                  {m.up ? <ArrowUpRight className="w-3 h-3″ /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.trend}
                </div>
              </div>
            );
          })}
        </div>

        {/* MRR Growth Chart */}
        <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-6″>
          <div className="flex items-center justify-between mb-6″>
            <div>
              <h2 className="text-lg font-bold text-white">MRR Growth Trajectory</h2>
              <p className="text-xs text-slate-500 mt-0.5″>Actual + 3-month projection</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-teal-400″>
                <span className="w-3 h-0.5 bg-teal-400 rounded-full inline-block" />
                Actual
              </span>
              <span className="flex items-center gap-1.5 text-slate-400″>
                <span className="w-3 h-0.5 bg-slate-400 rounded-full inline-block border-dashed" />
                Projected
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={MRR_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradActual" x1="0″ y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#14b8a6″ stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6″ stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradProj" x1="0″ y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#64748b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3″ stroke="#1e2d45" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false} tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{ background: "#0f1829″, border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#94a3b8″ }}
                formatter={(val: number) => [`$${val?.toLocaleString() ?? "—"}`, ""]}
              />
              <Area type="monotone" dataKey="actual"    stroke="#14b8a6″ strokeWidth={2.5} fill="url(#gradActual)" dot={false} connectNulls={false} />
              <Area type="monotone" dataKey="projected" stroke="#64748b" strokeWidth={1.5} fill="url(#gradProj)"   dot={false} strokeDasharray="4 3″ />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6″>
          {/* Unit Economics */}
          <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-6″>
            <h2 className="text-lg font-bold text-white mb-5″>Unit Economics</h2>
            <div className="space-y-3″>
              {UNIT_ECON.map((row, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0″>
                  <span className="text-sm text-slate-400″>{row.label}</span>
                  <span className="text-sm font-bold text-white">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20″>
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="text-teal-400 font-bold">DFW Market:</span>{" "}
                $2.4B annual home services spend. ProLnk addressable: $480M (20%).
                Current platform capture: 0.007% — early innings.
              </p>
            </div>
          </div>

          {/* Milestone Tracker */}
          <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-6″>
            <h2 className="text-lg font-bold text-white mb-5″>Milestone Tracker</h2>
            <div className="space-y-4″>
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex items-start gap-4″>
                  <div className="mt-0.5″>
                    {m.done
                      ? <CheckCircle className="w-5 h-5 text-teal-400″ />
                      : <Circle className="w-5 h-5 text-slate-600″ />
                    }
                  </div>
                  <div className="flex-1 min-w-0″>
                    <div className="flex items-center justify-between mb-1″>
                      <span className="text-sm font-bold text-white">{m.partners} partners — {m.label}</span>
                      <span className="text-xs text-slate-500″>{m.progress}%</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2″>{m.detail}</p>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-700″
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitive Moat */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4″>Competitive Moat</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4″>
            {MOAT.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className={`rounded-2xl border p-6 bg-gradient-to-br ${card.color}`}>
                  <div className="flex items-start justify-between mb-4″>
                    <Icon className="w-6 h-6 text-white/80″ />
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70 uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2″>{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#0f1829] rounded-2xl border border-slate-700/50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4″>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1″>Investment Inquiries</p>
            <p className="text-white font-bold text-sm">LIT Ventures — Andrew Frakes, CEO</p>
          </div>
          <a
            href="mailto:andrew@lit-ventures.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold transition-colors"
          >
            <Mail className="w-4 h-4″ />
            andrew@lit-ventures.com
          </a>
        </div>

      </div>
    </AdminLayout>
  );
}
