import { useState } from 'react';

const propertyTypes = [
  { type: "rural-acreage", label: "Rural Acreage (Septic/Well)", tips: ["Well pump inspection every 2–3 years — Hill County water tables vary", "Septic system pumping every 3–5 years; longer drive times for service pros", "Propane tank inspection annually — rural homes less likely on natural gas grid"] },
  { type: "older-farmhouse", label: "Older Farmhouse (Pre-1980)", tips: ["Knob-and-tube or early aluminum wiring common — full electrical audit priority", "Original plumbing galvanized or cast iron — inspect for corrosion", "Foundation pier-and-beam common — inspect for moisture and settlement every 2 years"] },
  { type: "small-town", label: "Small Town Home (Hillsboro/Corsicana)", tips: ["Municipal infrastructure aging — verify water pressure and line integrity", "HVAC replacement more expensive due to limited local contractor competition", "Roofing inspection critical — outer DFW gets hail with less rapid response coverage"] }
];

const insights = [
  { icon: "🌾", title: "Rural Self-Reliance", desc: "Outer DFW fringe: fewer contractors, longer response times — preventive maintenance critical" },
  { icon: "🚗", title: "Contractor Access", desc: "Hillsboro/Corsicana/Waxahachie corridor has limited specialty trade coverage" },
  { icon: "💧", title: "Well and Septic Common", desc: "Many Hill County properties remain on private water and waste systems" },
  { icon: "🌩️", title: "Hail Corridor", desc: "Southwest DFW fringe sits in active hail corridor — roof inspection after every storm" }
];

export default function HillCountyHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = propertyTypes.find(p => p.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🌾</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>Hill County / Outer DFW Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "0.95rem" }}>Hillsboro · Corsicana · Waxahachie Corridor — Rural Home Maintenance Reference</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {insights.map(item => (
            <div key={item.title} style={{ background: "#111e35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 4 }}>{item.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginTop: 0 }}>Select Your Property Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {propertyTypes.map(p => (
              <button key={p.type} onClick={() => setSelected(p.type)}
                style={{ background: selected === p.type ? "#F5E642″ : "#1e3a5f", color: selected === p.type ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                {p.label}
              </button>
            ))}
          </div>
          {current && (
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Outer DFW Rural Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569″, fontSize: "0.9rem" }}>Select your property type to see outer DFW rural maintenance priorities.</div>}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginTop: 0 }}>Rural Outer DFW Annual Checklist</h2>
          {["Book contractors early — limited availability in Hill/Navarro county area", "Generator inspection — power outages more frequent in rural areas", "Roof inspection after hail: outer DFW corridor averages 2–3 hail events per year", "Propane/fuel oil level check before winter — longer delivery windows"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk connects outer DFW homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
