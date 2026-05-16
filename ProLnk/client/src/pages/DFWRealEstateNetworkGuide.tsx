import { useState } from 'react';

const goalData: Record<string, { approach: string[]; groups: string[] }> = {
  buy: {
    approach: [
      "Lead with specificity — tell every agent exactly what you want, budget, timeline, and flexibility",
      "Build relationships with 2–3 buyer agents, not just one — creates healthy competition for your business",
      "Connect with lenders through agent referrals — pre-approval carries more weight with seller agents",
      "Join buyer Facebook groups in your target neighborhoods — off-market deals and pocket listings surface here",
      "Meet contractors before you need them — inspection findings require fast quotes to close on time",
    ],
    groups: [
      "DFW First-Time Homebuyers Facebook Group — 40,000+ members, active Q&A",
      "Nextdoor for target neighborhoods — lurk before buying to understand community dynamics",
      "Your target city Chamber of Commerce — good for referrals to local agents and lenders",
      "BiggerPockets DFW Forum — even as a buyer, investor discussions reveal what professionals know",
      "DFW Real Estate Investors Association (REIA) — monthly meetings, guests include agents and lenders",
    ],
  },
  invest: {
    approach: [
      "Position yourself as a serious buyer from first contact — investors who close fast get the best deals",
      "Build your vendor bench before you need it: plumber, electrician, HVAC, roofer, general contractor",
      "Find a transaction-experienced agent — most buyer agents are not familiar with BRRRR or fix-and-flip math",
      "Attend local REIA meetings — the best deals in DFW move through the investor network before MLS",
      "Connect with hard money lenders and private lenders early — knowing your funding sources is a competitive advantage",
    ],
    groups: [
      "DFW Real Estate Investors Association — dfwreia.com — largest REIA in Texas",
      "BiggerPockets DFW Forum — most active investor community in the metroplex online",
      "North Texas Real Estate Investors Network on Facebook — local buy and hold investors",
      "Dallas Real Estate Investor Meetup on Meetup.com — monthly events in Uptown and Plano",
      "Wholesale deal networks — connect with wholesalers at REIA events for off-MLS deals",
    ],
  },
  partner: {
    approach: [
      "Define what you offer before approaching potential partners — capital, deals, management, or expertise",
      "Joint ventures start with trust — meet in person before committing to any financial arrangement",
      "Document everything even with friends — partnership agreements prevent relationship destruction",
      "Attend mastermind-style events — small groups with high net worth participants create better partnerships",
      "Offer value first — share data, analysis, or deal flow before asking for anything in return",
    ],
    groups: [
      "DFW Multifamily Investors Group — focused on apartment and small multifamily deals",
      "Texas Real Estate Summit — annual event, high-quality networking with serious operators",
      "Urban Land Institute DFW Chapter — commercial real estate professionals and developers",
      "DFW Commercial Real Estate Networking Events on Eventbrite — varies monthly",
      "LinkedIn DFW Real Estate groups — search DFW multifamily, DFW syndication, DFW BRRRR",
    ],
  },
  network: {
    approach: [
      "Show up consistently — one event does not build relationships, consistent attendance does",
      "Be a connector — introduce people to each other and you become valuable to everyone",
      "Bring specific value: market data, referrals, or deal analysis creates reasons to stay connected",
      "Follow up within 48 hours of meeting someone — memory fades fast after events",
      "Build an email list of your network — a monthly market update positions you as a resource",
    ],
    groups: [
      "DFW Real Estate Networking Happy Hours — search Eventbrite and Meetup for current events",
      "Young Real Estate Professionals of Dallas — great for building cross-discipline connections",
      "Texas Association of Realtors events — open to non-agents, valuable for vendor connections",
      "SMU Cox Real Estate Finance alumni events — opens doors to institutional-level networking",
      "DFW CRE Summit — annual commercial real estate gathering with 500+ attendees",
    ],
  },
};

const venues = [
  { name: "DFW REIA", type: "In-Person Monthly", description: "Largest real estate investor association in Texas. Monthly meetings in Addison. Mix of seasoned investors, wholesalers, and agents.", emoji: "🏛️" },
  { name: "BiggerPockets DFW", type: "Online Forum", description: "Most active online investor community for DFW. Post deal analysis, ask local questions, find partners and agents.", emoji: "💻" },
  { name: "Chamber Events", type: "Business Networking", description: "Frisco, Plano, Allen, McKinney Chambers all host monthly mixers. Best for connecting with local business owners and service providers.", emoji: "🤝" },
  { name: "Meetup.com Groups", type: "Casual Networking", description: "DFW Real Estate Investors and related groups meet monthly. Lower barrier to entry, good for beginners.", emoji: "📅" },
];

export default function DFWRealEstateNetworkGuide() {
  const [goal, setGoal] = useState<string>("");
  const [showGuide, setShowGuide] = useState(false);

  const goals = [
    { value: "buy", label: "🏠 Buy My First/Next Home" },
    { value: "invest", label: "📈 Build an Investment Portfolio" },
    { value: "partner", label: "🤝 Find a Business Partner" },
    { value: "network", label: "🌐 Expand My Real Estate Network" },
  ];

  const selected = goalData[goal];

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", color: "#0A1628", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#1D4ED8", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK NETWORK GUIDE — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#0A1628" }}>Building Your DFW Real Estate Network 🤝</h1>
        <p style={{ color: "#475569", fontSize: 16, marginBottom: 40 }}>Agents, investors, lenders, and contractors — where to meet them and how to add value in the DFW market.</p>

        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr", marginBottom: 32 }}>
          {venues.map((v) => (
            <div key={v.name} style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{v.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{v.name}</div>
              <div style={{ color: "#1D4ED8", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{v.type}</div>
              <div style={{ color: "#475569", fontSize: 14 }}>{v.description}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🧭 Universal DFW Networking Rules</h2>
          {[
            "DFW is relationship-driven — deals, referrals, and partnerships flow through trusted connections, not cold outreach",
            "Consistency beats intensity — showing up to one event per month for a year beats attending 12 events in January",
            "Agents, lenders, and investors in DFW overlap heavily — the best agent is often an investor too",
            "Off-market deals exist but require deep relationships — they never go to strangers",
            "The DFW market moves fast — your network is your early warning system for new opportunities",
          ].map((rule, i) => (
            <div key={i} style={{ color: "#475569", fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: "3px solid #1D4ED8" }}>{rule}</div>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #E2E8F0" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🎯 Your Personalized DFW Networking Strategy</h2>
          <p style={{ color: "#475569", fontSize: 14, marginBottom: 16 }}>What is your primary goal right now?</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {goals.map((g) => (
              <button key={g.value} onClick={() => { setGoal(g.value); setShowGuide(true); }}
                style={{ background: goal === g.value ? "#0A1628" : "#F1F5F9", color: goal === g.value ? "#fff" : "#0A1628", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {g.label}
              </button>
            ))}
          </div>
          {showGuide && selected && (
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div style={{ color: "#1D4ED8", fontWeight: 700, marginBottom: 10 }}>🧠 Best Approach for Your Goal</div>
                {selected.approach.map((a, i) => <div key={i} style={{ color: "#475569", fontSize: 13, marginBottom: 8 }}>• {a}</div>)}
              </div>
              <div>
                <div style={{ color: "#1D4ED8", fontWeight: 700, marginBottom: 10 }}>📍 Specific DFW Groups to Join</div>
                {selected.groups.map((g, i) => <div key={i} style={{ color: "#475569", fontSize: 13, marginBottom: 8 }}>• {g}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
