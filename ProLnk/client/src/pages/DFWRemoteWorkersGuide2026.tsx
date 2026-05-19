import { useState } from 'react';

const neighborhoods = [
  { name: "Coppell", emoji: "🔇", tags: ["quiet","gigabit fiber","large homes"], best: ["focus","space"] },
  { name: "Frisco", emoji: "🏗️", tags: ["new builds w/ offices","fast fiber","modern amenities"], best: ["space","modern"] },
  { name: "Uptown Dallas", emoji: "☕", tags: ["walkable","coffee shops","co-working nearby"], best: ["walkable","social"] },
  { name: "Plano", emoji: "🌐", tags: ["tech infrastructure","safe","multiple ISPs"], best: ["focus","modern"] },
  { name: "Allen", emoji: "🌳", tags: ["quiet streets","parks","community pools"], best: ["focus","outdoor"] },
  { name: "Bishop Arts / Oak Cliff", emoji: "🎨", tags: ["creative vibe","local cafes","affordable"], best: ["social","walkable"] },
];

const needs = ["focus","space","walkable","social","modern","outdoor"];

export default function DFWRemoteWorkersGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<typeof neighborhoods[0] | null>(null);

  function toggle(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function recommend() {
    const scored = neighborhoods.map(n => ({ ...n, score: n.best.filter(b => selected.includes(b)).length }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>💻</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW for Remote Workers Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Work from anywhere — but make it Dallas-Fort Worth</p>
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>Why WFH in DFW?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {["No state income tax","Lower cost vs. coastal","250+ sunny days/year","World-class airport access"].map(b => (
              <div key={b} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", color: "#94a3b8", fontSize: "0.9rem" }}>✅ {b}</div>
            ))}
          </div>
        </div>

        {neighborhoods.map(n => (
          <div key={n.name} style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", border: "1px solid #1e3a5f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{n.emoji}</span>
              <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#F5E642″ }}>{n.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {n.tags.map(t => (
                <span key={t} style={{ background: "#1e3a5f", color: "#94a3b8″, borderRadius: 20, padding: "0.2rem 0.75rem", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your WFH Neighborhood</h3>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>What does your ideal workday look like?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {needs.map(n => (
              <button key={n} onClick={() => toggle(n)} style={{ background: selected.includes(n) ? "#F5E642″ : "#1e3a5f", color: selected.includes(n) ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "0.4rem 1rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{n}</button>
            ))}
          </div>
          <button onClick={recommend} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.6rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #F5E642" }}>
              <p style={{ margin: 0, color: "#F5E642″, fontWeight: 700 }}>Your WFH match: {result.emoji} {result.name}</p>
              <p style={{ margin: "0.25rem 0 0″, color: "#94a3b8", fontSize: "0.9rem" }}>{result.tags.join(" · ")}</p>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", color: "#475569″, fontSize: "0.8rem", marginTop: "2rem" }}>Powered by ProLnk · DFW Real Estate Intelligence 2026</p>
      </div>
    </div>
  );
}