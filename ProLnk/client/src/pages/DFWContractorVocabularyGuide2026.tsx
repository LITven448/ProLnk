import { useState } from 'react';

const projectTypes = [
  {
    type: "🏗️ New Construction",
    terms: [
      { word: "RFP", def: "Request for Proposal — formal document sent to contractors asking for bids on a defined scope of work." },
      { word: "Substantial Completion", def: "Point when work is complete enough for the owner to use it for its intended purpose — triggers final payment milestone." },
      { word: "Punch List", def: "Final list of small items that must be corrected before the project is fully complete and final payment is released." },
      { word: "Rough-In", def: "First phase of mechanical/electrical/plumbing — pipes and wires installed inside walls before drywall. Inspected before close-up." },
      { word: "Trim-Out", def: "Final phase — installing visible fixtures, outlets, switches, and finishes after drywall and paint are complete." },
    ],
  },
  {
    type: "🔨 Remodeling",
    terms: [
      { word: "Change Order", def: "Written document that modifies the original contract scope, schedule, or price. ALWAYS get this in writing before work proceeds." },
      { word: "Allowance", def: "Dollar amount built into the contract for items not yet selected (tile, fixtures). If you spend more, you pay the difference." },
      { word: "Close-Out", def: "Final project phase: punch list complete, lien waivers signed, permits closed, warranties delivered, keys returned." },
      { word: "GC", def: "General Contractor — the primary contractor who hires and manages all subcontractors (subs) on a project." },
      { word: "Contingency", def: "Reserve budget (typically 10–20%) set aside for unexpected costs. Especially important in DFW remodels with older homes." },
    ],
  },
  {
    type: "⚖️ Legal and Insurance",
    terms: [
      { word: "Lien", def: "Legal claim a contractor files against your property if not paid. A lien can prevent you from selling or refinancing your home." },
      { word: "Lien Waiver", def: "Document signed by contractor releasing their right to file a lien. Get this before every payment milestone." },
      { word: "COI", def: "Certificate of Insurance — proof that the contractor carries workers comp and liability insurance. Always request before work starts." },
      { word: "TDLR", def: "Texas Department of Licensing and Regulation — state body that licenses AC, electrical, and plumbing contractors in DFW." },
      { word: "Retainage", def: "Portion of payment (typically 10%) withheld until project is fully complete — protects owners from incomplete work." },
    ],
  },
  {
    type: "📋 Bidding and Contracts",
    terms: [
      { word: "Scope of Work", def: "Detailed written description of exactly what the contractor will and will not do. The most important part of any contract." },
      { word: "Fixed-Price Contract", def: "Contractor agrees to complete work for a set price regardless of their actual costs — protects owner from overruns." },
      { word: "Time and Material", def: "Owner pays actual labor + materials + markup. Risk of overruns falls on owner. Get a not-to-exceed cap." },
      { word: "Bid Bond", def: "Guarantees a contractor will honor their bid price if selected. Common on larger commercial projects." },
      { word: "Notice to Proceed", def: "Owner's written authorization for the contractor to begin work — starts the clock on the schedule." },
    ],
  },
];

export default function DFWContractorVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = projectTypes[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "0 0 8px" }}>DFW Contractor Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>Contractor terms every DFW homeowner should know before signing anything</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {projectTypes.map((pt, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642" : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {pt.type}
            </button>
          ))}
        </div>

        <div style={{ background: "#111e35", borderRadius: 14, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", marginTop: 0, marginBottom: 18 }}>{active.type} Terms</h2>
          {active.terms.map((term, i) => (
            <div key={i} onClick={() => setActiveTerm(activeTerm === i ? null : i)}
              style={{ background: activeTerm === i ? "#1a2d48" : "#0d1b2e", border: `1px solid ${activeTerm === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 10, padding: "14px 18px", marginBottom: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: activeTerm === i ? "#F5E642" : "#e2e8f0", fontSize: 16 }}>{term.word}</span>
                <span style={{ color: "#F5E642", fontSize: 18 }}>{activeTerm === i ? "▲" : "▼"}</span>
              </div>
              {activeTerm === i && <p style={{ color: "#94a3b8", fontSize: 14, margin: "10px 0 0", lineHeight: 1.6 }}>{term.def}</p>}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: 13, marginTop: 28 }}>© 2026 ProLnk · DFW Home Services Platform</p>
      </div>
    </div>
  );
}
