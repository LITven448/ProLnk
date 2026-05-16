import { useState } from 'react';

const cityData: Record<string, Record<string, string>> = {
  "New Construction": {
    "Dallas": "2021 IBC + Dallas amendments. Permit required. Plan review 10-15 days.",
    "Fort Worth": "2021 IBC + FW amendments. Permit required. Plan review 10-15 days.",
    "Plano": "2021 IBC + Plano amendments. Permit required. Plan review 7-10 days.",
    "Arlington": "2021 IBC + Arlington amendments. Permit required. Plan review 10-14 days.",
    "McKinney": "2021 IBC + McKinney local code. Permit required. Plan review 5-10 days.",
  },
  "Kitchen Remodel": {
    "Dallas": "2021 IRC applies if structural. Electrical/plumbing permits required.",
    "Fort Worth": "2021 IRC. Permits required for electrical, plumbing, structural work.",
    "Plano": "2021 IRC. Permits required. Plano enforces energy code on major renos.",
    "Arlington": "2021 IRC. Permits required for all trades involved.",
    "McKinney": "2021 IRC. Permits required. McKinney inspects plumbing closely.",
  },
  "Roof Replacement": {
    "Dallas": "Permit required. Must meet 2021 IRC wind/hail ratings for North Texas.",
    "Fort Worth": "Permit required. Wind Zone 2 compliance. Inspection at completion.",
    "Plano": "Permit required. Class 4 impact-resistant shingles recommended.",
    "Arlington": "Permit required. Energy code applies to insulation under deck.",
    "McKinney": "Permit required. Framing inspection if decking replaced >25%.",
  },
  "Deck / Patio Cover": {
    "Dallas": "Permit required >200 sq ft or attached. Setback rules apply.",
    "Fort Worth": "Permit required for attached structures. Setback 5ft side/rear typical.",
    "Plano": "Permit required. Footing depth inspection. HOA may have additional rules.",
    "Arlington": "Permit required for decks >30 inches above grade.",
    "McKinney": "Permit required. Engineered drawings for spans >12 ft.",
  },
};

export default function DFWBuildingCodeGuide2026() {
  const [projectType, setProjectType] = useState("New Construction");
  const [city, setCity] = useState("Dallas");

  const result = cityData[projectType]?.[city] ?? "Select a project type and city above.";

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>🏗️</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#F5E642", marginTop: "8px" }}>DFW Building Code Guide 2026</h1>
          <p style={{ color: "#94a3b8", marginTop: "8px" }}>Texas adopts IBC/IRC as base code — but Dallas, Fort Worth, Plano and others layer city amendments on top. Know what applies before you pull a permit.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>Project Type</label>
            <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff", fontSize: "14px" }}>
              {Object.keys(cityData).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff", fontSize: "14px" }}>
              {Object.keys(cityData[projectType] ?? {}).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "20px", borderLeft: "4px solid #F5E642", marginBottom: "32px" }}>
          <p style={{ color: "#F5E642", fontWeight: "700", marginBottom: "6px" }}>📋 Code Requirement</p>
          <p style={{ color: "#e2e8f0", lineHeight: "1.6" }}>{result}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          {[
            { icon: "📅", title: "2021 IRC/IBC Status", body: "DFW cities began adopting 2021 codes in 2023-2024. Most are now fully on 2021 IRC/IBC with local amendments." },
            { icon: "⚠️", title: "Renovation Triggers", body: "Remodels >50% of home value trigger full code compliance. Any structural, electrical, or plumbing work requires permits." },
            { icon: "🔍", title: "City Amendments", body: "Each city amends the base code. Check with your local building department before assuming state code alone applies." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642", fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "20px" }}>
          <h2 style={{ color: "#F5E642", fontWeight: "700", marginBottom: "12px" }}>🔗 Key DFW Building Departments</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {["Dallas — 214-948-4480", "Fort Worth — 817-392-2222", "Plano — 972-941-7151", "Arlington — 817-459-6502", "McKinney — 972-547-7400", "Frisco — 972-292-5350"].map(c => (
              <div key={c} style={{ color: "#94a3b8", fontSize: "13px", padding: "8px", backgroundColor: "#0f172a", borderRadius: "6px" }}>📞 {c}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}