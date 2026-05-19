import { useState } from 'react';

export default function DFWSurveyGuide2026() {
  const [txnType, setTxnType] = useState("purchase");

  type SurveyRec = { name: string; icon: string; cost: string; turnaround: string; desc: string; needed: boolean };
  const surveys: Record<string, SurveyRec[]> = {
    purchase: [
      { name: "Boundary Survey", icon: "📐", cost: "$500–$900", turnaround: "5–10 days", desc: "Establishes property lines, confirms lot dimensions, locates encroachments", needed: true },
      { name: "Elevation Certificate", icon: "🌊", cost: "$300–$600", turnaround: "3–7 days", desc: "Required if property is in or near a FEMA flood zone — affects flood insurance rates", needed: false },
      { name: "As-Built Survey", icon: "🏗️", cost: "$600–$1,100", turnaround: "7–14 days", desc: "Shows existing improvements (house, garage, fence, pool) relative to property lines", needed: false },
    ],
    refinance: [
      { name: "Boundary Survey", icon: "📐", cost: "$500–$900", turnaround: "5–10 days", desc: "Lenders may require to confirm no encroachments since last survey", needed: false },
      { name: "Elevation Certificate", icon: "🌊", cost: "$300–$600", turnaround: "3–7 days", desc: "Required if in flood zone — lender verifies flood insurance accuracy", needed: false },
    ],
    commercial: [
      { name: "ALTA Survey", icon: "🗺️", cost: "$2,500–$8,000", turnaround: "2–4 weeks", desc: "Comprehensive survey meeting ALTA/NSPS standards — required for commercial lending and title insurance", needed: true },
      { name: "Boundary Survey", icon: "📐", cost: "$800–$2,000", turnaround: "7–14 days", desc: "Basic property line confirmation — sometimes accepted for smaller commercial deals", needed: false },
      { name: "Topographic Survey", icon: "🏔️", cost: "$1,500–$5,000", turnaround: "2–3 weeks", desc: "Maps elevation changes for development or grading purposes", needed: false },
    ],
    newconstruction: [
      { name: "Boundary Survey", icon: "📐", cost: "$500–$900", turnaround: "5–10 days", desc: "Required before breaking ground — establishes build envelope", needed: true },
      { name: "As-Built Survey", icon: "🏗️", cost: "$600–$1,100", turnaround: "7–14 days", desc: "Required at completion by lender — confirms structure is within lot lines", needed: true },
      { name: "Elevation Certificate", icon: "🌊", cost: "$300–$600", turnaround: "3–7 days", desc: "Required if in flood zone — establishes base flood elevation for structure", needed: false },
    ],
  };

  const recs = surveys[txnType];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🗺️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW Property Survey Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Which survey do you need? Costs, timelines, and requirements</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
          {[
            { key: "purchase", label: "🏠 Home Purchase" },
            { key: "refinance", label: "🔄 Refinance" },
            { key: "commercial", label: "🏢 Commercial" },
            { key: "newconstruction", label: "🔨 New Construction" },
          ].map(b => (
            <button key={b.key} onClick={() => setTxnType(b.key)}
              style={{ padding: "12px 16px", background: txnType === b.key ? "#F5E642" : "#132038",
                color: txnType === b.key ? "#0A1628" : "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {b.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {recs.map((s, i) => (
            <div key={i} style={{ background: "#132038", borderRadius: 12, padding: 20,
              border: s.needed ? "2px solid #F5E642" : "2px solid transparent" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</div>
                    {s.needed && <span style={{ background: "#F5E642", color: "#0A1628", fontSize: 10,
                      borderRadius: 10, padding: "2px 8px", fontWeight: 700 }}>TYPICALLY REQUIRED</span>}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#F5E642", fontWeight: 700 }}>{s.cost}</div>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>⏱️ {s.turnaround}</div>
                </div>
              </div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: "#F5E642", fontSize: 15, marginBottom: 10 }}>📌 DFW Survey Tips</h3>
          <ul style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>DFW is largely flat — boundary surveys cost less than hillier TX markets</li>
            <li>Title companies often accept surveys less than 5 years old</li>
            <li>Ask your title company if an existing survey is on file before ordering</li>
            <li>Flood zone areas near Trinity River tributaries require elevation certs</li>
            <li>Order surveys early — 2-4 week backlogs common in DFW market</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
