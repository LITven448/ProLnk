import { useState } from 'react';

export default function ProLnkRoadmap2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const quarters = [
    {
      q: "Q2 2026",
      icon: "🚀",
      label: "DFW Launch",
      items: ["500-pro waitlist closes", "Live matching begins for first 100 pros", "Home Health Vault alpha (invited homeowners)", "Mobile web PWA live"],
    },
    {
      q: "Q3 2026",
      icon: "⚡",
      label: "Matching Algorithm Live",
      items: ["AI-powered job matching by trade + zip", "Mobile app beta (iOS + Android)", "Commission payouts via Stripe", "Pro performance dashboard live"],
    },
    {
      q: "Q4 2026",
      icon: "🌆",
      label: "Houston Preview",
      items: ["Houston waitlist opens", "Home Health Vault beta (5,000 homes)", "TrustyPro B2B licensing pilot", "Series A fundraise begins"],
    },
    {
      q: "2027",
      icon: "🌎",
      label: "National Expansion",
      items: ["10 metro markets", "50,000 active pros", "Home Health Vault: 500K+ homes", "AI agents fully autonomous — 80% ops automated"],
    },
  ];

  const personas = [
    { type: "Service Pro", icon: "🔧", highlights: ["Q2: Start earning — first 500 pros get charter pricing", "Q3: Mobile app + instant job notifications", "Q4: Payout history + performance dashboard"] },
    { type: "Homeowner", icon: "🏠", highlights: ["Q2: Get matched to vetted pros in DFW", "Q3: Rate pros, track job history", "Q4: Home Health Vault — full home health report"] },
    { type: "Investor", icon: "💼", highlights: ["Q2: 500 pro milestone = proof of demand", "Q3: Revenue on (matching fees + subscriptions)", "Q4: Houston expansion + Series A"] },
    { type: "Partner", icon: "🤝", highlights: ["Q2: Referral program live — earn per signup", "Q3: Co-branded landing pages available", "Q4: API access for strategic partners"] },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642" }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8", marginTop: "0.4rem" }}>Product Roadmap — 2026 & Beyond</div>
          <div style={{ display: "inline-block", background: "#F5E642", color: "#0A1628", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            ⚡ Q2 2026 DFW Launch Underway
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.8rem", marginBottom: "2rem" }}>
          {quarters.map(q => (
            <div key={q.q} style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.6rem" }}>{q.icon}</div>
              <div style={{ fontWeight: 800, color: "#F5E642", marginTop: "0.4rem" }}>{q.q}</div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.7rem" }}>{q.label}</div>
              {q.items.map((item, i) => (
                <div key={i} style={{ fontSize: "0.78rem", color: "#cbd5e1", marginBottom: "0.3rem" }}>· {item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 See What Matters Most to You</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.8rem", marginBottom: "2rem" }}>
          {personas.map(p => (
            <button key={p.type} onClick={() => setSelected(selected === p.type ? null : p.type)}
              style={{ background: selected === p.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === p.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
              <div style={{ fontSize: "1.5rem" }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", marginTop: "0.3rem" }}>{p.type}</div>
              {selected === p.type && (
                <div style={{ marginTop: "0.6rem" }}>
                  {p.highlights.map((h, i) => <div key={i} style={{ fontSize: "0.78rem", color: "#F5E642", marginBottom: "0.3rem" }}>· {h}</div>)}
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>📬 Get Roadmap Updates</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>prolnk.io/pro-signup · prolnk.io/homeowner · andrew@lit-ventures.com</div>
        </div>
      </div>
    </div>
  );
}
