import { useState } from 'react';

const neighborhoods = [
  { name: "Rivercrest", decade: "1920s–1950s", guide: "Grand estates on the bluff. Priority: original limestone foundations, slate roofs, cast iron plumbing, historic window restoration, high-end HVAC zoning." },
  { name: "Westover Hills", decade: "1940s–1970s", guide: "Wealthy enclave, large custom homes. Priority: septic-to-sewer conversions on older lots, custom millwork preservation, pool equipment upgrades." },
  { name: "Ridglea Hills", decade: "1950s–1980s", guide: "Established ranch-styles on wooded lots. Priority: tree root intrusion, pier-and-beam leveling, original galvanized pipe replacement, roof deck inspection." },
  { name: "Westcliff", decade: "1940s–1960s", guide: "Smaller custom cottages. Priority: knob-and-tube electrical panels, original hardwood floor refinishing, chimney repointing, window replacement." },
];

export default function FortWorthWestsideHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏛️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>Fort Worth Westside Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            Rivercrest · Westover Hills · Ridglea — Fort Worth's most storied estate neighborhoods.
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>🌳 Westside Character</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            The Westside encompasses Fort Worth's wealthiest historic neighborhoods — Rivercrest estates on the
            Trinity bluff, Westover Hills private enclave, and the tree-canopied streets of Ridglea. Homes here
            span 1920s–1990s with custom construction requiring specialty contractors, not big-box handymen.
            Select your neighborhood for a tailored maintenance guide.
          </p>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏘️ Select Your Neighborhood</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {neighborhoods.map((n, i) => (
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
              <div>{n.name}</div>
              <div style={{ fontWeight: 400, fontSize: "0.75rem", opacity: 0.8 }}>{n.decade}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0f2040″, border: "2px solid #F5E642", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.5rem" }}>🔧 {neighborhoods[selected].name} Maintenance Guide</h3>
            <p style={{ color: "#94a3b8″, fontSize: "0.8rem", margin: "0 0 0.75rem" }}>{neighborhoods[selected].decade}</p>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.7, margin: 0 }}>{neighborhoods[selected].guide}</p>
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>💎 Westside Specialty Considerations</h2>
          <ul style={{ color: "#94a3b8″, lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🏗️ Specialty contractors only — custom homes require licensed craftspeople</li>
            <li>🌳 Mature oak canopy — certified arborist for tree care and root management</li>
            <li>🏛️ Historic preservation review for exterior changes in landmark areas</li>
            <li>💧 Large lot irrigation systems — annual backflow and head inspection</li>
            <li>🔐 High-value home security — integration with modern smart systems</li>
          </ul>
        </div>

        <p style={{ color: "#475569″, fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects Westside homeowners with vetted specialty contractors. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}
