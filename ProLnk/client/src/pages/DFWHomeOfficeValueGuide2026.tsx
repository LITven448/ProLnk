import { useState } from 'react';

const officeTypes = [
  {
    label: "No Dedicated Office (Bonus Room Only)",
    icon: "📦",
    premium: 5000,
    note: "Bonus room staging helps but not counted as office in DFW comps",
  },
  {
    label: "Dedicated Office Room (Basic)",
    icon: "🖥️",
    premium: 15000,
    note: "Enclosed room with door — $15–20K premium in Plano/Frisco/Allen",
  },
  {
    label: "Dedicated Office + Proper Wiring",
    icon: "🔌",
    premium: 20000,
    note: "Wired Cat6 + 20A dedicated circuits = serious professional setup premium",
  },
  {
    label: "Dedicated Office + Fiber Drop + Wiring",
    icon: "🌐",
    premium: 25000,
    note: "Fiber to the room signals WFH-ready — highest tier buyer demand in tech corridors",
  },
  {
    label: "Dual Office Setup (2 rooms)",
    icon: "👫",
    premium: 35000,
    note: "Two-income WFH households are growing fast — dual offices command top premium",
  },
  {
    label: "Converted Garage Office",
    icon: "🏠",
    premium: 8000,
    note: "Permitted conversion adds value, but less than purpose-built office room",
  },
];

const markets = [
  { name: "Frisco / Allen / McKinney", multiplier: 1.2 },
  { name: "Plano / Richardson (Tech Corridor)", multiplier: 1.3 },
  { name: "Southlake / Colleyville", multiplier: 1.15 },
  { name: "Dallas (Uptown / Oak Lawn)", multiplier: 1.1 },
  { name: "Fort Worth / Westover Hills", multiplier: 0.9 },
  { name: "Garland / Mesquite / Rowlett", multiplier: 0.75 },
];

export default function DFWHomeOfficeValueGuide2026() {
  const [officeIdx, setOfficeIdx] = useState<number | null>(null);
  const [marketIdx, setMarketIdx] = useState(0);
  const [homeValue, setHomeValue] = useState(500000);

  const office = officeIdx !== null ? officeTypes[officeIdx] : null;
  const market = markets[marketIdx];

  const adjustedPremium = office ? Math.round(office.premium * market.multiplier) : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>💼</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Home Office Value Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Post-COVID dedicated home office premiums across DFW</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Home Base Value</h2>
          <input
            type="range" min={300000} max={1500000} step={25000} value={homeValue}
            onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642″ }}
          />
          <p style={{ color: "#F5E642″, fontSize: "1.4rem", fontWeight: "bold", margin: "0.5rem 0 0" }}>
            ${homeValue.toLocaleString()}
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📍 DFW Sub-Market</h2>
          <select
            value={marketIdx}
            onChange={e => setMarketIdx(Number(e.target.value))}
            style={{ width: "100%", background: "#162035″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", fontSize: "1rem" }}
          >
            {markets.map((m, i) => <option key={i} value={i}>{m.name}</option>)}
          </select>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🖥️ Home Office Configuration</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {officeTypes.map((o, i) => (
              <button key={i} onClick={() => setOfficeIdx(i)}
                style={{
                  background: officeIdx === i ? "#F5E642″ : "#162035",
                  color: officeIdx === i ? "#0A1628″ : "#fff",
                  border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem 1rem",
                  textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                <span>{o.icon} {o.label}</span>
                <span style={{ fontWeight: "bold", color: officeIdx === i ? "#0A1628″ : "#22c55e" }}>
                  +${(o.premium / 1000).toFixed(0)}K
                </span>
              </button>
            ))}
          </div>
        </div>

        {office && adjustedPremium !== null && (
          <div style={{ background: "#0f2d1a", border: "1px solid #22c55e", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#22c55e", margin: "0 0 0.5rem" }}>📊 DFW Home Office Premium</h3>
            <p style={{ fontSize: "2rem", color: "#F5E642″, fontWeight: "bold", margin: "0.25rem 0" }}>
              +${adjustedPremium.toLocaleString()}
            </p>
            <p style={{ color: "#94a3b8″ }}>{office.note}</p>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              Market multiplier: {market.multiplier}x — {market.name}
            </p>
            <p style={{ color: "#64748b" }}>
              Estimated adjusted value: ${(homeValue + adjustedPremium).toLocaleString()}
            </p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📌 DFW Home Office Insights 2026</h2>
          <ul style={{ color: "#94a3b8″, paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>WFH is permanent for 40%+ of DFW knowledge workers — office matters</li>
            <li>Plano/Richardson tech corridor buyers rank home office in top 3 features</li>
            <li>Fiber + wiring infrastructure separates premium office listings in 2026</li>
            <li>Two-income WFH households (dual office) are the fastest-growing buyer segment</li>
            <li>Dedicated office adds more value than same sq ft added as living room</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW Home Office Intelligence 2026
        </div>
      </div>
    </div>
  );
}
