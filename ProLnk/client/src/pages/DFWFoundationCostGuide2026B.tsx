import { useState } from 'react';

const issues = [
  { type: "Structural Engineer Report", low: 400, high: 700, icon: "📋" },
  { type: "Underpinning (per pier)", low: 400, high: 600, icon: "🔩" },
  { type: "Typical Job (10 Piers)", low: 4000, high: 6000, icon: "🏗️" },
  { type: "Interior Pier Addition", low: 1000, high: 2000, icon: "📐" },
  { type: "Drainage System Installation", low: 2500, high: 8000, icon: "💧" },
  { type: "Full Perimeter Repair", low: 15000, high: 25000, icon: "🏠" },
];

export default function DFWFoundationCostGuide2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "3rem" }}>🏗️</span>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>DFW Foundation Repair Cost Guide 2026</h1>
          <p style={{ color: "#a0aec0" }}>Part 2 — Foundation repair pricing for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ background: "#132238", borderRadius: 10, padding: "1rem 1.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #F5E642" }}>
          <p style={{ margin: 0, color: "#F5E642", fontWeight: 700 }}>⚠️ DFW Clay Soil Warning</p>
          <p style={{ margin: "0.5rem 0 0", color: "#a0aec0", fontSize: "0.9rem" }}>Dallas-Fort Worth sits on expansive clay soil that shifts dramatically with moisture. Foundation issues are extremely common — most homes need some form of attention within 20 years.</p>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🔍 Select Issue Type for Cost Range</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {issues.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? "#F5E642" : "#1a2e4a",
                  color: selected === i ? "#0A1628" : "#fff",
                  border: "1px solid #F5E642",
                  borderRadius: 8,
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: selected === i ? 700 : 400,
                  transition: "all 0.2s",
                }}
              >
                {item.icon} {item.type}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ marginTop: "1.5rem", background: "#0A1628", borderRadius: 10, padding: "1.25rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{issues[selected].icon} {issues[selected].type}</h3>
              <p style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                💰 Estimated Cost: <strong style={{ color: "#F5E642" }}>${issues[selected].low.toLocaleString()} – ${issues[selected].high.toLocaleString()}</strong>
              </p>
              <p style={{ color: "#a0aec0", marginTop: "0.5rem", fontSize: "0.9rem" }}>DFW market pricing. Number of piers needed depends on severity and home square footage.</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>📊 Foundation Repair Price Reference</h2>
          {issues.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #1a2e4a" }}>
              <span>{item.icon} {item.type}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>${item.low.toLocaleString()} – ${item.high.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🔗 Connect with Vetted Foundation Contractors</h2>
          <p style={{ color: "#a0aec0" }}>ProLnk matches you with licensed, reviewed foundation repair specialists in the Dallas-Fort Worth metro.</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Get Foundation Repair Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}