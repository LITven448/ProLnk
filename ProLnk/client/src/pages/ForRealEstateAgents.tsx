import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Home,
  DollarSign,
  FileText,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  Calculator,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    n: "01",
    icon: <Users className="w-5 h-5 text-teal-400" />,
    title: "Refer Your Network",
    body: "Share ProLnk with home service pros and homeowners in your sphere. A simple referral link tracks every signup — takes 30 seconds.",
  },
  {
    n: "02",
    icon: <FileText className="w-5 h-5 text-teal-400" />,
    title: "ProLnk Activates the Match",
    body: "Every pro you refer gets matched to homeowner leads automatically. Every homeowner gets vetted pros dispatched to them. You earn on both sides.",
  },
  {
    n: "03",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
    title: "Earn $200–$500 Per Referral",
    body: "When your referred pro or homeowner completes a transaction on ProLnk, you receive a referral payment. No license required. No ongoing work.",
  },
];

const WINS = [
  "Deferred maintenance identified before it kills a deal",
  "Vetted contractors ready — no more last-minute scrambles",
  "Documented repair history boosts listing value and trust",
  "Passive income from every referral in your sphere",
  "Stay relevant to clients long after closing",
  "No tech overhead — your referral link does the work",
];

const FAQS = [
  {
    q: "Do I need a special license to earn referral income?",
    a: "No. As a real estate partner, you're earning referral fees for connecting your network — not acting as a contractor or broker for the home service transaction. Consult your brokerage's policy if you plan to disclose per their guidelines.",
  },
  {
    q: "How exactly do I get credited for a referral?",
    a: "Each partner gets a unique referral link. When a pro or homeowner signs up through your link and completes their first paid transaction on the platform, the referral income is credited to your account automatically.",
  },
  {
    q: "How is the $200–$500 range determined?",
    a: "It depends on what you refer: homeowners with scheduled jobs yield $200–$300 per completed job, while pro referrals yield $400–$500 per activated pro. Higher job values produce higher referral income.",
  },
  {
    q: "What about the 1.5% origination rights I've seen mentioned?",
    a: "In addition to per-referral income, if you refer a homeowner whose home is added to the Home Health Vault, you hold a permanent 1.5% origination right on every future platform fee at that address — even after the home changes hands.",
  },
  {
    q: "Is there a quota or minimum referral requirement?",
    a: "None. Refer one person or a hundred. You earn on every completed transaction with no minimum performance requirement.",
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

export default function ForRealEstateAgents() {
  const [, setLocation] = useLocation();
  const [transactions, setTransactions] = useState(24);
  const refsPerTransaction = 2;
  const avgReferralValue = 350;
  const annualEarnings = transactions * refsPerTransaction * avgReferralValue;

  return (
    <>
      <Helmet>
        <title>Real Estate Agents — Earn $200–$500 Per Referral with ProLnk</title>
        <meta
          name="description"
          content="Real estate agents: earn $200–$500 per referral connecting your network to ProLnk home service pros. Plus permanent 1.5% origination rights on every home you refer to the Home Health Vault."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container max-w-5xl mx-auto px-6 py-20 relative">
            <Badge className="bg-[#F5E642]/10 text-[#F5E642] border border-[#F5E642]/30 mb-6">
              Real Estate Agents
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Earn{" "}
              <span className="text-teal-400">$200–$500 Per Referral</span>{" "}
              When You Connect Your Network With ProLnk
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              Your sphere already needs trusted home service pros. ProLnk pays you every time a connection you make leads to a completed job — with zero ongoing work.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10">
              Refer once. Earn on every transaction. Plus hold permanent origination rights on every home you refer to the Home Health Vault.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8"
                onClick={() => setLocation("/pro-waitlist")}
              >
                Join as a Real Estate Partner <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-amber-400 self-center font-medium">
                First 25 agents get Charter Status —{" "}
                <span className="text-white">locked forever</span>
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">Three simple steps. No tech skills required.</p>
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
        </section>

        {/* Income Calculator */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <div className="container max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="w-5 h-5 text-teal-400" />
              <h2 className="text-2xl font-bold">Income Calculator</h2>
            </div>
            <p className="text-slate-400 mb-8">
              Adjust your annual transaction volume to see potential referral income.
            </p>

            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 mb-6">
              <label className="block text-sm text-slate-300 mb-2 font-medium">
                Annual transactions closed: <span className="text-teal-400 font-bold">{transactions}</span>
              </label>
              <input
                type="range"
                min={5}
                max={100}
                step={1}
                value={transactions}
                onChange={(e) => setTransactions(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5 / year</span>
                <span>100 / year</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Annual transactions", value: transactions.toString() },
                { label: "Avg referrals per transaction", value: `${refsPerTransaction}` },
                { label: "Avg referral income per connection", value: `$${avgReferralValue}` },
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
                  <p className="text-slate-300 text-sm mb-1">
                    {transactions} transactions × {refsPerTransaction} referrals × ${avgReferralValue}
                  </p>
                  <p className="text-3xl font-black text-white">
                    ${annualEarnings.toLocaleString()}
                    <span className="text-teal-400 text-xl ml-2">/ year</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Plus permanent origination rights on every home referred to the Vault.
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
                "I closed 31 transactions last year and spent probably 40 hours chasing down contractors for clients. ProLnk eliminated that entirely — and now I'm getting paid for referrals I was already making for free. My first check was $1,400 in month two."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-900 border border-teal-400/40 flex items-center justify-center font-bold text-teal-400 text-sm">
                  SK
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Sarah K.</div>
                  <div className="text-xs text-slate-400">REALTOR® — DFW Metro, 8 years</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-400 mb-8">Everything real estate agents ask before joining.</p>
          <div className="flex flex-col gap-3 max-w-3xl">
            {FAQS.map((faq) => (
              <FAQ key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="border-t border-white/10 bg-slate-900/60">
          <div className="container max-w-5xl mx-auto px-6 py-16 text-center">
            <Badge className="bg-amber-400/10 text-amber-400 border border-amber-400/30 mb-4">
              Limited — First 25 Agents Only
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Join as a Real Estate Partner</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Charter Status means your referral rates and platform fees are locked for life. Apply before the first 25 spots fill.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-10"
              onClick={() => setLocation("/pro-waitlist")}
            >
              Join as a Real Estate Partner <ArrowRight className="ml-2 w-4 h-4" />
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
