import { Helmet } from "react-helmet-async";
import {
  Camera, MapPin, Users, Home, Share2, Star, Clock, Zap, DollarSign, Award
} from "lucide-react";

const tips = [
  {
    icon: Camera,
    title: "Upload High-Quality Photos of Every Job",
    impact: "+$200–$600/mo",
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    body:
      "Pros with 10+ photos in their profile receive 3× more lead matches. Shoot before/after shots on every job — phone camera is fine. Leads convert 40% higher when they can see your actual work quality.",
    action: "Add photos to your profile today — go to Profile → Work Gallery.",
  },
  {
    icon: MapPin,
    title: "Optimize Your Service Area Radius",
    impact: "+$300–$900/mo",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    body:
      "Setting your radius to 25–40 miles (instead of the default 10) exposes you to 4× more homeowner leads without significantly increasing drive time. Adjust seasonally — expand in slow months to keep your pipeline full.",
    action: "Edit your service area under Profile → Coverage Map.",
  },
  {
    icon: Users,
    title: "Recruit 3 Pros in Your Trade",
    impact: "+$150–$450/mo",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    body:
      "Each direct recruit earns you 12% of their $149/mo subscription ($17.88/mo each) plus 7% on every job they complete. Three recruits doing 3 jobs/month at $500 avg generates ~$370/mo in pure passive income with zero additional work from you.",
    action: "Share your referral link with trade partners, former colleagues, and supply house contacts.",
  },
  {
    icon: Home,
    title: "Document Every Home You Service",
    impact: "+$25–$150/home (permanent)",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    body:
      "When you add a home to the Home Health Vault after a job, you earn a permanent origination right — 1.5% of all future platform fees tied to that home forever. Pros who document 50+ homes earn an average of $800/mo in passive origination revenue by year two.",
    action: "Use the Home Health tab after each completed job to log the property.",
  },
  {
    icon: Share2,
    title: "Put Your Referral QR Code on Everything",
    impact: "+$50–$300/mo",
    color: "text-green-400",
    bg: "bg-green-400/10",
    body:
      "Print your QR code on business cards, truck magnets, invoices, and door hangers. Every homeowner who scans it and joins is attributed to you — earning you homeowner override fees of $25–$100 per qualified lead. A single truck magnet can generate 2–5 sign-ups per week in busy seasons.",
    action: "Download your QR code from the Network tab, then order materials at VistaPrint.",
  },
  {
    icon: Star,
    title: "Collect 5-Star Reviews Aggressively",
    impact: "+15% lead match rate",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    body:
      "The ProLnk matching algorithm weights your review score heavily. Every 0.5 star increase in your average rating raises your match priority score by approximately 15%, meaning you get shown to more homeowners first — before you have to compete on price.",
    action: "Text homeowners a review request within 24 hours of job completion.",
  },
  {
    icon: Clock,
    title: "Respond to Leads Within 15 Minutes",
    impact: "+60% conversion rate",
    color: "text-red-400",
    bg: "bg-red-400/10",
    body:
      "Leads contacted within 15 minutes convert at 60% vs. 17% after 1 hour (Harvard Business Review data). Enable push notifications and keep the app open during business hours. The fastest responder on a match wins the job — period.",
    action: "Turn on push notifications under Settings → Notifications.",
  },
  {
    icon: Zap,
    title: "Use the Recruiting Script That Works",
    impact: "+1–3 recruits/week",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    body:
      `The highest-converting recruiting message: "Hey [Name], I'm getting paid leads from a new platform called ProLnk. Costs $149/mo but I've been closing 2-3 jobs a week from it. If you join through my link, I'll get a small commission — but more importantly, I think it'll be worth it for you." Honest, peer-referral tone converts 4× better than a sales pitch.`,
    action: "Copy this message and personalize the first sentence with a detail about their business.",
  },
  {
    icon: DollarSign,
    title: "Upsell Premium Services on Every Lead",
    impact: "+$150–$500/job average",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    body:
      "ProLnk homeowners are researching — they're in buying mode. Always present a premium option alongside your standard quote. Add a 10-year warranty, a maintenance agreement, or a same-day premium. Pros who offer 3-tier pricing on quotes earn 35% more per job than single-quote pros.",
    action: "Build a 3-tier quote template (Good / Better / Best) for your top 3 services.",
  },
  {
    icon: Award,
    title: "Advance Your Tier Before Month-End",
    impact: "+8–35% on all commissions",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    body:
      "Commission rates scale dramatically with tier: Charter (25 recruits) earns 25% subscription overrides vs. 12% at Standard. Reaching the next tier before billing resets locks in higher rates for the full following month. If you're 2–3 recruits away from a tier upgrade, sprint to close it before the 28th.",
    action: "Check your recruit count in the Network tab. Tier thresholds: Charter=25, Founding=100, L3=400.",
  },
];

export default function MaximizeEarnings() {
  return (
    <>
      <Helmet>
        <title>10 Ways to Maximize Your ProLnk Earnings | Partner Resources</title>
        <meta
          name="description"
          content="Actionable strategies to increase your ProLnk income — from photo optimization and service area tuning to recruiting scripts and tier advancement."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0A1628]">
        <div className="max-w-3xl mx-auto px-4 py-10">

          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 bg-teal-400/10 px-3 py-1 rounded-full mb-3">
              Partner Playbook
            </span>
            <h1 className="text-3xl font-bold text-white leading-tight">
              10 Ways to Maximize<br />Your ProLnk Earnings
            </h1>
            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
              Each tip below includes the expected income impact and a one-action step you can take today.
              Top partners combine all 10 — average monthly income: $4,200–$8,500.
            </p>
          </div>

          <div className="space-y-4">
            {tips.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 w-6 text-center leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tip.bg}`}>
                        <Icon className={`w-4.5 h-4.5 ${tip.color}`} size={18} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h2 className="text-sm font-bold text-white leading-snug">{tip.title}</h2>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${tip.bg} ${tip.color}`}>
                          {tip.impact}
                        </span>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed mb-3">{tip.body}</p>

                      <div className="flex items-start gap-2 bg-slate-900/60 rounded-xl px-3 py-2">
                        <Zap className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-teal-300 leading-relaxed">{tip.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-gradient-to-br from-teal-500/20 to-blue-500/10 border border-teal-500/30 rounded-2xl p-6 text-center">
            <p className="text-xs font-semibold text-teal-400 mb-1 uppercase tracking-wide">Ready to act?</p>
            <h3 className="text-lg font-bold text-white mb-2">Start with 3 recruits this week</h3>
            <p className="text-sm text-slate-400 mb-4">
              Just 3 direct recruits, 3 jobs/month each, unlocks $370+/mo in passive income. That compounds as they recruit.
            </p>
            <button
              className="bg-teal-500 hover:bg-teal-400 text-[#0A1628] font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              onClick={() => window.location.href = "/network"}
            >
              Get My Referral Link
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
