import { useState } from 'react';

const poolSizes = ["Small (<15k gal)", "Medium (15-25k gal)", "Large (25-40k gal)", "XL (40k+ gal)"];
const debrisTypes = ["DFW Silt/Dust", "Heavy Pollen (Spring)", "Leaves & Debris", "Algae & Fine Particles"];

const robots = [
  { name: "Dolphin Nautilus CC Plus", icon: "🐬", price: "$700-900", filter: "Cartridge + Bag", cord: "Corded 60ft", best: "DFW silt, pollen", rating: 4.8 },
  { name: "Polaris 9650iQ", icon: "🌀", price: "$1,100-1,400", filter: "Canister Bag", cord: "Corded 70ft", best: "Leaves, debris", rating: 4.6 },
  { name: "Hayward SharkVac XL", icon: "🦈", price: "$500-700", filter: "Cartridge", cord: "Corded 55ft", best: "Budget DFW pools", rating: 4.4 },
  { name: "Dolphin Sigma", icon: "⚡", price: "$900-1,200", filter: "Dual Scrub Brush", cord: "Corded 60ft", best: "Algae + fine silt", rating: 4.7 },
];

const recommendations: Record<string, string[]> = {
  "DFW Silt/Dust":           ["🏆 Dolphin Nautilus CC Plus — cartridge filter catches fine DFW silt", "✅ Run 2-3x per week during windy DFW conditions", "🔧 Rinse cartridge after every cycle in DFW dust season", "📅 DFW silt peaks March-May and Oct-Nov"],
  "Heavy Pollen (Spring)":   ["🏆 Dolphin Sigma — dual scrub brushes dislodge pollen from surfaces", "✅ DFW pollen season: Feb-May, run robot daily", "🔧 Use fine filter media inserts during pollen peak", "📅 Live oak pollen (yellow-green) hits DFW hard in Feb-Mar"],
  "Leaves & Debris":         ["🏆 Polaris 9650iQ — large debris canister handles DFW fall leaves", "✅ Run after every windstorm (DFW averages 30+ mph gusts)", "🔧 Empty canister after each run during fall", "📅 DFW peak leaf drop: November-December"],
  "Algae & Fine Particles":  ["🏆 Dolphin Sigma — aggressive brush pattern breaks up algae", "✅ Treat pool chemically FIRST, then use robot to remove dead algae", "🔧 Run robot 2x daily during algae treatment", "📅 DFW algae season: June-August (heat + humidity)"],
};

export default function DFWPoolCleaningRobotic2026() {
  const [size, setSize] = useState("");
  const [debris, setDebris] = useState("");

  const recs = debris ? recommendations[debris] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🤖</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Robotic Pool Cleaner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Fine DFW silt, spring pollen, and fall storms demand the right robot cleaner</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
          {robots.map(r => (
            <div key={r.name} style={{ background: "#0f2035", borderRadius: 12, padding: 14, border: "2px solid #1e3a5f" }}>
              <div style={{ fontSize: 30 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, margin: "6px 0 4px" }}>{r.name}</div>
              <div style={{ color: "#F5E642", fontSize: 12, marginBottom: 4 }}>{r.price}</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 2 }}>Filter: {r.filter}</div>
              <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>{r.cord}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>Best for: {r.best}</div>
              <div style={{ color: "#F5E642", fontSize: 12, marginTop: 6 }}>⭐ {r.rating}/5</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🔍 Find Your DFW Robot Match</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Pool Size</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {poolSizes.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  style={{ padding: "8px 12px", borderRadius: 8, border: `2px solid ${size===s?"#F5E642":"#1e3a5f"}`, background: size===s?"#F5E642":"#1e3a5f", color: size===s?"#0A1628":"#fff", cursor: "pointer", fontSize: 12, fontWeight: size===s?700:400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 8 }}>Primary Debris Type</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {debrisTypes.map(d => (
                <button key={d} onClick={() => setDebris(d)}
                  style={{ padding: "8px 12px", borderRadius: 8, border: `2px solid ${debris===d?"#F5E642":"#1e3a5f"}`, background: debris===d?"#F5E642":"#1e3a5f", color: debris===d?"#0A1628":"#fff", cursor: "pointer", fontSize: 12, fontWeight: debris===d?700:400 }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          {recs && (
            <div>
              <h3 style={{ color: "#F5E642", marginBottom: 12, fontSize: 15 }}>DFW Recommendation for: {debris}</h3>
              {recs.map((r, i) => (
                <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 14 }}>{r}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>Need professional pool cleaning in DFW?</div>
          <div style={{ color: "#94a3b8", fontSize: 13 }}>ProLnk connects DFW homeowners with top-rated pool cleaning pros</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Find DFW Pool Cleaners 🤖</button>
        </div>
      </div>
    </div>
  );
}