import { useState } from 'react';

const jobTypes = [
  { label: "Slab Leak Detection", icon: "🔍", low: 150, high: 300, note: "Electronic / camera detection", detail: "1–2 hrs on-site · Report included" },
  { label: "Slab Leak Spot Repair", icon: "🔧", low: 1500, high: 3000, note: "Dig, repair, patch concrete", detail: "Includes concrete repair patch" },
  { label: "Slab Reroute", icon: "📐", low: 5000, high: 12000, note: "New lines run above slab", detail: "Avoids slab damage entirely" },
  { label: "Whole-Home Repipe", icon: "🏠", low: 8000, high: 15000, note: "All supply lines replaced", detail: "CPVC or PEX, 3–5 days" },
  { label: "Water Heater (Tank)", icon: "🔥", low: 800, high: 1500, note: "40–50 gal installation", detail: "Parts + labor, standard swap" },
  { label: "Water Heater (Tankless)", icon: "⚡", low: 1800, high: 3500, note: "On-demand install + gas line", detail: "Energy savings offset cost" },
  { label: "Drain Line Repair", icon: "🚰", low: 500, high: 2500, note: "Section replace or reline", detail: "Camera inspection recommended" },
  { label: "Water Pressure Regulator", icon: "🎚️", low: 200, high: 400, note: "PRV replacement", detail: "DFW water pressure often >80 psi" },
];

export default function DFWPlumbingCostBreakdown2026() {
  const [selected, setSelected] = useState(0);

  const job = jobTypes[selected];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F5E642", margin: "0 0 8px" }}>DFW Plumbing Cost Breakdown 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Per-job plumbing costs for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {jobTypes.map((j, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#162035" : "#0f1f3d", border: "2px solid", borderColor: selected === i ? "#F5E642" : "#1e3a5f", borderRadius: 10, padding: "14px 12px", textAlign: "left", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{j.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: selected === i ? "#F5E642" : "#94a3b8" }}>{j.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginTop: 4 }}>${j.low.toLocaleString()}–${j.high.toLocaleString()}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "2px solid #F5E642", borderRadius: 14, padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{job.icon}</div>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{job.label}</h2>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: "12px 0 6px" }}>${job.low.toLocaleString()} – ${job.high.toLocaleString()}</div>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }}>{job.note}</div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 6 }}>WHAT'S INCLUDED</div>
            <div style={{ color: "#cbd5e1", fontSize: 14 }}>{job.detail}</div>
          </div>
          <div style={{ marginTop: 20, padding: "14px 16px", background: "#0A1628", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>DFW AVERAGE</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#F5E642" }}>${Math.round((job.low + job.high) / 2).toLocaleString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>GET 3 QUOTES</div>
              <a href="https://prolnk.io" style={{ color: "#F5E642", fontWeight: 700, textDecoration: "none", fontSize: 14 }}>prolnk.io →</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, background: "#0f1f3d", borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 700, color: "#F5E642", fontSize: 13, marginBottom: 10 }}>⚠️ DFW PLUMBING WATCHOUTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Clay soil expands/contracts → slab leaks common", "Hard water accelerates water heater corrosion", "Older DFW homes may have galvanized pipes", "Always pull city permit for major plumbing work"].map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: "#94a3b8", padding: "8px 10px", background: "#0A1628", borderRadius: 8 }}>• {t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}