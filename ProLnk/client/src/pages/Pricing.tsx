import { useState } from "react";
import { Link } from "wouter";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import {
  Check, X, ArrowRight, Zap, Shield, TrendingUp, DollarSign,
  Star, Calculator, Building2, ChevronDown, ChevronUp, ExternalLink,
  Sparkles, Crown, Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Residential Tiers ────────────────────────────────────────────────────────
const RESIDENTIAL_TIERS = [
  {
    id: "connect",
    name: "Connect",
    subtitle: "Solo operators & startups",
    price: 79,
    annualPrice: 66, // per month billed annually
    leadCap: 20,
    seats: 1,
    commissionDiscount: 0,
    popular: false,
    cta: "Start Free Trial",
    color: "#3B82F6",
    accentBg: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/20 text-blue-300",
    features: [
      { label: "30-day free trial, no credit card required", included: true, highlight: true },
      { label: "Up to 20 verified leads / month", included: true },
      { label: "AI opportunity alerts", included: true },
      { label: "TrustyPro partner profile", included: true },
      { label: "1 service category", included: true },
      { label: "Standard commission rate", included: true },
      { label: "Field OS mobile app", included: false },
      { label: "FSM integrations (Jobber, ServiceTitan)", included: false },
      { label: "Commission discount", included: false },
      { label: "Bundle offer matching", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    subtitle: "Established businesses",
    price: 149,
    annualPrice: 124,
    leadCap: 60,
    seats: 5,
    commissionDiscount: 10,
    popular: true,
    cta: "Start Free Trial",
    color: "#10B981",
    accentBg: "from-emerald-500/15 to-teal-600/10",
    borderColor: "border-emerald-500/50",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
    features: [
      { label: "30-day free trial, no credit card required", included: true, highlight: true },
      { label: "Up to 60 verified leads / month", included: true },
      { label: "All service categories", included: true },
      { label: "Field OS mobile app", included: true },
      { label: "10% commission discount", included: true },
      { label: "FSM integrations (Jobber, ServiceTitan, HCP)", included: true },
      { label: "Bundle offer matching (multi-pro bundling)", included: true },
      { label: "Deal Composer access", included: true },
      { label: "Review management suite", included: true },
      { label: "Priority lead routing", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    subtitle: "Multi-location & high-volume",
    price: 249,
    annualPrice: 207,
    leadCap: null,
    seats: 25,
    commissionDiscount: 20,
    popular: false,
    cta: "Start Free Trial",
    color: "#8B5CF6",
    accentBg: "from-violet-500/10 to-purple-600/5",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-500/20 text-violet-300",
    features: [
      { label: "30-day free trial, no credit card required", included: true, highlight: true },
      { label: "Unlimited verified leads", included: true },
      { label: "Priority lead routing (first-look advantage)", included: true },
      { label: "20% commission discount", included: true },
      { label: "Up to 25 team seats", included: true },
      { label: "Multi-location management", included: true },
      { label: "API & webhook integrations", included: true },
      { label: "Co-branded marketing materials", included: true },
      { label: "Dedicated partner success manager", included: true },
      { label: "Quarterly strategy review", included: true },
    ],
  },
];

// ─── Commercial Tiers (ProLnk Exchange) ──────────────────────────────────────
const COMMERCIAL_TIERS = [
  {
    id: "commercial-pro",
    name: "Commercial Pro",
    subtitle: "Small commercial contractors",
    price: 399,
    annualPrice: 332,
    color: "#F59E0B",
    accentBg: "from-amber-500/10 to-yellow-600/5",
    borderColor: "border-amber-500/30",
    features: [
      "Up to 15 commercial leads / month",
      "Commercial property database access",
      "Property manager direct connect",
      "All residential features included",
      "Commercial bid tracking",
    ],
  },
  {
    id: "commercial-enterprise",
    name: "Commercial Enterprise",
    subtitle: "Mid-size commercial operations",
    price: 749,
    annualPrice: 624,
    color: "#EF4444",
    accentBg: "from-red-500/10 to-rose-600/5",
    borderColor: "border-red-500/30",
    popular: true,
    features: [
      "Unlimited commercial leads",
      "HOA & property management network",
      "Multi-site contract management",
      "Commercial intelligence dashboard",
      "Dedicated commercial account manager",
      "SLA guarantee",
    ],
  },
  {
    id: "commercial-exchange",
    name: "Exchange Partner",
    subtitle: "Large commercial & institutional",
    price: null, // custom
    annualPrice: null,
    color: "#06B6D4",
    accentBg: "from-cyan-500/10 to-sky-600/5",
    borderColor: "border-cyan-500/30",
    features: [
      "Custom territory exclusivity",
      "Institutional & government contracts",
      "ProLnk Exchange marketplace access",
      "White-label partner portal",
      "Custom API integration",
      "Executive account team",
    ],
  },
];

// ─── Commission Data ──────────────────────────────────────────────────────────
const COMMISSION_DATA = [
  { category: "Real Estate Agent",        group: "Financial & Professional", avgJob: 9000,  prolnkPct: 10, referringPct: 5,  industryCACLow: 1851, industryCACHigh: 3898, type: "one-time" },
  { category: "Mortgage Broker",          group: "Financial & Professional", avgJob: 5250,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 550,  industryCACHigh: 700,  type: "one-time" },
  { category: "Title Company",            group: "Financial & Professional", avgJob: 2750,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 350,  industryCACHigh: 450,  type: "one-time" },
  { category: "Home Warranty",            group: "Financial & Professional", avgJob: 600,   prolnkPct: 12, referringPct: 5,  industryCACLow: 200,  industryCACHigh: 300,  type: "subscription" },
  { category: "Insurance Agent",          group: "Financial & Professional", avgJob: 1200,  prolnkPct: 10, referringPct: 5,  industryCACLow: 250,  industryCACHigh: 350,  type: "subscription" },
  { category: "Home Inspector",           group: "Financial & Professional", avgJob: 500,   prolnkPct: 10, referringPct: 5,  industryCACLow: 150,  industryCACHigh: 210,  type: "one-time" },
  { category: "Roofing",                  group: "High-Ticket Trades",       avgJob: 12000, prolnkPct: 5,  referringPct: 2,  industryCACLow: 400,  industryCACHigh: 550,  type: "one-time", capNote: "$600 max" },
  { category: "Solar Installation",       group: "High-Ticket Trades",       avgJob: 28000, prolnkPct: 3,  referringPct: 1,  industryCACLow: 1500, industryCACHigh: 2500, type: "one-time", capNote: "$750 max" },
  { category: "Home Remodeling / GC",     group: "High-Ticket Trades",       avgJob: 45000, prolnkPct: 2,  referringPct: 1,  industryCACLow: 1200, industryCACHigh: 2000, type: "one-time", capNote: "$1,000 max" },
  { category: "Foundation Repair",        group: "High-Ticket Trades",       avgJob: 8500,  prolnkPct: 6,  referringPct: 3,  industryCACLow: 400,  industryCACHigh: 600,  type: "one-time" },
  { category: "Deck / Patio",             group: "High-Ticket Trades",       avgJob: 12000, prolnkPct: 5,  referringPct: 2,  industryCACLow: 350,  industryCACHigh: 500,  type: "one-time", capNote: "$600 max" },
  { category: "HVAC (Service/Repair)",    group: "Mid-Ticket Trades",        avgJob: 3500,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 80,   industryCACHigh: 120,  type: "one-time" },
  { category: "Plumbing",                 group: "Mid-Ticket Trades",        avgJob: 1200,  prolnkPct: 10, referringPct: 5,  industryCACLow: 80,   industryCACHigh: 120,  type: "one-time" },
  { category: "Electrical",              group: "Mid-Ticket Trades",        avgJob: 1500,  prolnkPct: 10, referringPct: 5,  industryCACLow: 90,   industryCACHigh: 130,  type: "one-time" },
  { category: "Painting",                group: "Mid-Ticket Trades",        avgJob: 3200,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 120,  industryCACHigh: 180,  type: "one-time" },
  { category: "Flooring",                group: "Mid-Ticket Trades",        avgJob: 4500,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 150,  industryCACHigh: 220,  type: "one-time" },
  { category: "Fence Installation",      group: "Mid-Ticket Trades",        avgJob: 3500,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 120,  industryCACHigh: 180,  type: "one-time" },
  { category: "Tree Service",            group: "Mid-Ticket Trades",        avgJob: 1200,  prolnkPct: 10, referringPct: 5,  industryCACLow: 80,   industryCACHigh: 120,  type: "one-time" },
  { category: "Mold / Water Restoration",group: "Mid-Ticket Trades",        avgJob: 4500,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 200,  industryCACHigh: 350,  type: "one-time" },
  { category: "Lawn Care / Mowing",      group: "Subscription Services",    avgJob: 1680,  prolnkPct: 8,  referringPct: 4,  industryCACLow: 80,   industryCACHigh: 130,  type: "subscription" },
  { category: "Pet Waste Removal",       group: "Subscription Services",    avgJob: 1200,  prolnkPct: 5,  referringPct: 2.5,industryCACLow: 60,   industryCACHigh: 100,  type: "subscription" },
  { category: "House Cleaning",          group: "Subscription Services",    avgJob: 3840,  prolnkPct: 3,  referringPct: 1.5,industryCACLow: 90,   industryCACHigh: 150,  type: "subscription" },
  { category: "Pool Service",            group: "Subscription Services",    avgJob: 2100,  prolnkPct: 6,  referringPct: 3,  industryCACLow: 150,  industryCACHigh: 250,  type: "subscription" },
  { category: "Pest Control",            group: "Subscription Services",    avgJob: 600,   prolnkPct: 10, referringPct: 5,  industryCACLow: 120,  industryCACHigh: 180,  type: "subscription" },
  { category: "Handyman Services",       group: "Subscription Services",    avgJob: 350,   prolnkPct: 10, referringPct: 5,  industryCACLow: 100,  industryCACHigh: 160,  type: "one-time" },
];

const GROUPS = ["Financial & Professional", "High-Ticket Trades", "Mid-Ticket Trades", "Subscription Services"];

// ─── Commission Calculator ────────────────────────────────────────────────────
function CommissionCalculator() {
  const [selectedCategory, setSelectedCategory] = useState(COMMISSION_DATA[11]);
  const [jobValue, setJobValue] = useState(selectedCategory.avgJob);
  const [tier, setTier] = useState<"Connect" | "Growth" | "Elite">("Growth");

  const discountMap: Record<string, number> = { Connect: 0, Growth: 0.10, Elite: 0.20 };
  const discount = discountMap[tier];
  const effectiveProlnkPct = selectedCategory.prolnkPct * (1 - discount);
  const prolnkFee = jobValue * (effectiveProlnkPct / 100);
  const referringFee = jobValue * (selectedCategory.referringPct / 100);
  const totalFee = prolnkFee + referringFee;
  const industryCACMid = (selectedCategory.industryCACLow + selectedCategory.industryCACHigh) / 2;
  const savings = industryCACMid - totalFee;
  const savingsPct = industryCACMid > 0 ? Math.round((savings / industryCACMid) * 100) : 0;

  return (
    <div className="bg-[#0A1628] rounded-3xl p-8 md:p-10 border border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-teal-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Commission Calculator</h3>
          <p className="text-sm text-white/50">See exactly what you pay vs. Angi / Thumbtack</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Your Trade</label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50"
            value={selectedCategory.category}
            onChange={e => {
              const cat = COMMISSION_DATA.find(c => c.category === e.target.value)!;
              setSelectedCategory(cat);
              setJobValue(cat.avgJob);
            }}
          >
            {GROUPS.map(g => (
              <optgroup key={g} label={g}>
                {COMMISSION_DATA.filter(c => c.group === g).map(c => (
                  <option key={c.category} value={c.category}>{c.category}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Average Job Value</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
            <input
              type="number"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white text-sm focus:outline-none focus:border-teal-500/50"
              value={jobValue}
              onChange={e => setJobValue(Number(e.target.value))}
              min={100}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">Your Plan</label>
          <div className="flex gap-2">
            {(["Connect", "Growth", "Elite"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  tier === t
                    ? "bg-teal-500 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "ProLnk Platform Fee", value: `$${Math.round(prolnkFee).toLocaleString()}`, sub: `${effectiveProlnkPct.toFixed(1)}% of job`, color: "text-white" },
          { label: "Referring Pro Share", value: `$${Math.round(referringFee).toLocaleString()}`, sub: `${selectedCategory.referringPct}% of job`, color: "text-white" },
          { label: "Your Total Cost", value: `$${Math.round(totalFee).toLocaleString()}`, sub: "per closed job", color: "text-teal-400" },
          { label: "vs. Industry CAC", value: savings > 0 ? `Save ${savingsPct}%` : "Comparable", sub: `Industry avg: $${Math.round(industryCACMid).toLocaleString()}`, color: savings > 0 ? "text-emerald-400" : "text-amber-400" },
        ].map(item => (
          <div key={item.label} className="bg-white/5 rounded-2xl p-5">
            <p className="text-xs text-white/40 mb-1">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-white/40 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {savings > 0 && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm text-emerald-300">
            You save <strong>${Math.round(savings).toLocaleString()}</strong> per closed job compared to the industry average CAC of <strong>${Math.round(industryCACMid).toLocaleString()}</strong> — and ProLnk leads are warm (homeowner already in project mode).
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>("All");

  const faqs = [
    {
      q: "How does the 30-day free trial work?",
      a: "You get full access to your chosen plan for 30 days with no credit card required. At the end of the trial, you choose to subscribe or walk away — no charges, no hassle. We're confident you'll see ROI before the trial ends.",
    },
    {
      q: "Is the commission charged on every job, or just ProLnk-sourced jobs?",
      a: "Commission is only charged when ProLnk is the verified source of the introduction. Jobs you find on your own, repeat customers, or referrals from outside the network are never subject to commission. You pay only for value we deliver.",
    },
    {
      q: "What's the difference between the platform fee and the referring pro share?",
      a: "The platform fee goes to ProLnk for the AI matching, verification system, and platform infrastructure. The referring pro share goes directly to the partner in the network who identified the opportunity and referred it to you. Together they replace your entire traditional CAC.",
    },
    {
      q: "Can I upgrade or downgrade my plan at any time?",
      a: "Yes. You can change plans at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the next billing cycle.",
    },
    {
      q: "What are the commercial tiers for?",
      a: "The commercial tiers are for contractors who work on commercial properties — office buildings, retail centers, HOA communities, property management portfolios, and institutional clients. These are powered by the ProLnk Exchange platform, which is a separate commercial marketplace launching in 2025.",
    },
    {
      q: "Does the commission discount stack with annual billing?",
      a: "Yes. Annual billing saves you 2 months of subscription cost, and the commission discount (10% on Growth, 20% on Elite) applies to every job regardless of billing cycle.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D1A] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060D1A]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <ProLnkLogo className="h-7 w-auto cursor-pointer" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/apply">
              <button className="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 text-sm text-teal-300 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            30-day free trial on all plans — no credit card required
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight"
          >
            Pay only for{" "}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              jobs you close
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 mb-10 max-w-2xl mx-auto"
          >
            Simple subscription + commission only when ProLnk is the source. No pay-per-lead. No fake leads. No wasted budget.
          </motion.p>

          {/* Annual toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 bg-white/5 rounded-2xl p-1.5"
          >
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${!annual ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
            >
              Annual
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">Save 17%</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Residential Tiers */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-2">Residential Plans</p>
            <h2 className="text-3xl font-bold text-white">For home service professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {RESIDENTIAL_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border p-8 bg-gradient-to-br ${tier.accentBg} ${tier.borderColor} ${tier.popular ? "scale-105 shadow-2xl shadow-emerald-500/10" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <Star className="w-3 h-3" /> Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${tier.badgeColor}`}>
                    {tier.id === "connect" && <Zap className="w-3 h-3" />}
                    {tier.id === "growth" && <TrendingUp className="w-3 h-3" />}
                    {tier.id === "elite" && <Crown className="w-3 h-3" />}
                    {tier.name}
                  </div>
                  <p className="text-white/50 text-sm mb-4">{tier.subtitle}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">
                      ${annual ? tier.annualPrice : tier.price}
                    </span>
                    <span className="text-white/40 text-sm mb-2">/mo{annual ? " billed annually" : ""}</span>
                  </div>
                  {annual && (
                    <p className="text-emerald-400 text-xs mt-1">
                      Save ${(tier.price - tier.annualPrice) * 12}/year
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className={`flex items-start gap-3 text-sm ${f.included ? "text-white/80" : "text-white/25"}`}>
                      {f.included
                        ? <Check className={`w-4 h-4 shrink-0 mt-0.5 ${(f as any).highlight ? "text-teal-400" : "text-emerald-400"}`} />
                        : <X className="w-4 h-4 shrink-0 mt-0.5 text-white/20" />
                      }
                      <span className={(f as any).highlight ? "text-teal-300 font-medium" : ""}>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/apply">
                  <button
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                      tier.popular
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </Link>

                {tier.commissionDiscount > 0 && (
                  <p className="text-center text-xs text-white/30 mt-3">
                    Includes {tier.commissionDiscount}% commission discount on all jobs
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Trial callout */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              All plans include a <strong className="text-white/70">30-day free trial</strong> with full feature access. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Commission Calculator */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">See your exact cost</h2>
            <p className="text-white/50">Compare ProLnk commission to what you currently spend on leads</p>
          </div>
          <CommissionCalculator />
        </div>
      </section>

      {/* Commercial Tiers */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 text-sm text-amber-300 mb-4">
              <Building2 className="w-4 h-4" />
              ProLnk Exchange — Commercial Platform
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">For commercial contractors</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Office buildings, retail centers, HOA communities, and property management portfolios.
              The ProLnk Exchange is a separate commercial marketplace launching in 2025.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {COMMERCIAL_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border p-8 bg-gradient-to-br ${tier.accentBg} ${tier.borderColor} ${(tier as any).popular ? "scale-105 shadow-2xl" : ""}`}
              >
                {(tier as any).popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">Commercial</p>
                  <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-white/50 text-sm mb-4">{tier.subtitle}</p>
                  {tier.price ? (
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-white">
                        ${annual && tier.annualPrice ? tier.annualPrice : tier.price}
                      </span>
                      <span className="text-white/40 text-sm mb-1">/mo</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-black text-white">Custom</div>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://exchange.prolnk.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all bg-white/10 text-white hover:bg-white/20 flex items-center justify-center gap-2"
                >
                  Visit ProLnk Exchange
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-white/30 text-sm">
              ProLnk Exchange is currently in development. Join the waitlist to be notified at launch.
            </p>
            <a
              href="https://exchange.prolnk.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
            >
              Learn more about ProLnk Exchange <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Commission Table */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Commission rates by trade</h2>
            <p className="text-white/50">Commission is only charged when ProLnk is the verified source of the introduction</p>
          </div>

          {/* Group filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {["All", ...GROUPS].map(g => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeGroup === g ? "bg-teal-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-6 py-4 text-white/50 font-medium">Service Category</th>
                  <th className="text-right px-4 py-4 text-white/50 font-medium">Avg Job</th>
                  <th className="text-right px-4 py-4 text-white/50 font-medium">ProLnk Fee</th>
                  <th className="text-right px-4 py-4 text-white/50 font-medium">Referring Pro</th>
                  <th className="text-right px-4 py-4 text-white/50 font-medium">Your Total</th>
                  <th className="text-right px-6 py-4 text-white/50 font-medium">Industry CAC</th>
                </tr>
              </thead>
              <tbody>
                {COMMISSION_DATA
                  .filter(c => activeGroup === "All" || c.group === activeGroup)
                  .map((c, i) => {
                    const prolnkFee = c.avgJob * (c.prolnkPct / 100);
                    const refFee = c.avgJob * (c.referringPct / 100);
                    const total = prolnkFee + refFee;
                    const cacMid = (c.industryCACLow + c.industryCACHigh) / 2;
                    const savings = Math.round(((cacMid - total) / cacMid) * 100);
                    return (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{c.category}</span>
                            {c.type === "subscription" && (
                              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">Year 1</span>
                            )}
                            {(c as any).capNote && (
                              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">{(c as any).capNote}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-white/60">${c.avgJob.toLocaleString()}</td>
                        <td className="px-4 py-4 text-right text-white/60">{c.prolnkPct}% (${Math.round(prolnkFee).toLocaleString()})</td>
                        <td className="px-4 py-4 text-right text-white/60">{c.referringPct}% (${Math.round(refFee).toLocaleString()})</td>
                        <td className="px-4 py-4 text-right font-semibold text-teal-400">${Math.round(total).toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-white/40">${Math.round(cacMid).toLocaleString()}</span>
                            {savings > 0 && (
                              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                                Save {savings}%
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <p className="text-center text-white/30 text-xs mt-4">
            Commission applies only to ProLnk-sourced introductions. Subscription services charged on Year 1 annual value only.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
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
          <div className="bg-gradient-to-br from-teal-500/10 to-emerald-500/5 border border-teal-500/20 rounded-3xl p-12">
            <Rocket className="w-12 h-12 text-teal-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white mb-4">
              Start your free trial today
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              30 days. Full access. No credit card. If you don't see ROI in the first month, you owe nothing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-teal-500/25 flex items-center gap-2">
                  Apply as a Partner <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/advertise">
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all">
                  Advertise with Us
                </button>
              </Link>
            </div>
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
            <Link href="/advertise" className="hover:text-white/60 transition-colors">Advertise</Link>
            <Link href="/apply" className="hover:text-white/60 transition-colors">Apply</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
