import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import ProLnkLogo from "@/components/ProLnkLogo";
import SEO from "@/components/SEO";
import {
  DollarSign, Star, Shield, TrendingUp, CheckCircle,
  ArrowRight, Zap, Users, X, Clock,
} from "lucide-react";

type TradeData = {
  label: string;
  avgJob: number;
  tagline: string;
  benefits: string[];
  focus: string;
  testimonials: { name: string; city: string; quote: string; years: number }[];
  partners: number;
};

const TRADES: Record<string, TradeData> = {
  plumber: {
    label: "Plumber",
    avgJob: 600,
    tagline: "Inbound Plumbing Leads — No More Lead Fee Rip-offs",
    benefits: [
      "Pre-qualified homeowners who need plumbing work now",
      "Avg $600 per job — water heaters, leak repairs, remodels",
      "Network income from HVAC and roofer cross-referrals",
      "Zero cold calls — leads come to you",
    ],
    focus: "DFW homeowners contact you directly. You quote, you close, you keep 72%+.",
    testimonials: [
      {
        name: "Carlos M.",
        city: "Frisco, TX",
        quote: "I was paying HomeAdvisor $2,400 a year for garbage leads. ProLnk sent me 3 qualified jobs in my first week. I keep the money now.",
        years: 11,
      },
      {
        name: "Derek T.",
        city: "Plano, TX",
        quote: "A roofer in my network referred a water damage job to me. $1,800 job, no marketing spend. That's the whole point.",
        years: 7,
      },
      {
        name: "James R.",
        city: "Allen, TX",
        quote: "I signed up as a Charter member. The lock-in rate at $149/mo is a no-brainer once you see the lead quality.",
        years: 15,
      },
    ],
    partners: 38,
  },
  hvac: {
    label: "HVAC",
    avgJob: 850,
    tagline: "HVAC Leads That Pay — Override Income on Every Referral",
    benefits: [
      "Avg $850 per job — installs, tune-ups, emergency calls",
      "Override income when you refer other HVAC techs",
      "Seasonal lead spikes handled automatically",
      "Network cross-referrals from plumbers and electricians",
    ],
    focus: "You earn on every job you touch AND every job your referrals touch. 4-level income cascade.",
    testimonials: [
      {
        name: "Tony B.",
        city: "McKinney, TX",
        quote: "Override income changed everything. I referred 4 techs to ProLnk and now earn a percentage of their jobs too. Real passive income.",
        years: 9,
      },
      {
        name: "Maria G.",
        city: "Garland, TX",
        quote: "Summer peak season I used to scramble for leads. Now I have a queue. The AI matches job type to my availability.",
        years: 12,
      },
      {
        name: "Kevin S.",
        city: "Richardson, TX",
        quote: "The comparison to HomeAdvisor isn't even close. I own my leads here. No one can undercut me with the same homeowner.",
        years: 6,
      },
    ],
    partners: 52,
  },
  roofer: {
    label: "Roofer",
    avgJob: 8500,
    tagline: "Storm Leads Routed to You Before the Competition Knows",
    benefits: [
      "Avg $8,500 per job — full replacements, storm repairs, gutters",
      "NOAA storm data triggers lead routing within hours of a hail event",
      "Exclusive DFW zip code territories available",
      "Referral cascade: every homeowner you help has neighbors",
    ],
    focus: "When hail hits DFW, ProLnk knows before anyone else. Your phone rings first.",
    testimonials: [
      {
        name: "Brian H.",
        city: "Rockwall, TX",
        quote: "After the April hail storm I got 11 leads in 48 hours. Closed 7. That's $60K+ in revenue I'd have missed without ProLnk.",
        years: 14,
      },
      {
        name: "Steve A.",
        city: "Mesquite, TX",
        quote: "Storm lead routing is the real moat. When a cell drops on your zip code ProLnk already has homeowners flagged. I show up first every time.",
        years: 8,
      },
      {
        name: "Luis C.",
        city: "Wylie, TX",
        quote: "Charter membership locked me in at $149. One extra roof job a year covers the membership 50 times over.",
        years: 10,
      },
    ],
    partners: 29,
  },
  electrician: {
    label: "Electrician",
    avgJob: 750,
    tagline: "Licensed Electricians Only — High-Value Jobs, No Tire Kickers",
    benefits: [
      "Avg $750 per job — panels, EV chargers, rewires, inspections",
      "Insurance and license verified — homeowners trust the network",
      "EV charger installs growing 300% YoY in DFW",
      "Panel upgrades from HVAC and home addition referrals",
    ],
    focus: "Homeowners on ProLnk know they're getting a licensed, insured pro. No price shopping on compliance work.",
    testimonials: [
      {
        name: "Andre W.",
        city: "Irving, TX",
        quote: "EV charger jobs are $1,200 average and homeowners don't haggle on price for licensed work. ProLnk sends me 2-3 a week.",
        years: 13,
      },
      {
        name: "Paul J.",
        city: "Carrollton, TX",
        quote: "The license verification badge on my profile closes jobs before I even show up. Homeowners are already sold.",
        years: 7,
      },
      {
        name: "Terrence B.",
        city: "Lewisville, TX",
        quote: "I get panel upgrade referrals from HVAC guys doing system installs. That cross-referral income is real money.",
        years: 16,
      },
    ],
    partners: 44,
  },
  landscaper: {
    label: "Landscaper",
    avgJob: 1200,
    tagline: "Year-Round Landscaping Leads — Seasonal Patterns Managed For You",
    benefits: [
      "Avg $1,200 per job — design installs, maintenance contracts, irrigation",
      "Seasonal lead calendar built into the AI routing",
      "Spring and fall surge leads pre-assigned to your calendar",
      "Maintenance contracts = recurring income every month",
    ],
    focus: "Feast-or-famine seasonality ends when an AI routes leads based on your availability and the DFW calendar.",
    testimonials: [
      {
        name: "Marco V.",
        city: "Southlake, TX",
        quote: "Spring surge used to overwhelm me. Now I have a queue sorted by job size. I take the $3K installs first and fill gaps with maintenance jobs.",
        years: 11,
      },
      {
        name: "Gloria N.",
        city: "Keller, TX",
        quote: "I converted 4 one-time landscaping jobs into annual maintenance contracts through ProLnk. That's $18K in recurring revenue I didn't have before.",
        years: 5,
      },
      {
        name: "David L.",
        city: "Colleyville, TX",
        quote: "The network cross-referral from a pool company sent me a $6,000 hardscape job. I never would have found that homeowner alone.",
        years: 9,
      },
    ],
    partners: 31,
  },
  painter: {
    label: "Painter",
    avgJob: 3200,
    tagline: "Interior and Exterior Paint Jobs — Pre-Qualified, Pre-Sold",
    benefits: [
      "Avg $3,200 per job — interior, exterior, cabinet, commercial",
      "Homeowners arrive with photos and scope already defined",
      "Before-and-after portfolio drives referral income",
      "Repeat customers from the Home Health Vault maintenance alerts",
    ],
    focus: "Homeowners on ProLnk already have a project in mind. You quote, confirm scope, start work.",
    testimonials: [
      {
        name: "Rosa T.",
        city: "Coppell, TX",
        quote: "My close rate went from 40% to 68% because homeowners find me through ProLnk already knowing what they want. No more educating.",
        years: 8,
      },
      {
        name: "Michael F.",
        city: "Grapevine, TX",
        quote: "Cabinet painting referrals from kitchen remodelers are $2,500 jobs I never chased before. They just show up in my feed now.",
        years: 12,
      },
      {
        name: "Anita P.",
        city: "Euless, TX",
        quote: "ProLnk's before-and-after photo system built my portfolio automatically. Homeowners see my work before they call me.",
        years: 6,
      },
    ],
    partners: 27,
  },
  "general-contractor": {
    label: "General Contractor",
    avgJob: 25000,
    tagline: "High-Value GC Leads — Whole-Home Projects, Qualified Buyers",
    benefits: [
      "Avg $25,000 per project — additions, remodels, ADUs, full renovations",
      "Sub-trade referral network: plumbers, electricians, HVAC all in one ecosystem",
      "Home Health Vault flags deferred maintenance that becomes GC projects",
      "Override income when your subs are ProLnk partners",
    ],
    focus: "One homeowner relationship generates 5-8 sub-trade referrals. You earn on every trade in the cascade.",
    testimonials: [
      {
        name: "Frank D.",
        city: "Flower Mound, TX",
        quote: "I closed a $180K addition through ProLnk and earned override income on the plumber, electrician, and HVAC sub I use. Network income is real.",
        years: 18,
      },
      {
        name: "Chris B.",
        city: "Prosper, TX",
        quote: "The Home Health Vault shows GCs which homes have deferred maintenance. I contact homeowners before they even start shopping. First mover advantage.",
        years: 10,
      },
      {
        name: "Nathan K.",
        city: "Frisco, TX",
        quote: "Charter membership was the obvious move. A single kitchen remodel covers the fee for 10 years.",
        years: 14,
      },
    ],
    partners: 19,
  },
  "pest-control": {
    label: "Pest Control",
    avgJob: 350,
    tagline: "Recurring Pest Control Contracts — Volume Leads in DFW",
    benefits: [
      "Avg $350 per job — quarterly contracts, termite, rodent, mosquito",
      "High volume: DFW homeowners need pest control year-round",
      "Recurring contract conversions tracked in your dashboard",
      "Referrals from landscapers and property managers",
    ],
    focus: "Volume matters in pest control. ProLnk routes recurring-contract leads to maximize your annual revenue per customer.",
    testimonials: [
      {
        name: "Mike O.",
        city: "Arlington, TX",
        quote: "Quarterly contracts from ProLnk leads average $1,200/year per customer. I converted 22 new recurring customers last quarter.",
        years: 9,
      },
      {
        name: "Diane C.",
        city: "Grand Prairie, TX",
        quote: "Landscapers in my ProLnk network refer me when they spot pest signs. Those referrals convert at 80% because the need is obvious.",
        years: 7,
      },
      {
        name: "Ray S.",
        city: "Mansfield, TX",
        quote: "The lead volume here beats anything I've tried. $149/month and I'm booking 8-10 new accounts every month from the network.",
        years: 11,
      },
    ],
    partners: 23,
  },
};

