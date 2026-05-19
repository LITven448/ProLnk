import { useState } from 'react';

const situations = [
  { label: "Tight side yard (< 24 inches)", recommendation: "Top Discharge", reason: "Side discharge requires 24\"+ clearance from walls/fences. Top discharge exhausts upward, works in narrow DFW side yards." },
  { label: "Standard backyard placement", recommendation: "Top Discharge", reason: "Top discharge is the DFW residential default — exhausts heat upward away from patios and landscaping." },
  { label: "Commercial rooftop unit", recommendation: "Side Discharge", reason: "Rooftop applications use side discharge to direct airflow horizontally away from the unit and HVAC equipment." },
  { label: "Tight overhead clearance (< 18 inches)", recommendation: "Side Discharge", reason: "Top discharge needs vertical clearance. If overhead obstructed (deck, overhang), side discharge redirects airflow." },
  { label: "HOA noise concern near neighbor", recommendation: "Top Discharge", reason: "Top discharge disperses sound upward. Side discharge can project noise directly toward neighboring properties." },
  { label: "High-efficiency unit (20+ SEER)", recommendation: "Top Discharge", reason: "Most high-efficiency DFW residential units use top discharge for optimal heat rejection efficiency." },
];

export default function DFWHVACCondenserTopGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌀</div>
          <h1 style={{ color: "#F5E642″, fontSize: 26, fontWeight: 800, margin: "0 0 8px" }}>
            DFW AC Condenser Discharge Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>
            Top vs side discharge — what DFW contractors and homeowners need to know
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          {[
            { icon: "⬆️", title: "Top Discharge", desc: "Most common in DFW residential. Fan exhausts heat upward. Requires vertical clearance above unit." },
            { icon: "➡️", title: "Side Discharge", desc: "Common in commercial and rooftop installs. Fan exhausts horizontally. Needs 24\"+ side clearance." },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 24, border: "1px solid #1e3a5f", marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 17, fontWeight: 700, marginBottom: 16 }}>📍 Your DFW Installation Situation</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {situations.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  backgroundColor: selected === i ? "#F5E642″ : "#0A1628",
                  color: selected === i ? "#0A1628″ : "#e2e8f0",
                  border: "1px solid " + (selected === i ? "#F5E642″ : "#1e3a5f"),
                  borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                  textAlign: "left", fontSize: 14, fontWeight: selected === i ? 700 : 400,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, backgroundColor: "#0A1628″, borderRadius: 10, padding: 18, border: "1px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
                ✅ Use: {situations[selected].recommendation}
              </div>
              <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].reason}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: "#112240″, borderRadius: 12, padding: 20, border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🌡️ DFW Climate Context</h3>
          <div style={{ color: "#94a3b8″, fontSize: 13, lineHeight: 1.7 }}>
            DFW summers regularly exceed 105°F. Top discharge units in DFW residential installs benefit from rising hot air convection — the fan and natural buoyancy work together. Side discharge units in DFW must be positioned so exhausted air does not recirculate back into the intake, which drops efficiency by 10–20% and risks compressor damage.
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 28, color: "#475569″, fontSize: 12 }}>
          ProLnk DFW HVAC Guide 2026 — Free Resource for Homeowners
        </div>
      </div>
    </div>
  );
}
