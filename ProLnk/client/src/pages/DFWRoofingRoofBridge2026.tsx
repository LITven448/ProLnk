import { useState } from 'react';

const flashingTypes = [
  { name: "Step Flashing", icon: "👣", desc: "L-shaped pieces woven between shingles where roof meets a vertical wall. Each piece covers one shingle course. DFW failure: improper weave allows wind-driven rain intrusion." },
  { name: "Kickout Flashing", icon: "↗️", desc: "Diverts water away from the wall at the eave end of step flashing. One of the most frequently missing flashings in DFW homes — causes wall rot and interior water damage." },
  { name: "Counter Flashing", icon: "⬆️", desc: "Metal cap embedded in brick mortar that covers the top edge of step flashing. Prevents water from running behind the step flashing in DFW wind-rain events." },
  { name: "Apron Flashing", icon: "🔽", desc: "Horizontal flashing at the base of chimneys or dormers where the roof meets a vertical face. DFW chimneys frequently have failed apron flashing from thermal movement." },
];

const dfwFailureModes = [
  { mode: "Wind-Driven Rain", icon: "🌬️", note: "DFW storms bring horizontal rain at 50–70 mph. Step flashing without proper counter flashing is ineffective in these conditions — water travels upward under the flashing." },
  { mode: "Missing Kickout", icon: "🏚️", note: "Studies show 90% of DFW water damage at roof-to-wall junctions involves missing or improperly installed kickout flashing. Required by IRC since 2012 but not enforced retroactively." },
  { mode: "Mortar Failure", icon: "🧱", note: "Counter flashing in DFW brick homes loses mortar bond after 15–20 years from heat cycling (100F+ summers). Water infiltrates behind counter flashing and is invisible until interior damage appears." },
  { mode: "Thermal Expansion", icon: "🌡️", note: "DFW 70F temperature swings cause metal flashing to expand and contract. Caulk at flashing edges fails in 3–5 years — DFW roofers should use elastomeric sealants rated for 150F+." },
];

const concerns = [
  { label: "Water stains on interior wall below roofline", guide: "Likely step or counter flashing failure. In DFW brick homes, water travels inside the wall cavity for feet before appearing inside. Locate the roof-to-wall junction above the stain and inspect all flashing." },
  { label: "No kickout flashing visible at wall eave", guide: "Most common deficiency in DFW homes built before 2015. Kickout installation cost is $100–300 per location. Without it, wall sheathing and framing can rot within 5–10 years of DFW rain seasons." },
  { label: "Counter flashing lifted or loose", guide: "Loose counter flashing in DFW brick indicates mortar joint failure. Re-embedding counter flashing requires tuck-pointing the mortar joint — $200–500 per chimney or dormer. Do not caulk over lifted metal." },
  { label: "Flashing area leaks only in heavy wind", guide: "Directional leaks in DFW often indicate step flashing installed without counter flashing. Wind drives water upward, entering behind unprotected step flashing. Full re-flash of affected section required." },
  { label: "Chimney flashing assessment", guide: "DFW chimney flashing has 4 components: step flashing at sides, apron flashing at base, counter flashing in mortar joints, and saddle flashing at the high side. All 4 must be intact. Chimney re-flash typically runs $800–2,500 in DFW." },
  { label: "Buying DFW home — flashing inspection", guide: "Ask inspector specifically about kickout flashing at all roof-to-wall junctions. This single item causes the most water damage claims in North Texas. Also check counter flashing mortar joint integrity and caulk condition at all flashings." },
];

export default function DFWRoofingRoofBridge2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🌧️ DFW Bridge Flashing Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          Step, kickout, counter, and apron flashings where DFW roofs meet vertical surfaces — how each type works, how each fails, and the repair path.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {flashingTypes.map((f, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{f.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.3rem" }}>{f.name}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.83rem", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>DFW Flashing Failure Modes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {dfwFailureModes.map((f, i) => (
            <div key={i} style={{ background: "#0f2040″, borderRadius: 8, padding: "1rem", border: "1px solid #1e3a5f", display: "flex", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{f.icon}</span>
              <div>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.2rem" }}>{f.mode}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.87rem", lineHeight: 1.5 }}>{f.note}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Flashing Area + Concern Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1a3a5c" : "#0f2040″, border: `1px solid ${selectedConcern === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer", fontWeight: selectedConcern === i ? 700 : 400 }}>
              {c.label}
              {selectedConcern === i && (
                <div style={{ marginTop: "0.6rem", color: "#94a3b8″, fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.6 }}>{c.guide}</div>
              )}
            </button>
          ))}
        </div>
        <div style={{ color: "#475569″, fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — Bridge Flashing Reference 2026</div>
      </div>
    </div>
  );
}
