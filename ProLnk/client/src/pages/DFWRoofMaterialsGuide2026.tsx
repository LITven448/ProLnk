import { useState } from 'react';

type HomeType = "single" | "ranch" | "flat";
type Budget = "economy" | "mid" | "premium";

const recommendations: Record<HomeType, Record<Budget, { material: string; lifespan: string; notes: string }>> = {
  single: {
    economy: { material: "3-Tab Asphalt", lifespan: "15–20 yrs", notes: "Budget-friendly, less wind resistance than architectural." },
    mid: { material: "Architectural (Dimensional)", lifespan: "25–30 yrs", notes: "DFW standard. Better aesthetics, higher wind rating." },
    premium: { material: "Class 4 Impact-Resistant", lifespan: "30–40 yrs", notes: "20–30% insurance discount in TX. Best ROI for DFW hail zones." },
  },
  ranch: {
    economy: { material: "Architectural Shingles", lifespan: "25–30 yrs", notes: "Ideal for low slopes. Check attic ventilation before install." },
    mid: { material: "Metal Shingles", lifespan: "40–50 yrs", notes: "Looks like shingles, performs like metal. Mid-weight option." },
    premium: { material: "Standing Seam Metal", lifespan: "50+ yrs", notes: "Top DFW pick for longevity. Hail and wind resistant. Higher upfront." },
  },
  flat: {
    economy: { material: "EPDM (Rubber)", lifespan: "15–25 yrs", notes: "Affordable for flat/low-slope. Seam points need monitoring." },
    mid: { material: "TPO Membrane", lifespan: "20–30 yrs", notes: "Best value for DFW flat roofs. Energy efficient white surface." },
    premium: { material: "Spray Polyurethane Foam (SPF)", lifespan: "20+ yrs (recoat)", notes: "Seamless, excellent insulation. Common for DFW commercial." },
  },
};

export default function DFWRoofMaterialsGuide2026() {
  const [homeType, setHomeType] = useState<HomeType>("single");
  const [budget, setBudget] = useState<Budget>("mid");
  const rec = recommendations[homeType][budget];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW Roof Materials Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>Texas heat, hail, and wind demand smarter material choices. Find yours below.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 32 }}>
          {[
            { icon: "🌡️", title: "TX Heat Impact", body: "DFW summers push attic temps to 140°F. Dark shingles absorb heat — consider cool roof coatings or metal." },
            { icon: "🛡️", title: "Class 4 Insurance Savings", body: "Class 4 impact-resistant shingles qualify for 20–30% insurance discounts in TX. Pays back in 3–5 years." },
            { icon: "🌬️", title: "Wind Rating Matters", body: "DFW sees 60–80 mph gusts. Architectural shingles rated 130 mph. Metal standing seam rated 140+ mph." },
            { icon: "⚡", title: "Energy Efficiency", body: "TPO white membranes and metal roofs reflect 65–85% of solar heat. Reduces AC load by 10–25%." },
          ].map(card => (
            <div key={card.title} style={{ background: "#132240", borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 5, fontSize: 14 }}>{card.title}</div>
              <div style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", marginBottom: 20, fontSize: 20 }}>🔧 Home Type + Budget → Material Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#94a3b8", marginBottom: 8, fontSize: 13 }}>Home Type</div>
            <div style={{ display: "flex", gap: 10 }}>
              {(["single", "ranch", "flat"] as HomeType[]).map(t => (
                <button key={t} onClick={() => setHomeType(t)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: homeType === t ? "#F5E642" : "#1e3a5f", color: homeType === t ? "#0A1628" : "#fff" }}>{t === "single" ? "2-Story" : t === "ranch" ? "Ranch/1-Story" : "Flat/Commercial"}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#94a3b8", marginBottom: 8, fontSize: 13 }}>Budget Range</div>
            <div style={{ display: "flex", gap: 10 }}>
              {(["economy", "mid", "premium"] as Budget[]).map(b => (
                <button key={b} onClick={() => setBudget(b)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: budget === b ? "#F5E642" : "#1e3a5f", color: budget === b ? "#0A1628" : "#fff" }}>{b === "economy" ? "Economy" : b === "mid" ? "Mid-Range" : "Premium"}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: "#F5E642", marginBottom: 4 }}>{rec.material}</div>
            <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 10, fontSize: 14 }}>⏱ {rec.lifespan}</div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.6, fontSize: 15 }}>{rec.notes}</p>
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#0A1628", marginBottom: 6 }}>🏠 Get quotes from ProLnk-vetted DFW roofers familiar with your material choice.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Pre-screened for manufacturer certification, local experience, and insurance compliance.</div>
        </div>
      </div>
    </div>
  );
}
