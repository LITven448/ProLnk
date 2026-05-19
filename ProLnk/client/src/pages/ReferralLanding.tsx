import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, Users, Lock, Clock, Shield, Zap } from "lucide-react";

const TOTAL_NETWORK_SPOTS = 2125;

const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; subscriptionRate: string; jobRate: string }
> = {
  charter: {
    label: "Charter Member",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    subscriptionRate: "12%",
    jobRate: "7%",
  },
  founding: {
    label: "Founding Member",
    color: "#3b82f6″,
    bg: "rgba(59,130,246,0.12)",
    subscriptionRate: "6%",
    jobRate: "4%",
  },
  level3: {
    label: "Level 3 Partner",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    subscriptionRate: "3%",
    jobRate: "2%",
  },
  level4: {
    label: "Level 4 Partner",
    color: "#8b5cf6″,
    bg: "rgba(139,92,246,0.12)",
    subscriptionRate: "1.5%",
    jobRate: "1%",
  },
};

const TIER_MAP: Record<string, string> = {
  charter: "charter",
  founding: "founding",
  growth: "founding",
  level3: "level3″,
  level4: "level4″,
  standard: "level4″,
};

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-3″
      style={{
        background: "rgba(245,230,66,0.15)",
        color: "#F5E642″,
        border: "2px solid rgba(245,230,66,0.3)",
      }}
    >
      {initials}
    </div>
  );
}

function CountdownSpots({ spotsRemaining }: { spotsRemaining: number }) {
  const pct = Math.min(100, Math.round(((TOTAL_NETWORK_SPOTS - spotsRemaining) / TOTAL_NETWORK_SPOTS) * 100));
  return (
    <div
      className="rounded-xl p-4″
      style={{
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.25)",
      }}
    >
      <div className="flex items-center justify-between mb-2″>
        <div className="flex items-center gap-2″>
          <Clock size={14} style={{ color: "#f59e0b" }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#f59e0b" }}>
            Founding Network
          </span>
        </div>
        <span className="text-xs font-black text-white">{spotsRemaining.toLocaleString()} left</span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden mb-1″
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, background: "#f59e0b" }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1″>
        {TOTAL_NETWORK_SPOTS - spotsRemaining} of {TOTAL_NETWORK_SPOTS.toLocaleString()} spots claimed
      </p>
    </div>
  );
}

function getRefFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

