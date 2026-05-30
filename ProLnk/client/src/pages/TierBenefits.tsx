import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle, Lock, DollarSign, Users, Home, Award, TrendingUp,
  RefreshCw, HelpCircle, ArrowRight, ChevronDown, ChevronUp,
  Star, Zap, Shield, Tag, Clock, Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TIERS = [
  {
    name: "Charter Member",
    shortName: "Charter",
    slots: 25,
    range: "Positions 1–25",
    fee: 149,
    keepRate: 72,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/40",
    badgeBg: "bg-amber-400/20 text-amber-400 border-amber-400/30",
    accentBar: "bg-amber-400",
    featured: true,
    originationRights: true,
    jobOverrides: ["7%", "4%", "2%", "1%"],
    subOverrides: ["12%", "6%", "3%", "1.5%"],
    benefits: [
      "First 25 positions — founding status forever",
      "$149/mo subscription locked forever",
      "60% commission keep rate on every job",
      "90-day free trial — no credit card required",
      "7% / 4% / 2% / 1% job override cascade (4 levels)",
      "12% / 6% / 3% / 1.5% subscription override cascade",
      "1.5% home origination rights — Charter-exclusive, permanent",
      "Founding network badge (cannot be replicated)",
      "Priority access to new features and markets",
      "Direct line to ProLnk founding team",
    ],
  },
  {
    name: "Founding Member",
    shortName: "Founding",
    slots: 100,
    range: "Positions 26–125",
    fee: 149,
    keepRate: 72,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    badgeBg: "bg-teal-400/20 text-teal-400 border-teal-400/30",
    accentBar: "bg-teal-400",
    featured: false,
    originationRights: false,
    jobOverrides: ["7%", "4%", "2%", "1%"],
    subOverrides: ["12%", "6%", "3%", "1.5%"],
    benefits: [
      "Positions 26–125 — founding status forever",
      "$149/mo subscription locked forever",
      "60% commission keep rate on every job",
      "90-day free trial — no credit card required",
      "7% / 4% / 2% / 1% job override cascade (4 levels)",
      "12% / 6% / 3% / 1.5% subscription override cascade",
      "Founding network badge (permanent designation)",
      "Early access to new features and markets",
    ],
  },
  {
    name: "Level 3 Partner",
    shortName: "Level 3",
    slots: 400,
    range: "Positions 126–525",
    fee: 149,
    keepRate: 72,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/30",
    badgeBg: "bg-indigo-400/20 text-indigo-400 border-indigo-400/30",
    accentBar: "bg-indigo-400",
    featured: false,
    originationRights: false,
    jobOverrides: ["7%", "4%", "2%", "1%"],
    subOverrides: ["12%", "6%", "3%", "1.5%"],
    benefits: [
      "Positions 126–525 — founding status forever",
      "$149/mo subscription locked forever",
      "60% commission keep rate on every job",
      "90-day free trial — no credit card required",
      "7% / 4% / 2% / 1% job override cascade (4 levels)",
      "12% / 6% / 3% / 1.5% subscription override cascade",
      "Founding network badge",
    ],
  },
  {
    name: "Level 4 Partner",
    shortName: "Level 4",
    slots: 1600,
    range: "Positions 526–2,125",
    fee: 149,
    keepRate: 72,
    color: "text-slate-300",
    bg: "bg-slate-700/40",
    border: "border-slate-600/40",
    badgeBg: "bg-slate-700/60 text-slate-300 border-slate-600/40",
    accentBar: "bg-slate-500",
    featured: false,
    originationRights: false,
    jobOverrides: ["7%", "4%", "2%", "1%"],
    subOverrides: ["12%", "6%", "3%", "1.5%"],
    benefits: [
      "Positions 526–2,125 — founding status forever",
      "$149/mo subscription locked forever",
      "60% commission keep rate on every job",
      "90-day free trial — no credit card required",
      "7% / 4% / 2% / 1% job override cascade (4 levels)",
      "12% / 6% / 3% / 1.5% subscription override cascade",
      "Founding network badge",
    ],
  },
];

