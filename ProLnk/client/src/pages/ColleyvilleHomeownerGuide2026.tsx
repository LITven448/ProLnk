import { useState } from 'react';

const propertyScopes: Record<string, { icon: string; title: string; specialty: boolean; urgency: string; detail: string }[]> = {
  "Under 1 Acre": [
    { icon: "🌳", title: "Root Intrusion Camera Inspection", urgency: "High", specialty: false, detail: "Colleyville tree coverage is extensive. Even small lots have mature oaks whose roots reach sewer lines by year 20. Camera now." },
    { icon: "🏗️", title: "Foundation Pier Assessment", urgency: "Medium", specialty: false, detail: "Custom homes on smaller Colleyville lots use pier-and-beam or engineered slabs. Annual inspection preserves high resale value." },
    { icon: "❄️", title: "Zoned HVAC Service", urgency: "Medium", specialty: true, detail: "Colleyville custom homes commonly have 2-3 zone systems. Requires HVAC specialist with multi-zone experience — not a standard tech." },
    { icon: "🎨", title: "High-End Finish Maintenance", urgency: "Low", specialty: true, detail: "Stone, brick, stucco, and custom woodwork need specialty contractors. ProLnk pre-screens for luxury finish experience." },
  ],
  "1-2 Acres": [
    { icon: "🚿", title: "Septic or Sewer Line Survey", urgency: "High", specialty: false, detail: "1-2 acre Colleyville properties often have longer sewer runs. Full camera inspection every 5 years — root intrusion is primary risk." },
    { icon: "🌿", title: "Irrigation System Audit", urgency: "High", specialty: false, detail: "Multi-zone irrigation for 1-2 acre lots runs $4K-8K to service properly. Check head coverage, valve function, and controller." },
    { icon: "🏚️", title: "Drainage & Grading Assessment", urgency: "Medium", specialty: false, detail: "Large lots collect significant water. French drains and swale grading protect foundations from pooling — common issue in Colleyville." },
    { icon: "⚡", title: "200A+ Panel & Generator Hookup", urgency: "Medium", specialty: true, detail: "Larger homes need 200-400A service. Whole-home generator installation common in Colleyville — requires licensed electrician and permit." },
  ],
  "2+ Acres": [
    { icon: "🌊", title: "Pond & Water Feature Maintenance", urgency: "High", specialty: true, detail: "Colleyville estate lots frequently feature ponds or water features. Annual pump service, liner inspection, and algae treatment required." },
    { icon: "🌳", title: "Arborist Tree Risk Assessment", urgency: "High", specialty: true, detail: "Large-lot Colleyville properties have significant tree coverage. Certified arborist should assess storm risk — limb failure liability on estates is significant." },
    { icon: "🏗️", title: "Private Drive & Hardscape", urgency: "Medium", specialty: false, detail: "Long private drives crack after 10-15 years. Seal coat or overlay before full replacement — saves $15K-40K on estate driveways." },
    { icon: "🔥", title: "Commercial-Grade HVAC Oversight", urgency: "Medium", specialty: true, detail: "5,000+ sqft Colleyville homes run 5-6 ton systems. Annual service contract with HVAC specialist — not general HVAC — is essential." },
  ],
};

export default function ColleyvilleHomeownerGuide2026() {
  const [selected, setSelected] = useState("1-2 Acres");
  const sizes = Object.keys(propertyScopes);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌟</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "12px 0 4px" }}>Colleyville TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Affluent Tarrant suburb · Custom homes 1990s-2010s · Large lots · Specialty contractors required</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: "20px 24px", marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
          <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", lineHeight: 1.6 }}>
            🌳 <strong style={{ color: "#F5E642" }}>Tree Coverage & Root Risk:</strong> Colleyville has more mature tree coverage than any other Tarrant County city. Beautiful for curb appeal — but post oak, cedar elm, and live oak roots actively seek sewer lines. Items marked 🔬 require specialty contractors with luxury home experience.
          </p>
        </div>

        <h2 style={{ fontSize: 17, color: "#F5E642", marginBottom: 14 }}>Select Your Property Size</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          {sizes.map(s => (
            <button key={s} onClick={() => setSelected(s)} style={{ padding: "10px 20px", borderRadius: 8, border: "2px solid", borderColor: selected === s ? "#F5E642" : "#1e3a5f", backgroundColor: selected === s ? "#F5E642" : "transparent", color: selected === s ? "#0A1628" : "#94a3b8", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {propertyScopes[selected].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#111f3a", borderRadius: 10, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{item.title}</span>
                    {item.specialty && <span style={{ fontSize: 11, backgroundColor: "#2d1b69", padding: "2px 6px", borderRadius: 4, color: "#c4b5fd" }}>🔬 Specialty</span>}
                  </div>
                  <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 20, backgroundColor: item.urgency === "High" ? "#7f1d1d" : item.urgency === "Medium" ? "#78350f" : "#14532d", color: item.urgency === "High" ? "#fca5a5" : item.urgency === "Medium" ? "#fcd34d" : "#86efac" }}>{item.urgency}</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center", backgroundColor: "#111f3a", borderRadius: 12, padding: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🔗 Find specialty Colleyville contractors</p>
          <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>ProLnk pre-screens for luxury and specialty experience — the right contractor for your Colleyville estate.</p>
        </div>
      </div>
    </div>
  );
}