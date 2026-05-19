import { useState } from 'react';

const decades = [
  { label: "1950s Builds", guide: "Post-war concrete slab or pier-and-beam construction. Original cast iron plumbing is likely still in place — schedule camera inspection. Knob-and-tube or early Romex wiring; panel upgrade strongly recommended. Roof may have original wood sheathing beneath newer layers." },
  { label: "1960s Builds", guide: "Aluminum wiring common in this era — requires licensed electrician pigtail repair or full rewire. Galvanized water lines likely corroding; water pressure drop is the tell. Original single-pane steel casement windows; replacement improves comfort and energy costs significantly." },
  { label: "1970s Builds", guide: "Polybutylene plumbing may have been installed in late-70s builds. Check HVAC ductwork — original flex duct often deteriorated. Insulation levels below current code; attic blow-in is high-ROI. Foundation movement common as piers have shifted over 50 years." },
  { label: "Renovated Historic", guide: "Confirm permits were pulled for all renovation work — unpermitted work creates liability. Verify updated plumbing and electrical are to code. Check for proper egress windows if bedrooms were added. Historic preservation overlay may restrict exterior changes — verify with City of FW." },
];

export default function FortWorthCulturalDistrictHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🎨</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>Fort Worth Cultural District Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            Near the Kimbell, Modern Art Museum, and TCU — walkable character with older home challenges.
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>🏛️ Neighborhood Character</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            The Cultural District sits west of downtown, adjacent to the Kimbell, Amon Carter, and Modern Art museums,
            with TCU just blocks south. Homes are predominantly 1950s–1970s brick ranches, many with original systems
            still in service. The walkable, arts-forward character drives demand — but buyers often discover hidden
            deferred maintenance after closing. Select your home decade for a targeted guide.
          </p>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏠 Select Your Home Decade</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {decades.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? "#F5E642″ : "#0f2040",
                color: selected === i ? "#0A1628″ : "#fff",
                border: "2px solid",
                borderColor: selected === i ? "#F5E642″ : "#1e3a5f",
                borderRadius: 8,
                padding: "0.75rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0f2040″, border: "2px solid #F5E642", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.75rem" }}>🔧 {decades[selected].label} Maintenance Guide</h3>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.7, margin: 0 }}>{decades[selected].guide}</p>
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 Cultural District Universal Watch List</h2>
          <ul style={{ color: "#94a3b8″, lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🔌 Electrical panel age — 60-amp panels need immediate upgrade for modern loads</li>
            <li>🚿 Cast iron drain lines — camera scope before any major renovation</li>
            <li>🌡️ Original window unit HVAC — central air conversion ROI is very high here</li>
            <li>🏗️ Pier-and-beam foundation — level check every 2–3 years minimum</li>
            <li>🎨 Historic overlay rules — check with City before any exterior paint or structure change</li>
          </ul>
        </div>

        <p style={{ color: "#475569″, fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects Cultural District homeowners with verified local pros. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}
