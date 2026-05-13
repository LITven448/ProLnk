import { useState, type ReactNode } from "react";
import PartnerLayout from "@/components/PartnerLayout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import {
  Send, Eye, PhoneCall, CheckCircle, DollarSign,
  TrendingUp, ArrowRight, Clock, Filter,
  Users, UserCheck, UserPlus, Zap, Copy, Sparkles, Lightbulb,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- Funnel Stage Config ------------------------------------------------------
const FUNNEL_STAGES = [
  { id: "sent",       label: "Referral Sent",    icon: Send,        color: "#6366f1", bg: "#EEF2FF" },
  { id: "viewed",     label: "Lead Viewed",      icon: Eye,         color: "#0891b2", bg: "#E0F2FE" },
  { id: "contacted",  label: "Partner Contacted", icon: PhoneCall,  color: "#d97706", bg: "#FEF3C7" },
  { id: "closed",     label: "Job Closed",       icon: CheckCircle, color: "#059669", bg: "#D1FAE5" },
  { id: "paid",       label: "Commission Paid",  icon: DollarSign,  color: "#7C3AED", bg: "#EDE9FE" },
];

const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-yellow-100 text-yellow-700",
  viewed:    "bg-blue-100 text-blue-700",
  contacted: "bg-orange-100 text-orange-700",
  closed:    "bg-green-100 text-green-700",
  paid:      "bg-purple-100 text-purple-700",
  expired:   "bg-gray-100 text-gray-500",
  rejected:  "bg-red-100 text-red-700",
};

