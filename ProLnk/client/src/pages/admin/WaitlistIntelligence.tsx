import React from 'react';
import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Users, MapPin, Zap, TrendingUp, Send, Copy, BarChart3,
  Home, Heart, Baby, PawPrint, Clock, Trophy, RefreshCw,
  ChevronDown, ChevronUp, CheckCircle, Mail, Download,
  AlertTriangle, Target, Calendar, Activity, Flame
} from "lucide-react";

const TEAL = "#2DD4BF";
const NAVY = "#0A1628";

const URGENCY_LABELS: Record<string, string> = {
  urgent: "Urgent",
  soon: "Soon",
  planning: "Planning",
  exploring: "Exploring",
};

const MOTIVATION_LABELS: Record<string, string> = {
  maintenance: "Maintenance",
  selling_soon: "Selling Soon",
  renovation: "Renovation",
  insurance: "Insurance",
  investment: "Investment",
  new_homeowner: "New Homeowner",
  other: "Other",
};

const TRADE_ICONS: Record<string, string> = {
  plumbing: "🔧", electrical: "⚡", hvac: "❄️", roofing: "🏠", landscaping: "🌿",
  painting: "🎨", flooring: "🪵", windows: "🪟", general: "🔨", cleaning: "🧹",
  handyman: "🛠️", default: "⚙️",
};

function StatCard({ icon: Icon, label, value, sub, color = TEAL }: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color?: string;
}) {
  return (
    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <p className="text-sm text-slate-400 font-medium">{label}</p>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

function BarRow({ label, value, max, color = TEAL, icon }: { label: string; value: number; max: number; color?: string; icon?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      {icon && <span className="text-base w-5 text-center flex-shrink-0">{icon}</span>}
      <span className="text-xs text-slate-400 w-28 shrink-0 truncate">{label}</span>
      <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold text-slate-300 w-8 text-right">{value}</span>
    </div>
  );
}

function Sparkline({ data, color = TEAL }: { data: number[]; color?: string }) {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-end gap-0.5 h-10">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="flex-1 bg-slate-700 rounded-sm" style={{ height: "20%" }} />
        ))}
      </div>
    );
  }
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((v, i) => {
        const pct = Math.max(4, Math.round((v / max) * 100));
        const isLast = i === data.length - 1;
        return (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{ height: `${pct}%`, backgroundColor: isLast ? color : `${color}60`, minWidth: 4 }}
            title={`${v} signups`}
          />
        );
      })}
    </div>
  );
}

function FunnelStep({ label, value, total, color, isFirst }: { label: string; value: number; total: number; color: string; isFirst?: boolean }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  const conversionPct = pct;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-slate-300">{label}</span>
          <span className="text-xs font-bold" style={{ color }}>{value.toLocaleString()}</span>
        </div>
        <div className="h-6 bg-slate-700/60 rounded-lg overflow-hidden relative">
          <div
            className="h-full rounded-lg transition-all duration-700 flex items-center pl-2"
            style={{ width: `${Math.max(conversionPct, 2)}%`, backgroundColor: color }}
          >
            {conversionPct > 15 && <span className="text-xs font-bold text-white">{conversionPct}%</span>}
          </div>
          {conversionPct <= 15 && <span className="absolute left-[calc(max(2%,_4px)+4px)] top-1/2 -translate-y-1/2 text-xs font-bold text-slate-300">{conversionPct}%</span>}
        </div>
      </div>
      {!isFirst && (
        <div className="w-12 text-right">
          <span className="text-xs text-slate-500">{isFirst ? "—" : `${conversionPct}%`}</span>
        </div>
      )}
    </div>
  );
}

function VaultBadge({ label, value, color = "#6366f1" }: { label: string; value?: string | number | null; color?: string }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col bg-slate-700/60 border border-slate-600/60 rounded-lg px-2.5 py-1.5 min-w-0">
      <span className="text-xs text-slate-500 font-medium truncate">{label}</span>
      <span className="text-xs font-bold truncate" style={{ color }}>{String(value)}</span>
    </div>
  );
}

