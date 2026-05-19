import { useState } from 'react';

const symptoms = [
  { symptom: "Home feels muggy even with AC running", cause: "Humidity too high — DFW #1 complaint", detail: "DFW outdoor humidity averages 65–75%. Oversized AC units cool too fast, short-cycle before dehumidifying. Target indoor RH 40–55%. Fix: right-size system or add dedicated whole-home dehumidifier.", urgency: "high" },
  { symptom: "Upstairs always 5–8°F hotter than downstairs", cause: "Duct imbalance or attic heat gain", detail: "DFW attics hit 140–160°F in summer. Flex duct in hot attic loses 20–30% efficiency. Fix: add supply capacity upstairs, check duct insulation (R-8 minimum in DFW), consider zoning system.", urgency: "high" },
  { symptom: "One room always cold in winter", cause: "Return air insufficient — room pressurized", detail: "Closed doors block return air path, pressurizing rooms and starving supply. Fix: add transfer grille, undercut doors 1 inch, or add dedicated return. Never close supply registers — worsens the problem.", urgency: "medium" },
  { symptom: "Temperature swings 4°F+ throughout day", cause: "Oversized HVAC system short-cycling", detail: "Bigger is not better in DFW. Oversized systems cool rapidly, shut off, and never complete a full dehumidification cycle. Fix: Manual J load calculation required. DFW rule: 400–600 sq ft per ton.", urgency: "medium" },
  { symptom: "Condensation on windows or walls", cause: "Vapor pressure imbalance or duct leaks", detail: "Supply duct leaks in unconditioned attic pressurize home with humid air. Also: infiltration from door/window seals. Fix: duct leakage test (blower door), seal leaks, check attic access hatch.", urgency: "high" },
];

export default function DFWHVACComfortProblems2026() {
  const [selected, setSelected] = useState<number | null>(null);

  const urgencyColor = (u: string) => u === "high" ? "#fca5a5″ : "#fde68a";

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌡️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW HVAC Comfort Problem Diagnosis 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "0.5rem" }}>Why DFW homes never feel comfortable — and what each symptom actually means</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.8rem", marginBottom: "2rem" }}>
          {[
            { icon: "💧", label: "DFW #1 Problem", val: "High humidity" },
            { icon: "☀️", label: "DFW Attic Peak", val: "160°F in July" },
            { icon: "📏", label: "Proper Load Calc", val: "Manual J required" },
            { icon: "🎯", label: "Target Indoor RH", val: "40–55%" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0f2035″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
              <div style={{ fontSize: "1.3rem" }}>{c.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.75rem", marginTop: "0.3rem" }}>{c.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.85rem", marginTop: "0.2rem" }}>{c.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Comfort Symptom → Root Cause Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {symptoms.map((s, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? "#1a3a5c" : "#0f2035″, borderRadius: 10, padding: "1rem 1.2rem", cursor: "pointer", border: `1px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`, transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#e2e8f0″, fontWeight: 600 }}>😓 {s.symptom}</span>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ background: urgencyColor(s.urgency) + "33″, color: urgencyColor(s.urgency), borderRadius: 5, padding: "0.1rem 0.5rem", fontSize: "0.75rem", fontWeight: 700 }}>{s.urgency}</span>
                  <span style={{ color: "#F5E642″ }}>{selected === i ? "▲" : "▼"}</span>
                </div>
              </div>
              {selected === i && (
                <div style={{ marginTop: "0.8rem", borderTop: "1px solid #2a4a6c", paddingTop: "0.8rem" }}>
                  <div style={{ color: urgencyColor(s.urgency), marginBottom: "0.5rem", fontWeight: 600 }}>⚠️ {s.cause}</div>
                  <div style={{ color: "#cbd5e1″, lineHeight: 1.6 }}>{s.detail}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk DFW HVAC Guide 2026 · Comfort Problem Diagnosis · Connect with certified DFW HVAC contractors
        </div>
      </div>
    </div>
  );
}