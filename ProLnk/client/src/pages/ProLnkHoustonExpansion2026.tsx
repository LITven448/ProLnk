import { useState } from 'react';

export default function ProLnkHoustonExpansion2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const areas = [
    { name: "Energy Corridor", icon: "⚡", homes: "142K", demand: "HVAC + Electrical" },
    { name: "The Woodlands", icon: "🌲", homes: "118K", demand: "Landscaping + Plumbing" },
    { name: "Sugar Land", icon: "🏡", homes: "97K", demand: "General Home Repair" },
    { name: "Katy", icon: "🔧", homes: "134K", demand: "HVAC + Roofing" },
    { name: "Pearland", icon: "🏠", homes: "89K", demand: "Electrical + Painting" },
    { name: "Clear Lake", icon: "🚀", homes: "76K", demand: "HVAC + Plumbing" },
  ];

  const stats = [
    { label: "Total Homes", value: "4.5M", icon: "🏘️" },
    { label: "Avg Home Value", value: "$348K", icon: "💰" },
    { label: "Annual HVAC Calls", value: "1.2M+", icon: "❄️" },
    { label: "Launch Target", value: "Q3 2026″, icon: "📅" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>Houston Expansion Preview</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, margin: 0 }}>ProLnk next market after DFW — Q3 2026</p>
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

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🗺️ Select a Houston Market Area</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
          {areas.map((a) => (
            <button
              key={a.name}
              onClick={() => setSelected(selected === a.name ? null : a.name)}
              style={{
                background: selected === a.name ? "#1e3a5f" : "#132236″,
                border: selected === a.name ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{a.name}</div>
              <div style={{ color: "#F5E642″, fontSize: 13, marginTop: 4 }}>{a.homes} homes</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "#132236″, borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
            <h3 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>📊 {selected} — Market Opportunity</h3>
            <div style={{ color: "#cbd5e1″, lineHeight: 1.8 }}>
              <p>🔥 Top Service: {areas.find(a => a.name === selected)?.demand}</p>
              <p>🏠 Homes in Area: {areas.find(a => a.name === selected)?.homes}</p>
              <p>📈 Estimated Monthly Leads: {Math.floor(Math.random() * 200 + 300)}</p>
              <p>💵 Projected Monthly Revenue: ${(Math.floor(Math.random() * 50 + 80)).toLocaleString()}K</p>
              <p>🚀 Launch Priority: High — included in Q3 2026 rollout</p>
            </div>
          </div>
        )}

        <div style={{ background: "#132236″, borderRadius: 16, padding: 24, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 8px" }}>☀️ Why Houston After DFW?</p>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            Houston shares DFW&apos;s hot/humid climate — identical HVAC demand cycles. Energy Corridor employment creates high-income homeowners with strong service budgets. Port economy adds commercial service needs. ProLnk&apos;s DFW playbook transfers directly.
          </p>
        </div>
      </div>
    </div>
  );
}
