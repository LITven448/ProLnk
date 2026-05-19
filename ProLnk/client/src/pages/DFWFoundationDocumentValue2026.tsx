import { useState } from 'react';

const scenarios = [
  {
    label: "No Known Foundation Issues",
    icon: "✅",
    impact: 0,
    color: "#22c55e",
    note: "Baseline — no discount or premium applied",
  },
  {
    label: "Undocumented Past Repair",
    icon: "⚠️",
    impact: -30000,
    color: "#f97316",
    note: "Red flag — buyers discount $20–$40K for unknown repair history",
  },
  {
    label: "Documented Repair + Active Warranty",
    icon: "📋",
    impact: 5000,
    color: "#22c55e",
    note: "Documented work with transferable warranty is neutral to slightly positive",
  },
  {
    label: "Foundation Watering Log (3+ yrs)",
    icon: "💧",
    impact: 8000,
    color: "#3b82f6",
    note: "Proactive watering records signal diligent ownership — buyers pay premium",
  },
  {
    label: "Known Active Movement (No Repair)",
    icon: "🚨",
    impact: -55000,
    color: "#ef4444",
    note: "Active movement with no repair = severe buyer discount / deal killer",
  },
  {
    label: "Pier-and-Beam + Full Inspection Report",
    icon: "🔍",
    impact: 3000,
    color: "#8b5cf6",
    note: "Pier-and-beam with clean recent inspection reassures buyers",
  },
  {
    label: "Engineer-Certified Stable Foundation",
    icon: "🏆",
    impact: 12000,
    color: "#F5E642",
    note: "Engineer cert + stability letter adds clear premium in DFW",
  },
];

export default function DFWFoundationDocumentValue2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [homeValue, setHomeValue] = useState(450000);

  const scenario = selected !== null ? scenarios[selected] : null;
  const adjustedValue = scenario ? homeValue + scenario.impact : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏗️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Foundation Documentation Value 2026</h1>
          <p style={{ color: "#94a3b8" }}>How foundation history and documentation affects DFW home value</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Home Base Value</h2>
          <input
            type="range" min={200000} max={1200000} step={25000} value={homeValue}
            onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642" }}
          />
          <p style={{ color: "#F5E642", fontSize: "1.4rem", fontWeight: "bold", margin: "0.5rem 0 0" }}>
            ${homeValue.toLocaleString()}
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>📂 Foundation History Scenario</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  background: "#162035",
                  border: selected === i ? `2px solid ${s.color}` : "1px solid #1e3a5f",
                  borderRadius: 8, padding: "0.75rem 1rem", textAlign: "left",
                  cursor: "pointer", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                <span>{s.icon} {s.label}</span>
                <span style={{ color: s.color, fontWeight: "bold" }}>
                  {s.impact > 0 ? "+" : ""}{s.impact !== 0 ? "$" + Math.abs(s.impact / 1000).toFixed(0) + "K" : "—"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {scenario && adjustedValue !== null && (
          <div style={{
            background: scenario.impact >= 0 ? "#0f2d1a" : "#2d0f0f",
            border: `1px solid ${scenario.color}`,
            borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem"
          }}>
            <h3 style={{ color: scenario.color, margin: "0 0 0.5rem" }}>📊 Foundation Value Impact</h3>
            <p style={{ fontSize: "2rem", color: "#F5E642", fontWeight: "bold", margin: "0.25rem 0" }}>
              {scenario.impact > 0 ? "+" : ""}{scenario.impact !== 0 ? (scenario.impact > 0 ? "$" + scenario.impact.toLocaleString() : "-$" + Math.abs(scenario.impact).toLocaleString()) : "No change"}
            </p>
            <p style={{ color: "#94a3b8" }}>{scenario.note}</p>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Estimated adjusted value: ${adjustedValue.toLocaleString()}
            </p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1rem", marginBottom: "0.75rem" }}>📌 DFW Foundation Insights 2026</h2>
          <ul style={{ color: "#94a3b8", paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>DFW clay soils move seasonally — foundation issues are extremely common</li>
            <li>Documentation transforms a red flag into a selling point</li>
            <li>Transferable warranties are the single most valuable foundation document</li>
            <li>Annual watering logs show proactive care — rare and valued by buyers</li>
            <li>Engineer-certified stable foundations command the strongest premiums</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW Foundation Intelligence 2026
        </div>
      </div>
    </div>
  );
}
