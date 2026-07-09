import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Send, Eye, UserCheck, ShieldCheck, Briefcase, Zap,
  TrendingUp, DollarSign, Users, Copy, Bell, Clock,
  ChevronRight, Filter, ArrowDown,
} from "lucide-react";
import { toast } from "sonner";

// ── Funnel Stage Config ────────────────────────────────────────────────────────
const FUNNEL_STAGES = [
  {
    id: "invited",
    label: "Invited",
    icon: Send,
    color: "#60A5FA",
    desc: "You shared your link with them",
    revenuePerPro: 0,
  },
  {
    id: "clicked",
    label: "Clicked Link",
    icon: Eye,
    color: "#818CF8",
    desc: "They opened your referral URL",
    revenuePerPro: 0,
  },
  {
    id: "signed_up",
    label: "Signed Up",
    icon: UserCheck,
    color: "#A78BFA",
    desc: "Completed the application form",
    revenuePerPro: 0,
  },
  {
    id: "verified",
    label: "Verified",
    icon: ShieldCheck,
    color: "#2DD4BF",
    desc: "Identity + license confirmed",
    revenuePerPro: 0,
  },
  {
    id: "first_job",
    label: "First Job",
    icon: Briefcase,
    color: "#34D399",
    desc: "Completed their first ProLnk job",
    revenuePerPro: 7.68,
  },
  {
    id: "active_pro",
    label: "Active Pro",
    icon: Zap,
    color: "#F5C518",
    desc: "Earning — generating overrides for you",
    revenuePerPro: 17.88,
  },
];

const STAGE_ORDER = FUNNEL_STAGES.map(s => s.id);

function stageIndex(stage: string) {
  return STAGE_ORDER.indexOf(stage);
}

// ── Mock referral type ─────────────────────────────────────────────────────────
type Referral = {
  id: string;
  firstName: string;
  trade: string;
  dateInvited: string;
  stage: string;
  daysInStage: number;
  revenueGenerated: number;
};

