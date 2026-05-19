import { useState } from 'react';

const ageGuide = [
  { label: "1990–2000", priorities: ["🌡️ HVAC replacement — units are 25+ yrs", "🏠 Roof replacement if original", "🔌 Check for aluminum wiring"] },
  { label: "2000–2010", priorities: ["🌡️ HVAC inspection — approaching end of life", "💧 Water heater age check (10–15 yr life)", "🏗️ Foundation crack mapping — clay movement"] },
  { label: "2010–2020", priorities: ["🌡️ HVAC tune-up + filter upgrade", "🌿 Irrigation system efficiency audit", "🔍 Sealant check on windows and doors"] },
  { label: "2020–Present", priorities: ["🌡️ Register HVAC warranty now", "📋 Document all appliance warranties", "🏗️ Monitor new foundation — first 5 yrs critical"] },
];

export default function KellerHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>
          ProLnk City Guide · Keller TX
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
          🏫 Keller Homeowner Guide 2026
        </h1>
        <p style={{ color: "#9BA8C0", marginBottom: 32, lineHeight: 1.6 }}>
          Keller is Tarrant County&apos;s crown jewel — top schools, high ownership rates, and 1990s–2010s homes now hitting critical maintenance windows. Clay soil foundation movement, aging HVAC systems (12–20 yrs old), and high ownership pride make proactive maintenance essential.
        </p>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>⚠️ Top Keller Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "🏗️", label: "Clay Foundation", desc: "Seasonal expansion/contraction causes slab movement" },
              { icon: "🌡️", label: "HVAC Age", desc: "2000s-era units now 15–25 yrs — replacement season" },
              { icon: "🌿", label: "Irrigation", desc: "Keller lots skew larger — irrigation upkeep is critical" },
              { icon: "🏠", label: "Roof Age", desc: "1990s roofs need full replacement — hail adds urgency" },
            ].map((r) => (
              <div key={r.label} style={{ background: "#0A1628", borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{r.label}</div>
                <div style={{ fontSize: 13, color: "#9BA8C0", marginTop: 4 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#F5E642" }}>📅 Select Build Year → Top 3 Repair Priorities</h2>
          <p style={{ color: "#9BA8C0", fontSize: 13, marginBottom: 16 }}>Each era of Keller home has its own critical maintenance window.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {ageGuide.map((a, i) => (
              <button key={a.label} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {a.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 14 }}>Built {ageGuide[selected].label} — Your Top Priorities</div>
              {ageGuide[selected].priorities.map((p) => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 15 }}>
                  <span>🔧</span> {p}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Keller Homeowners Trust ProLnk</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>Get matched with vetted Tarrant County contractors who know Keller homes and clay soil.</div>
          <a href="/homeowner-signup" style={{ background: "#0A1628", color: "#F5E642", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}