import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Building2,
  Zap,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Layers,
  BarChart2,
  Phone,
} from "lucide-react";

const STEPS = [
  {
    n: "01″,
    icon: <Building2 className="w-5 h-5 text-teal-400″ />,
    title: "Add Your Portfolio",
    body: "Bulk-upload your properties to the Home Health Vault. Every address gets a verified condition profile — roof, HVAC, plumbing, electrical — documented once.",
  },
  {
    n: "02″,
    icon: <Zap className="w-5 h-5 text-teal-400″ />,
    title: "AI Dispatches the Right Pro",
    body: "When a job comes up at any property, ProLnk's AI matches it to the best available, background-checked pro in your area — automatically. No calls, no vetting, no chasing.",
  },
  {
    n: "03″,
    icon: <DollarSign className="w-5 h-5 text-teal-400″ />,
    title: "Earn Origination Rights on Every Job",
    body: "You hold 1.5% origination rights on every platform service fee across your entire portfolio — for as long as those properties are in the network.",
  },
];

const WINS = [
  "Single network replaces 20+ individual contractor relationships",
  "Background-checked, reviewed pros on every job",
  "AI dispatch eliminates coordination overhead across properties",
  "Documented repair history at every unit — audit-ready records",
  "Passive income scales with portfolio size, not headcount",
  "Preferred pricing and dedicated partner support at 50+ units",
  "Never lose a pro relationship when they retire or move",
  "One point of contact for all service needs across your portfolio",
];

const DASHBOARD_FEATURES = [
  {
    icon: <BarChart2 className="w-4 h-4 text-teal-400″ />,
    label: "Portfolio Overview",
    desc: "All properties, all job statuses, all spend — one dashboard.",
  },
  {
    icon: <Layers className="w-4 h-4 text-teal-400″ />,
    label: "Bulk Job Requests",
    desc: "Submit maintenance requests across multiple units simultaneously.",
  },
  {
    icon: <Clock className="w-4 h-4 text-teal-400″ />,
    label: "Maintenance Scheduler",
    desc: "Set recurring service cadences per property type or system.",
  },
  {
    icon: <Phone className="w-4 h-4 text-teal-400″ />,
    label: "Dedicated Partner Line",
    desc: "50+ unit managers get a direct line to a dedicated account manager.",
  },
];

