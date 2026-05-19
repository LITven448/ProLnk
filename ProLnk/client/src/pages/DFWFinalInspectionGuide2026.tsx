import { useState } from 'react';

type ChecklistItem = { label: string; detail: string };
type Checklists = Record<string, ChecklistItem[]>;

const checklists: Checklists = {
  "New Home": [
    { label: "Electrical rough-in", detail: "All wiring in walls before drywall — box placement, wire gauge, AFCI/GFCI breakers." },
    { label: "Plumbing rough-in", detail: "Supply and drain lines in slab/wall before covering. Pressure test required." },
    { label: "Framing inspection", detail: "Structural members, headers, shear walls, hurricane straps before insulation." },
    { label: "Insulation inspection", detail: "R-value verification (attic R-38, walls R-13 min) before drywall." },
    { label: "Final electrical", detail: "Panel labeling, GFCI in wet areas, AFCI in bedrooms, cover plates installed." },
    { label: "Final plumbing", detail: "Fixtures installed, water heater strapped, no leaks, TPR valve correct." },
    { label: "Smoke and CO detectors", detail: "Every bedroom, outside sleeping areas, each floor. Interconnected in new builds." },
    { label: "Final building inspection", detail: "Overall code compliance, grading, handrails, weather seal, CO issued." },
  ],
  "Kitchen Remodel": [
    { label: "Electrical rough-in", detail: "20A circuits for appliances, GFCI outlets within 6ft of sink, dedicated circuits." },
    { label: "Plumbing rough-in", detail: "Supply/drain if relocated. Air gap for dishwasher. Venting verified." },
    { label: "Final electrical", detail: "All outlets GFCI-protected, circuit breakers labeled, no open knockouts." },
    { label: "Final plumbing", detail: "No leaks, correct P-trap depth, garbage disposal properly wired." },
    { label: "Final building", detail: "Structural changes verified, ventilation (range hood), fire blocking in place." },
  ],
  "Bathroom Addition": [
    { label: "Plumbing rough-in", detail: "Drain/vent sizing verified, wet wall framing correct, water supply stubbed." },
    { label: "Electrical rough-in", detail: "20A circuit, GFCI outlets, exhaust fan wired and switched." },
    { label: "Framing inspection", detail: "Wet wall blocking, tub/shower surround backing, ceiling height." },
    { label: "Final plumbing", detail: "No leaks, proper drain slope, shower pan tested, tub secured." },
    { label: "Final electrical", detail: "GFCI protection, exhaust fan operational, lighting fixtures installed." },
    { label: "Final building", detail: "Ventilation passes, accessibility if applicable, door clearances." },
  ],
  "Deck / Patio": [
    { label: "Footing inspection", detail: "Concrete footings at proper depth (18-24 inches typical DFW). Before pour." },
    { label: "Framing inspection", detail: "Ledger attachment to house, joist hangers, beam sizing, post connections." },
    { label: "Final inspection", detail: "Guardrail height (36-42 inches), baluster spacing (<4 inches), stair riser/tread." },
  ],
};

export default function DFWFinalInspectionGuide2026() {
  const [projectType, setProjectType] = useState("New Home");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = checklists[projectType] ?? [];
  const toggle = (label: string) => setChecked(prev => ({ ...prev, [label]: !prev[label] }));
  const done = items.filter(i => checked[i.label]).length;

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>🔍</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800″, color: "#F5E642", marginTop: "8px" }}>DFW Final Inspection Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "8px" }}>Know exactly what DFW inspectors check at each stage — electrical, plumbing, framing, insulation, and final. Prepare properly to avoid failed inspections and re-inspection fees.</p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#94a3b8″, fontSize: "13px", display: "block", marginBottom: "6px" }}>Project Type</label>
          <select value={projectType} onChange={e => { setProjectType(e.target.value); setChecked({}); }} style={{ padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px", color: "#fff", fontSize: "14px", minWidth: "240px" }}>
            {Object.keys(checklists).map(k => <option key={k}>{k}</option>)}
          </select>
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ color: "#F5E642″, fontWeight: "700" }}>Inspection Checklist — {projectType}</h2>
            <span style={{ backgroundColor: done === items.length ? "#16a34a" : "#334155″, color: "#fff", borderRadius: "20px", padding: "4px 12px", fontSize: "13px" }}>{done}/{items.length} Ready</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map(item => (
              <div key={item.label} onClick={() => toggle(item.label)} style={{ cursor: "pointer", backgroundColor: checked[item.label] ? "#0f2a1a" : "#0f172a", border: `1px solid ${checked[item.label] ? "#16a34a" : "#334155"}`, borderRadius: "8px", padding: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>{checked[item.label] ? "✅" : "⬜"}</span>
                  <span style={{ fontWeight: "600″, color: checked[item.label] ? "#4ade80" : "#e2e8f0" }}>{item.label}</span>
                </div>
                <p style={{ color: "#94a3b8″, fontSize: "13px", marginTop: "6px", marginLeft: "28px" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "📞", title: "Re-inspection Fees", body: "DFW cities charge $75-$150 per failed re-inspection. Get it right the first time." },
            { icon: "📅", title: "Scheduling Lag", body: "Inspections typically take 1-3 business days to schedule. Plan your timeline accordingly." },
            { icon: "⚠️", title: "Don't Cover Work", body: "NEVER cover electrical, plumbing, or framing before the rough-in inspection passes. Automatic fail." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642″, fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8″, fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
