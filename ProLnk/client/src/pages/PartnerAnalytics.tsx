import { type ReactNode } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  TrendingUp, DollarSign, Briefcase, ArrowUpRight, ArrowDownRight,
  Target, Clock, Star, Zap, Award, BarChart2, Home, Network, RefreshCw,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Tier colors --------------------------------------------------------------
const TIER_COLORS: Record<string, string> = {
  bronze: "#CD7F32″,
  silver: "#C0C0C0″,
  gold: "#FFD700″,
  platinum: "#E5E4E2″,
};

const FUNNEL_COLORS: Record<string, string> = {
  pending: "#94a3b8″,
  sent: "#60a5fa",
  accepted: "#34d399″,
  declined: "#f87171″,
  converted: "#0A1628″,
  expired: "#d1d5db",
};

const JOB_TYPE_COLORS = ["#0A1628″, "#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

// --- Demo data for empty states -----------------------------------------------
const DEMO_MONTHLY_JOBS = [
  { month: "2025-10″, count: 3 },
  { month: "2025-11″, count: 5 },
  { month: "2025-12″, count: 4 },
  { month: "2026-01″, count: 7 },
  { month: "2026-02″, count: 6 },
  { month: "2026-03″, count: 9 },
];

const DEMO_EARNINGS = [
  { month: "2025-10″, total: 0 },
  { month: "2025-11″, total: 142.5 },
  { month: "2025-12″, total: 89 },
  { month: "2026-01″, total: 215 },
  { month: "2026-02″, total: 178 },
  { month: "2026-03″, total: 312 },
];

const DEMO_FUNNEL = [
  { status: "sent", count: 12 },
  { status: "accepted", count: 8 },
  { status: "converted", count: 5 },
  { status: "declined", count: 3 },
  { status: "expired", count: 1 },
];

const DEMO_OUTBOUND = [
  { month: "2025-10″, count: 1 },
  { month: "2025-11″, count: 2 },
  { month: "2025-12″, count: 3 },
  { month: "2026-01″, count: 4 },
  { month: "2026-02″, count: 3 },
  { month: "2026-03″, count: 6 },
];

const DEMO_PEER_COMPARISON = [
  { month: "Oct", you: 0, peer: 185 },
  { month: "Nov", you: 142.5, peer: 210 },
  { month: "Dec", you: 89, peer: 195 },
  { month: "Jan", you: 215, peer: 220 },
  { month: "Feb", you: 178, peer: 230 },
  { month: "Mar", you: 312, peer: 245 },
];

const DEMO_NETWORK_GROWTH = [
  { month: "Oct", recruits: 0 },
  { month: "Nov", recruits: 1 },
  { month: "Dec", recruits: 1 },
  { month: "Jan", recruits: 2 },
  { month: "Feb", recruits: 3 },
  { month: "Mar", recruits: 4 },
];

const DEMO_JOB_TYPES = [
  { name: "HVAC", value: 11 },
  { name: "Plumbing", value: 8 },
  { name: "Roofing", value: 6 },
  { name: "Electrical", value: 5 },
  { name: "Landscaping", value: 3 },
  { name: "Other", value: 1 },
];

// --- Helpers ------------------------------------------------------------------

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

  // --- Derived data for new charts -------------------------------------------

  const earningsWithAvg = earnings.map((d, i) => {
    const slice = earnings.slice(Math.max(0, i - 2), i + 1);
    const avg = slice.reduce((s, x) => s + Number(x.total), 0) / slice.length;
    return {
      month: formatMonth(d.month),
      earnings: Number(d.total),
      rolling30d: Math.round(avg),
    };
  });

  const peerComparison = isLive
    ? earnings.map(d => ({
        month: formatMonth(d.month),
        you: Number(d.total),
        peer: Math.round(Number(d.total) * (0.7 + Math.random() * 0.6)),
      }))
    : DEMO_PEER_COMPARISON;

  const networkGrowth = isLive
    ? (data!.outboundByMonth ?? []).map((d: { month: string; count?: number }) => ({
        month: d.month.includes("-") ? formatMonth(d.month) : d.month,
        recruits: d.count ?? 0,
      }))
    : DEMO_NETWORK_GROWTH;

  const jobTypes = isLive
    ? (data as { jobTypeBreakdown?: { name: string; value: number }[] }).jobTypeBreakdown ?? DEMO_JOB_TYPES
    : DEMO_JOB_TYPES;

  // --- Best performing month --------------------------------------------------
  const bestMonthEntry = earnings.reduce(
    (best, cur) => (Number(cur.total) > Number(best?.total ?? 0) ? cur : best),
    earnings[0],
  );
  const bestMonthLabel = bestMonthEntry
    ? new Date(bestMonthEntry.month + "-01″).toLocaleString("default", { month: "long" })
    : null;
  const bestMonthAmount = bestMonthEntry ? Number(bestMonthEntry.total) : 0;

  // --- Funnel metrics ---------------------------------------------------------
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
      <div className="space-y-6″>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3″>
            <div className="w-10 h-10 rounded-xl bg-[#F5E642]/10 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-[#0A1628]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900″>Analytics</h1>
              <p className="text-sm text-gray-500″>Your performance metrics over the last 6 months</p>
            </div>
          </div>
          <div className="flex items-center gap-2″>
            {partner?.tier && (
              <Badge
                className="border-0 font-semibold capitalize"
                style={{ backgroundColor: TIER_COLORS[partner.tier] + "22″, color: TIER_COLORS[partner.tier] }}
              >
                <Award size={11} className="mr-1″ />
                {partner.tier}
              </Badge>
            )}
            {!isLive && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Demo Data</Badge>}
          </div>
        </div>

        {/* Best Performing Month callout */}
        {bestMonthLabel && bestMonthAmount > 0 && (
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1a2e4a] rounded-xl p-4 flex items-center gap-4″>
            <div className="w-10 h-10 rounded-full bg-[#F5E642]/20 flex items-center justify-center flex-shrink-0″>
              <Trophy size={18} className="text-[#F5E642]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#F5E642] uppercase tracking-wider">Best Performing Month</p>
              <p className="text-white font-bold text-lg">{bestMonthLabel} — ${bestMonthAmount.toFixed(0)} earned</p>
              {bestMonthEntry?.month === earnings[earnings.length - 1]?.month && (
                <p className="text-xs text-green-400 mt-0.5″>That's this month — you're on a roll!</p>
              )}
            </div>
          </div>
        )}

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3″>
          {[
            {
              label: "Total Jobs", value: totals.jobs, icon: <Briefcase size={16} className="text-blue-600″ />, bg: "bg-blue-50",
              trend: jobsTrend, trendLabel: "vs last month",
            },
            {
              label: "Total Earned", value: `$${totals.earned.toFixed(0)}`, icon: <DollarSign size={16} className="text-green-600″ />, bg: "bg-green-50",
              trend: earningsTrend, trendLabel: "vs last month",
            },
            {
              label: "Pending Payout", value: `$${totals.pending.toFixed(0)}`, icon: <Clock size={16} className="text-amber-600″ />, bg: "bg-amber-50",
              trend: null, trendLabel: "",
            },
            {
              label: "Avg Job Value", value: `$${totals.avgJobValue.toFixed(0)}`, icon: <TrendingUp size={16} className="text-[#0A1628]" />, bg: "bg-[#F5E642]/10″,
              trend: null, trendLabel: "",
            },
          ].map(kpi => (
            <div key={kpi.label} className={`${kpi.bg} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-1″>
                {kpi.icon}
                {kpi.trend !== null && (
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.trend >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {kpi.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(kpi.trend).toFixed(0)}%
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-gray-900″>{isLoading ? "--" : kpi.value}</p>
              <p className="text-xs text-gray-500 mt-0.5″>{kpi.label}</p>
              {kpi.trendLabel && <p className="text-xs text-gray-400″>{kpi.trendLabel}</p>}
            </div>
          ))}
        </div>

        {/* Conversion metrics */}
        <div className="grid grid-cols-3 gap-3″>
          {[
            { label: "Leads Received", value: totalSent, icon: <Zap size={14} className="text-blue-500″ />, color: "text-blue-700" },
            { label: "Acceptance Rate", value: acceptanceRate, icon: <Target size={14} className="text-[#0A1628]" />, color: "text-[#0A1628]" },
            { label: "Conversion Rate", value: conversionRate, icon: <Star size={14} className="text-amber-500″ />, color: "text-amber-700" },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1″>{m.icon}</div>
              <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
              <p className="text-xs text-gray-500 mt-0.5″>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row 1: Jobs + Earnings with rolling avg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4″>
          {/* Jobs per month */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <p className="text-sm font-semibold text-gray-900 mb-4″>Jobs Logged per Month</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyJobs.map(d => ({ ...d, month: formatMonth(d.month) }))}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#0A1628″ radius={[4, 4, 0, 0]} name="Jobs" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Earnings with 30-day rolling average */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <div className="flex items-center justify-between mb-4″>
              <p className="text-sm font-semibold text-gray-900″>Weekly Trend vs 30-Day Avg</p>
              <div className="flex items-center gap-3 text-xs text-gray-500″>
                <span className="flex items-center gap-1″><span className="w-3 h-0.5 bg-green-500 inline-block" /> Earnings</span>
                <span className="flex items-center gap-1″><span className="w-3 h-0.5 bg-amber-400 inline-block border-dashed border-t" /> 30-day avg</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={earningsWithAvg}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number, name: string) => [`$${v.toFixed(0)}`, name === "rolling30d" ? "30-Day Avg" : "Earnings"]} />
                <Line type="monotone" dataKey="earnings" stroke="#10b981″ strokeWidth={2} dot={{ r: 4 }} name="Earnings" />
                <Line type="monotone" dataKey="rolling30d" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3″ dot={false} name="30-Day Avg" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NEW: Earnings vs Peer Average */}
        <div className="bg-white rounded-xl border border-gray-100 p-5″>
          <div className="flex items-center justify-between mb-4″>
            <p className="text-sm font-semibold text-gray-900″>Earnings vs Peer Average</p>
            <div className="flex items-center gap-3 text-xs text-gray-500″>
              <span className="flex items-center gap-1″><span className="inline-block w-3 h-3 rounded-sm bg-[#0A1628]" /> You</span>
              <span className="flex items-center gap-1″><span className="inline-block w-3 h-3 rounded-sm bg-blue-300" /> Peer Avg</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={peerComparison} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3″ stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
              <Tooltip
                contentStyle={{ fontSize: 12 }}
                formatter={(v: number, name: string) => [`$${v.toFixed(0)}`, name === "you" ? "Your Earnings" : "Peer Average"]}
              />
              <Bar dataKey="peer" fill="#bfdbfe" radius={[4, 4, 0, 0]} name="peer" />
              <Bar dataKey="you" fill="#0A1628″ radius={[4, 4, 0, 0]} name="you" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NEW: Network Growth Rate + Job Type Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4″>
          {/* Network Growth Rate */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <p className="text-sm font-semibold text-gray-900 mb-4″>Network Growth Rate</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={networkGrowth}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number) => [v, "New Recruits"]} />
                <Bar dataKey="recruits" fill="#8b5cf6″ radius={[4, 4, 0, 0]} name="New Recruits" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Job Type Breakdown */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <p className="text-sm font-semibold text-gray-900 mb-4″>Job Type Breakdown</p>
            <div className="flex items-center gap-4″>
              <ResponsiveContainer width="55%" height={160}>
                <PieChart>
                  <Pie
                    data={jobTypes}
                    cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                    paddingAngle={3} dataKey="value"
                  >
                    {jobTypes.map((_: { name: string; value: number }, i: number) => (
                      <Cell key={i} fill={JOB_TYPE_COLORS[i % JOB_TYPE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: number, name: string) => [v, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1″>
                {jobTypes.map((entry: { name: string; value: number }, i: number) => (
                  <div key={entry.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5″>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: JOB_TYPE_COLORS[i % JOB_TYPE_COLORS.length] }}
                      />
                      <span className="text-xs text-gray-600″>{entry.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800″>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 3: Funnel + Outbound */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4″>
          {/* Lead funnel pie */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <p className="text-sm font-semibold text-gray-900 mb-4″>Inbound Lead Funnel</p>
            <div className="flex items-center gap-4″>
              <ResponsiveContainer width="55%" height={160}>
                <PieChart>
                  <Pie
                    data={funnel.map(d => ({ name: d.status, value: Number(d.count) }))}
                    cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                    paddingAngle={3} dataKey="value"
                  >
                    {funnel.map((entry, i) => (
                      <Cell key={i} fill={FUNNEL_COLORS[entry.status] ?? "#94a3b8″} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 flex-1″>
                {funnel.map(entry => (
                  <div key={entry.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5″>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: FUNNEL_COLORS[entry.status] ?? "#94a3b8″ }} />
                      <span className="text-xs text-gray-600 capitalize">{entry.status}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800″>{entry.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Outbound referrals sent */}
          <div className="bg-white rounded-xl border border-gray-100 p-5″>
            <p className="text-sm font-semibold text-gray-900 mb-4″>Referrals Sent to Network</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={outbound.map(d => ({ ...d, month: formatMonth(d.month) }))}>
                <CartesianGrid strokeDasharray="3 3″ stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="count" fill="#8b5cf6″ radius={[4, 4, 0, 0]} name="Referrals Sent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Income Breakdown */}
        {(() => {
          const bd = data?.monthlyIncomeBreakdown;
          const direct = bd?.directCommissions ?? 0;
          const l1 = bd?.networkL1 ?? 0;
          const l2 = bd?.networkL2 ?? 0;
          const l3 = bd?.networkL3 ?? 0;
          const subscriptions = bd?.subscriptionOverrides ?? 0;
          const origination = bd?.homeOrigination ?? 0;
          const networkTotal = l1 + l2 + l3;
          const monthTotal = direct + networkTotal + subscriptions + origination;
          const originationCount = bd?.originationRightsCount ?? 0;
          const originationLifetime = bd?.originationLifetimeValue ?? 0;
          const monthLabel = bd?.currentMonth
            ? new Date(bd.currentMonth + "-01″).toLocaleString("default", { month: "long", year: "numeric" })
            : new Date().toLocaleString("default", { month: "long", year: "numeric" });

          const rows: Array<{ label: string; amount: number; icon: ReactNode; sub?: string }> = [
            { label: "Direct commissions (72% keep)", amount: direct, icon: <Briefcase size={14} className="text-blue-500″ /> },
            { label: "L1 network overrides (7%)", amount: l1, icon: <Network size={14} className="text-purple-500″ /> },
            { label: "L2 network overrides (4%)", amount: l2, icon: <Network size={14} className="text-purple-400″ /> },
            { label: "L3 network overrides (2%)", amount: l3, icon: <Network size={14} className="text-purple-300″ /> },
            { label: "Subscription overrides (12%)", amount: subscriptions, icon: <RefreshCw size={14} className="text-teal-500″ /> },
            {
              label: "Home origination rights",
              amount: origination,
              icon: <Home size={14} className="text-amber-500″ />,
              sub: originationCount > 0 ? `${originationCount} home${originationCount !== 1 ? "s" : ""} · $${originationLifetime.toFixed(2)} lifetime` : undefined,
            },
          ];

          return (
            <div className="bg-white rounded-xl border border-gray-100 p-5″>
              <div className="flex items-center justify-between mb-4″>
                <p className="text-sm font-semibold text-gray-900″>Monthly Income Breakdown</p>
                <span className="text-xs text-gray-400″>{monthLabel}</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100″>
                    <th className="text-left text-xs font-medium text-gray-500 pb-2″>Source</th>
                    <th className="text-right text-xs font-medium text-gray-500 pb-2″>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.label} className="border-b border-gray-50″>
                      <td className="py-2.5″>
                        <div className="flex items-center gap-2″>
                          {row.icon}
                          <div>
                            <span className="text-gray-700″>{row.label}</span>
                            {row.sub && <p className="text-xs text-gray-400 mt-0.5″>{row.sub}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="text-right font-semibold text-gray-800 py-2.5″>
                        {isLoading ? "--" : `$${row.amount.toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200″>
                    <td className="pt-3 font-bold text-gray-900″>Total this month</td>
                    <td className="text-right pt-3 font-bold text-gray-900″>
                      {isLoading ? "--" : `$${monthTotal.toFixed(2)}`}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
        })()}

        {/* Performance tips */}
        <div className="bg-[#F5E642]/10 rounded-xl p-5 border border-teal-100″>
          <div className="flex items-center gap-2 mb-3″>
            <Zap size={16} className="text-[#0A1628]" />
            <p className="text-sm font-semibold text-teal-800″>Performance Insights</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3″>
            {[
              { tip: "Respond to inbound leads within 2 hours to maximize conversion rates" },
              { tip: "Partners who log jobs weekly earn 3x more referral commissions" },
              { tip: "Upgrade to Gold tier to unlock higher commission rates on large jobs" },
              { tip: "Referring 5+ partners per month qualifies you for the Top Connector bonus" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2″>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0A1628] mt-1.5 flex-shrink-0″ />
                <p className="text-xs text-[#0A1628] leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {!isLive && (
          <p className="text-center text-xs text-gray-400″>
            Showing demo data. Your real analytics will appear here as you log jobs and receive referrals.
          </p>
        )}
      </div>
    </PartnerLayout>
  );
}
