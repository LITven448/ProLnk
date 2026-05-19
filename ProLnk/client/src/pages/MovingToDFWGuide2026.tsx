import { useState } from 'react';

const neighborhoods = [
  { lifestyle: "Young Family", suburbs: ["Frisco", "Allen", "McKinney"], why: "Top-rated schools, safe neighborhoods, new construction" },
  { lifestyle: "Urban Professional", suburbs: ["Uptown Dallas", "Deep Ellum", "Bishop Arts"], why: "Walkable, nightlife, restaurants, arts scene" },
  { lifestyle: "Affordable Starter", suburbs: ["Mesquite", "Grand Prairie", "Garland"], why: "Lower home prices, good value, established communities" },
  { lifestyle: "Luxury", suburbs: ["Southlake", "Westlake", "Preston Hollow"], why: "Top schools, estate homes, prestige zip codes" },
];

export default function MovingToDFWGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>Moving to DFW Guide 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 18 }}>140,000 new residents per year. Find out where you belong.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 40 }}>
          {[["🌡️","DFW Facts","4th largest metro in the US with 7.8M+ residents"],["📈","Growth","140K new residents per year — fastest-growing metro"],["💼","Economy","HQ hub: Toyota, AT&T, American Airlines, Charles Schwab"],["🏗️","Housing","New construction everywhere — suburbs still affordable"]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44″, borderRadius: 12, padding: 20, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 14, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 22, marginBottom: 8 }}>☀️ Before Your First DFW Summer</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>June through September in DFW is not like anywhere else. Heat index regularly hits 105-115°F. Your AC will run 24/7. Prepare your home before June 1.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["Get AC serviced in March","Add attic insulation","Weatherstrip all doors","Stock up on window film","Set up ceiling fans in every room"].map(tip => (
              <span key={tip} style={{ background: "#0A1628″, borderRadius: 20, padding: "6px 14px", color: "#F5E642", fontSize: 14 }}>✅ {tip}</span>
            ))}
          </div>
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 22, marginBottom: 20 }}>🗺️ Find Your DFW Neighborhood</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 20 }}>Select your lifestyle to see the best DFW suburbs for you:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginBottom: 20 }}>
            {neighborhoods.map((n, i) => (
              <button key={n.lifestyle} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "14px 10px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {n.lifestyle}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628″, borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>Top picks: {neighborhoods[selected].suburbs.join(" · ")}</div>
              <div style={{ color: "#9CA3AF" }}>{neighborhoods[selected].why}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44″, borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 22, marginBottom: 12 }}>🔧 Set Up Home Services Fast</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>ProLnk connects new DFW residents with vetted local contractors — HVAC, plumbing, electrical, and more. Get quotes in hours, not weeks.</p>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16, color: "#F5E642", fontWeight: 700, textAlign: "center", fontSize: 16 }}>
            🏡 prolnk.io — Find DFW Contractors Instantly
          </div>
        </div>
      </div>
    </div>
  );
}

