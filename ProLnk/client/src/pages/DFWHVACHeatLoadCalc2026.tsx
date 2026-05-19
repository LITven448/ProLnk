import { useState } from 'react';

const components = [
  { id: "design-temp", label: "Design Temperature", icon: "🌡️", desc: "102°F outdoor / 75°F indoor = 27°F differential", detail: "DFW design temp drives entire system size. ACCA Manual J uses 102°F for cooling design day. 27° delta is your baseline load multiplier.", impact: "High" },
  { id: "solar-gain", label: "Solar Heat Gain", icon: "☀️", desc: "South & west windows are critical in DFW", detail: "South/west glass receives 200-400 BTU/hr/sqft peak. Low-E coatings reduce SHGC from 0.87 to 0.25. Window area × SHGC × solar factor = component load.", impact: "Very High" },
  { id: "infiltration", label: "Infiltration & Air Leakage", icon: "💨", desc: "DFW home tightness via blower door test", detail: "DFW homes average 5-8 ACH50. Energy Star requires ≤3 ACH50. Each ACH adds ~1,500 BTU/hr to load in typical 2,000 sqft home.", impact: "High" },
  { id: "internal", label: "Internal Heat Gains", icon: "🔌", desc: "Appliances, lighting, and occupants add BTUs", detail: "Each occupant: 250 BTU/hr sensible + 200 latent. Refrigerator: 500 BTU/hr. Lighting: 3.4 BTU/hr per watt. DFW open-plan kitchens concentrate gains.", impact: "Medium" },
  { id: "envelope", label: "Envelope & Insulation", icon: "🏠", desc: "Walls, attic, and slab contribute to load", detail: "Attic floor R-38 minimum in DFW climate zone 3. Each R-1 of attic insulation reduces ceiling load ~3%. 2x4 walls (R-13) vs 2x6 (R-19) differ ~15% on wall component.", impact: "High" },
  { id: "latent", label: "Latent Load (Humidity)", icon: "💧", desc: "DFW humidity adds significant moisture load", detail: "DFW summer RH 60-75%. Latent load can be 30-40% of total in DFW. Proper dehumidification requires correctly sized equipment — oversized units short-cycle.", impact: "High" },
];

const homeFeatures = [
  { label: "Many south/west windows", guide: "solar-gain" },
  { label: "Older drafty construction", guide: "infiltration" },
  { label: "Large open kitchen", guide: "internal" },
  { label: "Minimal attic insulation", guide: "envelope" },
  { label: "High humidity complaints", guide: "latent" },
  { label: "High electricity bills", guide: "design-temp" },
];

export default function DFWHVACHeatLoadCalc2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [feature, setFeature] = useState<string>("");

  const active = components.find(c => c.id === selected);
  const guided = feature ? components.find(c => c.id === homeFeatures.find(h => h.label === feature)?.guide) : null;
  const display = guided || active;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🧮</div>
          <h1 style={{ color: "#F5E642″, fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW HVAC Heat Load Calculation 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>Manual J Components for North Texas — 102°F Design Day</p>
        </div>

        <div style={{ background: "#F5E64222″, border: "1px solid #F5E64244", borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#F5E642″, fontWeight: 600, marginBottom: 6 }}>⚡ DFW Design Conditions</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {[["Outdoor Design Temp","102°F"],["Indoor Setpoint","75°F"],["Delta-T","27°F"]].map(([k,v]) => (
              <div key={k} style={{ background: "#0A1628″, borderRadius: 8, padding: "8px 12px" }}>
                <div style={{ fontSize: 11, color: "#94a3b8″ }}>{k}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″ }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: "#94a3b8″, display: "block", marginBottom: 8 }}>My home has (select to explore component):</label>
          <select value={feature} onChange={e => { setFeature(e.target.value); setSelected(""); }} style={{ width: "100%", padding: "10px 14px", background: "#1e2d45″, color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 14 }}>
            <option value="">— Choose a feature —</option>
            {homeFeatures.map(h => <option key={h.label} value={h.label}>{h.label}</option>)}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
          {components.map(c => (
            <button key={c.id} onClick={() => { setSelected(c.id); setFeature(""); }} style={{ background: selected === c.id ? "#F5E64222″ : "#1e2d45", border: `1px solid ${selected === c.id ? "#F5E642" : "#334155"}`, borderRadius: 10, padding: "14px", textAlign: "left", cursor: "pointer", color: "#fff" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: selected === c.id ? "#F5E642″ : "#e2e8f0" }}>{c.label}</div>
              <div style={{ fontSize: 11, color: "#94a3b8″, marginTop: 3 }}>{c.desc}</div>
              <div style={{ marginTop: 6, display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 999, background: c.impact === "Very High" ? "#7f1d1d" : c.impact === "High" ? "#1e3a5f" : "#1e3a1f", color: c.impact === "Very High" ? "#fca5a5″ : c.impact === "High" ? "#93c5fd" : "#86efac" }}>{c.impact} Impact</div>
            </button>
          ))}
        </div>

        {display && (
          <div style={{ background: "#1e2d45″, border: "1px solid #F5E642", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{display.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>{display.label}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1″, lineHeight: 1.6 }}>{display.detail}</div>
          </div>
        )}

        <div style={{ marginTop: 24, fontSize: 11, color: "#475569″, textAlign: "center" }}>Manual J load calc required by IRC for new HVAC installs in Texas • ProLnk 2026</div>
      </div>
    </div>
  );
}
