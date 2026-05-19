import { useState } from 'react';

const conditions = [
  { label: "Normal (Moist Spring)", icon: "🌿", pi: "40-60″, expansion: "3-5 inches", foundation: "Stable — typical DFW seasonal norm. Foundation flexes within design tolerance. Minor sticking doors or hairline drywall cracks are normal.", risk: "Low", action: "Maintain consistent irrigation schedule. Monitor foundation perimeter monthly. No action needed unless movement exceeds 1 inch." },
  { label: "Moderate Drought (6-8 wks)", icon: "☀️", pi: "40-60″, expansion: "Gap widens 1-2\"", foundation: "Soil shrinks away from foundation edges. Perimeter beam begins cantilever stress. Interior elevated 0.5-1 inch above perimeter is early warning sign.", risk: "Medium", action: "Begin foundation watering immediately. Soaker hoses 18 inches from foundation, 30 min every 2 days. Water slowly — fast wetting causes heave." },
  { label: "Severe Drought (3+ months)", icon: "🔥", pi: "40-60″, expansion: "Gap widens 3-5\"", foundation: "Serious foundation movement likely. 1-3 inch differential is common. Doors stick or won't close, visible cracks in brick or drywall along diagonal lines.", risk: "High", action: "Emergency foundation watering protocol. Hire structural engineer for assessment ($500-1,200). Document all cracks with photos and dates. Avoid foundation repair until drought breaks." },
  { label: "Heavy Rain After Drought", icon: "🌧️", pi: "40-60″, expansion: "Rapid 2-4\" heave", foundation: "Perimeter soil rewets faster than interior — causes differential heave. Floors pop and unlevel quickly. This transition is often more damaging than the drought itself.", risk: "Very High", action: "Do not run irrigation during or after heavy rain. Allow 2-4 weeks stabilization before assessing damage. Interior slab heave may push up kitchen islands and cabinets." },
  { label: "Uniform Soil Moisture", icon: "💧", pi: "40-60″, expansion: "Minimal net change", foundation: "Ideal state. Soil moisture uniform around all perimeter and interior points. No differential movement. Foundation stays level. This is the engineering goal.", risk: "Minimal", action: "Maintain with drip irrigation on timer year-round. Test soil moisture at perimeter vs interior quarterly. Proper grading directs runoff away from foundation." },
];

export default function DFWFoundationSoilExpansion2026() {
  const [selected, setSelected] = useState(0);

  const riskColor: Record<string, string> = { Low: "#22c55e", Medium: "#f59e0b", High: "#ef4444″, "Very High": "#dc2626", Minimal: "#22c55e" };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏗️</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Expansive Soil Expansion Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>How DFW Blackland Prairie clay moves — and what it means for your foundation</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["🧱","Plasticity Index","40-60 (High)"],["📏","Max Expansion","6+ inches vertical"],["🏠","Typical Movement","1-3 inches"]].map(([icon,label,val],i)=>(
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.3rem" }}>{label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1rem" }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>
            DFW sits on <strong style={{ color: "#F5E642″ }}>Blackland Prairie clay</strong> — montmorillonite-rich soil with Plasticity Index (PI) of 40-60.
            This clay swells dramatically when wet and shrinks when dry. A cubic yard can expand <strong style={{ color: "#F5E642″ }}>6+ inches vertically</strong>.
            The key to foundation health is <strong style={{ color: "#F5E642″ }}>uniform soil moisture</strong> — not wet or dry, but consistently the same around the entire foundation perimeter and interior.
          </p>
        </div>

        <p style={{ color: "#94a3b8″, marginBottom: "0.75rem", fontSize: "0.9rem" }}>Select a DFW soil condition to see expansion risk and action guide:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {conditions.map((c, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.75rem 1rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50″ : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span>{c.icon}</span><span>{c.label}</span>
              <span style={{ marginLeft: "auto", background: riskColor[c.risk] + "22″, color: riskColor[c.risk], borderRadius: 6, padding: "0.15rem 0.6rem", fontSize: "0.75rem" }}>{c.risk} Risk</span>
            </button>
          ))}
        </div>

        {(() => { const c = conditions[selected]; return (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5E642″, marginBottom: "1rem" }}>{c.icon} {c.label}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", border: "1px solid #1e3a5f" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>Soil PI Range</div>
                <div style={{ color: "#F5E642″, fontWeight: 700 }}>{c.pi}</div>
              </div>
              <div style={{ background: "#0A1628″, borderRadius: 8, padding: "0.75rem", border: "1px solid #1e3a5f" }}>
                <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>Expected Movement</div>
                <div style={{ color: "#F5E642″, fontWeight: 700 }}>{c.expansion}</div>
              </div>
            </div>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, marginBottom: "1rem" }}>{c.foundation}</p>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #22c55e" }}>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.4rem", fontSize: "0.9rem" }}>✅ Recommended Action</div>
              <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.6, fontSize: "0.9rem" }}>{c.action}</p>
            </div>
          </div>
        ); })()}

        <div style={{ textAlign: "center", padding: "1rem", background: "#0f2040″, borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Need a DFW foundation inspection? </span>
          <span style={{ color: "#F5E642″, fontWeight: 700 }}>ProLnk connects you with vetted structural engineers and foundation pros. 🔗</span>
        </div>
      </div>
    </div>
  );
}
