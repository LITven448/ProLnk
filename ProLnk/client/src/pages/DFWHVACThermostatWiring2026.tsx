import { useState } from 'react';

const situations = [
  { label: "No C-wire, want Nest or Ecobee", sol: "Use Adapter Kit", detail: "Nest Power Connector or Ecobee Power Extender Kit — works without running new wire. Installs in air handler." },
  { label: "Have C-wire (blue wire connected)", sol: "Ready to Go", detail: "Connect blue C-wire to C terminal on smart thermostat. Standard installation applies." },
  { label: "Have unused wire in bundle", sol: "Repurpose as C-wire", detail: "Check your existing thermostat wire — most DFW homes have 5+ wires. Repurpose unused wire as C-wire, connect both ends." },
  { label: "Older system, 2-wire heat only", sol: "Run New Wire", detail: "2-wire systems (gas heat, no AC) need a full new wire run or a 24V power adapter in the air handler." },
];

export default function DFWHVACThermostatWiring2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Thermostat Wiring Guide</h1>
        <p style={{ color: "#94a3b8", marginBottom: 28 }}>Understanding thermostat wiring for DFW homeowners — especially before upgrading to a smart thermostat.</p>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          ⚡ The C-wire (common wire) is the number 1 smart thermostat installation issue in DFW homes.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Standard Thermostat Wire Colors</h2>
        <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
          {[
            { color: "#ef4444", wire: "R / Rh / Rc", label: "24V Power (always red)" },
            { color: "#3b82f6", wire: "C", label: "Common — ground return (usually blue, sometimes black)" },
            { color: "#22c55e", wire: "G", label: "Fan (usually green)" },
            { color: "#facc15", wire: "Y / Y1", label: "Cooling (usually yellow)" },
            { color: "#f8fafc", wire: "W / W1", label: "Heating (usually white)" },
            { color: "#a78bfa", wire: "O / B", label: "Heat pump reversing valve (orange or blue)" },
          ].map((w) => (
            <div key={w.wire} style={{ background: "#1e293b", borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: w.color, flexShrink: 0, border: "1px solid #475569" }} />
              <div style={{ fontWeight: 700, minWidth: 70 }}>{w.wire}</div>
              <div style={{ color: "#94a3b8", fontSize: 14 }}>{w.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>⚠️ Wire Colors Are NOT Standardized</div>
          <div style={{ color: "#94a3b8", fontSize: 14 }}>DFW installers sometimes use different colors. Always trace back to the control board — do not assume color equals function.</div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💡 What Is Your Situation?</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Solution: {situations[selected].sol}</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>{situations[selected].detail}</div>
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🔧 Get a Free DFW HVAC Estimate</div>
          <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 12 }}>ProLnk connects you with licensed DFW HVAC technicians who handle thermostat wiring correctly the first time.</div>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Estimate →</button>
        </div>
      </div>
    </div>
  );
}
