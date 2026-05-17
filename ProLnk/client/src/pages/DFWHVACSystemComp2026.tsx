import { useState } from 'react';

const components = [
  {
    id: "outdoor",
    name: "Outdoor Unit",
    emoji: "🏭",
    parts: ["Compressor", "Condenser Coil", "Condenser Fan"],
    desc: "The heart of your DFW split system. The compressor pumps refrigerant; the condenser coil rejects heat to outside air; the fan pulls air across the coil.",
    dfw: "DFW summer temps above 100°F stress outdoor units hard. Keep 2 ft clearance, clean coils annually, and shade the unit from west sun when possible.",
  },
  {
    id: "indoor",
    name: "Indoor Air Handler",
    emoji: "🌬️",
    parts: ["Evaporator Coil", "Blower Motor", "Air Filter"],
    desc: "Sits in your attic or closet. Evaporator coil absorbs heat from indoor air; blower circulates conditioned air through ductwork; filter traps dust and allergens.",
    dfw: "DFW attics exceed 140°F in summer. Ensure air handler insulation is intact, change filters every 30 days during peak season, and check for condensate drain pan overflow.",
  },
  {
    id: "refrigerant",
    name: "Refrigerant Lines",
    emoji: "🔵",
    parts: ["Suction Line (insulated)", "Liquid Line", "Refrigerant (R-410A or R-22)"],
    desc: "Copper lines connecting indoor and outdoor units. Suction line carries cool refrigerant gas back to compressor; liquid line carries high-pressure liquid refrigerant to evaporator.",
    dfw: "Insulation on suction line degrades in DFW UV exposure. Check annually for cracked foam insulation; exposed copper sweats and loses efficiency in humid DFW summers.",
  },
  {
    id: "thermostat",
    name: "Thermostat",
    emoji: "🌡️",
    parts: ["Temperature Sensor", "Control Board", "Wiring Harness"],
    desc: "Brain of the system. Senses indoor temperature and signals the HVAC components to run or stop. Smart thermostats add scheduling and remote control.",
    dfw: "Set DFW thermostats to 78°F when home, 85°F when away in summer. Avoid drastic setbacks—DFW humidity makes pull-down from 85°F+ very inefficient and strains equipment.",
  },
  {
    id: "ductwork",
    name: "Ductwork System",
    emoji: "🏗️",
    parts: ["Supply Ducts", "Return Ducts", "Flex Duct Runs", "Register Boots"],
    desc: "Distributes conditioned air throughout your home. Supply ducts deliver cool or warm air; return ducts pull air back to the air handler for reconditioning.",
    dfw: "Most DFW ductwork sits in attics—the worst possible location thermally. Leaky ducts are the #1 efficiency killer. Seal all connections with mastic or metal tape; never use standard duct tape.",
  },
];

export default function DFWHVACSystemComp2026() {
  const [active, setActive] = useState<string | null>(null);
  const selected = components.find((c) => c.id === active);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>❄️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW HVAC System Components</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>Complete Reference 2026 — Select a component to explore</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {components.map((c) => (
            <button key={c.id} onClick={() => setActive(active === c.id ? null : c.id)}
              style={{ background: active === c.id ? "#F5E642" : "#1e2d4a", border: "2px solid " + (active === c.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "1.2rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{c.emoji}</div>
              <div style={{ fontWeight: 700, color: active === c.id ? "#0A1628" : "#F5E642", fontSize: "0.95rem" }}>{c.name}</div>
              <div style={{ color: active === c.id ? "#1e2d4a" : "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.parts.length} parts</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#1e2d4a", border: "2px solid #F5E642", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>{selected.emoji} {selected.name}</h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {selected.parts.map((p) => (
                <span key={p} style={{ background: "#0A1628", border: "1px solid #2d3f5e", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.8rem", color: "#94a3b8" }}>{p}</span>
              ))}
            </div>
            <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: "0 0 1rem" }}>{selected.desc}</p>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.3rem" }}>🌡️ DFW-Specific Note</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.dfw}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#1e2d4a", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700 }}>🔧 Need a DFW HVAC Pro?</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>ProLnk matches you with verified DFW HVAC specialists — free quotes, no commitment</div>
        </div>
      </div>
    </div>
  );
}
