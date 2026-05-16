import { useState } from 'react';

const costs = [
  { service: "Diagnostic Fee", low: 85, high: 150, icon: "🔍" },
  { service: "Capacitor Replacement", low: 150, high: 350, icon: "⚡" },
  { service: "Refrigerant Recharge (per lb)", low: 250, high: 500, icon: "❄️" },
  { service: "Blower Motor Replacement", low: 400, high: 700, icon: "💨" },
  { service: "Compressor Replacement", low: 1200, high: 2500, icon: "🔧" },
  { service: "Full System Replacement", low: 5000, high: 8000, icon: "🏠" },
];

export default function DFWHVACCostGuide2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "3rem" }}>❄️</span>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>DFW HVAC Cost Guide 2026</h1>
          <p style={{ color: "#a0aec0", fontSize: "1rem" }}>Part 2 — Detailed repair & replacement pricing for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>📋 Select a Repair to See Cost Range</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {costs.map((c, i) => (
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
                {c.icon} {c.service}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ marginTop: "1.5rem", background: "#0A1628", borderRadius: 10, padding: "1.25rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{costs[selected].icon} {costs[selected].service}</h3>
              <p style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                💰 Estimated Cost: <strong style={{ color: "#F5E642" }}>${costs[selected].low.toLocaleString()} – ${costs[selected].high.toLocaleString()}</strong>
              </p>
              <p style={{ color: "#a0aec0", marginTop: "0.5rem", fontSize: "0.9rem" }}>Prices reflect DFW market averages. Final cost depends on brand, home size, and labor rates.</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>📊 Full Cost Breakdown</h2>
          {costs.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #1a2e4a" }}>
              <span>{c.icon} {c.service}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>${c.low.toLocaleString()} – ${c.high.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🔗 Get Quotes from Vetted DFW HVAC Pros</h2>
          <p style={{ color: "#a0aec0" }}>ProLnk connects you with licensed, reviewed HVAC technicians in the Dallas-Fort Worth metro.</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}