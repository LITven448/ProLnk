import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Shield,
  Database,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CalendarCheck,
} from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    n: "01",
    icon: <CalendarCheck className="w-5 h-5 text-teal-400" />,
    title: "Introduce ProLnk at Renewal",
    body: "At your annual policy review, mention TrustyPro to policyholders. Frame it as pre-loss prevention — trusted pros who maintain homes before damage occurs.",
  },
  {
    n: "02",
    icon: <Database className="w-5 h-5 text-teal-400" />,
    title: "Home Gets Documented",
    body: "A vetted pro verifies the home's roof, HVAC, plumbing, and electrical. Data is stored in the Home Health Vault and updated every service visit — real interior condition data.",
  },
  {
    n: "03",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
    title: "You Earn — Per Referral and Recurring",
    body: "Earn a flat fee per activated policyholder referral, plus 1.5% origination rights on every platform service fee at that home going forward.",
  },
];

const WINS = [
  "Verified interior condition data — not just satellite or permit records",
  "Proactive maintenance reduces claims before they happen",
  "Ongoing income from policyholders you already service",
  "Differentiate from every other agent in your market",
  "Better underwriting data: roof age, HVAC state, plumbing type",
  "Client retention improves when you bring them real value at renewal",
];

const PARTNERSHIP_MODELS = [
  {
    title: "Per-Referral Flat Fee",
    description:
      "Earn a flat fee for each policyholder who activates a Home Health Vault profile through your referral. No minimums, no quotas.",
    highlight: "$150–$300",
    sub: "per activated home",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
  },
  {
    title: "Monthly Pro Network Override",
    description:
      "If you refer home service pros to the ProLnk network, earn a monthly override on their subscription — as long as they remain active.",
    highlight: "10%",
    sub: "of referred pro's monthly subscription",
    icon: <RefreshCw className="w-5 h-5 text-teal-400" />,
  },
  {
    title: "Origination Rights",
    description:
      "Hold a permanent 1.5% share of every platform service fee at each home you refer. Passive income that outlasts any single policy.",
    highlight: "1.5%",
    sub: "permanent origination rights",
    icon: <TrendingUp className="w-5 h-5 text-teal-400" />,
  },
];

