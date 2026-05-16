import { useState } from 'react';

const suburbs = [
  { name: "Frisco", emoji: "🏫", tags: ["#1 schools","fast growth","sports"], best: ["schools","activities"] },
  { name: "Allen", emoji: "🛡️", tags: ["safe","community sports","family events"], best: ["safety","activities"] },
  { name: "Coppell", emoji: "🌳", tags: ["small town feel","top schools","tight knit"], best: ["schools","safety"] },
  { name: "Flower Mound", emoji: "🌾", tags: ["outdoorsy","trails","larger lots"], best: ["activities","value"] },
  { name: "Southlake", emoji: "⭐", tags: ["premium schools","luxury","Carroll ISD"], best: ["schools","safety"] },
  { name: "McKinney", emoji: "🏡", tags: ["historic downtown","value","growing"], best: ["value","activities"] },
];

const priorities = ["schools","safety","activities","value"];

export default function DFWFamiliesGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<typeof suburbs[0] | null>(null);

  function toggle(p: string) {
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function recommend() {
    const scored = suburbs.map(n => ({ ...n, score: n.best.filter(b => selected.includes(b)).length }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>👨‍👩‍👧‍👦</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>DFW for Families Guide 2026</h1>
          <p style={{ color: "#94a3b8" }}>Top-rated suburbs for raising a family in Dallas-Fort Worth</p>
        </div>

        {suburbs.map(s => (
          <div key={s.name} style={{ background: "#111e35", borderRadius: 12, padding: "1.25rem", marginBottom: "1rem", border: "1px solid #1e3a5f" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{s.emoji}</span>
              <h2 style={{ margin: 0, fontSize: "1.15rem", color: "#F5E642" }}>{s.name}</h2>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {s.tags.map(t => (
                <span key={t} style={{ background: "#1e3a5f", color: "#94a3b8", borderRadius: 20, padding: "0.2rem 0.75rem", fontSize: "0.8rem" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "#111e35", borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h3 style={{ color: "#F5E642", marginTop: 0 }}>🎯 Find Your Family Suburb</h3>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>What matters most to your family?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {priorities.map(p => (
              <button key={p} onClick={() => toggle(p)} style={{ background: selected.includes(p) ? "#F5E642" : "#1e3a5f", color: selected.includes(p) ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "0.4rem 1rem", cursor: "pointer", fontWeight: 600, textTransform: "capitalize" }}>{p}</button>
            ))}
          </div>
          <button onClick={recommend} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "0.6rem 1.5rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: "1rem", background: "#0A1628", borderRadius: 8, padding: "1rem", border: "1px solid #F5E642" }}>
              <p style={{ margin: 0, color: "#F5E642", fontWeight: 700 }}>Top pick: {result.emoji} {result.name}</p>
              <p style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.9rem" }}>{result.tags.join(" · ")}</p>
            </div>
          )}
        </div>
        <p style={{ textAlign: "center", color: "#475569", fontSize: "0.8rem", marginTop: "2rem" }}>Powered by ProLnk · DFW Real Estate Intelligence 2026</p>
      </div>
    </div>
  );
}