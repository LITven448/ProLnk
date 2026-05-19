import { useState } from 'react';

const systems = [
  { name: "HVAC", icon: "❄️", low: 15, high: 20, note: "DFW heat cycles reduce life" },
  { name: "Water Heater (Tank)", icon: "🚿", low: 8, high: 12, note: "Hard water accelerates corrosion" },
  { name: "Water Heater (Tankless)", icon: "💧", low: 15, high: 20, note: "Descaling needed annually in DFW" },
  { name: "Roof (3-Tab)", icon: "🏠", low: 15, high: 20, note: "DFW hail shortens lifespan" },
  { name: "Roof (Architectural)", icon: "🏠", low: 25, high: 30, note: "Best value for DFW climate" },
  { name: "Roof (Metal)", icon: "🏗️", low: 40, high: 50, note: "Optimal for DFW hail zones" },
  { name: "Foundation", icon: "🪨", low: 50, high: 100, note: "Requires consistent moisture maintenance" },
  { name: "Windows", icon: "🪟", low: 20, high: 25, note: "UV seal failure common in DFW" },
  { name: "Plumbing (Copper)", icon: "🔧", low: 50, high: 70, note: "Hard water can pit copper" },
  { name: "Plumbing (PVC)", icon: "🔩", low: 25, high: 40, note: "UV exposure degrades exposed lines" },
];

export default function DFWHomeSystemLifespanGuide2026() {
  const [homeAge, setHomeAge] = useState(15);

  const getStatus = (low: number, high: number) => {
    if (homeAge >= high) return { label: "Replace Soon", color: "#ef4444″ };
    if (homeAge >= low * 0.75) return { label: "Monitor Closely", color: "#f97316″ };
    if (homeAge >= low * 0.5) return { label: "Mid-Life", color: "#F5E642″ };
    return { label: "Good Shape", color: "#22c55e" };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>DFW Home System Lifespan Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Know what to expect from every major system in your DFW home</p>
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: 24, marginBottom: 28, border: "1px solid #1e3a5f" }}>
          <label style={{ display: "block", color: "#F5E642″, fontWeight: 600, marginBottom: 12 }}>
            🗓️ My Home Age: <span style={{ color: "#fff" }}>{homeAge} years</span>
          </label>
          <input type="range" min={1} max={60} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#F5E642″ }} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 12, marginTop: 4 }}>
            <span>1 yr</span><span>30 yrs</span><span>60 yrs</span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {systems.map(s => {
            const status = getStatus(s.low, s.high);
            return (
              <div key={s.name} style={{ background: "#111d35″, borderRadius: 10, padding: "16px 20px", border: `1px solid ${status.color}33`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{s.icon} {s.name}</div>
                  <div style={{ color: "#64748b", fontSize: 13, marginTop: 2 }}>{s.note}</div>
                  <div style={{ color: "#94a3b8″, fontSize: 13, marginTop: 2 }}>Expected life: {s.low}–{s.high} yrs in DFW</div>
                </div>
                <div style={{ background: status.color + "22″, border: `1px solid ${status.color}`, borderRadius: 8, padding: "6px 14px", color: status.color, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>
                  {status.label}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, background: "#111d35″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>📋 DFW Climate Factors</div>
          <ul style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Extreme heat (100°F+) stresses HVAC compressors and roof shingles</li>
            <li>Hard water (300–500 ppm) corrodes water heaters and plumbing faster</li>
            <li>Hail season (March–May) impacts roofs regardless of age</li>
            <li>Clay soil expansion/contraction is the #1 foundation threat in DFW</li>
            <li>UV intensity fades window seals and degrades exposed PVC faster</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
