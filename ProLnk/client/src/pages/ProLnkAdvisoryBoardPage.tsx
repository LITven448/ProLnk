import { useState } from 'react';

export default function ProLnkAdvisoryBoardPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const roles = [
    { type: "Home Services Operator", icon: "🔧", detail: "Franchise owner, trade business exec, or field operations leader — help shape pro experience and market fit" },
    { type: "DFW Real Estate Pro", icon: "🏠", detail: "Realtor, broker, or title professional — unlock co-marketing, referral income, and local launch support" },
    { type: "AI / ML Expert", icon: "🤖", detail: "ML engineer or AI product leader — guide matching algorithm, predictive models, and 47-agent architecture" },
    { type: "Growth SaaS Operator", icon: "📈", detail: "Scaled a marketplace or SaaS to $10M+ ARR — advise on GTM, pricing, and Series A positioning" },
  ];

  const benefits = [
    { label: "Equity Grant", icon: "💎", detail: "0.1–0.25% vested over 2 years" },
    { label: "Charter Access", icon: "🥇", detail: "Founding Pro status + locked $149/mo rate" },
    { label: "Revenue Share", icon: "💰", detail: "Referral commissions on your network" },
    { label: "Brand Visibility", icon: "📣", detail: "Listed on prolnk.io advisory page" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8″, marginTop: "0.4rem" }}>Advisory Board — Building the Team Behind the Launch</div>
          <div style={{ display: "inline-block", background: "#1a3a5c", border: "2px solid #F5E642″, color: "#F5E642", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            🌟 4 Advisory Seats Available — DFW Launch 2026
          </div>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.8rem", fontSize: "1.05rem" }}>🎁 What Advisors Receive</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.8rem" }}>
            {benefits.map(b => (
              <div key={b.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", background: "#0A1628″, borderRadius: 10, padding: "0.9rem" }}>
                <div style={{ fontSize: "1.4rem" }}>{b.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#F5E642″ }}>{b.label}</div>
                  <div style={{ fontSize: "0.8rem", color: "#94a3b8″ }}>{b.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 Select Your Expertise</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {roles.map(r => (
              <button key={r.type} onClick={() => setSelected(selected === r.type ? null : r.type)}
                style={{ background: selected === r.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === r.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1.1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
                <div style={{ fontSize: "1.6rem" }}>{r.icon}</div>
                <div style={{ fontWeight: 700, marginTop: "0.4rem", fontSize: "0.95rem" }}>{r.type}</div>
                {selected === r.type && <div style={{ fontSize: "0.82rem", color: "#F5E642″, marginTop: "0.5rem" }}>{r.detail}</div>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📋 Time Commitment</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>2–4 hours/month. Quarterly strategy call + async Slack access to founder. No board seat required.</div>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📬 Apply to Join</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>andrew@lit-ventures.com — Subject: "ProLnk Advisory"</div>
        </div>
      </div>
    </div>
  );
}
