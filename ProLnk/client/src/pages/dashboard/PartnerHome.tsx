import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Copy, Check, Award, Users, TrendingUp, DollarSign,
  Share2, ChevronRight, Loader2, Trophy, Zap, Star,
  ArrowUpRight, Crown, BarChart3, Gift, X, Rocket,
  Briefcase, Camera, UserPlus, Network, Clock, CheckSquare, Square
} from "lucide-react";

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
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : "https://prolnk.io"}/join?ref=${status.referralCode}`;
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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* ── Onboarding Banner ──────────────────────────────────────────── */}
        <OnboardingBanner />

        {/* ── Trial Status Banner ─────────────────────────────────────────── */}
        {isFoundingNetwork && <TrialBanner joinedAt={(status as any).createdAt} />}

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {status.firstName}
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {status.businessType || "Home Service Professional"} · {status.primaryCity}, {status.primaryState}
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
                {status.referrals.map((ref: { firstName: string; businessType: string; joinedAt?: string }, i: number) => (
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
                        <p className="text-xs text-gray-500">{ref.businessType}</p>
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
