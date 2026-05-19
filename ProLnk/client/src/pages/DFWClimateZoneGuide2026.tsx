import { useState } from 'react';

const elements = [
  { name: "Attic Insulation", req: "R-38 minimum", detail: "Most DFW homes need blown-in or batt insulation at R-38. Older homes often have R-11 to R-19 — a major energy loss. Zone 3 requires R-38; Zone 4 (north TX panhandle) requires R-49.", icon: "🏠" },
  { name: "Wall Insulation", req: "R-13 minimum", detail: "2x4 stud walls with R-13 batt meet minimum code. 2x6 construction allows R-20, which exceeds code. DFW builders increasingly use 2x6 for energy certification.", icon: "🧱" },
  { name: "Windows (SHGC)", req: "SHGC ≤ 0.25", detail: "Solar Heat Gain Coefficient of 0.25 or less required in Zone 3. This blocks 75%+ of solar radiation. Zone 2 (Houston) allows SHGC 0.25 too, but Zone 3 adds U-factor 0.40 requirement.", icon: "🪟" },
  { name: "HVAC Efficiency", req: "15 SEER2 minimum", detail: "As of Jan 2023, new AC installs in Zone 3 must be 15 SEER2 (replaces 14 SEER). Split systems and packaged units have separate standards. Heat pumps: 14 HSPF2 or higher.", icon: "❄️" },
  { name: "Air Sealing", req: "≤ 5 ACH50", detail: "Blower door test target: 5 air changes per hour at 50 pascals. DFW Energy Star homes target 3 ACH50. Leaky homes can exceed 10 ACH50, wasting 20-30% of conditioning energy.", icon: "💨" },
  { name: "Vapor Control", req: "Class II or III", detail: "Zone 3 is mixed-humid — vapor retarder requirements differ from coastal Zone 2. Interior vapor barriers can cause moisture problems in DFW. Class II (kraft-faced batts) typically appropriate.", icon: "💧" },
];

const zoneCompare = [
  { aspect: "Location", zone2: "Gulf Coast (Houston, Corpus)", zone3: "DFW, Austin, San Antonio" },
  { aspect: "Heating Degree Days", zone2: "< 2,000 HDD", zone3: "2,000–3,500 HDD" },
  { aspect: "Cooling Degree Days", zone2: "3,000+ CDD", zone3: "2,500–3,000 CDD" },
  { aspect: "Attic R-Value", zone2: "R-38", zone3: "R-38" },
  { aspect: "Window SHGC", zone2: "0.25", zone3: "0.25" },
  { aspect: "HVAC Min Efficiency", zone2: "14 SEER2", zone3: "15 SEER2" },
];

export default function DFWClimateZoneGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🗺️</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642", marginBottom: "0.5rem" }}>DFW Climate Zone & Building Code Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>IECC Climate Zone 3 requirements for Dallas-Fort Worth homes</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["🌡️","IECC Zone","3 — Mixed Humid"],["❄️","HVAC Min","15 SEER2"],["🏠","Attic Min","R-38"]].map(([icon,label,val],i)=>(
            <div key={i} style={{ background: "#0f2040", borderRadius: 10, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: "0.3rem" }}>{label}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, fontSize: "1.1rem" }}>{val}</div>
            </div>
          ))}
        </div>

        <p style={{ color: "#94a3b8", marginBottom: "0.75rem", fontSize: "0.9rem" }}>Select a building element to see Zone 3 requirements:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {elements.map((el, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.7rem 0.5rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642" : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50" : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
              {elements[i].icon} {el.name}
            </button>
          ))}
        </div>

        {(() => { const el = elements[selected]; return (
          <div style={{ background: "#0f2040", borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem" }}>{el.icon}</span>
              <div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5E642", margin: 0 }}>{el.name}</h2>
                <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "0.2rem 0.7rem", fontSize: "0.85rem", fontWeight: 700 }}>{el.req}</span>
              </div>
            </div>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{el.detail}</p>
          </div>
        ); })()}

        <h3 style={{ color: "#F5E642", fontWeight: 700, marginBottom: "1rem" }}>Zone 2 vs Zone 3 Comparison</h3>
        <div style={{ background: "#0f2040", borderRadius: 12, overflow: "hidden", border: "1px solid #1e3a5f", marginBottom: "2rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a2f50" }}>
                {["Aspect","Zone 2 (Gulf Coast)","Zone 3 (DFW)"].map((h,i)=><th key={i} style={{ padding: "0.8rem 1rem", textAlign: "left", color: "#F5E642", fontSize: "0.85rem" }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {zoneCompare.map((row,i)=>(
                <tr key={i} style={{ borderTop: "1px solid #1e3a5f" }}>
                  <td style={{ padding: "0.7rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>{row.aspect}</td>
                  <td style={{ padding: "0.7rem 1rem", color: "#cbd5e1", fontSize: "0.85rem" }}>{row.zone2}</td>
                  <td style={{ padding: "0.7rem 1rem", color: "#F5E642", fontWeight: 600, fontSize: "0.85rem" }}>{row.zone3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: "center", padding: "1rem", background: "#0f2040", borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Need a Zone 3 code-compliant upgrade? </span>
          <span style={{ color: "#F5E642", fontWeight: 700 }}>ProLnk finds qualified DFW contractors instantly. 🔗</span>
        </div>
      </div>
    </div>
  );
}
