import { useState } from 'react';

const roleData: Record<string, { indicators: string[]; sources: string[] }> = {
  buyer: {
    indicators: [
      "Months of supply — below 3 is seller market, above 6 is buyer market",
      "Days on market — rising DOM means less competition, more negotiating power",
      "List-to-sale ratio — above 100% means homes sell over asking (bad for buyers)",
      "New listings added weekly — more supply means more options and less urgency",
      "Mortgage rate trend — every 0.25% shift changes payment by ~$50/month per $300K",
    ],
    sources: [
      "HAR.com — Houston Association of Realtors monthly reports (DFW data included)",
      "NTREIS.net — North Texas Real Estate Info Systems, official MLS data",
      "Redfin Data Center — redfin.com/news/data-center — free downloadable CSVs",
      "Zillow Research — zillow.com/research — metro-level market reports",
      "Texas A&M Real Estate Center — trerc.tamu.edu — academic-grade monthly data",
    ],
  },
  seller: {
    indicators: [
      "Months of supply — below 2 is prime seller market in DFW",
      "List-to-sale ratio — if above 100%, hold firm on price",
      "Days on market by zip code — know your micro-market, not just metro average",
      "Absorption rate — how fast homes in your price band are selling",
      "Pending sales volume — leading indicator of buyer demand 30–45 days out",
    ],
    sources: [
      "NTREIS monthly report — best source for zip-level DFW seller data",
      "Realtor.com Market Trends — realtor.com/research/market-trends",
      "CoreLogic HPI — tracks DFW price appreciation by month",
      "Local agent CMA — comparative market analysis for your specific neighborhood",
      "Redfin Compete Score — shows how competitive your zip code is right now",
    ],
  },
  investor: {
    indicators: [
      "Cap rates by submarket — Frisco vs. Oak Cliff vs. East Dallas differ significantly",
      "Rent growth rate — CoStar and ApartmentList track DFW monthly",
      "Vacancy rates — DFW multifamily vacancy under 6% is healthy for landlords",
      "New construction permits — tells you future supply pressure 12–18 months out",
      "Job growth by corridor — I-35 vs. 121 vs. 75 corridor employment trends matter",
    ],
    sources: [
      "CoStar — paid but industry standard for multifamily data in DFW",
      "BiggerPockets DFW Forum — local investor discussions with real numbers",
      "CBRE DFW Research — quarterly commercial real estate reports, free",
      "Texas Workforce Commission — txworkforce.org — employment by county",
      "Dallas Fed — dallasfed.org/research — economic outlook reports",
    ],
  },
  homeowner: {
    indicators: [
      "Your zip code appreciation rate — how much equity you are building annually",
      "Comparable sales — what similar homes near you are actually closing for",
      "Property tax appraisal trends — DCAD.org and Tarrant Appraisal District update annually",
      "HOA financial health — reserve fund adequacy affects your home value",
      "School district rating changes — GreatSchools scores affect neighborhood demand",
    ],
    sources: [
      "DCAD.org — Dallas Central Appraisal District, see your assessed value and comps",
      "Tarrant Appraisal District — tad.org — Fort Worth area equivalent",
      "Zillow Zestimate history — rough but directionally useful for tracking",
      "Neighborhood Facebook groups — off-market sales and local intel",
      "Your city building permit portal — track nearby development activity",
    ],
  },
};

const indicators = [
  { name: "Months of Supply", description: "How long inventory would last at current sales pace. Under 3 = seller market. Over 6 = buyer market.", emoji: "📦" },
  { name: "Days on Market", description: "Average days from listing to contract. Rising DOM signals weakening demand.", emoji: "📅" },
  { name: "List-to-Sale Ratio", description: "If 103%, homes sell 3% over asking on average. Key signal of bidding war intensity.", emoji: "💰" },
  { name: "New Listings", description: "Weekly new inventory added. Spike means sellers are exiting — can signal price softening.", emoji: "🏠" },
  { name: "Pending Sales", description: "Homes under contract but not closed. Leading indicator 30–45 days ahead of closings.", emoji: "📝" },
];

export default function DFWMarketWatchGuide() {
  const [role, setRole] = useState<string>("");
  const [showData, setShowData] = useState(false);

  const roles = [
    { value: "buyer", label: "🏠 Active Buyer" },
    { value: "seller", label: "🏷️ Preparing to Sell" },
    { value: "investor", label: "📈 Real Estate Investor" },
    { value: "homeowner", label: "🔑 Current Homeowner" },
  ];

  const selected = roleData[role];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642″, fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK MARKET INTELLIGENCE — DFW 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>DFW Market Watch Guide 📊</h1>
        <p style={{ color: "#8899AA", fontSize: 16, marginBottom: 40 }}>How to monitor Dallas-Fort Worth real estate market conditions like a professional — ongoing, for free.</p>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📡 The 5 Key Indicators to Track</h2>
          {indicators.map((ind) => (
            <div key={ind.name} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid #1E2D42″ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{ind.emoji} {ind.name}</div>
              <div style={{ color: "#8899AA", fontSize: 14 }}>{ind.description}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔍 How to Interpret DFW Data</h2>
          {[
            "DFW is not one market — Allen and Garland behave completely differently. Always look at zip-level data.",
            "Metro averages lag 60–90 days — pending sales and new listings are your real-time signal.",
            "Compare your submarket to its own history, not to national averages — DFW has outperformed for a decade.",
            "Seasonality matters — January through March shows distorted low volume. Spring is the true signal.",
            "Investor activity inflates DFW data — cash purchase percentages vary wildly by zip code.",
          ].map((tip, i) => (
            <div key={i} style={{ color: "#CBD5E1″, fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: "2px solid #F5E642" }}>{tip}</div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🎯 What to Watch Based on Your Role</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {roles.map((r) => (
              <button key={r.value} onClick={() => { setRole(r.value); setShowData(true); }}
                style={{ background: role === r.value ? "#F5E642″ : "#1E2D42", color: role === r.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {r.label}
              </button>
            ))}
          </div>
          {showData && selected && (
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 10 }}>📊 Priority Indicators for You</div>
                {selected.indicators.map((ind, i) => <div key={i} style={{ color: "#CBD5E1″, fontSize: 13, marginBottom: 8 }}>• {ind}</div>)}
              </div>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 10 }}>🔗 Best Free Data Sources</div>
                {selected.sources.map((s, i) => <div key={i} style={{ color: "#CBD5E1″, fontSize: 13, marginBottom: 8 }}>• {s}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
