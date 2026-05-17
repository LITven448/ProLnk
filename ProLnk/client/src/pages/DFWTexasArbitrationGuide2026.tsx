import { useState } from 'react';

const pathways = [
  {
    name: "TDLR Complaint",
    emoji: "🏛️",
    bestFor: "Licensed trades (HVAC, plumbing, electrical)",
    cost: "Free",
    timeframe: "60-120 days",
    maxAmount: "License suspension / fines (no $ to you)",
    process: ["File complaint at TDLR.texas.gov", "Investigator assigned within 30 days", "Contractor has opportunity to respond", "Hearing if violation found", "License suspension/revocation possible"],
    pros: "Free, can strip contractor's license, sends strong signal",
    cons: "No monetary award to you. Contractor keeps your money.",
    dtpaApplies: false,
  },
  {
    name: "Small Claims Court",
    emoji: "⚖️",
    bestFor: "Disputes under $20,000",
    cost: "$80-150 filing fee",
    timeframe: "30-90 days",
    maxAmount: "$20,000",
    process: ["File in Justice Court in contractor's county", "Serve contractor with citation", "Hearing scheduled (30-60 days)", "Judge rules — no jury in small claims", "Collect via wage garnishment or lien if you win"],
    pros: "Fast, cheap, no attorney needed, binding judgment",
    cons: "Collecting the judgment can be hard if contractor is broke or uninsured",
    dtpaApplies: true,
  },
  {
    name: "Texas DTPA (Deceptive Trade Practices Act)",
    emoji: "⭐",
    bestFor: "Fraud, false promises, misrepresentation",
    cost: "Attorney fees (often contingency)",
    timeframe: "6-18 months",
    maxAmount: "3x damages + attorney fees",
    process: ["Send 60-day DTPA demand letter (required)", "Attorney files DTPA suit", "Discovery phase (3-6 months)", "Settlement or trial", "If you win: up to 3x economic damages + attorney fees"],
    pros: "Triple damages and attorney fees make it powerful. Attorneys take cases on contingency.",
    cons: "Slower, must prove intentional deception. 60-day waiting period required.",
    dtpaApplies: true,
  },
  {
    name: "AAA / JAMS Arbitration",
    emoji: "🤝",
    bestFor: "When your contract requires arbitration",
    cost: "$1,750+ filing fee (AAA consumer rules help)",
    timeframe: "3-9 months",
    maxAmount: "Whatever arbitrator awards",
    process: ["Review contract for arbitration clause", "File demand with AAA or JAMS", "Arbitrator selection (15-30 days)", "Discovery and hearings", "Binding award issued"],
    pros: "Private, often faster than court, arbitrators know construction",
    cons: "Expensive, limited appeal rights, check if consumer AAA rules apply (better for homeowners)",
    dtpaApplies: false,
  },
  {
    name: "District / County Court",
    emoji: "🏛️",
    bestFor: "Disputes over $20,000 or complex claims",
    cost: "$350-600 filing fee + attorney",
    timeframe: "12-36 months",
    maxAmount: "Unlimited",
    process: ["File suit in county where work was done", "Formal discovery process (depositions, documents)", "Mediation required in most DFW courts", "Trial if no settlement", "Appeal possible"],
    pros: "Full discovery, expert witnesses, jury option",
    cons: "Slow and expensive. Most cases settle before trial.",
    dtpaApplies: true,
  },
];

