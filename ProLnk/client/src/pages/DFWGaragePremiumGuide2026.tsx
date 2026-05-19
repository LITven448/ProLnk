import { useState } from 'react';

const garageOptions = [
  { label: "No Garage", icon: "❌", impact: -20000, note: "Below DFW standard — significant buyer resistance" },
  { label: "1-Car Garage", icon: "🚗", impact: -8000, note: "Below average — buyers expect 2-car minimum" },
  { label: "2-Car Garage", icon: "🚘", impact: 0, note: "DFW standard — neutral to baseline value" },
  { label: "3-Car Garage", icon: "🚙", impact: 15000, note: "Above average — high demand in Frisco, Prosper, Allen" },
  { label: "Tandem 2-Car", icon: "🔄", impact: -3000, note: "Less desirable than side-by-side — slight discount" },
  { label: "Workshop-Upgraded Garage", icon: "🔧", impact: 12000, note: "Epoxy floors, built-ins, storage — premium appeal" },
  { label: "EV Charger Installed", icon: "⚡", impact: 6500, note: "Level 2 charger adds $5–8K in 2026 DFW market" },
  { label: "Oversized RV/Boat Bay", icon: "🚐", impact: 10000, note: "Niche but strong demand in suburban/rural DFW" },
];

export default function DFWGaragePremiumGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [homeValue, setHomeValue] = useState(450000);
  const [hasEV, setHasEV] = useState(false);

  const option = selected !== null ? garageOptions[selected] : null;

  const totalImpact = () => {
    if (!option) return null;
    return option.impact + (hasEV && selected !== 6 ? garageOptions[6].impact : 0);
  };

  const impact = totalImpact();

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Garage Value Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>How your garage configuration affects DFW home value</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Home Base Value</h2>
          <input
            type="range" min={200000} max={1200000} step={25000} value={homeValue}
            onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642″ }}
          />
          <p style={{ color: "#F5E642″, fontSize: "1.4rem", fontWeight: "bold", margin: "0.5rem 0 0" }}>
            ${homeValue.toLocaleString()}
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🚗 Select Garage Configuration</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {garageOptions.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? "#F5E642″ : "#162035",
                  color: selected === i ? "#0A1628″ : "#fff",
                  border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem 1rem",
                  textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                <span>{g.icon} {g.label}</span>
                <span style={{ fontWeight: "bold", color: selected === i ? "#0A1628″ : g.impact >= 0 ? "#22c55e" : "#ef4444" }}>
                  {g.impact >= 0 ? "+" : ""}{g.impact >= 0 ? "$" + (g.impact / 1000).toFixed(0) + "K" : "-$" + Math.abs(g.impact / 1000).toFixed(0) + "K"}
                </span>
              </button>
            ))}
          </div>

          {selected !== null && selected !== 6 && (
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", cursor: "pointer", color: "#94a3b8″ }}>
              <input type="checkbox" checked={hasEV} onChange={e => setHasEV(e.target.checked)} style={{ accentColor: "#F5E642″ }} />
              ⚡ Add EV Charger (+$6,500)
            </label>
          )}
        </div>

        {option && impact !== null && (
          <div style={{
            background: impact >= 0 ? "#0f2d1a" : "#2d0f0f",
            border: `1px solid ${impact >= 0 ? "#22c55e" : "#ef4444"}`,
            borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem"
          }}>
            <h3 style={{ color: impact >= 0 ? "#22c55e" : "#ef4444″, margin: "0 0 0.5rem" }}>📊 DFW Value Impact</h3>
            <p style={{ fontSize: "2rem", color: "#F5E642″, fontWeight: "bold", margin: "0.25rem 0" }}>
              {impact >= 0 ? "+" : ""}${impact >= 0 ? impact.toLocaleString() : Math.abs(impact).toLocaleString()}
            </p>
            <p style={{ color: "#94a3b8″ }}>{option.note}</p>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Estimated home value: ${(homeValue + impact).toLocaleString()}
            </p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📌 DFW Garage Insights</h2>
          <ul style={{ color: "#94a3b8″, paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>2-car garage is the DFW baseline — anything less triggers buyer resistance</li>
            <li>3-car garages especially valued in Frisco, Prosper, McKinney, Celina</li>
            <li>EV chargers are now a top-10 requested feature in DFW listings (2026)</li>
            <li>Finished garage (epoxy, storage) can close 40% faster than unfinished</li>
            <li>Tandem garages rank lowest in buyer satisfaction surveys</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW Garage Intelligence 2026
        </div>
      </div>
    </div>
  );
}
