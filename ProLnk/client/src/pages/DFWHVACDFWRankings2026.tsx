import { useState } from 'react';

const brands = [
  { name: "Trane", rank: 1, emoji: "🥇", tag: "Most Reliable in DFW Heat", notes: "Built for extreme heat cycles. #1 choice of DFW HVAC pros. 15–20 yr lifespan typical.", strengths: ["Best heat durability", "Top dealer support network", "Widest DFW service coverage"] },
  { name: "American Standard", rank: 2, emoji: "🥈", tag: "Same DNA as Trane", notes: "Manufactured identically to Trane. Slightly lower price point with same internals.", strengths: ["Trane-level reliability", "Lower avg cost", "Strong warranty terms"] },
  { name: "Carrier", rank: 3, emoji: "🥉", tag: "Reliable + Strong Dealer Network", notes: "Consistent performer. Large DFW dealer network means fast service availability.", strengths: ["Good heat performance", "Wide parts availability", "Strong dealer warranty support"] },
  { name: "Lennox", rank: 4, emoji: "⭐", tag: "Efficiency Leader", notes: "Highest SEER ratings available. Best for low energy bills, slightly more complex repairs.", strengths: ["Top SEER efficiency", "Low operating cost", "Good DFW dealer presence"] },
  { name: "Goodman", rank: 5, emoji: "✅", tag: "Value Tier", notes: "Budget-friendly option. Shorter lifespan in DFW heat but acceptable for value buyers.", strengths: ["Lowest upfront cost", "Decent warranty", "Widely available parts"] },
];

const priorities = ["DFW Heat Durability", "Lowest Cost", "Energy Efficiency", "Best Warranty", "Fastest Repair Service"];

const priorityMap: Record<string, string[]> = {
  "DFW Heat Durability": ["Trane", "American Standard", "Carrier"],
  "Lowest Cost": ["Goodman", "American Standard", "Lennox"],
  "Energy Efficiency": ["Lennox", "Carrier", "Trane"],
  "Best Warranty": ["Trane", "American Standard", "Carrier"],
  "Fastest Repair Service": ["Carrier", "Trane", "Goodman"],
};

export default function DFWHVACDFWRankings2026() {
  const [activePriority, setActivePriority] = useState<string | null>(null);

  const highlighted = activePriority ? priorityMap[activePriority] : null;

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE — DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌡️ DFW HVAC Brand Reliability Rankings 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 28, fontSize: 15 }}>How DFW HVAC brands rank for reliability based on performance in extreme Texas heat cycles — compiled from DFW pro installer feedback.</p>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>FILTER BY YOUR PRIORITY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setActivePriority(activePriority === p ? null : p)}
                style={{ background: activePriority === p ? "#F5E642" : "#1e2d45", color: activePriority === p ? "#0A1628" : "#94a3b8", border: "none", borderRadius: 20, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {brands.map(b => {
            const isHighlighted = highlighted ? highlighted.includes(b.name) : true;
            return (
              <div key={b.name} style={{ background: isHighlighted ? "#132035" : "#0d1a2b", border: `1px solid ${isHighlighted ? "#F5E642" : "#1e2d45"}`, borderRadius: 12, padding: "18px 20px", opacity: isHighlighted ? 1 : 0.45, transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{b.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>{b.name} <span style={{ color: "#F5E642", fontSize: 12, marginLeft: 6 }}>#{b.rank}</span></div>
                    <div style={{ color: "#F5E642", fontSize: 12, fontWeight: 600 }}>{b.tag}</div>
                  </div>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 10 }}>{b.notes}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {b.strengths.map(s => <span key={s} style={{ background: "#1e2d45", color: "#cbd5e1", fontSize: 11, padding: "4px 10px", borderRadius: 12 }}>{s}</span>)}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, background: "#132035", border: "1px solid #F5E642", borderRadius: 12, padding: "20px 22px" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔒 ProLnk Charter HVAC Pros</div>
          <p style={{ color: "#94a3b8", fontSize: 13 }}>All Charter HVAC contractors on ProLnk are background-checked, licensed in Texas, and rated on DFW-specific heat performance history. Access the top-ranked pros in your zip code instantly.</p>
        </div>
      </div>
    </div>
  );
}
