import { useState } from 'react';

export default function DFWHomeEnergyStorageGuide2026() {
  const [goal, setGoal] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const goals: Record<string, string> = {
    "Keep lights and fridge on during outage": "🔋 SMALL SYSTEM (5–10 kWh): Enphase IQ Battery 5P ($7,000) or one Powerwall 3 module covers lights, fridge, phone charging, and fans for 8–12 hours. Ideal for the 4–8 hour ERCOT outages common in DFW ice storms.",
    "Whole home backup for 24 hours": "🔋 MEDIUM SYSTEM (20–30 kWh): Two Powerwall 3 units ($22K) or 3–4 Enphase IQ 5P batteries. Covers central AC (2-ton), appliances, lights. Requires 200A panel with backup gateway.",
    "Multi-day backup without grid": "🔋 LARGE SYSTEM (40+ kWh): Franklin Electric aPower or Fortress eVault + solar recharge. Budget $35K–60K installed. Essential for DFW medical equipment users or remote properties.",
    "Reduce peak demand charges": "⚡ TIME-OF-USE ARBITRAGE: Charge during off-peak (11pm–6am) at $0.06/kWh, discharge during peak (3–7pm ERCOT summer) at $0.18–0.35/kWh. Powerwall + Tesla Energy Plan or Swell Energy can automate this for DFW TDU service areas.",
    "Solar + storage self-sufficiency": "☀️ SOLAR-FIRST SYSTEM: DC-coupled storage (Enphase, SolarEdge) maximizes solar self-consumption. Size battery to absorb excess afternoon solar and cover evening loads. In DFW, 10kW solar + 20kWh storage covers ~80% of annual load.",
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔋</span>
          <span style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 12 }}>DFW ENERGY GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Home Energy Storage Guide 2026</h1>
        <p style={{ color: "#94A3B8″, fontSize: 15, marginBottom: 28 }}>Battery storage options beyond Powerwall — LFP chemistry, sizing, and DFW-specific considerations</p>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>🌡️ Why LFP Chemistry Matters in DFW</h2>
          <p style={{ color: "#CBD5E1″, fontSize: 14, lineHeight: 1.7 }}>DFW summers routinely hit 105°F+ with garage and attic temperatures exceeding 130°F. <strong style={{ color: "#F5E642" }}>Lithium Iron Phosphate (LFP)</strong> batteries are thermally stable to 518°F before thermal runaway — versus <strong style={{ color: "#F87171" }}>NMC (Nickel Manganese Cobalt)</strong> which can thermal runaway at 329°F. For DFW installations, LFP is strongly preferred for safety and longevity in hot conditions.</p>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>📊 Top Storage Systems for DFW 2026</h2>
          {[["Tesla Powerwall 3″,"$11,000","LFP","11.5 kWh / 11.5 kW","All-in-one solar+storage inverter"],["Enphase IQ Battery 5P","$7,000/unit","LFP","5 kWh / 3.84 kW","Modular, AC-coupled, microinverter ecosystem"],["Franklin Electric aPower","$9,500","LFP","13.6 kWh / 10 kW","Whole-home backup focus, 10-year warranty"],["Generac PWRcell","$8,500","NMC","9–18 kWh flexible","Modular cabinet, pairs with Generac generators"]].map(([name, price, chem, cap, note]) => (
              <div key={name} style={{ background: "#1E2F4F", borderRadius: 8, padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14 }}>{name}</div>
                    <div style={{ color: "#94A3B8″, fontSize: 12, marginTop: 2 }}>{note}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#E8EAF0″, fontWeight: 800, fontSize: 16 }}>{price}</div>
                    <div style={{ color: chem === "LFP" ? "#4ADE80″ : "#F87171", fontSize: 12, fontWeight: 700 }}>{chem}</div>
                  </div>
                </div>
                <div style={{ color: "#CBD5E1″, fontSize: 13, marginTop: 6 }}>{cap}</div>
              </div>
            ))}
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>🔄 AC-Coupled vs DC-Coupled</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>AC-Coupled</div>
              <ul style={{ color: "#CBD5E1″, fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Works with any existing solar</li>
                <li>Enphase IQ Battery model</li>
                <li>Slightly less efficient (90%)</li>
                <li>Easier retrofit install</li>
              </ul>
            </div>
            <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>DC-Coupled</div>
              <ul style={{ color: "#CBD5E1″, fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
                <li>Requires matching solar inverter</li>
                <li>Powerwall 3, SolarEdge</li>
                <li>Higher efficiency (96%+)</li>
                <li>Best for new installations</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: "#111D35″, borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>🎯 Backup Goal → Storage Sizing Guide</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ background: "#1E2F4F", color: "#E8EAF0″, border: "1px solid #2D4A7A", borderRadius: 8, padding: "10px 14px", fontSize: 14, flex: 1, minWidth: 200 }}>
              <option value="">Select your backup goal...</option>
              {Object.keys(goals).map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <button onClick={() => goal && setResult(goals[goal])} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Size It</button>
          </div>
          {result && <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14, color: "#E8EAF0″, fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}