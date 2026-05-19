import { useState } from 'react';

const companies = [
  { name: "Olshan Foundation Repair", warranty: "Lifetime Transferable", transfer: "Free, automatic at sale", voids: "Improper drainage, unauthorized excavation", coverage: "Steel push piers, helical piers" },
  { name: "Perma-Pier Foundation Repair", warranty: "Lifetime Transferable", transfer: "$250 transfer fee", voids: "Grading changes, pool additions without notice", coverage: "All pier types, polyjacking" },
  { name: "HD Foundations", warranty: "25-Year Limited", transfer: "$500 transfer fee, 90-day inspection", voids: "Plumbing leaks unrepaired, landscaping over piers", coverage: "Concrete pressed piles only" },
  { name: "Ram Jack Texas", warranty: "Lifetime (structure only)", transfer: "Free transfer with documentation", voids: "Flooding events, adjacent new construction", coverage: "Steel piers, helical, wall anchors" },
];

const voidReasons = [
  { icon: "💧", reason: "Improper Drainage", detail: "Gutters not extended away from foundation, negative grade" },
  { icon: "🌳", reason: "Root Intrusion", detail: "Planting trees within 15 feet of pier locations" },
  { icon: "🏊", reason: "Pool Installation", detail: "Adding pool without notifying warranty holder" },
  { icon: "🔨", reason: "Unauthorized Work", detail: "Excavating within 3 feet of pier locations" },
  { icon: "💦", reason: "Unrepaired Plumbing Leaks", detail: "Active slab leak not repaired within 90 days of detection" },
];

export default function DFWFoundationPierWarrantyGuide2026() {
  const [companyType, setCompanyType] = useState("");
  const [result, setResult] = useState("");

  function showGuide() {
    if (!companyType) { setResult("Select a company type to compare warranties."); return; }
    const co = companies.find(c => c.name === companyType);
    if (!co) return;
    setResult(
      `${co.name} Warranty: ${co.warranty} | Transfer: ${co.transfer} | Coverage: ${co.coverage} | Void conditions: ${co.voids}. Value impact: Lifetime transferable warranties add $3,000-8,000 to DFW home sale price when disclosed upfront. Always request a signed warranty certificate before closing.`
    );
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0" }}>DFW Foundation Pier Warranty Comparison 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Lifetime vs. Limited — What DFW Homeowners Must Know Before Signing</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "0.75rem" }}>📋 Why Warranty Type Matters in DFW</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7 }}>DFW expansive clay soil means foundation movement is ongoing — not a one-time event. A lifetime transferable warranty signals to future buyers that the foundation issue is professionally managed. Non-transferable warranties die at sale, leaving the buyer exposed. In DFW, this distinction can swing a sale by $5,000-15,000.</p>
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🏢 DFW Company Warranty Comparison</h2>
          {companies.map((co, i) => (
            <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>{co.name}</div>
                <div style={{ background: co.warranty.includes("Lifetime") ? "#166534″ : "#854d0e", color: co.warranty.includes("Lifetime") ? "#4ade80" : "#fbbf24", padding: "0.25rem 0.75rem", borderRadius: 6, fontSize: "0.8rem", fontWeight: 600 }}>{co.warranty}</div>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                <div><span style={{ color: "#64748b", fontSize: "0.8rem" }}>Transfer: </span><span style={{ color: "#cbd5e1″, fontSize: "0.85rem" }}>{co.transfer}</span></div>
              </div>
              <div style={{ marginTop: "0.4rem" }}><span style={{ color: "#64748b", fontSize: "0.8rem" }}>Covers: </span><span style={{ color: "#94a3b8″, fontSize: "0.82rem" }}>{co.coverage}</span></div>
              <div style={{ marginTop: "0.4rem" }}><span style={{ color: "#ef4444″, fontSize: "0.8rem" }}>⚠️ Voids: </span><span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{co.voids}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>⚠️ What Voids Your Foundation Warranty</h2>
          {voidReasons.map((v, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.6rem 0″, borderBottom: i<voidReasons.length-1?"1px solid #1e3a5f":"none" }}>
              <span style={{ fontSize: "1.4rem" }}>{v.icon}</span>
              <div>
                <div style={{ color: "#e2e8f0″, fontWeight: 600 }}>{v.reason}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{v.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.2rem", marginBottom: "1rem" }}>🧮 Warranty Comparison Guide</h2>
          <select value={companyType} onChange={e=>setCompanyType(e.target.value)} style={{ background: "#0A1628″, color: "#e2e8f0", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.6rem 1rem", width: "100%", marginBottom: "0.75rem" }}>
            <option value="">Select DFW Foundation Company</option>
            {companies.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <button onClick={showGuide} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "0.7rem 2rem", fontWeight: 700, cursor: "pointer", width: "100%" }}>Show My Warranty Guide →</button>
          {result && <div style={{ marginTop: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", color: "#4ade80", lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem" }}>🔗</div>
          <p style={{ color: "#0A1628″, fontWeight: 600, margin: "0.5rem 0" }}>Find lifetime-warranty foundation pros in your DFW zip code</p>
          <div style={{ color: "#0A1628″, fontWeight: 800 }}>prolnk.io — Verified DFW Foundation Specialists</div>
        </div>
      </div>
    </div>
  );
}
