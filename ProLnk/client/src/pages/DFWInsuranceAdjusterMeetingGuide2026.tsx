import { useState } from 'react';

const damageTypes = [
  { label: "Hail Damage", steps: ["📋 Gather your own inspection report before adjuster arrives", "📏 Have hail diameter documentation ready", "🏠 Walk the roof WITH the adjuster — do not let them inspect alone", "📸 Take your own photos during their inspection", "🗒️ Write down every item they note or skip", "💬 Ask: Is this RCV or ACV policy?", "📱 Have ProLnk contractor on call to answer adjuster questions"] },
  { label: "Wind Damage", steps: ["📋 Pull your policy — know your wind deductible amount", "🌬️ Document date of storm with NOAA weather records", "🏠 Be present for the full exterior inspection", "📸 Photograph adjuster photographing damage", "🗒️ Request the adjuster's business card and claim number", "💬 Ask about code upgrade coverage (DFW cities require it)", "📱 Submit ProLnk estimate before adjuster files report"] },
  { label: "Water Intrusion", steps: ["📋 Document interior damage with dated photos", "💧 Trace water path from entry point to damage", "🏠 Have adjuster inspect attic decking and insulation", "📸 Show adjuster all secondary damage areas", "🗒️ Note if adjuster disputes cause of damage", "💬 Ask about mold remediation coverage", "📱 Get ProLnk water damage estimate same day"] },
];

export default function DFWInsuranceAdjusterMeetingGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🤝</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", margin: "0.5rem 0" }}>DFW Insurance Adjuster Meeting Guide 2026</h1>
          <p style={{ color: "#aaa", fontSize: "0.95rem" }}>How to prepare for the adjuster visit — protect your claim from day one</p>
        </div>

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>⚡ Select Your Damage Type</h2>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {damageTypes.map((d, i) => (
              <button key={i} onClick={() => { setSelected(i); setChecked({}); }} style={{ padding: "0.6rem 1.2rem", borderRadius: 8, border: selected === i ? "2px solid #F5E642″ : "2px solid #334", backgroundColor: selected === i ? "#F5E642" : "transparent", color: selected === i ? "#0A1628" : "#fff", fontWeight: 600, cursor: "pointer" }}>{d.label}</button>
            ))}
          </div>
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📋 Adjuster Prep Checklist — {damageTypes[selected].label}</h2>
            {damageTypes[selected].steps.map((step, i) => {
              const key = `${selected}-${i}`;
              return (
                <div key={i} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", marginBottom: "0.4rem", borderRadius: 8, backgroundColor: checked[key] ? "#1e3a5f" : "#0d2040″, cursor: "pointer", borderLeft: checked[key] ? "3px solid #F5E642" : "3px solid transparent" }}>
                  <span style={{ fontSize: "1.1rem" }}>{checked[key] ? "✅" : "⬜"}</span>
                  <span style={{ fontSize: "0.9rem", textDecoration: checked[key] ? "line-through" : "none", color: checked[key] ? "#aaa" : "#fff" }}>{step}</span>
                </div>
              );
            })}
            <p style={{ color: "#F5E642″, fontSize: "0.85rem", marginTop: "0.75rem" }}>✅ {Object.values(checked).filter(Boolean).length} of {damageTypes[selected].steps.length} completed</p>
          </div>
        )}

        <div style={{ backgroundColor: "#122040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "0.75rem" }}>⚠️ DFW Adjuster Red Flags to Watch For</h2>
          {["Adjuster does not get on the roof", "Inspection takes less than 20 minutes", "No soft metals (AC fins, vents, gutters) inspected", "Adjuster says damage is pre-existing without documentation", "No mention of code upgrade allowance"].map((flag, i) => (
            <div key={i} style={{ padding: "0.6rem 0.75rem", marginBottom: "0.4rem", borderRadius: 6, backgroundColor: "#1a0a0a", borderLeft: "3px solid #ff4444″, fontSize: "0.9rem", color: "#ffaaaa" }}>⛔ {flag}</div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 700, margin: 0, fontSize: "1.05rem" }}>🏠 Get a ProLnk Contractor at Your Adjuster Meeting — Know Your Rights</p>
        </div>
      </div>
    </div>
  );
}
