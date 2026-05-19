import { useState } from 'react';

const concerns = [
  { id: "hail", label: "Checking for hail damage from spring storms", result: "July is the right time to assess spring hail damage before it worsens. From the ground with binoculars, look for missing granules (dark spots on shingles), dented ridge cap, and bent metal flashing. DFW averages 7 hail events per year — many go unnoticed until leaks appear." },
  { id: "heat", label: "Worried about heat damage to shingles", result: "DFW July averages 99°F — roof surface temps reach 160–180°F. Standard 3-tab shingles degrade faster than architectural shingles at these temps. If your roof is 10+ years old, July is the last chance to replace before August peak UV accelerates granule loss." },
  { id: "attic", label: "Attic feels like a sauna even with AC running", result: "Inadequate attic ventilation is the #1 cause of premature shingle failure in DFW. You need 1 sq ft of ventilation per 150 sq ft of attic space. Ridge vents + soffit vents create the thermal stack effect. A properly ventilated attic stays within 10–20°F of outside temp." },
  { id: "walk", label: "Thinking about walking the roof to inspect", result: "Never walk a DFW roof between 10am and 5pm in July. Surface temps exceed 160°F — serious burn risk, plus heat exhaustion risk is extreme. Inspect from ground with binoculars, or hire a roofer for morning (before 9am) inspection only." },
  { id: "ventilation", label: "AC bill spiked — wondering if roof is the cause", result: "A poorly ventilated attic can add $200–400/month to cooling costs in DFW July. Heat radiates from the attic floor down into living space. Radiant barrier + ridge vents are a high-ROI upgrade — often pays back in 2–3 DFW summers." },
];

export default function DFWRoofingJulyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: "0.5rem", fontSize: "0.85rem", color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>DFW Roofing Guide 2026</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>🏗️ DFW July Roofing Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem", lineHeight: 1.6 }}>
          July is DFW's hottest month — and your roof’s most demanding season. Hail season winds down but isn’t over, surface temps hit 160–180°F, and UV degradation accelerates. Here’s what to watch and how to inspect safely.
        </p>

        <div style={{ background: "#111d35″, borderRadius: 10, padding: "1.25rem", marginBottom: "2rem", borderLeft: "4px solid #ef4444" }}>
          <div style={{ fontWeight: 700, color: "#ef4444″, marginBottom: "0.5rem" }}>⚠️ Safety Rule: No Roof Walking 10am–5pm</div>
          <p style={{ color: "#94a3b8″, lineHeight: 1.65, margin: 0 }}>DFW roof surface temps reach 160–180°F in July afternoon. Severe burn risk + heat exhaustion. Always inspect from the ground with binoculars, or schedule a roofer for early morning (before 9am) only.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
          {[
            { icon: "🌡️", label: "Avg High", val: "99°F" },
            { icon: "🏠", label: "Roof Surface", val: "Up to 180°F" },
            { icon: "⛈️", label: "Hail Risk", val: "Winding Down" },
          ].map(card => (
            <div key={card.label} style={{ background: "#111d35″, borderRadius: 10, padding: "0.875rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{card.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.75rem", marginBottom: "0.25rem" }}>{card.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.9rem" }}>{card.val}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>🔍 What's Your July Roofing Concern?</h2>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? "#1e3a5f" : "#111d35″, border: `2px solid ${selected === c.id ? "#F5E642" : "#1e3a5f"}`, borderRadius: 8, padding: "0.85rem 1rem", color: "#fff", textAlign: "left", cursor: "pointer", fontSize: "0.95rem", transition: "all 0.15s" }}>
              {c.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: "#1e3a5f", border: "2px solid #F5E642″, borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>🔧 Guide</div>
            <p style={{ color: "#e2e8f0″, lineHeight: 1.65, margin: 0 }}>{match.result}</p>
          </div>
        )}
      </div>
    </div>
  );
}