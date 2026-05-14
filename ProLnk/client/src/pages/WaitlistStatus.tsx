import { useState } from "react";
import { trpc } from "../lib/trpc";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users, TrendingUp, DollarSign, ChevronRight, Star, Award, Zap, ArrowRight, Twitter, Linkedin, MessageCircle, Facebook, Phone, Search, Mail, Hash, Bell, BellOff, AlertCircle } from "lucide-react";
import { Link } from "wouter";

const TIER_CONFIG = {
  Charter: {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.15)",
    border: "rgba(34,197,94,0.4)",
    badge: "bg-green-500/20 text-green-400 border border-green-500/30",
    commission: 2.0,
    levels: 4,
    maxPosition: 100,
  },
  Founding: {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.15)",
    border: "rgba(59,130,246,0.4)",
    badge: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    commission: 1.5,
    levels: 3,
    maxPosition: 500,
  },
  Growth: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.4)",
    badge: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    commission: 1.0,
    levels: 2,
    maxPosition: 1000,
  },
  Standard: {
    color: "#6b7280",
    bg: "rgba(107,114,128,0.15)",
    border: "rgba(107,114,128,0.4)",
    badge: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    commission: 0.5,
    levels: 0,
    maxPosition: 99999,
  },
};

const OVERRIDE_RATES = [1.0, 0.8, 0.6, 0.4];

function TierBadge({ tier }: { tier: string }) {
  const cfg = TIER_CONFIG[tier as keyof typeof TIER_CONFIG];
  if (!cfg) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${cfg.badge}`}>
      <Award size={14} />
      {tier} Partner
    </span>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
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
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{ background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)", color: copied ? "#22c55e" : "#d1d5db", border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}` }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

const FOUNDING_TIERS = [
  { name: "Charter Tier",  cap: 25,   color: "#f59e0b", barColor: "linear-gradient(90deg, #f59e0b, #d97706)" },
  { name: "Founding Tier", cap: 100,  color: "#6366f1", barColor: "linear-gradient(90deg, #6366f1, #4f46e5)" },
  { name: "Level 3",       cap: 400,  color: "#6b7280", barColor: "linear-gradient(90deg, #6b7280, #4b5563)" },
  { name: "Level 4",       cap: 1600, color: "#6b7280", barColor: "linear-gradient(90deg, #6b7280, #4b5563)" },
];

const TOTAL_CAP = 500;
const HOMES_CAP = 5000;

