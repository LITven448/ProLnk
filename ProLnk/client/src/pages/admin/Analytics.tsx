import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { BarChart3, TrendingUp, Users, DollarSign, Briefcase, Send, CheckCircle, Activity } from "lucide-react";

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
  icon: React.ReactNode;
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
      </div>
    </AdminLayout>
  );
}
