import { useState } from 'react';

const moistureGuide = [
  { reading: "below-40", label: "Below 40% Field Capacity", icon: "🚨", status: "Critical — Dry", action: "Water immediately and daily. Soil should feel completely dry and pulling away from foundation. Apply 30-45 min per zone per day until reading reaches 55%.", color: "#7f1d1d", textColor: "#fca5a5" },
  { reading: "40-55", label: "40–55% Field Capacity", icon: "⚠️", status: "Low — Needs Water", action: "Increase watering to every other day. 20-30 min per zone. Focus on perimeter 18 inches from foundation. Check again in 3 days.", color: "#7c4a1e", textColor: "#fbbf24" },
  { reading: "55-65", label: "55–65% Field Capacity", icon: "📊", status: "Acceptable — Monitor", action: "Current moisture is acceptable. Water 2x per week, 15-20 min per zone. Monitor during DFW heat streaks (100°F+ days). Soil should feel slightly damp at 6 inch depth.", color: "#1e3a5f", textColor: "#93c5fd" },
  { reading: "65-75", label: "65–75% Field Capacity", icon: "✅", status: "Optimal — Target Zone", action: "Perfect DFW foundation moisture. Maintain with 2-3x weekly watering, 15 min per zone. At 6 inches, soil feels like a wrung-out sponge. No standing water.", color: "#14532d", textColor: "#86efac" },
  { reading: "75-90", label: "75–90% Field Capacity", icon: "💧", status: "High — Reduce Water", action: "Reduce watering to once per week. Allow soil to drain. Check drainage grading — DFW clay drains slowly. Skip watering during rainy periods. Check for sprinkler overlap.", color: "#1e3a5f", textColor: "#93c5fd" },
  { reading: "above-90", label: "Above 90% Field Capacity", icon: "🌊", status: "Saturated — Stop Watering", action: "Stop all irrigation for 7-10 days. Check for drainage issues. Saturated DFW clay expands maximally and can push foundation. Ensure gutters divert water 5+ feet away.", color: "#7f1d1d", textColor: "#fca5a5" },
];

const zones = [
  { name: "North Perimeter", tip: "Least sun exposure — dries slowest. Check before watering other zones." },
  { name: "South Perimeter", tip: "Most sun exposure in DFW — dries fastest. Often needs 25% more water than north." },
  { name: "East Perimeter", tip: "Morning sun only — moderate drying. Balance with south zone." },
  { name: "West Perimeter", tip: "Afternoon DFW sun is brutal — dries quickly after 3pm heat. Water in morning." },
];

export default function DFWFoundationSoilMoisture2026() {
  const [reading, setReading] = useState<string>("");
  const guide = moistureGuide.find(g => g.reading === reading);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🌱</div>
          <h1 style={{ color: "#F5E642", fontSize: 24, fontWeight: 700, margin: "8px 0 4px" }}>DFW Soil Moisture Management 2026</h1>
          <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Complete Foundation Watering Guide — Dallas-Fort Worth Clay Soils</p>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 10, padding: "14px 18px", marginBottom: 24, border: "1px solid #334155" }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 8 }}>🎯 Target: 65–75% of Field Capacity</div>
          <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>At optimal moisture, DFW clay soil 6 inches down should feel like a damp sponge — wet enough to form a ball but not dripping. Use a soil probe or moisture meter for accuracy. Never guess by surface appearance alone.</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: "#94a3b8", display: "block", marginBottom: 8 }}>My soil moisture meter reads:</label>
          <select value={reading} onChange={e => setReading(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: "#1e2d45", color: "#fff", border: "1px solid #334155", borderRadius: 8, fontSize: 14 }}>
            <option value="">— Select your moisture reading —</option>
            {moistureGuide.map(g => <option key={g.reading} value={g.reading}>{g.label}</option>)}
          </select>
        </div>
        {guide && (
          <div style={{ background: guide.color, border: `1px solid ${guide.textColor}`, borderRadius: 12, padding: "18px 22px", marginBottom: 24 }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{guide.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: guide.textColor, marginBottom: 8 }}>{guide.status}</div>
            <div style={{ fontSize: 13, color: "#f1f5f9", lineHeight: 1.7 }}>{guide.action}</div>
          </div>
        )}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#F5E642", marginBottom: 12 }}>🧭 Watering by Foundation Zone</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
            {zones.map(z => (
              <div key={z.name} style={{ background: "#1e2d45", border: "1px solid #334155", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{z.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{z.tip}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#1e2d45", borderRadius: 10, padding: "14px 18px", border: "1px solid #334155" }}>
          <div style={{ fontSize: 13, color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>📏 How to Test at 6-Inch Depth</div>
          <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>Push soil probe or screwdriver 6 inches into soil near foundation. Crumbly means too dry. Muddy or dripping means too wet. Holds shape like modeling clay means optimal DFW moisture.</div>
        </div>
        <div style={{ marginTop: 24, fontSize: 11, color: "#475569", textAlign: "center" }}>DFW clay soils (expansive) require consistent moisture to prevent differential foundation movement • ProLnk 2026</div>
      </div>
    </div>
  );
}
