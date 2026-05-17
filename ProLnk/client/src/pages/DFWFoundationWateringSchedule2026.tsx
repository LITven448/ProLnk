import { useState } from 'react';

const months = [
  { month: "January", freq: "1x/week if no rain", duration: "10-15 min/zone", icon: "❄️", note: "Soil dormant but can crack if completely dry. Skip if ground is frozen.", urgency: "low" },
  { month: "February", freq: "1x/week", duration: "10-15 min/zone", icon: "🌥️", note: "Watch for late winter dry spells. DFW can have warm dry stretches in February.", urgency: "low" },
  { month: "March", freq: "2x/week", duration: "15-20 min/zone", icon: "🌱", note: "Clay begins to expand with spring moisture. Establish consistent watering now.", urgency: "medium" },
  { month: "April", freq: "2-3x/week", duration: "20 min/zone", icon: "🌸", note: "Rain is variable — supplement when no significant rain for 4+ days.", urgency: "medium" },
  { month: "May", freq: "3-4x/week", duration: "20-25 min/zone", icon: "☀️", note: "Heat rising. Monitor soil 6 inches from foundation — should feel slightly moist.", urgency: "high" },
  { month: "June", freq: "4-5x/week", duration: "25-30 min/zone", icon: "🌡️", note: "DFW drought risk peaks. Clay shrinkage danger high. Do not miss watering days.", urgency: "critical" },
  { month: "July", freq: "Daily if drought", duration: "30 min/zone", icon: "🔥", note: "Hottest month. Drought index most critical. Foundation movement most active.", urgency: "critical" },
  { month: "August", freq: "Daily or near-daily", duration: "30 min/zone", icon: "🌵", note: "Sustained heat. Use soaker hoses or drip 6-18 inches from foundation edge.", urgency: "critical" },
  { month: "September", freq: "3-4x/week", duration: "25 min/zone", icon: "🍂", note: "Temperatures drop but soil is still depleted. Taper gradually, not abruptly.", urgency: "high" },
  { month: "October", freq: "2x/week", duration: "20 min/zone", icon: "🍁", note: "Fall rains returning. Supplement only during dry stretches.", urgency: "medium" },
  { month: "November", freq: "1x/week", duration: "15 min/zone", icon: "🌨️", note: "Growth slowing. Maintain moisture to prevent winter clay contraction cracks.", urgency: "low" },
  { month: "December", freq: "1x/week if dry", duration: "10-15 min/zone", icon: "❄️", note: "Skip before freezes. Resume once temps rise above 35°F for the day.", urgency: "low" },
];

const urgencyColor: Record<string, string> = { low: "#22c55e", medium: "#f59e0b", high: "#f97316", critical: "#ef4444" };

export default function DFWFoundationWateringSchedule2026() {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const m = months[selectedMonth];
  const uc = urgencyColor[m.urgency];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>🏠 DFW Foundation Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Watering Schedule by Month</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>DFW expansive clay shrinks when dry and swells when wet. Consistent moisture around your foundation prevents 70% of preventable foundation damage. Calibrated for DFW climate.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>📅 Select Month</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
          {months.map((mo, i) => (
            <button key={i} onClick={() => setSelectedMonth(i)}
              style={{ background: selectedMonth === i ? "#F5E642" : "#0f1f3a", color: selectedMonth === i ? "#0A1628" : "#fff",
                border: `2px solid ${selectedMonth === i ? "#F5E642" : urgencyColor[mo.urgency]}`,
                borderRadius: 8, padding: "8px 4px", cursor: "pointer", fontSize: 11, fontWeight: 700, textAlign: "center" }}>
              {mo.icon}<br />{mo.month.slice(0,3)}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 14, padding: 24, marginBottom: 32, borderLeft: `5px solid ${uc}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 32 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{m.month}</div>
            </div>
            <span style={{ background: uc, color: "#0A1628", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 800, textTransform: "uppercase" }}>{m.urgency} priority</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Frequency</div>
              <div style={{ fontWeight: 700, color: "#F5E642" }}>{m.freq}</div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Duration</div>
              <div style={{ fontWeight: 700, color: "#F5E642" }}>{m.duration}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.7 }}>{m.note}</div>
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>💡 DFW Pro Tips</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8", fontSize: 14, lineHeight: 1.9 }}>
            <li>Place soaker hose 6–18 inches from foundation edge, not against it</li>
            <li>Water at dawn to minimize evaporation in DFW summer heat</li>
            <li>Soil probe test: insert screwdriver 6 inches — should meet moderate resistance</li>
            <li>Automatic drip systems on timer outperform manual watering for consistency</li>
            <li>During NTMWD restrictions, prioritize foundation zones over lawn</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified foundation pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
