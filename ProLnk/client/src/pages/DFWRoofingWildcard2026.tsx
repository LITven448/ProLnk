import { useState } from 'react';

const wildcardIssues = [
  {
    id: 1,
    icon: "👻",
    title: "Phantom Leak",
    symptom: "Leak appears only after wind from a specific direction — no rain, no leak",
    cause: "Flashing gap on the windward side allows driven rain to enter at a precise angle",
    risk: "Intermittent but cumulative — sheathing and insulation absorb water unseen for years",
    steps: ["Note which wind direction triggers the leak", "Inspect flashing on that compass side of roof", "Check step flashing at walls and chimneys", "Hire roofer for hose test from that angle to confirm"],
    proTip: "Phantom leaks are almost always flashing, never shingles. Standard inspection misses them because most roofers check downward not lateral penetration."
  },
  {
    id: 2,
    icon: "🌧️",
    title: "Attic Rain",
    symptom: "Dripping inside attic in winter — no roof penetration visible",
    cause: "Warm moist air from living space hits cold roof sheathing, condenses into liquid water",
    risk: "Mold, decking rot, insulation compression — all expensive. Classic DFW winter issue.",
    steps: ["Check attic ventilation ratio (1:150 rule)", "Inspect soffit vents for blockage by insulation", "Verify exhaust fans terminate outside (not into attic)", "Add ridge vent or power vent if CFM is insufficient"],
    proTip: "In DFW, bath and kitchen fans vented into the attic cause 40% of attic rain cases. Check termination points first."
  },
  {
    id: 3,
    icon: "🔆",
    title: "Skylight Halo",
    symptom: "Circular condensation ring around skylight on ceiling drywall",
    cause: "Skylight frame seal failed — air leaks around frame, condenses on cold glass edge",
    risk: "Drywall damage, mold in skylight shaft, eventual frame rot if ignored",
    steps: ["Test seal with incense stick on cold day (smoke reveals draft)", "Inspect exterior curb flashing for gap", "Re-caulk interior frame joint with silicone", "If curb flashing is compromised, full reseal required"],
    proTip: "Skylight halos are often misdiagnosed as roof leaks. The fix is an air seal job, not a roofing job."
  },
  {
    id: 4,
    icon: "🐿️",
    title: "Squirrel Entry at Roof Edge",
    symptom: "Scratching sounds in attic, chewed wood at roof fascia or soffit junction",
    cause: "Eastern gray squirrels (ubiquitous in DFW oak neighborhoods) chew wood to create entry points",
    risk: "Wiring damage (fire risk), insulation contamination, nesting leads to secondary pest infestations",
    steps: ["Locate all entry points (shine light in attic to find daylight)", "Remove animals with one-way exclusion doors", "Seal all gaps with galvanized steel flashing — not wood, not foam", "Trim tree branches within 8 feet of roofline"],
    proTip: "Never seal squirrels inside. Install exclusion door for 1 week, then seal. Trapped squirrels cause far more damage than entry."
  }
];

export default function DFWRoofingWildcard2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = wildcardIssues.find(i => i.id === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW Roofing Wildcard Issues 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Unusual DFW roof problems that confuse homeowners and even some contractors</p>
        </div>
        <div style={{ display: "grid", gap: 16, marginBottom: 32 }}>
          {wildcardIssues.map(issue => (
            <button key={issue.id} onClick={() => setSelected(selected === issue.id ? null : issue.id)}
              style={{ background: selected === issue.id ? "#1a2744″ : "#0f1f3d", border: `2px solid ${selected === issue.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: 20, textAlign: "left", cursor: "pointer", color: "#fff", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{issue.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: selected === issue.id ? "#F5E642″ : "#fff" }}>{issue.title}</div>
                  <div style={{ color: "#94a3b8″, fontSize: 13, marginTop: 2 }}>{issue.symptom}</div>
                </div>
                <span style={{ marginLeft: "auto", color: "#F5E642″, fontSize: 20 }}>{selected === issue.id ? "▲" : "▼"}</span>
              </div>
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1a2744″, border: "2px solid #F5E642", borderRadius: 16, padding: 28 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>{active.icon} {active.title} — Wildcard Diagnosis</h2>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#94a3b8″, fontSize: 13 }}>ROOT CAUSE</span><p style={{ marginTop: 4 }}>{active.cause}</p></div>
            <div style={{ marginBottom: 16 }}><span style={{ color: "#f87171″, fontSize: 13 }}>⚠️ RISK</span><p style={{ marginTop: 4 }}>{active.risk}</p></div>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: "#94a3b8″, fontSize: 13 }}>DIAGNOSIS STEPS</span>
              <ol style={{ marginTop: 8, paddingLeft: 20 }}>{active.steps.map((s, i) => <li key={i} style={{ marginBottom: 6, color: "#cbd5e1″ }}>{s}</li>)}</ol>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 16 }}><span style={{ color: "#F5E642", fontSize: 13 }}>💡 PRO TIP</span><p style={{ marginTop: 4, color: "#94a3b8", fontStyle: "italic" }}>{active.proTip}</p></div>
            <div style={{ marginTop: 20, textAlign: "center" }}>
              <a href="https://prolnk.io" style={{ background: "#F5E642″, color: "#0A1628", fontWeight: 800, padding: "12px 28px", borderRadius: 8, textDecoration: "none", fontSize: 15 }}>Get a DFW Roofing Pro — prolnk.io</a>
            </div>
          </div>
        )}
        {!active && <div style={{ textAlign: "center", color: "#64748b", marginTop: 24 }}>Select an issue above to see the wildcard diagnosis guide</div>}
        <div style={{ textAlign: "center", marginTop: 40, color: "#475569″, fontSize: 13 }}>ProLnk.io · DFW Roofing Wildcard Guide 2026 · Vetted Roofers Ready</div>
      </div>
    </div>
  );
}