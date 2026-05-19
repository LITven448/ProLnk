import { useState } from 'react';
import { Link } from "wouter";
import { Users, DollarSign, MessageSquare, TrendingUp, ChevronDown, ChevronUp, ArrowRight, Star } from "lucide-react";

const PARTNER_PROFILES = [
  {
    type: "Trade Peers",
    icon: Users,
    tagline: "Best source — they already understand the value",
    description: "HVAC techs recruit other HVAC techs. Plumbers recruit plumbers. People in the same trade trust each other's judgment on work opportunities.",
    script: "Hey [Name], I started using ProLnk for leads — it's been solid. You should check it out. I get 7% of what you close too, so I'll actually help you get started. Want me to send you the link?",
    where: "Job sites, trade school alumni groups, union halls, manufacturer training events",
  },
  {
    type: "Complementary Trades",
    icon: TrendingUp,
    tagline: "Roofers + HVAC + foundation = perfect trifecta",
    description: "Trades that serve the same homeowner at different times are natural recruiting partners. A roofer who recruits an HVAC tech and a foundation specialist now has overrides in 3 high-ticket verticals.",
    script: "I know you do [their trade] and I do roofing. Our customers overlap a ton. I'm on ProLnk and it's been good — think you'd like it. And if you join under me, I earn a little each time you close a job. Worth 10 minutes to look at?",
    where: "Supply houses, building inspector lines, subcontractor networks, permit offices",
  },
  {
    type: "Suppliers & Distributors",
    icon: Star,
    tagline: "They know every contractor in your market",
    description: "Lumber yards, HVAC supply houses, plumbing suppliers, and electrical distributors see every contractor who operates locally. One supplier relationship can unlock dozens of recruits.",
    script: "You guys see every contractor in DFW. Would you be open to putting a ProLnk flyer at your counter? I'll share the earnings if anyone joins through my link — and so will they when their recruits close jobs.",
    where: "Fastenal, Johnstone Supply, Ferguson plumbing, local lumber yards, ABC Supply roofing",
  },
  {
    type: "Former Colleagues",
    icon: Users,
    tagline: "Trust is already established",
    description: "People you've worked alongside at previous companies or job sites already know your character. The trust barrier is zero.",
    script: "Hey — remember when we worked together at [Company]? I started doing leads through ProLnk and it's been good. You still doing [trade]? I think you'd be a fit. Let me send you the info.",
    where: "Text or call directly — no platform needed",
  },
  {
    type: "Facebook Trade Groups",
    icon: MessageSquare,
    tagline: "DFW has dozens of active contractor groups",
    description: "Groups like 'DFW HVAC Pros,' 'North Texas Contractors Network,' and 'Dallas Roofers' have thousands of members actively looking for work opportunities.",
    script: "Hey everyone — anyone else using ProLnk for leads? I've been on for [X months] and it's been worth it. Also earn overrides when people I recruit close jobs. If you're curious, drop a comment or DM me your email.",
    where: "Facebook Groups: DFW HVAC Pros, North Texas Contractors, Dallas Plumbing & Mechanical",
  },
];

const COMPOUNDING_EXAMPLE = {
  you: { directJobs: 5000, recruits: 10 },
  level1: { perPerson: 3000, override: 0.07, count: 10 },
  level2: { perPerson: 2500, override: 0.04, count: 50 },
  level3: { perPerson: 2000, override: 0.02, count: 250 },
};

