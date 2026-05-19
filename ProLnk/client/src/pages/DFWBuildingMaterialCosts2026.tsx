import { useState } from 'react';

const projectTypes = [
  { label: "Wood Framing", icon: "🪵", materials: [{ name: "2x4x8 Stud", price: "$4–5 ea", note: "Pine stud, standard framing" }, { name: "2x6x8 Stud", price: "$6–8 ea", note: "Exterior wall framing" }, { name: "LVL Beam (3.5\"x9.5\"x16ft)", price: "$180–220 ea", note: "Header beams, supply-chain sensitive" }] },
  { label: "Drywall", icon: "🧱", materials: [{ name: "1/2\" Drywall Sheet (4x8)", price: "$12–15 ea", note: "Standard interior walls" }, { name: "5/8\" Fire-Rated Sheet", price: "$16–20 ea", note: "Garage walls, fire separation" }, { name: "Moisture-Resistant (4x8)", price: "$18–22 ea", note: "DFW bathrooms, high-humidity areas" }] },
  { label: "Concrete & Masonry", icon: "🏗️", materials: [{ name: "Concrete Block (8x8x16)", price: "$2–3 ea", note: "CMU block, widely stocked in DFW" }, { name: "Rebar #4 (10ft)", price: "$8–12 ea", note: "Fluctuates with steel market" }, { name: "Concrete Mix (80lb bag)", price: "$6–8 ea", note: "Quikrete at DFW box stores" }] },
  { label: "Sheathing & Plywood", icon: "📋", materials: [{ name: "1/2\" OSB (4x8)", price: "$20–28 ea", note: "Wall/roof sheathing" }, { name: "3/4\" Plywood (4x8)", price: "$38–48 ea", note: "Subfloor, higher quality" }, { name: "1/2\" CDX Plywood (4x8)", price: "$30–40 ea", note: "Roof decking standard" }] },
];

export default function DFWBuildingMaterialCosts2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = projectTypes.find(p => p.label === selected);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📊</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Building Material Costs 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Current material prices in the Dallas-Fort Worth metro</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>⚠️ Supply Chain Note</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>DFW pricing is 5–10% above national average due to high construction demand. Lumber and steel fluctuate monthly. Contractor supply houses often beat box-store prices by 15–20% on volume orders.</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>Select Material Category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {projectTypes.map(p => (
            <button key={p.label} onClick={() => setSelected(p.label)}
              style={{ backgroundColor: selected === p.label ? "#F5E642″ : "#111f3a", color: selected === p.label ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "14px", cursor: "pointer", fontWeight: 600, fontSize: 14, textAlign: "left" }}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 24, border: "2px solid #F5E642″ }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 16px", fontSize: 18 }}>{result.icon} {result.label} — DFW 2026 Prices</h3>
            {result.materials.map(m => (
              <div key={m.name} style={{ borderBottom: "1px solid #1e3a5f", padding: "12px 0″ }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</span>
                  <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16 }}>{m.price}</span>
                </div>
                <div style={{ color: "#94a3b8″, fontSize: 12, marginTop: 4 }}>{m.note}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 12, backgroundColor: "#0A1628″, borderRadius: 8, fontSize: 13, color: "#94a3b8" }}>
              💡 ProLnk pros get contractor pricing — your matched pro can often source materials at 15–20% below retail.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
