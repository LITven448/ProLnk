import { Link } from "wouter";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import {
  Check, ArrowRight, Shield, TrendingUp, DollarSign,
  Star, Crown, Lock, Users, Sparkles, AlertTriangle, Zap, Building2, Phone, Plus
} from "lucide-react";
import { motion } from "framer-motion";

const TIERS = [
  {
    id: "scout",
    name: "Scout",
    price: 99,
    commissionKeep: "40%",
    seats: "1 seat",
    seatAddon: "+$25/seat/mo",
    rank: "Standard",
    rankDesc: "Standard position in lead queue",
    popular: false,
    color: "#60a5fa",
    borderColor: "border-blue-400/40",
    accentBg: "from-blue-500/10 to-blue-600/5",
    badgeColor: "bg-blue-500/20 text-blue-300",
    icon: Zap,
    features: [
      { label: "40% commission keep on every job you close", highlight: true },
      { label: "AI-matched homeowner leads in your service area", highlight: true },
      { label: "4-level network income (7/4/2/1% on recruits' jobs)", highlight: false },
      { label: "ProLnk Exchange — bid on residential & commercial jobs", highlight: false },
      { label: "Partner directory listing", highlight: false },
      { label: "ProLnk App — mobile lead management", highlight: false },
    ],
  },
  {
    id: "crew",
    name: "Crew",
    price: 149,
    commissionKeep: "55%",
    seats: "3 seats",
    seatAddon: "+$20/seat/mo",
    rank: "Priority",
    rankDesc: "Priority position — ahead of all Scout members",
    popular: true,
    color: "#14b8a6",
    borderColor: "border-teal-500/40",
    accentBg: "from-teal-500/10 to-teal-600/5",
    badgeColor: "bg-teal-500/20 text-teal-300",
    icon: Star,
    features: [
      { label: "55% commission keep on every job you close", highlight: true },
      { label: "AI-matched leads — priority queue over Scout members", highlight: true },
      { label: "3 team seats — assign leads to crew members", highlight: true },
      { label: "ProLnk Exchange — bid on and post residential & commercial jobs", highlight: false },
      { label: "PhotoScan AI — review homeowner job photos before accepting", highlight: false },
      { label: "Storm alert leads — real-time weather damage notifications", highlight: false },
      { label: "4-level network income (7/4/2/1% on recruits' jobs)", highlight: false },
      { label: "ProLnk App — mobile lead management", highlight: false },
    ],
  },
  {
    id: "company",
    name: "Company",
    price: 249,
    commissionKeep: "65%",
    seats: "8 seats",
    seatAddon: "+$15/seat/mo",
    rank: "Top",
    rankDesc: "Top of queue — first access to every lead",
    popular: false,
    color: "#F5E642",
    borderColor: "border-[#F5E642]/40",
    accentBg: "from-[#F5E642]/10 to-[#F5E642]/5",
    badgeColor: "bg-[#F5E642]/20 text-[#F5E642]",
    icon: Building2,
    features: [
      { label: "65% commission keep on every job you close", highlight: true },
      { label: "AI-matched leads — top queue position, first access to every job", highlight: true },
      { label: "8 team seats + add-on seats available", highlight: true },
      { label: "ProLnk Exchange — bid on and post residential & commercial jobs", highlight: false },
      { label: "PhotoScan AI + Storm alert leads", highlight: false },
      { label: "Company branding on directory profile", highlight: false },
      { label: "Advanced analytics & reporting dashboard", highlight: false },
      { label: "4-level network income (7/4/2/1% on recruits' jobs)", highlight: false },
      { label: "Multi-location management", highlight: false },
    ],
  },
];

