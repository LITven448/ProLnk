import { useState } from 'react';

const [roofSize, setRoofSize] = useState(2000);
const [intensity, setIntensity] = useState<string>("moderate");

const dfwRainfall = { light: 1.5, moderate: 4.0, heavy: 8.0 };

export default function DFWRoofDrainageDesign2026() {
  const [roofArea, setRoofArea] = useState(2000);
  const [rain, setRain] = useState<"light" | "moderate" | "heavy">("moderate");

  const rate = { light: 1.5, moderate: 4.0, heavy: 8.0 }[rain];
  const gpm = (roofArea * rate) / 96;
  const downspouts = Math.ceil(gpm / 20);
  const gutterSize = gpm > 40 ? "6-inch K-style" : "5-inch K-style";

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌧️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW Roof Drainage Design Guide 2026</h1>
          <p style={{ color: "#94a3b8″, marginTop: "0.5rem" }}>Proper sizing for DFW rainfall events — valleys, downspouts, and gutter capacity</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { icon: "📐", label: "Min Roof Slope", val: "1/4\" per foot (2%)" },
            { icon: "💧", label: "Most Leak-Prone", val: "Valley intersections" },
            { icon: "📏", label: "DFW Preferred Downspout", val: "4x4 over 3x4″ },
            { icon: "🌩️", label: "DFW Peak Event", val: "8\" per hour possible" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#0f2035″, borderRadius: 10, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.5rem" }}>{c.icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.3rem" }}>{c.label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: "0.2rem" }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #F5E64244" }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0, fontSize: "1.2rem" }}>🧮 DFW Drainage Sizing Calculator</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Roof Area (sq ft): <strong style={{ color: "#fff" }}>{roofArea.toLocaleString()}</strong></label>
            <input type="range" min={500} max={6000} step={100} value={roofArea} onChange={e => setRoofArea(Number(e.target.value))}
              style={{ width: "100%", marginTop: "0.5rem", accentColor: "#F5E642″ }} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>DFW Rainfall Intensity:</label>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {(["light", "moderate", "heavy"] as const).map(r => (
                <button key={r} onClick={() => setRain(r)}
                  style={{ flex: 1, padding: "0.6rem", borderRadius: 7, border: `2px solid ${rain === r ? "#F5E642" : "#1e3a5f"}`, background: rain === r ? "#1a3a5c" : "#0f2035″, color: rain === r ? "#F5E642" : "#94a3b8", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem" }}>
                  {r === "light" ? "🌦 Light" : r === "moderate" ? "🌧 Moderate" : "⛈ Heavy"}<br/>
                  <span style={{ fontSize: "0.7rem", fontWeight: 400 }}>{rate} in/hr</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            {[
              { label: "Flow Rate", val: `${gpm.toFixed(1)} GPM`, icon: "💧" },
              { label: "Downspouts Needed", val: `${downspouts} minimum`, icon: "🔽" },
              { label: "Gutter Size", val: gutterSize, icon: "📏" },
            ].map((r, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
                <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.75rem", marginTop: "0.3rem" }}>{r.label}</div>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginTop: "0.2rem" }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 10, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642″, marginTop: 0 }}>⚠️ Valley Design Warning</h3>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.7 }}>Valley intersections concentrate all uphill runoff into one path. In DFW storm events, improperly designed valleys can dump 3–5x the water of a standard roof section. Always use W-metal valley flashing, never open valleys with exposed shingles in DFW. Closed-cut valleys with ice-and-water shield underlayment are the DFW best practice.</p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569″, fontSize: "0.8rem" }}>
          ProLnk DFW Roofing Guide 2026 · Drainage Design Principles · Connect with vetted DFW roofing contractors
        </div>
      </div>
    </div>
  );
}