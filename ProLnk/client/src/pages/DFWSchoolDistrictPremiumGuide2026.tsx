import { useState } from 'react';

const districts = [
  { name: "Highland Park ISD", city: "University Park / HP", premium: "+$500K+", pct: 35, color: "#F5E642" },
  { name: "Carroll ISD", city: "Southlake", premium: "+$200K", pct: 22, color: "#22c55e" },
  { name: "Coppell ISD", city: "Coppell", premium: "+$60K", pct: 12, color: "#3b82f6" },
  { name: "Frisco ISD", city: "Frisco", premium: "+$75K", pct: 14, color: "#8b5cf6" },
  { name: "Plano ISD", city: "Plano / Allen", premium: "+$50K", pct: 10, color: "#f97316" },
  { name: "Keller ISD", city: "Keller / Southlake", premium: "+$40K", pct: 8, color: "#ec4899" },
  { name: "Grapevine-Colleyville ISD", city: "Grapevine", premium: "+$30K", pct: 7, color: "#14b8a6" },
  { name: "Dallas ISD", city: "Dallas (varies by area)", premium: "Neutral / -$20K", pct: -5, color: "#ef4444" },
];

export default function DFWSchoolDistrictPremiumGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [homeValue, setHomeValue] = useState(450000);

  const district = selected !== null ? districts[selected] : null;

  const calcImpact = () => {
    if (!district) return null;
    return Math.round(homeValue * (district.pct / 100));
  };

  const impact = calcImpact();

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏫</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW School District Value Premium 2026</h1>
          <p style={{ color: "#94a3b8" }}>How school district boundaries move DFW home prices</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Home Base Value</h2>
          <input
            type="range" min={250000} max={2000000} step={25000} value={homeValue}
            onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642" }}
          />
          <p style={{ color: "#F5E642", fontSize: "1.4rem", fontWeight: "bold", margin: "0.5rem 0 0" }}>
            ${homeValue.toLocaleString()}
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>📍 Select a School District</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {districts.map((d, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? "#162035" : "#162035",
                  border: selected === i ? `2px solid ${d.color}` : "1px solid #1e3a5f",
                  borderRadius: 8, padding: "0.75rem 1rem", textAlign: "left",
                  cursor: "pointer", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                <div>
                  <span style={{ color: d.color, fontWeight: "bold" }}>{d.name}</span>
                  <span style={{ color: "#64748b", fontSize: "0.85rem", marginLeft: "0.5rem" }}>{d.city}</span>
                </div>
                <span style={{ color: d.pct >= 0 ? "#22c55e" : "#ef4444", fontWeight: "bold" }}>{d.premium}</span>
              </button>
            ))}
          </div>
        </div>

        {district && impact !== null && (
          <div style={{
            background: district.pct >= 0 ? "#0f2d1a" : "#2d0f0f",
            border: `1px solid ${district.pct >= 0 ? "#22c55e" : "#ef4444"}`,
            borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem"
          }}>
            <h3 style={{ color: district.pct >= 0 ? "#22c55e" : "#ef4444", margin: "0 0 0.5rem" }}>
              📊 School District Value Impact
            </h3>
            <p style={{ fontSize: "2rem", color: "#F5E642", fontWeight: "bold", margin: "0.25rem 0" }}>
              {impact >= 0 ? "+" : ""}{impact.toLocaleString()}
            </p>
            <p style={{ color: "#94a3b8" }}>
              {district.name} ({district.city}) — {district.pct >= 0 ? "+" : ""}{district.pct}% impact on ${homeValue.toLocaleString()} home
            </p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1rem", marginBottom: "0.75rem" }}>📌 Key District Insights</h2>
          <ul style={{ color: "#94a3b8", paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>HP/University Park homes sell $500K+ over comparable non-HPISD homes</li>
            <li>Carroll ISD (Southlake) commands $200K premium vs adjacent Keller ISD</li>
            <li>School district is the #1 factor for families — drives 2-3x normal demand</li>
            <li>Boundary lines within same ZIP can split values by $40–$80K</li>
            <li>Always verify exact district at NCES or district website before listing</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW School District Intelligence 2026
        </div>
      </div>
    </div>
  );
}
