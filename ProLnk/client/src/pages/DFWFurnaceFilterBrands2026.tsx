import { useState } from 'react';

const concerns = [
  {
    concern: "DFW Cedar Fever & Allergies", icon: "🤧",
    recommendation: "Nordic Pure MERV-13″,
    why: "Best value MERV-13 filter for DFW cedar season (Dec–Feb). Captures pollen particles that Filtrete Basic misses. Change every 60 days during cedar season, 90 days otherwise.",
    avoid: "Cheap fiberglass — useless for DFW allergens",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    concern: "General Air Quality", icon: "💨",
    recommendation: "Filtrete 1500 MPR (3M)",
    why: "Widely available at Home Depot and Target across DFW. Good MERV-11 equivalent performance. Captures dust, pet dander, mold spores. Replace every 90 days.",
    avoid: "Fiberglass panel filters — MERV 1-4 only captures large debris",
    rating: "⭐⭐⭐⭐"
  },
  {
    concern: "Pet Dander & Odors", icon: "🐾",
    recommendation: "Filtrete 2800 MPR Allergen + Odor",
    why: "MERV-13 equivalent with activated carbon layer. Captures pet dander (0.3–1 micron) and neutralizes pet odors. DFW homes with multiple pets benefit most.",
    avoid: "Honeywell basic — no odor control",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    concern: "Whole-Home Filtration", icon: "🏠",
    recommendation: "Aprilaire Media Filter System",
    why: "5-inch media filter installed by your HVAC pro. Lasts 6–12 months vs 1–3 months for standard filters. MERV-11 to MERV-16 options. Significant DFW adoption due to cedar and grass season.",
    avoid: "DIY installs — requires HVAC modification",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    concern: "Budget-Friendly", icon: "💰",
    recommendation: "Nordic Pure Basic MERV-8″,
    why: "Best value for light filtration. Ships direct, often cheaper than box store. MERV-8 captures most dust and lint. Adequate for DFW outside allergen seasons.",
    avoid: "Dollar store filters — MERV rating unknown, often 1–2″,
    rating: "⭐⭐⭐"
  },
  {
    concern: "HVAC System Protection", icon: "❄️",
    recommendation: "Honeywell Home FC100A1037″,
    why: "Designed to protect HVAC equipment without restricting airflow. Lower MERV (7–8) means less static pressure. Ideal for older DFW systems or systems with flow restrictions.",
    avoid: "MERV-16 in older systems — can restrict airflow and damage equipment",
    rating: "⭐⭐⭐⭐"
  },
];

export default function DFWFurnaceFilterBrands2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = concerns.find(c => c.concern === selected);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌬️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Air Filter Brand Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Best HVAC filter brands for DFW climate and allergen seasons</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>📅 DFW Allergen Calendar</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Cedar: Dec–Feb (worst) • Oak/Elm: Mar–Apr • Grass: May–Jun • Ragweed: Sep–Nov. DFW has one of the longest allergen seasons in the US — filter selection matters.</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>What Is Your Main Concern?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {concerns.map(c => (
            <button key={c.concern} onClick={() => setSelected(c.concern)}
              style={{ backgroundColor: selected === c.concern ? "#F5E642″ : "#111f3a", color: selected === c.concern ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "12px 14px", cursor: "pointer", fontWeight: 600, fontSize: 13, textAlign: "left" }}>
              {c.icon} {c.concern}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 24, border: "2px solid #F5E642″ }}>
            <div style={{ fontSize: 13, color: "#94a3b8″, marginBottom: 4 }}>Best filter for {result.concern}:</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642″, marginBottom: 4 }}>🏆 {result.recommendation}</div>
            <div style={{ fontSize: 14, marginBottom: 12 }}>{result.rating}</div>
            <p style={{ color: "#cbd5e1″, fontSize: 14, marginBottom: 12 }}>{result.why}</p>
            <div style={{ padding: 10, backgroundColor: "#0A1628″, borderRadius: 8, fontSize: 13, color: "#ef4444" }}>
              ❌ Avoid: {result.avoid}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
