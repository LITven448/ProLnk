import { useState } from 'react';

const situations = [
  { label: "Panels Need Cleaning", icon: "🧹",
    loss: "10-25% output loss", freq: "Every 3-6 months in DFW",
    desc: "DFWs combination of cedar pollen (Feb-March), construction dust, and summer haze creates significant panel soiling. A study of DFW residential solar found 10-25% output reduction from uncleaned panels after 6 months. Morning dew helps slightly but doesnt replace cleaning.",
    steps: ["Check inverter for production drop vs historical baseline","Early morning or evening only — never clean hot panels (thermal shock risk)","Soft brush with deionized water (no soap — leaves residue)","Garden hose low pressure rinse after brushing","Document pre/post cleaning kWh output to quantify ROI"] },
  { label: "Recent Hail Storm", icon: "⛈️",
    loss: "Potential: 0-100%", freq: "DFW averages 5-8 hail events/yr",
    desc: "DFW sits in Hail Alley — large hail events occur regularly. Class 4 impact-resistant panels handle most DFW hail (1-inch diameter). Micro-cracks from hail may not be visible but reduce output over time. The bigger risk: inverter moisture intrusion if mounting hardware is compromised.",
    steps: ["Within 24 hours: photograph all panels from ground level","Check inverter output — sharp drop indicates potential damage","File homeowners insurance claim before inspecting roof (preserve claim)","Request thermal imaging inspection — reveals micro-cracks invisible to naked eye","Most DFW policies cover solar under dwelling coverage — verify your policy"] },
  { label: "Tree Shading Issue", icon: "🌳",
    loss: "20-60% output loss", freq: "Year-round, worsens in winter",
    desc: "Shading is the biggest production killer for DFW residential solar. Even partial shade on one panel in a string inverter system can cut the entire strings output by 30-50%. DFW trees grow fast — many installations that were shade-free at install lose 30% production within 5 years from tree growth.",
    steps: ["Map shade patterns hour-by-hour using a smartphone solar pathfinder app","Identify the specific panel(s) being shaded (inverter monitoring shows this)","Option 1: Tree trimming — cost $400-1,200, often most cost-effective","Option 2: Microinverters or power optimizers — convert each panel to independent output","Option 3: Panel repositioning — expensive but permanent for severe shade cases"] },
  { label: "Inverter Monitoring Alert", icon: "📊",
    loss: "Varies by fault type", freq: "Annual inspection recommended",
    desc: "DFW heat stresses inverters heavily — ambient attic temperatures can exceed 130°F. String inverters last 10-15 years; microinverters 20-25 years. Common DFW inverter issues: thermal shutdown (automatic, clears at night), grid communication errors, and ground fault alerts that require pro service.",
    steps: ["Log into inverter monitoring app — all major brands have mobile apps","Compare todays production to same date last year (weather-adjusted)","Thermal shutdown: clears automatically — if recurring, check attic ventilation","Ground fault alert: DO NOT attempt to reset yourself — call a licensed electrician","Annual pro inspection ($150-250) catches issues before they compound"] },
  { label: "New Installation Check", icon: "✅",
    loss: "None if done right", freq: "First 90 days post-install",
    desc: "The first 90 days after DFW solar installation are critical. Commissioning issues — incorrect string sizing, shading miscalculation, or communication errors — often dont show up until the first full summer. Verify your system is producing at the modeled output before manufacturer warranties pass.",
    steps: ["Request production monitoring login from installer day 1″,"Compare daily kWh to installation proposal (weather-adjusted within 15%","Inspect all roof penetrations after first rain — look for interior ceiling staining","Verify utility net metering agreement is active — check your first bill","Register all equipment warranties directly with manufacturers (not just installer)"] },
];

export default function DFWSolarPanelMaintenanceDFW2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>☀️</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#F5E642″, marginBottom: "0.5rem" }}>DFW Solar Panel Maintenance Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>Keeping your solar system producing at full capacity in Dallas-Fort Worth</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["☀️","DFW Solar Hours","5.2-5.8 peak/day"],["🌧️","Pollen Impact","10-25% loss"],["⛈️","Hail Risk","High — Class 4 required"]].map(([icon,label,val],i)=>(
            <div key={i} style={{ background: "#0f2040″, borderRadius: 10, padding: "1.2rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem" }}>{icon}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.3rem" }}>{label}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "0.95rem" }}>{val}</div>
            </div>
          ))}
        </div>

        <p style={{ color: "#94a3b8″, marginBottom: "0.75rem", fontSize: "0.9rem" }}>Select your solar situation for a step-by-step maintenance guide:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: "0.75rem 1rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "1px solid #1e3a5f",
                background: selected === i ? "#1a2f50″ : "#0f2040", color: selected === i ? "#F5E642" : "#94a3b8",
                cursor: "pointer", fontSize: "0.9rem", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span>{s.icon}</span><span>{s.label}</span>
              <span style={{ marginLeft: "auto", color: "#94a3b8″, fontSize: "0.78rem" }}>{s.loss}</span>
            </button>
          ))}
        </div>

        {(() => { const s = situations[selected]; return (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", border: "2px solid #F5E642", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#F5E642″, marginBottom: "0.5rem" }}>{s.icon} {s.label}</h2>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ background: "#0A1628″, border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.2rem 0.7rem", color: "#94a3b8", fontSize: "0.8rem" }}>Output impact: {s.loss}</span>
              <span style={{ background: "#0A1628″, border: "1px solid #1e3a5f", borderRadius: 6, padding: "0.2rem 0.7rem", color: "#94a3b8", fontSize: "0.8rem" }}>Frequency: {s.freq}</span>
            </div>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, marginBottom: "1.25rem" }}>{s.desc}</p>
            <div style={{ background: "#0A1628″, borderRadius: 8, padding: "1rem", border: "1px solid #22c55e" }}>
              <div style={{ color: "#22c55e", fontWeight: 700, marginBottom: "0.75rem", fontSize: "0.9rem" }}>✅ Step-by-Step Action Plan</div>
              {s.steps.map((step,i)=>(
                <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#F5E642″, fontWeight: 700, minWidth: 20, fontSize: "0.9rem" }}>{i+1}.</span>
                  <span style={{ color: "#cbd5e1″, fontSize: "0.88rem", lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        ); })()}

        <div style={{ textAlign: "center", padding: "1rem", background: "#0f2040″, borderRadius: 10, border: "1px solid #1e3a5f" }}>
          <span style={{ color: "#94a3b8″, fontSize: "0.85rem" }}>Need a DFW solar pro for cleaning, inspection, or repairs? </span>
          <span style={{ color: "#F5E642″, fontWeight: 700 }}>ProLnk connects DFW solar homeowners with vetted maintenance pros. 🔗</span>
        </div>
      </div>
    </div>
  );
}