// --- Funnel Bar ---------------------------------------------------------------
type FunnelStages = { sent: number; viewed: number; contacted: number; closed: number; paid: number };
function FunnelBar({ stages, max }: { stages: FunnelStages; max: number }) {
  const values = [stages.sent, stages.viewed, stages.contacted, stages.closed, stages.paid];
  return (
    <div className="grid grid-cols-5 gap-2 items-end h-36">
      {FUNNEL_STAGES.map((stage, i) => {
        const val = values[i];
        const pct = max > 0 ? (val / max) * 100 : 0;
        const convRate = i > 0 ? ((val / values[i - 1]) * 100).toFixed(0) : "100";
        return (
          <div key={stage.id} className="flex flex-col items-center gap-1">
            <div className="text-xs font-bold text-gray-700">{val}</div>
            <div className="w-full relative flex items-end" style={{ height: "80px" }}>
              <div
                className="w-full rounded-t-lg transition-all duration-700"
                style={{ height: `${Math.max(pct, 8)}%`, backgroundColor: stage.color, opacity: 0.85 }}
              />
            </div>
            <div className="text-[10px] text-gray-400 text-center leading-tight">{stage.label}</div>
            {i > 0 && (
              <div className="text-[10px] font-semibold" style={{ color: stage.color }}>{convRate}%</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// --- Recruit Funnel Stages ---------------------------------------------------
const RECRUIT_STAGES = [
  { id: "invited",  label: "Invited",  icon: UserPlus,   color: "#6366f1", bg: "#EEF2FF",  desc: "Pros you've shared your link with" },
  { id: "applied",  label: "Applied",  icon: Send,       color: "#0891b2", bg: "#E0F2FE",  desc: "Completed the application" },
  { id: "approved", label: "Approved", icon: UserCheck,  color: "#d97706", bg: "#FEF3C7",  desc: "Passed ProLnk verification" },
  { id: "active",   label: "Active",   icon: Zap,        color: "#059669", bg: "#D1FAE5",  desc: "Earning — generating overrides for you" },
];

type RecruitCounts = { invited: number; applied: number; approved: number; active: number };

function RecruitFunnelSteps({ counts }: { counts: RecruitCounts }) {
  const values = [counts.invited, counts.applied, counts.approved, counts.active];
  const max = Math.max(counts.invited, 1);
  return (
    <div className="space-y-3">
      {RECRUIT_STAGES.map((stage, i) => {
        const Icon = stage.icon;
        const val = values[i];
        const pct = Math.max((val / max) * 100, val > 0 ? 8 : 0);
        const convRate = i > 0 && values[i - 1] > 0
          ? `${((val / values[i - 1]) * 100).toFixed(0)}% of prev`
          : i === 0 ? "starting point" : "—";
        return (
          <div key={stage.id}>
            {i > 0 && (
              <div className="flex items-center gap-2 pl-5 pb-1">
                <div className="w-px h-3 bg-gray-200" />
                <span className="text-[10px] text-gray-400 font-medium">{convRate}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stage.bg }}>
                <Icon className="w-4 h-4" style={{ color: stage.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700">{stage.label}</span>
                  <span className="text-sm font-bold" style={{ color: stage.color }}>{val}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: stage.color, opacity: 0.85 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">{stage.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Recruit Value Callout ---------------------------------------------------
function RecruitValueCallout({ activeCount, referralLink, onCopy }: {
  activeCount: number;
  referralLink: string;
  onCopy: () => void;
}) {
  const monthlyOverride = activeCount * 17.88;
  return (
    <div className="rounded-2xl p-5 border" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1B4FD8 100%)", borderColor: "#1B4FD8" }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <p className="text-xs text-white/70 font-medium mb-0.5">Subscription Override Income</p>
          <p className="text-white text-sm leading-snug">
            Your next recruit is worth{" "}
            <span className="font-bold text-yellow-300">$17.88/mo</span>{" "}
            in recurring subscription overrides — forever.
          </p>
        </div>
      </div>
      {activeCount > 0 && (
        <div className="bg-white/10 rounded-xl px-4 py-2 mb-4 flex items-center justify-between">
          <span className="text-xs text-white/70">{activeCount} active recruit{activeCount !== 1 ? "s" : ""} × $17.88</span>
          <span className="text-base font-bold text-emerald-300">${monthlyOverride.toFixed(2)}/mo</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/10 rounded-xl px-3 py-2 text-xs text-white/80 font-mono truncate">
          {referralLink}
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white text-[#1B4FD8] hover:bg-white/90 transition-colors flex-shrink-0"
        >
          <Copy className="w-3.5 h-3.5" /> Copy Link
        </button>
      </div>
      <p className="text-[11px] text-white/50 mt-2 text-center">
        Share your link to earn 12% subscription overrides on every pro you recruit
      </p>
    </div>
  );
}

// --- Recruit Conversion Chart -------------------------------------------------
const CONVERSION_TIPS = [
  { tip: "Personalize your message — mention the recruit's trade and city in your outreach." },
  { tip: "Share a screenshot of your earnings dashboard. Real numbers convert better than promises." },
  { tip: "Follow up once, 3 days after your first message. Most conversions happen on the second touch." },
  { tip: "Recruit pros you've worked with directly — warm connections convert 3× better than cold outreach." },
  { tip: "Highlight the $149/mo locked rate during the waitlist period — it won't stay this low forever." },
];

type ConversionStepData = { label: string; count: number; color: string; icon: ReactNode };

function RecruitConversionChart({ invited, clicked, signedUp }: { invited: number; clicked: number; signedUp: number }) {
  const max = Math.max(invited, 1);
  const steps: ConversionStepData[] = [
    { label: "Invited",    count: invited,  color: "#6366f1", icon: <UserPlus  className="w-4 h-4" /> },
    { label: "Clicked Link", count: clicked, color: "#0891b2", icon: <Eye        className="w-4 h-4" /> },
    { label: "Signed Up",  count: signedUp, color: "#059669", icon: <UserCheck  className="w-4 h-4" /> },
  ];

  const overallRate = invited > 0 ? ((signedUp / invited) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <h2 className="text-base font-heading font-bold text-gray-900">Recruit Conversion Chart</h2>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-700">{overallRate}%</span>
          <span className="text-[10px] text-emerald-600">conversion</span>
        </div>
      </div>

      {/* Step bars */}
      <div className="space-y-3">
        {steps.map((step, i) => {
          const pct = (step.count / max) * 100;
          const conv = i > 0 && steps[i - 1].count > 0
            ? `${((step.count / steps[i - 1].count) * 100).toFixed(0)}% of prev`
            : null;
          return (
            <div key={step.label}>
              {i > 0 && (
                <div className="flex items-center gap-1.5 pl-5 pb-1">
                  <div className="w-px h-3 bg-gray-200" />
                  <ArrowRight className="w-3 h-3 text-gray-300" />
                  {conv && <span className="text-[10px] text-gray-400 font-medium">{conv}</span>}
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${step.color}18`, color: step.color }}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">{step.label}</span>
                    <span className="text-sm font-bold" style={{ color: step.color }}>{step.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(pct, step.count > 0 ? 4 : 0)}%`, backgroundColor: step.color, opacity: 0.85 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Improve your conversion tips */}
      <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Improve Your Conversion</span>
        </div>
        <ul className="space-y-2">
          {CONVERSION_TIPS.slice(0, 3).map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-200 text-amber-700 font-bold flex items-center justify-center text-[10px] mt-0.5">{i + 1}</span>
              {t.tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------
export default function ReferralFunnelTracker() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const { data: referrals, isLoading } = trpc.partners.getOutboundReferrals.useQuery();
  const { data: networkData } = trpc.partners.getNetworkStats.useQuery(undefined, { retry: false });

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/join?ref=${(user as any)?.referralCode ?? (user as any)?.id ?? "me"}`
    : "";

  const recruitCounts: RecruitCounts = {
    invited:  (networkData as any)?.invitedCount  ?? 0,
    applied:  (networkData as any)?.appliedCount  ?? 0,
    approved: (networkData as any)?.approvedCount ?? 0,
    active:   (networkData as any)?.activeCount   ?? 0,
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink).then(() =>
      toast.success("Referral link copied!")
    );
  };

  const filtered = (referrals ?? []).filter((r: any) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  const funnelData = {
    sent:      (referrals ?? []).length,
    viewed:    (referrals ?? []).filter((r: any) => ["viewed","contacted","closed","paid"].includes(r.status)).length,
    contacted: (referrals ?? []).filter((r: any) => ["contacted","closed","paid"].includes(r.status)).length,
    closed:    (referrals ?? []).filter((r: any) => ["closed","paid"].includes(r.status)).length,
    paid:      (referrals ?? []).filter((r: any) => r.status === "paid").length,
  };

  const totalEarned = (referrals ?? [])
    .filter((r: any) => r.status === "paid")
    .reduce((sum: number, r: any) => sum + Number(r.commissionAmount ?? 0), 0);

  return (

    <PartnerLayout>

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                 Dashboard
              </button>
            </Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-lg font-heading font-bold text-gray-900">Referral Funnel</h1>
          </div>
          <div className="flex items-center gap-2">
            {(["7d","30d","90d"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === t ? "bg-[#0A1628] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Sent",    value: funnelData.sent,   icon: Send,        color: "#6366f1" },
            { label: "Closed",        value: funnelData.closed, icon: CheckCircle, color: "#059669" },
            { label: "Conversion",    value: funnelData.sent > 0 ? `${((funnelData.closed / funnelData.sent) * 100).toFixed(1)}%` : "0%", icon: TrendingUp, color: "#d97706" },
            { label: "Total Earned",  value: `$${totalEarned.toFixed(0)}`, icon: DollarSign, color: "#7C3AED" },
          ].map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}18` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-xs text-gray-500">{kpi.label}</span>
                </div>
                <div className="text-2xl font-heading font-bold text-gray-900">{kpi.value}</div>
              </div>
            );
          })}
        </div>

        {/* Recruit Funnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-500" />
              </div>
              <h2 className="text-base font-heading font-bold text-gray-900">Recruit Funnel</h2>
            </div>
            <RecruitFunnelSteps counts={recruitCounts} />
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-4 gap-2">
              {(["invited","applied","approved","active"] as const).map((stage) => {
                const cfg = RECRUIT_STAGES.find(s => s.id === stage)!;
                const Icon = cfg.icon;
                return (
                  <div key={stage} className="text-center p-2 rounded-xl" style={{ backgroundColor: cfg.bg }}>
                    <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: cfg.color }} />
                    <div className="text-sm font-bold" style={{ color: cfg.color }}>{recruitCounts[stage]}</div>
                    <div className="text-[10px] text-gray-500 leading-tight">{cfg.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <RecruitValueCallout
            activeCount={recruitCounts.active}
            referralLink={referralLink}
            onCopy={handleCopyReferralLink}
          />
        </div>

        {/* Recruit conversion chart */}
        <RecruitConversionChart
          invited={recruitCounts.invited}
          clicked={recruitCounts.applied}
          signedUp={recruitCounts.active}
        />

        {/* Funnel chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-heading font-bold text-gray-900 mb-4">Job Referral Conversion</h2>
          <FunnelBar stages={funnelData} max={funnelData.sent || 1} />
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            {FUNNEL_STAGES.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Filter + referral list */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-base font-heading font-bold text-gray-900">Referral History</h2>
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="viewed">Viewed</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
                <option value="paid">Paid</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Send className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No referrals yet. Start logging jobs to generate leads.</p>
              <Link href="/job/new">
                <button className="mt-4 px-5 py-2 text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: "#0A1628" }}>
                  Log a Job
                </button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.slice(0, 20).map((r: any) => (
                <div key={r.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-800 text-sm truncate">{r.description ?? "Referral opportunity"}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "--"}
                    </div>
                  </div>
                  <Badge className={`text-xs ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {r.status}
                  </Badge>
                  {r.commissionAmount && Number(r.commissionAmount) > 0 && (
                    <div className="text-sm font-bold text-green-600 flex-shrink-0">
                      +${Number(r.commissionAmount).toFixed(0)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

    </PartnerLayout>

  );
}
