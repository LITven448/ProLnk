import { useState } from 'react';

export default function DFWHOAResalePackage2026() {
  const [hoaType, setHoaType] = useState("standard");

  const packages: Record<string, { items: string[]; cost: string; timeline: string; tips: string[] }> = {
    standard: {
      items: ["📋 CC&Rs (Covenants, Conditions & Restrictions)", "📊 HOA financial statements (2 years)", "⚠️ Pending or special assessments", "📅 Meeting minutes (last 12 months)", "🏦 Reserve fund study", "📜 Rules & regulations", "🏘️ Architectural guidelines"],
      cost: "$150–$350",
      timeline: "7 business days (TX Property Code 207)",
      tips: ["Ask if assessments are current before closing", "Check reserve fund — under 10% is a red flag", "Review pending litigation against the HOA", "Confirm pet and rental restrictions match your plans"]
    },
    master: {
      items: ["📋 Master HOA + Sub-HOA CC&Rs (both layers)", "📊 Dual financial statements required", "⚠️ Assessments from both associations", "🗓️ Both boards meeting minutes", "🏗️ Master amenity maintenance schedule", "📜 Sub-association rules", "🔑 Access and gate policies"],
      cost: "$300–$600 (two packages)",
      timeline: "7 business days each (TX Property Code 207)",
      tips: ["DFW master-planned communities often have two HOAs", "Confirm both dues amounts — they stack", "Check if master HOA controls exterior paint/landscaping", "Ask about parking restrictions in both documents"]
    },
    condo: {
      items: ["📋 Condo declaration and bylaws", "📊 Association financials with reserve study", "🏗️ Building insurance certificate", "⚠️ Pending special assessments + litigation", "📅 Board minutes (last 24 months)", "🔧 Building maintenance schedule", "📜 Rules for rentals/pets/alterations"],
      cost: "$200–$400",
      timeline: "7 business days (TX Property Code 207)",
      tips: ["Verify what the master policy covers vs. your HO6 policy", "Check percentage of owner-occupied vs. rental units", "Special assessments for roofs/elevators are common", "Confirm FHA/VA certification status for financing"]
    }
  };

  const pkg = packages[hoaType];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📦</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, margin: "8px 0" }}>DFW HOA Resale Package Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Texas Property Code 207 — what sellers must disclose</p>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 24, justifyContent: "center" }}>
          {[
            { key: "standard", label: "🏠 Standard HOA" },
            { key: "master", label: "🏘️ Master-Planned" },
            { key: "condo", label: "🏢 Condo/Townhome" },
          ].map(b => (
            <button key={b.key} onClick={() => setHoaType(b.key)}
              style={{ padding: "10px 16px", background: hoaType === b.key ? "#F5E642" : "#132038",
                color: hoaType === b.key ? "#0A1628" : "#fff", border: "none", borderRadius: 8,
                cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {b.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#132038", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>💵</div>
            <div style={{ color: "#F5E642", fontSize: 18, fontWeight: 700 }}>{pkg.cost}</div>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>Typical cost to seller</div>
          </div>
          <div style={{ background: "#132038", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>⏱️</div>
            <div style={{ color: "#F5E642", fontSize: 15, fontWeight: 700 }}>{pkg.timeline}</div>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>HOA delivery requirement</div>
          </div>
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: "#F5E642", fontSize: 17, marginBottom: 14 }}>📄 Required Package Contents</h2>
          {pkg.items.map((item, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: i < pkg.items.length - 1 ? "1px solid #1e3a5f" : "none",
              fontSize: 14, color: "#cbd5e1" }}>{item}</div>
          ))}
        </div>

        <div style={{ background: "#132038", borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: "#F5E642", fontSize: 15, marginBottom: 12 }}>💡 What Buyers Look For</h3>
          {pkg.tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#cbd5e1" }}>
              <span style={{ color: "#F5E642" }}>→</span>{tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
