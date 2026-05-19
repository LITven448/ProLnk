import { useState } from 'react';

const frictionPoints = [
  { point: "Finding a vetted pro", solution: "ProLnk pre-screens every Charter pro — license, insurance, background check done before your first match." },
  { point: "Getting multiple quotes", solution: "ProLnk sends your job to 3 matched Charter pros simultaneously. Compare quotes in one dashboard." },
  { point: "Explaining scope repeatedly", solution: "Your Home Health Vault stores square footage, system ages, and past work. Pros arrive informed." },
  { point: "Scheduling back-and-forth", solution: "Pros confirm availability in-app. One tap to book. No phone tag." },
  { point: "Payment uncertainty", solution: "Scope and price locked before work begins. Pay securely through ProLnk after job approval." },
  { point: "Follow-up and warranty", solution: "All job records stored permanently. Warranty claims routed back to the original pro automatically." },
];

const prepSteps = [
  { icon: "📐", label: "Know your square footage", detail: "Every HVAC, insulation, and roofing quote starts here." },
  { icon: "🔧", label: "Know your HVAC model + age", detail: "Model number is on the unit label. Age affects parts availability." },
  { icon: "🏠", label: "Know your roof age", detail: "Check closing docs or HOA records. Affects material recommendations." },
  { icon: "💳", label: "Have payment method ready", detail: "Delays payment = delays scheduling. Have card or ACH ready in app." },
  { icon: "📋", label: "Write scope before requesting", detail: "\"AC not cooling\" is weak. \"AC not reaching set temp by 8°F after 30 min run\" books faster." },
];

export default function DFWFrictionlessServiceGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 48 }}>🏡</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>
            DFW Frictionless Home Service Guide 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: 15, maxWidth: 560, margin: "0 auto" }}>
            Build your contractor team before you need them. When the AC dies at 4pm in July, you want a Charter pro lined up — not Google.
          </p>
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>🔥 Top DFW Friction Points — Eliminated</h2>
        <p style={{ color: "#94a3b8″, fontSize: 13, marginBottom: 20 }}>Tap any friction point to see how ProLnk removes it.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {frictionPoints.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? "#1a2f55″ : "#0f1f3d",
                border: `1px solid ${selected === i ? "#F5E642" : "#1e3a5f"}`,
                borderRadius: 10,
                padding: "14px 18px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "#e2e8f0″ }}>{item.point}</span>
                <span style={{ color: "#F5E642″, fontSize: 18 }}>{selected === i ? "▲" : "▼"}</span>
              </div>
              {selected === i && (
                <p style={{ color: "#F5E642″, fontSize: 14, marginTop: 10, marginBottom: 0 }}>{item.solution}</p>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>✅ Home Prep Checklist</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {prepSteps.map((step, i) => (
            <div key={i} style={{ background: "#0f1f3d", border: "1px solid #1e3a5f", borderRadius: 10, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24 }}>{step.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#e2e8f0″, fontSize: 15 }}>{step.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 13, marginTop: 4 }}>{step.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <p style={{ color: "#0A1628″, fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>Join the ProLnk Waitlist — DFW Charter Founding Members</p>
          <p style={{ color: "#1a2f55″, fontSize: 14, margin: 0 }}>Waitlist closes at 500 Charter pros. Lock your spot at prolnk.io</p>
        </div>
      </div>
    </div>
  );
}

