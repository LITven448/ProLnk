import { useState } from 'react';

const laws = [
  {
    name: "Texas Property Code Chapter 209",
    short: "HOA Law",
    emoji: "🏘️",
    applies: "HOA governance and homeowner rights",
    keyPoints: [
      "HOAs must provide 10-day written notice before imposing fines",
      "Homeowners have right to attend board meetings and speak",
      "HOAs cannot restrict Texas or US flag display",
      "HOAs cannot prohibit drought-tolerant landscaping (post-2021 amendment)",
      "HOAs must hold elections every 2-3 years per bylaws",
      "Annual financial report must be available to homeowners"
    ],
    dfwRelevance: "Critical for the 70%+ of DFW homeowners who live in HOA communities. Plano, Frisco, McKinney, Allen, Flower Mound have large HOA-governed neighborhoods.",
    actionable: "Request your HOA's financial statements annually. Attend board meetings. Document all HOA communications in writing."
  },
  {
    name: "Texas Deceptive Trade Practices Act (DTPA)",
    short: "DTPA",
    emoji: "⭐",
    applies: "Protection from contractor fraud and misrepresentation",
    keyPoints: [
      "Applies to ANY consumer transaction including home services",
      "Triple damages if contractor acted knowingly",
      "Attorney fees awarded if you win",
      "Must send 60-day demand letter before filing suit",
      "2-year statute of limitations from discovery of violation",
      "Covers false advertising, bait-and-switch, unlicensed work"
    ],
    dfwRelevance: "Your most powerful tool against bad contractors. DFW has high rates of storm-chasing roofers and unlicensed HVAC/electrical contractors after severe weather events.",
    actionable: "Document everything in writing. Keep all estimates, contracts, and communications. Take timestamped photos of defective work."
  },
  {
    name: "RESPA (Real Estate Settlement Procedures Act)",
    short: "RESPA",
    emoji: "🏠",
    applies: "Real estate transactions and mortgage services",
    keyPoints: [
      "Lenders cannot accept kickbacks from title/escrow companies",
      "You have right to receive Loan Estimate within 3 business days",
      "Closing Disclosure must be provided 3 days before closing",
      "You can choose your own title insurance company",
      "Escrow account requirements limit what lenders can hold",
      "Complaint to CFPB if lender violates RESPA"
    ],
    dfwRelevance: "DFW's hot housing market creates pressure to waive rights. Never waive your right to the 3-day closing disclosure review period.",
    actionable: "Get the Loan Estimate within 3 days of application. Compare it line-by-line to the Closing Disclosure. Question any fee that changed."
  },
  {
    name: "TCPA (Telephone Consumer Protection Act)",
    short: "TCPA",
    emoji: "📱",
    applies: "Unsolicited contractor calls, texts, and marketing",
    keyPoints: [
      "Contractors cannot auto-dial or text without prior consent",
      "National Do Not Call Registry applies to contractors",
      "Violation = $500-$1,500 per call/text",
      "Must honor opt-out requests immediately",
      "Applies to storm chasers and door-to-door contractor solicitation (partially)",
      "Class action suits have resulted in massive settlements"
    ],
    dfwRelevance: "After DFW hailstorms, roofers and HVAC contractors mass-text entire neighborhoods. You can sue for $500 per unsolicited text if you have evidence.",
    actionable: "Register at DoNotCall.gov. Document unsolicited contractor texts with screenshots and dates. Report violations at FTC.gov."
  },
  {
    name: "Texas Lemon Law (Home Warranty Version)",
    short: "Home Warranty Law",
    emoji: "🍋",
    applies: "New construction defects and builder warranties",
    keyPoints: [
      "Texas Residential Construction Liability Act (RCLA) governs new construction defects",
      "Builder must have opportunity to repair before homeowner can sue",
      "1-year workmanship warranty required for new homes",
      "2-year systems warranty (HVAC, plumbing, electrical)",
      "10-year structural defect warranty required",
      "RCLA requires 60-day notice before filing suit"
    ],
    dfwRelevance: "DFW is one of the largest new construction markets in the US. Lennar, DR Horton, Meritage — all subject to RCLA. Document all defects within warranty periods.",
    actionable: "Inspect your new DFW home within 11 months of closing. Submit a written punch list to your builder before the 1-year warranty expires."
  },
  {
    name: "Texas Property Tax Protest Rights",
    short: "Tax Protest",
    emoji: "💰",
    applies: "Annual property tax assessments in all DFW counties",
    keyPoints: [
      "You have right to protest your appraisal value annually",
      "Protest deadline: May 15 or 30 days after appraisal notice",
      "Informal hearing with appraisal district appraiser available",
      "Formal Appraisal Review Board (ARB) hearing if informal fails",
      "Binding arbitration available for residential under $5M",
      "Equal and uniform appraisal is a constitutional right"
    ],
    dfwRelevance: "Dallas, Tarrant, Collin, Denton counties — all have seen 10-20% annual increases. Protest every year. Most DFW homeowners who protest save money.",
    actionable: "Compare your appraisal to 3-5 similar homes in your neighborhood. If yours is higher, you have a strong equal-and-uniform argument."
  },
];

