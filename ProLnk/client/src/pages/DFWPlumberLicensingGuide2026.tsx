import { useState } from 'react';

export default function DFWPlumberLicensingGuide2026() {
  const [currentStatus, setCurrentStatus] = useState<string>("");

  const pathways = [
    { id: "none", label: "No License Yet", next: "Start as Apprentice Plumber", steps: ["Register with Texas State Board of Plumbing Examiners (TSBPE)", "Find a licensed Master Plumber to work under", "Begin accumulating 4,000 hours (~2 years) of supervised work", "No formal exam required at apprentice level", "Apprentice card costs $20 from TSBPE", "Keep detailed log of hours worked on each project type"], timeframe: "2 years to Journeyman eligibility" },
    { id: "apprentice", label: "Apprentice Plumber", next: "Journeyman Plumber", steps: ["Accumulate 4,000 hours under licensed Journeyman or Master Plumber", "Complete approved plumbing apprenticeship program (UA Local 100 in DFW)", "Study International Plumbing Code and Texas plumbing rules", "Pass the TSBPE Journeyman Plumber exam (multiple choice, 80% required)", "Pay $75 TSBPE licensing fee", "Journeyman can work independently but cannot pull permits alone"], timeframe: "4 years total" },
    { id: "journeyman", label: "Journeyman Plumber", next: "Master Plumber", steps: ["Hold Journeyman license for 2+ years", "Accumulate additional experience in gas, water, and drain systems", "Complete TSBPE-approved Master Plumber exam prep", "Pass the Master Plumber exam (code mastery and business law section)", "Pay $175 TSBPE application fee", "Master license allows permit-pulling and running your own plumbing company"], timeframe: "2 additional years" },
    { id: "master", label: "Master Plumber", next: "You are fully licensed!", steps: ["Complete 6 CEU hours per 3-year renewal cycle", "Optionally add Medical Gas Installer certification for hospital work", "Register business with Texas Secretary of State ($300 LLC filing)", "Obtain general liability insurance ($1M min for ProLnk verification)", "Get bonded ($10,000 plumber bond typical in DFW)", "Join PHCC Texas or ASA for networking and referrals"], timeframe: "Ongoing renew every 3 years" },
  ];

  const selected = pathways.find(p => p.id === currentStatus);

  const stats = [
    { emoji: "💰", label: "Avg DFW Salary", value: "$72,100/yr" },
    { emoji: "📈", label: "Job Growth", value: "+5% by 2030″ },
    { emoji: "🏠", label: "DFW Demand", value: "High — housing boom" },
    { emoji: "🔧", label: "Top Earners", value: "$98K+/yr" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🔧</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Plumber Licensing Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Texas TSBPE licensing pathway — Apprentice to Master Plumber</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{s.emoji}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″ }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8″ }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>💧 What is your current status?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {pathways.map(p => (
              <button key={p.id} onClick={() => setCurrentStatus(p.id)} style={{ backgroundColor: currentStatus === p.id ? "#F5E642″ : "#162035", color: currentStatus === p.id ? "#0A1628" : "#fff", border: "2px solid", borderColor: currentStatus === p.id ? "#F5E642" : "#1e3a5f", borderRadius: "8px", padding: "0.75rem", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″ }}>Next Step: {selected.next}</h2>
              <span style={{ backgroundColor: "#162035″, color: "#94a3b8", borderRadius: "20px", padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>⏱ {selected.timeframe}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {selected.steps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ backgroundColor: "#F5E642″, color: "#0A1628", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: "#cbd5e1″, fontSize: "0.95rem", lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2rem", backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.25rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, marginBottom: "0.5rem", fontSize: "0.9rem" }}>Licensed plumber ready for DFW jobs?</p>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>🔧 Join ProLnk — Connect with DFW homeowners needing plumbing services</p>
        </div>
      </div>
    </div>
  );
}
