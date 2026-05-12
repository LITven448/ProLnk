import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Check, X, Award, Users, TrendingUp, DollarSign, Zap, ArrowRight, Star, Lock, Clock, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  {
    name: "Charter Partner",
    badge: "Charter",
    positions: "Position 1–25",
    shorthand: "First 25 applicants",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.4)",
    spotsLabel: "25 spots",
    spotsTotal: 25,
    commissionRate: "2.0%",
    overrideLevels: 4,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: "0.4%",
    subscriptionOverride: "12%",
    origination: true,
    features: [
      "2.0% of every job you close",
      "4-level network override (forever)",
      "12% subscription override",
      "Origination rights on every home",
      "First access to premium leads",
      "Exclusive Charter Partner badge",
      "Priority support queue",
      "Founding board input",
    ],
    highlight: true,
  },
  {
    name: "Founding Partner",
    badge: "Founding",
    positions: "Position 26–125",
    shorthand: "Positions 26–125",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.10)",
    border: "rgba(59,130,246,0.35)",
    spotsLabel: "100 spots",
    spotsTotal: 100,
    commissionRate: "1.5%",
    overrideLevels: 4,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: "0.4%",
    subscriptionOverride: "12%",
    origination: true,
    features: [
      "1.5% of every job you close",
      "4-level network override (forever)",
      "12% subscription override",
      "Origination rights on every home",
      "Early access to new markets",
      "Founding Partner badge",
      "Monthly market reports",
    ],
    highlight: false,
  },
  {
    name: "Level 3 Partner",
    badge: "L3",
    positions: "Position 126–525",
    shorthand: "Positions 126–525",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.10)",
    border: "rgba(245,158,11,0.3)",
    spotsLabel: "400 spots",
    spotsTotal: 400,
    commissionRate: "1.0%",
    overrideLevels: 4,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: "0.4%",
    subscriptionOverride: "12%",
    origination: true,
    features: [
      "1.0% of every job you close",
      "4-level network override (forever)",
      "12% subscription override",
      "Origination rights on every home",
      "Standard lead access",
      "L3 Partner badge",
      "Community forum access",
    ],
    highlight: false,
  },
  {
    name: "Level 4 Partner",
    badge: "L4",
    positions: "Position 526–2,125",
    shorthand: "Positions 526–2,125",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.3)",
    spotsLabel: "1,600 spots",
    spotsTotal: 1600,
    commissionRate: "0.75%",
    overrideLevels: 4,
    overrideL1: "1.0%",
    overrideL2: "0.8%",
    overrideL3: "0.6%",
    overrideL4: "0.4%",
    subscriptionOverride: "12%",
    origination: true,
    features: [
      "0.75% of every job you close",
      "4-level network override (forever)",
      "12% subscription override",
      "Origination rights on every home",
      "Standard lead access",
      "L4 Partner badge",
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

  return (
    <div className="min-h-screen pb-24" style={{ background: "#0f1117", color: "#fff" }}>
      <Helmet>
        <title>ProLnk Partner Tiers — Charter, Founding, L3, L4 | $149/mo Locked Forever</title>
        <meta name="description" content="Join the ProLnk Founding Network. All 4 tiers are $149/mo locked forever. Only 2,125 spots exist. Once they fill, the founding network closes permanently." />
        <meta property="og:title" content="Join the ProLnk Founding Network — 2,125 Spots, $149/mo Forever" />
        <meta property="og:description" content="Charter, Founding, L3, and L4 partner tiers. $149/mo locked forever. 90-day free trial. Apply before the waitlist closes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/tier-benefits" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join the ProLnk Founding Network — 2,125 Spots, $149/mo Forever" />
        <meta name="twitter:description" content="Charter, Founding, L3, and L4 partner tiers. $149/mo locked forever. 90-day free trial." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.io/tier-benefits" />
      </Helmet>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-5" style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e" }}>
            <Award size={14} />
            Founding Network Partner Tiers
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Every tier.{" "}
            <span style={{ color: "#22c55e" }}>Same price.</span>{" "}
            Bigger position.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            All founding network members pay{" "}
            <span className="text-white font-bold">$149/mo — locked forever.</span>{" "}
            Your tier determines your commission rate and your place in the network. Join early to lock in the highest rate.
          </p>

          {/* Price lock banner */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.35)" }}>
            <Lock size={18} className="text-green-400" />
            <span className="text-green-300 font-semibold text-sm">
              $149/mo is the founding rate — standard pricing after launch is $249/mo
            </span>
          </div>
        </motion.div>
      </div>

      {/* Urgency Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(234,88,12,0.08) 100%)", border: "1px solid rgba(239,68,68,0.35)" }}
        >
          <Clock size={32} className="text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-black text-white text-lg">Once 2,125 spots fill, the founding network closes permanently.</p>
            <p className="text-sm text-red-300 mt-1">
              No exceptions. No late-entry founding rates. Only the first 2,125 pros get these rates — ever.
            </p>
          </div>
          <Link
            href={applyUrl}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-black text-sm whitespace-nowrap transition-all hover:opacity-90"
            style={{ background: "#22c55e" }}
          >
            Claim Your Spot <ArrowRight size={14} />
          </Link>
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
            Every pro in your downline generates override commissions for you — automatically, on every job they close, forever. All founding network tiers unlock all 4 levels.
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
          <p className="text-xs text-gray-500 mt-3 flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-green-400" />
            All 4 founding tiers unlock all 4 override levels — this is exclusive to founding network members.
          </p>
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
                  <span className="text-xs font-bold text-green-400">HIGHEST RATE</span>
                </div>
              )}

              <div className="mb-3">
                <h3 className="text-lg font-black" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{tier.positions}</p>
                <p className="text-xs text-gray-600">{tier.spotsLabel}</p>
              </div>

              {/* Price — same for all */}
              <div className="mb-3 p-2 rounded-xl text-center" style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <p className="text-xs text-gray-500 mb-0.5">Monthly price</p>
                <p className="text-2xl font-black text-white">$149<span className="text-sm text-gray-400 font-normal">/mo</span></p>
                <p className="text-xs text-green-400 font-semibold">Locked forever</p>
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
                      <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                        <span className="text-xs text-gray-500">{label}</span>
                        <span className="text-xs font-bold" style={{ color: tier.color }}>{rates[i]}</span>
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

      {/* Founding vs Standard Comparison */}
      <div className="max-w-4xl mx-auto px-4 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="text-center mb-5">
            <h2 className="text-2xl font-black text-white">Founding Network vs. Standard (Future) Rates</h2>
            <p className="text-sm text-gray-500 mt-1">This is why joining now matters. These rates are only available to the first 2,125 members.</p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <th className="text-left px-5 py-4 text-gray-400 font-medium">Feature</th>
                    <th className="px-5 py-4 text-center font-black text-green-400">
                      Founding Network
                      <br />
                      <span className="text-xs font-normal text-green-600">All 4 tiers</span>
                    </th>
                    <th className="px-5 py-4 text-center font-bold text-gray-500">
                      Standard (Post-Launch)
                      <br />
                      <span className="text-xs font-normal text-gray-700">After 2,125 spots fill</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Monthly price", founding: "$149/mo locked forever", standard: "$249/mo" },
                    { label: "Keep rate on jobs", founding: "72% (you keep)", standard: "55%" },
                    { label: "Network override levels", founding: "4 levels deep", standard: "2 levels deep" },
                    { label: "L1 override rate", founding: "1.0%", standard: "0.5%" },
                    { label: "L2 override rate", founding: "0.8%", standard: "0.25%" },
                    { label: "L3 override rate", founding: "0.6%", standard: "—" },
                    { label: "L4 override rate", founding: "0.4%", standard: "—" },
                    { label: "Subscription override", founding: "12% recurring", standard: "5% recurring" },
                    { label: "Origination rights", founding: "Yes — permanent", standard: "No" },
                    { label: "90-day free trial", founding: "Yes", standard: "No" },
                    { label: "Price lock guarantee", founding: "Yes — never increases", standard: "No" },
                  ].map((row, ri) => (
                    <tr
                      key={row.label}
                      style={{
                        background: ri % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <td className="px-5 py-3 text-gray-400 text-xs font-medium">{row.label}</td>
                      <td className="px-5 py-3 text-center text-xs font-bold text-green-400">{row.founding}</td>
                      <td className="px-5 py-3 text-center text-xs text-gray-600">{row.standard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Feature Comparison (existing tiers) */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
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
              Commission Rate by Founding Tier
            </h2>
            <p className="text-xs text-gray-500 mt-1">All other benefits are identical across all 4 founding tiers — only the job commission rate differs based on when you join.</p>
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
                  { label: "Monthly price", vals: ["$149/mo", "$149/mo", "$149/mo", "$149/mo"], highlight: true },
                  { label: "Own job commission", vals: ["2.0%", "1.5%", "1.0%", "0.75%"] },
                  { label: "Override levels", vals: ["4 levels", "4 levels", "4 levels", "4 levels"] },
                  { label: "L1 override rate", vals: ["1.0%", "1.0%", "1.0%", "1.0%"] },
                  { label: "L2 override rate", vals: ["0.8%", "0.8%", "0.8%", "0.8%"] },
                  { label: "L3 override rate", vals: ["0.6%", "0.6%", "0.6%", "0.6%"] },
                  { label: "L4 override rate", vals: ["0.4%", "0.4%", "0.4%", "0.4%"] },
                  { label: "Subscription override", vals: ["12%", "12%", "12%", "12%"] },
                  { label: "Origination rights", vals: ["Yes", "Yes", "Yes", "Yes"] },
                  { label: "Lead access priority", vals: ["First", "Early", "Standard", "Standard"] },
                  { label: "Spots available", vals: ["25", "100", "400", "1,600"] },
                ].map((row, ri) => (
                  <tr
                    key={row.label}
                    style={{
                      background: row.highlight ? "rgba(34,197,94,0.06)" : ri % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs font-medium">{row.label}</td>
                    {row.vals.map((val, vi) => (
                      <td key={vi} className="px-4 py-3 text-center text-xs font-semibold" style={{ color: row.highlight ? "#22c55e" : TIERS[vi].color }}>
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

      {/* "Only founding members get these rates — ever" callout */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <ShieldCheck size={36} className="text-green-400 flex-shrink-0" />
          <div>
            <p className="text-white font-black text-lg">Only founding network members get these rates — ever.</p>
            <p className="text-sm text-gray-400 mt-1">
              When the founding network closes at 2,125 members, standard pricing ($249/mo, 55% keep, 2-level deep, no origination rights) becomes the only option. There is no upgrade path from standard to founding rates.
            </p>
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
          <h2 className="text-2xl font-black text-white mb-2">Claim Your Founding Network Spot</h2>
          <p className="text-green-400 font-semibold mb-3">$149/mo · Locked forever · 90-day free trial</p>
          <p className="text-gray-400 mb-6">
            Only 2,125 founding spots exist across all 4 tiers. The earlier you join, the higher your commission rate — and the better your position in the network cascade.
          </p>
          <Link
            href={applyUrl}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black text-lg transition-all hover:opacity-90"
            style={{ background: "#22c55e" }}
          >
            Join the Founding Network <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-gray-600 mt-3">Free to join. No credit card required. 90-day trial on approval.</p>
        </motion.div>
      </div>
    </div>
  );
}
