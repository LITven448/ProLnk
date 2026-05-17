import { useState } from 'react';

const components = [
  { name: "Steel Push Pier", unit: "per pier", low: 400, high: 600, icon: "🔩", note: "Most common in DFW clay soil" },
  { name: "Helical Pier", unit: "per pier", low: 450, high: 700, icon: "🌀", note: "Used in loose or sandy soil" },
  { name: "Engineer Report", unit: "flat", low: 400, high: 700, icon: "📐", note: "Required before any repair" },
  { name: "Concrete Crack Repair", unit: "per job", low: 300, high: 600, icon: "🏗️", note: "Surface sealing & epoxy" },
  { name: "Interior Drain System", unit: "per linear ft", low: 25, high: 50, icon: "🚰", note: "French drain / sump pump" },
  { name: "Mudjacking / Foam Lift", unit: "per sqft", low: 3, high: 8, icon: "⬆️", note: "Concrete slab leveling" },
];

const scopes = [
  { label: "Minor (6 piers)", piers: 6, drainFt: 0, concrete: true, foam: false },
  { label: "Moderate (12 piers)", piers: 12, drainFt: 40, concrete: true, foam: false },
  { label: "Major (20 piers)", piers: 20, drainFt: 80, concrete: true, foam: true },
  { label: "Full Perimeter (28 piers)", piers: 28, drainFt: 120, concrete: true, foam: true },
];

export default function DFWFoundationCostBreakdown2026() {
  const [scope, setScope] = useState(1);
  const [pierType, setPierType] = useState(0);

  const s = scopes[scope];
  const pierRate = pierType === 0 ? components[0] : components[1];
  const lowTotal = pierRate.low * s.piers + components[2].low + (s.concrete ? components[3].low : 0) + (s.drainFt > 0 ? components[4].low * s.drainFt : 0) + (s.foam ? components[5].low * 200 : 0);
  const highTotal = pierRate.high * s.piers + components[2].high + (s.concrete ? components[3].high : 0) + (s.drainFt > 0 ? components[4].high * s.drainFt : 0) + (s.foam ? components[5].high * 200 : 0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F5E642", margin: "0 0 8px" }}>DFW Foundation Repair Cost Breakdown 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Per-component pricing for Dallas-Fort Worth foundation repairs</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {components.map((c, i) => (
            <div key={i} style={{ background: "#0f1f3d", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#F5E642", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>${c.low.toLocaleString()}–${c.high.toLocaleString()} <span style={{ fontSize: 12, color: "#94a3b8" }}>{c.unit}</span></div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "1px solid #F5E642", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📊 Estimate Your DFW Foundation Repair</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>REPAIR SCOPE</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {scopes.map((sc, i) => (
                <button key={i} onClick={() => setScope(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: scope === i ? "#F5E642" : "#1e3a5f", background: scope === i ? "#F5E642" : "transparent", color: scope === i ? "#0A1628" : "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{sc.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>PIER TYPE</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["Steel Push Pier", "Helical Pier"].map((t, i) => (
                <button key={i} onClick={() => setPierType(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid", borderColor: pierType === i ? "#F5E642" : "#1e3a5f", background: pierType === i ? "#F5E642" : "transparent", color: pierType === i ? "#0A1628" : "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>Estimated Total — {scopes[scope].label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#F5E642" }}>${Math.round(lowTotal).toLocaleString()} – ${Math.round(highTotal).toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>Includes engineer report · Get 3 DFW foundation quotes via ProLnk</div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 24, padding: 16, background: "#0f1f3d", borderRadius: 10 }}>
          <span style={{ fontSize: 13, color: "#94a3b8" }}>Get matched with vetted DFW foundation pros → </span>
          <a href="https://prolnk.io" style={{ color: "#F5E642", fontWeight: 700, textDecoration: "none" }}>prolnk.io</a>
        </div>
      </div>
    </div>
  );
}