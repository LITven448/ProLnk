import { useState } from 'react';

const jobTypes = [
  { label: "Add Outlet", icon: "🔌", low: 150, high: 250, note: "Single outlet, standard 20A", detail: "Includes box, wire run, cover plate" },
  { label: "Add Circuit", icon: "⚡", low: 300, high: 500, note: "New breaker + dedicated run", detail: "Appliance, EV, or specialty circuits" },
  { label: "Panel Upgrade 100→200A", icon: "🔋", low: 2800, high: 5000, note: "Full panel swap + inspection", detail: "Required for modern DFW home loads" },
  { label: "Whole-Home Rewire", icon: "🏠", low: 8000, high: 15000, note: "All branch circuits replaced", detail: "Aluminum or knob-and-tube removal" },
  { label: "EV Charger Install", icon: "🚗", low: 800, high: 1500, note: "Level 2 NEMA 14-50 or hardwired", detail: "Includes 50A circuit, outdoor outlet" },
  { label: "GFCI Outlet Install", icon: "🛡️", low: 35, high: 50, note: "Per outlet installed", detail: "Code required: baths, kitchen, garage" },
  { label: "Ceiling Fan Install", icon: "💨", low: 150, high: 300, note: "Existing box or new brace", detail: "Includes switch leg if needed" },
  { label: "Smoke Detector Wiring", icon: "🚨", low: 75, high: 150, note: "Per detector, hardwired", detail: "Interconnected per DFW code" },
];

export default function DFWElectricalCostBreakdown2026() {
  const [selected, setSelected] = useState(2);

  const job = jobTypes[selected];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#F5E642″, margin: "0 0 8px" }}>DFW Electrical Cost Breakdown 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>Per-job electrical costs for Dallas-Fort Worth homeowners</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {jobTypes.map((j, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#162035″ : "#0f1f3d", border: "2px solid", borderColor: selected === i ? "#F5E642" : "#1e3a5f", borderRadius: 10, padding: "14px 12px", textAlign: "left", cursor: "pointer" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{j.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: selected === i ? "#F5E642″ : "#94a3b8" }}>{j.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 4 }}>${j.low.toLocaleString()}–${j.high.toLocaleString()}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "2px solid #F5E642″, borderRadius: 14, padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{job.icon}</div>
          <h2 style={{ color: "#F5E642″, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{job.label}</h2>
          <div style={{ fontSize: 40, fontWeight: 800, color: "#fff", margin: "12px 0 6px" }}>${job.low.toLocaleString()} – ${job.high.toLocaleString()}</div>
          <div style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 16 }}>{job.note}</div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6 }}>WHAT'S INCLUDED</div>
            <div style={{ color: "#cbd5e1″, fontSize: 14 }}>{job.detail}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>DFW AVERAGE</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#F5E642″ }}>${Math.round((job.low + job.high) / 2).toLocaleString()}</div>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>GET 3 QUOTES</div>
              <a href="https://prolnk.io" style={{ color: "#F5E642″, fontWeight: 700, textDecoration: "none", fontSize: 18 }}>prolnk.io →</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, background: "#0f1f3d", borderRadius: 10, padding: 16 }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 13, marginBottom: 10 }}>⚡ DFW ELECTRICAL TIPS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Panel permits required by all DFW cities", "Licensed TECL required for all work in Texas", "Inspect older DFW homes for aluminum wiring", "EV charger rebates available via Oncor"].map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: "#94a3b8″, padding: "8px 10px", background: "#0A1628", borderRadius: 8 }}>• {t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}