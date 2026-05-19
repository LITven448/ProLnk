import { useState } from 'react';

const systems = [
  { name: "ADT Medical Alert", monthly: 29, response: "Professional monitoring", tech: 1, care: 1, features: ["24/7 monitoring", "Fall detection add-on", "GPS optional", "Works with ADT smart home"] },
  { name: "Life Alert", monthly: 49, response: "HELP center direct", tech: 1, care: 3, features: ["No monthly contract cancellation", "Waterproof pendant", "Nationwide coverage", "No equipment cost"] },
  { name: "Bay Alarm Medical", monthly: 20, response: "US-based call center", tech: 2, care: 2, features: ["Lowest monthly cost", "GPS in-home & mobile", "Caregiver app", "Medication reminders"] },
  { name: "Apple Watch", monthly: 0, response: "Auto 911 call", tech: 3, care: 1, features: ["Fall detection built-in", "ECG monitoring", "No monthly fee", "Requires iPhone"] },
];

export default function DFWMedicalAlertSystemGuide() {
  const [careLevel, setCareLevel] = useState(2);
  const [techComfort, setTechComfort] = useState(2);
  const [rec, setRec] = useState<typeof systems[0] | null>(null);

  function getRecommendation() {
    const scored = systems.map(s => ({
      ...s,
      score: Math.abs(s.care - careLevel) + Math.abs(s.tech - techComfort),
    }));
    scored.sort((a, b) => a.score - b.score);
    setRec(scored[0]);
  }

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Medical Alert Systems for DFW Homeowners</h1>
      <p style={{ color: "#94a3b8″, marginBottom: 24 }}>
        DFW has fast EMS response, but the metroplex spans 9,000+ sq mi. A medical alert system bridges the gap — especially in outlying areas like Mansfield, Rockwall, or Celina where response times average 8–12 min.
      </p>

      <div style={{ background: "#0f2240″, borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 16 }}>🎯 Find Your Best Fit</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Care Need Level: {careLevel === 1 ? "Mild (active senior)" : careLevel === 2 ? "Moderate (some health concerns)" : "High (frequent falls / chronic condition)"}</label>
          <input type="range" min={1} max={3} value={careLevel} onChange={e => setCareLevel(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642″ }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8″ }}>Technology Comfort: {techComfort === 1 ? "Low (simple button preferred)" : techComfort === 2 ? "Moderate (smartphone ok)" : "High (wearables, apps)"}</label>
          <input type="range" min={1} max={3} value={techComfort} onChange={e => setTechComfort(Number(e.target.value))} style={{ width: "100%", accentColor: "#F5E642″ }} />
        </div>
        <button onClick={getRecommendation} style={{ background: "#F5E642″, color: "#0A1628", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Get My Recommendation →
        </button>
        {rec && (
          <div style={{ marginTop: 20, background: "#1a3a60″, borderRadius: 10, padding: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>✅ {rec.name}</div>
            <div style={{ color: "#60a5fa", marginBottom: 8 }}>${rec.monthly === 0 ? "No monthly fee" : `~$${rec.monthly}/month`} • {rec.response}</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#cbd5e1″ }}>
              {rec.features.map(f => <li key={f} style={{ marginBottom: 4 }}>{f}</li>)}
            </ul>
          </div>
        )}
      </div>

      <h2 style={{ fontSize: 18, color: "#F5E642″, marginBottom: 12 }}>📋 All Systems Compared</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {systems.map(s => (
          <div key={s.name} style={{ background: "#0f2240″, borderRadius: 10, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.name}</div>
            <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 6 }}>${s.monthly === 0 ? "No monthly fee" : `${s.monthly}/mo`} • {s.response}</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "#94a3b8″, fontSize: 13 }}>
              {s.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, background: "#0f2240″, borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ DFW-Specific Tip</div>
        <p style={{ color: "#94a3b8″, margin: 0, fontSize: 14 }}>Ensure your system uses a US-based monitoring center — some discount services route through overseas centers which adds 30–60 seconds to dispatch. In a cardiac event, that matters.</p>
      </div>
    </div>
  );
}
