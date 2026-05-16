import { useState } from 'react';

export default function ProLnkAustinExpansion2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const hotspots = [
    { name: "Cedar Park", icon: "🌵", homes: "94K", type: "Tech Families" },
    { name: "Round Rock", icon: "🎸", homes: "88K", type: "Dell Campus Pros" },
    { name: "Georgetown", icon: "🏛️", homes: "72K", type: "Retiree Homeowners" },
    { name: "South Austin", icon: "🎨", homes: "110K", type: "Creative Professionals" },
    { name: "Pflugerville", icon: "🔩", homes: "66K", type: "Blue-Collar Owners" },
    { name: "Lakeway", icon: "⛵", homes: "48K", type: "High-Income Lake Homes" },
  ];

  const stats = [
    { label: "Metro Homes", value: "800K", icon: "🏘️" },
    { label: "Median Income", value: "$89K", icon: "💰" },
    { label: "YoY Growth", value: "+6.2%", icon: "📈" },
    { label: "Launch Target", value: "Q4 2026", icon: "📅" },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎸</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642", margin: "0 0 8px" }}>Austin Expansion Preview</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, margin: 0 }}>Tech boom drives home services demand — Q4 2026</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#132236", borderRadius: 12, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F5E642" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>📍 Select an Austin Hotspot</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
          {hotspots.map((h) => (
            <button
              key={h.name}
              onClick={() => setSelected(selected === h.name ? null : h.name)}
              style={{
                background: selected === h.name ? "#1e3a5f" : "#132236",
                border: selected === h.name ? "2px solid #F5E642" : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{h.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{h.name}</div>
              <div style={{ color: "#F5E642", fontSize: 13, marginTop: 4 }}>{h.homes} homes</div>
              <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>{h.type}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "#132236", borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
            <h3 style={{ color: "#F5E642", fontSize: 18, marginBottom: 12 }}>📊 {selected} — Market Preview</h3>
            <div style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
              <p>👤 Primary Customer: {hotspots.find(h => h.name === selected)?.type}</p>
              <p>🏠 Homes in Area: {hotspots.find(h => h.name === selected)?.homes}</p>
              <p>🔧 Top Services: HVAC, Plumbing, Smart Home, Landscaping</p>
              <p>💵 Avg Service Ticket: $420–$1,200</p>
              <p>📱 Tech-savvy demographic — high app adoption expected</p>
            </div>
          </div>
        )}

        <div style={{ background: "#132236", borderRadius: 16, padding: 24, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 700, margin: "0 0 8px" }}>💡 Why Austin Is Perfect for ProLnk</p>
          <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            Austin tech workers have high incomes, no time, and high expectations for service quality — the ideal ProLnk customer. Companies like Tesla, Apple, and Meta moved HQ here. New construction is booming, meaning new homeowners constantly entering the market. ProLnk can own this channel.
          </p>
        </div>
      </div>
    </div>
  );
}