export default function ReferralLanding() {
  const [, navigate] = useLocation();
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const code = getRefFromUrl();
    if (code) {
      const upper = code.toUpperCase();
      setRefCode(upper);
      localStorage.setItem("prolnk_ref_code", upper);
    }
  }, []);

  const { data: referrer, isLoading: referrerLoading } = trpc.waitlist.getWaitlistStatus.useQuery(
    { referralCode: refCode ?? "" },
    { enabled: !!refCode && refCode.length > 0, retry: false }
  );

  const { data: publicCounts } = trpc.waitlist.getPublicCounts.useQuery(undefined, {
    refetchInterval: 60000,
  });

  const totalSignups = publicCounts?.pros ?? 0;
  const spotsRemaining = Math.max(0, TOTAL_NETWORK_SPOTS - totalSignups);

  const partnerName = referrer ? `${referrer.firstName} ${referrer.lastName ?? ""}`.trim() : null;
  const partnerTrade = referrer?.trade ?? null;
  const rawTier = referrer?.tier ?? "charter";
  const tierKey = TIER_MAP[rawTier] ?? "charter";
  const tierCfg = TIER_CONFIG[tierKey] ?? TIER_CONFIG.charter;

  const handleClaimSpot = () => {
    navigate(refCode ? `/pro-waitlist?ref=${refCode}` : "/pro-waitlist");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A1628″ }}>
      {/* Header */}
      <header
        className="px-4 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-lg font-black tracking-tight" style={{ color: "#F5E642″ }}>
          ProLnk
        </span>
        <button
          onClick={() => navigate("/pro-waitlist")}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80″
          style={{ color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Learn More
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10″>
        <div className="max-w-md w-full space-y-5″>

          {/* Referrer hero card */}
          {referrerLoading && refCode ? (
            <div
              className="rounded-2xl p-8 text-center animate-pulse"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-20 h-20 rounded-2xl bg-white/10 mx-auto mb-3″ />
              <div className="h-4 bg-white/10 rounded w-3/4 mx-auto mb-2″ />
              <div className="h-3 bg-white/10 rounded w-1/2 mx-auto" />
            </div>
          ) : partnerName ? (
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Avatar name={partnerName} />
              <p className="text-xs font-bold uppercase tracking-widest mb-1″ style={{ color: "#9ca3af" }}>
                You've been invited by
              </p>
              <h1 className="text-3xl font-black text-white mb-1″>{partnerName}</h1>
              {partnerTrade && (
                <p className="text-sm mb-3″ style={{ color: "#9ca3af" }}>
                  {partnerTrade}
                </p>
              )}
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4″
                style={{ background: tierCfg.bg, color: tierCfg.color, border: `1px solid ${tierCfg.color}40` }}
              >
                {tierCfg.label}
              </span>

              <div
                className="rounded-xl p-4 text-left"
                style={{ background: "rgba(245,230,66,0.06)", border: "1px solid rgba(245,230,66,0.15)" }}
              >
                <p className="text-xs font-medium mb-2″ style={{ color: "#9ca3af" }}>
                  Join before {partnerName.split(" ")[0]} fills their network
                </p>
                <p className="text-sm font-bold text-white leading-snug">
                  When you join, {partnerName.split(" ")[0]} earns{" "}
                  <span style={{ color: "#F5E642″ }}>{tierCfg.subscriptionRate}</span> of your{" "}
                  <span style={{ color: "#F5E642″ }}>$149/mo</span> — and you get the same when you recruit.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center pt-4″>
              <h1 className="text-3xl font-black text-white mb-2 leading-tight">
                Join the ProLnk<br />Founding Network
              </h1>
              <p className="text-sm" style={{ color: "#9ca3af" }}>
                Build a passive income stream on every job and every referral — 4 levels deep.
              </p>
            </div>
          )}

          {/* Spots countdown */}
          <CountdownSpots spotsRemaining={spotsRemaining} />

          {/* What you get */}
          <div
            className="rounded-2xl p-5″
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-4″>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0″
                style={{ background: "rgba(245,230,66,0.1)" }}
              >
                <Shield size={14} style={{ color: "#F5E642″ }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">What you get as a founding member</p>
                <p className="text-xs" style={{ color: "#6b7280″ }}>Locked in when you join today</p>
              </div>
            </div>
            <div className="space-y-2.5″>
              {[
                "$149/mo founding rate locked for life",
                "90-day free trial — no charge until launch",
                "72% commission keep on every completed job",
                "5 income streams including 4-level network income",
                "AI-powered lead detection from job photos",
                "Charter member badge on your partner profile",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-2″>
                  <Check size={13} className="flex-shrink-0 mt-0.5″ style={{ color: "#22c55e" }} />
                  <p className="text-xs" style={{ color: "#d1d5db" }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 income callouts */}
          <div className="grid grid-cols-3 gap-3″>
            {[
              {
                icon: <Zap size={16} style={{ color: "#F5E642″ }} />,
                bg: "rgba(245,230,66,0.1)",
                title: "72% Keep",
                desc: "On every referral closed",
              },
              {
                icon: <Users size={16} style={{ color: "#3b82f6″ }} />,
                bg: "rgba(59,130,246,0.1)",
                title: "4 Levels Deep",
                desc: "Network income on recruits",
              },
              {
                icon: <Lock size={16} style={{ color: "#22c55e" }} />,
                bg: "rgba(34,197,94,0.1)",
                title: "$149 Locked",
                desc: "Price never goes up",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2″
                  style={{ background: c.bg }}
                >
                  {c.icon}
                </div>
                <p className="text-xs font-bold text-white mb-0.5″>{c.title}</p>
                <p className="text-xs" style={{ color: "#6b7280″ }}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleClaimSpot}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-black transition-all hover:opacity-90″
            style={{ background: "#F5E642″, color: "#0A1628" }}
          >
            Claim Your Spot
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-center" style={{ color: "#4b5563″ }}>
            Licensed home service pros only · Texas DFW market ·{" "}
            <span style={{ color: "#F5E642″ }}>Founding rates end at 500 members</span>
          </p>
        </div>
      </main>
    </div>
  );
}
