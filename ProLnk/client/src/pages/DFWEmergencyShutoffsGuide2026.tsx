import { useState } from 'react';

const homeTypes: Record<string, { water: string; gas: string; electric: string; hvac: string }> = {
  "Single Family Home": {
    water: "🔵 Water main shutoff: Look near the street curb in a buried box (lift lid with screwdriver). Turn clockwise to shut off. Also check under kitchen sink for secondary shutoff.",
    gas: "🔴 Gas meter shutoff: Located outside on the side/rear of your home. Use an adjustable wrench to turn valve 90° (perpendicular = OFF). Call Atmos at 1-888-286-6700 before turning back on.",
    electric: "⚡ Main breaker: In your electrical panel (garage, utility room, or exterior). Flip the large breaker at the top to OFF. Each circuit breaker controls a different zone.",
    hvac: "❄️ HVAC emergency: Locate the air handler (attic or closet) and flip the power disconnect switch to OFF. Also turn off thermostat and close gas supply valve if gas furnace.",
  },
  "Townhouse": {
    water: "🔵 Water shutoff: Often inside your unit near the water heater or under a bathroom vanity. Your HOA may control the master shutoff — know your HOA contact.",
    gas: "🔴 Gas shutoff: Shared meter bank on exterior wall. Your units meter has its own valve. Turn perpendicular to pipe. Call Atmos immediately.",
    electric: "⚡ Main breaker: Typically in a utility closet inside unit or in a shared electrical room. Label your units breaker panel clearly.",
    hvac: "❄️ HVAC: Air handler usually in a closet or attic access. Disconnect switch is a small box near the unit. Turn OFF immediately if you smell burning.",
  },
  "Condo": {
    water: "🔵 Water shutoff: Individual unit shutoffs are behind access panels in bathrooms or kitchen. Building master shutoff is controlled by building management — keep their emergency number posted.",
    gas: "🔴 Many condos are all-electric. If gas, your individual shutoff is near your units gas appliances. Building management controls the master — call them first.",
    electric: "⚡ Circuit breaker panel is inside your unit (hall closet or kitchen). Main shutoff for building is with building management only.",
    hvac: "❄️ HVAC: Fan coil units are typically in a closet. Turn off at thermostat first, then flip disconnect switch. Report to building management for shared systems.",
  },
};

export default function DFWEmergencyShutoffsGuide2026() {
  const [selected, setSelected] = useState("Single Family Home");
  const info = homeTypes[selected];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🚨</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", marginBottom: ".5rem" }}>DFW Emergency Home Shutoffs Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>Every DFW homeowner must know how to shut off water, gas, electric, and HVAC</p>
        </div>

        <div style={{ background: "#3b0000″, border: "1px solid #ef4444", borderRadius: 12, padding: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ color: "#ef4444″, fontWeight: 700 }}>⚠️ IN A GAS EMERGENCY</div>
          <div style={{ color: "#fca5a5″, marginTop: ".5rem" }}>Do NOT use light switches or phones inside. Evacuate immediately. Call 911 and Atmos Energy (1-888-286-6700) from outside or a neighbors home.</div>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🏠 Select Your Home Type</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#1a3a5c", color: "#fff", border: "1px solid #F5E642″, fontSize: "1rem" }}
          >
            {Object.keys(homeTypes).map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {info && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {[info.water, info.gas, info.electric, info.hvac].map((desc, i) => (
              <div key={i} style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
                <div style={{ color: "#94a3b8″, lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ color: "#F5E642″ }}>🔧 Shutoff Tools to Keep Handy</h3>
          {["Adjustable wrench (gas meter key)", "Flathead screwdriver (curb stop water box)", "Headlamp for dark utility areas", "Emergency contacts posted inside cabinet door"].map(s => (
            <div key={s} style={{ display: "flex", gap: ".75rem", marginTop: ".75rem", color: "#94a3b8″ }}>
              <span style={{ color: "#F5E642″ }}>✓</span> {s}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: ".85rem" }}>
          ProLnk connects DFW homeowners with verified emergency repair pros available 24/7.
        </div>
      </div>
    </div>
  );
}