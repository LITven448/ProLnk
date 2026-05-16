import { useState } from 'react';

export default function DFWHOAProhibitionsGuide2026() {
  const [item, setItem] = useState<string | null>(null);

  const items = [
    {
      type: "RVs & Trailers",
      icon: "🚌",
      likelihood: "Very High",
      color: "#f87171",
      details: [
        "85-90% of DFW HOAs prohibit RV/trailer street parking",
        "Many prohibit driveway storage even with screening",
        "Violations typically generate fines within 30 days",
        "Some communities have designated RV storage lots nearby",
        "Check if temporary parking during loading is permitted",
        "Some CC&Rs allow RVs in enclosed garages only"
      ]
    },
    {
      type: "Boats & Watercraft",
      icon: "⛵",
      likelihood: "Very High",
      color: "#f87171",
      details: [
        "Boat trailers and watercraft storage widely prohibited",
        "Visibility from street is usually the standard — stored behind fence may be OK",
        "Some HOAs require boats to be in enclosed structure",
        "Side-yard storage prohibited in most DFW communities",
        "Check for specific dimensions in CC&Rs — some allow small boats",
        "Violation fines in DFW typically start at $50-200 per notice"
      ]
    },
    {
      type: "Commercial Vehicles",
      icon: "🚚",
      likelihood: "High",
      color: "#fbbf24",
      details: [
        "Work trucks with company logos often prohibited from overnight parking",
        "Vehicles with commercial lettering visible from street are commonly restricted",
        "Many HOAs define by GVWR weight — over 1 ton often prohibited",
        "Wrapping your truck during off-hours may not help — check your CC&Rs",
        "Some HOAs make exceptions for vehicles parked in garage",
        "Prospective buyer tip: check if your work vehicle would be affected before buying"
      ]
    },
    {
      type: "Paint Colors",
      icon: "🎨",
      likelihood: "Very High",
      color: "#f87171",
      details: [
        "Nearly all DFW HOAs with exterior maintenance requirements have color palettes",
        "Typical palette: 20-80 pre-approved colors — rarely include bright or dark colors",
        "HOA approval required before any exterior paint change",
        "Painting without approval can result in forced repaint at owner expense",
        "Color palettes are often not publicly posted — request from HOA office",
        "Resale: unapproved colors must be corrected before closing"
      ]
    },
    {
      type: "Basketball Goals",
      icon: "🏀",
      likelihood: "Moderate-High",
      color: "#fbbf24",
      details: [
        "Front yard placement prohibited in majority of DFW HOAs",
        "Permanent in-ground installation often requires ARC approval",
        "Portable goals may be allowed but must be stored when not in use",
        "Some HOAs prohibit all basketball goals permanently — check CC&Rs",
        "Street placement near hoop can cause parking/nuisance issues",
        "Evening hours restrictions vary — noise ordinance overlap"
      ]
    },
    {
      type: "Short-Term Rentals",
      icon: "🏠",
      likelihood: "High and Growing",
      color: "#f87171",
      details: [
        "Airbnb/VRBO bans are increasing in DFW communities post-2020",
        "Some CC&Rs specify minimum rental periods (30-90 days)",
        "Check CC&Rs carefully — some use vague language courts have upheld",
        "City of Dallas, Plano, and Frisco have additional STR licensing requirements",
        "HOA enforcement can include fines or injunctions — both costly",
        "If STR income is part of your plan, verify the CC&Rs explicitly permit it"
      ]
    },
    {
      type: "Satellite Dishes",
      icon: "📡",
      likelihood: "Low — TX/Federal Law Protects You",
      color: "#4ade80",
      details: [
        "FCC OTARD rule prohibits HOAs from banning dishes under 1 meter",
        "Texas Property Code 202.011 provides additional protections",
        "HOA can regulate placement (not prohibit) — rear-facing preferred",
        "HOA cannot require prior approval that would delay installation unreasonably",
        "Dishes on common area structures are different — HOA has more control there",
        "Document any HOA objection — FCC has a complaint process"
      ]
    },
    {
      type: "Lawn Conditions",
      icon: "🌿",
      likelihood: "Very High",
      color: "#f87171",
      details: [
        "Grass height violations are among the most common HOA enforcement actions",
        "Typical standard: grass must be under 6 inches in DFW communities",
        "Weeds, bare spots, and dead grass are frequently cited",
        "Drought accommodations are sometimes granted — request in writing",
        "Repeated violations can accelerate fines quickly in TX",
        "TX law requires reasonable time to cure before fines begin"
      ]
    }
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚫</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HOA Common Prohibitions Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Know what DFW HOAs typically restrict before you buy or get fined</p>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, fontSize: 12 }}>
          <span style={{ background: "#f87171", color: "#fff", padding: "4px 10px", borderRadius: 20 }}>🚨 Very High Risk</span>
          <span style={{ background: "#fbbf24", color: "#0A1628", padding: "4px 10px", borderRadius: 20 }}>⚠️ Moderate-High</span>
          <span style={{ background: "#4ade80", color: "#0A1628", padding: "4px 10px", borderRadius: 20 }}>✅ Protected</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28 }}>
          {items.map(i => (
            <button key={i.type} onClick={() => setItem(item === i.type ? null : i.type)}
              style={{ background: item === i.type ? i.color : "#1e2d45", border: `2px solid ${item === i.type ? i.color : "transparent"}`, borderRadius: 8, padding: 14, cursor: "pointer", color: item === i.type ? "#0A1628" : "#fff", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontSize: 26 }}>{i.icon}</span>
                <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 10, background: i.color, color: "#0A1628", fontWeight: 700 }}>{i.likelihood}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginTop: 6 }}>{i.type}</div>
            </button>
          ))}
        </div>

        {item && (() => {
          const it = items.find(x => x.type === item)!;
          return (
            <div style={{ background: "#1e2d45", borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: `4px solid ${it.color}` }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 4px" }}>{it.icon} {it.type}</h3>
              <p style={{ color: "#94a3b8", marginBottom: 16, fontSize: 13 }}>Prohibition Likelihood: <strong style={{ color: it.color }}>{it.likelihood}</strong></p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {it.details.map((d, idx) => <li key={idx} style={{ color: "#cbd5e1", marginBottom: 7 }}>{d}</li>)}
              </ul>
            </div>
          );
        })()}

        <div style={{ background: "#1e2d45", borderRadius: 8, padding: 16 }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 8px" }}>📋 Buyer Due Diligence</p>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: 14 }}>Request the full CC&Rs, rules and regulations, and last 12 months of board meeting minutes before your option period expires. Texas resale certificates must disclose known violations — but undiscovered violations are still your responsibility after closing.</p>
        </div>
      </div>
    </div>
  );
}
