import { useState } from 'react';

const LOW_E_TYPES = [
  { name: "Low-E 2-Pane (Standard)", shgc: "0.25″, uFactor: "0.30", best: "North-facing", energyStar: true, costRange: "$300–500/window", dfwFit: "Good baseline for most DFW homes" },
  { name: "Low-E 2-Pane (Solar Control)", shgc: "0.19″, uFactor: "0.28", best: "South/West-facing", energyStar: true, costRange: "$350–600/window", dfwFit: "Best for DFW south and west walls — blocks 70%+ solar heat gain" },
  { name: "Low-E 3-Pane", shgc: "0.16″, uFactor: "0.20", best: "Any orientation", energyStar: true, costRange: "$550–900/window", dfwFit: "Overkill for most DFW — better for northern climates needing heat retention" },
  { name: "Reflective Film Retrofit", shgc: "0.30″, uFactor: "N/A", best: "Any", energyStar: false, costRange: "$8–15/sq ft film", dfwFit: "Retrofit option for existing windows — 50-70% of new window performance" },
];

export default function DFWLowEWindowGuide() {
  const [windowCount, setWindowCount] = useState("");
  const [orientation, setOrientation] = useState("mixed");
  const [windowAge, setWindowAge] = useState("");
  const [result, setResult] = useState<null | { spec: string; annualSavings: number; costLow: number; costHigh: number; payback: number; recommendation: string }>(null);

  function calculate() {
    const count = parseFloat(windowCount);
    const age = parseFloat(windowAge);
    if (!count || !age) return;
    let spec = LOW_E_TYPES[0];
    if (orientation === "south" || orientation === "west") spec = LOW_E_TYPES[1];
    const annualSavings = Math.round(count * (orientation === "south" || orientation === "west" ? 38 : 22));
    const costLow = Math.round(count * parseInt(spec.costRange.replace(/\$|,|\/window/g, "").split("–")[0]));
    const costHigh = Math.round(count * parseInt(spec.costRange.replace(/\$|,|\/window/g, "").split("–")[1]));
    const payback = Math.round((costLow + costHigh) / 2 / annualSavings);
    const recommendation = age > 15 ? "Replacement strongly recommended — seal failure likely causing 30-40% efficiency loss." : "Upgrade for energy gains — current windows may still be structurally sound.";
    setResult({ spec: spec.name, annualSavings, costLow, costHigh, payback, recommendation });
  }

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642″ }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🪟</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "0 0 12px" }}>DFW Low-E Window Coating Guide</h1>
          <p style={{ fontSize: 17, color: "#94A3B8″, margin: 0 }}>In DFW, your windows face 100°F+ summers. Low-E coatings are the most impactful upgrade for cooling cost reduction.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0″ }}>
        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 12 }}>☀️ SHGC: The Number That Matters Most in DFW</h2>
          <p style={{ color: "#94A3B8″, fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>SHGC (Solar Heat Gain Coefficient) measures how much solar heat passes through a window. In DFW, you want SHGC as LOW as possible — especially on south and west-facing windows that receive direct afternoon sun. ENERGY STAR requires SHGC ≤ 0.25 for DFW climate zone.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {[["0.40+", "No coating — avoid in DFW", "#EF4444″], ["0.30–0.40", "Minimal protection", "#F59E0B"], ["0.25", "ENERGY STAR minimum DFW", "#22C55E"], ["0.19 or less", "Optimal for DFW", "#F5E642"]].map(([val, label, color]) => (
              <div key={val as string} style={{ background: "#0A1628″, borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: color as string }}>{val}</div>
                <div style={{ color: "#94A3B8″, fontSize: 13, marginTop: 4 }}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 20 }}>📋 Low-E Window Types for DFW</h2>
          {LOW_E_TYPES.map((t) => (
            <div key={t.name} style={{ borderBottom: "1px solid #1E3A5F", paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                <div style={{ fontWeight: 700, color: "#E8EDF5″ }}>{t.name} {t.energyStar && <span style={{ background: "#22C55E", color: "#fff", fontSize: 11, padding: "2px 6px", borderRadius: 4, marginLeft: 8 }}>ENERGY STAR</span>}</div>
                <div style={{ color: "#F5E642″, fontWeight: 700 }}>{t.costRange}</div>
              </div>
              <div style={{ color: "#94A3B8″, fontSize: 14, marginBottom: 4 }}>{t.dfwFit}</div>
              <div style={{ color: "#64748B", fontSize: 13 }}>SHGC: {t.shgc} | U-Factor: {t.uFactor} | Best for: {t.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 20 }}>🧮 DFW Window Upgrade Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Number of Windows</label>
              <input value={windowCount} onChange={e => setWindowCount(e.target.value)} placeholder="e.g. 18″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Primary Exposure</label>
              <select value={orientation} onChange={e => setOrientation(e.target.value)} style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="mixed">Mixed orientations</option>
                <option value="south">South-facing heavy</option>
                <option value="west">West-facing heavy</option>
                <option value="north">North/East-facing heavy</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Current Window Age (yrs)</label>
              <input value={windowAge} onChange={e => setWindowAge(e.target.value)} placeholder="e.g. 20″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Calculate Savings</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628″, borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 17, marginBottom: 10 }}>📊 Recommended: {result.spec}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ESTIMATED COST</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ANNUAL ENERGY SAVINGS</div><div style={{ color: "#22C55E", fontWeight: 700 }}>${result.annualSavings}/yr</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>PAYBACK PERIOD</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>{result.payback} yrs</div></div>
              </div>
              <div style={{ color: "#94A3B8″, fontSize: 14 }}>{result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
