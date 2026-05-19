import { useState } from 'react';

const scenarios = [
  {
    location: "Kitchen Sink & Countertop", challenge: "Hard Water",
    icon: "🚰",
    brand: "GE Silicone I or II",
    why: "Best for DFW hard water areas. 100% silicone bonds permanently to porcelain and laminate without shrinking. Waterproof from day one. DFW water is notoriously hard (300+ ppm), which deteriorates latex caulk within 1–2 years.",
    tip: "Clean joint with denatured alcohol before applying. Do not use latex caulk near DFW kitchen sinks.",
    lifespan: "10–20 years"
  },
  {
    location: "Bathroom Tub & Shower", challenge: "Mold & Moisture",
    icon: "🚿",
    brand: "GE Sealants Advanced Silicone 2 Kitchen & Bath",
    why: "Mold-resistant formula critical for DFW bathrooms. Humidity spikes in spring and fall create ideal mold conditions. 10x stronger bond than standard caulk. Shrink and crack resistant.",
    tip: "Apply when tub is full of water — allows proper cure gap. Keep dry 24 hours after application.",
    lifespan: "7–15 years"
  },
  {
    location: "Exterior Windows & Doors", challenge: "DFW Foundation Movement",
    icon: "🪟",
    brand: "DAP 3.0 Sealant or Lexel",
    why: "DFW homes move dramatically with clay soil expansion. Standard caulk cracks as foundation shifts. DAP 3.0 stretches 600%. Lexel is specialty flexible — stretches even more and bonds to almost anything. Both paintable.",
    tip: "Lexel is messy to apply but unmatched for DFW foundation movement joints.",
    lifespan: "5–10 years (re-inspect annually)"
  },
  {
    location: "Exterior Siding & Trim", challenge: "Heat Expansion",
    icon: "🏠",
    brand: "DAP Dynaflex Ultra",
    why: "Designed for thermal expansion and contraction common in DFW summers (100°F+). Paintable after 30 min. Bonds to wood, vinyl, masonry, and fiber cement. Widely available at DFW Home Depots and Lowes.",
    tip: "Do not apply in direct sun during summer — bead cures too fast. Work in shade or early morning.",
    lifespan: "7–12 years"
  },
  {
    location: "Large Gaps (Attic, Plumbing)", challenge: "Air Sealing",
    icon: "💨",
    brand: "Great Stuff Pro Gaps & Cracks",
    why: "Expanding polyurethane foam for gaps over 1 inch. Critical for DFW attic air sealing where gaps let 100°F attic air into conditioned space. Massive energy savings. Pest barrier as well.",
    tip: "Wear gloves — cured foam is nearly impossible to remove from skin. Use gun-grade for large jobs.",
    lifespan: "Permanent when properly applied"
  },
  {
    location: "Concrete Driveway & Sidewalk", challenge: "DFW Freeze-Thaw",
    icon: "🛣️",
    brand: "Sashco Big Stretch or Sikaflex Pro",
    why: "DFW gets occasional freezes that crack standard caulk in concrete control joints. Sashco and Sikaflex remain flexible at 20°F. Polyurethane formula bonds to concrete permanently.",
    tip: "Clean control joint with wire brush before applying. Fill joint backer rod for gaps over 1/2 inch.",
    lifespan: "5–10 years"
  },
];

export default function DFWCaulkBrandsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = scenarios.find(s => s.location === selected);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔩</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Caulk Brand Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Right caulk for every DFW application — hard water, foundation movement, Texas heat</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>🏗️ DFW Caulk Challenge</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>DFW homes face three unique challenges: hard water (300+ ppm) that destroys latex caulk, expansive clay soil that shifts foundations, and 100°F summers that crack standard caulk. Never use all-purpose latex caulk for DFW wet areas.</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>Select Location + Challenge</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {scenarios.map(s => (
            <button key={s.location} onClick={() => setSelected(s.location)}
              style={{ backgroundColor: selected === s.location ? "#F5E642″ : "#111f3a", color: selected === s.location ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px 14px", cursor: "pointer", fontWeight: 600, fontSize: 12, textAlign: "left" }}>
              {s.icon} {s.location}<br /><span style={{ fontWeight: 400, fontSize: 11, opacity: 0.7 }}>{s.challenge}</span>
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 24, border: "2px solid #F5E642″ }}>
            <div style={{ fontSize: 13, color: "#94a3b8″, marginBottom: 4 }}>{result.icon} Best caulk for {result.location}:</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>🏆 {result.brand}</div>
            <p style={{ color: "#cbd5e1″, fontSize: 14, marginBottom: 12 }}>{result.why}</p>
            <div style={{ padding: 12, backgroundColor: "#0A1628″, borderRadius: 8, fontSize: 13, color: "#F5E642", marginBottom: 10 }}>
              💡 Pro Tip: {result.tip}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8″ }}>⏳ Expected lifespan: {result.lifespan}</div>
          </div>
        )}
      </div>
    </div>
  );
}
