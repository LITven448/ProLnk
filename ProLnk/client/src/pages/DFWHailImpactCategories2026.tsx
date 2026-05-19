import { useState } from 'react';

const sizes = [
  { label: "Pea (0.25\")", emoji: "🫛", damage: "None", action: "Monitor gutters", score: 0, color: "#22c55e" },
  { label: "Marble (0.5\")", emoji: "🔵", damage: "Minor soft metal dents", action: "Inspect AC fins", score: 1, color: "#84cc16" },
  { label: "Quarter (1\")", emoji: "🪙", damage: "Cosmetic soft metal, no shingles", action: "Document with photos", score: 2, color: "#eab308" },
  { label: "Ping Pong (1.5\")", emoji: "🏓", damage: "Shingle damage likely", action: "Get a contractor inspection", score: 3, color: "#f97316" },
  { label: "Golf Ball (1.75\")", emoji: "⛳", damage: "Definite shingle damage", action: "File a claim NOW", score: 4, color: "#ef4444" },
  { label: "Baseball (2.75\")", emoji: "⚾", damage: "Major damage to all exterior", action: "Emergency claim + tarp roof", score: 5, color: "#991b1b" },
];

export default function DFWHailImpactCategories2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? sizes[selected] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌩️</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Hail Size Impact Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Tap a hail size to see what it means for your DFW home</p>
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
          {sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: selected === i ? "#132240" : "#0f1e38",
                border: `2px solid ${selected === i ? s.color : "#1e3a5f"}`,
                borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 16, textAlign: "left", width: "100%",
              }}
            >
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15 }}>{s.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.damage}</div>
              </div>
              <div style={{ background: s.color, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700, color: "#0A1628" }}>
                {"★".repeat(s.score + 1).slice(0, 5)}
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#132240", border: `2px solid ${active.color}`, borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{active.emoji}</div>
            <h2 style={{ color: "#F5E642", fontSize: 20, margin: "0 0 8px" }}>{active.label}</h2>
            <p style={{ color: "#94a3b8", margin: "0 0 12px" }}><strong style={{ color: "#e2e8f0" }}>Expected Damage:</strong> {active.damage}</p>
            <div style={{ background: active.color, color: "#0A1628", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 15 }}>
              ✅ Recommended Action: {active.action}
            </div>
          </div>
        )}

        <div style={{ background: "#132240", borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🏠 ProLnk DFW Network</div>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
            DFW gets 50+ hail events per year. Connect with vetted local roofing contractors instantly through ProLnk — no storm chasers, no out-of-state crews.
          </p>
        </div>
      </div>
    </div>
  );
}