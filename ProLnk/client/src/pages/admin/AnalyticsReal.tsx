/**
 * Admin Analytics — Connected to Real Data
 * Route: /admin/analytics-real
 * Replaces the static analytics stub with real platform metrics.
 */

import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign, Zap, Camera, Home } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";

export default function AnalyticsReal() {
  const stats = trpc.network.getStats.useQuery();
  const investorMetrics = trpc.payments.getInvestorMetrics.useQuery();

  const d = stats.data ?? {};
  const inv = investorMetrics.data ?? {};

  const partnersByTier = [
    { tier: "Scout", count: inv.partners?.scoutCount ?? 0 },
    { tier: "Pro", count: inv.partners?.proCount ?? 0 },
    { tier: "Crew", count: inv.partners?.crewCount ?? 0 },
    { tier: "Company", count: inv.partners?.companyCount ?? 0 },
    { tier: "Enterprise", count: inv.partners?.enterpriseCount ?? 0 },
  ];

  const monthlyGrowth = inv.monthlyGrowth ?? [];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-400" />
            Platform Analytics
          </h1>
          <p className="text-gray-400 text-sm mt-1">Real-time platform metrics</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Partners", value: d.totalPartners, icon: <Users className="w-5 h-5" />, color: "text-teal-400" },
            { label: "Total Jobs", value: d.totalJobs, icon: <Camera className="w-5 h-5" />, color: "text-blue-400" },
            { label: "Opportunities", value: d.totalOpportunities, icon: <Zap className="w-5 h-5" />, color: "text-yellow-400" },
            { label: "Converted", value: d.convertedOpportunities, icon: <TrendingUp className="w-5 h-5" />, color: "text-green-400" },
          ].map((kpi, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className={`${kpi.color} mb-2`}>{kpi.icon}</div>
                <div className="text-2xl font-black text-white">{kpi.value ?? "-"}</div>
                <div className="text-gray-500 text-xs">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total GMV", value: `$${parseFloat(String(inv.gmv?.totalGMV || "0")).toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: "text-green-400" },
            { label: "Platform Revenue", value: `$${parseFloat(String(inv.gmv?.totalPlatformRevenue || "0")).toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: "text-teal-400" },
            { label: "Commissions Paid", value: `$${parseFloat(String(d.totalCommissionsPaid || "0")).toLocaleString()}`, icon: <DollarSign className="w-5 h-5" />, color: "text-indigo-400" },
            { label: "Homeowners", value: d.totalHomeowners, icon: <Home className="w-5 h-5" />, color: "text-purple-400" },
          ].map((kpi, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className={`${kpi.color} mb-2`}>{kpi.icon}</div>
                <div className="text-2xl font-black text-white">{kpi.value ?? "-"}</div>
                <div className="text-gray-500 text-xs">{kpi.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Partners by tier */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white text-sm font-semibold">Partners by Tier</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={partnersByTier}>
                  <XAxis dataKey="tier" tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", color: "#fff" }} />
                  <Bar dataKey="count" fill="#14b8a6" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly partner growth */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-white text-sm font-semibold">Partner Growth (6 months)</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {monthlyGrowth.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1f2937", border: "1px solid #374151", color: "#fff" }} />
                    <Line type="monotone" dataKey="newPartners" stroke="#14b8a6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
                  Not enough data yet — come back after launch
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Conversion funnel */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-sm font-semibold">Lead Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[
                { stage: "Opportunities Detected", value: d.totalOpportunities, pct: 100 },
                { stage: "Dispatched to Partners", value: Math.round((d.totalOpportunities ?? 0) * 0.7), pct: 70 },
                { stage: "Accepted by Partner", value: Math.round((d.totalOpportunities ?? 0) * 0.35), pct: 35 },
                { stage: "Converted (Job Closed)", value: d.convertedOpportunities, pct: d.totalOpportunities ? Math.round(((d.convertedOpportunities ?? 0) / d.totalOpportunities) * 100) : 0 },
              ].map((step, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{step.stage}</span>
                    <span className="text-white font-semibold">{step.value ?? 0} <span className="text-gray-500 text-xs">({step.pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${step.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs mt-4 text-center">
              * Estimated rates — wire funnelEvents to get real data
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