function FoundingTierBars({ prosCount }: { prosCount: number }) {
  let remaining = prosCount;
  const filled = FOUNDING_TIERS.map((t) => {
    const thisTierFilled = Math.min(remaining, t.cap);
    remaining = Math.max(0, remaining - t.cap);
    return thisTierFilled;
  });

  return (
    <div className="space-y-3">
      {FOUNDING_TIERS.map((tier, i) => {
        const tierFilled = filled[i];
        const pct = Math.round((tierFilled / tier.cap) * 100);
        const isActive = i === 0 || filled[i - 1] >= FOUNDING_TIERS[i - 1].cap;
        const isFull = tierFilled >= tier.cap;
        const blocks = 16;
        const filledBlocks = Math.round((pct / 100) * blocks);

        return (
          <div key={tier.name} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold" style={{ color: isActive ? tier.color : "#4b5563" }}>
                {tier.name}
              </span>
              <span style={{ color: isActive ? "#d1d5db" : "#4b5563" }}>
                {tierFilled}/{tier.cap} filled
                {!isActive && " (waiting)"}
                {isFull && " ✓ FULL"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5 flex-1">
                {Array.from({ length: blocks }).map((_, b) => (
                  <div
                    key={b}
                    className="h-2 flex-1 rounded-sm"
                    style={{
                      background: b < filledBlocks
                        ? (isActive ? tier.color : "#4b5563")
                        : "rgba(255,255,255,0.06)",
                    }}
                  />
                ))}
              </div>
              {isActive && (
                <span className="text-xs font-bold w-8 text-right" style={{ color: tier.color }}>
                  {pct}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UrgencyTimer({ prosCount, homesCount }: { prosCount: number; homesCount?: number }) {
  const pct = Math.round((prosCount / TOTAL_CAP) * 100);
  const homesPct = homesCount ? Math.round((homesCount / HOMES_CAP) * 100) : 0;
  let statusColor = "#22c55e";
  let statusText = "Still plenty of spots";
  if (pct >= 70) {
    statusColor = "#ef4444";
    statusText = "⚠️ Almost full";
  } else if (pct >= 40) {
    statusColor = "#f59e0b";
    statusText = "Filling up — don't wait";
  }

  return (
    <div className="p-4 rounded-xl space-y-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Zap size={13} style={{ color: statusColor }} />
            <span className="text-xs font-bold text-white">Partner slots</span>
          </div>
          <span className="text-xs font-bold" style={{ color: statusColor }}>
            {prosCount} / {TOTAL_CAP} — {statusText}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, pct)}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: pct >= 70 ? "linear-gradient(90deg,#fb923c,#ef4444)" : pct >= 40 ? "linear-gradient(90deg,#fbbf24,#fb923c)" : statusColor }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: "#4b5563" }}>Waitlist closes permanently at 500 partners</p>
      </div>

      {homesCount !== undefined && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-white">Homes in vault</span>
            <span className="text-xs font-bold" style={{ color: "#2dd4bf" }}>
              {homesCount.toLocaleString()} / {HOMES_CAP.toLocaleString()}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, homesPct)}%` }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #2dd4bf, #38bdf8)" }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: "#4b5563" }}>Waitlist also closes when 5,000 homes are added</p>
        </div>
      )}
    </div>
  );
}

function TierProgressBar({ position, tier }: { position: number; tier: string }) {
  const chartSize = 100;
  const foundingSize = 500;

  if (position <= chartSize) {
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-green-400 font-medium">Charter Partner</span>
          <span className="text-gray-400">Position #{position} of 100</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (position / chartSize) * 100)}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #22c55e, #16a34a)" }}
          />
        </div>
        <p className="text-xs text-gray-500">You are a Charter Partner. Maximum tier achieved.</p>
      </div>
    );
  }

  if (position <= foundingSize) {
    const progress = ((position - chartSize) / (foundingSize - chartSize)) * 100;
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-blue-400 font-medium">Founding Partner</span>
          <span className="text-gray-400">Position #{position}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #2563eb)" }}
          />
        </div>
        <p className="text-xs text-gray-500">
          Charter Partner spots are full. Refer 5+ pros to unlock Charter benefits.
        </p>
      </div>
    );
  }

  const progress = Math.min(100, ((position - 100) / 900) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-amber-400 font-medium">Growth Pro → Founding Partner</span>
        <span className="text-gray-400">Position #{position}</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${100 - progress}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #f59e0b, #d97706)" }}
        />
      </div>
      <p className="text-xs text-gray-500">
        {position - 500} spots from Founding Partner. Share your link to move up faster.
      </p>
    </div>
  );
}

function NetworkTree({ levels, commissionRate }: { levels: number; commissionRate: number }) {
  if (levels === 0) {
    return (
      <div className="p-4 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="text-gray-500 text-sm">All Founding Network members (Charter/Founding/L3/L4) earn 4 levels of network override override income.</p>
        <Link href="/waitlist-status?upgrade=1" className="text-amber-400 text-xs mt-2 inline-block hover:underline">How to unlock overrides →</Link>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="p-3 rounded-lg flex items-center justify-between" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center text-xs font-bold text-green-400">You</div>
          <div>
            <p className="text-sm text-white font-medium">Your own jobs</p>
            <p className="text-xs text-gray-400">{commissionRate}% of every job you close</p>
          </div>
        </div>
        <span className="text-green-400 font-bold text-sm">{commissionRate}%</span>
      </div>

      {OVERRIDE_RATES.slice(0, levels).map((rate, i) => (
        <div key={i} className="flex items-center gap-2">
          <div style={{ width: `${(i + 1) * 16}px` }} className="flex-shrink-0" />
          <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />
          <div className="flex-1 p-3 rounded-lg flex items-center justify-between" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <p className="text-sm text-white">L{i + 1} — Every pro you{i === 0 ? " directly recruit" : "r recruit's recruit" + (i > 1 ? "s" : "")}</p>
              <p className="text-xs text-gray-500">Forever, on every job they close</p>
            </div>
            <span className="text-amber-400 font-bold text-sm">{rate}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function EarningsCalculator({ commissionRate, overrideLevels }: { commissionRate: number; overrideLevels: number }) {
  const [recruited, setRecruited] = useState(5);
  const avgJobValue = 2500;
  const jobsPerProPerMonth = 8;
  const proCommissionRate = 0.15;

  const directEarnings = recruited * avgJobValue * jobsPerProPerMonth * (commissionRate);
  const l1Override = recruited * avgJobValue * jobsPerProPerMonth * proCommissionRate * (overrideLevels >= 1 ? OVERRIDE_RATES[0] / 100 : 0);
  const l2Override = recruited * 2 * avgJobValue * jobsPerProPerMonth * proCommissionRate * (overrideLevels >= 2 ? OVERRIDE_RATES[1] / 100 : 0);
  const l3Override = recruited * 4 * avgJobValue * jobsPerProPerMonth * proCommissionRate * (overrideLevels >= 3 ? OVERRIDE_RATES[2] / 100 : 0);
  const l4Override = recruited * 8 * avgJobValue * jobsPerProPerMonth * proCommissionRate * (overrideLevels >= 4 ? OVERRIDE_RATES[3] / 100 : 0);
  const total = directEarnings + l1Override + l2Override + l3Override + l4Override;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-300">Pros you recruit</label>
          <span className="text-white font-bold">{recruited}</span>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={recruited}
          onChange={(e) => setRecruited(Number(e.target.value))}
          className="w-full max-w-full accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <p className="text-xs text-gray-400 mb-1">Your own job income</p>
          <p className="text-xl font-bold text-green-400">${Math.round(directEarnings).toLocaleString()}</p>
          <p className="text-xs text-gray-600">/month</p>
        </div>
        <div className="p-3 rounded-xl text-center" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
          <p className="text-xs text-gray-400 mb-1">Network override income</p>
          <p className="text-xl font-bold text-blue-400">${Math.round(l1Override + l2Override + l3Override + l4Override).toLocaleString()}</p>
          <p className="text-xs text-gray-600">/month passive</p>
        </div>
      </div>

      <div className="p-4 rounded-xl text-center" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
        <p className="text-sm text-gray-400">Estimated total monthly income</p>
        <p className="text-3xl font-black text-amber-400 mt-1">${Math.round(total).toLocaleString()}</p>
        <p className="text-xs text-gray-500 mt-1">Based on avg $2,500 job × 8 jobs/mo × {recruited} L1 recruits (cascading to {recruited * 2} L2, {recruited * 4} L3)</p>
      </div>
    </div>
  );
}

function EmailLookup() {
  const [query, setQuery] = useState("");
  const [, navigate] = useState<string | null>(null);
  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery();
  const prosCount = publicCounts?.pros ?? 347;
  const homesCount = publicCounts?.homes ?? 2841;
  const [emailNotify, setEmailNotify] = useState(true);

  const handleCheck = () => {
    const q = query.trim();
    if (!q) return;
    const newParams = new URLSearchParams(window.location.search);
    if (q.includes("@")) {
      newParams.set("email", q);
    } else {
      newParams.set("ref", q.toUpperCase());
    }
    window.location.search = newParams.toString();
  };

  return (
    <div className="min-h-screen pb-16" style={{ background: "#0A1628" }}>
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between sticky top-0 z-20"
        style={{ background: "rgba(10,22,40,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
      >
        <Link href="/">
          <span className="text-lg font-black tracking-tight cursor-pointer" style={{ color: "#2dd4bf" }}>ProLnk</span>
        </Link>
        <Link href="/pro-waitlist">
          <span className="text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer" style={{ background: "rgba(45,212,191,0.12)", color: "#2dd4bf", border: "1px solid rgba(45,212,191,0.25)" }}>
            Join Waitlist →
          </span>
        </Link>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        {/* Title */}
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-3"
            style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}
          >
            <Star size={11} /> ProLnk Pro Waitlist
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Check Your Position</h1>
          <p className="text-sm" style={{ color: "#6b7280" }}>Enter your email or referral code below</p>
        </div>

        {/* Urgency */}
        <UrgencyTimer prosCount={prosCount} homesCount={homesCount} />

        {/* Lookup form */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Look up your spot</p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {query.includes("@") ? <Mail size={14} style={{ color: "#4b5563" }} /> : <Hash size={14} style={{ color: "#4b5563" }} />}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                placeholder="Email address or referral code"
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(45,212,191,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={!query.trim()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
              style={{ background: "#2dd4bf", color: "#0A1628" }}
            >
              <Search size={15} /> Check
            </button>
          </div>
        </div>

        {/* Tier overview */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>Tier overview</p>
          <div className="space-y-2">
            {[
              { label: "Charter", color: "#fbbf24", bg: "rgba(251,191,36,0.1)", slots: "25 total", commission: "25%" },
              { label: "Founding", color: "#2dd4bf", bg: "rgba(45,212,191,0.1)", slots: "100 total", commission: "20%" },
              { label: "Level 3", color: "#a78bfa", bg: "rgba(167,139,250,0.1)", slots: "400 total", commission: "15%" },
            ].map(({ label, color, bg, slots, commission }) => (
              <div
                key={label}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: bg, border: `1px solid ${color}25` }}
              >
                <div className="flex items-center gap-3">
                  <Star size={14} style={{ color }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color }}>{label} Tier</p>
                    <p className="text-xs" style={{ color: "#6b7280" }}>{slots} · {commission} commission</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white">$149/mo</p>
                  <p className="text-xs" style={{ color: "#4b5563" }}>rate locked</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email notification toggle */}
        <div
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            {emailNotify ? <Bell size={16} style={{ color: "#2dd4bf" }} /> : <BellOff size={16} style={{ color: "#4b5563" }} />}
            <div>
              <p className="text-xs font-semibold text-white">Email notifications</p>
              <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>Get alerted when your market opens</p>
            </div>
          </div>
          <button
            onClick={() => setEmailNotify((v) => !v)}
            className="relative w-11 h-6 rounded-full transition-all"
            style={{ background: emailNotify ? "#2dd4bf" : "rgba(255,255,255,0.1)" }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: emailNotify ? "calc(100% - 22px)" : "2px" }}
            />
          </button>
        </div>

        {/* Join CTA */}
        <Link href="/pro-waitlist">
          <button
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #38bdf8)", color: "#0A1628" }}
          >
            <Zap size={16} /> Join the Waitlist
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function WaitlistStatus() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const refCode = params.get("ref") || undefined;
  const emailParam = params.get("email") || undefined;

  const { data: status, isLoading, isError } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { referralCode: refCode, email: emailParam },
    { enabled: !!(refCode || emailParam) }
  );
  const { data: leaderboard } = trpc.proWaitlist.getLeaderboard.useQuery();
  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery();
  const prosCount = publicCounts?.pros ?? 0;
  const homesCount = publicCounts?.homes;
  const [emailNotify, setEmailNotify] = useState(true);

  const referralLink = status ? `https://prolnk.io/apply?ref=${status.referralCode}` : "";
  const tier = status?.tier || "Standard";
  const tierCfg = TIER_CONFIG[tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.Standard;

  if (!refCode && !emailParam) {
    return <EmailLookup />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20" style={{ background: "#0f1117" }}>
        <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">
          <div className="animate-pulse bg-gray-800 rounded-2xl h-44" />
          <div className="animate-pulse bg-gray-800 rounded-2xl h-24" />
          <div className="animate-pulse bg-gray-800 rounded-2xl h-24" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1117" }}>
        <div className="text-center max-w-md px-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            <Zap size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Unable to load status</h2>
          <p className="text-gray-400 mb-6">Something went wrong fetching your waitlist status. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: "#22c55e" }}
          >
            Try Again <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1117" }}>
        <div className="text-center max-w-md px-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
          >
            <Star size={28} className="text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No record found</h2>
          <p className="text-gray-400 mb-6">We couldn't find a waitlist entry for this link or email. Double-check your confirmation email.</p>
          <Link href="/pro-waitlist" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "#22c55e" }}>
            Sign Up Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: "#0f1117", color: "#fff" }}>
      <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-2xl"
          style={{ background: tierCfg.bg, border: `1px solid ${tierCfg.border}` }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-gray-400 text-sm mb-1">Welcome back</p>
              <h1 className="text-3xl font-black">{status.firstName} {status.lastName}</h1>
              <div className="mt-2">
                <TierBadge tier={tier} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs mb-1">Your position</p>
              <p className="text-4xl font-black" style={{ color: tierCfg.color }}>#{status.position}</p>
              <p className="text-xs text-gray-500">{status.primaryCity}, {status.primaryState}</p>
            </div>
          </div>

          <div className="mt-5">
            <TierProgressBar position={status.position} tier={tier} />
          </div>

          <div className="mt-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Founding Network — Live Tier Fill</p>
            <FoundingTierBars prosCount={prosCount} />
            <UrgencyTimer prosCount={prosCount} homesCount={homesCount} />
          </div>
        </motion.div>

        {/* Referral Link — enhanced share section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 rounded-2xl space-y-5"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-green-400" />
            <h2 className="font-bold text-white">Share Your Link</h2>
          </div>

          {/* Link display + copy */}
          <div className="flex items-center gap-2 p-3 rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-sm text-gray-300 flex-1 truncate font-mono min-w-0">{referralLink}</span>
            <CopyButton text={referralLink} label="Copy" />
          </div>

          {/* Platform share buttons */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Share on</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🚀 Just locked my spot in the ProLnk founding network — home services income system for pros. Limited charter spots still open. ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: "rgba(29,161,242,0.15)", color: "#38bdf8", border: "1px solid rgba(29,161,242,0.25)" }}
              >
                <Twitter size={14} />
                Twitter / X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: "rgba(0,119,181,0.15)", color: "#60a5fa", border: "1px solid rgba(0,119,181,0.25)" }}
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: "rgba(24,119,242,0.15)", color: "#818cf8", border: "1px solid rgba(24,119,242,0.25)" }}
              >
                <Facebook size={14} />
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hey! I just got in on the ProLnk founding network — the new income platform for home service pros. Sign up before charter spots are gone: ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: "rgba(37,211,102,0.15)", color: "#4ade80", border: "1px solid rgba(37,211,102,0.25)" }}
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <a
                href={`sms:?body=${encodeURIComponent(`Hey! Thought you'd want in on this — ProLnk network income platform for contractors. I just locked my charter spot. Check it out: ${referralLink}`)}`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                style={{ background: "rgba(34,197,94,0.15)", color: "#86efac", border: "1px solid rgba(34,197,94,0.25)" }}
              >
                <Phone size={14} />
                SMS
              </a>
            </div>
          </div>

          {/* QR code placeholder */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 text-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.15)" }}
            >
              <span className="text-[9px] text-gray-500 leading-tight">QR code<br />available<br />on request</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">QR Code</p>
              <p className="text-xs text-gray-500 mt-0.5">Share at trade shows, job sites, or print on your vehicle wrap. Email us to get yours.</p>
            </div>
          </div>

          {/* How sharing works */}
          <div
            className="p-4 rounded-xl space-y-2"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)" }}
          >
            <p className="text-sm font-bold text-green-300">How sharing works</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Each person who joins using your link goes directly below you in the network — they become your L1 and build your override income. You earn a percentage of every job they close, forever. The earlier they join, the higher their tier, and the more they earn — which means more override income flowing to you.
            </p>
          </div>
        </motion.div>

        {/* Commission Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={18} className="text-amber-400" />
            <h2 className="font-bold text-white">Your Commission Structure</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">As a {tier} Partner at position #{status.position}</p>
          <NetworkTree levels={status.overrideLevels} commissionRate={status.commissionRate} />
        </motion.div>

        {/* Earnings Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={18} className="text-blue-400" />
            <h2 className="font-bold text-white">Earnings Calculator</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">Estimate your passive income based on your network</p>
          <EarningsCalculator commissionRate={status.commissionRate} overrideLevels={status.overrideLevels} />
        </motion.div>

        {/* Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-green-400" />
              <h2 className="font-bold text-white">Your Referrals</h2>
            </div>
            {status.referrals && status.referrals.length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400">{status.referrals.length}</span>
            )}
          </div>
          {!status.referrals || status.referrals.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-2">No referrals yet</p>
              <p className="text-xs text-gray-600">Share your link above to start building your network and moving up the waitlist.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {status.referrals.map((r: any, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-sm font-bold text-green-400">
                    {r.firstName?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-sm text-white">{r.firstName}</p>
                    <p className="text-xs text-gray-500">{r.businessType}</p>
                  </div>
                  <Check size={14} className="ml-auto text-green-400" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Star size={18} className="text-amber-400" />
            <h2 className="font-bold text-white">Top Referrers</h2>
          </div>
          {!leaderboard || leaderboard.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">Leaderboard loading...</p>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry: any) => (
                <div key={entry.rank} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <span className="text-xs font-bold w-6 text-center" style={{ color: entry.rank <= 3 ? "#f59e0b" : "#6b7280" }}>#{entry.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{entry.name}</p>
                    <p className="text-xs text-gray-500">{entry.trade} · {entry.city}, {entry.state}</p>
                  </div>
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                    <Users size={11} /> {entry.referralCount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="p-6 rounded-2xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(34,197,94,0.3)" }}
        >
          <Zap size={28} className="text-green-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            {tier === "Charter" ? "You're a Charter Partner!" : `Share to reach Charter status`}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {tier === "Charter"
              ? "You're in the top 100. Lock in your 2.0% commission rate and 4-level override network forever."
              : `Charter Members (first 25 spots) earn 72% commission keep rate and 4 levels of network overriderrides. ${status.spotsToCharter > 0 ? `${status.spotsToCharter} spots remain — get 5 referrals to qualify.` : "Get 5 referrals to qualify."}`}
          </p>
          <CopyButton text={referralLink} label="Copy My Referral Link" />
          <div className="mt-3">
            <Link href="/tier-benefits" className="text-xs text-gray-500 hover:text-gray-400 underline">View all tier benefits →</Link>
          </div>
        </motion.div>

        {/* Notification toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl p-4 flex items-center justify-between"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            {emailNotify ? <Bell size={16} style={{ color: "#2dd4bf" }} /> : <BellOff size={16} style={{ color: "#4b5563" }} />}
            <div>
              <p className="text-xs font-semibold text-white">Email notifications</p>
              <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                Notify me when my market opens or my position changes
              </p>
            </div>
          </div>
          <button
            onClick={() => setEmailNotify((v) => !v)}
            className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
            style={{ background: emailNotify ? "#2dd4bf" : "rgba(255,255,255,0.1)" }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: emailNotify ? "calc(100% - 22px)" : "2px" }}
            />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
