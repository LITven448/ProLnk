/**
 * Admin Platform Health Dashboard
 * Real-time platform metrics — replaces the static stub.
 * Route: /admin/platform-health
 */

import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity, Zap, DollarSign, Users, Home, Camera, Shield,
  AlertTriangle, CheckCircle, Clock, TrendingUp, Database, RefreshCw,
} from "lucide-react";

function MetricCard({ title, value, subtitle, icon, status }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  status?: "ok" | "warning" | "critical";
}) {
  const statusColors = { ok: "border-green-500/20", warning: "border-yellow-500/20", critical: "border-red-500/20" };
  return (
    <Card className={`bg-gray-800 border ${status ? statusColors[status] : "border-gray-700"}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="text-gray-400">{icon}</div>
          {status && (
            <div className={`w-2 h-2 rounded-full ${status === "ok" ? "bg-green-500" : status === "warning" ? "bg-yellow-500" : "bg-red-500"}`} />
          )}
        </div>
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-gray-400 text-xs mt-0.5">{title}</div>
        {subtitle && <div className="text-gray-600 text-xs mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}

export default function PlatformHealthDashboard() {
  const health = trpc.admin.getPlatformHealth.useQuery(undefined, { refetchInterval: 30000 });
  const networkStats = trpc.network.getStats.useQuery(undefined, { refetchInterval: 30000 });

  const d = health.data ?? {};
  const s = networkStats.data ?? {};

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Activity className="w-6 h-6 text-teal-400" />
              Platform Health
            </h1>
            <p className="text-gray-400 text-sm mt-1">Real-time platform metrics — auto-refreshes every 30 seconds</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-700 text-gray-400 gap-2"
            onClick={() => { health.refetch(); networkStats.refetch(); }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Critical alerts */}
        {(d.pendingStormLeads > 0 || d.unpaidCommissions > 50) && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h3 className="font-bold text-red-400 text-sm mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Attention Required
            </h3>
            <div className="space-y-1 text-xs text-red-300">
              {d.pendingStormLeads > 0 && <p>• {d.pendingStormLeads} storm leads not yet dispatched to partners</p>}
              {d.unpaidCommissions > 50 && <p>• {d.unpaidCommissions} unpaid commissions (${parseFloat(String(d.unpaidAmount || "0")).toLocaleString()}) — check payout sweep</p>}
            </div>
          </div>
        )}

        {/* Main metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Active Partners" value={s.totalPartners ?? "-"} icon={<Users className="w-5 h-5" />} status="ok" />
          <MetricCard title="Pending Applications" value={d.pendingApplications ?? "-"} icon={<Clock className="w-5 h-5" />} status={d.pendingApplications > 5 ? "warning" : "ok"} />
          <MetricCard title="Photos Processing" value={d.photosProcessingNow ?? "-"} subtitle="Last hour" icon={<Camera className="w-5 h-5" />} status="ok" />
          <MetricCard title="Opportunities Pending Review" value={d.pendingOpportunities ?? "-"} icon={<Zap className="w-5 h-5" />} status={d.pendingOpportunities > 20 ? "warning" : "ok"} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Unpaid Commissions" value={d.unpaidCommissions ?? "-"} subtitle={`$${parseFloat(String(d.unpaidAmount || "0")).toLocaleString()}`} icon={<DollarSign className="w-5 h-5" />} status={d.unpaidAmount > 10000 ? "warning" : "ok"} />
          <MetricCard title="Payouts (24h)" value={d.payoutsLast24h ?? "-"} subtitle={`$${parseFloat(String(d.payoutVolumelast24h || "0")).toLocaleString()}`} icon={<TrendingUp className="w-5 h-5" />} status="ok" />
          <MetricCard title="Storm Leads Pending" value={d.pendingStormLeads ?? 0} icon={<Zap className="w-5 h-5" />} status={d.pendingStormLeads > 0 ? "critical" : "ok"} />
          <MetricCard title="Incomplete Briefcases" value={d.incompleteBriefcases ?? 0} icon={<Shield className="w-5 h-5" />} status={d.incompleteBriefcases > 10 ? "warning" : "ok"} />
        </div>

        {/* Platform totals */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-base font-semibold flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              Platform Totals
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {[
              { label: "Total Jobs", value: s.totalJobs },
              { label: "Total Opportunities", value: s.totalOpportunities },
              { label: "Converted Leads", value: s.convertedOpportunities },
              { label: "Commissions Paid", value: `$${parseFloat(String(s.totalCommissionsPaid || "0")).toLocaleString()}` },
              { label: "Homeowners", value: s.totalHomeowners },
              { label: "Properties in Vault", value: s.totalProperties },
              { label: "ProLnk Revenue", value: `$${parseFloat(String(s.totalProLnkRevenue || "0")).toLocaleString()}` },
              { label: "Bids on Closing Today", value: d.closingSoonBids ?? 0 },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-white">{item.value ?? "-"}</div>
                <div className="text-gray-500 text-xs mt-0.5">{item.label}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Service status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-white text-base font-semibold">Service Status</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { service: "Database", status: "ok" },
                { service: "Stripe", status: process.env.STRIPE_SECRET_KEY ? "ok" : "warning" },
                { service: "Resend Email", status: process.env.RESEND_API_KEY ? "ok" : "warning" },
                { service: "OpenAI", status: process.env.OPENAI_API_KEY ? "ok" : "warning" },
                { service: "Zep Memory", status: process.env.ZEP_API_KEY ? "ok" : "warning" },
                { service: "Twilio SMS", status: process.env.TWILIO_ACCOUNT_SID ? "ok" : "warning" },
                { service: "CompanyCam", status: process.env.COMPANYCAM_CLIENT_ID ? "ok" : "warning" },
                { service: "Inngest Jobs", status: process.env.INNGEST_EVENT_KEY ? "ok" : "warning" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.status === "ok" ? "bg-green-500" : "bg-yellow-500"}`} />
                  <span className={item.status === "ok" ? "text-gray-400" : "text-yellow-400"}>{item.service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
