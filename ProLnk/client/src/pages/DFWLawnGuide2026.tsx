import { useState } from 'react';

const schedules: Record<string, { season: string; tasks: string[] }[]> = {
  bermuda: [
    { season: "🌱 Spring (Mar–Apr)", tasks: ["Scalp mow at 0.5\" to remove winter thatch", "Apply pre-emergent herbicide (March 1)", "Begin watering 1\" per week once temps hit 70°F"] },
    { season: "☀️ Summer (May–Aug)", tasks: ["Mow every 5–7 days at 1.5\"", "Water 1–1.5\"/week (early morning)", "Fertilize with 32-0-10 in May, July", "Watch for chinch bugs in hot dry spells"] },
    { season: "🍂 Fall (Sep–Nov)", tasks: ["Fertilize with winterizer in September", "Reduce mowing as growth slows", "Bermuda goes dormant below 55°F — normal"] },
    { season: "❄️ Winter (Dec–Feb)", tasks: ["No mowing needed (dormant)", "Avoid heavy foot traffic on dormant grass", "Plan spring scalp date for late Feb"] },
  ],
  staugustine: [
    { season: "🌱 Spring (Mar–Apr)", tasks: ["Mow at 3–4\" height, never remove more than 1/3″, "Apply slow-release nitrogen fertilizer", "Check for chinch bugs in full-sun areas"] },
    { season: "☀️ Summer (May–Aug)", tasks: ["Water 1.5\"/week — does NOT tolerate drought well", "Treat for chinch bugs if yellowing appears", "Mow every 7–10 days at 3.5\""] },
    { season: "🍂 Fall (Sep–Nov)", tasks: ["Final fertilizer app by October 1″, "Reduce irrigation as temps cool", "Watch for gray leaf spot after rains"] },
    { season: "❄️ Winter (Dec–Feb)", tasks: ["Semi-dormant — minimal maintenance", "No fertilizer until temps stabilize above 65°F", "Frost damage looks brown — wait before treating"] },
  ],
  zoysia: [
    { season: "🌱 Spring (Mar–Apr)", tasks: ["Slow to green up (late April typical in DFW)", "Light fertilizer once actively growing", "Core aerate if not done in fall"] },
    { season: "☀️ Summer (May–Aug)", tasks: ["Excellent heat tolerance — 1\" water/week", "Mow every 10–14 days at 1.5–2\"", "Very low fertilizer needs vs Bermuda"] },
    { season: "🍂 Fall (Sep–Nov)", tasks: ["Holds color longer than Bermuda", "Final fertilizer early September", "Transition to dormancy by November"] },
    { season: "❄️ Winter (Dec–Feb)", tasks: ["Full dormancy — golden/tan color", "No maintenance required", "Plan overseeding if winter color desired"] },
  ],
};

export default function DFWLawnGuide2026() {
  const [grass, setGrass] = useState("bermuda");
  const schedule = schedules[grass] || [];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: "0.85rem", marginBottom: "0.5rem" }}>🏠 ProLnk DFW Lawn Guide</div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>🌿 DFW Lawn Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: "2rem" }}>Bermuda dominates DFW yards — heat-tolerant and fast-growing. St. Augustine thrives in shade. Zoysia gaining traction for its low-maintenance profile.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "☀️", label: "Most Popular", val: "Bermuda Grass" },
            { icon: "🌳", label: "Best for Shade", val: "St. Augustine" },
            { icon: "💧", label: "Summer Watering", val: "1–1.5\"/week" },
            { icon: "🌡️", label: "Fertilize/Year", val: "4x (Bermuda)" },
            { icon: "📈", label: "Trending", val: "Zoysia Grass" },
            { icon: "🗓️", label: "Scalp Month", val: "Late February" },
          ].map(({ icon, label, val }) => (
            <div key={label} style={{ background: "#111d35″, borderRadius: 10, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.4rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.75rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: "0.9rem" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#111d35″, borderRadius: 12, padding: "1.5rem", border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>📅 My Seasonal Care Schedule</h2>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>My Grass Type</label>
            <select value={grass} onChange={(e) => setGrass(e.target.value)} style={{ display: "block", marginTop: "0.25rem", background: "#0A1628″, color: "#fff", border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.5rem 1rem" }}>
              <option value="bermuda">Bermuda</option>
              <option value="staugustine">St. Augustine</option>
              <option value="zoysia">Zoysia</option>
            </select>
          </div>
          {schedule.map((s) => (
            <div key={s.season} style={{ marginBottom: "1rem", background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>{s.season}</div>
              {s.tasks.map((t, i) => <div key={i} style={{ color: "#cbd5e1″, fontSize: "0.85rem", paddingLeft: "1rem", marginBottom: "0.2rem" }}>• {t}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}