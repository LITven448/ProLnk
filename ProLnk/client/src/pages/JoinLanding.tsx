import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Check, Users, Zap, Lock } from "lucide-react";

const BRONZE = "#B08544";
const BRONZE_BG = "rgba(176,133,68,0.12)";

const REFERRER_BADGE = "bg-amber-900/60 text-amber-200 border border-amber-700/40";

const L1_SUBSCRIPTION_OVERRIDE = 0.12;

const PLANS = [
  { name: "Core", price: 99, keep: 40 },
  { name: "Pro", price: 149, keep: 50 },
  { name: "Business", price: 249, keep: 60 },
];

const PARTNER_BENEFITS = [
  "Plans that fit your business — Core $99/mo · Pro $149/mo · Business $249/mo",
  "Keep 40–60% of the platform fee on every closed job, by plan",
  "AI-detected leads routed to your service area",
  "Early access member badge on your profile",
];

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
      style={{ background: BRONZE_BG, color: BRONZE, border: "2px solid rgba(176,133,68,0.3)" }}
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

  const referrerName = (referrer as any)?.name ?? null;
  const referrerBusiness = (referrer as any)?.businessName ?? null;
  const referrerTrade = (referrer as any)?.trade ?? null;

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
        <span className="text-lg font-black tracking-tight" style={{ color: BRONZE }}>
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
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${REFERRER_BADGE}`}
              >
                ProLnk Partner
              </span>

              {/* Passive income callout */}
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(176,133,68,0.08)", border: "1px solid rgba(176,133,68,0.2)" }}
              >
                <p className="text-xs text-gray-400 mb-1">When you join through {referrerName.split(" ")[0]}:</p>
                <p className="text-base font-bold text-white leading-snug">
                  {referrerName.split(" ")[0]} earns{" "}
                  <span style={{ color: BRONZE }}>{Math.round(L1_SUBSCRIPTION_OVERRIDE * 100)}%</span> of your{" "}
                  <span style={{ color: BRONZE }}>monthly</span> subscription
                </p>
                <p className="text-sm font-black mt-1" style={{ color: BRONZE }}>
                  Recurring passive income for them
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  You get the same deal when you refer — {Math.round(L1_SUBSCRIPTION_OVERRIDE * 100)}% of every pro you bring in
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

          {/* Plans */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#6b7280" }}>
              Plans
            </p>
            <div className="space-y-2">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: BRONZE_BG, border: "1px solid rgba(176,133,68,0.25)" }}
                >
                  <p className="text-xs font-bold" style={{ color: BRONZE }}>{plan.name}</p>
                  <p className="text-xs text-gray-300">
                    ${plan.price}/mo · keep {plan.keep}% of the platform fee
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner benefits */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: BRONZE_BG }}
              >
                <Lock size={14} style={{ color: BRONZE }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Partner Benefits</p>
                <p className="text-xs text-gray-500">What you get when you join</p>
              </div>
            </div>
            <div className="space-y-2">
              {PARTNER_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-2">
                  <Check
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: BRONZE }}
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
                icon: <Zap size={18} style={{ color: BRONZE }} />,
                bg: BRONZE_BG,
                title: "AI Finds Leads",
                desc: "Routed to your zip codes automatically",
              },
              {
                icon: <Users size={18} style={{ color: "#3b82f6" }} />,
                bg: "rgba(59,130,246,0.1)",
                title: "Refer & Earn",
                desc: "Override income on 4 levels of referrals",
              },
              {
                icon: <Lock size={18} style={{ color: "#22c55e" }} />,
                bg: "rgba(34,197,94,0.1)",
                title: "Keep More",
                desc: "Keep up to 60% of the platform fee",
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
            style={{ background: BRONZE, color: "#0A1628" }}
          >
            {referrerName
              ? `Join ${referrerName.split(" ")[0]}'s Network`
              : "Apply to Join"}
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-gray-600 text-center">
            Licensed home service professionals only · Texas DFW market ·{" "}
            <span style={{ color: BRONZE }}>Early access is open</span>
          </p>
        </div>
      </main>
    </div>
  );
}
