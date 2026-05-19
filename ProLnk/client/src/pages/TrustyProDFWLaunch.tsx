import { useState } from 'react';

export default function TrustyProDFWLaunch() {
  const [userType, setUserType] = useState("homeowner");

  const guides: Record<string, { icon: string; label: string; perks: string[]; useCases: string[] }> = {
    homeowner: {
      icon: "🏠",
      label: "Homeowner",
      perks: ["500 lifetime scan credits (normally $0.10/scan)", "Priority access to new scan features", "Home Health Vault entry — your home in the system permanently", "Beta tester badge + direct feedback line to product team"],
      useCases: ["Hail damage after DFW storms — document before the adjuster arrives", "Foundation crack monitoring through Texas heat cycles", "Mold detection in humid attic and crawl spaces", "Pre-sale condition documentation for top dollar offers"],
    },
    landlord: {
      icon: "🔑",
      label: "Landlord",
      perks: ["Unlimited scans during DFW beta period", "Early access to multi-property dashboard", "Priority contractor matching through ProLnk", "Co-marketing opportunity — be featured as a founding landlord"],
      useCases: ["Document every unit before and after each tenancy", "Build defensible deposit records before disputes happen", "Spot deferred maintenance before it becomes emergency repair", "Integrate scan history with your lease management workflow"],
    },
    inspector: {
      icon: "🔍",
      label: "Inspector",
      perks: ["Professional certification badge on your TrustyPro profile", "Revenue share on contractor referrals from your inspections", "Early access to inspector-specific report templates", "Direct integration with DFW real estate agent network"],
      useCases: ["Supplement traditional inspection with AI-assisted visual scan", "Generate digital reports on-site before leaving the property", "Refer flagged contractors via ProLnk and earn referral credits", "Build scan-backed inspection history across your DFW client base"],
    },
    contractor: {
      icon: "🔧",
      label: "Contractor",
      perks: ["Founding Pro status on ProLnk — locked rate, first in queue", "TrustyPro scan data feeds you qualified leads automatically", "Scan-verified job history builds your reputation faster", "Co-marketing across both platforms (TrustyPro + ProLnk)"],
      useCases: ["Get dispatched from scan flags — no cold lead hunting", "Hail season surge: roofing and exterior claims volume", "Foundation repair season: spring settlement after winter freeze", "HVAC overload in DFW summers — scheduled from scan-triggered alerts"],
    },
  };

  const timeline = [
    { icon: "📋", label: "Now", event: "Join early access waitlist" },
    { icon: "🚀", label: "May 2026″, event: "ProLnk + TrustyPro DFW soft launch" },
    { icon: "📸", label: "June 2026″, event: "TrustyPro scan app beta opens" },
    { icon: "🌟", label: "Q3 2026″, event: "Home Health Vault fully live" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A1628,#112240)", padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🌟</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "12px 0 8px" }}>TrustyPro DFW Launch</h1>
        <p style={{ fontSize: 18, color: "#94a3b8″, maxWidth: 580, margin: "0 auto" }}>
          Dallas-Fort Worth is where TrustyPro begins. Early adopters get founding benefits that never expire.
        </p>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 28 }}>
          {Object.entries(guides).map(([key, val]) => (
            <button key={key} onClick={() => setUserType(key)}
              style={{ background: userType === key ? "#F5E642″ : "#112240", color: userType === key ? "#0A1628" : "#94a3b8",
                border: "1px solid " + (userType === key ? "#F5E642″ : "#1e3a5f"), borderRadius: 8,
                padding: "10px 18px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
              {val.icon} {val.label}
            </button>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 16, padding: "28px 24px", border: "1px solid #F5E642", marginBottom: 32 }}>
          <h2 style={{ color: "#F5E642″, marginTop: 0, marginBottom: 16 }}>{guides[userType].icon} Early Adopter Perks — {guides[userType].label}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {guides[userType].perks.map(p => (
              <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "#F5E642″, flexShrink: 0 }}>★</span>
                <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{p}</span>
              </div>
            ))}
          </div>
          <h3 style={{ color: "#94a3b8″, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>DFW-Specific Scan Use Cases</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {guides[userType].useCases.map(u => (
              <div key={u} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ color: "#F5E642″, flexShrink: 0 }}>📍</span>
                <span style={{ color: "#94a3b8″, fontSize: 13 }}>{u}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: "#F5E642″, textAlign: "center", marginBottom: 20 }}>DFW Launch Timeline</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 32 }}>
          {timeline.map(t => (
            <div key={t.label} style={{ background: "#112240″, borderRadius: 12, padding: "18px 14px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{t.label}</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>{t.event}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 24 }}>🏆</div>
          <div style={{ fontWeight: 800, color: "#0A1628″, fontSize: 22, margin: "8px 0 4px" }}>Founding Member Spots Are Limited</div>
          <div style={{ color: "#1e3a5f", fontSize: 14 }}>Waitlist closes at 500 applications. Founding benefits lock in permanently for early adopters.</div>
        </div>
      </div>
    </div>
  );
}
