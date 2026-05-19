import { useState } from 'react';

const investorTypes = [
  { type: "Angel Investor", emoji: "😇", offer: ["Preferred equity at $8M pre-money valuation", "First look at Series A participation rights", "Monthly investor updates with key metrics", "Advisory board seat available for $250K+ angels", "Access to the full product before public launch"] },
  { type: "Marketplace Operator", emoji: "🏪", offer: ["Deep domain advantage in two-sided marketplace dynamics", "Network income system creates compounding flywheel", "85% gross margin mirrors best-in-class SaaS", "Proven category: $600B market, fragmented incumbents", "Data moat (Home Health Vault) that grows with every transaction"] },
  { type: "Home Services Veteran", emoji: "🔧", offer: ["You know the contractor fraud problem firsthand", "ProLnk solves homeowner trust + pro income in one product", "DFW beachhead mirrors how other regional rollouts succeed", "Exit comps: Angi (2.4B), ServiceTitan (9.5B), Thumbtack (3.2B)", "Founding-round valuation reflects early entry premium"] },
  { type: "Family Office", emoji: "🏦", offer: ["Seed check: $100K–$500K range, preferred equity", "Hard asset underlying: Home Health Vault property data", "Conservative base case: 500 pros = profitable", "Capital efficient: AI agents replace 20+ FTEs at scale", "Quarterly reporting cadence, full financial transparency"] },
];

export default function ProLnkSeedRoundPage() {
  const [active, setActive] = useState(0);
  const inv = investorTypes[active];
  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "2.8rem", fontWeight: 800, color: "#F5E642″ }}>💰 Seed Round</div>
          <div style={{ fontSize: "1.1rem", color: "#94a3b8″, marginTop: "0.5rem" }}>Raising $2M at $8M pre-money — DFW launch + team + runway</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[["$2M", "Raise Target"], ["$8M", "Pre-Money Val"], ["~500″, "Waitlist Pros"], ["24mo", "Runway"]].map(([v, l]) => (
            <div key={l} style={{ background: "#0F2040″, borderRadius: 12, padding: "1.25rem", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#F5E642″ }}>{v}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem", marginTop: "0.25rem" }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1e3a5f" }}>
          <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>📦 Use of Funds</div>
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {[["40%", "$800K", "Technology & Infrastructure", "🛠️"], ["30%", "$600K", "Marketing & Pro Acquisition", "📣"], ["20%", "$400K", "Operations & Team", "👥"], ["10%", "$200K", "Reserve & Legal", "🔒"]].map(([pct, amt, label, ico]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 42, color: "#F5E642″, fontWeight: 700, fontSize: "0.9rem" }}>{pct}</div>
                <div style={{ flex: 1, background: "#1e3a5f", borderRadius: 4, height: 8 }}><div style={{ width: pct, background: "#F5E642″, borderRadius: 4, height: 8 }} /></div>
                <div style={{ color: "#94a3b8″, fontSize: "0.85rem", minWidth: 60 }}>{amt}</div>
                <div style={{ color: "#cbd5e1″, fontSize: "0.85rem" }}>{ico} {label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: "0.75rem" }}>🤝 What ProLnk Offers You — Select Investor Type</div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {investorTypes.map((it, i) => (
            <button key={it.type} onClick={() => setActive(i)} style={{ background: active === i ? "#F5E642″ : "#0F2040", color: active === i ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}>
              {it.emoji} {it.type}
            </button>
          ))}
        </div>
        <div style={{ background: "#0F2040″, borderRadius: 14, padding: "1.5rem", border: "2px solid #F5E642" }}>
          {inv.offer.map(o => (
            <div key={o} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.6rem", color: "#cbd5e1″, fontSize: "0.9rem" }}>
              <span style={{ color: "#F5E642″, marginTop: "0.1rem" }}>✓</span>{o}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}