import React from 'react';
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Crown, Star, Lock, Calendar, Users, TrendingUp, DollarSign,
  Copy, Check, Share2, ChevronRight, Loader2, Zap, BarChart3,
  ArrowUpRight, Network, Layers, Gift,
} from "lucide-react";

const TIER_CONFIG: Record<string, {
  label: string; number: string; color: string; bg: string;
  border: string; icon: React.ElementType; gradient: string;
}> = {
  charter: {
    label: "Charter Member",
    number: "Charter",
    color: "#F5E642",
    bg: "rgba(245,230,66,0.12)",
    border: "rgba(245,230,66,0.4)",
    icon: Crown,
    gradient: "linear-gradient(135deg, rgba(245,230,66,0.15), rgba(245,230,66,0.04))",
  },
  founding: {
    label: "Founding Member",
    number: "Founding",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.4)",
    icon: Star,
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.04))",
  },
  level3: {
    label: "Level 3 Partner",
    number: "L3",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.4)",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.04))",
  },
  level4: {
    label: "Level 4 Partner",
    number: "L4",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.12)",
    border: "rgba(107,114,128,0.35)",
    icon: Layers,
    gradient: "linear-gradient(135deg, rgba(107,114,128,0.15), rgba(107,114,128,0.04))",
  },
};

const SUB_RATE = 149;
const L1_SUB_PCT = 0.12;
const L1_JOB_PCT = 0.07;
const AVG_JOB_VALUE = 800;
const PLATFORM_FEE = 0.12;
const JOBS_PER_PRO = 8;

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shrink-0 transition-all"
      style={{
        background: copied ? "rgba(245,230,66,0.18)" : "rgba(245,230,66,0.1)",
        color: "#F5E642",
        border: `1px solid ${copied ? "rgba(245,230,66,0.55)" : "rgba(245,230,66,0.28)"}`,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy Link"}
    </button>
  );
}

function PositionHero({ status, tier }: { status: any; tier: string }) {
  const cfg = TIER_CONFIG[tier] ?? TIER_CONFIG.founding;
  const TierIcon = cfg.icon;
  const joinDate = status.createdAt
    ? new Date(status.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "2026";

  return (
    <div
      className="rounded-2xl p-7 flex flex-col sm:flex-row sm:items-center gap-6"
      style={{ background: cfg.gradient, border: `1px solid ${cfg.border}` }}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: cfg.bg, border: `2px solid ${cfg.border}` }}
      >
        <TierIcon size={36} style={{ color: cfg.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span
            className="text-3xl font-black"
            style={{ color: cfg.color }}
          >
            {cfg.number} #{status.position ?? "—"}
          </span>
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </span>
        </div>
        <p className="text-gray-300 text-sm font-medium mb-3">
          {status.firstName} {status.lastName} · {status.businessType || "Home Service Pro"}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
          >
            <Lock size={12} />
            $149/mo locked forever
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.06)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Calendar size={12} />
            Since {joinDate}
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <p className="text-4xl font-black text-white">4</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">Override<br />Levels</p>
      </div>
    </div>
  );
}

