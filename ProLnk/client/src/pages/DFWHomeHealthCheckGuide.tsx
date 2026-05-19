import { useState } from 'react';

const CHECKS = [
  { item: "HVAC Filter Replacement", icon: "❄️", timing: "Every 1–3 months", dfw: "DFW summer heat strains systems — check monthly May–Sep", time: "15 min", cost: "$10–$40″, priority: "high" },
  { item: "Roof Inspection", icon: "🏠", timing: "April (post-storm) + October", dfw: "DFW hail season peaks March–May; inspect after every significant storm", time: "30 min", cost: "$0 (DIY) / $150–$300 (pro)", priority: "high" },
  { item: "Foundation Moisture Check", icon: "🏗️", timing: "Monthly in dry months", dfw: "DFW expansive clay soil; water foundation perimeter weekly in drought to prevent cracking", time: "20 min", cost: "$0″, priority: "high" },
  { item: "Pest Inspection", icon: "🐜", timing: "Spring + Fall", dfw: "DFW has active termite and fire ant pressure; schedule quarterly treatment", time: "1 hr (pro)", cost: "$75–$200/visit", priority: "high" },
  { item: "Attic Insulation Check", icon: "🌡️", timing: "October before winter", dfw: "Texas attics hit 150°F in summer; R-38 minimum recommended for DFW", time: "20 min", cost: "$0 (DIY check)", priority: "medium" },
  { item: "Caulk & Seals Inspection", icon: "🔧", timing: "Spring", dfw: "DFW temp swings crack caulk around windows, doors, and plumbing penetrations", time: "1 hr", cost: "$10–$30 (materials)", priority: "medium" },
  { item: "Smoke & CO Detector Test", icon: "🚨", timing: "Biannual (spring + fall)", dfw: "Texas law requires working smoke detectors on every level", time: "10 min", cost: "$0 (test) / $20–$50 (replace)", priority: "high" },
  { item: "Water Heater Flush", icon: "💧", timing: "Annual", dfw: "DFW hard water causes mineral buildup; flush annually to extend life", time: "45 min", cost: "$0″, priority: "medium" },
  { item: "Exterior Drainage Check", icon: "🌧️", timing: "Before rainy season (April)", dfw: "Ensure grading slopes away from foundation — critical in clay soil areas", time: "20 min", cost: "$0″, priority: "high" },
];

const HOME_AGES = ["New (0–5 years)", "Mid-age (5–20 years)", "Mature (20–40 years)", "Older (40+ years)"];
const HOME_SIZES = ["Under 1,500 sqft", "1,500–2,500 sqft", "2,500–4,000 sqft", "4,000+ sqft"];

function getPriorityChecks(age: string, size: string) {
  let checks = [...CHECKS];
  if (age === "Older (40+ years)") checks = checks.map((c) => c.item === "Foundation Moisture Check" || c.item === "Roof Inspection" ? { ...c, priority: "critical" } : c);
  if (size === "4,000+ sqft") checks = checks.map((c) => c.item === "HVAC Filter Replacement" ? { ...c, dfw: c.dfw + " — larger homes may have 2–3 air handlers" } : c);
  return checks.sort((a, b) => (a.priority === "critical" ? -1 : b.priority === "critical" ? 1 : a.priority === "high" ? -1 : 1));
}

export default function DFWHomeHealthCheckGuide() {
  const [homeAge, setHomeAge] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const checks = homeAge && homeSize ? getPriorityChecks(homeAge, homeSize) : CHECKS;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#F5E642″, color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>🏡 Annual Home Health Check Guide</h1>
          <p style={{ color: "#9BAAC5″, fontSize: 16 }}>DFW homes face unique stress from clay soil, extreme summer heat, and severe hail storms. This guide keeps your home in top shape year-round.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "#111E35″, borderRadius: 8, padding: "1.25rem", border: "1px solid #F5E642" }}>
            <h3 style={{ color: "#F5E642″, marginBottom: "0.5rem" }}>🌸 April Checklist Focus</h3>
            <p style={{ color: "#9BAAC5″, fontSize: 14, lineHeight: 1.6 }}>After storm season peak. Inspect roof, check foundation drainage, service AC before summer, treat for pests.</p>
          </div>
          <div style={{ background: "#111E35″, borderRadius: 8, padding: "1.25rem", border: "1px solid #2A6A9E" }}>
            <h3 style={{ color: "#7EC8E3″, marginBottom: "0.5rem" }}>🍂 October Checklist Focus</h3>
            <p style={{ color: "#9BAAC5″, fontSize: 14, lineHeight: 1.6 }}>Before winter. Check attic insulation, seal gaps, test smoke detectors, inspect water heater.</p>
          </div>
        </div>

        <div style={{ background: "#111E35″, borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>🎯 Customize Your Checklist</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <select value={homeAge} onChange={(e) => setHomeAge(e.target.value)} style={{ background: "#0A1628″, color: "#E8EDF5", border: "1px solid #2A4A7F", borderRadius: 6, padding: "0.5rem 1rem", fontSize: 14, flex: 1, minWidth: 180 }}>
              <option value="">Home Age</option>
              {HOME_AGES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={homeSize} onChange={(e) => setHomeSize(e.target.value)} style={{ background: "#0A1628″, color: "#E8EDF5", border: "1px solid #2A4A7F", borderRadius: 6, padding: "0.5rem 1rem", fontSize: 14, flex: 1, minWidth: 180 }}>
              <option value="">Home Size</option>
              {HOME_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={() => setShowChecklist(true)} disabled={!homeAge || !homeSize} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 6, padding: "0.5rem 1.5rem", fontWeight: 700, fontSize: 14, cursor: homeAge && homeSize ? "pointer" : "not-allowed", opacity: homeAge && homeSize ? 1 : 0.5 }}>Prioritize My Checks</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {(showChecklist ? checks : CHECKS).map((c) => (
            <div key={c.item} onClick={() => setExpanded(expanded === c.item ? null : c.item)} style={{ background: "#111E35″, borderRadius: 8, padding: "1rem 1.25rem", border: `1px solid ${c.priority === "critical" ? "#F5A623" : c.priority === "high" ? "#2E86AB" : "#1E3A5F"}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{c.item}</div>
                    <div style={{ color: "#9BAAC5″, fontSize: 13 }}>{c.timing}</div>
                  </div>
                </div>
                <span style={{ color: "#F5E642″, fontSize: 12 }}>{expanded === c.item ? "▲" : "▼"}</span>
              </div>
              {expanded === c.item && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #1E3A5F" }}>
                  <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: "0.5rem" }}>🌡️ DFW Specific: {c.dfw}</div>
                  <div style={{ display: "flex", gap: "2rem" }}>
                    <span style={{ color: "#9BAAC5″, fontSize: 13 }}>⏱ Time: <strong style={{ color: "#E8EDF5" }}>{c.time}</strong></span>
                    <span style={{ color: "#9BAAC5″, fontSize: 13 }}>💵 Cost: <strong style={{ color: "#E8EDF5" }}>{c.cost}</strong></span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

