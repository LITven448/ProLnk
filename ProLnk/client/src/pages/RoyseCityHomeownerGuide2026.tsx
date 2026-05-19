import { useState } from 'react';

const homeAges = ["Built 2018-2020″, "Built 2021-2022", "Built 2023-2024", "Built 2025-2026"];

const checklists: Record<string, string[]> = {
  "Built 2018-2020″: [
    "🏗️ Foundation inspection — Rockwall County clay soil peak settling window",
    "🌿 Irrigation system zone check — original install adjustments needed",
    "🌡️ HVAC manufacturer warranty expiring — schedule full service",
    "🚰 Water heater anode rod inspection — approaching 6-8 year mark",
    "🪟 Window and door seal integrity check",
    "🏠 HOA compliance walk — fence and landscaping standards",
    "🔌 GFCI and AFCI breaker test throughout home",
  ],
  "Built 2021-2022″: [
    "🏗️ Foundation pier monitoring — active settling common in this window",
    "🌧️ Grading inspection — ensure positive drainage away from slab",
    "🚿 PEX plumbing fitting stress check — first major thermal cycle",
    "🌡️ HVAC filter and coil cleaning — volume builder installs need extra care",
    "🏠 HOA landscape requirements — tree maturity and sod maintenance",
    "🔌 Smart home firmware and panel labeling audit",
    "🪵 Wood trim and fascia caulking — UV exposure on newer builds",
  ],
  "Built 2023-2024″: [
    "🏗️ Foundation baseline documentation — photograph and measure now",
    "🌿 Sod establishment assessment — irrigation schedule calibration",
    "📋 Builder warranty claim deadline — submit defect list before 2-year mark",
    "🔌 Electrical panel labeling verification — common builder gap",
    "🌡️ HVAC air balance and duct leakage check",
    "🪟 Caulk and weatherstripping installation — new construction gaps common",
    "🏘️ HOA community rules orientation",
  ],
  "Built 2025-2026″: [
    "📋 Builder warranty registration — file within 30 days of close",
    "🏗️ Foundation pre-settle photo baseline",
    "🚰 Water pressure test — verify 60-80 PSI at fixtures",
    "🌡️ HVAC commissioning report review with builder",
    "🔌 Electrical panel walkthrough and labeling",
    "🌿 Irrigation startup programming",
    "🏠 HOA welcome packet and dues schedule review",
  ],
};

export default function RoyseCityHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          ROCKWALL COUNTY · ROYSE CITY, TX
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Royse City TX Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          Royse City has transformed from a quiet Rockwall County town to one of DFW's fastest-growing suburbs. Massive new construction from 2018-2026 means most homeowners are navigating the critical first years of foundation settling, builder warranty windows, and new community HOA ramp-ups.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📅 Select Your Home's Build Year</h2>
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
              🏠 Royse City Maintenance Checklist — {selected}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {checklists[selected].map((item, i) => (
                <li key={i} style={{ padding: "0.6rem 0″, borderBottom: "1px solid #1e3a5f", color: "#cbd5e1" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📍 Royse City TX Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Rockwall"], ["Growth Rate", "Top 10 in TX"], ["Avg Home Age", "2-7 years"], ["Foundation Type", "Post-tension slab"], ["HOA Coverage", "~80% of new communities"], ["I-30 Access", "Direct — commuter friendly"]].map(([k, v]) => (
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
