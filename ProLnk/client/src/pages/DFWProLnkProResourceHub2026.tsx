import { useState } from 'react';

const trades = [
  { id: 'hvac', label: '❄️ HVAC', icon: '❄️' },
  { id: 'plumbing', label: '🔧 Plumbing', icon: '🔧' },
  { id: 'electrical', label: '⚡ Electrical', icon: '⚡' },
  { id: 'roofing', label: '🏠 Roofing', icon: '🏠' },
  { id: 'general', label: '🔨 General', icon: '🔨' },
];

const guides: Record<string, { title: string; desc: string; tag: string }[]> = {
  hvac: [
    { title: 'TDLR HVAC Contractor License — Texas 2026 Guide', desc: 'ACR license requirements, exam prep, and application steps.', tag: 'Licensing' },
    { title: 'HVAC Business Insurance Requirements in Texas', desc: 'General liability, workers comp, and EPA 608 certification.', tag: 'Insurance' },
    { title: 'ProLnk Charter Membership for HVAC Pros', desc: 'Join at $149/mo and unlock 5 income streams in DFW.', tag: '⭐ Charter' },
    { title: 'HVAC Lead Generation Strategy for DFW 2026', desc: 'How top DFW HVAC pros fill their schedule year-round.', tag: 'Growth' },
  ],
  plumbing: [
    { title: 'Texas Plumber License Guide 2026 — TSBPE', desc: 'Apprentice to Master plumber — all license types explained.', tag: 'Licensing' },
    { title: 'Starting a Plumbing Business in DFW', desc: 'Entity formation, bonding, insurance, and first customers.', tag: 'Business' },
    { title: 'ProLnk for DFW Plumbers — 5 Income Streams', desc: 'How Charter plumbers earn from jobs, referrals, and subscriptions.', tag: '⭐ Charter' },
    { title: 'DFW Plumbing Market Analysis 2026', desc: 'Demand drivers, pricing trends, and opportunity areas in North Texas.', tag: 'Market' },
  ],
  electrical: [
    { title: 'Texas Electrical Contractor License — TDLR 2026', desc: 'Master Electrician + business license requirements for Texas.', tag: 'Licensing' },
    { title: 'DFW Electrical Permit and Inspection Guide', desc: 'Which jobs require permits in Dallas, Fort Worth, and suburbs.', tag: 'Permits' },
    { title: 'ProLnk Charter for Electricians — DFW Leads', desc: 'Get exclusive DFW electrical leads with Charter membership.', tag: '⭐ Charter' },
    { title: 'EV Charger Installation Business in DFW 2026', desc: 'The fastest-growing electrical service in North Texas homes.', tag: 'Growth Niche' },
  ],
  roofing: [
    { title: 'Texas Roofing License Requirements 2026', desc: 'What\’s required, what\’s not, and what protects your business.', tag: 'Licensing' },
    { title: 'Hail Season Business Planning for DFW Roofers', desc: 'Scaling crew, subs, and materials for storm surge in North Texas.', tag: 'Operations' },
    { title: 'Insurance Claim Process for DFW Roofing Contractors', desc: 'Supplement claims, Xactimate, and Matterport for roofing pros.', tag: 'Insurance Jobs' },
    { title: 'ProLnk Charter for DFW Roofers — Storm Lead System', desc: 'Get matched with homeowners immediately after DFW hailstorms.', tag: '⭐ Charter' },
  ],
  general: [
    { title: 'ProLnk Charter Membership — Complete Overview 2026', desc: '$149/mo for 5 income streams: job commissions, referral overrides, subscription income, homeowner origination, and network bonuses.', tag: '⭐ Most Important' },
    { title: 'ProLnk Network Income System — 4-Tier Structure', desc: 'Charter(25), Founding(100), L3(400), L4(1600) — how the cascade works.', tag: 'Income' },
    { title: 'ProLnk Profile Optimization for DFW Pros', desc: 'How to rank higher and win more matches on the ProLnk platform.', tag: 'Profile' },
    { title: 'Referring Other Pros to ProLnk — Subscription Override', desc: 'Earn 12% recurring on every pro you refer who stays active.', tag: 'Referral Income' },
  ],
};

export default function DFWProLnkProResourceHub2026() {
  const [active, setActive] = useState('general');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👷⭐</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>
            ProLnk Pro Complete Resource Hub 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>
            Everything DFW service professionals need — licensing, business setup, and earning more with ProLnk.
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '2px solid #F5E642′ }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: '5 Income Streams', icon: '💰' },
              { label: '$149/mo Charter', icon: '⭐' },
              { label: 'Exclusive DFW Leads', icon: '🎯' },
              { label: '72% Job Keep Rate', icon: '📈' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {trades.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: '10px 20px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: active === t.id ? '#F5E642′ : '#1e3a5f', color: active === t.id ? '#0A1628' : '#94a3b8',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16, marginBottom: 40 }}>
          {guides[active].map((g, i) => (
            <div key={i} style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d4a7a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', margin: 0, flex: 1, marginRight: 8 }}>{g.title}</h3>
                <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '3px 8px', borderRadius: 12, whiteSpace: 'nowrap' }}>{g.tag}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>{g.desc}</p>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                Read Guide →
              </button>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, textAlign: 'center', border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Join ProLnk as a Charter Member</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Charter closes at 500 pros. Lock in $149/mo and 5 income streams before it fills up.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Apply for Charter Membership →
          </button>
        </div>
      </div>
    </div>
  );
}