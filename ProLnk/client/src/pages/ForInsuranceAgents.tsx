import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Shield, Database, DollarSign, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: <Shield className="w-5 h-5 text-teal-400" />,
    title: "Refer Homeowners to the Vault",
    body: "Introduce your policyholders to TrustyPro Home Health Vault. They document their home once — condition, systems, maintenance history.",
  },
  {
    n: "02",
    icon: <Database className="w-5 h-5 text-teal-400" />,
    title: "Home Gets Documented",
    body: "A vetted pro verifies the home's interior condition, roof, HVAC, plumbing, and electrical. Data is stored securely and updated every service visit.",
  },
  {
    n: "03",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
    title: "You Earn Origination Income",
    body: "You hold origination rights to 1.5% of every platform service fee at that home — passive income from your own book of business.",
  },
];

const WINS = [
  "Verified interior condition data — not just satellite or permit records",
  "Proactive maintenance reduces claims before they happen",
  "Ongoing income from policyholders you already service",
  "Differentiate from every other insurance agent in your market",
  "No extra tools — we handle the documentation workflow",
];

export default function ForInsuranceAgents() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Insurance Agents — Better Property Data & New Revenue with ProLnk</title>
        <meta
          name="description"
          content="Insurance agents: access verified home condition data to improve underwriting accuracy and earn passive origination income from every home you refer to TrustyPro Home Health Vault."
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
              Better Property Data.{" "}
              <span className="text-teal-400">New Revenue Stream.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              Underwriting is hard without verified interior condition data. ProLnk gives you this — and <strong className="text-white">pays you</strong> for each home documented.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10">
              Access verified home condition data. Reduce underwriting risk. Earn passive income from your existing book of business — without changing how you work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8"
                onClick={() => setLocation("/apply")}
              >
                Apply for Partner Status <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-teal-400 self-center font-medium">
                No quota. No territory restrictions.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">One referral. Ongoing income. Better data for your underwriting.</p>
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

        {/* Commission Math */}
        <section className="border-y border-white/10 bg-slate-900/40">
          <div className="container max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold mb-2">The Income Potential</h2>
            <p className="text-slate-400 mb-8">A small fraction of your book generates meaningful passive income.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Policyholders you refer to the Vault", value: "50" },
                { label: "Avg. platform service fees / home / year", value: "$480" },
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
                  <p className="text-slate-300 text-sm mb-1">50 homes × $480 × 1.5%</p>
                  <p className="text-2xl font-black text-white">
                    $360 / year <span className="text-teal-400">passive</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    From 50 referrals. Scales linearly with your book. Ongoing for the life of each home.
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

        {/* CTA Footer */}
        <section className="border-t border-white/10 bg-slate-900/60">
          <div className="container max-w-5xl mx-auto px-6 py-16 text-center">
            <Badge className="bg-teal-400/10 text-teal-400 border border-teal-400/30 mb-4">
              Insurance Agent Partner Program
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Apply for Insurance Agent Partner Status
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Be among the first insurance agents to hold origination rights on your book of business. No quota, no minimums — just refer and earn.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-10"
              onClick={() => setLocation("/apply")}
            >
              Apply Now <ArrowRight className="ml-2 w-4 h-4" />
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
