import { useState } from 'react';

const components = [
  {
    id: "slab",
    name: "Concrete Slab",
    emoji: "⬜",
    parts: ["4-6 inch concrete", "Wire mesh or rebar", "Post-tension cables"],
    desc: "The monolithic concrete foundation under your DFW home. Thickness varies by soil load and home size. Most DFW slabs are post-tension with cables tightened after the pour.",
    dfw: "DFW expansive clay soil causes slab movement year-round. Maintain consistent soil moisture around the perimeter — drought shrinks clay, heavy rain swells it. Both extremes crack slabs.",
  },
  {
    id: "gradebeams",
    name: "Grade and Interior Beams",
    emoji: "🏗️",
    parts: ["Perimeter grade beam", "Interior stiffening beams", "Beam pockets"],
    desc: "Concrete ribs formed in the slab before pouring. Grade beams run around the perimeter; interior beams create a grid. They provide stiffness and resist differential movement.",
    dfw: "DFW grade beams extend 24-36 inches below grade — deeper than the clay active zone. If perimeter beams are exposed or pulling away from the slab surface, call a foundation specialist immediately.",
  },
  {
    id: "ptcables",
    name: "Post-Tension Cables",
    emoji: "🔗",
    parts: ["Steel tendons", "Plastic sheathing", "Live end anchor", "Dead end anchor"],
    desc: "High-strength steel cables threaded through the slab and tensioned to 33,000 lbs after concrete cures. PT slabs are thinner but stronger than rebar-only slabs.",
    dfw: "Over 80% of DFW homes built after 1980 have PT slabs. NEVER cut a PT cable without engineering review — one severed cable can cause catastrophic slab failure. Mark cable locations before any core drilling.",
  },
  {
    id: "vapor",
    name: "Vapor Barrier",
    emoji: "🛡️",
    parts: ["Polyethylene sheet 6-10 mil", "Overlapping seams", "Termite shield"],
    desc: "Plastic sheeting under the slab that blocks ground moisture from migrating up through the concrete. Prevents efflorescence, mold under flooring, and structural deterioration.",
    dfw: "DFW high clay content retains moisture. A compromised vapor barrier allows moisture-driven slab heave. Evidence includes white salt deposits on slab, cupped hardwoods, or sticky tile adhesive.",
  },
  {
    id: "piers",
    name: "Repair Piers",
    emoji: "🔩",
    parts: ["Steel push piers", "Helical piers", "Pier brackets", "Pier pockets"],
    desc: "If your DFW foundation has been repaired, steel piers were driven to bedrock or stable soil and connected to the grade beam. Pier pockets are the access points left in the slab.",
    dfw: "DFW is the foundation repair capital of the US. Pier repairs are common and effective when done correctly. Keep all pier location records and load-bearing data — you will need them when selling the home.",
  },
];

export default function DFWFoundationSystemComp2026() {
  const [active, setActive] = useState<string | null>(null);
  const selected = components.find((c) => c.id === active);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Foundation Systems</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>Complete Reference 2026 — Select a component to explore</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {components.map((c) => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? "#F5E642" : "#1e2d4a", border: "2px solid " + (active === c.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "1.2rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, color: active === c.id ? "#0A1628" : "#F5E642", fontSize: "0.95rem" }}>{c.name}</div>
              <div style={{ color: active === c.id ? "#1e2d4a" : "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.parts.length} components</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#1e2d4a", border: "2px solid #F5E642", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{selected.emoji} {selected.name}</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {selected.parts.map((p) => (
                <span key={p} style={{ background: "#0A1628", border: "1px solid #2d3f5e", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.8rem", color: "#94a3b8" }}>{p}</span>
              ))}
            </div>
            <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: "0 0 1rem" }}>{selected.desc}</p>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.3rem" }}>🌍 DFW-Specific Note</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.dfw}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#1e2d4a", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700 }}>🔧 Need a DFW Foundation Pro?</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>ProLnk connects you with vetted DFW foundation specialists — free evaluations, transparent pricing</div>
        </div>
      </div>
    </div>
  );
}
