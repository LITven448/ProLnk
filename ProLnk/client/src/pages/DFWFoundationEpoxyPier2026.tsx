import { useState } from 'react';

const issues = [
  { id: "cracks_hairline", label: "Hairline cracks (< 1/8 inch wide)", icon: "〰️", method: "epoxy",
    epoxy: "Hairline cracks are often best addressed with epoxy injection — it seals the crack and can restore tensile strength to concrete. In DFW, these frequently appear from seasonal shrink/swell cycles and are cosmetic unless accompanied by displacement.",
    pier: "Piers are not appropriate for hairline cracks alone. No structural settlement is occurring. Epoxy or polyurethane injection is the correct approach.",
    verdict: "epoxy" },
  { id: "cracks_wide", label: "Cracks wider than 1/4 inch", icon: "🔓", method: "pier",
    epoxy: "Epoxy can fill a wide crack but CANNOT fix the underlying movement that caused it. In DFW expansive clay, wide cracks indicate active soil movement. Sealing the crack without addressing settlement will result in the crack returning or worsening.",
    pier: "Wide cracks typically indicate structural settlement or heave. A foundation engineer should evaluate pier options (pressed concrete, push pier, or helical pier depending on DFW soil depth to stable stratum).",
    verdict: "pier" },
  { id: "doors_sticking", label: "Doors or windows sticking", icon: "🚪", method: "pier",
    epoxy: "Epoxy injection addresses crack symptoms, not the structural movement causing your doors to stick. This is a functional failure sign requiring structural evaluation.",
    pier: "Sticking doors and windows in DFW homes usually indicate active foundation movement — either settlement (sinking) or heave (rising). A structural engineer or experienced foundation company should perform a level survey to determine what's moving and in which direction.",
    verdict: "pier" },
  { id: "water_seepage", label: "Water seeping through foundation crack", icon: "💧", method: "epoxy",
    epoxy: "Epoxy or polyurethane injection is appropriate for waterproofing a non-structural crack. Polyurethane foam injection is particularly effective for active water infiltration — it expands to seal the crack even under wet conditions.",
    pier: "Piers do not address water infiltration. Unless settlement is also occurring, piers are not indicated for seepage alone. Focus on drainage correction and crack sealing.",
    verdict: "epoxy" },
  { id: "sold_epoxy", label: "A company quoted me epoxy for settlement", icon: "⚠️", method: "neither",
    epoxy: "Epoxy injection for foundation settlement is a red flag in DFW. Some companies sell epoxy injection as a 'foundation repair' for problems that actually require piers. Epoxy cannot lift or stabilize a settling foundation — it can only seal cracks.",
    pier: "If you have documented settlement (uneven floors, measured by laser level survey), you need piers — not epoxy. Get a second opinion from a structural engineer, not just another contractor.",
    verdict: "warning" },
];

const verdictColors: Record<string, string> = { epoxy: "#3b82f6″, pier: "#10b981", warning: "#ef4444", neither: "#94a3b8" };

export default function DFWFoundationEpoxyPier2026() {
  const [selected, setSelected] = useState("");

  const active = issues.find(i => i.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Epoxy Injection vs Foundation Pier Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, maxWidth: 580, margin: "0 auto" }}>
            The most common DFW foundation repair confusion — when to seal cracks vs. when you actually need structural piers.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { icon: "💉", title: "Epoxy Injection", color: "#3b82f6″, points: ["Seals cracks (not structural repair)", "Restores concrete tensile strength", "Stops water infiltration", "Appropriate: hairline, cosmetic, water issues"] },
            { icon: "🔩", title: "Foundation Piers", color: "#10b981″, points: ["Addresses actual settlement or heave", "Transfers load to stable soil stratum", "Requires excavation and installation", "Appropriate: movement, sticking doors, sloping floors"] },
          ].map(item => (
            <div key={item.title} style={{ background: "#112240″, borderRadius: 12, padding: "1.25rem", borderTop: `3px solid ${item.color}` }}>
              <div style={{ fontSize: "1.5rem" }}>{item.icon}</div>
              <h3 style={{ color: item.color, margin: "0.5rem 0″ }}>{item.title}</h3>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#94a3b8″, fontSize: "0.85rem", lineHeight: 1.8 }}>
                {item.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔎 Describe Your Foundation Issue</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {issues.map(issue => (
              <button
                key={issue.id}
                onClick={() => setSelected(issue.id === selected ? "" : issue.id)}
                style={{ background: selected === issue.id ? "#1e3a5f" : "#0A1628″, border: `2px solid ${selected === issue.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.875rem 1rem", cursor: "pointer", color: "#e2e8f0", textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem", transition: "all 0.2s" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{issue.icon}</span>
                <span style={{ fontWeight: selected === issue.id ? 700 : 400 }}>{issue.label}</span>
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", borderLeft: `4px solid ${verdictColors[active.verdict]}`, marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 1rem" }}>{active.icon} {active.label}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderTop: "3px solid #3b82f6" }}>
                <div style={{ color: "#3b82f6″, fontWeight: 700, marginBottom: 6 }}>💉 Epoxy Injection</div>
                <p style={{ color: "#cbd5e1″, fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{active.epoxy}</p>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", borderTop: "3px solid #10b981" }}>
                <div style={{ color: "#10b981″, fontWeight: 700, marginBottom: 6 }}>🔩 Foundation Piers</div>
                <p style={{ color: "#cbd5e1″, fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>{active.pier}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem" }}>
            🏠 Get a second opinion from a DFW structural engineer. <span style={{ color: "#F5E642″ }}>ProLnk connects you with vetted foundation specialists.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
