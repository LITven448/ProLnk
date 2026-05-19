import { useState } from 'react';

export default function DFWElectricianLicensingGuide2026() {
  const [currentLevel, setCurrentLevel] = useState<string>("");

  const levels = [
    { id: "none", label: "No License Yet", next: "Apprentice Registration", steps: ["Register as Apprentice with TDLR (tdlr.texas.gov)", "Work under licensed electrician supervision", "Complete 8,000 hours (~4 years) of on-the-job training", "Complete 576 hours of approved classroom instruction", "Pass Texas Journeyman Electrician exam", "Pay $75 TDLR application fee"], timeframe: "4 years to Journeyman" },
    { id: "apprentice", label: "Apprentice", next: "Journeyman Electrician", steps: ["Accumulate 8,000 hours working under a licensed Journeyman or Master", "Complete 576 hours of NEC code classroom training", "Submit work history documentation to TDLR", "Pass the Texas Journeyman Electrician licensing exam (80% passing score)", "Pay $75 TDLR application fee", "Renew every 2 years with 8 CEU hours"], timeframe: "4 years total from start" },
    { id: "journeyman", label: "Journeyman Electrician", next: "Master Electrician", steps: ["Hold Journeyman license for minimum 2 years", "Accumulate additional experience in commercial/industrial", "Complete Master Electrician exam prep course (recommended)", "Pass the Texas Master Electrician exam (harder NEC application test)", "Pay $150 TDLR application fee", "Can now pull permits and run your own electrical business"], timeframe: "2 additional years" },
    { id: "master", label: "Master Electrician", next: "You are fully licensed!", steps: ["Maintain 8 CEU hours every 2-year renewal cycle", "Consider adding AC Contractor license for HVAC work", "Register your business entity with Texas Secretary of State", "Get general liability insurance ($1M minimum for ProLnk verification)", "Join NECA or IEC Texas chapter for networking", "List on ProLnk to start receiving DFW leads immediately"], timeframe: "Ongoing maintenance" },
  ];

  const selected = levels.find(l => l.id === currentLevel);

  const stats = [
    { emoji: "💰", label: "Avg DFW Salary", value: "$78,400/yr" },
    { emoji: "📈", label: "Job Growth", value: "+11% by 2030" },
    { emoji: "🏠", label: "DFW Openings", value: "2,800+/yr" },
    { emoji: "⚡", label: "Top Earners", value: "$105K+/yr" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642", marginBottom: "0.5rem" }}>DFW Electrician Licensing Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "1rem" }}>Texas TDLR licensing pathway — Apprentice to Master Electrician</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{s.emoji}</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642" }}>{s.value}</div>
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642", marginBottom: "1rem" }}>📍 Where are you now?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {levels.map(l => (
              <button key={l.id} onClick={() => setCurrentLevel(l.id)} style={{ backgroundColor: currentLevel === l.id ? "#F5E642" : "#162035", color: currentLevel === l.id ? "#0A1628" : "#fff", border: "2px solid", borderColor: currentLevel === l.id ? "#F5E642" : "#1e3a5f", borderRadius: "8px", padding: "0.75rem", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642" }}>Next Step: {selected.next}</h2>
              <span style={{ backgroundColor: "#162035", color: "#94a3b8", borderRadius: "20px", padding: "0.3rem 0.9rem", fontSize: "0.8rem" }}>⏱ {selected.timeframe}</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {selected.steps.map((step, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ backgroundColor: "#F5E642", color: "#0A1628", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: "#cbd5e1", fontSize: "0.95rem", lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "2rem", backgroundColor: "#0F2040", borderRadius: "12px", padding: "1.25rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <p style={{ color: "#94a3b8", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Ready to get DFW electrician leads?</p>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: "1rem" }}>⚡ Join ProLnk — Get verified and start receiving leads in your service area</p>
        </div>
      </div>
    </div>
  );
}
