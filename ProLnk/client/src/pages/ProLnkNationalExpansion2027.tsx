import { useState } from 'react';

export default function ProLnkNationalExpansion2027() {
  const [selected, setSelected] = useState<string | null>(null);

  const cities = [
    { name: "Phoenix, AZ", icon: "☀️", priority: 1, homes: "1.8M", year: "2027 Q1", reason: "Hot climate identical HVAC demand to Texas" },
    { name: "Atlanta, GA", icon: "🍑", priority: 2, homes: "2.1M", year: "2027 Q2", reason: "Fastest growing metro, tech hub emerging" },
    { name: "Charlotte, NC", icon: "🏦", priority: 3, homes: "920K", year: "2027 Q3", reason: "Banking city, high-income homeowners" },
    { name: "Nashville, TN", icon: "🎵", priority: 4, homes: "780K", year: "2027 Q3", reason: "Explosive growth, limited service supply" },
    { name: "Tampa, FL", icon: "🌊", priority: 5, homes: "1.2M", year: "2027 Q4", reason: "Retiree base plus hurricane repair cycle" },
    { name: "Las Vegas, NV", icon: "🎰", priority: 6, homes: "840K", year: "2028 Q1", reason: "Desert climate, HOA-managed communities" },
  ];

  const timeline = [
    { period: "2026", label: "Texas Dominance", detail: "DFW, Houston, Austin, SA" },
    { period: "2027", label: "Sun Belt Push", detail: "Phoenix, Atlanta, Charlotte" },
    { period: "2028", label: "Southeast", detail: "Tampa, Orlando, Raleigh" },
    { period: "2029", label: "Midwest Entry", detail: "Chicago, Columbus, KC" },
    { period: "2030", label: "National", detail: "50 metros, 40M+ homes" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642", margin: "0 0 8px" }}>National Expansion Roadmap</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>After Texas — Sun Belt first, full US coverage by 2030</p>
        </div>

        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>📅 Expansion Timeline</h2>
          <div style={{ display: "flex", gap: 2 }}>
            {timeline.map((t) => (
              <div key={t.period} style={{ flex: 1, background: "#132236", borderRadius: 10, padding: "16px 12px" }}>
                <div style={{ color: "#F5E642", fontWeight: 800, fontSize: 18 }}>{t.period}</div>
                <div style={{ fontWeight: 600, fontSize: 12, margin: "6px 0 4px" }}>{t.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 11, lineHeight: 1.5 }}>{t.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>🏙️ Click a City — Expansion Priority</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {cities.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelected(selected === c.name ? null : c.name)}
              style={{
                background: selected === c.name ? "#1e3a5f" : "#132236",
                border: selected === c.name ? "2px solid #F5E642" : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 28 }}>{c.icon}</span>
                <span style={{ background: "#F5E642", color: "#0A1628", borderRadius: 20, padding: "2px 10px", fontWeight: 800, fontSize: 13 }}>#{c.priority}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
              <div style={{ color: "#F5E642", fontSize: 12, marginTop: 4 }}>{c.homes} homes</div>
            </button>
          ))}
        </div>

        {selected && (() => {
          const c = cities.find(x => x.name === selected);
          if (!c) return null;
          return (
            <div style={{ background: "#132236", borderRadius: 16, padding: 28, border: "1px solid #F5E642", marginBottom: 24 }}>
              <h3 style={{ color: "#F5E642", fontSize: 18, marginBottom: 12 }}>📊 {c.name} — Priority #{c.priority}</h3>
              <div style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
                <p style={{ margin: "0 0 8px" }}>🏠 Homes in Metro: {c.homes}</p>
                <p style={{ margin: "0 0 8px" }}>📅 Target Launch: {c.year}</p>
                <p style={{ margin: "0 0 8px" }}>💡 Strategic Reason: {c.reason}</p>
                <p style={{ margin: "0 0 8px" }}>📈 Estimated Year-1 Revenue: $4M–$12M</p>
                <p style={{ margin: 0 }}>🚀 Entry Strategy: Local pro seeding 6 months before launch</p>
              </div>
            </div>
          );
        })()}

        <div style={{ background: "#132236", borderRadius: 16, padding: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 8px" }}>🌞 Why Sun Belt First</p>
          <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            Sun Belt cities share Texas climate patterns — hot summers, mild winters — meaning the same HVAC and outdoor service demand cycles. ProLnk can reuse DFW matching algorithms, pricing models, and marketing playbooks with minimal adaptation. This reduces expansion cost by 60% vs. entering colder markets first.
          </p>
        </div>
      </div>
    </div>
  );
}
