import { useState } from 'react';

const counties = [
  { id: "dallas", name: "Dallas County", icon: "🏙️", soil: "Blackland Prairie", pi: "60–80 PI", risk: "Very High", color: "#ef4444″,
    detail: "Most expansive soil in the DFW area. Very high plasticity index (PI 60–80). Homes move significantly with moisture changes. Foundation repair rates among highest in the nation. Expect annual monitoring if no piers installed." },
  { id: "collin", name: "Collin County", icon: "🌾", soil: "Blackland Prairie (North)", pi: "50–75 PI", risk: "High", color: "#f97316″,
    detail: "Northern extension of Blackland Prairie. Slightly less extreme than Dallas County core but still very expansive. Frisco, Plano, McKinney homes see significant seasonal movement. Drainage management critical." },
  { id: "tarrant", name: "Tarrant County", icon: "🤠", soil: "Blackland + Fort Worth Clay", pi: "40–70 PI", risk: "High–Moderate", color: "#f59e0b",
    detail: "Mix of Blackland Prairie and Fort Worth clay series. Western Tarrant transitions to less expansive soils. Fort Worth core areas still high expansion. Variable by neighborhood — soil reports advised before purchase." },
  { id: "denton", name: "Denton County", icon: "🌲", soil: "Transitional/Variable", pi: "25–60 PI", risk: "Moderate–Variable", color: "#eab308″,
    detail: "Transitional zone from Blackland to sandy loam in western areas. Denton city and eastern areas remain high expansion. Trophy Club and Flower Mound areas vary by lot. Site-specific testing recommended." },
  { id: "ellis", name: "Ellis County", icon: "🌻", soil: "Blackland Prairie", pi: "55–80 PI", risk: "Very High", color: "#ef4444″,
    detail: "Among the most expansive soils in North Texas. Waxahachie and Ennis areas see dramatic seasonal heave. Older homes frequently have significant foundation issues without piers. New construction requires robust systems." },
  { id: "johnson", name: "Johnson County", icon: "🏡", soil: "Blackland/Sandy Mix", pi: "35–65 PI", risk: "High–Moderate", color: "#f97316″,
    detail: "Southern DFW fringe with mixed soil conditions. Cleburne and Burleson areas vary — some Blackland, some sandier profiles. Generally high expansion risk but less uniform than core DFW counties." },
];

export default function DFWFoundationSoilProfile2026() {
  const [selected, setSelected] = useState("");

  const active = counties.find(c => c.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🪨</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Foundation Soil Profile by County 2026
          </h1>
          <p style={{ color: "#94a3b8″, maxWidth: 580, margin: "0 auto" }}>
            Dallas-Fort Worth sits on some of the most expansive clay soils in North America. Know your county's risk before buying or building.
          </p>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>📊 What Is Plasticity Index (PI)?</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>
            PI measures how much soil expands and contracts with moisture. Higher PI = more movement. DFW Blackland Prairie soils (PI 60–80) are classified as <strong style={{ color: "#F5E642″ }}>very highly expansive</strong> — they can exert thousands of pounds of force per square foot on a foundation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {counties.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id === selected ? "" : c.id)}
              style={{ background: selected === c.id ? "#1e3a5f" : "#112240″, border: `2px solid ${selected === c.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 10, padding: "1rem", cursor: "pointer", color: "#e2e8f0", textAlign: "left", transition: "all 0.2s" }}
            >
              <div style={{ fontSize: "1.4rem" }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.name}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>{c.soil}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ background: c.color, borderRadius: 4, padding: "2px 8px", fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{c.risk}</span>
                <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{c.pi}</span>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", borderLeft: `4px solid ${active.color}`, marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.5rem" }}>{active.icon} {active.name} — Detailed Profile</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", textAlign: "center" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>Soil Type</div>
                <div style={{ color: "#e2e8f0″, fontWeight: 600, fontSize: "0.9rem" }}>{active.soil}</div>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", textAlign: "center" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>Plasticity Index</div>
                <div style={{ color: "#F5E642″, fontWeight: 700 }}>{active.pi}</div>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", textAlign: "center" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>Foundation Risk</div>
                <div style={{ color: active.color, fontWeight: 700 }}>{active.risk}</div>
              </div>
            </div>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>{active.detail}</p>
          </div>
        )}

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem" }}>
            🏠 Foundation concerns in DFW? <span style={{ color: "#F5E642″ }}>ProLnk connects you with vetted structural engineers and foundation specialists.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
