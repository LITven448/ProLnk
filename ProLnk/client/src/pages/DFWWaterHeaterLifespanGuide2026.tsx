import { useState } from 'react';

const maintenanceItems = [
  { task: "Annual tank flush", benefit: "+1–2 years life", icon: "🚿", impact: "high" },
  { task: "Anode rod replacement (every 3–5 yrs)", benefit: "+3–5 years life", icon: "🔩", impact: "high" },
  { task: "Install water softener", benefit: "+2–4 years life", icon: "💧", impact: "high" },
  { task: "Insulate hot water pipes", benefit: "Reduces strain, improves efficiency", icon: "🧱", impact: "medium" },
  { task: "Set temp to 120°F", benefit: "Reduces mineral buildup", icon: "🌡️", impact: "medium" },
];

const failureSigns = [
  { sign: "Rusty or discolored hot water", urgency: "Replace within 30 days", color: "#ef4444" },
  { sign: "Popping or rumbling sounds", urgency: "Sediment buildup — flush immediately", color: "#f97316" },
  { sign: "Water not getting hot enough", urgency: "Thermostat or element failing", color: "#f97316" },
  { sign: "Visible tank rust or corrosion", urgency: "Replace immediately", color: "#ef4444" },
  { sign: "Water pooling around base", urgency: "Tank failure — replace now", color: "#ef4444" },
  { sign: "Age over 10 years (DFW)", urgency: "Start budgeting for replacement", color: "#F5E642" },
];

export default function DFWWaterHeaterLifespanGuide2026() {
  const [age, setAge] = useState(7);
  const [type, setType] = useState("tank");
  const [maintained, setMaintained] = useState("good");

  const getExpectancy = () => {
    if (type === "tankless") return maintained === "good" ? 20 : maintained === "average" ? 17 : 13;
    return maintained === "good" ? 11 : maintained === "average" ? 8 : 6;
  };

  const maxLife = getExpectancy();
  const remaining = Math.max(0, maxLife - age);
  const pct = Math.min(100, Math.round((age / maxLife) * 100));

  const getStatus = () => {
    if (remaining === 0) return { label: "Replace Now", color: "#ef4444" };
    if (remaining <= 2) return { label: "End Approaching", color: "#f97316" };
    if (pct >= 65) return { label: "Monitor Closely", color: "#F5E642" };
    return { label: "Good Condition", color: "#22c55e" };
  };

  const status = getStatus();

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚿</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Water Heater Lifespan Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>DFW hard water kills water heaters 2–3 years early — here is what to do about it</p>
        </div>

        <div style={{ background: "#1e3a5f33", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #1e3a5f", fontSize: 14, color: "#94a3b8" }}>
          ⚠️ <strong style={{ color: "#F5E642" }}>DFW Water Hardness Alert:</strong> Fort Worth averages 300+ ppm, Dallas 250+ ppm. National avg water heater life is 11 years. In DFW without treatment: <strong style={{ color: "#fff" }}>8–9 years</strong>.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 18, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 8, fontSize: 14 }}>⚙️ Type</label>
            <select value={type} onChange={e => setType(e.target.value)} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px", fontSize: 13 }}>
              <option value="tank">Tank Water Heater</option>
              <option value="tankless">Tankless Water Heater</option>
            </select>
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 18, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 8, fontSize: 14 }}>📅 Age: {age} yrs</label>
            <input type="range" min={1} max={25} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, padding: 18, border: "1px solid #1e3a5f" }}>
            <label style={{ color: "#F5E642", fontWeight: 600, display: "block", marginBottom: 8, fontSize: 14 }}>🔧 Maintenance</label>
            <select value={maintained} onChange={e => setMaintained(e.target.value)} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "8px", fontSize: 13 }}>
              <option value="good">✅ Annual flush + anode rod</option>
              <option value="average">⚠️ Occasional flush</option>
              <option value="poor">❌ Never serviced</option>
            </select>
          </div>
        </div>

        <div style={{ background: status.color + "15", border: `2px solid ${status.color}`, borderRadius: 14, padding: 24, textAlign: "center", marginBottom: 24 }}>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 4 }}>DFW Expected Lifespan</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: status.color }}>{maxLife} years</div>
          <div style={{ color: "#e2e8f0", marginTop: 6 }}>{remaining > 0 ? `~${remaining} years remaining (${pct}% of life used)` : "Past expected lifespan"} — {status.label}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#111d35", borderRadius: 12, border: "1px solid #1e3a5f", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e3a5f" }}><span style={{ color: "#F5E642", fontWeight: 700 }}>🛠️ Maintenance Guide</span></div>
            {maintenanceItems.map((m, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: i < maintenanceItems.length - 1 ? "1px solid #0A1628" : "none" }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{m.icon} {m.task}</div>
                <div style={{ color: "#22c55e", fontSize: 13, marginTop: 2 }}>+{m.benefit}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#111d35", borderRadius: 12, border: "1px solid #1e3a5f", overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e3a5f" }}><span style={{ color: "#F5E642", fontWeight: 700 }}>⚠️ Failure Signs</span></div>
            {failureSigns.map((s, i) => (
              <div key={i} style={{ padding: "10px 18px", borderBottom: i < failureSigns.length - 1 ? "1px solid #0A1628" : "none" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: s.color }}>{s.sign}</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{s.urgency}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
