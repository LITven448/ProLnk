import { useState } from 'react';

const systems = [
  {
    id: "hvac",
    name: "HVAC System",
    emoji: "❄️",
    components: ["Outdoor condenser unit", "Indoor air handler", "Ductwork network", "Thermostat controls", "Refrigerant circuit"],
    interactions: "HVAC interacts with your electrical system for power and your attic insulation system for efficiency. A poorly insulated attic causes HVAC to run 40% longer in DFW summers.",
    dfw: "DFW HVAC systems run 9-10 months of the year. Expected lifespan is 12-15 years due to heat stress. Budget for replacement every 12 years and annual professional tune-ups every spring.",
    prolnk: "ProLnk HVAC pros cover all DFW zip codes including inner city, suburbs, and exurbs — from Frisco to Mansfield to Rockwall.",
  },
  {
    id: "foundation",
    name: "Foundation System",
    emoji: "🏠",
    components: ["Concrete post-tension slab", "Grade beams", "Interior stiffening beams", "Vapor barrier", "Drainage grade around perimeter"],
    interactions: "Foundation interacts with your plumbing system (pipes penetrate through slab), landscaping irrigation (soil moisture affects clay movement), and drainage systems (poor drainage accelerates heave).",
    dfw: "DFW black clay soil is the most challenging foundation environment in the US. The clay expands when wet and shrinks when dry, creating constant uplift and settlement forces on the slab.",
    prolnk: "ProLnk foundation pros are DFW specialists — they understand expansive clay behavior and PT slab repair in ways that national chains often do not.",
  },
  {
    id: "roofing",
    name: "Roofing System",
    emoji: "🏔️",
    components: ["Roof deck OSB", "Synthetic underlayment", "Architectural shingles", "Flashings and pipe boots", "Ridge and soffit ventilation"],
    interactions: "Roofing interacts with your attic insulation (proper ventilation prevents heat buildup that damages shingles), gutters (drainage from roof to ground), and electrical (penetrations for solar or HVAC lines).",
    dfw: "DFW receives 4-6 significant hail events annually. Most homeowner insurance policies cover hail damage — a ProLnk roofing pro can help document damage for claims within 48 hours of a storm.",
    prolnk: "ProLnk roofing pros are certified for insurance claim documentation and work directly with DFW adjusters to streamline the replacement process.",
  },
  {
    id: "plumbing",
    name: "Plumbing System",
    emoji: "🚿",
    components: ["Supply lines incoming water", "Drain waste vent system", "Water heater", "Fixture connections", "Slab penetrations"],
    interactions: "Plumbing interacts with your foundation (pipes penetrate the slab and can cause voids if they leak), water heater space-heating systems, and outdoor irrigation that affects foundation moisture.",
    dfw: "DFW hard water (high mineral content) accelerates water heater degradation — average DFW water heater lifespan is 8-10 years vs 12-15 nationally. Install a whole-home water softener to extend all fixture life.",
    prolnk: "ProLnk plumbing pros specialize in slab leak detection and repair — critical in DFW where slab leaks are the second most common foundation damage cause after clay soil movement.",
  },
  {
    id: "electrical",
    name: "Electrical System",
    emoji: "⚡",
    components: ["Main service panel", "Branch circuit wiring", "Outlets and switches", "GFCI and AFCI protection", "Grounding system"],
    interactions: "Electrical interacts with every mechanical system in your home — HVAC, water heater, EV chargers, smart home devices, solar panels, and backup generators all connect to the panel.",
    dfw: "DFW homes built before 1990 often have 100-amp panels that are undersized for modern loads including EV charging. Panel upgrades to 200-amp are common and required before solar or EV charger installation.",
    prolnk: "ProLnk electrical pros handle panel upgrades, EV charger installation, and whole-home surge protection — all high-demand services in growing DFW suburbs.",
  },
];

export default function DFWHomeSystemsMap2026() {
  const [active, setActive] = useState<string | null>(null);
  const selected = systems.find((s) => s.id === active);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "2rem", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🗺️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Complete Home Systems Map</h1>
          <p style={{ color: "#94a3b8", margin: 0 }}>2026 Guide — Select a system to see its full map and DFW interactions</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {systems.map((s) => (
            <button key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
              style={{ background: active === s.id ? "#F5E642" : "#1e2d4a", border: "2px solid " + (active === s.id ? "#F5E642" : "#2d3f5e"),
                borderRadius: 12, padding: "1.2rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, color: active === s.id ? "#0A1628" : "#F5E642", fontSize: "0.95rem" }}>{s.name}</div>
              <div style={{ color: active === s.id ? "#1e2d4a" : "#64748b", fontSize: "0.8rem", marginTop: "0.3rem" }}>{s.components.length} components</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: "#1e2d4a", border: "2px solid #F5E642", borderRadius: 16, padding: "1.5rem" }}>
            <h2 style={{ color: "#F5E642", margin: "0 0 1rem" }}>{selected.emoji} {selected.name}</h2>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem", fontSize: "0.85rem" }}>COMPONENTS</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {selected.components.map((c) => (
                  <span key={c} style={{ background: "#0A1628", border: "1px solid #2d3f5e", borderRadius: 20, padding: "0.2rem 0.8rem", fontSize: "0.8rem", color: "#94a3b8" }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #3b82f6", marginBottom: "1rem" }}>
              <div style={{ color: "#3b82f6", fontWeight: 700, marginBottom: "0.3rem" }}>🔗 System Interactions</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.interactions}</p>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #F5E642", marginBottom: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.3rem" }}>🌡️ DFW Climate Note</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.dfw}</p>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 10, padding: "1rem", borderLeft: "4px solid #22c55e" }}>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.3rem" }}>🔗 ProLnk Coverage</div>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{selected.prolnk}</p>
            </div>
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem", padding: "1rem", background: "#1e2d4a", borderRadius: 12 }}>
          <div style={{ color: "#F5E642", fontWeight: 700 }}>🏠 ProLnk Covers Every DFW Home System</div>
          <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.3rem" }}>One platform, every trade — HVAC, foundation, roofing, plumbing, electrical and more</div>
        </div>
      </div>
    </div>
  );
}
