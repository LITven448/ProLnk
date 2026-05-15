import { useState } from "react";
import { Link } from "wouter";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import {
  Check, ArrowRight, Zap, Shield, TrendingUp, DollarSign,
  Star, ChevronDown, ChevronUp, Sparkles, Crown, Lock,
  Users, Home, Bolt, MapPin, Smartphone, AlertTriangle, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POST_FOUNDING_PREVIEW = [
  {
    name: "Starter",
    price: "$199/mo",
    keep: "40%",
    levels: "2-level network",
    rank: "Basic ranking",
    color: "text-blue-400",
    border: "border-blue-400/20",
  },
  {
    name: "Professional",
    price: "$279/mo",
    keep: "55%",
    levels: "3-level network",
    rank: "Priority ranking",
    color: "text-teal-400",
    border: "border-teal-400/20",
    popular: true,
  },
  {
    name: "Elite",
    price: "$399/mo",
    keep: "65%",
    levels: "4-level network",
    rank: "Top ranking",
    color: "text-[#F5E642]",
    border: "border-[#F5E642]/20",
  },
];

const FOUNDING_TIERS = [
  {
    id: "charter",
    name: "Charter",
    range: "Spots 1–25",
    spotsLabel: "25 spots",
    description: "First 25 founding members. Position 1 in the cascade — every member below you contributes to your override income.",
    color: "#F5E642",
    borderColor: "border-[#F5E642]/40",
    accentBg: "from-[#F5E642]/10 to-[#F5E642]/5",
    badgeColor: "bg-[#F5E642]/20 text-[#F5E642]",
    icon: Crown,
    cascadeAdvantage: "Sits above all 2,100 members below",
  },
  {
    id: "founding",
    name: "Founding",
    range: "Spots 26–125",
    spotsLabel: "100 spots",
    description: "Core founding cohort. Level 2 in the cascade — earns overrides from Levels 3 and 4 below.",
    color: "#14b8a6",
    borderColor: "border-teal-500/40",
    accentBg: "from-teal-500/10 to-teal-600/5",
    badgeColor: "bg-teal-500/20 text-teal-300",
    icon: Star,
    cascadeAdvantage: "Sits above 2,000 members below",
  },
  {
    id: "level3",
    name: "Level 3",
    range: "Spots 126–525",
    spotsLabel: "400 spots",
    description: "Extended founding network. Level 3 in the cascade.",
    color: "#60a5fa",
    borderColor: "border-blue-400/40",
    accentBg: "from-blue-500/10 to-blue-600/5",
    badgeColor: "bg-blue-500/20 text-blue-300",
    icon: TrendingUp,
    cascadeAdvantage: "Sits above 1,600 members below",
  },
  {
    id: "level4",
    name: "Level 4",
    range: "Spots 526–2,125",
    spotsLabel: "1,600 spots",
    description: "Final founding tier. Level 4 in the cascade — still earns overrides from all post-founding members they recruit.",
    color: "#a78bfa",
    borderColor: "border-violet-400/40",
    accentBg: "from-violet-500/10 to-violet-600/5",
    badgeColor: "bg-violet-500/20 text-violet-300",
    icon: Zap,
    cascadeAdvantage: "First founding tier — still earns from post-founding recruits",
  },
];

const FOUNDING_FEATURES = [
  { label: "72% of every job you close stays with you", icon: DollarSign, highlight: true },
  { label: "AI matching to homeowner leads in your service area", icon: Sparkles, highlight: true },
  { label: "5-stream income system (direct jobs + 4-level network + subscription override + homeowner leads + home origination)", icon: TrendingUp },
  { label: "4-level referral cascade — 7 / 4 / 2 / 1% on network jobs", icon: Users },
  { label: "Subscription override — 12% L1 · 6% L2 · 3% L3 · 1.5% L4", icon: DollarSign },
  { label: "PhotoScan AI (TrustyPro) — scan homeowner photos to identify issues", icon: Bolt },
  { label: "Storm alert leads — real-time weather damage notifications", icon: AlertTriangle },
  { label: "Partner directory listing", icon: MapPin },
  { label: "Mobile app (coming Q3 2026)", icon: Smartphone },
];

const UNIVERSAL_BENEFITS = [
  { label: "72% commission keep rate", detail: "Every tier, every job, forever" },
  { label: "$149/mo locked for life", detail: "Never increases regardless of market pricing" },
  { label: "4-level network income cascade", detail: "All tiers participate in the full cascade" },
  { label: "All platform features included", detail: "No feature gating — zero tiers get more features" },
  { label: "90-day free trial", detail: "No payment until Day 91 — no credit card required" },
  { label: "Priority algorithm ranking", detail: "Founding members get top placement over post-founding" },
  { label: "Same homeowner lead access", detail: "Every tier competes for the same high-quality leads" },
  { label: "Founding badge on profile", detail: "Permanent credential showing you were first" },
];

const FAQS = [
  {
    q: "Can the price ever change?",
    a: "Never for founding members. Your $149/mo is locked for life — regardless of what happens to market pricing after the founding network closes. This is a permanent founding member benefit, contractually guaranteed in your membership agreement.",
  },
  {
    q: "What if I cancel?",
    a: "You lose your founding member pricing permanently and cannot get it back. After the founding network closes, new members will pay market rate (estimated $249–399/mo). Cancellation terminates your locked rate. We recommend pausing rather than canceling if you need a break — contact support and we'll work with you.",
  },
  {
    q: "When does the 90-day free trial end?",
    a: "Day 90 from the date you complete signup. You won't be charged until day 91. We'll send you reminders at day 75 and day 87 so you're never caught off guard. No credit card is required to start.",
  },
  {
    q: "Why does my position in the network matter if the price is the same?",
    a: "Your network position determines how far your override income reaches down the cascade. A Charter member (spot 1–25) earns overrides from every Level 2, 3, and 4 member who joins below them. A Level 4 member still earns overrides from everyone they personally recruit and their recruits recruit — but doesn't reach as far up in the cascade. The price and features are identical; position only affects override depth.",
  },
  {
    q: "What happens to my position when the founding network closes?",
    a: "Your position is permanently fixed from the moment you join. When the founding network closes at 500 applications + 5,000 homes, no new founding members are accepted. All members who join after that point are 'post-founding' and pay market rates. Your position and locked pricing are yours forever.",
  },
  {
    q: "Why is the founding rate $149 and not higher or lower?",
    a: "$149/mo was set to be accessible to working contractors while being sustainable for the platform. At 500 founding members, the platform reaches break-even. At 1,000 members, it's highly profitable. The founding rate is low because early members take the most risk — they're betting on a platform that hasn't proven itself yet. That risk deserves a permanent reward.",
  },
];

const CASCADE_ROWS = [
  { level: "L1 (Your direct recruit)", jobOverride: "7%", subOverride: "12%", origination: "1.5%" },
  { level: "L2 (Their recruit)", jobOverride: "4%", subOverride: "6%", origination: "1.5%" },
  { level: "L3 (L2's recruit)", jobOverride: "2%", subOverride: "3%", origination: "1.5%" },
  { level: "L4 (L3's recruit)", jobOverride: "1%", subOverride: "1.5%", origination: "1.5%" },
];

const LOCKING_MECHANISM = [
  { step: "1", title: "You Join", detail: "When you complete signup, your spot number is permanently assigned. Spot numbers are sequential and never reassigned." },
  { step: "2", title: "Membership Agreement Signed", detail: "Your $149/mo rate is contractually locked in your membership agreement. Price increases require your written consent — which you're under no obligation to give." },
  { step: "3", title: "As Long As You Remain Active", detail: "Your locked rate holds indefinitely. If you cancel, the rate is forfeited. If you remain active — even during a low job month — the rate stays locked." },
  { step: "4", title: "Network Closes, Rate Stays", detail: "When the founding network closes at 500 applications, new members pay market rate. Your $149 does not change. This is a permanent competitive advantage." },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#060D1A] text-white">

      {/* Founding Network Urgency Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#F5E642]/25 via-teal-500/20 to-[#F5E642]/25 border-b border-[#F5E642]/40 py-2.5 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#F5E642] shrink-0" />
            <span className="text-sm font-bold text-[#F5E642]">Founding Network spots available</span>
            <span className="text-sm text-white/70 hidden sm:inline">— $149/mo locked forever. Closes at 500 applications.</span>
          </div>
          <Link href="/founding-partner">
            <span className="inline-flex items-center gap-1.5 bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap">
              Claim Your Spot <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="fixed top-[42px] left-0 right-0 z-50 bg-[#060D1A]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo className="h-7 w-auto cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/partner-checkout">
              <button className="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Claim Your Spot
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-full px-4 py-2 text-sm text-[#F5E642] mb-6"
          >
            <Lock className="w-4 h-4" />
            First 2,125 founding members only — waitlist closes at 500 apps + 5,000 homes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-4 leading-tight"
          >
            One price.{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Forever locked.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-white/80 mb-2"
          >
            $149/mo — locked for founding members
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#F5E642] font-semibold mb-6"
          >
            90-day free trial — no charge today
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-10"
          >
            All 2,125 founding members pay the same price, get the same features, and keep the same rate forever. The only difference is your position in the network cascade — determined by when you join.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/partner-checkout">
              <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/25 inline-flex items-center gap-3">
                Claim Your Founding Spot <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <p className="text-white/30 text-sm mt-3">No credit card required · 90 days free · Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Single Plan Card */}
      <section className="pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl border border-teal-500/40 p-8 md:p-10 bg-gradient-to-br from-teal-500/10 to-[#0A1628] shadow-2xl shadow-teal-500/10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2">
                <Star className="w-3 h-3" /> Founding Member Plan
              </div>
            </div>

            <div className="text-center mb-8 pt-2">
              <div className="flex items-end justify-center gap-2 mb-1">
                <span className="text-6xl font-black text-white">$149</span>
                <span className="text-white/40 text-lg mb-3">/mo</span>
              </div>
              <p className="text-[#F5E642] font-semibold text-sm mb-1">Founding price — never increases</p>
              <p className="text-white/40 text-sm">90 days free, then $149/mo</p>
            </div>

            <ul className="space-y-4 mb-8">
              {FOUNDING_FEATURES.map((f, i) => (
                <li key={i} className={`flex items-start gap-3 text-sm ${f.highlight ? "text-white" : "text-white/70"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${f.highlight ? "bg-teal-500/20" : "bg-white/5"}`}>
                    <Check className={`w-3 h-3 ${f.highlight ? "text-teal-400" : "text-white/40"}`} />
                  </div>
                  <span className={f.highlight ? "font-medium" : ""}>{f.label}</span>
                </li>
              ))}
            </ul>

            <Link href="/partner-checkout">
              <button className="w-full py-4 rounded-2xl font-bold text-base transition-all bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2">
                Start 90-Day Free Trial <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/30">
              <Lock className="w-3 h-3" />
              Founding rate locked as long as you remain a member
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get at Every Tier */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Universal Benefits</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              What Every Founding Member Gets
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Charter, Founding, Level 3, and Level 4 all receive the same plan. No feature gating. No upsells. These are the benefits every founding member gets, period.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {UNIVERSAL_BENEFITS.map((b, i) => (
              <div key={i} className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                <div className="font-bold text-sm text-white">{b.label}</div>
                <div className="text-xs text-white/40">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier Comparison */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">Network Position Tiers</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Same price. Same features.{" "}
              <span className="text-[#F5E642]">Different position.</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Charter, Founding, Level 3, and Level 4 are not pricing tiers — they are network positions. Earlier members sit higher in the cascade and earn overrides from more of the network below them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {FOUNDING_TIERS.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border p-6 bg-gradient-to-br ${tier.accentBg} ${tier.borderColor}`}
                >
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-4 ${tier.badgeColor}`}>
                    <Icon className="w-3 h-3" />
                    {tier.name}
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{tier.range}</p>
                  <p className="text-white/30 text-xs mb-3">{tier.spotsLabel}</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{tier.description}</p>
                  <div className="text-xs font-semibold px-2 py-1.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                    {tier.cascadeAdvantage}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-black text-white">$149</span>
                      <span className="text-white/30 text-xs mb-1">/mo</span>
                    </div>
                    <p className="text-[#F5E642] text-xs font-medium mt-0.5">Same price, always</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* All same features callout */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap gap-6 justify-center text-center">
              {[
                { label: "$149/mo locked", sub: "Every tier, forever" },
                { label: "72% keep rate", sub: "Every tier, every job" },
                { label: "4-level cascade", sub: "All tiers earn overrides" },
                { label: "All features", sub: "No feature gating" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-teal-400" />
                    <span className="text-white font-semibold text-sm">{item.label}</span>
                  </div>
                  <span className="text-white/30 text-xs">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cascade table */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white text-center mb-6">Network override rates (all tiers)</h3>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-4 text-white/50 font-medium">Level in your network</th>
                    <th className="text-right px-4 py-4 text-white/50 font-medium">Job override</th>
                    <th className="text-right px-4 py-4 text-white/50 font-medium">Subscription override</th>
                    <th className="text-right px-6 py-4 text-white/50 font-medium">Home origination</th>
                  </tr>
                </thead>
                <tbody>
                  {CASCADE_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{row.level}</td>
                      <td className="px-4 py-4 text-right text-teal-400 font-semibold">{row.jobOverride}</td>
                      <td className="px-4 py-4 text-right text-emerald-400 font-semibold">{row.subOverride}</td>
                      <td className="px-6 py-4 text-right text-[#F5E642] font-semibold">{row.origination}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/30 text-xs text-center mt-3">
              Job override = % of gross job value when a member in your network closes. Subscription override = % of monthly fee. Home origination = recurring % when a home you enrolled transacts on the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Why Founding Rates Never Increase */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-3">The Locking Mechanism</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Why Founding Rates <span className="text-teal-400">Never Increase</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              This isn't a marketing promise — it's a contractual guarantee built into how the platform works. Here's exactly how it works.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {LOCKING_MECHANISM.map((step, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm mb-4" style={{ background: "rgba(20,184,166,0.2)", color: "#14B8A6" }}>
                  {step.step}
                </div>
                <div className="font-bold text-white mb-2">{step.title}</div>
                <p className="text-sm text-white/50 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-[#F5E642]/10 to-teal-500/10 border border-[#F5E642]/20 rounded-2xl p-6 text-center">
            <Lock className="w-6 h-6 text-[#F5E642] mx-auto mb-3" />
            <p className="text-white font-bold">Bottom line: as long as you remain an active member, $149/mo is your price — forever.</p>
          </div>
        </div>
      </section>

      {/* After founding closes */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#F5E642]/5 to-transparent border border-[#F5E642]/20 rounded-3xl p-10 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-full px-4 py-2 text-xs font-bold text-[#F5E642] mb-5 uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5" />
                  After the founding network closes
                </div>
                <h2 className="text-3xl font-black text-white mb-4">
                  New members will pay market rate.{" "}
                  <span className="text-[#F5E642]">You won't.</span>
                </h2>
                <p className="text-white/60 mb-4 leading-relaxed">
                  Once 500 pro applications and 5,000 homes are submitted, the founding network closes. New members joining after that point will pay the then-current market rate — estimated $249–399/mo.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Your $149/mo is locked for life from the moment you join. That's a permanent competitive cost advantage — your leads cost less, your margins are higher, your network income compounds.
                </p>
              </div>
              <div className="md:w-64 shrink-0">
                <div className="bg-[#0A1628] rounded-2xl p-6 border border-white/10">
                  <p className="text-white/40 text-xs uppercase font-semibold tracking-widest mb-4">Price comparison</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Founding members</span>
                      <span className="text-teal-400 font-bold">$149/mo</span>
                    </div>
                    <div className="border-t border-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/50 text-sm">After closing (est.)</span>
                      <span className="text-white/40 font-medium">$249–399/mo</span>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-[#F5E642] text-xs font-semibold text-center">Up to 63% savings — locked forever</p>
                  </div>
                </div>

                <div className="mt-5">
                  <Link href="/partner-checkout">
                    <button className="w-full bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
                      Refer a Pro <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <p className="text-white/30 text-xs text-center mt-2">Earn 12% of their $149/mo for life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Launch Pricing Preview */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">After the founding network closes</p>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              Post-Launch Pricing Preview
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Once 500 applications are submitted, these are the tiers new members will choose from. Founding members are permanently exempt from this pricing.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {POST_FOUNDING_PREVIEW.map((tier) => (
              <div key={tier.name} className={`relative rounded-2xl border ${tier.border} p-5 bg-white/[0.02]`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <div className={`text-xs font-bold ${tier.color} mb-3 ${tier.popular ? "mt-2" : ""}`}>{tier.name}</div>
                <div className="text-2xl font-black text-white mb-4">{tier.price}</div>
                <div className="space-y-2 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-white/30" />
                    <span>{tier.keep} commission keep</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-white/30" />
                    <span>{tier.levels}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-white/30" />
                    <span>{tier.rank}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#F5E642]/10 to-teal-500/10 border border-[#F5E642]/20 rounded-2xl p-6 text-center">
            <Crown className="w-8 h-8 text-[#F5E642] mx-auto mb-3" />
            <p className="text-white font-bold text-lg mb-1">Founding members pay $149/mo. Forever.</p>
            <p className="text-white/50 text-sm mb-4">
              72% keep · 4-level network · top algorithm ranking — regardless of what standard pricing becomes.
            </p>
            <Link href="/partner-checkout">
              <button className="bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-8 py-3 rounded-xl font-bold text-sm transition-all inline-flex items-center gap-2">
                Claim Your Founding Spot <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Pricing Questions</h2>
            <p className="text-white/40 text-sm">Everything you need to know about founding member pricing.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-white text-sm">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-white/40 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-teal-500/10 to-[#0A1628] border border-teal-500/20 rounded-3xl p-12">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 text-sm text-teal-300 mb-6">
              <Lock className="w-4 h-4" />
              Founding price · locked forever
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              $149/mo. 90 days free.
            </h2>
            <p className="text-white/60 mb-2 text-lg">
              First 2,125 members only. Your price never increases.
            </p>
            <p className="text-white/40 text-sm mb-8">
              After founding closes, new members pay $249–399/mo. Join now to lock your rate.
            </p>
            <Link href="/partner-checkout">
              <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/25 inline-flex items-center gap-3">
                Claim Your Founding Spot <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <p className="text-white/30 text-sm mt-4">No credit card required · Cancel anytime · Lock your rate today</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <ProLnkLogo className="h-6 w-auto opacity-60" />
          <p className="text-white/30 text-sm">© 2026 ProLnk. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/partner-checkout" className="hover:text-white/60 transition-colors">Join</Link>
            <Link href="/apply" className="hover:text-white/60 transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
