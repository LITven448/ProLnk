import { useState } from 'react';

const comparison = [
  { feature: "Operation Modes", single: "100% on or 100% off", dual: "100% (hot days) + 65% (mild days)" },
  { feature: "DFW Shoulder Days", single: "Blasts at full power", dual: "Runs efficiently at 65%" },
  { feature: "Dehumidification", single: "Short cycles, poor humidity control", dual: "Longer low-speed cycles = drier air" },
  { feature: "Energy Efficiency", single: "Higher kWh on mild days", dual: "Up to 30% savings on shoulder days" },
  { feature: "Noise Level", single: "Loud on/off cycles", dual: "Quieter low-stage operation" },
  { feature: "Equipment Wear", single: "More on/off stress cycles", dual: "Less wear from softer starts" },
];

const scenarios = [
  { id: "large", label: "🏠 Large DFW home (2,500+ sq ft)", rec: "dual", reason: "Large homes benefit most from dual-stage efficiency on shoulder days" },
  { id: "humid", label: "💧 Humidity problems inside", rec: "dual", reason: "Dual-stage long low-speed runs dramatically improve dehumidification" },
  { id: "budget", label: "💰 Tight replacement budget", rec: "single", reason: "Single-stage costs $800-1,500 less upfront — still a solid DFW performer" },
  { id: "comfort", label: "🌡️ Comfort is priority #1", rec: "dual", reason: "More even temps and lower humidity = superior comfort in DFW" },
  { id: "small", label: "🏡 Smaller DFW home (under 1,500 sq ft)", rec: "single", reason: "Smaller homes may not see enough savings to justify dual-stage premium" },
];

export default function DFWHVACDualStageGuide2026() {
  const [scenario, setScenario] = useState("");

  const rec = scenarios.find(s => s.id === scenario);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚙️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Dual-Stage vs Single-Stage Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>DFW has many shoulder-season days (70-85°F) where dual-stage HVAC pays dividends</p>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 12 }}>🌡️ What describes your DFW situation?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setScenario(s.id)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid", borderColor: scenario === s.id ? "#F5E642" : "#334155", background: scenario === s.id ? "#F5E64220" : "transparent", color: scenario === s.id ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 14, textAlign: "left" }}>
                {s.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 14, padding: 14, background: "#0A1628", borderRadius: 8, borderLeft: `4px solid ${rec.rec === "dual" ? "#F5E642" : "#4ADE80"}` }}>
              <div style={{ fontWeight: 700, color: rec.rec === "dual" ? "#F5E642" : "#4ADE80", marginBottom: 4 }}>
                {rec.rec === "dual" ? "⚙️ Dual-Stage Recommended" : "✅ Single-Stage May Suffice"}
              </div>
              <div style={{ color: "#94A3B8", fontSize: 14 }}>{rec.reason}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 14 }}>📊 Head-to-Head Comparison</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
            {["Feature", "Single-Stage", "Dual-Stage"].map(h => (
              <div key={h} style={{ background: "#0A1628", padding: "8px 10px", fontSize: 12, fontWeight: 700, color: "#F5E642" }}>{h}</div>
            ))}
            {comparison.map(c => (
              <>
                <div key={c.feature + "f"} style={{ background: "#0D1E35", padding: "8px 10px", fontSize: 13, color: "#94A3B8" }}>{c.feature}</div>
                <div key={c.feature + "s"} style={{ background: "#0D1E35", padding: "8px 10px", fontSize: 12, color: "#E8EAF0" }}>{c.single}</div>
                <div key={c.feature + "d"} style={{ background: "#0D1E35", padding: "8px 10px", fontSize: 12, color: "#4ADE80" }}>{c.dual}</div>
              </>
            ))}
          </div>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 18, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk HVAC Charter Pros</p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Charter HVAC pros will right-size your system and recommend single vs dual-stage based on your DFW home — no overselling.</p>
        </div>
      </div>
    </div>
  );
}