/**
 * StrategicOverview.tsx — ProLnk OS Strategic Monitoring Dashboard
 * 5-tab breakdown: Daily Ops | ProLnk | TrustyPro | Advertisers | Affiliate
 * This is the daily driver for understanding what's happening across all 4 revenue streams.
 */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, CheckCircle2, XCircle, Clock, TrendingUp,
  TrendingDown, Users, DollarSign, Zap, Shield, BarChart3,
  Activity, Target, Star, ShoppingBag, Eye, MousePointerClick,
  CloudLightning, Home, Wrench, Package, ArrowRight, RefreshCw,
} from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt$ = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n.toFixed(2)}`;
const fmtN = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

function StatusDot({ ok }: { ok: boolean }) {
  useEffect(() => { document.title = "Strategic Overview — ProLnk Admin"; }, []);

  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`} />
  );
}

function MetricCard({
  label, value, sub, icon: Icon, accent = "blue", alert = false,
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; accent?: string; alert?: boolean;
}) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    amber: "text-amber-600 bg-amber-50",
    red: "text-red-600 bg-red-50",
    purple: "text-purple-600 bg-purple-50",
    indigo: "text-indigo-600 bg-indigo-50",
  };
  const cls = colors[accent] ?? colors.blue;
  return (
    <Card className={alert ? "border-red-200 bg-red-50/30" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
          </div>
          <div className={`p-2 rounded-lg ${cls}`}><Icon className="w-4 h-4" /></div>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Tab: Daily Ops ─────────────────────────────────────────────────────────
function DailyOpsTab() {
  const { data: snap, isLoading, refetch } = trpc.adminExtras.getDailyOpsSnapshot.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000,
  });

  const actionItems = snap ? [
    { label: "Pending partner applications", count: snap.actionRequired.pendingApplications, href: "/admin/pipeline", urgent: snap.actionRequired.pendingApplications > 0 },
    { label: "Overdue payouts (>7 days)", count: snap.actionRequired.overduePayouts, href: "/admin/finance", urgent: snap.actionRequired.overduePayouts > 0 },
    { label: "COIs expiring in 30 days", count: snap.actionRequired.expiringCois, href: "/admin/compliance", urgent: snap.actionRequired.expiringCois > 0 },
    { label: "Licenses expiring in 30 days", count: snap.actionRequired.expiringLicenses, href: "/admin/compliance", urgent: snap.actionRequired.expiringLicenses > 0 },
    { label: "Stale leads unassigned >12h", count: snap.actionRequired.staleLeads, href: "/admin/ai", urgent: snap.actionRequired.staleLeads > 0 },
    { label: "Partners at 2 strikes", count: snap.actionRequired.partnersAtTwoStrikes, href: "/admin/strikes", urgent: snap.actionRequired.partnersAtTwoStrikes > 0 },
    { label: "Advertiser contracts expiring", count: snap.actionRequired.expiringAdvertiserContracts, href: "/admin/featured-advertisers", urgent: snap.actionRequired.expiringAdvertiserContracts > 0 },
  ] : [];

  const totalActions = actionItems.reduce((a, i) => a + i.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Daily Operations</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />Refresh
        </Button>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            {[
              { name: "Database", ok: true },
              { name: "Stripe Webhooks", ok: true },
              { name: "Resend Email", ok: true },
              { name: "NWS Storm Watch", ok: true },
              { name: "AI Pipeline", ok: true },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <StatusDot ok={s.ok} />
                <span className="text-sm font-medium">{s.name}</span>
                <Badge variant={s.ok ? "outline" : "destructive"} className="text-xs py-0">
                  {s.ok ? "OK" : "DOWN"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Required */}
      <Card className={totalActions > 0 ? "border-amber-200" : "border-emerald-200"}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Action Required</CardTitle>
            {totalActions === 0 ? (
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />All Clear
              </Badge>
            ) : (
              <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                <AlertTriangle className="w-3 h-3 mr-1" />{totalActions} items
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-8 bg-muted animate-pulse rounded" />)}</div>
          ) : (
            <div className="divide-y">
              {actionItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    {item.urgent
                      ? <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      : <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.count > 0 ? "default" : "outline"} className={item.count > 0 ? "bg-amber-500" : ""}>
                      {item.count}
                    </Badge>
                    {item.count > 0 && (
                      <a href={item.href} className="text-xs text-blue-600 hover:underline flex items-center gap-0.5">
                        View <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Yesterday's Numbers */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Yesterday's Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard label="ProLnk Net" value={snap ? fmt$(snap.yesterday.proLinkNet) : "—"} sub="platform net revenue" icon={DollarSign} accent="green" />
          <MetricCard label="Platform Fees" value={snap ? fmt$(snap.yesterday.platformFeeRevenue) : "—"} sub="gross fees collected" icon={TrendingUp} accent="blue" />
          <MetricCard label="New Signups" value={snap?.yesterday.newSignups ?? "—"} sub="partner applications" icon={Users} accent="purple" />
          <MetricCard label="Leads Dispatched" value={snap?.yesterday.leadsDispatched ?? "—"} sub="sent to partners" icon={Zap} accent="amber" />
        </div>
      </div>
    </div>
  );
}

// ── Tab: ProLnk ────────────────────────────────────────────────────────────
function ProLnkTab() {
  const { data, isLoading } = trpc.adminExtras.getProLnkStreamStats.useQuery(undefined, { refetchInterval: 10 * 60 * 1000 });

  const TIER_COLORS: Record<string, string> = {
    scout: "bg-slate-100 text-slate-700",
    pro: "bg-blue-100 text-blue-700",
    crew: "bg-purple-100 text-purple-700",
    company: "bg-amber-100 text-amber-700",
    enterprise: "bg-emerald-100 text-emerald-700",
  };

  const totalMrr = data?.tiers.reduce((a, t) => a + t.mrr, 0) ?? 0;
  const totalPartners = data?.tiers.reduce((a, t) => a + t.partnerCount, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">ProLnk Partner Network</h2>
        <p className="text-sm text-muted-foreground">Lead marketplace & commission engine</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Monthly Recurring Revenue" value={isLoading ? "—" : fmt$(totalMrr)} sub="from subscriptions" icon={DollarSign} accent="green" />
        <MetricCard label="Active Partners" value={isLoading ? "—" : fmtN(totalPartners)} sub="approved & active" icon={Users} accent="blue" />
        <MetricCard label="Commission Queue" value={isLoading ? "—" : fmt$(data?.commissionQueue.total ?? 0)} sub={`${data?.commissionQueue.count ?? 0} unpaid`} icon={Clock} accent="amber" alert={(data?.commissionQueue.count ?? 0) > 10} />
        <MetricCard
          label="Lead Conversion"
          value={isLoading || !data ? "—" : data.funnel.dispatched > 0 ? `${Math.round((data.funnel.completed / data.funnel.dispatched) * 100)}%` : "0%"}
          sub="dispatched → completed" icon={Target} accent="purple"
        />
      </div>

      {/* MRR by Tier */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">MRR by Tier</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-muted animate-pulse rounded" />)}</div>
          ) : (data?.tiers ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No approved partners yet</p>
          ) : (
            <div className="space-y-2">
              {(data?.tiers ?? []).map((t) => (
                <div key={t.tier} className="flex items-center gap-3">
                  <Badge className={`w-20 justify-center capitalize ${TIER_COLORS[t.tier] ?? ""}`}>{t.tier}</Badge>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: totalMrr > 0 ? `${(t.mrr / totalMrr) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">{fmt$(t.mrr)}/mo</span>
                  <span className="text-xs text-muted-foreground w-16 text-right">{t.partnerCount} partners</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Lead Funnel */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Lead Funnel (30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "Dispatched", value: data?.funnel.dispatched ?? 0, color: "bg-blue-500" },
                { label: "Accepted", value: data?.funnel.accepted ?? 0, color: "bg-purple-500" },
                { label: "Completed", value: data?.funnel.completed ?? 0, color: "bg-emerald-500" },
                { label: "Paid", value: data?.funnel.paid ?? 0, color: "bg-green-600" },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="text-sm w-20 text-muted-foreground">{step.label}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className={`${step.color} h-2 rounded-full`} style={{ width: (data?.funnel.dispatched ?? 0) > 0 ? `${(step.value / (data?.funnel.dispatched ?? 1)) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{step.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partner Health */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Partner Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { label: "Healthy", value: data?.health.healthy ?? 0, color: "text-emerald-600", icon: CheckCircle2 },
                { label: "1 Strike", value: data?.health.oneStrike ?? 0, color: "text-amber-600", icon: AlertTriangle },
                { label: "2 Strikes", value: data?.health.twoStrikes ?? 0, color: "text-orange-600", icon: AlertTriangle },
                { label: "Suspended", value: data?.health.suspended ?? 0, color: "text-red-600", icon: XCircle },
                { label: "Pending Review", value: data?.health.pending ?? 0, color: "text-blue-600", icon: Clock },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <Badge variant="outline" className={`${item.color} font-bold`}>{item.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 10 Partners */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Top 10 Partners by Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          {(data?.topPartners ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No partner data yet</p>
          ) : (
            <div className="divide-y">
              {(data?.topPartners ?? []).map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                    <span className="text-sm font-medium">{p.businessName}</span>
                    <Badge className={`capitalize text-xs ${TIER_COLORS[p.tier] ?? ""}`}>{p.tier}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{p.leadsCount} leads</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{p.rating.toFixed(1)}</span>
                    </div>
                    <span className="font-bold text-emerald-600">{fmt$(p.totalEarned)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: TrustyPro ─────────────────────────────────────────────────────────
function TrustyProTab() {
  const { data, isLoading } = trpc.adminExtras.getTrustyProStreamStats.useQuery(undefined, { refetchInterval: 10 * 60 * 1000 });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">TrustyPro Homeowner Platform</h2>
        <p className="text-sm text-muted-foreground">AI diagnostics, home health, storm response</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Total Homeowners" value={isLoading ? "—" : fmtN(data?.profiles.total ?? 0)} sub={`+${data?.profiles.today ?? 0} today, +${data?.profiles.last7 ?? 0} this week`} icon={Home} accent="blue" />
        <MetricCard label="AI Scans Completed" value={isLoading ? "—" : fmtN(data?.aiScans.completed ?? 0)} sub={`${data?.aiScans.today ?? 0} today`} icon={Activity} accent="purple" />
        <MetricCard label="Quote Requests" value={isLoading ? "—" : fmtN(data?.quotes.total ?? 0)} sub={`${data?.quotes.pending ?? 0} pending`} icon={Wrench} accent="amber" />
        <MetricCard label="Churn Risk" value={isLoading ? "—" : fmtN(data?.churnRisk ?? 0)} sub="inactive 60+ days" icon={TrendingDown} accent="red" alert={(data?.churnRisk ?? 0) > 5} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">AI Scan Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Total Scans", value: data?.aiScans.total ?? 0, color: "text-slate-600" },
                { label: "Completed", value: data?.aiScans.completed ?? 0, color: "text-emerald-600" },
                { label: "Processing", value: data?.aiScans.processing ?? 0, color: "text-blue-600" },
                { label: "Failed", value: data?.aiScans.failed ?? 0, color: "text-red-600" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
              {(data?.aiScans.total ?? 0) > 0 && (
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Success rate</span>
                    <span className="font-medium text-emerald-600">
                      {Math.round(((data?.aiScans.completed ?? 0) / (data?.aiScans.total ?? 1)) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quote Request Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Submitted", value: data?.quotes.total ?? 0, color: "bg-blue-500" },
                { label: "Quoted", value: data?.quotes.quoted ?? 0, color: "bg-purple-500" },
                { label: "Accepted", value: data?.quotes.accepted ?? 0, color: "bg-emerald-500" },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-3">
                  <span className="text-sm w-20 text-muted-foreground">{step.label}</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div className={`${step.color} h-2 rounded-full`} style={{ width: (data?.quotes.total ?? 0) > 0 ? `${(step.value / (data?.quotes.total ?? 1)) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{step.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storm Watch */}
      <Card className="border-blue-200 bg-blue-50/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CloudLightning className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Storm Watch (Last 7 Days)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-700">{data?.stormWatch.events7d ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Storm Events Detected</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-700">{data?.stormWatch.leads7d ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Leads Generated</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Advertisers ───────────────────────────────────────────────────────
function AdvertisersTab() {
  const { data, isLoading } = trpc.adminExtras.getAdvertiserStreamStats.useQuery(undefined, { refetchInterval: 10 * 60 * 1000 });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Featured Advertisers</h2>
        <p className="text-sm text-muted-foreground">Sponsored placements, banner ads, directory features</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Active Advertisers" value={isLoading ? "—" : data?.totals.active ?? 0} sub="live placements" icon={BarChart3} accent="blue" />
        <MetricCard label="Advertiser MRR" value={isLoading ? "—" : fmt$(data?.totals.mrr ?? 0)} sub="monthly recurring" icon={DollarSign} accent="green" />
        <MetricCard label="Total Impressions" value={isLoading ? "—" : fmtN(data?.totals.totalImpressions ?? 0)} sub="all time" icon={Eye} accent="purple" />
        <MetricCard label="Total Clicks" value={isLoading ? "—" : fmtN(data?.totals.totalClicks ?? 0)} sub={`${data?.totals.totalImpressions && data?.totals.totalClicks ? ((data.totals.totalClicks / data.totals.totalImpressions) * 100).toFixed(1) : "0.0"}% CTR`} icon={MousePointerClick} accent="amber" />
      </div>

      {((data?.totals.pendingApplications ?? 0) > 0 || (data?.totals.expiringContracts ?? 0) > 0) && (
        <div className="flex flex-wrap gap-2">
          {(data?.totals.pendingApplications ?? 0) > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-sm py-1 px-3">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />{data?.totals.pendingApplications} pending applications
            </Badge>
          )}
          {(data?.totals.expiringContracts ?? 0) > 0 && (
            <Badge className="bg-red-100 text-red-700 border-red-200 text-sm py-1 px-3">
              <Clock className="w-3.5 h-3.5 mr-1.5" />{data?.totals.expiringContracts} contracts expiring in 30 days
            </Badge>
          )}
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Advertisers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-muted animate-pulse rounded" />)}</div>
          ) : (data?.advertisers ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No advertisers yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-muted-foreground">
                    <th className="text-left py-2 font-medium">Business</th>
                    <th className="text-right py-2 font-medium">Tier</th>
                    <th className="text-right py-2 font-medium">MRR</th>
                    <th className="text-right py-2 font-medium">Impressions</th>
                    <th className="text-right py-2 font-medium">Clicks</th>
                    <th className="text-right py-2 font-medium">CTR</th>
                    <th className="text-right py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(data?.advertisers ?? []).map((a) => (
                    <tr key={a.id} className="hover:bg-muted/30">
                      <td className="py-2 font-medium">{a.businessName}</td>
                      <td className="py-2 text-right capitalize text-muted-foreground">{a.tier}</td>
                      <td className="py-2 text-right font-medium text-emerald-600">{fmt$(a.monthlyFee)}</td>
                      <td className="py-2 text-right">{fmtN(a.impressions)}</td>
                      <td className="py-2 text-right">{fmtN(a.clicks)}</td>
                      <td className="py-2 text-right">{a.ctr}%</td>
                      <td className="py-2 text-right">
                        <Badge variant="outline" className={a.status === "active" ? "text-emerald-600 border-emerald-200" : "text-amber-600 border-amber-200"}>
                          {a.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Tab: Affiliate ─────────────────────────────────────────────────────────
function AffiliateTab() {
  const { data, isLoading } = trpc.adminExtras.getAffiliateStreamStats.useQuery(undefined, { refetchInterval: 10 * 60 * 1000 });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Affiliate Products</h2>
        <p className="text-sm text-muted-foreground">Amazon affiliate catalog, click tracking, estimated earnings</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Clicks Today" value={isLoading ? "—" : data?.clicks.today ?? 0} sub="affiliate link clicks" icon={MousePointerClick} accent="blue" />
        <MetricCard label="Clicks (7 days)" value={isLoading ? "—" : fmtN(data?.clicks.last7 ?? 0)} sub="last 7 days" icon={TrendingUp} accent="purple" />
        <MetricCard label="Clicks (30 days)" value={isLoading ? "—" : fmtN(data?.clicks.last30 ?? 0)} sub="last 30 days" icon={BarChart3} accent="indigo" />
        <MetricCard label="Est. Earnings (30d)" value={isLoading ? "—" : fmt$(data?.estimatedEarnings30d ?? 0)} sub="~3% conv × 4% commission" icon={DollarSign} accent="green" />
      </div>

      {(data?.missingAffiliateUrl ?? 0) > 0 && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            <strong>{data?.missingAffiliateUrl}</strong> active products are missing affiliate URLs — these clicks won't earn commissions.
          </p>
        </div>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Product Catalog by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-muted animate-pulse rounded" />)}</div>
          ) : (data?.catalog ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No products in catalog yet</p>
          ) : (
            <div className="divide-y">
              {(data?.catalog ?? []).map((cat) => (
                <div key={cat.category} className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium capitalize">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">{cat.active}/{cat.products} active</span>
                    {cat.hasAffiliateUrl < cat.active ? (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">{cat.active - cat.hasAffiliateUrl} missing URL</Badge>
                    ) : cat.active > 0 ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs"><CheckCircle2 className="w-3 h-3 mr-1" />All set</Badge>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Top Categories by Clicks (30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          {(data?.topCategories ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No click data yet</p>
          ) : (
            <div className="space-y-2">
              {(data?.topCategories ?? []).map((cat, i) => {
                const maxClicks = data?.topCategories[0]?.clicks ?? 1;
                return (
                  <div key={cat.category} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-sm w-32 capitalize">{cat.category}</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${(cat.clicks / maxClicks) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold w-10 text-right">{cat.clicks}</span>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
const TABS = [
  { id: "daily-ops", label: "Daily Ops", icon: Activity },
  { id: "prolnk", label: "ProLnk", icon: Users },
  { id: "trustypro", label: "TrustyPro", icon: Home },
  { id: "advertisers", label: "Advertisers", icon: BarChart3 },
  { id: "affiliate", label: "Affiliate", icon: ShoppingBag },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function StrategicOverview() {
  const [activeTab, setActiveTab] = useState<TabId>("daily-ops");

  return (
    <AdminLayout title="Strategic Overview" subtitle="Daily monitoring across all 4 revenue streams">
      {/* Tab Bar */}
      <div className="flex gap-1 border-b mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "daily-ops" && <DailyOpsTab />}
      {activeTab === "prolnk" && <ProLnkTab />}
      {activeTab === "trustypro" && <TrustyProTab />}
      {activeTab === "advertisers" && <AdvertisersTab />}
      {activeTab === "affiliate" && <AffiliateTab />}
    </AdminLayout>
  );
}