function IncomeCalculator({ actualRecruits }: { actualRecruits: number }) {
  const [slider, setSlider] = useState(Math.max(actualRecruits, 5));

  const est = useMemo(() => {
    const l1 = slider;
    const l2 = l1 * 3;
    const l3 = l2 * 2;
    const l4 = l3 * 2;

    const platformFeePerJob = AVG_JOB_VALUE * PLATFORM_FEE;
    const jobOverride =
      l1 * JOBS_PER_PRO * platformFeePerJob * L1_JOB_PCT +
      l2 * JOBS_PER_PRO * platformFeePerJob * 0.04 +
      l3 * JOBS_PER_PRO * platformFeePerJob * 0.02 +
      l4 * JOBS_PER_PRO * platformFeePerJob * 0.01;

    const subOverride =
      l1 * SUB_RATE * L1_SUB_PCT +
      l2 * SUB_RATE * 0.06 +
      l3 * SUB_RATE * 0.03 +
      l4 * SUB_RATE * 0.015;

    const nextFive = 5;
    const nextSliderJob =
      nextFive * JOBS_PER_PRO * platformFeePerJob * L1_JOB_PCT;
    const nextSliderSub = nextFive * SUB_RATE * L1_SUB_PCT;
    const gainPerFive = Math.round(nextSliderJob + nextSliderSub);

    return {
      jobOverride: Math.round(jobOverride),
      subOverride: Math.round(subOverride),
      total: Math.round(jobOverride + subOverride),
      network: { l1, l2, l3, l4 },
      gainPerFive,
    };
  }, [slider]);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <BarChart3 size={18} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Override Income Calculator</h3>
          <p className="text-xs text-gray-400">Your projected monthly network income</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-400">Pros you recruit (direct)</label>
          <span className="text-sm font-bold text-white">{slider} pros</span>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={slider}
          onChange={(e) => setSlider(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>1</span>
          <span>50</span>
        </div>
        {actualRecruits > 0 && (
          <p className="text-xs text-center mt-2" style={{ color: "#3b82f6" }}>
            Actual recruits: {actualRecruits} · Adjust slider to model growth
          </p>
        )}
      </div>

      <div className="space-y-2 mb-5">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-xs text-gray-400 font-medium">L1 subscription overrides</p>
            <p className="text-[10px] text-gray-600">
              {slider} pros × $149/mo × 12% = ${Math.round(slider * SUB_RATE * L1_SUB_PCT)}/mo at L1
            </p>
          </div>
          <span className="text-sm font-bold text-white">{formatCurrency(est.subOverride)}</span>
        </div>
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div>
            <p className="text-xs text-gray-400 font-medium">Job commission overrides (4 levels)</p>
            <p className="text-[10px] text-gray-600">
              {est.network.l1}L1 + {est.network.l2}L2 + {est.network.l3}L3 + {est.network.l4}L4 pros
            </p>
          </div>
          <span className="text-sm font-bold text-white">{formatCurrency(est.jobOverride)}</span>
        </div>
      </div>

      <div
        className="rounded-xl p-4 flex items-center justify-between mb-4"
        style={{ background: "rgba(245,230,66,0.1)", border: "1px solid rgba(245,230,66,0.28)" }}
      >
        <div>
          <p className="text-xs font-bold" style={{ color: "#F5E642" }}>Estimated Monthly Income</p>
          <p className="text-[10px] text-gray-500">Avg $800 job, 8 jobs/mo/pro at full network depth</p>
        </div>
        <p className="text-2xl font-black" style={{ color: "#F5E642" }}>{formatCurrency(est.total)}</p>
      </div>

      <p className="text-xs text-center" style={{ color: "#22c55e" }}>
        Recruit 5 more pros → earn <span className="font-bold">+{formatCurrency(est.gainPerFive)}/mo</span> more
      </p>
    </div>
  );
}

function NetworkCascadePreview({ tier }: { tier: string }) {
  const cfg = TIER_CONFIG[tier] ?? TIER_CONFIG.founding;

  const levels = [
    { label: "You", desc: "Your referrals earn you 7% job / 12% sub overrides", depth: 0, count: 1 },
    { label: "Level 1", desc: "Direct recruits — 7% job / 12% sub override", depth: 1, count: 5 },
    { label: "Level 2", desc: "Their recruits — 4% job / 6% sub override", depth: 2, count: 15 },
    { label: "Level 3", desc: "L2 recruits — 2% job / 3% sub override", depth: 3, count: 30 },
    { label: "Level 4", desc: "L3 recruits — 1% job / 1.5% sub override", depth: 4, count: 60 },
  ];

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(139,92,246,0.12)" }}>
          <Network size={18} style={{ color: "#8b5cf6" }} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Network Cascade Preview</h3>
          <p className="text-xs text-gray-400">Income compounds as your network grows</p>
        </div>
      </div>

      <div className="space-y-2">
        {levels.map(({ label, desc, depth, count }, i) => (
          <div key={label} className="flex items-start gap-3">
            {depth > 0 && (
              <div
                className="flex-shrink-0 mt-1"
                style={{ width: depth * 16, borderLeft: "2px solid rgba(139,92,246,0.25)", height: "100%" }}
              />
            )}
            <div
              className="flex-1 flex items-center justify-between px-4 py-3 rounded-xl transition-all"
              style={{
                background: depth === 0
                  ? cfg.bg
                  : `rgba(139,92,246,${0.08 - depth * 0.012})`,
                border: depth === 0
                  ? `1px solid ${cfg.border}`
                  : "1px solid rgba(139,92,246,0.15)",
                marginLeft: depth > 0 ? 0 : undefined,
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: depth === 0 ? cfg.bg : "rgba(139,92,246,0.15)",
                    color: depth === 0 ? cfg.color : "#8b5cf6",
                  }}
                >
                  {depth === 0 ? "★" : count}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-[10px] text-gray-500">{desc}</p>
                </div>
              </div>
              {depth > 0 && (
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: "#8b5cf6" }}
                >
                  ~{count} pros
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Each person you recruit can recruit others — income compounds at every level.
      </p>
    </div>
  );
}

function ActionCards({ referralLink, tier, referralCode }: { referralLink: string; tier: string; referralCode?: string }) {
  const isCharter = tier === "charter";

  const cards = [
    {
      label: "Share Your Invite Link",
      description: "Copy and share your personal referral URL",
      icon: Share2,
      color: "#F5E642",
      bg: "rgba(245,230,66,0.1)",
      border: "rgba(245,230,66,0.3)",
      action: () => navigator.clipboard.writeText(referralLink),
      isAction: true,
    },
    {
      label: "View Your Recruits",
      description: "See the pros in your L1 downline",
      icon: Users,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.3)",
      href: "/dashboard/network-directory",
      isAction: false,
    },
    {
      label: "Calculate Your Income",
      description: "Full income projection and scenarios",
      icon: DollarSign,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
      border: "rgba(34,197,94,0.3)",
      href: "/commission-calculator",
      isAction: false,
    },
    ...(isCharter
      ? [{
          label: "Charter Invite Links",
          description: "Exclusive charter-tier recruitment tools",
          icon: Gift,
          color: "#F5E642",
          bg: "rgba(245,230,66,0.08)",
          border: "rgba(245,230,66,0.25)",
          href: "/dashboard/charter-invites",
          isAction: false,
        }]
      : [{
          label: "Upgrade Your Tier",
          description: "Recruit more pros to move up",
          icon: ArrowUpRight,
          color: "#8b5cf6",
          bg: "rgba(139,92,246,0.1)",
          border: "rgba(139,92,246,0.3)",
          href: "/dashboard/upgrade",
          isAction: false,
        }]
    ),
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ label, description, icon: Icon, color, bg, border, href, action, isAction }) => {
        const inner = (
          <div
            className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all hover:scale-[1.02] h-full"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.07)" }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
            <ChevronRight size={14} style={{ color }} className="self-end" />
          </div>
        );

        if (isAction && action) {
          return (
            <button key={label} onClick={action} className="text-left h-full">
              {inner}
            </button>
          );
        }
        return (
          <Link key={label} href={href ?? "/"}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

function ReferralLinkCard({ referralLink, referralCode }: { referralLink: string; referralCode?: string }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <Share2 size={18} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Your Invite Link</h3>
          <p className="text-xs text-gray-400">Share to grow your network and earn overrides</p>
        </div>
      </div>

      <div
        className="flex items-center gap-3 p-3 rounded-xl mb-3 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="flex-1 text-sm text-gray-300 truncate font-mono min-w-0">{referralLink}</p>
        <CopyButton text={referralLink} />
      </div>

      {referralCode && (
        <p className="text-xs text-gray-500 mb-4">
          Referral code: <span className="font-mono font-bold text-white">{referralCode}</span>
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <a
          href={`https://twitter.com/intent/tweet?text=Just+joined+the+ProLnk+founding+network+%E2%80%94+lock+in+%24149%2Fmo+and+earn+overrides+4+levels+deep.+Grab+your+spot%3A+${encodeURIComponent(referralLink)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{ background: "rgba(29,161,242,0.12)", color: "#1da1f2", border: "1px solid rgba(29,161,242,0.25)" }}
        >
          Share on X <ArrowUpRight size={12} />
        </a>
        <a
          href={`sms:?body=I+just+joined+ProLnk%E2%80%99s+founding+network.+Lock+in+%24149%2Fmo+before+spots+fill+up%3A+${encodeURIComponent(referralLink)}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          Share via SMS <Share2 size={12} />
        </a>
      </div>
    </div>
  );
}

export default function FoundingNetworkDashboard() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";

  const { data: status, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: "#0A1628" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#F5E642" }} />
          <p className="text-sm text-gray-400">Loading your founding member dashboard...</p>
        </div>
      </div>
    );
  }

  const mockStatus = {
    firstName: "Partner",
    lastName: "",
    businessType: "Home Service Professional",
    position: 42,
    tier: "founding",
    referralCode: "DEMO42",
    createdAt: "2026-01-15T00:00:00Z",
    referrals: [],
  };

  const data = status ?? mockStatus;
  const tier = (data.tier ?? "founding") as string;
  const isFoundingNetwork = tier !== "waitlist";

  if (!isFoundingNetwork) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
        style={{ background: "#0A1628" }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(245,230,66,0.1)" }}>
          <Zap size={28} style={{ color: "#F5E642" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Founding Network Members Only</h2>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          This dashboard is for founding network members. Reserve your spot to lock in $149/mo and earn 4-level overrides.
        </p>
        <Link href="/join">
          <span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: "#F5E642", color: "#0A1628" }}
          >
            Claim Your Founding Spot <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    );
  }

  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.xyz"}/join?ref=${data.referralCode}`;
  const actualRecruits = Array.isArray(data.referrals) ? data.referrals.length : 0;

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">Founding Network</h1>
            <p className="text-gray-500 text-sm">Your position, override income, and network cascade</p>
          </div>
          <Link href="/dashboard/partner-home">
            <span className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors">
              Full Dashboard <ChevronRight size={12} />
            </span>
          </Link>
        </div>

        <PositionHero status={data} tier={tier} />

        <div className="grid lg:grid-cols-2 gap-6">
          <IncomeCalculator actualRecruits={actualRecruits} />
          <NetworkCascadePreview tier={tier} />
        </div>

        <ActionCards referralLink={referralLink} tier={tier} referralCode={data.referralCode} />

        <ReferralLinkCard referralLink={referralLink} referralCode={data.referralCode} />

        {!status && (
          <div
            className="rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <Zap size={14} style={{ color: "#f59e0b" }} />
            <p className="text-xs" style={{ color: "#f59e0b" }}>
              Showing demo data. Sign in or complete your application to see live figures.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
