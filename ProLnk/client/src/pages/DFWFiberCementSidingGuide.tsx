import { useState } from 'react';

const SIDING_OPTIONS = [
  { name: "HardiePlank Lap Siding", desc: "Most popular in DFW — horizontal lap profile, best wind resistance", hailClass: "Class 4", costMin: 8, costMax: 14, paint: "Factory or field" },
  { name: "HardiePanel Vertical Siding", desc: "Board-and-batten look, faster install, rural/modern homes", hailClass: "Class 4", costMin: 7, costMax: 12, paint: "Factory or field" },
  { name: "HardieShingle Siding", desc: "Cedar shake look without rot risk, accent gables or full home", hailClass: "Class 3", costMin: 10, costMax: 16, paint: "Field only" },
  { name: "HardieTrim Board", desc: "Pairs with any panel style for corners, windows, fascia", hailClass: "Class 4", costMin: 5, costMax: 9, paint: "Factory or field" },
];

export default function DFWFiberCementSidingGuide() {
  const [sqft, setSqft] = useState("");
  const [currentSiding, setCurrentSiding] = useState("vinyl");
  const [hailZone, setHailZone] = useState("high");
  const [result, setResult] = useState<null | { product: string; costLow: number; costHigh: number; hailClass: string; notes: string }>(null);

  function calculate() {
    const area = parseFloat(sqft);
    if (!area || area < 100) return;
    const prod = hailZone === "high" ? SIDING_OPTIONS[0] : SIDING_OPTIONS[1];
    const laborMultiplier = currentSiding === "wood" ? 1.3 : 1.0;
    setResult({
      product: prod.name,
      costLow: Math.round(area * prod.costMin * laborMultiplier),
      costHigh: Math.round(area * prod.costMax * laborMultiplier),
      hailClass: prod.hailClass,
      notes: currentSiding === "wood" ? "+30% labor for wood removal" : "Standard install pricing",
    });
  }

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "0 0 12px" }}>DFW Fiber Cement Siding Guide</h1>
          <p style={{ fontSize: 17, color: "#94A3B8", margin: 0 }}>James Hardie dominates DFW — here is why fiber cement wins in North Texas hail and heat.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>⚡ Why Fiber Cement Beats Vinyl in DFW</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["🌨️ Hail Resistance", "Class 4 impact rating — top tier. Vinyl cracks at Class 2-3."],
              ["🔥 Heat Tolerance", "Rated to 300°F+ surface temps. Vinyl warps at 165°F, common on DFW south walls."],
              ["💧 Moisture Seal", "Does not absorb moisture — critical for DFW spring humidity cycles."],
              ["🎨 Paint Longevity", "Factory ColorPlus finish carries 15-yr fade warranty vs 5-yr vinyl fade."],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: "#0A1628", borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, color: "#E8EDF5", marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#94A3B8", fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>📋 HardiePlank vs HardiePanel vs HardieShingle</h2>
          {SIDING_OPTIONS.map((opt) => (
            <div key={opt.name} style={{ borderBottom: "1px solid #1E3A5F", paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#E8EDF5", marginBottom: 4 }}>{opt.name}</div>
                  <div style={{ color: "#94A3B8", fontSize: 14 }}>{opt.desc}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#F5E642", fontWeight: 700 }}>${opt.costMin}–${opt.costMax}/sq ft</div>
                  <div style={{ color: "#64748B", fontSize: 13 }}>{opt.hailClass} | {opt.paint}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>🧮 DFW Fiber Cement Cost Estimator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Home Siding Sq Ft</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2000" style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Current Siding</label>
              <select value={currentSiding} onChange={e => setCurrentSiding(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="vinyl">Vinyl</option>
                <option value="wood">Wood</option>
                <option value="stucco">Stucco</option>
                <option value="none">New build</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Hail Exposure</label>
              <select value={hailZone} onChange={e => setHailZone(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="high">High (open lots, N/NW DFW)</option>
                <option value="moderate">Moderate (treed lots, central DFW)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Calculate Estimate</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>📊 Recommendation: {result.product}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ESTIMATED COST</div><div style={{ color: "#E8EDF5", fontWeight: 700 }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>HAIL CLASS</div><div style={{ color: "#E8EDF5", fontWeight: 700 }}>{result.hailClass}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>NOTES</div><div style={{ color: "#94A3B8", fontSize: 13 }}>{result.notes}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
