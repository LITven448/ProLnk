import { useState } from 'react';

const droughtStages = [
  {
    stage: "D0 – Abnormally Dry",
    soilMove: "Minimal",
    risks: ["Wood floors may develop small gaps", "Outdoor wood furniture drying out"],
    actions: ["Water foundation perimeter — 18 inches out, twice/week", "Apply mulch 3 inches deep around foundation"],
  },
  {
    stage: "D1 – Moderate Drought",
    soilMove: "1/4 inch",
    risks: ["Foundation settling beginning", "Wood siding gaps visible", "Ant and spider activity increases indoors"],
    actions: ["Increase foundation watering to 3x/week", "Seal siding gaps with exterior caulk", "Inspect foundation for new cracks — photograph for records"],
  },
  {
    stage: "D2 – Severe Drought",
    soilMove: "1/2 inch",
    risks: ["Significant foundation movement likely", "Interior drywall cracks appearing", "Pest pressure high — bugs seeking indoor water"],
    actions: ["Foundation soaker hose on timer — 45 min/day", "Call structural engineer if cracks > 1/4 inch", "Pest inspection and perimeter seal treatment", "Humidity inside: maintain 40–50% to protect wood floors"],
  },
  {
    stage: "D3–D4 – Extreme Drought",
    soilMove: "1 inch+",
    risks: ["Pier and beam homes especially vulnerable", "Wood floor buckling or gapping > 1/4 inch", "Tree root migration toward home water sources"],
    actions: ["Professional foundation inspection (budget $300–500)", "Install root barriers if large trees within 15 feet", "Full pest perimeter treatment", "Document all cracks for insurance and resale disclosure"],
  },
];

export default function DFWDroughtImpactHomeGuide2026() {
  const [sel, setSel] = useState(0);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌵</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Drought Impact on Homes 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Texas clay soil contracts and shifts in drought — here is what that means for your foundation, floors, and pest risk.</p>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 14 }}>📊 Select Your Current Drought Stage</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {droughtStages.map((d, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                background: sel === i ? "#F5E642" : "#1a3a5c",
                color: sel === i ? "#0A1628" : "#fff",
                border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer",
                fontWeight: sel === i ? 700 : 400, fontSize: 13, textAlign: "left"
              }}>{d.stage}</button>
            ))}
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 16 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              <div style={{ background: "#1a3a5c", borderRadius: 8, padding: "10px 16px", flex: 1, textAlign: "center" }}>
                <div style={{ color: "#F5E642", fontSize: 20, fontWeight: 700 }}>{droughtStages[sel].soilMove}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>Soil Movement</div>
              </div>
            </div>
            <h3 style={{ color: "#f87171", fontSize: 13, marginBottom: 8 }}>⚠️ Home Risks</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
              {droughtStages[sel].risks.map((r, i) => (
                <div key={i} style={{ color: "#fca5a5", fontSize: 13 }}>• {r}</div>
              ))}
            </div>
            <h3 style={{ color: "#4ade80", fontSize: 13, marginBottom: 8 }}>✅ Protective Actions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {droughtStages[sel].actions.map((a, i) => (
                <div key={i} style={{ color: "#86efac", fontSize: 13 }}>• {a}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>🏠 DFW Clay Soil Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Expansive clay covers 80% of DFW metro", "Can move 2–4 inches in extreme drought", "Foundation movement = #1 home repair in Texas", "Pier & beam homes move more than slab", "Consistent moisture = best protection", "Average foundation repair: $5,000–$15,000"].map((f, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }}>
                🌵 {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
