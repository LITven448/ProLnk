import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Crown, Award, DollarSign, Users, Home, TrendingUp,
  Check, ChevronRight, Star,
} from "lucide-react";
import { Link } from "wouter";

// ─── Config ───────────────────────────────────────────────────────────────────

const TIER_CONFIG: Record<string, {
  label: string; color: string; bg: string; border: string;
  nextTier: string | null; nextThreshold: number;
}> = {
  charter: {
    label: "Charter Member",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.35)",
    nextTier: null,
    nextThreshold: 0,
  },
  founding: {
    label: "Founding Member",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.35)",
    nextTier: "Charter",
    nextThreshold: 25,
  },
  level3: {
    label: "Level 3 Partner",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.35)",
    nextTier: "Founding",
    nextThreshold: 125,
  },
  level4: {
    label: "Level 4 Partner",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.35)",
    nextTier: "Level 3",
    nextThreshold: 525,
  },
  waitlist: {
    label: "Waitlist",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.12)",
    border: "rgba(107,114,128,0.25)",
    nextTier: "Level 4",
    nextThreshold: 2125,
  },
};

// ─── Income Streams (same for all founding tiers) ─────────────────────────────

const INCOME_STREAMS = [
  {
    id: "direct",
    icon: DollarSign,
    color: "#22c55e",
    label: "Direct Commission",
    value: "72% keep rate",
    detail: "You keep 72% of the platform fee on every job you win through ProLnk.",
  },
  {
    id: "network",
    icon: Users,
    color: "#3b82f6",
    label: "Network Job Overrides",
    value: "7% / 4% / 2% / 1% — 4 levels deep",
    detail: "Earn on every job closed by pros in your downline, cascading 4 levels.",
  },
  {
    id: "subs",
    icon: TrendingUp,
    color: "#f59e0b",
    label: "Subscription Overrides",
    value: "12% / 6% / 3% / 1.5%",
    detail: "Earn a percentage of each downline pro's $149/mo subscription — every month, forever.",
  },
  {
    id: "origination",
    icon: Home,
    color: "#8b5cf6",
    label: "Home Origination Rights",
    value: "1.5% perpetual",
    detail: "Be the first to document a home and earn 1.5% of every future platform fee at that address — permanently.",
  },
];

