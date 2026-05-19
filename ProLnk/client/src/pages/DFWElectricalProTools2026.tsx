import { useState } from 'react';

const electricalTypes: Record<string, { tools: { name: string; why: string }[] }> = {
  "Residential Service / Panels": {
    tools: [
      { name: "Clamp Meter (Fluke 376 FC)", why: "Non-contact current measurement — essential for load calcs on DFW homes upgrading to 200A or 400A service" },
      { name: "Thermal Camera (FLIR E6 Pro)", why: "Detect hot spots at breakers and connections — DFW summer loads push panels hard; catch failures before fires" },
      { name: "Cable Tracer / Toner (Greenlee)", why: "Trace circuits in DFW homes with no as-built drawings — saves hours of breaker hunting" },
      { name: "Arc Flash PPE (CAT 2 minimum)", why: "Required for energized panel work — DFW industrial-adjacent homes have high available fault current" },
      { name: "Breaker Finder (Ideal 61-534)", why: "Non-invasive circuit identification without turning off power in occupied DFW homes" },
    ],
  },
  "Commercial / Light Industrial": {
    tools: [
      { name: "Oscilloscope (Fluke 190 ScopeMeter)", why: "Diagnose complex faults — harmonic distortion from VFDs common in DFW light industrial" },
      { name: "Megohmmeter (Fluke 1587 FC)", why: "Insulation resistance testing on 3-phase motors and feeders — required for DFW commercial PM contracts" },
      { name: "Power Quality Analyzer (Fluke 435-II)", why: "Identify power factor issues and sag events in DFW commercial buildings on ONCOR grid" },
      { name: "Arc Flash PPE (CAT 3-4)", why: "Commercial switchgear — higher incident energy than residential; NFPA 70E required in DFW commercial" },
      { name: "Conduit Bender (Greenlee 555 or 854)", why: "EMT and rigid bending for DFW commercial builds — precise bends required for inspection" },
    ],
  },
  "EV Charger / Solar": {
    tools: [
      { name: "Clamp Meter with True RMS", why: "Verify load capacity for Level 2 EVSE install — DFW homes adding EV often need panel upgrade" },
      { name: "Wi-Fi Signal Meter", why: "Smart charger placement needs reliable signal — DFW garages often have poor WiFi penetration" },
      { name: "Torque Screwdriver / Driver Set", why: "Listed torque values on EV charger terminals — NEC 110.14(D) compliance required for DFW inspections" },
      { name: "Ground Fault Tester", why: "GFCI verification on all outdoor EVSE circuits required by DFW municipality codes" },
      { name: "Label Maker (Brady BMP21)", why: "NEC-required circuit directory labels — DFW inspectors flag missing labels every time" },
    ],
  },
};

export default function DFWElectricalProTools2026() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚡</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            DFW Electrical Pro Essential Tools Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            What DFW electricians need — residential panels, commercial, EV/solar
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Select Your DFW Electrical Work Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {Object.keys(electricalTypes).map((k) => (
              <button
                key={k}
                onClick={() => setSelected(k)}
                style={{
                  background: selected === k ? "#F5E642″ : "#1e3a5f",
                  color: selected === k ? "#0A1628″ : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🧰 Priority Tools: {selected}</h3>
            {electricalTypes[selected].tools.map((t, i) => (
              <div key={i} style={{ background: "#162d4a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.25rem" }}>{i + 1}. {t.name}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>{t.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>🏆 ProLnk Charter Electricians — First Match Priority in DFW</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Locked $149/mo · 12% direct commission · Exclusive DFW panel upgrade lead data</div>
        </div>
      </div>
    </div>
  );
}
