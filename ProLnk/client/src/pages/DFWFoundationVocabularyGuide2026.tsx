import { useState } from 'react';

const foundationConcerns = [
  {
    concern: "🏗️ DFW Soil Basics",
    terms: [
      { word: "Expansive Clay", def: "The black, dark gray clay soil found throughout DFW (Blackland Prairie). Swells dramatically when wet and shrinks when dry — primary cause of foundation movement in DFW." },
      { word: "Plasticity Index", def: "Measure of soil expansivity (abbreviated PI). DFW soils often have PI of 30–60 or higher. Higher PI = more volume change with moisture = greater foundation risk." },
      { word: "Active Zone", def: "Depth in DFW soil where seasonal moisture changes occur — typically 5–15 feet. Below this depth, moisture is stable; foundations bear on stable soil." },
      { word: "Differential Movement", def: "When edges and center of a slab move at different rates — the most destructive pattern. Creates sloping floors, sticking doors, diagonal wall cracks." },
      { word: "Soil Moisture Management", def: "Maintaining consistent soil moisture around your foundation with drip irrigation and proper drainage — the most effective DFW foundation protection strategy." },
    ],
  },
  {
    concern: "🔩 Slab Types",
    terms: [
      { word: "Post-Tension Slab", def: "Concrete slab reinforced with steel cables tensioned after the concrete cures — standard in DFW since the 1980s. NEVER saw, drill, or core without locating cables first." },
      { word: "Conventional Slab", def: "Concrete slab reinforced with rebar grid — common in DFW before 1980. Generally repairable with interior piers without cable concerns." },
      { word: "Grade Beam", def: "Thickened concrete beam at slab perimeter and interior — the deep portion that bears on piers and transfers load." },
      { word: "Monolithic Slab", def: "Slab and grade beams poured as one continuous pour — most common in DFW residential. The slab and beams are integral." },
      { word: "Waffle Slab", def: "Slab with internal ribbing creating a waffle pattern when viewed from below — used in very high plasticity-index soil areas of DFW for extra stiffness." },
    ],
  },
  {
    concern: "🏛️ Pier Systems",
    terms: [
      { word: "Bell-Bottom Pier", def: "Concrete pier drilled into stable soil with a flared (belled) base for bearing capacity — the traditional DFW repair method. Requires dry conditions to drill." },
      { word: "Helical Pier", def: "Steel screw-type pier rotated into stable soil — works in wet conditions when bell-bottoms cannot be drilled. Faster installation, no concrete required." },
      { word: "Push Pier", def: "Steel pier hydraulically driven through unstable soil until it reaches resistance — lifts and stabilizes settled foundations from the exterior." },
      { word: "Underpinning", def: "General term for any system that installs new supports beneath an existing foundation to stabilize or lift it." },
      { word: "Pier Spacing", def: "Distance between piers in a repair plan — typically 6–8 feet for DFW conditions. Closer spacing provides more support and better lift results." },
    ],
  },
  {
    concern: "📐 Movement Types",
    terms: [
      { word: "Settlement", def: "Downward movement of the slab — caused by soil compression, erosion, or drying shrinkage. Edges typically settle more than the center in DFW." },
      { word: "Heave", def: "Upward movement of the slab — caused by swelling soil under the center when edges are drier. More damaging than settlement and harder to repair." },
      { word: "Center Lift", def: "Heave pattern where the center of the slab rises while edges remain stable — creates a dome shape, common after DFW wet years." },
      { word: "Edge Lift", def: "Heave pattern where edges rise relative to center — common when soil under edges is kept wet by irrigation while center stays dry." },
      { word: "Elevation Survey", def: "Measurement of the slab elevation at multiple points using a digital level — the diagnostic tool that quantifies movement and guides repair planning." },
    ],
  },
];

export default function DFWFoundationVocabularyGuide2026() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTerm, setActiveTerm] = useState<number | null>(null);

  const active = foundationConcerns[activeIndex];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏛️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Foundation Vocabulary Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, margin: 0 }}>Foundation terms every DFW homeowner needs before calling a foundation company</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28, justifyContent: "center" }}>
          {foundationConcerns.map((fc, i) => (
            <button key={i} onClick={() => { setActiveIndex(i); setActiveTerm(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
                background: activeIndex === i ? "#F5E642″ : "#1e2d45", color: activeIndex === i ? "#0A1628" : "#cbd5e1" }}>
              {fc.concern}
            </button>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 14, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginTop: 0, marginBottom: 18 }}>{active.concern} Terms</h2>
          {active.terms.map((term, i) => (
            <div key={i} onClick={() => setActiveTerm(activeTerm === i ? null : i)}
              style={{ background: activeTerm === i ? "#1a2d48″ : "#0d1b2e", border: `1px solid ${activeTerm === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 10, padding: "14px 18px", marginBottom: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, color: activeTerm === i ? "#F5E642″ : "#e2e8f0", fontSize: 16 }}>{term.word}</span>
                <span style={{ color: "#F5E642″, fontSize: 18 }}>{activeTerm === i ? "▲" : "▼"}</span>
              </div>
              {activeTerm === i && <p style={{ color: "#94a3b8″, fontSize: 14, margin: "10px 0 0", lineHeight: 1.6 }}>{term.def}</p>}
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#475569″, fontSize: 13, marginTop: 28 }}>© 2026 ProLnk · DFW Home Services Platform</p>
      </div>
    </div>
  );
}
