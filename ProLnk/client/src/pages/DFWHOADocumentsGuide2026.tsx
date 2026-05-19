import { useState } from 'react';

export default function DFWHOADocumentsGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const documents = [
    {
      type: "CC&Rs",
      icon: "📋",
      title: "Covenants, Conditions & Restrictions",
      desc: "The master document governing what you can and cannot do with your property.",
      lookFor: [
        "Pet restrictions (size, breed, number)",
        "Fence height and material requirements",
        "Home business prohibitions",
        "Rental restrictions or Airbnb bans",
        "Exterior modification approvals required",
        "Parking rules for guests and commercial vehicles"
      ]
    },
    {
      type: "Bylaws",
      icon: "🏛️",
      title: "HOA Bylaws",
      desc: "How the HOA is governed — board structure, elections, meetings, and voting rights.",
      lookFor: [
        "How many board members and terms",
        "How to vote in board elections",
        "Quorum requirements for meetings",
        "How assessments are approved",
        "Your right to attend and speak at meetings",
        "How to run for the board yourself"
      ]
    },
    {
      type: "Rules",
      icon: "📏",
      title: "Rules & Regulations",
      desc: "Specific day-to-day rules — often updated more frequently than CC&Rs.",
      lookFor: [
        "Trash can placement and pickup schedules",
        "Lawn maintenance standards",
        "Pool and amenity hours",
        "Move-in/move-out procedures",
        "Holiday decoration time limits",
        "Noise and nuisance policies"
      ]
    },
    {
      type: "Reserve Study",
      icon: "💰",
      title: "Reserve Study",
      desc: "The HOA financial health report — predicts future major repair costs and funding status.",
      lookFor: [
        "Percent funded (70%+ is healthy, under 30% is red flag)",
        "Upcoming major expenses in next 5 years",
        "Roof replacement timeline",
        "Pool or amenity renovation schedule",
        "Whether special assessments are likely",
        "Date of last study (should be within 3-5 years)"
      ]
    }
  ];

  const timing = [
    { phase: "Before Making Offer", tip: "Request all documents from listing agent — seller must disclose." },
    { phase: "During Option Period", tip: "Review thoroughly — you can exit penalty-free if documents are unacceptable." },
    { phase: "At Closing", tip: "You acknowledge receipt of HOA documents in Texas disclosure." },
    { phase: "After Moving In", tip: "Request updated financials and meeting minutes annually." }
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📄</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, margin: "8px 0" }}>DFW HOA Documents Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Know what you're agreeing to before you buy</p>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 8, padding: "12px 20px", marginBottom: 28, color: "#0A1628", fontWeight: 600 }}>
          ⚠️ Texas law requires sellers to disclose HOA documents before closing — always request them during your option period.
        </div>

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>Select a Document Type</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 28 }}>
          {documents.map(doc => (
            <button key={doc.type} onClick={() => setSelected(selected === doc.type ? null : doc.type)}
              style={{ background: selected === doc.type ? "#F5E642″ : "#1e2d45", border: "none", borderRadius: 8, padding: "16px", cursor: "pointer", color: selected === doc.type ? "#0A1628" : "#fff", textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: 28 }}>{doc.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{doc.type}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{doc.title}</div>
            </button>
          ))}
        </div>

        {selected && (() => {
          const doc = documents.find(d => d.type === selected)!;
          return (
            <div style={{ background: "#1e2d45″, borderRadius: 10, padding: 24, marginBottom: 28, borderLeft: "4px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642″, margin: "0 0 8px" }}>{doc.icon} {doc.title}</h3>
              <p style={{ color: "#94a3b8″, marginBottom: 16 }}>{doc.desc}</p>
              <h4 style={{ color: "#fff", marginBottom: 10 }}>What to Look For:</h4>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {doc.lookFor.map((item, i) => (
                  <li key={i} style={{ color: "#cbd5e1″, marginBottom: 6 }}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })()}

        <h2 style={{ color: "#F5E642″, marginBottom: 16 }}>When to Request Documents</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {timing.map((t, i) => (
            <div key={i} style={{ background: "#1e2d45″, borderRadius: 8, padding: "14px 18px", display: "flex", gap: 16 }}>
              <span style={{ color: "#F5E642″, fontWeight: 700, minWidth: 160 }}>{t.phase}</span>
              <span style={{ color: "#94a3b8″ }}>{t.tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
