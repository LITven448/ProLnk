import { useState } from 'react';

const VISIT_TIMES = [
  { time: "Weekday 7–9am", purpose: "Rush hour commute reality check — how bad is traffic leaving this street?", icon: "🌅" },
  { time: "Saturday 2–4pm", purpose: "Neighborhood activity peak — kids, noise, parking, general feel", icon: "☀️" },
  { time: "Sunday 6–8pm", purpose: "Quiet evening check — noise from roads/neighbors, lighting, vibe", icon: "🌆" },
];

const CHECK_ITEMS = [
  "Parking: Is street parking available or chaotic?",
  "Noise: Highway hum, train tracks, flight paths?",
  "Commercial nearby: Gas stations, fast food, industrial?",
  "Road quality: Potholes, missing curbs, poor drainage?",
  "Neighbor yards: Deferred maintenance is contagious",
  "Nextdoor app: Search the zip — read 3 months of posts",
  "School drive: Time the morning commute from driveway",
  "Flood signs: High curbs, water marks on houses, drainage ditches",
];

const TYPE_GUIDE: Record<string, { checks: string[]; red: string[]; green: string[] }> = {
  "Established Suburban": {
    checks: ["Look for foundation repair company signs on neighbors' homes", "Check tree root proximity to sidewalks (cracking = soil shift)", "Note age of cars in driveways — proxy for economic stability"],
    red: ["Multiple homes with overgrown yards", "Lots of rental signs", "Faded or peeling paint throughout"],
    green: ["Consistent upkeep across block", "Neighborhood Facebook group with activity", "Kids playing outside"],
  },
  "New Development": {
    checks: ["Drive the builder model home corridor — note traffic volume", "Check proximity to future commercial land (county plats)", "Confirm school district boundary before buying"],
    red: ["Builder owns majority of unsold lots — resale pressure", "Drainage retention ponds near home site", "No mature trees = major heat in DFW summers"],
    green: ["Multiple builders competing = higher standards", "HOA active with clear bylaws", "Parks and trails already built"],
  },
  "Urban Infill": {
    checks: ["Walk 4 blocks in all directions — what's adjacent?", "Check zoning map for commercial creep risk", "Look for construction permits — signals neighborhood trajectory"],
    red: ["Mixed residential/light industrial without clear boundary", "Sidewalks broken or missing", "No grocery within 1 mile"],
    green: ["Coffee shops and small businesses opening", "New builds going up on vacant lots", "Active walkability"],
  },
};

export default function DFWNeighborhoodVisitGuide() {
  const [type, setType] = useState("Established Suburban");
  const [showing, setShowing] = useState(false);
  const guide = TYPE_GUIDE[type];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#e8e8e8", padding: "40px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: "#F5E642", letterSpacing: 2, marginBottom: 8 }}>BUYER TOOL</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 6 }}>DFW Neighborhood Visit Guide</h1>
        <p style={{ color: "#aaa", fontSize: 16, marginBottom: 36 }}>Visit 3 times. Different times. Different impressions. All required.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginBottom: 16 }}>⏰ The 3-Visit Rule</h2>
        {VISIT_TIMES.map((v, i) => (
          <div key={i} style={{ background: "#111e33", borderRadius: 12, padding: "18px 22px", marginBottom: 14, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <span style={{ fontSize: 28 }}>{v.icon}</span>
            <div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 4 }}>{v.time}</div>
              <div style={{ fontSize: 14, color: "#aaa" }}>{v.purpose}</div>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642", marginTop: 32, marginBottom: 16 }}>📋 What to Check Every Visit</h2>
        {CHECK_ITEMS.map((item, i) => (
          <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 10, paddingLeft: 14, borderLeft: "2px solid #2a3f5f" }}>• {item}</div>
        ))}

        <div style={{ background: "#111e33", borderRadius: 12, padding: 24, marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: "#F5E642", marginBottom: 18 }}>🗺️ By Neighborhood Type</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: "#aaa" }}>Neighborhood Type</label>
            <select value={type} onChange={e => { setType(e.target.value); setShowing(false); }} style={{ display: "block", width: "100%", marginTop: 6, padding: "10px 12px", borderRadius: 8, background: "#1e2f4a", color: "#fff", border: "1px solid #2a3f5f", fontSize: 14 }}>
              {Object.keys(TYPE_GUIDE).map(k => <option key={k}>{k}</option>)}
            </select>
          </div>
          <button onClick={() => setShowing(true)} style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Show Guide</button>
          {showing && guide && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontWeight: 700, color: "#7dd3fc", marginBottom: 10 }}>🔍 Specific Checks</div>
              {guide.checks.map((c, i) => <div key={i} style={{ fontSize: 14, color: "#ccc", marginBottom: 8 }}>• {c}</div>)}
              <div style={{ fontWeight: 700, color: "#ff6b6b", marginTop: 16, marginBottom: 10 }}>🚩 Red Flags</div>
              {guide.red.map((r, i) => <div key={i} style={{ fontSize: 14, color: "#e8b0b0", marginBottom: 8 }}>⚠️ {r}</div>)}
              <div style={{ fontWeight: 700, color: "#6bffb8", marginTop: 16, marginBottom: 10 }}>✅ Green Flags</div>
              {guide.green.map((g, i) => <div key={i} style={{ fontSize: 14, color: "#b0e8cc", marginBottom: 8 }}>✓ {g}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
