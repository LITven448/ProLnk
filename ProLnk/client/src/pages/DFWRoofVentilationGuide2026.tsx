import { useState } from 'react';

export default function DFWRoofVentilationGuide2026() {
  const [atticSqFt, setAtticSqFt] = useState(1200);
  const required = Math.ceil(atticSqFt / 150);
  const intake = Math.ceil(required / 2);
  const exhaust = Math.ceil(required / 2);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "8px 0 4px" }}>DFW Roof Ventilation Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>DFW attics reach 140°F in summer. Proper ventilation extends roof life by 5–10 years.</p>
        </div>

        <div style={{ background: "#132240″, borderRadius: 14, padding: 24, marginBottom: 24, textAlign: "center" }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 4, fontSize: 18 }}>The 1:150 Rule</div>
          <div style={{ color: "#cbd5e1″, fontSize: 15, lineHeight: 1.7 }}>1 square foot of net free ventilation area for every 150 square feet of attic floor space. Split 50/50 between intake (soffit) and exhaust (ridge or gable).</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { icon: "🏔️", title: "Ridge Vent", body: "Best for DFW. Runs full length of ridge, works with natural convection. Requires continuous soffit vents to work." },
            { icon: "↔️", title: "Gable Vent", body: "Less effective in DFW due to cross-ventilation gaps. Often combined with ridge vents on older homes." },
            { icon: "⚡", title: "Powered Attic Fan", body: "Creates negative pressure — can pull conditioned air from living space if unsealed. Controversial in TX; use with caution." },
            { icon: "⚠️", title: "Soffit Blockage Danger", body: "Insulation blown over soffit vents eliminates all intake. This is worse than no vents at all — creates moisture traps." },
          ].map(c => (
            <div key={c.title} style={{ background: "#132240″, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 5, fontSize: 14 }}>{c.title}</div>
              <div style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#132240″, borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, marginBottom: 20, fontSize: 20 }}>📐 Attic Size → Ventilation Calculator</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, display: "block", marginBottom: 10, fontSize: 14 }}>Attic Square Footage: <strong style={{ color: "#fff" }}>{atticSqFt.toLocaleString()} sq ft</strong></label>
            <input type="range" min={400} max={4000} step={100} value={atticSqFt} onChange={e => setAtticSqFt(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642″ }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { label: "Total Vent Area Needed", value: `${required} sq ft`, color: "#F5E642″ },
              { label: "Intake (Soffit)", value: `${intake} sq ft`, color: "#22c55e" },
              { label: "Exhaust (Ridge)", value: `${exhaust} sq ft`, color: "#3b82f6″ },
            ].map(stat => (
              <div key={stat.label} style={{ background: "#0A1628″, borderRadius: 10, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ color: "#94a3b8″, fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: "#1e3a5f", borderRadius: 8, padding: 14 }}>
            <div style={{ color: "#cbd5e1″, fontSize: 13, lineHeight: 1.6 }}>💡 <strong style={{ color: "#F5E642" }}>DFW tip:</strong> If your home was built before 1995, soffit vents were often undersized. A roofer should inspect intake capacity before adding exhaust — exhaust without intake creates backdraft pressure.</div>
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 14, padding: 24, textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "#0A1628″, marginBottom: 6 }}>🏠 ProLnk DFW roofers assess your ventilation system as part of every inspection.</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Free attic ventilation check with any roof replacement quote through ProLnk.</div>
        </div>
      </div>
    </div>
  );
}