const FAQS = [
  {
    q: "What happens after the waitlist closes?",
    a: "Once 500 applications are received, the founding program closes permanently. No new founding members will ever be added. Anyone joining after that pays $199/mo and receives lower commission rates. Founding status — and the $149/mo locked rate — exists only for the 2,125 people in this program.",
  },
  {
    q: "Can I lose my founding status?",
    a: "No. Your founding status is contractually guaranteed. As long as your subscription remains active, you keep your position, rate lock, and all network income rights. You cannot be downgraded or removed from the founding network.",
  },
  {
    q: "What are Home Origination Rights?",
    a: "Charter Members (positions 1–25) earn 1.5% of the ProLnk platform fee on every job completed at any home they document in the Home Health Vault. This is a permanent, passive income stream. For example: a Charter member documents 200 homes. Every time any pro completes a job at any of those 200 homes — even if the Charter member is no longer active — they earn 1.5% of the platform fee on that job, forever.",
  },
  {
    q: "Why do all tiers pay the same $149/mo?",
    a: "Every founding partner gets identical economics — the same keep rate, the same override cascade, the same locked subscription. The only difference is your enrollment position, which determines your tier name and whether you qualify for Charter-exclusive origination rights. All 2,125 founding pros built this platform together, so all 2,125 are compensated equally.",
  },
  {
    q: "How does the 4-level job override cascade work?",
    a: "When someone you recruited (Level 1) completes a job, you earn 7% of the platform fee on that job. When someone they recruited (Level 2) completes a job, you earn 4%. Level 3 earns you 2%, Level 4 earns you 1%. This runs automatically, every job, every month, without any action required on your part.",
  },
  {
    q: "What is the subscription override?",
    a: "When a pro you recruited pays their $149/mo (or $199/mo post-launch) subscription, you earn 12% of that payment. That's $17.88/mo per direct recruit, automatically, every month they remain active. Level 2 pays you 6%, Level 3 pays 3%, Level 4 pays 1.5%.",
  },
  {
    q: "Do I need to be a licensed contractor?",
    a: "Yes. ProLnk matches licensed, insured home service professionals with homeowners. You'll need to provide proof of license and insurance during onboarding. Trades include HVAC, plumbing, electrical, roofing, pest control, landscaping, painting, foundation repair, and more.",
  },
  {
    q: "When does my 90-day trial start?",
    a: "Your trial starts the day you complete onboarding — not when you apply. You can apply for the waitlist now (no credit card), complete your profile, and your 90-day trial clock starts when ProLnk verifies your license and activates your account.",
  },
];

