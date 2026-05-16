import { useState } from 'react';

export default function DFWPublicAdjusterGuide2026() {
  const [claimSituation, setClaimSituation] = useState<string | null>(null);

  type PAInfo = { recommendation: string; color: string; rationale: string[]; steps: string[] };
  const paData: Record<string, PAInfo> = {
    large: {
      recommendation: "✅ Strongly consider a public adjuster",
      color: "#22C55E",
      rationale: ["Claims over $50K benefit most from PA representation", "Typical PA fee: 10-15% of final settlement", "Studies show PA-represented claims average 747% higher payouts", "Structural complexity at this level often has hidden damage", "Insurance company adjuster works for insurer — not you"],
      steps: ["Verify TDI license at tdi.texas.gov", "Get fee agreement in writing before signing anything", "PA takes over all insurer communications", "Independent contractor estimates required", "ProLnk connects to vetted licensed contractors for estimates"],
    },
    denied: {
      recommendation: "✅ Hire a public adjuster immediately",
      color: "#EF4444",
      rationale: ["Denial is not final — you have the right to dispute", "PA will identify what documentation was missing", "Texas law: insurer must provide written denial reasons", "30-day window to file with Texas Department of Insurance", "Denied claims often reversed with proper representation"],
      steps: ["Request written denial with specific reasons (TX law requires)", "Hire TDI-licensed PA within 30 days of denial", "PA files formal dispute and gathers supporting evidence", "Appraisal clause in your policy — alternate dispute path", "File TDI complaint if insurer acts in bad faith"],
    },
    underpaid: {
      recommendation: "⚠️ Public adjuster or attorney can help supplement",
      color: "#F59E0B",
      rationale: ["First offer is rarely the final offer — always negotiable", "Insurer adjusters use Xactimate — which often undervalues", "Supplement claims are common and standard practice", "Local material costs and labor rates differ from Xactimate defaults", "You have 2 years from date of loss to reopen in Texas"],
      steps: ["Get independent contractor estimate first — compare to offer", "Document every line item the insurer missed", "Request PA review if gap is $5K+ between estimates", "File supplement directly or through PA", "Appraisal process available if you cannot agree on value"],
    },
    simple: {
      recommendation: "ℹ️ You can likely handle this claim directly",
      color: "#94A3B8",
      rationale: ["Small, clear-cut claims under $25K are manageable solo", "PA fee (10-15%) may not be worth it on small settlements", "Document thoroughly and follow up with adjuster directly", "Use ProLnk contractors for independent estimates", "Know your rights: TX Prompt Payment Act — 15 days to acknowledge"],
      steps: ["Document damage with photos and video immediately", "Call insurer within 48 hours to open claim", "Get 2-3 local contractor estimates before adjuster visit", "Don't accept first offer — review itemized estimate carefully", "Call TDI if insurer delays beyond 15 days: 1-800-578-4677"],
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>DFW Public Adjuster Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>When to hire a PA vs go direct — and how to find a licensed TX adjuster</p>
        </div>

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: "4px solid #F5E642" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What is a Public Adjuster?</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["A licensed professional who represents YOU (not the insurer) in a claim", "Fee: typically 10-15% of the final insurance settlement", "Must hold a Texas Department of Insurance (TDI) license", "Handles all insurer communication, documentation, negotiation", "Verify any PA at tdi.texas.gov before signing anything"].map((item, i) => (
              <div key={i} style={{ color: "#E2E8F0", fontSize: 13 }}>• {item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 12 }}>What is your claim situation?</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[["large", "💰 Large Claim ($50K+)"], ["denied", "❌ Claim Denied"], ["underpaid", "📉 Underpaid Offer"], ["simple", "✅ Straightforward Claim"]].map(([key, label]) => (
              <button key={key} onClick={() => setClaimSituation(claimSituation === key ? null : key)} style={{ padding: "10px 16px", borderRadius: 8, border: "2px solid", borderColor: claimSituation === key ? "#F5E642" : "#334155", backgroundColor: claimSituation === key ? "#F5E64220" : "transparent", color: claimSituation === key ? "#F5E642" : "#94A3B8", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>{label}</button>
            ))}
          </div>
        </div>

        {claimSituation && paData[claimSituation] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <div style={{ color: paData[claimSituation].color, fontWeight: 700, fontSize: 16, marginBottom: 14 }}>{paData[claimSituation].recommendation}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Why</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
                {paData[claimSituation].rationale.map((r, i) => <li key={i} style={{ color: "#E2E8F0", fontSize: 13 }}>• {r}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#F5E642", marginBottom: 10 }}>Action Steps</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {paData[claimSituation].steps.map((s, i) => <li key={i} style={{ color: "#E2E8F0", fontSize: 13 }}>→ {s}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div style={{ backgroundColor: "#1E293B", borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642", marginBottom: 8 }}>🔗 ProLnk: Licensed Contractor Estimates for Your Claim</h2>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Whether you hire a PA or go direct — independent contractor estimates are essential. ProLnk connects you to licensed DFW contractors fast.</p>
        </div>
      </div>
    </div>
  );
}