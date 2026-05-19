import { useState } from 'react';

export default function DFWProNetworkGrowthGuide2026() {
  const [networkSize, setNetworkSize] = useState<string>("");

  const strategies: Record<string, { title: string; steps: string[] }> = {
    solo: {
      title: "🚀 Starting Solo: Your First 5 Recruits",
      steps: [
        "📱 Text 3 trade contacts this week — HVAC, plumber, or electrician you trust",
        "🤝 Attend a DFW PHCC or NECA chapter meeting this month",
        "🏘️ Contact HOA property managers — they know every trade in their neighborhoods",
        "📣 Post in DFW Nextdoor as a ProLnk-affiliated pro for credibility",
        "💬 Share your first commission check screenshot to spark curiosity",
      ],
    },
    small: {
      title: "📈 5–15 Network: Build Adjacent Trades",
      steps: [
        "🔌 Every HVAC pro should recruit 2 electricians — jobs often overlap",
        "💧 Pair plumbers with foundation repair specialists in DFW clay territory",
        "🪵 Roofers recruit gutter and insulation crews naturally",
        "📊 Track your Level 1 earnings — show recruits their potential income",
        "🎯 Focus on Tarrant + Collin counties — fastest contractor shortage zones",
      ],
    },
    growing: {
      title: "🏆 15+ Network: Scale Systemically",
      steps: [
        "📅 Host a monthly DFW pro meetup — breakfast or jobsite tour format",
        "🎓 Create a simple onboarding guide for your recruits to follow",
        "🏘️ Partner with 2–3 DFW property management companies for volume",
        "💰 At 25 network pros, subscription overrides hit $300+/month passively",
        "🗺️ Map your network by trade — identify coverage gaps to fill",
      ],
    },
  };

  const trades = [
    { icon: "❄️", trade: "HVAC", recruits: "Electricians, Insulation, Plumbers" },
    { icon: "🔧", trade: "Plumbing", recruits: "Foundation, Waterproof, Restoration" },
    { icon: "⚡", trade: "Electrical", recruits: "Solar, Smart Home, HVAC" },
    { icon: "🪵", trade: "Roofing", recruits: "Gutters, Insulation, Siding" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌐</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Pro Network Growth Strategy 2026
          </h1>
          <p style={{ color: "#94A3B8″, fontSize: 15 }}>Build your ProLnk network in DFW — start with who you know.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {trades.map((t) => (
            <div key={t.trade} style={{ background: "#1E2D45″, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 24 }}>{t.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14, marginTop: 4 }}>{t.trade}</div>
              <div style={{ color: "#94A3B8″, fontSize: 11, marginTop: 4 }}>Recruit: {t.recruits}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 12 }}>📊 How big is your current DFW network?</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[["solo", "Just me"], ["small", "5–15″], ["growing", "15+"]].map(([val, label]) => (
              <button key={val} onClick={() => setNetworkSize(val)} style={{
                flex: 1, padding: "10px 0″, borderRadius: 8, border: "none", cursor: "pointer",
                background: networkSize === val ? "#F5E642″ : "#0A1628",
                color: networkSize === val ? "#0A1628″ : "#94A3B8",
                fontWeight: 700, fontSize: 13,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {networkSize && strategies[networkSize] && (
          <div style={{ background: "#132137″, borderRadius: 12, padding: 20, marginBottom: 24, border: "1px solid #F5E642" }}>
            <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{strategies[networkSize].title}</div>
            {strategies[networkSize].steps.map((step, i) => (
              <div key={i} style={{ color: "#CBD5E1″, fontSize: 14, marginBottom: 10, paddingLeft: 8, borderLeft: "2px solid #F5E642" }}>
                {step}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28 }}>💰</div>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: 16, marginTop: 8 }}>4-Level Income Cascade</div>
          <div style={{ color: "#1E2D45″, fontSize: 13, marginTop: 6 }}>Every pro you recruit earns you 7% on their job income. Their recruits earn you 4%. The network compounds forever.</div>
        </div>
      </div>
    </div>
  );
}
