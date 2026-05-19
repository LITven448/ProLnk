import { useState } from 'react';

const homeEras = ["1920s-1930s", "1940s-1950s", "1960s-1970s", "1980s+"];

const guides: Record<string, string[]> = {
  "1920s-1930s": [
    "🔌 Knob-and-tube wiring identification and replacement planning",
    "🚿 Cast iron drain pipe inspection — root intrusion and corrosion assessment",
    "🏗️ Pier and beam foundation releveling — original wood beams may need sistering",
    "🪟 Single-pane window replacement — energy loss and storm protection",
    "🌡️ Steam or gravity furnace removal and modern HVAC installation",
    "🏠 Lead paint testing — mandatory disclosure for pre-1978 homes",
    "🧱 Brick mortar repointing — century-old masonry needs regular maintenance",
    "🚰 Galvanized supply pipe replacement — low pressure and discoloration signs",
  ],
  "1940s-1950s": [
    "🔌 60-amp panel upgrade to 200-amp — required for modern loads",
    "🚿 Cast iron and galvanized drain replacement — full repipe evaluation",
    "🏗️ Pier and beam inspection — mudsill rot and foundation leveling",
    "🌡️ Window unit removal and central HVAC retrofit planning",
    "🪟 Original wood window restoration or replacement",
    "🏠 Asbestos testing — floor tiles, insulation, duct wrap common in this era",
    "🧱 Chimney inspection and mortar repointing",
    "🌿 Mature tree assessment — proximity to structure and foundation",
  ],
  "1960s-1970s": [
    "🔌 Aluminum wiring inspection — fire hazard if present, needs remediation",
    "🚿 ABS drain pipe evaluation — early plastic plumbing brittleness",
    "🏗️ Slab or pier foundation inspection — era-specific settling patterns",
    "🌡️ Original ductwork replacement — asbestos wrap possible, test before disturbing",
    "🪟 Single or early double-pane window upgrade",
    "🏠 Polybutylene pipe check — recall-era plumbing if not already replaced",
    "🔒 Security system modernization — original hardware outdated",
    "🌿 North Side neighborhood context — Stockyards proximity, renovation value high",
  ],
  "1980s+": [
    "🏗️ Foundation inspection — 40-year slab or pier and beam assessment",
    "🌡️ HVAC full replacement — original systems well past service life",
    "🔌 Panel evaluation — 150-amp may need upgrade for EV or solar",
    "🚿 Polybutylene pipe replacement if not already done",
    "🪟 Double-pane window seal failures — fogging and condensation signs",
    "🏠 Exterior paint — lead paint possible on pre-1978 sections",
    "🌿 Mature landscape management — tree roots and foundation interaction",
    "🏘️ Gentrification-era renovation planning — North Side values rising",
  ],
};

export default function FortWorthNorthsideHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>
          TARRANT COUNTY · FORT WORTH NORTH SIDE
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Fort Worth North Side Homeowner Guide 2026
        </h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.7 }}>
          Fort Worth's North Side is a historic neighborhood of 1920s-1950s bungalows and cottages, now in the middle of a major gentrification wave driven by Stockyards tourism and proximity to downtown. Original plumbing, aging electrical, and pier-and-beam foundations are the defining maintenance challenges — but renovation upside is significant.
        </p>

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>🏚️ Select Your Home's Era</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {homeEras.map((e) => (
              <button
                key={e}
                onClick={() => setSelected(e)}
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selected === e ? "#F5E642″ : "#1e3a5f",
                  color: selected === e ? "#0A1628″ : "#fff",
                  fontWeight: 600,
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>
              🔧 North FW Maintenance Guide — {selected}
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {guides[selected].map((item, i) => (
                <li key={i} style={{ padding: "0.6rem 0″, borderBottom: "1px solid #1e3a5f", color: "#cbd5e1" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ backgroundColor: "#111f3c", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginBottom: "0.75rem" }}>📍 FW North Side Fast Facts</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["County", "Tarrant"], ["Home Era", "1920s-1950s mostly"], ["Foundation Type", "Pier and beam dominant"], ["Renovation Activity", "High — Stockyards effect"], ["Lead/Asbestos Risk", "High — pre-1978 majority"], ["Character", "Historic — gentrifying"]].map(([k, v]) => (
              <div key={k} style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: "0.75rem" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>{k}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
