import { useState } from 'react';

const guides = [
  {
    home: "slab",
    concern: "pier",
    title: "Slab Home — Pier Placement",
    path: "🏠 Roof Load → Rafters → Ridge Beam → Exterior Walls → Grade Beam → Concrete Slab → Soil",
    insight: "In DFW slab homes, loads concentrate at corners and along exterior walls at the perimeter grade beam. Interior piers should align with load-bearing walls, typically running parallel to the long axis of the home. Kitchens and master baths (heavy fixtures) often need supplemental piers.",
    bearingWalls: ["Center hallway walls perpendicular to joists", "Walls directly below second-floor bedrooms", "Walls running parallel to trusses over open rooms"],
  },
  {
    home: "slab",
    concern: "crack",
    title: "Slab Home — Crack Analysis",
    path: "🏠 Roof → Walls → Slab → Expansive Clay Soil",
    insight: "DFW clay soils expand when wet and contract when dry. Diagonal cracks at door corners indicate differential settlement — one section of the slab moving relative to another. Horizontal cracks along the middle of the slab often indicate a post-tension cable issue rather than pier failure.",
    bearingWalls: ["Diagonal corner cracks = differential settlement", "Step cracks along mortar = edge heave or drop", "Horizontal mid-slab cracks = post-tension issue"],
  },
  {
    home: "pier-beam",
    concern: "pier",
    title: "Pier & Beam Home — Pier Placement",
    path: "🏚️ Roof → Rafters → Top Plates → Studs → Sill Plate → Floor Beams → Piers → Soil",
    insight: "Pier and beam homes concentrate loads at interior girder beams. Girder beams running under the center of the home carry the most load and require the most piers. In DFW, original cedar posts are often rotted — steel or concrete piers should replace them at 6-foot spacing under girder lines.",
    bearingWalls: ["Center girder beam under longest home axis", "Exterior perimeter sill plate at 8-ft intervals", "Under stairways and load-bearing partition walls"],
  },
  {
    home: "pier-beam",
    concern: "crack",
    title: "Pier & Beam Home — Crack Analysis",
    path: "🏚️ Roof → Walls → Floor System → Failing Pier → Soil Movement",
    insight: "Pier and beam cracks in DFW are typically caused by a single pier failing rather than broad soil movement. Interior door frames that are out of square, floor bounce, and localized drywall cracking above a specific room point to one or two pier failures underneath — not a global foundation problem.",
    bearingWalls: ["Localized door misalignment = single pier failure", "Floor bounce in specific room = girder beam sag", "Exterior step cracks = perimeter pier settlement"],
  },
];

export default function DFWFoundationLoadPath2026() {
  const [home, setHome] = useState<string>("slab");
  const [concern, setConcern] = useState<string>("pier");

  const result = guides.find(g => g.home === home && g.concern === concern);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ background: "#F5E642″, color: "#0A1628", padding: "0.4rem 1rem", borderRadius: 6, display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: "1rem" }}>
          🏗️ DFW FOUNDATION INTELLIGENCE 2026
        </div>
        <h1 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "0.5rem" }}>Foundation Load Path Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          Every load in a DFW home travels from roof to soil through a specific path. Understanding this path determines where piers go, why cracks form, and which repairs actually address the root cause.
        </p>

        <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1.25rem" }}>🔍 Diagnose Your Home</h2>

          <div style={{ marginBottom: "1rem" }}>
            <div style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, marginBottom: "0.5rem" }}>FOUNDATION TYPE</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[{ id: "slab", label: "🏠 Concrete Slab" }, { id: "pier-beam", label: "🏚️ Pier & Beam" }].map(h => (
                <button key={h.id} onClick={() => setHome(h.id)}
                  style={{ background: home === h.id ? "#F5E642″ : "#1e3a5f", color: home === h.id ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ color: "#94a3b8″, fontSize: 13, fontWeight: 600, marginBottom: "0.5rem" }}>PRIMARY CONCERN</div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[{ id: "pier", label: "📍 Pier Placement" }, { id: "crack", label: "🔍 Crack Analysis" }].map(c => (
                <button key={c.id} onClick={() => setConcern(c.id)}
                  style={{ background: concern === c.id ? "#F5E642″ : "#1e3a5f", color: concern === c.id ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result && (
          <>
            <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>{result.title}</div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", marginBottom: "1rem", fontFamily: "monospace", fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                {result.path}
              </div>
              <p style={{ color: "#cbd5e1″, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{result.insight}</p>
            </div>

            <div style={{ background: "#111f3c", borderRadius: 10, padding: "1.5rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>📍 Key Load Points</div>
              <ul style={{ color: "#94a3b8″, fontSize: 14, paddingLeft: "1.2rem", lineHeight: 2, margin: 0 }}>
                {result.bearingWalls.map(w => <li key={w}>{w}</li>)}
              </ul>
            </div>
          </>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: 13 }}>
          ProLnk · DFW Foundation Intelligence · 2026
        </div>
      </div>
    </div>
  );
}