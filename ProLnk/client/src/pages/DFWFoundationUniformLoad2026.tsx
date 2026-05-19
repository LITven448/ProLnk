import { useState } from 'react';

const loads = [
  { label: "Gun Safe (500–1,000 lbs) on Slab", impact: "Low Risk", detail: "Distributed across 4+ sq ft footprint. Slab can handle point loads. Place against interior wall near load-bearing beam." },
  { label: "Gun Safe (500–1,000 lbs) on Pier and Beam", impact: "Moderate Risk", detail: "Concentrate safe over a beam — never in the center of a joist span. Sistering joists recommended for 800+ lbs." },
  { label: "Grand Piano (500–1,200 lbs) on Slab", impact: "Low Risk", detail: "3 point legs — each carries 166–400 lbs. Normal DFW slab handles this well. No action typically needed." },
  { label: "Large Aquarium (1,000+ lbs) on Pier and Beam", impact: "High Risk", detail: "Water is 8.3 lbs per gallon. A 150-gallon tank is 1,245 lbs. Must be placed over a beam with structural assessment." },
  { label: "Swimming Pool Adjacent to Slab", impact: "Moderate Risk", detail: "Pool excavation and water weight can affect slab edge. DFW clay shrinks and swells — monitor edges closest to pool for cracking." },
  { label: "Water Feature or Fountain (300+ lbs) on Pier and Beam", impact: "Moderate Risk", detail: "Outdoor fountains near foundation should not exceed 200 lbs without a structural review of adjacent beam spacing." },
];

export default function DFWFoundationUniformLoad2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Uniform Load Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 28 }}>How heavy objects and add-ons affect DFW slab and pier-and-beam foundations — before you place them.</p>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          🏗️ DFW clay soil already stresses foundations year-round. Extra weight amplifies seasonal movement.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>DFW Foundation Load Basics</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "🏠", label: "Slab Design Load", val: "40 lbs per sq ft live load — most furniture and safes are within safe range" },
            { icon: "🪵", label: "Pier and Beam Design", val: "40 lbs per sq ft but concentrated loads over beam spans are the failure point" },
            { icon: "🌊", label: "Water Weight", val: "8.34 lbs per gallon — a 200-gallon aquarium weighs 1,668 lbs before the tank" },
            { icon: "📐", label: "Point vs Distributed", val: "3-leg grand piano: ~400 lbs per leg vs sofa: distributed 200 lbs over 12 sq ft" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔍 Select Your Load + Home Type</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {loads.map((l, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642″ : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {l.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642″, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>
              Foundation Impact:{" "}
              <span style={{ color: loads[selected].impact.includes("High") ? "#ef4444″ : loads[selected].impact.includes("Moderate") ? "#f59e0b" : "#22c55e" }}>
                {loads[selected].impact}
              </span>
            </div>
            <div style={{ color: "#94a3b8″, fontSize: 14 }}>{loads[selected].detail}</div>
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🏠 Get a Free DFW Foundation Evaluation</div>
          <div style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 12 }}>ProLnk connects you with licensed DFW structural engineers and foundation contractors for a site evaluation before you place heavy loads.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Evaluation →</button>
        </div>
      </div>
    </div>
  );
}
