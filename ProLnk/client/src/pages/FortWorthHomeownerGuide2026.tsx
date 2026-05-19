import { useState } from 'react';

const areas = [
  { name: "Westside (Ridglea/Westover)", profile: "Custom 1940s–1990s homes, large lots, mature trees. Priority: tree root intrusion, specialty HVAC, slate/tile roof inspection." },
  { name: "TCU / Cultural District", profile: "1950s–1970s brick ranches. Priority: original plumbing, knob-and-tube electrical, pier-and-beam leveling." },
  { name: "East Fort Worth", profile: "1940s–1980s affordable stock. Priority: cast iron drain replacement, panel upgrades, window sealing." },
  { name: "Alliance Corridor", profile: "2010–2026 new builds. Priority: foundation settling, builder-grade HVAC tune-ups, warranty claims." },
  { name: "South FW / Crowley", profile: "2005–2020 suburban. Priority: expansive clay foundation, aging HVAC, fence and deck maintenance." },
  { name: "Near Sundance Square", profile: "Mixed urban vintage. Priority: historic preservation compliance, plumbing updates, modern insulation retrofits." },
];

export default function FortWorthHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🤠</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", margin: "0.5rem 0" }}>Fort Worth Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            Cowtown culture meets modern growth — from Westside estates to East FW opportunity blocks.
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>🏙️ Why Fort Worth Is Unique</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            Fort Worth spans a massive range of home vintages — 1920s bungalows in Fairmount to 2026 builds in Alliance.
            The Barnett Shale legacy, explosive population growth, and West Texas heat create specific maintenance patterns
            that differ sharply by neighborhood. Select your area below for a tailored maintenance profile.
          </p>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📍 Select Your Fort Worth Area</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {areas.map((area, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? "#F5E642″ : "#0f2040",
                color: selected === i ? "#0A1628″ : "#fff",
                border: "2px solid",
                borderColor: selected === i ? "#F5E642″ : "#1e3a5f",
                borderRadius: 8,
                padding: "0.75rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {area.name}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0f2040″, border: "2px solid #F5E642", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.75rem" }}>🔧 {areas[selected].name} Maintenance Profile</h3>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.7, margin: 0 }}>{areas[selected].profile}</p>
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📋 Fort Worth Universal Tips</h2>
          <ul style={{ color: "#94a3b8″, lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🌡️ Extreme heat — HVAC filter changes every 30 days in summer</li>
            <li>🌧️ Flash flood risk — check grading and gutters every spring</li>
            <li>🏗️ Expansive clay soil — annual foundation inspection recommended</li>
            <li>🌳 Heritage oak trees — root intrusion check on older plumbing</li>
            <li>💨 Hail season (Apr–Jun) — roof inspection after every major storm</li>
          </ul>
        </div>

        <p style={{ color: "#475569″, fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects Fort Worth homeowners with verified local pros. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}