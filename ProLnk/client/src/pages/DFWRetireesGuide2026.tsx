import { useState } from 'react';

const areas = [
  { name: "McKinney", emoji: "🎨", tags: ["55+ communities","arts scene","historic square"], best: ["community","culture"] },
  { name: "Frisco", emoji: "🌅", tags: ["suburban comfort","safe","amenity-rich"], best: ["comfort","value"] },
  { name: "Southlake", emoji: "💎", tags: ["luxury retirement","upscale dining","golf"], best: ["luxury","comfort"] },
  { name: "Allen", emoji: "🏡", tags: ["master-planned","quiet","senior programs"], best: ["community","comfort"] },
  { name: "Garland", emoji: "💰", tags: ["affordable","established","close to Dallas"], best: ["value","urban"] },
  { name: "Mesquite", emoji: "🌿", tags: ["lower cost","established neighborhoods","convenient"], best: ["value","community"] },
];

const priorities = ["community","culture","comfort","luxury","value","urban"];

export default function DFWRetireesGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<typeof areas[0] | null>(null);

  function toggle(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function recommend() {
    const scored = areas.map(n => ({ ...n, score: n.best.filter(b => selected.includes(b)).length }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌄</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW for Retirees Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Best Dallas-Fort Worth areas for a fulfilling retirement</p>
        </div>

        {areas.map(a => (
          <div key={a.name} style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", border: "1px solid #1e3a5f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{a.emoji}</span>
              <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#F5E642″ }}>{a.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {a.tags.map(t => (
                <span key={t} style={{ background: "#1e3a5f", color: "#94a3b8″, borderRadius: 20, padding: "0.2rem 0.75rem", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your Retirement Area</h3>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>What are your retirement priorities?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {priorities.map(p => (
              <button key={p} onClick={() => toggle(p)} style={{ background: selected.includes(p) ? "#F5E642″ : "#1e3a5f", color: selected.includes(p) ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "0.4rem 1rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{p}</button>
            ))}
          </div>
          <button onClick={recommend} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.6rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #F5E642" }}>
              <p style={{ margin: 0, color: "#F5E642″, fontWeight: 700 }}>Best fit: {result.emoji} {result.name}</p>
              <p style={{ margin: "0.25rem 0 0″, color: "#94a3b8", fontSize: "0.9rem" }}>{result.tags.join(" · ")}</p>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", color: "#475569″, fontSize: "0.8rem", marginTop: "2rem" }}>Powered by ProLnk · DFW Real Estate Intelligence 2026</p>
      </div>
    </div>
  );
}