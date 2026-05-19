import { useState } from 'react';

const locationFactors = [
  { name: "Top School District (Frisco ISD)", emoji: "🏫", premium: "+$50–$100K", pct: "+12–18%" },
  { name: "Goldman Sachs Richardson Corridor", emoji: "🏢", premium: "+$40–$70K", pct: "+15%" },
  { name: "Lake Lewisville Access", emoji: "🌊", premium: "+$50–$90K", pct: "+20%" },
  { name: "Highway/Tollway Proximity (< 2mi)", emoji: "🛣️", premium: "+$15–$25K", pct: "+5–8%" },
  { name: "DFW Airport Corridor", emoji: "✈️", premium: "+$10–$30K", pct: "+4–10%" },
  { name: "Downtown Dallas Proximity (< 10mi)", emoji: "🌆", premium: "+$20–$50K", pct: "+8–14%" },
];

export default function DFWLocationPremiumGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [homeValue, setHomeValue] = useState(400000);

  const factor = selected !== null ? locationFactors[selected] : null;

  const estimatePremium = () => {
    if (!factor) return null;
    const pctMatch = factor.pct.match(/\+(\d+)/);
    if (!pctMatch) return null;
    const midPct = parseInt(pctMatch[1]) / 100;
    return Math.round(homeValue * midPct);
  };

  const premium = estimatePremium();

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>📍</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Location Premium Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>How location drives home values across the Dallas–Fort Worth metro</p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏡 Your Home Base Value</h2>
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
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🗺️ Select a Location Factor</h2>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {locationFactors.map((f, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{
                  background: selected === i ? "#F5E642″ : "#162035",
                  color: selected === i ? "#0A1628″ : "#fff",
                  border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.75rem 1rem",
                  textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                <span>{f.emoji} {f.name}</span>
                <span style={{ fontWeight: "bold" }}>{f.premium}</span>
              </button>
            ))}
          </div>
        </div>

        {factor && premium !== null && (
          <div style={{ background: "#0f2d1a", border: "1px solid #22c55e", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#22c55e", margin: "0 0 0.5rem" }}>📊 Estimated Location Premium</h3>
            <p style={{ fontSize: "2rem", color: "#F5E642″, fontWeight: "bold", margin: "0.25rem 0" }}>
              +${premium.toLocaleString()}
            </p>
            <p style={{ color: "#94a3b8″ }}>{factor.emoji} {factor.name} — {factor.pct} premium on a ${homeValue.toLocaleString()} home</p>
          </div>
        )}

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📌 Key DFW Location Insights</h2>
          <ul style={{ color: "#94a3b8″, paddingLeft: "1.25rem", lineHeight: "1.8" }}>
            <li>Frisco ISD homes command $50–$100K more than Dallas ISD equivalents</li>
            <li>Richardson/Plano employer corridor adds 15% to nearby residential values</li>
            <li>Lake-access properties in Lewisville/Grapevine see consistent 20% lifts</li>
            <li>Tollway proximity is a net positive in DFW — easy commutes = premium</li>
            <li>Location accounts for up to 40% of a DFW home's total value</li>
          </ul>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          🏠 ProLnk Home Health Vault — DFW Location Intelligence 2026
        </div>
      </div>
    </div>
  );
}
