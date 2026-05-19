import { useState } from 'react';

const decades = [
  { decade: "1990s", label: "1990s Home", tips: ["HVAC system 25–30 years old — full replacement likely needed", "Slab foundation on Dallas/Ellis county clay boundary — get inspection", "Original water heater long overdue — risk of failure increases after year 20″] },
  { decade: "2000s", label: "2000s Home", tips: ["HVAC at end of standard lifespan (15–20 yr) — assess before next summer", "Check slab perimeter for clay soil expansion cracks", "Roof shingles likely original — inspect for granule loss and curling"] },
  { decade: "2010s", label: "2010s Home", tips: ["HVAC mid-cycle — clean coils, check refrigerant, tune annually", "Monitor foundation moisture with soaker hose perimeter system", "Water heater approaching 15-year mark — inspect anode rod"] },
  { decade: "2020s", label: "2020s Build", tips: ["Builder warranty: document all punch-list items before expiration", "Annual HVAC tune-up to maintain efficiency in DFW heat", "Foundation perimeter moisture management from day 1″] }
];

const factors = [
  { icon: "📍", title: "Ellis + Dallas County", desc: "Glenn Heights spans two counties — permit and code requirements vary by address" },
  { icon: "💰", title: "Affordable DFW Entry", desc: "Strong investment case: protect equity with proactive maintenance" },
  { icon: "🏗️", title: "Clay Soil Foundation", desc: "Dallas/Ellis clay boundary creates foundation movement risk across all eras" },
  { icon: "🚗", title: "Metro Access Value", desc: "Between Dallas and Waxahachie — commuter demand supports home value growth" }
];

export default function GlennHeightsHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = decades.find(d => d.decade === selected);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem" }}>🏘️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>Glenn Heights TX Homeowner Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "0.95rem" }}>Ellis/Dallas County Line — Affordable DFW Metro Maintenance Priority Guide</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {factors.map(f => (
            <div key={f.title} style={{ background: "#111e35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{f.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: 4 }}>{f.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.85rem", marginTop: 4 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginTop: 0 }}>🏠 Select Your Home's Decade</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {decades.map(d => (
              <button key={d.decade} onClick={() => setSelected(d.decade)}
                style={{ background: selected === d.decade ? "#F5E642″ : "#1e3a5f", color: selected === d.decade ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>
                {d.label}
              </button>
            ))}
          </div>
          {current && (
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.5rem" }}>Glenn Heights Priority Guide — {current.label}</div>
              {current.tips.map((tip, i) => (
                <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.9rem", padding: "0.4rem 0", borderBottom: "1px solid #1e3a5f" }}>✅ {tip}</div>
              ))}
            </div>
          )}
          {!current && <div style={{ color: "#475569″, fontSize: "0.9rem" }}>Select your home's build decade to see Glenn Heights-specific maintenance priorities.</div>}
        </div>

        <div style={{ background: "#111e35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #1e3a5f" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1rem", marginTop: 0 }}>📋 Glenn Heights Annual Checklist</h2>
          {["Verify which county your address falls in (Ellis vs Dallas) for permits", "Foundation inspection every 2 years — clay soil boundary risk", "HVAC annual tune-up before summer (May deadline)", "Roof inspection after hail events — DFW south corridor exposure"].map((item, i) => (
            <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.88rem", padding: "0.4rem 0", borderBottom: i < 3 ? "1px solid #1e3a5f" : "none" }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk connects Glenn Heights homeowners with verified local pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
