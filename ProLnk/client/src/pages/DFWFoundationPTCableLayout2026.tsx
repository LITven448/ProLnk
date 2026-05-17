import { useState } from 'react';

const layoutFacts = [
  { label: "Cable Directions", icon: "➕", value: "Both X and Y axes", desc: "Creates a grid pattern across the slab" },
  { label: "Typical Spacing", icon: "📏", value: "4 to 5 feet on center", desc: "Closer in high-load areas near beams" },
  { label: "Stressing Pockets", icon: "🔳", value: "Edge of slab — visible as plugs", desc: "Where hydraulic jack applied tension during construction" },
  { label: "As-Built Drawings", icon: "📄", value: "Filed with original permit", desc: "Request from city before any penetration" },
];

const pocketGuide = [
  { label: "What are the circular plugs in my slab edge?", answer: "Those are PT pockets — where the stressing jack accessed each cable after concrete cured. After tensioning, the pocket is filled with grout or a plastic plug. In DFW they are typically 2–3 inches diameter." },
  { label: "Can I see where cables run from outside?", answer: "Not precisely without as-built drawings. Generally cables run parallel to the long axis of the slab in one direction, perpendicular in the other. Pockets on opposing edges show cable endpoints." },
  { label: "How do I get as-built PT drawings for my DFW home?", answer: "Contact the City of Dallas/Plano/Frisco/etc. permit office with your address. As-built drawings should be on file from original construction permit. If builder was a large DFW production builder, they may also have records." },
];

const concerns = [
  { label: "Need to cut slab for plumbing repair", guide: "STOP. PT cables cannot be cut without engineering review. In DFW post-tension slabs, cutting a cable causes catastrophic local slab failure. You need as-built drawings and a structural engineer to identify safe cut zones." },
  { label: "Adding floor drain or new penetration", guide: "Any core drill or saw cut in a DFW PT slab requires GPR (ground-penetrating radar) scan first. Cost is $300–600 for a residential scan. Identifies cable paths to within 1 inch accuracy." },
  { label: "Slab crack running perpendicular to edge", guide: "Perpendicular cracks in PT slabs can indicate a broken tendon. If crack is wider than 1/8 inch or shows vertical displacement, have a PT specialist evaluate — broken cables can be repaired by exposing and re-anchoring the tail." },
  { label: "Rusty stains at slab edge pocket", guide: "Staining at PT pockets indicates pocket grout failure and cable corrosion. DFW alkaline soil accelerates corrosion. Have pockets regrouted with epoxy-modified mix. Inspect all edge pockets annually." },
  { label: "Buying DFW home — PT slab questions", guide: "Ask seller for original PT drawings and any engineering reports. PT slabs are superior to conventional slabs in DFW clay when maintained properly. Key red flags: edge pocket rust, slab cracks wider than 1/8 inch, and any previous unauthorized saw cuts." },
];

export default function DFWFoundationPTCableLayout2026() {
  const [selectedConcern, setSelectedConcern] = useState<number | null>(null);
  const [openPocket, setOpenPocket] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", color: "#F5E642", fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2 }}>
          PROLNK — DFW HOME SYSTEMS GUIDE 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          🔩 DFW Post-Tension Cable Layout Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.6 }}>
          How PT cables are routed in DFW slabs — grid patterns, pocket locations, as-built drawings, and what homeowners must know before any slab penetration.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {layoutFacts.map((f, i) => (
            <div key={i} style={{ background: "#0f2040", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <span style={{ fontSize: "1.4rem" }}>{f.icon}</span>
              <div style={{ color: "#F5E642", fontWeight: 700, marginTop: "0.3rem" }}>{f.label}</div>
              <div style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600 }}>{f.value}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a00", border: "1px solid #F5E642", borderRadius: 10, padding: "1rem", marginBottom: "2rem" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.4rem" }}>⚠️ Critical DFW Warning</div>
          <div style={{ color: "#e2e8f0", fontSize: "0.87rem", lineHeight: 1.6 }}>
            Never cut, drill, or saw a DFW post-tension slab without a GPR scan and structural engineer approval. A severed PT cable can cause immediate and permanent slab damage. No plumbing repair justifies skipping this step.
          </div>
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>PT Pocket Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {pocketGuide.map((p, i) => (
            <button key={i} onClick={() => setOpenPocket(openPocket === i ? null : i)}
              style={{ background: openPocket === i ? "#1a3a5c" : "#0f2040", border: `1px solid ${openPocket === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer" }}>
              {p.label}
              {openPocket === i && <div style={{ marginTop: "0.6rem", color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6 }}>{p.answer}</div>}
            </button>
          ))}
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 PT Cable Concern Guide</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelectedConcern(selectedConcern === i ? null : i)}
              style={{ background: selectedConcern === i ? "#1a3a5c" : "#0f2040", border: `1px solid ${selectedConcern === i ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#e2e8f0", textAlign: "left", cursor: "pointer", fontWeight: selectedConcern === i ? 700 : 400 }}>
              {c.label}
              {selectedConcern === i && (
                <div style={{ marginTop: "0.6rem", color: "#94a3b8", fontWeight: 400, fontSize: "0.88rem", lineHeight: 1.6 }}>{c.guide}</div>
              )}
            </button>
          ))}
        </div>
        <div style={{ color: "#475569", fontSize: "0.8rem", textAlign: "center" }}>ProLnk DFW Home Health Vault — PT Cable Layout Reference 2026</div>
      </div>
    </div>
  );
}
