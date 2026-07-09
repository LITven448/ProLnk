import React from 'react';
import type React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Copy, Check, Award, Users, TrendingUp, DollarSign,
  Share2, ChevronRight, Loader2, Trophy, Zap, Star,
  ArrowUpRight, Crown, BarChart3, Gift, X, Rocket,
  Briefcase, Camera, UserPlus, Network, Clock, CheckSquare, Square,
  Bell, Info, Lightbulb, CheckCheck, ArrowRight, Map, BookOpen,
  AlertTriangle, CloudLightning, Target,
} from "lucide-react";
import OnboardingTour from "@/components/OnboardingTour";

const ONBOARDING_STORAGE_KEY = "prolnk_onboarding_v2";
const TOTAL_SETUP_STEPS = 7;

function loadSetupProgress(): number {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY);
    const parsed: string[] = raw ? JSON.parse(raw) : [];
    const set = new Set(parsed);
    set.add("spot");
    return set.size;
  } catch {
    return 1;
  }
}

function isNewUser(): boolean {
  try {
    const raw = localStorage.getItem("prolnk_joined_at");
    if (!raw) return true;
    const joined = new Date(raw).getTime();
    return Date.now() - joined < 30 * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function OnboardingBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [completedCount, setCompletedCount] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("prolnk_setup_banner_dismissed") === "true") {
      setDismissed(true);
      return;
    }
    setCompletedCount(loadSetupProgress());
  }, []);

  if (dismissed) return null;
  if (!isNewUser()) return null;
  if (completedCount >= TOTAL_SETUP_STEPS) return null;

  const progressPct = Math.round((completedCount / TOTAL_SETUP_STEPS) * 100);

  const handleDismiss = () => {
    localStorage.setItem("prolnk_setup_banner_dismissed", "true");
    setDismissed(true);
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "linear-gradient(135deg, rgba(245,230,66,0.1), rgba(10,22,40,0))",
        border: "1px solid rgba(245,230,66,0.28)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(245,230,66,0.15)" }}
        >
          <Rocket size={20} style={{ color: "#F5E642" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-bold text-white">
              Quick Setup — {completedCount} of {TOTAL_SETUP_STEPS} steps complete
            </p>
            <button
              onClick={handleDismiss}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 flex-shrink-0"
              aria-label="Dismiss"
            >
              <X size={13} className="text-gray-500" />
            </button>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #F5E642, #d4af00)" }}
            />
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Verify your license, set up payouts, complete your profile, and share your referral link to unlock full earnings.
          </p>
          <Link href="/dashboard/onboarding">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
              style={{ background: "#F5E642", color: "#0A1628" }}
            >
              Complete Setup <ChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TIER_CONFIG: Record<string, {
  label: string; color: string; bg: string; border: string;
  accentText: string; nextTier: string | null; nextThreshold: number;
}> = {
  charter: {
    label: "Charter Member",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    accentText: "text-green-400",
    nextTier: null,
    nextThreshold: 0,
  },
  founding: {
    label: "Founding Member",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    accentText: "text-blue-400",
    nextTier: "Charter",
    nextThreshold: 25,
  },
  level3: {
    label: "Level 3 Partner",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.35)",
    accentText: "text-amber-400",
    nextTier: "Founding",
    nextThreshold: 125,
  },
  level4: {
    label: "Level 4 Partner",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.35)",
    accentText: "text-purple-400",
    nextTier: "Level 3",
    nextThreshold: 525,
  },
  waitlist: {
    label: "Waitlist",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.12)",
    border: "rgba(107,114,128,0.25)",
    accentText: "text-gray-400",
    nextTier: "Level 4",
    nextThreshold: 2125,
  },
};

// Founding network rates (all tiers identical per spec)
const FOUNDING_RATES = {
  jobCommissionKeepRate: 0.72,
  networkJob:  { l1: 0.07, l2: 0.04, l3: 0.02, l4: 0.01 },
  networkSubs: { l1: 0.12, l2: 0.06, l3: 0.03, l4: 0.015 },
  subscriptionRate: 149,
};

