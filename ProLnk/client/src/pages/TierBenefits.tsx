import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X, Award, Users, TrendingUp, DollarSign, Zap, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  {
    name: "Charter Partner",
    badge: "Charter",
    positions: "Position 1–100",
    shorthand: "Top 100 — or 5+ referrals",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.4)",
    textColor: "text-green-400",
    spotsLabel: "100 spots total",
    commissionRate: "2.0%",
    overrideLevels: 4,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: "0.4%",
    features: [
      "2.0% of every job you close",
      "4-level network override (forever)",
      "First access to premium leads",
      "Exclusive Charter Partner badge",
      "Priority support queue",
      "Co-marketing opportunities",
      "Founding board input",
    ],
    highlight: true,
  },
  {
    name: "Founding Partner",
    badge: "Founding",
    positions: "Position 101–500",
    shorthand: "3–4 referrals to qualify",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.35)",
    textColor: "text-blue-400",
    spotsLabel: "400 spots",
    commissionRate: "1.5%",
    overrideLevels: 3,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: null,
    features: [
      "1.5% of every job you close",
      "3-level network override (forever)",
      "Early access to new markets",
      "Founding Partner badge",
      "Standard support queue",
      "Monthly market reports",
    ],
    highlight: false,
  },
  {
    name: "Growth Pro",
    badge: "Growth",
    positions: "Position 501–1,000",
    shorthand: "1–2 referrals to qualify",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.3)",
    textColor: "text-amber-400",
    spotsLabel: "500 spots",
    commissionRate: "1.0%",
    overrideLevels: 2,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: null,
    overrideL4: null,
    features: [
      "1.0% of every job you close",
      "2-level network override",
      "Standard lead access",
      "Growth Pro badge",
      "Community forum access",
    ],
    highlight: false,
  },
  {
    name: "Standard Pro",
    badge: "Standard",
    positions: "Position 1,001+",
    shorthand: "Open enrollment",
    color: "#6b7280",
    bg: "rgba(107,114,128,0.08)",
    border: "rgba(107,114,128,0.25)",
    textColor: "text-gray-400",
    spotsLabel: "Unlimited",
    commissionRate: "0.5%",
    overrideLevels: 0,
    overrideL1: null,
    overrideL2: null,
    overrideL3: null,
    overrideL4: null,
    features: [
      "0.5% of every job you close",
      "No network overrides",
      "Standard lead access",
      "Basic analytics dashboard",
    ],
    highlight: false,
  },
];

const OVERRIDE_BREAKDOWN = [
  { level: "L1 — Your direct recruits", rate: "1.0%", desc: "Everyone you directly bring onto ProLnk" },
  { level: "L2 — Their recruits", rate: "0.8%", desc: "Every pro your L1 recruits brings in" },
  { level: "L3 — 3 levels deep", rate: "0.6%", desc: "Every pro your L2 recruits brings in" },
  { level: "L4 — 4 levels deep", rate: "0.4%", desc: "Every pro your L3 recruits brings in" },
];

