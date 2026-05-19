import { useState } from 'react';

const bracketTypes = [
  { name: "Grade Beam Bracket", icon: "🔩", desc: "Welded steel sleeve that slides over the grade beam edge. Most common in DFW pier-and-beam or slab-with-grade-beam foundations.", concern: "Crack at bracket attachment point" },
  { name: "Slab Extension Bracket", icon: "🏗️", desc: "Installed under existing slab during underpinning. Extends pier support beneath foundation footprint.", concern: "Bracket exposure or movement" },
  { name: "Interior Pier Bracket", icon: "🔧", desc: "Used for interior piers where grade beam access is limited. Requires tunneling or concrete cutting.", concern: "Alignment with floor structure" },
];

const concerns = [
  { issue: "Grade beam crack at bracket", severity: "Usually cosmetic", color: "#f59e0b", detail: "Small cracks where bracket meets concrete are common due to load transfer. Monitor for widening — stable hairline cracks are normal." },
  { issue: "Bracket not fully engaged", severity: "Needs inspection", color: "#ef4444″, detail: "If pier cap does not fully contact bracket, load transfer is compromised. Requires engineer review immediately." },
  { issue: "Rust on exposed bracket", severity: "Monitor", color: "#f59e0b", detail: "Surface rust on galvanized steel is cosmetic. Active corrosion flaking away from bracket body needs treatment or replacement." },
  { issue: "Movement after install", severity: "Inspect now", color: "#ef4444″, detail: "Any settlement or horizontal movement post-install suggests pier may not have reached load-bearing strata." },
  { issue: "Bracket wobble by hand", severity: "Normal (if minimal)", color: "#22c55e", detail: "Slight tolerance in bracket fit is by design. Significant wobble needs grouting or engineering review." },
];

export default function DFWFoundationPierBracket2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>🏠 DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How Piers Attach to DFW Foundations</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>DFW expansive clay requires steel pier brackets to transfer load to stable strata below. Understanding bracket types helps you evaluate repair quality and identify concerns.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🔩 Bracket Types Used in DFW</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {bracketTypes.map((b, i) => (
            <div key={i} onClick={() => setSelectedType(selectedType === i ? null : i)}
              style={{ background: selectedType === i ? "#1e3a5f" : "#0f1f3a", borderRadius: 10, padding: 16, cursor: "pointer",
                border: `1px solid ${selectedType === i ? "#F5E642" : "#1e3a5f"}` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{b.name}</div>
                  {selectedType === i && <div style={{ fontSize: 13, color: "#94a3b8″, marginTop: 6 }}>{b.desc}</div>}
                  {selectedType === i && <div style={{ fontSize: 12, color: "#F5E642″, marginTop: 4 }}>Common concern: {b.concern}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🔍 Bracket Concern Assessment Guide</h2>
        <p style={{ fontSize: 14, color: "#94a3b8″, marginBottom: 16 }}>Tap a concern to see assessment guidance:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {concerns.map((c, i) => (
            <div key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1e3a5f" : "#0f1f3a", borderRadius: 10, padding: 16, cursor: "pointer",
                borderLeft: `4px solid ${c.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700 }}>{c.issue}</div>
                <span style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>{c.severity}</span>
              </div>
              {selectedConcern === i && <div style={{ marginTop: 10, fontSize: 13, color: "#cbd5e1″ }}>{c.detail}</div>}
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: "#F5E642″ }}>🛠️ Bracket Maintenance Basics</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8″, fontSize: 14, lineHeight: 1.8 }}>
            <li>Inspect exposed brackets annually for rust or movement</li>
            <li>Keep soil moisture consistent near pier locations to avoid drought cycles</li>
            <li>Do not paint over brackets — inhibits corrosion inspection</li>
            <li>Document pier locations with photos after install for future reference</li>
            <li>Re-level inspection every 3-5 years in active DFW clay zones</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified foundation pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
