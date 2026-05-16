import { useState } from 'react';

const ageGuides: Record<string, { budget: string; items: { icon: string; task: string; freq: string }[]; tip: string }> = {
  "new": {
    budget: "~0.5–0.75% of home value / year",
    items: [
      { icon: "🌡️", task: "HVAC filter changes every 1–3 months", freq: "Monthly" },
      { icon: "🌿", task: "Lawn & sprinkler system maintenance", freq: "Seasonal" },
      { icon: "🔍", task: "Builder warranty claim review before year 1 ends", freq: "Annual" },
      { icon: "🏠", task: "Check exterior caulk around windows & doors", freq: "Annual" },
      { icon: "💧", task: "Flush water heater to remove sediment", freq: "Annual" },
      { icon: "🚨", task: "Test smoke & CO detectors, replace batteries", freq: "Bi-annual" },
    ],
    tip: "New builds need less money but more attention — catch warranty items before they expire!"
  },
  "mid": {
    budget: "~1–1.5% of home value / year",
    items: [
      { icon: "🌡️", task: "HVAC tune-up & coil cleaning", freq: "Annual" },
      { icon: "🏠", task: "Roof inspection for hail/wind damage", freq: "Annual" },
      { icon: "🚰", task: "Plumbing inspection — check for slow leaks under sinks", freq: "Annual" },
      { icon: "⚡", task: "Check electrical outlets & GFCI function", freq: "Annual" },
      { icon: "🌳", task: "Tree trimming away from roof & foundation", freq: "Annual" },
      { icon: "🧹", task: "Dryer vent cleaning (fire safety)", freq: "Annual" },
      { icon: "💧", task: "Exterior paint touch-up & caulk refresh", freq: "Every 5–7 yrs" },
    ],
    tip: "Mid-age homes: HVAC and roof are your biggest budget risks. Save monthly so repairs don't shock you."
  },
  "older": {
    budget: "~1.5–2% of home value / year",
    items: [
      { icon: "🏗️", task: "Foundation inspection (DFW clay soil movement)", freq: "Every 2–3 yrs" },
      { icon: "⚡", task: "Electrical panel evaluation — look for FPE/Zinsco", freq: "Once, then as needed" },
      { icon: "🚰", task: "Sewer line camera scope for root intrusion", freq: "Every 3–5 yrs" },
      { icon: "🌡️", task: "HVAC system — likely needs replacement soon", freq: "Assess annually" },
      { icon: "🏠", task: "Roof likely near end-of-life — get inspection", freq: "Annual" },
      { icon: "🪟", task: "Window seal failure check — foggy glass = failed seal", freq: "Annual" },
      { icon: "🧱", task: "Chimney & fireplace inspection if applicable", freq: "Annual" },
    ],
    tip: "Older DFW homes: Budget high, inspect more. Foundation and sewer are the hidden cost centers."
  },
};

const tabs = [{ key: "new", label: "New (0–5 yrs)", icon: "✨" }, { key: "mid", label: "Mid (6–20 yrs)", icon: "🏠" }, { key: "older", label: "Older (20+ yrs)", icon: "🏚️" }];

export default function DFWFirstTimeHomeownerGuide2026() {
  const [age, setAge] = useState<"new" | "mid" | "older">("new");
  const guide = ageGuides[age];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", padding: "32px 16px", fontFamily: "system-ui, sans-serif", color: "#E8EAF0" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "8px 0 4px" }}>DFW First-Time Homeowner Guide 2026</h1>
          <p style={{ color: "#8892A4", fontSize: 15 }}>Select your home's age — get a tailored DFW maintenance budget & checklist.</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: "#111E35", borderRadius: 12, padding: 6 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setAge(t.key as "new" | "mid" | "older")} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, background: age === t.key ? "#F5E642" : "transparent", color: age === t.key ? "#0A1628" : "#8892A4" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#F5E642", borderRadius: 10, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>💰</span>
          <div>
            <div style={{ fontSize: 13, color: "#0A1628", fontWeight: 700, textTransform: "uppercase" }}>Annual Maintenance Budget Target</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0A1628" }}>{guide.budget}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {guide.items.map((item, i) => (
            <div key={i} style={{ background: "#111E35", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, border: "1px solid #1E2D45" }}>
              <span style={{ fontSize: 26 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{item.task}</div>
                <div style={{ fontSize: 12, color: "#F5E642", fontWeight: 700, marginTop: 2 }}>{item.freq}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0D2040", borderRadius: 10, padding: 16, marginBottom: 20, borderLeft: "4px solid #88AAFF" }}>
          <span style={{ fontSize: 14, color: "#C8D0E0" }}>💡 {guide.tip}</span>
        </div>

        <div style={{ background: "#111E35", borderRadius: 12, padding: 20, borderLeft: "4px solid #F5E642" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>🔧 ProLnk makes finding a trusted DFW contractor effortless — free quotes from vetted pros.</div>
          <button style={{ marginTop: 12, background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Find Contractors →</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "#4A5568", fontSize: 13 }}>© 2026 ProLnk · DFW Home Services Marketplace</div>
      </div>
    </div>
  );
}