export default function DFWTexasArbitrationGuide2026() {
  const [disputeAmount, setDisputeAmount] = useState("");
  const [disputeType, setDisputeType] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [hasArbitrationClause, setHasArbitrationClause] = useState(false);

  const getRecommendation = () => {
    if (!disputeAmount || !disputeType) return null;
    const amount = parseInt(disputeAmount);
    if (hasArbitrationClause) return "AAA / JAMS Arbitration";
    if (amount <= 5000) return "Small Claims Court";
    if (amount <= 20000 && disputeType !== "fraud") return "Small Claims Court";
    if (disputeType === "fraud" || disputeType === "misrepresentation") return "Texas DTPA (Deceptive Trade Practices Act)";
    if (disputeType === "licensing") return "TDLR Complaint";
    return "District / County Court";
  };

  const recommendation = getRecommendation();
  const detail = pathways.find(p => p.name === (selectedPath || recommendation));

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚖️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Texas Home Service Arbitration Guide 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14 }}>Resolving contractor disputes in DFW — TDLR, small claims, DTPA, AAA arbitration</p>
        </div>

        <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 15 }}>🧭 Find Your Resolution Pathway</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>Disputed Amount ($)</label>
              <input type="number" value={disputeAmount} onChange={e => setDisputeAmount(e.target.value)} placeholder="e.g. 8500" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 6 }}>Dispute Type</label>
              <select value={disputeType} onChange={e => setDisputeType(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #334155", backgroundColor: "#0A1628", color: "#fff", fontSize: 14 }}>
                <option value="">Select type...</option>
                <option value="incomplete">Incomplete or poor quality work</option>
                <option value="fraud">Fraud or false promises</option>
                <option value="misrepresentation">Misrepresentation of services</option>
                <option value="licensing">Unlicensed or expired license</option>
                <option value="overcharge">Overcharging or unapproved extras</option>
              </select>
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: 10, backgroundColor: "#0A1628", borderRadius: 8 }}>
            <input type="checkbox" checked={hasArbitrationClause} onChange={e => setHasArbitrationClause(e.target.checked)} />
            <span style={{ color: "#cbd5e1", fontSize: 13 }}>My contract has an arbitration clause</span>
          </label>
        </div>

        {recommendation && (
          <div style={{ backgroundColor: "#14532d", borderRadius: 10, padding: 14, marginBottom: 24, borderLeft: "4px solid #4ade80" }}>
            <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 14 }}>✅ Recommended: {recommendation}</div>
            <p style={{ color: "#86efac", fontSize: 13, margin: "4px 0 0" }}>Click on any pathway card below for detailed steps.</p>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {pathways.map((p, i) => (
            <button key={i} onClick={() => setSelectedPath(selectedPath === p.name ? null : p.name)} style={{ backgroundColor: selectedPath === p.name || recommendation === p.name ? "#1e3a5f" : "#1e2d45", borderRadius: 10, padding: 16, border: selectedPath === p.name || recommendation === p.name ? "1px solid #F5E642" : "1px solid transparent", cursor: "pointer", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontSize: 22 }}>{p.emoji}</span><div><div style={{ color: "#F5E642", fontWeight: 700, fontSize: 14 }}>{p.name}</div><div style={{ color: "#94a3b8", fontSize: 12 }}>{p.bestFor}</div></div></div>
                <div style={{ textAlign: "right" }}><div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{p.cost}</div><div style={{ color: "#94a3b8", fontSize: 11 }}>{p.timeframe}</div></div>
              </div>
            </button>
          ))}
        </div>

        {detail && (
          <div style={{ backgroundColor: "#1e2d45", borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: "#F5E642", marginTop: 0, fontSize: 15 }}>{detail.emoji} {detail.name} — Step by Step</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ color: "#94a3b8", fontSize: 10 }}>COST</div><div style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>{detail.cost}</div></div>
              <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ color: "#94a3b8", fontSize: 10 }}>TIMEFRAME</div><div style={{ color: "#60a5fa", fontWeight: 700, fontSize: 13 }}>{detail.timeframe}</div></div>
              <div style={{ backgroundColor: "#0A1628", borderRadius: 8, padding: 10, textAlign: "center" }}><div style={{ color: "#94a3b8", fontSize: 10 }}>MAX AWARD</div><div style={{ color: "#4ade80", fontWeight: 700, fontSize: 13 }}>{detail.maxAmount}</div></div>
            </div>
            <ol style={{ color: "#cbd5e1", fontSize: 13, paddingLeft: 20, marginBottom: 12 }}>{detail.process.map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}</ol>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ backgroundColor: "#14532d", borderRadius: 8, padding: 10 }}><div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700 }}>✅ PROS</div><p style={{ color: "#86efac", fontSize: 12, margin: "4px 0 0" }}>{detail.pros}</p></div>
              <div style={{ backgroundColor: "#7f1d1d", borderRadius: 8, padding: 10 }}><div style={{ color: "#f87171", fontSize: 11, fontWeight: 700 }}>❌ CONS</div><p style={{ color: "#fca5a5", fontSize: 12, margin: "4px 0 0" }}>{detail.cons}</p></div>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#475569", fontSize: 11 }}>ProLnk DFW · Arbitration & Dispute Guide · 2026</div>
      </div>
    </div>
  );
}
