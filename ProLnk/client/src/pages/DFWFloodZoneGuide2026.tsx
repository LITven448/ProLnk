import { useState } from 'react';

const locationTypes: Record<string, { zone: string; risk: string; insurance: string; action: string; color: string }> = {
  "Near Trinity River (Dallas)": {
    zone: "Zone AE",
    risk: "High — 1% annual chance of flooding (100-year floodplain)",
    insurance: "Federal flood insurance REQUIRED if mortgage exists (~$800–2,400/yr)",
    action: "Check FEMA FIRM panel at msc.fema.gov using your exact address",
    color: "#EF4444″,
  },
  "Low-lying Creek Areas": {
    zone: "Zone AE or Zone A",
    risk: "Moderate-High — depends on drainage infrastructure improvements",
    insurance: "Flood insurance required; get elevation certificate to potentially reduce premium",
    action: "Order elevation certificate from licensed surveyor ($300–600)",
    color: "#F97316″,
  },
  "Typical DFW Suburb (Flat)": {
    zone: "Zone X (Shaded)",
    risk: "Moderate — outside 100-yr floodplain but inside 500-yr",
    insurance: "Not required but strongly recommended (~$400–900/yr)",
    action: "Still buy flood insurance — Harvey-type events flood Zone X properties",
    color: "#F5E642″,
  },
  "Elevated / Upland Area": {
    zone: "Zone X (Unshaded)",
    risk: "Minimal — FEMA considers lowest risk category",
    insurance: "Not required; optional preferred risk policy ~$200–500/yr",
    action: "Verify your lot is truly elevated — check topographic data on Google Earth",
    color: "#4ADE80″,
  },
  "Recent Development (Post-2010)": {
    zone: "Varies — may have been regraded",
    risk: "Unknown without current FIRM check — maps may lag development",
    insurance: "Verify with current FEMA map; development can change drainage patterns",
    action: "Check if development created Letters of Map Amendment (LOMA) changes",
    color: "#A78BFA",
  },
};

export default function DFWFloodZoneGuide2026() {
  const [selected, setSelected] = useState<string>("");

  const result = selected ? locationTypes[selected] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌊</div>
          <h1 style={{ color: "#F5E642″, fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Flood Zone Guide 2026</h1>
          <p style={{ color: "#9BA3B2″, fontSize: 16 }}>Check flood risk before you buy — DFW flooding costs billions annually</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          {[{ icon: "🗺️", label: "FEMA Flood Map", url: "msc.fema.gov", desc: "Official source — free lookup by address" },{ icon: "📋", label: "Zone AE", desc: "High risk — flood insurance required with mortgage" },{ icon: "🟡", label: "Zone X Shaded", desc: "Moderate risk — 500-year floodplain" },{ icon: "✅", label: "Zone X Unshaded", desc: "Minimal risk — lowest FEMA category" }].map(card => (
            <div key={card.label} style={{ background: "#0F1E35″, borderRadius: 12, padding: 18, border: "1px solid #1E3A5F" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: "#9BA3B2″, fontSize: 13 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0F1E35″, borderRadius: 12, padding: 24, marginBottom: 32, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>🔍 Assess Your DFW Location</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {Object.keys(locationTypes).map(t => (
              <button key={t} onClick={() => setSelected(t)} style={{ padding: "10px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: selected === t ? "#F5E642″ : "#1A2E48", color: selected === t ? "#0A1628" : "#E8EAF0", fontWeight: 600, fontSize: 13 }}>{t}</button>
            ))}
          </div>
          {result && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20, border: `1px solid ${result.color}` }}>
              <div style={{ marginBottom: 12 }}><span style={{ color: result.color, fontWeight: 700 }}>📍 Flood Zone: </span>{result.zone}</div>
              <div style={{ marginBottom: 12 }}><span style={{ color: "#F5E642″ }}>⚠️ Risk: </span>{result.risk}</div>
              <div style={{ marginBottom: 12 }}><span style={{ color: "#F5E642″ }}>🏦 Insurance: </span>{result.insurance}</div>
              <div style={{ padding: "12px 16px", background: "#0F1E35″, borderRadius: 8, border: "1px solid #1E3A5F" }}><span style={{ color: "#4ADE80" }}>✅ Action: </span>{result.action}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#0F1E35″, borderRadius: 12, padding: 24, border: "1px solid #1E3A5F" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>⚠️ Critical: Hurricane Harvey Lesson</h2>
          <p style={{ color: "#9BA3B2″, lineHeight: 1.7 }}>Over 80% of Harvey-flooded Houston homes were outside the 100-year floodplain. DFW faces similar extreme rain events. The Trinity River floodplain in Dallas covers large sections of West Dallas, southern Dallas, and Irving. Always check msc.fema.gov with your exact address — not just the neighborhood. Standard homeowners insurance DOES NOT cover flood damage.</p>
        </div>
      </div>
    </div>
  );
}