const TIER_LADDER = [
  { key: "charter",  label: "Charter",  threshold: 25,   color: "#22c55e", emoji: "👑" },
  { key: "founding", label: "Founding", threshold: 125,  color: "#3b82f6", emoji: "⭐" },
  { key: "level3",   label: "Level 3",  threshold: 525,  color: "#f59e0b", emoji: "🔷" },
  { key: "level4",   label: "Level 4",  threshold: 2125, color: "#8b5cf6", emoji: "🟣" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function IncomeStreamRow({
  icon: Icon, color, label, value, detail, unlocked,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  value: string;
  detail: string;
  unlocked: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
      style={{
        background: unlocked ? `${color}0d` : "rgba(255,255,255,0.03)",
        border: `1px solid ${unlocked ? `${color}25` : "rgba(255,255,255,0.06)"}`,
        opacity: unlocked ? 1 : 0.55,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${color}18` }}
      >
        <Icon size={17} style={{ color: unlocked ? color : "#6b7280" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-bold text-white">{label}</p>
          {unlocked ? (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: `${color}20`, color }}
            >
              ACTIVE
            </span>
          ) : (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-400">
              LOCKED
            </span>
          )}
        </div>
        <p className="text-xs font-semibold mt-0.5" style={{ color: unlocked ? color : "#6b7280" }}>
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">{detail}</p>
      </div>
      {unlocked && <Check size={14} style={{ color }} className="flex-shrink-0 mt-1" />}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TierProgress() {
  const { user, isAuthenticated } = useAuth();
  const email = user?.email ?? "";

  const { data: status, isLoading } = trpc.proWaitlist.getWaitlistStatus.useQuery(
    { email },
    { enabled: isAuthenticated && !!email }
  );

  const tier = status?.tier ?? "waitlist";
  const tierCfg = TIER_CONFIG[tier] ?? TIER_CONFIG.waitlist;
  const isFoundingNetwork = tier !== "waitlist";
  const position = status?.position ?? 99999;

  const tierProgressPct = useMemo(() => {
    if (!tierCfg.nextTier || !tierCfg.nextThreshold) return 100;
    return Math.min(100, Math.round((position / tierCfg.nextThreshold) * 100));
  }, [position, tierCfg]);

  const spotsToNext = tierCfg.nextThreshold
    ? Math.max(0, tierCfg.nextThreshold - position)
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ background: "#0A1628" }}>
        <p className="text-gray-400 text-sm animate-pulse">Loading tier data…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Tier Progress</h1>
          <p className="text-gray-400 text-sm mt-1">
            Your founding network status and all 5 income streams.
          </p>
        </div>

        {/* Current Tier Badge */}
        <div
          className="rounded-2xl p-6 flex items-center justify-between"
          style={{ background: tierCfg.bg, border: `1px solid ${tierCfg.border}` }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tierCfg.color }}>
              You're a
            </p>
            <h2 className="text-2xl font-bold mt-1" style={{ color: tierCfg.color }}>
              {tierCfg.label}
            </h2>
            {isFoundingNetwork && (
              <p className="text-xs mt-1" style={{ color: `${tierCfg.color}99` }}>
                Subscription locked at $149/mo · 4-level override active
              </p>
            )}
            {!isFoundingNetwork && (
              <p className="text-xs text-gray-400 mt-1">
                Claim a founding spot to unlock all 5 income streams.
              </p>
            )}
          </div>
          <Crown size={40} style={{ color: tierCfg.color, opacity: 0.45 }} />
        </div>

        {/* Tier Progress Bar */}
        {tierCfg.nextTier && (
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} style={{ color: tierCfg.color }} />
              <p className="text-sm font-bold text-white">Path to {tierCfg.nextTier}</p>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{tierCfg.label}</span>
              <span>
                {tierCfg.nextTier} — position #{tierCfg.nextThreshold}
              </span>
            </div>
            <div
              className="h-2.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${tierProgressPct}%`,
                  background: `linear-gradient(90deg, ${tierCfg.color}, ${tierCfg.color}88)`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              You are position{" "}
              <span className="text-white font-semibold">#{position}</span>.{" "}
              {spotsToNext > 0
                ? `Move up ${spotsToNext} positions to unlock ${tierCfg.nextTier}.`
                : `You've reached the ${tierCfg.nextTier} threshold.`}
            </p>
          </div>
        )}

        {/* Charter — max tier */}
        {!tierCfg.nextTier && (
          <div
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <Star size={22} style={{ color: "#22c55e" }} className="flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Maximum tier — Charter Member</p>
              <p className="text-xs text-gray-400 mt-0.5">
                All 4 override levels active. Subscription permanently locked at $149/mo.
              </p>
            </div>
          </div>
        )}

        {/* Tier Ladder */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Founding Network Ladder
          </p>
          <div className="space-y-2">
            {TIER_LADDER.map(({ key, label, threshold, color, emoji }) => {
              const achieved = position <= threshold;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{
                    background: achieved ? `${color}0d` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${achieved ? `${color}25` : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{emoji}</span>
                    <div>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: achieved ? color : "#6b7280" }}
                      >
                        {label}
                      </span>
                      <span className="text-[10px] text-gray-600 ml-2">
                        top {threshold} spots
                      </span>
                    </div>
                  </div>
                  {achieved ? (
                    <span
                      className="text-[10px] font-bold px-2 py-1 rounded-full"
                      style={{ background: `${color}20`, color }}
                    >
                      Achieved
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-600">
                      #{position - threshold} away
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Income Streams */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <DollarSign size={16} style={{ color: "#F5E642" }} />
            <p className="text-sm font-bold text-white">
              Here's what being a{" "}
              <span style={{ color: tierCfg.color }}>{tierCfg.label}</span> means:
            </p>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            All founding tiers share the same rates — your rank determines your waitlist position and priority access, not your commission percentages.
          </p>
          <div className="space-y-3">
            {INCOME_STREAMS.map((stream) => (
              <IncomeStreamRow
                key={stream.id}
                icon={stream.icon}
                color={stream.color}
                label={stream.label}
                value={stream.value}
                detail={stream.detail}
                unlocked={isFoundingNetwork}
              />
            ))}
          </div>
        </div>

        {/* CTA for non-founding */}
        {!isFoundingNetwork && (
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(245,230,66,0.08), rgba(10,22,40,0))",
              border: "1px solid rgba(245,230,66,0.2)",
            }}
          >
            <Crown size={26} style={{ color: "#F5E642" }} className="mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-2">Claim your founding spot</h3>
            <p className="text-xs text-gray-400 mb-4 max-w-xs mx-auto">
              Lock in $149/mo, activate all 5 income streams, and secure your position before 2,125 founding spots fill.
            </p>
            <Link href="/join">
              <span
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#F5E642", color: "#0A1628" }}
              >
                Join Founding Network <ChevronRight size={15} />
              </span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
