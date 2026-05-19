import { useState } from 'react';

const tradeCategories = [
  {
    trade: "🌬️ HVAC",
    terms: [
      { word: "SEER2″, def: "Seasonal Energy Efficiency Ratio 2 — the new 2023 efficiency rating standard for AC units. Higher = more efficient. DFW minimum is 15.2 SEER2." },
      { word: "Ton", def: "Unit of AC cooling capacity. 1 ton = 12,000 BTU/hr. Most DFW homes need 3–5 tons depending on sq footage." },
      { word: "BTU", def: "British Thermal Unit — measures heat energy. Used to size both heating and cooling equipment." },
      { word: "MERV", def: "Minimum Efficiency Reporting Value — air filter rating scale 1–16. Higher = finer filtration. MERV 8–11 typical for residential." },
      { word: "CFM", def: "Cubic Feet per Minute — airflow measurement. Each room needs correct CFM for proper temperature balance." },
    ],
  },
  {
    trade: "🔧 Plumbing",
    terms: [
      { word: "P-Trap", def: "Curved pipe under sinks that holds water to block sewer gas. Required by code on every fixture drain." },
      { word: "PRV", def: "Pressure Reducing Valve — limits incoming water pressure. DFW city water often runs 80–120 PSI; PRV keeps it safe at 60–80 PSI." },
      { word: "DWV", def: "Drain-Waste-Vent system — the network of pipes that removes wastewater and vents sewer gases out the roof." },
      { word: "Sweating", def: "Moisture condensing on cold pipes — common in DFW summer humidity. Not a leak; fix with pipe insulation." },
      { word: "Backflow Preventer", def: "Device that stops contaminated water from flowing back into the clean supply — required on irrigation systems in DFW." },
    ],
  },
  {
    trade: "⚡ Electrical",
    terms: [
      { word: "GFCI", def: "Ground Fault Circuit Interrupter — outlet that trips if it detects electricity going where it shouldn't. Required near water in DFW kitchens and baths." },
      { word: "AFCI", def: "Arc Fault Circuit Interrupter — breaker that detects dangerous arcing in wiring. Required in all DFW bedrooms since 2014 NEC." },
      { word: "Circuit Breaker", def: "Safety switch that cuts power when a circuit overloads. Found in your main panel (load center)." },
      { word: "Romex", def: "Brand name for NM (non-metallic) sheathed cable — the standard wire used inside DFW home walls." },
      { word: "AWG", def: "American Wire Gauge — wire sizing. Lower number = thicker wire. 14 AWG for 15A circuits, 12 AWG for 20A circuits." },
    ],
  },
  {
    trade: "🏠 Roofing",
    terms: [
      { word: "Flashing", def: "Metal strips that seal roof joints (chimneys, vents, valleys) against water intrusion — top leak source in DFW." },
      { word: "Sheathing", def: "OSB or plywood panels nailed to roof rafters — the base layer everything else attaches to." },
      { word: "Weep Hole", def: "Small opening at bottom of brick veneer that lets trapped moisture escape — never block these." },
      { word: "Ice and Water Shield", def: "Self-adhesive waterproof membrane at eaves and valleys. Required in low-slope areas even in DFW." },
      { word: "Drip Edge", def: "Metal L-shaped flashing at roof edges that directs water into gutters and protects fascia." },
    ],
  },
  {
    trade: "🏗️ Foundation",
    terms: [
      { word: "Post-Tension", def: "Concrete slab reinforced with tensioned steel cables — standard in DFW. Never saw or drill without locating cables first." },
      { word: "Expansive Clay", def: "DFW black clay soil that swells when wet and shrinks when dry — main cause of foundation movement." },
      { word: "Pier", def: "Concrete cylinder drilled into stable soil below expansive clay to support and stabilize a slab." },
      { word: "Heave", def: "Upward movement of a slab caused by swelling soil — opposite of settlement, both are problems." },
      { word: "Differential Movement", def: "When different parts of your slab move at different rates — causes cracking, sticking doors, sloping floors." },
    ],
  },
];

export default function DFWHomeownerVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = tradeCategories[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📖</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Homeowner Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, margin: 0 }}>Terms every DFW homeowner must know before calling a contractor</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {tradeCategories.map((cat, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642″ : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {cat.trade}
            </button>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 14, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginTop: 0, marginBottom: 18 }}>{active.trade} Key Terms</h2>
          {active.terms.map((term, i) => (
            <div key={i} onClick={() => setActiveTerm(activeTerm === i ? null : i)}
              style={{ background: activeTerm === i ? "#1a2d48″ : "#0d1b2e", border: `1px solid ${activeTerm === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 10, padding: "14px 18px", marginBottom: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: activeTerm === i ? "#F5E642″ : "#e2e8f0", fontSize: 16 }}>{term.word}</span>
                <span style={{ color: "#F5E642″, fontSize: 18 }}>{activeTerm === i ? "▲" : "▼"}</span>
              </div>
              {activeTerm === i && <p style={{ color: "#94a3b8″, fontSize: 14, margin: "10px 0 0", lineHeight: 1.6 }}>{term.def}</p>}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#475569″, fontSize: 13, marginTop: 28 }}>© 2026 ProLnk · DFW Home Services Platform</p>
      </div>
    </div>
  );
}
