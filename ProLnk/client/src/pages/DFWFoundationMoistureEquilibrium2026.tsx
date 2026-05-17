import { useState } from 'react';

const situations = [
  { id: "post-drought", label: "After Extended DFW Drought", icon: "🏜️", timeline: "3–6 months", steps: ["Start slow: 15 min per zone every 3 days for first 2 weeks", "Increase to every-other-day watering in weeks 3-4", "Check soil probe at 6 inches weekly — look for damp clay feel", "Add mulch 2-3 inches around foundation perimeter to slow evaporation", "Reach target moisture by month 2, maintain through month 6", "Continue monitoring after first significant rain — avoid overwatering"], warning: "Never flood dry DFW clay rapidly. Sudden rehydration causes differential heave — one corner lifts while another stays low." },
  { id: "post-rain", label: "After Heavy DFW Rain Event", icon: "🌧️", timeline: "1–3 weeks", steps: ["Halt all irrigation for 7-10 days after 1+ inch rain event", "Inspect drainage: water should drain 5+ feet from foundation", "Check gutters and downspouts — direct water away from perimeter", "After 10 days, test soil moisture at 6 inches before resuming watering", "Resume at reduced frequency: 1x per week initially", "Return to maintenance schedule once moisture stabilizes"], warning: "DFW clay drains slowly. Surface looks dry while 6 inches down is still saturated. Test before watering." },
  { id: "established", label: "Established DFW Home (Maintenance)", icon: "🏡", timeline: "Ongoing", steps: ["Spring: 2x per week, 15-20 min per zone as temps rise past 80 degrees", "Summer: 3x per week during 100 degree+ streaks, 20-25 min per zone", "Fall: Reduce to 1-2x per week as temps drop below 85 degrees", "Winter: Water every 2 weeks during dry spells (DFW freezes are brief)", "Check soil probe monthly — adjust for DFW weather patterns", "Install rain sensor to skip watering after rain events"], warning: "DFW homeowners most often neglect fall and winter watering. Dry clay in winter plus spring rains equals differential movement." },
  { id: "new-construction", label: "New DFW Construction (First Year)", icon: "🏗️", timeline: "12 months", steps: ["Month 1-2: Water daily, 10-15 min per zone — establish initial moisture", "Month 3-4: Transition to 3x per week as soil settles", "Month 5-6: Test soil probe weekly — aim for 65-75% field capacity", "Month 7-12: Match established home schedule with monitoring", "Year 1 is critical: new fill soil around foundation has not equilibrated", "Install permanent soaker hose at foundation perimeter — most reliable method"], warning: "Builders often leave expansive fill soil around foundation. First year equilibration sets the moisture baseline your slab will remember." },
  { id: "cracked-slab", label: "Foundation Movement Already Occurring", icon: "⚠️", timeline: "Consult engineer", steps: ["Stop any sudden irrigation changes immediately", "Get foundation engineer inspection before modifying watering", "Implement engineer-recommended moisture program", "Add perimeter soaker hose system for consistent delivery", "Monitor interior doors and windows for changes every 2 weeks", "Document with photos — needed for insurance or warranty claims"], warning: "If foundation movement is active, changes in moisture can make movement worse. Get professional assessment first." },
];

export default function DFWFoundationMoistureEquilibrium2026() {
  const [situation, setSituation] = useState<string>("");
  const guide = situations.find(s => s.id === situation);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>⚖️</div>
          <h1 style={{ color: "#F5E642", fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW Foundation Moisture Equilibrium 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Achieving Consistent Moisture in DFW Expansive Clay — The Real Goal</p>
        </div>
        <div style={{ background: "#F5E64222", border: "1px solid #F5E64244", borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🎯 What Equilibrium Means</div>
          <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>The goal is not wet soil or dry soil — it is consistent soil. DFW clay expands when wet and contracts when dry. Sudden changes cause differential movement — one corner of your slab moves while another does not.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
          {[["Wet to Dry Swing","Foundation drops — beam sag, sticking doors"],["Dry to Wet Swing","Foundation lifts — cracked drywall, gaps at ceiling"],["Consistent Moisture","No movement — no cracking, no sticking"]].map(([label, effect], i) => (
            <div key={label} style={{ background: "#1e2d45", borderRadius: 8, padding: "12px", border: `1px solid ${i === 2 ? "#86efac" : "#7f1d1d"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: i === 2 ? "#86efac" : "#fca5a5", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{effect}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 8 }}>My current foundation moisture situation:</label>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#1e2d45", color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 14 }}>
            <option value="">— Select your situation —</option>
            {situations.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        {guide && (
          <div style={{ background: "#1e2d45", border: "1px solid #F5E642", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 28 }}>{guide.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F5E642" }}>{guide.label}</div>
              </div>
              <div style={{ fontSize: 11, background: "#0A1628", color: "#F5E642", padding: "4px 10px", borderRadius: 999 }}>Timeline: {guide.timeline}</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: "#F5E642", fontWeight: 700, minWidth: 20 }}>{i + 1}.</div>
                  <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.5 }}>{step}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#7f1d1d33", border: "1px solid #7f1d1d", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 12, color: "#fca5a5", lineHeight: 1.5 }}>Warning: {guide.warning}</div>
            </div>
          </div>
        )}
        <div style={{ marginTop: 24, fontSize: 11, color: "#475569", textAlign: "center" }}>DFW clay soils move 1-3 inches vertically with moisture swings — consistency protects your slab • ProLnk 2026</div>
      </div>
    </div>
  );
}
