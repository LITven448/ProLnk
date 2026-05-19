import { useState } from 'react';

const inspections = [
  { type: "Foundation / Slab", checklist: ["Forms and rebar in place before pour", "Soil engineer report submitted if required", "Permit card visible at site", "Inspector must see before concrete is poured", "Have contractor on-site to answer questions"] },
  { type: "Framing", checklist: ["All framing complete including roof deck", "Rough-in openings for windows and doors", "Structural elements accessible — no drywall", "Permit card and approved plans on site", "Nailing schedule posted or available"] },
  { type: "Rough Plumbing", checklist: ["All supply and drain lines installed", "Pressure test on supply lines (100 psi min)", "No walls closed before inspection", "Permit card visible", "Plumber or GC on site"] },
  { type: "Rough Electrical", checklist: ["All wiring installed, no cover plates yet", "Panel accessible and labeled", "AFCI/GFCI locations roughed in", "Permit card and approved plans on site", "Electrician or GC available for questions"] },
  { type: "HVAC Rough-In", checklist: ["Ductwork and equipment pad in place", "Refrigerant lines run but not charged", "Electrical disconnect roughed in", "Permit card visible", "HVAC tech available on site"] },
  { type: "Final Inspection", checklist: ["All work 100% complete", "All prior inspection approvals on record", "Smoke and CO detectors installed and tested", "GFCI outlets tested", "All fixtures and appliances installed and operational", "Site cleaned of construction debris"] },
];

export default function DFWBuildingInspectorTips2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = inspections.find(i => i.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          🏛️ DFW Building Inspector Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Building Inspector Tips Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>
          How to work effectively with DFW building inspectors — they want to approve your project. These tips help you pass the first time.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🤝 Understanding the Inspector Mindset</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Inspectors are <strong style={{ color: "#F5E642″ }}>not adversaries</strong> — their job is to verify code compliance and approve projects. A failed inspection means the work genuinely isn&apos;t ready. Schedule inspections early in the week so you have time to correct and re-inspect the same week. Always be present at your inspection.
          </p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>⚠️ Common Reasons for Inspection Fail</h2>
          {["Work covered before inspection (wall closed, slab poured early)", "Permit card not visible at site", "Approved plans not on site for inspector to reference", "Work differs from approved plans without change order", "Required items missing (GFCI, smoke detectors, tempered glass)"].map((reason, i) => (
            <div key={i} style={{ color: "#cbd5e1″, padding: "0.4rem 0", borderBottom: "1px solid #0f172a", display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#ef4444″ }}>✗</span> {reason}
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 Preparation Checklist by Inspection Type</h2>
          <p style={{ color: "#94a3b8″, marginBottom: "1rem" }}>Select your inspection type:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {inspections.map(i => (
              <button key={i.type} onClick={() => setSelected(i.type)} style={{
                background: selected === i.type ? "#F5E642″ : "#0f172a",
                color: selected === i.type ? "#0A1628″ : "#fff",
                border: "1px solid #334155″, borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{i.type}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              {info.checklist.map((item, i) => (
                <div key={i} style={{ color: "#cbd5e1″, padding: "0.35rem 0", borderBottom: "1px solid #1e293b", display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#22c55e" }}>✓</span> {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
