import { useState } from 'react';

export default function HomeHealthVaultForBuyers() {
  const [concern, setConcern] = useState<string | null>(null);

  const concerns = [
    { type: "🔥 HVAC Lifespan", reveal: "Exact install date, model number, all service records, filter change history, and remaining warranty. Know if you need to budget for replacement in year 2 or year 12." },
    { type: "💧 Plumbing Issues", reveal: "Full leak history, pipe material (copper vs. PVC vs. galvanized), water heater age and service logs, and any sewer camera inspection reports." },
    { type: "🏠 Roof Condition", reveal: "Installation year, shingle type, all repair patches, storm damage claims with insurance outcomes, and current warranty status. No more mystery roofs." },
    { type: "🌿 Foundation Integrity", reveal: "Soil reports, crack inspection history, waterproofing treatments, any structural engineer assessments, and before/after repair documentation." },
    { type: "🛡️ Mold or Air Quality", reveal: "Mold remediation reports, radon test results, air quality assessments, dehumidifier installation records, and any disclosure documentation." },
    { type: "⚡ Electrical Safety", reveal: "Panel age and capacity, any upgrades to 200-amp service, GFCI outlet records, inspection dates, and any open permits that need resolution." },
    { type: "🔧 Appliance Age", reveal: "Purchase dates and model numbers for all major appliances, service history, active warranties, and any recall notices — everything transferable." },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔑</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 12 }}>Buy With Confidence</h1>
          <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>
            The ProLnk Vault gives buyers complete visibility into a home's true history — before you make an offer, not after you close.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { icon: "📋", title: "Review Before You Offer", desc: "Access full maintenance history during due diligence — not just the seller disclosure form." },
            { icon: "💰", title: "Negotiate From Facts", desc: "Use documented repair history to support your offer price with evidence, not emotion." },
            { icon: "⏱️", title: "Faster Inspection", desc: "Inspectors spend less time guessing when records already document the home's history." },
            { icon: "🔒", title: "Warranties Transfer", desc: "All active warranties in the Vault transfer to you at closing — documented and verified." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0f1f3d", borderRadius: 12, padding: 20, border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #1e3a6e" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 6 }}>What Does the Vault Reveal?</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>Select your biggest concern about a home purchase:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {concerns.map((c) => (
              <button key={c.type} onClick={() => setConcern(concern === c.type ? null : c.type)}
                style={{ background: concern === c.type ? "#F5E642" : "#1e3a6e", color: concern === c.type ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                {c.type}
              </button>
            ))}
          </div>
          {concern && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>{concern} — Vault Records Include:</div>
              <div style={{ color: "#e2e8f0", lineHeight: 1.7, fontSize: 15 }}>{concerns.find((c) => c.type === concern)?.reveal}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <div style={{ color: "#F5E642", fontWeight: 700, fontSize: 16 }}>🏦 Look for the ProLnk Vault badge when searching homes</div>
        </div>
      </div>
    </div>
  );
}
