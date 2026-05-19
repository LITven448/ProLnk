import { useState } from 'react';

const homeSizes = ["Under 1,500 sq ft", "1,500–2,500 sq ft", "2,500–3,500 sq ft", "Over 3,500 sq ft"];
const humidityLevels = ["Very Concerned (muggy summers)", "Somewhat Concerned", "Not a Priority"];

export default function DFWVariableSpeedHVACGuide2026() {
  const [size, setSize] = useState("");
  const [humidity, setHumidity] = useState("");
  const [result, setResult] = useState("");

  const evaluate = () => {
    if (!size || !humidity) { setResult("Please select both options."); return; }
    const highConcern = humidity === "Very Concerned (muggy summers)";
    const largeHome = size === "2,500–3,500 sq ft" || size === "Over 3,500 sq ft";
    if (highConcern || largeHome) {
      setResult("✅ Variable speed is strongly recommended for your situation. DFW humidity (often 60–80% RH in summer) is best controlled by longer, lower-capacity run cycles. Expect to recoup the $1,000–$2,000 premium in 4–6 years via energy savings and comfort. Brands: Trane XV, Carrier Infinity, Lennox XC21.");
    } else {
      setResult("⚠️ A single-stage or two-stage unit may serve your smaller home adequately. Variable speed still improves comfort and efficiency, but ROI timeline extends to 7–10 years. Consider two-stage as a middle ground (~$500 premium, meaningful humidity improvement).");
    }
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌀</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW Variable Speed HVAC Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Why variable speed beats single-stage in DFW humidity — and when the premium pays off</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>⚡ Variable Speed vs Single Stage</h2>
          {[
            ["🌡️", "Temperature consistency", "Variable speed adjusts output 40–100% vs single-stage on/off cycling"],
            ["💧", "Dehumidification", "Longer run times at lower capacity remove far more moisture — critical in DFW"],
            ["🔇", "Quieter operation", "Low-speed running is nearly silent; single-stage is loud on startup"],
            ["⚡", "Energy efficiency", "SEER 18–21 typical vs SEER 14–16 single-stage; 20–35% lower bills"],
            ["💰", "Cost premium", "$1,000–$2,000 more installed; ROI in 4–7 years in DFW climate"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>📊 Variable Speed ROI Calculator</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>DFW Home Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155″, color: "#fff", fontSize: 14 }}>
              <option value="">Select home size...</option>
              {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Humidity Concern Level</label>
            <select value={humidity} onChange={e => setHumidity(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155″, color: "#fff", fontSize: 14 }}>
              <option value="">Select concern level...</option>
              {humidityLevels.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>Calculate Variable Speed ROI</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0″, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569″, fontSize: 13 }}>ProLnk · DFW HVAC Expertise · 2026</div>
      </div>
    </div>
  );
}
