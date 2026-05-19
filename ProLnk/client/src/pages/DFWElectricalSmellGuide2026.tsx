import { useState } from 'react';

const smellLocations = ["Outlet or switch", "Electrical panel", "Light fixture", "Behind wall", "Whole room / unknown"];

const actions: Record<string, { steps: string[]; emergency: boolean; description: string }> = {
  "Outlet or switch": {
    emergency: true,
    description: "Burning smell from outlet = potential arc fault or failing outlet. Treat as fire emergency.",
    steps: [
      "1. Immediately stop using the outlet or switch.",
      "2. Go to your electrical panel and flip the breaker for that room/circuit to OFF.",
      "3. Do NOT plug anything into the outlet or use the switch.",
      "4. Call a TDLR-licensed electrician — same day service required.",
      "5. If you see smoke or discoloration, call 911 and evacuate.",
    ],
  },
  "Electrical panel": {
    emergency: true,
    description: "Burning smell from panel = CRITICAL EMERGENCY. Possible arc, failing breaker, or overloaded bus.",
    steps: [
      "1. DO NOT open the panel.",
      "2. Call 911 if you see smoke or flames.",
      "3. Turn off the main breaker only if safe to do so without touching panel interior.",
      "4. Evacuate the home and call a licensed electrician immediately.",
      "5. Do not restore power until electrician inspects.",
    ],
  },
  "Light fixture": {
    emergency: true,
    description: "Burning smell from fixture = wrong bulb wattage, overheating, or failing fixture wiring.",
    steps: [
      "1. Turn off the light switch immediately.",
      "2. Let fixture cool completely before touching.",
      "3. Check: is the bulb wattage higher than the fixture rating? (Check inside fixture socket for max wattage label)",
      "4. Replace with correct lower-wattage LED bulb.",
      "5. If smell returns with correct bulb, the fixture wiring has failed — call electrician.",
    ],
  },
  "Behind wall": {
    emergency: true,
    description: "Smell with no visible source = possible wire insulation burning inside wall. Fire may be smoldering.",
    steps: [
      "1. EVACUATE immediately.",
      "2. Call 911 — fire may be active inside wall cavity.",
      "3. Turn off main breaker only if panel is accessible and safe.",
      "4. Do not re-enter until fire department clears the home.",
      "5. After fire department: call TDLR-licensed electrician before restoring power.",
    ],
  },
  "Whole room / unknown": {
    emergency: true,
    description: "Unlocated electrical smell = active fault somewhere in the circuit. Act immediately.",
    steps: [
      "1. Stop all activity and locate the smell source — check all outlets, switches, and fixtures.",
      "2. If source found: follow that location's steps above.",
      "3. If source not found: turn off all breakers for that area.",
      "4. Call electrician for same-day inspection.",
      "5. Do not sleep in home if smell is strong and unlocated.",
    ],
  },
};

export default function DFWElectricalSmellGuide2026() {
  const [location, setLocation] = useState("");
  const diag = location ? actions[location] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#ef4444″, fontSize: 14, marginBottom: 8, fontWeight: 700 }}>🚨 DFW ELECTRICAL EMERGENCY GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Burning Electrical Smell</h1>
        <div style={{ background: "#7f1d1d", border: "2px solid #ef4444″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <strong style={{ color: "#fca5a5″, fontSize: 18 }}>⚠️ THIS IS A POTENTIAL FIRE EMERGENCY</strong>
          <p style={{ color: "#fca5a5″, marginTop: 8, marginBottom: 0 }}>Burning plastic smell from electrical components means insulation is melting or an arc fault is active. Do not ignore. Do not wait. Act now.</p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 16, fontSize: 18 }}>📍 Where Is the Smell Coming From?</h2>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", background: "#1e3a5f", color: "#fff", border: "2px solid #ef4444″, borderRadius: 8, padding: "10px 14px", fontSize: 15 }}>
            <option value="">Select smell location...</option>
            {smellLocations.map(l => <option key={l}>{l}</option>)}
          </select>

          {diag && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: "#7f1d1d", border: "1px solid #ef4444″, borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ color: "#fca5a5″, fontWeight: 700, marginBottom: 6 }}>🚨 {diag.description}</div>
              </div>
              <div style={{ background: "#0a1628″, border: "1px solid #1e3a5f", borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 12, color: "#F5E642″ }}>Emergency Action Steps:</div>
                {diag.steps.map(s => (
                  <div key={s} style={{ padding: "8px 0″, borderBottom: "1px solid #1e3a5f", color: "#e2e8f0", fontSize: 14, lineHeight: 1.6 }}>{s}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 16, fontSize: 18 }}>📞 Emergency Contacts</h2>
          {[["🚒 Fire Emergency","911″],["⚡ Oncor Power Emergency","888-313-4747"],["🔌 TDLR License Lookup","tdlr.texas.gov"],["📱 ProLnk Emergency Electricians","Available 24/7"]].map(([label, val]) => (
            <div key={label as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0″, borderBottom: "1px solid #1e3a5f" }}>
              <span>{label}</span><span style={{ color: "#F5E642″, fontWeight: 700 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 8, padding: 14, fontWeight: 700, textAlign: "center" as const }}>
          🏅 24/7 Emergency Electricians — ProLnk DFW Network
        </div>
      </div>
    </div>
  );
}
