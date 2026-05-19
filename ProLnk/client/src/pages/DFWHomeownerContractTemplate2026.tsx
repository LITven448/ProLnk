import { useState } from 'react';

const projects = [
  { type: "Kitchen Remodel", clauses: ["Scope: Full cabinet replacement, countertops, tile backsplash, lighting — no plumbing relocation", "Materials: XYZ Cabinets model #1234, Silestone quartz countertop Pearl Jasmine, Daltile subway tile", "Payment: 10% start, 25% cabinet delivery, 35% install complete, 20% countertops installed, 10% retainage at final", "Change order: Any change to scope requires written change order signed by both parties before work begins", "Warranty: 1 year labor, manufacturer warranty on all materials", "Lien waivers: Required from contractor and all subs at each milestone payment"] },
  { type: "Bathroom Remodel", clauses: ["Scope: Full bath gut — new tile, vanity, fixtures, exhaust fan, shower glass — plumbing and electrical included", "Materials: Kohler Artifacts faucet, Delta shower system model #X, 12x24 porcelain floor tile", "Payment: 10% start, 30% demo and rough-in, 40% tile and fixtures, 10% punch list, 10% retainage at final", "Change order: Written signed change order required — no verbal approvals honored", "Warranty: 2 year labor on tile and waterproofing, manufacturer on fixtures", "Lien waivers: Required from contractor, plumber, and electrician at each milestone"] },
  { type: "Room Addition", clauses: ["Scope: 400 sq ft master bedroom addition — foundation, framing, roofing, insulation, drywall, paint, flooring, HVAC extension", "Materials: Hardie board exterior, matching interior paint TBD, LVP flooring to match existing", "Payment: 20% foundation, 25% framing and roof, 25% rough-ins, 20% finish work, 10% retainage at CO", "Change order: All changes documented with cost and schedule impact — signed before execution", "Warranty: 1 year labor, 10 year structural, manufacturer on all installed products", "Lien waivers: Required from GC, framer, roofer, plumber, electrician, HVAC sub at each milestone"] },
  { type: "Roof Replacement", clauses: ["Scope: Full tear-off and replacement — decking inspection included, replace rotten decking at $X per sheet", "Materials: GAF Timberline HDZ Charcoal, Grace Ice & Water Shield at eaves and valleys, ventilation per code", "Payment: 40% material delivery, 50% installation complete, 10% retainage after final inspection", "Change order: Decking replacement pre-authorized at $X/sheet — all other changes require written approval", "Warranty: Manufacturer warranty on shingles (lifetime), 2 year labor warranty", "Lien waivers: Required from contractor and any roofing sub at completion"] },
];

export default function DFWHomeownerContractTemplate2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = projects.find(p => p.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          📄 DFW Contract Template Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Home Improvement Contract Template Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>
          Every DFW home improvement contract must include these elements to protect you legally and ensure contractors deliver exactly what was promised.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📋 Mandatory Contract Elements</h2>
          {[
            "Contractor full legal name, license number, insurance policy number and expiration",
            "Exact scope of work — what is included AND what is explicitly excluded",
            "Materials specification — brand, model number, grade, color for every material",
            "Payment schedule tied to milestones, not calendar dates",
            "Change order process — written and signed before any scope changes execute",
            "Warranty terms — labor warranty (years) and materials warranty (manufacturer)",
            "Lien waiver requirement — conditional at payment, unconditional after funds clear",
            "Dispute resolution — arbitration or litigation clause",
            "Project timeline with start date and substantial completion date",
          ].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, padding: "0.4rem 0", borderBottom: "1px solid #0f172a", display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#F5E642″ }}>#{i + 1}</span> {item}
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📁 Contract Template by Project Type</h2>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>Select your project type:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {projects.map(p => (
              <button key={p.type} onClick={() => setSelected(p.type)} style={{
                background: selected === p.type ? "#F5E642″ : "#0f172a",
                color: selected === p.type ? "#0A1628″ : "#fff",
                border: "1px solid #334155″, borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{p.type}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              {info.clauses.map((clause, i) => {
                const [label, detail] = clause.split(": ");
                return (
                  <div key={i} style={{ padding: "0.5rem 0″, borderBottom: "1px solid #1e293b" }}>
                    <span style={{ color: "#F5E642″, fontWeight: 700 }}>{label}: </span>
                    <span style={{ color: "#cbd5e1″ }}>{detail}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>⚠️ Never Sign a Contract That Lacks These</h2>
          {["No license or insurance info listed", "Vague scope like \"kitchen remodel\" with no details", "Lump sum payment upfront before any work", "No change order process defined", "No warranty language", "No lien waiver requirement"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, padding: "0.4rem 0", borderBottom: "1px solid #0f172a", display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#ef4444″ }}>✗</span> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
