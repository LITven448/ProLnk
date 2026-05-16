import { useState } from 'react';

const pests = [
  { type: "One-Time General Pest Control", low: 150, high: 250, icon: "🪲" },
  { type: "Quarterly Service (per visit)", low: 120, high: 180, icon: "🗓️" },
  { type: "Termite Inspection", low: 75, high: 150, icon: "🔍" },
  { type: "Termite Treatment (Liquid)", low: 1200, high: 2500, icon: "🧪" },
  { type: "Sentricon Bait System (annual)", low: 1500, high: 3500, icon: "🎯" },
  { type: "Mosquito Barrier Spray (per visit)", low: 75, high: 150, icon: "🦟" },
];

export default function DFWPestControlCostGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{ fontSize: "3rem" }}>🐜</span>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>DFW Pest Control Cost Guide 2026</h1>
          <p style={{ color: "#a0aec0" }}>Pest service pricing for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ background: "#132238", borderRadius: 10, padding: "1rem 1.5rem", marginBottom: "1.5rem", borderLeft: "4px solid #F5E642" }}>
          <p style={{ margin: 0, color: "#F5E642", fontWeight: 700 }}>🌡️ DFW Pest Pressure is High</p>
          <p style={{ margin: "0.5rem 0 0", color: "#a0aec0", fontSize: "0.9rem" }}>The DFW climate is ideal for termites, fire ants, mosquitoes, and cockroaches year-round. Regular quarterly treatment is strongly recommended for all homeowners.</p>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🔍 Select Pest Type for Cost Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {pests.map((p, i) => (
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
                {p.icon} {p.type}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ marginTop: "1.5rem", background: "#0A1628", borderRadius: 10, padding: "1.25rem", border: "2px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{pests[selected].icon} {pests[selected].type}</h3>
              <p style={{ fontSize: "1.5rem", color: "#fff", margin: 0 }}>
                💰 Estimated Cost: <strong style={{ color: "#F5E642" }}>${pests[selected].low.toLocaleString()} – ${pests[selected].high.toLocaleString()}</strong>
              </p>
              <p style={{ color: "#a0aec0", marginTop: "0.5rem", fontSize: "0.9rem" }}>DFW market pricing. Home size, infestation severity, and treatment method affect final cost.</p>
            </div>
          )}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>📊 Full Pest Control Price Reference</h2>
          {pests.map((p, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid #1a2e4a" }}>
              <span>{p.icon} {p.type}</span>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>${p.low.toLocaleString()} – ${p.high.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>🔗 Find a Trusted DFW Pest Control Pro</h2>
          <p style={{ color: "#a0aec0" }}>ProLnk connects Dallas-Fort Worth homeowners with licensed, reviewed pest control companies in your zip code.</p>
          <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 8, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
            Get Free Pest Control Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}