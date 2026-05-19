import { useState } from 'react';

const homeTypes = [
  { label: "1,200 sq ft Ranch", sqft: 1200, importance: "Critical — High" },
  { label: "2,000 sq ft Two-Story", sqft: 2000, importance: "Critical — Very High" },
  { label: "3,500 sq ft Custom Home", sqft: 3500, importance: "Critical — Extreme" },
  { label: "Mobile/Manufactured", sqft: 1000, importance: "Moderate — Lower complexity" },
];

export default function DFWHVACLoadCalculation2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Manual J Load Calculation</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 28 }}>Why proper HVAC sizing is the most critical decision for DFW homeowners — and how to avoid a costly oversizing mistake.</p>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          ⚠️ DFW Design Temperature: 102°F — Higher than most US cities. Sizing errors are more expensive here.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>What Is Manual J?</h2>
        <p style={{ color: "#94a3b8″, marginBottom: 20 }}>Manual J is the ACCA-standard load calculation that determines exactly how much heating and cooling your home needs. It accounts for square footage, insulation R-values, window count and orientation, roof color, infiltration rate, and local climate data.</p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>DFW-Specific Inputs</h2>
        <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
          {[
            { icon: "🌡️", label: "Design Temp", val: "102°F outdoor / 75°F indoor" },
            { icon: "☀️", label: "Solar Gain", val: "High — south/west windows critical" },
            { icon: "🧱", label: "Insulation", val: "Attic R-38+ recommended" },
            { icon: "💨", label: "Infiltration", val: "ACH 0.35 standard for tight homes" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Cost of Manual J vs. Oversizing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4 }}>✅ Proper Calc</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>$150–$400</div>
            <div style={{ color: "#94a3b8″, fontSize: 13 }}>One-time cost, prevents major error</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#ef4444″, fontWeight: 700, marginBottom: 4 }}>❌ Oversized Unit</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>$2,000+</div>
            <div style={{ color: "#94a3b8″, fontSize: 13 }}>Short-cycling, humidity issues, premature failure</div>
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Select Your Home Type</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {homeTypes.map((h, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642″ : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
              {h.label} — {h.sqft.toLocaleString()} sq ft
            </button>
          ))}
        </div>
        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642″ }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Manual J Importance for {homeTypes[selected].label}</div>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{homeTypes[selected].importance}</div>
            <div style={{ color: "#94a3b8″, fontSize: 14 }}>Any HVAC contractor who skips Manual J and sizes by square footage alone is making a {homeTypes[selected].sqft > 2000 ? "very costly" : "common"} mistake for DFW homes. Demand a written load calc report before signing any contract.</div>
          </div>
        )}

        <div style={{ marginTop: 32, background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🔧 Get a Free DFW HVAC Estimate</div>
          <div style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 12 }}>ProLnk connects you with DFW HVAC contractors who perform proper Manual J calculations.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Estimate →</button>
        </div>
      </div>
    </div>
  );
}
