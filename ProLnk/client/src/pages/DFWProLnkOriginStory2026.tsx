import { useState } from 'react';

const stakeholders = [
  {
    label: "Homeowners",
    icon: "🏡",
    story: "Andrew experienced contractor fraud firsthand as a DFW homeowner. After a hailstorm, a storm chaser contractor took a deposit and disappeared. After a foundation scare, three different companies gave wildly different diagnoses. He realized the problem wasn't finding contractors — it was trusting them. ProLnk was built to solve that trust gap with verification, reviews, and permanent job records.",
    cta: "ProLnk gives homeowners confidence that every pro is verified, reviewed, and accountable.",
  },
  {
    label: "Service Pros",
    icon: "🔧",
    story: "Legitimate DFW contractors were losing business to storm chasers and low-ball bidders who cut corners. Honest pros had no way to differentiate themselves at scale. Andrew saw that verified pros needed a platform that rewarded quality — not just price. ProLnk's tiered commission system and TrustyPro verification create a merit-based marketplace where the best pros win.",
    cta: "ProLnk rewards quality work with better leads, higher margins, and network income.",
  },
  {
    label: "Investors",
    icon: "💼",
    story: "Andrew recognized DFW as a uniquely favorable market: 8M+ people, extreme climate dependency on home systems, a documented contractor trust crisis, and no dominant verified-pro platform. The Home Health Vault creates a data moat that competitors cannot replicate. ProLnk targets 500 active pros at launch — break-even — and 10,000 pros at $3.79M/mo net by Year 3.",
    cta: "ProLnk is the infrastructure layer for a $40B DFW home services market.",
  },
  {
    label: "Contractors (Recruit)",
    icon: "🤝",
    story: "Andrew built ProLnk's 5-stream Network Income System specifically to align pro incentives with platform growth. Pros don't just earn on jobs — they earn on referrals, subscriptions, and origination rights. This creates a self-propagating growth engine. Early pros lock in charter pricing at $149/mo and build passive income streams that compound over time.",
    cta: "Join as a Charter Pro: $149/mo locked, 5 income streams, territory priority.",
  },
];

export default function DFWProLnkOriginStory2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 24px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌟</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>ProLnk Origin Story 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16 }}>Why Andrew Frakes built ProLnk specifically for DFW — and why it matters</p>
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 12, padding: "20px 24px", marginBottom: 36, border: "2px solid #F5E642" }}>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.7 }}>
            <span style={{ color: "#F5E642″, fontWeight: 700 }}>The insight:</span> DFW has unique, compounding home service challenges — expansive clay foundations, extreme hail frequency, 100°F+ cooling demands — layered on top of a documented contractor trust crisis. Andrew Frakes lived all of it as a DFW homeowner, then built the solution.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
          {stakeholders.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? "#F5E642″ : "#1e2d45",
                color: selected === i ? "#0A1628″ : "#94a3b8",
                border: "none", borderRadius: 8, padding: "10px 18px",
                cursor: "pointer", fontWeight: 600, fontSize: 14,
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#1e2d45″, borderRadius: 16, padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{stakeholders[selected].icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F5E642″, margin: "0 0 16px" }}>For {stakeholders[selected].label}</h2>
          <p style={{ color: "#cbd5e1″, lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>{stakeholders[selected].story}</p>
          <div style={{ background: "#0A1628″, borderRadius: 8, padding: "14px 18px", borderLeft: "4px solid #F5E642" }}>
            <span style={{ color: "#F5E642″, fontWeight: 600, fontSize: 14 }}>{stakeholders[selected].cta}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
