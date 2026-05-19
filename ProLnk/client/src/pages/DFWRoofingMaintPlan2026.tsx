import { useState } from 'react';

const tasks = [
  { season: "Spring", months: "March–May", icon: "🌸", items: ["Post-hail inspection after every storm", "Check flashing around chimney and vents", "Clear winter debris from valleys and gutters", "Inspect attic for moisture damage from ice events", "Trim overhanging tree branches before summer storms"] },
  { season: "Fall", months: "September–November", icon: "🍂", items: ["Pre-winter inspection for missing or curled shingles", "Clean gutters of summer debris before leaf fall", "Check gutter hangers and downspout extensions", "Inspect ridge cap condition before freeze-thaw cycles", "Remove any moss or algae growth"] },
  { season: "After Major Storm", months: "Any time", icon: "⛈️", items: ["Check for hail dents on metal vents and flashing", "Walk perimeter for granule accumulation in gutters", "Inspect skylight seals for impact damage", "Check attic for daylight or water staining", "Document and photograph any damage for insurance"] },
];

const ageSchedule = [
  { range: "0-5 years", frequency: "Annual inspection + after major storms", urgency: "low" },
  { range: "6-10 years", frequency: "Biannual + after every hail event", urgency: "medium" },
  { range: "11-15 years", frequency: "Quarterly check + annual professional inspection", urgency: "medium" },
  { range: "16-20 years", frequency: "Biannual professional + monthly visual", urgency: "high" },
  { range: "20+ years", frequency: "Immediate professional assessment recommended", urgency: "critical" },
];

export default function DFWRoofingMaintPlan2026() {
  const [activeTask, setActiveTask] = useState<number | null>(0);
  const [roofAge, setRoofAge] = useState(10);

  const getSchedule = (age: number) => {
    if (age <= 5) return ageSchedule[0];
    if (age <= 10) return ageSchedule[1];
    if (age <= 15) return ageSchedule[2];
    if (age <= 20) return ageSchedule[3];
    return ageSchedule[4];
  };

  const schedule = getSchedule(roofAge);
  const urgencyColor: Record<string, string> = { low: "#22c55e", medium: "#f59e0b", high: "#f97316″, critical: "#ef4444" };
  const uc = urgencyColor[schedule.urgency];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>🏠 DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Annual Roof Maintenance Plan for DFW</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>DFW roofs face hail (spring), UV degradation (summer), debris (fall), and freeze-thaw (winter). A proactive maintenance plan extends roof life 5–10 years.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📅 Seasonal Maintenance Tasks</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          {tasks.map((t, i) => (
            <button key={i} onClick={() => setActiveTask(activeTask === i ? null : i)}
              style={{ background: activeTask === i ? "#F5E642″ : "#0f1f3a", color: activeTask === i ? "#0A1628" : "#fff",
                border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
              {t.icon} {t.season}
            </button>
          ))}
        </div>
        {activeTask !== null && (
          <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{tasks[activeTask].season} Tasks ({tasks[activeTask].months})</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8″, fontSize: 14, lineHeight: 1.9 }}>
              {tasks[activeTask].items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          </div>
        )}

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🏚️ Roof Age — Maintenance Schedule</h2>
        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <label style={{ fontSize: 14, color: "#94a3b8″ }}>Roof Age: <strong style={{ color: "#fff" }}>{roofAge} years</strong></label>
          <input type="range" min={1} max={30} value={roofAge} onChange={e => setRoofAge(Number(e.target.value))}
            style={{ width: "100%", margin: "12px 0″, accentColor: "#F5E642" }} />
          <div style={{ padding: "14px 18px", borderRadius: 8, borderLeft: `4px solid ${uc}` }}>
            <div style={{ color: uc, fontWeight: 700, fontSize: 15, textTransform: "uppercase", marginBottom: 4 }}>{schedule.urgency} urgency</div>
            <div style={{ color: "#cbd5e1″, fontSize: 14 }}>{schedule.frequency}</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📏 DFW Tree Clearance Rule</h2>
        <div style={{ background: "#0f1f3a", borderRadius: 10, padding: 18, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: "#cbd5e1″, lineHeight: 1.8 }}>
            🌳 Minimum <strong style={{ color: "#F5E642″ }}>6 feet clearance</strong> from any branch to roof surface<br />
            🌳 Overhanging branches accelerate shingle wear and provide pest access<br />
            🌳 After DFW storms, check for fallen limbs on valley areas immediately<br />
            🌳 Oak and pecan trees common in DFW — trim biannually minimum
          </div>
        </div>

        <div style={{ padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified roofing pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
