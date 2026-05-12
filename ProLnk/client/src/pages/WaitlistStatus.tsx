import { useState } from "react";
import { trpc } from "../lib/trpc";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users, TrendingUp, DollarSign, ChevronRight, Star, Award, Zap, ArrowRight } from "lucide-react";
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
    const spotsLeft = Math.max(0, chartSize - /* already filled */ 0);
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
          className="w-full accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
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

export default function WaitlistStatus() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const refCode = params.get("ref") || undefined;
  const emailParam = params.get("email") || undefined;

  const { data: status, isLoading, isError } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { referralCode: refCode, email: emailParam },
    { enabled: !!(refCode || emailParam) }
  );
  const { data: leaderboard } = trpc.proWaitlist.getLeaderboard.useQuery();

  const referralLink = status ? `https://prolnk.io/apply?ref=${status.referralCode}` : "";
  const tier = status?.tier || "Standard";
  const tierCfg = TIER_CONFIG[tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.Standard;

  if (!refCode && !emailParam) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f1117" }}>
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-3">Check Your Waitlist Status</h1>
          <p className="text-gray-400 mb-6">Enter your email or use the link from your confirmation email to view your status.</p>
          <Link href="/pro-waitlist" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "#22c55e" }}>
            Join the Waitlist <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
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
        </motion.div>

        {/* Referral Link */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Share2 size={18} className="text-green-400" />
            <h2 className="font-bold text-white">Your Referral Link</h2>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="text-sm text-gray-300 flex-1 truncate font-mono">{referralLink}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <CopyButton text={referralLink} label="Copy Link" />
            <CopyButton
              text={`Hey! I just joined the ProLnk waitlist — the new network income platform for home service pros. Use my link to sign up and we both move up: ${referralLink}`}
              label="Copy SMS Message"
            />
            <a
              href={`mailto:?subject=Join me on ProLnk&body=Hey! I just joined the ProLnk waitlist — the new network income platform for home service pros. Sign up with my link to move us both up: ${referralLink}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Email
            </a>
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

      </div>
    </div>
  );
}
