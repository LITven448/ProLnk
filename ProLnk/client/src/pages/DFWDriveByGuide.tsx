import { useState } from 'react';

const FLOOD_SIGNS = [
  "FEMA flood zone markers on utility poles or curbs",
  "Elevation difference — homes at street level in low-lying terrain",
  "Water stain lines on fences or retaining walls",
  "Overbuilt drainage ditches along road edges",
  "County flood maps (DFWFLOODMAP.com) — check before visiting",
];

const GENERAL = [
  "Deferred maintenance: Peeling paint, sagging fascia, cracked driveways on multiple homes",
  "Commercial encroachment: Warehouses or strip malls adjacent to residential",
  "Overhead utility lines: Above-ground power = older infrastructure + storm damage risk",
  "For-rent signs: High rental concentration reduces pride-of-ownership maintenance",
  "Abandoned or vacant lots: Attracts code violations, slow to gentrify",
  "Trailer storage: Boats/RVs in drives = HOA-light zone",
  "Stray animals: Signals code enforcement gaps in area",
];

const TYPE_CHECKLISTS: Record<string, string[]> = {
  "Master-Planned Community": [
    "Check main entry monument — maintained or crumbling?",
    "HOA common areas: Pools, parks, landscaping quality",
    "Look for model home section vs older section divide",
    "Drive the commercial edge — what's adjacent to development?",
    "Count construction cranes — active building = still setting values",
  ],
  "Established Neighborhood": [
    "Drive every block — not just the listing street",
    "Note tree canopy — older = more root risk in DFW clay",
    "Look for foundation company yard signs on neighbors",
    "Check street lighting at edge blocks",
    "Spot check cross-streets for traffic cut-through behavior",
  ],
  "Transitional Area": [
    "New builds next to neglected homes — verify trend direction",
    "Commercial permits posted on buildings (city permit boards)",
    "Look for infill teardowns underway",
    "Count occupied vs vacant commercial on main corridor",
    "Assess sidewalk continuity — big signal of city investment",
  ],
  "Rural Fringe / Acreage": [
    "Road maintenance: Private road? Who maintains?",
    "Overhead power lines vs buried — risk in Texas storms",
    "Check proximity to industrial land (county zoning maps)",
    "Look for mobile homes or older structures — affects comps",
    "Distance to grocery or urgent care — DFW sprawl is real",
  ],
};

export default function DFWDriveByGuide() {
  const [neighborhoodType, setNeighborhoodType] = useState("Established Neighborhood");
  const [checklist, setChecklist] = useState<string[]>([]);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#e8e8e8", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: "#F5E642", letterSpacing: 2, marginBottom: 8 }}>BUYER TOOL</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 6 }}>DFW Drive-By Assessment Guide</h1>
        <p style={{ color: "#aaa", fontSize: 16, marginBottom: 36 }}>Never waste a showing on a neighborhood you didn't vet from the street first.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>👀 What to See From the Car</h2>
        {GENERAL.map((item, i) => (
          <div key={i} style={{ background: "#111e33", borderRadius: 10, padding: "14px 18px", marginBottom: 10, fontSize: 14, color: "#ccc" }}>
            🔍 {item}
          </div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginTop: 32, marginBottom: 16 }}>🌊 DFW Flood Risk Signals</h2>
        <div style={{ background: "#0d1a2e", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20, marginBottom: 28 }}>
          {FLOOD_SIGNS.map((s, i) => (
            <div key={i} style={{ fontSize: 14, color: "#7dd3fc", marginBottom: 10 }}>💧 {s}</div>
          ))}
        </div>

        <div style={{ background: "#111e33", borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#F5E642", marginBottom: 18 }}>🗺️ Get My Drive-By Checklist</div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, color: "#aaa" }}>Neighborhood Type</label>
            <select value={neighborhoodType} onChange={e => { setNeighborhoodType(e.target.value); setChecklist([]); }} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, background: "#1e2f4a", color: "#fff", border: "1px solid #2a3f5f", fontSize: 14 }}>
              {Object.keys(TYPE_CHECKLISTS).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button onClick={() => setChecklist(TYPE_CHECKLISTS[neighborhoodType])} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Get Checklist</button>
          {checklist.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 14 }}>Priority Items for {neighborhoodType}:</div>
              {checklist.map((item, i) => (
                <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 4, padding: "2px 8px", fontWeight: 700, fontSize: 12, minWidth: 24, textAlign: "center" }}>{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
