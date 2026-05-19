import { useState } from 'react';

const wildcardIssues = [
  {
    id: 1,
    icon: "❄️",
    title: "Refrigerant Overcharge",
    symptom: "System runs but efficiency is way down",
    cause: "Too much refrigerant in the system — opposite of what most people expect",
    risk: "Compressor damage within 1–3 seasons if left unresolved",
    steps: ["Check suction pressure with manifold gauges", "Compare to manufacturer spec", "Recover excess refrigerant to correct charge", "Retest efficiency after correction"],
    proTip: "Overcharge is as damaging as undercharge. DFW techs rushed during peak season sometimes overfill."
  },
  {
    id: 2,
    icon: "💧",
    title: "Standing Water in Supply Registers",
    symptom: "Puddles or condensation inside ceiling vents",
    cause: "Oversized system cools air faster than ducts can handle, hitting dew point inside supply lines",
    risk: "Mold growth in duct system within weeks in DFW humidity",
    steps: ["Verify system sizing matches Manual J calculation", "Inspect ducts for insulation gaps", "Check static pressure across system", "Consider zoning or variable-speed unit"],
    proTip: "Bigger is NOT better in DFW. Oversized units short-cycle and leave ducts dripping."
  },
  {
    id: 3,
    icon: "🔥",
    title: "Burning Plastic Smell on First Heat",
    symptom: "Plastic or dust odor for first 2–5 minutes of heat mode",
    cause: "Dust burning off heating elements — normal after months of no heat use",
    risk: "Usually harmless, but persistent smell = real problem (wire insulation, capacitor)",
    steps: ["Run heat for 10 minutes with windows open", "If smell clears = normal", "If smell persists = shut down and call pro", "Inspect heat strips and capacitors"],
    proTip: "DFW heaters sit idle 8+ months. First-run smell is expected. Persistent smell is not."
  },
  {
    id: 4,
    icon: "🐦",
    title: "Bird Nest in Outdoor Unit",
    symptom: "Loud rattling or vibration from condenser, reduced airflow",
    cause: "Spring birds nest inside condenser fan housing — common in DFW oak neighborhoods",
    risk: "Fan blade damage, motor failure, fire risk from debris on coils",
    steps: ["Power off unit at disconnect", "Remove top panel carefully", "Clear nest and debris with gloves", "Inspect fan blades for damage before restart"],
    proTip: "Install mesh screen guards over fan housing after clearing. Prevents re-nesting."
  }
];

export default function DFWHVACWildcard2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = wildcardIssues.find(i => i.id === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW HVAC Wildcard Issues 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Unusual problems DFW homeowners actually encounter — and what they mean</p>
        </div>
        <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {wildcardIssues.map(issue => (
            <button key={issue.id} onClick={() => setSelected(selected === issue.id ? null : issue.id)}
              style={{ background: selected === issue.id ? "#1a2744″ : "#0f1f3d", border: `2px solid ${selected === issue.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 20, textAlign: "left", cursor: "pointer", color: "#fff", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{issue.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: selected === issue.id ? "#F5E642″ : "#fff" }}>{issue.title}</div>
                  <div style={{ color: "#94a3b8″, fontSize: 13, marginTop: 2 }}>{issue.symptom}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F5E642″, fontSize: 20 }}>{selected === issue.id ? "▲" : "▼"}</span>
              </div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1a2744″, border: "2px solid #F5E642", borderRadius: 16, padding: 28 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>{active.icon} {active.title} — Wildcard Diagnosis</h2>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#94a3b8″, fontSize: 13 }}>ROOT CAUSE</span><p style={{ marginTop: 4 }}>{active.cause}</p></div>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#f87171″, fontSize: 13 }}>⚠️ RISK</span><p style={{ marginTop: 4 }}>{active.risk}</p></div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: "#94a3b8″, fontSize: 13 }}>DIAGNOSIS STEPS</span>
              <ol style={{ marginTop: 8, paddingLeft: 20 }}>{active.steps.map((s, i) => <li key={i} style={{ marginBottom: 6, color: "#cbd5e1″ }}>{s}</li>)}</ol>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16 }}><span style={{ color: "#F5E642", fontSize: 13 }}>💡 PRO TIP</span><p style={{ marginTop: 4, color: "#94a3b8", fontStyle: "italic" }}>{active.proTip}</p></div>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 800, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>Get a DFW HVAC Pro — prolnk.io</a>
            </div>
          </div>
        )}
        {!active && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24 }}>Select an issue above to see the wildcard diagnosis guide</div>}
        <div style={{ textAlign: "center", marginTop: 40, color: "#475569″, fontSize: 13 }}>ProLnk.io · DFW HVAC Wildcard Guide 2026 · Vetted Local Pros</div>
      </div>
    </div>
  );
}