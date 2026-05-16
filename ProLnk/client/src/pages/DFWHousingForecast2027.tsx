import { useState } from 'react';

const situationData: Record<string, { impact: string[]; action: string[] }> = {
  buying_soon: {
    impact: [
      "DFW job growth of 85,000+ new positions expected in 2026–2027 sustains demand — prices unlikely to fall significantly",
      "Rate forecast: 30-year fixed projected at 5.8–6.4% by Q1 2027 — modest improvement from current levels",
      "New construction pipeline adds 42,000 homes in 2026 — Frisco, McKinney, Celina, Prosper getting most supply",
      "Best value windows: January–February when volume is low and sellers are more negotiable",
      "Suburbs along 121 corridor (Allen, Prosper, Little Elm) show strongest appreciation projections",
    ],
    action: [
      "Get pre-approved now — rate lock options extend to 90 days at many lenders",
      "Target areas with infrastructure investment (DART expansion, highway widening) for future appreciation",
      "Budget 2–2.2% of purchase price for annual property taxes — they will reset on purchase",
      "New construction offers concessions now — builders carrying unsold inventory in some submarkets",
      "Avoid overextending on rate assumption — stress test your payment at 7% just in case",
    ],
  },
  owning: {
    impact: [
      "DFW home values projected to appreciate 4–6% annually through 2027 — slower than 2021–2022 but steady",
      "Equity position strengthening for owners who bought before 2023 — significant paper gains",
      "Insurance costs rising 8–12% annually — factor into monthly carrying cost calculations",
      "Property tax appraisals continuing to rise — protest your appraisal every year without exception",
      "Home services demand accelerating — aging housing stock driving maintenance and renovation activity",
    ],
    action: [
      "Protest your property tax appraisal every year — even if you think you will lose, file the protest",
      "Review your homeowners insurance annually — rates are rising faster than inflation in Texas",
      "Invest in energy efficiency upgrades now — solar incentives and HVAC efficiency standards tightening",
      "Document all improvements meticulously — affects both resale value and tax basis",
      "Build a maintenance reserve of 1–2% of home value annually for upcoming system replacements",
    ],
  },
  selling_soon: {
    impact: [
      "Spring 2027 window (March–May) forecast as strongest seller market in DFW based on migration trends",
      "Luxury segment above $900K showing softening — move-up buyers squeezed by rate environment",
      "Entry-level and mid-market homes under $500K remain highly competitive with multiple offers common",
      "New construction competition is real — buyers can often get incentives from builders you cannot match",
      "Days on market rising from 2022 lows but still below historical averages in most DFW submarkets",
    ],
    action: [
      "Invest in strategic pre-listing upgrades — kitchen and primary bath updates yield highest ROI in DFW",
      "Price aggressively from day one — overpriced listings sit and carry stigma in current market",
      "Stage professionally — DFW buyers expect model-home presentation in most price ranges",
      "Time your listing for late February or early March to capture peak spring buyer traffic",
      "Consider lease-back negotiation if you need time to find your next home before closing",
    ],
  },
};

const factors = [
  { name: "Employment Growth", value: "+85,000 jobs", trend: "up", note: "Tech, financial services, and healthcare driving DFW expansion through 2027" },
  { name: "Net Migration", value: "+95,000 residents/yr", trend: "up", note: "California and Northeast exodus continuing — DFW remains top destination" },
  { name: "Interest Rates", value: "5.8–6.4% by 2027", trend: "neutral", note: "Fed signaling gradual cuts — not returning to 3% era anytime soon" },
  { name: "New Construction", value: "42,000 units in pipeline", trend: "up", note: "Supply relief concentrated in outer suburbs — core markets still constrained" },
  { name: "Inventory", value: "2.4 months supply", trend: "neutral", note: "Rising from historic lows but still below balanced market threshold of 6 months" },
];

export default function DFWHousingForecast2027() {
  const [situation, setSituation] = useState<string>("");
  const [showForecast, setShowForecast] = useState(false);

  const situations = [
    { value: "buying_soon", label: "🏠 Buying in Next 12 Months" },
    { value: "owning", label: "🔑 Current DFW Homeowner" },
    { value: "selling_soon", label: "🏷️ Planning to Sell by 2027" },
  ];

  const selected = situationData[situation];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK MARKET FORECAST — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>DFW Housing Market Forecast 2027 🔮</h1>
        <p style={{ color: "#8899AA", fontSize: 16, marginBottom: 40 }}>Economic drivers, migration trends, and expert consensus on where DFW real estate is heading.</p>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 Key Economic Factors Driving DFW in 2027</h2>
          {factors.map((f) => (
            <div key={f.name} style={{ display: "flex", gap: 16, marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid #1E2D42", alignItems: "flex-start" }}>
              <div style={{ minWidth: 32, textAlign: "center", fontSize: 18 }}>
                {f.trend === "up" ? "📈" : f.trend === "down" ? "📉" : "➡️"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{f.name}</span>
                  <span style={{ color: "#F5E642", fontWeight: 700 }}>{f.value}</span>
                </div>
                <div style={{ color: "#8899AA", fontSize: 13 }}>{f.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🏙️ Expert Consensus on DFW 2027</h2>
          {[
            "DFW will remain one of the top 3 performing housing markets in the US through 2027 — Moody Analytics",
            "Price appreciation expected at 4–6% annually — slower than peak years but well above national average",
            "Suburbs within 30 miles of Dallas or Fort Worth CBDs will outperform the metro average",
            "Affordability pressure will continue pushing buyers further from core — 40+ mile commutes becoming normal",
            "Luxury market correction likely — top 10% of price range most vulnerable to rate sensitivity",
            "Rental market remains tight — vacancy under 6% expected to persist through 2027",
          ].map((point, i) => (
            <div key={i} style={{ color: "#CBD5E1", fontSize: 14, marginBottom: 10, paddingLeft: 12, borderLeft: "2px solid #F5E642" }}>{point}</div>
          ))}
        </div>

        <div style={{ background: "#111D2E", borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🎯 How the 2027 Forecast Affects You</h2>
          <p style={{ color: "#8899AA", fontSize: 14, marginBottom: 16 }}>Select your current situation to see personalized forecast implications and action steps.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            {situations.map((s) => (
              <button key={s.value} onClick={() => { setSituation(s.value); setShowForecast(true); }}
                style={{ background: situation === s.value ? "#F5E642" : "#1E2D42", color: situation === s.value ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {showForecast && selected && (
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>📌 Forecast Impact on Your Situation</div>
                {selected.impact.map((imp, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 8 }}>• {imp}</div>)}
              </div>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 10 }}>✅ Recommended Actions Now</div>
                {selected.action.map((a, i) => <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 8 }}>• {a}</div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
