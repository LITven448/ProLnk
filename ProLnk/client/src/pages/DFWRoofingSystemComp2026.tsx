import { useState } from 'react';

const components = [
  {
    id: "deck",
    name: "Roof Deck",
    emoji: "🪵",
    parts: ["7/16 inch OSB", "Plywood sheathing", "H-clips between rafters"],
    desc: "The structural base of your roof system. Plywood or OSB panels nailed to rafters or trusses. Everything else is installed on top of the deck.",
    dfw: "DFW hail can puncture or crack roof decking under shingles without visible exterior damage. After any hail event above 1 inch diameter, have a pro inspect for soft spots in the deck.",
  },
  {
    id: "underlayment",
    name: "Underlayment",
    emoji: "📄",
    parts: ["#15 or #30 felt", "Synthetic underlayment", "Ice & water shield (low-slope areas)"],
    desc: "Secondary water barrier installed directly on the roof deck before shingles. Protects the deck during installation and provides backup waterproofing if shingles fail.",
    dfw: "Synthetic underlayments are far superior to felt in DFW heat—felt dries out and cracks within years in 140°F attics. Request synthetic underlayment on any DFW reroof.",
  },
  {
    id: "shingles",
    name: "Field Shingles",
    emoji: "🔲",
    parts: ["Asphalt shingles (3-tab or architectural)", "Impact-resistant (Class 3 or 4)", "Starter strip at eaves"],
    desc: "The visible weatherproofing layer. Architectural (dimensional) shingles are standard in DFW. Class 4 impact-resistant shingles may reduce insurance premiums significantly.",
    dfw: "DFW averages 4-6 hail events per year. Class 4 IR shingles cost 10-15% more but often yield 20-30% insurance discounts. Ask your ProLnk roofing pro about IR shingle ROI for your zip code.",
  },
  {
    id: "ridge",
    name: "Ridge & Hip Caps",
    emoji: "🏔️",
    parts: ["Ridge cap shingles", "Hip cap shingles", "Ridge vent (if present)"],
    desc: "Specially cut shingles that cover the peak (ridge) and angled hips of the roof. Critical waterproofing point—poorly installed ridge caps are a top cause of DFW leak calls.",
    dfw: "DFW ridge caps take direct sun all day and degrade faster than field shingles. Inspect ridge caps every 3 years; cracked or missing caps allow water entry into the attic during North Texas storms.",
  },
  {
    id: "flashings",
    name: "Flashings",
    emoji: "🔧",
    parts: ["Step flashing", "Counter flashing", "Valley flashing", "Pipe boots", "Drip edge"],
    desc: "Metal or rubberized barriers at every roof penetration and transition point. Protects where shingles meet walls, chimneys, vents, and valleys where two roof planes meet.",
    dfw: "Pipe boot flashings are the #1 DFW roof leak source. Neoprene boots crack in UV exposure within 10-15 years. Replace all pipe boots during any DFW reroof—it is a $50 part that prevents $10,000 damage.",
  },
  {
    id: "ventilation",
    name: "Ridge & Soffit Vents",
    emoji: "💨",
    parts: ["Ridge vent (exhaust)", "Soffit vents (intake)", "Gable vents (supplemental)", "Baffles"],
    desc: "Passive ventilation system that moves hot air out of the attic. Cool air enters at soffits, rises, and exits at the ridge. Proper ventilation extends shingle life significantly.",
    dfw: "DFW attics without proper ventilation reach 160°F+—this bakes shingles from underneath and voids manufacturer warranties. Verify 1 sqft of net free area per 150 sqft of attic floor.",
  },
];

export default function DFWRoofingSystemComp2026() {
  const [active, setActive] = useState<string | null>(null);
  const selected = components.find((c) => c.id === active);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Roofing System Components</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>Complete Reference 2026 — Select a component to explore</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {components.map((c) => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? "#F5E642″ : "#1e2d4a", border: "2px solid " + (active === c.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "1.2rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, color: active === c.id ? "#0A1628″ : "#F5E642", fontSize: "0.95rem" }}>{c.name}</div>
              <div style={{ color: active === c.id ? "#1e2d4a" : "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.parts.length} parts</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#1e2d4a", border: "2px solid #F5E642″, borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ color: "#F5E642″, margin: "0 0 0.5rem" }}>{selected.emoji} {selected.name}</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {selected.parts.map((p) => (
                <span key={p} style={{ background: "#0A1628″, border: "1px solid #2d3f5e", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.8rem", color: "#94a3b8" }}>{p}</span>
              ))}
            </div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.7, margin: "0 0 1rem" }}>{selected.desc}</p>
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.3rem" }}>⛈️ DFW-Specific Note</div>
              <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.dfw}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#1e2d4a", borderRadius: 12 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700 }}>🔧 Need a DFW Roofing Pro?</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: "0.3rem" }}>ProLnk matches you with verified DFW roofers — free storm damage inspections, insurance claim help</div>
        </div>
      </div>
    </div>
  );
}
