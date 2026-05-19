import { useState } from 'react';

const zones = [
  {
    label: "North DFW", icon: "🧊", zip: "75022, 75034, 76092″,
    heating: "Higher", cooling: "Moderate", humidity: "Low-Medium",
    tip: "More heating degree days — consider dual-fuel heat pump. Size for heating load, not just cooling.",
    seasons: "~120 heating days, ~95 cooling days",
  },
  {
    label: "South DFW", icon: "☀️", zip: "75116, 75232, 76010″,
    heating: "Lower", cooling: "High", humidity: "Medium",
    tip: "More cooling hours annually. Prioritize SEER rating (18+ SEER2 recommended). Shade AC unit if possible.",
    seasons: "~80 heating days, ~115 cooling days",
  },
  {
    label: "East DFW", icon: "💧", zip: "75040, 75041, 75228″,
    heating: "Moderate", cooling: "Moderate-High", humidity: "High",
    tip: "Higher humidity strains dehumidification. Look for AC units with variable-speed compressors for better moisture removal.",
    seasons: "~100 heating days, ~105 cooling days, higher latent load",
  },
  {
    label: "West DFW", icon: "🌵", zip: "76052, 76008, 76001″,
    heating: "Moderate", cooling: "High", humidity: "Low-Medium",
    tip: "More dust and particulates — change filters every 30 days minimum. MERV 11+ filters reduce blower wear.",
    seasons: "~90 heating days, ~110 cooling days, dust load significant",
  },
];

const seerGuide = [
  { seer: "14-15 SEER2″, fit: "Budget install, adequate for all zones", cost: "Lower upfront" },
  { seer: "16-17 SEER2″, fit: "Good balance for South/West DFW", cost: "Moderate" },
  { seer: "18-20 SEER2″, fit: "Best ROI for East DFW high-humidity zones", cost: "Higher upfront, lower utility" },
  { seer: "21+ SEER2″, fit: "Premium variable-speed for North DFW dual-fuel", cost: "High investment, max comfort" },
];

export default function DFWHVACZipCodeEfficiency2026() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>❄️ DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HVAC Efficiency by DFW Location</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32 }}>Where you live in DFW significantly affects your HVAC system choice, sizing, and efficiency. North DFW heats more; South DFW cools more; East has humidity; West has dust.</p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>🗺️ Select Your DFW Zone</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {zones.map((z, i) => (
            <div key={i} onClick={() => setSelectedZone(selectedZone === i ? null : i)}
              style={{ background: selectedZone === i ? "#1e3a5f" : "#0f1f3a", borderRadius: 12, padding: 18, cursor: "pointer",
                border: `2px solid ${selectedZone === i ? "#F5E642" : "transparent"}` }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{z.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{z.label}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>e.g. {z.zip}</div>
              <div style={{ fontSize: 12, color: "#94a3b8″ }}>Heating demand: <span style={{ color: "#F5E642" }}>{z.heating}</span></div>
              <div style={{ fontSize: 12, color: "#94a3b8″ }}>Cooling demand: <span style={{ color: "#F5E642" }}>{z.cooling}</span></div>
              <div style={{ fontSize: 12, color: "#94a3b8″ }}>Humidity: <span style={{ color: "#F5E642" }}>{z.humidity}</span></div>
              {selectedZone === i && (
                <div style={{ marginTop: 12, padding: "10px 12px", background: "#0A1628″, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: "#94a3b8″, marginBottom: 4 }}>{z.seasons}</div>
                  <div style={{ fontSize: 13, color: "#cbd5e1″ }}>{z.tip}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F5E642″, marginBottom: 16 }}>⚡ SEER2 Rating Guide for DFW</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
          {seerGuide.map((s, i) => (
            <div key={i} style={{ background: "#0f1f3a", borderRadius: 10, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#F5E642″ }}>{s.seer}</div>
                <div style={{ fontSize: 13, color: "#94a3b8″ }}>{s.fit}</div>
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{s.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3a", borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>🔧 Universal DFW Sizing Rule</div>
          <p style={{ color: "#94a3b8″, fontSize: 14, margin: 0 }}>Never size HVAC from square footage alone. DFW requires a Manual J load calculation accounting for insulation, window orientation, ceiling height, and local climate data. Oversized systems short-cycle and fail to dehumidify properly.</p>
        </div>

        <div style={{ padding: 16, background: "#0f1f3a", borderRadius: 10, fontSize: 13, color: "#64748b", textAlign: "center" }}>
          ProLnk connects DFW homeowners with certified HVAC pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
