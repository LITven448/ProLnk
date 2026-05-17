import { useState } from 'react';

const roles = [
  {
    id: "homeowner",
    icon: "🏠",
    label: "Homeowner",
    headline: "Get 3 Quotes from Vetted DFW Pros",
    sub: "Free to join. No obligation. Pros compete for your job.",
    cta: "Join the Waitlist",
    href: "https://prolnk.io/homeowner-signup",
    steps: ["Submit your project details", "Get matched with 3 vetted DFW pros within 24h", "Compare quotes and choose your pro"],
    badge: "🆓 Free for homeowners · Always",
    urgency: "Join 1,200+ DFW homeowners already on the waitlist",
    color: "#3b82f6",
  },
  {
    id: "pro",
    icon: "🔧",
    label: "Service Pro",
    headline: "Apply for Charter Before 500 Closes",
    sub: "Charter tier: $149/mo locked for life. Only 500 spots total.",
    cta: "Apply for Charter",
    href: "https://prolnk.io/pro-signup",
    steps: ["Apply now — takes 3 minutes", "Lock in $149/mo Charter rate (vs $299 later)", "Get first access to DFW leads at launch"],
    badge: "⏰ Charter closes at 500 applications",
    urgency: "367 of 500 Charter spots claimed — move now",
    color: "#F5E642",
  },
  {
    id: "investor",
    icon: "💼",
    label: "Investor",
    headline: "Pre-Seed Round Now Open",
    sub: "85% margin at scale. DFW launch. Seed round forming.",
    cta: "Contact Andrew",
    href: "mailto:andrew@lit-ventures.com",
    steps: ["Email andrew@lit-ventures.com", "Receive deck + TiDB data room access", "Schedule a call within 48 hours"],
    badge: "🏦 Seed round · Qualified investors only",
    urgency: "Deck available on request · andrew@lit-ventures.com",
    color: "#a855f7",
  },
  {
    id: "press",
    icon: "📰",
    label: "Press / Media",
    headline: "ProLnk DFW Launch Story",
    sub: "Home services marketplace launching in DFW. AI-powered. Network income model.",
    cta: "Contact Press Team",
    href: "mailto:press@prolnk.io",
    steps: ["Email press@prolnk.io", "Receive press kit + founder availability", "Embargo or embargo-free as requested"],
    badge: "📸 Press kit available on request",
    urgency: "Launch coverage window open now · press@prolnk.io",
    color: "#22c55e",
  },
];

export default function DFWProLnkFinalCallPage2026() {
  const [selected, setSelected] = useState(1);

  const r = roles[selected];

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🚀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642", margin: "0 0 8px" }}>ProLnk is Launching in DFW</h1>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: 0 }}>The last page every DFW homeowner, pro, investor, and press contact should see.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 30 }}>
          {roles.map((role, i) => (
            <button key={role.id} onClick={() => setSelected(i)} style={{ background: selected === i ? "#162035" : "#0f1f3d", border: "2px solid", borderColor: selected === i ? r.color : "#1e3a5f", borderRadius: 12, padding: "18px 14px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{role.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: selected === i ? (role.color === "#F5E642" ? "#F5E642" : role.color) : "#94a3b8" }}>{role.label}</div>
            </button>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", border: "2px solid", borderColor: r.color, borderRadius: 16, padding: 30, marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{r.icon}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: r.color, margin: "0 0 10px" }}>{r.headline}</h2>
          <p style={{ color: "#94a3b8", fontSize: 15, margin: "0 0 24px" }}>{r.sub}</p>

          <div style={{ background: "#0A1628", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700, marginBottom: 12 }}>YOUR NEXT 3 STEPS</div>
            {r.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: i < r.steps.length - 1 ? 10 : 0 }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: r.color, color: r.color === "#F5E642" ? "#0A1628" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>{i + 1}</div>
                <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
          </div>

          <a href={r.href} style={{ display: "block", textAlign: "center", padding: "16px 24px", borderRadius: 12, background: r.color, color: r.color === "#F5E642" ? "#0A1628" : "#fff", fontWeight: 800, fontSize: 17, textDecoration: "none", marginBottom: 14 }}>{r.cta} →</a>

          <div style={{ textAlign: "center", padding: "10px 16px", background: "#0A1628", borderRadius: 10 }}>
            <div style={{ fontSize: 12, color: r.color, fontWeight: 600 }}>{r.badge}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{r.urgency}</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[{ label: "DFW Pros Waitlisted", val: "367" }, { label: "Homeowners Signed Up", val: "1,200+" }, { label: "Charter Spots Left", val: "133" }].map((s, i) => (
            <div key={i} style={{ background: "#0f1f3d", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#F5E642" }}>{s.val}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: 14, background: "#0f1f3d", borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>prolnk.io · andrew@lit-ventures.com · press@prolnk.io</div>
        </div>
      </div>
    </div>
  );
}