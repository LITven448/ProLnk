import { useState } from 'react';

const segments = [
  { name: "HVAC", tam: "$120B", sam: "$18B", som: "$900M", emoji: "❄️", desc: "Heating, cooling, and air quality systems" },
  { name: "Plumbing", tam: "$130B", sam: "$19B", som: "$950M", emoji: "🔧", desc: "Residential and light commercial plumbing" },
  { name: "Electrical", tam: "$110B", sam: "$16B", som: "$800M", emoji: "⚡", desc: "Panel upgrades, rewiring, smart home" },
  { name: "Roofing", tam: "$56B", sam: "$8B", som: "$400M", emoji: "🏠", desc: "Replacement, repair, gutters, solar prep" },
  { name: "Landscaping", tam: "$105B", sam: "$15B", som: "$760M", emoji: "🌿", desc: "Lawn, irrigation, outdoor living" },
  { name: "General", tam: "$79B", sam: "$12B", som: "$600M", emoji: "🔨", desc: "Remodels, handyman, flooring, painting" },
];

export default function ProLnkMarketOpportunity() {
  const [active, setActive] = useState(0);
  const seg = segments[active];
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>📍 Market Opportunity</div>
          <div style={{ fontSize: "1.15rem", color: "#94a3b8″, marginTop: "0.5rem" }}>$600B home services industry — ProLnk starts in DFW, wins nationally</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["$600B", "US Home Services TAM"], ["140M", "US Homes"], ["2.3M", "DFW Homes (Beachhead)"]].map(([val, label]) => (
            <div key={label} style={{ background: "#0F2040″, borderRadius: 12, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#F5E642″ }}>{val}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem", fontSize: "1rem" }}>🎯 Why DFW First</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {["No state income tax — pros keep more", "6.5M people, fastest-growing metro in US", "Tech migration driving high homeownership", "Strong contractor culture, proven demand"].map(r => (
              <div key={r} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", color: "#cbd5e1″, fontSize: "0.9rem" }}>
                <span style={{ color: "#F5E642″ }}>✓</span>{r}
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>📊 Segment Analysis — Click a Trade</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {segments.map((s, i) => (
            <button key={s.name} onClick={() => setActive(i)} style={{ background: active === i ? "#F5E642″ : "#0F2040", color: active === i ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", border: "2px solid #F5E642" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>{seg.emoji} {seg.name}</div>
          <div style={{ color: "#94a3b8″, marginBottom: "1rem", fontSize: "0.9rem" }}>{seg.desc}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            {[["TAM", seg.tam, "Total Addressable"], ["SAM", seg.sam, "Serviceable Available"], ["SOM", seg.som, "Obtainable (5yr)"]].map(([t, v, d]) => (
              <div key={t} style={{ textAlign: "center" }}>
                <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>{t} · {d}</div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#F5E642″ }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}