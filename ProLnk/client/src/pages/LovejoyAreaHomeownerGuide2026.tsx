import { useState } from 'react';

const propertySizes = ["Under 0.5 ac", "0.5 - 1 ac", "1 - 3 ac", "3+ ac"];

const guides: Record<string, string[]> = {
  "Under 0.5 ac": [
    "🏗️ Foundation inspection — Lovejoy area custom homes on expansive clay soils",
    "🌿 HOA landscape standards — premium community expectations are high",
    "🏠 Exterior paint and trim maintenance — resale value highly sensitive here",
    "🌡️ HVAC multi-zone system calibration — common in Lovejoy custom builds",
    "🚰 Irrigation controller seasonal programming",
    "🔌 Whole-home surge protection — recommended with premium electronics",
    "🪟 Premium window cleaning and seal inspection",
  ],
  "0.5 - 1 ac": [
    "💧 Well water test if applicable — some Lovejoy parcels on private well",
    "🏗️ Foundation engineer baseline report — document now, protect resale value",
    "🌿 Mature tree assessment — oak and pecan canopy management",
    "🚿 Plumbing inspection — homes in this size range often custom 2000s builds",
    "🌡️ HVAC full service — zoned systems common, verify all zones functioning",
    "🏠 Detached garage and outbuilding weatherproofing",
    "🔌 Generator hookup readiness — power outage exposure on larger lots",
  ],
  "1 - 3 ac": [
    "💧 Well pump and pressure tank inspection — 10-15 year replacement cycle",
    "🚽 Aerobic septic system annual service contract — Collin County requirement",
    "🏗️ Drainage and grading evaluation — larger lot runoff management",
    "🌿 Pasture and tree line maintenance — cedar removal if needed",
    "🏘️ Fence perimeter inspection — split rail and ornamental iron common",
    "🌡️ Propane system inspection if applicable",
    "🚜 Driveway and parking surface maintenance",
  ],
  "3+ ac": [
    "💧 Well water comprehensive test — metals, bacteria, pH, hardness, nitrates",
    "🚽 Septic system capacity evaluation — load vs household size review",
    "🌾 Agricultural exemption documentation — wildlife, livestock or crop records",
    "🏗️ Pond, creek, or drainage infrastructure inspection",
    "🔒 Property boundary survey — encroachment risk on large parcels",
    "🌿 Invasive species management — cedar, privet, elm control plan",
    "🚜 Road, culvert, and gate maintenance planning",
  ],
};

export default function LovejoyAreaHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          COLLIN COUNTY · LOVEJOY ISD AREA
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Lovejoy Area Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          The Lovejoy ISD corridor is one of Collin County's most sought-after unincorporated areas. Top-rated schools drive premium home values, mostly 2000s-2020s custom builds on large lots. Some properties remain on well water and septic, while maintenance standards are elevated by the premium resale market.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📐 Select Your Property Size</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {propertySizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelected(s)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selected === s ? "#F5E642″ : "#1e3a5f",
                  color: selected === s ? "#0A1628″ : "#fff",
                  fontWeight: 600,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>
              🔧 Lovejoy Area Maintenance Guide — {selected}
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
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📍 Lovejoy Area Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Collin (unincorporated)"], ["School District", "Lovejoy ISD — top 5 in TX"], ["Home Style", "Custom — large lots"], ["Median Home Value", "~$700K-$1M+"], ["Water Source", "Mixed — city and well"], ["Character", "Premium semi-rural"]].map(([k, v]) => (
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
