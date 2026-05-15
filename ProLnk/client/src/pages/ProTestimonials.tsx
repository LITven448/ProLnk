import { Star, ChevronRight, DollarSign, Users, Camera, Zap } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marcus R.",
    trade: "HVAC Technician",
    city: "Frisco",
    quote:
      "I made $312 on a job I already completed. Uploaded 4 photos of the condenser and air handler, took 45 seconds. The AI flagged a failing capacitor in the neighbor\'s unit from my rooftop photos. Didn\'t even know that was possible.",
    earnings: "$312 from one job",
    stars: 5,
    tag: "Photo AI",
  },
  {
    name: "Jennifer T.",
    trade: "Licensed Plumber",
    city: "Plano",
    quote:
      "My water heater photos generated 3 inspection requests in 24 hours. I didn\'t call anyone. The platform matched my work photos to nearby homeowners with the same unit age. I booked all 3.",
    earnings: "3 new jobs in 24 hrs",
    stars: 5,
    tag: "Auto-Match",
  },
  {
    name: "David C.",
    trade: "Roofer",
    city: "Allen",
    quote:
      "Storm dispatch sent me 8 leads within 2 hours of the hail event hitting my service area. I booked 5 of them before my competitors even got the alert. The response time advantage alone is worth the membership.",
    earnings: "5 storm jobs booked",
    stars: 5,
    tag: "Storm Dispatch",
  },
  {
    name: "Sarah W.",
    trade: "Electrician",
    city: "McKinney",
    quote:
      "The panel photo AI is scary accurate. It flagged a 40-year-old Zinsco panel I photographed during a routine visit — homeowner had no idea it was a fire hazard. That turned into a $4,800 panel replacement. I\'d have missed it.",
    earnings: "$4,800 panel job",
    stars: 5,
    tag: "AI Detection",
  },
  {
    name: "Carlos M.",
    trade: "Foundation Specialist",
    city: "Dallas",
    quote:
      "Every foundation job I do, I upload photos of what I find. My photos have generated $4,200 in cross-trade commission in 3 months — plumbers, HVAC, electricians all getting work from what my camera spotted. It\'s a whole second income stream.",
    earnings: "$4,200 cross-trade",
    stars: 5,
    tag: "Network Earnings",
  },
  {
    name: "Amy L.",
    trade: "Landscape Contractor",
    city: "Frisco",
    quote:
      "I visit 40 properties a week. My crews started uploading site photos last quarter. It\'s now my second biggest income source — more than some of my landscape contracts. The homes are right there. The photos take 30 seconds.",
    earnings: "2nd income stream",
    stars: 5,
    tag: "Volume Play",
  },
  {
    name: "Kevin W.",
    trade: "HVAC Technician",
    city: "Denton",
    quote:
      "I recruited 3 techs from my training class — took me 2 weeks. They earn, I earn 7% of their job commissions automatically. That\'s $180/month I didn\'t work for. My goal is 10 recruits by end of year.",
    earnings: "$180/mo passive",
    stars: 5,
    tag: "Network Income",
  },
  {
    name: "Tiffany B.",
    trade: "Pest Control",
    city: "Garland",
    quote:
      "I honestly didn\'t think pest control would generate much. But detecting moisture intrusion and wood damage pays more than the treatment itself. I\'m now the referral source for 2 plumbers and a waterproofing crew — and I get a cut of everything.",
    earnings: "3 trade partnerships",
    stars: 5,
    tag: "Cross-Trade",
  },
  {
    name: "Mike H.",
    trade: "Handyman",
    city: "Arlington",
    quote:
      "Handymen see everything in a home. Plumbing, electrical, HVAC, roofing — I touch all of it. My photos generate leads for 4 other trades and I earn commission on every one. Best decision I\'ve made since going independent.",
    earnings: "4 trade referral streams",
    stars: 5,
    tag: "Full Coverage",
  },
];

const BADGES = [
  { icon: <Camera className="w-4 h-4" />, label: "AI Photo Analysis" },
  { icon: <Zap className="w-4 h-4" />, label: "Storm Dispatch" },
  { icon: <DollarSign className="w-4 h-4" />, label: "5 Income Streams" },
  { icon: <Users className="w-4 h-4" />, label: "4-Level Network" },
];

export default function ProTestimonials() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <div className="bg-[#0A1628] text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs font-semibold mb-6">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> Partner Success Stories
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            What ProLnk Partners Are Saying
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Real DFW pros, real numbers — no embellishment.
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
            Charter membership closes at 500 applicants. DFW market only.
            Every week you wait is leads someone else is capturing.
          </p>
          <a
            href="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm transition-colors"
          >
            Apply Now — Charter Pricing <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-slate-500 text-xs mt-4">
            $149/mo locked for life after acceptance · No setup fees
          </p>
        </div>
      </div>
    </div>
  );
}
