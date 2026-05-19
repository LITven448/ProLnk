import { useState } from 'react';

const propertyTypes = [
  { type: "new-construction", label: "New Construction", tips: ["Builder warranty expiration checklist — document all issues before year 1 ends", "HVAC startup inspection to verify correct sizing for Ellis County climate", "Verify grading around foundation before first rainy season"] },
  { type: "acreage-septic", label: "Acreage + Septic/Well", tips: ["Septic pump and inspection every 3–5 years minimum", "Well water test annually for bacteria, nitrates, heavy metals", "Air quality awareness: steel mill operations — HVAC filters monthly in heavy wind seasons"] },
  { type: "established-suburb", label: "Established Subdivision", tips: ["Midlothian growth means aging infrastructure in older areas — check water pressure", "Steel mill air particulates accelerate HVAC filter loading — change every 30–45 days", "Foundation on expansive Ellis County soils requires annual monitoring"] }
];

const highlights = [
  { icon: "🏭", title: "Steel Mill Air Quality", desc: "Midlothian steel operations elevate particulates — HVAC filters need more frequent changes" },
  { icon: "🚀", title: "Fastest Growing", desc: "Ellis County fastest growing city means active construction dust and infrastructure strain" },
  { icon: "🌊", title: "Septic & Well Common", desc: "Larger lots in outer Midlothian still rely on private septic and well systems" },
  { icon: "🏗️", title: "New Construction Wave", desc: "High volume of new builds means builder warranty management is critical 2025–2026″ }
];

export default function MidlothianHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = propertyTypes.find(p => p.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🏭</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>Midlothian TX Homeowner Deep Dive 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "0.95rem" }}>Part 2 — Steel Mill Air Quality, New Construction and Rural Property Guide</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {highlights.map(h => (
            <div key={h.title} style={{ background: "#111e35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{h.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 4 }}>{h.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: 4 }}>{h.desc}</div>
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
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Midlothian Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569″, fontSize: "0.9rem" }}>Select your property type to see Midlothian-specific maintenance priorities.</div>}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginTop: 0 }}>Midlothian Year-Round Checklist</h2>
          {["HVAC air filter: change every 30–45 days due to steel mill particulates", "Annual well/septic service for rural lot properties", "Foundation moisture management — Ellis County expansive soils", "Roof inspection after construction season — nearby build dust damages roofing materials"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk connects Midlothian homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
