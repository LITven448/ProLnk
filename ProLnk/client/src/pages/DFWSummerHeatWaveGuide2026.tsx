import { useState } from 'react';

const scenarios = [
  {
    label: "Day 1–2 (110°F)",
    home: "Standard AC",
    plan: ["Set thermostat to 76°F (not 72°F — reduces compressor strain)", "Close blinds/shades on south and west windows by 10am", "Run ceiling fans counterclockwise", "Pre-cool home to 70°F before 2pm peak"],
  },
  {
    label: "Day 3–5 (110°F+)",
    home: "Standard AC",
    plan: ["Schedule HVAC tune-up — filters, refrigerant check", "Move sleep location to lowest floor", "Portable AC unit as backup ($350–500, window install)", "Identify nearest cooling center in your county"],
  },
  {
    label: "AC Failure",
    home: "No AC",
    plan: ["Call 211 for cooling center locations (Dallas, Tarrant, Collin, Denton counties)", "Wet towels on pulse points — wrists, neck, ankles", "Seal interior room with portable AC for safe zone", "Do NOT use gas stove — adds heat and CO risk"],
  },
];

const coolingCenters = [
  { county: "Dallas County", phone: "214-819-1920″, locations: "Rec centers, libraries open 24/7 during heat emergency" },
  { county: "Tarrant County", phone: "817-850-7401″, locations: "Community centers, senior centers, cooling buses" },
  { county: "Collin County", phone: "972-548-4600″, locations: "Public libraries, select fire stations" },
  { county: "Denton County", phone: "940-349-2585″, locations: "Community centers and libraries" },
];

export default function DFWSummerHeatWaveGuide2026() {
  const [sel, setSel] = useState(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Heat Wave Survival Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>When DFW hits 110°F+ — HVAC prep, backup cooling, and community resources that save lives.</p>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 14 }}>🌡️ Your Situation → Action Plan</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                background: sel === i ? "#F5E642″ : "#1a3a5c",
                color: sel === i ? "#0A1628″ : "#fff",
                border: "none", borderRadius: 8, padding: "9px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12
              }}>{s.label}</button>
            ))}
          </div>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12 }}>Situation: {scenarios[sel].home}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {scenarios[sel].plan.map((p, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ color: "#F5E642″ }}>🔥</span>
                <span style={{ color: "#e2e8f0″, fontSize: 14 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 14 }}>🏛️ DFW Cooling Centers by County</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {coolingCenters.map((c, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "#F5E642″, fontWeight: 700, fontSize: 14 }}>{c.county}</span>
                  <span style={{ color: "#94a3b8″, fontSize: 13 }}>{c.phone}</span>
                </div>
                <div style={{ color: "#64748b", fontSize: 12 }}>{c.locations}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 10 }}>👥 Neighbors to Check On</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Elderly neighbors (65+)", "Households without AC", "Households with infants", "Anyone without transportation", "Households with chronic illness", "Renters in older buildings"].map((n, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }}>
                🤝 {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
