import { useState } from 'react';

const dfwLocations = ["Dallas (Inner Loop)", "Fort Worth", "Plano/Frisco/McKinney", "Arlington/Mansfield", "Weatherford/Granbury (West DFW)"];
const coldTolerances = ["Low — I want heat down to 0F", "Medium — down to 25F is fine", "High — backup strips OK below 35F"];

export default function DFWHeatPumpColdWeather2026() {
  const [location, setLocation] = useState("");
  const [tolerance, setColdTolerance] = useState("");
  const [result, setResult] = useState("");

  const evaluate = () => {
    if (!location || !tolerance) { setResult("Please select both options."); return; }
    const westDFW = location === "Weatherford/Granbury (West DFW)";
    const wantsColdClimate = tolerance === "Low — I want heat down to 0F";
    if (wantsColdClimate) {
      setResult("Cold Climate Heat Pump recommended. Bosch IDS Ultra, Mitsubishi Hyper-Heat, or Daikin FIT work to -13F. DFW hits below 35F only 10-15 days/year, but cold-climate units run efficiently all season. Cost premium: $800-$1,500 over standard. Best long-term choice for full electric homes.");
    } else if (westDFW) {
      setResult("West DFW sees more freezing events. Consider dual-fuel: heat pump runs 90% of the time (efficient), gas furnace takes over below 35F. Best of both worlds — lower gas usage than gas-only, better cold-weather reliability than heat pump-only. Budget: $6,500-$10,000 installed.");
    } else {
      setResult("Standard heat pump with backup heat strips works well for your situation. DFW rarely dips below 20F; backup strips activate when needed. Most heat pumps include strips standard. Budget $5,000-$8,500. Choose SEER2 17 or higher for best efficiency. Lennox XP21, Carrier 25VNA, or Trane XV20i are strong options.");
    }
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW Heat Pump Cold Weather Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Standard vs cold-climate vs dual-fuel heat pumps — what actually works in DFW winters</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🌡️ Heat Pump Cold-Weather Facts for DFW</h2>
          {[
            ["❄️", "DFW below 35F: 10-15 days/yr", "Standard heat pumps lose efficiency but still work; backup strips engage automatically"],
            ["🏔️", "Cold-climate heat pumps", "Bosch, Mitsubishi, Daikin models rated to -13F; no efficiency cliff in DFW winters"],
            ["🔥", "Backup heat strips", "Electric resistance coils activate when ambient is too cold; effective but expensive per BTU"],
            ["⛽", "Dual fuel systems", "Heat pump + gas furnace; furnace takes over below 35F for cheaper heat than strips"],
            ["💰", "Cost comparison", "Standard HP: $5,000-$8,500 | Cold-climate HP: +$800-$1,500 | Dual fuel: $6,500-$10,000"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642", fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🔍 DFW Heat Pump Selector</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155", color: "#fff", fontSize: 14 }}>
              <option value="">Select location...</option>
              {dfwLocations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Cold Weather Tolerance</label>
            <select value={tolerance} onChange={e => setColdTolerance(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155", color: "#fff", fontSize: 14 }}>
              <option value="">Select tolerance...</option>
              {coldTolerances.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>Get Heat Pump Recommendation</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569", fontSize: 13 }}>ProLnk · DFW Heat Pump Expertise · 2026</div>
      </div>
    </div>
  );
}
