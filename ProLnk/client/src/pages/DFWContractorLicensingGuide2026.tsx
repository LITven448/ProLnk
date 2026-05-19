import { useState } from 'react';

const tradeGuide: Record<string, { agency: string; license: string; lookupUrl: string; warning: string; howProLnk: string }> = {
  Electrician: {
    agency: "TDLR (Texas Dept of Licensing & Regulation)",
    license: "Apprentice → Journeyman → Master Electrician. Master required to pull permits.",
    lookupUrl: "tdlr.texas.gov/licensing/electrical.htm",
    warning: "Never hire an unlicensed electrician — insurance won't cover fire damage from unpermitted work.",
    howProLnk: "ProLnk verifies TDLR license number and expiration before any match.",
  },
  Plumber: {
    agency: "TSBPE (Texas State Board of Plumbing Examiners)",
    license: "Apprentice → Journeyman → Master Plumber. Master required to pull permits.",
    lookupUrl: "tsbpe.texas.gov/licensee-search",
    warning: "Only a licensed master plumber can legally install or repair water heaters, gas lines, and sewer connections in Texas.",
    howProLnk: "ProLnk checks TSBPE license status in real time before every match.",
  },
  "HVAC Technician": {
    agency: "TDLR (Air Conditioning & Refrigeration Contractors)",
    license: "TACL (Technician) + TACLA (Company). Both required for residential HVAC work.",
    lookupUrl: "tdlr.texas.gov/licensing/hvac.htm",
    warning: "EPA 608 certification required for refrigerant handling. Unlicensed HVAC voids equipment warranty.",
    howProLnk: "ProLnk verifies TACL + TACLA numbers and EPA 608 before matching.",
  },
  Roofer: {
    agency: "No Texas state license required for roofing",
    license: "None required — buyer beware territory. Some cities require registration.",
    lookupUrl: "Check local city/county registration databases",
    warning: "Texas has NO state roofing license. Storm chasers and fly-by-night operators are rampant post-hail. Always check reviews, insurance, and references.",
    howProLnk: "ProLnk requires liability insurance proof, BBB check, and 10+ verified reviews for all roofing matches.",
  },
  "General Contractor": {
    agency: "No Texas state license for general contractors",
    license: "None at state level — individual trades (electrical, plumbing, HVAC) still require licenses.",
    lookupUrl: "Check city contractor registration + BBB + TSCL",
    warning: "A GC without licensed subcontractors can leave you with unpermitted work and no recourse. Always verify subs.",
    howProLnk: "ProLnk vets GC insurance, bonding, BBB standing, and sub-licensing before any match.",
  },
};

const trades = Object.keys(tradeGuide);

export default function DFWContractorLicensingGuide2026() {
  const [trade, setTrade] = useState("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🪪 PROLNK GUIDE — DFW CONTRACTOR LICENSING 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Contractor Licensing Guide 2026</h1>
        <p style={{ color: "#aab", marginBottom: 32 }}>Texas licensing requirements by trade — who needs a license, who does not, and how ProLnk protects you either way.</p>

        <div style={{ background: "#111d35″, border: "1px solid #f5a642", borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <div style={{ color: "#f5a642″, fontWeight: 700, marginBottom: 8 }}>🚨 Texas Licensing Reality Check</div>
          <div style={{ color: "#dde", fontSize: 14 }}>Texas has no state license for general contractors or roofers. Electricians, plumbers, and HVAC techs are state-licensed. Always verify license status before work begins — unlicensed work voids insurance, fails inspections, and creates title problems at resale.</div>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>🔎 Trade → License Lookup Guide</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          {trades.map(t => (
            <button key={t} onClick={() => setTrade(trade === t ? "" : t)}
              style={{ background: trade === t ? "#F5E642″ : "#1a2e50", color: trade === t ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{t}</button>
          ))}
        </div>
        {trade && (
          <div style={{ background: "#111d35″, borderRadius: 10, padding: 20, marginBottom: 32 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🪪 {trade}</div>
            <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
              <div><span style={{ color: "#aab" }}>Licensing Agency: </span>{tradeGuide[trade].agency}</div>
              <div><span style={{ color: "#aab" }}>License Structure: </span>{tradeGuide[trade].license}</div>
              <div><span style={{ color: "#aab" }}>Lookup At: </span><span style={{ color: "#7ef5a8″ }}>{tradeGuide[trade].lookupUrl}</span></div>
              <div style={{ background: "#2a1a0d", border: "1px solid #f5a642″, borderRadius: 8, padding: 12, color: "#f5d642" }}>⚠️ {tradeGuide[trade].warning}</div>
              <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 8, padding: 12 }}>✅ How ProLnk Verifies: {tradeGuide[trade].howProLnk}</div>
            </div>
          </div>
        )}

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>📋 License Status Quick Reference</h2>
        <div style={{ marginBottom: 40 }}>
          {[["Electrician", "Required", "TDLR", "✅"],
            ["Plumber", "Required", "TSBPE", "✅"],
            ["HVAC Tech", "Required", "TDLR", "✅"],
            ["Roofer", "NOT Required", "City/County Only", "⚠️"],
            ["General Contractor", "NOT Required", "City/County Only", "⚠️"],
            ["Painter", "NOT Required", "None", "🟢"],
            ["Landscaper", "NOT Required", "None", "🟢"],
          ].map(([t, status, agency, icon]) => (
            <div key={String(t)} style={{ display: "grid", gridTemplateColumns: "160px 160px 1fr 40px", gap: 12, padding: "10px 0″, borderBottom: "1px solid #1e3a5f", fontSize: 13, alignItems: "center" }}>
              <div style={{ fontWeight: 600 }}>{t}</div>
              <div style={{ color: status === "Required" ? "#7ef5a8″ : "#f5a642" }}>{status}</div>
              <div style={{ color: "#aab" }}>{agency}</div>
              <div style={{ textAlign: "center" }}>{icon}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", border: "1px solid #F5E642″, borderRadius: 10, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔨 ProLnk Verifies Every License for You</div>
          <div style={{ color: "#aab", marginBottom: 16 }}>Skip the license lookup — ProLnk checks TDLR, TSBPE, insurance, and BBB standing before every match.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find Verified Pros →</button>
        </div>
      </div>
    </div>
  );
}
