import { useState } from 'react';

const wires = [
  { label: "R", color: "#ef4444", desc: "24V power from transformer — always hot when system is on" },
  { label: "C", color: "#3b82f6", desc: "Common wire — completes 24V circuit, required for smart thermostats" },
  { label: "Y", color: "#eab308", desc: "Cooling signal — energizes compressor contactor" },
  { label: "W", color: "#fff", desc: "Heating signal — energizes heat strips or gas valve" },
  { label: "G", color: "#22c55e", desc: "Fan signal — runs air handler independently of cooling/heating" },
  { label: "O/B", color: "#f97316", desc: "Reversing valve — O energizes in cooling (Carrier), B energizes in heating (Trane)" },
];

const concerns = [
  "No C-wire for smart thermostat",
  "Long run to outdoor unit (>50 ft)",
  "Wire insulation cracking or brittle",
  "Thermostat reads wrong temperature",
  "System short-cycling",
  "New HVAC install — wire gauge question",
];

const guides: Record<string, string> = {
  "No C-wire for smart thermostat": "Most DFW homes built before 2010 lack a C-wire. Options: run a new 18/5 thermostat wire ($80–150), use a C-wire adapter kit, or install a smart thermostat with power-stealing (Nest only).",
  "Long run to outdoor unit (>50 ft)": "DFW homes with side-yard condenser placement often have 60–80 ft runs. Use 14-gauge minimum for control wiring over 50 ft — 18-gauge loses voltage at longer distances in DFW heat.",
  "Wire insulation cracking or brittle": "DFW attic temps hit 150°F in summer. UV-rated thermostat wire is required for any attic run. Brittle insulation causes intermittent shorts — replace the full run, not just the damaged section.",
  "Thermostat reads wrong temperature": "If thermostat is near a supply register or exterior wall with sun exposure, heat transfer skews readings. Re-locate thermostat or add an averaging sensor — a DFW HVAC tech can recalibrate the zone.",
  "System short-cycling": "Often caused by a corroded Y or C connection at the air handler. DFW humidity accelerates terminal corrosion — clean all thermostat terminals and inspect the low-voltage wiring at the board.",
  "New HVAC install — wire gauge question": "18/5 or 18/8 is standard for thermostat wiring. For DFW attic runs over 30 ft, use 18-gauge rated for 200°F (UL Listed). Never use standard lamp cord or speaker wire.",
};

export default function DFWHVACWiringDFW2026() {
  const [concern, setConcern] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>PROLNK — DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>⚡ DFW HVAC Electrical Wiring Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Understanding HVAC wiring helps DFW homeowners communicate issues clearly and avoid unnecessary service calls. DFW heat puts unique stress on HVAC wiring systems.</p>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 14 }}>🔌 Thermostat Wire Terminal Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {wires.map(w => (
              <div key={w.label} style={{ background: "#0A1628", borderRadius: 8, padding: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ background: w.color, color: w.color === "#fff" ? "#0A1628" : "#fff", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{w.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.5 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>🌡️ How DFW Heat Stresses HVAC Wiring</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7 }}>DFW attics reach 140–160°F in summer. Standard thermostat wire (rated to 60°C/140°F) is at its limit. UV degradation, rodent activity, and repeated thermal expansion cycles crack insulation — making attic wiring inspections essential every 5–7 years in DFW homes.</p>
        </div>

        <div style={{ background: "#0F2040", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🔍 DFW HVAC Wiring Concern Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>What wiring concern do you have?</label>
            <select value={concern} onChange={e => { setConcern(e.target.value); setResult(guides[e.target.value] || ""); }} style={{ width: "100%", background: "#0A1628", color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "10px 12px", fontSize: 14 }}>
              <option value="">Select concern...</option>
              {concerns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {result && <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, color: "#F5E642", fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ textAlign: "center", color: "#64748b", fontSize: 13 }}>ProLnk connects DFW homeowners with vetted HVAC pros · <span style={{ color: "#F5E642" }}>prolnk.io</span></div>
      </div>
    </div>
  );
}