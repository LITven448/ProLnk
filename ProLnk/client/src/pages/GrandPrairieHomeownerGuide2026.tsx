import { useState } from 'react';

const homeTypes: Record<string, { icon: string; title: string; cost: string; detail: string }[]> = {
  "Older Ranch (1970s-1980s)": [
    { icon: "🏗️", title: "Foundation Pier Installation", cost: "$250-400/pier", detail: "Eastern Grand Prairie clay soils are among the most expansive in Tarrant County. 8-12 piers typical for a 1,500 sqft home." },
    { icon: "⚡", title: "Panel Upgrade to 150A+", cost: "$1,800-2,800″, detail: "60A fuse boxes still found in GP homes. Required for central AC and modern appliances. Get 3 bids." },
    { icon: "💧", title: "Galvanized Pipe Replacement", cost: "$3,500-6,000″, detail: "50-year-old galvanized supply lines restrict flow and leach rust. Replace with PEX — cheaper than copper." },
    { icon: "❄️", title: "Window AC to Central HVAC", cost: "$5,000-8,000″, detail: "Many older GP homes still run window units. Central system adds $30K to home value — high ROI upgrade." },
  ],
  "Tract Home (1990s-2000s)": [
    { icon: "🌧️", title: "Roof Replacement", cost: "$7,000-12,000″, detail: "25-30 year 3-tab shingles at end of life. GP sees strong spring storms — do not wait for interior damage." },
    { icon: "🏚️", title: "Foundation Monitoring & Watering", cost: "$0-200/yr", detail: "Perimeter soaker hose program prevents clay shrinkage. Cheapest foundation protection available." },
    { icon: "🚿", title: "Sewer Camera Inspection", cost: "$150-300″, detail: "Tree roots in GP clay soils are aggressive. Camera every 5 years saves $8K+ emergency replacement." },
    { icon: "🎨", title: "Exterior Repaint & Caulk", cost: "$3,000-5,500″, detail: "10-15 year exterior paint cycle. Proper caulking around all penetrations prevents water intrusion on budget homes." },
  ],
  "Newer Build (2005+)": [
    { icon: "🛡️", title: "Builder Warranty Review", cost: "$0″, detail: "Structural warranties run 10 years. Review scope before expiration — document any cracks or defects now." },
    { icon: "🌿", title: "Landscape Drainage Grading", cost: "$500-1,500″, detail: "GP sits in a flood-prone corridor between DFW. Ensure positive drainage away from foundation on all sides." },
    { icon: "🔥", title: "HVAC Tune-Up", cost: "$80-150″, detail: "Units under 15 years just need annual service. GP summer peaks at 105F — coil cleaning is essential." },
    { icon: "🪟", title: "Window Seal Check", cost: "$20-100/window", detail: "Foggy or condensation between panes means failed seal. Replace affected units before mold develops." },
  ],
};

export default function GrandPrairieHomeownerGuide2026() {
  const [selected, setSelected] = useState("Older Ranch (1970s-1980s)");
  const types = Object.keys(homeTypes);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 4px" }}>Grand Prairie TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Between Dallas and Fort Worth · High clay soil foundation risk · Affordable maintenance focus</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642″ }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1″, lineHeight: 1.6 }}>
            🧱 <strong style={{ color: "#F5E642″ }}>Eastern Clay Soil Alert:</strong> Grand Prairie eastern neighborhoods sit on some of the most expansive clay soils in North Texas. Seasonal shrink-swell cycles cause more foundation movement than western GP. Budget $500-800/yr for preventive watering programs.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642″, marginBottom: 14 }}>Select Your Home Type</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setSelected(t)} style={{ padding: "10px 18px", borderRadius: 8, border: "2px solid", borderColor: selected === t ? "#F5E642″ : "#1e3a5f", backgroundColor: selected === t ? "#F5E642" : "transparent", color: selected === t ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {homeTypes[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9″ }}>{item.title}</span>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: "#1e3a5f", color: "#F5E642″, fontWeight: 600 }}>{item.cost}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8″, lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔗 Find budget-friendly Grand Prairie contractors</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk connects Grand Prairie homeowners with competitive local bids — saving $1,500+ on average.</p>
        </div>
      </div>
    </div>
  );
}
