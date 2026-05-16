import { useState } from 'react';

const MATERIALS = [
  { name: "Concrete Pavers", costMin: 12, costMax: 20, maintenance: "Low", drainage: "Permeable options", dfwNote: "Handles clay soil expansion well — interlocking design allows movement" },
  { name: "Brick Pavers", costMin: 14, costMax: 24, maintenance: "Low", drainage: "Moderate", dfwNote: "Classic DFW look — avoid in heavy truck traffic areas" },
  { name: "Flagstone", costMin: 15, costMax: 28, maintenance: "Medium", drainage: "Low", dfwNote: "Upscale look but joints can shift on DFW clay; needs polymeric sand" },
  { name: "Permeable Pavers", costMin: 16, costMax: 26, maintenance: "Medium", drainage: "Excellent", dfwNote: "Best for DFW drainage regs — allows stormwater infiltration on-site" },
  { name: "Gravel / Decomposed Granite", costMin: 3, costMax: 7, maintenance: "Medium", drainage: "Excellent", dfwNote: "Popular in rural DFW/Weatherford — cheapest option, needs edging" },
  { name: "Asphalt", costMin: 5, costMax: 10, maintenance: "High", drainage: "Poor", dfwNote: "Common in DFW subdivisions — softens in 100°F+ heat, needs seal coat every 3 yrs" },
];

export default function DFWConcreteAlternativesGuide() {
  const [drivewayLen, setDrivewayLen] = useState("");
  const [drivewayWidth, setDrivewayWidth] = useState("");
  const [stylePrefs, setStylePrefs] = useState("modern");
  const [budget, setBudget] = useState("mid");
  const [result, setResult] = useState<null | { material: string; costLow: number; costHigh: number; maintenance: string; dfwNote: string }>(null);

  function calculate() {
    const len = parseFloat(drivewayLen);
    const wid = parseFloat(drivewayWidth);
    if (!len || !wid) return;
    const sqft = len * wid;
    let mat = MATERIALS[0];
    if (budget === "low") mat = MATERIALS[4];
    else if (budget === "mid" && stylePrefs === "natural") mat = MATERIALS[2];
    else if (budget === "mid" && stylePrefs === "eco") mat = MATERIALS[3];
    else if (budget === "high" && stylePrefs === "natural") mat = MATERIALS[1];
    else if (budget === "high") mat = MATERIALS[0];
    setResult({
      material: mat.name,
      costLow: Math.round(sqft * mat.costMin),
      costHigh: Math.round(sqft * mat.costMax),
      maintenance: mat.maintenance,
      dfwNote: mat.dfwNote,
    });
  }

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛣️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "0 0 12px" }}>DFW Concrete Driveway Alternatives</h1>
          <p style={{ fontSize: 17, color: "#94A3B8", margin: 0 }}>DFW clay soil moves — here are materials that handle it better than poured concrete.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 12 }}>🏗️ Why Concrete Fails in DFW</h2>
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7 }}>DFW sits on expansive black clay soil (Blackland Prairie). Concrete slabs crack as clay expands in rain and contracts in drought — often within 5-8 years. Interlocking pavers and flexible materials allow soil movement without cracking, dramatically extending driveway life.</p>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>📋 Material Comparison</h2>
          {MATERIALS.map((m) => (
            <div key={m.name} style={{ borderBottom: "1px solid #1E3A5F", paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                <div style={{ fontWeight: 700, color: "#E8EDF5" }}>{m.name}</div>
                <div style={{ color: "#F5E642", fontWeight: 700 }}>${m.costMin}–${m.costMax}/sq ft installed</div>
              </div>
              <div style={{ color: "#94A3B8", fontSize: 14, marginBottom: 4 }}>{m.dfwNote}</div>
              <div style={{ color: "#64748B", fontSize: 13 }}>Maintenance: {m.maintenance} | Drainage: {m.drainage}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>🧮 DFW Driveway Cost Estimator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Driveway Length (ft)</label>
              <input value={drivewayLen} onChange={e => setDrivewayLen(e.target.value)} placeholder="e.g. 40" style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Driveway Width (ft)</label>
              <input value={drivewayWidth} onChange={e => setDrivewayWidth(e.target.value)} placeholder="e.g. 20" style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Style Preference</label>
              <select value={stylePrefs} onChange={e => setStylePrefs(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="modern">Modern / Clean</option>
                <option value="natural">Natural / Rustic</option>
                <option value="eco">Eco / Permeable</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="low">Budget ($3-7/sqft)</option>
                <option value="mid">Mid ($10-18/sqft)</option>
                <option value="high">Premium ($18+/sqft)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>🏆 Best Match: {result.material}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ESTIMATED COST</div><div style={{ color: "#E8EDF5", fontWeight: 700 }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>MAINTENANCE</div><div style={{ color: "#E8EDF5", fontWeight: 700 }}>{result.maintenance}</div></div>
                <div style={{ gridColumn: "1 / -1" }}><div style={{ color: "#64748B", fontSize: 12 }}>DFW SPECIFIC NOTES</div><div style={{ color: "#94A3B8", fontSize: 14 }}>{result.dfwNote}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
