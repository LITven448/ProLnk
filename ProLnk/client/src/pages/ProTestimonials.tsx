import { Star, ChevronRight, DollarSign, Users, Camera, Zap } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marcus R.",
    trade: "HVAC Technician",
    city: "Frisco",
    quote:
      "Getting paid for what the AI spots in photos I already take on every job? That pitch got me on the waitlist the same day. 45 seconds of photos for extra income — I want in.",
    earnings: "Joined for Photo AI",
    stars: 5,
    tag: "Photo AI",
  },
  {
    name: "Jennifer T.",
    trade: "Licensed Plumber",
    city: "Plano",
    quote:
      "My work photos matching me to nearby homeowners with the same aging water heaters — that is marketing I never have to do. I joined the waitlist as soon as I read how it works.",
    earnings: "Joined for Auto-Match",
    stars: 5,
    tag: "Auto-Match",
  },
  {
    name: "David C.",
    trade: "Roofer",
    city: "Allen",
    quote:
      "Storm dispatch is the feature I have wanted for years. When hail hits DFW, the roofers who get alerted first win the season. I am on the list to be one of them.",
    earnings: "Joined for Storm Dispatch",
    stars: 5,
    tag: "Storm Dispatch",
  },
  {
    name: "Sarah W.",
    trade: "Electrician",
    city: "McKinney",
    quote:
      "An AI that can flag a 40-year-old Zinsco panel from a routine photo? Most homeowners have no idea those are fire hazards. That is real safety value — and real work for electricians like me.",
    earnings: "Joined for AI Detection",
    stars: 5,
    tag: "AI Detection",
  },
  {
    name: "Carlos M.",
    trade: "Foundation Specialist",
    city: "Dallas",
    quote:
      "Every foundation job, I see plumbing and drainage issues the homeowner does not know about. A platform that rewards me for documenting what my camera spots is exactly what this trade needs.",
    earnings: "Joined for Cross-Trade",
    stars: 5,
    tag: "Cross-Trade",
  },
  {
    name: "Amy L.",
    trade: "Landscape Contractor",
    city: "Frisco",
    quote:
      "I visit 40 properties a week. If the site photos my crews already take can turn into leads and referral income, that is a no-brainer. We are ready for launch day.",
    earnings: "40 properties/week ready",
    stars: 5,
    tag: "Volume Play",
  },
  {
    name: "Kevin W.",
    trade: "HVAC Technician",
    city: "Denton",
    quote:
      "I got 3 techs from my training class onto the waitlist with me in 2 weeks. When referral overrides go live, we all win. My goal is 10 recruits by end of year.",
    earnings: "3 recruits on waitlist",
    stars: 5,
    tag: "Referrals",
  },
  {
    name: "Tiffany B.",
    trade: "Pest Control",
    city: "Garland",
    quote:
      "Pest control pros spot moisture intrusion and wood damage before anyone else does. Earning a referral cut when my findings turn into plumbing or waterproofing work? That is why I signed up.",
    earnings: "Joined for Referral Income",
    stars: 5,
    tag: "Cross-Trade",
  },
  {
    name: "Mike H.",
    trade: "Handyman",
    city: "Arlington",
    quote:
      "Handymen see everything in a home — plumbing, electrical, HVAC, roofing. A platform that rewards me for what I spot across every trade is the best pitch I have heard since going independent.",
    earnings: "Joined for Multi-Trade",
    stars: 5,
    tag: "Full Coverage",
  },
];

const BADGES = [
  { icon: <Camera className="w-4 h-4" />, label: "AI Photo Analysis" },
  { icon: <Zap className="w-4 h-4" />, label: "Storm Dispatch" },
  { icon: <DollarSign className="w-4 h-4" />, label: "Referral Rewards" },
  { icon: <Users className="w-4 h-4" />, label: "Pro Network" },
];

export default function ProTestimonials() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <div className="bg-[#0A1628] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs font-semibold mb-6">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> Why Pros Are Joining
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            What ProLnk Partners Are Saying
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real DFW pros on why they joined the waitlist.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs"
              >
                {b.icon} {b.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                \u201c{t.quote}\u201d
              </p>

              {/* Earnings callout */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2.5 mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="text-yellow-800 text-xs font-bold">{t.earnings}</span>
              </div>

              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.trade} · {t.city}</div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-[#0A1628] text-white">
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0A1628] text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Join These Pros
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-8">
            Early access is open — DFW market first.
            Every week you wait is a spot further back in line.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm transition-colors"
          >
            Join the Waitlist <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-slate-500 text-xs mt-4">
            Plans from $99/mo · No setup fees
          </p>
        </div>
      </div>
    </div>
  );
}
