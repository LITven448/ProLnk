import { useState } from 'react';

const vintages = [
  { range: "2010–2015", label: "Early Alliance", checklist: "Foundation settling common on first builds — get annual pier inspection. Builder-grade HVAC hitting 10–15 year mark; schedule tune-up. Check attic insulation compression. Warranty documentation review for structural defects." },
  { range: "2016–2020", label: "Mid-Growth Era", checklist: "Slab foundation monitoring as soil compacts. HVAC filters every 30 days (high dust from nearby industrial). Roof decking inspection — verify nailing patterns met code. Garage door spring and seal maintenance." },
  { range: "2021–2024", label: "Boom Period", checklist: "Builder punch-list completion — inspect for skipped items. Grading and drainage — many lots rushed to close. Verify all permit final inspections are on file. Window and door seal verification before first summer heat." },
  { range: "2025–2026", label: "Current Builds", checklist: "Post-closing walkthrough with independent inspector. Irrigation system commissioning and head adjustment. Smart home device registration and warranty activation. Establish HOA contact and CC&R document review." },
];

export default function FortWorthAllianceHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏭</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>Fort Worth Alliance Corridor Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
            Industrial employment hub driving North Fort Worth's fastest residential growth.
          </p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>🚛 The Alliance Story</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            The Alliance Corridor — anchored by AllianceTexas, Amazon, FedEx, and dozens of logistics employers —
            has fueled an unprecedented residential surge. Master-planned communities like Pecan Square, Harvest,
            and Walsh have absorbed thousands of logistics-sector homebuyers. Homes here are 2010–2026 vintage,
            meaning many are hitting their first major maintenance windows. Select your build era below.
          </p>
        </div>

        <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "1rem" }}>🏠 Select Your Home Vintage</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {vintages.map((v, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? "#F5E642" : "#0f2040",
                color: selected === i ? "#0A1628" : "#fff",
                border: "2px solid",
                borderColor: selected === i ? "#F5E642" : "#1e3a5f",
                borderRadius: 8,
                padding: "0.75rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.85rem",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              <div>{v.range}</div>
              <div style={{ fontWeight: 400, fontSize: "0.75rem", opacity: 0.8 }}>{v.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#0f2040", border: "2px solid #F5E642", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642", margin: "0 0 0.5rem" }}>📋 {vintages[selected].range} Maintenance Checklist</h3>
            <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>{vintages[selected].checklist}</p>
          </div>
        )}

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>⚠️ Alliance Area Watch Items</h2>
          <ul style={{ color: "#94a3b8", lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🏗️ Foundation settling — expansive clay plus new construction equals annual monitoring</li>
            <li>💨 Industrial dust — HVAC filter replacement every 30 days minimum</li>
            <li>🌧️ Flash flood risk in rapid-development drainage basins</li>
            <li>🚧 HOA compliance — architectural review for any exterior modification</li>
            <li>📋 Verify builder warranty documentation is on file before it expires</li>
          </ul>
        </div>

        <p style={{ color: "#475569", fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects Alliance Corridor homeowners with verified local pros. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}
