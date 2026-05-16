import { useState } from 'react';

const decades = [
  { decade: "1970s", label: "1970s Home", tips: ["Original galvanized plumbing likely failing — full repiping strongly advised", "Foundation on clay soils may have significant movement — get structural inspection", "Electrical panels often pre-arc-fault; upgrade for insurance compliance"] },
  { decade: "1980s", label: "1980s Home", tips: ["Polybutylene pipe risk — check for PB plumbing before any major reno", "HVAC replacement overdue if original equipment remains", "Assess roof condition — south Dallas heat accelerates shingle degradation"] },
  { decade: "1990s", label: "1990s Home", tips: ["Water heater likely at end of life (20+ years)", "Check slab for clay soil movement cracks — common in south Dallas corridor", "Upgrade smoke/CO detectors to current NFPA code"] },
  { decade: "2000s+", label: "2000s+ Home", tips: ["Install monitored security system — industry standard for south Dallas area", "HVAC reaching mid-cycle — schedule efficiency tune-up", "Inspect foundation perimeter moisture levels annually"] }
];

const alerts = [
  { icon: "🔒", title: "Security Systems Critical", desc: "Monitored security is highest ROI home investment in Lancaster" },
  { icon: "🚰", title: "1970s Plumbing Risk", desc: "Many original Lancaster homes still have galvanized or PB pipe" },
  { icon: "🏗️", title: "Clay Soil Foundation", desc: "South Dallas clay-heavy soils create ongoing foundation movement risk" },
  { icon: "💰", title: "Affordable Entry Point", desc: "Higher maintenance awareness = protect your investment and equity growth" }
];

export default function LancasterHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = decades.find(d => d.decade === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🏡</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", margin: "0.5rem 0" }}>Lancaster TX Homeowner Deep Dive 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>Part 2 — Affordable South Dallas: Plumbing, Foundation & Security Guide</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {alerts.map(a => (
            <div key={a.title} style={{ background: "#111e35", borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{a.icon}</div>
              <div style={{ color: "#F5E642", fontWeight: 700, marginTop: 4 }}>{a.title}</div>
              <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: 4 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111e35", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1.1rem", marginTop: 0 }}>🏠 Select Your Home's Decade</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {decades.map(d => (
              <button key={d.decade} onClick={() => setSelected(d.decade)}
                style={{ background: selected === d.decade ? "#F5E642" : "#1e3a5f", color: selected === d.decade ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                {d.label}
              </button>
            ))}
          </div>
          {current && (
            <div>
              <div style={{ color: "#F5E642", fontWeight: 700, marginBottom: "0.5rem" }}>Lancaster Repair Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1", fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569", fontSize: "0.9rem" }}>Select your home's build decade to see Lancaster-specific repair priorities.</div>}
        </div>

        <div style={{ background: "#111e35", borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642", fontSize: "1rem", marginTop: 0 }}>📋 Lancaster Annual Checklist</h2>
          {["Install or upgrade monitored security system", "Annual foundation inspection by licensed PE", "Plumbing camera inspection every 5 years in pre-1990 homes", "Roof inspection after every major hail event (south Dallas hail corridor)"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1", fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: "0.8rem" }}>
          ProLnk connects Lancaster homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
