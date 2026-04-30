import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { TrendingUp, Zap, Users, RefreshCw, DollarSign, Target, ArrowRight, BarChart3 } from "lucide-react";

type LoopStep = {
  id: number;
  label: string;
  description: string;
  metric: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

import React from "react";

export default function GrowthEngine() {
  const { data: stats } = trpc.admin.getNetworkStats.useQuery();
  const { data: partners } = trpc.admin.getAllPartners.useQuery();
  const { data: opps } = trpc.admin.getAllOpportunities.useQuery();

  const approvedPartners = (partners ?? []).filter((p) => p.status === "approved").length;
  const converted = (opps ?? []).filter((o) => o.status === "converted").length;
  const convRate = (opps ?? []).length ? Math.round((converted / (opps ?? []).length) * 100) : 0;

  // Viral coefficient: avg referrals sent per partner
  const avgReferrals = approvedPartners > 0
    ? ((opps ?? []).length / approvedPartners).toFixed(1)
    : "0";

  // Growth loop steps
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

  // Growth levers
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

        {/* The Loop */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm font-semibold text-white mb-5">The ProLnk Growth Loop</p>
          <div className="space-y-3">
            {LOOP_STEPS.map((step, i) => (
              <div key={step.id} className="flex items-start gap-4">
                {/* Step number + connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center ${step.color}`}>
                    {step.icon}
                  </div>
                  {i < LOOP_STEPS.length - 1 && (
                    <div className="w-0.5 h-6 bg-slate-700 mt-1" />
                  )}
                </div>
                {/* Content */}
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
            {/* Loop back arrow */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 flex-shrink-0 flex justify-center">
                <RefreshCw className="w-5 h-5 text-teal-500" />
              </div>
              <p className="text-xs text-teal-400 font-medium">Loop repeats -- each job compounds the network effect</p>
            </div>
          </div>
        </div>

        {/* Growth levers */}
        <div>
          <p className="text-sm font-semibold text-white mb-3">Growth Levers</p>
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
