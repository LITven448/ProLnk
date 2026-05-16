import { useState } from 'react';

const vintages = [
  { range: "2005–2010", label: "First Wave", checklist: "HVAC units are 15–20 years old — replacement is imminent, budget now. Roof at or near end of 20-year shingle life. Water heaters likely original. Foundation on expansive clay has had multiple wet/dry cycles; get pier inspection. Builder-grade everything is failing on schedule." },
  { range: "2011–2015", label: "Post-Recession Builds", checklist: "HVAC approaching 10–15 year service milestone — schedule tune-up and efficiency evaluation. Check attic insulation levels; builder-grade often under-specified. Fence and deck boards showing UV and moisture wear. Irrigation system head and controller inspection recommended." },
  { range: "2016–2020", label: "Growth Surge", checklist: "Slab foundation monitoring as clay soil continues to compress. Verify proper drainage grading — many lots were rushed. HVAC filters monthly minimum in Crowley/Burleson area. HOA compliance review before any exterior project. Gutters and downspouts — check extension routing away from foundation." },
  { range: "2021–2026", label: "Recent Builds", checklist: "Independent post-closing inspection — verify all punch-list items completed. Builder warranty documentation — register all systems before warranty expires. Establish drainage patterns through first full weather year. Smart home system setup and security system installation." },
];

export default function FortWorthNewSouthHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏘️</div>
          <h1 style={{ color: "#F5E642", fontSize: "2rem", margin: "0.5rem 0" }}>South Fort Worth Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>
            Crowley · Burleson · South FW Corridor — suburban growth on expansive clay.
          </p>
        </div>

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>🌱 South FW Growth Story</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            South Fort Worth — from Crowley to Burleson and into the southern suburbs — absorbed enormous residential
            growth from 2005 through today. Homes here are newer builds on concrete slabs atop notoriously expansive
            North Texas clay. The earliest 2005–2010 builds are now hitting major maintenance windows simultaneously,
            while newer builds have different early-lifecycle concerns. Select your vintage for a tailored checklist.
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
            <p style={{ color: "#94a3b8", fontSize: "0.8rem", margin: "0 0 0.75rem" }}>{vintages[selected].label}</p>
            <p style={{ color: "#e2e8f0", lineHeight: 1.7, margin: 0 }}>{vintages[selected].checklist}</p>
          </div>
        )}

        <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginBottom: "0.75rem" }}>⚠️ South FW Clay Soil Watch Items</h2>
          <ul style={{ color: "#94a3b8", lineHeight: 2, margin: 0, paddingLeft: "1.25rem" }}>
            <li>🏗️ Foundation — expansive clay shrinks in drought, swells in rain; monitor cracks annually</li>
            <li>💧 Watering program — consistent foundation watering in summer drought prevents movement</li>
            <li>🌡️ HVAC — 100°F+ days mean systems work harder; preventive maintenance is essential</li>
            <li>🌧️ Drainage — ensure grading slopes away from foundation on all sides</li>
            <li>🔒 HOA — review CC&Rs before any project; south FW HOAs actively enforce rules</li>
          </ul>
        </div>

        <p style={{ color: "#475569", fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          ProLnk connects South FW homeowners with verified local pros. © 2026 ProLnk
        </p>
      </div>
    </div>
  );
}
