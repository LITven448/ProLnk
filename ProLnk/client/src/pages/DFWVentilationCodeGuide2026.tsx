import { useState } from 'react';

export default function DFWVentilationCodeGuide2026() {
  const [atticSqft, setAtticSqft] = useState<string>("");
  const [currentVents, setCurrentVents] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const sqft = parseFloat(atticSqft);
    const vents = parseFloat(currentVents);
    if (isNaN(sqft) || isNaN(vents) || sqft <= 0) { setResult("Please enter valid values."); return; }
    const required = sqft / 150;
    const diff = vents - required;
    if (diff >= 0) setResult(`✅ COMPLIANT — You have ${vents} sqft of ventilation. DFW code requires ${required.toFixed(1)} sqft. You have ${diff.toFixed(1)} sqft surplus.`);
    else setResult(`⚠️ DEFICIENT — You need ${required.toFixed(1)} sqft but only have ${vents} sqft. Add ${Math.abs(diff).toFixed(1)} sqft of ventilation to meet DFW code. ProLnk can connect you with a roofer today.`);
  };

  const ventTypes = [
    { icon: "🏠", name: "Soffit Vents (Intake)", note: "Best DFW intake — install along entire eave for balanced airflow" },
    { icon: "🔝", name: "Ridge Vents (Exhaust)", note: "Top DFW exhaust choice — runs full ridge length, low profile" },
    { icon: "🌀", name: "Box/Turtle Vents", note: "Common in DFW older homes — less efficient, use as supplement only" },
    { icon: "⚡", name: "Powered Attic Ventilators", note: "Controversial in DFW — can depressurize attic and pull conditioned air; use only with sealed attic" },
    { icon: "🔲", name: "Gable Vents", note: "Cross-ventilation only — not counted toward 1:150 DFW code in all jurisdictions" },
  ];

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌬️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Attic Ventilation Code Guide 2026</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>1:150 ventilation ratio requirements — check your DFW home's compliance</p>
        </div>

        <div style={{ backgroundColor: "#122040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🧮 DFW Ventilation Compliance Calculator</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: "#aaa", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>Attic Square Footage</label>
              <input value={atticSqft} onChange={e => setAtticSqft(e.target.value)} placeholder="e.g. 1500" style={{ width: "100%", padding: "0.65rem", borderRadius: 8, border: "1px solid #334", backgroundColor: "#0d2040", color: "#fff", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: "#aaa", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>Current Vent Area (sqft)</label>
              <input value={currentVents} onChange={e => setCurrentVents(e.target.value)} placeholder="e.g. 8" style={{ width: "100%", padding: "0.65rem", borderRadius: 8, border: "1px solid #334", backgroundColor: "#0d2040", color: "#fff", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={calculate} style={{ padding: "0.75rem 2rem", borderRadius: 8, border: "none", backgroundColor: "#F5E642", color: "#0A1628", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Check Compliance</button>
          {result && <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: 8, backgroundColor: result.includes("✅") ? "#0d2a1a" : "#2a1010", borderLeft: `4px solid ${result.includes("✅") ? "#4aff8c" : "#ff4a4a"}`, color: result.includes("✅") ? "#4aff8c" : "#ffaaaa", fontSize: "0.95rem" }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: "#122040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🏠 DFW Vent Type Breakdown</h2>
          {ventTypes.map((v, i) => (
            <div key={i} style={{ padding: "0.85rem 0", borderBottom: i < ventTypes.length - 1 ? "1px solid #1e3a5f" : "none" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{v.icon} {v.name}</div>
              <div style={{ color: "#aaa", fontSize: "0.88rem" }}>{v.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#122040", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>📌 DFW Code Rule</p>
          <p style={{ color: "#ccc", margin: 0, fontSize: "0.95rem" }}>Minimum 1 sqft of net free vent area per 150 sqft of attic floor area. At least 50% must be exhaust (high) and 50% intake (low). Soffit + ridge is the gold standard combination for DFW climate.</p>
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628", fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>🌬️ Fix Your DFW Attic Ventilation — Connect with ProLnk Roofing Pros</p>
        </div>
      </div>
    </div>
  );
}
