import { useState } from 'react';

const hailCalendar = [
  { month: "January", risk: "Very Low", events: "0-1″, size: "Pea or less", icon: "❄️", color: "#64748b", detail: "Cold fronts are rare. If hail occurs, typically small and brief. Inspect only after severe storms." },
  { month: "February", risk: "Very Low", events: "0-1″, size: "Pea", icon: "🌥️", color: "#64748b", detail: "Season not yet active. Winter storms can produce sleet but rarely damaging hail." },
  { month: "March", risk: "Moderate", events: "2-3″, size: "Pea to Marble", icon: "⛅", color: "#f59e0b", detail: "Season begins. Warm air from Gulf clashes with cold fronts. Schedule a pre-season roof inspection." },
  { month: "April", risk: "High", events: "4-6″, size: "Marble to Quarter", icon: "⛈️", color: "#ef4444", detail: "Peak DFW hail month. Most insurance claims filed in April. Inspect after every storm. Quarter-size (1 inch) causes significant shingle damage." },
  { month: "May", risk: "High", events: "3-5″, size: "Marble to Golf Ball", icon: "🌩️", color: "#ef4444", detail: "Still very active. Golf ball-size events (1.75 inch) cause immediate structural damage. File claims promptly within TX policy deadline." },
  { month: "June", risk: "Moderate", events: "2-3″, size: "Marble to Quarter", icon: "☀️", color: "#f59e0b", detail: "Frequency drops but large hail possible with supercell storms. Evening storms more common." },
  { month: "July", risk: "Low-Moderate", events: "1-2″, size: "Pea to Marble", icon: "🌤️", color: "#f59e0b", detail: "Extreme heat suppresses some storm activity but isolated large hail possible on high-CAPE days." },
  { month: "August", risk: "Low", events: "1″, size: "Pea", icon: "☀️", color: "#22c55e", detail: "Typically hottest and driest month. Low severe weather frequency. Good month for deferred repairs." },
  { month: "September", risk: "Low-Moderate", events: "1-2″, size: "Pea to Marble", icon: "🍂", color: "#f59e0b", detail: "Gulf hurricane season can drive storm activity into DFW. Watch tropical systems for embedded hail." },
  { month: "October", risk: "Low", events: "1″, size: "Pea", icon: "🍁", color: "#22c55e", detail: "Season winding down. Fall cold fronts produce occasional hail. Good month for pre-winter inspection." },
  { month: "November", risk: "Very Low", events: "0-1″, size: "Pea or less", icon: "🌧️", color: "#64748b", detail: "Rare hail events. Focus on gutter cleaning and debris removal before winter." },
  { month: "December", risk: "Very Low", events: "0″, size: "Rare", icon: "❄️", color: "#64748b", detail: "Essentially no hail risk. Winter focus: flashing inspection, attic insulation, gutter freeze protection." },
];

export default function DFWRoofingHailSeasonCalendar2026() {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);

  const m = hailCalendar[selectedMonth];

  const getReadiness = (idx: number) => {
    if (idx >= 2 && idx <= 5) return { label: "Active Season — Inspect After Every Storm", color: "#ef4444″ };
    if (idx === 6 || idx === 8) return { label: "Moderate Risk — Monthly Visual Check", color: "#f59e0b" };
    return { label: "Low Season — Annual Inspection Sufficient", color: "#22c55e" };
  };

  const r = getReadiness(selectedMonth);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>🏠 DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Hail Season Calendar 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>DFW is in Hail Alley — one of the most hail-active regions in the country. April and May are peak months. Knowing the calendar helps you time inspections, insurance renewals, and repairs.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>📅 Select Month — See Hail Risk</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
          {hailCalendar.map((mo, i) => (
            <button key={i} onClick={() => setSelectedMonth(i)}
              style={{ background: selectedMonth === i ? "#F5E642″ : "#0f1f3a", color: selectedMonth === i ? "#0A1628" : "#fff",
                border: `2px solid ${selectedMonth === i ? "#F5E642" : mo.color}`,
                borderRadius: 8, padding: "8px 4px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
              {mo.icon}<br />{mo.month.slice(0,3)}
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 14, padding: 24, marginBottom: 24, borderLeft: `5px solid ${m.color}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 32 }}>{m.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{m.month}</div>
            </div>
            <span style={{ background: m.color, color: "#0A1628″, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 800 }}>{m.risk}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Avg Events/Month</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 18 }}>{m.events}</div>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", marginBottom: 4 }}>Typical Hail Size</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 18 }}>{m.size}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#cbd5e1″, lineHeight: 1.7, marginBottom: 16 }}>{m.detail}</div>
          <div style={{ padding: "10px 14px", borderRadius: 8, background: "#0A1628″, borderLeft: `3px solid ${r.color}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.label}</div>
          </div>
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 10 }}>🛡️ DFW Hail Readiness Checklist</div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "#94a3b8″, fontSize: 14, lineHeight: 1.9 }}>
            <li>Know your TX homeowners insurance hail claim deadline (1 year from event)</li>
            <li>Quarter-size (1 inch) hail or larger: always get a professional inspection</li>
            <li>Document hail dates and storm reports from NWS for claim support</li>
            <li>Inspect AC condenser fins and gutters — visible damage supports roof claims</li>
            <li>File claim before repair — insurance needs to inspect original damage</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified roofing pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
