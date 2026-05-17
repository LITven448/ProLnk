import { useState } from 'react';

const criteria = [
  { id: "cert", label: "Manufacturer Certification", emoji: "🏅", tier: "Most Important", desc: "GAF Master Elite = top 3% of roofers nationwide. Requires annual training and quality audits. Regular certified = middle tier. Uncertified = avoid.", score: "GAF Master Elite = A+. Owens Corning Platinum = A. Standard certified = B. No cert = D." },
  { id: "haag", label: "HAAG Training", emoji: "🌩️", tier: "Critical for DFW", desc: "HAAG-certified inspectors can identify hail damage patterns that insurance adjusters miss. Essential in DFW hail corridor. Without HAAG, insurance claims are often under-documented.", score: "HAAG-certified estimator on staff = A+. Uses HAAG-certified inspector = B. No HAAG = C in DFW." },
  { id: "years", label: "Years in DFW Market", emoji: "📅", tier: "High Importance", desc: "DFW is the most storm-active major metro in the US. 10+ years of DFW roofing experience means the contractor has managed post-storm surge, insurance complexity, and local code changes.", score: "15+ years DFW = A+. 10-15 = A. 5-10 = B. Under 5 = C." },
  { id: "permits", label: "Permit Pulling Record", emoji: "📋", tier: "High Importance", desc: "Reputable DFW roofers pull permits for every full replacement. Non-permit work can cause insurance claim denials and fails inspection at resale.", score: "Always pulls permits = A. Ask directly — hesitation is a red flag." },
  { id: "reviews", label: "Customer Reviews", emoji: "⭐", tier: "Medium Importance", desc: "Look for DFW neighborhood mentions, hail claim documentation results, and before/after photo evidence in reviews.", score: "50+ Google reviews with photos and DFW specifics = A. Generic reviews = B." },
];

export default function DFWRoofingDFWRankings2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏚️ DFW Roofing Contractor Rankings Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 28, fontSize: 15 }}>How to rank DFW roofing contractors before you hire — the five factors that determine contractor quality in the most hail-active major metro in the US.</p>

        <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>SELECT A RANKING CRITERION</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {criteria.map(c => (
            <div key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ background: selected === c.id ? "#132035" : "#0d1a2b", border: "1px solid " + (selected === c.id ? "#F5E642" : "#1e2d45"), borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <span style={{ fontSize: 22 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.label}</div>
                  <div style={{ color: "#F5E642", fontSize: 11, fontWeight: 600 }}>{c.tier}</div>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{c.desc}</p>
              {selected === c.id && (
                <div style={{ marginTop: 14, background: "#1e2d45", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>📊 Scoring Guide</div>
                  <p style={{ color: "#e2e8f0", fontSize: 13 }}>{c.score}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#132035", border: "1px solid #F5E642", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 ProLnk Charter Roofing Contractors</div>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Charter verification on ProLnk requires manufacturer certification level, HAAG training confirmation, TX license and insurance verification, permit history review, and 10+ years DFW experience. Instant access to top-ranked contractors in your zip.</p>
        </div>
      </div>
    </div>
  );
}
