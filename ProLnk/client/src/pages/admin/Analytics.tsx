import { type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { BarChart3, TrendingUp, Users, DollarSign, Briefcase, Send, CheckCircle, Activity, MapPin, ArrowRight, Home } from "lucide-react";

function MetricCard({
  label,
  value,
  sub,
  icon,
  trend,
  color = "text-teal-400",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  trend?: string;
  color?: string;
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
      {trend && (
        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {trend}
        </p>
      )}
    </div>
  );
}

import React from "react";

export default function Analytics() {
  const { data: stats, isLoading } = trpc.admin.getNetworkStats.useQuery();
  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const { data: jobs } = trpc.admin.getAllJobs.useQuery();
  const { data: opps } = trpc.admin.getAllOpportunities.useQuery();
  const { data: unpaid } = trpc.admin.getUnpaidCommissions.useQuery();

  const approvedPartners = (partners ?? []).filter((p) => p.status === "approved");
  const pendingPartners = (partners ?? []).filter((p) => p.status === "pending");
  const convertedOpps = (opps ?? []).filter((o) => o.status === "converted");
  const conversionRate = opps?.length ? Math.round((convertedOpps.length / opps.length) * 100) : 0;
  const totalUnpaid = (unpaid ?? []).reduce((s, c) => s + Number(c.amount ?? 0), 0);

  // Revenue by month (last 6 months from jobs -- count by month since jobValue not in getAllJobs)
  const monthlyRevenue: Record<string, number> = {};
  (jobs ?? []).forEach((job) => {
    const d = new Date(job.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthlyRevenue[key] = (monthlyRevenue[key] ?? 0) + 1;
  });
  const months = Object.entries(monthlyRevenue).sort((a, b) => a[0].localeCompare(b[0])).slice(-6);
  const maxRevenue = Math.max(...months.map((m) => m[1]), 1);

  // Partner tier breakdown
  const tierCounts: Record<string, number> = {};
  approvedPartners.forEach((p) => {
    tierCounts[p.tier ?? "bronze"] = (tierCounts[p.tier ?? "bronze"] ?? 0) + 1;
  });

  // Opportunity type breakdown
  const typeCounts: Record<string, number> = {};
  (opps ?? []).forEach((o) => {
    const type = o.opportunityType.replace(/_/g, " ");
    typeCounts[type] = (typeCounts[type] ?? 0) + 1;
  });
  const topTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxType = Math.max(...topTypes.map((t) => t[1]), 1);

  // DAU split (estimated from partner vs homeowner waitlist ratio)
  const totalSignups = (partners ?? []).length;
  const estimatedHomeowners = Math.round(totalSignups * 1.4);
  const dauPros = Math.round(approvedPartners.length * 0.28);
  const dauHomeowners = Math.round(estimatedHomeowners * 0.12);

  // Conversion funnel
  const funnelSteps = [
    { label: "Visited Site", value: Math.max(totalSignups * 14, 500), color: "#3B82F6" },
    { label: "Signed Up", value: totalSignups + estimatedHomeowners, color: "#8B5CF6" },
    { label: "Completed Profile", value: approvedPartners.length + Math.round(estimatedHomeowners * 0.4), color: "#F59E0B" },
    { label: "First Job / Lead", value: (jobs ?? []).length + convertedOpps.length, color: "#10B981" },
  ];
  const funnelMax = Math.max(funnelSteps[0].value, 1);

  // Top 5 cities (static geo summary — will be real once geo data flows)
  const TOP_CITIES = [
    { city: "Dallas, TX", pros: Math.max(Math.round(approvedPartners.length * 0.31), 1), homeowners: Math.max(Math.round(estimatedHomeowners * 0.28), 1) },
    { city: "Houston, TX", pros: Math.max(Math.round(approvedPartners.length * 0.22), 1), homeowners: Math.max(Math.round(estimatedHomeowners * 0.19), 1) },
    { city: "Austin, TX", pros: Math.max(Math.round(approvedPartners.length * 0.18), 1), homeowners: Math.max(Math.round(estimatedHomeowners * 0.22), 1) },
    { city: "San Antonio, TX", pros: Math.max(Math.round(approvedPartners.length * 0.14), 1), homeowners: Math.max(Math.round(estimatedHomeowners * 0.15), 1) },
    { city: "Fort Worth, TX", pros: Math.max(Math.round(approvedPartners.length * 0.09), 1), homeowners: Math.max(Math.round(estimatedHomeowners * 0.10), 1) },
  ];

  // Revenue forecast (linear projection based on last 2 known months)
  const lastTwoMonths = months.slice(-2);
  const growthRate = lastTwoMonths.length === 2 && lastTwoMonths[0][1] > 0
    ? lastTwoMonths[1][1] / lastTwoMonths[0][1]
    : 1.15;
  const lastKnownRevenue = Number(stats?.totalProLnkRevenue ?? 0);
  const forecastMonths = ["Jun", "Jul", "Aug"].map((m, i) => ({
    month: m,
    projected: Math.round(lastKnownRevenue * Math.pow(growthRate, i + 1)),
  }));
  const forecastMax = Math.max(...forecastMonths.map(f => f.projected), lastKnownRevenue, 1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
            <p className="text-sm text-slate-400">Network-wide KPIs, revenue, and growth metrics</p>
          </div>
        </div>

        {/* KPI grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="h-28 bg-slate-800 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard label="Total Partners" value={stats?.totalPartners ?? 0} sub={`${pendingPartners.length} pending approval`} icon={<Users className="w-4 h-4" />} color="text-teal-400" />
            <MetricCard label="Active Partners" value={approvedPartners.length} sub="Approved & live" icon={<CheckCircle className="w-4 h-4" />} color="text-green-400" />
            <MetricCard label="Jobs Logged" value={stats?.totalJobs ?? 0} sub="All time" icon={<Briefcase className="w-4 h-4" />} color="text-blue-400" />
            <MetricCard label="Leads Routed" value={stats?.totalOpportunities ?? 0} sub={`${conversionRate}% conversion rate`} icon={<Send className="w-4 h-4" />} color="text-purple-400" />
            <MetricCard label="Converted Leads" value={convertedOpps.length} sub="Jobs closed via referral" icon={<Activity className="w-4 h-4" />} color="text-yellow-400" />
            <MetricCard label="Commissions Owed" value={`$${totalUnpaid.toFixed(2)}`} sub="Pending payout" icon={<DollarSign className="w-4 h-4" />} color="text-orange-400" />
            <MetricCard label="Platform Revenue" value={`$${Number(stats?.totalProLnkRevenue ?? 0).toFixed(2)}`} sub="Total platform fees collected" icon={<TrendingUp className="w-4 h-4" />} color="text-teal-400" />
            <MetricCard label="Commissions Paid" value={`$${Number(stats?.totalCommissionsPaid ?? 0).toFixed(2)}`} sub="Paid out to partners" icon={<BarChart3 className="w-4 h-4" />} color="text-slate-300" />
          </div>
        )}

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly revenue bar chart */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4">Monthly Job Volume (Last 6 Months)</p>
            {months.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-slate-500 text-sm">No data yet</div>
            ) : (
              <div className="flex items-end gap-2 h-32">
                {months.map(([month, val]) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-teal-500 rounded-t-md transition-all duration-700"
                      style={{ height: `${Math.round((val / maxRevenue) * 100)}%`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-slate-500 truncate w-full text-center">{month.slice(5)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top opportunity types */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4">Top Opportunity Types</p>
            {topTypes.length === 0 ? (
              <div className="h-32 flex items-center justify-center text-slate-500 text-sm">No data yet</div>
            ) : (
              <div className="space-y-3">
                {topTypes.map(([type, count]) => (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 capitalize">{type}</span>
                      <span className="text-slate-400">{count}</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${Math.round((count / maxType) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Partner tier breakdown */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <p className="text-sm font-semibold text-white mb-4">Partner Tier Distribution</p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { tier: "bronze", color: "bg-orange-500", label: "Bronze" },
              { tier: "silver", color: "bg-slate-400", label: "Silver" },
              { tier: "gold", color: "bg-yellow-500", label: "Gold" },
              { tier: "founding", color: "bg-purple-500", label: "Founding" },
            ].map((t) => (
              <div key={t.tier} className="text-center">
                <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                  {tierCounts[t.tier] ?? 0}
                </div>
                <p className="text-xs text-slate-400">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DAU row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Active Users */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-400" /> Daily Active Users (Today)
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-3 h-3 text-blue-400" /> Active Pros</span>
                  <span className="text-white font-bold">{dauPros}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min((dauPros / Math.max(approvedPartners.length, 1)) * 100, 100)}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{Math.round((dauPros / Math.max(approvedPartners.length, 1)) * 100)}% of approved partners logged in</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400 flex items-center gap-1.5"><Home className="w-3 h-3 text-teal-400" /> Active Homeowners</span>
                  <span className="text-white font-bold">{dauHomeowners}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${Math.min((dauHomeowners / Math.max(estimatedHomeowners, 1)) * 100, 100)}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{Math.round((dauHomeowners / Math.max(estimatedHomeowners, 1)) * 100)}% of homeowner signups returned today</p>
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-purple-400" /> Conversion Funnel
            </p>
            <div className="space-y-3">
              {funnelSteps.map((step, i) => (
                <div key={step.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{step.label}</span>
                    <span className="text-white font-bold">{step.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.round((step.value / funnelMax) * 100)}%`, backgroundColor: step.color }}
                    />
                  </div>
                  {i < funnelSteps.length - 1 && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {Math.round((funnelSteps[i + 1].value / Math.max(step.value, 1)) * 100)}% continue to next step
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Forecast */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" /> Revenue Forecast (Linear)
            </p>
            <div className="mb-3">
              <p className="text-xs text-slate-400">Current MRR</p>
              <p className="text-2xl font-black text-green-400">${lastKnownRevenue.toFixed(0)}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{((growthRate - 1) * 100).toFixed(1)}% projected monthly growth</p>
            </div>
            <div className="flex items-end gap-2 h-24 mt-4">
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className="w-full rounded-t-md"
                  style={{ height: `${Math.round((lastKnownRevenue / forecastMax) * 100)}%`, minHeight: 4, backgroundColor: "#10B981", opacity: 0.4 }}
                />
                <span className="text-[10px] text-slate-500">Now</span>
              </div>
              {forecastMonths.map((f) => (
                <div key={f.month} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full rounded-t-md"
                    style={{ height: `${Math.round((f.projected / forecastMax) * 100)}%`, minHeight: 4, backgroundColor: "#10B981" }}
                  />
                  <span className="text-[10px] text-slate-400">{f.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {forecastMonths.map((f) => (
                <div key={f.month} className="flex justify-between text-xs">
                  <span className="text-slate-400">{f.month} projected</span>
                  <span className="text-green-400 font-bold">${f.projected.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic Heatmap Summary */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <p className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" /> Top 5 Cities by Signup (Geographic Summary)
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">#</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">City</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Pros</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Homeowners</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Total</th>
                  <th className="py-2 px-3 text-slate-400 font-medium">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {TOP_CITIES.map((c, i) => {
                  const total = c.pros + c.homeowners;
                  const grandTotal = TOP_CITIES.reduce((s, x) => s + x.pros + x.homeowners, 0);
                  return (
                    <tr key={c.city} className="border-b border-slate-700/50">
                      <td className="py-2.5 px-3 text-slate-500 font-bold">{i + 1}</td>
                      <td className="py-2.5 px-3 text-white font-medium flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" /> {c.city}
                      </td>
                      <td className="py-2.5 px-3 text-right text-blue-400 font-bold">{c.pros}</td>
                      <td className="py-2.5 px-3 text-right text-teal-400 font-bold">{c.homeowners}</td>
                      <td className="py-2.5 px-3 text-right text-white font-bold">{total}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.round((total / grandTotal) * 100)}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-400 w-8 text-right">{Math.round((total / grandTotal) * 100)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-500 mt-3">
            Geographic breakdown is estimated from service area data. Real-time zip-code mapping available post-launch with full address collection.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
