import { useState } from 'react';

const scenarios = [
  {
    project: "Exterior — Premium Budget", icon: "🏠",
    brand: "Sherwin-Williams Emerald Exterior",
    why: "Top performer in DFW UV and heat conditions. Self-priming, fade-resistant. Most popular with DFW painting pros. 100% acrylic latex. Expect $75–90/gallon.",
    lifespan: "8–12 years on DFW exteriors",
    where: "Sherwin-Williams stores throughout DFW"
  },
  {
    project: "Exterior — Value Budget", icon: "💰",
    brand: "Behr Marquee Exterior (Home Depot)",
    why: "Best value for DFW exterior. One-coat coverage reduces labor. UV resistance rated for Texas sun. Available at all DFW Home Depots. Expect $50–65/gallon.",
    lifespan: "6–10 years on DFW exteriors",
    where: "Home Depot — 22 DFW locations"
  },
  {
    project: "Interior — Premium", icon: "🛋️",
    brand: "Benjamin Moore Aura or Regal",
    why: "Premium interior paint with superior coverage and washability. Independent dealers in DFW (Regal Paint Centers, etc.). Worth the premium for high-traffic areas.",
    lifespan: "10–15 years interior",
    where: "Independent paint dealers in DFW"
  },
  {
    project: "Interior — Value", icon: "🪣",
    brand: "Behr Premium Plus Interior (Home Depot)",
    why: "Excellent value for DFW interior projects. Paint + primer in one. Scrub-resistant finish. Widely available at all DFW Home Depots. Expect $35–45/gallon.",
    lifespan: "8–12 years interior",
    where: "Home Depot — 22 DFW locations"
  },
  {
    project: "Bathroom & High Moisture", icon: "🚿",
    brand: "Sherwin-Williams Emerald Bath",
    why: "Mold and mildew resistant formula designed for DFW humidity spikes. Semi-gloss sheen repels moisture. Available at all DFW SW stores.",
    lifespan: "6–10 years in wet areas",
    where: "Sherwin-Williams stores throughout DFW"
  },
  {
    project: "Trim & Doors", icon: "🚪",
    brand: "Benjamin Moore Advance Waterborne Alkyd",
    why: "Levels like oil but cleans up with water. Hard, durable finish ideal for DFW trim that expands and contracts with heat. Semi-gloss or gloss finish.",
    lifespan: "10+ years on trim",
    where: "Independent Benjamin Moore dealers in DFW"
  },
];

export default function DFWPaintBrandsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = scenarios.find(s => s.project === selected);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🎨</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "0 0 8px" }}>DFW Paint Brand Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Best paint brands for the Dallas-Fort Worth climate — UV, heat, and humidity rated</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>☀️ DFW Paint Challenge</p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>100°F+ summers with intense UV, humidity swings, and thermal expansion require paint with superior UV inhibitors and flexibility. Generic paint brands fade and crack within 3–4 years on DFW exteriors.</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642", marginBottom: 12 }}>Select Project + Budget</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {scenarios.map(s => (
            <button key={s.project} onClick={() => setSelected(s.project)}
              style={{ backgroundColor: selected === s.project ? "#F5E642" : "#111f3a", color: selected === s.project ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px 14px", cursor: "pointer", fontWeight: 600, fontSize: 13, textAlign: "left" }}>
              {s.icon} {s.project}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 24, border: "2px solid #F5E642" }}>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>Best paint for {result.project}:</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642", marginBottom: 12 }}>🏆 {result.brand}</div>
            <p style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 12 }}>{result.why}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ padding: "8px 14px", backgroundColor: "#0A1628", borderRadius: 8, fontSize: 13 }}>
                ⏳ {result.lifespan}
              </div>
              <div style={{ padding: "8px 14px", backgroundColor: "#0A1628", borderRadius: 8, fontSize: 13, color: "#94a3b8" }}>
                📍 {result.where}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
