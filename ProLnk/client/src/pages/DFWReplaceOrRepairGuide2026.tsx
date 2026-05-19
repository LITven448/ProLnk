import { useState } from 'react';

const systems = [
  { name: "HVAC", icon: "❄️", replaceCost: 7000 },
  { name: "Water Heater (Tank)", icon: "🚿", replaceCost: 1200 },
  { name: "Water Heater (Tankless)", icon: "💧", replaceCost: 3500 },
  { name: "Roof", icon: "🏠", replaceCost: 18000 },
  { name: "Foundation Repair", icon: "🪨", replaceCost: 12000 },
  { name: "Windows (Full Home)", icon: "🪟", replaceCost: 15000 },
  { name: "Plumbing (Repipe)", icon: "🔧", replaceCost: 8000 },
];

const lifespan: Record<string, number> = {
  "HVAC": 17, "Water Heater (Tank)": 10, "Water Heater (Tankless)": 18,
  "Roof": 25, "Foundation Repair": 20, "Windows (Full Home)": 22, "Plumbing (Repipe)": 40,
};

export default function DFWReplaceOrRepairGuide2026() {
  const [selected, setSelected] = useState("HVAC");
  const [age, setAge] = useState(10);
  const [repairCost, setRepairCost] = useState(1500);

  const sys = systems.find(s => s.name === selected)!;
  const maxLife = lifespan[selected];
  const pctLife = age / maxLife;
  const pctRepair = repairCost / sys.replaceCost;
  const isR22 = selected === "HVAC" && age >= 10;

  const getVerdict = () => {
    if (isR22) return { v: "REPLACE", reason: "R-22 refrigerant is banned — parts scarce and expensive", color: "#ef4444" };
    if (pctRepair >= 0.5) return { v: "REPLACE", reason: "Repair exceeds 50% of replacement cost (50% Rule)", color: "#ef4444" };
    if (pctLife >= 0.85) return { v: "REPLACE", reason: "System is past 85% of expected lifespan", color: "#ef4444" };
    if (pctRepair >= 0.3 || pctLife >= 0.65) return { v: "CONSIDER REPLACING", reason: "Marginal — weigh efficiency gains of new system", color: "#f97316" };
    return { v: "REPAIR", reason: "Repair cost and age both favor fixing over replacing", color: "#22c55e" };
  };

  const verdict = getVerdict();

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔨</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Repair vs. Replace Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Make the right call on every major home system</p>
        </div>

        <div style={{ background: "#111d35", borderRadius: 12, padding: 24, marginBottom: 20, border: "1px solid #1e3a5f" }}>
          <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>🏠 Select System</label>
          <select value={selected} onChange={e => setSelected(e.target.value)}
            style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px 12px", fontSize: 15 }}>
            {systems.map(s => <option key={s.name} value={s.name}>{s.icon} {s.name}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>📅 System Age: {age} yrs</label>
            <input type="range" min={1} max={40} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Expected life: {maxLife} yrs | {Math.round(pctLife * 100)}% of life used</div>
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>💰 Repair Quote: ${repairCost.toLocaleString()}</label>
            <input type="range" min={100} max={sys.replaceCost} value={repairCost} onChange={e => setRepairCost(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>Replacement: ${sys.replaceCost.toLocaleString()} | Repair = {Math.round(pctRepair * 100)}%</div>
          </div>
        </div>

        <div style={{ background: verdict.color + "15", border: `2px solid ${verdict.color}`, borderRadius: 14, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: verdict.color, letterSpacing: 2, marginBottom: 10 }}>{verdict.v}</div>
          <div style={{ color: "#e2e8f0", fontSize: 15 }}>{verdict.reason}</div>
        </div>

        <div style={{ marginTop: 24, background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>📐 The DFW Decision Rules</div>
          <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: "#fff" }}>50% Rule:</strong> If repair &gt; 50% of replacement, replace</li>
            <li><strong style={{ color: "#fff" }}>Age Factor:</strong> Systems past 75% of lifespan — factor in future repairs</li>
            <li><strong style={{ color: "#fff" }}>R-22 Trigger:</strong> Any HVAC using R-22 refrigerant should be replaced</li>
            <li><strong style={{ color: "#fff" }}>Efficiency Gain:</strong> New systems can cut energy bills 20–40% in DFW</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
