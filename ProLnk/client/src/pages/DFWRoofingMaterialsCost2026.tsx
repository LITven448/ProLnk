import { useState } from 'react';

const materials = [
  { name: "Architectural Shingles", unit: "per sqft", low: 1.20, high: 1.80, icon: "🏠", note: "Most common in DFW" },
  { name: "Class 4 Impact-Resistant Shingles", unit: "per sqft", low: 1.80, high: 2.50, icon: "🛡️", note: "Insurance discount eligible" },
  { name: "Synthetic Underlayment", unit: "per sqft", low: 0.20, high: 0.30, icon: "📋", note: "Required in DFW code" },
  { name: "Ridge Cap", unit: "per linear ft", low: 0.50, high: 0.80, icon: "⛰️", note: "Hip & ridge finishing" },
  { name: "Ice & Water Shield", unit: "per sqft", low: 0.60, high: 1.00, icon: "❄️", note: "Valleys, eaves, flashings" },
  { name: "Drip Edge Metal", unit: "per linear ft", low: 0.15, high: 0.30, icon: "🔩", note: "Perimeter code requirement" },
];

const sizes = [
  { label: "1,500 sqft home", sqft: 1500, ridgeFt: 60, drip: 160 },
  { label: "2,000 sqft home", sqft: 2000, ridgeFt: 75, drip: 185 },
  { label: "2,500 sqft home", sqft: 2500, ridgeFt: 90, drip: 210 },
  { label: "3,000 sqft home", sqft: 3000, ridgeFt: 105, drip: 235 },
];

export default function DFWRoofingMaterialsCost2026() {
  const [selectedSize, setSelectedSize] = useState(1);
  const [shingleType, setShingleType] = useState(0);

  const size = sizes[selectedSize];
  const shingle = shingleType === 0 ? materials[0] : materials[1];
  const totalLow =
    shingle.low * size.sqft +
    materials[2].low * size.sqft +
    materials[3].low * size.ridgeFt +
    materials[4].low * (size.sqft * 0.12) +
    materials[5].low * size.drip;
  const totalHigh =
    shingle.high * size.sqft +
    materials[2].high * size.sqft +
    materials[3].high * size.ridgeFt +
    materials[4].high * (size.sqft * 0.12) +
    materials[5].high * size.drip;

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F5E642″, margin: "0 0 8px" }}>DFW Roofing Material Cost Breakdown 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>Per-unit material costs for Dallas-Fort Worth roofing projects</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {materials.map((m, i) => (
            <div key={i} style={{ background: "#0f1f3d", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#F5E642″, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>${m.low.toFixed(2)}–${m.high.toFixed(2)} <span style={{ fontSize: 12, color: "#94a3b8″ }}>{m.unit}</span></div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{m.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "1px solid #F5E642″, borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Estimate Your DFW Material Cost</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: "#94a3b8″, fontSize: 12, display: "block", marginBottom: 6 }}>HOME SIZE</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {sizes.map((s, i) => (
                <button key={i} onClick={() => setSelectedSize(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: selectedSize === i ? "#F5E642″ : "#1e3a5f", background: selectedSize === i ? "#F5E642" : "transparent", color: selectedSize === i ? "#0A1628" : "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{s.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, fontSize: 12, display: "block", marginBottom: 6 }}>SHINGLE TYPE</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["Architectural", "Class 4 Impact-Resistant"].map((t, i) => (
                <button key={i} onClick={() => setShingleType(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: shingleType === i ? "#F5E642″ : "#1e3a5f", background: shingleType === i ? "#F5E642" : "transparent", color: shingleType === i ? "#0A1628" : "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#94a3b8″, marginBottom: 8 }}>Estimated Material Cost — {size.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″ }}>${Math.round(totalLow).toLocaleString()} – ${Math.round(totalHigh).toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>Materials only · Labor typically adds 60–80% · Get 3 DFW quotes via ProLnk</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24, padding: 16, background: "#0f1f3d", borderRadius: 10 }}>
          <span style={{ fontSize: 13, color: "#94a3b8″ }}>Get matched with vetted DFW roofers → </span>
          <a href="https://prolnk.io" style={{ color: "#F5E642″, fontWeight: 700, textDecoration: "none" }}>prolnk.io</a>
        </div>
      </div>
    </div>
  );
}