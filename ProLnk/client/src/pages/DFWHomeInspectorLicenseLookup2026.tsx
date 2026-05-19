import { useState } from 'react';

const inspectorTypes = [
  {
    type: "General Home Inspector",
    agency: "TREC (Texas Real Estate Commission)",
    licenseUrl: "trec.texas.gov",
    steps: [
      "Go to trec.texas.gov and click License Holder Search",
      "Search by name or license number",
      "Verify license is Active (not Expired or Suspended)",
      "Confirm license type shows Professional Inspector or Real Estate Inspector",
      "Check for any disciplinary actions in their record",
    ],
    eoRequired: true,
    coverage: "Structural, roofing, electrical, HVAC, plumbing, foundation — full home systems",
    proLnkNote: "ProLnk verifies every inspector TREC license + E&O insurance before listing them on our platform.",
  },
  {
    type: "Termite / WDI Inspector",
    agency: "TPCL (Texas Pest Control License) via TDA",
    licenseUrl: "texasagriculture.gov",
    steps: [
      "Go to SquareMeals.texas.gov or TPCL license search",
      "Search by applicator name or company",
      "Verify category includes Wood Destroying Insects (Category 7a)",
      "Check license expiration date — must be current",
      "Ask for proof of insurance before scheduling",
    ],
    eoRequired: false,
    coverage: "Termites, wood-boring beetles, carpenter ants, other wood-destroying organisms",
    proLnkNote: "Always get a WDI inspection separately from a general home inspection before purchase.",
  },
  {
    type: "Mold Inspector",
    agency: "TDLR (Texas Dept of Licensing and Regulation)",
    licenseUrl: "tdlr.texas.gov",
    steps: [
      "Go to tdlr.texas.gov and search License Holder Lookup",
      "Enter name, search for Mold Assessment Consultant or Technician",
      "Verify Active status and no violations",
      "Mold inspectors and mold remediators must be different companies by law",
      "Ask for scope of work in writing before starting",
    ],
    eoRequired: true,
    coverage: "Visual mold assessment, air sampling, moisture mapping, remediation protocol",
    proLnkNote: "Texas law prohibits the same company from doing both mold inspection and mold remediation.",
  },
];

export default function DFWHomeInspectorLicenseLookup2026() {
  const [selected, setSelected] = useState(0);
  const info = inspectorTypes[selected];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔍</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", marginBottom: ".5rem" }}>DFW Licensed Inspector Lookup 2026</h1>
          <p style={{ color: "#94a3b8" }}>How to verify a home inspector in Texas — TREC, TDLR, and what ProLnk checks for you</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {inspectorTypes.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{ padding: ".6rem 1.1rem", borderRadius: 8, border: "none", cursor: "pointer", background: selected === i ? "#F5E642" : "#0f2040", color: selected === i ? "#0A1628" : "#94a3b8", fontWeight: 600 }}
            >
              {t.type}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642", marginBottom: "1.5rem" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem", marginBottom: ".75rem" }}>🏛️ Licensing Agency: {info.agency}</div>
          <div style={{ color: "#94a3b8", marginBottom: ".75rem" }}>🌐 {info.licenseUrl}</div>
          <div style={{ color: "#94a3b8", marginBottom: ".5rem" }}>📋 Coverage: {info.coverage}</div>
          <div style={{ color: info.eoRequired ? "#22c55e" : "#64748b" }}>🛡️ E&O Insurance Required: {info.eoRequired ? "✅ Yes — always ask for certificate" : "ℹ️ Not required but recommended"}</div>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#F5E642", marginBottom: "1rem" }}>📝 How to Verify: Step-by-Step</h3>
          {info.steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", marginTop: ".75rem", color: "#94a3b8" }}>
              <span style={{ color: "#F5E642", minWidth: "1.5rem" }}>{i + 1}.</span> {s}
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f38", border: "1px solid #F5E642", borderRadius: 12, padding: "1.25rem" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: ".5rem" }}>⭐ ProLnk Does This For You</div>
          <div style={{ color: "#94a3b8" }}>{info.proLnkNote}</div>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: ".85rem" }}>
          ProLnk pre-verifies all inspector licenses so DFW homeowners never hire an unlicensed inspector.
        </div>
      </div>
    </div>
  );
}