import { useState } from 'react';

const buildingTypes = [
  { id: "office", label: "🏢 Office Tower", system: "Cooling Tower", reason: "High occupancy density benefits from evaporative cooling efficiency in DFW heat." },
  { id: "retail", label: "🏪 Retail Center", system: "Chiller Plant", reason: "Closed-loop chillers offer precise humidity control critical for retail comfort." },
  { id: "industrial", label: "🏭 Industrial/Warehouse", system: "Cooling Tower", reason: "Large open floor plans benefit from the high-capacity, low-cost evaporative approach." },
  { id: "medical", label: "🏥 Medical Facility", system: "Chiller (Redundant)", reason: "Medical facilities require redundant closed-loop systems for contamination control." },
  { id: "hotel", label: "🏨 Hotel", system: "Cooling Tower", reason: "High hot-day loads align perfectly with DFW evaporative cooling advantages." },
];

export default function DFWHVACCoolingTowerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = buildingTypes.find(b => b.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642", color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          🌡️ DFW COMMERCIAL COOLING 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Cooling Tower vs Chiller Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.6 }}>
          DFW commercial buildings face 100°F+ summers. Understanding whether your building needs a cooling tower or chiller plant determines energy costs, maintenance budgets, and comfort reliability.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { icon: "🗼", title: "Cooling Tower", tag: "Evaporative", points: ["Uses evaporation for free cooling", "Best for DFW dry heat days", "Lower operating cost", "Requires water treatment"], color: "#22c55e" },
            { icon: "❄️", title: "Chiller Plant", tag: "Closed Loop", points: ["Sealed refrigerant loop", "Precise humidity control", "Higher energy use", "No water contamination risk"], color: "#3b82f6" },
          ].map(s => (
            <div key={s.title} style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", borderLeft: `4px solid ${s.color}` }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.title}</div>
              <div style={{ color: s.color, fontSize: 12, fontWeight: 600, marginBottom: "0.75rem" }}>{s.tag}</div>
              <ul style={{ color: "#cbd5e1", fontSize: 14, paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                {s.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642", marginBottom: "1rem" }}>🏗️ Select Your Building Type</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
            {buildingTypes.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)}
                style={{ background: selected === b.id ? "#F5E642" : "#1e3a5f", color: selected === b.id ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {b.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642", fontSize: "1rem", marginBottom: "0.5rem" }}>✅ Recommended: {match.system}</div>
              <p style={{ color: "#cbd5e1", fontSize: 14, margin: 0 }}>{match.reason}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#F5E642", marginBottom: "0.75rem" }}>⚡ DFW Climate Advantage</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            DFW averages 38 inches of rain yearly with low relative humidity on hot days — ideal for evaporative cooling towers. On a 105°F day with 20% humidity, a cooling tower can reject heat at a fraction of chiller energy cost. Most DFW Class A office buildings above 100,000 sq ft use cooling towers as the primary plant.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: 13 }}>
          ProLnk · DFW Commercial HVAC Intelligence · 2026
        </div>
      </div>
    </div>
  );
}