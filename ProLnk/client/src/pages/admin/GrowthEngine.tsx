import { type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import {
  TrendingUp, Zap, Users, RefreshCw, DollarSign, Target,
  ArrowRight, BarChart3, Activity, Mail, Tornado, Trophy,
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from "recharts";

type LoopStep = {
  id: number;
  label: string;
  description: string;
  metric: string;
  value: string | number;
  icon: ReactNode;
  color: string;
};

import React from "react";

const CHANNEL_DATA = [
  { name: "Referral Program", spend: 4200, recommended: 6000, roi: 2.4, color: "#00B5B8" },
  { name: "Storm Marketing", spend: 2100, recommended: 3500, roi: 3.1, color: "#8B5CF6" },
  { name: "Partner Contests", spend: 1800, recommended: 2400, roi: 1.8, color: "#F59E0B" },
  { name: "Email Campaign", spend: 900, recommended: 1200, roi: 1.3, color: "#10B981" },
  { name: "Paid Social", spend: 3500, recommended: 2000, roi: 0.9, color: "#EF4444" },
];

const COHORT_DATA = [
  { cohort: "Dec 2025", size: 28, m1: 89, m2: 79, m3: 75, m6: 68 },
  { cohort: "Jan 2026", size: 34, m1: 91, m2: 82, m3: 77, m6: null },
  { cohort: "Feb 2026", size: 31, m1: 88, m2: 80, m3: null, m6: null },
  { cohort: "Mar 2026", size: 29, m1: 93, m2: null, m3: null, m6: null },
  { cohort: "Apr 2026", size: 25, m1: 92, m2: null, m3: null, m6: null },
];

const GROWTH_LEVERS = [
  {
    title: "Referral Program",
    description: "Partners earn $50 per recruited partner who logs their first job. Highest compounding ROI.",
    roi: 2.4,
    icon: Users,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30",
    action: "Boost",
    actionStyle: "bg-teal-500/20 text-teal-300 hover:bg-teal-500/30",
  },
  {
    title: "Storm Marketing",
    description: "Auto-trigger partner outreach blasts when NOAA detects hail or wind events in a service area.",
    roi: 3.1,
    icon: Tornado,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    action: "Activate",
    actionStyle: "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30",
  },
  {
    title: "Partner Contests",
    description: "Monthly leaderboard — top job-loggers win cash bonuses. Drives logging behavior and peer visibility.",
    roi: 1.8,
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    action: "Set Up",
    actionStyle: "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30",
  },
  {
    title: "Email Campaign",
    description: "Drip sequence for dormant partners — 3-touch reactivation with recent success story social proof.",
    roi: 1.3,
    icon: Mail,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    action: "Schedule",
    actionStyle: "bg-green-500/20 text-green-300 hover:bg-green-500/30",
  },
];

function retentionColor(val: number | null): string {
  if (val === null) return "text-slate-600";
  if (val >= 85) return "text-green-400";
  if (val >= 70) return "text-amber-400";
  return "text-red-400";
}

export default function GrowthEngine() {
  const { data: stats } = trpc.admin.getNetworkStats.useQuery();
  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const { data: opps } = trpc.admin.getAllOpportunities.useQuery();

  const approvedPartners = (partners ?? []).filter((p) => p.status === "approved").length;
  const converted = (opps ?? []).filter((o) => o.status === "converted").length;
  const convRate = (opps ?? []).length ? Math.round((converted / (opps ?? []).length) * 100) : 0;

  const avgReferrals = approvedPartners > 0
    ? ((opps ?? []).length / approvedPartners).toFixed(1)
    : "0";

  const kFactor = 0.31;
  const kPct = Math.round((kFactor / 1) * 100);

  const LOOP_STEPS: LoopStep[] = [
    {
      id: 1,
      label: "Partner logs a job",
      description: "Partner completes a service call and uploads 1-3 photos to the ProLnk portal.",
      metric: "Jobs logged",
      value: stats?.totalJobs ?? 0,
      icon: <Zap className="w-5 h-5" />,
      color: "text-teal-400",
    },
    {
      id: 2,
      label: "AI scans for opportunities",
      description: "Computer vision analyzes the photos and detects 12+ cross-sell opportunity types in the surrounding property.",
      metric: "Leads detected",
      value: stats?.totalOpportunities ?? 0,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-purple-400",
    },
    {
      id: 3,
      label: "Lead routed to matching partner",
      description: "The platform matches the opportunity to the best-fit partner in the network by service type and zip code.",
      metric: "Conversion rate",
      value: `${convRate}%`,
      icon: <Target className="w-5 h-5" />,
      color: "text-blue-400",
    },
    {
      id: 4,
      label: "Receiving partner closes the job",
      description: "The matched partner contacts the homeowner, closes the job, and logs it in their portal.",
      metric: "Jobs converted",
      value: converted,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-400",
    },
    {
      id: 5,
      label: "Commission auto-calculated",
      description: "ProLnk takes its platform fee. The referring partner earns their referral commission. Both partners grow.",
      metric: "Commissions paid",
      value: `$${Number(stats?.totalCommissionsPaid ?? 0).toFixed(2)}`,
      icon: <RefreshCw className="w-5 h-5" />,
      color: "text-yellow-400",
    },
    {
      id: 6,
      label: "Both partners send more referrals",
      description: "Every closed job creates a new incentive to log more jobs and send more leads -- the loop compounds.",
      metric: "Avg referrals/partner",
      value: avgReferrals,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-400",
    },
  ];

  const LEVERS = [
    {
      title: "Partner Density",
      description: "The more partners per zip code, the higher the match rate. Target 3+ partners per service category per zip.",
      status: approvedPartners >= 10 ? "healthy" : approvedPartners >= 5 ? "growing" : "early",
      value: `${approvedPartners} partners`,
      target: "50 partners",
    },
    {
      title: "Job Logging Rate",
      description: "Partners who log jobs weekly generate 4x more inbound leads. Nudge inactive partners with automated reminders.",
      status: (stats?.totalJobs ?? 0) >= 20 ? "healthy" : "early",
      value: `${stats?.totalJobs ?? 0} jobs`,
      target: "100 jobs/month",
    },
    {
      title: "Lead Conversion Rate",
      description: "A 30%+ conversion rate indicates strong partner-to-lead matching. Below 20% suggests category gaps.",
      status: convRate >= 30 ? "healthy" : convRate >= 15 ? "growing" : "early",
      value: `${convRate}%`,
      target: "30%+",
    },
    {
      title: "Viral Coefficient",
      description: "When each partner generates >1 referral on average, the network grows without paid acquisition.",
      status: Number(avgReferrals) >= 2 ? "healthy" : Number(avgReferrals) >= 1 ? "growing" : "early",
      value: `${avgReferrals} referrals/partner`,
      target: "2+ referrals/partner",
    },
  ];

  const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    healthy: { bg: "bg-green-500/20", text: "text-green-400", label: "Healthy" },
    growing: { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Growing" },
    early:   { bg: "bg-slate-500/20",  text: "text-slate-400",  label: "Early Stage" },
  };

  const totalSpend = CHANNEL_DATA.reduce((s, c) => s + c.spend, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Growth Loop Engine</h1>
            <p className="text-sm text-slate-400">Visualize and monitor the ProLnk compounding growth flywheel</p>
          </div>
        </div>

        {/* Viral Coefficient Card */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-orange-400" />
            <p className="text-sm font-semibold text-white">Viral Coefficient (K-Factor)</p>
          </div>
          <div className="flex items-end gap-4 mb-4">
            <p className="text-4xl font-black text-orange-400">K = {kFactor}</p>
            <p className="text-sm text-slate-400 mb-1.5">1 partner currently brings in <span className="text-white font-bold">{kFactor}</span> new partners on average</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Current: K={kFactor}</span>
              <span className="text-green-400 font-medium">Viral threshold: K=1.0</span>
            </div>
            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: `${kPct}%` }} />
            </div>
            <p className="text-xs text-slate-500">{kPct}% of the way to viral self-growth. At K≥1, every partner onboarded brings at least one more without additional spend.</p>
          </div>
        </div>

        {/* Growth Levers Panel */}
        <div>
          <p className="text-sm font-semibold text-white mb-3">Growth Levers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GROWTH_LEVERS.map((lever) => {
              const Icon = lever.icon;
              return (
                <div key={lever.title} className={`rounded-xl border p-4 ${lever.bg} ${lever.border}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${lever.color}`} />
                      <p className={`text-sm font-semibold ${lever.color}`}>{lever.title}</p>
                    </div>
                    <span className="text-xs font-bold text-white bg-slate-700/60 px-2 py-0.5 rounded-full flex-shrink-0">
                      {lever.roi}x ROI
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{lever.description}</p>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${lever.actionStyle}`}>
                    {lever.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Growth Loop */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm font-semibold text-white mb-5">The ProLnk Growth Loop</p>
          <div className="space-y-3">
            {LOOP_STEPS.map((step, i) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center ${step.color}`}>
                    {step.icon}
                  </div>
                  {i < LOOP_STEPS.length - 1 && (
                    <div className="w-0.5 h-6 bg-slate-700 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{step.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-lg font-black ${step.color}`}>{step.value}</p>
                      <p className="text-xs text-slate-500">{step.metric}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 flex-shrink-0 flex justify-center">
                <RefreshCw className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-xs text-teal-400 font-medium">Loop repeats -- each job compounds the network effect</p>
            </div>
          </div>
        </div>

        {/* Cohort Retention Table */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <p className="text-sm font-semibold text-white mb-4">Partner Cohort Retention</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-700">
                  <th className="text-left pb-3 font-medium">Cohort</th>
                  <th className="text-center pb-3 font-medium">Size</th>
                  <th className="text-center pb-3 font-medium">Month 1</th>
                  <th className="text-center pb-3 font-medium">Month 2</th>
                  <th className="text-center pb-3 font-medium">Month 3</th>
                  <th className="text-center pb-3 font-medium">Month 6</th>
                </tr>
              </thead>
              <tbody>
                {COHORT_DATA.map((row) => (
                  <tr key={row.cohort} className="border-b border-slate-700/50 last:border-0">
                    <td className="py-3 text-slate-300 text-xs">{row.cohort}</td>
                    <td className="py-3 text-center text-slate-400 text-xs">{row.size}</td>
                    {([row.m1, row.m2, row.m3, row.m6] as (number | null)[]).map((val, i) => (
                      <td key={i} className={`py-3 text-center text-xs font-bold ${retentionColor(val)}`}>
                        {val !== null ? `${val}%` : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">— indicates data not yet available for this period</p>
        </div>

        {/* Channel Mix Optimizer */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <p className="text-sm font-semibold text-white mb-4">Channel Mix Optimizer</p>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Pie chart */}
            <div className="flex-shrink-0">
              <p className="text-xs text-slate-400 mb-2 text-center">Current Spend Distribution</p>
              <ResponsiveContainer width={200} height={180}>
                <PieChart>
                  <Pie
                    data={CHANNEL_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="spend"
                  >
                    {CHANNEL_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Spend"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1 mt-2">
                {CHANNEL_DATA.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-xs text-slate-400 truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-700">
                    <th className="text-left pb-2 font-medium">Channel</th>
                    <th className="text-right pb-2 font-medium">Current</th>
                    <th className="text-right pb-2 font-medium">Recommended</th>
                    <th className="text-right pb-2 font-medium">ROI</th>
                    <th className="text-right pb-2 font-medium">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {CHANNEL_DATA.map((c) => {
                    const diff = c.recommended - c.spend;
                    return (
                      <tr key={c.name} className="border-b border-slate-700/50 last:border-0">
                        <td className="py-2 text-slate-300 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                          {c.name}
                        </td>
                        <td className="py-2 text-right text-slate-400">${(c.spend ?? 0).toLocaleString()}</td>
                        <td className="py-2 text-right text-slate-400">${(c.recommended ?? 0).toLocaleString()}</td>
                        <td className={`py-2 text-right font-bold ${c.roi >= 2 ? "text-green-400" : c.roi >= 1.5 ? "text-amber-400" : "text-red-400"}`}>
                          {c.roi}x
                        </td>
                        <td className={`py-2 text-right font-medium ${diff > 0 ? "text-green-400" : diff < 0 ? "text-red-400" : "text-slate-400"}`}>
                          {diff > 0 ? `+$${diff.toLocaleString()}` : diff < 0 ? `-$${Math.abs(diff).toLocaleString()}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-600">
                    <td className="pt-2 text-slate-300 font-semibold">Total</td>
                    <td className="pt-2 text-right text-white font-bold">${totalSpend.toLocaleString()}</td>
                    <td className="pt-2 text-right text-white font-bold">${CHANNEL_DATA.reduce((s, c) => s + c.recommended, 0).toLocaleString()}</td>
                    <td />
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Growth levers (original) */}
        <div>
          <p className="text-sm font-semibold text-white mb-3">Live Growth Levers</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LEVERS.map((lever) => {
              const style = STATUS_STYLES[lever.status];
              return (
                <div key={lever.title} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">{lever.title}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{lever.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-bold">{lever.value}</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <ArrowRight className="w-3 h-3" /> Target: {lever.target}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Growth playbook */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
          <p className="text-sm font-semibold text-white mb-4">30-Day Growth Playbook</p>
          <div className="space-y-3">
            {[
              { week: "Week 1", action: "Onboard 10 DFW partners across 5 categories (lawn, pest, pool, windows, HVAC)", lever: "Partner Density" },
              { week: "Week 2", action: "Activate job logging -- send SMS reminder to all partners to log their first 3 jobs", lever: "Job Logging Rate" },
              { week: "Week 3", action: "Review first batch of AI-detected leads -- manually match any unmatched opportunities", lever: "Conversion Rate" },
              { week: "Week 4", action: "Launch referral bonus campaign -- $25 per partner referred who logs their first job", lever: "Viral Coefficient" },
            ].map((item) => (
              <div key={item.week} className="flex items-start gap-3">
                <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-bold bg-teal-500/20 text-teal-400">{item.week}</span>
                <div>
                  <p className="text-xs text-slate-300">{item.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Lever: {item.lever}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
