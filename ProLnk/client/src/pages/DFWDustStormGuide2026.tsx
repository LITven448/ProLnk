import { useState } from 'react';

const exposureLevels = [
  {
    level: "Low",
    desc: "Light dust haze, visibility > 5 miles",
    actions: [
      "Check & replace HVAC filter after event",
      "Wipe outdoor HVAC condenser fins with damp cloth",
      "Vacuum interior window sills",
    ],
  },
  {
    level: "Moderate",
    desc: "Visible dust cloud, visibility 1–5 miles",
    actions: [
      "Seal window gaps with draft stoppers",
      "Run HVAC in recirculation mode during event",
      "Cover outdoor condenser intake with loose cloth",
      "Clean all return air vents after storm passes",
      "Check attic intake vents for dust accumulation",
    ],
  },
  {
    level: "High",
    desc: "Full dust storm, visibility < 1 mile",
    actions: [
      "Shut off HVAC entirely during peak event",
      "Deploy portable air purifiers in sealed rooms",
      "Use wet towels at door thresholds",
      "Full HVAC duct inspection recommended post-storm",
      "Replace air filter immediately after storm",
      "Professional condenser cleaning within 48 hours",
    ],
  },
];

const seasons = [
  { name: "Spring (Mar–May)", risk: "HIGH", source: "West Texas / Permian Basin dry soil" },
  { name: "Summer (Jun–Aug)", risk: "MODERATE", source: "Drought-stressed DFW soils + SW winds" },
  { name: "Fall (Sep–Nov)", risk: "LOW", source: "Post-harvest agricultural dust" },
  { name: "Winter (Dec–Feb)", risk: "LOW", source: "Rare, cold-front driven events" },
];

export default function DFWDustStormGuide2026() {
  const [sel, setSel] = useState(0);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌪️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Dust Storm Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>West Texas dust haboobs reach DFW in spring and summer — here is how to protect your home and HVAC.</p>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 12 }}>📅 Seasonal Dust Risk</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {seasons.map((s, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                  <div style={{ color: "#64748b", fontSize: 12 }}>{s.source}</div>
                </div>
                <span style={{
                  background: s.risk === "HIGH" ? "#F5E642" : s.risk === "MODERATE" ? "#f59e0b" : "#1a3a5c",
                  color: s.risk === "LOW" ? "#94a3b8" : "#0A1628",
                  borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700
                }}>{s.risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 14 }}>🏠 Dust Exposure Level → Action Plan</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {exposureLevels.map((e, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                flex: 1, background: sel === i ? "#F5E642" : "#1a3a5c",
                color: sel === i ? "#0A1628" : "#fff",
                border: "none", borderRadius: 8, padding: "10px 6px", cursor: "pointer", fontWeight: 700, fontSize: 13
              }}>{e.level}</button>
            ))}
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>{exposureLevels[sel].desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {exposureLevels[sel].actions.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#0A1628", borderRadius: 8, padding: "10px 14px" }}>
                <span style={{ color: "#F5E642" }}>🔧</span>
                <span style={{ color: "#e2e8f0", fontSize: 14 }}>{a}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>⚠️ HVAC Condenser Care After Dust Events</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>
            Dust-clogged condenser fins reduce efficiency by up to 30% and can cause compressor failure in extreme cases.
            After any moderate or high dust event: hose down condenser fins top-to-bottom with low pressure, check refrigerant line insulation for abrasion, and verify airflow is unobstructed.
          </p>
        </div>
      </div>
    </div>
  );
}