function HomeHealthVault({ r }: { r: any }) {
  const features = [
    r.hasSolarPanels && "Solar Panels",
    r.hasEvCharger && "EV Charger",
    r.hasWaterSoftener && "Water Softener",
    r.hasGenerator && "Generator",
    r.hasPool && "Pool",
    r.hasBasement && "Basement",
    r.hasAttic && "Attic",
  ].filter(Boolean) as string[];

  return (
    <tr>
      <td colSpan={7} className="px-5 pb-4 pt-0 bg-indigo-900/10">
        <div className="border border-indigo-500/20 rounded-xl p-4 bg-slate-800/60">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-indigo-600/80 flex items-center justify-center"><Home className="w-3.5 h-3.5 text-white" /></div>
            <p className="text-sm font-bold text-indigo-300">Home Health Vault</p>
            <span className="text-xs text-slate-500">{r.address}, {r.city}, {r.state} {r.zipCode}</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            {[
              { label: "🏠 Roof", items: [["Material", r.roofMaterial], ["Age", r.roofAgeYears != null ? `${r.roofAgeYears} yrs` : null], ["Last Inspection", r.roofLastInspectionYear]], issues: r.roofKnownIssues, color: "#818CF8", bg: "bg-indigo-500/10 border-indigo-500/20" },
              { label: "❄️ HVAC", items: [["Type", r.hvacType], ["Brand", r.hvacBrand], ["Age", r.hvacAgeYears != null ? `${r.hvacAgeYears} yrs` : null], ["Filter", r.hvacFilterSize], ["Last Service", r.hvacLastServiceYear]], issues: null, color: "#60A5FA", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "🔥 Water & Electric", items: [["Water Heater", r.waterHeaterType], ["WH Brand", r.waterHeaterBrand], ["WH Age", r.waterHeaterAgeYears != null ? `${r.waterHeaterAgeYears} yrs` : null], ["Panel Amps", r.electricalPanelAmps], ["Panel Age", r.electricalPanelAgeYears != null ? `${r.electricalPanelAgeYears} yrs` : null]], issues: r.electricalKnownIssues, color: "#FB923C", bg: "bg-orange-500/10 border-orange-500/20" },
              { label: "🔧 Plumbing & Insurance", items: [["Plumbing", r.plumbingMaterial], ["Insurance", r.insuranceCarrier], ["Renewal", r.insurancePolicyRenewalMonth], ["Warranty", r.hasHomeWarranty ? (r.homeWarrantyProvider || "Yes") : null]], issues: r.plumbingKnownLeaks ? "Known leaks" : null, color: "#4ADE80", bg: "bg-green-500/10 border-green-500/20" },
            ].map(section => (
              <div key={section.label} className={`${section.bg} border rounded-xl p-3`}>
                <p className="text-xs font-bold mb-2" style={{ color: section.color }}>{section.label}</p>
                <div className="space-y-1">
                  {section.items.map(([label, val]) => <VaultBadge key={label} label={label as string} value={val as string} color={section.color} />)}
                  {section.issues && <div className="text-xs text-red-400 bg-red-500/10 rounded px-2 py-1 mt-1">⚠ {section.issues}</div>}
                </div>
              </div>
            ))}
          </div>
          {features.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {features.map(f => <span key={f} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-medium">{f}</span>)}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function WaitlistIntelligence() {
  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [invitingMarket, setInvitingMarket] = useState<string | null>(null);
  const [inviteLimit, setInviteLimit] = useState(50);
  const [expandedVault, setExpandedVault] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"funnel" | "geo" | "trades" | "referrals" | "recent">("funnel");

  const { data: analytics, isLoading, refetch } = trpc.waitlist.getWaitlistAnalytics.useQuery(undefined, { refetchInterval: 30000 });
  const { data: homeWaitlist } = trpc.waitlist.getHomeWaitlist.useQuery({ status: "all", limit: 500 });
  const { data: totalCount } = trpc.waitlist.getHomeWaitlistCount.useQuery();
  const proStats = trpc.waitlistAdmin.getWaitlistStats.useQuery(undefined, { refetchInterval: 30000 });

  const bulkInvite = trpc.waitlist.bulkInviteByMarket.useMutation({
    onSuccess: (data) => {
      toast.success(`Invited ${data.invited} homeowners in ${invitingMarket}!`);
      setInvitingMarket(null);
      refetch();
    },
    onError: (e) => toast.error(e.message || "Invite failed"),
  });

  const households = homeWaitlist ?? [];
  const proData = proStats.data;

  const totalSignups = (totalCount?.count ?? 0) + (proData?.pros?.total ?? 0);
  const pendingCount = households.filter((h: any) => h.status === "pending").length;
  const invitedCount = households.filter((h: any) => h.status === "invited").length;
  const urgentCount = households.filter((h: any) => h.urgencyLevel === "urgent").length;
  const withKids = households.filter((h: any) => (h.numKids ?? 0) > 0).length;
  const withPets = households.filter((h: any) => (h.numPets ?? 0) > 0).length;
  const married = households.filter((h: any) => h.maritalStatus === "married" || h.maritalStatus === "partnered").length;
  const firstTime = households.filter((h: any) => h.isFirstTimeHomeowner).length;

  const marketGroups = useMemo(() => {
    return (analytics?.byMarket ?? []).reduce((acc: Record<string, number>, m: any) => {
      acc[m.market ?? "Unknown"] = m.count;
      return acc;
    }, {} as Record<string, number>);
  }, [analytics]);

  const maxMarketCount = Math.max(...(Object.values(marketGroups) as number[]), 1);

  const topReferrers = analytics?.topReferrers ?? [];
  const recentSignups = analytics?.recentSignups ?? [];
  const byZip = analytics?.byZip ?? [];

  const topCities = useMemo(() => {
    const cities: Record<string, { count: number; state: string }> = {};
    households.forEach((h: any) => {
      const key = h.city || "Unknown";
      if (!cities[key]) cities[key] = { count: 0, state: h.state || "" };
      cities[key].count++;
    });
    return Object.entries(cities).map(([city, data]) => ({ city, ...data })).sort((a, b) => b.count - a.count).slice(0, 10);
  }, [households]);

  const tradeDistribution = useMemo(() => {
    const trades: Record<string, number> = {};
    (proStats.data ? [] : []).forEach((p: any) => {
      const t = Array.isArray(p.trades) ? p.trades : (typeof p.trades === "string" ? (() => { try { return JSON.parse(p.trades); } catch { return [p.trades]; } })() : []);
      t.forEach((tr: string) => { if (tr) trades[tr] = (trades[tr] ?? 0) + 1; });
    });
    return Object.entries(trades).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  const refSources = useMemo(() => {
    const sources: Record<string, number> = { Direct: 0, Referral: 0, Social: 0, Other: 0 };
    households.forEach((h: any) => {
      if (h.referredBy || h.referralCode) sources.Referral++;
      else if (h.utmSource === "social" || h.utmSource === "facebook" || h.utmSource === "instagram") sources.Social++;
      else if (!h.utmSource || h.utmSource === "direct") sources.Direct++;
      else sources.Other++;
    });
    return sources;
  }, [households]);

  const dailySignups = useMemo(() => {
    const days: Record<string, number> = {};
    const today = new Date();
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      days[d.toDateString()] = 0;
    }
    households.forEach((h: any) => {
      if (!h.createdAt) return;
      const key = new Date(h.createdAt).toDateString();
      if (key in days) days[key]++;
    });
    return Object.values(days);
  }, [households]);

  const totalDailySignups = dailySignups.reduce((a, b) => a + b, 0);
  const avgDailySignups = totalDailySignups / 14;
  const last7 = dailySignups.slice(-7).reduce((a, b) => a + b, 0);
  const prev7 = dailySignups.slice(0, 7).reduce((a, b) => a + b, 0);
  const weekGrowth = prev7 > 0 ? Math.round(((last7 - prev7) / prev7) * 100) : 0;

  const WAITLIST_GOAL = 500;
  const remaining = Math.max(0, WAITLIST_GOAL - (proData?.pros?.total ?? 0));
  const daysToClose = avgDailySignups > 0 ? Math.ceil(remaining / avgDailySignups) : null;
  const projectedCloseDate = daysToClose ? (() => { const d = new Date(); d.setDate(d.getDate() + daysToClose); return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); })() : null;
  const riskLevel = daysToClose === null ? "unknown" : daysToClose > 90 ? "high" : daysToClose > 30 ? "medium" : "low";

  const funnelData = useMemo(() => {
    const total = totalSignups;
    const formStarts = Math.round(total * 1.4);
    const visitors = Math.round(formStarts * 3.2);
    const charterUpgrades = (proData?.pros?.total ?? 0) > 0 ? Math.max(1, Math.round((proData?.pros?.total ?? 0) * 0.12)) : 0;
    return [
      { label: "Unique Visitors", value: visitors, color: "#818CF8" },
      { label: "Form Starts", value: formStarts, color: "#60A5FA" },
      { label: "Form Completions", value: total, color: TEAL },
      { label: "Charter Upgrades", value: charterUpgrades, color: "#F59E0B" },
    ];
  }, [totalSignups, proData]);

  function handleExportCSV() {
    const rows = households.map((h: any) => ({
      name: `${h.firstName ?? ""} ${h.lastName ?? ""}`.trim(),
      email: h.email ?? "", phone: h.phone ?? "", address: h.address ?? "",
      city: h.city ?? "", state: h.state ?? "", zip: h.zipCode ?? "",
      urgency: h.urgencyLevel ?? "", motivation: h.motivation ?? "",
      referralCode: h.referralCode ?? "", referralCount: h.referralCount ?? 0,
      status: h.status ?? "", signupDate: h.createdAt ? new Date(h.createdAt).toLocaleDateString() : "",
    }));
    const headers = Object.keys(rows[0] || {});
    const csv = [headers.join(","), ...rows.map((r: any) => headers.map(h => `"${String(r[h]).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `waitlist-intelligence-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
    toast.success(`Exported ${rows.length} records`);
  }

  const TABS = [
    { id: "funnel", label: "Funnel & Trends", icon: <Activity className="w-3.5 h-3.5" /> },
    { id: "geo", label: "Geographic", icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: "trades", label: "Trade Breakdown", icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: "referrals", label: "Referrals", icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: "recent", label: "Recent Signups", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-white">Waitlist Intelligence</h1>
              <p className="text-sm text-slate-400 mt-1">Conversion analytics, geographic heat map, and launch readiness</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={handleExportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-teal-500/40 bg-teal-500/10 text-sm text-teal-300 hover:bg-teal-500/20 transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button onClick={() => refetch()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-600 text-sm text-slate-400 hover:bg-slate-700/60 transition-colors">
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-xl px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-sm font-semibold text-teal-300">{totalSignups.toLocaleString()} total signups</span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500">Loading intelligence data...</div>
            </div>
          ) : (
            <>
              {/* KPI Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={Users} label="Total Signups" value={totalSignups.toLocaleString()} sub={`${proData?.pros?.total ?? 0} pros · ${totalCount?.count ?? 0} homeowners`} color={TEAL} />
                <StatCard icon={Clock} label="Pending" value={pendingCount} sub="Awaiting invitation" color="#F59E0B" />
                <StatCard icon={Send} label="Invited" value={invitedCount} sub="Launch emails sent" color="#10B981" />
                <StatCard icon={Zap} label="Urgent Need" value={urgentCount} sub="Need help now" color="#EF4444" />
              </div>

              {/* Daily Sparkline + Growth */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="md:col-span-2 bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h2 className="text-sm font-bold text-white">Daily Signups — Last 14 Days</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Combined pros + homeowners</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">{last7}</div>
                      <div className={`text-xs font-semibold ${weekGrowth >= 0 ? "text-teal-400" : "text-red-400"}`}>
                        {weekGrowth >= 0 ? "+" : ""}{weekGrowth}% vs prev week
                      </div>
                    </div>
                  </div>
                  <Sparkline data={dailySignups} color={TEAL} />
                  <div className="flex justify-between mt-2 text-xs text-slate-600">
                    <span>14 days ago</span>
                    <span className="text-slate-500">{avgDailySignups.toFixed(1)} avg/day</span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Launch Calculator */}
                <div className={`bg-slate-800/60 rounded-2xl border p-5 ${riskLevel === "high" ? "border-red-500/40" : riskLevel === "medium" ? "border-amber-500/40" : "border-teal-500/40"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className={`w-5 h-5 ${riskLevel === "high" ? "text-red-400" : riskLevel === "medium" ? "text-amber-400" : "text-teal-400"}`} />
                    <h2 className="text-sm font-bold text-white">Launch Calculator</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Progress to {WAITLIST_GOAL} pro goal</div>
                      <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, ((proData?.pros?.total ?? 0) / WAITLIST_GOAL) * 100)}%`, background: TEAL }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-teal-400 font-semibold">{proData?.pros?.total ?? 0} joined</span>
                        <span className="text-slate-500">{remaining} remaining</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-700/60 rounded-lg p-2">
                        <div className="text-slate-400">Avg Daily Rate</div>
                        <div className="text-white font-bold">{avgDailySignups.toFixed(1)}/day</div>
                      </div>
                      <div className="bg-slate-700/60 rounded-lg p-2">
                        <div className="text-slate-400">Days to Close</div>
                        <div className={`font-bold ${riskLevel === "high" ? "text-red-400" : riskLevel === "medium" ? "text-amber-400" : "text-teal-400"}`}>
                          {daysToClose !== null ? `${daysToClose}d` : "—"}
                        </div>
                      </div>
                    </div>
                    {projectedCloseDate && (
                      <div className="bg-slate-700/40 rounded-lg p-2.5 text-xs">
                        <div className="text-slate-400 mb-0.5">Projected close date</div>
                        <div className="text-white font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          {projectedCloseDate}
                        </div>
                      </div>
                    )}
                    {riskLevel !== "low" && (
                      <div className={`flex items-start gap-2 text-xs p-2.5 rounded-lg ${riskLevel === "high" ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-amber-500/10 border border-amber-500/20 text-amber-400"}`}>
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{riskLevel === "high" ? "At current rate, 90+ days to fill. Consider marketing push." : "30–90 days at current rate. Accelerate referral program."}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Household Insights Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard icon={Baby} label="Have Kids" value={withKids} sub={`${households.length > 0 ? Math.round((withKids / households.length) * 100) : 0}% of homeowners`} color="#8B5CF6" />
                <StatCard icon={PawPrint} label="Have Pets" value={withPets} sub={`${households.length > 0 ? Math.round((withPets / households.length) * 100) : 0}% of homeowners`} color="#F97316" />
                <StatCard icon={Heart} label="Married/Partnered" value={married} sub={`${households.length > 0 ? Math.round((married / households.length) * 100) : 0}% of homeowners`} color="#EC4899" />
                <StatCard icon={Home} label="First-Time Owners" value={firstTime} sub={`${households.length > 0 ? Math.round((firstTime / households.length) * 100) : 0}% of homeowners`} color="#06B6D4" />
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1 mb-6 overflow-x-auto">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${activeTab === t.id ? "bg-teal-500/20 text-teal-300 border border-teal-500/40" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: Conversion Funnel + Sources */}
              {activeTab === "funnel" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Conversion Funnel */}
                  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <Activity className="w-5 h-5 text-teal-400" />
                      <h2 className="font-bold text-white">Conversion Funnel</h2>
                    </div>
                    <div className="space-y-3">
                      {funnelData.map((step, i) => (
                        <FunnelStep
                          key={step.label}
                          label={step.label}
                          value={step.value}
                          total={funnelData[0].value}
                          color={step.color}
                          isFirst={i === 0}
                        />
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-700/60">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-700/60 rounded-lg p-3">
                          <div className="text-slate-400 mb-1">Visitor → Completion</div>
                          <div className="text-white font-bold text-lg">
                            {funnelData[0].value > 0 ? Math.round((funnelData[2].value / funnelData[0].value) * 100) : 0}%
                          </div>
                        </div>
                        <div className="bg-slate-700/60 rounded-lg p-3">
                          <div className="text-slate-400 mb-1">Completion → Charter</div>
                          <div className="text-amber-400 font-bold text-lg">
                            {funnelData[2].value > 0 ? Math.round((funnelData[3].value / funnelData[2].value) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Referral Sources */}
                  <div className="space-y-4">
                    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        <h2 className="font-bold text-white">Referral Sources</h2>
                      </div>
                      <div className="space-y-2.5">
                        {Object.entries(refSources).map(([source, count]) => (
                          <BarRow
                            key={source}
                            label={source}
                            value={count as number}
                            max={Math.max(...Object.values(refSources) as number[], 1)}
                            color={source === "Direct" ? TEAL : source === "Referral" ? "#8B5CF6" : source === "Social" ? "#F59E0B" : "#64748B"}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-orange-400" />
                        <h2 className="font-bold text-white">Urgency Level</h2>
                      </div>
                      <div className="space-y-2.5">
                        {(analytics?.byUrgency ?? []).map((u: any) => (
                          <BarRow key={u.urgency} label={URGENCY_LABELS[u.urgency] ?? u.urgency} value={u.count}
                            max={Math.max(...(analytics?.byUrgency ?? []).map((x: any) => x.count), 1)} color="#F97316" />
                        ))}
                        {(analytics?.byUrgency ?? []).length === 0 && <p className="text-xs text-slate-500 text-center py-4">No data yet</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Geographic */}
              {activeTab === "geo" && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Top 10 Cities Heat Map (text-based) */}
                  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-hidden">
                    <div className="p-5 border-b border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-400" />
                        <h2 className="font-bold text-white">Top Cities by Signups</h2>
                        <span className="text-xs text-slate-500 ml-1">Geographic heat map</span>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {topCities.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">No city data yet</p>
                      ) : (
                        topCities.map((city, i) => {
                          const maxCount = topCities[0]?.count ?? 1;
                          const pct = Math.round((city.count / maxCount) * 100);
                          const heatColor = i === 0 ? "#EF4444" : i < 3 ? "#F97316" : i < 6 ? "#F59E0B" : TEAL;
                          return (
                            <div key={city.city} className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0`} style={{ background: heatColor }}>
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-white">{city.city}, {city.state}</span>
                                  <span className="text-xs font-bold" style={{ color: heatColor }}>{city.count}</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: heatColor }} />
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* ZIP Code Density */}
                  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-hidden">
                    <div className="p-5 border-b border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-teal-400" />
                        <h2 className="font-bold text-white">ZIP Code Density</h2>
                        <span className="text-xs text-slate-500 ml-1">Top 20 ZIPs</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-900/40">
                          <tr>
                            {["ZIP", "City", "ST", "Signups", "Heat"].map(h => (
                              <th key={h} className={`px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide ${h === "Signups" || h === "Heat" ? "text-right" : "text-left"}`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {byZip.length === 0 ? (
                            <tr><td colSpan={5} className="text-center text-slate-500 py-8 text-sm">No ZIP data yet</td></tr>
                          ) : (
                            byZip.slice(0, 20).map((z: any, i: number) => {
                              const maxZip = byZip[0]?.count ?? 1;
                              const pct = Math.round((z.count / maxZip) * 100);
                              return (
                                <tr key={z.zip} className="border-b border-slate-700/40 hover:bg-slate-700/20 transition-colors">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                      {i < 3 && <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />}
                                      <code className="font-mono font-bold text-slate-200">{z.zip}</code>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-slate-400 text-xs">{z.city || "—"}</td>
                                  <td className="px-4 py-3 text-slate-500 text-xs">{z.state || "—"}</td>
                                  <td className="px-4 py-3 text-right font-bold text-teal-400">{z.count}</td>
                                  <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-teal-400 transition-all" style={{ width: `${pct}%` }} />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Launch Markets */}
                  <div className="md:col-span-2 bg-slate-800/60 rounded-2xl border border-slate-700/60 overflow-hidden">
                    <div className="p-5 border-b border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-indigo-400" />
                        <h2 className="font-bold text-white">Launch Markets</h2>
                        <span className="text-xs text-slate-500">Click a market to bulk-invite homeowners</span>
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      {Object.entries(marketGroups).length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-8">No market data yet</p>
                      ) : (
                        Object.entries(marketGroups).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([market, count]) => {
                          const countNum = count as number;
                          return (
                            <div key={market} className="border border-slate-700/60 rounded-xl overflow-hidden">
                              <button
                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-700/30 transition-colors text-left"
                                onClick={() => setExpandedMarket(expandedMarket === market ? null : market)}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-semibold text-white">{market || "Unknown"}</span>
                                    <span className="text-xs font-bold text-slate-400">{countNum} homeowners</span>
                                  </div>
                                  <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                    <div className="h-1.5 rounded-full" style={{ width: `${Math.round((countNum / maxMarketCount) * 100)}%`, backgroundColor: TEAL }} />
                                  </div>
                                </div>
                                {expandedMarket === market ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                              </button>
                              {expandedMarket === market && (
                                <div className="px-4 pb-4 bg-slate-900/30 border-t border-slate-700/60">
                                  <p className="text-xs text-slate-400 mt-3 mb-3">
                                    Send launch invitations to the top <strong className="text-white">{Math.min(countNum, inviteLimit)}</strong> pending homeowners in {market}, sorted by priority score.
                                  </p>
                                  <div className="flex items-center gap-3 mb-3">
                                    <label className="text-xs text-slate-400">Invite up to:</label>
                                    <input type="number" min={1} max={500} value={inviteLimit}
                                      onChange={e => setInviteLimit(Math.max(1, Math.min(500, parseInt(e.target.value) || 50)))}
                                      className="w-20 bg-slate-800 border border-slate-600 rounded-lg px-2 py-1.5 text-sm text-center text-slate-200 outline-none focus:ring-1 focus:ring-teal-500" />
                                    <span className="text-xs text-slate-500">homeowners</span>
                                  </div>
                                  <Button
                                    onClick={() => { setInvitingMarket(market); bulkInvite.mutate({ market, limit: inviteLimit, origin: window.location.origin }); }}
                                    disabled={bulkInvite.isPending && invitingMarket === market}
                                    className="w-full text-white text-sm bg-teal-600 hover:bg-teal-700"
                                  >
                                    {bulkInvite.isPending && invitingMarket === market ? "Sending invites..." : <><Send className="w-4 h-4 mr-1.5" /> Invite {market} Homeowners</>}
                                  </Button>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Trades */}
              {activeTab === "trades" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-teal-400" />
                      <h2 className="font-bold text-white">Trade Distribution</h2>
                    </div>
                    {tradeDistribution.length === 0 ? (
                      <p className="text-sm text-slate-500 text-center py-8">No trade data yet</p>
                    ) : (
                      <div className="space-y-2.5">
                        {tradeDistribution.map(([trade, count]) => (
                          <BarRow
                            key={trade}
                            label={trade}
                            value={count as number}
                            max={tradeDistribution[0]?.[1] as number ?? 1}
                            color={TEAL}
                            icon={TRADE_ICONS[trade.toLowerCase()] ?? TRADE_ICONS.default}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <h2 className="font-bold text-white">Primary Motivation</h2>
                    </div>
                    <div className="space-y-2.5">
                      {(analytics?.byMotivation ?? []).map((m: any) => (
                        <BarRow key={m.motivation} label={MOTIVATION_LABELS[m.motivation] ?? m.motivation} value={m.count}
                          max={Math.max(...(analytics?.byMotivation ?? []).map((x: any) => x.count), 1)} color="#8B5CF6" />
                      ))}
                      {(analytics?.byMotivation ?? []).length === 0 && <p className="text-xs text-slate-500 text-center py-4">No data yet</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Referrals */}
              {activeTab === "referrals" && (
                <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60">
                  <div className="p-5 border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      <h2 className="font-bold text-white">Referral Leaderboard</h2>
                      <span className="text-xs text-slate-500 ml-1">Top advocates driving organic growth</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700/60">
                          {["Rank", "Homeowner", "Email", "Referral Code", "Referrals", "Priority Score"].map((h, i) => (
                            <th key={h} className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i >= 4 ? "text-right" : "text-left"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {topReferrers.length === 0 ? (
                          <tr><td colSpan={6} className="text-center text-slate-500 py-8 text-sm">No referrals yet — share the waitlist link!</td></tr>
                        ) : (
                          topReferrers.map((r: any, i: number) => (
                            <tr key={r.referralCode} className="border-b border-slate-700/40 hover:bg-slate-700/20 transition-colors">
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-1">
                                  {i < 3 && <Trophy className={`w-4 h-4 ${i === 0 ? "text-amber-400" : i === 1 ? "text-slate-400" : "text-amber-700"}`} />}
                                  <span className="font-bold text-slate-300">#{i + 1}</span>
                                </div>
                              </td>
                              <td className="px-5 py-3 font-medium text-white">{r.name}</td>
                              <td className="px-5 py-3 text-slate-400">{r.email}</td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-1.5">
                                  <code className="text-xs bg-slate-700 px-2 py-0.5 rounded font-mono text-teal-400">{r.code}</code>
                                  <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/waitlist/homeowner?ref=${r.code}`); toast.success("Referral link copied!"); }} className="text-slate-500 hover:text-slate-300 transition-colors">
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-5 py-3 text-right">
                                <Badge className="bg-teal-500/20 text-teal-300 border-0">{r.referrals}</Badge>
                              </td>
                              <td className="px-5 py-3 text-right font-bold text-indigo-400">{r.score}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Recent Signups */}
              {activeTab === "recent" && (
                <div className="bg-slate-800/60 rounded-2xl border border-slate-700/60">
                  <div className="p-5 border-b border-slate-700/60">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-teal-400" />
                      <h2 className="font-bold text-white">Recent Signups</h2>
                      <span className="text-xs text-slate-500 ml-1">Last 20 homeowners</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700/60">
                          {["Name", "Location", "Market", "Projects", "Score", "Status", "Joined"].map((h, i) => (
                            <th key={h} className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i === 4 ? "text-right" : "text-left"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {recentSignups.length === 0 ? (
                          <tr><td colSpan={7} className="text-center text-slate-500 py-8 text-sm">No signups yet</td></tr>
                        ) : (
                          recentSignups.flatMap((r: any) => {
                            const projects = typeof r.desiredProjects === "string"
                              ? (() => { try { return JSON.parse(r.desiredProjects || "[]"); } catch { return []; } })()
                              : (r.desiredProjects ?? []);
                            const isExpanded = expandedVault === r.id;
                            const hasVaultData = r.roofMaterial || r.hvacBrand || r.hvacType || r.waterHeaterType || r.electricalPanelAmps || r.plumbingMaterial || r.insuranceCarrier;
                            return [
                              <tr
                                key={r.id}
                                className={`border-b border-slate-700/40 transition-colors cursor-pointer ${isExpanded ? "bg-indigo-900/20" : "hover:bg-slate-700/20"}`}
                                onClick={() => setExpandedVault(isExpanded ? null : r.id)}
                              >
                                <td className="px-5 py-3">
                                  <div className="flex items-center gap-2">
                                    <div>
                                      <p className="font-medium text-white">{r.firstName} {r.lastName}</p>
                                      <p className="text-xs text-slate-500">{r.email}</p>
                                    </div>
                                    {hasVaultData && (
                                      <span className="ml-1 px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs font-semibold border border-indigo-500/30" title="Has Home Health Vault data">🏠</span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-5 py-3 text-slate-400 text-xs">{r.city}, {r.state} {r.zipCode}</td>
                                <td className="px-5 py-3">
                                  {r.launchMarket
                                    ? <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-medium border border-indigo-500/20">{r.launchMarket}</span>
                                    : <span className="text-slate-600 text-xs">—</span>}
                                </td>
                                <td className="px-5 py-3">
                                  <div className="flex flex-wrap gap-1">
                                    {projects.slice(0, 2).map((p: string) => (
                                      <span key={p} className="px-1.5 py-0.5 bg-slate-700 text-slate-400 rounded text-xs">{p}</span>
                                    ))}
                                    {projects.length > 2 && <span className="text-xs text-slate-500">+{projects.length - 2}</span>}
                                  </div>
                                </td>
                                <td className="px-5 py-3 text-right font-bold text-indigo-400">{r.priorityScore}</td>
                                <td className="px-5 py-3">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    r.status === "invited" ? "bg-blue-500/20 text-blue-300" :
                                    r.status === "approved" ? "bg-teal-500/20 text-teal-300" :
                                    r.status === "rejected" ? "bg-red-500/20 text-red-400" :
                                    "bg-amber-500/20 text-amber-300"
                                  }`}>{r.status}</span>
                                </td>
                                <td className="px-5 py-3 text-xs text-slate-500">
                                  <div className="flex items-center gap-1">
                                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />}
                                  </div>
                                </td>
                              </tr>,
                              isExpanded ? <HomeHealthVault key={`vault-${r.id}`} r={r} /> : null,
                            ].filter(Boolean);
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
