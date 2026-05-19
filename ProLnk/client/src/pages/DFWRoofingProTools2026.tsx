import { useState } from 'react';

const stageTools: Record<string, { tools: { name: string; why: string }[] }> = {
  "Storm Chaser / Hail Claims": {
    tools: [
      { name: "HAAG Certified Inspector Kit", why: "Industry-standard hail impact measuring — required for insurance documentation in DFW market" },
      { name: "Drone (DJI Mavic 3 or Skydio 2+)", why: "Aerial hail documentation — insurers now require drone photos for large loss claims" },
      { name: "Moisture Meter (Tramex)", why: "Detect saturated decking before laying new shingles — DFW storms soak OSB fast" },
      { name: "30-ft Extension Ladder + Standoffs", why: "Safe roof access on DFW residential pitches (4:12 to 8:12 typical)" },
      { name: "Digital Photo Documentation App", why: "GPS-stamped, timestamped photos for claim packages" },
    ],
  },
  "Replacement / New Roof": {
    tools: [
      { name: "Pneumatic Roofing Nailer (Bostitch RN46)", why: "Speed and consistency — DFW codes require 4 nails min per shingle" },
      { name: "Pneumatic Shingle Stripper", why: "Remove 3-tab or architectural shingles 10x faster than manual tear-off" },
      { name: "Fall Protection System (ANSI Z359)", why: "OSHA required on slopes >4:12 or height >6 ft — DFW inspectors enforce" },
      { name: "Chalk Line + Speed Square", why: "Keep shingle courses straight on DFW homes with irregular hip/valley geometry" },
      { name: "Propane Torch (torch-down flashing)", why: "Modified bitumen at chimneys and crickets — common on DFW flat-to-pitch transitions" },
    ],
  },
  "Repair / Patch Work": {
    tools: [
      { name: "Moisture Meter", why: "Verify deck integrity before patching — hidden rot under lifted shingles is common after DFW hail" },
      { name: "Pry Bar + Cat's Paw", why: "Careful shingle removal without damaging surrounding field" },
      { name: "Roofing Caulk Gun (NP1 or OSI Quad)", why: "Flashing seal at penetrations — DFW wind-driven rain tests every penetration seal" },
      { name: "Portable Air Compressor (6-gal)", why: "Drive coil nailer for spot repairs without dragging full rig onto roof" },
      { name: "Knee Pads + Roof Jacks", why: "Comfort and safety for extended repair work on steep DFW pitches" },
    ],
  },
};

export default function DFWRoofingProTools2026() {
  const [selected, setSelected] = useState<string>("");

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏠</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            DFW Roofing Pro Essential Tools Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
            What DFW roofing pros need — by job type and stage
          </p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🔍 Select Your DFW Roofer Stage</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {Object.keys(stageTools).map((k) => (
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
                  fontSize: "0.85rem",
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642", marginBottom: "1rem" }}>🧰 Priority Tools: {selected}</h3>
            {stageTools[selected].tools.map((t, i) => (
              <div key={i} style={{ background: "#162d4a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem" }}>
                <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.25rem" }}>{i + 1}. {t.name}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{t.why}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>🏆 ProLnk Charter Roofers — First Match Priority in DFW</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Locked $149/mo · 12% direct commission · Exclusive DFW storm season lead data</div>
        </div>
      </div>
    </div>
  );
}
