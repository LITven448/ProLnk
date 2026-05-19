import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, Users, Zap, Lock } from "lucide-react";

const TIER_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; subOverride: string; jobOverride: string; badge: string }
> = {
  charter: {
    label: "Charter Member",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    subOverride: "12%",
    jobOverride: "7%",
    badge: "bg-green-900/60 text-green-300 border border-green-700/40",
  },
  founding: {
    label: "Founding Member",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    subOverride: "6%",
    jobOverride: "4%",
    badge: "bg-blue-900/60 text-blue-300 border border-blue-700/40",
  },
  level3: {
    label: "Level 3 Partner",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    subOverride: "3%",
    jobOverride: "2%",
    badge: "bg-amber-900/60 text-amber-300 border border-amber-700/40",
  },
  level4: {
    label: "Level 4 Partner",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    subOverride: "1.5%",
    jobOverride: "1%",
    badge: "bg-purple-900/60 text-purple-300 border border-purple-700/40",
  },
  waitlist: {
    label: "Waitlist Member",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.12)",
    subOverride: "—",
    jobOverride: "—",
    badge: "bg-gray-800/60 text-gray-400 border border-gray-700/40",
  },
};

const TIER_BENEFITS: Record<string, string[]> = {
  charter: [
    "$149/mo founding rate locked forever",
    "12% subscription override on every direct recruit",
    "7% job commission override, 4-levels deep",
    "First access to every new ProLnk feature",
    "Founding member badge on your profile",
  ],
  founding: [
    "$149/mo founding rate locked forever",
    "6% subscription override on every direct recruit",
    "4% job commission override, 4-levels deep",
    "Priority lead routing in your service area",
    "Founding member badge on your profile",
  ],
  level3: [
    "$149/mo founding rate locked forever",
    "3% subscription override on every direct recruit",
    "2% job commission override, 4-levels deep",
    "Verified contractor badge on your profile",
  ],
  level4: [
    "$149/mo entry rate",
    "1.5% subscription override on every direct recruit",
    "1% job commission override, 4-levels deep",
    "ProLnk contractor profile and lead access",
  ],
  waitlist: [
    "Join the waitlist for early access",
    "Founding rates still available while slots remain",
  ],
};

function getRefFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("ref");
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-3"
      style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642", border: "2px solid rgba(245,230,66,0.3)" }}
    >
      {initials}
    </div>
  );
}

export default function JoinLanding() {
  const [, navigate] = useLocation();
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    const code = getRefFromUrl();
    if (code) {
      setRefCode(code.toUpperCase());
      localStorage.setItem("prolnk_ref_code", code.toUpperCase());
    }
  }, []);

  const { data: referrer } = trpc.network.lookupReferrer.useQuery(
    { code: refCode ?? "" },
    { enabled: !!refCode && refCode.length === 6 }
  );

  const referrerTier = (referrer as any)?.tier ?? "charter";
  const tierCfg = TIER_CONFIG[referrerTier] ?? TIER_CONFIG.charter;
  const referrerName = (referrer as any)?.name ?? null;
  const referrerBusiness = (referrer as any)?.businessName ?? null;
  const referrerTrade = (referrer as any)?.trade ?? null;

  const monthlyPassive = 149 * 0.12;

  const handleApply = () => {
    navigate(refCode ? `/apply?ref=${refCode}` : "/apply");
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A1628" }}>
      {/* Header */}
      <header
        className="px-4 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="text-lg font-black tracking-tight" style={{ color: "#F5E642" }}>
          ProLnk
        </span>
        <button
          onClick={() => navigate("/apply")}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
          style={{ color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Sign In
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="max-w-md w-full space-y-6">

          {/* Referrer hero card */}
          {referrerName ? (
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Avatar name={referrerName} />
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mb-1">
                invited you to join
              </p>
              <h1 className="text-2xl font-black text-white mb-1">{referrerName}</h1>
              {(referrerBusiness || referrerTrade) && (
                <p className="text-sm text-gray-400 mb-3">
                  {[referrerBusiness, referrerTrade].filter(Boolean).join(" · ")}
                </p>
              )}
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${tierCfg.badge}`}
              >
                {tierCfg.label}
              </span>

              {/* Passive income callout */}
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(245,230,66,0.08)", border: "1px solid rgba(245,230,66,0.2)" }}
              >
                <p className="text-xs text-gray-400 mb-1">When you join through {referrerName.split(" ")[0]}:</p>
                <p className="text-base font-bold text-white leading-snug">
                  {referrerName.split(" ")[0]} earns{" "}
                  <span style={{ color: "#F5E642" }}>{tierCfg.subOverride}</span> of your{" "}
                  <span style={{ color: "#F5E642" }}>$149/mo</span> subscription
                </p>
                <p className="text-sm font-black mt-1" style={{ color: "#F5E642" }}>
                  = ${monthlyPassive.toFixed(2)}/mo in passive income for them
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You get the same deal when you recruit — {tierCfg.subOverride} of every person you bring in
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center pt-4">
              <h1 className="text-3xl font-black text-white mb-2 leading-tight">
                Join the ProLnk<br />Partner Network
              </h1>
              <p className="text-gray-400 text-sm">
                Build a passive income stream on every job and every referral — 4 levels deep.
              </p>
            </div>
          )}

          {/* Tier benefits */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: tierCfg.bg }}
              >
                <Lock size={14} style={{ color: tierCfg.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {referrerName
                    ? `What you get at ${tierCfg.label}`
                    : "Founding Partner Benefits"}
                </p>
                <p className="text-xs text-gray-500">Locked in when you join today</p>
              </div>
            </div>
            <div className="space-y-2">
              {(TIER_BENEFITS[referrerTier] ?? TIER_BENEFITS.charter).map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <Check
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: tierCfg.color }}
                  />
                  <p className="text-xs text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How it works — 3 icons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <Zap size={18} style={{ color: "#F5E642" }} />,
                bg: "rgba(245,230,66,0.1)",
                title: "AI Finds Leads",
                desc: "Routed to your zip codes automatically",
              },
              {
                icon: <Users size={18} style={{ color: "#3b82f6" }} />,
                bg: "rgba(59,130,246,0.1)",
                title: "Recruit & Earn",
                desc: "4-level commission on every recruit",
              },
              {
                icon: <Lock size={18} style={{ color: "#22c55e" }} />,
                bg: "rgba(34,197,94,0.1)",
                title: "$149 Locked",
                desc: "Founding rate, price never increases",
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
                  className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2"
                  style={{ background: c.bg }}
                >
                  {c.icon}
                </div>
                <p className="text-xs font-bold text-white mb-0.5">{c.title}</p>
                <p className="text-xs text-gray-500">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleApply}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-black transition-all hover:opacity-90"
            style={{ background: "#F5E642", color: "#0A1628" }}
          >
            {referrerName
              ? `Join ${referrerName.split(" ")[0]}'s Network`
              : "Apply to Join"}
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-gray-600 text-center">
            Licensed home service professionals only · Texas DFW market ·{" "}
            <span style={{ color: "#F5E642" }}>Founding rates end at 500 members</span>
          </p>
        </div>
      </main>
    </div>
  );
}
