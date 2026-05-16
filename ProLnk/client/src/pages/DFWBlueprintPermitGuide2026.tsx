import { useState } from 'react';

const projects = [
  { type: "New Home Build", plans: ["Site plan with drainage + setbacks", "Full architectural floor plans (all floors)", "Exterior elevations (all 4 sides)", "Foundation plan signed by engineer", "Framing plan + roof layout", "MEP drawings (mechanical, electrical, plumbing)", "Energy compliance documentation (Manual J)"] },
  { type: "Addition (>200 sq ft)", plans: ["Site plan showing addition footprint", "Floor plan of new space + affected rooms", "Exterior elevations showing addition", "Foundation/structural plan", "Framing plan for new space", "MEP drawings if trade work involved", "Energy compliance if conditioned space"] },
  { type: "Interior Remodel", plans: ["Floor plan showing layout changes", "Elevations for cabinets/tile (kitchen/bath)", "Electrical plan if panel or circuit changes", "Plumbing plan if relocating fixtures", "Structural notes if removing walls"] },
  { type: "Deck or Patio Cover", plans: ["Site plan showing deck location + setbacks", "Structural framing plan", "Foundation pier layout", "Elevation showing height and railing", "Ledger attachment detail (if attached to house)"] },
  { type: "Fence or Shed", plans: ["Site plan with property lines", "Fence height and material specification", "Shed floor plan and elevation (if >200 sq ft)"] },
];

export default function DFWBlueprintPermitGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const info = projects.find(p => p.type === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          📐 DFW Blueprint & Permit Guide 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          DFW Blueprint and Permit Set Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>
          What goes into a DFW building permit set — what drawings are required, who prepares them, and how detailed they need to be based on your project scope.
        </p>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>👷 Who Draws Your Plans?</h2>
          {[
            { who: "Licensed Architect", when: "New construction, large additions, or structural complexity" },
            { who: "Registered Drafter", when: "Mid-complexity additions, remodels with layout changes" },
            { who: "Online Permit Drawing Service", when: "Simple decks, sheds, fences with standard framing" },
            { who: "Contractor-Provided Plans", when: "Some GCs include permit drawings in their scope — verify" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #0f172a" }}>
              <div style={{ color: "#F5E642", minWidth: 200, fontWeight: 600 }}>{item.who}</div>
              <div style={{ color: "#cbd5e1" }}>{item.when}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 Required Plans by Project Type</h2>
          <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Select your project type:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {projects.map(p => (
              <button key={p.type} onClick={() => setSelected(p.type)} style={{
                background: selected === p.type ? "#F5E642" : "#0f172a",
                color: selected === p.type ? "#0A1628" : "#fff",
                border: "1px solid #334155", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600
              }}>{p.type}</button>
            ))}
          </div>
          {info && (
            <div style={{ background: "#0f172a", borderRadius: 8, padding: "1rem" }}>
              {info.plans.map((plan, i) => (
                <div key={i} style={{ color: "#cbd5e1", padding: "0.35rem 0", borderBottom: "1px solid #1e293b", display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#F5E642" }}>📄</span> {plan}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>💡 DFW Pro Tips</h2>
          {["Submit complete plan sets — incomplete sets cause 4–6 week review delays", "Call the city building department before designing — local amendments vary by municipality", "Get engineer-stamped plans for anything structural", "Digital submissions accepted by most DFW cities — check city portal"].map((tip, i) => (
            <div key={i} style={{ color: "#cbd5e1", padding: "0.4rem 0", borderBottom: "1px solid #0f172a" }}>💡 {tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
