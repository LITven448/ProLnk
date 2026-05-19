import { useState } from 'react';

export default function TrustyProForLandlordsGuide() {
  const [propertyCount, setPropertyCount] = useState(1);

  const getValue = (count: number) => {
    const perProp = count <= 5 ? 480 : count <= 20 ? 420 : 360;
    return (count * perProp).toLocaleString();
  };

  const features = [
    { icon: "📸", title: "Scan Between Tenants", desc: "Document exact property condition before move-in and after move-out with AI-powered visual scans." },
    { icon: "🔒", title: "Defensible Deposit Records", desc: "Generate timestamped condition reports that hold up in disputes — no more he-said-she-said." },
    { icon: "🔧", title: "Find Licensed Contractors Fast", desc: "One tap connects to vetted ProLnk professionals for any repair identified in your scan." },
    { icon: "📊", title: "Condition Trend Tracking", desc: "Compare scans across tenancy cycles to identify chronic issues before they become expensive." },
    { icon: "📁", title: "Digital Paper Trail", desc: "Every scan, report, and contractor job logged automatically in your Home Health Vault." },
    { icon: "⚡", title: "Faster Turnover", desc: "Cut days off your vacancy window with instant condition documentation and contractor dispatch." },
  ];

  const steps = [
    { num: "01″, label: "Scan at move-out", detail: "Walk every room with your phone" },
    { num: "02″, label: "AI generates report", detail: "Damage flagged, condition scored" },
    { num: "03″, label: "Send to tenant", detail: "Timestamped, legally defensible" },
    { num: "04″, label: "Dispatch contractor", detail: "ProLnk match in under 60 seconds" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "0" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>TrustyPro for Landlords</h1>
        <p style={{ fontSize: 18, color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
          Protect your investment. Document everything. Dispatch contractors in seconds.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 48 }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "#112240″, borderRadius: 12, padding: "20px 18px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: "32px 24px", border: "1px solid #F5E642", marginBottom: 40 }}>
          <h2 style={{ color: "#F5E642″, textAlign: "center", marginTop: 0, marginBottom: 8 }}>Landlord Value Estimator</h2>
          <p style={{ color: "#94a3b8″, textAlign: "center", marginBottom: 24, fontSize: 14 }}>How many rental properties do you manage?</p>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <input type="range" min={1} max={100} value={propertyCount} onChange={e => setPropertyCount(Number(e.target.value))}
              style={{ width: "100%", maxWidth: 400, accentColor: "#F5E642″ }} />
            <div style={{ color: "#F5E642″, fontSize: 32, fontWeight: 800, margin: "12px 0 4px" }}>{propertyCount} {propertyCount === 1 ? "property" : "properties"}</div>
            <div style={{ color: "#94a3b8″, fontSize: 14 }}>Estimated annual value generated</div>
            <div style={{ color: "#F5E642″, fontSize: 40, fontWeight: 900, margin: "8px 0" }}>${getValue(propertyCount)}</div>
            <div style={{ color: "#64748b", fontSize: 12 }}>Based on dispute savings, faster turnover, and contractor efficiency</div>
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, textAlign: "center", marginBottom: 24 }}>The Landlord Workflow</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 40 }}>
          {steps.map(s => (
            <div key={s.num} style={{ background: "#112240″, borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#F5E642″ }}>{s.num}</div>
              <div style={{ fontWeight: 700, color: "#fff", margin: "6px 0 4px", fontSize: 14 }}>{s.label}</div>
              <div style={{ color: "#94a3b8″, fontSize: 12 }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🚀</div>
          <div style={{ fontWeight: 800, color: "#0A1628″, fontSize: 20, marginBottom: 4 }}>Join the DFW Early Access List</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Lifetime scan credits for founding landlords. No card required.</div>
        </div>
      </div>
    </div>
  );
}