function OverrideRow({ level, rate, active, color }: { level: string; rate: string; active: boolean; color: string }) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg ${active ? "" : "opacity-30"}`} style={active ? { background: "rgba(255,255,255,0.04)" } : {}}>
      <span className="text-xs text-gray-400">{level}</span>
      {active ? (
        <span className="text-xs font-bold" style={{ color }}>{rate}</span>
      ) : (
        <X size={12} className="text-gray-700" />
      )}
    </div>
  );
}

function FeatureRow({ feature, included }: { feature: string; included: boolean }) {
  return (
    <div className="flex items-start gap-2 py-1.5">
      {included ? (
        <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
      ) : (
        <X size={14} className="text-gray-700 mt-0.5 flex-shrink-0" />
      )}
      <span className={`text-xs ${included ? "text-gray-300" : "text-gray-700"}`}>{feature}</span>
    </div>
  );
}

export default function TierBenefits() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const refCode = params.get("ref") || "";

  const applyUrl = refCode ? `/apply?ref=${refCode}` : "/pro-waitlist";

  const allFeatures = [
    "2.0% own job commission",
    "1.5% own job commission",
    "1.0% own job commission",
    "0.5% own job commission",
    "4-level network overrides",
    "3-level network overrides",
    "2-level network overrides",
    "First access to premium leads",
    "Early access to new markets",
    "Exclusive partner badge",
    "Founding board input",
    "Priority support queue",
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0f1117", color: "#fff" }}>
      <Helmet>
        <title>ProLnk Partner Tiers — Charter, Founding, Growth, Standard</title>
        <meta name="description" content="Join the ProLnk Founding Network. Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta property="og:title" content="Join the ProLnk Founding Network — 2,125 Spots Available" />
        <meta property="og:description" content="Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/tier-benefits" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join the ProLnk Founding Network — 2,125 Spots Available" />
        <meta name="twitter:description" content="Charter Members, Founding Members, and Partner tiers. $149/mo locked forever. 90-day free trial." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.io/tier-benefits" />
      </Helmet>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-5" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            <Award size={14} />
            Partner Tier System
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Earn more with every{" "}
            <span style={{ color: "#22c55e" }}>tier upgrade</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join early to lock in Charter status. Your tier determines your commission rate and how many levels deep your network income flows — forever.
          </p>
        </motion.div>
      </div>

      {/* How Overrides Work */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 rounded-2xl"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-amber-400" />
            <h2 className="font-bold text-white">How Network Override Income Works</h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Every pro in your downline generates override commissions for you — automatically, on every job they close, forever. The rates cascade as follows:
          </p>
          <div className="space-y-1">
            {OVERRIDE_BREAKDOWN.map((item) => (
              <div key={item.level} className="flex items-start gap-3 p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xs font-bold text-amber-400 whitespace-nowrap mt-0.5">{item.rate}</span>
                <div>
                  <p className="text-xs font-semibold text-white">{item.level}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">Charter Partners unlock all 4 levels. Founding: 3 levels. Growth: 2 levels. Standard: none.</p>
        </motion.div>
      </div>

      {/* Tier Cards */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.badge}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="rounded-2xl p-5 flex flex-col"
              style={{
                background: tier.highlight ? `linear-gradient(135deg, ${tier.bg} 0%, rgba(15,17,23,0.95) 100%)` : "#1a1d27",
                border: `1px solid ${tier.border}`,
                boxShadow: tier.highlight ? `0 0 40px rgba(34,197,94,0.12)` : "none",
              }}
            >
              {tier.highlight && (
                <div className="flex items-center gap-1 mb-3">
                  <Star size={12} className="text-green-400" fill="#22c55e" />
                  <span className="text-xs font-bold text-green-400">BEST VALUE</span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-black" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{tier.positions}</p>
                <p className="text-xs text-gray-600">{tier.shorthand}</p>
              </div>

              <div className="mb-4 p-3 rounded-xl text-center" style={{ background: tier.bg, border: `1px solid ${tier.border}` }}>
                <p className="text-xs text-gray-400 mb-1">Own job commission rate</p>
                <p className="text-3xl font-black" style={{ color: tier.color }}>{tier.commissionRate}</p>
                <p className="text-xs text-gray-500">of every job value</p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                  <Users size={11} />
                  Network Override Levels
                </p>
                <div className="space-y-0.5">
                  {["L1 — Direct", "L2 — 2nd level", "L3 — 3rd level", "L4 — 4th level"].map((label, i) => {
                    const rates = [tier.overrideL1, tier.overrideL2, tier.overrideL3, tier.overrideL4];
                    const active = rates[i] !== null;
                    return (
                      <div key={i} className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${active ? "" : "opacity-25"}`} style={active ? { background: "rgba(255,255,255,0.04)" } : {}}>
                        <span className="text-xs text-gray-500">{label}</span>
                        {active ? (
                          <span className="text-xs font-bold" style={{ color: tier.color }}>{rates[i]}</span>
                        ) : (
                          <X size={11} className="text-gray-700" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 mb-5 space-y-0.5">
                {tier.features.map((feat) => (
                  <FeatureRow key={feat} feature={feat} included />
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Spots available</span>
                  <span style={{ color: tier.color }} className="font-semibold">{tier.spotsLabel}</span>
                </div>
                <Link
                  href={applyUrl}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: tier.highlight ? tier.color : "rgba(255,255,255,0.07)",
                    color: tier.highlight ? "#000" : tier.color,
                    border: tier.highlight ? "none" : `1px solid ${tier.border}`,
                  }}
                >
                  Join {tier.name.split(" ")[0]} Waitlist
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="p-4" style={{ background: "#1a1d27" }}>
            <h2 className="font-bold text-white flex items-center gap-2">
              <DollarSign size={18} className="text-green-400" />
              Full Feature Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <th className="text-left px-4 py-3 text-gray-400 font-medium w-40">Feature</th>
                  {TIERS.map((t) => (
                    <th key={t.badge} className="px-4 py-3 text-center font-bold" style={{ color: t.color }}>
                      {t.badge}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Own job commission", vals: ["2.0%", "1.5%", "1.0%", "0.5%"] },
                  { label: "Override levels", vals: ["4 levels", "3 levels", "2 levels", "None"] },
                  { label: "L1 override rate", vals: ["1.0%", "1.0%", "1.0%", "—"] },
                  { label: "L2 override rate", vals: ["0.8%", "0.8%", "0.8%", "—"] },
                  { label: "L3 override rate", vals: ["0.6%", "0.6%", "—", "—"] },
                  { label: "L4 override rate", vals: ["0.4%", "—", "—", "—"] },
                  { label: "Lead access priority", vals: ["First", "Early", "Standard", "Standard"] },
                  { label: "Partner badge", vals: ["Charter", "Founding", "Growth", "Standard"] },
                  { label: "Spots available", vals: ["100", "400", "500", "Unlimited"] },
                ].map((row, ri) => (
                  <tr
                    key={row.label}
                    style={{
                      background: ri % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">{row.label}</td>
                    {row.vals.map((val, vi) => (
                      <td key={vi} className="px-4 py-3 text-center text-xs font-semibold" style={{ color: val === "—" ? "#374151" : TIERS[vi].color }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-8 rounded-2xl text-center"
          style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(34,197,94,0.3)" }}
        >
          <Zap size={32} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-3">Claim Your Charter Spot</h2>
          <p className="text-gray-400 mb-6">
            Only 100 Charter Partner positions exist. Once they're gone, they're gone. Sign up now to lock in 2.0% commissions and 4 levels of network income — forever.
          </p>
          <Link
            href={applyUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all hover:opacity-90"
            style={{ background: "#22c55e" }}
          >
            Join the Waitlist <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-gray-600 mt-3">Free to join. No credit card required.</p>
        </motion.div>
      </div>
    </div>
  );
}
