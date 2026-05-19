import { useState } from 'react';

type ProjectType = "insurance" | "replacement" | "repair" | "new";

const checklists: Record<ProjectType, string[]> = {
  insurance: ["Valid TX General Liability ($1M+ min)", "Workers Comp certificate", "Haag Engineering certification", "Manufacturer warranty eligibility (GAF, Owens Corning)", "Signed contract before work starts", "Lien waiver upon final payment", "Written scope matching adjuster estimate"],
  replacement: ["Valid TX General Liability insurance", "Workers Comp certificate", "Manufacturer preferred contractor status", "3+ local DFW references verifiable", "Written contract with material specs", "Permit pulled before work starts", "Final lien waiver"],
  repair: ["Proof of TX liability insurance", "Written estimate with line items", "No-payment-until-complete clause", "Warranty on repair workmanship (min 2 yr)", "Permit if structural repair"],
  new: ["TX General Liability ($2M+ for new construction)", "Workers Comp + umbrella policy", "Manufacturer platinum/preferred status", "Architect/engineer coordination experience", "Performance bond available", "Permit and inspection schedule", "Final lien waiver + warranty documentation"],
};

export default function DFWRoofingContractorGuide2026() {
  const [project, setProject] = useState<ProjectType>("replacement");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>📋</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "8px 0 4px" }}>DFW Roofing Contractor Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>Texas has NO state roofing license. Knowing what to require protects you from fraud.</p>
        </div>

        <div style={{ background: "#7f1d1d", border: "1px solid #ef4444″, borderRadius: 12, padding: 18, marginBottom: 28 }}>
          <div style={{ fontWeight: 700, color: "#fca5a5″, marginBottom: 6, fontSize: 15 }}>⚠️ Critical: TX Has No Roofing License Requirement</div>
          <div style={{ color: "#fecaca", fontSize: 14, lineHeight: 1.7 }}>Anyone can legally call themselves a roofer in Texas. There is no state licensing board. Your only protection is verifying insurance, certifications, and local track record yourself — or using ProLnk pre-screened contractors.</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { icon: "🚩", title: "Contract Red Flags", body: "No written contract, deductible waiver offers, payment upfront before work, no local office address, no permit pull." },
            { icon: "📜", title: "Lien Waiver Importance", body: "Without a lien waiver, subcontractors unpaid by your roofer can lien your home — even after you paid." },
            { icon: "🏆", title: "Manufacturer Certs", body: "GAF Master Elite, Owens Corning Preferred: fewer than 3% of roofers qualify. Required for full warranty coverage." },
            { icon: "🔬", title: "Haag Certification", body: "Haag-certified inspectors can legally document damage for insurance claims. Critical for insurance jobs." },
          ].map(c => (
            <div key={c.title} style={{ background: "#132240″, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 5, fontSize: 14 }}>{c.title}</div>
              <div style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 16, fontSize: 20 }}>✅ Project Type → Vetting Checklist</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {(["insurance", "replacement", "repair", "new"] as ProjectType[]).map(p => (
              <button key={p} onClick={() => setProject(p)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: project === p ? "#F5E642″ : "#1e3a5f", color: project === p ? "#0A1628" : "#fff" }}>
                {p === "insurance" ? "Insurance Claim" : p === "replacement" ? "Full Replacement" : p === "repair" ? "Repair Only" : "New Construction"}
              </button>
            ))}
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20 }}>
            {checklists[project].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <span style={{ color: "#22c55e", fontWeight: 700, marginTop: 1 }}>✓</span>
                <span style={{ color: "#cbd5e1″, fontSize: 14, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#0A1628″, marginBottom: 6 }}>🏠 ProLnk pre-screens every DFW roofer against this checklist — so you don't have to.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Insurance verified, certified, and locally accountable before they reach your door.</div>
        </div>
      </div>
    </div>
  );
}
