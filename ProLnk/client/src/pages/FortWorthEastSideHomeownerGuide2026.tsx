import { useState } from 'react';

const decades = [
  { label: "1940s Builds", priority: "Highest-risk era. Cast iron sewer lines — mandatory camera scope; replacement often needed. Knob-and-tube wiring — full rewire is a safety requirement. Pier-and-beam foundation likely shifted; get structural assessment. Expect full systems replacement budget." },
  { label: "1950s Builds", priority: "Cast iron plumbing still common. Check for galvanized water supply lines causing pressure and rust issues. 60-amp electrical panels must be upgraded before any renovation or sale. Roof decking may be original tongue-and-groove — inspect carefully at next reroof." },
  { label: "1960s–1970s Builds", priority: "Aluminum wiring era — requires licensed electrician inspection and pigtail repair. Polybutylene plumbing possible in late-70s builds. HVAC ductwork in poor shape after 50+ years. Foundation has had decades of clay movement — level check needed." },
  { label: "1980s Builds", priority: "More modern systems but still aging. HVAC units likely original or one replacement — efficiency upgrades yield big savings. Check roof age — 25-year shingles from the 80s are well past life. Water heater replacement if original. Good opportunity-market vintage." },
];

export default function FortWorthEastSideHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏚️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>Fort Worth East Side Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            Affordable 1940s–1980s housing stock — opportunity market, high maintenance awareness required.
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>💡 East FW Opportunity Market</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            East Fort Worth — stretching from Stop Six to Polytechnic Heights — represents Fort Worth's most
            affordable homeownership opportunity. Homes are 1940s–1980s vintage with original systems that
            require honest assessment and strategic investment. First-time buyers and investors who understand
            these homes can build significant equity. Select your home decade for a repair priority guide.
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
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.75rem" }}>🔧 {decades[selected].label} Repair Priority</h3>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.7, margin: 0 }}>{decades[selected].priority}</p>
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>💰 East FW Cost-Smart Strategy</h2>
          <ul style={{ color: "#94a3b8″, lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🔍 Pre-purchase inspection by licensed structural engineer — non-negotiable</li>
            <li>🚿 Sewer camera scope before closing — cast iron failure is expensive</li>
            <li>⚡ Electrical panel condition determines insurance eligibility — check first</li>
            <li>🏗️ Foundation repair is the highest-ROI investment in this market</li>
            <li>💡 Energy efficiency upgrades reduce monthly costs immediately</li>
          </ul>
        </div>

        <p style={{ color: "#475569″, fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects East FW homeowners with vetted, affordable local pros. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}
