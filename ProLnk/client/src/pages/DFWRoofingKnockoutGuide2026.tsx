import { useState } from 'react';

const problems = [
  {
    id: "hail",
    emoji: "⛈️",
    title: "Hail Damage",
    urgency: "High",
    steps: [
      { step: "1", icon: "📸", action: "Document damage immediately — photos of dents, broken shingles, damaged gutters" },
      { step: "2", icon: "📋", action: "File insurance claim — most DFW policies cover hail (document storm date)" },
      { step: "3", icon: "🔗", action: "Get ProLnk Charter roofer for professional damage assessment (before adjuster visit)" },
      { step: "4", icon: "⚠️", action: "Avoid storm chasers — fly-by-night contractors follow DFW hail events" },
      { step: "5", icon: "📦", action: "Consider Class 4 impact-resistant upgrade during repair — insurance discounts available" },
    ]
  },
  {
    id: "age",
    emoji: "📅",
    title: "Age Replacement (18+ Years)",
    urgency: "Medium",
    steps: [
      { step: "1", icon: "💰", action: "Budget $8,000-20,000+ for DFW full replacement (varies by sq footage + pitch)" },
      { step: "2", icon: "🔍", action: "Get 3 quotes through ProLnk — compare material grade, underlayment, warranty" },
      { step: "3", icon: "🏆", action: "Upgrade to Class 4 impact-resistant shingles — protects against future DFW hail" },
      { step: "4", icon: "📋", action: "Check insurance discount for Class 4 — often 20-30% premium reduction in DFW" },
      { step: "5", icon: "🌬️", action: "Require attic ventilation assessment during replacement — do not miss this" },
    ]
  },
  {
    id: "repair",
    emoji: "🔨",
    title: "Minor Repair Needed",
    urgency: "Low-Medium",
    steps: [
      { step: "1", icon: "🔍", action: "Identify repair scope — missing shingles, flashing, pipe boots, ridge cap" },
      { step: "2", icon: "🔗", action: "Connect to ProLnk repair specialist — not a full replacement crew" },
      { step: "3", icon: "📸", action: "Document before + after — especially for warranty and future insurance purposes" },
      { step: "4", icon: "⏰", action: "Do not delay DFW repairs — summer heat + storms turn minor issues into major leaks" },
    ]
  },
  {
    id: "leak",
    emoji: "💧",
    title: "Active Leak",
    urgency: "Emergency",
    steps: [
      { step: "1", icon: "🚨", action: "Contain interior damage immediately — buckets, towels, plastic sheeting" },
      { step: "2", icon: "📸", action: "Document interior water intrusion for insurance purposes" },
      { step: "3", icon: "🔗", action: "Call ProLnk emergency roofing — Charter pros have 24-hr emergency response" },
      { step: "4", icon: "🏠", action: "Emergency tarp if needed — ProLnk roofers carry tarps for immediate weatherproofing" },
      { step: "5", icon: "📋", action: "File insurance claim if leak caused interior damage to drywall, flooring, or belongings" },
    ]
  },
];

export default function DFWRoofingKnockoutGuide2026() {
  const [problem, setProblem] = useState("");

  const sel = problems.find(p => p.id === problem);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🥊</div>
          <h1 style={{ color: "#F5E642", fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Roofing Knock-Out Guide 2026</h1>
          <p style={{ color: "#94A3B8", fontSize: 15 }}>DFW roofing problems have clear action plans — know your problem, knock it out</p>
        </div>

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 12 }}>🏠 What roofing problem are you facing?</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {problems.map(p => (
              <button key={p.id} onClick={() => setProblem(p.id)}
                style={{ padding: "14px", borderRadius: 10, border: "2px solid", borderColor: problem === p.id ? "#F5E642" : "#334155", background: problem === p.id ? "#F5E64220" : "transparent", color: problem === p.id ? "#F5E642" : "#94A3B8", cursor: "pointer", fontSize: 14, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{p.emoji}</div>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: 11, marginTop: 4, color: p.urgency === "Emergency" ? "#F87171" : p.urgency === "High" ? "#F5A642" : p.urgency === "Medium" ? "#F5E642" : "#4ADE80" }}>
                  {p.urgency}
                </div>
              </button>
            ))}
          </div>
        </div>

        {sel && (
          <div style={{ background: "#1E2D45", borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>{sel.emoji} {sel.title} — Knock-Out Plan</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sel.steps.map(s => (
                <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 12, background: "#0A1628", borderRadius: 8 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <span style={{ color: "#F5E642", fontWeight: 700, fontSize: 13 }}>Step {s.step}: </span>
                    <span style={{ color: "#E8EAF0", fontSize: 14 }}>{s.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#1E2D45", borderRadius: 12, padding: 18, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642", fontWeight: 600, marginBottom: 6 }}>🔗 ProLnk Roofing Charter Network</p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>All DFW roofing scenarios covered — emergency, repair, replacement, and insurance claim support. Charter roofers are vetted for DFW hail expertise and Class 4 installation experience.</p>
        </div>
      </div>
    </div>
  );
}