const COMPARISON = [
  {
    feature: "Monthly price",
    founding: "$149/mo (locked forever)",
    scout: "$99/mo",
    crew: "$149/mo",
    company: "$249/mo",
    enterprise: "Custom",
    foundingWins: true,
  },
  {
    feature: "Commission keep",
    founding: "72% (locked forever)",
    scout: "40%",
    crew: "55%",
    company: "65%",
    enterprise: "Negotiated",
    foundingWins: true,
  },
  {
    feature: "Included seats",
    founding: "3 seats",
    scout: "1 seat",
    crew: "3 seats",
    company: "8 seats",
    enterprise: "Custom",
    foundingWins: false,
  },
  {
    feature: "Extra seats",
    founding: "+$20/seat/mo",
    scout: "+$25/seat/mo",
    crew: "+$20/seat/mo",
    company: "+$15/seat/mo",
    enterprise: "Custom",
    foundingWins: false,
  },
  {
    feature: "Lead queue priority",
    founding: "Top (permanent)",
    scout: "Standard",
    crew: "Priority",
    company: "Top",
    enterprise: "Top",
    foundingWins: true,
  },
  {
    feature: "ProLnk Exchange",
    founding: "✓",
    scout: "✓",
    crew: "✓",
    company: "✓",
    enterprise: "✓",
    foundingWins: false,
  },
  {
    feature: "PhotoScan AI",
    founding: "✓",
    scout: "—",
    crew: "✓",
    company: "✓",
    enterprise: "✓",
    foundingWins: false,
  },
  {
    feature: "Storm alert leads",
    founding: "✓",
    scout: "—",
    crew: "✓",
    company: "✓",
    enterprise: "✓",
    foundingWins: false,
  },
  {
    feature: "Analytics dashboard",
    founding: "✓",
    scout: "—",
    crew: "—",
    company: "✓",
    enterprise: "✓",
    foundingWins: false,
  },
  {
    feature: "Price locked forever",
    founding: "✓",
    scout: "—",
    crew: "—",
    company: "—",
    enterprise: "—",
    foundingWins: true,
  },
];

