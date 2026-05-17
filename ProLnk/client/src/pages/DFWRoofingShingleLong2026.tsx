import { useState } from 'react';

const tips = [
  { id: "ventilation", emoji: "🌬️", title: "Attic Ventilation", impact: "HIGH", detail: "DFW attics hit 130°F+ in summer. Without proper ridge + soffit vents, trapped heat cooks shingles from below, cutting 10+ years off lifespan. Aim for 1 sq ft vent per 150 sq ft of attic floor." },
  { id: "gutters", emoji: "🍂", title: "Clean Gutters Twice Yearly", impact: "HIGH", detail: "Clogged DFW gutters cause water backup under shingles (ice damming in rare freeze events + rot in heavy spring rains). Clean March and October — before spring storms and after fall leaf drop." },
  { id: "trees", emoji: "🌳", title: "Trim Overhanging Branches", impact: "MEDIUM", detail: "Tree debris + constant shade creates algae growth on DFW roofs. Algae appears as black streaks and holds moisture against shingles. Trim branches to 6-10 ft clearance above roof line." },
  { id: "boots", emoji: "🔩", title: "Replace Pipe Boots Early", impact: "HIGH", detail: "Rubber pipe boots (around plumbing vents) crack in DFW UV and heat cycles by year 7-10. A $50 proactive replacement prevents $5,000+ interior water damage. Inspect every 5 years." },
  { id: "algae", emoji: "🦠", title: "Algae-Resistant Shingles", impact: "MEDIUM", detail: "When replacing DFW shingles, specify Algae-Resistant (AR) shingles with copper granules. DFW humidity + heat breeds roof algae. AR shingles add 3-5 years in humid DFW conditions." },
];

const ageGuide = [
  { range: "0-7 yrs", status: "🟢 Optimal", action: "Focus on ventilation + gutter maintenance" },
  { range: "8-15 yrs", status: "🟡 Monitor", action: "Inspect annually, replace pipe boots, treat algae" },
  { range: "16-22 yrs", status: "🟠 Plan Ahead", action: "Budget for replacement, document condition for insurance" },
  { range: "23+ yrs", status: "🔴 Replace Soon", action: "Get ProLnk roofing assessment — extend or replace" },
];

export default function DFWRoofingShingleLong2026() {
  const [active, setActive] = useState("");
  const [age, setAge] = useState("");

  const ageRec = ageGuide.find(g => g.range === age);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Shingle Longevity Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>Extend DFW shingle life 5-10 years with targeted maintenance — extreme heat demands proactive care</p>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 12 }}>📅 How old are your shingles?</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ageGuide.map(g => (
              <button key={g.range} onClick={() => setAge(g.range)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "2px solid", borderColor: age === g.range ? "#F5E642" : "#334155", background: age === g.range ? "#F5E64220" : "transparent", color: age === g.range ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 13 }}>
                {g.range}
              </button>
            ))}
          </div>
          {ageRec && (
            <div style={{ marginTop: 12, padding: 12, background: "#0A1628", borderRadius: 8 }}>
              <div style={{ fontSize: 14, marginBottom: 4 }}>{ageRec.status}</div>
              <div style={{ color: "#4ADE80", fontSize: 14 }}>→ {ageRec.action}</div>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {tips.map(t => (
            <div key={t.id} onClick={() => setActive(active === t.id ? "" : t.id)}
              style={{ background: "#1E2D45", borderRadius: 12, padding: 16, cursor: "pointer", borderLeft: `4px solid ${t.impact === "HIGH" ? "#F5E642" : "#4ADE80"}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{t.emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{t.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#0A1628", color: t.impact === "HIGH" ? "#F5E642" : "#4ADE80" }}>{t.impact}</span>
                  <span style={{ color: "#64748B" }}>{active === t.id ? "▲" : "▼"}</span>
                </div>
              </div>
              {active === t.id && <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>{t.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 18, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk Roofing Longevity Inspections</p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Charter pros provide DFW-specific longevity assessments — attic ventilation checks, pipe boot inspection, and algae analysis included.</p>
        </div>
      </div>
    </div>
  );
}