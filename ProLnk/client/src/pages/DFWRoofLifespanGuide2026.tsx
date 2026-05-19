import { useState } from 'react';

const roofTypes = [
  { type: "3-Tab Shingles", icon: "🏠", dfwLife: 15, nationalLife: 20, impactResistant: false, cost: "$8,000–$12,000″ },
  { type: "Architectural Shingles", icon: "🏡", dfwLife: 22, nationalLife: 30, impactResistant: false, cost: "$12,000–$18,000″ },
  { type: "Class 4 Impact Shingles", icon: "⭐", dfwLife: 32, nationalLife: 40, impactResistant: true, cost: "$16,000–$24,000″ },
  { type: "Metal Roofing", icon: "🏗️", dfwLife: 45, nationalLife: 50, impactResistant: true, cost: "$25,000–$45,000″ },
  { type: "Tile Roofing", icon: "🪨", dfwLife: 35, nationalLife: 50, impactResistant: false, cost: "$20,000–$40,000″ },
];

const inspectionTriggers = [
  { trigger: "After any hail event", icon: "🌨️", urgency: "Immediate" },
  { trigger: "Post-storm wind >60 mph", icon: "💨", urgency: "Within 48 hrs" },
  { trigger: "Shingles in yard or gutters", icon: "🍂", urgency: "Same week" },
  { trigger: "Water stains on ceilings", icon: "💧", urgency: "Immediate" },
  { trigger: "Annual inspection (spring)", icon: "📋", urgency: "Routine" },
];

export default function DFWRoofLifespanGuide2026() {
  const [selectedType, setSelectedType] = useState("Architectural Shingles");
  const [roofAge, setRoofAge] = useState(12);

  const selected = roofTypes.find(r => r.type === selectedType)!;
  const pctLife = Math.min(100, Math.round((roofAge / selected.dfwLife) * 100));
  const remaining = Math.max(0, selected.dfwLife - roofAge);

  const getStatus = () => {
    if (remaining === 0) return { label: "Replace Now", color: "#ef4444″ };
    if (remaining <= 3) return { label: "Plan Replacement", color: "#f97316″ };
    if (pctLife >= 70) return { label: "Inspect Annually", color: "#F5E642″ };
    return { label: "Good Condition", color: "#22c55e" };
  };

  const status = getStatus();

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>DFW Roof Lifespan Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>DFW hail season cuts roof life 25–35% vs national averages</p>
        </div>

        <div style={{ background: "#1e3a5f33″, borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #1e3a5f", fontSize: 14, color: "#94a3b8" }}>
          ⛈️ <strong style={{ color: "#F5E642″ }}>DFW Hail Reality:</strong> DFW receives 2–4 significant hail events per year. Each event chips away at shingle life. Class 4 impact-resistant shingles last 30–40% longer and typically earn a <strong style={{ color: "#fff" }}>20–30% insurance discount</strong>.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#111d35″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642″, fontWeight: 600, display: "block", marginBottom: 10 }}>🏠 Roof Type</label>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ width: "100%", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px", fontSize: 14 }}>
              {roofTypes.map(r => <option key={r.type} value={r.type}>{r.icon} {r.type}</option>)}
            </select>
          </div>
          <div style={{ background: "#111d35″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642″, fontWeight: 600, display: "block", marginBottom: 10 }}>📅 Roof Age: {roofAge} years</label>
            <input type="range" min={1} max={50} value={roofAge} onChange={e => setRoofAge(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642″ }} />
          </div>
        </div>

        <div style={{ background: status.color + "15″, border: `2px solid ${status.color}`, borderRadius: 14, padding: 24, textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>DFW Expected Life</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: status.color }}>{selected.dfwLife} yrs</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>Life Used</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}>{pctLife}%</div>
            </div>
            <div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>Remaining</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: status.color }}>{remaining} yrs</div>
            </div>
          </div>
          <div style={{ marginTop: 12, color: "#e2e8f0″, fontWeight: 600 }}>{status.label}{selected.impactResistant ? " · ✅ Impact-Resistant" : ""}</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>Replacement cost estimate: {selected.cost}</div>
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, border: "1px solid #1e3a5f", overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e3a5f" }}><span style={{ color: "#F5E642″, fontWeight: 700 }}>🔍 DFW Inspection Triggers</span></div>
          {inspectionTriggers.map((t, i) => (
            <div key={i} style={{ padding: "12px 18px", borderBottom: i < inspectionTriggers.length - 1 ? "1px solid #0A1628″ : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.icon} {t.trigger}</div>
              <div style={{ color: t.urgency === "Immediate" ? "#ef4444″ : t.urgency === "Within 48 hrs" ? "#f97316" : "#F5E642", fontSize: 13, fontWeight: 600 }}>{t.urgency}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
