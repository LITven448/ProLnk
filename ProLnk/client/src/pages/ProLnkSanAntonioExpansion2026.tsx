import { useState } from 'react';

export default function ProLnkSanAntonioExpansion2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const segments = [
    { name: "Military Veterans", icon: "🎖️", size: "320K households", insight: "VA loan owners, disciplined budgeters" },
    { name: "Healthcare Workers", icon: "🏥", size: "180K households", insight: "Methodist/UT Health system employees" },
    { name: "JBSA Personnel", icon: "✈️", size: "210K households", insight: "Largest US base — stable employment" },
    { name: "Affordable Housing", icon: "🏠", size: "540K households", insight: "Largest segment, price-sensitive" },
    { name: "New Developments", icon: "🏗️", size: "95K households", insight: "Far NW SA growth corridor" },
    { name: "Tourism District", icon: "🌉", size: "44K households", insight: "River Walk area rental properties" },
  ];

  const stats = [
    { label: "Total Homes", value: "1.1M", icon: "🏘️" },
    { label: "Veteran Homeowners", value: "28%", icon: "🎖️" },
    { label: "Median Home Value", value: "$228K", icon: "💰" },
    { label: "Launch Window", value: "2027″, icon: "📅" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌉</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>San Antonio Expansion Preview</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, margin: 0 }}>Military + healthcare economy powers home services demand</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#132236″, borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F5E642″ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8″, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🎯 Select a Market Segment</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
          {segments.map((seg) => (
            <button
              key={seg.name}
              onClick={() => setSelected(selected === seg.name ? null : seg.name)}
              style={{
                background: selected === seg.name ? "#1e3a5f" : "#132236″,
                border: selected === seg.name ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{seg.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{seg.name}</div>
              <div style={{ color: "#F5E642″, fontSize: 12, marginTop: 4 }}>{seg.size}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "#132236″, borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
            <h3 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>📋 {selected} — ProLnk Opportunity</h3>
            <div style={{ color: "#cbd5e1″, lineHeight: 1.8 }}>
              <p>👥 Segment: {segments.find(s => s.name === selected)?.size}</p>
              <p>💡 Key Insight: {segments.find(s => s.name === selected)?.insight}</p>
              <p>🔧 Top Services: HVAC, Plumbing, Electrical, Roofing</p>
              <p>📣 Best Channels: JBSA community boards, VA partner referrals, local Facebook groups</p>
              <p>🤝 Partnership Angle: VA lender + military relocation services referral pipeline</p>
            </div>
          </div>
        )}

        <div style={{ background: "#132236″, borderRadius: 16, padding: 24, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 8px" }}>🎖️ The Military Homeowner Opportunity</p>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            JBSA is the largest military base in the US. Veterans are disciplined, loyal customers with VA loans requiring home upkeep. San Antonio has the highest veteran homeowner concentration in Texas. ProLnk can build VA-referral pipelines as a unique acquisition channel unavailable to competitors.
          </p>
        </div>
      </div>
    </div>
  );
}
