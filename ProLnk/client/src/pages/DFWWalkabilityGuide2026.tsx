import { useState } from 'react';

const neighborhoods = [
  { name: "Uptown Dallas", type: "Urban Core", walkScore: 92, valuePremium: "+12%" },
  { name: "Deep Ellum", type: "Urban Core", walkScore: 88, valuePremium: "+10%" },
  { name: "McKinney Ave", type: "Urban Core", walkScore: 85, valuePremium: "+9%" },
  { name: "Bishop Arts", type: "Urban Village", walkScore: 78, valuePremium: "+7%" },
  { name: "Legacy West Plano", type: "Walkable Suburb", walkScore: 65, valuePremium: "+5%" },
  { name: "Addison", type: "Walkable Suburb", walkScore: 58, valuePremium: "+4%" },
  { name: "Las Colinas", type: "Mixed Use", walkScore: 52, valuePremium: "+3%" },
  { name: "Suburban DFW", type: "Car Dependent", walkScore: 25, valuePremium: "0%" },
];

const typeRanges: Record<string, { range: string; impact: string; tip: string }> = {
  "Urban Core": { range: "80–95", impact: "7–12% price premium over comparable car-dependent areas", tip: "Proximity to restaurants, offices, and transit drives the premium" },
  "Urban Village": { range: "65–80", impact: "4–7% premium; strong rental demand", tip: "Walkable pockets within larger car-dependent metro" },
  "Walkable Suburb": { range: "50–65", impact: "2–5% premium; growing buyer segment", tip: "Town center developments like Legacy West are reshaping suburbs" },
  "Mixed Use": { range: "40–55", impact: "1–3% premium; depends on amenity quality", tip: "Las Colinas improving with pedestrian infrastructure investments" },
  "Car Dependent": { range: "10–35", impact: "No walkability premium; transportation cost ~$12K/yr", tip: "DFW metro average is 35 — majority of suburbs fall here" },
};

export default function DFWWalkabilityGuide2026() {
  const [selectedType, setSelectedType] = useState<string>("");

  const result = selectedType ? typeRanges[selectedType] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚶</div>
          <h1 style={{ color: "#F5E642", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Walkability Guide 2026</h1>
          <p style={{ color: "#9BA3B2", fontSize: 16 }}>DFW metro average Walk Score: 35 — but walkable pockets command real premiums</p>
        </div>

        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, marginBottom: 32, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>📍 Walkability by Neighborhood</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1E3A5F" }}>
                  {["Neighborhood","Type","Walk Score","Value Premium"].map(h => (
                    <th key={h} style={{ color: "#F5E642", padding: "8px 12px", textAlign: "left", fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {neighborhoods.map(n => (
                  <tr key={n.name} style={{ borderBottom: "1px solid #1A2E48" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 600 }}>{n.name}</td>
                    <td style={{ padding: "10px 12px", color: "#9BA3B2", fontSize: 13 }}>{n.type}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ background: n.walkScore >= 70 ? "#1A3A1A" : n.walkScore >= 50 ? "#2A2A10" : "#2A1A1A", color: n.walkScore >= 70 ? "#4ADE80" : n.walkScore >= 50 ? "#F5E642" : "#F87171", padding: "2px 8px", borderRadius: 6, fontSize: 13 }}>{n.walkScore}</span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#F5E642", fontWeight: 600 }}>{n.valuePremium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, marginBottom: 32, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🔍 Check Your Neighborhood Type</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {Object.keys(typeRanges).map(t => (
              <button key={t} onClick={() => setSelectedType(t)} style={{ padding: "10px 18px", borderRadius: 8, border: "none", cursor: "pointer", background: selectedType === t ? "#F5E642" : "#1A2E48", color: selectedType === t ? "#0A1628" : "#E8EAF0", fontWeight: 600, fontSize: 14 }}>{t}</button>
            ))}
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20, border: "1px solid #F5E642" }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: "#F5E642" }}>📊 Walk Score Range:</span> <strong>{result.range}</strong></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: "#F5E642" }}>💰 Value Impact:</span> {result.impact}</div>
              <div><span style={{ color: "#F5E642" }}>💡 Tip:</span> {result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#0F1E35", borderRadius: 12, padding: 24, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 12 }}>⚠️ DFW Reality Check</h2>
          <p style={{ color: "#9BA3B2", lineHeight: 1.7 }}>DFW is one of the most car-dependent metros in the US. The average Walk Score of 35 means most errands require a vehicle. Walkable areas like Uptown Dallas are exceptions — not the rule. Budget ~$12,000/year for transportation costs in suburban DFW neighborhoods.</p>
        </div>
      </div>
    </div>
  );
}

