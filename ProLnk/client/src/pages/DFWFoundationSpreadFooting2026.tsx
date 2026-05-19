import { useState } from 'react';

const footingFacts = [
  { label: "Typical DFW Size", value: "18×18\" to 24×24\"", icon: "📐" },
  { label: "Concrete Depth", value: "8–12 inches thick", icon: "📏" },
  { label: "Common Age", value: "Pre-1980 pier & beam homes", icon: "🏚️" },
  { label: "Load Capacity", value: "10,000–25,000 lbs depending on size", icon: "⚖️" },
];

const vsModern = [
  { aspect: "Design", spread: "Wide flat pad distributes load over soil surface", modern: "Deep drilled pier reaches stable soil below clay" },
  { aspect: "DFW Clay Problem", spread: "Sits in expansive clay — heaves and settles seasonally", modern: "Extends through clay to bedrock or stable stratum" },
  { aspect: "Repair", spread: "Can be sistered with new concrete or steel plate", modern: "Generally replaced with new drilled pier if failed" },
  { aspect: "Cost to Repair", spread: "$500–$2,000 per footing depending on access", modern: "$800–$3,500 per pier depending on depth" },
];

const concerns = [
  { label: "Sagging floor near interior post", guide: "Likely spread footing has settled or cracked in DFW clay. Get a foundation inspection — engineer will probe soil moisture and measure differential settlement." },
  { label: "Visible footing crack in crawlspace", guide: "Horizontal cracks are less critical; vertical or diagonal cracks in the footing pad indicate shear failure from soil movement. Document with photos before repair." },
  { label: "Post sitting off-center on footing", guide: "Common in older DFW pier-and-beam homes after clay movement. Post can shift back if soil is re-moisturized, or footing may need a new concrete collar." },
  { label: "Footing feels soft or crumbles", guide: "Spalling concrete in DFW humidity indicates carbonation or alkali-silica reaction. Core sample needed — if rebar is exposed and rusted, full replacement required." },
  { label: "Home over 40 years old", guide: "DFW pier-and-beam homes from 1940–1985 commonly used spread footings undersized for modern loads. Baseline inspection recommended every 5 years in North Texas clay zones." },
];

export default function DFWFoundationSpreadFooting2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);
  const [showVs, setShowVs] = useState(false);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🏗️ DFW Spread Footing Foundation Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          Understanding concrete pad footings in older DFW pier-and-beam homes — how they work, why they fail in North Texas clay, and repair options.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {footingFacts.map((f, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{f.icon}</span>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.85rem" }}>{f.label}</div>
                <div style={{ color: "#e2e8f0″, fontSize: "0.95rem", fontWeight: 600 }}>{f.value}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => setShowVs(!showVs)}
          style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.75rem 1.5rem", fontWeight: 700, cursor: "pointer", marginBottom: "1.5rem" }}>
          {showVs ? "Hide" : "Show"} Spread Footing vs Modern Pier Comparison
        </button>

        {showVs && (
          <div style={{ background: "#0f2040″, borderRadius: 10, padding: "1.2rem", marginBottom: "2rem", border: "1px solid #1e3a5f", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr>
                  <th style={{ color: "#F5E642″, textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #1e3a5f" }}>Aspect</th>
                  <th style={{ color: "#F5E642″, textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #1e3a5f" }}>Spread Footing</th>
                  <th style={{ color: "#F5E642″, textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #1e3a5f" }}>Modern Drilled Pier</th>
                </tr>
              </thead>
              <tbody>
                {vsModern.map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: "#94a3b8″, padding: "0.5rem", borderBottom: "1px solid #0A1628" }}>{r.aspect}</td>
                    <td style={{ color: "#e2e8f0″, padding: "0.5rem", borderBottom: "1px solid #0A1628" }}>{r.spread}</td>
                    <td style={{ color: "#e2e8f0″, padding: "0.5rem", borderBottom: "1px solid #0A1628" }}>{r.modern}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Spread Footing Concern Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1a3a5c" : "#0f2040″, border: `1px solid ${selectedConcern === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer", fontWeight: selectedConcern === i ? 700 : 400 }}>
              {c.label}
              {selectedConcern === i && (
                <div style={{ marginTop: "0.6rem", color: "#94a3b8″, fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.6 }}>{c.guide}</div>
              )}
            </button>
          ))}
        </div>
        <div style={{ color: "#475569″, fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — Foundation Spread Footing Reference 2026</div>
      </div>
    </div>
  );
}
