import { useState } from 'react';

const trades = [
  {
    trade: "HVAC Technician",
    icon: "❄️",
    agency: "TDLR — Texas Dept of Licensing and Regulation",
    licenseUrl: "tdlr.texas.gov",
    licenseType: "TACLB (Air Conditioning & Refrigeration Contractor)",
    steps: [
      "Go to tdlr.texas.gov → License Holder Search",
      "Search by company or individual name",
      "Look for TACLB license (contractor) or TACLA (sole owner)",
      "Verify Active status — not expired or suspended",
      "Confirm EPA 608 certification for refrigerant handling",
    ],
    noLicense: false,
    proLnkNote: "HVAC work without a TACLB license is illegal in Texas. ProLnk checks TDLR status on all HVAC pros.",
  },
  {
    trade: "Electrician",
    icon: "⚡",
    agency: "TDLR — Texas Dept of Licensing and Regulation",
    licenseUrl: "tdlr.texas.gov",
    licenseType: "Master Electrician (ME) or Journeyman Electrician (JE)",
    steps: [
      "Go to tdlr.texas.gov → License Holder Search",
      "Search by name or license number",
      "Look for Master Electrician license for full project work",
      "Journeyman may work under a licensed Master",
      "Verify no active complaints or disciplinary actions",
    ],
    noLicense: false,
    proLnkNote: "Only a Master Electrician can pull permits. ProLnk verifies ME license before any electrical job.",
  },
  {
    trade: "Plumber",
    icon: "🔧",
    agency: "TSBPE — Texas State Board of Plumbing Examiners",
    licenseUrl: "tsbpe.texas.gov",
    licenseType: "Master Plumber (MP) or Journeyman Plumber (JP)",
    steps: [
      "Go to tsbpe.texas.gov → License Verification",
      "Search by name or license number",
      "Master Plumber required to pull permits and run a business",
      "Journeyman works under a Master",
      "Check bond and insurance certificate separately",
    ],
    noLicense: false,
    proLnkNote: "Plumbing without a TSBPE license is illegal. ProLnk verifies all plumber licenses via TSBPE.",
  },
  {
    trade: "Roofer",
    icon: "🏠",
    agency: "No Texas State License — Check BBB + Insurance",
    licenseUrl: "bbb.org",
    licenseType: "No state license required — verify insurance instead",
    steps: [
      "Texas does NOT license roofers at the state level",
      "Search BBB (bbb.org) for company accreditation and complaint history",
      "Verify General Liability insurance ($1M+ coverage minimum)",
      "Check Workers Comp insurance — required if they have employees",
      "Get a written contract before any work begins",
    ],
    noLicense: true,
    proLnkNote: "Roofing is the most common DFW scam after hailstorms. ProLnk verifies insurance and BBB rating for all roofers.",
  },
];

export default function DFWContractorLicenseLookup2026() {
  const [selected, setSelected] = useState(0);
  const info = trades[selected];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🔎</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", marginBottom: ".5rem" }}>DFW Contractor License Lookup 2026</h1>
          <p style={{ color: "#94a3b8" }}>How to verify contractor licenses in Texas — TDLR, TSBPE, and what ProLnk checks for you</p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
          {trades.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{ padding: ".6rem 1.1rem", borderRadius: 8, border: "none", cursor: "pointer", background: selected === i ? "#F5E642" : "#0f2040", color: selected === i ? "#0A1628" : "#94a3b8", fontWeight: 600 }}
            >
              {t.icon} {t.trade}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", borderLeft: `4px solid ${info.noLicense ? "#ef4444" : "#F5E642"}`, marginBottom: "1.5rem" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem", marginBottom: ".75rem" }}>{info.icon} {info.trade}</div>
          <div style={{ color: "#94a3b8", marginBottom: ".5rem" }}>🏛️ {info.agency}</div>
          <div style={{ color: "#94a3b8", marginBottom: ".5rem" }}>🌐 {info.licenseUrl}</div>
          <div style={{ color: info.noLicense ? "#fca5a5" : "#22c55e" }}>
            📋 {info.licenseType}
          </div>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h3 style={{ color: "#F5E642", marginBottom: "1rem" }}>📝 Verification Steps</h3>
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
          ProLnk pre-verifies all contractor licenses and insurance so DFW homeowners hire with confidence.
        </div>
      </div>
    </div>
  );
}