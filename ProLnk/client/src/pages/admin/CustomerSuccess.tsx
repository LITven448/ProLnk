/**
 * Admin -- Customer Success Dashboard
 * Tracks partner onboarding completion, 30-day activation, retention, win-back candidates,
 * and homeowner NPS. Brain Trust policy: 72hr dispute SLA, 3-strike system, $100 payout threshold.
 */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  Users, TrendingUp, AlertTriangle, CheckCircle, Clock,
  Award, Flame, RefreshCw, ChevronRight, Star, Target,
  UserCheck, UserX, Zap, DollarSign, BarChart2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ACTIVATION_DAYS = 30;
const WINBACK_INACTIVE_DAYS = 45;

export default function CustomerSuccess() {
  const [activeTab, setActiveTab] = useState<"overview" | "onboarding" | "activation" | "retention" | "winback">("overview");

  const { data: allPartners = [], isLoading } = trpc.admin.getAllPartners.useQuery();
  const { data: networkStats } = trpc.admin.getNetworkStats.useQuery();
  const { data: oppFeed = [] } = trpc.admin.getOpportunityFeed.useQuery();

  const now = Date.now();

  // -- Computed cohorts ------------------------------------------------------
  const cohorts = useMemo(() => {
    const approved = (allPartners as any[]).filter(p => p.status === "approved");

    // Onboarding incomplete: approved but missing key profile fields
    const onboardingIncomplete = approved.filter(p =>
      !p.businessName || !p.contactPhone || !p.serviceArea || !p.businessType
    );

    // Not activated: approved 30+ days ago, 0 jobs logged
    const notActivated = approved.filter(p => {
      const daysSinceApproval = (now - new Date(p.createdAt).getTime()) / 86400000;
      return daysSinceApproval >= ACTIVATION_DAYS && (p.jobsLogged ?? 0) === 0;
    });

    // Activated: logged at least 1 job within 30 days of approval
    const activated = approved.filter(p => (p.jobsLogged ?? 0) > 0);

    // Win-back: had jobs but none recently (45+ days since last activity)
    const winBack = approved.filter(p => {
      if ((p.jobsLogged ?? 0) === 0) return false;
      const lastActivity = p.lastActiveAt ? new Date(p.lastActiveAt).getTime() : new Date(p.createdAt).getTime();
      return (now - lastActivity) / 86400000 >= WINBACK_INACTIVE_DAYS;
    });

    // At-risk: active but declining (jobs this month < jobs last month)
    const atRisk = approved.filter(p => {
      const score = p.partnerScore ?? 0;
      return score > 0 && score < 30;
    });

    // Champions: high score, many jobs
    const champions = approved.filter(p => (p.partnerScore ?? 0) >= 80);

    return { approved, onboardingIncomplete, notActivated, activated, winBack, atRisk, champions };
  }, [allPartners, now]);

  const activationRate = cohorts.approved.length > 0
    ? Math.round((cohorts.activated.length / cohorts.approved.length) * 100)
    : 0;

  const retentionRate = cohorts.activated.length > 0
    ? Math.round(((cohorts.activated.length - cohorts.winBack.length) / cohorts.activated.length) * 100)
    : 0;

  // -- Metric cards ----------------------------------------------------------
  const metrics = [
    {
      label: "Activation Rate",
      value: `${activationRate}%`,
      sub: `${cohorts.activated.length} of ${cohorts.approved.length} partners`,
      icon: Zap,
      color: "text-[#82D616]",
      bg: "bg-[#82D616]/10",
      target: "Target: 60%",
      good: activationRate >= 60,
    },
    {
      label: "Retention Rate",
      value: `${retentionRate}%`,
      sub: `${cohorts.winBack.length} win-back candidates`,
      icon: RefreshCw,
      color: "text-[#17C1E8]",
      bg: "bg-[#17C1E8]/10",
      target: "Target: 80%",
      good: retentionRate >= 80,
    },
    {
      label: "Onboarding Gaps",
      value: cohorts.onboardingIncomplete.length,
      sub: "Incomplete profiles",
      icon: UserCheck,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      target: "Target: 0",
      good: cohorts.onboardingIncomplete.length === 0,
    },
    {
      label: "Champions",
      value: cohorts.champions.length,
      sub: "Score  80  High performers",
      icon: Award,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      target: "Grow this cohort",
      good: true,
    },
  ];

  const tabs = [
    { id: "overview",   label: "Overview",   count: null },
    { id: "onboarding", label: "Onboarding", count: cohorts.onboardingIncomplete.length },
    { id: "activation", label: "Activation", count: cohorts.notActivated.length },
    { id: "retention",  label: "Retention",  count: cohorts.atRisk.length },
    { id: "winback",    label: "Win-Back",   count: cohorts.winBack.length },
  ] as const;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customer Success</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Partner lifecycle health -- onboarding, activation, retention, and win-back
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-lg">
            <Clock className="w-3.5 h-3.5" />
            Dispute SLA: 72hr  Strike policy: 3 strikes  Payout threshold: $100
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(m => (
            <div key={m.label} className="bg-card border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`w-4.5 h-4.5 ${m.color}`} />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.good ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {m.target}
                </span>
              </div>
              <p className="text-2xl font-black text-foreground">{m.value}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{m.sub}</p>
              <p className="text-xs font-medium mt-1 text-foreground/70">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {t.count !== null && t.count > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeTab === t.id ? "bg-destructive text-destructive-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funnel */}
            <div className="bg-card border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" /> Partner Lifecycle Funnel
              </h3>
              {[
                { label: "Applied", count: (allPartners as any[]).length, color: "bg-gray-400" },
                { label: "Approved", count: cohorts.approved.length, color: "bg-blue-500" },
                { label: "Onboarded (complete profile)", count: cohorts.approved.length - cohorts.onboardingIncomplete.length, color: "bg-indigo-500" },
                { label: "Activated (1 job)", count: cohorts.activated.length, color: "bg-[#82D616]" },
                { label: "Champions (score 80)", count: cohorts.champions.length, color: "bg-purple-500" },
              ].map((stage, i, arr) => {
                const pct = arr[0].count > 0 ? Math.round((stage.count / arr[0].count) * 100) : 0;
                return (
                  <div key={stage.label} className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground/80">{stage.label}</span>
                      <span className="text-sm font-bold text-foreground">{stage.count} <span className="text-muted-foreground font-normal text-xs">({pct}%)</span></span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className={`h-2 rounded-full ${stage.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action items */}
            <div className="bg-card border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Action Items
              </h3>
              <div className="space-y-3">
                {cohorts.onboardingIncomplete.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{cohorts.onboardingIncomplete.length} incomplete profiles</p>
                        <p className="text-xs text-amber-600">Missing business info, phone, or service area</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => setActiveTab("onboarding")}>
                      Review <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
                {cohorts.notActivated.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <UserX className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 dark:text-red-300">{cohorts.notActivated.length} never activated</p>
                        <p className="text-xs text-red-600">Approved 30+ days ago, 0 jobs logged</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => setActiveTab("activation")}>
                      Review <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
                {cohorts.winBack.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">{cohorts.winBack.length} win-back candidates</p>
                        <p className="text-xs text-blue-600">Were active, silent for 45+ days</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => setActiveTab("winback")}>
                      Review <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                )}
                {cohorts.onboardingIncomplete.length === 0 && cohorts.notActivated.length === 0 && cohorts.winBack.length === 0 && (
                  <div className="flex items-center gap-3 p-4 text-center justify-center text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm">No urgent action items -- great health!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "onboarding" && (
          <div className="space-y-4">
            {/* Per-step completion % tracker */}
            {(() => {
              const approved = cohorts.approved;
              const total = approved.length || 1;
              const steps = [
                { label: "Business Name", key: "businessName", icon: "🏢" },
                { label: "Contact Phone", key: "contactPhone", icon: "📞" },
                { label: "Service Area", key: "serviceArea", icon: "📍" },
                { label: "Trade / Category", key: "businessType", icon: "🔧" },
                { label: "Logo Uploaded", key: "logoUrl", icon: "🖼️" },
                { label: "Bio / Description", key: "bio", icon: "📝" },
                { label: "Stripe Connected", key: "stripeConnectId", icon: "💳" },
              ];
              const overallPct = Math.round(
                steps.reduce((sum, s) => sum + approved.filter((p: any) => !!(p as any)[s.key]).length, 0)
                / (steps.length * total) * 100
              );
              return (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Onboarding Completion Tracker</p>
                      <p className="text-xs text-gray-500">{approved.length} approved partners · network average</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-indigo-600">{overallPct}%</p>
                      <p className="text-xs text-gray-400">overall complete</p>
                    </div>
                  </div>
                  {/* Overall bar */}
                  <div className="h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{ width: `${overallPct}%` }} />
                  </div>
                  {/* Per-step bars */}
                  <div className="space-y-3">
                    {steps.map(s => {
                      const filled = approved.filter((p: any) => !!(p as any)[s.key]).length;
                      const pct = Math.round((filled / total) * 100);
                      const color = pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-400" : "bg-red-400";
                      return (
                        <div key={s.key}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">{s.icon} {s.label}</span>
                            <span className="text-xs font-semibold text-gray-700">{pct}% <span className="text-gray-400 font-normal">({filled}/{approved.length})</span></span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            {/* Partners with incomplete profiles */}
            <PartnerList
              partners={cohorts.onboardingIncomplete}
              emptyMessage="All partners have complete profiles"
              badge={(p: any) => {
                const missing = [];
                if (!p.businessName) missing.push("Business Name");
                if (!p.contactPhone) missing.push("Phone");
                if (!p.serviceArea) missing.push("Service Area");
                if (!p.businessType) missing.push("Trade");
                return missing.join(", ");
              }}
              badgeColor="bg-amber-100 text-amber-800"
            />
          </div>
        )}

        {activeTab === "activation" && (
          <PartnerList
            partners={cohorts.notActivated}
            emptyMessage="All approved partners have logged at least one job"
            badge={(p: any) => {
              const days = Math.round((now - new Date(p.createdAt).getTime()) / 86400000);
              return `${days} days since approval`;
            }}
            badgeColor="bg-red-100 text-red-800"
          />
        )}

        {activeTab === "retention" && (
          <PartnerList
            partners={cohorts.atRisk}
            emptyMessage="No at-risk partners detected"
            badge={(p: any) => `Score: ${p.partnerScore ?? 0}`}
            badgeColor="bg-orange-100 text-orange-800"
          />
        )}

        {activeTab === "winback" && (
          <PartnerList
            partners={cohorts.winBack}
            emptyMessage="No win-back candidates -- all partners are active"
            badge={(p: any) => {
              const lastActivity = p.lastActiveAt ? new Date(p.lastActiveAt).getTime() : new Date(p.createdAt).getTime();
              const days = Math.round((now - lastActivity) / 86400000);
              return `Silent ${days} days`;
            }}
            badgeColor="bg-blue-100 text-blue-800"
          />
        )}
      </div>
    </AdminLayout>
  );
}

function PartnerList({
  partners, emptyMessage, badge, badgeColor,
}: {
  partners: any[];
  emptyMessage: string;
  badge: (p: any) => string;
  badgeColor: string;
}) {
  if (partners.length === 0) {
    return (
      <div className="bg-card border rounded-xl p-8 text-center">
        <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Partner</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Trade</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Jobs</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Score</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {partners.map((p: any) => (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">{p.businessName || p.contactEmail}</p>
                <p className="text-xs text-muted-foreground">{p.contactEmail}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground capitalize">{p.businessType || "--"}</td>
              <td className="px-4 py-3 font-mono text-foreground">{p.jobsLogged ?? 0}</td>
              <td className="px-4 py-3 font-mono text-foreground">{p.partnerScore ?? 0}</td>
              <td className="px-4 py-3">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                  {badge(p)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
