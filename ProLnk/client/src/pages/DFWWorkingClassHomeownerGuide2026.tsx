import { useState } from 'react';

export default function DFWWorkingClassHomeownerGuide2026() {
  const [range, setRange] = useState("");

  const guides: Record<string, { title: string; icon: string; detail: string }[]> = {
    under45: [
      { icon: "⏳", title: "USDA Loan — Outer DFW Counties", detail: "Kaufman, Ellis, Johnson, and Wise counties qualify for USDA 0% down loans. $40K income can buy a $180K home." },
      { icon: "💵", title: "Texas DPA Programs", detail: "My First Texas Home: 5% down payment assistance + 30yr fixed rate. Income limit ~$85K. You qualify." },
      { icon: "📋", title: "Section 8 Homeownership", detail: "HUD Section 8 homeownership voucher program — converts rental voucher to mortgage assistance in some DFW areas." },
    ],
    "45to65": [
      { icon: "🏠", title: "FHA 3.5% in DeSoto / Lancaster", detail: "DeSoto and Lancaster have homes $175–240K. At $55K income, FHA puts you in the market with ~$8K down." },
      { icon: "🔧", title: "Trade Worker Advantage", detail: "If you work in trades (plumbing, HVAC, electrical) — your skill set is worth $15–40K in DIY maintenance savings annually." },
      { icon: "💰", title: "ProLnk Network Income", detail: "Trade workers on ProLnk can earn 1–5 income streams. Top performers earn $1,500–4,000/mo supplemental — accelerates ownership." },
    ],
    "65to85": [
      { icon: "🏡", title: "Conventional 5% — Grand Prairie", detail: "Grand Prairie and Mesquite have solid $220–280K inventory. At $70K income, conventional 5% down is achievable." },
      { icon: "📈", title: "Buy Affordable, Build Equity Fast", detail: "DFW outer suburbs appreciated 8–14% in 2023–2025. Buy in growth corridor now before prices move further." },
      { icon: "🔗", title: "ProLnk Charter — Trade Worker Tier", detail: "Tradespeople on ProLnk get Charter pricing. Refer homeowners, earn commission overrides, accelerate payoff timeline." },
    ],
    over85: [
      { icon: "🏘️", title: "Move-Up or Invest", detail: "At $85K+ you can buy primary in Mesquite/DeSoto AND consider a small rental in an outer county — house hacking model." },
      { icon: "💡", title: "ProLnk as a Business", detail: "Trade worker at this income level can launch a ProLnk business — recruit other pros, earn 4-level network income." },
      { icon: "📊", title: "Equity + Network = Wealth", detail: "Homeownership + ProLnk network income is the working class wealth stack. Two assets growing simultaneously." },
    ],
  };

  const labels: Record<string, string> = {
    under45: "Under $45K / year",
    "45to65": "$45K–$65K / year",
    "65to85": "$65K–$85K / year",
    over85: "Over $85K / year",
  };

  const neighborhoods = [
    { area: "DeSoto", price: "$195K–$240K", note: "Strong community, good schools" },
    { area: "Lancaster", price: "$165K–$210K", note: "Affordable entry, growing fast" },
    { area: "Mesquite", price: "$185K–$250K", note: "DFW working class anchor city" },
    { area: "Grand Prairie", price: "$200K–$270K", note: "Central location, diverse trades" },
    { area: "Garland", price: "$190K–$255K", note: "Solid inventory, stable market" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Working Class Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Homeownership is still within reach in DFW — if you know where to look and which programs to use.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>Select your income range:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {Object.keys(labels).map(k => (
              <button key={k} onClick={() => setRange(k)}
                style={{ background: range === k ? "#F5E642" : "#0f172a", color: range === k ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "12px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>

        {range && guides[range] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642", fontSize: 18 }}>Your DFW Homeownership Guide:</h2>
            {guides[range].map((g, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{g.icon} {g.title}</div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>{g.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: "#F5E642", marginBottom: 14 }}>📍 Best DFW Areas for Working Class Buyers</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {neighborhoods.map(n => (
              <div key={n.area} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#0f172a", borderRadius: 8 }}>
                <div style={{ fontWeight: 700 }}>{n.area}</div>
                <div style={{ color: "#F5E642", fontWeight: 700 }}>{n.price}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{n.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk — Built for Working Class Homeowners</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>ProLnk was built by tradespeople, for tradespeople. Earn income, protect your home, build real wealth in DFW.</div>
        </div>
      </div>
    </div>
  );
}
