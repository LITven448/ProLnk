import { useState } from 'react';

const irrigationTypes = [
  {
    label: "In-Ground Sprinkler System",
    checklist: [
      "Turn on system zone by zone and walk each zone — look for broken heads, geysers, or dry spots",
      "Adjust pop-up heads that shifted over winter; replace any cracked or broken heads ($3-12 each)",
      "Inspect backflow preventer (RPZ or PVB) — required by most DFW municipalities; test annually",
      "Set controller to spring schedule: 2x per week, early morning (5-8am) to reduce evaporation",
      "Check rotor heads for full rotation — DFW clay soil can freeze rotors over winter",
      "Verify rain sensor is functioning — required in TX and saves 15-30% on water bills",
      "Some DFW cities (Frisco, McKinney, Allen) have May watering restrictions — verify your city rules",
    ],
  },
  {
    label: "Drip Irrigation (beds/shrubs)",
    checklist: [
      "Flush system before pressurizing — debris from winter collects in lines",
      "Inspect emitters for clogging: hold your hand 2 inches from emitter — should feel consistent flow",
      "Check tubing for UV degradation and squirrel/rodent damage — common over winter in DFW",
      "DFW spring: run drip zones 3x per week, 30-45 min per zone for established plants",
      "New plantings need daily drip for first 2-4 weeks — critical in DFW heat",
      "Filter screen at connection point: clean or replace if flow seems low",
      "Consider adding smart controller with ET (evapotranspiration) sensor — saves 20-40% vs fixed schedule",
    ],
  },
  {
    label: "Hose-Based / No In-Ground System",
    checklist: [
      "May is the last reasonable month to install in-ground system before summer heat makes install miserable",
      "Soaker hoses for foundation: run 30 min/day, 12 inches from foundation slab — critical in DFW clay",
      "Use a hose timer ($25-50) to automate watering — eliminates overwatering and forgotten watering",
      "Mulch all beds 3-4 inches deep now — reduces watering frequency by 50% through DFW summer",
      "DFW water rates increase in summer tiers — efficient watering saves $40-100/month June-August",
      "Get an irrigation quote now — in-ground systems pay back in 3-5 years in DFW water costs",
    ],
  },
  {
    label: "Smart / WiFi Controller System",
    checklist: [
      "Update controller firmware and reconnect to WiFi — controllers can lose config over winter",
      "Set seasonal adjustment to 80% for May (100% in July-August is baseline for DFW)",
      "Verify ET data source is active and pulling local DFW weather station data",
      "Check that rain sensor integration is active and overriding correctly",
      "Review zone run times: DFW clay soil absorbs water slowly — shorter cycles with soak-in periods work best",
      "Smart controllers reduce DFW irrigation water use by 20-50% vs fixed timers — verify savings in app",
    ],
  },
];

export default function DFWIrrigationSpring2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · SPRING 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          💧 DFW Irrigation Spring 2026 Guide
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          Spring startup is the most important irrigation task of the year in DFW. Winter can crack
          heads, shift rotors, and damage backflow preventers. May is your window to fix problems
          before June heat makes water bills spike. Several DFW cities also implement watering
          restrictions — know your city's rules before you set your schedule.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "💧", stat: "2x/week", label: "DFW spring watering schedule" },
            { icon: "⏰", stat: "5-8am", label: "Best watering window (low evaporation)" },
            { icon: "💰", stat: "20-50%", label: "Water savings with smart controller" },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444″, borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642″, fontSize: "1.1rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.78rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", border: "1px solid #F5E642″, borderRadius: 10, padding: "1.2rem", marginBottom: "2rem" }}>
          <strong style={{ color: "#F5E642″ }}>📋 DFW City Restrictions:</strong>
          <span style={{ color: "#cbd5e1″ }}> Frisco, McKinney, Allen, and Plano all have seasonal water restrictions. Most DFW cities prohibit irrigation between 10am-6pm. Check your city's utility portal — violations carry $100-500 fines.</span>
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>Select Your Irrigation Type</h2>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {irrigationTypes.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444″,
                border: selected === i ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 8, padding: "0.7rem 1.2rem", color: "#fff",
                cursor: "pointer", fontSize: "0.9rem",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444″, borderRadius: 12, padding: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginTop: 0 }}>Spring 2026 Checklist — {irrigationTypes[selected].label}</h3>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {irrigationTypes[selected].checklist.map((item, i) => (
                <li key={i} style={{ color: "#cbd5e1″, marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642″, borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            💧 Get an Irrigation Quote via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>Licensed DFW irrigators · Backflow testing · Smart controller installs · Same-week availability</div>
        </div>
      </div>
    </div>
  );
}