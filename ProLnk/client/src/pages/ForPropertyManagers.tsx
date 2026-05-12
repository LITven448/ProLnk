import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Building2, Zap, DollarSign, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: <Building2 className="w-5 h-5 text-teal-400" />,
    title: "Document Your Portfolio",
    body: "Add every property you manage to the Home Health Vault. One-time setup. Every home gets a verified condition profile.",
  },
  {
    n: "02",
    icon: <Zap className="w-5 h-5 text-teal-400" />,
    title: "AI Dispatches the Right Pro",
    body: "When a job comes up, ProLnk's AI matches it to the best available, verified pro in your area — automatically. No calls, no vetting.",
  },
  {
    n: "03",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
    title: "Earn Origination Rights on Every Job",
    body: "You hold 1.5% origination rights on every platform service fee across your entire portfolio — for as long as you're in the network.",
  },
];

const WINS = [
  "Single network replaces 20+ individual contractor relationships",
  "Background-checked, verified pros on every job",
  "AI dispatch eliminates coordination overhead",
  "Documented repair history at every property",
  "Passive income scales with your portfolio size",
  "Never lose a pro relationship when they retire or move",
];

export default function ForPropertyManagers() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Property Managers — One Platform for Your Whole Portfolio | ProLnk</title>
        <meta
          name="description"
          content="Property managers: replace 20+ contractor relationships with one AI-powered platform. Get vetted pros, automated dispatch, and earn 1.5% origination rights on every service job across your entire portfolio."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="relative border-b border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container max-w-5xl mx-auto px-6 py-20 relative">
            <Badge className="bg-[#F5E642]/10 text-[#F5E642] border border-[#F5E642]/30 mb-6">
              Property Managers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              One Platform to Rule{" "}
              <span className="text-teal-400">Your Whole Portfolio</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              Managing 20+ properties means 20+ contractor relationships. ProLnk gives you a single network with AI dispatch, verified pros, and <strong className="text-white">passive income</strong>.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10">
              Document all your properties once. Let AI handle contractor matching forever. Earn origination rights on every service job at every property you manage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8"
                onClick={() => setLocation("/apply")}
              >
                Apply for Pro Account <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-teal-400 self-center font-medium">
                Scales from 5 to 500+ units
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">Set it up once. Let ProLnk run maintenance coordination at scale.</p>
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
            <h2 className="text-2xl font-bold mb-2">Portfolio Math</h2>
            <p className="text-slate-400 mb-8">With 20 managed properties, your origination income adds up fast.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Properties in your portfolio", value: "20" },
                { label: "Avg. service jobs per property per year", value: "4" },
                { label: "Your origination rate on each job", value: "1.5%" },
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
                  <p className="text-slate-300 text-sm mb-1">20 properties × 4 jobs × $120 avg fee × 1.5%</p>
                  <p className="text-2xl font-black text-white">
                    $144 / month <span className="text-teal-400">passive</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    For as long as those properties are in your portfolio. Add more properties, earn more.
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
              Property Manager Pro Account
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Apply for Property Manager Pro Account
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Stop juggling contractor relationships. Start earning origination income on every property you manage. Apply now and get early access.
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
