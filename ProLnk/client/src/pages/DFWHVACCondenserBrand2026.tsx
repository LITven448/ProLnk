import { useState } from 'react';

const brands = [
  { name: "Trane", emoji: "🏆", score: 95, strengths: ["Best DFW heat tolerance", "Exceptional reliability", "10-yr parts warranty"], bestFor: "Reliability-first homeowners" },
  { name: "Lennox", emoji: "⚡", score: 91, strengths: ["Top SEER2 ratings", "Energy savings in DFW", "Smart thermostat integration"], bestFor: "Energy-efficiency seekers" },
  { name: "Carrier", emoji: "🛡️", score: 88, strengths: ["Solid DFW performer", "Good warranty coverage", "Wide dealer network"], bestFor: "Value + reliability balance" },
  { name: "American Standard", emoji: "🔩", score: 94, strengths: ["Trane-equivalent build", "Same manufacturing line", "Slightly lower price"], bestFor: "Trane quality at lower cost" },
];

const priorities = [
  { id: "reliability", label: "⚙️ Maximum Reliability", top: "Trane" },
  { id: "efficiency", label: "💡 Energy Savings", top: "Lennox" },
  { id: "value", label: "💰 Best Value", top: "American Standard" },
  { id: "warranty", label: "📋 Warranty Coverage", top: "Carrier" },
];

export default function DFWHVACCondenserBrand2026() {
  const [priority, setPriority] = useState("");
  const [selected, setSelected] = useState("");

  const rec = priorities.find(p => p.id === priority);
  const highlighted = rec?.top || selected;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW AC Condenser Brand Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Choosing the right brand for North Texas heat — up to 110°F summers</p>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 12 }}>🎯 What matters most to you?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {priorities.map(p => (
              <button key={p.id} onClick={() => setPriority(p.id)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "2px solid", borderColor: priority === p.id ? "#F5E642" : "#334155", background: priority === p.id ? "#F5E64220" : "transparent", color: priority === p.id ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 13 }}>
                {p.label}
              </button>
            ))}
          </div>
          {rec && <p style={{ color: "#4ADE80", marginTop: 12, fontSize: 14 }}>✅ Our DFW pick for your priority: <strong>{rec.top}</strong></p>}
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setSelected(b.name)}
              style={{ background: "#1E2D45", borderRadius: 12, padding: 18, border: "2px solid", borderColor: highlighted === b.name ? "#F5E642" : "#1E2D45", cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 28 }}>{b.emoji}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: highlighted === b.name ? "#F5E642" : "#E8EAF0" }}>{b.name}</span>
                </div>
                <div style={{ background: "#0A1628", borderRadius: 8, padding: "4px 10px", fontSize: 13, color: "#F5E642", fontWeight: 700 }}>DFW Score: {b.score}/100</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {b.strengths.map(s => <span key={s} style={{ background: "#0A1628", borderRadius: 6, padding: "3px 8px", fontSize: 12, color: "#94A3B8" }}>{s}</span>)}
              </div>
              <p style={{ color: "#64748B", fontSize: 13, margin: 0 }}>Best for: {b.bestFor}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 18, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk Connects You to Charter HVAC Pros</p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>All brands above perform well in DFW with proper installation. ProLnk Charter pros install all major brands with DFW-specific protocols.</p>
        </div>
      </div>
    </div>
  );
}