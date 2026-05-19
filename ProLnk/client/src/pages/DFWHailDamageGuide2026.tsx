import { useState } from 'react';

const hailSizes = [
  { size: "Pea (0.25\")", damage: "Minimal — granule loss on soft metals", risk: "Low" },
  { size: "Marble (0.5\")", damage: "Granule loss, bruising on asphalt shingles", risk: "Moderate" },
  { size: "Quarter (1\")", damage: "Shingle cracks, dents on gutters/AC units", risk: "High" },
  { size: "Golf Ball (1.75\")", damage: "Shingle punctures, visible dents on all metals", risk: "Severe" },
  { size: "Baseball (2.75\")", damage: "Structural roof damage, likely full replacement", risk: "Critical" },
];

export default function DFWHailDamageGuide2026() {
  const [selectedSize, setSelectedSize] = useState(0);
  const selected = hailSizes[selectedSize];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⛈️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW Hail Damage Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>DFW averages 5–7 significant hail events per year. Know your rights and next steps.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "📸", title: "Document Immediately", body: "Photo every damaged surface with timestamps. Include coins or rulers for scale. Email photos to yourself to lock in date metadata." },
            { icon: "📋", title: "File Within 30 Days", body: "TX law gives insurers 15 days to acknowledge claims. File quickly — delay weakens your position with adjusters." },
            { icon: "🔍", title: "Public Adjuster Option", body: "Public adjusters work for you, not the insurer. Fee: 10–15% of settlement. Worth it on claims over $20K." },
            { icon: "🚩", title: "Storm Chaser Red Flags", body: "Knock on your door after storms, pressure deductible waivers, out-of-state plates, no local address. Walk away." },
          ].map(card => (
            <div key={card.title} style={{ background: "#132240", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 20, fontSize: 20 }}>🌨️ Hail Size → Likely Damage Assessment</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {hailSizes.map((s, i) => (
              <button key={i} onClick={() => setSelectedSize(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: selectedSize === i ? "#F5E642" : "#1e3a5f", color: selectedSize === i ? "#0A1628" : "#fff" }}>{s.size}</button>
            ))}
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>{selected.size}</span>
              <span style={{ background: selected.risk === "Critical" ? "#ef4444" : selected.risk === "Severe" ? "#f97316" : selected.risk === "High" ? "#eab308" : selected.risk === "Moderate" ? "#3b82f6" : "#22c55e", color: "#fff", borderRadius: 6, padding: "3px 10px", fontWeight: 700, fontSize: 13 }}>{selected.risk} Risk</span>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>{selected.damage}</p>
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏠</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#0A1628", marginBottom: 6 }}>ProLnk connects you to vetted local DFW roofers — not storm chasers.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Every ProLnk roofer is pre-screened: TX insurance cert, Haag certification, 3+ years local history, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}
