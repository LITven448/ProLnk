import { useState } from 'react';

const INSULATION_OPTIONS = [
  { rValue: "R-8", type: "Single-layer polystyrene", description: "Minimum code — inadequate for DFW heat extremes", tempReduction: "15-20°F", costPerPanel: 45, recommendation: false },
  { rValue: "R-13", type: "Double-layer polystyrene", description: "Minimum recommended for DFW — meets most utility rebate thresholds", tempReduction: "30-40°F", costPerPanel: 65, recommendation: true },
  { rValue: "R-18", type: "Polyurethane foam", description: "Best for DFW — superior thermal mass, handles 140°F+ exterior temps", tempReduction: "45-55°F", costPerPanel: 95, recommendation: true },
  { rValue: "R-6.3", type: "Single-layer polyurethane", description: "Compact doors — better than polystyrene at same thickness", tempReduction: "25-35°F", costPerPanel: 75, recommendation: false },
];

export default function DFWInsulatedGarageGuide() {
  const [garageType, setGarageType] = useState("double");
  const [attached, setAttached] = useState("attached");
  const [currentR, setCurrentR] = useState("none");
  const [result, setResult] = useState<null | { option: typeof INSULATION_OPTIONS[0]; totalCost: number; tempComment: string; urgency: string }>(null);

  function calculate() {
    const panelCount = garageType === "double" ? 8 : garageType === "triple" ? 16 : 4;
    const doorCount = garageType === "triple" ? 2 : 1;
    let opt = INSULATION_OPTIONS[2];
    if (currentR === "r13") opt = INSULATION_OPTIONS[0];
    const totalCost = Math.round(panelCount * opt.costPerPanel + doorCount * 150);
    const tempComment = attached === "attached"
      ? "Attached garage insulation directly lowers adjacent living space temps by 8-12°F, reducing AC load significantly."
      : "Detached garage — protects stored items and workshop comfort but does not affect home AC load.";
    const urgency = currentR === "none" ? "High — uninsulated DFW garages reach 145-150°F in summer, damaging vehicles and stored items." : "Moderate — upgrade improves comfort and energy savings.";
    setResult({ option: opt, totalCost, tempComment, urgency });
  }

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚗</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "0 0 12px" }}>DFW Insulated Garage Door Guide</h1>
          <p style={{ fontSize: 17, color: "#94A3B8", margin: 0 }}>DFW garage interiors reach 140-150°F without insulation. R-13 is the minimum — R-18 polyurethane is the right call.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>🌡️ The DFW Garage Heat Problem</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["145°F", "Peak interior temp in uninsulated DFW garages in summer"],
              ["30-55°F", "Temperature reduction from R-13 to R-18 insulation"],
              ["8-12°F", "Adjacent living space cooling benefit with attached insulated garage"],
              ["$180-380/yr", "Typical AC savings for attached insulated garage in DFW"],
            ].map(([val, desc]) => (
              <div key={val as string} style={{ background: "#0A1628", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#F5E642", marginBottom: 6 }}>{val}</div>
                <div style={{ color: "#94A3B8", fontSize: 13 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 12 }}>🔬 Polystyrene vs Polyurethane for DFW</h2>
          <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>Polyurethane wins in DFW because it bonds directly to door steel, eliminating air gaps that undermine polystyrene bead-board in extreme heat cycles. Polyurethane achieves higher R-values at thinner profiles and maintains performance at 150°F+ surface temps.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {INSULATION_OPTIONS.map((opt) => (
              <div key={opt.rValue + opt.type} style={{ background: "#0A1628", borderRadius: 8, padding: 16, border: opt.recommendation ? "2px solid #F5E642" : "1px solid #1E3A5F" }}>
                {opt.recommendation && <div style={{ color: "#F5E642", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>★ RECOMMENDED FOR DFW</div>}
                <div style={{ fontWeight: 700, color: "#E8EDF5", marginBottom: 4 }}>{opt.rValue} — {opt.type}</div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginBottom: 8 }}>{opt.description}</div>
                <div style={{ color: "#64748B", fontSize: 12 }}>Temp reduction: {opt.tempReduction}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240", borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 20 }}>🧮 DFW Garage Door Upgrade Estimator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Garage Type</label>
              <select value={garageType} onChange={e => setGarageType(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="single">Single car</option>
                <option value="double">Double car</option>
                <option value="triple">Triple car</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Attached or Detached</label>
              <select value={attached} onChange={e => setAttached(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="attached">Attached to home</option>
                <option value="detached">Detached</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8", fontSize: 13, marginBottom: 6 }}>Current Insulation</label>
              <select value={currentR} onChange={e => setCurrentR(e.target.value)} style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="none">None</option>
                <option value="r8">R-8 basic</option>
                <option value="r13">R-13 standard</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Get Upgrade Plan</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>📊 Upgrade to: {result.option.rValue} {result.option.type}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ESTIMATED COST</div><div style={{ color: "#E8EDF5", fontWeight: 700 }}>${result.totalCost.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>TEMP REDUCTION</div><div style={{ color: "#22C55E", fontWeight: 700 }}>{result.option.tempReduction}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>URGENCY</div><div style={{ color: "#94A3B8", fontSize: 13 }}>{result.urgency}</div></div>
              </div>
              <div style={{ color: "#94A3B8", fontSize: 14 }}>{result.tempComment}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
