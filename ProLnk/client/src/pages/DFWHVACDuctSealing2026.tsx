import { useState } from 'react';

export default function DFWHVACDuctSealing2026() {
  const [situation, setSituation] = useState("");

  const situations = [
    { id: "accessible", label: "Ducts visible in attic or crawl space", method: "Mastic Sealant", detail: "Use mastic sealant (water-based UL-listed product) applied with brush or gloved hand. DFW attic heat up to 160F — mastic stays flexible. Complement with foil tape at seams. Never use standard duct tape." },
    { id: "inaccessible", label: "Ducts hidden in walls or ceilings", method: "Aeroseal", detail: "Aeroseal is the only effective option for inaccessible ducts. Pressurize system and spray polymer particles that seal from inside. Professionally applied, costs $1,500-2,500 but seals ducts you cannot physically reach." },
    { id: "moderate", label: "20-30% leakage on blower door test", method: "Mastic + Aeroseal Combo", detail: "Combination approach: Aeroseal for hidden runs plus mastic for accessible connections. This leakage level is common in DFW homes built before 1995. Payback typically 4-6 years from energy savings." },
    { id: "severe", label: "Major leakage and high bills", method: "Duct Replacement", detail: "Above 30% leakage with ductwork over 20 years old, replacement often more cost-effective than sealing. New flexible duct with mastic at all connections and foil tape. R-8 insulation required in DFW attics." },
  ];

  const methods = [
    { name: "Mastic Sealant", rating: 5, cost: "$", longevity: "20+ years", best: "All accessible connections, boots, plenums", dfwNote: "Best choice for DFW — handles 160F attic temps without failure" },
    { name: "Foil Tape (UL-listed)", rating: 4, cost: "$", longevity: "10-15 years", best: "Accessible straight seams and tears", dfwNote: "Must be UL-listed aluminum foil tape — not shiny household tape" },
    { name: "Aeroseal", rating: 5, cost: "$$$", longevity: "15-20 years", best: "Hidden ducts, whole-system sealing", dfwNote: "Professional application only — seals from inside pressurized system" },
    { name: "Standard Duct Tape", rating: 1, cost: "$", longevity: "1-3 years", best: "Temporary patch only", dfwNote: "FAILS in DFW attic heat — adhesive melts, tape falls off within months" },
  ];

  const sel = situations.find(s => s.id === situation);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌀</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW HVAC Duct Sealing Methods Guide 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 14 }}>
            Best sealing methods for Dallas-Fort Worth homes — DFW attics reach 160F, method matters
          </p>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #F5E642″ }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>Situation to Sealing Method Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id === situation ? "" : s.id)}
                style={{ background: situation === s.id ? "#F5E642″ : "#0A1628", color: situation === s.id ? "#0A1628" : "#fff",
                  border: "1px solid #F5E642″, borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {s.label}
              </button>
            ))}
          </div>
          {sel ? (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16, border: "1px solid #4ADE80" }}>
              <div style={{ color: "#4ADE80″, fontWeight: 700, marginBottom: 8 }}>Recommended: {sel.method}</div>
              <div style={{ color: "#CBD5E1″, fontSize: 14 }}>{sel.detail}</div>
            </div>
          ) : (
            <div style={{ color: "#475569″, fontSize: 13, textAlign: "center" }}>Select your situation above</div>
          )}
        </div>

        <div>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 12 }}>DFW Sealing Method Comparison</h2>
          {methods.map((m, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 14, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{m.name}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: "#F5E642″, fontSize: 12 }}>Cost: {m.cost}</span>
                  <span style={{ color: "#4ADE80″, fontSize: 12 }}>{m.longevity}</span>
                </div>
              </div>
              <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 4 }}>Best for: {m.best}</div>
              <div style={{ color: m.rating >= 4 ? "#4ADE80″ : "#EF4444", fontSize: 12, fontWeight: 600 }}>
                {m.rating >= 4 ? "OK" : "NO"} DFW Note: {m.dfwNote}
              </div>
              <div style={{ marginTop: 6 }}>
                {Array.from({ length: 5 }, (_, j) => (
                  <span key={j} style={{ color: j < m.rating ? "#F5E642″ : "#334155", fontSize: 14 }}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569″, fontSize: 12 }}>
          ProLnk HVAC Duct Sealing Guide 2026 | Methods rated for DFW extreme heat conditions
        </div>
      </div>
    </div>
  );
}
