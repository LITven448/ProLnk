import { useState } from 'react';

const jobs = [
  { type: "Emergency Service Call", low: 150, high: 250, icon: "🚨" },
  { type: "Routine Service Call", low: 85, high: 125, unit: "/hr", icon: "🔧" },
  { type: "Faucet Replacement", low: 150, high: 300, icon: "🚿" },
  { type: "Toilet Replacement", low: 250, high: 450, icon: "🚽" },
  { type: "Water Heater Replacement", low: 800, high: 1500, icon: "🌡️" },
  { type: "Slab Leak Repair", low: 1500, high: 5000, icon: "💧" },
];

export default function DFWPlumbingCostGuide2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "3rem" }}>🔧</span>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>DFW Plumbing Cost Guide 2026</h1>
          <p style={{ color: "#a0aec0" }}>Part 2 — Service call rates & repair pricing for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🛠️ Select a Job Type to See Cost</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {jobs.map((j, i) => (
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
                {j.icon} {j.type}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ marginTop: "1.5rem", background: "#0A1628", borderRadius: 10, padding: "1.25rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{jobs[selected].icon} {jobs[selected].type}</h3>
              <p style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                💰 Estimated Cost: <strong style={{ color: "#F5E642" }}>${jobs[selected].low.toLocaleString()} – ${jobs[selected].high.toLocaleString()}{jobs[selected].unit || ""}</strong>
              </p>
              <p style={{ color: "#a0aec0", marginTop: "0.5rem", fontSize: "0.9rem" }}>Prices reflect DFW market averages. Emergency rates, access difficulty, and materials affect final cost.</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>📊 Full Plumbing Rate Sheet</h2>
          {jobs.map((j, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #1a2e4a" }}>
              <span>{j.icon} {j.type}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>${j.low.toLocaleString()} – ${j.high.toLocaleString()}{j.unit || ""}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0, textAlign: "center" }}>⚠️ DFW Plumbing Tips</h2>
          <ul style={{ color: "#a0aec0", paddingLeft: "1.25rem" }}>
            <li>Slab leaks are common in DFW due to clay soil movement — get 3 bids</li>
            <li>Always confirm flat-rate vs. hourly pricing before work begins</li>
            <li>Ask for licensed master plumber on any water heater replacement</li>
          </ul>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              Get Free Plumber Quotes →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}