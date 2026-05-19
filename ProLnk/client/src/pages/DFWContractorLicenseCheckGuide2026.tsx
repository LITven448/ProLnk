import { useState } from 'react';

const trades = [
  {
    trade: "HVAC Contractor",
    agency: "TDLR (Texas Dept of Licensing & Regulation)",
    url: "license.tdlr.texas.gov",
    steps: ["Go to license.tdlr.texas.gov/LicenseSearch", "Select HVAC from license type dropdown", "Enter contractor name or company", "Verify status shows Active and expiration date is future", "Download license certificate or screenshot for records"],
    expired: "Do not hire — unlicensed HVAC work voids your homeowner insurance and fails city inspection",
  },
  {
    trade: "Electrician",
    agency: "TDLR (Texas Dept of Licensing & Regulation)",
    url: "license.tdlr.texas.gov",
    steps: ["Go to license.tdlr.texas.gov/LicenseSearch", "Select Electrician from license type dropdown", "Verify Master Electrician license (not just Journeyman)", "Confirm Active status and valid expiration", "Cross-reference company name with contractor name"],
    expired: "Unlicensed electrical is a fire hazard — city will require tear-out and re-inspection",
  },
  {
    trade: "Plumber",
    agency: "TSBPE (Texas State Board of Plumbing Examiners)",
    url: "www.tsbpe.texas.gov",
    steps: ["Go to www.tsbpe.texas.gov and click License Search", "Search by name or license number", "Verify Master Plumber license type", "Confirm Active status and expiration date", "Record license number in your project file"],
    expired: "Unlicensed plumbing risks water damage, failed inspections, and voided insurance",
  },
  {
    trade: "Home Inspector",
    agency: "TREC (Texas Real Estate Commission)",
    url: "www.trec.texas.gov",
    steps: ["Go to www.trec.texas.gov and click License Holder Search", "Search Inspector license type", "Verify Active status and expiration", "Check for any disciplinary history", "Confirm they carry E&O insurance"],
    expired: "Use only active licensed inspectors — unlicensed reports have no legal standing",
  },
  {
    trade: "General Contractor (Residential)",
    agency: "No state license — verify locally",
    url: "BBB + local city registry",
    steps: ["Check BBB rating at bbb.org", "Search city business license registry (varies by DFW city)", "Verify $1M+ general liability insurance", "Request certificate of insurance from their insurer directly", "Search TDLR for any sub-trade licenses they hold"],
    expired: "GCs are locally regulated in DFW — verify city registration and insurance are current",
  },
];

export default function DFWContractorLicenseCheckGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = trades.find(t => t.trade === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          🔍 DFW License Verification Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Real-Time Contractor License Check Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          Step-by-step license verification for every major trade in DFW — TDLR, TSBPE, TREC, and more. Know exactly who to check and what to look for.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🏛️ DFW License Authorities</h2>
          {[
            { agency: "TDLR", full: "Texas Dept of Licensing & Regulation", trades: "HVAC, Electricians, Boilers, Water Well Drillers" },
            { agency: "TSBPE", full: "Texas State Board of Plumbing Examiners", trades: "All Plumbing Contractors" },
            { agency: "TREC", full: "Texas Real Estate Commission", trades: "Home Inspectors, Real Estate Agents" },
          ].map((a, i) => (
            <div key={i} style={{ padding: "0.5rem 0", borderBottom: "1px solid #0f172a" }}>
              <span style={{ color: "#F5E642", fontWeight: 700 }}>{a.agency}</span>
              <span style={{ color: "#94a3b8" }}> — {a.full}</span>
              <div style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>{a.trades}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 License Check Walkthrough by Trade</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Select a trade:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {trades.map(t => (
              <button key={t.trade} onClick={() => setSelected(t.trade)} style={{
                background: selected === t.trade ? "#F5E642" : "#0f172a",
                color: selected === t.trade ? "#0A1628" : "#fff",
                border: "1px solid #334155", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{t.trade}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>Agency: {info.agency}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Website: {info.url}</div>
              {info.steps.map((step, i) => (
                <div key={i} style={{ color: "#cbd5e1", padding: "0.35rem 0", borderBottom: "1px solid #1e293b", display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#F5E642" }}>{i + 1}.</span> {step}
                </div>
              ))}
              <div style={{ marginTop: "0.75rem", color: "#fbbf24", fontSize: "0.9rem" }}>
                ⚠️ If expired or not found: {info.expired}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
