import { useState } from 'react';

export default function ProLnkPartnerProgram() {
  const [selected, setSelected] = useState<string | null>(null);

  const partners = [
    {
      type: "Real Estate Agents",
      icon: "🏡",
      detail: "Refer homeowners and pros to ProLnk — earn referral commissions on every match they generate. Co-brand your listings with Home Health Vault data. A natural add-on to every home sale."
    },
    {
      type: "Insurance Agencies",
      icon: "🛡️",
      detail: "Offer policyholders a vetted home maintenance network. Reduce claims via proactive upkeep. White-label partnership available for agencies servicing DFW homeowners."
    },
    {
      type: "Property Managers",
      icon: "🏢",
      detail: "Manage contractor calls across your portfolio from one ProLnk dashboard. Get preferred rates on jobs, faster turnaround, and documented service history for every unit."
    },
    {
      type: "HOA Management",
      icon: "🏘️",
      detail: "Give residents access to ProLnk vetted contractors. Streamline common area maintenance bids. Charter partnership pricing available for HOAs with 100+ units."
    },
  ];

  const tiers = [
    { name: "Referral", icon: "🔗", desc: "Share a link — earn $25–$100 per qualified homeowner or pro signup" },
    { name: "Affiliate", icon: "📋", desc: "Co-branded landing page, monthly payout, dedicated partner support" },
    { name: "Strategic", icon: "🤝", desc: "Revenue share agreement, API access, white-label option, executive support" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>ProLnk</div>
          <div style={{ fontSize: "1.4rem", color: "#94a3b8″, marginTop: "0.4rem" }}>Partner Program — Grow Together in DFW</div>
          <div style={{ display: "inline-block", background: "#1a3a5c", border: "2px solid #F5E642″, color: "#F5E642", padding: "0.4rem 1.2rem", borderRadius: 20, fontWeight: 700, marginTop: "1rem", fontSize: "0.9rem" }}>
            🌟 Founding Partner Slots — Limited Availability
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1.1rem" }}>🎯 Partner Type — Select to See Program Details</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {partners.map(p => (
            <button key={p.type} onClick={() => setSelected(selected === p.type ? null : p.type)}
              style={{ background: selected === p.type ? "#1a3a5c" : "#0d1f3c", border: `2px solid ${selected === p.type ? "#F5E642" : "#1e3a5f"}`, borderRadius: 12, padding: "1.1rem", cursor: "pointer", color: "#fff", textAlign: "left" }}>
              <div style={{ fontSize: "1.6rem" }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginTop: "0.4rem" }}>{p.type}</div>
              {selected === p.type && <div style={{ fontSize: "0.82rem", color: "#F5E642″, marginTop: "0.5rem" }}>{p.detail}</div>}
            </button>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, marginBottom: "1rem" }}>📊 Partnership Tiers</div>
          {tiers.map(t => (
            <div key={t.name} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "0.9rem" }}>
              <div style={{ fontSize: "1.4rem" }}>{t.icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: "#F5E642″, fontSize: "0.95rem" }}>{t.name}</div>
                <div style={{ fontSize: "0.82rem", color: "#94a3b8″ }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d1f3c", borderRadius: 14, padding: "1.5rem", border: "1px solid #1e3a5f", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📬 Start a Partnership Conversation</div>
          <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>andrew@lit-ventures.com — Subject: "ProLnk Partner"</div>
        </div>
      </div>
    </div>
  );
}