export default function PostFoundingPricing() {
  return (
    <div className="min-h-screen bg-[#060D1A] text-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060D1A]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo className="h-7 w-auto cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
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

      {/* Founding Network Banner */}
      <div className="bg-gradient-to-r from-[#F5E642]/20 to-teal-500/20 border-b border-[#F5E642]/30 pt-16">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-[#F5E642] shrink-0" />
            <p className="text-sm font-medium text-white">
              <span className="text-[#F5E642] font-bold">Founding Network still open</span> — $149/mo locked forever with 72% commission keep.
              This page shows pricing <span className="italic">after</span> the founding network closes.
            </p>
          </div>
          <Link href="/founding-partner">
            <button className="shrink-0 bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-5 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap">
              Claim Founding Spot <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/50 mb-6"
          >
            <Shield className="w-4 h-4" />
            Standard pricing — effective after founding network closes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-4 leading-tight"
          >
            Simple{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Pricing Tiers
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-10"
          >
            One flat subscription. Unlimited leads. No per-lead charges. Add seats as your team grows.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start">
          {TIERS.map((tier, i) => {
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </div>
                  </div>
                )}

                <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-6 ${tier.badgeColor} ${tier.popular ? "mt-2" : ""}`}>
                  <Icon className="w-3 h-3" />
                  {tier.name}
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-5xl font-black text-white">${tier.price}</span>
                    <span className="text-white/40 text-base mb-2">/mo</span>
                  </div>
                  <p className="text-white/40 text-sm">Billed monthly · Cancel anytime</p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-white/40 text-xs">Commission keep</span>
                    </div>
                    <span className="text-white font-black text-2xl">{tier.commissionKeep}</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="w-3.5 h-3.5 text-teal-400" />
                      <span className="text-white/40 text-xs">Team seats</span>
                    </div>
                    <span className="text-white font-black text-xl">{tier.seats}</span>
                  </div>
                </div>

                {/* Seat add-on note */}
                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2 mb-4">
                  <Plus className="w-3 h-3 text-white/30 shrink-0" />
                  <span className="text-white/30 text-xs">Additional seats: <span className="text-white/50 font-medium">{tier.seatAddon}</span></span>
                </div>

                <div className="bg-white/5 rounded-xl p-3 mb-6">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-white/40 text-xs">Lead queue priority</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{tier.rank}</span>
                  <p className="text-white/30 text-xs mt-0.5">{tier.rankDesc}</p>
                </div>

                <ul className="space-y-3 mb-8">
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
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-lg shadow-teal-500/20"
                      : "bg-white/10 hover:bg-white/15 text-white"
                  }`}>
                    Start {tier.name} <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Row */}
        <div className="max-w-5xl mx-auto mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-3xl border border-white/10 p-8 bg-white/[0.02] flex flex-col md:flex-row items-center gap-6 justify-between"
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white/50" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-black text-white">Enterprise</h3>
                  <span className="text-xs font-bold bg-white/10 text-white/50 px-3 py-1 rounded-full">Custom pricing</span>
                </div>
                <p className="text-white/40 text-sm">Large companies with 9+ users. Custom commission rates, API integrations, dedicated account management, and SLA support. Seat packages tailored to your team size.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <div className="text-xs text-white/30 flex flex-wrap gap-x-4 gap-y-1 md:max-w-xs">
                <span>✓ Negotiated commission keep</span>
                <span>✓ Custom seat packages</span>
                <span>✓ API & CRM integrations</span>
                <span>✓ Dedicated account manager</span>
                <span>✓ Priority SLA support</span>
              </div>
              <Link href="/contact">
                <button className="whitespace-nowrap bg-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Talk to Sales
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F5E642]/10 border border-[#F5E642]/20 rounded-full px-4 py-2 text-sm text-[#F5E642] mb-6">
              <AlertTriangle className="w-4 h-4" />
              Founding Network still open — closes at 500 applications
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Founding Network vs.{" "}
              <span className="text-white/50">Standard Pricing</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Founding members pay $149/mo locked forever, keep 72% from day one, and get 3 seats — that's Crew pricing with a 17-point commission advantage, locked for life.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-white/40 font-medium">Feature</th>
                  <th className="px-4 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 bg-[#F5E642]/20 text-[#F5E642] px-3 py-1.5 rounded-full text-xs font-bold">
                      <Crown className="w-3 h-3" /> Founding
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center text-white/30 font-medium text-xs">Scout<br/><span className="font-normal">$99/mo</span></th>
                  <th className="px-4 py-4 text-center text-white/30 font-medium text-xs">Crew<br/><span className="font-normal">$149/mo</span></th>
                  <th className="px-4 py-4 text-center text-white/30 font-medium text-xs">Company<br/><span className="font-normal">$249/mo</span></th>
                  <th className="px-6 py-4 text-center text-white/30 font-medium text-xs">Enterprise<br/><span className="font-normal">Custom</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white/60 font-medium">{row.feature}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`font-bold ${row.foundingWins ? "text-[#F5E642]" : "text-white/60"}`}>{row.founding}</span>
                    </td>
                    <td className="px-4 py-4 text-center text-white/40">{row.scout}</td>
                    <td className="px-4 py-4 text-center text-white/40">{row.crew}</td>
                    <td className="px-4 py-4 text-center text-white/40">{row.company}</td>
                    <td className="px-6 py-4 text-center text-white/40">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/founding-partner">
              <button className="bg-[#F5E642] hover:bg-[#F5E642]/90 text-[#0A1628] px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 justify-center">
                <Crown className="w-5 h-5" />
                Claim Founding Spot — $149/mo, 72% keep, locked forever
              </button>
            </Link>
            <Link href="/pricing">
              <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all flex items-center gap-2 justify-center border border-white/10">
                <Lock className="w-4 h-4" /> View Founding Network Details
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white/5 to-[#0A1628] border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-black text-white mb-4">Ready to start?</h2>
            <p className="text-white/50 mb-8 text-lg">
              Every plan includes unlimited lead matching and the full 5-stream income system. No per-lead fees. Ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partner-signup">
                <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-10 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-teal-500/25 inline-flex items-center gap-3">
                  Join Now <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white/10 hover:bg-white/15 text-white px-10 py-4 rounded-2xl font-bold text-base transition-all inline-flex items-center gap-3 border border-white/10">
                  Talk to Sales
                </button>
              </Link>
            </div>
            <p className="text-white/30 text-sm mt-4">Cancel anytime · No per-lead charges</p>
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
            <Link href="/pricing" className="hover:text-white/60 transition-colors">Founding Pricing</Link>
            <Link href="/partner-signup" className="hover:text-white/60 transition-colors">Join</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
