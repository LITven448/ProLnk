import { useState } from 'react';

const priorities = [
  { label: "Schools", emoji: "🎓", top3: ["Frisco ISD","Allen ISD","Carroll ISD (Southlake)"], details: ["Frisco ISD: 50+ National Merit Scholars/yr, 97% graduation rate","Allen ISD: AP course leader, exceptional athletics, new campuses","Carroll ISD: Ranked #1 in DFW for 5+ years, Westlake campus legendary"] },
  { label: "Commute", emoji: "🚗", top3: ["Coppell","Las Colinas","Plano"], details: ["Coppell: 20 min to DFW Airport, 25 min to corporate corridor","Las Colinas: Inside the Metroplex hub, walkable to office parks","Plano: Legacy West hub — Toyota, Liberty Mutual, JPMorgan all HQ here"] },
  { label: "Value", emoji: "💰", top3: ["Mesquite","Grand Prairie","Garland"], details: ["Mesquite: Sub $300K median, established neighborhoods, DFW access","Grand Prairie: Between Dallas and Fort Worth, strong value for space","Garland: Up-and-coming, fast appreciation, new development underway"] },
  { label: "Luxury", emoji: "💎", top3: ["Southlake","Westlake","Preston Hollow (Dallas)"], details: ["Southlake: Estate homes, Carroll ISD, #1 safest city in TX","Westlake: Ultra-luxury, Vaquero Club, Deloitte HQ, gated estates","Preston Hollow: Old money Dallas, oak canopy, celebrity neighbors"] },
];

export default function DFWNeighborhoodComparisonGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🗺️</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>DFW Neighborhood Comparison Guide 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 17 }}>DFW has 200+ distinct suburbs. Here are the top picks by what matters most to you.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 36 }}>
          {[["📏","Scale","DFW metro = 9,000 sq miles. Choosing the wrong suburb adds 45 min to your commute."],["🏫","Schools","School districts vary wildly — Frisco vs. Dallas ISD is a massive gap in outcomes."],["📈","Appreciation","Outer suburbs like Prosper and Celina are top appreciation bets for 2026."],["🤝","Community","Each suburb has its own identity — research the vibe before you buy."]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44″, borderRadius: 12, padding: 18, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>🎯 Find Your Top 3 DFW Neighborhoods</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>What matters most to your family?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            {priorities.map((p, i) => (
              <button key={p.label} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "12px 24px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                {p.emoji} {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628″, borderRadius: 12, padding: 24 }}>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 18, marginBottom: 16 }}>
                Top 3 for {priorities[selected].label}: {priorities[selected].top3.join(" · ")}
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {priorities[selected].details.map((d, idx) => (
                  <div key={d} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#F5E642″, fontWeight: 700, minWidth: 24 }}>{idx + 1}.</span>
                    <span style={{ color: "#9CA3AF", fontSize: 14 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 10 }}>🔧 Get Your New Neighborhood Set Up</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 14 }}>Wherever you land in DFW, ProLnk connects you with vetted local contractors — HVAC, plumbing, roofing, foundation — matched to your suburb and your home.</p>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 14, color: "#F5E642", fontWeight: 700, textAlign: "center" }}>
            🏡 prolnk.io — Local DFW Contractors, Every Suburb
          </div>
        </div>
      </div>
    </div>
  );
}

