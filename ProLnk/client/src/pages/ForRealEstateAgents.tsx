import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { Home, DollarSign, FileText, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: <Home className="w-5 h-5 text-teal-400" />,
    title: "Refer Your Clients",
    body: "Share ProLnk with homeowners preparing to list. Takes 30 seconds — they sign up, you're credited as the originator.",
  },
  {
    n: "02",
    icon: <FileText className="w-5 h-5 text-teal-400" />,
    title: "Pros Document the Property",
    body: "Vetted ProLnk pros assess and document the home's condition in the Home Health Vault. Every repair job is logged.",
  },
  {
    n: "03",
    icon: <DollarSign className="w-5 h-5 text-teal-400" />,
    title: "You Earn — Perpetually",
    body: "Your origination right earns 1.5% of every platform service fee at that home. Even after the home sells to a new owner.",
  },
];

const WINS = [
  "Deferred maintenance identified before it kills a deal",
  "Vetted contractors ready — no more last-minute scrambles",
  "Documented repair history boosts listing value",
  "Passive income from every home in your book",
  "Stay relevant to clients long after closing",
];

export default function ForRealEstateAgents() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Real Estate Agents — Earn Passive Income with ProLnk</title>
        <meta
          name="description"
          content="Real estate agents: turn every listing into recurring passive income. Refer homeowners to ProLnk, earn 1.5% origination rights on every service job — forever. First 25 agents get Charter Status."
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
              Turn Every Listing Into{" "}
              <span className="text-teal-400">Passive Income</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4">
              Every listing has deferred maintenance. You spend hours finding contractors. ProLnk automates this — and <strong className="text-white">pays you</strong>.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10">
              Refer a homeowner once. Earn origination rights to 1.5% of every service platform fee at that home. Perpetually. Even after the home sells.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8"
                onClick={() => setLocation("/apply")}
              >
                Get Your Agent Account <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <p className="text-xs text-amber-400 self-center font-medium">
                First 25 agents get Charter Status — {" "}
                <span className="text-white">locked forever</span>
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-slate-400 mb-10">Three steps. No tech skills required.</p>
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
            <h2 className="text-2xl font-bold mb-2">The Math Is Simple</h2>
            <p className="text-slate-400 mb-8">Here's what 20 referred homes looks like at scale.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Avg. service jobs / home / year", value: "4" },
                { label: "Avg. platform fee per job", value: "$120" },
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
                  <p className="text-slate-300 text-sm mb-1">20 homes × 4 jobs × $120 × 1.5%</p>
                  <p className="text-2xl font-black text-white">
                    $144 / month <span className="text-teal-400">passive</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    Grows every time you refer a homeowner. Doesn't stop when homes sell.
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
            <Badge className="bg-amber-400/10 text-amber-400 border border-amber-400/30 mb-4">
              Limited — First 25 Agents Only
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Get Your Agent Account
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Charter Status means your origination rate and platform fee are locked for life. Apply before the first 25 spots fill.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-10"
              onClick={() => setLocation("/apply")}
            >
              Apply for Charter Status <ArrowRight className="ml-2 w-4 h-4" />
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
