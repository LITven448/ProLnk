import { useState } from 'react';

export default function TrustyProForPropertyManagers() {
  const [portfolioSize, setPortfolioSize] = useState(10);

  const getSavings = (size: number) => {
    const perUnit = size < 20 ? 640 : size < 50 ? 580 : size < 100 ? 520 : 460;
    return (size * perUnit).toLocaleString();
  };

  const capabilities = [
    { icon: "🗂️", title: "Portfolio Dashboard", desc: "One view across all properties — condition scores, open issues, and contractor status in real time." },
    { icon: "📸", title: "Scan History by Unit", desc: "Every scan timestamped and linked to a specific unit address for instant dispute reference." },
    { icon: "📈", title: "Condition Trend Analysis", desc: "Track property health over time. Spot declining properties before emergency costs hit." },
    { icon: "📅", title: "Maintenance Scheduling", desc: "AI flags when a condition scan suggests routine maintenance is overdue — before it escalates." },
    { icon: "🔧", title: "ProLnk Contractor Network", desc: "Dispatch licensed contractors directly from a scan flag — no phone tag, no delays." },
    { icon: "📤", title: "Owner Reporting", desc: "Auto-generate condition summaries to share with property owners on any cadence you choose." },
  ];

  const metrics = [
    { label: "Avg days saved per turnover", value: "4.2" },
    { label: "Deposit disputes avoided", value: "91%" },
    { label: "Contractor dispatch time", value: "< 60s" },
    { label: "Report generation time", value: "< 2 min" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🏢</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642", margin: "12px 0 8px" }}>TrustyPro for Property Managers</h1>
        <p style={{ fontSize: 18, color: "#94a3b8", maxWidth: 580, margin: "0 auto" }}>
          Run your entire portfolio from one screen. Scan, document, schedule, dispatch — no more clipboard chaos.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 40 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "#112240", borderRadius: 12, padding: "20px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#F5E642" }}>{m.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 48 }}>
          {capabilities.map(c => (
            <div key={c.title} style={{ background: "#112240", borderRadius: 12, padding: "20px 18px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 4, fontSize: 14 }}>{c.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240", borderRadius: 16, padding: "32px 24px", border: "1px solid #F5E642", marginBottom: 40 }}>
          <h2 style={{ color: "#F5E642", textAlign: "center", marginTop: 0, marginBottom: 8 }}>Operational Savings Estimator</h2>
          <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: 24, fontSize: 14 }}>Units under management</p>
          <div style={{ textAlign: "center" }}>
            <input type="range" min={5} max={500} step={5} value={portfolioSize} onChange={e => setPortfolioSize(Number(e.target.value))}
              style={{ width: "100%", maxWidth: 420, accentColor: "#F5E642" }} />
            <div style={{ color: "#F5E642", fontSize: 32, fontWeight: 800, margin: "12px 0 4px" }}>{portfolioSize} units</div>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>Estimated annual operational savings</div>
            <div style={{ color: "#F5E642", fontSize: 42, fontWeight: 900, margin: "8px 0" }}>${getSavings(portfolioSize)}</div>
            <div style={{ color: "#64748b", fontSize: 12 }}>Based on turnover speed, avoided disputes, and contractor efficiency gains</div>
          </div>
        </div>

        <div style={{ background: "#F5E642", borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>🏆</div>
          <div style={{ fontWeight: 800, color: "#0A1628", fontSize: 20, margin: "8px 0 4px" }}>Get Early Access in DFW</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Founding property managers receive lifetime scan credits + priority support.</div>
        </div>
      </div>
    </div>
  );
}
