import { useState } from 'react';

const homeAges = ["0-10 years", "10-20 years", "20-30 years", "30+ years"];

const guides: Record<string, string[]> = {
  "0-10 years": [
    "🏗️ Foundation post-tension cable inspection — document baseline",
    "🌿 Landscape establishment — tree root zones away from slab",
    "🏠 HOA architectural review process — additions and exterior changes",
    "🔌 Smart home system updates and integration check",
    "🌡️ HVAC zoning system calibration — Fairview custom homes often multi-zone",
    "🚰 Irrigation system controller update and rain sensor test",
    "🪟 High-end window seal warranty verification",
  ],
  "10-20 years": [
    "🏗️ Foundation inspection — pier and beam or slab settling assessment",
    "🌡️ HVAC system replacement evaluation — 10-15 year lifespan approaching",
    "🚰 Water heater inspection or replacement — tankless servicing",
    "🪵 Hardwood floor refinishing assessment — heavy use patterns",
    "🏠 HOA exterior paint color compliance — repainting cycle",
    "🔌 Electrical panel evaluation — 15-year inspection recommended",
    "🌿 Tree health assessment — mature oaks and cedars on large lots",
  ],
  "20-30 years": [
    "🏗️ Comprehensive foundation evaluation by licensed engineer",
    "🚿 Plumbing inspection — early PEX and copper connection integrity",
    "🔌 Full electrical system inspection — AFCI and GFCI upgrade review",
    "🌡️ HVAC full replacement planning — ductwork inspection included",
    "🪟 Window replacement consideration — dual-pane seal failures common",
    "🌿 Large lot drainage reassessment — mature tree root impact",
    "🏠 HOA dues structure review — major community maintenance cycles",
  ],
  "30+ years": [
    "🏗️ Structural engineer foundation evaluation — required for resale",
    "🚿 Galvanized or cast iron pipe replacement planning",
    "🔌 Complete panel and wiring update — insurance requirements tightening",
    "🌡️ Full HVAC ductwork replacement",
    "🪟 Full window replacement — energy efficiency and code compliance",
    "🏘️ Custom home renovation planning — permit and HOA coordination",
    "🌿 Mature tree risk assessment — proximity to structure",
  ],
};

export default function FairviewTexasHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          COLLIN COUNTY · FAIRVIEW, TX
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Fairview TX Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          Fairview is a small, affluent Collin County enclave tucked between Allen and McKinney. Custom homes on large lots, top-rated schools, and active HOAs define this market. As neighborhoods mature, ongoing maintenance demands increase — especially for homes now in their 15-25 year range.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏠 Select Your Home Age</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {homeAges.map((a) => (
              <button
                key={a}
                onClick={() => setSelected(a)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selected === a ? "#F5E642″ : "#1e3a5f",
                  color: selected === a ? "#0A1628″ : "#fff",
                  fontWeight: 600,
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>
              🔧 Fairview Maintenance Guide — {selected}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {guides[selected].map((item, i) => (
                <li key={i} style={{ padding: "0.6rem 0″, borderBottom: "1px solid #1e3a5f", color: "#cbd5e1" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📍 Fairview TX Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Collin"], ["Home Style", "Custom — large lots"], ["Median Home Value", "~$650K+"], ["HOA", "Active in most communities"], ["Schools", "Lovejoy ISD / Allen ISD"], ["Character", "Affluent suburban enclave"]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>{k}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
