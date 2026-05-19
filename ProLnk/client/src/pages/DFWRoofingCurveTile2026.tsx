import { useState } from 'react';

const tileTypes = [
  { name: "Clay Tile", icon: "🔶", weight: "900–1,200 lbs/sq", life: "50–100 years", note: "Requires structural assessment for DFW homes — most need rafter reinforcement" },
  { name: "Concrete Tile", icon: "🟫", weight: "750–950 lbs/sq", life: "40–50 years", note: "Slightly lighter than clay, similar aesthetics, more common in DFW new construction" },
  { name: "Spanish Barrel Tile", icon: "🏛️", weight: "900–1,100 lbs/sq", life: "50+ years", note: "Signature look in DFW luxury market (Southlake, Frisco, Preston Hollow)" },
  { name: "Flat Profile Tile", icon: "🟦", weight: "600–800 lbs/sq", life: "40–50 years", note: "Mediterranean aesthetic, lower weight profile, growing in DFW mid-market" },
];

const dfwConsiderations = [
  { label: "Structural Load", icon: "⚖️", desc: "DFW standard framing supports 15–20 lbs/sq ft. Tile adds 6–10 lbs/sq ft — always require structural engineer sign-off before tile installation." },
  { label: "UV Resistance", icon: "☀️", desc: "DFW averages 234 sunny days/year. Clay and concrete tile outperform asphalt shingles by 3x in UV degradation — major advantage for North Texas." },
  { label: "Hail Impact", icon: "🌨️", desc: "DFW is in the hail belt. Concrete tile is class 4 impact rated — may qualify for insurance discounts. Clay is more brittle and can crack in large hail events." },
  { label: "Wind Uplift", icon: "🌬️", desc: "DFW 90 mph design wind speed. Tile systems require battens, clips, and adhesive foam at eaves per IRC R905.3 — verify installation method before purchasing." },
];

const concerns = [
  { label: "Considering tile for new DFW home", guide: "Start with a structural assessment ($300–500). DFW builders often frame for 15 psf live load — tile may require sistering rafters at $8,000–25,000 depending on roof size." },
  { label: "Existing tile roof, few cracked tiles", guide: "Individual clay or concrete tiles can be replaced. Match is critical — discontinued profiles are hard to source. Get 3 bids from DFW roofers who specialize in tile systems." },
  { label: "Tile roof after major hail event", guide: "File insurance claim immediately. DFW hail claims for tile roofs often total the roof. Adjuster should inspect each tile — walking tile roofs improperly causes additional damage." },
  { label: "Tile roof leaking at valleys or ridges", guide: "Common DFW failure points are valley metal, ridge caps, and hip tiles. Mortar under ridge caps deteriorates in DFW heat cycling — typically re-bedding and repointing needed ($2,000–6,000)." },
  { label: "Buying DFW home with tile roof", guide: "Request tile inspection report in disclosure. Key checks: uniform color (fading indicates weathering), no hairline cracks, proper underlayment (30-year minimum), and documentation of structural upgrade." },
];

export default function DFWRoofingCurveTile2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🏛️ DFW Curved & Tile Roofing Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          Clay tile, concrete tile, and Spanish barrel roofing in DFW — weight requirements, UV performance, hail ratings, and luxury market context.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {tileTypes.map((t, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{t.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.2rem" }}>{t.name}</div>
              <div style={{ color: "#e2e8f0″, fontSize: "0.85rem", marginBottom: "0.2rem" }}>⚖️ {t.weight} | ⏳ {t.life}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.82rem", lineHeight: 1.5 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>DFW-Specific Tile Considerations</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {dfwConsiderations.map((c, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 8, padding: "1rem", border: "1px solid #1e3a5f", display: "flex", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.2rem" }}>{c.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.87rem", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Tile Roof Situation Guide</h2>
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
        <div style={{ color: "#475569″, fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — Tile Roofing Reference 2026</div>
      </div>
    </div>
  );
}
