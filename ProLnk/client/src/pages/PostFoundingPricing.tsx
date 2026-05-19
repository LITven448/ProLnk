import { Link } from "wouter";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import {
  Check, ArrowRight, Zap, Shield, TrendingUp, DollarSign,
  Star, Crown, Lock, Users, Sparkles, AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

// ─── Post-Founding Tiers ──────────────────────────────────────────────────────
const POST_FOUNDING_TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: 199,
    commissionKeep: 40,
    networkLevels: 2,
    algorithmRank: "Basic",
    algorithmDesc: "Standard position in lead queue",
    popular: false,
    color: "#60a5fa",
    borderColor: "border-blue-400/40″,
    accentBg: "from-blue-500/10 to-blue-600/5″,
    badgeColor: "bg-blue-500/20 text-blue-300″,
    icon: Zap,
    features: [
      { label: "40% commission keep on every job", highlight: true },
      { label: "2-level referral network overrides", highlight: true },
      { label: "Basic algorithm ranking in lead queue", highlight: false },
      { label: "AI matching to homeowner leads", highlight: false },
      { label: "Partner directory listing", highlight: false },
      { label: "Mobile app access", highlight: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 279,
    commissionKeep: 55,
    networkLevels: 3,
    algorithmRank: "Priority",
    algorithmDesc: "Priority position ahead of Starter members",
    popular: true,
    color: "#14b8a6″,
    borderColor: "border-teal-500/40″,
    accentBg: "from-teal-500/10 to-teal-600/5″,
    badgeColor: "bg-teal-500/20 text-teal-300″,
    icon: Star,
    features: [
      { label: "55% commission keep on every job", highlight: true },
      { label: "3-level referral network overrides", highlight: true },
      { label: "Priority algorithm ranking in lead queue", highlight: true },
      { label: "AI matching to homeowner leads", highlight: false },
      { label: "Partner directory listing", highlight: false },
      { label: "Storm alert lead notifications", highlight: false },
      { label: "Mobile app access", highlight: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 399,
    commissionKeep: 65,
    networkLevels: 4,
    algorithmRank: "Top",
    algorithmDesc: "Top-of-queue position — first access to every lead",
    popular: false,
    color: "#F5E642″,
    borderColor: "border-[#F5E642]/40″,
    accentBg: "from-[#F5E642]/10 to-[#F5E642]/5″,
    badgeColor: "bg-[#F5E642]/20 text-[#F5E642]",
    icon: Crown,
    features: [
      { label: "65% commission keep on every job", highlight: true },
      { label: "4-level referral network overrides", highlight: true },
      { label: "Top algorithm ranking — first in queue", highlight: true },
      { label: "AI matching to homeowner leads", highlight: false },
      { label: "Partner directory listing (top placement)", highlight: false },
      { label: "Storm alert lead notifications", highlight: false },
      { label: "PhotoScan AI visual inspection", highlight: false },
      { label: "Mobile app access", highlight: false },
    ],
  },
];

// ─── Comparison rows: founding vs post-founding ────────────────────────────────
const COMPARISON = [
  {
    feature: "Monthly price",
    founding: "$149/mo (locked forever)",
    starter: "$199/mo",
    professional: "$279/mo",
    elite: "$399/mo",
    foundingWins: true,
  },
  {
    feature: "Commission keep",
    founding: "72%",
    starter: "40%",
    professional: "55%",
    elite: "65%",
    foundingWins: true,
  },
  {
    feature: "Network override levels",
    founding: "4 levels",
    starter: "2 levels",
    professional: "3 levels",
    elite: "4 levels",
    foundingWins: true,
  },
  {
    feature: "Algorithm ranking",
    founding: "Top (permanent)",
    starter: "Basic",
    professional: "Priority",
    elite: "Top",
    foundingWins: true,
  },
  {
    feature: "Price ever increases?",
    founding: "Never",
    starter: "Market rate",
    professional: "Market rate",
    elite: "Market rate",
    foundingWins: true,
  },
];

export default function PostFoundingPricing() {
  return (
    <div className="min-h-screen bg-[#060D1A] text-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060D1A]/90 backdrop-blur-xl border-b border-white/5″>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo className="h-7 w-auto cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4″>
            <Link href="/pricing">
              <span className="text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer">
                Founding Network
              </span>
            </Link>
            <Link href="/partner-signup">
              <button className="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Founding Network Urgency Banner */}
      <div className="bg-gradient-to-r from-[#F5E642]/20 to-teal-500/20 border-b border-[#F5E642]/30 pt-16″>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3″>
          <div className="flex items-center gap-3″>
            <Crown className="w-5 h-5 text-[#F5E642] shrink-0″ />
            <p className="text-sm font-medium text-white">
              <span className="text-[#F5E642] font-bold">Founding Network still open</span> — $149/mo locked forever with 72% commission keep.
              This page shows pricing <span className="italic">after</span> the founding network closes.
            </p>
          </div>
          <Link href="/founding-partner">
            <button className="shrink-0 bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
              Claim Founding Spot <ArrowRight className="w-4 h-4″ />
            </button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6″>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/50 mb-6″
          >
            <Shield className="w-4 h-4″ />
            Post-launch standard pricing — effective after founding network closes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-4 leading-tight"
          >
            Standard{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Pricing Tiers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-10″
          >
            Once the founding network closes, new members choose from three tiers.
            Pick the commission keep and network depth that fits your business.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6″>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {POST_FOUNDING_TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border p-8 bg-gradient-to-br ${tier.accentBg} ${tier.borderColor} ${tier.popular ? "shadow-2xl shadow-teal-500/10" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2″>
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2″>
                      <Sparkles className="w-3 h-3″ /> Most Popular
                    </div>
                  </div>
                )}

                <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-6 ${tier.badgeColor} ${tier.popular ? "mt-2" : ""}`}>
                  <Icon className="w-3 h-3″ />
                  {tier.name}
                </div>

                <div className="mb-6″>
                  <div className="flex items-end gap-2 mb-1″>
                    <span className="text-5xl font-black text-white">${tier.price}</span>
                    <span className="text-white/40 text-base mb-2″>/mo</span>
                  </div>
                  <p className="text-white/40 text-sm">Billed monthly after trial</p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6″>
                  <div className="bg-white/5 rounded-xl p-3″>
                    <div className="flex items-center gap-1.5 mb-1″>
                      <DollarSign className="w-3.5 h-3.5 text-teal-400″ />
                      <span className="text-white/40 text-xs">Commission keep</span>
                    </div>
                    <span className="text-white font-black text-xl">{tier.commissionKeep}%</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3″>
                    <div className="flex items-center gap-1.5 mb-1″>
                      <Users className="w-3.5 h-3.5 text-teal-400″ />
                      <span className="text-white/40 text-xs">Network levels</span>
                    </div>
                    <span className="text-white font-black text-xl">{tier.networkLevels}</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 mb-6″>
                  <div className="flex items-center gap-1.5 mb-1″>
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400″ />
                    <span className="text-white/40 text-xs">Algorithm ranking</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{tier.algorithmRank}</span>
                  <p className="text-white/30 text-xs mt-0.5″>{tier.algorithmDesc}</p>
                </div>

                <ul className="space-y-3 mb-8″>
                  {tier.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-2.5 text-sm ${f.highlight ? "text-white" : "text-white/50"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${f.highlight ? "bg-teal-500/20" : "bg-white/5"}`}>
                        <Check className={`w-2.5 h-2.5 ${f.highlight ? "text-teal-400" : "text-white/30"}`} />
                      </div>
                      <span className={f.highlight ? "font-medium" : ""}>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/partner-signup">
                  <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-lg shadow-teal-500/20″
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}>
                    Join Now <ArrowRight className="w-4 h-4″ />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Founding Network Comparison */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12″>
            <div className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-full px-4 py-2 text-sm text-[#F5E642] mb-6″>
              <AlertTriangle className="w-4 h-4″ />
              Don't miss the founding network — it closes at 500 applications
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4″>
              Founding Network vs.{" "}
              <span className="text-white/50″>Standard Pricing</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Founding members pay $149/mo locked forever and keep 72% of every job — regardless of what standard pricing becomes. This is a permanent competitive advantage.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10″>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5″>
                  <th className="text-left px-6 py-4 text-white/40 font-medium">Feature</th>
                  <th className="px-4 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-[#F5E642]/20 text-[#F5E642] px-3 py-1.5 rounded-full text-xs font-bold">
                      <Crown className="w-3 h-3″ /> Founding Network
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center text-white/30 font-medium text-xs">Starter</th>
                  <th className="px-4 py-4 text-center text-white/30 font-medium text-xs">Professional</th>
                  <th className="px-6 py-4 text-center text-white/30 font-medium text-xs">Elite</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white/60 font-medium">{row.feature}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-[#F5E642] font-bold">{row.founding}</span>
                    </td>
                    <td className="px-4 py-4 text-center text-white/40″>{row.starter}</td>
                    <td className="px-4 py-4 text-center text-white/40″>{row.professional}</td>
                    <td className="px-6 py-4 text-center text-white/40″>{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/founding-partner">
              <button className="bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 justify-center">
                <Crown className="w-5 h-5″ />
                Claim Founding Network Spot — $149/mo
              </button>
            </Link>
            <Link href="/pricing">
              <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 justify-center border border-white/10″>
                View Founding Network Pricing
              </button>
            </Link>
          </div>
          <p className="text-white/30 text-xs text-center mt-4″>
            Founding network closes at 500 pro applications + 5,000 homes. Once closed, standard pricing applies permanently for all new members.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6″>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/5 to-[#0A1628] border border-white/10 rounded-3xl p-12″>
            <h2 className="text-3xl font-black text-white mb-4″>
              Ready to join?
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              Choose a plan and start your free trial — no credit card required.
            </p>
            <Link href="/partner-signup">
              <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/25 inline-flex items-center gap-3″>
                Join Now <ArrowRight className="w-5 h-5″ />
              </button>
            </Link>
            <p className="text-white/30 text-sm mt-4″>Free trial included · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6″>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4″>
          <ProLnkLogo className="h-6 w-auto opacity-60″ />
          <p className="text-white/30 text-sm">© 2026 ProLnk. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30″>
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-white/60 transition-colors">Founding Pricing</Link>
            <Link href="/partner-signup" className="hover:text-white/60 transition-colors">Join</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
