import { useState } from 'react';

const poolSizes = ["Small (<15k gal)", "Medium (15-25k gal)", "Large (25-40k gal)", "XL (40k+ gal)"];
const currentPumps = ["Single Speed (1HP)", "Single Speed (1.5HP)", "Single Speed (2HP)", "Dual Speed (2HP)"];

const roiData: Record<string, Record<string, { savings: number; payback: number; rec: string }>> = {
  "Small (<15k gal)": {
    "Single Speed (1HP)":    { savings: 480, payback: 2.1, rec: "Pentair SuperFlo VS 1.5HP" },
    "Single Speed (1.5HP)":  { savings: 520, payback: 2.5, rec: "Hayward TriStar VS 1.85HP" },
    "Single Speed (2HP)":    { savings: 640, payback: 2.3, rec: "Pentair IntelliFlo3 VSF" },
    "Dual Speed (2HP)":      { savings: 380, payback: 3.1, rec: "CircuPool Edge VS 2.0HP" },
  },
  "Medium (15-25k gal)": {
    "Single Speed (1HP)":    { savings: 560, payback: 2.4, rec: "Hayward TriStar VS 2.0HP" },
    "Single Speed (1.5HP)":  { savings: 620, payback: 2.6, rec: "Pentair IntelliFlo3 VSF" },
    "Single Speed (2HP)":    { savings: 740, payback: 2.2, rec: "Pentair IntelliFlo3 VSF 3HP" },
    "Dual Speed (2HP)":      { savings: 430, payback: 2.9, rec: "Hayward MaxFlo VS" },
  },
  "Large (25-40k gal)": {
    "Single Speed (1HP)":    { savings: 680, payback: 2.7, rec: "Pentair IntelliFlo3 VSF 3HP" },
    "Single Speed (1.5HP)":  { savings: 740, payback: 2.5, rec: "Pentair IntelliFlo3 VSF 3HP" },
    "Single Speed (2HP)":    { savings: 860, payback: 2.1, rec: "Hayward TriStar VS 3HP" },
    "Dual Speed (2HP)":      { savings: 510, payback: 2.8, rec: "Hayward MaxFlo VS 2HP" },
  },
  "XL (40k+ gal)": {
    "Single Speed (1HP)":    { savings: 820, payback: 3.1, rec: "Dual Pentair IntelliFlo3 VSF" },
    "Single Speed (1.5HP)":  { savings: 880, payback: 2.9, rec: "Dual Pentair IntelliFlo3 VSF" },
    "Single Speed (2HP)":    { savings: 960, payback: 2.6, rec: "Dual IntelliFlo3 VSF 3HP each" },
    "Dual Speed (2HP)":      { savings: 640, payback: 3.0, rec: "Pentair IntelliFlo3 VSF 3HP" },
  },
};

export default function DFWPoolVariableSpeed2026() {
  const [poolSize, setPoolSize] = useState("");
  const [pump, setPump] = useState("");

  const result = poolSize && pump ? roiData[poolSize]?.[pump] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Variable Speed Pool Pump Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Optimize for ERCOT off-peak rates — save $400-960/yr in DFW at $0.13/kWh</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[["💰","ERCOT Off-Peak","Run 9PM–6AM for lowest rates"],["⚡","Energy Star","All VS pumps qualify for rebates"],["🌡️","DFW Climate","Pool runs 8+ months — big savings"]].map(([icon,title,desc])=>(
            <div key={title} style={{ background: "#0f2035", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{title}</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>📊 Calculate Your VS Pump ROI</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Pool Size</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {poolSizes.map(s => (
                <button key={s} onClick={() => setPoolSize(s)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: `2px solid ${poolSize===s?"#F5E642":"#1e3a5f"}`, background: poolSize===s?"#F5E642":"#1e3a5f", color: poolSize===s?"#0A1628":"#fff", cursor: "pointer", fontSize: 13, fontWeight: poolSize===s?700:400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Current Pump</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {currentPumps.map(p => (
                <button key={p} onClick={() => setPump(p)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: `2px solid ${pump===p?"#F5E642":"#1e3a5f"}`, background: pump===p?"#F5E642":"#1e3a5f", color: pump===p?"#0A1628":"#fff", cursor: "pointer", fontSize: 13, fontWeight: pump===p?700:400 }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20, marginTop: 16 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 18, marginBottom: 12 }}>✅ Recommended: {result.rec}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div style={{ background: "#0f2035", borderRadius: 8, padding: 14, textAlign: "center" }}>
                  <div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>${result.savings}</div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>Annual Savings</div>
                </div>
                <div style={{ background: "#0f2035", borderRadius: 8, padding: 14, textAlign: "center" }}>
                  <div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>{result.payback} yrs</div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>Payback Period</div>
                </div>
                <div style={{ background: "#0f2035", borderRadius: 8, padding: 14, textAlign: "center" }}>
                  <div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>85%</div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>Energy Reduction</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>Ready to upgrade your DFW pool pump?</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>ProLnk matches you with certified VS pump installers in DFW</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get DFW VS Pump Quotes ⚡</button>
        </div>
      </div>
    </div>
  );
}