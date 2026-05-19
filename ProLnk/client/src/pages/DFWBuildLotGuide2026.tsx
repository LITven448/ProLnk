import { useState } from 'react';

const locationCosts: Record<string, { lotType: string; price: string; utilityCost: string; soilRisk: string; timeline: string }> = {
  "Inner DFW (Infill)": {
    lotType: "Infill lot in established neighborhood",
    price: "$150K–$400K+",
    utilityCost: "$5K–$20K (most utilities at street)",
    soilRisk: "High — expansive clay common, always soil test",
    timeline: "30–60 days for utility connections",
  },
  "Suburban Growth Corridor": {
    lotType: "Raw land in master-planned community",
    price: "$80K–$200K",
    utilityCost: "$20K–$60K (water, sewer, electric, gas lines)",
    soilRisk: "Moderate — varies by area, test required",
    timeline: "60–120 days for full utility buildout",
  },
  "Outer Exurban / Rural": {
    lotType: "Raw land with well & septic needed",
    price: "$40K–$120K",
    utilityCost: "$40K–$100K (well, septic, electric, possibly propane)",
    soilRisk: "Varies — percolation test for septic mandatory",
    timeline: "90–180 days, county permits slower",
  },
};

const dueDiligence = [
  { icon: "🔬", label: "Soil Test", detail: "Critical in DFW — expansive clay can crack slabs. Budget $500–$1,500." },
  { icon: "📏", label: "Survey", detail: "Boundary + topographic survey — required before design. $1,500–$4,000." },
  { icon: "📐", label: "Setbacks", detail: "Front, rear, side setbacks vary by city and zoning class. Pull the ordinance." },
  { icon: "💧", label: "Flood Zone Check", detail: "FEMA flood map + local floodplain office. Elevation certificate if in AE zone." },
  { icon: "⚡", label: "Utility Easements", detail: "Easements limit what you build and where — check plat carefully." },
  { icon: "🌳", label: "Tree Preservation", detail: "Many DFW cities require tree survey. Removal permits add cost and delay." },
];

export default function DFWBuildLotGuide2026() {
  const [location, setLocation] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>🌍 PROLNK GUIDE — DFW BUILD LOTS 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Build Lot Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>Finding and buying a lot in DFW — infill vs raw land, utility costs, setbacks, and soil testing.</p>

        <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 12 }}>📍 Location → Lot Development Cost Estimate</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {Object.keys(locationCosts).map(loc => (
            <button key={loc} onClick={() => setLocation(location === loc ? "" : loc)}
              style={{ background: location === loc ? "#F5E642" : "#1a2e50", color: location === loc ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{loc}</button>
          ))}
        </div>
        {location && (
          <div style={{ background: "#111d35", borderRadius: 10, padding: 20, marginBottom: 32 }}>
            <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📍 {location}</div>
            <div style={{ display: "grid", gap: 10, fontSize: 14 }}>
              <div><span style={{ color: "#aab" }}>Lot Type: </span>{locationCosts[location].lotType}</div>
              <div><span style={{ color: "#aab" }}>Price Range: </span><span style={{ color: "#F5E642" }}>{locationCosts[location].price}</span></div>
              <div><span style={{ color: "#aab" }}>Utility Cost: </span>{locationCosts[location].utilityCost}</div>
              <div><span style={{ color: "#aab" }}>Soil Risk: </span>{locationCosts[location].soilRisk}</div>
              <div><span style={{ color: "#aab" }}>Utility Timeline: </span>{locationCosts[location].timeline}</div>
            </div>
          </div>
        )}

        <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>✅ Lot Due Diligence Checklist</h2>
        <div style={{ marginBottom: 40 }}>
          {dueDiligence.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 22, minWidth: 36 }}>{d.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{d.label}</div>
                <div style={{ color: "#aab", fontSize: 13 }}>{d.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: 18, marginBottom: 16 }}>🏘️ DFW Growth Corridors Worth Watching</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 40 }}>
          {[["Celina / Prosper", "High growth, large lots, newer infrastructure"],
            ["Midlothian / Waxahachie", "More land per dollar, 30–40 min to Dallas"],
            ["Granbury / Weatherford", "Hill country feel, raw land available"],
            ["Rockwall / Royse City", "Lake access, suburban growth, I-30 corridor"],
          ].map(([city, desc]) => (
            <div key={city} style={{ background: "#111d35", border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 6 }}>📍 {city}</div>
              <div style={{ color: "#aab", fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642", borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 Need Soil, Survey, or Site Work via ProLnk?</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>ProLnk connects lot buyers with geotechnical engineers, surveyors, and site prep contractors across DFW.</div>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Connect with a Pro →</button>
        </div>
      </div>
    </div>
  );
}
