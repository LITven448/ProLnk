import { useState } from 'react';

export default function DFWHOAFinancialsGuide2026() {
  const [hoaType, setHoaType] = useState<string | null>(null);

  const hoaTypes = [
    {
      type: "Single-Family HOA",
      icon: "🏡",
      size: "50–500 homes",
      checklist: [
        { label: "Reserve Fund %", target: "70%+ funded (per reserve study)", flag: "Under 30% is a red flag" },
        { label: "Annual Budget", target: "$400–$800/unit/year typical", flag: "Sudden jumps signal problems" },
        { label: "Delinquency Rate", target: "Under 5% of homeowners", flag: "Over 10% is a serious warning" },
        { label: "Special Assessments", target: "None in past 3 years ideally", flag: "Multiple recent assessments = poor planning" },
        { label: "Pending Litigation", target: "None", flag: "Any active lawsuits = financial risk" },
        { label: "Management Company", target: "Licensed TX HOA manager", flag: "Self-managed HOAs have higher variance" }
      ]
    },
    {
      type: "Condo HOA",
      icon: "🏢",
      size: "20–200 units",
      checklist: [
        { label: "Reserve Fund %", target: "80%+ funded recommended", flag: "Under 50% = likely assessment coming" },
        { label: "Insurance Coverage", target: "Master policy covers structure", flag: "Gaps in coverage can mean owner liability" },
        { label: "Delinquency Rate", target: "Under 3% (Fannie Mae threshold)", flag: "Over 15% = FHA/VA financing may be blocked" },
        { label: "Owner-Occupied Ratio", target: "51%+ owner-occupied", flag: "High investor ratio affects loan options" },
        { label: "Elevator/HVAC Reserves", target: "Separate line items in budget", flag: "Missing = likely underfunded" },
        { label: "Phase of Development", target: "HOA fully transitioned from developer", flag: "Developer-controlled HOAs can have conflicts" }
      ]
    },
    {
      type: "Master-Planned Community",
      icon: "🏘️",
      size: "500+ homes",
      checklist: [
        { label: "Sub-Association Fees", target: "Understand all fee layers", flag: "Some DFW communities have 2-3 HOA layers" },
        { label: "Amenity Reserve Fund", target: "Clubhouse/pool separately funded", flag: "Aging amenities = coming assessment" },
        { label: "Commercial Component", target: "Retail/commercial must not cross-subsidize", flag: "Entanglement creates instability" },
        { label: "Utility District Overlap", target: "MUD/PID fees separate from HOA", flag: "DFW buyers often pay both — clarify all fees" },
        { label: "Developer Involvement", target: "Transition complete", flag: "Developer still on board = potential conflict" },
        { label: "Annual Audit", target: "Independent CPA audit yearly", flag: "No audit = higher risk of mismanagement" }
      ]
    }
  ];

  const keyMetrics = [
    { metric: "Reserve Fund Funded %", healthy: "70%+", caution: "30–70%", danger: "Under 30%", icon: "💰" },
    { metric: "Delinquency Rate", healthy: "Under 5%", caution: "5–10%", danger: "Over 10%", icon: "📉" },
    { metric: "Reserve Study Age", healthy: "Under 3 years", caution: "3–5 years", danger: "Over 5 years", icon: "📅" },
    { metric: "Budget Increases", healthy: "Under 3%/yr", caution: "3–8%/yr", danger: "Over 8%/yr", icon: "📈" }
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📊</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HOA Financial Health Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Evaluate HOA finances before you commit — avoid buying into a financial crisis</p>
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: 14 }}>Key Financial Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 28 }}>
          {keyMetrics.map((m, i) => (
            <div key={i} style={{ background: "#1e2d45″, borderRadius: 8, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{m.metric}</span>
              </div>
              <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ color: "#4ade80″ }}>✅ Healthy: {m.healthy}</span>
                <span style={{ color: "#fbbf24″ }}>⚠️ Caution: {m.caution}</span>
                <span style={{ color: "#f87171″ }}>🚨 Danger: {m.danger}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>HOA Type + Size → Financial Checklist</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {hoaTypes.map(h => (
            <button key={h.type} onClick={() => setHoaType(hoaType === h.type ? null : h.type)}
              style={{ flex: 1, background: hoaType === h.type ? "#F5E642″ : "#1e2d45", border: "none", borderRadius: 8, padding: 14, cursor: "pointer", color: hoaType === h.type ? "#0A1628" : "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{h.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 12, marginTop: 4 }}>{h.type}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{h.size}</div>
            </button>
          ))}
        </div>

        {hoaType && (() => {
          const h = hoaTypes.find(x => x.type === hoaType)!;
          return (
            <div style={{ background: "#1e2d45″, borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, margin: "0 0 16px" }}>{h.icon} {h.type} Financial Checklist</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {h.checklist.map((item, i) => (
                  <div key={i} style={{ background: "#0A1628″, borderRadius: 6, padding: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: "#F5E642″, fontWeight: 600, fontSize: 13 }}>{item.label}</span>
                      <span style={{ color: "#4ade80″, fontSize: 12 }}>✅ {item.target}</span>
                    </div>
                    <div style={{ color: "#f87171″, fontSize: 12 }}>🚨 {item.flag}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <div style={{ background: "#F5E642″, borderRadius: 8, padding: "12px 20px", color: "#0A1628" }}>
          <strong>Pro Tip:</strong> In Texas, you can request HOA financial records as a prospective buyer through the listing agent. The seller must provide a resale certificate that includes financials, current fees, and any pending special assessments.
        </div>
      </div>
    </div>
  );
}
