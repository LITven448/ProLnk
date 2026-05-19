import { useState } from 'react';

const submarkets = [
  { name: "Garland", emoji: "📈", tags: ["5-7% cap rates","SFR rentals","high demand"], best: ["cashflow","sfr"] },
  { name: "Mesquite", emoji: "🏘️", tags: ["affordable entry","strong rents","workforce housing"], best: ["cashflow","sfr"] },
  { name: "South Dallas", emoji: "🔨", tags: ["value-add","revitalization","high upside"], best: ["appreciation","valueadd"] },
  { name: "Frisco / McKinney", emoji: "🚀", tags: ["new builds","appreciation play","tech migration"], best: ["appreciation","newbuild"] },
  { name: "Fort Worth Near Southside", emoji: "🏙️", tags: ["gentrifying","multifamily","below market"], best: ["valueadd","multifamily"] },
  { name: "Irving / Las Colinas", emoji: "✈️", tags: ["corporate HQs","short-term rentals","airport proximity"], best: ["str","multifamily"] },
];

const strategies = ["cashflow","appreciation","valueadd","sfr","multifamily","newbuild","str"];

export default function DFWInvestorsGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<typeof submarkets[0] | null>(null);

  function toggle(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function recommend() {
    const scored = submarkets.map(n => ({ ...n, score: n.best.filter(b => selected.includes(b)).length }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>💰</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW for Real Estate Investors Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Why DFW is the #1 US real estate investment market</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { emoji: "🏢", label: "Major HQs", val: "Toyota, Goldman Sachs, Charles Schwab" },
            { emoji: "📊", label: "Cap Rates", val: "5–7% across submarkets" },
            { emoji: "👥", label: "Pop. Growth", val: "100K+ new residents/year" },
            { emoji: "⚖️", label: "Landlord Laws", val: "Texas is landlord-friendly" },
          ].map(s => (
            <div key={s.label} style={{ background: "#111e35″, borderRadius: 12, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{s.emoji}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.85rem" }}>{s.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.25rem" }}>{s.val}</div>
            </div>
          ))}
        </div>

        {submarkets.map(s => (
          <div key={s.name} style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", border: "1px solid #1e3a5f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{s.emoji}</span>
              <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#F5E642″ }}>{s.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {s.tags.map(t => (
                <span key={t} style={{ background: "#1e3a5f", color: "#94a3b8″, borderRadius: 20, padding: "0.2rem 0.75rem", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your DFW Submarket</h3>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>Select your investment strategy:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {strategies.map(s => (
              <button key={s} onClick={() => toggle(s)} style={{ background: selected.includes(s) ? "#F5E642″ : "#1e3a5f", color: selected.includes(s) ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "0.4rem 1rem", cursor: "pointer", fontWeight: 600 }}>{s}</button>
            ))}
          </div>
          <button onClick={recommend} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.6rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #F5E642" }}>
              <p style={{ margin: 0, color: "#F5E642″, fontWeight: 700 }}>Top submarket: {result.emoji} {result.name}</p>
              <p style={{ margin: "0.25rem 0 0″, color: "#94a3b8", fontSize: "0.9rem" }}>{result.tags.join(" · ")}</p>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", color: "#475569″, fontSize: "0.8rem", marginTop: "2rem" }}>Powered by ProLnk · DFW Real Estate Intelligence 2026</p>
      </div>
    </div>
  );
}