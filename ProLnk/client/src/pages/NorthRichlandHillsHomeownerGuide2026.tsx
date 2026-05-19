import { useState } from 'react';

const decadeRisk = [
  {
    label: "1970s",
    plumbing: "🔴 HIGH — Cast iron drains likely failing, galvanized supply lines corroding",
    electrical: "🔴 HIGH — Original panels, possible Federal Pacific, no GFCI",
    action: "Full plumbing scope + panel replacement recommended immediately",
  },
  {
    label: "1980s",
    plumbing: "🟠 MEDIUM-HIGH — Cast iron still common, supply lines aging",
    electrical: "🟠 MEDIUM — Panels upgraded but may be 150A — verify capacity",
    action: "Scope main drain lines + breaker load test this year",
  },
  {
    label: "1990s",
    plumbing: "🟡 MEDIUM — PVC likely on supply, cast iron still on drain",
    electrical: "🟡 MEDIUM — 200A panels common, check AFCI/GFCI coverage",
    action: "Camera main sewer line, add GFCI to kitchens/baths",
  },
  {
    label: "2000s+",
    plumbing: "🟢 LOW — Modern PVC/CPVC, check for PEX quality",
    electrical: "🟢 LOW — Modern panel, verify arc fault protection",
    action: "Routine inspection — focus on HVAC and roof age",
  },
];

export default function NorthRichlandHillsHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642", letterSpacing: 2, textTransform: "uppercase" }}>
          ProLnk City Guide · North Richland Hills TX
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
          🏙️ North Richland Hills Homeowner Guide 2026
        </h1>
        <p style={{ color: "#9BA8C0", marginBottom: 32, lineHeight: 1.6 }}>
          NRH is a dense north Tarrant suburb with housing stock spanning 1970s to 1990s. Original cast iron sewer drains are the silent killer here — they corrode and collapse with zero warning. Electrical panel upgrades are also overdue on a large share of NRH homes.
        </p>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642" }}>⚠️ Top NRH Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "🚿", label: "Cast Iron Drains", desc: "1970s–1980s homes likely have failing sewer lines" },
              { icon: "⚡", label: "Panel Upgrades", desc: "Federal Pacific and Zinsco panels still active in NRH" },
              { icon: "🏗️", label: "Foundation", desc: "Dense clay soil — settle cracks in 1970s slabs" },
              { icon: "🌡️", label: "HVAC Age", desc: "Many 1990s units now at or past 25-year lifespan" },
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
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#F5E642" }}>🔧 Select Decade Built → Plumbing & Electrical Risk</h2>
          <p style={{ color: "#9BA8C0", fontSize: 13, marginBottom: 16 }}>Know your risk level before a failure forces your hand.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {decadeRisk.map((d, i) => (
              <button key={d.label} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642" : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {d.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628", borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: 14 }}>Built in the {decadeRisk[selected].label}</div>
              <div style={{ marginBottom: 10, fontSize: 14 }}><span style={{ fontWeight: 700 }}>🚿 Plumbing:</span> {decadeRisk[selected].plumbing}</div>
              <div style={{ marginBottom: 14, fontSize: 14 }}><span style={{ fontWeight: 700 }}>⚡ Electrical:</span> {decadeRisk[selected].electrical}</div>
              <div style={{ background: "#111E35", borderRadius: 8, padding: 12, fontSize: 14, color: "#F5E642" }}>
                ✅ Recommended Action: {decadeRisk[selected].action}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642", color: "#0A1628", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Fix It Before It Fails</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>ProLnk connects NRH homeowners with licensed plumbers and electricians who know older Tarrant County homes.</div>
          <a href="/homeowner-signup" style={{ background: "#0A1628", color: "#F5E642", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}