// Override depth per tier
const OVERRIDE_LEVELS: Record<string, number> = {
  charter: 4,
  founding: 4,
  level3: 4,
  level4: 4,
  waitlist: 0,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shrink-0"
      style={{
        background: copied ? "rgba(245,230,66,0.15)" : "rgba(245,230,66,0.1)",
        color: copied ? "#F5E642" : "#F5E642",
        border: `1px solid ${copied ? "rgba(245,230,66,0.5)" : "rgba(245,230,66,0.25)"}`,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function MetricCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string; value: string | number; sub: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <Icon size={15} style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{sub}</p>
    </div>
  );
}

function EarningsCalculator({ tier }: { tier: string }) {
  const [extraReferrals, setExtraReferrals] = useState(5);
  const isFoundingNetwork = tier !== "waitlist";

  const monthlyEarnings = useMemo(() => {
    if (!isFoundingNetwork) return null;
    const avgJobValue = 800;
    const jobsPerMonthPerPro = 8;
    const platformFeeRate = 0.12;

    const l1Network = extraReferrals;
    const l2Network = l1Network * 3;
    const l3Network = l2Network * 2;
    const l4Network = l3Network * 2;

    const platformFeePerJob = avgJobValue * platformFeeRate;
    const l1JobOverride = l1Network * jobsPerMonthPerPro * platformFeePerJob * FOUNDING_RATES.networkJob.l1;
    const l2JobOverride = l2Network * jobsPerMonthPerPro * platformFeePerJob * FOUNDING_RATES.networkJob.l2;
    const l3JobOverride = l3Network * jobsPerMonthPerPro * platformFeePerJob * FOUNDING_RATES.networkJob.l3;
    const l4JobOverride = l4Network * jobsPerMonthPerPro * platformFeePerJob * FOUNDING_RATES.networkJob.l4;
    const jobOverrides = l1JobOverride + l2JobOverride + l3JobOverride + l4JobOverride;

    const l1SubOverride = l1Network * FOUNDING_RATES.subscriptionRate * FOUNDING_RATES.networkSubs.l1;
    const l2SubOverride = l2Network * FOUNDING_RATES.subscriptionRate * FOUNDING_RATES.networkSubs.l2;
    const l3SubOverride = l3Network * FOUNDING_RATES.subscriptionRate * FOUNDING_RATES.networkSubs.l3;
    const l4SubOverride = l4Network * FOUNDING_RATES.subscriptionRate * FOUNDING_RATES.networkSubs.l4;
    const subOverrides = l1SubOverride + l2SubOverride + l3SubOverride + l4SubOverride;

    return {
      jobOverrides: Math.round(jobOverrides),
      subOverrides: Math.round(subOverrides),
      total: Math.round(jobOverrides + subOverrides),
      network: { l1: l1Network, l2: l2Network, l3: l3Network, l4: l4Network },
    };
  }, [extraReferrals, isFoundingNetwork]);

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
          <BarChart3 size={18} style={{ color: "#F5E642" }} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">Earnings Calculator</h3>
          <p className="text-xs text-gray-400">Projected monthly from your network</p>
        </div>
      </div>

      {!isFoundingNetwork ? (
        <div className="text-center py-6">
          <p className="text-gray-400 text-sm mb-3">Join the founding network to unlock override earnings.</p>
          <Link href="/join">
            <span className="text-sm font-semibold" style={{ color: "#F5E642" }}>
              Get your founding spot →
            </span>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-400">Direct referrals you recruit</label>
              <span className="text-sm font-bold text-white">{extraReferrals} pros</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={extraReferrals}
              onChange={(e) => setExtraReferrals(Number(e.target.value))}
              className="w-full max-w-full accent-yellow-400"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          {monthlyEarnings && (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div>
                    <p className="text-xs text-gray-400">Job overrides ({FOUNDING_RATES.networkJob.l1 * 100}% of platform fee/job)</p>
                    <p className="text-[10px] text-gray-600">
                      {monthlyEarnings.network.l1}L1 + {monthlyEarnings.network.l2}L2 + {monthlyEarnings.network.l3}L3 + {monthlyEarnings.network.l4}L4 pros
                    </p>
                  </div>
                  <span className="text-sm font-bold text-white">${monthlyEarnings.jobOverrides.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div>
                    <p className="text-xs text-gray-400">Subscription overrides ({FOUNDING_RATES.networkSubs.l1 * 100}% of $149/mo)</p>
                    <p className="text-[10px] text-gray-600">Recurring monthly from network subscriptions</p>
                  </div>
                  <span className="text-sm font-bold text-white">${monthlyEarnings.subOverrides.toLocaleString()}</span>
                </div>
              </div>

              <div
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ background: "rgba(245,230,66,0.1)", border: "1px solid rgba(245,230,66,0.25)" }}
              >
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#F5E642" }}>Projected Monthly</p>
                  <p className="text-[10px] text-gray-500">Based on avg $800 job, 8 jobs/mo/pro</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: "#F5E642" }}>
                  ${monthlyEarnings.total.toLocaleString()}
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function TrialBanner({ joinedAt }: { joinedAt?: string | null }) {
  const trialDays = 90;
  const daysElapsed = joinedAt
    ? Math.floor((Date.now() - new Date(joinedAt).getTime()) / 86400000)
    : 0;
  const daysLeft = Math.max(0, trialDays - daysElapsed);

  return (
    <div
      className="rounded-2xl px-5 py-4 flex items-center gap-4"
      style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.05))",
        border: "1px solid rgba(59,130,246,0.3)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(59,130,246,0.15)" }}
      >
        <Clock size={18} style={{ color: "#3b82f6" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">
          Your 90-day free trial — {daysLeft} days remaining
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          No credit card required until your trial ends. You won't be charged automatically.
        </p>
      </div>
      <div
        className="flex-shrink-0 text-right"
        style={{ minWidth: 48 }}
      >
        <p className="text-2xl font-bold" style={{ color: "#3b82f6" }}>{daysLeft}</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">days left</p>
      </div>
    </div>
  );
}

function EarningsSummaryCard() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
            <DollarSign size={18} style={{ color: "#22c55e" }} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Your Earnings This Month</h3>
            <p className="text-xs text-gray-400">May 2026 — trial period</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
          Getting Started
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {[
          { label: "Jobs Completed", value: "$0", sub: "Log your first job →" },
          { label: "Commissions Earned", value: "$0", sub: "Earned per job logged" },
          { label: "Network Earnings", value: "$0", sub: "From your downline" },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            className="rounded-xl p-4 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</p>
            <p className="text-[10px] text-gray-600">{sub}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center">
        Earnings activate once the platform launches. Log jobs now to build your history.
      </p>
    </div>
  );
}

function QuickActionCards() {
  const actions = [
    { label: "Log a Job", description: "Record completed work", icon: Briefcase, href: "/job-log", color: "#F5E642", bg: "rgba(245,230,66,0.12)", border: "rgba(245,230,66,0.3)" },
    { label: "Upload Photo", description: "Add job photos", icon: Camera, href: "/photo-upload", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
    { label: "Invite a Pro", description: "Earn override income", icon: UserPlus, href: "/dashboard/referral", color: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
    { label: "View Network", description: "See your downline", icon: Network, href: "/network-tree", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map(({ label, description, icon: Icon, href, color, bg, border }) => (
        <Link key={label} href={href}>
          <div
            className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all hover:scale-[1.02]"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{description}</p>
            </div>
            <ChevronRight size={14} style={{ color }} className="self-end" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function GettingStartedChecklist() {
  const STORAGE_KEY = "prolnk_checklist_v1";

  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const items = [
    { key: "profile", label: "Complete your profile", href: "/partner-onboarding" },
    { key: "job", label: "Log your first job", href: "/job-log" },
    { key: "invite", label: "Invite 5 pros", href: "/dashboard/referral" },
    { key: "home", label: "Document your first home", href: "/home-health" },
  ];

  const completedCount = items.filter((i) => checked.has(i.key)).length;

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
            <CheckSquare size={18} style={{ color: "#F5E642" }} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Getting Started</h3>
            <p className="text-xs text-gray-400">{completedCount} of {items.length} complete</p>
          </div>
        </div>
        <div className="flex gap-1">
          {items.map((item) => (
            <div
              key={item.key}
              className="w-2 h-2 rounded-full"
              style={{ background: checked.has(item.key) ? "#22c55e" : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / items.length) * 100}%`, background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
        />
      </div>

      <div className="space-y-2">
        {items.map(({ key, label, href }) => {
          const done = checked.has(key);
          return (
            <div
              key={key}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{ background: done ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.03)" }}
            >
              <button onClick={() => toggle(key)} className="flex-shrink-0 transition-all">
                {done
                  ? <CheckSquare size={18} style={{ color: "#22c55e" }} />
                  : <Square size={18} className="text-gray-500" />}
              </button>
              <p className={`flex-1 text-sm font-medium ${done ? "line-through text-gray-500" : "text-white"}`}>
                {label}
              </p>
              {!done && (
                <Link href={href}>
                  <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#F5E642" }}>
                    Go <ChevronRight size={11} />
                  </span>
                </Link>
              )}
              {done && <Check size={14} style={{ color: "#22c55e" }} className="flex-shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Feature Spotlight ────────────────────────────────────────────────────────

type SpotlightTip = {
  title: string;
  body: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  href: string;
  cta: string;
};

const SPOTLIGHT_TIPS: SpotlightTip[] = [
  {
    title: "Did you know? Referrals compound 4 levels deep",
    body: "When your L1 referral recruits someone, you earn 4% on that person's jobs — and it cascades further. 10 direct referrals can easily become 120+ pros in your network.",
    icon: Network,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    href: "/dashboard/referral",
    cta: "Grow your network",
  },
  {
    title: "Did you know? Job logs boost your match score",
    body: "Every job you log improves your algorithm ranking for lead matching. Pros with 20+ logged jobs receive 3x more lead opportunities at launch.",
    icon: Briefcase,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    href: "/job-log",
    cta: "Log a job now",
  },
  {
    title: "Did you know? Your $149/mo is locked in forever",
    body: "Standard post-founding pricing will be $299/mo. Your founding subscription rate is protected for life — no price increases, ever.",
    icon: DollarSign,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
    href: "/founding-partner",
    cta: "See founding benefits",
  },
  {
    title: "Did you know? Photo uploads add credibility points",
    body: "Partners who upload before/after job photos rank higher in the homeowner-facing directory and receive preferential lead routing.",
    icon: Camera,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
    href: "/photo-upload",
    cta: "Upload photos",
  },
  {
    title: "Did you know? The Exchange lets pros trade work",
    body: "The ProLnk Exchange is a peer-to-peer marketplace where pros can post jobs they need help with or pick up extra work in their trade area.",
    icon: Map,
    color: "#F5E642",
    bg: "rgba(245,230,66,0.1)",
    href: "/exchange/home",
    cta: "Explore the Exchange",
  },
  {
    title: "Did you know? Training Academy boosts your score",
    body: "Complete courses in the Training Academy to earn certifications that increase your trust score with homeowners and improve algorithm ranking.",
    icon: BookOpen,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    href: "/dashboard/academy",
    cta: "Start learning",
  },
];

function getSpotlightIndex(): number {
  try {
    const stored = localStorage.getItem("prolnk_spotlight_idx");
    const base = stored ? parseInt(stored, 10) : 0;
    const today = Math.floor(Date.now() / 86400000);
    const idx = (base + today) % SPOTLIGHT_TIPS.length;
    return idx;
  } catch {
    return 0;
  }
}

function FeatureSpotlight() {
  const [idx, setIdx] = useState<number>(() => getSpotlightIndex());
  const tip = SPOTLIGHT_TIPS[idx];
  const { icon: Icon, title, body, color, bg, href, cta } = tip;

  const rotate = () => {
    setIdx((prev) => {
      const next = (prev + 1) % SPOTLIGHT_TIPS.length;
      try { localStorage.setItem("prolnk_spotlight_idx", String(next)); } catch {}
      return next;
    });
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: bg, border: `1px solid ${color}33` }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
              Feature Spotlight
            </p>
            <button
              onClick={rotate}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              Next tip <ArrowRight size={10} />
            </button>
          </div>
          <p className="text-sm font-bold text-white mb-1.5">{title}</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">{body}</p>
          <Link href={href}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all hover:opacity-80"
              style={{ color }}
            >
              {cta} <ChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-5 justify-center">
        {SPOTLIGHT_TIPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all"
            style={{
              width: i === idx ? 16 : 6,
              height: 6,
              background: i === idx ? color : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Notification type helpers ───────────────────────────────────────────────

type NotifRecord = {
  id: number;
  type: string;
  title: string;
  message: string;
  createdAt: string | Date | null;
  isRead: boolean;
  actionUrl?: string | null;
};

const NOTIF_TYPE_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  new_lead:        { icon: <Zap size={14} />,      color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  lead_expired:    { icon: <Info size={14} />,      color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
  commission_paid: { icon: <DollarSign size={14} />, color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  commission:      { icon: <DollarSign size={14} />, color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  network:         { icon: <Network size={14} />,   color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  tips:            { icon: <Lightbulb size={14} />, color: "#f59e0b", bg: "rgba(245,158,11,0.15)" },
  system:          { icon: <Info size={14} />,      color: "#9ca3af", bg: "rgba(156,163,175,0.15)" },
};
function getNotifMeta(type: string) { return NOTIF_TYPE_META[type] ?? NOTIF_TYPE_META.system; }

function NotificationPopover() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const utils = trpc.useUtils();

  const { data: unreadData } = trpc.notifications.getUnreadCount.useQuery(undefined, {
    refetchInterval: 60_000,
  });
  const { data: rawNotifs = [] } = trpc.notifications.getMyNotifications.useQuery(
    { limit: 5 },
    { enabled: open }
  );
  const notifications = rawNotifs as NotifRecord[];
  const unreadCount = unreadData?.count ?? 0;

  const markAllRead = trpc.notifications.markAllRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnreadCount.invalidate();
      utils.notifications.getMyNotifications.invalidate();
    },
  });
  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess: () => {
      utils.notifications.getUnreadCount.invalidate();
      utils.notifications.getMyNotifications.invalidate();
    },
  });

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        style={{ background: open ? "rgba(245,230,66,0.15)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        aria-label="Notifications"
      >
        <Bell size={17} style={{ color: open ? "#F5E642" : "#9ca3af" }} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none"
            style={{ background: "#ef4444" }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden"
          style={{ background: "#0f1e35", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2">
              <Bell size={14} style={{ color: "#F5E642" }} />
              <span className="text-sm font-semibold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#ef4444", color: "#fff" }}>
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllRead.mutate()}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <CheckCheck size={12} /> All read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={28} className="mx-auto mb-2 opacity-20 text-white" />
                <p className="text-sm text-gray-500">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => {
                const meta = getNotifMeta(n.type);
                const isUnread = !n.isRead;
                return (
                  <div
                    key={n.id}
                    className="group relative flex gap-3 px-4 py-3 transition-colors hover:bg-white/5"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      background: isUnread ? "rgba(245,158,11,0.04)" : "transparent",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: meta.bg, color: meta.color }}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0 pr-7">
                      <p className={`text-sm font-medium truncate ${isUnread ? "text-white" : "text-gray-400"}`}>
                        {n.title}
                        {isUnread && (
                          <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-amber-400 align-middle" />
                        )}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{n.message}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-gray-600 flex items-center gap-0.5">
                          <Clock size={10} /> {(() => {
                            if (!n.createdAt) return "";
                            const diff = Math.floor((Date.now() - new Date(n.createdAt).getTime()) / 1000);
                            if (diff < 60) return "just now";
                            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                            return `${Math.floor(diff / 86400)}d ago`;
                          })()}
                        </span>
                        {n.actionUrl && (
                          <Link href={n.actionUrl}>
                            <span
                              className="text-[10px] font-semibold flex items-center gap-0.5 hover:opacity-80"
                              style={{ color: meta.color }}
                              onClick={() => setOpen(false)}
                            >
                              View <ArrowRight size={10} />
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                    {isUnread && (
                      <button
                        onClick={(e) => { e.stopPropagation(); markRead.mutate({ ids: [n.id] }); }}
                        title="Mark as read"
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-white/10"
                      >
                        <Check size={12} style={{ color: "#f59e0b" }} />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Link href="/dashboard/notifications">
              <span
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: "#F5E642" }}
                onClick={() => setOpen(false)}
              >
                View all <ArrowRight size={11} />
              </span>
            </Link>
            <Link href="/dashboard/inbox">
              <span className="text-xs text-gray-500 hover:text-gray-300 transition-colors" onClick={() => setOpen(false)}>
                Inbox
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Storm Opportunity Alert ──────────────────────────────────────────────────

function StormOpportunityAlert() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(234,88,12,0.08))",
        border: "1px solid rgba(220,38,38,0.35)",
        animation: "stormPulse 2.5s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes stormPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,38,38,0); }
          50% { box-shadow: 0 0 0 4px rgba(220,38,38,0.18); }
        }
      `}</style>

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
      >
        <X size={13} className="text-gray-400" />
      </button>

      <div className="flex items-start gap-4 pr-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(220,38,38,0.2)" }}
        >
          <CloudLightning size={20} style={{ color: "#ef4444" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: "rgba(220,38,38,0.2)", color: "#ef4444", border: "1px solid rgba(220,38,38,0.3)" }}
            >
              Storm Alert
            </span>
            <span className="text-[10px] text-gray-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              Active now
            </span>
          </div>
          <p className="text-sm font-bold text-white mb-0.5">
            Hail alert for Frisco / Allen ZIP 75034 — 3 active leads available NOW
          </p>
          <p className="text-xs text-gray-400 mb-3">
            Quarter-sized hail reported. Roofing, siding, and gutter jobs are surging in your service area.
            Homeowners are requesting estimates right now.
          </p>
          <Link href="/leads">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              <AlertTriangle size={12} />
              View Active Leads <ChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── This Week's Goal Progress ────────────────────────────────────────────────

function WeeklyGoalProgress() {
  const goals = [
    { label: "Jobs", current: 2, target: 5, color: "#14b8a6" },
    { label: "Earnings", current: 780, target: 1500, color: "#14b8a6", prefix: "$", format: (v: number) => `$${v.toLocaleString()}` },
    { label: "Referrals", current: 1, target: 3, color: "#14b8a6" },
  ];

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(20,184,166,0.12)" }}
          >
            <Target size={16} style={{ color: "#14b8a6" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">This Week's Goals</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Resets every Monday</p>
          </div>
        </div>
        <Link href="/job-log">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-0.5 hover:text-teal-400 transition-colors">
            Details <ChevronRight size={11} />
          </span>
        </Link>
      </div>

      <div className="space-y-3">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.target) * 100));
          const display = g.format ? g.format(g.current) : g.current;
          const targetDisplay = g.format ? g.format(g.target) : g.target;
          return (
            <div key={g.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">{g.label}</span>
                <span className="text-xs font-semibold text-white">
                  {display}
                  <span className="text-gray-600"> / {targetDisplay}</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${g.color}, ${g.color}99)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PartnerHome() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";

  const { data: status, isLoading: statusLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  const { data: leaderboard, isLoading: lbLoading } = trpc.proWaitlist.getLeaderboard.useQuery();

  if (statusLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: "#0A1628" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#F5E642" }} />
          <p className="text-sm text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
        style={{ background: "#0A1628" }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(245,230,66,0.1)" }}>
          <Zap size={28} style={{ color: "#F5E642" }} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Not on the waitlist yet</h2>
        <p className="text-gray-400 mb-6 max-w-sm text-sm">
          Reserve your founding partner spot to unlock this dashboard and start building your network.
        </p>
        <Link href="/join">
          <span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all"
            style={{ background: "#F5E642", color: "#0A1628" }}
          >
            Claim Your Spot <ChevronRight size={16} />
          </span>
        </Link>
      </div>
    );
  }

  const tier = status.tier ?? "waitlist";
  const tierCfg = TIER_CONFIG[tier] ?? TIER_CONFIG.waitlist;
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.xyz"}/join?ref=${status.referralCode}`;
  const overrideLevels = OVERRIDE_LEVELS[tier] ?? 0;
  const isFoundingNetwork = tier !== "waitlist";

  const tierProgressPct = useMemo(() => {
    if (!tierCfg.nextTier || !tierCfg.nextThreshold) return 100;
    const pos = status.position ?? 0;
    return Math.min(100, Math.round((pos / tierCfg.nextThreshold) * 100));
  }, [status.position, tierCfg]);

  const spotsToNext = tierCfg.nextThreshold ? Math.max(0, tierCfg.nextThreshold - (status.position ?? 0)) : 0;

  const leaderRows = Array.isArray(leaderboard) ? leaderboard : [];

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <OnboardingTour />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* ── Onboarding Banner ──────────────────────────────────────────── */}
        <OnboardingBanner />

        {/* ── Trial Status Banner ─────────────────────────────────────────── */}
        {isFoundingNetwork && <TrialBanner joinedAt={(status as any).createdAt} />}

        {/* ── Storm Opportunity Alert ──────────────────────────────────────── */}
        <StormOpportunityAlert />

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {status.firstName}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {status.trade || "Home Service Professional"} · {status.city}, {status.state}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
              style={{ background: tierCfg.bg, color: tierCfg.color, border: `1px solid ${tierCfg.border}` }}
            >
              <Crown size={14} />
              {tierCfg.label}
            </span>
            {isFoundingNetwork && (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active
              </span>
            )}
            <NotificationPopover />
          </div>
        </div>

        {/* ── Key Metrics ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Waitlist Position"
            value={`#${status.position ?? "–"}`}
            sub="Lower = earlier access"
            icon={Trophy}
            color="#F5E642"
          />
          <MetricCard
            label="Referrals"
            value={status.referrals?.length ?? 0}
            sub="Pros you've referred"
            icon={Users}
            color="#3b82f6"
          />
          <MetricCard
            label="Override Levels"
            value={overrideLevels}
            sub={overrideLevels > 0 ? `${overrideLevels}-deep earnings cascade` : "Join founding network"}
            icon={TrendingUp}
            color={tierCfg.color}
          />
          <MetricCard
            label="Subscription Rate"
            value={isFoundingNetwork ? "$149/mo" : "TBD"}
            sub={isFoundingNetwork ? "Locked-in founding price" : "Standard pricing"}
            icon={DollarSign}
            color="#22c55e"
          />
        </div>

        {/* ── Weekly Goal Progress ────────────────────────────────────────── */}
        <WeeklyGoalProgress />

        {/* ── Earnings Summary ────────────────────────────────────────────── */}
        <EarningsSummaryCard />

        {/* ── Quick Actions ───────────────────────────────────────────────── */}
        <QuickActionCards />

        {/* ── Referral Link Card ──────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
              <Share2 size={18} style={{ color: "#F5E642" }} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Your Referral Link</h3>
              <p className="text-xs text-gray-400">Share to recruit pros and earn network overrides</p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-4 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="flex-1 text-sm text-gray-300 truncate font-mono min-w-0">{referralLink}</p>
            <CopyButton text={referralLink} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { label: "Referral Code", value: status.referralCode },
              { label: "L1 Job Override", value: `${FOUNDING_RATES.networkJob.l1 * 100}%` },
              { label: "L1 Sub Override", value: `${FOUNDING_RATES.networkSubs.l1 * 100}%` },
              { label: "Override Depth", value: overrideLevels > 0 ? `${overrideLevels} levels` : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.04)" }}>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=Just+joined+the+ProLnk+founding+network+%E2%80%94+real+recurring+income+for+home+service+pros.+Grab+your+spot%3A+${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{ background: "rgba(29,161,242,0.12)", color: "#1da1f2", border: "1px solid rgba(29,161,242,0.25)" }}
            >
              Share on X <ArrowUpRight size={12} />
            </a>
            <a
              href={`sms:?body=I+just+joined+ProLnk%E2%80%99s+founding+network.+Get+your+spot+here%3A+${encodeURIComponent(referralLink)}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              Share via SMS <Share2 size={12} />
            </a>
          </div>
        </div>

        {/* ── Earnings Calculator + My Referrals ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">
          <EarningsCalculator tier={tier} />

          {/* My Referrals */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
                <Users size={18} style={{ color: "#3b82f6" }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">My Referrals</h3>
                <p className="text-xs text-gray-400">Pros you've brought into your network</p>
              </div>
            </div>

            <div className="mb-4">
              <Link href="/network-tree">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: "rgba(245,230,66,0.1)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.25)" }}
                >
                  <Users size={13} />
                  View Network Tree
                  <ChevronRight size={12} />
                </span>
              </Link>
            </div>

            {(!status.referrals || status.referrals.length === 0) ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Gift size={22} className="text-gray-600" />
                </div>
                <p className="text-sm text-gray-400 mb-1">No referrals yet</p>
                <p className="text-xs text-gray-600 max-w-xs">
                  Share your link above. Every pro you recruit earns you a 7% override on their job commissions — forever.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {status.referrals.map((ref: { firstName: string; trade: string; joinedAt?: string }, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>
                        {ref.firstName?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{ref.firstName}</p>
                        <p className="text-xs text-gray-500">{ref.trade}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-400 font-medium">+7% override</span>
                  </div>
                ))}
                {status.referrals.length >= 5 && (
                  <p className="text-xs text-center text-gray-600 pt-1">Showing top 5</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Tier Progress + Leaderboard ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Tier Progress */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${tierCfg.bg}` }}>
                <Award size={18} style={{ color: tierCfg.color }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Tier Progress</h3>
                <p className="text-xs text-gray-400">Your founding network status</p>
              </div>
            </div>

            <div
              className="rounded-xl px-4 py-3 mb-5 flex items-center justify-between"
              style={{ background: tierCfg.bg, border: `1px solid ${tierCfg.border}` }}
            >
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Current tier</p>
                <p className="text-lg font-bold" style={{ color: tierCfg.color }}>{tierCfg.label}</p>
              </div>
              <Crown size={28} style={{ color: tierCfg.color, opacity: 0.5 }} />
            </div>

            {tierCfg.nextTier ? (
              <>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{tierCfg.label}</span>
                  <span>{tierCfg.nextTier} (pos #{tierCfg.nextThreshold})</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden mb-3" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${tierProgressPct}%`, background: `linear-gradient(90deg, ${tierCfg.color}, ${tierCfg.color}88)` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  You are position <span className="text-white font-semibold">#{status.position}</span>.{" "}
                  {spotsToNext > 0
                    ? `Move up ${spotsToNext} positions to reach ${tierCfg.nextTier}.`
                    : `You have reached ${tierCfg.nextTier} threshold.`}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Share your link — each referral moves you up the list faster.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <Star size={24} style={{ color: tierCfg.color }} className="mx-auto mb-2" />
                <p className="text-sm font-bold" style={{ color: tierCfg.color }}>
                  You are at the Charter tier — the highest founding network rank.
                </p>
                <p className="text-xs text-gray-500 mt-1">Maximum override depth (4 levels). Subscription locked at $149/mo.</p>
              </div>
            )}

            <div className="mt-5 space-y-2">
              {[
                { label: "Charter", threshold: 25, emoji: "👑" },
                { label: "Founding", threshold: 125, emoji: "⭐" },
                { label: "Level 3", threshold: 525, emoji: "🔷" },
                { label: "Level 4", threshold: 2125, emoji: "🟣" },
              ].map(({ label, threshold, emoji }) => {
                const pos = status.position ?? 99999;
                const achieved = pos <= threshold;
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg"
                    style={{ background: achieved ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.03)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{emoji}</span>
                      <span className="text-xs font-medium" style={{ color: achieved ? "#22c55e" : "#6b7280" }}>
                        {label}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: achieved ? "#22c55e" : "#4b5563" }}>
                      {achieved ? "Achieved" : `Top ${threshold} spots`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div
            className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,230,66,0.12)" }}>
                  <Trophy size={18} style={{ color: "#F5E642" }} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Network Leaderboard</h3>
                  <p className="text-xs text-gray-400">Top referrers in the ProLnk network</p>
                </div>
              </div>
              <Link href="/leaderboard">
                <span className="text-xs font-semibold flex items-center gap-1" style={{ color: "#F5E642" }}>
                  Full list <ChevronRight size={12} />
                </span>
              </Link>
            </div>

            {lbLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
              </div>
            ) : leaderRows.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No referrals tracked yet.</p>
                <p className="text-xs text-gray-600 mt-1">Be the first — share your link now.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderRows.slice(0, 10).map((leader: any, i: number) => {
                  const isMe = leader.name?.startsWith(status.firstName ?? "___NOMATCH___");
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                      style={{
                        background: isMe ? "rgba(245,230,66,0.08)" : "rgba(255,255,255,0.03)",
                        border: isMe ? "1px solid rgba(245,230,66,0.2)" : "1px solid transparent",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{
                          background: i === 0 ? "rgba(245,230,66,0.2)" : i === 1 ? "rgba(192,192,192,0.15)" : i === 2 ? "rgba(205,127,50,0.15)" : "rgba(255,255,255,0.06)",
                          color: i === 0 ? "#F5E642" : i === 1 ? "#d1d5db" : i === 2 ? "#cd7f32" : "#6b7280",
                        }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {leader.name}
                          {isMe && <span className="ml-1 text-xs font-normal" style={{ color: "#F5E642" }}>(you)</span>}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {leader.trade} · {leader.city}, {leader.state}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-white">{leader.referralCount}</p>
                        <p className="text-[10px] text-gray-600">referrals</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Feature Spotlight ───────────────────────────────────────────── */}
        <FeatureSpotlight />

        {/* ── Getting Started Checklist ───────────────────────────────────── */}
        <GettingStartedChecklist />

        {/* ── Waitlist CTA (if not in founding network) ──────────────────── */}
        {!isFoundingNetwork && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "linear-gradient(135deg, rgba(245,230,66,0.08), rgba(10,22,40,0))", border: "1px solid rgba(245,230,66,0.2)" }}
          >
            <Zap size={28} style={{ color: "#F5E642" }} className="mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Upgrade to the Founding Network</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-md mx-auto">
              Lock in $149/mo, earn 4-level overrides on every pro in your network, and secure your position before the 2,125 founding spots fill up.
            </p>
            <Link href="/join">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
                style={{ background: "#F5E642", color: "#0A1628" }}
              >
                Claim Founding Spot <ChevronRight size={16} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
