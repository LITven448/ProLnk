import { useState } from 'react';

const ageGroups: Record<string, { icon: string; title: string; flightNote: boolean; urgency: string; detail: string }[]> = {
  "1970s Homes": [
    { icon: "⚡", title: "Fuse Box to Breaker Panel", urgency: "Critical", flightNote: false, detail: "Original 60A fuse panels are a fire hazard and insurance issue. Full upgrade to 200A breaker panel required." },
    { icon: "🚿", title: "Galvanized Drain Replacement", urgency: "High", flightNote: false, detail: "50+ year old cast iron and galvanized drains are failing. PVC replacement restores full flow and prevents backups." },
    { icon: "🪟", title: "Noise Abatement Windows", urgency: "High", flightNote: true, detail: "DFW flight paths pass directly over Euless. STC-35+ rated windows reduce cabin noise 40% and add resale value." },
    { icon: "❄️", title: "HVAC Full Replacement", urgency: "High", flightNote: false, detail: "40-50 year units are beyond serviceable life. R-22 freon unavailable. New 16 SEER system saves $200/mo in cooling." },
  ],
  "1980s Homes": [
    { icon: "🔌", title: "Panel Upgrade & Arc Fault Install", urgency: "High", flightNote: false, detail: "100A panels need upgrade. Add AFCI breakers throughout — now required by code and reduces fire risk significantly." },
    { icon: "🌡️", title: "Attic Insulation Upgrade", urgency: "High", flightNote: true, detail: "R-11 insulation common in 1980s builds. Upgrade to R-38+ reduces both heat gain and aircraft noise transmission." },
    { icon: "💧", title: "Water Heater Replacement", urgency: "Medium", flightNote: false, detail: "40+ year old tank units are past expected life. Tankless upgrade saves $30/mo and eliminates flood risk." },
    { icon: "🏗️", title: "Foundation Check", urgency: "Medium", flightNote: false, detail: "Euless sits on mixed soil. 1980s slabs show typical settling. Monitor door frames and corners annually." },
  ],
  "1990s Homes": [
    { icon: "🌧️", title: "Roof Assessment", urgency: "Medium", flightNote: false, detail: "30-35 year architectural shingles near end of life. Inspect after each spring storm season in Euless." },
    { icon: "🪟", title: "Window Seal & Noise Check", urgency: "Medium", flightNote: true, detail: "Even newer windows degrade in flight path zones. Test for exterior noise at noon on weekdays — peak DFW arrival times." },
    { icon: "❄️", title: "HVAC Service & Coil Clean", urgency: "Medium", flightNote: false, detail: "Units approaching replacement age. Annual service now extends life 3-5 years. Budget for replacement by 2028." },
    { icon: "🌿", title: "Landscaping Root Survey", urgency: "Low", flightNote: false, detail: "30-year-old trees near sewer lines need camera inspection. Roots in Euless clay expand aggressively in dry summers." },
  ],
};

export default function EulessHomeownerGuide2026() {
  const [selected, setSelected] = useState("1980s Homes");
  const groups = Object.keys(ageGroups);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>✈️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 4px" }}>Euless TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>DFW Airport proximity · 1970s-1990s homes · Noise abatement zone · Original panels common</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642″ }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1″, lineHeight: 1.6 }}>
            ✈️ <strong style={{ color: "#F5E642″ }}>Flight Path Zone:</strong> Euless sits under active DFW approach corridors. Homes experience 65-75 dB aircraft noise during peak hours (6am-10pm). Items marked with ✈️ directly relate to sound abatement upgrades that improve comfort and home value.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642″, marginBottom: 14 }}>Select Your Home Age</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {groups.map(g => (
            <button key={g} onClick={() => setSelected(g)} style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid", borderColor: selected === g ? "#F5E642″ : "#1e3a5f", backgroundColor: selected === g ? "#F5E642" : "transparent", color: selected === g ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {g}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {ageGroups[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9″ }}>{item.title}</span>
                    {item.flightNote && <span style={{ fontSize: 11 }}>✈️</span>}
                  </div>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: item.urgency === "Critical" ? "#450a0a" : item.urgency === "High" ? "#7f1d1d" : item.urgency === "Medium" ? "#78350f" : "#14532d", color: item.urgency === "Critical" ? "#fecaca" : item.urgency === "High" ? "#fca5a5″ : item.urgency === "Medium" ? "#fcd34d" : "#86efac" }}>{item.urgency}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8″, lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔗 Find Euless-experienced contractors</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk connects Euless homeowners with pros who know DFW flight path upgrades inside and out.</p>
        </div>
      </div>
    </div>
  );
}