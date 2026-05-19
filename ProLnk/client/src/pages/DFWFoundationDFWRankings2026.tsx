import { useState } from 'react';

const factors = [
  { id: "engineer", label: "Engineer Oversight", emoji: "🏗️", weight: "Most Important", desc: "Does the company use a licensed structural PE to design every pier plan? Non-engineered repairs fail faster and void warranties." },
  { id: "years", label: "Years in DFW Market", emoji: "📅", weight: "High Importance", desc: "DFW soil is unique. Expansive clay (black gumbo) requires DFW-specific experience. 10+ years in market is the threshold." },
  { id: "warranty", label: "Warranty Terms", emoji: "📋", weight: "High Importance", desc: "Transferable lifetime warranties add resale value. Non-transferable warranties expire at sale and reduce buyer confidence." },
  { id: "reviews", label: "Customer Reviews", emoji: "⭐", weight: "Medium Importance", desc: "Look for DFW-specific reviews mentioning post-repair leveling results. Generic 5-star reviews with no detail are less reliable." },
  { id: "prolnk", label: "ProLnk Charter Vetting", emoji: "🔒", weight: "Instant Top Rank", desc: "ProLnk Charter foundation companies pass engineer oversight verification, insurance check, license check, and DFW years-in-market review before acceptance." },
];

const evalMap: Record<string, { score: string; notes: string }> = {
  engineer: { score: "Ask: 'Do you use a licensed structural PE for every job?' Any hesitation = red flag.", notes: "Require a signed engineering letter before job start." },
  years: { score: "10+ years = top tier. 5-10 = acceptable. Under 5 = risky in DFW expansive soil.", notes: "Check TX SOS entity registration to confirm founding date." },
  warranty: { score: "Transferable lifetime = A+. Non-transferable lifetime = B. 5-year = C.", notes: "Get warranty terms in writing before signing contract." },
  reviews: { score: "Look for photos, specific neighborhoods, and before/after leveling results.", notes: "Google Maps reviews with DFW city names are most trustworthy." },
  prolnk: { score: "All Charter pros pass ProLnk's 5-point DFW vetting: engineer, license, insurance, market years, reviews.", notes: "Zero research required. Access vetted pros in your zip instantly." },
};

export default function DFWFoundationDFWRankings2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Foundation Repair Company Rankings Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 28, fontSize: 15 }}>How to rank and evaluate DFW foundation companies before you hire — five factors that separate elite contractors from average ones in DFW expansive clay soil.</p>

        <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>SELECT A RANKING FACTOR TO EVALUATE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {factors.map(f => (
            <div key={f.id} onClick={() => setSelected(selected === f.id ? null : f.id)}
              style={{ background: selected === f.id ? "#132035" : "#0d1a2b", border: "1px solid " + (selected === f.id ? "#F5E642" : "#1e2d45"), borderRadius: 12, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <span style={{ fontSize: 22 }}>{f.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{f.label}</div>
                  <div style={{ color: "#F5E642", fontSize: 11, fontWeight: 600 }}>{f.weight}</div>
                </div>
              </div>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{f.desc}</p>
              {selected === f.id && (
                <div style={{ marginTop: 14, background: "#1e2d45", borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>📊 How to Score</div>
                  <p style={{ color: "#e2e8f0", fontSize: 13, marginBottom: 8 }}>{evalMap[f.id].score}</p>
                  <div style={{ color: "#94a3b8", fontSize: 12, fontStyle: "italic" }}>💡 {evalMap[f.id].notes}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "#132035", border: "1px solid #F5E642", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 ProLnk Charter Foundation Contractors</div>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>Every Charter foundation company on ProLnk passes engineer oversight verification, DFW market experience review, insurance check, and warranty terms review before being listed. Zero research required.</p>
        </div>
      </div>
    </div>
  );
}
