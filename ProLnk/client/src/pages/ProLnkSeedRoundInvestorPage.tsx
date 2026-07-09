import { useState } from 'react';

export default function ProLnkSeedRoundInvestorPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const profiles = [
    { type: "Angel Investor", icon: "👼", highlight: "Early check, DFW network access, equity at seed pricing" },
    { type: "Venture Capital", icon: "🏦", highlight: "$250K–$1M range, lead or follow, board observer option" },
    { type: "Strategic LP", icon: "🤝", highlight: "Home services operator, real estate portfolio, title/insurance" },
    { type: "Family Office", icon: "🏛️", highlight: "Patient capital, 5–7 year horizon, revenue-share hybrid option" },
  ];

  const metrics = [
    { label: "Pro Waitlist", value: "490+", icon: "🔧" },
    { label: "DFW Homes Sourced", value: "4,000+", icon: "🏠" },
    { label: "Database Tables", value: "130+", icon: "🗄️" },
    { label: "AI Agents Built", value: "47", icon: "🤖" },
  ];

  const uses = [
    { area: "GTM & Launch", pct: "40%", detail: "DFW pro acquisition, homeowner marketing, community manager hire" },
    { area: "Engineering", pct: "30%", detail: "Matching algorithm, mobile app, AI agent automation" },
    { area: "Operations", pct: "20%", detail: "Customer success, compliance, legal" },
    { area: "Reserve", pct: "10%", detail: "Bridge to Series A milestones" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642", letterSpacing: "-1px" }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8", marginTop: "0.4rem" }}>$2M Seed Round — Investor Relations</div>
          <div style={{ display: "inline-block", background: "#F5E642", color: "#0A1628", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            🚀 Round Open — DFW Launch May 2026
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "#0d1f3c", borderRadius: 12, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem" }}>{m.icon}</div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#F5E642" }}>{m.value}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.2rem" }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>💰 Use of Funds — $2M Seed</div>
          {uses.map(u => (
            <div key={u.area} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem" }}>
              <div style={{ width: 48, color: "#F5E642", fontWeight: 700, fontSize: "0.9rem" }}>{u.pct}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{u.area}</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{u.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 Select Your Investor Profile</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
            {profiles.map(p => (
              <button key={p.type} onClick={() => setSelected(selected === p.type ? null : p.type)}
                style={{ background: selected === p.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === p.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
                <div style={{ fontSize: "1.5rem" }}>{p.icon}</div>
                <div style={{ fontWeight: 700, marginTop: "0.4rem" }}>{p.type}</div>
                {selected === p.type && <div style={{ fontSize: "0.82rem", color: "#F5E642", marginTop: "0.5rem" }}>{p.highlight}</div>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📬 Request Pitch Deck</div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>andrew@lit-ventures.com · prolnk.xyz</div>
        </div>
      </div>
    </div>
  );
}
