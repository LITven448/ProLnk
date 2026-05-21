import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Crown, Star, Users, TrendingUp, DollarSign, ChevronRight,
  ArrowUpRight, Award, AlertCircle,
} from "lucide-react";

interface TierConfig {
  id: string;
  label: string;
  capacity: number;
  filled: number;
  color: string;
  bg: string;
  border: string;
  textColor: string;
  rate: string;
  keep: string;
  override: string;
  monthlyRevenue: number;
  icon: typeof Crown;
}

interface TierPerformanceRow {
  tier: string;
  partners: number;
  avgPPS: string;
  avgJobsMo: number;
  avgCommMo: string;
  retention: string;
  color: string;
}

interface TierTransition {
  name: string;
  from: string;
  to: string;
  date: string;
  fromColor: string;
  toColor: string;
}

const TIERS: TierConfig[] = [
  {
    id: "charter",
    label: "Charter",
    capacity: 25,
    filled: 25,
    color: "from-yellow-500 to-amber-600",
    bg: "bg-yellow-900/20",
    border: "border-yellow-600/40",
    textColor: "text-yellow-400",
    rate: "$149/mo locked",
    keep: "72% keep",
    override: "7% depth-1 override",
    monthlyRevenue: 3725,
    icon: Crown,
  },
  {
    id: "founding",
    label: "Founding",
    capacity: 100,
    filled: 98,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-900/20",
    border: "border-blue-600/40",
    textColor: "text-blue-400",
    rate: "$149/mo locked",
    keep: "72% keep",
    override: "4% depth-1 override",
    monthlyRevenue: 14602,
    icon: Star,
  },
  {
    id: "l3",
    label: "L3",
    capacity: 400,
    filled: 312,
    color: "from-teal-500 to-cyan-600",
    bg: "bg-teal-900/20",
    border: "border-teal-600/40",
    textColor: "text-teal-400",
    rate: "$149/mo locked",
    keep: "72% keep",
    override: "2% depth-1 override",
    monthlyRevenue: 46488,
    icon: Users,
  },
  {
    id: "l4",
    label: "L4",
    capacity: 1600,
    filled: 1294,
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-900/20",
    border: "border-purple-600/40",
    textColor: "text-purple-400",
    rate: "$149/mo locked",
    keep: "72% keep",
    override: "1% depth-1 override",
    monthlyRevenue: 192806,
    icon: TrendingUp,
  },
];

const CHART_DATA = [
  { tier: "Charter", subscription: 3725, commission: 8200 },
  { tier: "Founding", subscription: 14602, commission: 29400 },
  { tier: "L3", subscription: 46488, commission: 87300 },
  { tier: "L4", subscription: 192806, commission: 318000 },
];

const PERFORMANCE_ROWS: TierPerformanceRow[] = [
  { tier: "Charter", partners: 25, avgPPS: "4.91", avgJobsMo: 18.4, avgCommMo: "$1,240", retention: "100%", color: "text-yellow-400" },
  { tier: "Founding", partners: 98, avgPPS: "4.85", avgJobsMo: 14.2, avgCommMo: "$890", retention: "97.8%", color: "text-blue-400" },
  { tier: "L3", partners: 312, avgPPS: "4.72", avgJobsMo: 9.8, avgCommMo: "$610", retention: "94.1%", color: "text-teal-400" },
  { tier: "L4", partners: 1294, avgPPS: "4.60", avgJobsMo: 7.1, avgCommMo: "$420", retention: "91.3%", color: "text-purple-400" },
];

