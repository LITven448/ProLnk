import { useState } from 'react';

type COEntry = { required: boolean; timeline: string; notes: string };
type COData = Record<string, Record<string, COEntry>>;

const coData: COData = {
  "New Construction": {
    "Dallas": { required: true, timeline: "1-3 weeks after final inspection", notes: "Temporary CO available for partial occupancy if needed. Final CO required before permanent use." },
    "Fort Worth": { required: true, timeline: "5-15 business days after final", notes: "Occupancy before CO is a Class C misdemeanor. FW takes violations seriously." },
    "Plano": { required: true, timeline: "3-10 business days after final", notes: "Plano issues COs quickly if all inspections pass. Digital CO delivery available." },
    "Arlington": { required: true, timeline: "1-2 weeks after final inspection", notes: "Arlington requires utility release before CO. Coordinate with Oncor." },
  },
  "Major Renovation (>50% value)": {
    "Dallas": { required: true, timeline: "1-2 weeks after final inspection", notes: "Renovations exceeding 50% of assessed value trigger full CO review." },
    "Fort Worth": { required: true, timeline: "1-2 weeks after final inspection", notes: "Change of occupancy classification always requires new CO." },
    "Plano": { required: true, timeline: "5-10 business days", notes: "Structural changes to existing structures typically require CO update." },
    "Arlington": { required: true, timeline: "1-2 weeks", notes: "Check with Arlington building dept for exact threshold on your project." },
  },
  "Change of Use": {
    "Dallas": { required: true, timeline: "2-4 weeks (plan review + inspections)", notes: "Converting garage to living space, adding ADU, or commercial to residential all require new CO." },
    "Fort Worth": { required: true, timeline: "2-4 weeks", notes: "All change-of-use applications require new plan review before CO can be issued." },
    "Plano": { required: true, timeline: "2-3 weeks", notes: "ADU conversions have become common. Plano has a dedicated review track." },
    "Arlington": { required: true, timeline: "2-4 weeks", notes: "Garage conversions are closely reviewed for setback and parking compliance." },
  },
  "Minor Renovation (<50% value)": {
    "Dallas": { required: false, timeline: "N/A — permit closeout only", notes: "Minor renos typically close out with final inspection approval. No CO needed." },
    "Fort Worth": { required: false, timeline: "N/A — permit closeout only", notes: "Permit is closed when final inspection passes. No separate CO required." },
    "Plano": { required: false, timeline: "N/A — permit closeout only", notes: "Cosmetic or minor structural work only needs permit final, not a new CO." },
    "Arlington": { required: false, timeline: "N/A — permit closeout only", notes: "Standard remodel permits close after final inspection approval." },
  },
};

export default function DFWCertificateOfOccupancy2026() {
  const [projectType, setProjectType] = useState("New Construction");
  const [city, setCity] = useState("Dallas");

  const result = coData[projectType]?.[city];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <span style={{ fontSize: "32px" }}>📜</span>
          <h1 style={{ fontSize: "28px", fontWeight: "800″, color: "#F5E642", marginTop: "8px" }}>DFW Certificate of Occupancy Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "8px" }}>A CO is your legal right to occupy a structure. DFW cities require them for new construction, major renovations, and change-of-use projects. Occupying without one can result in fines and forced vacate orders.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ color: "#94a3b8″, fontSize: "13px", display: "block", marginBottom: "6px" }}>Project Type</label>
            <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px", color: "#fff", fontSize: "14px" }}>
              {Object.keys(coData).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: "#94a3b8″, fontSize: "13px", display: "block", marginBottom: "6px" }}>City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: "100%", padding: "10px 12px", backgroundColor: "#1e293b", border: "1px solid #334155″, borderRadius: "8px", color: "#fff", fontSize: "14px" }}>
              {Object.keys(coData[projectType] ?? {}).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "24px", marginBottom: "24px", borderLeft: `4px solid ${result.required ? "#F5E642" : "#16a34a"}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "28px" }}>{result.required ? "⚠️" : "✅"}</span>
              <h2 style={{ color: result.required ? "#F5E642″ : "#4ade80", fontWeight: "800", fontSize: "20px" }}>
                CO {result.required ? "REQUIRED" : "NOT REQUIRED"}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ backgroundColor: "#0f172a", borderRadius: "8px", padding: "14px" }}>
                <p style={{ color: "#94a3b8″, fontSize: "12px", marginBottom: "4px" }}>TIMELINE</p>
                <p style={{ color: "#e2e8f0″, fontWeight: "600" }}>{result.timeline}</p>
              </div>
              <div style={{ backgroundColor: "#0f172a", borderRadius: "8px", padding: "14px" }}>
                <p style={{ color: "#94a3b8″, fontSize: "12px", marginBottom: "4px" }}>NOTES</p>
                <p style={{ color: "#e2e8f0″, fontSize: "13px" }}>{result.notes}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "⛔", title: "No CO = No Occupancy", body: "Moving in before a CO is issued violates city code. Cities can issue stop-occupancy orders and fines up to $500/day." },
            { icon: "🏦", title: "Lenders Require It", body: "Mortgage lenders and title companies will not close on a new home without a CO. It affects your closing date." },
            { icon: "🔄", title: "Temporary CO", body: "Some cities issue a Temp CO for phased projects. Allows limited occupancy while final punch list items are completed." },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ backgroundColor: "#1e293b", borderRadius: "12px", padding: "16px" }}>
              <div style={{ fontSize: "24px", marginBottom: "8px" }}>{icon}</div>
              <h3 style={{ color: "#F5E642″, fontWeight: "700", marginBottom: "6px", fontSize: "14px" }}>{title}</h3>
              <p style={{ color: "#94a3b8″, fontSize: "13px", lineHeight: "1.5" }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
