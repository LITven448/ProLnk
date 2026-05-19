import { useState } from 'react';

const buildYears = ["2018-2020", "2021-2022", "2023-2024", "2025-2026"];

const checklists: Record<string, string[]> = {
  "2018-2020": [
    "🏗️ Foundation inspection — early settling common in Collin clay soils",
    "🌿 Irrigation system check — original install may need zone adjustments",
    "🪟 Window seal integrity — first thermal cycling stress showing",
    "🔌 GFCI outlet testing throughout home",
    "🌡️ HVAC filter replacement and coil cleaning",
    "🚰 Water heater anode rod inspection — 6-8 year mark",
    "🏠 HOA compliance walk — fence height and exterior paint codes",
  ],
  "2021-2022": [
    "🏗️ Foundation pier monitoring — peak settling window",
    "🌧️ Drainage grading check — ensure slope away from slab",
    "🚿 Plumbing fixture seal check — PEX fittings approaching first stress cycle",
    "🌡️ HVAC manufacturer warranty expiring — service before lapse",
    "🏠 HOA landscape requirements — tree and sod maintenance standards",
    "🔒 Smart home device firmware updates",
    "🪵 Fence and gate hardware lubrication",
  ],
  "2023-2024": [
    "🏗️ Foundation baseline measurement — document now before settling accelerates",
    "🌿 Sod and landscaping establishment check",
    "🚰 Builder warranty claim window closing — submit any defects now",
    "🔌 Panel labeling verification — common builder oversight",
    "🌡️ HVAC air balance check — duct sealing common issue in new Anna builds",
    "🪟 Caulking inspection around windows and doors",
    "🏘️ HOA new community rules review",
  ],
  "2025-2026": [
    "📋 Builder warranty registration — file within 30 days of close",
    "🏗️ Foundation pre-settle baseline photo documentation",
    "🚰 Water pressure test — verify at 60-80 PSI",
    "🌡️ HVAC commissioning report review",
    "🔌 Electrical panel inspection before moving in",
    "🌿 Irrigation startup and zone programming",
    "🏠 HOA welcome packet review — dues and architectural rules",
  ],
};

export default function AnnaTexasHomeownerGuide2026() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          COLLIN COUNTY · ANNA, TX
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Anna TX Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.7 }}>
          Anna is one of Collin County's fastest-growing cities — affordable entry pricing, master-planned communities, and nearly all homes built after 2015. Foundation settling on newer builds and active HOAs are the top homeowner concerns heading into 2026.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>📅 Select Your Build Year</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {buildYears.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selectedYear === y ? "#F5E642" : "#1e3a5f",
                  color: selectedYear === y ? "#0A1628" : "#fff",
                  fontWeight: 600,
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {selectedYear && (
          <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>
              🏠 Anna Maintenance Checklist — Built {selectedYear}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {checklists[selectedYear].map((item, i) => (
                <li key={i} style={{ padding: "0.6rem 0", borderBottom: "1px solid #1e3a5f", color: "#cbd5e1" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1rem", marginBottom: "0.75rem" }}>📍 Anna TX Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Collin"], ["Growth Rate", "Top 5% in TX"], ["Avg Home Age", "4-8 years"], ["HOA Coverage", "~85% of neighborhoods"], ["Water Source", "City — North Texas MWD"], ["Foundation Type", "Post-tension slab"]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.75rem" }}>{k}</div>
                <div style={{ color: "#F5E642", fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