const TRANSITIONS: TierTransition[] = [
  { name: "Marcus T.", from: "L4", to: "L3", date: "May 14", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Sarah K.", from: "L4", to: "L3", date: "May 13", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "James W.", from: "L3", to: "Founding", date: "May 12", fromColor: "bg-teal-500/20 text-teal-300", toColor: "bg-blue-500/20 text-blue-300" },
  { name: "Elena R.", from: "L4", to: "L3", date: "May 11", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Carlos M.", from: "L4", to: "L3", date: "May 10", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Patel D.", from: "L3", to: "Founding", date: "May 9", fromColor: "bg-teal-500/20 text-teal-300", toColor: "bg-blue-500/20 text-blue-300" },
  { name: "Kim J.", from: "L4", to: "L3", date: "May 8", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Rivera A.", from: "L4", to: "L3", date: "May 8", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Thompson B.", from: "L4", to: "L3", date: "May 7", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Hassan F.", from: "L3", to: "Founding", date: "May 6", fromColor: "bg-teal-500/20 text-teal-300", toColor: "bg-blue-500/20 text-blue-300" },
  { name: "Okonkwo N.", from: "L4", to: "L3", date: "May 5", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
  { name: "Larson P.", from: "L4", to: "L3", date: "May 4", fromColor: "bg-purple-500/20 text-purple-300", toColor: "bg-teal-500/20 text-teal-300" },
];

const TIER_COLORS: Record<string, string> = {
  Charter: "#f59e0b",
  Founding: "#3b82f6",
  L3: "#14b8a6",
  L4: "#a855f7",
};

export default function TierBreakdownDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "transitions">("overview");

  const totalPartners = TIERS.reduce((s, t) => s + t.filled, 0);
  const totalRevenue = TIERS.reduce((s, t) => s + t.monthlyRevenue, 0);
  const vacantSlots = TIERS.reduce((s, t) => s + (t.capacity - t.filled), 0);

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-sm mb-2">
              <Award className="w-4 h-4" />
              <span>Admin — Tier Management</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Tier Breakdown</h1>
            <p className="text-slate-400 mt-1">Charter / Founding / L3 / L4 distribution</p>
          </div>
          <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
            Recruit to L4
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Summary Strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Active Partners", value: totalPartners.toLocaleString(), icon: Users, color: "text-teal-400" },
            { label: "Total Monthly Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-emerald-400" },
            { label: "Open Slots Remaining", value: vacantSlots.toLocaleString(), icon: AlertCircle, color: "text-orange-400" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl bg-[#111D35] border border-slate-700/50 p-5 text-center">
                <Icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Vacant Slots Alert */}
        <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-700/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            <strong className="text-white">L4 has 306 open spots.</strong>{" "}
            Founding has 2 open spots.{" "}
            <strong className="text-yellow-300">Charter is full.</strong>{" "}
            Recruit aggressively to L4 before the waitlist closes at 500 applications.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            const pct = Math.round((tier.filled / tier.capacity) * 100);
            return (
              <div key={tier.id} className={`rounded-2xl border ${tier.border} ${tier.bg} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{tier.label}</h3>
                      <p className={`text-xs ${tier.textColor}`}>{tier.rate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{tier.filled}/{tier.capacity}</p>
                    <p className="text-xs text-slate-400">{pct}% filled</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${tier.color} transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Model", val: tier.keep },
                    { label: "Override", val: tier.override },
                    { label: "MRR", val: `$${(tier.monthlyRevenue / 1000).toFixed(0)}K` },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-900/40 rounded-lg p-2">
                      <p className={`text-sm font-semibold ${tier.textColor}`}>{item.val}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111D35] p-1 rounded-xl border border-slate-700/50 w-fit">
          {(["overview", "performance", "transitions"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-teal-500 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue by Tier</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={CHART_DATA} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="tier" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                  formatter={(v: number) => `$${v.toLocaleString()}`}
                />
                <Bar dataKey="subscription" name="Subscription MRR" radius={[4, 4, 0, 0]}>
                  {CHART_DATA.map((entry) => (
                    <Cell key={entry.tier} fill={TIER_COLORS[entry.tier]} fillOpacity={0.8} />
                  ))}
                </Bar>
                <Bar dataKey="commission" name="Commission Revenue" radius={[4, 4, 0, 0]} fill="#64748b" fillOpacity={0.4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Performance by Tier</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    {["Tier", "Partners", "Avg PPS", "Avg Jobs/mo", "Avg Comm/mo", "Retention"].map((h) => (
                      <th key={h} className="pb-3 pr-6 text-slate-400 font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERFORMANCE_ROWS.map((row) => (
                    <tr key={row.tier} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                      <td className={`py-3 pr-6 font-semibold ${row.color}`}>{row.tier}</td>
                      <td className="py-3 pr-6 text-slate-200">{(row.partners ?? 0).toLocaleString()}</td>
                      <td className="py-3 pr-6 text-slate-200">{row.avgPPS}</td>
                      <td className="py-3 pr-6 text-slate-200">{row.avgJobsMo}</td>
                      <td className="py-3 pr-6 text-emerald-400 font-medium">{row.avgCommMo}</td>
                      <td className="py-3 pr-6">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          parseFloat(row.retention) >= 97
                            ? "bg-emerald-900/40 text-emerald-300"
                            : parseFloat(row.retention) >= 93
                            ? "bg-yellow-900/40 text-yellow-300"
                            : "bg-red-900/40 text-red-300"
                        }`}>{row.retention}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "transitions" && (
          <div className="rounded-2xl bg-[#111D35] border border-slate-700/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-1">Tier Transitions — Last 30 Days</h3>
            <p className="text-sm text-slate-400 mb-4">12 partners upgraded in the last 30 days</p>
            <div className="space-y-2">
              {TRANSITIONS.map((t, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-slate-800/50">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="flex-1 text-sm text-white">{t.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.fromColor}`}>{t.from}</span>
                  <ArrowUpRight className="w-4 h-4 text-teal-400" />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.toColor}`}>{t.to}</span>
                  <span className="text-xs text-slate-500 w-14 text-right">{t.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
