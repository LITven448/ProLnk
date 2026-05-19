import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from "recharts";
import {
  DollarSign, TrendingUp, Users, Zap, Award, ArrowUpRight,
} from "lucide-react";

const KPI = [
  { label: "MRR", value: "$34,000″, sub: "Monthly Recurring Revenue", icon: DollarSign, color: "text-teal-400", trend: "↑ 12.4% vs last month" },
  { label: "ARR", value: "$408K", sub: "Annualized Run Rate", icon: TrendingUp, color: "text-green-400″, trend: "↑ 18.2% YoY" },
  { label: "LTV / Partner", value: "$2,847″, sub: "Avg lifetime value", icon: Award, color: "text-purple-400", trend: "↑ 7.1% vs last quarter" },
  { label: "CAC", value: "$147″, sub: "Cost to acquire partner", icon: Zap, color: "text-amber-400", trend: "↓ 9.8% vs last quarter" },
];

const MONTHLY_COMPOSITION = [
  { month: "Dec", commissions: 8200, subscriptions: 5800, media: 1200 },
  { month: "Jan", commissions: 11400, subscriptions: 7200, media: 1600 },
  { month: "Feb", commissions: 14200, subscriptions: 8900, media: 2100 },
  { month: "Mar", commissions: 17800, subscriptions: 10400, media: 2700 },
  { month: "Apr", commissions: 21300, subscriptions: 12100, media: 3200 },
  { month: "May", commissions: 24100, subscriptions: 14800, media: 3900 },
];

const COHORTS = [
  { month: "Feb 2026″, joined: 24, active: 21, churned: 3, monthlyRev: 6480, ltv: 19440 },
  { month: "Mar 2026″, joined: 38, active: 35, churned: 3, monthlyRev: 10710, ltv: 21420 },
  { month: "Apr 2026″, joined: 57, active: 54, churned: 3, monthlyRev: 16524, ltv: 16524 },
  { month: "May 2026″, joined: 81, active: 81, churned: 0, monthlyRev: 24813, ltv: 24813 },
];

const TRADE_REVENUE = [
  { trade: "HVAC", revenue: 61000 },
  { trade: "Roofing", revenue: 52000 },
  { trade: "Plumbing", revenue: 41000 },
  { trade: "Electrical", revenue: 31000 },
  { trade: "General", revenue: 28000 },
];

const TRADE_COLORS = ["#14b8a6″, "#8b5cf6", "#3b82f6", "#f59e0b", "#ec4899"];

const TOP_PARTNERS = [
  { name: "Marcus Rivera", tier: "Founding", jobs: 14, grossValue: 18200, commission: 9100, subscription: 149, total: 9249 },
  { name: "Sarah Kim", tier: "Founding", jobs: 12, grossValue: 15600, commission: 7800, subscription: 149, total: 7949 },
  { name: "Derek Thompson", tier: "Charter", jobs: 10, grossValue: 13000, commission: 3250, subscription: 149, total: 3399 },
  { name: "Aisha Patel", tier: "Founding", jobs: 9, grossValue: 11700, commission: 5850, subscription: 149, total: 5999 },
  { name: "Luis Morales", tier: "Charter", jobs: 8, grossValue: 10400, commission: 2600, subscription: 149, total: 2749 },
  { name: "Tanya Brooks", tier: "Founding", jobs: 7, grossValue: 9100, commission: 4550, subscription: 149, total: 4699 },
  { name: "Kevin Zhao", tier: "Charter", jobs: 7, grossValue: 9100, commission: 2275, subscription: 149, total: 2424 },
  { name: "Priya Nair", tier: "Founding", jobs: 6, grossValue: 7800, commission: 3900, subscription: 149, total: 4049 },
  { name: "James Foster", tier: "Charter", jobs: 5, grossValue: 6500, commission: 1625, subscription: 149, total: 1774 },
  { name: "Elena Vasquez", tier: "Founding", jobs: 5, grossValue: 6500, commission: 3250, subscription: 149, total: 3399 },
];

const TIER_COLORS: Record<string, string> = {
  Founding: "bg-purple-500/20 text-purple-300″,
  Charter: "bg-amber-500/20 text-amber-300″,
};

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toLocaleString()}`;

export default function RevenueAnalytics() {
  const [activeTab, setActiveTab] = useState<"composition" | "cohorts" | "trades" | "top10″>("composition");

  return (
    <AdminLayout>
      <div className="space-y-8″>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3″>
            <DollarSign className="w-8 h-8 text-teal-400″ />
            Revenue Analytics
          </h1>
          <p className="text-slate-400 mt-1 text-sm">From every dollar to every trend</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4″>
          {KPI.map((k) => (
            <div key={k.label} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex flex-col gap-2″>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{k.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center ${k.color}`}>
                  <k.icon className="w-4 h-4″ />
                </div>
              </div>
              <p className={`text-3xl font-black ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-500″>{k.sub}</p>
              <p className="text-xs text-green-400 flex items-center gap-1″>
                <ArrowUpRight className="w-3 h-3″ /> {k.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Nav */}
        <div className="flex gap-1 bg-slate-800/50 rounded-xl p-1 w-fit">
          {(["composition", "cohorts", "trades", "top10″] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === t ? "bg-teal-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {t === "composition" ? "Revenue Mix" : t === "cohorts" ? "Cohort Analysis" : t === "trades" ? "By Trade" : "Top 10″}
            </button>
          ))}
        </div>

        {/* Revenue Composition */}
        {activeTab === "composition" && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700″>
            <h2 className="text-white font-bold text-lg mb-1″>Revenue Composition — Last 6 Months</h2>
            <p className="text-slate-400 text-xs mb-6″>Job Commissions · Subscriptions · Media/Ads</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={MONTHLY_COMPOSITION} barSize={28}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#334155" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8″, fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fill: "#94a3b8″, fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: 8 }}
                  labelStyle={{ color: "#e2e8f0″ }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
                />
                <Legend wrapperStyle={{ color: "#94a3b8″, fontSize: 12 }} />
                <Bar dataKey="commissions" name="Job Commissions" stackId="a" fill="#14b8a6″ radius={[0, 0, 0, 0]} />
                <Bar dataKey="subscriptions" name="Subscriptions" stackId="a" fill="#8b5cf6″ />
                <Bar dataKey="media" name="Media/Ads" stackId="a" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Cohort Analysis */}
        {activeTab === "cohorts" && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700″>
            <h2 className="text-white font-bold text-lg mb-1″>Cohort Analysis</h2>
            <p className="text-slate-400 text-xs mb-6″>Partner retention and revenue contribution by join month</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700″>
                    {["Month", "Partners Joined", "Active Now", "Churned", "Rev This Month", "LTV to Date"].map((h) => (
                      <th key={h} className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wide py-3 pr-6″>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COHORTS.map((c, i) => (
                    <tr key={c.month} className={`border-b border-slate-700/50 ${i === 0 ? "bg-teal-500/5" : ""}`}>
                      <td className="py-3 pr-6 text-white font-medium">{c.month}</td>
                      <td className="py-3 pr-6 text-slate-300″>{c.joined}</td>
                      <td className="py-3 pr-6 text-green-400 font-semibold">{c.active}</td>
                      <td className="py-3 pr-6 text-red-400″>{c.churned}</td>
                      <td className="py-3 pr-6 text-teal-400 font-semibold">{fmt(c.monthlyRev)}</td>
                      <td className="py-3 pr-6 text-purple-400 font-semibold">{fmt(c.ltv)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Unit Economics */}
            <div className="mt-6 grid grid-cols-3 gap-4″>
              {[
                { label: "Avg Revenue / Partner", value: "$1,027/mo", color: "text-teal-400″ },
                { label: "Avg Cost to Serve", value: "$142/mo", color: "text-slate-300″ },
                { label: "Gross Margin / Partner", value: "86.2%", color: "text-green-400″ },
              ].map((m) => (
                <div key={m.label} className="bg-slate-700/50 rounded-xl p-4 text-center">
                  <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-slate-400 mt-1″>{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revenue by Trade */}
        {activeTab === "trades" && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700″>
            <h2 className="text-white font-bold text-lg mb-1″>Revenue by Trade</h2>
            <p className="text-slate-400 text-xs mb-6″>Cumulative gross job value attributed to each trade category</p>
            <div className="space-y-3″>
              {TRADE_REVENUE.map((t, i) => {
                const pct = Math.round((t.revenue / TRADE_REVENUE[0].revenue) * 100);
                return (
                  <div key={t.trade} className="flex items-center gap-4″>
                    <span className="w-24 text-sm text-slate-300 font-medium">{t.trade}</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center justify-end pr-3 text-xs font-bold text-white transition-all"
                        style={{ width: `${pct}%`, backgroundColor: TRADE_COLORS[i] }}
                      >
                        {fmt(t.revenue)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 flex items-center gap-3″>
              <TrendingUp className="w-5 h-5 text-teal-400 shrink-0″ />
              <p className="text-sm text-slate-300″>
                <span className="text-white font-semibold">At current growth rate: </span>
                Q3 2026 projected revenue = <span className="text-teal-400 font-black">$189K</span>
                <span className="text-green-400 ml-2 font-semibold">(+29%)</span>
              </p>
            </div>
          </div>
        )}

        {/* Top 10 Revenue Generators */}
        {activeTab === "top10″ && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700″>
            <h2 className="text-white font-bold text-lg mb-1″>Top 10 Revenue Generators</h2>
            <p className="text-slate-400 text-xs mb-6″>Ranked by total platform contribution this month</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700″>
                    {["#", "Partner", "Tier", "Jobs", "Gross Value", "Commission", "Subscription", "Total"].map((h) => (
                      <th key={h} className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wide py-3 pr-4″>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOP_PARTNERS.map((p, i) => (
                    <tr
                      key={p.name}
                      className={`border-b border-slate-700/50 ${
                        i === 0 ? "bg-teal-500/10 ring-1 ring-inset ring-teal-500/20″ : ""
                      }`}
                    >
                      <td className={`py-3 pr-4 font-black ${i === 0 ? "text-teal-400" : "text-slate-500"}`}>{i + 1}</td>
                      <td className={`py-3 pr-4 font-semibold ${i === 0 ? "text-white" : "text-slate-300"}`}>{p.name}</td>
                      <td className="py-3 pr-4″>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIER_COLORS[p.tier]}`}>{p.tier}</span>
                      </td>
                      <td className="py-3 pr-4 text-slate-300″>{p.jobs}</td>
                      <td className="py-3 pr-4 text-slate-300″>{fmt(p.grossValue)}</td>
                      <td className="py-3 pr-4 text-teal-400 font-semibold">{fmt(p.commission)}</td>
                      <td className="py-3 pr-4 text-slate-400″>${p.subscription}</td>
                      <td className={`py-3 pr-4 font-black ${i === 0 ? "text-teal-300 text-base" : "text-white"}`}>{fmt(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projection Banner */}
        <div className="bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-teal-500/10 rounded-2xl p-5 border border-teal-500/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-1″>Q3 2026 Projection</p>
            <p className="text-white text-lg font-bold">
              At current growth rate: <span className="text-teal-400 font-black text-2xl">$189K</span> projected revenue
              <span className="text-green-400 ml-2 font-semibold">(+29% vs Q2)</span>
            </p>
          </div>
          <Users className="w-12 h-12 text-teal-400/30″ />
        </div>

      </div>
    </AdminLayout>
  );
}
