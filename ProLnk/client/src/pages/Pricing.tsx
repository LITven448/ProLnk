import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ProLnkLogo } from "@/components/ProLnkLogo";
import { Check, ArrowRight, ChevronDown, ChevronUp, Zap, Building2, Star, Shield } from "lucide-react";

// ─── Tier definitions ──────────────────────────────────────────────────────────
// Three tiers + Enterprise. Keep rates: 40% / 50% / 60%.
// ProLnk always retains a minimum of 20% of the commission pool.
// No founding network or cascade language anywhere on this page.

const TIERS = [
  {
    id: "scout",
    name: "Scout",
    price: 99,
    keep: 40,
    tagline: "For solo pros getting started with AI-matched leads.",
    color: "#0EA5E9",
    popular: false,
    cta: "Start Free Trial",
    features: [
      "AI-matched homeowner leads in your service area",
      "40% commission keep on every completed job",
      "PhotoScan AI — review job photos before accepting",
      "Storm alert leads — real-time weather damage notifications",
      "Partner directory listing",
      "1 user seat",
      "Standard lead priority ranking",
      "90-day free trial, no credit card required",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    keep: 50,
    tagline: "For growing businesses that want more leads and a bigger cut.",
    color: "#14B8A6",
    popular: true,
    cta: "Start Free Trial",
    features: [
      "Everything in Scout, plus:",
      "50% commission keep — 10 points more per job",
      "Priority lead ranking over Scout members",
      "3 user seats — manage your team in one account",
      "ProLnk Exchange — bid on and post residential & commercial jobs",
      "Advanced lead filters by trade, zip, and job size",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 249,
    keep: 60,
    tagline: "For established companies running at full scale.",
    color: "#F59E0B",
    popular: false,
    cta: "Start Free Trial",
    features: [
      "Everything in Pro, plus:",
      "60% commission keep — maximum rate on the platform",
      "Top-tier lead ranking — highest priority in the algorithm",
      "8 user seats with role-based access",
      "Dedicated account manager",
      "Custom service area territories",
      "Early access to new platform features",
    ],
  },
];

const ENTERPRISE = {
  features: [
    "Unlimited user seats",
    "Negotiated commission keep rate",
    "Dedicated implementation & support team",
    "Custom territory and lead routing rules",
    "API access for your existing systems",
    "SLA-backed uptime and priority incident response",
    "Quarterly business reviews",
  ],
};

const FAQS = [
  {
    q: "How does the commission pool work?",
    a: "ProLnk takes 3–12% of the completed job value as a platform fee (varies by trade type and job size — in line with typical industry referral rates). Of that pool, you keep your tier's percentage. ProLnk always retains a minimum of 20% to cover platform operations, AI analysis, and lead sourcing. You keep 100% of everything you charge the homeowner — the platform fee is collected separately.",
  },
  {
    q: "Is there a background check requirement?",
    a: "Yes. All ProLnk members are required to pass a background check before accessing leads. The one-time $35 fee is paid by you at onboarding — we use Checkr, the same service used by Uber, Lyft, and DoorDash. Once you submit your application, you'll receive an email with a secure link to complete the check. Most results come back within 24–48 hours. If your check clears, your account activates automatically. The $35 is a one-time cost — no annual renewal required.",
  },
  {
    q: "When do I get paid?",
    a: "ProLnk's AI tracks payments through to completion — whether the homeowner pays all at once, in installments, or on net-30/60/90 terms. Your commission is released once payment clears, not when the job is invoiced.",
  },
  {
    q: "What counts as a completed job?",
    a: "A job is marked complete when the homeowner confirms completion in the app or payment is received in full. Our AI monitors payment status in real time so your earnings are always up to date.",
  },
  {
    q: "How do I access commercial jobs?",
    a: "Commercial job access is available on the Business plan ($249/mo) and requires ProPass verification — a one-time credential check that confirms your commercial trade license and liability insurance coverage. Once verified, you unlock the commercial job board (Briefcase) where you can bid on larger commercial and multi-trade projects. Commercial jobs typically carry higher job values and ProLnk's commission rate reflects that accordingly.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. You can upgrade at any time and your new keep rate applies immediately to all future completed jobs. Downgrading is available at the end of your billing cycle.",
  },
  {
    q: "What is the 90-day free trial?",
    a: "All plans include a 90-day free trial with no credit card required for the subscription. The one-time $35 background check fee applies at the start of your trial. You get full platform access from day one and subscription billing begins on day 91.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No contracts. All plans are month-to-month. Cancel any time before your next billing date.",
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing] = useState<"monthly">("monthly");

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Helmet>
        <title>ProLnk Pricing — Keep up to 60% of Every Referral Commission</title>
        <meta name="description" content="Simple month-to-month pricing for home service pros. Plans from $99/mo with a 90-day free trial. Keep up to 60% of every commission, AI-matched leads, and real-time payment tracking. No contracts." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ProLnk Pricing — Keep up to 60% of Every Referral Commission" />
        <meta property="og:description" content="Simple month-to-month pricing for home service pros. Plans from $99/mo with a 90-day free trial. Keep up to 60% of every commission. No contracts." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prolnk.xyz/pricing" />
        <meta property="og:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ProLnk Pricing — Keep up to 60% of Every Referral Commission" />
        <meta name="twitter:description" content="Plans from $99/mo with a 90-day free trial. Keep up to 60% of every commission. No contracts." />
        <meta name="twitter:image" content="https://pub-ee8fee527ee84997b9eae6e57cd17168.r2.dev/prolnk-hero-house_ad6a73f1.webp" />
        <link rel="canonical" href="https://prolnk.xyz/pricing" />
      </Helmet>

      {/* Nav */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="bg-white rounded-xl px-3 py-1.5 inline-block cursor-pointer">
              <ProLnkLogo height={32} />
            </div>
          </Link>
          <Link href="/apply">
            <button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
              Apply Now
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 text-center px-6">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 mb-6">
          <Zap className="w-3.5 h-3.5 text-[#0EA5E9]" />
          90-day free trial on all plans · No credit card required
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          Simple pricing.<br />
          <span className="text-[#0EA5E9]">Keep more of what you earn.</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          AI-matched leads, real-time payment tracking, and commission rates that scale with your business.
        </p>
      </section>

      {/* Background check notice */}
      <section className="max-w-3xl mx-auto px-6 pb-6">
        <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
          <Shield className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
          <div>
            <span className="text-sm font-semibold text-white/90">One-time $35 background check required for all plans.</span>
            <span className="text-sm text-white/50 ml-1">Processed automatically through Checkr. Most results in 24–48 hours. Account activates the moment your check clears — no manual review needed.</span>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border bg-white/5 backdrop-blur-sm flex flex-col ${
                tier.popular
                  ? "border-[#14B8A6]/60 ring-1 ring-[#14B8A6]/30"
                  : "border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#14B8A6] text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 pb-4">
                {/* Tier name + keep rate badge */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: tier.color }}>
                    {tier.name}
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: tier.color + "20", color: tier.color }}
                  >
                    {tier.keep}% keep
                  </span>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-4xl font-black">${tier.price}</span>
                  <span className="text-white/40 text-sm">/mo</span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6">{tier.tagline}</p>

                <Link href="/apply">
                  <button
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                    style={{
                      backgroundColor: tier.popular ? tier.color : "transparent",
                      color: tier.popular ? "#fff" : tier.color,
                      border: `1.5px solid ${tier.color}`,
                    }}
                  >
                    {tier.cta}
                    <ArrowRight className="inline-block w-4 h-4 ml-1.5 -mt-0.5" />
                  </button>
                </Link>
              </div>

              {/* Feature list */}
              <div className="px-6 pb-6 pt-2 flex-1">
                <div className="border-t border-white/10 pt-4 space-y-3">
                  {tier.features.map((feat, i) => {
                    const isHeader = feat.startsWith("Everything in");
                    return (
                      <div key={i} className={`flex items-start gap-2.5 ${isHeader ? "pt-1" : ""}`}>
                        {isHeader ? (
                          <span className="text-xs text-white/40 font-semibold uppercase tracking-wider w-full">{feat}</span>
                        ) : (
                          <>
                            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tier.color }} />
                            <span className="text-sm text-white/70 leading-snug">{feat}</span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commission keep comparison bar */}
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-4">Commission Keep Rate by Plan</p>
          <div className="space-y-3">
            {TIERS.map((tier) => (
              <div key={tier.id} className="flex items-center gap-4">
                <span className="text-sm text-white/60 w-20">{tier.name}</span>
                <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${tier.keep}%`, backgroundColor: tier.color }}
                  />
                </div>
                <span className="text-sm font-bold" style={{ color: tier.color }}>{tier.keep}%</span>
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/60 w-20">Enterprise</span>
              <div className="flex-1 bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div className="h-full rounded-full bg-white/40" style={{ width: "80%" }} />
              </div>
              <span className="text-sm font-bold text-white/50">Custom</span>
            </div>
          </div>
          <p className="text-xs text-white/30 mt-4">ProLnk retains a minimum of 20% of the commission pool to cover platform operations, AI analysis, and lead sourcing.</p>
        </div>

        {/* Enterprise */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-5 h-5 text-white/40" />
                <span className="text-sm font-bold uppercase tracking-widest text-white/40">Enterprise</span>
              </div>
              <h3 className="text-xl font-black mb-2">Built for large operations</h3>
              <p className="text-white/50 text-sm mb-4">Custom seat counts, negotiated rates, API access, and a dedicated team for companies with complex needs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ENTERPRISE.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-white/30 shrink-0" />
                    <span className="text-sm text-white/50">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <a href="mailto:hello@prolnk.xyz">
                <button className="bg-white text-[#0A1628] font-bold px-6 py-3 rounded-xl text-sm hover:bg-white/90 transition-colors">
                  Contact Sales
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-black text-center mb-8">What's included at each level</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-white/40 font-medium w-1/2"></th>
                {TIERS.map(t => (
                  <th key={t.id} className="text-center py-3 font-bold" style={{ color: t.color }}>{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { label: "Commission keep rate",   vals: ["40%", "50%", "60%"] },
                { label: "Monthly price",          vals: ["$99", "$149", "$249"] },
                { label: "User seats",             vals: ["1", "3", "8"] },
                { label: "AI-matched leads",       vals: ["✓", "✓", "✓"] },
                { label: "PhotoScan AI",           vals: ["✓", "✓", "✓"] },
                { label: "Storm alert leads",      vals: ["✓", "✓", "✓"] },
                { label: "Lead ranking",           vals: ["Standard", "Priority", "Top"] },
                { label: "ProLnk Exchange",        vals: ["—", "✓", "✓"] },
                { label: "Advanced lead filters",  vals: ["—", "✓", "✓"] },
                { label: "Custom territory",       vals: ["—", "—", "✓"] },
                { label: "Dedicated account mgr",  vals: ["—", "—", "✓"] },
                { label: "Commercial job access",   vals: ["—", "—", "✓ + ProPass"] },
                { label: "Background check (one-time)", vals: ["$35", "$35", "$35"] },
                { label: "90-day free trial",      vals: ["✓", "✓", "✓"] },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-3 text-white/60">{row.label}</td>
                  {row.vals.map((val, j) => (
                    <td key={j} className="py-3 text-center">
                      {val === "✓" ? (
                        <Check className="w-4 h-4 mx-auto text-[#0EA5E9]" />
                      ) : val === "—" ? (
                        <span className="text-white/20">—</span>
                      ) : (
                        <span className="font-semibold text-white/80">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-black text-center mb-8">Common questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-sm text-white/90">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 shrink-0 text-white/40" />
                  : <ChevronDown className="w-4 h-4 shrink-0 text-white/40" />
                }
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-white/60 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/10 py-16 text-center px-6">
        <Star className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4" />
        <h2 className="text-2xl font-black mb-3">Start your 90-day free trial</h2>
        <p className="text-white/50 text-sm mb-6 max-w-sm mx-auto">No credit card. No contracts. Full platform access from day one.</p>
        <Link href="/apply">
          <button className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2">
            Apply to Join ProLnk
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
        <p className="text-white/30 text-xs mt-4">Questions? <a href="mailto:hello@prolnk.xyz" className="underline hover:text-white/50">hello@prolnk.xyz</a></p>
      </section>
    </div>
  );
}

