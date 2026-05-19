import { useState } from 'react';

const features = ["ERCOT Demand Response", "Geofencing (Ecobee/Nest)", "Occupancy Sensing", "Humidity Sensing", "Remote Diagnostics / Alerts"];

export default function DFWHVACEcoModeGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState("");

  const toggle = (f: string) => setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const evaluate = () => {
    if (selected.length === 0) { setResult("Select at least one feature to explore."); return; }
    const tips: Record<string, string> = {
      "ERCOT Demand Response": "ERCOT demand response: Enroll via Oncor or your utility. Set thermostat to allow 2-4F setback during peak hours (3-7pm summer). Ecobee and Nest both support automated demand response enrollment.",
      "Geofencing (Ecobee/Nest)": "Geofencing: Your thermostat detects when your phone leaves home and shifts to away mode. Saves 10-15% annually with no manual effort. Ecobee SmartThermostat Premium is best for DFW integration.",
      "Occupancy Sensing": "Occupancy sensing: Motion sensors adjust temperature in real time. Ecobee SmartSensor detects room occupancy. Nest uses on-device radar. Ideal for homes with irregular schedules.",
      "Humidity Sensing": "Humidity sensing: Some thermostats (Ecobee) show real-time RH%. Set AC to run extra 5 min after setpoint to dehumidify. Critical in DFW summers when RH regularly hits 65-80%.",
      "Remote Diagnostics / Alerts": "Remote diagnostics: Carrier, Lennox, and Trane smart systems alert your contractor before failure. Saves emergency call cost ($200-$400) and avoids summer breakdown. Ask your installer about ConnectPro or iComfort.",
    };
    setResult(selected.map(f => tips[f]).join("\n\n"));
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HVAC Eco Mode & Smart Features 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>ERCOT demand response, geofencing, occupancy sensing, remote diagnostics — what DFW homeowners need to know</p>
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>🏆 DFW Smart HVAC Overview</h2>
          {[
            ["🔋", "ERCOT peak hours", "Summer demand spikes 3-7pm; smart thermostats auto-reduce load and can earn bill credits"],
            ["📍", "Geofencing", "Ecobee & Nest shift to eco mode when you leave; returns to comfort before you arrive"],
            ["👤", "Occupancy", "Room-level sensors ensure unused rooms don't get overcooled"],
            ["💧", "Humidity control", "DFW summer RH 60-80%; smart systems extend run cycles to pull moisture"],
            ["🔧", "Remote diagnostics", "Some systems alert HVAC contractor before breakdown — prevents emergency calls"],
          ].map(([icon, label, desc]) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div><div style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>{label}</div><div style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0f1f3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, marginBottom: 16 }}>🔍 Feature Interest Guide</h2>
          <p style={{ color: "#94a3b8″, fontSize: 13, marginBottom: 12 }}>Select features you are interested in:</p>
          {features.map(f => (
            <div key={f} onClick={() => toggle(f)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, marginBottom: 8, background: selected.includes(f) ? "#1e3a5f" : "#162032″, border: selected.includes(f) ? "1px solid #F5E642" : "1px solid #334155", cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{selected.includes(f) ? "✅" : "⬜"}</span>
              <span style={{ color: "#e2e8f0″, fontSize: 14 }}>{f}</span>
            </div>
          ))}
          <button onClick={evaluate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%", marginTop: 12 }}>Get Smart HVAC Guide</button>
          {result && <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14, color: "#e2e8f0″, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-line" }}>{result}</div>}
        </div>
        <div style={{ textAlign: "center", color: "#475569″, fontSize: 13 }}>ProLnk · Smart HVAC for DFW Homeowners · 2026</div>
      </div>
    </div>
  );
}
