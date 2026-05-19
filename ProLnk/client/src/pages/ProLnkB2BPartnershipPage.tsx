import { useState } from 'react';

export default function ProLnkB2BPartnershipPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const partners = [
    {
      type: "Title Companies",
      icon: "📝",
      volume: "~2,400 closings/mo",
      value: "Send new homeowners to ProLnk at closing",
      revenue: "$35–$85 per referral",
      pitch: "Your buyers become ProLnk homeowners — you become their trusted resource post-closing",
    },
    {
      type: "Insurance Agencies",
      icon: "🛡️",
      volume: "~8,000 policyholders/region",
      value: "Refer policyholders after claims or renewals",
      revenue: "$45–$120 per referral",
      pitch: "Post-claim repairs need trusted pros — ProLnk closes the loop for your clients",
    },
    {
      type: "Real Estate Agencies",
      icon: "🏡",
      volume: "~1,800 listings/mo",
      value: "Pre-listing repairs, staging prep, buyer repairs",
      revenue: "$50–$150 per referral",
      pitch: "Speed listings to market with pre-vetted pros — ProLnk handles the coordination",
    },
    {
      type: "Mortgage Lenders",
      icon: "🏦",
      volume: "~3,200 loans/mo",
      value: "Onboard new homeowners at loan close",
      revenue: "$30–$70 per referral",
      pitch: "New homeowners need services immediately — position your lender brand as their first resource",
    },
    {
      type: "Home Warranty Cos",
      icon: "🔒",
      volume: "~12,000 policyholders",
      value: "Supplement warranty work with ProLnk pros",
      revenue: "Rev-share per dispatched job",
      pitch: "ProLnk handles non-warranty work — you extend value without adding overhead",
    },
    {
      type: "Property Managers",
      icon: "🏢",
      volume: "~5,000 units/partner",
      value: "Maintenance, turn, vendor management",
      revenue: "Platform fee + per-job margin",
      pitch: "Replace your vendor rolodex — ProLnk manages the pro network for your entire portfolio",
    },
  ];

  const tiers = [
    { tier: "Referral Partner", fee: "Free", benefit: "Custom link, $35–$85 per close" },
    { tier: "Preferred Partner", fee: "$299/mo", benefit: "Co-branded portal, priority matching" },
    { tier: "Strategic Partner", fee: "Custom", benefit: "API integration, white-label option" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>B2B Partnership Opportunities</h1>
          <p style={{ color: "#94a3b8″, fontSize: 16, margin: 0 }}>How companies embed ProLnk into their customer journey</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 16 }}>
          {tiers.map((t) => (
            <div key={t.tier} style={{ background: "#132236″, borderRadius: 12, padding: "18px 16px", borderTop: "3px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>{t.tier}</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{t.fee}</div>
              <div style={{ fontSize: 12, color: "#94a3b8″, lineHeight: 1.6 }}>{t.benefit}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F5E642″, margin: "32px 0 16px" }}>🏢 Select Your Partner Type</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {partners.map((p) => (
            <button
              key={p.type}
              onClick={() => setSelected(selected === p.type ? null : p.type)}
              style={{
                background: selected === p.type ? "#1e3a5f" : "#132236″,
                border: selected === p.type ? "2px solid #F5E642″ : "2px solid transparent",
                borderRadius: 12, padding: "18px 14px", cursor: "pointer", color: "#fff", textAlign: "left", transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.type}</div>
              <div style={{ color: "#F5E642″, fontSize: 12, marginTop: 4 }}>{p.revenue}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: "#132236″, borderRadius: 16, padding: 28, border: "1px solid #F5E642" }}>
            {(() => { const p = partners.find(x => x.type === selected)!; return (
              <>
                <h3 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 12 }}>{p.icon} {p.type} — Partnership Value Guide</h3>
                <div style={{ color: "#cbd5e1″, lineHeight: 1.9 }}>
                  <p>📊 Your Volume: {p.volume}</p>
                  <p>🔗 How You Partner: {p.value}</p>
                  <p>💵 Revenue Model: {p.revenue}</p>
                  <p>🎯 Your Pitch: {p.pitch}</p>
                  <p>🚀 Next Step: Request a partnership kit from ProLnk — 15-min call to design your integration</p>
                </div>
              </>
            ); })()}
          </div>
        )}

        <div style={{ background: "#132236″, borderRadius: 16, padding: 24, marginTop: 24, borderLeft: "4px solid #F5E642" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, margin: "0 0 8px" }}>📈 Why B2B Partnerships Accelerate ProLnk</p>
          <p style={{ color: "#cbd5e1″, margin: 0, lineHeight: 1.8, fontSize: 14 }}>
            Every partner channel delivers homeowners at the highest-intent moment — just closed, just filed a claim, just moved in. These are zero-ad-spend homeowner acquisitions. ProLnk&apos;s B2B channel targets 50+ partners per metro for a compounding lead flywheel that competitors cannot replicate without the same trust relationships.
          </p>
        </div>
      </div>
    </div>
  );
}
