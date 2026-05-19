import { useState } from 'react';

const yardSizes = ["Small (under 2,500 sq ft)", "Medium (2,500–5,000 sq ft)", "Large (5,000–10,000 sq ft)", "Estate (10,000+ sq ft)"];
const waterBudgets = ["Low — Drought Tolerant", "Medium — Some Irrigation", "High — Full Irrigation"];

const recs: Record<string, Record<string, { style: string; plants: string[]; groundcover: string; irrigation: string; shadeTip: string; cost: string }>> = {
  "Small (under 2,500 sq ft)": {
    "Low — Drought Tolerant": { style: "Rock Garden with Natives", plants: ["Lantana", "Black-eyed Susan", "Texas Sage"], groundcover: "Decomposed Granite (DG)", irrigation: "No irrigation needed — rain + established plants", shadeTip: "Plant 1 Crape Myrtle near west wall for shade", cost: "$2,500–$5,000″ },
    "Medium — Some Irrigation": { style: "Native Cottage Garden", plants: ["Salvia", "Lantana", "Autumn Sage"], groundcover: "Mulch + gravel borders", irrigation: "Drip system — 1–2x/week in summer", shadeTip: "Texas Mountain Laurel near AC unit reduces cooling load", cost: "$4,000–$8,000″ },
    "High — Full Irrigation": { style: "Lawn + Planting Beds", plants: ["Knock Out Roses", "Salvia", "Esperanza"], groundcover: "St. Augustine or Zoysia turf", irrigation: "Full sprinkler system", shadeTip: "Red Oak or Live Oak for long-term shade", cost: "$7,000–$14,000″ },
  },
  "Medium (2,500–5,000 sq ft)": {
    "Low — Drought Tolerant": { style: "Xeriscaping with Native Mass Plantings", plants: ["Agave", "Yucca", "Blackfoot Daisy", "Lantana"], groundcover: "Decomposed Granite (DG) + river rock", irrigation: "No irrigation once established (6–12 months)", shadeTip: "Vitex tree for fast shade + pollinator value", cost: "$5,000–$12,000″ },
    "Medium — Some Irrigation": { style: "Pollinator Prairie Mix", plants: ["Purple Coneflower", "Salvia greggii", "Mexican Feather Grass"], groundcover: "Mulch + native groundcovers", irrigation: "Drip + spray zones — 2x/week summers", shadeTip: "Shumard Red Oak for long-term shade — plant west side", cost: "$8,000–$18,000″ },
    "High — Full Irrigation": { style: "Traditional Manicured Lawn", plants: ["Knockout Roses", "Indian Hawthorn", "Liriope"], groundcover: "Bermuda or Zoysia turf", irrigation: "Smart controller sprinkler system", shadeTip: "Cedar Elm for fast shade — Texas native, wind-resistant", cost: "$12,000–$25,000″ },
  },
  "Large (5,000–10,000 sq ft)": {
    "Low — Drought Tolerant": { style: "Prairie Restoration", plants: ["Little Bluestem", "Switchgrass", "Lantana", "Maximilian Sunflower"], groundcover: "Native mulch + stone pathways", irrigation: "Minimal — strategic drip for establishment only", shadeTip: "Plant grove of native trees for AC shade and wildlife habitat", cost: "$10,000–$22,000″ },
    "Medium — Some Irrigation": { style: "Naturalized Native Landscape", plants: ["Texas Bluebonnet", "Indian Paintbrush", "Salvia", "Coneflower"], groundcover: "Mulch beds + decomposed granite paths", irrigation: "Zoned drip system — 2–3x/week peak summer", shadeTip: "Pecan tree placement on west and southwest for maximum cooling", cost: "$15,000–$35,000″ },
    "High — Full Irrigation": { style: "Estate Lawn + Foundation Plantings", plants: ["Boxwood", "Knock Out Roses", "Encore Azalea", "Indian Hawthorn"], groundcover: "Bermuda or Zoysia turf + mulch beds", irrigation: "Smart irrigation with rain sensor", shadeTip: "Live Oak canopy trees — 50-year investment, enormous shade", cost: "$22,000–$50,000″ },
  },
  "Estate (10,000+ sq ft)": {
    "Low — Drought Tolerant": { style: "Conservation Landscape", plants: ["Native grasses", "Wildflower meadow mix", "Agave", "Yucca"], groundcover: "Caliche + decomposed granite", irrigation: "Rainwater harvesting system only", shadeTip: "Existing trees + strategic native canopy trees for phased shade", cost: "$18,000–$40,000″ },
    "Medium — Some Irrigation": { style: "Native Texas Estate Landscape", plants: ["Texas Mountain Laurel", "Beautyberry", "Salvia", "Native Grasses"], groundcover: "Mixed mulch and stone", irrigation: "Zoned smart irrigation — 40–60% turf reduction vs conventional", shadeTip: "Large Live Oak and Cedar Elm placement reduces AC costs $400–$800/year", cost: "$30,000–$65,000″ },
    "High — Full Irrigation": { style: "Formal Estate Grounds", plants: ["Manicured hedges", "Seasonal color beds", "Ornamental grasses"], groundcover: "Manicured Bermuda or Zoysia", irrigation: "Full smart irrigation + weather station", shadeTip: "Canopy trees for all south and west exposures — 15–25% HVAC savings", cost: "$50,000–$120,000″ },
  },
};

export default function DFWLandscapingGuide2026() {
  const [yard, setYard] = useState("Small (under 2,500 sq ft)");
  const [water, setWater] = useState("Low — Drought Tolerant");
  const rec = recs[yard]?.[water];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌿</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Landscaping Guide 2026</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>Drought-tolerant, water-wise landscaping for Dallas–Fort Worth yards</p>
        </div>
        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>Yard Size:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {yardSizes.map(y => (
              <button key={y} onClick={() => setYard(y)}
                style={{ padding: "0.6rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: yard === y ? "#F5E642″ : "#1e3a5f",
                  color: yard === y ? "#0A1628″ : "#cbd5e1", fontWeight: 700, textAlign: "left" }}>{y}</button>
            ))}
          </div>
        </div>
        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>Water Budget:</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {waterBudgets.map(w => (
              <button key={w} onClick={() => setWater(w)}
                style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: water === w ? "#F5E642″ : "#1e3a5f",
                  color: water === w ? "#0A1628″ : "#cbd5e1", fontWeight: 700, flex: 1 }}>{w}</button>
            ))}
          </div>
        </div>
        {rec && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: "1.2rem", marginBottom: "0.5rem" }}>🌱 {rec.style}</div>
            <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginBottom: "1rem" }}>Estimated Cost: <strong style={{ color: "#fff" }}>{rec.cost}</strong></div>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Recommended Plants:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {rec.plants.map((p, i) => (
                  <span key={i} style={{ background: "#1e3a5f", borderRadius: 6, padding: "0.3rem 0.7rem", fontSize: "0.85rem" }}>{p}</span>
                ))}
              </div>
            </div>
            <div style={{ color: "#94a3b8″, fontSize: "0.9rem", marginBottom: "0.5rem" }}>🪨 Groundcover: {rec.groundcover}</div>
            <div style={{ color: "#94a3b8″, fontSize: "0.9rem", marginBottom: "0.75rem" }}>💧 Irrigation: {rec.irrigation}</div>
            <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: "0.75rem", color: "#94a3b8″, fontSize: "0.9rem" }}>🌳 Shade Strategy: {rec.shadeTip}</div>
          </div>
        )}
      </div>
    </div>
  );
}
