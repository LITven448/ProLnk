import { useState } from 'react';

const events = [
  { type: "Winter Storm Uri (Feb 2021)", icon: "🌨️", severity: "Critical", desc: "5 million TX homes lost power for up to 10 days. ERCOT nearly collapsed completely. Natural gas well freeze-offs cut fuel supply; wind turbines (uninsulated) also failed.", homeowner: "Keep backup heat sources — propane heater, wood stove, or generator. Insulate pipes. Have 72-hour emergency kit. Know your shut-off valve location.", lesson: "ERCOT is isolated — no power imports from neighboring states are possible in a crisis." },
  { type: "Summer Demand Watch", icon: "☀️", severity: "Watch", desc: "ERCOT issues a Watch when reserves drop below 2,300 MW. Typically July-August afternoons 3-7 PM. Conservation requests go out — voluntary, not mandatory.", homeowner: "Pre-cool your home before 3 PM. Raise thermostat to 78°F during peak. Run dishwasher and laundry after 9 PM. Turn off unnecessary lights and electronics.", lesson: "Every 1°F thermostat raise = 3% less electricity. 100,000 homes raising 1°F = a peaker plant offline." },
  { type: "Emergency Alert (EEA)", icon: "🚨", severity: "Emergency", desc: "Energy Emergency Alert levels 1-3. EEA-3 triggers rotating outages. These last 15-45 minutes and rotate through circuits to prevent sustained outages.", homeowner: "At EEA-1, aggressively reduce load immediately. Unplug major appliances. If you have solar+battery, island-mode your system. Notify elderly neighbors.", lesson: "ERCOT can shed load in ~10 minutes. Your circuit may go dark with minimal warning during EEA-3." },
  { type: "Demand Response Programs", icon: "💰", severity: "Opportunity", desc: "Several DFW utilities offer demand response: Oncor, TXU Energy, and Reliant pay homeowners to reduce load during peak events. Programs pay $50-300/season.", homeowner: "Enroll in your utilitys demand response or smart thermostat program. Connect a Nest or Ecobee — utilities can nudge your thermostat (you can override). Earn credits.", lesson: "Your HVAC is your biggest load. Letting utilities slightly adjust during peaks pays you and stabilizes the grid." },
  { type: "Sustained Outage (3+ hrs)", icon: "🔦", severity: "Prepare", desc: "Whether from storms, equipment failure, or grid events — DFW outages averaging 3+ hours occur multiple times per year per household.", homeowner: "Know your outage threshold: pipes freeze at 20°F (rare but possible). Food is safe up to 4 hours in refrigerator. Generator: run outside only, away from windows.", lesson: "A 10 kWh home battery can power essentials (lights, router, small AC) for 8-12 hours without a generator." },
];

export default function DFWTexasElectricGrid2026() {
  const [selected, setSelected] = useState(0);

  const sevColor: Record<string, string> = { Critical: "#ef4444″, Watch: "#f59e0b", Emergency: "#ef4444", Opportunity: "#22c55e", Prepare: "#3b82f6" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Texas Electric Grid Reliability Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>ERCOT, outages, and how DFW homeowners respond and profit</p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>Why ERCOT Is Different</h3>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>
            Texas runs its own isolated electric grid — ERCOT (Electric Reliability Council of Texas). Unlike any other US state, Texas has <strong style={{ color: "#F5E642″ }}>no interstate transmission connections</strong> that can import power during emergencies. 
            This was by design (avoiding federal regulation) but creates unique vulnerability: when Texas demand spikes or supply fails, there is no neighboring grid to draw from.
          </p>
        </div>

        <p style={{ color: "#94a3b8″, marginBottom: "0.75rem", fontSize: "0.9rem" }}>Select a grid event type for your homeowner response guide:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {events.map((ev, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.75rem 1rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50″ : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span>{ev.icon}</span>
              <span>{ev.type}</span>
              <span style={{ marginLeft: "auto", background: sevColor[ev.severity] + "22″, color: sevColor[ev.severity], borderRadius: 6, padding: "0.15rem 0.6rem", fontSize: "0.75rem" }}>{ev.severity}</span>
            </button>
          ))}
        </div>

        {(() => { const ev = events[selected]; return (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>{ev.icon} {ev.type}</h2>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, marginBottom: "1.25rem" }}>{ev.desc}</p>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", marginBottom: "1rem", border: "1px solid #22c55e" }}>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.9rem" }}>✅ Homeowner Action</div>
              <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.6, fontSize: "0.9rem" }}>{ev.homeowner}</p>
            </div>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.9rem" }}>💡 Key Insight</div>
              <p style={{ color: "#94a3b8″, margin: 0, lineHeight: 1.6, fontSize: "0.9rem" }}>{ev.lesson}</p>
            </div>
          </div>
        ); })()}

        <div style={{ textAlign: "center", padding: "1rem", background: "#0f2040″, borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Grid-ready home upgrades? </span>
          <span style={{ color: "#F5E642″, fontWeight: 700 }}>ProLnk connects DFW homeowners with generators, solar+battery, and insulation pros. 🔗</span>
        </div>
      </div>
    </div>
  );
}
