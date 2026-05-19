import { useState } from 'react';

export default function DFWHVACLicensingGuide2026() {
  const [careerStage, setCareerStage] = useState<string>("");

  const stages = [
    { id: "starting", label: "Just Starting Out", next: "HVAC Technician Trainee", steps: ["Enroll in HVAC program at Dallas College, Tarrant County College, or UTI (9-24 months)", "Study refrigeration cycles, electrical, sheet metal, and load calculations", "Register as HVAC Technician Trainee with TDLR (tdlr.texas.gov)", "Work under licensed HVAC Contractor to gain hours", "EPA 608 Universal certification required before handling refrigerants (Prometric test centers)", "Study NATE certification for career advancement"], timeframe: "1-2 years to first license" },
    { id: "technician", label: "HVAC Technician", next: "HVAC Contractor License", steps: ["Hold HVAC Technician registration with 2+ years field experience", "Complete 2,000 hours of HVAC installation and service work", "Pass the Texas HVAC Contractor exam through TDLR", "Exam covers: refrigeration, electrical, gas, load calculations, code", "Pay $125 TDLR Contractor application fee", "Contractor license allows you to pull permits and run own business"], timeframe: "2 years of experience required" },
    { id: "contractor", label: "HVAC Contractor", next: "Business Growth Mode", steps: ["Maintain EPA 608 Universal certification (no expiration, keep card)", "Complete 8 CEU hours per TDLR 2-year renewal cycle", "Add gas licensing if doing gas furnace work (separate TDLR license)", "Consider NATE certification in Residential or Commercial AC", "Get general liability insurance ($1M minimum for ProLnk)", "Register LLC with Texas SOS and get EIN for subcontractors"], timeframe: "Ongoing renewal every 2 years" },
    { id: "business", label: "Running HVAC Business", next: "Scale with ProLnk Leads", steps: ["List on ProLnk to receive verified DFW homeowner leads", "Maintain Certificate of Insurance for each job site", "Keep TDLR Contractor license current (required for all permitted work)", "Consider adding refrigeration contractor license for commercial work", "Track 1099 subcontractors — required if paying $600+ annually", "Join ACCA Texas or RSES for technical training and networking"], timeframe: "Build your DFW market share" },
  ];

  const selected = stages.find(s => s.id === careerStage);

  const stats = [
    { emoji: "💰", label: "Avg DFW Salary", value: "$68,200/yr" },
    { emoji: "🌡️", label: "DFW Climate", value: "100+ days 100°F+" },
    { emoji: "📈", label: "Job Growth", value: "+6% by 2030″ },
    { emoji: "❄️", label: "Peak Season", value: "Apr–Sep (AC)" },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628″, color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>❄️</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW HVAC Licensing Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Texas TDLR HVAC licensing + EPA 608 — full career pathway</p>
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
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🌡️ What is your current career stage?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setCareerStage(s.id)} style={{ backgroundColor: careerStage === s.id ? "#F5E642″ : "#162035", color: careerStage === s.id ? "#0A1628" : "#fff", border: "2px solid", borderColor: careerStage === s.id ? "#F5E642" : "#1e3a5f", borderRadius: "8px", padding: "0.75rem", fontWeight: 600, cursor: "pointer", textAlign: "left", fontSize: "0.9rem" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ backgroundColor: "#0F2040″, borderRadius: "12px", padding: "1.5rem", border: "2px solid #F5E642" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F5E642″ }}>Next: {selected.next}</h2>
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
          <p style={{ color: "#94a3b8″, marginBottom: "0.5rem", fontSize: "0.9rem" }}>DFW summers are brutal — homeowners need HVAC pros NOW</p>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>❄️ Join ProLnk — Get verified HVAC leads in your DFW service area</p>
        </div>
      </div>
    </div>
  );
}
