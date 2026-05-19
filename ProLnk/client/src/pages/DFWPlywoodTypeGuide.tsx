import { useState } from 'react';

const plywoodMatrix = [
  { project: "Roof sheathing", exposure: "Outdoor exposed", grade: "CDX", thickness: "1/2\" (15/32\")", cost: "$35–45/sheet", note: "Standard DFW roofing — bonds well under felt and shingles" },
  { project: "Roof sheathing", exposure: "High humidity zone", grade: "OSB with edge seal", thickness: "7/16\"", cost: "$22–30/sheet", note: "Most DFW builders use OSB — seal edges to prevent swelling" },
  { project: "Subfloor", exposure: "Interior", grade: "T&G OSB 23/32\"", thickness: "23/32\"", cost: "$42–52/sheet", note: "Tongue-and-groove prevents squeaking in DFW's shifting soils" },
  { project: "Subfloor", exposure: "Crawl space moisture", grade: "ACX", thickness: "3/4\"", cost: "$65–80/sheet", note: "DFW crawl spaces get humid — ACX resists delamination" },
  { project: "Exterior wall sheathing", exposure: "Outdoor", grade: "CDX or ZIP System", thickness: "7/16\"", cost: "$28–55/sheet", note: "ZIP System preferred for DFW energy codes — tape seams" },
  { project: "Cabinet box", exposure: "Interior dry", grade: "Cabinet-grade birch plywood", thickness: "3/4\"", cost: "$75–95/sheet", note: "DFW humidity is lower indoors — birch holds paint and finish" },
  { project: "Outdoor deck", exposure: "Full weather", grade: "Marine grade or use composite", thickness: "3/4\"", cost: "$110–150/sheet", note: "DFW UV and rain cycles destroy standard ply — marine or composite only" },
  { project: "Fence backer panel", exposure: "Outdoor", grade: "CDX", thickness: "1/2\"", cost: "$35–45/sheet", note: "Paint all edges — DFW rain season will delaminate unsealed CDX" },
];

export default function DFWPlywoodTypeGuide() {
  const [project, setProject] = useState("");
  const [exposure, setExposure] = useState("");

  const result = plywoodMatrix.find(r => r.project === project && r.exposure === exposure);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🪵</div>
        <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", marginBottom: "0.5rem" }}>DFW Plywood Type Guide</h1>
        <p style={{ color: "#9BA3B5″, marginBottom: "2rem" }}>CDX vs ACX vs OSB vs marine grade — matched to DFW's humidity, UV, and shifting-soil conditions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "CDX", desc: "Construction grade, one side sanded. Outdoor sheathing, roofing, fencing. Not finish-quality.", icon: "📦" },
            { label: "ACX", desc: "One smooth face, exterior glue. Good for moisture-exposed applications where appearance matters.", icon: "✨" },
            { label: "OSB", desc: "Oriented strand board. Cheaper than plywood, common in DFW new construction — seal all edges.", icon: "🏗️" },
          ].map(item => (
            <div key={item.label} style={{ background: "#1A2840″, borderRadius: 8, padding: "1.25rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>{item.label}</div>
              <p style={{ color: "#9BA3B5″, fontSize: "0.85rem", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem", marginBottom: "2rem" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🌡️ How DFW Humidity Affects Plywood</h3>
          <p style={{ color: "#9BA3B5″, lineHeight: 1.7 }}>DFW averages 60–70% outdoor humidity in spring and fall. OSB swells at edges when wet — always seal cuts. CDX delamination happens fast in DFW rain seasons. Interior applications are more forgiving due to AC keeping humidity below 50% most of the year.</p>
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0 }}>Match Your Project</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>DFW Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select project...</option>
                {[...new Set(plywoodMatrix.map(r => r.project))].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9BA3B5″, display: "block", marginBottom: "0.5rem" }}>Exposure Condition</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628″, color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
                <option value="">Select exposure...</option>
                {[...new Set(plywoodMatrix.map(r => r.exposure))].map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: "#0D2A1A", borderRadius: 8, padding: "1.5rem", border: "2px solid #F5E642″ }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>GRADE</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.grade}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>THICKNESS</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.thickness}</div></div>
                <div><div style={{ color: "#9BA3B5″, fontSize: "0.8rem" }}>DFW COST/SHEET</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.cost}</div></div>
              </div>
              <div style={{ color: "#9BA3B5″, borderTop: "1px solid #2A3A50", paddingTop: "1rem" }}>💡 {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1A2840″, borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#9BA3B5″, margin: "0 0 1rem" }}>Need a DFW carpenter or framer who specs materials correctly?</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Find a DFW Carpenter on ProLnk</button>
        </div>
      </div>
    </div>
  );
}
