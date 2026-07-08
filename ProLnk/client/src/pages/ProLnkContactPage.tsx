import { useState } from 'react';

export default function ProLnkContactPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const reasons = [
    {
      type: "I'm a Service Pro",
      icon: "🔧",
      detail: "Join the DFW waitlist at prolnk.xyz/pro-waitlist. Early access is open — plans from $99/mo. Questions? hello@prolnk.xyz"
    },
    {
      type: "I'm a Homeowner",
      icon: "🏠",
      detail: "Get your home on the ProLnk network at prolnk.xyz/waitlist/homeowner. Free to join — get quotes from vetted pros. Questions? hello@prolnk.xyz"
    },
    {
      type: "Press & Media",
      icon: "📰",
      detail: "ProLnk is the AI-powered home services platform launching in DFW. For press inquiries, interviews, or story pitches: hello@prolnk.xyz"
    },
    {
      type: "Investor Inquiry",
      icon: "💼",
      detail: "Interested in what we're building? Contact Andrew Frakes directly: hello@prolnk.xyz — Subject: ProLnk Investor"
    },
    {
      type: "Partnership",
      icon: "🤝",
      detail: "Real estate agents, insurers, property managers, and HOAs — see our partner program at prolnk.xyz/partner-program or email hello@prolnk.xyz"
    },
    {
      type: "Technical Support",
      icon: "🛠️",
      detail: "Platform issues, bug reports, or feature requests: hello@prolnk.xyz. We respond within 24 hours during launch phase."
    },
  ];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642" }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8", marginTop: "0.4rem" }}>Contact — We're Here to Help</div>
          <div style={{ display: "inline-block", background: "#0d1f3c", border: "2px solid #F5E642", color: "#F5E642", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            📍 Dallas-Fort Worth — Launching Q2 2026
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 How Can We Help You?</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {reasons.map(r => (
            <button key={r.type} onClick={() => setSelected(selected === r.type ? null : r.type)}
              style={{ background: selected === r.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === r.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1.1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
              <div style={{ fontSize: "1.5rem" }}>{r.icon}</div>
              <div style={{ fontWeight: 700, marginTop: "0.4rem", fontSize: "0.95rem" }}>{r.type}</div>
              {selected === r.type && <div style={{ fontSize: "0.82rem", color: "#F5E642", marginTop: "0.5rem" }}>{r.detail}</div>}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
            <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>🌐 Platform</div>
            <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>prolnk.xyz</div>
          </div>
          <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
            <div style={{ fontWeight: 700, marginBottom: "0.4rem" }}>📧 General</div>
            <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>hello@prolnk.xyz</div>
          </div>
        </div>
      </div>
    </div>
  );
}
