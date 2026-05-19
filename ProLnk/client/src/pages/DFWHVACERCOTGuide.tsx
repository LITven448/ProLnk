import { useState } from 'react';

const alerts = [
  { level: "Conservation Appeal", color: "#F59E0B", when: "Voluntary reduction request", action: "Pre-cool to 74°F before 3pm, raise to 78°F during 3-7pm" },
  { level: "Emergency Conservation", color: "#EF4444″, when: "Grid strain, near rolling blackouts", action: "Raise to 80°F immediately, avoid dishwasher/dryer 3-7pm" },
  { level: "Energy Emergency Alert 3″, color: "#7C3AED", when: "Rolling blackouts imminent", action: "Set to 82°F or off. Pre-cool NOW if alert just issued" },
];

const situations = ["Normal summer day", "Conservation Appeal issued", "Emergency Alert active", "Feb 2021-style event"];

const strategies: Record<string, { before: string; during: string; tip: string }> = {
  "Normal summer day": {
    before: "Pre-cool to 72-74°F by 2:30pm to build thermal mass",
    during: "Let thermostat rise to 78°F naturally from 3-7pm",
    tip: "Install programmable schedule: 72°F at 2pm, 78°F at 3pm, 74°F at 7pm",
  },
  "Conservation Appeal issued": {
    before: "Drop to 70°F before noon. Build maximum thermal mass",
    during: "Raise to 80°F. Use ceiling fans to feel 4°F cooler",
    tip: "Close blinds on west-facing windows by 1pm to reduce solar load",
  },
  "Emergency Alert active": {
    before: "Pre-cool to 68°F if alert issued before 2pm",
    during: "Target 82°F. Avoid running appliances. Wet towels on windows",
    tip: "Freeze water bottles overnight. Use as personal cooling during alert",
  },
  "Feb 2021-style event": {
    before: "Fill bathtubs. Set heat to 80°F. Seal drafts immediately",
    during: "One heated room strategy: seal off bedrooms, heat one space",
    tip: "Never use gas stove/oven for heat. Carbon monoxide risk",
  },
};

export default function DFWHVACERCOTGuide() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<null | { before: string; during: string; tip: string }>(null);

  function getStrategy() {
    if (!situation) return;
    setResult(strategies[situation]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: 14, color: "#F5E642″, marginBottom: 8 }}>⚡ ERCOT GRID GUIDE — DFW HVAC</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Your Grid. Your HVAC. Your Strategy.</h1>
        <p style={{ color: "#94A3B8″, fontSize: 16, marginBottom: 16 }}>
          DFW runs on ERCOT — an isolated grid with no imports from neighboring states. What happens in Austin affects your AC in Frisco. Here is what every DFW homeowner needs to know.
        </p>
        <div style={{ background: "#1A0A0A", border: "1px solid #EF4444″, borderRadius: 10, padding: "14px 18px", marginBottom: 40 }}>
          <div style={{ color: "#EF4444″, fontWeight: 700, marginBottom: 4 }}>❄️ February 2021 Changed Everything</div>
          <div style={{ color: "#94A3B8″, fontSize: 14 }}>ERCOT came within 4 minutes and 37 seconds of a complete statewide blackout. DFW homes froze for days. HVAC systems failed. 246 Texans died. The grid has been upgraded — but DFW homeowners who understand ERCOT will always be safer.</div>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>🚦 Alert Levels</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {alerts.map((a) => (
            <div key={a.level} style={{ background: "#0F1E35″, borderRadius: 10, padding: "16px 20px", borderLeft: `4px solid ${a.color}` }}>
              <div style={{ fontWeight: 700, color: a.color }}>{a.level}</div>
              <div style={{ color: "#94A3B8″, fontSize: 13, margin: "4px 0" }}>When: {a.when}</div>
              <div style={{ fontSize: 14 }}>{a.action}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>🎯 Get Your HVAC Strategy</h2>
        <div style={{ background: "#0F1E35″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: "block", color: "#94A3B8″, fontSize: 14, marginBottom: 8 }}>Current ERCOT Situation</label>
          <select value={situation} onChange={(e) => setSituation(e.target.value)}
            style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#fff", fontSize: 15, marginBottom: 16 }}>
            <option value="">Select situation</option>
            {situations.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={getStrategy}
            style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Get My Strategy
          </button>
        </div>
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[{ label: "BEFORE 3PM", value: result.before, color: "#22C55E" }, { label: "DURING 3-7PM", value: result.during, color: "#F59E0B" }, { label: "PRO TIP", value: result.tip, color: "#F5E642″ }].map((item) => (
              <div key={item.label} style={{ background: "#0F1E35″, borderRadius: 10, padding: 18, borderLeft: `4px solid ${item.color}` }}>
                <div style={{ color: item.color, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 15 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
