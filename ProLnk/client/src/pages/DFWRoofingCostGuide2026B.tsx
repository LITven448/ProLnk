import { useState } from 'react';

const jobs = [
  { type: "Roof Inspection", low: 150, high: 300, icon: "🔍" },
  { type: "Minor Repair", low: 300, high: 600, icon: "🔨" },
  { type: "Partial Replacement", low: 2000, high: 5000, icon: "🏚️" },
  { type: "Full Replacement (2,000 sqft, Arch Shingles)", low: 12000, high: 18000, icon: "🏠" },
  { type: "Metal Roof Installation", low: 22000, high: 35000, icon: "🏗️" },
  { type: "Flat/TPO Roof Repair", low: 500, high: 2500, icon: "📐" },
];

export default function DFWRoofingCostGuide2026B() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "3rem" }}>🏠</span>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW Roofing Cost Guide 2026</h1>
          <p style={{ color: "#a0aec0″ }}>Part 2 — Roofing repair & replacement pricing for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🔍 Select Roof Job Type</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {jobs.map((j, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? "#F5E642″ : "#1a2e4a",
                  color: selected === i ? "#0A1628″ : "#fff",
                  border: "1px solid #F5E642″,
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
            <div style={{ marginTop: "1.5rem", background: "#0A1628″, borderRadius: 10, padding: "1.25rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, margin: "0 0 0.5rem" }}>{jobs[selected].icon} {jobs[selected].type}</h3>
              <p style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                💰 Estimated Cost: <strong style={{ color: "#F5E642″ }}>${jobs[selected].low.toLocaleString()} – ${jobs[selected].high.toLocaleString()}</strong>
              </p>
              <p style={{ color: "#a0aec0″, marginTop: "0.5rem", fontSize: "0.9rem" }}>DFW market pricing. Hail damage claims, roof pitch, and material choice significantly affect cost.</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>📊 Roofing Price Reference</h2>
          {jobs.map((j, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0″, borderBottom: "1px solid #1a2e4a" }}>
              <span>{j.icon} {j.type}</span>
              <span style={{ color: "#F5E642″, fontWeight: 700 }}>${j.low.toLocaleString()} – ${j.high.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0, textAlign: "center" }}>🌩️ DFW Hail Season Alert</h2>
          <p style={{ color: "#a0aec0″ }}>DFW experiences severe hail storms April–June. After any hail event, get a professional inspection before filing an insurance claim — roofing contractors in DFW are experienced with hail damage documentation.</p>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
              Get Roofer Quotes →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}