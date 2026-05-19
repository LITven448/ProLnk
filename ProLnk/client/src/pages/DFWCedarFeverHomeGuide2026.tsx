import { useState } from 'react';

const severityLevels = [
  { level: "Mild", symptoms: "Occasional sneezing, mild itchy eyes", measures: ["MERV-11 filter", "Keep windows closed Jan-Feb", "Air purifier bedroom"] },
  { level: "Moderate", symptoms: "Daily sneezing, watery eyes, fatigue", measures: ["MERV-13 filter (replace monthly)", "HEPA air purifier main rooms", "Humidity 45-50%", "Nasal rinse station at entry"] },
  { level: "Severe", symptoms: "Constant congestion, asthma triggers, headaches", measures: ["MERV-16 filter", "Whole-home HEPA", "Humidity monitor every room", "No outdoor shoes inside", "Shower before bed Dec-Feb"] },
];

const months = [
  { m: "Oct", pollen: 10 }, { m: "Nov", pollen: 30 }, { m: "Dec", pollen: 85 },
  { m: "Jan", pollen: 100 }, { m: "Feb", pollen: 95 }, { m: "Mar", pollen: 50 },
  { m: "Apr", pollen: 20 },
];

export default function DFWCedarFeverHomeGuide2026() {
  const [sel, setSel] = useState(1);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "8px 0" }}>DFW Cedar Fever Home Protection Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Mountain cedar peaks December–February — the worst cedar allergy season in the US. Protect your home.</p>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 12 }}>📊 DFW Cedar Pollen Calendar</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, marginBottom: 8 }}>
            {months.map((m, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", background: m.pollen > 70 ? "#F5E642″ : m.pollen > 40 ? "#f59e0b" : "#1a3a5c",
                  height: `${m.pollen * 0.7}px`, borderRadius: "4px 4px 0 0″, minHeight: 4
                }} />
                <span style={{ color: "#94a3b8″, fontSize: 11 }}>{m.m}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#64748b", fontSize: 12, textAlign: "center" }}>Yellow = peak danger zone (Dec–Feb)</p>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 14 }}>⚙️ Your Allergy Severity → Home Plan</h2>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {severityLevels.map((s, i) => (
              <button key={i} onClick={() => setSel(i)} style={{
                flex: 1, background: sel === i ? "#F5E642″ : "#1a3a5c",
                color: sel === i ? "#0A1628″ : "#fff",
                border: "none", borderRadius: 8, padding: "10px 6px", cursor: "pointer", fontWeight: 700, fontSize: 13
              }}>{s.level}</button>
            ))}
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16 }}>
            <div style={{ color: "#94a3b8″, fontSize: 13, marginBottom: 12 }}>Symptoms: {severityLevels[sel].symptoms}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {severityLevels[sel].measures.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#F5E642″, fontSize: 16 }}>✓</span>
                  <span style={{ color: "#e2e8f0″, fontSize: 14 }}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 15, marginBottom: 10 }}>🔑 Key Rules: January & February</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Keep all windows CLOSED", "Change HVAC filter monthly", "HEPA purifier runs 24/7″, "Indoor humidity 45–50%", "No outdoor shoes past entry", "Check pollen count before outdoor work"].map((tip, i) => (
              <div key={i} style={{ background: "#0A1628″, borderRadius: 8, padding: "10px 12px", color: "#e2e8f0", fontSize: 13 }}>
                🌿 {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
