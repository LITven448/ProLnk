import { useState } from 'react';

const stages = [
  { id: "lot", label: "Lot Selection", icon: "📍", inspect: ["Drainage patterns — does water flow away from pad?", "Proximity to power lines or utility easements", "Soil composition report from builder", "Lot premium justification — corner, greenbelt, cul-de-sac"], ask: ["What is the drainage plan for this section?", "Are there any deed restrictions beyond HOA?", "What utilities are included in base price?"] },
  { id: "framing", label: "Framing Stage", icon: "🏗️", inspect: ["Hire independent inspector NOW — best time to see everything", "Wall stud spacing (16\" OC standard)", "Window & door rough openings are square", "Roof truss connections & hurricane clips"], ask: ["Can I bring my own inspector during each phase?", "What lumber grade is being used?", "Show me the engineering drawings for the roof truss system."] },
  { id: "mechanical", label: "Mechanical Rough-In", icon: "⚡", inspect: ["Electrical panel location and size (200-amp minimum)", "HVAC duct routing — avoid attic runs where possible in DFW", "Plumbing drain slope (1/4\" per foot minimum)", "Gas line pressure test documentation"], ask: ["What HVAC brand and SEER rating?", "Is the electrical panel expandable?", "Are plumbing lines PEX or CPVC?"] },
  { id: "drywall", label: "Pre-Drywall", icon: "🧱", inspect: ["Final chance to see all framing, plumbing, electrical before walls close", "Insulation type and R-value (R-38 attic minimum for DFW)", "Window installation and flashing", "Fire blocking in walls"], ask: ["What insulation product is being installed?", "Can we upgrade insulation before drywall?", "Where are all blocking locations for TV mounts?"] },
  { id: "closing", label: "Pre-Closing Walkthrough", icon: "🔑", inspect: ["Punch list: every scratch, dent, missing item", "All doors and windows operate smoothly", "Grading slopes away from foundation", "All appliances operate correctly"], ask: ["What is covered under the 1-year workmanship warranty?", "Who do I call for warranty claims?", "What is NOT covered in the builder warranty?"] },
  { id: "post", label: "Year 1–3 Watch Items", icon: "📅", inspect: ["Foundation settlement (1–2\" is normal in DFW clay)", "Drywall cracks at corners — normal shrinkage", "Grout cracking in tile — normal", "Exterior caulk shrinkage around windows and doors"], ask: ["When does my 2-year mechanical warranty expire?", "When does my 10-year structural warranty kick in vs. end?", "How do I document warranty claims?"] },
];

export default function DFWNewConstructionGuide2026() {
  const [active, setActive] = useState<string>("lot");
  const selected = stages.find(s => s.id === active)!;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "8px 0 4px" }}>DFW New Construction Guide 2026</h1>
          <p style={{ color: "#8892A4″, fontSize: 15 }}>Select your build stage — know exactly what to inspect and what to ask.</p>
          <div style={{ display: "inline-flex", gap: 8, background: "#111E35″, borderRadius: 8, padding: "6px 12px", marginTop: 12 }}>
            <span style={{ fontSize: 13, color: "#F5E642″, fontWeight: 700 }}>⚠️ Builder warranty: 1yr workmanship · 2yr mechanical · 10yr structural</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: active === s.id ? "#F5E642″ : "#111E35", color: active === s.id ? "#0A1628" : "#8892A4", transition: "all 0.15s" }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 24, marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#F5E642″, margin: "0 0 16px" }}>{selected.icon} {selected.label}</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#8892A4″, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>🔍 What to Inspect</div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {selected.inspect.map((item, i) => <li key={i} style={{ marginBottom: 8, lineHeight: 1.5, fontSize: 14 }}>{item}</li>)}
            </ul>
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, color: "#F5E642″, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>❓ Questions to Ask Your Builder</div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {selected.ask.map((q, i) => <li key={i} style={{ marginBottom: 8, lineHeight: 1.5, fontSize: 14, color: "#C8D0E0″ }}>{q}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔧 Need an independent inspector or contractor? ProLnk has vetted DFW professionals at every stage.</div>
          <button style={{ marginTop: 12, background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find DFW Inspectors →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568″, fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
