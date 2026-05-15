import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  DollarSign, Users, TrendingDown, Clock, Mail, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

const D = {
  bg: "#0D0F14",
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8",
  dim: "#555B72",
  teal: "#14B8A6",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF4444",
  cyan: "#00D4FF",
  purple: "#A855F7",
};

const KPI = [
  { label: "Active Subscribers", value: "147", sub: "Paying $149/mo", icon: Users, color: D.teal },
  { label: "Monthly Sub Revenue", value: "$21,903", sub: "Pure recurring", icon: DollarSign, color: D.green },
  { label: "Churn Rate", value: "2.1%/mo", sub: "~3 subs lost/month", icon: TrendingDown, color: D.amber },
  { label: "Avg Sub Age", value: "4.2 mo", sub: "Time since activation", icon: Clock, color: D.purple },
];

const MRR_DATA = [
  { month: "Dec", mrr: 4774 },
  { month: "Jan", mrr: 8791 },
  { month: "Feb", mrr: 12728 },
  { month: "Mar", mrr: 15841 },
  { month: "Apr", mrr: 19159 },
  { month: "May", mrr: 21903 },
];

const CHURN_DATA = [
  { month: "Dec", churned: 1 },
  { month: "Jan", churned: 2 },
  { month: "Feb", churned: 2 },
  { month: "Mar", churned: 3 },
  { month: "Apr", churned: 3 },
  { month: "May", churned: 3 },
];

const CHURN_REASONS = [
  { reason: "Moved to different market", count: 4, pct: 44 },
  { reason: "Job activity dropped", count: 3, pct: 33 },
  { reason: "Unresponsive", count: 2, pct: 22 },
];

const AT_RISK = [
  { name: "Marcus Webb", months: 3, daysInactive: 22, riskScore: 87, trade: "HVAC" },
  { name: "Sandra Kowalski", months: 2, daysInactive: 18, riskScore: 79, trade: "Plumbing" },
  { name: "Derek Fontaine", months: 4, daysInactive: 14, riskScore: 68, trade: "Electrical" },
  { name: "Tia Nguyen", months: 1, daysInactive: 11, riskScore: 62, trade: "Roofing" },
  { name: "Carl Simmons", months: 5, daysInactive: 9, riskScore: 54, trade: "General" },
];

const COHORTS = [
  { month: "Feb 2026", started: 32, active: 28, ret1: "100%", ret3: "91%", ret6: "—" },
  { month: "Mar 2026", started: 41, active: 38, ret1: "100%", ret3: "93%", ret6: "—" },
  { month: "Apr 2026", started: 52, active: 50, ret1: "100%", ret3: "—", ret6: "—" },
  { month: "May 2026", started: 22, active: 22, ret1: "100%", ret3: "—", ret6: "—" },
];

function riskColor(score: number) {
  if (score >= 80) return D.red;
  if (score >= 60) return D.amber;
  return D.green;
}

