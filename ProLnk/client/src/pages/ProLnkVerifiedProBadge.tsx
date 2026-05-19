import { useState } from 'react';

export default function ProLnkVerifiedProBadge() {
  const [trade, setTrade] = useState<string | null>(null);

  const trades: Record<string, string[]> = {
    "🔥 HVAC": ["Valid HVAC contractor license in your state", "EPA 608 certification for refrigerants", "General liability insurance ($1M minimum)", "Background screen — no felonies in past 7 years", "ProLnk skills test: 20 trade-specific questions", "3 verifiable customer references"],
    "💧 Plumbing": ["State plumbing contractor license", "General liability insurance ($1M minimum)", "Background screen — no felonies in past 7 years", "ProLnk skills test: plumbing code and safety", "Proof of business registration", "3 verifiable customer references"],
    "⚡ Electrical": ["State electrical contractor license", "General liability insurance ($1M minimum)", "Background screen — no felonies in past 7 years", "OSHA electrical safety awareness (preferred)", "ProLnk skills test: NEC code knowledge", "3 verifiable customer references"],
    "🏠 Roofing": ["State roofing contractor license (where required)", "General liability + workers comp insurance", "Background screen — no felonies in past 7 years", "GAF or manufacturer certification (preferred)", "ProLnk skills test: roof systems and safety", "3 verifiable customer references"],
    "🌿 Landscaping": ["Business license and tax ID", "General liability insurance ($500K minimum)", "Background screen — no felonies in past 7 years", "Pesticide applicator license (if applicable)", "ProLnk skills test: horticulture and safety", "3 verifiable customer references"],
    "🔨 General Contractor": ["State GC license", "General liability + workers comp insurance", "Background screen — no felonies in past 7 years", "Proof of bonding", "ProLnk skills test: building codes and project mgmt", "5 verifiable customer references"],
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>ProLnk Verified Pro</h1>
          <p style={{ fontSize: 18, color: "#94a3b8″, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            Not everyone gets the badge. ProLnk Verified means license confirmed, insurance active, background clear, and skills tested — every single pro, every single time.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { icon: "📄", title: "License Verified", desc: "We check your state contractor license database directly — no self-reporting." },
            { icon: "🛡️", title: "Insurance Active", desc: "Certificate of insurance reviewed and expiration tracked. Expired = badge suspended." },
            { icon: "🔍", title: "Background Screened", desc: "National criminal background check. ProLnk homeowners see your clean record status." },
            { icon: "🧠", title: "Skills Tested", desc: "Trade-specific knowledge test ensures you know your craft, not just paperwork." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0f1f3d", borderRadius: 12, padding: 20, border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #1e3a6e" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>Requirements by Trade</h2>
          <p style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 20 }}>Select your trade to see the exact verification checklist:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {Object.keys(trades).map((t) => (
              <button key={t} onClick={() => setTrade(trade === t ? null : t)}
                style={{ background: trade === t ? "#F5E642″ : "#1e3a6e", color: trade === t ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>
                {t}
              </button>
            ))}
          </div>
          {trade && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 12 }}>{trade} — Verification Checklist:</div>
              {trades[trade].map((req, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "#F5E642″ }}>✓</span>
                  <span style={{ color: "#e2e8f0″, fontSize: 14, lineHeight: 1.5 }}>{req}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
