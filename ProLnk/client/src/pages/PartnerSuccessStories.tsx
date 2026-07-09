import { useState } from 'react';
import { Award, ArrowRight, Send, CheckCircle, Play, TrendingUp, Users, DollarSign } from 'lucide-react';
import type { FormEvent } from 'react';
import { Link } from 'wouter';

interface Story {
  name: string;
  trade: string;
  city: string;
  tier: string;
  avatar: string;
  before: string;
  turning: string;
  current: string;
  earnings: string;
  networkSize: string;
  keyWin: string;
  quote: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const FEATURED_STORY = {
  name: 'Carlos M.',
  trade: 'HVAC',
  location: 'Dallas, TX',
  tier: 'Company',
  avatar: 'CM',
  headline: 'How Carlos M. earned $8,400 passive income by recruiting 12 HVAC techs',
  body: 'I spent 11 years doing HVAC solo. Good money, but every dollar required me on a job site. When a buddy told me about ProLnk\’s network income, I didn\’t believe you could build real passive income in the trades — not without a franchise. I was wrong. I started by joining as a Company-tier partner and closed 8 matched jobs in the first month. Then I started talking to the other HVAC guys I knew. Within 6 months, 12 of them were active on ProLnk. Now every time one of my Level-1 techs closes a $3,000 job, I earn $90 automatically. Multiply that by 12 techs doing 4–6 jobs a month each and the math gets stupid fast. Last quarter I collected $8,400 in network overrides — while I was on vacation in Cabo.',
  keyNumbers: [
    { icon: 'users', label: 'Active Level-1 recruits', value: '12' },
    { icon: 'dollar', label: 'Network overrides (last quarter)', value: '$8,400' },
    { icon: 'trend', label: 'Direct commission rate (Company tier)', value: '60%' },
  ],
};

const STORIES: Story[] = [
  {
    name: 'Marcus T.',
    trade: 'HVAC',
    city: 'DFW',
    tier: 'Company',
    avatar: 'MT',
    before: 'I was buying leads off Angi for $400/month. Half of them ghosted me, and the other half were shopping 6 other contractors at the same time. My close rate was 31% and every sale felt like a fight.',
    turning: 'The moment I uploaded my first photos from a spring tune-up and the AI flagged a failed capacitor plus a refrigerant issue — and ProLnk matched me to a homeowner who\’d already confirmed they needed the same services — I knew this was different. That job closed in 45 minutes.',
    current: 'Fourteen jobs in the first 90 days. $20,448 in commissions. Close rate jumped to 58% because I\’m only talking to homeowners who already want what I do.',
    earnings: '$20,448',
    networkSize: '0 (solo)',
    keyWin: '2x close rate in first quarter',
    quote: 'The Lead Distributor sends me matched jobs before I\’d normally even know they exist. I\’m not chasing calls or paying for garbage leads anymore — the platform pre-qualifies everything.',
    stats: [
      { label: 'Jobs closed (first 90 days)', value: '14' },
      { label: 'Total job value', value: '$28,400' },
      { label: 'Commission earned', value: '$20,448' },
      { label: 'Close rate', value: '58%' },
    ],
    tags: ['Lead Distributor', 'High Close Rate', 'Company Tier'],
  },
  {
    name: 'Elena P.',
    trade: 'Roofing',
    city: 'Dallas',
    tier: 'Company',
    avatar: 'EP',
    before: 'Before ProLnk, I was driving storm-chasing vans after every hail event, knocking on doors, and competing with 20 other roofers for the same insurance-funded job. Margins were getting squeezed every season.',
    turning: 'The moment a homeowner I\’d never met called me — not because I knocked on their door, but because ProLnk matched them to me based on my specific certifications and their insurance claim — I realized I didn\’t have to chase anymore.',
    current: 'I\’ve built a 7-person network in 60 days. My override income is $400–$600/month and growing. And I haven\’t knocked on a single door since March.',
    earnings: '$420/mo network overrides',
    networkSize: '7 active',
    keyWin: 'Stopped door-knocking entirely',
    quote: 'I was skeptical about the network income piece. Felt like MLM talk. But when my Level-1 recruits started closing jobs and I saw $400 show up in my dashboard without lifting a finger, it clicked.',
    stats: [
      { label: 'Active recruits (Level 1)', value: '7' },
      { label: 'Monthly network overrides', value: '$420' },
      { label: 'Total network job value', value: '$6,000/mo' },
      { label: 'Days to first override', value: '18' },
    ],
    tags: ['Network Income', 'Referral Champion', 'Passive Overrides'],
  },
  {
    name: 'Carlos R.',
    trade: 'Electrician',
    city: 'Fort Worth',
    tier: 'Pro',
    avatar: 'CR',
    before: 'Before ProLnk, I was doing service calls and quoting panel upgrades, then watching the homeowner shop three other electricians and pick the cheapest one. I was winning on price and losing on margin.',
    turning: 'The moment I realized that every home I visit is a documentation opportunity — that I could log my neighbor\’s panel upgrade in 30 seconds and earn a commission when it gets matched back to me — changed how I see my entire workday.',
    current: '34 homes documented. $890 in origination commissions. I project over $3,200 this year just from homes I\’ve logged while doing regular jobs in those neighborhoods.',
    earnings: '$890 origination commissions',
    networkSize: '34 homes documented',
    keyWin: '$150 from a neighbor referral in 30 seconds',
    quote: 'My neighbor mentioned his panel needed upgrading. I pulled up the ProLnk app, filled in his address and what he needed, and submitted it. Thirty seconds. Two weeks later he booked the job and I earned a $150 origination commission.',
    stats: [
      { label: 'Homes documented', value: '34' },
      { label: 'Origination commissions earned', value: '$890' },
      { label: 'Time to document a home', value: '~30 sec' },
      { label: 'Projected annual origination', value: '$3,200+' },
    ],
    tags: ['Home Origination Rights', 'Fast Onboarding', 'Pro Tier'],
  },
  {
    name: 'Sandra M.',
    trade: 'Plumbing',
    city: 'Plano, TX',
    tier: 'Crew',
    avatar: 'SM',
    before: 'Before ProLnk, I had a slow season problem. November and December were dead months — I\’d be doing $8,000 in revenue when I needed $20,000 to cover overhead and payroll. Every year I had to dip into savings.',
    turning: 'The moment I activated ProLnk in October and had 6 matched jobs lined up before Thanksgiving — without running a single ad or making a single sales call — I knew the slow season was over.',
    current: 'My slow season is gone. November–December now produce $8,200 in job value with $5,330 in commission. I stopped dipping into savings. I\’ve since referred two other plumbers in my area who are seeing the same results.',
    earnings: '$5,330 (Nov–Dec alone)',
    networkSize: '2 referred plumbers',
    keyWin: 'Eliminated the slow season entirely',
    quote: 'November and December used to kill my revenue. This year I activated ProLnk in October and had 6 matched jobs by Thanksgiving. The platform doesn\’t care what month it is — homeowners need plumbers year-round.',
    stats: [
      { label: 'Slow-season jobs closed', value: '6' },
      { label: 'Total job value (Nov–Dec)', value: '$8,200' },
      { label: 'Commission earned', value: '$5,330' },
      { label: 'Average job size', value: '$1,367' },
    ],
    tags: ['Seasonal Coverage', 'Consistent Leads', 'Crew Tier'],
  },
  {
    name: 'Tommy B.',
    trade: 'Foundation',
    city: 'McKinney, TX',
    tier: 'Company',
    avatar: 'TB',
    before: 'Before ProLnk, I was selling foundation repair cold — knocking on doors after heavy rain, driving neighborhoods and looking for visible cracks, paying $1,200/month in Facebook Ads that generated mediocre leads.',
    turning: 'The moment a homeowner contacted me through ProLnk and already had their Home Health Vault report showing documented foundation movement over 3 years — including photos from a prior contractor\’s visit — I closed the job in one conversation. No skepticism. The data spoke for itself.',
    current: '$22,000 in matched jobs in my first 60 days. I\’ve killed all my Facebook Ad spend. And I\’ve enrolled 14 of my past customers in the Home Health Vault because that data improves my long-term origination income.',
    earnings: '$22,000 (first 60 days)',
    networkSize: '14 homes enrolled',
    keyWin: 'Eliminated $1,200/mo ad spend',
    quote: 'Foundation repair is a trust sale. When the homeowner already has 3 years of documented data in their Vault showing exactly what I\’m describing, the close happens in minutes, not weeks.',
    stats: [
      { label: 'Jobs in first 60 days', value: '5' },
      { label: 'Total job value', value: '$22,000' },
      { label: 'Ad spend eliminated', value: '$1,200/mo' },
      { label: 'Homes enrolled in Vault', value: '14' },
    ],
    tags: ['Foundation', 'Home Health Vault', 'Company Tier'],
  },
  {
    name: 'Derek W.',
    trade: 'General Contractor',
    city: 'Frisco, TX',
    tier: 'Company',
    avatar: 'DW',
    before: 'Before ProLnk, I was a GC managing 6–8 subs and watching every one of them fight for the same leads I was. We were all losing margin to the same lead aggregators. The trades were commoditized.',
    turning: 'The moment I realized I could build a network across trades — not just compete within one — was when I invited a plumber, an HVAC tech, and an electrician to join ProLnk. Their jobs generate override income for me at 4 levels deep. I stopped thinking like a contractor and started thinking like a platform.',
    current: '47 active contractors in my network across 8 trades. $3,800+/month in override income. My GC work is now supplemental. The network income is the business.',
    earnings: '$3,800+/mo overrides',
    networkSize: '47 contractors, 8 trades',
    keyWin: 'Built a multi-trade network in 12 months',
    quote: 'I\’ve been a GC for 19 years. I know everybody in the trades in north DFW. I gave them the same pitch I got: better leads, guaranteed commission, passive income from your own recruits. 47 active contractors later, I get override income from four levels of my network.',
    stats: [
      { label: 'Active network contractors', value: '47' },
      { label: 'Network levels earning overrides', value: '4' },
      { label: 'Trades represented', value: '8' },
      { label: 'Monthly override income', value: '$3,800+' },
    ],
    tags: ['Network Builder', 'Multi-trade', '4-Level Cascade'],
  },
];

const TRADE_FILTERS = ['All', 'HVAC', 'Roofing', 'Plumbing', 'Electrician', 'Foundation', 'General Contractor'];

const TIER_COLORS: Record<string, string> = {
  Scout: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  Pro: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Crew: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Company: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  Enterprise: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

export default function PartnerSuccessStories() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', trade: '', story: '', email: '' });
  const [filter, setFilter] = useState('All');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const filtered = filter === 'All' ? STORIES : STORIES.filter((s) => s.trade === filter);

  const iconMap: Record<string, any> = {
    users: <Users className="h-5 w-5 text-teal-400" />,
    dollar: <DollarSign className="h-5 w-5 text-teal-400" />,
    trend: <TrendingUp className="h-5 w-5 text-teal-400" />,
  };

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
            Real DFW pros. Real ProLnk results. Their words, not ours.
          </p>
        </div>

        {/* Featured Story */}
        <div className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/60 to-slate-800/60 overflow-hidden">
          <div className="p-6 border-b border-teal-500/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                Featured Story
              </span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white font-bold text-base shrink-0">
                {FEATURED_STORY.avatar}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-lg">{FEATURED_STORY.name}</span>
                  <span className="text-slate-500 text-sm">{FEATURED_STORY.trade} · {FEATURED_STORY.location}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TIER_COLORS[FEATURED_STORY.tier] ?? ''}`}>
                    {FEATURED_STORY.tier}
                  </span>
                </div>
                <p className="text-teal-300 font-semibold">{FEATURED_STORY.headline}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{FEATURED_STORY.body}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-teal-500/20">
            {FEATURED_STORY.keyNumbers.map((kn) => (
              <div key={kn.label} className="p-5 flex flex-col items-center text-center gap-1">
                {iconMap[kn.icon]}
                <div className="text-2xl font-bold text-white mt-1">{kn.value}</div>
                <div className="text-xs text-slate-500 leading-snug">{kn.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Testimonial Placeholder */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden">
          <div className="p-5 border-b border-slate-700/60">
            <h2 className="text-white font-semibold text-base">Watch: Carlos explains the override model in 90 seconds</h2>
            <p className="text-slate-500 text-sm mt-0.5">Video testimonial — DFW Founding Network Partner</p>
          </div>
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 flex items-center justify-center cursor-pointer group">
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-teal-500/90 group-hover:bg-teal-400/90 transition-colors flex items-center justify-center shadow-xl shadow-teal-900/50">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </div>
              <span className="text-slate-400 text-sm group-hover:text-white transition-colors">Video testimonial coming soon</span>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center text-white font-bold text-xs">CM</div>
              <div>
                <p className="text-white text-xs font-medium">Carlos M.</p>
                <p className="text-slate-500 text-xs">HVAC · Dallas, TX</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter by trade */}
        <div>
          <p className="text-slate-500 text-xs mb-2 uppercase tracking-wider font-medium">Filter by trade</p>
          <div className="flex flex-wrap gap-2">
            {TRADE_FILTERS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  filter === t
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stories */}
        <div className="space-y-6">
          {filtered.map((story) => (
            <div
              key={story.name}
              className="rounded-2xl border border-slate-700 bg-slate-800/40 overflow-hidden"
            >
              {/* Story header */}
              <div className="p-6 border-b border-slate-700/60">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {story.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{story.name}</span>
                      <span className="text-slate-500 text-sm">{story.trade} · {story.city}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TIER_COLORS[story.tier] ?? ''}`}>
                        {story.tier}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Before / Turning / Current */}
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">Before ProLnk</span>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{story.before}</p>
                  </div>
                  <div>
                    <span className="text-xs text-yellow-400 font-semibold uppercase tracking-wider">The turning point</span>
                    <p className="text-slate-300 text-sm mt-1 leading-relaxed">{story.turning}</p>
                  </div>
                  <div>
                    <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">Today</span>
                    <p className="text-slate-200 text-sm mt-1 leading-relaxed">{story.current}</p>
                  </div>
                </div>

                <blockquote className="text-slate-300 text-sm leading-relaxed border-l-4 border-yellow-500/60 pl-4 italic bg-yellow-500/5 rounded-r-lg py-2 pr-3">
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
              and a dedicated profile page linked from prolnk.xyz.
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
                    Your Story <span className="text-slate-600 font-normal">(what results did ProLnk help you achieve?)</span>
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
          <p className="text-white font-semibold mb-1">Ready to start your own story?</p>
          <p className="text-slate-400 text-sm mb-4">
            The Founding Network waitlist closes at 500 approvals. Secure your spot today.
          </p>
          <Link href="/apply">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors">
              Apply to Founding Network
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
