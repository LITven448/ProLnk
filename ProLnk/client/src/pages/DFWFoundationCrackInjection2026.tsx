import { useState } from 'react';

const crackGuide = [
  { crack: "hairline", loc: "basement", method: "Polyurethane Injection", detail: "Hairline cracks in DFW basement walls respond best to flexible polyurethane — expands to fill micro-voids and accommodates seasonal movement from expansive clay soils." },
  { crack: "hairline", loc: "slab", method: "Polyurethane Injection", detail: "Hairline slab cracks need flexible fill. Polyurethane injection at 4-inch port spacing prevents moisture intrusion without cracking the seal during DFW soil heave cycles." },
  { crack: "structural", loc: "basement", method: "Epoxy Injection", detail: "Structural basement cracks require rigid epoxy injection. V-groove prep followed by low-pressure epoxy restores load capacity — critical given DFW clay soil lateral pressure." },
  { crack: "structural", loc: "slab", method: "Epoxy Injection + Pier Evaluation", detail: "Structural slab cracks often indicate pier movement. Epoxy injection stabilizes the crack but a pier load evaluation is essential before final repair in DFW expansive soil zones." },
  { crack: "active", loc: "basement", method: "Polyurethane + Drainage Fix", detail: "Active (wet/growing) basement cracks need polyurethane foam injection — it reacts with moisture to expand and seal. Root cause (drainage, grading) must be corrected first." },
  { crack: "active", loc: "slab", method: "Surface Dry + Polyurethane", detail: "Active slab cracks require drying before injection. Polyurethane is preferred as it seals wet concrete. Investigate and correct plumbing leaks common in DFW post-tension slabs." },
];

export default function DFWFoundationCrackInjection2026() {
  const [crackType, setCrackType] = useState<string>("hairline");
  const [location, setLocation] = useState<string>("slab");

  const result = crackGuide.find(g => g.crack === crackType && g.loc === location);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          🏗️ DFW FOUNDATION REPAIR 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Crack Injection Method Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          DFW expansive clay soils create unique crack patterns. Epoxy vs polyurethane injection depends on crack type, location, and whether the crack is active or dormant.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          {[
            { icon: "🔵", title: "Polyurethane Injection", points: ["Flexible — moves with DFW soil", "Works in wet conditions", "Port spacing: 4–6 inches", "Cure time: 15–30 min", "Best for hairline & active cracks"] },
            { icon: "🔴", title: "Epoxy Injection", points: ["Rigid structural bond", "Requires dry surface", "Port spacing: 6–8 inches", "Cure time: 24–48 hours", "Best for structural cracks"] },
          ].map(s => (
            <div key={s.title} style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>{s.title}</div>
              <ul style={{ color: "#94a3b8″, fontSize: 14, paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                {s.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1.25rem" }}>🔧 Find Your Injection Method</h2>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ color: "#94a3b8″, fontSize: 13, marginBottom: "0.5rem", fontWeight: 600 }}>CRACK TYPE</div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["hairline","structural","active"].map(c => (
                <button key={c} onClick={() => setCrackType(c)}
                  style={{ background: crackType === c ? "#F5E642″ : "#1e3a5f", color: crackType === c ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600, fontSize: 14, textTransform: "capitalize" }}>
                  {c === "hairline" ? "🪄 Hairline" : c === "structural" ? "⚠️ Structural" : "💧 Active/Wet"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ color: "#94a3b8″, fontSize: 13, marginBottom: "0.5rem", fontWeight: 600 }}>LOCATION</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["slab","basement"].map(l => (
                <button key={l} onClick={() => setLocation(l)}
                  style={{ background: location === l ? "#F5E642″ : "#1e3a5f", color: location === l ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600, fontSize: 14, textTransform: "capitalize" }}>
                  {l === "slab" ? "🏠 Slab Foundation" : "🏚️ Basement Wall"}
                </button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>✅ {result.method}</div>
              <p style={{ color: "#cbd5e1″, fontSize: 14, margin: 0, lineHeight: 1.6 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.25rem" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>📋 DFW Standard Process</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            Surface prep (clean or V-groove) → install injection ports every 4–8 inches → inject from lowest port upward → cap each port as material appears at next → allow full cure before loading. DFW clay movement requires re-inspection at 12 months.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: 13 }}>
          ProLnk · DFW Foundation Intelligence · 2026
        </div>
      </div>
    </div>
  );
}