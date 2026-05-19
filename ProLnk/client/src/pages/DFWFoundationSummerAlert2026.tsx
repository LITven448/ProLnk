import { useState } from 'react';

const symptoms = [
  { id: "unstick", label: "Doors that stuck in spring now open freely", result: "Likely heave resolution — winter rain saturated DFW clay, causing upward movement. As soil dries in summer, heave resolves. Monitor: if doors re-stick in a new location by August, foundation is settling unevenly." },
  { id: "newstick", label: "New door/window sticking starting in June–July", result: "Drying and differential settlement. DFW Blackland Prairie clay contracts aggressively when dry. One corner drying faster than another causes racking. Have a foundation inspector evaluate before August peak." },
  { id: "soilgap", label: "Soil visibly pulling away from foundation", result: "High-alert indicator in DFW summers. That gap allows water to rush directly to foundation when storms hit — a flash flooding + foundation risk combo. Water the foundation perimeter with soaker hose to maintain moisture." },
  { id: "cracks", label: "New drywall cracks appearing in August", result: "August is peak differential settlement month in DFW. Small hairline cracks are often cosmetic, but cracks wider than 1/8\" at corners or diagonal from door frames need engineering assessment." },
  { id: "gapdoor", label: "Gap appearing between door frame and wall", result: "Structural movement indicator. In DFW summer, this typically means the slab is dropping on one end while the other stays elevated. Foundation repair likely needed — get 3 quotes before acting." },
];

export default function DFWFoundationSummerAlert2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>🏠 DFW Foundation Summer Alert Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          DFW summer is the highest-risk season for foundation movement. Blackland Prairie clay shrinks dramatically as moisture evaporates — causing settlement, cracking, and door/window racking that was absent in spring. Know the warning signs before they escalate.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌡️", label: "Peak Soil Shrinkage", val: "July–August" },
            { icon: "💧", label: "Moisture Loss Depth", val: "Up to 8 feet" },
            { icon: "📐", label: "Max Safe Crack Width", val: "1/8 inch" },
            { icon: "🚨", label: "Soil Gap = Emergency", val: "Water immediately" },
          ].map(card => (
            <div key={card.label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.75rem", marginBottom: "0.25rem" }}>{card.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginBottom: "0.25rem" }}>{card.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700 }}>{card.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🔍 What Summer Symptom Are You Seeing?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {symptoms.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? "#1e3a5f" : "#111d35″, border: `2px solid ${selected === s.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642″, borderRadius: 10, padding: "1.25rem", marginBottom: "2rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>🏗️ Assessment</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}

        <div style={{ background: "#111d35″, borderRadius: 10, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>💡 The Soaker Hose Method</div>
          <p style={{ color: "#94a3b8″, lineHeight: 1.65, margin: 0 }}>Run a soaker hose 18″ from your foundation perimeter for 30 minutes daily during July–August when rainfall is below 1″/week. This prevents the extreme drying that causes differential settlement. More DFW foundations are damaged by drought than floods.</p>
        </div>
      </div>
    </div>
  );
}