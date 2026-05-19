import { useState } from 'react';

const decadeGuide: Record<string, { icon: string; title: string; urgency: string; hoaNote: boolean; detail: string }[]> = {
  "1960s": [
    { icon: "⚡", title: "Full Electrical Rewire", urgency: "Critical", hoaNote: false, detail: "Knob-and-tube wiring still present in some Bedford 60s homes. Complete rewire required — insurance mandated in most cases." },
    { icon: "🏗️", title: "Slab Foundation Evaluation", urgency: "High", hoaNote: false, detail: "60-year-old slabs have settled significantly on Bedford clay. Professional engineer report recommended before any repairs." },
    { icon: "🚿", title: "Cast Iron Drain Replacement", urgency: "High", hoaNote: false, detail: "Original cast iron drains are failing by decade. Full replacement with PVC restores flow and eliminates odor infiltration." },
    { icon: "🌿", title: "Landscape Permit Check", urgency: "Medium", hoaNote: true, detail: "Bedford HOAs regulate tree removal and hardscape. Verify permits before removing mature trees near foundation." },
  ],
  "1970s": [
    { icon: "💧", title: "Copper vs. Galvanized Audit", urgency: "High", hoaNote: false, detail: "1970s Bedford homes used both. Galvanized supply lines corrode — check under sinks and at water heater connections." },
    { icon: "🏚️", title: "Foundation Settling Repair", urgency: "High", hoaNote: false, detail: "50-year slabs on clay show common door sticking and wall cracks. Pier-and-beam injection typical repair — $6K-15K range." },
    { icon: "🎨", title: "HOA Exterior Compliance", urgency: "Medium", hoaNote: true, detail: "Bedford HOAs strictly enforce paint colors, roofing material, and fence height. Get pre-approval before any exterior work." },
    { icon: "❄️", title: "HVAC Duct Sealing", urgency: "Medium", hoaNote: false, detail: "50-year-old flex duct has failed seams. Duct leakage testing common — seal and insulate in unconditioned attic space." },
  ],
  "1980s": [
    { icon: "🔌", title: "Panel Arc Fault Upgrade", urgency: "Medium", hoaNote: false, detail: "100A panels serviceable but add AFCI protection. Required for bedroom circuits under current NEC code." },
    { icon: "🌧️", title: "Roof Replacement Planning", urgency: "Medium", hoaNote: true, detail: "35-40 year shingles at end of life. Bedford HOAs specify approved shingle types — confirm before ordering materials." },
    { icon: "🏗️", title: "Foundation Perimeter Watering", urgency: "Medium", hoaNote: false, detail: "Prevent foundation movement with consistent soil moisture. Soaker hose at drip line, 30 min/3x weekly in summer." },
    { icon: "🪟", title: "Double-Pane Window Upgrade", urgency: "Low", hoaNote: true, detail: "HOA approval required for window style changes in Bedford. Energy savings of $120/mo in summer justify the upgrade." },
  ],
};

export default function BedfordHomeownerGuide2026() {
  const [selected, setSelected] = useState("1970s");
  const decades = Object.keys(decadeGuide);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 4px" }}>Bedford TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Established mid-cities suburb · 1960s-1980s construction · Slab settling concerns · HOA compliance focus</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642″ }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1″, lineHeight: 1.6 }}>
            📋 <strong style={{ color: "#F5E642″ }}>HOA Compliance in Bedford:</strong> Bedford HOAs are among the most active in Tarrant County. Items marked 📋 require HOA pre-approval before work begins. Violations result in fines of $100-500/day. Always get written approval first.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642″, marginBottom: 14 }}>Select Your Build Decade</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {decades.map(d => (
            <button key={d} onClick={() => setSelected(d)} style={{ padding: "10px 24px", borderRadius: 8, border: "2px solid", borderColor: selected === d ? "#F5E642″ : "#1e3a5f", backgroundColor: selected === d ? "#F5E642" : "transparent", color: selected === d ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
              {d}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {decadeGuide[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9″ }}>{item.title}</span>
                    {item.hoaNote && <span title="HOA pre-approval required" style={{ fontSize: 11, backgroundColor: "#1e3a5f", padding: "2px 6px", borderRadius: 4, color: "#93c5fd" }}>📋 HOA</span>}
                  </div>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: item.urgency === "Critical" ? "#450a0a" : item.urgency === "High" ? "#7f1d1d" : item.urgency === "Medium" ? "#78350f" : "#14532d", color: item.urgency === "Critical" ? "#fecaca" : item.urgency === "High" ? "#fca5a5″ : item.urgency === "Medium" ? "#fcd34d" : "#86efac" }}>{item.urgency}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8″, lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔗 Find HOA-savvy Bedford contractors</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk matches Bedford homeowners with contractors experienced in local HOA compliance requirements.</p>
        </div>
      </div>
    </div>
  );
}