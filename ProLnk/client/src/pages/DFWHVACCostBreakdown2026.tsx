import { useState } from 'react';

const jobTypes = [
  { label: "Service Call", icon: "🔧", low: 85, high: 150, note: "Diagnostic visit, no parts", detail: "DFW summer demand spikes pricing" },
  { label: "Capacitor Replace", icon: "🔋", low: 150, high: 350, note: "Start or run capacitor", detail: "Most common DFW summer repair" },
  { label: "Contactor Replace", icon: "⚡", low: 200, high: 350, note: "Outdoor condenser contactor", detail: "Fails from DFW heat/lightning" },
  { label: "Evaporator Coil", icon: "❄️", low: 800, high: 1500, note: "Indoor coil replacement", detail: "Includes refrigerant recharge" },
  { label: "Compressor Replace", icon: "💪", low: 1200, high: 2500, note: "Outdoor compressor only", detail: "Often better to replace full system" },
  { label: "3-Ton System Replace", icon: "🏠", low: 5000, high: 8000, note: "Full system, avg DFW home", detail: "14 SEER2 min, install included" },
  { label: "Refrigerant Recharge", icon: "🌡️", low: 250, high: 600, note: "R-410A or R-22 (legacy)", detail: "Leak test included, per pound" },
  { label: "Duct Sealing", icon: "🌬️", low: 300, high: 800, note: "Mastic seal + insulation wrap", detail: "Up to 30% efficiency gain in DFW" },
];

export default function DFWHVACCostBreakdown2026() {
  const [selected, setSelected] = useState(5);

  const job = jobTypes[selected];
  const avgCost = Math.round((job.low + job.high) / 2);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>❄️</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F5E642", margin: "0 0 8px" }}>DFW HVAC Cost Breakdown 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Per-job HVAC costs for Dallas-Fort Worth homeowners</p>
          <div style={{ marginTop: 10, display: "inline-block", background: "#162035", border: "1px solid #F5E642", borderRadius: 20, padding: "4px 14px", fontSize: 12, color: "#F5E642" }}>⚠️ Book 6+ weeks ahead in DFW summer — demand peaks June–Aug</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {jobTypes.map((j, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#162035" : "#0f1f3d", border: "2px solid", borderColor: selected === i ? "#F5E642" : "#1e3a5f", borderRadius: 10, padding: "14px 12px", textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{j.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: selected === i ? "#F5E642" : "#94a3b8" }}>{j.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 4 }}>${j.low.toLocaleString()}–${j.high.toLocaleString()}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "2px solid #F5E642", borderRadius: 14, padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{job.icon}</div>
          <h2 style={{ color: "#F5E642", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{job.label}</h2>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: "12px 0 6px" }}>${job.low.toLocaleString()} – ${job.high.toLocaleString()}</div>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }}>{job.note}</div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>DFW CONTEXT</div>
            <div style={{ color: "#cbd5e1", fontSize: 14 }}>{job.detail}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>DFW AVERAGE</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#F5E642" }}>${avgCost.toLocaleString()}</div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>GET 3 QUOTES</div>
              <a href="https://prolnk.io" style={{ color: "#F5E642", fontWeight: 700, textDecoration: "none", fontSize: 18 }}>prolnk.io →</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, background: "#0f1f3d", borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 700, color: "#F5E642", fontSize: 13, marginBottom: 10 }}>🌡️ DFW HVAC FACTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["DFW averages 100°F+ days require larger systems", "TDLR license required for all Texas HVAC work", "14 SEER2 minimum as of Jan 2023 federal standard", "Oncor rebates available for high-efficiency units"].map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: "#94a3b8", padding: "8px 10px", background: "#0A1628", borderRadius: 8 }}>• {t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}