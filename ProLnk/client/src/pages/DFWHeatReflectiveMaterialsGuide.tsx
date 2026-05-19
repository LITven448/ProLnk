import { useState } from 'react';

const HOME_FEATURES = [
  {
    feature: "Roof",
    options: [
      { material: "Standard dark asphalt shingles", reflectance: "5-15%", heatAbsorb: "Very High", upgrade: "Cool roof coating or light-colored shingles" },
      { material: "White / light-colored shingles", reflectance: "25-40%", heatAbsorb: "Moderate", upgrade: "Reflective coating to boost to 65%+" },
      { material: "Metal roofing (bare or coated)", reflectance: "50-70%", heatAbsorb: "Low", upgrade: "Already high-performing — add radiant barrier in attic" },
      { material: "Cool roof coating applied", reflectance: "65-85%", heatAbsorb: "Very Low", upgrade: "Maximum performance — no further action needed" },
    ],
  },
  {
    feature: "Attic",
    options: [
      { material: "No radiant barrier", reflectance: "N/A", heatAbsorb: "Very High", upgrade: "Install perforated radiant barrier — DFW attics hit 150°F+  without it" },
      { material: "Radiant barrier installed", reflectance: "95% IR block", heatAbsorb: "Low", upgrade: "Already optimal — verify it faces the air space for proper function" },
    ],
  },
  {
    feature: "Exterior Paint",
    options: [
      { material: "Dark paint (dark gray, navy, dark brown)", reflectance: "5-10%", heatAbsorb: "Very High", upgrade: "Repaint with light or cool-pigment paint — 20-30°F wall temp reduction" },
      { material: "Medium paint (tan, gray, cream)", reflectance: "25-45%", heatAbsorb: "Moderate", upgrade: "Consider cool-pigment formula to gain IR reflectance without changing color" },
      { material: "Light paint (white, off-white, light gray)", reflectance: "60-80%", heatAbsorb: "Low", upgrade: "Optimal — ensure cool-pigment formula for max IR reflectance" },
    ],
  },
];

const COST_ESTIMATES: Record<string, { low: number; high: number; unit: string; savings: number }> = {
  "Cool roof coating": { low: 1200, high: 3500, unit: "per application", savings: 280 },
  "Radiant barrier": { low: 800, high: 2200, unit: "installed", savings: 220 },
  "Exterior paint upgrade": { low: 3500, high: 8000, unit: "average home", savings: 80 },
  "Light-colored shingles": { low: 6000, high: 14000, unit: "full replacement", savings: 180 },
  "Metal roofing": { low: 18000, high: 40000, unit: "full replacement", savings: 380 },
};

export default function DFWHeatReflectiveMaterialsGuide() {
  const [selectedFeature, setSelectedFeature] = useState("Roof");
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [upgradeTarget, setUpgradeTarget] = useState("Cool roof coating");
  const [result, setResult] = useState<null | { upgrade: string; costLow: number; costHigh: number; annualSavings: number; payback: number }>(null);

  const featureData = HOME_FEATURES.find(f => f.feature === selectedFeature)!;

  function calculate() {
    const est = COST_ESTIMATES[upgradeTarget];
    if (!est) return;
    const payback = Math.round((est.low + est.high) / 2 / est.savings);
    setResult({ upgrade: upgradeTarget, costLow: est.low, costHigh: est.high, annualSavings: est.savings, payback });
  }

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642″ }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>☀️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "0 0 12px" }}>DFW Heat-Reflective Materials Guide</h1>
          <p style={{ fontSize: 17, color: "#94A3B8″, margin: 0 }}>DFW homes absorb massive heat loads in summer. The right materials can cut cooling costs 20-35%.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0″ }}>
        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>🌡️ DFW Heat Load Reality</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              ["150°F+", "Dark asphalt roof surface temp in DFW July"],
              ["20-30°F", "Wall temp reduction from dark to light exterior paint"],
              ["$220-380/yr", "Typical DFW savings from radiant barrier + cool roof"],
              ["35%", "Max cooling cost reduction with full reflective system"],
            ].map(([val, desc]) => (
              <div key={val as string} style={{ background: "#0A1628″, borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642″, marginBottom: 6 }}>{val}</div>
                <div style={{ color: "#94A3B8″, fontSize: 13 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>🔎 Material Performance by Home Feature</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {HOME_FEATURES.map(f => (
              <button key={f.feature} onClick={() => { setSelectedFeature(f.feature); setSelectedMaterial(0); }} style={{ background: selectedFeature === f.feature ? "#F5E642″ : "#0A1628", color: selectedFeature === f.feature ? "#0A1628" : "#E8EDF5", border: "1px solid #1E3A5F", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>{f.feature}</button>
            ))}
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {featureData.options.map((opt, idx) => (
              <div key={opt.material} onClick={() => setSelectedMaterial(idx)} style={{ background: "#0A1628″, borderRadius: 8, padding: 16, cursor: "pointer", border: selectedMaterial === idx ? "2px solid #F5E642" : "1px solid #1E3A5F" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: "#E8EDF5″ }}>{opt.material}</div>
                  <div style={{ color: "#64748B", fontSize: 13 }}>Reflectance: {opt.reflectance}</div>
                </div>
                <div style={{ color: "#94A3B8″, fontSize: 14 }}>{opt.upgrade}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 20 }}>🧮 Upgrade Cost + Savings Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Upgrade Type</label>
              <select value={upgradeTarget} onChange={e => setUpgradeTarget(e.target.value)} style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                {Object.keys(COST_ESTIMATES).map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Calculate ROI</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628″, borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 17, marginBottom: 10 }}>📊 {result.upgrade}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ESTIMATED COST</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ANNUAL AC SAVINGS</div><div style={{ color: "#22C55E", fontWeight: 700 }}>${result.annualSavings}/yr</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>PAYBACK PERIOD</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>{result.payback} yrs</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
