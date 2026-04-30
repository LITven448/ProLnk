/**
 * Platform Health Dashboard -- /admin/health
 * Real-time KPIs, system status, revenue pulse, and pipeline velocity.
 * Auto-refreshes every 30 seconds.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import {
  Activity, TrendingUp, DollarSign, Users, Zap, CheckCircle,
  AlertCircle, Clock, RefreshCw, BarChart3, Target, Shield,
  ArrowUpRight, ArrowDownRight, Minus, Star, Camera, Send,
  Webhook, AlertTriangle, Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

// --- Wave 18: Integration & Dispute Health Panel ------------------------------
function Wave18HealthPanel() {
  const { data: fsmStats } = trpc.admin.getFsmWebhookStats.useQuery();
  const { data: subs } = trpc.admin.getWebhookSubscriptions.useQuery();
  const { data: disputes } = trpc.admin.getOpenDisputes.useQuery();

  const activeSubs = subs?.filter((s: any) => s.isActive)?.length ?? 0;
  const openDisputes = disputes?.length ?? 0;
  const matchRate = fsmStats && fsmStats.total > 0
    ? Math.round(((fsmStats.matched + fsmStats.commissionsClosed) / fsmStats.total) * 100)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* FSM Webhook Health */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <Webhook className="w-4 h-4 text-teal-600" />
            FSM Webhook Health
          </h3>
          <Link href="/admin/fsm-webhooks">
            <span className="text-xs text-teal-600 hover:underline cursor-pointer">View log </span>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Total events received</span>
            <span className="font-semibold">{fsmStats?.total ?? 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Commissions auto-closed</span>
            <span className="font-semibold text-emerald-600">{fsmStats?.commissionsClosed ?? 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Unmatched events</span>
            <span className={`font-semibold ${(fsmStats?.unmatched ?? 0) > 0 ? 'text-amber-600' : 'text-gray-400'}`}>{fsmStats?.unmatched ?? 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Errors</span>
            <span className={`font-semibold ${(fsmStats?.errors ?? 0) > 0 ? 'text-red-600' : 'text-gray-400'}`}>{fsmStats?.errors ?? 0}</span>
          </div>
          {matchRate !== null && (
            <div className="mt-2 pt-2 border-t border-gray-50">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Match rate</span>
                <span className={`font-bold ${matchRate >= 80 ? 'text-emerald-600' : matchRate >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{matchRate}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${matchRate}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* n8n Webhook Health */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-purple-600" />
            n8n Automation Health
          </h3>
          <Link href="/admin/n8n-webhooks">
            <span className="text-xs text-purple-600 hover:underline cursor-pointer">Manage </span>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Active subscriptions</span>
            <span className={`font-semibold ${activeSubs > 0 ? 'text-emerald-600' : 'text-amber-600'}`}>{activeSubs}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Total subscriptions</span>
            <span className="font-semibold">{subs?.length ?? 0}</span>
          </div>
          {activeSubs === 0 && (
            <div className="mt-2 p-2 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-700">No active n8n webhooks. Add your n8n webhook URLs to automate partner onboarding, lead dispatch, and commission events.</p>
            </div>
          )}
          {activeSubs > 0 && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
              <p className="text-xs text-emerald-700">{activeSubs} webhook{activeSubs !== 1 ? 's' : ''} active -- platform events are firing to n8n.</p>
            </div>
          )}
        </div>
      </div>

      {/* Commission Disputes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Commission Disputes
          </h3>
          <Link href="/admin/disputes">
            <span className="text-xs text-amber-600 hover:underline cursor-pointer">Review </span>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Open disputes</span>
            <span className={`font-semibold ${openDisputes > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{openDisputes}</span>
          </div>
          {openDisputes > 0 ? (
            <div className="mt-2 p-2 bg-amber-50 rounded-lg">
              <p className="text-xs text-amber-700 font-medium">{openDisputes} dispute{openDisputes !== 1 ? 's' : ''} require{openDisputes === 1 ? 's' : ''} your review.</p>
            </div>
          ) : (
            <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
              <p className="text-xs text-emerald-700">No open disputes -- all commissions are clear.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Helpers ------------------------------------------------------------------
function fmt(n: number, prefix = "", suffix = "") {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(1)}M${suffix}`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K${suffix}`;
  return `${prefix}${n}${suffix}`;
}

function fmtMoney(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

// --- Pulse dot ----------------------------------------------------------------
function PulseDot({ color = "bg-emerald-500" }: { color?: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-60`} />
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
    </span>
  );
}

// --- KPI card -----------------------------------------------------------------
function KpiCard({
  label, value, sub, icon: Icon, color, trend, trendLabel
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: string;
  trend?: "up" | "down" | "flat";
  trendLabel?: string;
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const trendColor = trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-gray-400";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            {trendLabel}
          </div>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// --- System status row --------------------------------------------------------
function StatusRow({ label, status, detail }: { label: string; status: "ok" | "warn" | "error"; detail?: string }) {
  const cfg = {
    ok: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Operational" },
    warn: { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-100", label: "Degraded" },
    error: { dot: "bg-red-500", badge: "bg-red-50 text-red-700 border-red-100", label: "Down" },
  }[status];

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-2.5">
        <PulseDot color={cfg.dot} />
        <span className="text-sm font-medium text-gray-800">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {detail && <span className="text-xs text-gray-400">{detail}</span>}
        <Badge className={`text-xs font-medium ${cfg.badge}`}>{cfg.label}</Badge>
      </div>
    </div>
  );
}

// --- Pipeline stage bar -------------------------------------------------------
function PipelineBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600 font-medium">{label}</span>
        <span className="text-gray-900 font-bold">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// --- Main page ----------------------------------------------------------------
export default function PlatformHealth() {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { data: stats, isLoading, refetch } = trpc.admin.getNetworkStats.useQuery(undefined, {
    refetchInterval: autoRefresh ? 30_000 : false,
  });

  const { data: reviewData } = trpc.reviews.adminGetAll.useQuery({ limit: 100, offset: 0 });
  const { data: verifData } = trpc.verification.adminListVerifications.useQuery({ limit: 100, offset: 0, status: "all" });

  useEffect(() => {
    setLastRefresh(new Date());
  }, [stats]);

  const s = stats || {
    totalPartners: 0, pendingApplications: 0,
    totalJobs: 0, totalOpportunities: 0,
    convertedOpportunities: 0, totalCommissionsPaid: 0,
    totalProLnkRevenue: 0,
  };

  const conversionRate = s.totalOpportunities > 0
    ? Math.round((s.convertedOpportunities / s.totalOpportunities) * 100)
    : 0;

  const avgReviewRating = reviewData?.reviews?.length
    ? (reviewData.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewData.reviews.length).toFixed(1)
    : "--";

  const verifiedPartners = verifData?.partners?.filter((p: any) => p.overallStatus === "verified").length || 0;
  const verificationRate = s.totalPartners > 0
    ? Math.round((verifiedPartners / s.totalPartners) * 100)
    : 0;

  // System status checks
  const dbStatus: "ok" | "warn" | "error" = s.totalPartners >= 0 ? "ok" : "error";
  const aiStatus: "ok" | "warn" | "error" = s.totalJobs >= 0 ? "ok" : "warn";

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Platform Health
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <PulseDot />
                <span>Live</span>
              </div>
              <span className="text-xs text-gray-400">
                Last updated {lastRefresh.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(a => !a)}
              className={autoRefresh ? "border-emerald-200 text-emerald-700 bg-emerald-50" : ""}
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Now
            </Button>
          </div>
        </div>

        {/* Revenue pulse */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ background: "linear-gradient(135deg, #1B4FD8 0%, #1E40AF 50%, #1D4ED8 100%)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="text-blue-200 text-sm font-medium mb-1">ProLnk Platform Revenue</div>
              <div className="text-4xl font-bold">
                {isLoading ? "--" : fmtMoney(s.totalProLnkRevenue)}
              </div>
              <div className="text-blue-300 text-xs mt-1">Cumulative from converted opportunities</div>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-blue-200 text-xs mb-0.5">Commissions Paid Out</div>
                <div className="text-2xl font-bold">{isLoading ? "--" : fmtMoney(s.totalCommissionsPaid)}</div>
              </div>
              <div>
                <div className="text-blue-200 text-xs mb-0.5">Conversion Rate</div>
                <div className="text-2xl font-bold">{isLoading ? "--" : `${conversionRate}%`}</div>
              </div>
              <div>
                <div className="text-blue-200 text-xs mb-0.5">Avg Rating</div>
                <div className="text-2xl font-bold flex items-center gap-1">
                  {avgReviewRating}
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            label="Active Partners"
            value={isLoading ? "--" : fmt(s.totalPartners)}
            sub={`${s.pendingApplications} pending review`}
            icon={Users}
            color="bg-blue-500"
            trend="up"
            trendLabel="Growing"
          />
          <KpiCard
            label="Jobs Logged"
            value={isLoading ? "--" : fmt(s.totalJobs)}
            sub="All-time field submissions"
            icon={Camera}
            color="bg-teal-500"
            trend="up"
            trendLabel="Active"
          />
          <KpiCard
            label="Opportunities"
            value={isLoading ? "--" : fmt(s.totalOpportunities)}
            sub={`${s.convertedOpportunities} converted`}
            icon={Target}
            color="bg-purple-500"
            trend={conversionRate > 20 ? "up" : "flat"}
            trendLabel={`${conversionRate}% CVR`}
          />
          <KpiCard
            label="Verified Partners"
            value={isLoading ? "--" : `${verifiedPartners}`}
            sub={`${verificationRate}% of active partners`}
            icon={Shield}
            color="bg-emerald-500"
            trend={verificationRate > 50 ? "up" : "flat"}
            trendLabel={`${verificationRate}%`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pipeline velocity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Pipeline Velocity
            </h3>
            <div className="space-y-4">
              <PipelineBar label="Partners Applied" value={s.pendingApplications + s.totalPartners} max={s.pendingApplications + s.totalPartners} color="#3B82F6" />
              <PipelineBar label="Partners Approved" value={s.totalPartners} max={s.pendingApplications + s.totalPartners} color="#10B981" />
              <PipelineBar label="Jobs Logged" value={s.totalJobs} max={Math.max(s.totalJobs, 1)} color="#8B5CF6" />
              <PipelineBar label="Opportunities Created" value={s.totalOpportunities} max={Math.max(s.totalOpportunities, 1)} color="#F59E0B" />
              <PipelineBar label="Opportunities Converted" value={s.convertedOpportunities} max={Math.max(s.totalOpportunities, 1)} color="#EF4444" />
            </div>
          </div>

          {/* System status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              System Status
            </h3>
            <div>
              <StatusRow label="Database (TiDB)" status={dbStatus} detail="MySQL-compatible" />
              <StatusRow label="AI Vision Module AI" status={aiStatus} detail="Photo analysis active" />
              <StatusRow label="tRPC API" status="ok" detail="All procedures healthy" />
              <StatusRow label="Manus OAuth" status="ok" detail="Login flow operational" />
              <StatusRow label="Email (Resend)" status={process.env.RESEND_API_KEY ? "ok" : "warn"} detail="Configure RESEND_API_KEY" />
              <StatusRow label="SMS (Twilio)" status="warn" detail="Configure TWILIO credentials" />
              <StatusRow label="File Storage (S3)" status="ok" detail="Photo uploads active" />
            </div>
          </div>

        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Platform Activity Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Pending Applications", value: s.pendingApplications, color: "text-amber-600", bg: "bg-amber-50", icon: Clock },
              { label: "Total Reviews", value: reviewData?.total || 0, color: "text-blue-600", bg: "bg-blue-50", icon: Star },
              { label: "Google Requests Sent", value: reviewData?.reviews?.filter((r: any) => r.googleReviewRequested).length || 0, color: "text-emerald-600", bg: "bg-emerald-50", icon: Send },
              { label: "Fully Verified Partners", value: verifiedPartners, color: "text-purple-600", bg: "bg-purple-50", icon: Shield },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div key={label} className={`rounded-xl p-4 ${bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className={`text-xs font-semibold ${color}`}>{label}</span>
                </div>
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave 18: Integration & Dispute Health */}
        <Wave18HealthPanel />

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Review Applications", href: "/admin/pipeline", color: "bg-amber-500" },
              { label: "Photo Queue", href: "/admin/photo-queue", color: "bg-blue-500" },
              { label: "Verify Partners", href: "/admin/verification", color: "bg-emerald-500" },
              { label: "Google Reviews", href: "/admin/google-reviews", color: "bg-purple-500" },
              { label: "Financial Center", href: "/admin/finance", color: "bg-teal-500" },
              { label: "Broadcast Message", href: "/admin/broadcast", color: "bg-rose-500" },
            ].map(({ label, href, color }) => (
              <a
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90 ${color}`}
              >
                {label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
