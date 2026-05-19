import { useState } from 'react';

const destinations = [
  { name: "Lakewood Dallas", emoji: "🏛️", tags: ["historic charm","walkable","patio homes"], best: ["urban","culture"] },
  { name: "Downtown Plano", emoji: "🎭", tags: ["arts district","restaurants","low maintenance"], best: ["culture","convenience"] },
  { name: "McKinney Historic District", emoji: "🌆", tags: ["charming","community events","townhomes"], best: ["culture","community"] },
  { name: "Southlake Town Square", emoji: "🛍️", tags: ["luxury patio homes","walkable retail","upscale"], best: ["luxury","convenience"] },
  { name: "Frisco Square", emoji: "🎵", tags: ["new construction","mixed use","HOA-managed"], best: ["convenience","community"] },
  { name: "Addison", emoji: "🍽️", tags: ["restaurant row","lock-and-leave","vibrant"], best: ["urban","luxury"] },
];

const goals = ["urban","culture","community","luxury","convenience"];

export default function DFWEmptyNestersGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<typeof destinations[0] | null>(null);

  function toggle(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function recommend() {
    const scored = destinations.map(n => ({ ...n, score: n.best.filter(b => selected.includes(b)).length }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>DFW for Empty Nesters Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Downsizing smart in Dallas-Fort Worth — patio homes, townhomes, maintenance-free living</p>
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>Why Downsize in DFW?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {["HOA handles exterior maintenance","Lock-and-leave for travel","Lower utility costs","Right-sized for your lifestyle"].map(b => (
              <div key={b} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", color: "#94a3b8", fontSize: "0.9rem" }}>✅ {b}</div>
            ))}
          </div>
        </div>

        {destinations.map(d => (
          <div key={d.name} style={{ background: "#111e35″, borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", border: "1px solid #1e3a5f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{d.emoji}</span>
              <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#F5E642″ }}>{d.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {d.tags.map(t => (
                <span key={t} style={{ background: "#1e3a5f", color: "#94a3b8″, borderRadius: 20, padding: "0.2rem 0.75rem", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>🎯 Find Your Downsizing Destination</h3>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>Select your lifestyle goals:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {goals.map(g => (
              <button key={g} onClick={() => toggle(g)} style={{ background: selected.includes(g) ? "#F5E642″ : "#1e3a5f", color: selected.includes(g) ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "0.4rem 1rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{g}</button>
            ))}
          </div>
          <button onClick={recommend} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.6rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #F5E642" }}>
              <p style={{ margin: 0, color: "#F5E642″, fontWeight: 700 }}>Your destination: {result.emoji} {result.name}</p>
              <p style={{ margin: "0.25rem 0 0″, color: "#94a3b8", fontSize: "0.9rem" }}>{result.tags.join(" · ")}</p>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", color: "#475569″, fontSize: "0.8rem", marginTop: "2rem" }}>Powered by ProLnk · DFW Real Estate Intelligence 2026</p>
      </div>
    </div>
  );
}