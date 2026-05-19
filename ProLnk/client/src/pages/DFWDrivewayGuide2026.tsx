import { useState } from 'react';

const conditions = ["Good — Minor Cracks", "Fair — Moderate Damage", "Poor — Major Damage", "End of Life — Replace"];
const budgets = ["Under $5K", "$5K–$15K", "$15K–$30K", "$30K+"];

const recs: Record<string, Record<string, { action: string; material: string; cost: string; lifespan: string; notes: string }>> = {
  "Good — Minor Cracks": {
    "Under $5K": { action: "Seal & Repair", material: "Concrete or Asphalt Sealant", cost: "$300–$1,200", lifespan: "+5–8 years", notes: "Crack fill + seal is highest ROI for minor damage. Schedule before summer heat softens asphalt." },
    "$5K–$15K": { action: "Partial Resurfacing", material: "Concrete Overlay", cost: "$2,000–$5,000", lifespan: "+10–15 years", notes: "Resurfacing restores appearance and structural integrity without full replacement." },
    "$15K–$30K": { action: "Full Concrete Replacement", material: "4-inch Concrete Slab", cost: "$8,000–$15,000", lifespan: "30–40 years", notes: "If budget allows and driveway is large, concrete outlasts asphalt in DFW heat." },
    "$30K+": { action: "Paver Installation", material: "Concrete or Brick Pavers", cost: "$15,000–$35,000", lifespan: "40–50 years", notes: "Premium choice — pavers handle DFW freeze-thaw cycles without cracking and add maximum curb appeal." },
  },
  "Fair — Moderate Damage": {
    "Under $5K": { action: "Patch & Seal", material: "Cold-Mix Asphalt Patch", cost: "$800–$3,000", lifespan: "+3–5 years", notes: "Temporary fix — plan for full repair within 3 years. DFW summers accelerate asphalt deterioration." },
    "$5K–$15K": { action: "Asphalt Resurfacing", material: "Hot-Mix Asphalt", cost: "$4,000–$9,000", lifespan: "+10–15 years", notes: "Hot-mix asphalt resurfacing is cost-effective for moderate damage — sealcoat every 3 years." },
    "$15K–$30K": { action: "Full Concrete Replacement", material: "4-inch Concrete Slab", cost: "$10,000–$18,000", lifespan: "30–40 years", notes: "Concrete is preferred over asphalt for DFW heat — will not soften at 100F+ temps." },
    "$30K+": { action: "Paver Installation", material: "Travertine or Concrete Pavers", cost: "$20,000–$40,000", lifespan: "40–50 years", notes: "Highest durability and curb appeal — pavers can be individually replaced if damaged." },
  },
  "Poor — Major Damage": {
    "Under $5K": { action: "Emergency Patch Only", material: "Cold-Mix Asphalt", cost: "$1,500–$4,000", lifespan: "+1–2 years", notes: "Budget not sufficient for proper repair — patch now and save for full replacement within 2 years." },
    "$5K–$15K": { action: "Full Asphalt Replacement", material: "2-inch Hot-Mix Asphalt", cost: "$5,000–$12,000", lifespan: "15–20 years", notes: "Full base prep and asphalt pour — more durable than patching over failed base." },
    "$15K–$30K": { action: "Full Concrete Replacement", material: "4-inch Reinforced Concrete", cost: "$12,000–$22,000", lifespan: "30–40 years", notes: "Best long-term value — concrete handles DFW heat without softening and freeze-thaw without major cracking." },
    "$30K+": { action: "Premium Paver Installation", material: "Concrete Pavers + Lighting", cost: "$25,000–$45,000", lifespan: "40–50 years", notes: "Complete curb appeal transformation — add integrated lighting and drainage for premium finish." },
  },
  "End of Life — Replace": {
    "Under $5K": { action: "Gravel Temporary Solution", material: "Crushed Granite", cost: "$2,000–$4,500", lifespan: "Temporary", notes: "Crushed granite is DFW-popular as budget base while saving for permanent solution — minimal permits." },
    "$5K–$15K": { action: "Asphalt Replacement", material: "Full-Depth Asphalt", cost: "$6,000–$13,000", lifespan: "15–20 years", notes: "Complete tear-out and new pour — sealcoat within 6 months and every 3 years after." },
    "$15K–$30K": { action: "Concrete Replacement", material: "5-inch Reinforced Concrete", cost: "$13,000–$25,000", lifespan: "35–40 years", notes: "Gold standard for DFW — concrete is dominant driveway material in DFW due to builder preference." },
    "$30K+": { action: "Full Paver System", material: "Pavers + Drainage + Lighting", cost: "$30,000–$55,000", lifespan: "50+ years", notes: "Lifetime investment — engineered drainage solves DFW flooding issues while maximizing property value." },
  },
};

export default function DFWDrivewayGuide2026() {
  const [condition, setCondition] = useState("Good — Minor Cracks");
  const [budget, setBudget] = useState("Under $5K");
  const rec = recs[condition]?.[budget];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🛣️</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Driveway Guide 2026</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>Concrete vs asphalt vs pavers — what works in DFW climate</p>
        </div>
        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>Current Driveway Condition:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {conditions.map(c => (
              <button key={c} onClick={() => setCondition(c)}
                style={{ padding: "0.6rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: condition === c ? "#F5E642" : "#1e3a5f",
                  color: condition === c ? "#0A1628" : "#cbd5e1", fontWeight: 700, textAlign: "left" }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.75rem" }}>Budget:</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {budgets.map(b => (
              <button key={b} onClick={() => setBudget(b)}
                style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: budget === b ? "#F5E642" : "#1e3a5f",
                  color: budget === b ? "#0A1628" : "#cbd5e1", fontWeight: 700, flex: 1 }}>{b}</button>
            ))}
          </div>
        </div>
        {rec && (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: "1.3rem" }}>✅ {rec.action}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: 4 }}>Material: {rec.material}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem" }}>{rec.cost}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Lifespan: {rec.lifespan}</div>
              </div>
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem", borderTop: "1px solid #1e3a5f", paddingTop: "1rem" }}>💡 {rec.notes}</div>
          </div>
        )}
        <div style={{ marginTop: "1.5rem", background: "#0f2040", borderRadius: 12, padding: "1.25rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          🌡️ <strong style={{ color: "#F5E642" }}>DFW Climate Warning:</strong> Asphalt softens above 100F — common in DFW summers. Concrete is preferred but cracks in freeze events (5–10 nights/year). Pavers handle both extremes best.
        </div>
      </div>
    </div>
  );
}
