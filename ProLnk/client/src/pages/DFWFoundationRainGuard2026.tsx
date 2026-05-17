import { useState } from 'react';

const strategies = [
  { id: "drainage", emoji: "🌊", title: "Proper Drainage Direction", priority: "Critical", detail: "DFW soil must drain away from foundation — minimum 6-inch slope over first 10 feet. Spring storms dump 3-5 inches in hours. Without slope, water pools against foundation and saturates expansive clay, causing upheaval (heave)." },
  { id: "drycreek", emoji: "🪨", title: "Dry Creek Beds", priority: "High", detail: "DFW drainage art: channel water away with decorative dry creek beds using river rock. Routes storm runoff while adding landscape appeal. Professional grading + creek bed prevents water from even reaching foundation perimeter." },
  { id: "watering", emoji: "💧", title: "Stop Irrigation During Rain", priority: "High", detail: "DFW clay swells fast. Running sprinklers during spring storms compounds saturation risk dramatically. Smart irrigation systems auto-pause based on rainfall. Disable irrigation 24-48 hrs before predicted heavy rain events." },
  { id: "gutters", emoji: "🏠", title: "Extend Downspout Discharge", priority: "Critical", detail: "DFW downspouts must discharge 4-6 ft from foundation — not 1-2 ft. Short discharge concentrates massive roof runoff at one point against foundation. Add extensions or French drain systems for proper routing." },
  { id: "swales", emoji: "🌿", title: "Swales Between Properties", priority: "Medium", detail: "DFW neighborhoods often share drainage responsibility. A swale (shallow grass channel) between homes routes neighbor runoff past your foundation. Check city drainage easements — often city-maintained during heavy events." },
];

const rainScenarios = [
  { id: "light", label: "🌦️ Light rain (under 1 inch)", action: "Normal watering schedule OK — monitor drainage" },
  { id: "moderate", label: "🌧️ Moderate rain (1-2 inches)", action: "Pause irrigation 24 hrs — check downspout discharge areas" },
  { id: "heavy", label: "⛈️ Heavy storm (2-4 inches)", action: "Pause irrigation 48 hrs — walk perimeter after storm for pooling" },
  { id: "severe", label: "🌊 Severe storm (4+ inches)", action: "Pause irrigation 72 hrs — call ProLnk if pooling detected near foundation" },
];

export default function DFWFoundationRainGuard2026() {
  const [active, setActive] = useState("");
  const [rain, setRain] = useState("");

  const rainRec = rainScenarios.find(r => r.id === rain);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌧️</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Foundation Rain Guard Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>DFW spring storms saturate expansive clay fast — proper rain management prevents heave damage</p>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 12 }}>🌧️ How much rain are you expecting?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {rainScenarios.map(r => (
              <button key={r.id} onClick={() => setRain(r.id)}
                style={{ padding: "10px 14px", borderRadius: 8, border: "2px solid", borderColor: rain === r.id ? "#F5E642" : "#334155", background: rain === r.id ? "#F5E64220" : "transparent", color: rain === r.id ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 14, textAlign: "left" }}>
                {r.label}
              </button>
            ))}
          </div>
          {rainRec && <p style={{ color: "#4ADE80", marginTop: 12, fontSize: 14 }}>✅ {rainRec.action}</p>}
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
          {strategies.map(s => (
            <div key={s.id} onClick={() => setActive(active === s.id ? "" : s.id)}
              style={{ background: "#1E2D45", borderRadius: 12, padding: 16, cursor: "pointer", borderLeft: `4px solid ${s.priority === "Critical" ? "#F87171" : s.priority === "High" ? "#F5E642" : "#4ADE80"}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.emoji}</span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.title}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#0A1628", color: s.priority === "Critical" ? "#F87171" : s.priority === "High" ? "#F5E642" : "#4ADE80" }}>{s.priority}</span>
                  <span style={{ color: "#64748B" }}>{active === s.id ? "▲" : "▼"}</span>
                </div>
              </div>
              {active === s.id && <p style={{ color: "#94A3B8", fontSize: 14, marginTop: 10, marginBottom: 0, lineHeight: 1.5 }}>{s.detail}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 18, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk Foundation Rain Guard Assessments</p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>Charter foundation pros assess your DFW drainage situation and recommend targeted solutions — grading, downspout extensions, and dry creek design.</p>
        </div>
      </div>
    </div>
  );
}