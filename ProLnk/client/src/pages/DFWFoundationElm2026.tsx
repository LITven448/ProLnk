import { useState } from 'react';

const situations = [
  { id: "close", label: "Cedar Elm trunk is within 10 feet of foundation", result: "High risk zone. Cedar Elms reach 60ft tall with root systems extending 50–75ft from trunk. A tree 10ft away has roots actively drawing moisture from the clay beneath your slab. DFW engineers recommend removal or a deep root barrier (18–24\" below grade) if your foundation is already showing movement." },
  { id: "medium", label: "Cedar Elm trunk is 20–30 feet from foundation", result: "Monitor zone. Root systems extend 50–75ft, so a 25ft tree can still reach under your foundation. However, a healthy mature Cedar Elm at 25ft with active watering of the tree (which keeps roots deeper) may be manageable. Annual foundation inspection recommended." },
  { id: "far", label: "Cedar Elm is 40+ feet from foundation", result: "Generally safe distance for most Cedar Elms. Root zone extremities may reach your slab but without the concentrated moisture withdrawal of closer proximity. Maintain consistent soil moisture around foundation perimeter regardless." },
  { id: "shade", label: "Cedar Elm provides shade on west side of house", result: "Significant cooling benefit — 30% reduction in cooling costs for west-facing walls is well-documented. Weigh this against foundation risk carefully. A tree at 30–40ft with a root barrier installed may be worth keeping. Consult a certified arborist + foundation engineer together." },
  { id: "roots", label: "Visible surface roots near the foundation", result: "Surface roots within 5ft of your slab indicate the tree is seeking moisture directly under the foundation. This is the clearest sign of active risk. Have a structural engineer assess foundation condition and an arborist assess root containment options before the tree causes more settlement." },
];

export default function DFWFoundationElm2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>🌳 Cedar Elm & DFW Foundation Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          Cedar Elm is DFW's most widely planted shade tree — beloved for its fast growth, tolerance of Texas heat, and 30% cooling benefit. But its 50–75ft root system and aggressive moisture seeking create real foundation risk on Blackland Prairie clay. Here’s how to assess your situation.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌳", label: "Mature Height", val: "Up to 60 ft" },
            { icon: "🌿", label: "Root Zone Radius", val: "50–75 ft" },
            { icon: "❄️", label: "Cooling Benefit (West)", val: "~30% reduction" },
            { icon: "⚠️", label: "Safe Distance", val: "30–40 ft min" },
          ].map(card => (
            <div key={card.label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{card.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginBottom: "0.25rem" }}>{card.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.95rem" }}>{card.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🔍 What's Your Cedar Elm Situation?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? "#1e3a5f" : "#111d35″, border: `2px solid ${selected === s.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642″, borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>🏗️ Foundation Guide</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}
      </div>
    </div>
  );
}