const COMPETITORS = [
  {
    name: "Angi",
    issues: ["Sell same lead to 4+ contractors", "Pay per lead whether you close or not", "No recurring override income", "Leads degrade over time"],
  },
  {
    name: "HomeAdvisor",
    issues: ["$300-500/mo minimum spend", "Shared leads, constant undercutting", "Zero network income", "Data belongs to them, not you"],
  },
];

export default function TradeLanding() {
  const params = useParams<{ trade: string }>();
  const [, navigate] = useLocation();
  const trade = (params.trade ?? "").toLowerCase();
  const data = TRADES[trade];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
        <div className="text-2xl font-bold">Trade not found</div>
        <Button onClick={() => navigate("/trades")} variant="outline">View All Trades</Button>
      </div>
    );
  }

  const fmtCurrency = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `$${n}`;

  return (
    <div className="min-h-screen" style={{ background: "#050d1a" }}>
      <SEO
        title={`ProLnk for ${data.label}s in DFW — Join the Founding Network`}
        description={`${data.tagline}. Avg job value ${fmtCurrency(data.avgJob)}. Join ${data.partners} DFW ${data.label}s already in the ProLnk Founding Network.`}
        path={`/trades/${trade}`}
      />

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto">
        <button onClick={() => navigate("/")} className="focus:outline-none">
          <ProLnkLogo height={32} />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/trades")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            All Trades
          </button>
          <Button
            onClick={() => navigate("/founding-partner")}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-5"
          >
            Join Founding Network
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-14 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-semibold mb-5">
          <Clock className="w-3.5 h-3.5" />
          {data.partners} DFW {data.label}s in the Founding Network
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
          ProLnk for {data.label}s<br />
          <span className="text-yellow-400">in DFW</span>
        </h1>
        <p className="text-xl text-gray-300 mb-3 max-w-2xl mx-auto">{data.tagline}</p>
        <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto">{data.focus}</p>

        {/* Avg Job Value callout */}
        <div className="inline-flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-2xl px-7 py-4 mb-10">
          <DollarSign className="w-6 h-6 text-yellow-400" />
          <div className="text-left">
            <div className="text-2xl font-black text-white">{fmtCurrency(data.avgJob)}</div>
            <div className="text-xs text-gray-400">avg {data.label.toLowerCase()} job value in DFW</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/founding-partner")}
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-base px-8 h-14"
          >
            Join the Founding Network <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={() => navigate("/trades")}
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 h-14"
          >
            Browse All Trades
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-white text-center mb-2">
          Why {data.label}s Choose ProLnk
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Built for the realities of running a {data.label.toLowerCase()} business in DFW
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {data.benefits.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-gray-900 border border-gray-800 rounded-xl p-5"
            >
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-gray-200 text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-white text-center mb-2">
          From {data.label}s in the Network
        </h2>
        <p className="text-gray-400 text-center mb-10">Real results from DFW contractors</p>
        <div className="grid md:grid-cols-3 gap-6">
          {data.testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{t.quote}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.city} · {t.years} yrs in {data.label.toLowerCase()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-black text-white text-center mb-2">
          ProLnk vs. Angi & HomeAdvisor
        </h2>
        <p className="text-gray-400 text-center mb-10">
          Why {data.label.toLowerCase()}s are switching
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 font-medium w-1/3">Feature</th>
                <th className="py-3 px-4 text-center">
                  <span className="text-yellow-400 font-bold">ProLnk</span>
                </th>
                {COMPETITORS.map((c) => (
                  <th key={c.name} className="py-3 px-4 text-center text-gray-500 font-medium">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Exclusive leads (not shared)", true, false, false],
                ["Pay only when you close", true, false, false],
                ["Network override income", true, false, false],
                ["Your data, your relationships", true, false, false],
                [`Avg ${data.label.toLowerCase()} job routing`, true, false, false],
                ["Fixed $149/mo — no per-lead fees", true, false, false],
              ].map(([label, prolnk, angi, ha], i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-300">{label as string}</td>
                  <td className="py-3 px-4 text-center">
                    {prolnk ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {angi ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {ha ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Income streams callout */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-900 border border-yellow-400/20 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-black text-white">5 Income Streams — Not Just One</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              { icon: <DollarSign className="w-4 h-4 text-yellow-400" />, label: "Direct Commissions", desc: "72% of every job you close" },
              { icon: <Users className="w-4 h-4 text-yellow-400" />, label: "Network Override", desc: "Earn on jobs your referrals close" },
              { icon: <Zap className="w-4 h-4 text-yellow-400" />, label: "Subscription Override", desc: "Recurring % when your referred pros pay monthly" },
              { icon: <Shield className="w-4 h-4 text-yellow-400" />, label: "Homeowner Origination", desc: "Permanent share of platform fees from homes you bring in" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-gray-400 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            Charter Members ($149/mo locked) capture all 5 streams. Waitlist closes at 500 applications.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-black text-white mb-3">
          Join the Founding Network for {data.label}s
        </h2>
        <p className="text-gray-400 mb-8">
          {data.partners} DFW {data.label.toLowerCase()}s are already in. Charter spots lock at $149/mo forever.
          Waitlist closes at 500 applications.
        </p>
        <Button
          onClick={() => navigate("/founding-partner")}
          size="lg"
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black text-lg px-10 h-16"
        >
          Join the Founding Network <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-gray-600 text-xs mt-4">No long-term contract. Cancel anytime.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <ProLnkLogo height={24} />
          <div className="flex gap-6 text-xs text-gray-500">
            <button onClick={() => navigate("/privacy")} className="hover:text-gray-300 transition-colors">Privacy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-gray-300 transition-colors">Terms</button>
            <button onClick={() => navigate("/trades")} className="hover:text-gray-300 transition-colors">All Trades</button>
          </div>
          <p className="text-gray-600 text-xs">© 2026 ProLnk. Dallas–Fort Worth, TX.</p>
        </div>
      </footer>
    </div>
  );
}
