import { useState } from 'react';

const constructionTypes = [
  {
    type: "New Home Construction (slab-on-grade)",
    required: true,
    cost: "$1,800-2,500″,
    borings: "3-5 soil borings to 10-15 ft depth",
    keyTests: ["Plasticity Index (PI)", "Moisture content", "Swell potential", "Bearing capacity"],
    foundationType: "Typically post-tension slab with deeper edge beams in DFW",
    timing: "Before permits — engineer needs report to design foundation"
  },
  {
    type: "Home Addition or Room Addition",
    required: true,
    cost: "$1,500-2,000″,
    borings: "1-2 borings focused on addition footprint",
    keyTests: ["Soil bearing capacity", "Moisture content", "PI index"],
    foundationType: "Must match or be compatible with existing foundation type",
    timing: "Before structural drawings — determines footing depth and size"
  },
  {
    type: "Foundation Repair Evaluation",
    required: false,
    cost: "$1,500-3,000″,
    borings: "3-5 borings around perimeter of distress",
    keyTests: ["PI", "Current vs optimal moisture", "Depth to stable soil"],
    foundationType: "Informs pier depth and spacing for repair contractors",
    timing: "Before getting repair bids — gives independent data"
  },
  {
    type: "Pool or Hardscape Installation",
    required: false,
    cost: "$1,200-1,800″,
    borings: "1-2 borings in pool area",
    keyTests: ["Bearing capacity", "Groundwater level", "Rock depth"],
    foundationType: "Determines excavation feasibility and shotcrete thickness",
    timing: "Before pool design finalized"
  },
  {
    type: "Garage Conversion (ADU)",
    required: false,
    cost: "$1,500-2,000″,
    borings: "1-2 borings",
    keyTests: ["Existing slab condition", "Soil bearing capacity"],
    foundationType: "Engineer evaluates if existing slab supports habitable load",
    timing: "During permit application process"
  }
];

export default function DFWFoundationGeotechReport2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const ct = selected !== null ? constructionTypes[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, fontWeight: 700, letterSpacing: 1 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>🔬 Geotechnical Report Guide</h1>
        <p style={{ color: "#9BA3B8″, marginBottom: 28, lineHeight: 1.6 }}>
          DFW's expansive clay soils (Plasticity Index often 40-60+) require geotechnical investigation before most major construction. Here’s what a geotech report covers and when you need one.
        </p>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>📋 What a Geotech Report Includes</h2>
          <ul style={{ color: "#C8CEDF", lineHeight: 2, paddingLeft: 20 }}>
            <li>Soil boring logs (depth, soil type at each layer)</li>
            <li>Plasticity Index — higher = more expansive clay</li>
            <li>Recommended foundation type and depth</li>
            <li>Allowable bearing pressure (how much load soil can carry)</li>
            <li>Groundwater depth and seasonal variation</li>
            <li>Rock depth (impacts pier drilling costs)</li>
          </ul>
          <div style={{ marginTop: 14, padding: 12, background: "#0A1628″, borderRadius: 8, color: "#F5E642", fontSize: 13 }}>
            💡 DFW fact: PI above 40 typically requires deeper edge beams and moisture management — a geotech report quantifies exactly what's needed.
          </div>
        </div>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 14 }}>🏗️ Select Your Construction Type</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {constructionTypes.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, background: selected === i ? "#0D1F3C" : "#0A1628″,
                  border: `1px solid ${selected === i ? "#F5E642" : "#2A3A5A"}`, color: "#E8EAF0″, cursor: "pointer", fontSize: 14 }}>
                {c.type}
              </button>
            ))}
          </div>
        </div>

        {ct && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: `2px solid ${ct.required ? "#F5E642" : "#2A3A5A"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ color: "#FFFFFF", margin: 0, fontSize: 16 }}>{ct.type}</h3>
              <span style={{ background: ct.required ? "#F5E642″ : "#2A3A5A", color: ct.required ? "#0A1628" : "#9BA3B8", borderRadius: 6, padding: "4px 10px", fontWeight: 700, fontSize: 12 }}>
                {ct.required ? "REQUIRED" : "RECOMMENDED"}
              </span>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div><span style={{ color: "#9BA3B8″ }}>Typical Cost: </span><span style={{ color: "#F5E642", fontWeight: 700 }}>{ct.cost}</span></div>
              <div><span style={{ color: "#9BA3B8″ }}>Borings: </span><span style={{ color: "#FFFFFF" }}>{ct.borings}</span></div>
              <div><span style={{ color: "#9BA3B8″ }}>Foundation Type: </span><span style={{ color: "#FFFFFF" }}>{ct.foundationType}</span></div>
              <div><span style={{ color: "#9BA3B8″ }}>When to Order: </span><span style={{ color: "#FFFFFF" }}>{ct.timing}</span></div>
              <div>
                <span style={{ color: "#9BA3B8″ }}>Key Tests: </span>
                <span style={{ color: "#FFFFFF" }}>{ct.keyTests.join(", ")}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33″, borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642″ }}>ProLnk DFW:</strong> Connect with licensed geotechnical engineers and structural engineers across the Metroplex. Get proposals within 24 hours.
        </div>
      </div>
    </div>
  );
}