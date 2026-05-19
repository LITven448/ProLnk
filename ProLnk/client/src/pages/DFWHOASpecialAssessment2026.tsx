import { useState } from 'react';

export default function DFWHOASpecialAssessment2026() {
  const [scenario, setScenario] = useState<string | null>(null);

  const scenarios = [
    {
      type: "Roof Replacement",
      icon: "🏠",
      amount: "$1,500 – $3,000",
      frequency: "Every 20-25 years",
      rights: [
        "HOA must hold a member vote if assessment exceeds threshold in bylaws",
        "Request itemized contractor bids before vote",
        "Inspect reserve fund — why was it underfunded?",
        "Ask about payment plan options (many HOAs offer 12-24 months)",
        "Attend the board meeting where this is approved",
        "Review the reserve study to see if this was planned"
      ]
    },
    {
      type: "Pool/Amenity Repair",
      icon: "🏊",
      amount: "$500 – $2,000",
      frequency: "Every 10-15 years",
      rights: [
        "Request full scope of work and multiple bids",
        "Confirm the repair is truly necessary vs. cosmetic",
        "Ask if the amenity can be closed rather than assessed",
        "Review prior year financials — was this budgeted?",
        "Request payment plan if lump sum causes hardship",
        "Check if insurance covers any portion"
      ]
    },
    {
      type: "Legal Fees",
      icon: "⚖️",
      amount: "$200 – $1,000",
      frequency: "Varies",
      rights: [
        "Request details on the litigation — you have a right to know",
        "Ask if the lawsuit could have been settled earlier",
        "Review D&O insurance coverage (board liability)",
        "Attend meetings to monitor ongoing legal costs",
        "Consider organizing homeowners if costs are excessive",
        "Request attorney invoices if spending is ongoing"
      ]
    },
    {
      type: "Structural Damage",
      icon: "🔧",
      amount: "$1,000 – $5,000",
      frequency: "After disasters",
      rights: [
        "Verify HOA master insurance policy was filed",
        "Request the insurance claim denial letter if applicable",
        "Get independent contractor estimate for comparison",
        "Ask about FEMA or disaster relief that may offset costs",
        "Request 24-36 month payment plan for hardship cases",
        "Consult Texas HOA attorney if assessment seems improper"
      ]
    }
  ];

  const buyerTips = [
    { icon: "📊", tip: "Request 3 years of HOA meeting minutes — special assessments are discussed months before vote" },
    { icon: "💰", tip: "Ask for the current reserve fund balance and percent funded" },
    { icon: "📋", tip: "Request the most recent reserve study (should be within 3-5 years)" },
    { icon: "📉", tip: "A delinquency rate above 5% signals financial stress — more assessments likely" },
    { icon: "🔍", tip: "Search county records for HOA liens — unpaid assessments attach to the property" }
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💸</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HOA Special Assessment Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Know your rights when the HOA sends an unexpected bill</p>
        </div>

        <div style={{ background: "#1e2d45", borderRadius: 8, padding: 16, marginBottom: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, textAlign: "center" }}>
          <div><div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>$500–$5K</div><div style={{ color: "#94a3b8", fontSize: 12 }}>Typical range per unit</div></div>
          <div><div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>30 days</div><div style={{ color: "#94a3b8", fontSize: 12 }}>Min notice required (TX)</div></div>
          <div><div style={{ color: "#F5E642", fontSize: 22, fontWeight: 700 }}>Vote required</div><div style={{ color: "#94a3b8", fontSize: 12 }}>If above bylaw threshold</div></div>
        </div>

        <h2 style={{ color: "#F5E642", marginBottom: 16 }}>Assessment Scenario → Your Rights</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 28 }}>
          {scenarios.map(s => (
            <button key={s.type} onClick={() => setScenario(scenario === s.type ? null : s.type)}
              style={{ background: scenario === s.type ? "#F5E642" : "#1e2d45", border: "none", borderRadius: 8, padding: 16, cursor: "pointer", color: scenario === s.type ? "#0A1628" : "#fff", textAlign: "left" }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{s.type}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{s.amount}</div>
            </button>
          ))}
        </div>

        {scenario && (() => {
          const s = scenarios.find(x => x.type === scenario)!;
          return (
            <div style={{ background: "#1e2d45", borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", margin: "0 0 4px" }}>{s.icon} {s.type} — Your Rights</h3>
              <p style={{ color: "#94a3b8", marginBottom: 16, fontSize: 13 }}>Typical amount: {s.amount} • {s.frequency}</p>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {s.rights.map((r, i) => <li key={i} style={{ color: "#cbd5e1", marginBottom: 7 }}>{r}</li>)}
              </ul>
            </div>
          );
        })()}

        <h2 style={{ color: "#F5E642", marginBottom: 16 }}>Before You Buy — Due Diligence Checklist</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {buyerTips.map((t, i) => (
            <div key={i} style={{ background: "#1e2d45", borderRadius: 8, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>{t.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
