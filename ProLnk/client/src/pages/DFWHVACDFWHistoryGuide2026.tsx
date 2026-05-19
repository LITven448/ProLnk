import { useState } from 'react';

const periods = [
  {
    era: "Pre-1960s: Before AC",
    icon: "🌡️",
    impact: "DFW was barely inhabited — summer heat made the region largely uninhabitable for permanent settlement. Window units were rare luxuries. Most homes relied on sleeping porches and shade trees.",
    stat: "DFW population 1950: ~600K",
  },
  {
    era: "1960s-1970s: Central Air Arrives",
    icon: "🏠",
    impact: "Central air conditioning transformed DFW from a hardship post to a destination. Suburban tracts exploded across Plano, Irving, and Garland. Builders standardized 3-ton systems for 2,000 sq ft homes.",
    stat: "DFW population 1970: ~2.4M",
  },
  {
    era: "1980s-1990s: Sprawl Accelerates",
    icon: "🚗",
    impact: "AC enabled the car-dependent suburban model. Frisco, McKinney, Allen began their growth arcs. HVAC became the #1 home system — more central to daily life than any other mechanical component.",
    stat: "DFW population 1990: ~3.9M",
  },
  {
    era: "2000s-2010s: Efficiency Era",
    icon: "⚡",
    impact: "SEER ratings, programmable thermostats, and two-stage compressors arrived. DFW utility bills drove adoption faster than any other US metro. Energy codes tightened. Duct sealing became standard.",
    stat: "DFW population 2010: ~6.4M",
  },
  {
    era: "2020s: Smart & Resilient",
    icon: "🤖",
    impact: "Uri (Feb 2021) exposed system fragility. Variable-speed systems, smart thermostats, and whole-home dehumidification surged. DFW HVAC demand now outpaces supply — the ProLnk market opportunity.",
    stat: "DFW population 2024: ~8.1M",
  },
];

export default function DFWHVACDFWHistoryGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>DFW HVAC History Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>How air conditioning built the modern Dallas-Fort Worth metroplex</p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "20px 24px", marginBottom: 36, color: "#0A1628" }}>
          <strong>Key Insight:</strong> DFW grew 400% since 1970 — almost entirely because of central air conditioning. No other US metro is more dependent on HVAC. That dependence is ProLnk's market foundation.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {periods.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#F5E642″ : "#1e2d45",
                color: selected === i ? "#0A1628″ : "#94a3b8",
                border: "none", borderRadius: 8, padding: "8px 14px",
                cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              {p.icon} {p.era.split(":")[0]}
            </button>
          ))}
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{periods[selected].icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F5E642″, margin: "0 0 16px" }}>{periods[selected].era}</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{periods[selected].impact}</p>
          <div style={{ background: "#0A1628″, borderRadius: 8, padding: "12px 18px", display: "inline-block" }}>
            <span style={{ color: "#F5E642″, fontWeight: 700 }}>{periods[selected].stat}</span>
          </div>
        </div>

        <div style={{ marginTop: 32, background: "#1e2d45″, borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#F5E642″, fontWeight: 700, marginTop: 0 }}>🏆 ProLnk Market Opportunity</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.6, margin: 0 }}>
            DFW has 2.8M+ housing units. Every one needs HVAC service. Average system replacement: $8,500. ProLnk connects homeowners with vetted HVAC pros — capturing the most AC-dependent market in America.
          </p>
        </div>
      </div>
    </div>
  );
}
