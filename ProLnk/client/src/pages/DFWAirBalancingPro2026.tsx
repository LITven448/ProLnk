import { useState } from 'react';

const techniques: Record<string, { steps: string[]; tools: string[] }> = {
  "Hot/Cold Rooms": {
    steps: [
      "Map every room temp with calibrated thermometer — record delta vs thermostat",
      "Identify supply and return register locations in problem rooms",
      "Measure static pressure at air handler — target 0.5 in. w.c.",
      "Use smoke pencil at registers to visualize airflow direction and volume",
      "Partially close dampers on over-conditioned zones; open on weak zones",
      "Re-test after 30 min stabilization — DFW summer swings need full cycle",
    ],
    tools: ["Calibrated digital thermometer", "Smoke pencil / smoke candle", "Magnehelic gauge (static pressure)", "Damper adjustment rod"],
  },
  "Duct Leakage": {
    steps: [
      "Pressurize duct system with Duct Blaster — measure CFM25 leakage",
      "Walk attic with smoke pencil at all joints and flex connections",
      "Mark leaks with chalk — DFW attics hit 150°F, leaks waste 20-30% efficiency",
      "Seal with mastic (not tape) — brush on all flagged joints",
      "Re-test after mastic cure — target <4 CFM25 per 100 sq ft",
      "Document before/after static pressure readings for client report",
    ],
    tools: ["Duct Blaster / Blower Door", "Mastic sealant + brush", "Smoke pencil", "Flex duct clamps"],
  },
  "Zoning Issues": {
    steps: [
      "Identify zone controller model and map damper wiring",
      "Check zone damper actuators — DFW humidity causes corrosion in 3-5 yrs",
      "Verify bypass damper sizing — undersized bypass = high static on single zones",
      "Test each zone independently: call zone, measure supply temp delta",
      "Balance CFM per zone using Manual D targets for DFW climate zone 3A",
      "Log final CFM at each register with flow hood",
    ],
    tools: ["Zone controller diagnostic kit", "Flow hood (CFM measurement)", "Multimeter for actuator check", "Manual D calculation sheet"],
  },
};

export default function DFWAirBalancingPro2026() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🌡️</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            DFW HVAC Air Balancing for Pros 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
            ProLnk Charter HVAC techs — room-by-room balancing guide for DFW homes
          </p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Select Problem Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {Object.keys(techniques).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                style={{
                  background: selected === k ? "#F5E642" : "#1e3a5f",
                  color: selected === k ? "#0A1628" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642", marginBottom: "1rem" }}>⚙️ Balancing Protocol: {selected}</h3>
            <ol style={{ paddingLeft: "1.25rem", lineHeight: 2 }}>
              {techniques[selected].steps.map((s, i) => (
                <li key={i} style={{ color: "#cbd5e1", marginBottom: "0.25rem" }}>{s}</li>
              ))}
            </ol>
            <div style={{ marginTop: "1.25rem", background: "#162d4a", borderRadius: 8, padding: "1rem" }}>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>🧰 Tools Required</div>
              {techniques[selected].tools.map((t, i) => (
                <div key={i} style={{ color: "#94a3b8", fontSize: "0.9rem" }}>• {t}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>🏆 ProLnk Charter HVAC Techs Get First Match Priority</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Locked $149/mo · 12% direct commission · Exclusive DFW market data</div>
        </div>
      </div>
    </div>
  );
}