export default function ProRecruitingGuide() {
  const [openProfile, setOpenProfile] = useState<number | null>(0);
  const [openApproach, setOpenApproach] = useState<number | null>(null);

  const l1Income = compounding_example_l1Income();
  const l2Income = compounding_example_l2Income();
  const l3Income = compounding_example_l3Income();
  const totalPassive = l1Income + l2Income + l3Income;

  function compounding_example_l1Income() {
    return COMPOUNDING_EXAMPLE.level1.count * COMPOUNDING_EXAMPLE.level1.perPerson * COMPOUNDING_EXAMPLE.level1.override;
  }
  function compounding_example_l2Income() {
    return COMPOUNDING_EXAMPLE.level2.count * COMPOUNDING_EXAMPLE.level2.perPerson * COMPOUNDING_EXAMPLE.level2.override;
  }
  function compounding_example_l3Income() {
    return COMPOUNDING_EXAMPLE.level3.count * COMPOUNDING_EXAMPLE.level3.perPerson * COMPOUNDING_EXAMPLE.level3.override;
  }

  const APPROACHES = [
    {
      title: "Text Message (Highest Reply Rate)",
      template: `Hey [Name] — you still doing [trade]? I've been getting leads through ProLnk and it's been solid. They have a network system where I earn 7% of what you close if you join under me. Worth a quick look? I'll send you my link.`,
      when: "Best for trade peers and former colleagues you have saved in your phone",
    },
    {
      title: "In-Person (Highest Conversion Rate)",
      template: `"Hey, you heard of ProLnk? I've been using them for leads. Pretty solid — no door-to-door, they match you with homeowners looking for quotes. I also earn a cut of what you close if you sign up under me. Here's my card with the link — check it out tonight."`,
      when: "Best at supply houses, job sites, trade shows, and union halls",
    },
    {
      title: "Social Media Post (Highest Reach)",
      template: `Anyone in DFW doing [your trade] — I've been on ProLnk for a while and the leads have been decent quality. They also have a network income system where I earn overrides when people I recruit close jobs. If you want my referral link so I can track your progress and help you get started, drop a comment or DM me.`,
      when: "Best for Facebook trade groups, LinkedIn, and Instagram Stories",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF9″, color: "#0A1628" }}>
      {/* Header */}
      <div style={{ background: "#0A1628″ }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="text-white font-black text-xl tracking-tight cursor-pointer">
              Pro<span style={{ color: "#F5E642″ }}>Lnk</span>
            </span>
          </Link>
          <Link href="/apply">
            <span className="text-xs font-semibold px-4 py-2 rounded-full cursor-pointer" style={{ background: "#F5E642″, color: "#0A1628" }}>
              Apply Now
            </span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "#0A1628″ }} className="px-6 pt-12 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-6″ style={{ background: "rgba(245,230,66,0.15)", color: "#F5E642", border: "1px solid rgba(245,230,66,0.3)" }}>
            <DollarSign className="w-4 h-4″ />
            Stream 2: Network Override Income
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
            The ProLnk Recruiting Guide — Build a Network That Pays You Forever
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Your direct recruits earn you 7% of their commission income forever. 10 recruits averaging $3,000/mo each = $2,100/mo passive — on top of your own jobs.
          </p>
        </div>
      </div>

      {/* Why Recruit */}
      <div className="max-w-4xl mx-auto px-6 py-12″>
        <div className="rounded-2xl p-6 mb-10″ style={{ background: "white", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h2 className="text-xl font-black mb-5″ style={{ color: "#0A1628" }}>Why Recruiting Matters</h2>
          <div className="grid sm:grid-cols-3 gap-4″>
            {[
              { label: "L1 Override (Your Recruits)", value: "7%", detail: "Of every job they close, forever" },
              { label: "L2 Override (Their Recruits)", value: "4%", detail: "You earn from their recruits too" },
              { label: "Subscription Override", value: "12%", detail: "Of their $149/mo, recurring" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-5 text-center" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB" }}>
                <div className="text-3xl font-black mb-1″ style={{ color: "#14B8A6" }}>{item.value}</div>
                <div className="font-bold text-sm mb-1″ style={{ color: "#0A1628" }}>{item.label}</div>
                <div className="text-xs" style={{ color: "#6B7280″ }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Profiles */}
        <h2 className="text-2xl font-black mb-6″ style={{ color: "#0A1628" }}>5 Ideal Recruiting Targets</h2>
        <div className="space-y-3 mb-12″>
          {PARTNER_PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #E5E7EB" }}>
                <button onClick={() => setOpenProfile(openProfile === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <div className="flex items-center gap-4″>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0″ style={{ background: "rgba(20,184,166,0.1)" }}>
                      <Icon className="w-5 h-5″ style={{ color: "#14B8A6" }} />
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#0A1628″ }}>{profile.type}</div>
                      <div className="text-xs mt-0.5″ style={{ color: "#6B7280" }}>{profile.tagline}</div>
                    </div>
                  </div>
                  {openProfile === i ? <ChevronUp className="w-5 h-5 shrink-0″ style={{ color: "#9CA3AF" }} /> : <ChevronDown className="w-5 h-5 shrink-0" style={{ color: "#9CA3AF" }} />}
                </button>
                {openProfile === i && (
                  <div className="px-6 pb-6 border-t" style={{ borderColor: "#F3F4F6″ }}>
                    <p className="text-sm leading-relaxed mt-5 mb-4″ style={{ color: "#4B5563" }}>{profile.description}</p>
                    <div className="rounded-xl p-4 mb-4″ style={{ background: "#F0FDF4", border: "1px solid #D1FAE5" }}>
                      <div className="text-xs font-bold mb-2″ style={{ color: "#059669" }}>Script to Use:</div>
                      <p className="text-sm italic leading-relaxed" style={{ color: "#374151″ }}>"{profile.script}"</p>
                    </div>
                    <div className="text-xs" style={{ color: "#6B7280″ }}>
                      <span className="font-semibold">Where to find them: </span>{profile.where}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 3 Recruiting Approaches */}
        <h2 className="text-2xl font-black mb-6″ style={{ color: "#0A1628" }}>3 Recruiting Approaches with Scripts</h2>
        <div className="space-y-3 mb-12″>
          {APPROACHES.map((approach, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #E5E7EB" }}>
              <button onClick={() => setOpenApproach(openApproach === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <div className="flex items-center gap-3″>
                  <MessageSquare className="w-5 h-5″ style={{ color: "#14B8A6" }} />
                  <span className="font-bold text-sm" style={{ color: "#0A1628″ }}>{approach.title}</span>
                </div>
                {openApproach === i ? <ChevronUp className="w-5 h-5″ style={{ color: "#9CA3AF" }} /> : <ChevronDown className="w-5 h-5" style={{ color: "#9CA3AF" }} />}
              </button>
              {openApproach === i && (
                <div className="px-6 pb-6 border-t" style={{ borderColor: "#F3F4F6″ }}>
                  <div className="rounded-xl p-4 mt-5 mb-3″ style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "#1E40AF" }}>{approach.template}</p>
                  </div>
                  <p className="text-xs" style={{ color: "#6B7280″ }}><span className="font-semibold">Best when: </span>{approach.when}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compounding Effect */}
        <div className="rounded-2xl p-8″ style={{ background: "#0A1628", color: "white" }}>
          <h2 className="text-2xl font-black mb-2″>The Compounding Effect</h2>
          <p className="text-sm mb-8″ style={{ color: "rgba(255,255,255,0.5)" }}>
            Illustrative example — what 3 tiers of recruiting looks like at modest averages
          </p>
          <div className="space-y-4 mb-8″>
            <div className="rounded-xl p-5″ style={{ background: "rgba(245,230,66,0.1)", border: "1px solid rgba(245,230,66,0.3)" }}>
              <div className="flex justify-between items-center mb-2″>
                <span className="font-bold">You (L0)</span>
                <span className="font-black text-lg" style={{ color: "#F5E642″ }}>$5,000/mo own jobs</span>
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Your direct commission from jobs you close</div>
            </div>
            <div className="rounded-xl p-5″ style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)" }}>
              <div className="flex justify-between items-center mb-2″>
                <span className="font-bold">L1 — 10 direct recruits @ $3,000/mo avg</span>
                <span className="font-black text-lg" style={{ color: "#14B8A6″ }}>${l1Income.toLocaleString()}/mo</span>
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>7% × $3,000 × 10 recruits</div>
            </div>
            <div className="rounded-xl p-5″ style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)" }}>
              <div className="flex justify-between items-center mb-2″>
                <span className="font-bold">L2 — 50 recruits (each L1 recruits 5) @ $2,500/mo avg</span>
                <span className="font-black text-lg" style={{ color: "#60A5FA" }}>${l2Income.toLocaleString()}/mo</span>
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>4% × $2,500 × 50 recruits</div>
            </div>
            <div className="rounded-xl p-5″ style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
              <div className="flex justify-between items-center mb-2″>
                <span className="font-bold">L3 — 250 recruits (each L2 recruits 5) @ $2,000/mo avg</span>
                <span className="font-black text-lg" style={{ color: "#C084FC" }}>${l3Income.toLocaleString()}/mo</span>
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>2% × $2,000 × 250 recruits</div>
            </div>
          </div>
          <div className="flex items-center justify-between p-5 rounded-xl" style={{ background: "rgba(245,230,66,0.15)", border: "1px solid rgba(245,230,66,0.4)" }}>
            <div>
              <div className="font-black text-xl">Total Monthly Income</div>
              <div className="text-sm mt-0.5″ style={{ color: "rgba(255,255,255,0.5)" }}>Your jobs + 3 levels of network passive</div>
            </div>
            <div className="font-black text-3xl" style={{ color: "#F5E642″ }}>
              ${(5000 + totalPassive).toLocaleString()}/mo
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link href="/apply">
            <span className="inline-flex items-center gap-2 font-bold px-10 py-5 rounded-2xl cursor-pointer text-lg" style={{ background: "#14B8A6″, color: "white" }}>
              Apply to Join ProLnk <ArrowRight className="w-5 h-5″ />
            </span>
          </Link>
          <p className="mt-3 text-sm" style={{ color: "#6B7280″ }}>90-day free trial · No credit card required · Lock your founding rate</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t mt-4″ style={{ borderColor: "#E5E7EB" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3″>
          <Link href="/">
            <span className="font-black text-lg cursor-pointer" style={{ color: "#0A1628″ }}>Pro<span style={{ color: "#F5E642" }}>Lnk</span></span>
          </Link>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>© 2026 ProLnk. All rights reserved.</p>
          <div className="flex gap-4 text-xs" style={{ color: "#6B7280″ }}>
            <Link href="/"><span className="cursor-pointer hover:underline">Home</span></Link>
            <Link href="/apply"><span className="cursor-pointer hover:underline">Apply</span></Link>
            <Link href="/pricing"><span className="cursor-pointer hover:underline">Pricing</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
