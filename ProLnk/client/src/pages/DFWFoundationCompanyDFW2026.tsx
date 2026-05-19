import { useState } from 'react';

const companies = [
  { type: "Large National Chains", emoji: "🏢", examples: "Olshan, RAM Jack", pros: ["Established reputation", "Broad coverage", "Financing options"], cons: ["Higher overhead costs", "Sales-heavy approach", "Less personalized"], rating: "Good" },
  { type: "Regional DFW Specialists", emoji: "🎯", examples: "Local DFW-focused firms", pros: ["DFW clay expertise", "Engineer-supervised", "Community reputation"], cons: ["Smaller footprint", "May have waitlist"], rating: "Preferred" },
  { type: "Engineer-Supervised Firms", emoji: "🔬", examples: "PE-stamped repair companies", pros: ["Structural engineer oversight", "Documented methodology", "Court-defensible reports"], cons: ["Higher initial cost"], rating: "Best" },
];

const criteria = [
  { id: "severe", label: "🚨 Severe cracking / door failures", rec: "Engineer-Supervised Firms" },
  { id: "moderate", label: "🟡 Moderate settling / minor cracks", rec: "Regional DFW Specialists" },
  { id: "preventive", label: "🟢 Preventive inspection only", rec: "Regional DFW Specialists" },
  { id: "selling", label: "🏠 Selling home / need report", rec: "Engineer-Supervised Firms" },
];

const redFlags = ["No written warranty", "Pressure to sign same day", "No soil test or inspection report", "Unlicensed subcontractors", "No engineer involvement for structural work"];

export default function DFWFoundationCompanyDFW2026() {
  const [situation, setSituation] = useState("");

  const rec = criteria.find(c => c.id === situation);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Foundation Company Guide 2026</h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Navigating the DFW foundation repair landscape — who to trust with your biggest asset</p>
        </div>

        <div style={{ background: "#1E2D45″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642″, fontWeight: 600, marginBottom: 12 }}>🏠 What is your situation?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {criteria.map(c => (
              <button key={c.id} onClick={() => setSituation(c.id)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid", borderColor: situation === c.id ? "#F5E642″ : "#334155", background: situation === c.id ? "#F5E64220" : "transparent", color: situation === c.id ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 14, textAlign: "left" }}>
                {c.label}
              </button>
            ))}
          </div>
          {rec && <p style={{ color: "#4ADE80″, marginTop: 12, fontSize: 14 }}>✅ Recommended company type: <strong>{rec.rec}</strong></p>}
        </div>

        <div style={{ display: "grid", gap: 14, marginBottom: 24 }}>
          {companies.map(co => (
            <div key={co.type} style={{ background: "#1E2D45″, borderRadius: 12, padding: 18, borderLeft: `4px solid ${co.rating === "Best" ? "#F5E642" : co.rating === "Preferred" ? "#4ADE80" : "#64748B"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{co.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{co.type}</div>
                  <div style={{ color: "#64748B", fontSize: 13 }}>Examples: {co.examples}</div>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 12, padding: "3px 8px", borderRadius: 6, background: "#0A1628″, color: co.rating === "Best" ? "#F5E642" : co.rating === "Preferred" ? "#4ADE80" : "#94A3B8" }}>{co.rating}</span>
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  {co.pros.map(p => <div key={p} style={{ fontSize: 13, color: "#4ADE80″, marginBottom: 2 }}>✓ {p}</div>)}
                </div>
                <div style={{ flex: 1 }}>
                  {co.cons.map(c => <div key={c} style={{ fontSize: 13, color: "#F87171″, marginBottom: 2 }}>✗ {c}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45″, borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <p style={{ color: "#F87171″, fontWeight: 600, marginBottom: 10 }}>🚩 Red Flags — Walk Away</p>
          {redFlags.map(f => <div key={f} style={{ fontSize: 13, color: "#94A3B8″, marginBottom: 4 }}>⚠️ {f}</div>)}
        </div>

        <div style={{ background: "#1E2D45″, borderRadius: 12, padding: 18, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642″, fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk Vets All Foundation Companies</p>
          <p style={{ color: "#94A3B8″, fontSize: 14, margin: 0 }}>Charter members access only pre-vetted, engineer-supervised foundation companies. ProLnk screens for licensing, warranty, and DFW clay expertise.</p>
        </div>
      </div>
    </div>
  );
}