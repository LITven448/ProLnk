import { useState } from 'react';

const situations = [
  { id: "standard", label: "Standard DFW Home (12-inch overhang)", icon: "🏠", overhang: 12, protection: "Minimal", guide: "Standard DFW production homes have 12-inch eave overhang. This protects about 12 inches of wall below fascia during normal rain. During DFW storm fronts with wind-driven rain, 12-inch overhang provides little protection. Upgrade to 18-24 inches for meaningful wall protection.", cost: "", recommendation: "Add gutters and consider soffit extension if remodeling." },
  { id: "extended-18", label: "Extended Eave 18 inches", icon: "🏡", overhang: 18, protection: "Good", guide: "18-inch overhang provides meaningful protection in DFW. South-facing eaves shade wall from intense afternoon sun (reduces cooling load 5-8%). During moderate rain, exterior walls stay dry. This is the minimum recommended for DFW new construction.", cost: "$15-22 per linear ft", recommendation: "Good balance of cost and protection for DFW climate." },
  { id: "extended-24", label: "Extended Eave 24 inches", icon: "🏘️", overhang: 24, protection: "Excellent", guide: "24-inch overhang is optimal for DFW. South overhang at this depth blocks summer sun (70+ degree angle) but allows low winter sun (35 degree angle) — passive solar benefit. Wall protection during DFW downpours is excellent. Requires proper rafter sizing for DFW wind loads.", cost: "$20-30 per linear ft", recommendation: "Best investment for DFW homes — energy savings plus protection." },
  { id: "extended-36", label: "Deep Overhang 36+ inches", icon: "🏛️", overhang: 36, protection: "Maximum", guide: "36-inch or deeper overhangs are uncommon in DFW residential but excel in ranch-style or craftsman designs. Full wall protection in rain. Maximum summer shading. Requires structural engineering for DFW wind uplift (75 mph design). Verify with local jurisdiction — some HOAs limit roof projection.", cost: "$30-45 per linear ft plus engineering", recommendation: "Consider only if architectural style supports it and HOA allows." },
  { id: "adding-new", label: "Adding Overhang to Existing DFW Home", icon: "🔨", overhang: 0, protection: "Varies", guide: "Adding eave extension to existing DFW home requires: structural engineer review of existing rafter capacity, matching existing roofing material and pitch, and extending fascia, soffit, and trim. Most DFW homes can add 6-12 inches without structural work. More than 12 inches requires rafter sister or extension.", cost: "$15-30 per linear ft installed", recommendation: "Typical DFW project: 120 linear ft of eave at $22 equals $2,640 for 18-inch extension." },
  { id: "gable-rake", label: "Gable Rake End Extension", icon: "📐", overhang: 12, protection: "Good for wind-driven rain", guide: "Rake edge overhang on DFW gable ends protects the most vulnerable wall from wind-driven rain. Rain blows sideways during DFW storm fronts and hits gable wall directly. Standard rake overhang is 6-12 inches. Extending to 18 inches can prevent significant moisture infiltration at DFW gable ends.", cost: "$12-20 per linear ft", recommendation: "Often overlooked — gable ends are water damage hotspots in DFW." },
];

export default function DFWRoofingEaveExtension2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🏗️</div>
          <h1 style={{ color: "#F5E642", fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW Roof Eave Extension Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Overhang Depth, Wall Protection and Passive Solar — North Texas Roofing</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #334155" }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 8 }}>☀️ DFW Passive Solar Rule of Thumb</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24", marginBottom: 3 }}>Summer Sun Angle</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>70-80 degrees above horizon at noon. 24-inch overhang blocks direct sun on south windows from May through September.</div>
            </div>
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93c5fd", marginBottom: 3 }}>Winter Sun Angle</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>30-40 degrees above horizon at noon. Same 24-inch overhang allows winter sun to warm south-facing rooms.</div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 16, fontSize: 14, fontWeight: 600, color: "#94a3b8" }}>Select your overhang situation:</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 20 }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? "#F5E64222" : "#1e2d45", border: `1px solid ${selected === s.id ? "#F5E642" : "#334155"}`, borderRadius: 10, padding: "14px", textAlign: "left", cursor: "pointer", color: "#fff" }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: selected === s.id ? "#F5E642" : "#e2e8f0" }}>{s.label}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                {s.overhang > 0 && <span style={{ fontSize: 10, background: "#1e3a5f", color: "#93c5fd", padding: "2px 7px", borderRadius: 999 }}>{s.overhang} inch overhang</span>}
                <span style={{ fontSize: 10, background: s.protection === "Excellent" || s.protection === "Maximum" ? "#14532d" : "#1e3a5f", color: s.protection === "Excellent" || s.protection === "Maximum" ? "#86efac" : "#93c5fd", padding: "2px 7px", borderRadius: 999 }}>{s.protection}</span>
              </div>
              {s.cost && <div style={{ fontSize: 10, color: "#F5E642", marginTop: 4 }}>{s.cost}</div>}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: "#1e2d45", border: "1px solid #F5E642", borderRadius: 12, padding: "18px 22px" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{active.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 4 }}>{active.label}</div>
            <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.7, marginBottom: 12 }}>{active.guide}</div>
            <div style={{ background: "#F5E64222", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 12, color: "#F5E642", fontWeight: 600, marginBottom: 2 }}>💡 DFW Recommendation</div>
              <div style={{ fontSize: 12, color: "#cbd5e1" }}>{active.recommendation}</div>
            </div>
          </div>
        )}
        <div style={{ marginTop: 24, fontSize: 11, color: "#475569", textAlign: "center" }}>DFW wind design: 90 mph basic wind speed — overhangs over 24 inches require structural review per IRC R802 • ProLnk 2026</div>
      </div>
    </div>
  );
}
