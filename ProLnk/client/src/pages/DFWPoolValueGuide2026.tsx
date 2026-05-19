import { useState } from 'react';

const areas = [
  { name: "Frisco / Allen / McKinney", factor: 0.065 },
  { name: "Plano / Richardson", factor: 0.055 },
  { name: "Southlake / Westlake", factor: 0.08 },
  { name: "Coppell / Irving", factor: 0.05 },
  { name: "Dallas (Preston Hollow)", factor: 0.07 },
  { name: "Fort Worth (Westover Hills)", factor: 0.06 },
  { name: "Garland / Mesquite / Rowlett", factor: 0.035 },
  { name: "Denton / Lewisville", factor: 0.045 },
];

export default function DFWPoolValueGuide2026() {
  const [areaIdx, setAreaIdx] = useState(0);
  const [homeValue, setHomeValue] = useState(450000);
  const [poolType, setPoolType] = useState<"basic" | "resort" | "none">("none");

  const area = areas[areaIdx];

  const poolCostMap = { basic: 65000, resort: 120000, none: 0 };
  const poolLabelMap = { basic: "Standard Pool ($65K build cost)", resort: "Resort Pool ($120K+ build cost)", none: "No Pool" };

  const valueAdd = () => {
    if (poolType === "none") return 0;
    const base = Math.round(homeValue * area.factor);
    return poolType === "resort" ? Math.round(base * 1.6) : base;
  };

  const roi = () => {
    const cost = poolCostMap[poolType];
    if (!cost) return null;
    const add = valueAdd();
    return Math.round((add / cost) * 100);
  };

  const added = valueAdd();
  const roiPct = roi();

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏊</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Pool Value Analysis 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Does a pool actually add value in the Dallas–Fort Worth market?</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Your Home Value</h2>
          <input
            type="range" min={200000} max={1500000} step={25000} value={homeValue}
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
            value={areaIdx}
            onChange={e => setAreaIdx(Number(e.target.value))}
            style={{ width: "100%", background: "#162035″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem", fontSize: "1rem" }}
          >
            {areas.map((a, i) => <option key={i} value={i}>{a.name}</option>)}
          </select>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏊 Pool Type</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {(["none", "basic", "resort"] as const).map(type => (
              <button key={type} onClick={() => setPoolType(type)}
                style={{
                  background: poolType === type ? "#F5E642″ : "#162035",
                  color: poolType === type ? "#0A1628″ : "#fff",
                  border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem 1rem",
                  textAlign: "left", cursor: "pointer", fontWeight: "bold"
                }}>
                {type === "none" ? "❌ No Pool" : type === "basic" ? "🏊 " + poolLabelMap[type] : "🌴 " + poolLabelMap[type]}
              </button>
            ))}
          </div>
        </div>

        {poolType !== "none" && (
          <div style={{ background: "#0f2d1a", border: "1px solid #22c55e", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#22c55e", margin: "0 0 0.5rem" }}>📊 Pool Value Analysis</h3>
            <p style={{ fontSize: "2rem", color: "#F5E642″, fontWeight: "bold", margin: "0.25rem 0" }}>
              +${added.toLocaleString()} added value
            </p>
            <p style={{ color: "#94a3b8″ }}>
              Build cost: ${poolCostMap[poolType].toLocaleString()} — ROI: {roiPct}%
            </p>
            <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
              ⚠️ DFW pools rarely return full build cost. Lifestyle value often exceeds financial return.
            </p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📌 DFW Pool Insights 2026</h2>
          <ul style={{ color: "#94a3b8″, paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>DFW pools average $15–30K value add vs $65–90K build cost (40–50% ROI)</li>
            <li>Luxury markets (Southlake, Preston Hollow) see higher pool value returns</li>
            <li>Frisco / Allen buyers respond strongly to pools — faster sale, fewer concessions</li>
            <li>Annual maintenance ($3–5K) is the biggest buyer objection — disclose upfront</li>
            <li>Pool + outdoor kitchen combos outperform pool-only in DFW by 12%</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW Pool Value Intelligence 2026
        </div>
      </div>
    </div>
  );
}