// ── Funnel bar (pure CSS) ─────────────────────────────────────────────────────
function FunnelBars({ counts }: { counts: number[] }) {
  const max = Math.max(...counts, 1);
  return (
    <div className="flex items-end gap-2" style={{ height: 120 }}>
      {FUNNEL_STAGES.map((stage, i) => {
        const val = counts[i] ?? 0;
        const pct = (val / max) * 100;
        const conv = i > 0 && counts[i - 1] > 0
          ? Math.round((val / counts[i - 1]) * 100)
          : 100;
        return (
          <div key={stage.id} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs font-bold" style={{ color: stage.color }}>{val}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-700 min-h-[6px]"
              style={{ height: `${Math.max(pct, 5)}%`, background: stage.color, opacity: 0.85 }}
            />
            {i > 0 && (
              <span className="text-[9px] font-semibold" style={{ color: stage.color }}>{conv}%</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Stage Badge ───────────────────────────────────────────────────────────────
function StageBadge({ stage }: { stage: string }) {
  const cfg = FUNNEL_STAGES.find(s => s.id === stage) ?? FUNNEL_STAGES[0];
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full"
      style={{ background: `${cfg.color}18`, color: cfg.color }}
    >
      <Icon size={10} />
      {cfg.label}
    </span>
  );
}

// ── Referral Card ─────────────────────────────────────────────────────────────
function ReferralCard({ r, onRemind }: { r: Referral; onRemind: (id: string) => void }) {
  const idx = stageIndex(r.stage);
  const cfg = FUNNEL_STAGES[idx] ?? FUNNEL_STAGES[0];
  const isStuck = r.daysInStage > 7;
  const nextStage = FUNNEL_STAGES[idx + 1];

  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${isStuck ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ background: `${cfg.color}20`, color: cfg.color }}
          >
            {r.firstName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{r.firstName}</p>
            <p className="text-xs text-gray-500">{r.trade}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <StageBadge stage={r.stage} />
          {r.revenueGenerated > 0 && (
            <span className="text-[10px] font-bold text-green-400">
              +${r.revenueGenerated.toFixed(2)}/mo
            </span>
          )}
        </div>
      </div>

      {/* Stage progress bar */}
      <div className="mt-3">
        <div className="flex gap-1">
          {FUNNEL_STAGES.map((s, i) => (
            <div
              key={s.id}
              className="flex-1 h-1 rounded-full transition-all"
              style={{
                background: i <= idx ? s.color : "rgba(255,255,255,0.08)",
                opacity: i <= idx ? 1 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-gray-500 flex items-center gap-1">
            <Clock size={9} />
            Invited {new Date(r.dateInvited).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
          {isStuck && (
            <span className="text-[10px] font-semibold text-amber-400">
              Stuck {r.daysInStage}d in {cfg.label}
            </span>
          )}
        </div>
      </div>

      {/* Reminder row */}
      {nextStage && (
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="text-[10px] text-gray-500">
            Next: <span style={{ color: nextStage.color }}>{nextStage.label}</span>
          </span>
          {(isStuck || idx < 4) && (
            <button
              onClick={() => onRemind(r.id)}
              className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
              style={{ background: "rgba(45,212,191,0.12)", color: "#2DD4BF" }}
            >
              <Bell size={10} />
              Send Reminder
            </button>
          )}
        </div>
      )}

      {r.stage === "active_pro" && (
        <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: "1px solid rgba(245,197,24,0.2)" }}>
          <DollarSign size={11} style={{ color: "#F5C518" }} />
          <span className="text-[10px] text-gray-400">
            Generating <span className="font-bold text-white">${r.revenueGenerated.toFixed(2)}/mo</span> in overrides
          </span>
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ReferralFunnelTracker() {
  const { user } = useAuth();
  const [filterStage, setFilterStage] = useState("all");

  const { data: networkData } = trpc.partners.getNetworkStats.useQuery(undefined, { retry: false });

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/join?ref=${(user as any)?.referralCode ?? (user as any)?.id ?? "me"}`
    : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => toast.success("Referral link copied!"));
  };

  const handleRemind = (id: string) => {
    toast.success("Reminder queued", { description: `We'll nudge them via email today.` });
  };

  const rawCounts: number[] = [
    (networkData as any)?.invitedCount  ?? 12,
    (networkData as any)?.clickedCount  ?? 9,
    (networkData as any)?.signedUpCount ?? 6,
    (networkData as any)?.verifiedCount ?? 4,
    (networkData as any)?.firstJobCount ?? 2,
    (networkData as any)?.activeCount   ?? 1,
  ];

  const totalRevenue = rawCounts[5] * 17.88 + rawCounts[4] * 7.68;

  const demoReferrals: Referral[] = [
    { id: "1", firstName: "Marcus", trade: "Plumber", dateInvited: "2026-04-10", stage: "active_pro", daysInStage: 28, revenueGenerated: 17.88 },
    { id: "2", firstName: "Denise", trade: "HVAC",    dateInvited: "2026-04-22", stage: "first_job",  daysInStage: 5,  revenueGenerated: 7.68 },
    { id: "3", firstName: "Tyler",  trade: "Electrician", dateInvited: "2026-04-30", stage: "verified", daysInStage: 11, revenueGenerated: 0 },
    { id: "4", firstName: "Sarah",  trade: "Roofer",  dateInvited: "2026-05-05", stage: "signed_up", daysInStage: 9,  revenueGenerated: 0 },
    { id: "5", firstName: "Greg",   trade: "Painter", dateInvited: "2026-05-08", stage: "clicked",   daysInStage: 6,  revenueGenerated: 0 },
    { id: "6", firstName: "Aisha",  trade: "Flooring", dateInvited: "2026-05-10", stage: "invited",  daysInStage: 4,  revenueGenerated: 0 },
  ];

  const filtered = filterStage === "all" ? demoReferrals : demoReferrals.filter(r => r.stage === filterStage);
  const overallConv = rawCounts[0] > 0 ? ((rawCounts[5] / rawCounts[0]) * 100).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <TrendingUp size={22} style={{ color: "#2DD4BF" }} />
              Referral Funnel Tracker
            </h1>
            <p className="text-gray-400 text-sm mt-1">Track every recruit from invitation to active pro</p>
          </div>
          <Link href="/dashboard/partner-home">
            <span className="text-xs font-semibold flex items-center gap-1 shrink-0" style={{ color: "#2DD4BF" }}>
              Dashboard <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Invited",    value: rawCounts[0],           color: "#60A5FA", icon: Users },
            { label: "Active Pros",      value: rawCounts[5],           color: "#F5C518", icon: Zap },
            { label: "Overall Conv.",    value: `${overallConv}%`,       color: "#2DD4BF", icon: TrendingUp },
            { label: "Monthly Override", value: `$${totalRevenue.toFixed(0)}`, color: "#34D399", icon: DollarSign },
          ].map(({ label, value, color, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl p-5"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}25` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} style={{ color }} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Funnel Visualization */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h2 className="text-sm font-bold text-white mb-5">Conversion Funnel</h2>
          <FunnelBars counts={rawCounts} />
          <div className="mt-4 flex flex-wrap gap-3">
            {FUNNEL_STAGES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.id} className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                  <Icon size={10} style={{ color: s.color }} />
                  {s.label}
                  {i < FUNNEL_STAGES.length - 1 && (
                    <ArrowDown size={9} className="text-gray-600 rotate-[-90deg]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Funnel stages detail */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {FUNNEL_STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const count = rawCounts[i] ?? 0;
            const conv = i > 0 && rawCounts[i - 1] > 0
              ? Math.round((count / rawCounts[i - 1]) * 100)
              : null;
            return (
              <div
                key={stage.id}
                className="rounded-xl p-4 text-center"
                style={{ background: `${stage.color}0A`, border: `1px solid ${stage.color}30` }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ background: `${stage.color}20` }}
                >
                  <Icon size={16} style={{ color: stage.color }} />
                </div>
                <p className="text-2xl font-bold text-white mb-0.5">{count}</p>
                <p className="text-[10px] font-semibold mb-1" style={{ color: stage.color }}>{stage.label}</p>
                <p className="text-[9px] text-gray-500 leading-tight">{stage.desc}</p>
                {conv !== null && (
                  <p className="text-[10px] font-bold mt-1.5" style={{ color: stage.color }}>{conv}% prev</p>
                )}
                {stage.revenuePerPro > 0 && count > 0 && (
                  <p className="text-[9px] text-green-400 font-semibold mt-1">
                    +${(count * stage.revenuePerPro).toFixed(0)}/mo
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Referral link share */}
        <div
          className="rounded-2xl p-5 mb-6"
          style={{ background: "linear-gradient(135deg, rgba(45,212,191,0.10), rgba(45,212,191,0.04))", border: "1px solid rgba(45,212,191,0.25)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Send size={14} style={{ color: "#2DD4BF" }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#2DD4BF" }}>
              Your Referral Link
            </p>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Share this link. When a pro signs up through it, they appear in your funnel automatically.
            Each active pro earns you <span className="text-white font-semibold">$17.88/mo</span> in subscription overrides.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="flex-1 rounded-xl px-3 py-2.5 text-xs font-mono truncate"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.7)" }}
            >
              {referralLink || "prolnk.xyz/join?ref=you"}
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-opacity hover:opacity-90"
              style={{ background: "#2DD4BF", color: "#0A1628" }}
            >
              <Copy size={12} />
              Copy
            </button>
          </div>
        </div>

        {/* Individual referral cards */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            <h2 className="text-sm font-bold text-white">Your Referrals</h2>
            <div className="flex items-center gap-2">
              <Filter size={12} className="text-gray-400" />
              <select
                value={filterStage}
                onChange={e => setFilterStage(e.target.value)}
                className="text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
              >
                <option value="all">All Stages</option>
                {FUNNEL_STAGES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={32} className="mx-auto mb-3 text-gray-600" />
              <p className="text-gray-400 text-sm">No referrals in this stage yet.</p>
            </div>
          ) : (
            <div className="p-4 grid sm:grid-cols-2 gap-3">
              {filtered.map(r => (
                <ReferralCard key={r.id} r={r} onRemind={handleRemind} />
              ))}
            </div>
          )}
        </div>

        {/* Revenue breakdown */}
        <div
          className="mt-6 rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <h3 className="text-sm font-bold text-white mb-4">Revenue Generated Per Stage</h3>
          <div className="space-y-3">
            {FUNNEL_STAGES.filter(s => s.revenuePerPro > 0).map(stage => {
              const idx = STAGE_ORDER.indexOf(stage.id);
              const count = rawCounts[idx] ?? 0;
              const total = count * stage.revenuePerPro;
              return (
                <div key={stage.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold w-24 shrink-0" style={{ color: stage.color }}>{stage.label}</span>
                  <div className="flex-1 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${Math.min((total / Math.max(totalRevenue, 1)) * 100, 100)}%`, background: stage.color }}
                    />
                  </div>
                  <span className="text-xs font-bold text-white w-20 text-right shrink-0">
                    ${total.toFixed(2)}/mo
                  </span>
                  <span className="text-[10px] text-gray-500 w-14 text-right shrink-0">
                    {count} pros
                  </span>
                </div>
              );
            })}
            <div className="pt-3 flex justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-xs font-bold text-gray-300">Total Monthly Override</span>
              <span className="text-sm font-bold" style={{ color: "#2DD4BF" }}>${totalRevenue.toFixed(2)}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
