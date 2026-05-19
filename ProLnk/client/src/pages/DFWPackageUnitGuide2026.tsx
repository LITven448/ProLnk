import { useState } from 'react';

const homeTypes = ["Single Family", "Mobile/Modular", "Townhome", "Older Home (pre-1980)"];
const systemTypes = ["Split System", "Package Unit", "Not Sure", "No Current System"];

export default function DFWPackageUnitGuide2026() {
  const [homeType, setHomeType] = useState("");
  const [currentSystem, setCurrentSystem] = useState("");
  const [result, setResult] = useState("");

  const evaluate = () => {
    if (!homeType || !currentSystem) { setResult("Please select both options."); return; }
    const isGoodFit = homeType === "Mobile/Modular" || homeType === "Older Home (pre-1980)" || currentSystem === "Package Unit";
    if (isGoodFit) {
      setResult("✅ Package units are a strong fit for your situation. DFW HVAC techs are very familiar with these systems. Expect $4,500–$7,500 installed for a quality 3-ton unit. Great when indoor space or ductwork access is limited.");
    } else {
      setResult("⚠️ A split system is likely more efficient for your home. Package units trade efficiency (SEER 14–16) for simplicity. If your existing infrastructure supports a split system, you will save 15–20% on energy long-term.");
    }
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📦</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW Package Unit HVAC Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>All-in-one systems — rooftop or ground-mounted — common in DFW older homes and modular builds</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>📋 What Is a Package Unit?</h2>
          {[
            ["📦", "Single outdoor cabinet", "All components (compressor, coil, heat) in one unit — rooftop or side of home"],
            ["🔧", "One service point", "Easier for techs to access; no crawlspace or attic work needed"],
            ["⚡", "Less efficient", "Typically SEER 14–16 vs split system SEER 16–21"],
            ["🏠", "Space saver", "No indoor air handler needed — great for tight utility closets or modular homes"],
            ["💰", "Cost: $4,500–$7,500", "Installed in DFW; lower than high-end split systems"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642", fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 16 }}>🔍 Package Unit Fit Checker</h2>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Your Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155", color: "#fff", fontSize: 14 }}>
              <option value="">Select home type...</option>
              {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>Current System</label>
            <select value={currentSystem} onChange={e => setCurrentSystem(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: 8, background: "#1e3a5f", border: "1px solid #334155", color: "#fff", fontSize: 14 }}>
              <option value="">Select current system...</option>
              {systemTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={evaluate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>Check Package Unit Fit</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted HVAC professionals · 2026</div>
      </div>
    </div>
  );
}
