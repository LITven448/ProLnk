import { useState } from 'react';

const profiles = [
  { label: "New Build (<5 yrs)", origin: "Any", surprises: ["Builder-grade AC units often undersized — get it inspected","Concrete slab foundation still needs watering in drought","Warranty claims must be filed within 1-2 years — act fast","HOA is often managed by builder in year 1 — attend meetings","Hard water will stain fixtures — install whole-home softener"] },
  { label: "Established Home (10-30 yrs)", origin: "Northeast", surprises: ["Foundation movement is normal — get annual inspection","Polybutylene pipes may still be present — check with plumber","AC is likely original and near end of life — budget $6-12K","Hail damage may be on roof — get inspection before buying","Attic insulation is often insufficient — add before summer"] },
  { label: "Older Home (30+ yrs)", origin: "California", surprises: ["Cast iron sewer lines common — scope before purchase","Knob-and-tube wiring possible — get electrical audit","Foundation pier-and-beam may need releveling","AC likely needs full replacement — budget immediately","Hard water scale buildup in pipes — flush and treat"] },
];

export default function DFWNewResidentHomeGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>DFW New Resident Home Guide 2026</h1>
          <p style={{ color: "#9CA3AF", fontSize: 17 }}>What DFW homeowners learn the hard way — before you find out on your own.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14, marginBottom: 36 }}>
          {[["🌡️","AC Runs Non-Stop","June–Sept your AC runs 24/7. Set expectations: $300-500/mo electric bill in summer."],["🌧️","Foundation Watering","Clay soil expands and contracts. Water foundation perimeter in droughts or it cracks."],["⛈️","Hail Season is Real","DFW is hail capital of US. Get impact-resistant roof class 4 — saves 20% on insurance."],["💧","Water is Hard","DFW water hardness is 15-20 GPG. Scale destroys water heaters. Get a softener."]].map(([icon,title,desc]) => (
            <div key={title as string} style={{ background: "#1a2a44", borderRadius: 12, padding: 18, borderLeft: "3px solid #F5E642" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginTop: 8 }}>{title as string}</div>
              <div style={{ color: "#9CA3AF", fontSize: 13, marginTop: 6 }}>{desc as string}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a2a44", borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>🔍 Your Home Surprise Checklist</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 16 }}>Select your home profile for a targeted DFW maintenance list:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {profiles.map((p, i) => (
              <button key={p.label} onClick={() => setSelected(i === selected ? null : i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "2px solid #F5E642", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                {p.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 12, padding: 20 }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 12 }}>Watch out for these DFW surprises:</div>
              <div style={{ display: "grid", gap: 8 }}>
                {profiles[selected].surprises.map((s, idx) => (
                  <div key={s} style={{ display: "flex", gap: 10, color: "#9CA3AF", fontSize: 14, alignItems: "flex-start" }}>
                    <span style={{ color: "#F5E642", minWidth: 20 }}>⚠️</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#1a2a44", borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 10 }}>🔧 Find Contractors Who Know DFW Homes</h2>
          <p style={{ color: "#9CA3AF", marginBottom: 14 }}>Foundation specialists, AC pros, hail roofers, water softener installers — ProLnk connects you with vetted DFW contractors who know these issues inside and out.</p>
          <div style={{ background: "#0A1628", borderRadius: 10, padding: 14, color: "#F5E642", fontWeight: 700, textAlign: "center" }}>
            🏡 prolnk.io — DFW Home Experts, Matched to Your Needs
          </div>
        </div>
      </div>
    </div>
  );
}

