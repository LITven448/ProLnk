import { useState } from 'react';

const situations = [
  { label: "Before any storm season", emoji: "📸", steps: ["Photograph all roof planes from ground level", "Document gutters, downspouts, AC unit fins", "Note condition of all vents, skylights, flashing", "Store dated photos in cloud — update annually"] },
  { label: "Storm is starting now", emoji: "⏱️", steps: ["Note exact storm start time (screenshots work)", "Log hail size if visible from window", "Do NOT go outside during storm", "Note storm end time — insurers verify with NOAA data"] },
  { label: "Within 24 hours after storm", emoji: "🔍", steps: ["Photograph all soft metals: gutters, AC fins, vents, flashing", "Look for dents on patio furniture or vehicles as proxy", "Photograph any broken windows or skylights", "Call ProLnk for a licensed contractor inspection"] },
  { label: "Day 2–7 post storm", emoji: "📋", steps: ["File insurance claim with storm date and noted time", "Request Xactimate estimate from contractor", "Do NOT sign AOB (Assignment of Benefits) documents", "Photograph any interior water intrusion immediately"] },
  { label: "Adjuster visit", emoji: "🧑‍💼", steps: ["Have contractor present during adjuster inspection", "Walk roof together — point out all damage areas", "Request scope of loss in writing before they leave", "Note adjuster name, company, claim number"] },
];

export default function DFWHailDocumentGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? situations[selected] : null;

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📷</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Hail Documentation Guide 2026
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Select your situation to get a documentation priority checklist</p>
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
          {situations.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: selected === i ? "#132240" : "#0f1e38",
                border: `2px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 14, textAlign: "left", width: "100%",
              }}
            >
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15 }}>{s.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#132240", border: "2px solid #F5E642", borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{active.emoji}</div>
            <h2 style={{ color: "#F5E642", fontSize: 18, margin: "0 0 16px" }}>{active.label}</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {active.steps.map((step, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#F5E642", fontWeight: 800, minWidth: 22 }}>{j + 1}.</span>
                  <span style={{ color: "#cbd5e1", fontSize: 14 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#132240", borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>⚡ ProLnk DFW Tip</div>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
            A contractor inspection within 24 hours gives you the strongest documentation for your claim. ProLnk connects you with DFW-licensed roofers who know how to document for Texas insurance adjusters.
          </p>
        </div>
      </div>
    </div>
  );
}