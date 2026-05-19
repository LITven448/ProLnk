import { useState } from 'react';

const facts = [
  { icon: "🌞", stat: "~229 sunny days/year", note: "DFW has one of the best solar resources in the US" },
  { icon: "❄️", stat: "50-65% of home energy = HVAC", note: "Sizing solar to offset HVAC is the highest ROI move in DFW" },
  { icon: "💡", stat: "3-7pm peak demand window", note: "Solar production drops just as HVAC peak hits — battery bridges the gap" },
  { icon: "🔋", stat: "Overnight = grid or battery", note: "No solar at night means battery or ERCOT powers overnight cooling" },
];

export default function DFWHVACSolarIntegrationGuide() {
  const [sqft, setSqft] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<null | { solar: string; battery: string; cost: string; offset: string }>(null);

  function calculate() {
    if (!sqft || !goal) return;
    const size = parseInt(sqft);
    const hvacLoad = size * 0.003;
    let solarKw = 0;
    let batteryKwh = 0;
    let cost = 0;
    let offset = "";

    if (goal === "offset-hvac") {
      solarKw = Math.round(hvacLoad * 1.3 * 10) / 10;
      batteryKwh = Math.round(hvacLoad * 4 * 10) / 10;
      cost = Math.round(solarKw * 2800 + batteryKwh * 400);
      offset = "70-80% of HVAC load offset";
    } else if (goal === "full-home") {
      solarKw = Math.round(hvacLoad * 2.2 * 10) / 10;
      batteryKwh = Math.round(hvacLoad * 8 * 10) / 10;
      cost = Math.round(solarKw * 2800 + batteryKwh * 400);
      offset = "90-100% of total home load";
    } else {
      solarKw = Math.round(hvacLoad * 0.8 * 10) / 10;
      batteryKwh = 0;
      cost = Math.round(solarKw * 2800);
      offset = "40-50% of HVAC load, peak hours only";
    }

    setResult({
      solar: `${solarKw} kW system`,
      battery: batteryKwh > 0 ? `${batteryKwh} kWh battery` : "No battery needed for this goal",
      cost: `$${cost.toLocaleString()} before 30% federal ITC`,
      offset,
    });
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#F5E642″, marginBottom: 8 }}>☀️ SOLAR + HVAC — DFW</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Size Solar Around Your HVAC</h1>
        <p style={{ color: "#94A3B8″, fontSize: 16, marginBottom: 40 }}>
          In DFW, your AC runs the math on your solar system. Get the sizing right and solar pays for itself faster than anywhere in Texas.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 40 }}>
          {facts.map((f) => (
            <div key={f.stat} style={{ background: "#0F1E35″, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 15 }}>{f.stat}</div>
              <div style={{ color: "#94A3B8″, fontSize: 13, marginTop: 4 }}>{f.note}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>🔢 Size Your System</h2>
        <div style={{ background: "#0F1E35″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#94A3B8″, fontSize: 14, marginBottom: 6 }}>Home Size (sq ft)</label>
            <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="e.g. 2200″
              style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "#94A3B8″, fontSize: 14, marginBottom: 8 }}>Solar Goal</label>
            {[{ val: "offset-hvac", label: "Offset my HVAC load (best ROI)" }, { val: "full-home", label: "Power my whole home" }, { val: "starter", label: "Starter system (daytime savings)" }].map((g) => (
              <label key={g.val} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, cursor: "pointer" }}>
                <input type="radio" name="goal" value={g.val} checked={goal === g.val} onChange={(e) => setGoal(e.target.value)} />
                <span style={{ fontSize: 15 }}>{g.label}</span>
              </label>
            ))}
          </div>
          <button onClick={calculate}
            style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Calculate My System
          </button>
        </div>
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "SOLAR SYSTEM SIZE", value: result.solar }, { label: "BATTERY RECOMMENDATION", value: result.battery }, { label: "ESTIMATED COST", value: result.cost }, { label: "EXPECTED OFFSET", value: result.offset }].map((item) => (
              <div key={item.label} style={{ background: "#0F1E35″, borderRadius: 10, padding: "14px 18px", borderLeft: "4px solid #F5E642" }}>
                <div style={{ color: "#94A3B8″, fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