function OverrideTable({ jobRates, subRates }: { jobRates: string[]; subRates: string[] }) {
  const levels = ["L1 — Direct recruits", "L2 — Their recruits", "L3 — 3rd level", "L4 — 4th level"];
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 text-xs">
      <div className="grid grid-cols-3 bg-slate-900/60">
        <div className="px-3 py-2 text-slate-500 font-semibold">Level</div>
        <div className="px-3 py-2 text-teal-400 font-semibold">Job %</div>
        <div className="px-3 py-2 text-indigo-400 font-semibold">Sub %</div>
      </div>
      {levels.map((lvl, i) => (
        <div key={i} className="grid grid-cols-3 border-t border-slate-800 hover:bg-slate-800/30 transition-colors">
          <div className="px-3 py-2 text-slate-400">{lvl}</div>
          <div className="px-3 py-2 text-teal-300 font-bold">{jobRates[i]}</div>
          <div className="px-3 py-2 text-indigo-300 font-bold">{subRates[i]}</div>
        </div>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border transition-all ${open ? "border-teal-500/40 bg-teal-400/5" : "border-slate-700 bg-slate-800/50"}`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
        onClick={() => setOpen(o => !o)}
      >
        <span className={`text-sm font-semibold ${open ? "text-white" : "text-slate-200"}`}>{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-teal-400 shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-teal-500/20 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function TierBenefits() {
  const [charterCode, setCharterCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);

  const handleCode = (val: string) => {
    const upper = val.toUpperCase().trim();
    setCharterCode(upper);
    setCodeValid(/^[A-Z0-9]{8}$/.test(upper));
  };

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>Tier Benefits — ProLnk Founding Partner Program</title>
        <meta name="description" content="Charter, Founding, Level 3, Level 4 — 2,125 founding spots, all at $149/mo locked forever. See every benefit, commission rate, and exclusive perk." />
        <meta property="og:title" content="ProLnk Tier Benefits — 2,125 Founding Spots, $149/mo Forever" />
        <meta property="og:description" content="All 4 tiers: $149/mo locked, 60% keep rate, 4-level network income. Charter members get exclusive origination rights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.io/tier-benefits" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://prolnk.io/tier-benefits" />
      </Helmet>

      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="font-black text-teal-400 text-xl">ProLnk</Link>
        <div className="flex items-center gap-3">
          <Link href="/founding-partner" className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block">
            Program Overview
          </Link>
          <Link href="/commission-calculator" className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block">
            Calculator
          </Link>
          <Link href="/partner-checkout">
            <Button size="sm" className="bg-teal-500 hover:bg-teal-400 text-white">Claim Your Spot</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <Badge className="bg-teal-500/10 text-teal-400 border-teal-500/20 mb-5 text-sm px-4 py-1.5">
          Founding Network — 2,125 Total Spots
        </Badge>
        <h1 className="text-5xl font-black text-white leading-tight mb-4">
          Every Tier. Every Benefit.<br />
          <span className="text-teal-400">One Locked Rate.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          All 2,125 founding partners pay $149/mo, keep 60% of every job, and earn the same 4-level network income.
          Position determines your tier name — and whether you unlock Charter-exclusive origination rights.
        </p>
      </section>

      {/* Tier cards — 2-col responsive grid */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-5">
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all bg-[#0d1e35] ${tier.featured ? `${tier.border} shadow-lg shadow-amber-400/10` : tier.border}`}
            >
              {/* Card header */}
              <div className={`px-6 py-5 border-b ${tier.border} ${tier.bg}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className={`font-black text-xl ${tier.color}`}>{tier.name}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{tier.range}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-black text-2xl">{tier.slots.toLocaleString()}</div>
                    <div className="text-slate-500 text-xs">spots</div>
                  </div>
                </div>
                {tier.featured && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="text-amber-400 text-xs font-semibold">Most exclusive — Charter-only origination rights</span>
                  </div>
                )}
              </div>

              {/* Pricing row */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-white">
                    $149<span className="text-base font-normal text-slate-400">/mo</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Lock className="w-3 h-3" />
                    Locked forever — post-launch price: $199/mo
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black ${tier.color}`}>60%</div>
                  <div className="text-xs text-slate-500">commission keep</div>
                </div>
              </div>

              {/* Network overrides table */}
              <div className="px-6 py-4 border-b border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Network Income Rates
                </div>
                <OverrideTable jobRates={tier.jobOverrides} subRates={tier.subOverrides} />
              </div>

              {/* Charter origination block */}
              {tier.originationRights && (
                <div className="px-6 py-4 border-b border-amber-400/20 bg-amber-400/5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-amber-400 text-sm font-bold">1.5% Home Origination Rights</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        Charter-exclusive. Document a home — earn forever on every job at that address.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits checklist */}
              <div className="px-6 py-5">
                <div className="text-xs font-semibold text-slate-400 mb-3">Included Benefits</div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.color}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link href="/partner-checkout">
                  <button
                    className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                      tier.featured
                        ? "bg-amber-400 hover:bg-amber-300 text-gray-900"
                        : "bg-teal-500 hover:bg-teal-400 text-white"
                    }`}
                  >
                    Claim a {tier.shortName} Spot
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Origination rights explainer */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-amber-400/5 to-transparent border border-amber-400/20 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">What Are Home Origination Rights?</h2>
              <span className="text-amber-400 text-xs font-semibold">Charter Members Only — Positions 1–25</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            When a Charter Member documents a home in the ProLnk Home Health Vault, they earn{" "}
            <strong className="text-amber-400">1.5%</strong> of the ProLnk platform fee on every job completed at
            that address — forever. Even if the Charter Member is no longer active. Even if a different pro does the work.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-center mb-5">
            {[
              { label: "Document a home",        desc: "Add property details and health records to the Vault",    color: "text-amber-400" },
              { label: "Any pro completes work",  desc: "A plumber, electrician, or roofer closes a job there",    color: "text-teal-400" },
              { label: "You earn forever",         desc: "1.5% of the platform fee hits your account automatically", color: "text-green-400" },
            ].map((step, i) => (
              <div key={i} className="bg-slate-900/40 rounded-xl p-4 border border-slate-700">
                <div className={`text-sm font-bold mb-1 ${step.color}`}>{step.label}</div>
                <div className="text-slate-500 text-xs">{step.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs text-center">
            Example: You document 500 homes. 50 jobs/mo across those homes × avg $2,000 job × 12% pool × 1.5% =&nbsp;
            <strong className="text-amber-400">$180/mo passive, indefinitely.</strong>
          </p>
        </div>
      </section>

      {/* Side-by-side comparison table */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-black text-white text-center mb-2">All Tiers at a Glance</h2>
        <p className="text-slate-500 text-sm text-center mb-8">Every tier shares identical economics — position number is the only variable.</p>
        <div className="overflow-x-auto rounded-2xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/60">
                <th className="text-left px-4 py-3 text-slate-500 font-medium w-44">Feature</th>
                {TIERS.map((t, i) => (
                  <th key={i} className={`px-4 py-3 font-bold text-center ${t.color}`}>{t.shortName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Positions",          vals: ["1–25", "26–125", "126–525", "526–2,125"] },
                { label: "Total spots",        vals: ["25", "100", "400", "1,600"] },
                { label: "Monthly fee",        vals: ["$149/mo ∞", "$149/mo ∞", "$149/mo ∞", "$149/mo ∞"] },
                { label: "Commission keep",    vals: ["60%", "60%", "60%", "60%"] },
                { label: "Job override L1",    vals: ["7%", "7%", "7%", "7%"] },
                { label: "Job override L2",    vals: ["4%", "4%", "4%", "4%"] },
                { label: "Job override L3",    vals: ["2%", "2%", "2%", "2%"] },
                { label: "Job override L4",    vals: ["1%", "1%", "1%", "1%"] },
                { label: "Sub override L1",    vals: ["12%", "12%", "12%", "12%"] },
                { label: "Sub override L2",    vals: ["6%", "6%", "6%", "6%"] },
                { label: "Sub override L3",    vals: ["3%", "3%", "3%", "3%"] },
                { label: "Sub override L4",    vals: ["1.5%", "1.5%", "1.5%", "1.5%"] },
                { label: "90-day trial",       vals: ["✓", "✓", "✓", "✓"] },
                { label: "Origination rights", vals: ["1.5% ∞", "—", "—", "—"] },
              ].map((row, ri) => (
                <tr key={ri} className={`border-b border-slate-800 ${ri % 2 === 0 ? "bg-slate-900/20" : ""}`}>
                  <td className="px-4 py-3 text-slate-400 text-xs">{row.label}</td>
                  {row.vals.map((val, vi) => (
                    <td key={vi} className={`px-4 py-3 text-center text-xs font-medium ${
                      val === "✓" ? "text-teal-400" :
                      val === "—" ? "text-slate-700" :
                      val.includes("1.5% ∞") ? "text-amber-400 font-bold" :
                      val.includes("∞") ? "text-teal-300 font-bold" :
                      "text-slate-200"
                    }`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <HelpCircle className="w-5 h-5 text-teal-400" />
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-b from-teal-500/10 to-transparent border border-teal-500/20 rounded-3xl p-12">
          <h2 className="text-4xl font-black text-white mb-3">Ready to claim your spot?</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Once 500 applications are received, the founding program closes permanently.
            Your position number determines your tier — join sooner for Charter access.
          </p>

          {/* Charter code input */}
          <div className="max-w-xs mx-auto mb-6">
            <div className="bg-slate-900/60 border border-amber-400/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Have a Charter Code?</span>
              </div>
              <input
                type="text"
                value={charterCode}
                onChange={e => handleCode(e.target.value)}
                placeholder="e.g. CHARTER1"
                maxLength={8}
                className={`w-full bg-slate-900 border rounded-lg px-3 py-2 text-sm font-mono tracking-widest text-center text-white placeholder-slate-600 outline-none transition-colors ${
                  codeValid ? "border-amber-400 ring-1 ring-amber-400/30" : "border-slate-700 focus:border-amber-400/50"
                }`}
              />
              {codeValid && (
                <p className="text-amber-400 text-xs text-center mt-2 flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Charter code applied!
                </p>
              )}
              {!codeValid && (
                <p className="text-slate-600 text-xs text-center mt-2">Enter a personal invite code to claim a Charter spot.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={charterCode && codeValid ? `/partner-checkout?code=${charterCode}` : "/partner-checkout"}>
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-400 text-white font-black text-lg px-10 py-4 h-auto rounded-xl"
              >
                {codeValid ? "Claim Charter Spot →" : "Join the Waitlist →"}
              </Button>
            </Link>
            <Link href="/founding-partner">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-700 text-slate-300 hover:border-teal-400/50 hover:text-teal-400 font-semibold px-8 py-4 h-auto rounded-xl bg-transparent"
              >
                Program Overview
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> 90-day free trial</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> $149/mo locked forever</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> No credit card to start</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        © 2026 ProLnk LLC · DFW, Texas ·{" "}
        <Link href="/legal/terms" className="hover:text-slate-400">Terms</Link>
        {" "}·{" "}
        <Link href="/legal/privacy" className="hover:text-slate-400">Privacy</Link>
      </footer>
    </div>
  );
}
