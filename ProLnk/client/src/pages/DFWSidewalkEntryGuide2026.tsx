import { useState } from 'react';

const conditions = ["Great — No Issues", "Fair — Minor Cracks/Settling", "Poor — Trip Hazards", "None — No Front Path"];

const recs: Record<string, { path: string; material: string; lighting: string; door: string; permit: string; cost: string; cityNote: string; priority: string[] }> = {
  "Great — No Issues": {
    path: "Seal & Enhance Existing Path",
    material: "Concrete sealer + decorative border stones",
    lighting: "Solar path lights ($200–$600) or low-voltage LED ($500–$1,500)",
    door: "New door hardware + house numbers ($200–$600)",
    permit: "No permit needed for minor enhancements",
    cost: "$500–$3,000″,
    cityNote: "Check your city: Dallas, Fort Worth, Plano, and Frisco require homeowners to maintain city sidewalk panels adjacent to property.",
    priority: ["🔩 Door hardware upgrade", "💡 Entry lighting", "📬 New house numbers + mailbox", "🌿 Border plantings"],
  },
  "Fair — Minor Cracks/Settling": {
    path: "Grind, Patch & Resurface",
    material: "Concrete grinding + overlay OR flagstone over existing base",
    lighting: "Low-voltage LED path lighting ($600–$1,800)",
    door: "Refinish or replace front door ($500–$3,000)",
    permit: "No permit for path resurfacing — permit required if altering city sidewalk",
    cost: "$2,500–$8,000″,
    cityNote: "Dallas and Arlington require permits before modifying city-owned sidewalk panels. Contact city public works before any sidewalk work.",
    priority: ["🛣️ Path resurfacing or flagstone overlay", "💡 LED entry lighting", "🚪 Front door refresh", "📬 Mailbox + house numbers"],
  },
  "Poor — Trip Hazards": {
    path: "Full Path Replacement",
    material: "New concrete, flagstone, or paver path",
    lighting: "Hard-wired entry lighting ($800–$2,500) + path lights",
    door: "New front door ($1,500–$4,000) — high ROI at 75%",
    permit: "Permit required for new concrete work. City sidewalk repair: some DFW cities cost-share with homeowners.",
    cost: "$6,000–$18,000″,
    cityNote: "Frisco and McKinney have city programs that share sidewalk repair costs with homeowners — contact public works before hiring contractor.",
    priority: ["🛣️ Full path replacement (flagstone or pavers)", "🚪 New front door — highest ROI upgrade", "💡 Hard-wired entry + path lighting", "🌿 Foundation plantings along new path"],
  },
  "None — No Front Path": {
    path: "New Front Path Installation",
    material: "Flagstone, concrete pavers, or poured concrete",
    lighting: "Hard-wired entry lighting + solar path lights",
    door: "New front door + frame if not updated",
    permit: "Permit required for new path connecting to city sidewalk in most DFW cities",
    cost: "$8,000–$25,000″,
    cityNote: "New paths connecting to city sidewalks require permits in Dallas, Fort Worth, Plano, Frisco, McKinney, and most DFW cities. Budget $200–$600 for permits.",
    priority: ["🛣️ Flagstone or paver path — premium curb appeal", "🚪 New front door — 75% ROI", "💡 Landscape + entry lighting package", "🌿 Flanking plants + mulch beds along path"],
  },
};

export default function DFWSidewalkEntryGuide2026() {
  const [condition, setCondition] = useState("Great — No Issues");
  const rec = recs[condition];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui,sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🚶</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", fontWeight: 800, margin: "0.5rem 0 0.25rem" }}>DFW Sidewalk & Entry Guide 2026</h1>
          <p style={{ color: "#94a3b8″, margin: 0 }}>Front path upgrades, city permit rules, and entry improvements for DFW homes</p>
        </div>
        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>Current Entry Condition:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {conditions.map(c => (
              <button key={c} onClick={() => setCondition(c)}
                style={{ padding: "0.6rem 1rem", borderRadius: 8, border: "none", cursor: "pointer",
                  background: condition === c ? "#F5E642″ : "#1e3a5f",
                  color: condition === c ? "#0A1628″ : "#cbd5e1", fontWeight: 700, textAlign: "left" }}>{c}</button>
            ))}
          </div>
        </div>
        {rec && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: "1.15rem" }}>✅ {rec.path}</div>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: "1.1rem" }}>{rec.cost}</div>
            </div>
            <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginBottom: "0.6rem" }}>🧱 Material: {rec.material}</div>
            <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginBottom: "0.6rem" }}>💡 Lighting: {rec.lighting}</div>
            <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginBottom: "1rem" }}>🚪 Door: {rec.door}</div>
            <div style={{ background: "#1e3a5f", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }}>📋 Permit Requirements</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>{rec.permit}</div>
            </div>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Improvement Priority:</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
              {rec.priority.map((p, i) => <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem" }}>#{i + 1} — {p}</div>)}
            </div>
            <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: "0.75rem" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }}>🏙️ DFW City Note</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>{rec.cityNote}</div>
            </div>
          </div>
        )}
        <div style={{ marginTop: "1.5rem", background: "#0f2040″, borderRadius: 12, padding: "1.25rem", color: "#94a3b8", fontSize: "0.9rem" }}>
          ⚠️ <strong style={{ color: "#F5E642″ }}>DFW Sidewalk Responsibility:</strong> Dallas, Fort Worth, Plano, and most DFW cities hold homeowners responsible for city sidewalk panels adjacent to their property. Confirm with your city before any sidewalk repair begins.
        </div>
      </div>
    </div>
  );
}
