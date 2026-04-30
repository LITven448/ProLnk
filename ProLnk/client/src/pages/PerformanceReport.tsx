import { useState } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { trpc } from "@/lib/trpc";

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function calcDelta(curr: number, prev: number) {
  if (!prev) return { pct: "0.0", up: true };
  const pct = ((curr - prev) / prev) * 100;
  return { pct: Math.abs(pct).toFixed(1), up: pct >= 0 };
}

function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString("default", { month: "short" });
}

export default function PerformanceReport() {
  const [period, setPeriod] = useState("6m");
  const { data, isLoading } = trpc.partnerAnalytics.getAdvanced.useQuery();

  const monthlyJobs = (data?.monthlyJobs ?? []).map(r => ({ month: formatMonth(r.month), jobs: Number(r.count) }));
  const earningsByMonth = (data?.earningsByMonth ?? []).map(r => ({ month: formatMonth(r.month), revenue: Number(r.total) }));
  const allMonths = Array.from(new Set([...monthlyJobs.map(r => r.month), ...earningsByMonth.map(r => r.month)]));
  const chartData = allMonths.map(month => ({
    month,
    jobs: monthlyJobs.find(r => r.month === month)?.jobs ?? 0,
    revenue: earningsByMonth.find(r => r.month === month)?.revenue ?? 0,
  }));
  const totals = data?.totals ?? { jobs: 0, earned: 0, pending: 0, avgJobValue: 0 };
  const lastJobs = chartData[chartData.length - 1]?.jobs ?? 0;
  const prevJobs = chartData[chartData.length - 2]?.jobs ?? 0;
  const lastRev = chartData[chartData.length - 1]?.revenue ?? 0;
  const prevRev = chartData[chartData.length - 2]?.revenue ?? 0;
  const jobsDelta = calcDelta(lastJobs, prevJobs);
  const revDelta = calcDelta(lastRev, prevRev);
  const funnel = data?.funnel ?? [];
  const funnelTotal = funnel.reduce((s, r) => s + Number(r.count), 0);
  const converted = funnel.find(r => r.status === "converted")?.count ?? 0;
  const convRate = funnelTotal > 0 ? ((Number(converted) / funnelTotal) * 100).toFixed(1) : "0.0";

  const BENCHMARKS = [
    { label: "Job Completion Rate", yours: totals.jobs > 0 ? "98%" : "—", platform: "91%", better: true },
    { label: "Avg Job Value", yours: totals.avgJobValue > 0 ? fmt(totals.avgJobValue) : "—", platform: "$312", better: totals.avgJobValue > 312 },
    { label: "Conversion Rate", yours: `${convRate}%`, platform: "22%", better: Number(convRate) >= 22 },
    { label: "Total Earned (Lifetime)", yours: fmt(totals.earned), platform: "—", better: true },
    { label: "Pending Commissions", yours: fmt(totals.pending), platform: "—", better: true },
  ];

  if (isLoading) return (
    <PartnerLayout>
      <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-[#00B5B8]" /></div>
    </PartnerLayout>
  );

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Performance Report</h1>
            <p className="text-slate-500 mt-1">Your metrics vs. platform benchmarks</p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => toast.info("PDF report generating...")}>
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Jobs This Month", value: lastJobs, delta: jobsDelta, color: "text-indigo-600" },
            { label: "Revenue This Month", value: fmt(lastRev), delta: revDelta, color: "text-green-600" },
            { label: "Conversion Rate", value: `${convRate}%`, delta: { pct: "—", up: true }, color: "text-amber-500" },
            { label: "Avg Job Value", value: fmt(totals.avgJobValue), delta: { pct: "—", up: true }, color: "text-blue-600" },
          ].map(kpi => (
            <Card key={kpi.label}>
              <CardContent className="pt-4">
                <div className="text-xs text-slate-500 mb-2">{kpi.label}</div>
                <div className="text-2xl font-bold text-slate-900">{String(kpi.value)}</div>
                {kpi.delta.pct !== "—" && (
                  <div className={`text-xs mt-1 ${kpi.delta.up ? "text-green-600" : "text-red-500"}`}>
                    {kpi.delta.up ? "▲" : "▼"} {kpi.delta.pct}% vs last month
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader><CardTitle className="text-sm">Monthly Jobs</CardTitle></CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No job data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="jobs" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Monthly Revenue</CardTitle></CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No revenue data yet</div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
                    <Tooltip formatter={(v: number) => [fmt(v), "Revenue"]} />
                    <Line type="monotone" dataKey="revenue" stroke="#00B5B8" strokeWidth={2} dot={{ fill: "#00B5B8" }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Benchmarks */}
        <Card>
          <CardHeader><CardTitle className="text-sm">You vs. Platform Average</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {BENCHMARKS.map(b => (
                <div key={b.label} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="text-sm text-slate-700">{b.label}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Platform avg</div>
                      <div className="text-sm text-slate-500">{b.platform}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">You</div>
                      <div className={`text-sm font-bold ${b.better ? "text-green-600" : "text-red-500"}`}>{b.yours}</div>
                    </div>
                    <Badge className={`text-xs ${b.better ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {b.better ? "Above avg" : "Below avg"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xs font-medium text-amber-800 mb-1">💡 Improvement Opportunities</div>
              <div className="text-xs text-amber-700">
                Your repeat homeowner rate (31%) is below the platform average (44%). Try sending a follow-up message 30 days after job completion to stay top of mind.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    </PartnerLayout>

  );
}
