import { useState } from 'react';

const seasons = [
  { label: "Spring (Mar-May)", humidity: "35-55%", effectiveness: "Moderate", icon: "🌸", note: "Works okay on cool mornings, struggles by afternoon" },
  { label: "Summer (Jun-Aug)", humidity: "60-80%", effectiveness: "Poor", icon: "☀️", note: "Too humid — swamp cooler adds moisture, not cooling" },
  { label: "Fall (Sep-Nov)", humidity: "35-50%", effectiveness: "Moderate", icon: "🍂", note: "Best performance window, use on low-humidity days" },
  { label: "Winter (Dec-Feb)", humidity: "30-45%", effectiveness: "N/A", icon: "❄️", note: "No cooling needed; store unit properly" },
];

const alternatives = [
  { name: "Central AC (Refrigerant)", icon: "🌬️", why: "Removes heat AND moisture — ideal for DFW humidity" },
  { name: "Mini-Split Systems", icon: "🏠", why: "Zone control, high efficiency, works in any humidity" },
  { name: "Whole-House Fan", icon: "💨", why: "Ventilation in evenings when outside air is cooler" },
  { name: "Ceiling Fans + AC", icon: "🔄", why: "Extends AC comfort without full swamp cooler failure" },
];

export default function DFWHVACEvapCoolerGuide2026() {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [humidity, setHumidity] = useState(60);

  const getEffectiveness = (h: number) => {
    if (h < 40) return { label: "Good", color: "#22c55e" };
    if (h < 55) return { label: "Marginal", color: "#f59e0b" };
    return { label: "Ineffective", color: "#ef4444" };
  };

  const eff = getEffectiveness(humidity);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>💧 DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Evaporative Cooler Effectiveness in DFW</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Swamp coolers rely on low humidity. DFW summers average 60–80% — making them largely ineffective June through August.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>🌡️ Humidity → Effectiveness Calculator</h2>
        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <label style={{ fontSize: 14, color: "#94a3b8" }}>Current Humidity: <strong style={{ color: "#fff" }}>{humidity}%</strong></label>
          <input type="range" min={20} max={90} value={humidity} onChange={e => setHumidity(Number(e.target.value))}
            style={{ width: "100%", margin: "12px 0", accentColor: "#F5E642" }} />
          <div style={{ padding: "12px 16px", borderRadius: 8, background: "#1e3a5f", borderLeft: `4px solid ${eff.color}` }}>
            <span style={{ color: eff.color, fontWeight: 700, fontSize: 18 }}>{eff.label}</span>
            <span style={{ color: "#94a3b8", marginLeft: 12, fontSize: 14 }}>
              {humidity < 40 ? "Evaporative cooling works well — dry enough to evaporate effectively." :
               humidity < 55 ? "Marginal performance — some cooling but comfort is limited." :
               "Evap cooler adds humidity without meaningful cooling. Use refrigerant AC."}
            </span>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>📅 DFW Season Performance</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {seasons.map((s, i) => (
            <div key={i} onClick={() => setSelectedSeason(selectedSeason === i ? null : i)}
              style={{ background: selectedSeason === i ? "#1e3a5f" : "#0f1f3a", borderRadius: 10, padding: 16, cursor: "pointer",
                border: `1px solid ${selectedSeason === i ? "#F5E642" : "#1e3a5f"}` }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Humidity: {s.humidity}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.effectiveness === "Poor" ? "#ef4444" : s.effectiveness === "Moderate" ? "#f59e0b" : "#94a3b8", marginTop: 4 }}>{s.effectiveness}</div>
              {selectedSeason === i && <div style={{ marginTop: 8, fontSize: 13, color: "#cbd5e1" }}>{s.note}</div>}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>✅ Better Alternatives for DFW</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {alternatives.map((a, i) => (
            <div key={i} style={{ background: "#0f1f3a", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24 }}>{a.icon}</span>
              <div><div style={{ fontWeight: 700 }}>{a.name}</div><div style={{ fontSize: 13, color: "#94a3b8" }}>{a.why}</div></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified HVAC pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
