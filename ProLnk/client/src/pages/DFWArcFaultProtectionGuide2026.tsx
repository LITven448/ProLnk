import { useState } from 'react';

export default function DFWArcFaultProtectionGuide2026() {
  const [homeAge, setHomeAge] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const ageGuides: Record<string, string> = {
    "Pre-1985": "⚠️ HIGH PRIORITY: No AFCI required by code at time of build. Wiring may be aluminum or early copper with aged insulation. Strongly recommend AFCI breaker installation in all bedrooms, living areas, and hallways. Budget $600–$1,200 for full panel upgrade.",
    "1985–1999": "⚠️ UPGRADE RECOMMENDED: Home predates AFCI requirements. 2008 NEC added bedroom AFCI; 2014 NEC expanded to living areas. Retrofit AFCI breakers for bedrooms ($40–60/breaker) is high-value fire prevention.",
    "2000–2007": "📋 PARTIAL: 2002 NEC required AFCI in bedrooms. Your home should have AFCI bedroom protection. Verify living areas and hallways — pre-2008 homes often lack these. Upgrade living area circuits if missing.",
    "2008–2013": "✅ MOSTLY COMPLIANT: 2008 NEC required AFCI in bedrooms and family rooms. Check for hallway and closet circuits added in 2014 NEC. Minor retrofit may be needed on additions.",
    "2014–Present": "✅ COMPLIANT: Built under 2014+ NEC which requires AFCI in virtually all living spaces including bedrooms, family rooms, dining rooms, living rooms, hallways, and closets. Verify permits were pulled and inspected.",
  };

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔥</span>
          <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 6, padding: "4px 12px", fontWeight: 700, fontSize: 12 }}>DFW ELECTRICAL GUIDE 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>DFW Arc Fault Protection Guide 2026</h1>
        <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 28 }}>AFCI breakers prevent house fires — and DFW homes built before 2008 may not have them</p>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>🔥 The Arc Fault Fire Problem</h2>
          <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>Arc faults cause approximately <strong style={{ color: "#F5E642" }}>2,900 house fires</strong> annually in the US — killing 500 people and injuring 1,400. Unlike a short circuit, an arc fault produces intense heat at a loose connection or damaged wire without tripping a standard breaker. By the time smoke is detected, a fire may already be inside your walls.</p>
          <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.7 }}>In DFW, foundation movement from expansive clay soil is a major cause — shifting foundations stress wire connections inside walls, creating arc-fault conditions in homes 10–30 years old.</p>
        </div>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>⚡ How Arc Faults Start</h2>
          {[["🔌 Damaged Insulation", "Wire insulation cracks with age, heat cycles, or pest damage — arcing begins between conductors"],["🔩 Loose Connections", "Receptacle terminals and junction box connections loosen over time — especially after foundation shifts"],["🪴 Pinched Wires", "Staples, nails, and furniture pressing on wires cause insulation damage over years"],["🐭 Rodent Damage", "Attic rodents chew through wire insulation — common in DFW suburban homes"]].map(([icon, desc]) => (
            <div key={icon} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, minWidth: 28 }}>{icon.split(" ")[0]}</span>
              <div>
                <div style={{ color: "#F5E642", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{icon.split(" ").slice(1).join(" ")}</div>
                <div style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>💰 AFCI Cost Breakdown</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Standard Breaker", "$5–15", "No arc detection"], ["AFCI Breaker", "$40–60", "Arc fault protection"], ["Installation Labor", "$75–125/breaker", "TDLR electrician"], ["Full Bedroom Upgrade (3br)", "$450–750", "Parts + labor"]].map(([item, price, note]) => (
              <div key={item} style={{ background: "#1E2F4F", borderRadius: 8, padding: 14 }}>
                <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{item}</div>
                <div style={{ color: "#E8EAF0", fontWeight: 800, fontSize: 18, margin: "4px 0" }}>{price}</div>
                <div style={{ color: "#64748B", fontSize: 12 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111D35", borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>🏠 Home Age → AFCI Requirement Guide</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ background: "#1E2F4F", color: "#E8EAF0", border: "1px solid #2D4A7A", borderRadius: 8, padding: "10px 14px", fontSize: 14, flex: 1, minWidth: 200 }}>
              <option value="">Select home build year range...</option>
              {Object.keys(ageGuides).map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <button onClick={() => homeAge && setResult(ageGuides[homeAge])} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Check</button>
          </div>
          {result && <div style={{ background: "#1E2F4F", borderRadius: 8, padding: 14, color: "#E8EAF0", fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}