export default function ForPropertyManagers() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>Property Managers — Preferred Pricing for 50+ Unit Portfolios | ProLnk</title>
        <meta
          name="description"
          content="Property managers: get preferred pricing, dedicated partner support, and AI-powered dispatch for your entire portfolio. One platform replaces 20+ contractor relationships. Earn origination income on every job."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628] text-white">
        {/* Hero */}
        <section className="relative border-b border-white/10″>
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="container max-w-5xl mx-auto px-6 py-20 relative">
            <Badge className="bg-[#F5E642]/10 text-[#F5E642] border border-[#F5E642]/30 mb-6″>
              Property Managers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6″>
              Manage 50 Properties?{" "}
              <span className="text-teal-400″>Get Preferred Pricing and Dedicated Partner Support</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mb-4″>
              Managing a portfolio means juggling 20+ contractor relationships, chasing quotes, and hoping someone shows up. ProLnk gives you a single AI-powered platform with one point of contact for every service need across your properties.
            </p>
            <p className="text-slate-400 max-w-2xl mb-10″>
              50+ unit managers get preferred pricing, bulk booking discounts, and a dedicated account manager — plus passive origination income on every job at every property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                size="lg"
                className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-8″
                onClick={() => setLocation("/pro-waitlist")}
              >
                Get Property Manager Pricing <ArrowRight className="ml-2 w-4 h-4″ />
              </Button>
              <p className="text-xs text-teal-400 self-center font-medium">
                Scales from 5 to 500+ units
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-5xl mx-auto px-6 py-16″>
          <h2 className="text-2xl font-bold mb-2″>How It Works</h2>
          <p className="text-slate-400 mb-10″>Set it up once. Let ProLnk run maintenance coordination at scale.</p>
          <div className="grid md:grid-cols-3 gap-6″>
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 flex flex-col gap-4″
              >
                <div className="flex items-center gap-3″>
                  <span className="text-3xl font-black text-teal-400/30″>{s.n}</span>
                  {s.icon}
                </div>
                <h3 className="font-semibold text-white text-lg">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Math */}
        <section className="border-y border-white/10 bg-slate-900/40″>
          <div className="container max-w-5xl mx-auto px-6 py-16″>
            <h2 className="text-2xl font-bold mb-2″>Portfolio Math</h2>
            <p className="text-slate-400 mb-8″>With 50 managed properties, the numbers add up fast.</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8″>
              {[
                { label: "Properties in your portfolio", value: "50″ },
                { label: "Avg. service jobs per property per year", value: "4″ },
                { label: "Your origination rate on each job", value: "1.5%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-black text-teal-400 mb-1″>{item.value}</div>
                  <div className="text-xs text-slate-400″>{item.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-teal-900/30 border border-teal-400/30 rounded-xl p-6″>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4″>
                <div>
                  <p className="text-slate-300 text-sm mb-1″>50 properties × 4 jobs × $120 avg fee × 1.5%</p>
                  <p className="text-2xl font-black text-white">
                    $360 / month <span className="text-teal-400″>passive</span>
                  </p>
                  <p className="text-slate-400 text-sm mt-1″>
                    Grows with every property you add. Bulk discount applies at 50+ units.
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-teal-400 flex-shrink-0″ />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="container max-w-5xl mx-auto px-6 py-16″>
          <h2 className="text-2xl font-bold mb-2″>Property Manager Dashboard</h2>
          <p className="text-slate-400 mb-8″>Built for portfolio-scale management, not one-off homeowners.</p>

          {/* Mock Dashboard Card */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden mb-8″>
            {/* Dashboard Header */}
            <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3″>
                <div className="w-3 h-3 rounded-full bg-red-500/70″ />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70″ />
                <div className="w-3 h-3 rounded-full bg-green-500/70″ />
                <span className="text-xs text-slate-500 ml-2″>ProLnk — Property Manager Dashboard</span>
              </div>
              <Badge className="bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs">
                Partner Preview
              </Badge>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-700″>
              {[
                { label: "Active Properties", value: "52″ },
                { label: "Open Jobs", value: "7″ },
                { label: "MTD Origination", value: "$412″ },
                { label: "Avg Response Time", value: "1.8h" },
              ].map((stat) => (
                <div key={stat.label} className="px-5 py-4 border-r border-slate-700 last:border-0″>
                  <div className="text-xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5″>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Job Table */}
            <div className="p-5″>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3″>Recent Jobs</p>
              <div className="space-y-2″>
                {[
                  { addr: "4821 Maple St, Unit 3″, trade: "HVAC", status: "In Progress", pro: "Marcus T.", color: "text-yellow-400" },
                  { addr: "910 Oak Ave", trade: "Plumbing", status: "Scheduled", pro: "Raul M.", color: "text-teal-400″ },
                  { addr: "1204 Birch Ln, Unit 7A", trade: "Electrical", status: "Completed", pro: "Denise K.", color: "text-green-400″ },
                ].map((job) => (
                  <div key={job.addr} className="flex items-center justify-between px-4 py-3 bg-slate-900/60 rounded-lg text-sm">
                    <div>
                      <span className="text-white font-medium">{job.addr}</span>
                      <span className="text-slate-500 ml-2 text-xs">— {job.trade}</span>
                    </div>
                    <div className="flex items-center gap-4″>
                      <span className="text-xs text-slate-400″>{job.pro}</span>
                      <span className={`text-xs font-semibold ${job.color}`}>{job.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard Feature Bullets */}
          <div className="grid md:grid-cols-2 gap-4″>
            {DASHBOARD_FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-lg">
                <div className="mt-0.5″>{f.icon}</div>
                <div>
                  <div className="text-white text-sm font-semibold mb-0.5″>{f.label}</div>
                  <div className="text-slate-400 text-xs">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Study */}
        <section className="border-y border-white/10 bg-slate-900/40″>
          <div className="container max-w-5xl mx-auto px-6 py-16″>
            <h2 className="text-2xl font-bold mb-8″>Case Study</h2>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden">
              <div className="bg-teal-900/30 border-b border-teal-400/20 px-6 py-3″>
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Property Manager — 50 Units, DFW</span>
              </div>
              <div className="p-8″>
                <h3 className="text-xl font-bold text-white mb-4″>
                  "PM with 50 units saves 15 hours/week — and earns $360/month passive"
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4″>
                  Before ProLnk, a DFW property manager with 52 residential units was spending roughly 3 hours per week per property tracking down contractors — coordinating availability, verifying licenses, following up on no-shows. Across a 50-unit portfolio, that was 15+ hours every week just on maintenance coordination.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-6″>
                  After onboarding to ProLnk's Partner Program, AI dispatch handled contractor matching automatically. The manager’s coordination time dropped to under 2 hours per week for the entire portfolio. Every repair is logged in the Home Health Vault, giving her audit-ready records for every unit. And her origination rights on the portfolio generate $360/month in passive income — just from the homes already in her network.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700″>
                  {[
                    { label: "Hours saved/week", value: "13+" },
                    { label: "Passive income/mo", value: "$360″ },
                    { label: "Properties managed", value: "52″ },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl font-black text-teal-400″>{stat.value}</div>
                      <div className="text-xs text-slate-400 mt-0.5″>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="container max-w-5xl mx-auto px-6 py-16″>
          <h2 className="text-2xl font-bold mb-8″>What You Actually Get</h2>
          <div className="grid md:grid-cols-2 gap-3″>
            {WINS.map((w) => (
              <div key={w} className="flex items-start gap-3 p-4 bg-slate-800/40 rounded-lg">
                <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5″ />
                <span className="text-slate-200 text-sm">{w}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="border-t border-white/10 bg-slate-900/60″>
          <div className="container max-w-5xl mx-auto px-6 py-16 text-center">
            <Badge className="bg-teal-400/10 text-teal-400 border border-teal-400/30 mb-4″>
              Property Manager Partner Program
            </Badge>
            <h2 className="text-3xl font-bold mb-4″>Get Property Manager Pricing</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Stop juggling contractor relationships. Start earning origination income on every property you manage. 50+ unit portfolios get preferred pricing and a dedicated partner account manager.
            </p>
            <Button
              size="lg"
              className="bg-[#F5E642] text-[#0A1628] hover:bg-[#F5E642]/90 font-bold text-base px-10″
              onClick={() => setLocation("/pro-waitlist")}
            >
              Get Property Manager Pricing <ArrowRight className="ml-2 w-4 h-4″ />
            </Button>
            <p className="text-xs text-slate-500 mt-8″>
              &copy; {new Date().getFullYear()} ProLnk. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
