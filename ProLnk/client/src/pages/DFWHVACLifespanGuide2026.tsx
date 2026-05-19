import { useState } from 'react';

const maintenanceTasks = [
  { task: "Replace air filter", freq: "Every 1–3 months", impact: "⭐⭐⭐⭐⭐", icon: "🌬️" },
  { task: "Annual professional tune-up", freq: "Once per year", impact: "⭐⭐⭐⭐⭐", icon: "🔧" },
  { task: "Clear condensate drain line", freq: "Every 6 months", impact: "⭐⭐⭐⭐", icon: "💧" },
  { task: "Clean evaporator & condenser coils", freq: "Annually", impact: "⭐⭐⭐⭐", icon: "🧹" },
  { task: "Inspect refrigerant levels", freq: "Annually", impact: "⭐⭐⭐", icon: "🧪" },
  { task: "Shade outdoor unit if possible", freq: "One-time install", impact: "⭐⭐⭐", icon: "🌳" },
  { task: "Check ductwork for leaks", freq: "Every 3–5 years", impact: "⭐⭐⭐", icon: "📐" },
];

export default function DFWHVACLifespanGuide2026() {
  const [hvacAge, setHvacAge] = useState(8);
  const [maintained, setMaintained] = useState<string>("good");

  const getLifeEstimate = () => {
    const base = maintained === "good" ? 22 : maintained === "average" ? 16 : 12;
    const remaining = base - hvacAge;
    return { base, remaining: Math.max(0, remaining) };
  };

  const { base, remaining } = getLifeEstimate();

  const getStatus = () => {
    if (remaining <= 0) return { label: "End of Life — Replace Now", color: "#ef4444" };
    if (remaining <= 3) return { label: "Nearing End of Life", color: "#f97316" };
    if (remaining <= 6) return { label: "Watch Closely", color: "#F5E642" };
    return { label: "Good Remaining Life", color: "#22c55e" };
  };

  const status = getStatus();

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW HVAC Lifespan Maximizer 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Proper maintenance can add 5–8 years to your DFW HVAC system</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>🗓️ HVAC Age: {hvacAge} years</label>
            <input type="range" min={1} max={25} value={hvacAge} onChange={e => setHvacAge(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 10 }}>🔧 Maintenance History</label>
            <select value={maintained} onChange={e => setMaintained(e.target.value)}
              style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px 12px", fontSize: 14 }}>
              <option value="good">✅ Annual tune-ups + filter changes</option>
              <option value="average">⚠️ Occasional maintenance only</option>
              <option value="poor">❌ Little to no maintenance</option>
            </select>
          </div>
        </div>

        <div style={{ background: status.color + "15", border: `2px solid ${status.color}`, borderRadius: 14, padding: 24, textAlign: "center", marginBottom: 24 }}>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 4 }}>Estimated Total Lifespan with Your Maintenance</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: status.color }}>{base} years</div>
          <div style={{ color: "#e2e8f0", marginTop: 6 }}>{remaining > 0 ? `~${remaining} years remaining` : "Replace now"} — {status.label}</div>
        </div>

        <div style={{ background: "#111d35", borderRadius: 12, border: "1px solid #1e3a5f", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e3a5f" }}>
            <span style={{ color: "#F5E642", fontWeight: 700 }}>🛠️ DFW HVAC Maintenance Checklist</span>
          </div>
          {maintenanceTasks.map((t, i) => (
            <div key={i} style={{ padding: "14px 20px", borderBottom: i < maintenanceTasks.length - 1 ? "1px solid #0A1628" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{t.icon} {t.task}</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>{t.freq}</div>
              </div>
              <div style={{ color: "#F5E642" }}>{t.impact}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, background: "#111d35", borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: 8 }}>🌡️ DFW-Specific HVAC Facts</div>
          <ul style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>DFW HVAC runs 2,500–3,500 hrs/year vs national avg of 1,800 hrs</li>
            <li>Dirty filters are the #1 cause of early compressor failure in DFW</li>
            <li>Properly maintained DFW systems last 20–22 years vs avg 12–15</li>
            <li>Schedule tune-ups in March (before summer) and October (before winter)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
