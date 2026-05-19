import { useState } from 'react';

export default function ProLnkJobsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const roles = [
    { title: "Community Manager", icon: "🌐", type: "community", detail: "Own DFW pro community — events, onboarding, referral activation. Equity + base. Remote-first." },
    { title: "Pro Success Manager", icon: "🏆", type: "success", detail: "Help service pros get their first 10 matches. Onboarding calls, activation coaching, churn prevention." },
    { title: "Growth Marketer", icon: "📣", type: "marketing", detail: "Run DFW homeowner acquisition — content, paid social, local SEO. Own top-of-funnel KPIs." },
    { title: "Full-Stack Engineer", icon: "💻", type: "eng", detail: "React 19 + Node + tRPC. Build the matching algorithm and mobile app. High autonomy, high equity." },
  ];

  const perks = [
    { label: "Early Equity", icon: "💎" },
    { label: "Remote-First", icon: "🏠" },
    { label: "Founding Team", icon: "🚀" },
    { label: "Charter Access", icon: "🥇" },
    { label: "Flexible Hours", icon: "⏰" },
    { label: "Mission-Driven", icon: "🎯" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8″, marginTop: "0.4rem" }}>Jobs & Careers — Join the DFW Launch Team</div>
          <div style={{ display: "inline-block", background: "#F5E642″, color: "#0A1628", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            ⚡ Hiring Now — DFW Launch Q2 2026
          </div>
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.2rem 1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>🏢 What It's Like Here</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem", lineHeight: 1.6 }}>
            ProLnk is pre-Series A, post-product. We have 490+ pros on waitlist, 4,000+ DFW homes sourced, and a 47-agent AI platform built. You join as a founding team member — real equity, real ownership, real impact on a platform that protects homeowners and helps tradespeople build wealth.
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "2rem" }}>
          {perks.map(p => (
            <div key={p.label} style={{ background: "#0d1f3c", border: "1px solid #1e3a5f", borderRadius: 20, padding: "0.4rem 0.9rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span>{p.icon}</span><span>{p.label}</span>
            </div>
          ))}
        </div>

        <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 Open Roles — Select to Learn More</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {roles.map(r => (
            <button key={r.type} onClick={() => setSelected(selected === r.type ? null : r.type)}
              style={{ background: selected === r.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === r.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1.1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
              <div style={{ fontSize: "1.6rem" }}>{r.icon}</div>
              <div style={{ fontWeight: 700, marginTop: "0.4rem" }}>{r.title}</div>
              {selected === r.type && <div style={{ fontSize: "0.82rem", color: "#F5E642″, marginTop: "0.5rem" }}>{r.detail}</div>}
            </button>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📬 Apply or Refer Someone</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>andrew@lit-ventures.com — Subject: "ProLnk [Role]"</div>
        </div>
      </div>
    </div>
  );
}