export default function SubscriptionAnalytics() {
  const [reached, setReached] = useState<Set<number>>(new Set());

  function handleReachOut(idx: number) {
    setReached((prev) => new Set([...prev, idx]));
    toast.success(`Outreach queued for ${AT_RISK[idx].name}`);
  }

  return (
    <AdminLayout>
      <div className="space-y-8" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3" style={{ color: D.text }}>
            <DollarSign className="w-8 h-8" style={{ color: D.teal }} />
            Subscription Analytics
          </h1>
          <p className="mt-1 text-sm" style={{ color: D.muted }}>Your $149/month recurring engine</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl p-5 flex flex-col gap-2"
              style={{ background: D.card, border: `1px solid ${D.border}` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: D.muted }}>{k.label}</span>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${k.color}22` }}>
                  <k.icon className="w-4 h-4" style={{ color: k.color }} />
                </div>
              </div>
              <p className="text-3xl font-black" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs" style={{ color: D.dim }}>{k.sub}</p>
            </div>
          ))}
        </div>

        {/* MRR Growth */}
        <div className="rounded-2xl p-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: D.text }}>MRR Growth — Last 6 Months</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MRR_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={D.teal} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={D.teal} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
              <XAxis dataKey="month" tick={{ fill: D.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: D.muted, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Sub Revenue"]}
              />
              <Area type="monotone" dataKey="mrr" stroke={D.teal} strokeWidth={2.5} fill="url(#mrrGrad)" dot={{ fill: D.teal, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Analysis */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: D.text }}>Churn by Month</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={CHURN_DATA} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={D.border} />
                <XAxis dataKey="month" tick={{ fill: D.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: D.muted, fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text }}
                  formatter={(v: number) => [v, "Churned"]}
                />
                <Bar dataKey="churned" fill={D.red} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: D.text }}>Top Churn Reasons</h2>
            <div className="space-y-4">
              {CHURN_REASONS.map((r) => (
                <div key={r.reason}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm" style={{ color: D.text }}>{r.reason}</span>
                    <span className="text-sm font-semibold" style={{ color: D.amber }}>{r.count} subs</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: D.border }}>
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${r.pct}%`, background: D.amber }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* At-Risk Subscribers */}
        <div className="rounded-2xl p-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle className="w-5 h-5" style={{ color: D.amber }} />
            <h2 className="text-lg font-bold" style={{ color: D.text }}>At-Risk Subscribers</h2>
          </div>
          <div className="space-y-3">
            {AT_RISK.map((p, idx) => (
              <div
                key={p.name}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: D.surface, border: `1px solid ${D.border}` }}
              >
                <div>
                  <p className="font-semibold" style={{ color: D.text }}>{p.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: D.muted }}>{p.trade} · {p.months} mo subscribed · {p.daysInactive}d inactive</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs" style={{ color: D.muted }}>Risk</p>
                    <p className="text-lg font-black" style={{ color: riskColor(p.riskScore) }}>{p.riskScore}</p>
                  </div>
                  <button
                    onClick={() => handleReachOut(idx)}
                    disabled={reached.has(idx)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      background: reached.has(idx) ? `${D.green}22` : `${D.teal}22`,
                      color: reached.has(idx) ? D.green : D.teal,
                      border: `1px solid ${reached.has(idx) ? D.green : D.teal}44`,
                      opacity: reached.has(idx) ? 0.7 : 1,
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    {reached.has(idx) ? "Queued" : "Reach Out"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cohort Retention Table */}
        <div className="rounded-2xl p-6" style={{ background: D.card, border: `1px solid ${D.border}` }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: D.text }}>Cohort Retention</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}` }}>
                  {["Cohort", "Started", "Still Active", "1-Month Ret.", "3-Month Ret.", "6-Month Ret."].map((h) => (
                    <th key={h} className="text-left py-3 pr-6 text-xs uppercase tracking-wider font-semibold" style={{ color: D.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COHORTS.map((c) => (
                  <tr key={c.month} style={{ borderBottom: `1px solid ${D.border}` }}>
                    <td className="py-3 pr-6 font-medium" style={{ color: D.text }}>{c.month}</td>
                    <td className="py-3 pr-6" style={{ color: D.muted }}>{c.started}</td>
                    <td className="py-3 pr-6 font-semibold" style={{ color: D.green }}>{c.active}</td>
                    <td className="py-3 pr-6" style={{ color: D.cyan }}>{c.ret1}</td>
                    <td className="py-3 pr-6" style={{ color: c.ret3 === "—" ? D.dim : D.cyan }}>{c.ret3}</td>
                    <td className="py-3 pr-6" style={{ color: D.dim }}>{c.ret6}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Projection */}
        <div
          className="rounded-2xl p-6"
          style={{ background: `linear-gradient(135deg, ${D.teal}10, ${D.purple}10)`, border: `1px solid ${D.teal}30` }}
        >
          <h2 className="text-lg font-bold mb-3" style={{ color: D.text }}>Revenue Projection</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: D.muted }}>At Current Churn (2.1%)</p>
              <p className="text-2xl font-black" style={{ color: D.amber }}>$246K ARR</p>
              <p className="text-xs mt-1" style={{ color: D.dim }}>From subscriptions only</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: D.card, border: `1px solid ${D.teal}30` }}>
              <p className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: D.muted }}>If Churn Reduced to 1%</p>
              <p className="text-2xl font-black" style={{ color: D.green }}>$267K ARR</p>
              <p className="text-xs mt-1" style={{ color: D.teal }}>+$21K/yr opportunity</p>
            </div>
          </div>
        </div>

        {/* Win-Back Campaign */}
        <div
          className="rounded-2xl p-6 flex items-center justify-between"
          style={{ background: D.card, border: `1px solid ${D.amber}30` }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-5 h-5" style={{ color: D.amber }} />
              <h2 className="text-lg font-bold" style={{ color: D.text }}>Win-Back Campaign</h2>
            </div>
            <p className="text-sm" style={{ color: D.muted }}>3 partners cancelled in the last 30 days. Send win-back offer?</p>
          </div>
          <button
            onClick={() => toast.success("Win-back campaign queued for 3 partners")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: `${D.amber}22`, color: D.amber, border: `1px solid ${D.amber}44` }}
          >
            <Mail className="w-4 h-4" />
            Send Win-Back Offer
          </button>
        </div>

      </div>
    </AdminLayout>
  );
}
