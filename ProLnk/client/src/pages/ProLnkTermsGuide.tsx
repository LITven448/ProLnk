import { useState } from 'react';

const sections = ["Contractor Relationship", "Liability Limits", "Dispute Resolution", "Cancellation Policy", "Platform Rules"];

const explanations: Record<string, { plain: string; legalNote: string }[]> = {
  "Contractor Relationship": [
    { plain: "Pros are independent contractors, not ProLnk employees.", legalNote: "ProLnk does not control how pros perform their work, set their hours, or determine their pricing. This is standard for marketplace platforms." },
    { plain: "ProLnk is a marketplace, not a general contractor.", legalNote: "When you hire a pro through ProLnk, your contract is with that pro directly. ProLnk facilitates the connection and provides the guarantee, but is not a party to the service contract." },
    { plain: "Homeowners pay pros directly for completed work.", legalNote: "ProLnk processes payments as an agent for collection. The legal relationship for the service is between homeowner and pro." },
  ],
  "Liability Limits": [
    { plain: "ProLnk is not liable for a pro's workmanship defects beyond the satisfaction guarantee.", legalNote: "If a pro causes property damage, their liability insurance is the primary recourse. ProLnk's liability is capped at the amount paid through the platform for that job." },
    { plain: "ProLnk is not responsible for force majeure events.", legalNote: "Service delays caused by weather, supply chain issues, or acts of God are not covered under ProLnk guarantees but may be covered under the pro's contract with you." },
    { plain: "Indirect damages are excluded.", legalNote: "ProLnk is not liable for lost income, inconvenience, or consequential damages arising from a delayed or disputed job." },
  ],
  "Dispute Resolution": [
    { plain: "Disputes are resolved by arbitration, not court.", legalNote: "By using ProLnk, you agree to binding arbitration administered by JAMS under their Streamlined Rules. Class action lawsuits are waived." },
    { plain: "ProLnk first tries to mediate disputes directly.", legalNote: "Contact support@prolnk.io within 30 days of the issue. ProLnk will attempt to resolve the dispute within 14 days before escalation to formal arbitration." },
    { plain: "Arbitration is held in your home state.", legalNote: "Arbitration is conducted in the state where the service was performed, or remotely by mutual agreement." },
  ],
  "Cancellation Policy": [
    { plain: "Pro subscriptions are $149/month — cancel anytime.", legalNote: "No long-term contracts. Cancel before your next billing date to avoid the next charge. Refunds are not issued for partial months." },
    { plain: "Charter rate is locked while your subscription is active.", legalNote: "If you cancel and re-subscribe, you will be subject to the current rate at time of re-enrollment, which may be higher than your original Charter rate." },
    { plain: "Account deactivation vs. cancellation — know the difference.", legalNote: "Pausing your account keeps your Charter rate but stops billing. Cancellation terminates the subscription. Deletion removes all data. These are three separate actions." },
  ],
  "Platform Rules": [
    { plain: "Pros must maintain active licenses and insurance.", legalNote: "ProLnk will suspend any pro whose license or insurance lapses. Continued operation with a lapsed license is a breach of the Pro Agreement and may result in permanent termination." },
    { plain: "Fake reviews are prohibited and terminable.", legalNote: "Soliciting, purchasing, or posting fake reviews violates the Pro Agreement and may result in immediate account termination and legal action." },
    { plain: "Homeowners must use ProLnk for all jobs with matched pros.", legalNote: "Attempting to hire a ProLnk-matched pro off-platform to avoid fees is a breach of the Homeowner Agreement and may result in account suspension." },
  ],
};

export default function ProLnkTermsGuide() {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [showLegal, setShowLegal] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📜</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>Terms of Service Guide</h1>
          <p style={{ color: "#94A3B8", fontSize: 16 }}>Plain English — what ProLnk's terms actually mean for you</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {sections.map((s) => (
            <button key={s} onClick={() => { setActiveSection(s); setShowLegal(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                background: activeSection === s ? "#F5E642" : "#1E2D45", color: activeSection === s ? "#0A1628" : "#94A3B8" }}>
              {s}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(explanations[activeSection] || []).map((item, i) => (
            <div key={i} style={{ background: "#1E2D45", borderRadius: 12, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <p style={{ fontWeight: 700, color: "#fff", fontSize: 15, flex: 1 }}>📌 {item.plain}</p>
                <button onClick={() => setShowLegal(showLegal === i ? null : i)}
                  style={{ background: "none", border: "1px solid #2D3F5A", borderRadius: 6, color: "#94A3B8", cursor: "pointer", padding: "4px 12px", fontSize: 12, flexShrink: 0 }}>
                  {showLegal === i ? "Hide Legal" : "See Legal Note"}
                </button>
              </div>
              {showLegal === i && (
                <div style={{ marginTop: 14, padding: 14, background: "#0A1628", borderRadius: 8, color: "#94A3B8", fontSize: 13, lineHeight: 1.7 }}>
                  ⚖️ {item.legalNote}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: "#1E2D45", borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
          <p style={{ fontWeight: 700, color: "#fff", marginBottom: 6 }}>Want the full legal text?</p>
          <p style={{ color: "#94A3B8", fontSize: 13, marginBottom: 20 }}>Full Terms of Service and Privacy Policy are available at prolnk.io/legal</p>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer" }}>
            View Full Terms
          </button>
        </div>
      </div>
    </div>
  );
}