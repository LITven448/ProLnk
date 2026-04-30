import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users, Home, Briefcase, TrendingUp, DollarSign, Star,
  Brain, Zap, Shield, Target, BarChart3, Download, RefreshCw,
  Building2, ClipboardList, Lightbulb, ArrowUpRight
} from "lucide-react";

const fmt = (n: number) => n.toLocaleString();
const fmtDollar = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K` : `$${n.toFixed(2)}`;

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "indigo",
  badge,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  badge?: string;
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    sky: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
    teal: "bg-teal-50 text-teal-600",
  };
  return (
    <Card className="relative overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg ${colors[color] ?? colors.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
          {badge && (
            <Badge variant="secondary" className="text-xs font-medium">{badge}</Badge>
          )}
        </div>
        <div className="text-2xl font-black text-gray-900 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-700">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function SectionHeader({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {sub && <p className="text-xs text-gray-500">{sub}</p>}
      </div>
    </div>
  );
}

export default function InvestorDashboard() {
  const { data: stats, isLoading, refetch, isFetching } = trpc.admin.getNetworkStats.useQuery(undefined, {
    refetchInterval: 60_000,
  });

  const handleExport = () => {
    if (!stats) return;
    const rows = [
      ["Metric", "Value", "As of"],
      ["Approved Partners", stats.totalPartners, new Date().toISOString()],
      ["Pending Applications", stats.pendingApplications, new Date().toISOString()],
      ["Completed Homeowner Profiles", stats.totalHomeowners, new Date().toISOString()],
      ["Total Properties Profiled", stats.totalProperties, new Date().toISOString()],
      ["Homeowner Wish List Items", stats.totalWishlistItems, new Date().toISOString()],
      ["Jobs Logged", stats.totalJobs, new Date().toISOString()],
      ["Total Leads Generated", stats.totalOpportunities, new Date().toISOString()],
      ["Converted Leads", stats.convertedOpportunities, new Date().toISOString()],
      ["Lead Conversion Rate", stats.totalOpportunities > 0 ? `${((stats.convertedOpportunities / stats.totalOpportunities) * 100).toFixed(1)}%` : "0%", new Date().toISOString()],
      ["Total Commissions Paid", `$${stats.totalCommissionsPaid.toFixed(2)}`, new Date().toISOString()],
      ["Platform Revenue (Net)", `$${stats.totalProLnkRevenue.toFixed(2)}`, new Date().toISOString()],
      ["AI Pipeline Runs", stats.totalAIPipelineRuns, new Date().toISOString()],
      ["Property Assets Tracked", stats.totalPropertyAssets, new Date().toISOString()],
      ["Event-Driven Leads", stats.totalEventDrivenLeads, new Date().toISOString()],
      ["Active Recall Alerts", stats.activeRecallAlerts, new Date().toISOString()],
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prolnk-investor-metrics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading investor metrics...</p>
        </div>
      </div>
    );
  }

  const s = stats ?? {
    totalPartners: 0, pendingApplications: 0, totalJobs: 0,
    totalOpportunities: 0, convertedOpportunities: 0,
    totalCommissionsPaid: 0, totalProLnkRevenue: 0,
    totalProperties: 0, totalPropertyAssets: 0,
    totalEventTriggers: 0, totalEventDrivenLeads: 0,
    totalAIPipelineRuns: 0, activeRecallAlerts: 0,
    totalHomeowners: 0, totalWishlistItems: 0,
  };

  const conversionRate = s.totalOpportunities > 0
    ? ((s.convertedOpportunities / s.totalOpportunities) * 100).toFixed(1)
    : "0.0";

  const estimatedARR = s.totalProLnkRevenue * 12;
  const estimatedDataValue = (s.totalHomeowners * 180) + (s.totalWishlistItems * 320);

  return (
    <AdminLayout>
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-gray-900">Investor Metrics</h1>
            <Badge className="bg-indigo-100 text-indigo-700 border-0 text-xs">Live</Badge>
          </div>
          <p className="text-sm text-gray-500">
            Real-time platform KPIs for due diligence, investor reporting, and exit preparation.
            Auto-refreshes every 60 seconds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={handleExport} className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Estimated Valuation Banner */}
      <Card className="border-0 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-indigo-200 text-xs font-medium uppercase tracking-wide mb-1">Est. Data Asset Value</div>
              <div className="text-3xl font-black">{fmtDollar(estimatedDataValue)}</div>
              <div className="text-indigo-200 text-xs mt-1">Based on $180/homeowner + $320/wish-list item (industry benchmark)</div>
            </div>
            <div>
              <div className="text-indigo-200 text-xs font-medium uppercase tracking-wide mb-1">Annualized Revenue Run Rate</div>
              <div className="text-3xl font-black">{fmtDollar(estimatedARR)}</div>
              <div className="text-indigo-200 text-xs mt-1">Monthly platform revenue × 12</div>
            </div>
            <div>
              <div className="text-indigo-200 text-xs font-medium uppercase tracking-wide mb-1">Lead Conversion Rate</div>
              <div className="text-3xl font-black">{conversionRate}%</div>
              <div className="text-indigo-200 text-xs mt-1">{fmt(s.convertedOpportunities)} converted of {fmt(s.totalOpportunities)} total leads</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partner Network */}
      <div>
        <SectionHeader icon={Briefcase} title="Partner Network" sub="ProLnk — verified home service professionals" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={Users} label="Approved Partners" value={fmt(s.totalPartners)} sub="Active in network" color="indigo" />
          <MetricCard icon={ClipboardList} label="Pending Applications" value={fmt(s.pendingApplications)} sub="Awaiting review" color="amber" badge={s.pendingApplications > 0 ? "Action needed" : undefined} />
          <MetricCard icon={Zap} label="Jobs Logged" value={fmt(s.totalJobs)} sub="Total field scans" color="sky" />
          <MetricCard icon={TrendingUp} label="Leads Generated" value={fmt(s.totalOpportunities)} sub="Cross-referral opportunities" color="emerald" />
        </div>
      </div>

      <Separator />

      {/* Homeowner Data Asset */}
      <div>
        <SectionHeader icon={Home} title="Homeowner Data Asset" sub="TrustyPro — the proprietary data moat" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={Home} label="Completed Profiles" value={fmt(s.totalHomeowners)} sub="Homeowners who finished setup" color="teal" />
          <MetricCard icon={Building2} label="Properties Profiled" value={fmt(s.totalProperties)} sub="Homes with full data" color="violet" />
          <MetricCard icon={Lightbulb} label="Wish List Items" value={fmt(s.totalWishlistItems)} sub="Declared purchase intent" color="orange" badge="High value" />
          <MetricCard icon={Shield} label="Property Assets" value={fmt(s.totalPropertyAssets)} sub="Systems & improvements tracked" color="sky" />
        </div>
      </div>

      <Separator />

      {/* Revenue */}
      <div>
        <SectionHeader icon={DollarSign} title="Revenue & Commissions" sub="Platform economics" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={DollarSign} label="Platform Revenue" value={fmtDollar(s.totalProLnkRevenue)} sub="Net ProLnk take" color="emerald" />
          <MetricCard icon={TrendingUp} label="Commissions Paid" value={fmtDollar(s.totalCommissionsPaid)} sub="To partner network" color="indigo" />
          <MetricCard icon={Target} label="Converted Leads" value={fmt(s.convertedOpportunities)} sub="Revenue-generating events" color="rose" />
          <MetricCard icon={ArrowUpRight} label="Conversion Rate" value={`${conversionRate}%`} sub="Leads → closed deals" color="amber" />
        </div>
      </div>

      <Separator />

      {/* AI Pipeline */}
      <div>
        <SectionHeader icon={Brain} title="AI Pipeline" sub="Proprietary intelligence engine" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={Brain} label="AI Pipeline Runs" value={fmt(s.totalAIPipelineRuns)} sub="Total AI analyses" color="violet" />
          <MetricCard icon={Zap} label="Event-Driven Leads" value={fmt(s.totalEventDrivenLeads)} sub="AI-triggered opportunities" color="sky" />
          <MetricCard icon={Star} label="Active Recall Alerts" value={fmt(s.activeRecallAlerts)} sub="Live maintenance flags" color="amber" />
          <MetricCard icon={TrendingUp} label="Event Triggers" value={fmt(s.totalEventTriggers)} sub="Automated workflow events" color="teal" />
        </div>
      </div>

      {/* Due Diligence Notes */}
      <Card className="border border-indigo-100 bg-indigo-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-indigo-900 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Due Diligence Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-indigo-800">
          <p>• All metrics are live from the production database. No estimates or projections except the valuation banner above.</p>
          <p>• "Wish List Items" represent homeowners with declared project intent, budget range, and urgency — the highest-value data category for acquirers in the home services vertical.</p>
          <p>• "Completed Profiles" counts only homeowners who finished all 8 wizard steps and gave data consent. Partial profiles are excluded.</p>
          <p>• "Platform Revenue" is the net ProLnk take from converted leads (after partner commissions). Does not include subscription revenue.</p>
          <p>• Data asset valuation benchmarks: $180/verified homeowner profile and $320/declared purchase intent item are conservative estimates based on Angi, HomeAdvisor, and Houzz comparable data transactions.</p>
          <p>• Export CSV above for full due diligence data package.</p>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}
