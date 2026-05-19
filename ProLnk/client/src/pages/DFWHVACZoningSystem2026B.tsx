import { useState } from 'react';

const zoningGoals = ["Eliminate hot/cold rooms", "Reduce energy waste in unused zones", "Upgrade existing zoned system", "Add zoning to non-zoned home"];
const homeSizes = ["Under 2,000 sq ft", "2,000-3,500 sq ft", "Over 3,500 sq ft / Multi-story"];

export default function DFWHVACZoningSystem2026B() {
  const [goal, setGoal] = useState("");
  const [size, setSize] = useState("");
  const [result, setResult] = useState("");

  const evaluate = () => {
    if (!goal || !size) { setResult("Please select both options."); return; }
    const largeHome = size === "Over 3,500 sq ft / Multi-story";
    const upgrade = goal === "Upgrade existing zoned system";
    if (largeHome || upgrade) {
      setResult("Modulating dampers recommended. Unlike bypass dampers (which dump excess air back to return, causing static pressure spikes), modulating dampers precisely control airflow by zone. Pair with a Honeywell TrueZONE or Ecobee for multi-zone control. Budget $3,000-$6,000 for a full modulating system on a large DFW home. Add a static pressure monitor to protect your equipment.");
    } else {
      setResult("A 2-zone bypass damper system may be adequate for your smaller home. Key: size the bypass correctly (typically 30-50% of total airflow) or you will over-pressurize ducts and cause premature equipment failure. Get a Manual D duct calculation done before install. Budget $1,500-$2,500.");
    }
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HVAC Zoning System Part 2 — 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Advanced zoning: bypass vs modulating dampers, thermostat compatibility, and static pressure risks</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>⚙️ Advanced DFW Zoning Concepts</h2>
          {[
            ["🔄", "Bypass damper", "Routes excess air to return — simple but raises static pressure; can damage equipment if oversized"],
            ["🎛️", "Modulating damper", "Adjusts % open precisely; better pressure control; required for large or complex homes"],
            ["🌡️", "Compatible thermostats", "Honeywell TrueZONE, Ecobee SmartThermostat, Nest — all support multi-zone panels"],
            ["📊", "Static pressure monitor", "Monitors duct pressure in real time; alerts when zones create dangerous restriction"],
            ["⚠️", "Improper zoning risks", "Oversized bypass causes noisy equipment strain; poor zone sizing causes uneven temps"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>🎯 DFW Zoning Approach Guide</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Your Zoning Goal</label>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155″, color: "#fff", fontSize: 14 }}>
              <option value="">Select goal...</option>
              {zoningGoals.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 6 }}>Home Size</label>
            <select value={size} onChange={e => setSize(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155″, color: "#fff", fontSize: 14 }}>
              <option value="">Select size...</option>
              {homeSizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>Get Zoning System Recommendation</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0″, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569″, fontSize: 13 }}>ProLnk · DFW Advanced HVAC Zoning · 2026</div>
      </div>
    </div>
  );
}
