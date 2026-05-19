import { useState } from 'react';

const locations = [
  { id: "eaves", label: "Eaves (First 3 Feet)", icon: "🏠", required: true, code: "IRC R905.1.2 / Texas Code", desc: "Self-adhered underlayment required at all eaves in Texas. Install from drip edge up, minimum 3 feet from interior wall line. In DFW, hail-driven rain mimics ice dam damage — this barrier is your backup line.", sqft: "Linear ft of eave x 3 ft" },
  { id: "valleys", label: "Valleys (Full Length)", icon: "🏔️", required: true, code: "IRC R905.2.8.2", desc: "Install full-length ice and water shield in all roof valleys. DFW rain events can push 2-4 inches per hour. Valley water volume overwhelms open metal valley — self-adhered membrane is the only reliable solution.", sqft: "Valley length x 3 ft width" },
  { id: "penetrations", label: "Around All Penetrations", icon: "🔧", required: true, code: "IRC R903.2", desc: "Pipes, vents, skylights, and chimneys require ice and water shield collar extending 6 inches onto roof deck in all directions. DFW hail can crack flashings — the membrane underneath provides secondary protection.", sqft: "Each penetration: ~9 sqft" },
  { id: "rakes", label: "Rake Edges", icon: "📐", required: false, code: "Recommended for DFW", desc: "Not code-required but strongly recommended for DFW. Rake edges (gable sides) catch wind-driven rain. Adding 18 inches of self-adhered at rakes prevents blow-back infiltration during DFW storm fronts.", sqft: "Rake length x 1.5 ft" },
  { id: "low-slope", label: "Low-Slope Areas 2:12 to 4:12", icon: "📉", required: true, code: "IRC R905.2.7", desc: "Entire low-slope field requires self-adhered underlayment in DFW. Asphalt shingles require min 4:12 pitch. At 2:12–4:12, wind-driven rain and hail can force water under standard felt. Full membrane coverage required.", sqft: "Full low-slope area" },
  { id: "hips", label: "Hip Ridges", icon: "⛰️", required: false, code: "Best Practice DFW", desc: "Hip ridges are transition points vulnerable to DFW wind uplift. 18-24 inch self-adhered strip centered on hip ridge adds redundancy under hip cap shingles. Important for homes with complex roof geometry.", sqft: "Hip length x 2 ft" },
];

type Concern = "hail" | "wind" | "leak" | "freeze";

const concernMap: Record<Concern, string[]> = {
  hail: ["eaves", "valleys", "penetrations", "low-slope"],
  wind: ["rakes", "eaves", "hips"],
  leak: ["valleys", "penetrations", "eaves"],
  freeze: ["eaves", "low-slope"],
};

export default function DFWRoofingIceWaterShield2026() {
  const [concern, setConcern] = useState<Concern | "">("");
  const [selected, setSelected] = useState<string | null>(null);
  const highlighted = concern ? concernMap[concern as Concern] : [];
  const active = locations.find(l => l.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🛡️</div>
          <h1 style={{ color: "#F5E642", fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW Ice and Water Shield Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Self-Adhered Underlayment Specifications — North Texas Roofing</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #334155" }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 4 }}>Why Ice and Water Shield in DFW?</div>
          <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>DFW rarely gets true ice dams but hail and freeze events cause identical damage. Self-adhered membrane seals nail holes and provides a watertight secondary barrier when primary roofing fails under impact.</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 8 }}>My primary DFW roofing concern:</label>
          <select value={concern} onChange={e => { setConcern(e.target.value as Concern | ""); setSelected(null); }} style={{ width: "100%", padding: "10px 14px", background: "#1e2d45", color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 14 }}>
            <option value="">— Select concern —</option>
            <option value="hail">Hail damage protection</option>
            <option value="wind">Wind-driven rain infiltration</option>
            <option value="leak">Active or past leak</option>
            <option value="freeze">Freeze and ice event damage</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
          {locations.map(l => {
            const isHighlighted = highlighted.includes(l.id);
            return (
              <button key={l.id} onClick={() => { setSelected(l.id); setConcern(""); }} style={{ background: selected === l.id ? "#F5E64222" : isHighlighted ? "#1e3a5f" : "#1e2d45", border: `1px solid ${selected === l.id ? "#F5E642" : isHighlighted ? "#93c5fd" : "#334155"}`, borderRadius: 10, padding: "14px", textAlign: "left", cursor: "pointer", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 22 }}>{l.icon}</div>
                  {l.required && <span style={{ fontSize: 10, background: "#7f1d1d", color: "#fca5a5", padding: "2px 7px", borderRadius: 999 }}>CODE REQUIRED</span>}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: selected === l.id ? "#F5E642" : "#e2e8f0", marginTop: 6 }}>{l.label}</div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{l.code}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>Est: {l.sqft}</div>
              </button>
            );
          })}
        </div>
        {active && (
          <div style={{ background: "#1e2d45", border: "1px solid #F5E642", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{active.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>{active.label}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.7 }}>{active.desc}</div>
          </div>
        )}
        <div style={{ marginTop: 24, fontSize: 11, color: "#475569", textAlign: "center" }}>Self-adhered membrane cost: $0.15–0.25 per sqft material. Standard felt: $0.05 per sqft. Insurance often requires code-compliant installation • ProLnk 2026</div>
      </div>
    </div>
  );
}
