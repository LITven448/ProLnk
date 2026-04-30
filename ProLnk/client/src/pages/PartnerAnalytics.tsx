import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import {
  TrendingUp, DollarSign, Briefcase, Send, ArrowUpRight, ArrowDownRight,
  Target, Clock, Star, Zap, Award, BarChart2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Tier colors --------------------------------------------------------------
const TIER_COLORS: Record<string, string> = {
  bronze: "#CD7F32",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#E5E4E2",
};

const FUNNEL_COLORS: Record<string, string> = {
  pending: "#94a3b8",
  sent: "#60a5fa",
  accepted: "#34d399",
  declined: "#f87171",
  converted: "#0A1628",
  expired: "#d1d5db",
};

// --- Demo data for empty states -----------------------------------------------
const DEMO_MONTHLY_JOBS = [
  { month: "2025-10", count: 3 },
  { month: "2025-11", count: 5 },
  { month: "2025-12", count: 4 },
  { month: "2026-01", count: 7 },
  { month: "2026-02", count: 6 },
  { month: "2026-03", count: 9 },
];

const DEMO_EARNINGS = [
  { month: "2025-10", total: 0 },
  { month: "2025-11", total: 142.5 },
  { month: "2025-12", total: 89 },
  { month: "2026-01", total: 215 },
  { month: "2026-02", total: 178 },
  { month: "2026-03", total: 312 },
];

const DEMO_FUNNEL = [
  { status: "sent", count: 12 },
  { status: "accepted", count: 8 },
  { status: "converted", count: 5 },
  { status: "declined", count: 3 },
  { status: "expired", count: 1 },
];

const DEMO_OUTBOUND = [
  { month: "2025-10", count: 1 },
  { month: "2025-11", count: 2 },
  { month: "2025-12", count: 3 },
  { month: "2026-01", count: 4 },
  { month: "2026-02", count: 3 },
  { month: "2026-03", count: 6 },
];

function formatMonth(m: string) {
  const [y, mo] = m.split("-");
  return new Date(parseInt(y), parseInt(mo) - 1).toLocaleString("default", { month: "short" });
}

function pct(a: number, b: number) {
  if (!b) return "--";
  return `${Math.round((a / b) * 100)}%`;
}

export default function PartnerAnalytics() {
  const { data, isLoading } = trpc.partnerAnalytics.getAdvanced.useQuery();

  const isLive = data && (data.totals.jobs > 0 || data.monthlyJobs.length > 0);

  const monthlyJobs = isLive ? data!.monthlyJobs : DEMO_MONTHLY_JOBS;
  const earnings = isLive ? data!.earningsByMonth : DEMO_EARNINGS;
  const funnel = isLive ? data!.funnel : DEMO_FUNNEL;
  const outbound = isLive ? data!.outboundByMonth : DEMO_OUTBOUND;
  const totals = isLive ? data!.totals : { jobs: 34, earned: 936.5, pending: 215, avgJobValue: 1850 };
  const partner = data?.partner;

  const totalSent = funnel.reduce((s, r) => s + Number(r.count), 0);
  const totalConverted = funnel.find(r => r.status === "converted")?.count ?? 0;
  const totalAccepted = funnel.find(r => r.status === "accepted")?.count ?? 0;
  const conversionRate = pct(Number(totalConverted), totalSent);
  const acceptanceRate = pct(Number(totalAccepted), totalSent);

  const jobsThisMonth = monthlyJobs[monthlyJobs.length - 1]?.count ?? 0;
  const jobsLastMonth = monthlyJobs[monthlyJobs.length - 2]?.count ?? 0;
  const jobsTrend = jobsLastMonth > 0 ? ((Number(jobsThisMonth) - Number(jobsLastMonth)) / Number(jobsLastMonth)) * 100 : 0;

  const earningsThisMonth = earnings[earnings.length - 1]?.total ?? 0;
  const earningsLastMonth = earnings[earnings.length - 2]?.total ?? 0;
  const earningsTrend = Number(earningsLastMonth) > 0 ? ((Number(earningsThisMonth) - Number(earningsLastMonth)) / Number(earningsLastMonth)) * 100 : 0;

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-sm text-gray-500">Your performance metrics over the last 6 months</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {partner?.tier && (
              <Badge
                className="border-0 font-semibold capitalize"
                style={{ backgroundColor: TIER_COLORS[partner.tier] + "22", color: TIER_COLORS[partner.tier] }}
              >
                <Award size={11} className="mr-1" />
                {partner.tier}
              </Badge>
            )}
            {!isLive && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Demo Data</Badge>}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Total Jobs", value: totals.jobs, icon: <Briefcase size={16} className="text-blue-600" />, bg: "bg-blue-50",
              trend: jobsTrend, trendLabel: "vs last month",
            },
            {
              label: "Total Earned", value: `$${totals.earned.toFixed(0)}`, icon: <DollarSign size={16} className="text-green-600" />, bg: "bg-green-50",
              trend: earningsTrend, trendLabel: "vs last month",
            },
            {
              label: "Pending Payout", value: `$${totals.pending.toFixed(0)}`, icon: <Clock size={16} className="text-amber-600" />, bg: "bg-amber-50",
              trend: null, trendLabel: "",
            },
            {
              label: "Avg Job Value", value: `$${totals.avgJobValue.toFixed(0)}`, icon: <TrendingUp size={16} className="text-[#0A1628]" />, bg: "bg-[#F5E642]/10",
              trend: null, trendLabel: "",
            },
          ].map(kpi => (
            <div key={kpi.label} className={`${kpi.bg} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-1">
                {kpi.icon}
                {kpi.trend !== null && (
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.trend >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {kpi.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(kpi.trend).toFixed(0)}%
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-gray-900">{isLoading ? "--" : kpi.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
              {kpi.trendLabel && <p className="text-xs text-gray-400">{kpi.trendLabel}</p>}
            </div>
          ))}
        </div>

        {/* Conversion metrics */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Leads Received", value: totalSent, icon: <Zap size={14} className="text-blue-500" />, color: "text-blue-700" },
            { label: "Acceptance Rate", value: acceptanceRate, icon: <Target size={14} className="text-[#0A1628]" />, color: "text-[#0A1628]" },
            { label: "Conversion Rate", value: conversionRate, icon: <Star size={14} className="text-amber-500" />, color: "text-amber-700" },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">{m.icon}</div>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1: Jobs + Earnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Jobs per month */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-4">Jobs Logged per Month</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyJobs.map(d => ({ ...d, month: formatMonth(d.month) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#0A1628" radius={[4, 4, 0, 0]} name="Jobs" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings per month */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-4">Commission Earnings ($)</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={earnings.map(d => ({ ...d, month: formatMonth(d.month), total: Number(d.total) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => [`$${v.toFixed(0)}`, "Earnings"]} />
                <Line type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Earnings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2: Funnel + Outbound */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lead funnel pie */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-4">Inbound Lead Funnel</p>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={160}>
                <PieChart>
                  <Pie
                    data={funnel.map(d => ({ name: d.status, value: Number(d.count) }))}
                    cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                    paddingAngle={3} dataKey="value"
                  >
                    {funnel.map((entry, i) => (
                      <Cell key={i} fill={FUNNEL_COLORS[entry.status] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1">
                {funnel.map(entry => (
                  <div key={entry.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FUNNEL_COLORS[entry.status] ?? "#94a3b8" }} />
                      <span className="text-xs text-gray-600 capitalize">{entry.status}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{entry.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outbound referrals sent */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-semibold text-gray-900 mb-4">Referrals Sent to Network</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={outbound.map(d => ({ ...d, month: formatMonth(d.month) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Referrals Sent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance tips */}
        <div className="bg-[#F5E642]/10 rounded-xl p-5 border border-teal-100">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-[#0A1628]" />
            <p className="text-sm font-semibold text-teal-800">Performance Insights</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { tip: "Respond to inbound leads within 2 hours to maximize conversion rates", icon: "" },
              { tip: "Partners who log jobs weekly earn 3x more referral commissions", icon: "" },
              { tip: "Upgrade to Gold tier to unlock higher commission rates on large jobs", icon: "[AWARD]" },
              { tip: "Referring 5+ partners per month qualifies you for the Top Connector bonus", icon: "[LINK]" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-base">{item.icon}</span>
                <p className="text-xs text-[#0A1628] leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {!isLive && (
          <p className="text-center text-xs text-gray-400">
            Showing demo data. Your real analytics will appear here as you log jobs and receive referrals.
          </p>
        )}
      </div>
    </PartnerLayout>
  );
}
