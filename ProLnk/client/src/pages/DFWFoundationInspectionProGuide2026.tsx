import { useState } from 'react';

const inspectionTypes: Record<string, { steps: string[]; docs: string[] }> = {
  "Standard Residential": {
    steps: [
      "🔲 Exterior perimeter walk — photograph all four elevations of foundation",
      "🔲 Pier engagement check — probe accessible piers for separation or tilt",
      "🔲 Moisture reading at foundation perimeter — document readings per side",
      "🔲 Interior floor levelness scan — use digital level, map high/low points",
      "🔲 Crack documentation — photograph, measure width, classify (cosmetic/structural)",
      "🔲 Door and window operation test — sticky doors/windows indicate movement",
      "🔲 Drainage assessment — grade slope toward or away from foundation",
      "🔲 Plumbing hydrostatic test recommendation if settlement is significant",
    ],
    docs: [
      "📄 Elevation map with readings per corner and midpoint",
      "📄 Photo log with GPS coordinates and timestamps",
      "📄 Crack classification report — cosmetic vs structural",
      "📄 Drainage diagram noting positive/negative slope areas",
    ],
  },
  "Post-Drought Inspection": {
    steps: [
      "🔲 Full perimeter moisture reading — DFW clay shrinks dramatically in drought",
      "🔲 Pier engagement check — drought causes void formation under slab",
      "🔲 Foundation crack survey — drought-related cracks often diagonal at corners",
      "🔲 Interior floor differential — map slab belly vs perimeter heave",
      "🔲 Door and window binding — document which doors and direction of bind",
      "🔲 Drainage and soaker hose assessment — recommend foundation watering program",
      "🔲 Check for plumbing leaks — under-slab leaks worsen drought conditions",
    ],
    docs: [
      "📄 Moisture differential report — perimeter vs interior readings",
      "📄 Foundation watering recommendation letter",
      "📄 Crack progression documentation if repeat inspection",
      "📄 Plumbing test recommendation if indicated",
    ],
  },
  "Pre-Purchase Inspection": {
    steps: [
      "🔲 Full exterior foundation perimeter photo documentation",
      "🔲 All accessible pier condition assessment",
      "🔲 Interior floor levelness — map entire floor plan",
      "🔲 All cracks measured and classified",
      "🔲 All door and window operation tested and recorded",
      "🔲 Drainage evaluation — DFW clay drainage is a primary risk factor",
      "🔲 Plumbing hydrostatic test — recommend if any significant settlement found",
      "🔲 Transferable warranty check on any prior repair",
    ],
    docs: [
      "📄 Full written inspection report with photos",
      "📄 Settlement severity classification (minor/moderate/severe)",
      "📄 Repair cost range estimate if applicable",
      "📄 Prior repair documentation request list for seller",
    ],
  },
  "Post-Repair Verification": {
    steps: [
      "🔲 Verify pier count and placement matches repair plan",
      "🔲 Pier engagement confirmed — no separation at time of inspection",
      "🔲 Floor levelness re-measurement — document change from pre-repair baseline",
      "🔲 Door and window operation re-test — all previously binding doors",
      "🔲 Crack re-measurement — document closure or stabilization",
      "🔲 Drainage condition post-repair — confirm no grading disruption",
      "🔲 Obtain transferable warranty documentation from repair company",
    ],
    docs: [
      "📄 Before/after elevation comparison report",
      "📄 Pier placement diagram vs plan",
      "📄 Warranty documentation checklist",
      "📄 Monitoring recommendation for 12-month post-repair period",
    ],
  },
};

const types = Object.keys(inspectionTypes);

export default function DFWFoundationInspectionProGuide2026() {
  const [type, setType] = useState<string>(types[0]);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🏗️</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>
            DFW Foundation Inspection Pro Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, maxWidth: 580, margin: "0 auto" }}>
            DFW black clay soil is the most active foundation environment in the US. ProLnk Charter foundation pros follow systematic protocols — every visit, fully documented.
          </p>
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 16, marginBottom: 16 }}>Select Inspection Type → Documentation Guide</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: type === t ? "#F5E642″ : "#1a2f55",
                  color: type === t ? "#0A1628″ : "#e2e8f0",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <h3 style={{ color: "#e2e8f0″, fontSize: 14, marginBottom: 12 }}>Inspection Steps</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {inspectionTypes[type].steps.map((item, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#e2e8f0", border: "1px solid #1e3a5f" }}>
                {item}
              </div>
            ))}
          </div>
          <h3 style={{ color: "#F5E642″, fontSize: 14, marginBottom: 12 }}>Required Documentation</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {inspectionTypes[type].docs.map((doc, i) => (
              <div key={i} style={{ background: "#0a1f0a", borderRadius: 8, padding: "11px 16px", fontSize: 14, color: "#86efac", border: "1px solid #14532d" }}>
                {doc}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>ProLnk Charter Foundation Pros — DFW Founding Slots</p>
          <p style={{ color: "#1a2f55″, fontSize: 14, margin: 0 }}>Join at prolnk.io — waitlist closes at 500 Charter members</p>
        </div>
      </div>
    </div>
  );
}

