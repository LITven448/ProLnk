import { useState } from 'react';

const stormTypes = [
  {
    type: "Tornado",
    icon: "🌪️",
    prep: ["Identify safe room — interior room, lowest floor, no windows", "Helmet + shoes at safe room for hail/debris", "Battery weather radio + phone charged", "Pre-storm: secure outdoor furniture within 30 min of watch"],
    response: ["Shelter immediately at WARNING — do not wait", "Avoid windows, doors, exterior walls", "Cover head and neck with arms", "Do NOT shelter under highway overpass"],
  },
  {
    type: "Hail",
    icon: "🧊",
    prep: ["Pre-storm: photograph roof and exterior for insurance baseline", "Park cars in garage — DFW avg hail claim: $8,400", "Cover HVAC condenser with plywood if time allows", "Trim overhanging branches near roof"],
    response: ["Document damage within 24 hours — photos every 6 inches of roof", "Call insurance within 48 hours", "Get 3 roofing estimates before accepting adjuster offer", "Check gutters, window screens, and siding"],
  },
  {
    type: "Power Outage",
    icon: "⚡",
    prep: ["Surge protectors on HVAC, electronics", "Keep flashlights and battery packs charged", "Manual can opener + 3-day non-perishable food supply", "Know location of main breaker panel"],
    response: ["Unplug major appliances to prevent surge damage on restore", "Refrigerator safe 4 hours / freezer 48 hours without power", "Generator: run OUTSIDE only — CO kills indoors", "Report outage to Oncor (888-313-4747) or your utility"],
  },
  {
    type: "Flash Flood",
    icon: "🌊",
    prep: ["Know your flood zone — check FEMA FIRM maps", "Sandbags stored if low-lying property", "Critical docs in waterproof container or cloud", "Sump pump tested annually (if applicable)"],
    response: ["Never drive through flooded roads — 6 inches sweeps cars", "Move valuables to upper floors immediately", "Turn off electricity at main breaker if water enters", "Document all water intrusion for insurance"],
  },
];

export default function DFWSpringStormHomeGuide2026() {
  const [sel, setSel] = useState(0);
  const [view, setView] = useState<"prep" | "response">("prep");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⛈️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Spring Storm Home Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>April–June is severe weather season in DFW. Tornadoes, hail, flash floods — be ready for all of them.</p>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 14 }}>⚡ Storm Type → Your Guide</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {stormTypes.map((s, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                background: sel === i ? "#F5E642" : "#1a3a5c",
                color: sel === i ? "#0A1628" : "#fff",
                border: "none", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700, fontSize: 14
              }}>{s.icon} {s.type}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button onClick={() => setView("prep")} style={{
              flex: 1, background: view === "prep" ? "#1a3a5c" : "transparent",
              color: view === "prep" ? "#F5E642" : "#64748b",
              border: "1px solid #1a3a5c", borderRadius: 8, padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13
            }}>Before Storm</button>
            <button onClick={() => setView("response")} style={{
              flex: 1, background: view === "response" ? "#1a3a5c" : "transparent",
              color: view === "response" ? "#F5E642" : "#64748b",
              border: "1px solid #1a3a5c", borderRadius: 8, padding: "8px", cursor: "pointer", fontWeight: 700, fontSize: 13
            }}>During / After</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {(view === "prep" ? stormTypes[sel].prep : stormTypes[sel].response).map((item, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "11px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#F5E642", marginTop: 2 }}>•</span>
                <span style={{ color: "#e2e8f0", fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>📋 Post-Storm Quick Checklist</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Photograph all exterior damage", "Check roof for missing shingles", "Inspect fence and gates", "Test GFCI outlets after flooding", "Check attic for water intrusion", "Review HVAC condenser condition"].map((item, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }}>
                ☑️ {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
