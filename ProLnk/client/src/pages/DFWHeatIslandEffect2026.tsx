import { useState } from 'react';

const heatZones = [
  { zone: "Downtown Dallas", impact: "+10°F", roofCost: "+$180/mo", cooling: "Critical" },
  { zone: "Inner Suburbs (Garland, Mesquite)", impact: "+7°F", roofCost: "+$120/mo", cooling: "High" },
  { zone: "Outer Suburbs (Frisco, McKinney)", impact: "+4°F", roofCost: "+$70/mo", cooling: "Moderate" },
  { zone: "Exurban/Rural DFW", impact: "+1°F", roofCost: "+$15/mo", cooling: "Low" },
];

const mitigations = [
  { action: "Cool Roof (White/Light Gray)", savings: "$40-80/mo", difficulty: "Medium", emoji: "🏠" },
  { action: "Shade Trees (West & South)", savings: "$30-60/mo", difficulty: "Long-term", emoji: "🌳" },
  { action: "Reflective Attic Insulation", savings: "$25-50/mo", difficulty: "Easy", emoji: "🔧" },
  { action: "Light-Colored Pavement/Driveway", savings: "$10-20/mo", difficulty: "Medium", emoji: "🛣️" },
  { action: "Green Roof / Rooftop Garden", savings: "$50-100/mo", difficulty: "Hard", emoji: "🌿" },
];

export default function DFWHeatIslandEffect2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Urban Heat Island Effect Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Urban DFW can run 8–10°F hotter than rural areas — here is what that means for your home.</p>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>📍 Your DFW Zone — Heat Impact</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {heatZones.map((z, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                background: selected === i ? "#F5E642" : "#1a3a5c",
                color: selected === i ? "#0A1628" : "#fff",
                border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600
              }}>{z.zone}</button>
            ))}
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#F5E642", fontSize: 24, fontWeight: 700 }}>{heatZones[selected].impact}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>vs. Rural DFW</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#F5E642", fontSize: 24, fontWeight: 700 }}>{heatZones[selected].roofCost}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>Extra Cooling Cost</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#F5E642", fontSize: 24, fontWeight: 700 }}>{heatZones[selected].cooling}</div>
                <div style={{ color: "#94a3b8", fontSize: 12 }}>HVAC Strain</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 14 }}>🛡️ Mitigation Strategies</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mitigations.map((m, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{m.emoji}</span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{m.action}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>Difficulty: {m.difficulty}</div>
                  </div>
                </div>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>{m.savings}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>🌳 Dallas City Tree Planting Program</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Dallas Urban Forest maintains a free tree program — residents in high heat-island zones can receive up to 3 trees annually.
            Native shade trees (live oak, cedar elm, pecan) provide the highest cooling value. West and southwest placement maximizes summer shade impact.
          </p>
        </div>
      </div>
    </div>
  );
}
