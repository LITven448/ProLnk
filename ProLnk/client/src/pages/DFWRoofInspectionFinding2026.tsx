import { useState } from 'react';

const stormTypes = [
  { label: "Hail Storm", checklist: ["📸 Time-stamp photos from multiple angles", "📏 Measure hail impact diameter with ruler", "🔍 Document granule loss on shingles", "🪛 Check AC fins, vents, gutters for dents", "🌀 Note dent patterns on skylights", "📝 Log date/time of storm event", "📱 Contact ProLnk for roofing estimate immediately"] },
  { label: "Wind Storm", checklist: ["📸 Photograph lifted or missing shingles", "📏 Measure exposed decking areas", "🔍 Check ridge caps and hip shingles", "🪛 Inspect fascia and soffits for damage", "🌀 Document any debris impact marks", "📝 Note wind direction and estimated speed", "📱 Contact ProLnk for emergency tarping"] },
  { label: "Hail + Wind", checklist: ["📸 Document all storm damage separately by type", "📏 Measure hail diameter AND assess wind lift zones", "🔍 Full perimeter soft metal inspection", "🪛 Check all penetrations (pipes, vents, skylights)", "🌀 Document granule accumulation in gutters", "📝 Create timestamped photo log with GPS", "📱 Request full DFW storm damage assessment via ProLnk"] },
];

export default function DFWRoofInspectionFinding2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Post-Storm Roof Inspection Findings Guide 2026</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>What to document after DFW hail or wind — before calling your insurance company</p>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>⚡ Select Your Storm Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {stormTypes.map((s, i) => (
              <button key={i} onClick={() => { setSelected(i); setActiveItem(null); }} style={{ padding: "0.6rem 1.2rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: selected === i ? "#F5E642" : "transparent", color: selected === i ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer" }}>{s.label}</button>
            ))}
          </div>
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📋 Documentation Checklist — {stormTypes[selected].label}</h2>
            {stormTypes[selected].checklist.map((item, i) => (
              <div key={i} onClick={() => setActiveItem(activeItem === i ? null : i)} style={{ padding: "0.75rem 1rem", marginBottom: "0.5rem", borderRadius: 8, backgroundColor: activeItem === i ? "#1e3a5f" : "#0d2040″, cursor: "pointer", borderLeft: activeItem === i ? "3px solid #F5E642" : "3px solid transparent", transition: "all 0.2s" }}>
                <span style={{ fontSize: "0.95rem" }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📏 Hail Impact Documentation Standards</h2>
          {[["Dime size (0.75\")", "Minor — document but may not reach claim threshold"],["Quarter size (0.96\")", "Moderate — typically claim-worthy in DFW"],["Golf ball (1.68\")", "Severe — immediate structural review required"],["Egg size (2.0\"+)", "Critical — emergency inspection needed"]].map(([size, note], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0″, borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>
              <span style={{ color: "#F5E642″, fontWeight: 600 }}>{size}</span>
              <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{note}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>📱 Get Your DFW Roofing Estimate on ProLnk — Free, Fast, No Obligation</p>
        </div>
      </div>
    </div>
  );
}
