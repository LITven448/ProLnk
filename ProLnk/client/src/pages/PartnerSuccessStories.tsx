import { useState } from "react";
import { Award, ArrowRight, Send, CheckCircle } from "lucide-react";

interface Story {
  name: string;
  trade: string;
  location: string;
  tier: string;
  avatar: string;
  headline: string;
  quote: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const STORIES: Story[] = [
  {
    name: "Marcus T.",
    trade: "HVAC",
    location: "DFW",
    tier: "Company",
    avatar: "MT",
    headline: "Closed $28K in jobs in his first 3 months",
    quote:
      "The Lead Distributor sends me matched jobs before I'd normally even know they exist. I'm not chasing calls or paying for garbage leads anymore — the platform pre-qualifies everything. My close rate went from 31% to 58% because I'm only talking to homeowners who already want what I do.",
    stats: [
      { label: "Jobs closed (first 90 days)", value: "14" },
      { label: "Total job value", value: "$28,400" },
      { label: "Commission earned", value: "$20,448" },
      { label: "Close rate", value: "58%" },
    ],
    tags: ["Lead Distributor", "High Close Rate", "Company Tier"],
  },
  {
    name: "Elena P.",
    trade: "Roofing",
    location: "Dallas",
    tier: "Company",
    avatar: "EP",
    headline: "Built a 7-person network in 60 days",
    quote:
      "I was skeptical about the network income piece. Felt like MLM talk. But when my Level-1 recruits started closing jobs and I saw $400 show up in my dashboard without lifting a finger, it clicked. I've since invited 12 pros — 7 are active. My override income is now $400 to $600 a month and growing every week.",
    stats: [
      { label: "Active recruits (Level 1)", value: "7" },
      { label: "Monthly network overrides", value: "$420" },
      { label: "Total network job value", value: "$6,000/mo" },
      { label: "Days to first override", value: "18" },
    ],
    tags: ["Network Income", "Referral Champion", "Passive Overrides"],
  },
  {
    name: "Carlos R.",
    trade: "Electrician",
    location: "Fort Worth",
    tier: "Pro",
    avatar: "CR",
    headline: "Earned $150 commission from a neighbor referral in 30 seconds",
    quote:
      "My neighbor mentioned his panel needed upgrading. I pulled up the ProLnk app, filled in his address and what he needed, and submitted it. Thirty seconds. Two weeks later he booked the job through TrustyPro, it got matched back to me, and I earned a $150 origination commission. I now document every home I visit — it's free money on autopilot.",
    stats: [
      { label: "Homes documented", value: "34" },
      { label: "Origination commissions earned", value: "$890" },
      { label: "Time to document a home", value: "~30 sec" },
      { label: "Projected annual origination income", value: "$3,200+" },
    ],
    tags: ["Home Origination Rights", "Fast Onboarding", "Pro Tier"],
  },
  {
    name: "Sandra M.",
    trade: "Plumbing",
    location: "Plano, TX",
    tier: "Crew",
    avatar: "SM",
    headline: "Replaced her slow season with $8K in matched leads",
    quote:
      "November and December used to kill my revenue. This year I activated ProLnk in October and had 6 matched jobs by Thanksgiving. The platform doesn't care what month it is — homeowners need plumbers year-round. My slow season is gone.",
    stats: [
      { label: "Slow-season jobs closed", value: "6" },
      { label: "Total job value (Nov–Dec)", value: "$8,200" },
      { label: "Commission earned", value: "$5,330" },
      { label: "Average job size", value: "$1,367" },
    ],
    tags: ["Seasonal Coverage", "Consistent Leads", "Crew Tier"],
  },
];

const TIER_COLORS: Record<string, string> = {
  Scout: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Pro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Crew: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Company: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Enterprise: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function PartnerSuccessStories() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", trade: "", story: "", email: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="h-6 w-6 text-teal-400" />
            Partner Success Stories
          </h1>
          <p className="text-slate-400 mt-1">
            Real results from ProLnk Founding Network partners in the DFW market.
          </p>
        </div>

        {/* Stories */}
        <div className="space-y-6">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className="rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden"
            >
              {/* Story header */}
              <div className="p-6 border-b border-slate-700/60">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {story.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{story.name}</span>
                      <span className="text-slate-500 text-sm">{story.trade} · {story.location}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TIER_COLORS[story.tier] ?? ""}`}>
                        {story.tier}
                      </span>
                    </div>
                    <p className="text-teal-400 text-sm font-medium">{story.headline}</p>
                  </div>
                </div>

                <blockquote className="mt-4 text-slate-300 text-sm leading-relaxed border-l-2 border-teal-500/40 pl-4 italic">
                  "{story.quote}"
                </blockquote>

                <div className="flex flex-wrap gap-2 mt-4">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-700/60">
                {story.stats.map((stat) => (
                  <div key={stat.label} className="p-4 text-center">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Share your story */}
        <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 overflow-hidden">
          <div className="p-6 border-b border-teal-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg p-2 bg-teal-500/10 border border-teal-500/20">
                <Send className="h-4 w-4 text-teal-400" />
              </div>
              <h2 className="text-white font-bold text-lg">Share Your Story</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Featured partners receive a ProLnk verified badge, priority placement in homeowner search results,
              and a dedicated profile page linked from prolnk.io.
            </p>
          </div>

          <div className="p-6">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle className="h-10 w-10 text-teal-400" />
                <p className="text-white font-semibold">Story submitted — thank you!</p>
                <p className="text-slate-400 text-sm">
                  Our team will reach out within 3 business days if we select your story for the platform.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Your Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Marcus T."
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Trade</label>
                    <input
                      required
                      type="text"
                      value={form.trade}
                      onChange={(e) => setForm((f) => ({ ...f, trade: e.target.value }))}
                      placeholder="e.g. HVAC, Roofing, Plumbing"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Your Story{" "}
                    <span className="text-slate-600 font-normal">(what results did ProLnk help you achieve?)</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.story}
                    onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                    placeholder="Describe a specific win — a job you closed, passive income you earned, a homeowner you helped, or a network you built."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-white text-sm font-medium transition-colors"
                >
                  Submit My Story
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6 text-center">
          <p className="text-white font-semibold mb-1">Ready to write your own story?</p>
          <p className="text-slate-400 text-sm mb-4">
            The Founding Network waitlist closes at 500 approvals. Secure your spot today.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0A1628] hover:bg-[#0d1f3c] text-white text-sm font-medium transition-colors"
          >
            Apply to Founding Network
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
