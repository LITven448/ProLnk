import { useState } from 'react';

const wildcardIssues = [
  {
    id: 1,
    icon: "🚶",
    title: "Walking Crack",
    symptom: "Crack that seems to shift position between seasons",
    cause: "Active foundation movement — crack migrates as soil expands and contracts with DFW clay cycles",
    risk: "Indicates ongoing movement, not historic damage. Requires monitoring and likely repair.",
    steps: ["Document crack location with photo and masking tape marker", "Re-check in 30 days", "If position changed = active movement", "Get structural engineer assessment before cosmetic repair"],
    proTip: "Never fill a walking crack with caulk. You need to know if it moves. Mark it, track it."
  },
  {
    id: 2,
    icon: "📐",
    title: "Corner Pop",
    symptom: "L-shaped crack exactly at an interior room corner, floor to mid-wall",
    cause: "Soil composition differs on each side of the corner — one side heaves more than the other",
    risk: "Cosmetic if single occurrence. Structural if multiple corners affected or if crack widens.",
    steps: ["Measure crack width at top and bottom", "Check if door in that room sticks", "Inspect exterior corner for matching crack", "Call foundation pro if exterior crack present"],
    proTip: "Corner pops are extremely common in DFW. One crack, no sticking door = cosmetic. Multiple = call a pro."
  },
  {
    id: 3,
    icon: "🌳",
    title: "Foundation Lift from Tree Roots",
    symptom: "One section of slab is higher than surrounding area, near large tree",
    cause: "Tree root system physically lifting slab — rarer than tree-related shrinkage but does occur",
    risk: "Plumbing line damage, slab fracture, significant repair cost ($8K–$25K)",
    steps: ["Locate root intrusion with ground-penetrating radar or camera inspection", "Install root barrier (physical or chemical)", "Add French drain to redirect moisture away from root zone", "Monitor slab level for 1 full season after root work"],
    proTip: "Post oak and live oak roots are the main culprits in DFW. Remove roots carefully — killing the tree causes worse soil movement."
  },
  {
    id: 4,
    icon: "📊",
    title: "Differential Settlement Pattern",
    symptom: "One wing of house lower than other, but no visible cracks",
    cause: "Soil compaction varies under different sections — often due to original fill quality at construction",
    risk: "Slow-moving but cumulative. Can take 5–10 years to become visible. Get ahead of it.",
    steps: ["Level check with digital level across doorframes", "Measure gap under interior doors (should be <1/4 inch)", "Pull plumbing records — check for leak history under that section", "Foundation inspection with elevation map"],
    proTip: "DFW homes built on fill soil in developments from the 1990s-2010s are most vulnerable to differential settlement."
  }
];

export default function DFWFoundationWildcard2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = wildcardIssues.find(i => i.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Foundation Wildcard Issues 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Unusual foundation problems in DFW — the ones that confuse even experienced homeowners</p>
        </div>
        <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {wildcardIssues.map(issue => (
            <button key={issue.id} onClick={() => setSelected(selected === issue.id ? null : issue.id)}
              style={{ background: selected === issue.id ? "#1a2744" : "#0f1f3d", border: `2px solid ${selected === issue.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 20, textAlign: "left", cursor: "pointer", color: "#fff", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{issue.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: selected === issue.id ? "#F5E642" : "#fff" }}>{issue.title}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 2 }}>{issue.symptom}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F5E642", fontSize: 20 }}>{selected === issue.id ? "▲" : "▼"}</span>
              </div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1a2744", border: "2px solid #F5E642", borderRadius: 16, padding: 28 }}>
            <h2 style={{ color: "#F5E642", fontSize: 20, marginBottom: 16 }}>{active.icon} {active.title} — Wildcard Assessment</h2>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#94a3b8", fontSize: 13 }}>ROOT CAUSE</span><p style={{ marginTop: 4 }}>{active.cause}</p></div>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#f87171", fontSize: 13 }}>⚠️ RISK</span><p style={{ marginTop: 4 }}>{active.risk}</p></div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: "#94a3b8", fontSize: 13 }}>ASSESSMENT STEPS</span>
              <ol style={{ marginTop: 8, paddingLeft: 20 }}>{active.steps.map((s, i) => <li key={i} style={{ marginBottom: 6, color: "#cbd5e1" }}>{s}</li>)}</ol>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 16 }}><span style={{ color: "#F5E642", fontSize: 13 }}>💡 PRO TIP</span><p style={{ marginTop: 4, color: "#94a3b8", fontStyle: "italic" }}>{active.proTip}</p></div>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <a href="https://prolnk.io" style={{ background: "#F5E642", color: "#0A1628", fontWeight: 800, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>Get a DFW Foundation Pro — prolnk.io</a>
            </div>
          </div>
        )}
        {!active && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24 }}>Select an issue above to see the wildcard assessment guide</div>}
        <div style={{ textAlign: "center", marginTop: 40, color: "#475569", fontSize: 13 }}>ProLnk.io · DFW Foundation Wildcard Guide 2026 · Structural Pros Ready</div>
      </div>
    </div>
  );
}