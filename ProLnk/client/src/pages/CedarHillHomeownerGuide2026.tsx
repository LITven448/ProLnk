import { useState } from 'react';

const homeTypes = [
  { type: "hillside", label: "Hillside/Elevated Home", tips: ["Highest-elevation lots in Dallas County — unique drainage patterns, inspect retaining walls", "Stronger wind exposure at elevation — check roof fasteners and flashing annually", "Moisture drainage away from foundation critical on sloped lots"] },
  { type: "lakeside", label: "Near Joe Pool Lake", tips: ["Higher humidity than inland DFW — check attic ventilation and moisture barriers", "HVAC works harder in humid conditions — biannual service strongly advised", "Wood rot risk elevated near lake — inspect decks, trim, and wood siding annually"] },
  { type: "standard", label: "Standard Subdivision", tips: ["1990s-2010s homes entering HVAC mid/late cycle — assess equipment age", "Cedar Hill clay soil on valley lots can cause foundation movement", "Gutters critical — heavy hillside rains can overwhelm standard downspout systems"] }
];

const features = [
  { icon: "⛰️", title: "Highest Elevation", desc: "Cedar Hill sits at the highest elevation in Dallas County — different soil and drainage dynamics" },
  { icon: "💧", title: "Joe Pool Lake Humidity", desc: "Lake proximity elevates humidity above typical DFW levels for nearby homes" },
  { icon: "🌳", title: "Hill Country Feel", desc: "Dense trees and terrain increase gutter clogging and root intrusion risk" },
  { icon: "🏘️", title: "1990s–2010s Stock", desc: "Dominant era homes approaching key maintenance milestones in 2026″ }
];

export default function CedarHillHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = homeTypes.find(h => h.type === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>⛰️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>Cedar Hill TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "0.95rem" }}>Elevation, Lake Humidity & 1990s–2010s Home Maintenance Priorities</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "#111e35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{f.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 4 }}>{f.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginTop: 0 }}>🏠 Select Your Home Type + Location</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {homeTypes.map(h => (
              <button key={h.type} onClick={() => setSelected(h.type)}
                style={{ background: selected === h.type ? "#F5E642″ : "#1e3a5f", color: selected === h.type ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                {h.label}
              </button>
            ))}
          </div>
          {current && (
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Cedar Hill Maintenance Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569″, fontSize: "0.9rem" }}>Select your home type to see Cedar Hill-specific maintenance priorities.</div>}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginTop: 0 }}>📋 Cedar Hill Annual Priorities</h2>
          {["Gutter cleaning 2x/year — heavy tree coverage causes rapid clogging", "Retaining wall inspection after heavy rains (hillside properties)", "HVAC biannual service — humidity load exceeds flat DFW norms", "Foundation perimeter moisture management on clay-soil valley lots"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk connects Cedar Hill homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