const concerns = [
  { concern: "My HOA is trying to fine me", law: "Texas Property Code Chapter 209" },
  { concern: "A contractor deceived or defrauded me", law: "Texas Deceptive Trade Practices Act (DTPA)" },
  { concern: "I got unsolicited contractor texts after a storm", law: "TCPA (Telephone Consumer Protection Act)" },
  { concern: "My new construction home has defects", law: "Texas Lemon Law (Home Warranty Version)" },
  { concern: "My property tax seems too high", law: "Texas Property Tax Protest Rights" },
  { concern: "I'm closing on a home and fees changed", law: "RESPA (Real Estate Settlement Procedures Act)" },
];

export default function DFWTexasHomeLawGuide2026() {
  const [selectedConcern, setSelectedConcern] = useState("");
  const [selectedLaw, setSelectedLaw] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("laws");

  const matchedLaw = selectedConcern ? laws.find(l => l.name === concerns.find(c => c.concern === selectedConcern)?.law) : null;
  const detailLaw = laws.find(l => l.name === selectedLaw);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Texas Homeowner Law Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Key Texas laws every DFW homeowner should know — HOA, DTPA, RESPA, TCPA, and more</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {["laws", "lookup"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, backgroundColor: activeTab === tab ? "#F5E642" : "#1e2d45", color: activeTab === tab ? "#0A1628" : "#94a3b8" }}>
              {tab === "laws" ? "📋 All Laws" : "🔍 Concern Lookup"}
            </button>
          ))}
        </div>

        {activeTab === "laws" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {laws.map((law, i) => (
              <div key={i}>
                <button onClick={() => setSelectedLaw(selectedLaw === law.name ? null : law.name)} style={{ width: "100%", backgroundColor: selectedLaw === law.name ? "#1e3a5f" : "#1e2d45", borderRadius: 10, padding: 16, border: selectedLaw === law.name ? "1px solid #F5E642" : "1px solid transparent", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 24 }}>{law.emoji}</span><div><div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14 }}>{law.name}</div><div style={{ color: "#94a3b8", fontSize: 12 }}>{law.applies}</div></div></div>
                    <span style={{ backgroundColor: "#0f2027", borderRadius: 6, padding: "2px 8px", color: "#60a5fa", fontSize: 11 }}>{law.short}</span>
                  </div>
                </button>
                {selectedLaw === law.name && (
                  <div style={{ backgroundColor: "#1e2d45", borderRadius: "0 0 10px 10px", padding: 16, marginTop: -4 }}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 8 }}>KEY PROVISIONS</div>
                      <ul style={{ color: "#cbd5e1", fontSize: 13, paddingLeft: 20, margin: 0 }}>{law.keyPoints.map((pt, j) => <li key={j} style={{ marginBottom: 4 }}>{pt}</li>)}</ul>
                    </div>
                    <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: 10, marginBottom: 10 }}><div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>🏙️ DFW RELEVANCE</div><p style={{ color: "#60a5fa", fontSize: 13, margin: 0 }}>{law.dfwRelevance}</p></div>
                    <div style={{ backgroundColor: "#14532d", borderRadius: 8, padding: 10 }}><div style={{ color: "#4ade80", fontSize: 11, marginBottom: 4 }}>✅ WHAT TO DO</div><p style={{ color: "#86efac", fontSize: 13, margin: 0 }}>{law.actionable}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "lookup" && (
          <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 15 }}>🔍 What's Your Legal Concern?</h3>
            <select value={selectedConcern} onChange={e => setSelectedConcern(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 14, marginBottom: 16 }}>
              <option value="">Select your situation...</option>
              {concerns.map(c => <option key={c.concern} value={c.concern}>{c.concern}</option>)}
            </select>
            {matchedLaw && (
              <div style={{ backgroundColor: "#0A1628", borderRadius: 10, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><span style={{ fontSize: 28 }}>{matchedLaw.emoji}</span><div><div style={{ color: "#F5E642", fontWeight: 700, fontSize: 15 }}>{matchedLaw.name}</div><div style={{ color: "#94a3b8", fontSize: 12 }}>{matchedLaw.short}</div></div></div>
                <ul style={{ color: "#cbd5e1", fontSize: 13, paddingLeft: 20, marginBottom: 12 }}>{matchedLaw.keyPoints.map((pt, i) => <li key={i} style={{ marginBottom: 4 }}>{pt}</li>)}</ul>
                <div style={{ backgroundColor: "#14532d", borderRadius: 8, padding: 10 }}><div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>✅ YOUR NEXT STEP</div><p style={{ color: "#86efac", fontSize: 13, margin: 0 }}>{matchedLaw.actionable}</p></div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#475569", fontSize: 11 }}>ProLnk DFW · Homeowner Law Guide · 2026</div>
      </div>
    </div>
  );
}
