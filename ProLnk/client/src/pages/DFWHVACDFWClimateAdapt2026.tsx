import { useState } from 'react';

const concerns = [
  {
    label: "Longer Cooling Seasons",
    icon: "📅",
    detail: "DFW's effective cooling season has extended 2-3 weeks compared to 1990 baselines. First 90°F days now arrive in late April; last 90°F days push into late October. Systems that once ran 5 months now run 7. Annual runtime has increased ~35% — compressing equipment lifecycles and increasing maintenance frequency.",
    adapt: "Variable-speed compressors: run longer at lower capacity instead of constant on/off cycling. Extends equipment life by 30-40% under extended-season conditions.",
  },
  {
    label: "More 100°F+ Days",
    icon: "🌡️",
    detail: "DFW averaged 18 days per year above 100°F in the 1990s. Current 10-year average: 27 days. Extreme heat days above 105°F — once rare — now occur 3-5 times per summer. Peak demand on home HVAC systems has increased substantially, with more systems failing at the worst possible times.",
    adapt: "Whole-home dehumidification: reduces felt temperature by 4-6°F, allowing thermostats to be set higher while maintaining comfort. Reduces peak load demand.",
  },
  {
    label: "ERCOT Strain & Uri",
    icon: "⚡",
    detail: "Winter Storm Uri (Feb 2021) exposed catastrophic vulnerabilities in Texas grid infrastructure. Summer 2023 saw multiple grid emergency alerts during peak cooling demand. ERCOT demand-response programs now incentivize smart thermostat participation across DFW. Grid reliability has become a home resilience issue.",
    adapt: "Smart thermostats + demand-response enrollment: automatically pre-cool homes before grid emergencies, maintain comfort while reducing peak grid strain. Utility rebates available.",
  },
  {
    label: "Variable-Speed Surge",
    icon: "🔄",
    detail: "Variable-speed HVAC systems are gaining DFW market share faster than any other US metro — driven specifically by climate adaptation needs. These systems modulate compressor speed to match exact cooling demand, resulting in better humidity control, lower energy bills, and longer equipment life under DFW's extended high-heat conditions.",
    adapt: "Variable-speed adoption in DFW: up 340% since 2019. ProLnk connects homeowners with certified variable-speed installation specialists across all DFW service areas.",
  },
];

export default function DFWHVACDFWClimateAdapt2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>DFW HVAC Climate Adaptation Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>How DFW HVAC has evolved to meet an increasingly demanding climate</p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "20px 24px", marginBottom: 36, color: "#0A1628" }}>
          <strong>The Reality:</strong> DFW's climate is changing faster than most US metros. Longer cooling seasons, more extreme heat days, and grid strain events are driving rapid HVAC technology adoption — and a surge in system upgrades. ProLnk’s timing is perfect.
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {concerns.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#F5E642″ : "#1e2d45",
                color: selected === i ? "#0A1628″ : "#94a3b8",
                border: "none", borderRadius: 8, padding: "8px 14px",
                cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{concerns[selected].icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F5E642″, margin: "0 0 16px" }}>{concerns[selected].label}</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{concerns[selected].detail}</p>
          <div style={{ background: "#0A1628″, borderRadius: 8, padding: "14px 18px", borderLeft: "4px solid #F5E642" }}>
            <span style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>🔧 Adaptation: </span>
            <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{concerns[selected].adapt}</span>
          </div>
        </div>

        <div style={{ marginTop: 32, background: "#1e2d45″, borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#F5E642″, fontWeight: 700, marginTop: 0 }}>🏆 ProLnk's Climate Advantage</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.6, margin: 0 }}>
            Climate adaptation is driving a DFW HVAC upgrade cycle unlike anything since central air first arrived in the 1970s. ProLnk connects homeowners with the certified specialists who understand DFW-specific climate challenges — variable-speed, dehumidification, demand-response, and grid-resilient systems.
          </p>
        </div>
      </div>
    </div>
  );
}