const FAQS = [
  {
    q: "How do I introduce ProLnk to clients without it feeling like a sales pitch?",
    a: "Frame it as pre-loss prevention at renewal: 'One thing I recommend to my best clients is making sure their home systems are documented and maintained by verified pros. It prevents claims and protects your coverage.' Then share your referral link. It adds value to the conversation instead of adding friction.",
  },
  {
    q: "What kind of interior condition data does ProLnk actually capture?",
    a: "ProLnk's AI analyzes 65 home system categories from pro job photos — HVAC model and approximate age, electrical panel type, plumbing materials, roof condition, water heater age, and more. This is real, verified interior data that no satellite or permit database can provide.",
  },
  {
    q: "How does fewer claims translate to better client retention?",
    a: "Policyholders with well-maintained homes have fewer surprise claims, fewer mid-policy disputes, and fewer reasons to shop. When you're the agent who connected them to the pro network that prevented the $18,000 water damage claim, they renew with you.",
  },
  {
    q: "Can I access a policyholder's Home Health Vault data for underwriting?",
    a: "With the homeowner's explicit consent, yes. ProLnk is developing a verified data sharing tier for insurance carriers and agents. Founding partners will have first access when the data API launches.",
  },
  {
    q: "Is there a minimum number of referrals required?",
    a: "None. Refer one policyholder or your entire book. Every activated referral earns income — no minimums, no performance tiers.",
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/60 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-white text-sm">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-teal-400 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-slate-700/60 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ForInsuranceAgents() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Insurance Agents — Reduce Claims, Earn Referral Income | ProLnk</title>
        <meta
          name="description"
          content="Insurance agents: help policyholders find trusted home service pros, earn referral income per activation, and access verified interior condition data to improve underwriting. Fewer claims, better retention, new revenue."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container max-w-5xl mx-auto px-6 py-20 relative">
            <Badge className="bg-[#F5E642]/10 text-[#F5E642] border border-[#F5E642]/30 mb-6">
              Insurance Agents
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Help Your Policyholders Find{" "}
              <span className="text-teal-400">Trusted Pros</span>, Earn Referral Income
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              Pre-loss prevention is the most underutilized tool in insurance retention. Connect your policyholders to vetted home service pros — and{" "}
              <strong className="text-white">get paid</strong> when they use the platform.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10">
              Better maintained homes mean fewer claims. Fewer claims mean better retention. Better retention means more renewals. ProLnk makes this loop automatic — and pays you to start it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8"
                onClick={() => setLocation("/pro-waitlist")}
              >
                Become an Insurance Partner <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-teal-400 self-center font-medium">
                No quota. No territory restrictions.
              </p>
            </div>
          </div>
        </section>

        {/* Pre-Loss Prevention Angle */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <div className="bg-slate-800/40 border border-teal-400/20 rounded-xl p-8 mb-4">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-white mb-3">The Pre-Loss Prevention Angle</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  The average homeowner insurance claim costs $15,000. Most are preventable with routine maintenance — HVAC tune-ups, roof inspections, plumbing checks. But homeowners don't know who to call, so they delay until damage occurs.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  When you connect a policyholder to ProLnk, you give them access to a network of background-checked, reviewed pros who document every visit. The home stays maintained. Claims drop. Your client stays loyal to the agent who actually helped them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Introduce ProLnk at Renewal */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <div className="container max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-2">How to Introduce ProLnk at Renewal</h2>
            <p className="text-slate-400 mb-10">A three-step conversation that adds value and earns income.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-teal-400/30">{s.n}</span>
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Models */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">Partnership Model</h2>
          <p className="text-slate-400 mb-10">Three income streams, each earned differently.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {PARTNERSHIP_MODELS.map((m) => (
              <div
                key={m.title}
                className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 mb-1">{m.icon}<span className="font-semibold text-white">{m.title}</span></div>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{m.description}</p>
                <div className="border-t border-slate-700 pt-3">
                  <span className="text-2xl font-black text-teal-400">{m.highlight}</span>
                  <span className="text-xs text-slate-400 block mt-0.5">{m.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Income Math */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <div className="container max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-2">The Income Potential</h2>
            <p className="text-slate-400 mb-8">A small fraction of your book generates meaningful passive income.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Policyholders referred to the Vault", value: "50" },
                { label: "Avg. platform service fees per home per year", value: "$480" },
                { label: "Your origination rate", value: "1.5%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-black text-teal-400 mb-1">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-teal-900/30 border border-teal-400/30 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-slate-300 text-sm mb-1">50 homes × $480 × 1.5% + $200 per-referral fee × 50</p>
                  <p className="text-2xl font-black text-white">
                    $10,360{" "}
                    <span className="text-teal-400">year one</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    $360/yr recurring origination after year one — growing with every additional referral, for as long as the homes stay in the network.
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-teal-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">What You Actually Get</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {WINS.map((w) => (
              <div key={w} className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-lg">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-sm">{w}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <div className="container max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-8">What Partners Are Saying</h2>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 max-w-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F5E642] text-[#F5E642]" />
                ))}
              </div>
              <blockquote className="text-slate-200 text-base leading-relaxed mb-6">
                "I added a single paragraph about ProLnk to my renewal call script. In three months I had 22 policyholders on the platform, two of them told me the pro caught roof issues before they became claims. That's the best client retention tool I've ever added — and I'm making money doing it."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-900 border border-teal-400/40 flex items-center justify-center font-bold text-teal-400 text-sm">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Marcus R.</div>
                  <div className="text-xs text-slate-400">Independent Insurance Agent — DFW, 14 years</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-400 mb-8">Everything insurance agents ask before joining.</p>
          <div className="flex flex-col gap-3 max-w-3xl">
            {FAQS.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="border-t border-white/10 bg-slate-900/60">
          <div className="container max-w-5xl mx-auto px-6 py-16 text-center">
            <Badge className="bg-teal-400/10 text-teal-400 border border-teal-400/30 mb-4">
              Insurance Agent Partner Program
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Become an Insurance Partner</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Be among the first insurance agents to hold origination rights on your book of business. No quota, no minimums — just refer and earn.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-10"
              onClick={() => setLocation("/pro-waitlist")}
            >
              Become an Insurance Partner <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <p className="text-xs text-slate-500 mt-8">
              &copy; {new Date().getFullYear()} ProLnk. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
