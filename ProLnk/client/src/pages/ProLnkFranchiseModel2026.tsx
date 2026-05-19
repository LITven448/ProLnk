import { useState } from 'react';

export default function ProLnkFranchiseModel2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const investorTypes = [
    { type: "Individual Investor", icon: "👤", capital: "$50K–$150K", fit: "High", desc: "Local operator who knows the market" },
    { type: "Real Estate Agent", icon: "🏡", capital: "$25K–$75K", fit: "Very High", desc: "Built-in homeowner network on day 1″ },
    { type: "Home Services Pro", icon: "🔧", capital: "$30K–$100K", fit: "Very High", desc: "Understands the labor market deeply" },
    { type: "Private Equity", icon: "🏦", capital: "$500K–$2M", fit: "Medium", desc: "Multi-territory rollup strategy" },
    { type: "Local Entrepreneur", icon: "💼", capital: "$75K–$200K", fit: "High", desc: "Wants proven playbook, local control" },
    { type: "Tech Professional", icon: "💻", capital: "$100K–$300K", fit: "Medium", desc: "Passive income alongside day job" },
  ];

  const economics = [
    { label: "Territory License Fee", value: "$25K–$75K", icon: "🎫" },
    { label: "Monthly Royalty", value: "8% of revenue", icon: "📊" },
    { label: "Break-Even Timeline", value: "14–18 months", icon: "⏱️" },
    { label: "Year 3 Net Income", value: "$180K–$420K", icon: "💰" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>ProLnk Franchise Model</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, margin: 0 }}>Territory licensing — local operators, ProLnk playbook</p>
          <div style={{ display: "inline-block", background: "#1e3a5f", borderRadius: 20, padding: "6px 18px", marginTop: 12, fontSize: 13, color: "#F5E642″ }}>🔮 Future Program — Exploring 2026</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {economics.map((e) => (
            <div key={e.label} style={{ background: "#132236″, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{e.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″ }}>{e.value}</div>
              <div style={{ fontSize: 11, color: "#94a3b8″, marginTop: 4 }}>{e.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🎯 Select Your Investor Profile</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {investorTypes.map((inv) => (
            <button
              key={inv.type}
              onClick={() => setSelected(selected === inv.type ? null : inv.type)}
              style={{
                background: selected === inv.type ? "#1e3a5f" : "#132236″,
                border: selected === inv.type ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{inv.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{inv.type}</div>
              <div style={{ color: "#F5E642″, fontSize: 12, marginTop: 4 }}>{inv.capital}</div>
              <div style={{ background: inv.fit === "Very High" ? "#065f46″ : "#1e3a5f", color: inv.fit === "Very High" ? "#34d399" : "#94a3b8", borderRadius: 8, padding: "2px 8px", fontSize: 11, marginTop: 6, display: "inline-block" }}>Fit: {inv.fit}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "#132236″, borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
            {(() => { const inv = investorTypes.find(i => i.type === selected)!; return (
              <>
                <h3 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>📋 {inv.type} — Franchise Fit Guide</h3>
                <div style={{ color: "#cbd5e1″, lineHeight: 1.8 }}>
                  <p>💡 Why This Profile: {inv.desc}</p>
                  <p>💵 Suggested Capital: {inv.capital}</p>
                  <p>📈 Fit Score: {inv.fit}</p>
                  <p>🚀 Recommended Territory: Single suburb or small metro (100K–300K homes)</p>
                  <p>🤝 ProLnk Provides: Brand, tech platform, training, ongoing agent support</p>
                  <p>📞 Next Step: Schedule a territory evaluation call with ProLnk growth team</p>
                </div>
              </>
            ); })()}
          </div>
        )}

        <div style={{ background: "#132236″, borderRadius: 16, padding: 24, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 8px" }}>📦 What the Franchise Includes</p>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            Territory exclusivity for defined zip codes. Full ProLnk tech stack access. Onboarding playbook for seeding local pro network. Marketing templates and launch strategy. AI agents for lead scoring, matching, and follow-up. Ongoing ProLnk HQ support and community of franchisees.
          </p>
        </div>
      </div>
    </div>
  );
}
