import { useState } from 'react';

export default function TrustyProPrivacyFirst() {
  const [activeConcern, setActiveConcern] = useState("storage");

  const concerns: Record<string, { question: string; answer: string; icon: string }> = {
    storage: {
      icon: "💾",
      question: "Where is my scan data stored?",
      answer: "Your scan data is processed on-device and never leaves your phone without your explicit action. When you choose to share or save a report, it is encrypted in transit and stored in your personal Home Health Vault — not on a shared server.",
    },
    sale: {
      icon: "💰",
      question: "Is my data sold to third parties?",
      answer: "Never. TrustyPro does not sell, rent, or barter your scan data to any third party. Your home condition data belongs to you. We are contractually prohibited from monetizing your personal scan information.",
    },
    delete: {
      icon: "🗑️",
      question: "Can I delete my data anytime?",
      answer: "Yes, completely. Go to Settings → Privacy → Delete All My Data. Your vault, scan history, and any linked reports are permanently deleted within 24 hours with no recovery possible — on your terms.",
    },
    ccpa: {
      icon: "⚖️",
      question: "Are you CCPA compliant?",
      answer: "TrustyPro is built CCPA-compliant from the ground up. You have the right to know what data we hold, request deletion, opt out of any data sharing, and we will never discriminate against you for exercising these rights.",
    },
    facial: {
      icon: "🙅",
      question: "Does TrustyPro use facial recognition?",
      answer: "Absolutely not. TrustyPro scans structures and surfaces only — walls, floors, ceilings, mechanical systems. No biometric data is captured, stored, or processed at any point in any scan.",
    },
    share: {
      icon: "🔗",
      question: "Who can see my scan reports?",
      answer: "Only people you explicitly share with. Reports generate a unique private link controlled by you. You can revoke access at any time. Contractors dispatched via ProLnk see only what you choose to show them.",
    },
  };

  const principles = [
    { icon: "🔐", label: "Opt-in only", desc: "Every scan, every share, every save requires your action" },
    { icon: "📱", label: "On-device first", desc: "AI runs locally — data never moves without your consent" },
    { icon: "🚫", label: "No facial recognition", desc: "Structures only — no biometric data ever" },
    { icon: "✅", label: "CCPA compliant", desc: "Full rights: know, delete, opt out, no discrimination" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🔐</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>Privacy-First Design</h1>
        <p style={{ fontSize: 18, color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
          Your home data belongs to you. We built TrustyPro so it could never be any other way.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 40 }}>
          {principles.map(p => (
            <div key={p.label} style={{ background: "#112240″, borderRadius: 12, padding: "20px 14px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: 13, marginBottom: 4 }}>{p.label}</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: "28px 24px", border: "1px solid #F5E642", marginBottom: 40 }}>
          <h2 style={{ color: "#F5E642″, textAlign: "center", marginTop: 0, marginBottom: 16 }}>Ask a Privacy Question</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
            {Object.entries(concerns).map(([key, val]) => (
              <button key={key} onClick={() => setActiveConcern(key)}
                style={{ background: activeConcern === key ? "#F5E642″ : "#0A1628", color: activeConcern === key ? "#0A1628" : "#94a3b8",
                  border: "1px solid " + (activeConcern === key ? "#F5E642″ : "#1e3a5f"), borderRadius: 8,
                  padding: "8px 12px", cursor: "pointer", fontWeight: 600, fontSize: 12 }}>
                {val.icon}
              </button>
            ))}
          </div>
          <div style={{ background: "#0A1628″, borderRadius: 12, padding: "20px 18px" }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{concerns[activeConcern].question}</div>
            <div style={{ color: "#cbd5e1″, fontSize: 14, lineHeight: 1.6 }}>{concerns[activeConcern].answer}</div>
          </div>
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>🛡️</div>
          <div style={{ fontWeight: 800, color: "#0A1628″, fontSize: 20, margin: "8px 0 4px" }}>Privacy You Can Trust</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>TrustyPro is built for homeowners who want the power of AI without surrendering control of their data.</div>
        </div>
      </div>
    </div>
  );
}
