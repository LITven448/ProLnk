import { useState } from 'react';

export default function DFWAugustElectricBillGuide2026() {
  const [homeSize, setHomeSize] = useState(2000);
  const [billAmount, setBillAmount] = useState(400);

  const diagnose = () => {
    const perSqFt = billAmount / homeSize;
    if (perSqFt > 0.22) return { issue: "Critical Inefficiency", color: "#FF4444″, tips: ["HVAC likely 15+ years old — replace immediately", "Duct leakage may be 30%+ — schedule duct blaster test", "Check attic insulation — DFW needs R-38 minimum", "Set thermostat to 78°F not 72°F (saves ~$40/mo)"] };
    if (perSqFt > 0.16) return { issue: "Moderate Inefficiency", color: "#FF8C00″, tips: ["HVAC tune-up needed — dirty coils add 15% to bill", "Check weatherstripping on doors and windows", "Add radiant barrier to attic (saves 10-15%)", "Smart thermostat can cut $25-50/mo"] };
    return { issue: "Good Efficiency", color: "#00CC66″, tips: ["Your home is performing well for DFW", "Consider solar — DFW gets 220+ sunny days/year", "Check TOU rates with Oncor — off-peak can save more", "Annual HVAC tune-up keeps efficiency high"] };
  };

  const result = diagnose();

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚡</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW August Electric Bill Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: "1.1rem" }}>Why your DFW August bill spikes — and what to do about it</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {[["$350–$500+", "Avg DFW August Bill"], ["18+ hrs/day", "HVAC Runtime in August"], ["40–60%", "Bill Driven by HVAC"]].map(([val, label]) => (
            <div key={label} style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", textAlign: "center", border: "1px solid #2A3F5F" }}>
              <div style={{ color: "#F5E642″, fontSize: "1.6rem", fontWeight: 700 }}>{val}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.85rem", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🔍 What Drives Your August Bill</h2>
          {[["🌡️ Compressor Efficiency", "SEER rating drops with age — a 15yr unit uses 50% more electricity than a new 18-SEER unit."],
            ["🏠 Duct Leakage", "Avg DFW home leaks 20-30% of conditioned air into attic — you pay to cool your attic."],
            ["📊 Thermostat Setpoint", "Every degree below 78°F adds ~3% to your bill. 72°F vs 78°F = ~18% more."],
            ["🔆 Attic Heat Load", "DFW attics hit 150°F in August. Inadequate insulation lets that heat pour into living space."]
          ].map(([title, desc]) => (
            <div key={title} style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#0A1628″, borderRadius: 8 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "#94A3B8″, fontSize: "0.9rem" }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#1E2D45″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #2A3F5F" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>🧮 Diagnose Your Bill</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>Home Size (sq ft)</label>
              <input type="number" value={homeSize} onChange={e => setHomeSize(Number(e.target.value))}
                style={{ width: "100%", backgroundColor: "#0A1628″, border: "1px solid #2A3F5F", borderRadius: 8, padding: "0.75rem", color: "#E8EDF5", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ color: "#94A3B8″, fontSize: "0.85rem", display: "block", marginBottom: 6 }}>August Bill Amount ($)</label>
              <input type="number" value={billAmount} onChange={e => setBillAmount(Number(e.target.value))}
                style={{ width: "100%", backgroundColor: "#0A1628″, border: "1px solid #2A3F5F", borderRadius: 8, padding: "0.75rem", color: "#E8EDF5", fontSize: "1rem", boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "1.5rem", borderLeft: `4px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Diagnosis: {result.issue}</div>
            <div style={{ color: "#94A3B8″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>${(billAmount / homeSize).toFixed(3)}/sq ft — DFW target: $0.12–0.16/sq ft</div>
            {result.tips.map(t => <div key={t} style={{ color: "#E8EDF5″, fontSize: "0.9rem", marginBottom: 4 }}>• {t}</div>)}
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "1.5rem", backgroundColor: "#1E2D45″, borderRadius: 12, border: "1px solid #F5E642" }}>
          <div style={{ fontSize: "1.5rem" }}>🔧</div>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4 }}>Get a Free HVAC Efficiency Quote</div>
          <div style={{ color: "#94A3B8″, fontSize: "0.9rem" }}>ProLnk connects you with DFW-certified HVAC pros — free quotes, verified reviews</div>
        </div>
      </div>
    </div>
  );
}