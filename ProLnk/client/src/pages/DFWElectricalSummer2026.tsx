import { useState } from 'react';

const homeAges = [
  {
    label: "Built after 2000",
    priority: "🟢 Good baseline — summer prep upgrades available",
    items: [
      "Panel capacity is likely 200A — sufficient for EV charger + AC surge",
      "Pre-wire for Level 2 EV charger now (summer install demand is high, 6-8 wk wait)",
      "Smart thermostat with ERCOT integration: auto-reduce at 4-7pm peak hours",
      "Whole-home surge protector: protects against ERCOT grid fluctuations ($200-400 installed)",
      "Consider solar + battery for ERCOT independence — incentives peak in 2026",
    ],
  },
  {
    label: "Built 1990-2000",
    priority: "🟡 Moderate risk — assess panel and wiring",
    items: [
      "Panel may be 100-150A — EV charger or hot tub addition may require upgrade",
      "Check for aluminum wiring (common in DFW 1965-1975 era) — fire risk if present",
      "Inspect GFCI outlets in bathrooms, kitchen, garage — code requires; safety critical",
      "Whole-home generator becoming common in DFW post-2021 winter storm — quote now",
      "ERCOT grid stress events: have a plan for 4-7pm power reduction windows",
    ],
  },
  {
    label: "Built 1975-1990",
    priority: "🔴 High priority — panel upgrade likely needed",
    items: [
      "100A panel is almost certainly undersized for modern DFW summer loads",
      "200A panel upgrade: $1,800-$3,500 in DFW; required before EV charger installation",
      "Federal Pacific or Zinsco panels (common in this era) are fire hazards — replace immediately",
      "Whole-home whole-house generator: 22kW Generac sized for 2,500 sqft DFW home = $9K-14K installed",
      "ERCOT conservation events: older homes with 1990s HVAC draw 40% more power — upgrade for savings",
    ],
  },
  {
    label: "Built before 1975",
    priority: "🚨 Critical — electrical assessment this summer",
    items: [
      "Knob-and-tube or early aluminum wiring may still be present — immediate inspection required",
      "Panel is almost certainly 60-100A — not safe for modern loads without upgrade",
      "Permit required for all panel work in DFW — verify contractor pulls permits",
      "2021 winter storm exposed critical backup power gaps — whole-home generator now a DFW necessity",
      "Insurance carriers increasingly surcharging or refusing pre-1975 electrical systems",
    ],
  },
];

export default function DFWElectricalSummer2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ color: "#F5E642", fontSize: "0.85rem", fontWeight: 700, letterSpacing: 2, marginBottom: "0.5rem" }}>
          PROLNK SEASONAL GUIDE · DFW · SUMMER 2026
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          ⚡ DFW Electrical — Summer 2026 Guide
        </h1>
        <p style={{ color: "#94a3b8", marginBottom: "2rem", lineHeight: 1.7 }}>
          DFW summer electrical demand is a serious safety and grid issue. ERCOT repeatedly calls
          conservation events on days above 100°F. EV charger installs are surging across DFW suburbs.
          And whole-home generators became mainstream after the 2021 winter storm. May is your window
          to prepare before contractor schedules fill up in June.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "🔌", stat: "200A", label: "Minimum panel for modern DFW home" },
            { icon: "🚗", stat: "+340%", label: "EV charger installs in DFW since 2022" },
            { icon: "🏭", stat: "22kW", label: "Recommended generator size for DFW home" },
          ].map((s) => (
            <div key={s.stat} style={{ background: "#0F2444", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem" }}>{s.icon}</div>
              <div style={{ color: "#F5E642", fontSize: "1.1rem", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.78rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1a1a2e", border: "1px solid #F5E642", borderRadius: 10, padding: "1.2rem", marginBottom: "2rem" }}>
          <strong style={{ color: "#F5E642" }}>🔥 ERCOT Tip:</strong>
          <span style={{ color: "#cbd5e1" }}> Program your smart thermostat to pre-cool to 72°F by 3pm, then set back to 78°F from 4-7pm during summer conservation events. Saves $30-60/month in DFW peak season.</span>
        </div>

        <h2 style={{ color: "#F5E642", marginBottom: "1rem" }}>Select Your Home Age</h2>
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {homeAges.map((h, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#1a3a6b" : "#0F2444",
                border: selected === i ? "2px solid #F5E642" : "2px solid transparent",
                borderRadius: 8, padding: "0.7rem 1.2rem", color: "#fff",
                cursor: "pointer", fontSize: "0.9rem",
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0F2444", borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem" }}>{homeAges[selected].priority}</div>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              {homeAges[selected].items.map((item, i) => (
                <li key={i} style={{ color: "#cbd5e1", marginBottom: "0.6rem", lineHeight: 1.6 }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2.5rem", background: "#F5E642", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.4rem" }}>
            ⚡ Get an Electrical Quote via ProLnk
          </div>
          <div style={{ color: "#1a3a6b", fontSize: "0.9rem" }}>Licensed DFW electricians · Panel upgrades · EV chargers · Generator installs</div>
        </div>
      </div>
    </div>
  );
}