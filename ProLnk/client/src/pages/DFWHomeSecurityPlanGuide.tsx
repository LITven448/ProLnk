import { useState } from 'react';

const vulnerabilities: Record<string, { label: string; priority: string; cost: string; fix: string }[]> = {
  "Frisco": [
    { label: "Package theft from front porch", priority: "HIGH", cost: "$30-80", fix: "Video doorbell + Amazon Key or package locker" },
    { label: "Garage door left open", priority: "HIGH", cost: "$30-50", fix: "Smart garage controller with auto-close (myQ)" },
    { label: "Back fence gap — alley access", priority: "MEDIUM", cost: "$200-500", fix: "Fence repair + motion light on back of home" },
  ],
  "Dallas": [
    { label: "Package theft", priority: "HIGH", cost: "$30-80", fix: "Video doorbell + package locker" },
    { label: "Sliding door pry attack", priority: "HIGH", cost: "$20-40", fix: "Security bar + door sensor alarm" },
    { label: "Street-facing windows at night", priority: "MEDIUM", cost: "$100-300", fix: "Window sensors + privacy film" },
  ],
  "default": [
    { label: "Garage door vulnerability", priority: "HIGH", cost: "$30-50", fix: "Smart garage controller with auto-close" },
    { label: "Package theft", priority: "HIGH", cost: "$30-80", fix: "Video doorbell + package solution" },
    { label: "Perimeter lighting gaps", priority: "MEDIUM", cost: "$50-150", fix: "Motion-activated flood lights on all sides" },
    { label: "Unlocked side gate", priority: "MEDIUM", cost: "$30-80", fix: "Gate lock + alarm sensor" },
  ],
};

const layers = [
  { name: "1. Perimeter", icon: "🌿", items: ["Motion-activated flood lights (all 4 sides)", "Visible security cameras (deterrence)", "Trim bushes near windows and doors"] },
  { name: "2. Entry Points", icon: "🚪", items: ["Smart locks on all exterior doors", "Video doorbell", "Door and window sensors", "Sliding door security bar", "Garage door auto-close"] },
  { name: "3. Interior", icon: "🏠", items: ["Indoor motion sensors", "Glass break detectors", "Smart smoke/CO detectors", "Safe for valuables and documents"] },
  { name: "4. Response", icon: "📡", items: ["Professional monitoring ($15-50/mo)", "Loud interior siren", "Neighbor network / Nextdoor alerts", "Camera footage cloud backup"] },
];

export default function DFWHomeSecurityPlanGuide() {
  const [suburb, setSuburb] = useState("default");
  const [homeType, setHomeType] = useState("single_family");
  const [budget, setBudget] = useState(1500);
  const [showPlan, setShowPlan] = useState(false);

  const vulns = vulnerabilities[suburb] || vulnerabilities["default"];
  const suburbs = ["default", "Frisco", "Dallas", "Plano", "McKinney", "Allen", "Southlake", "Flower Mound"];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Home Security Plan for DFW</h1>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>
        DFW property crime varies significantly by suburb. A layered security approach — perimeter, entry, interior, response — is more effective than any single device. Build your plan below.
      </p>

      <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642", marginBottom: 16 }}>⚙️ Your Home Profile</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, color: "#94a3b8" }}>DFW Suburb</label>
            <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60", color: "#fff", border: "1px solid #2d4a7a" }}>
              {suburbs.map(s => <option key={s} value={s}>{s === "default" ? "Other / General DFW" : s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6, color: "#94a3b8" }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60", color: "#fff", border: "1px solid #2d4a7a" }}>
              <option value="single_family">Single Family</option>
              <option value="townhome">Townhome</option>
              <option value="condo">Condo</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8" }}>Security Budget: ${budget.toLocaleString()}</label>
          <input type="range" min={300} max={5000} step={100} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#475569" }}>
            <span>$300</span><span>$5,000</span>
          </div>
        </div>
        <button onClick={() => setShowPlan(true)} style={{ background: "#F5E642", color: "#0A1628", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Build My Security Plan
        </button>
      </div>

      {showPlan && (
        <>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, color: "#F5E642", marginBottom: 12 }}>🎯 Your Vulnerability Map</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {vulns.map(v => (
                <div key={v.label} style={{ background: "#0f2240", borderRadius: 10, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <span style={{ background: v.priority === "HIGH" ? "#7f1d1d" : "#1e3a5f", color: v.priority === "HIGH" ? "#fca5a5" : "#93c5fd", fontSize: 11, padding: "2px 6px", borderRadius: 4, fontWeight: 700, marginRight: 8 }}>{v.priority}</span>
                    <span style={{ fontWeight: 600 }}>{v.label}</span>
                    <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>Fix: {v.fix}</div>
                  </div>
                  <div style={{ color: "#F5E642", fontWeight: 700, whiteSpace: "nowrap" }}>{v.cost}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, color: "#F5E642", marginBottom: 12 }}>🛡️ Layered Security Approach</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {layers.map(l => (
                <div key={l.name} style={{ background: "#0f2240", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{l.icon} {l.name}</div>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "#94a3b8", fontSize: 14 }}>
                    {l.items.map(i => <li key={i} style={{ marginBottom: 4 }}>{i}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div style={{ background: "#0f2240", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ DFW-Specific Priority</div>
        <p style={{ color: "#94a3b8", margin: 0, fontSize: 14 }}>Garage doors are the #1 entry point for burglars in DFW suburbs. A $40 smart garage controller (myQ) with auto-close is the single best ROI security upgrade for most DFW homeowners.</p>
      </div>
    </div>
  );
}
