import { useState } from 'react';

const STAKEHOLDERS = [
  { key: 'homeowner', label: '🏠 I\’m a Homeowner', desc: 'I own property in DFW' },
  { key: 'contractor', label: '🔨 I\’m a Contractor', desc: 'I provide home services' },
  { key: 'partner', label: '🤝 I\’m a Partner/Scout', desc: 'I want to refer and earn' },
  { key: 'investor', label: '📈 I\’m an Investor', desc: 'I\’m evaluating the opportunity' },
  { key: 'agent', label: '🏡 I\’m a Real Estate Agent', desc: 'I work with buyers and sellers' },
];

const OPPORTUNITY: Record<string, { headline: string; stats: { label: string; value: string }[]; insight: string; cta: string }> = {
  homeowner: {
    headline: 'DFW homeowners overpay by $2,800/yr on average for home services',
    stats: [
      { label: 'DFW homes needing service annually', value: '2.1M' },
      { label: 'Avg homeowner spend on services/yr', value: '$8,400′ },
      { label: 'Avg overpayment vs. matched rate', value: '33%' },
      { label: 'Time wasted finding contractors/yr', value: '28 hrs' },
    ],
    insight: 'DFW homeowners call 4+ contractors on average before booking one job. ProLnk eliminates the search entirely — one AI-matched contractor, verified, ready to quote. Early members get priority matching and locked rates before ProLnk opens to the public.',
    cta: 'Join the homeowner waitlist — 5,000 spots available',
  },
  contractor: {
    headline: 'DFW has 42,000 daily service calls — and 30% go unfilled due to bad matching',
    stats: [
      { label: 'Annual DFW home services market', value: '$2.1B' },
      { label: 'Daily service calls in DFW metro', value: '42,000′ },
      { label: 'Jobs lost to no-show / no-contact', value: '30%' },
      { label: 'Avg cost of a bad lead (Angi/etc)', value: '$85′ },
    ],
    insight: 'DFW contractors waste 35% of their marketing budget on unqualified leads. ProLnk\’s match-only model means every lead you receive is pre-qualified for your trade, your territory, and your availability. Charter members pay $149/mo and earn 5 income streams — including a permanent cut of every homeowner they originate.',
    cta: 'Apply for Charter Pro membership — 500 spots at founding rate',
  },
  partner: {
    headline: 'A $2.1B market with no dominant referral network — yet',
    stats: [
      { label: 'DFW home services market size', value: '$2.1B' },
      { label: 'ProLnk addressable share at scale', value: '$420M' },
      { label: 'Partner income streams available', value: '5′ },
      { label: 'Avg monthly partner earning at 1K pros', value: '$4,200′ },
    ],
    insight: 'No platform in DFW has built a referral partner network for home services. ProLnk\’s 5-stream income model means you earn from every contractor you recruit, every homeowner you refer, every home added to the Vault — permanently. Founding partners lock in the highest commission rates before the market matures.',
    cta: 'Get partner onboarding info — founding partner rates closing soon',
  },
  investor: {
    headline: 'The DFW home services market is $2.1B and completely fragmented',
    stats: [
      { label: 'DFW annual home services spend', value: '$2.1B' },
      { label: 'DFW homes (total addressable)', value: '3.2M' },
      { label: 'Market growth rate (annual)', value: '8% YoY' },
      { label: 'ProLnk take rate at scale', value: '15-22%' },
    ],
    insight: 'No incumbent owns the DFW home services marketplace. Angi is a national directory with no local density advantage. Thumbtack is a bid marketplace with high contractor churn. ProLnk\’s match-only + data moat + 5-stream network income creates a flywheel that incumbents structurally cannot replicate. Break-even at 500 Charter Pros. Current waitlist: 400+ applicants.',
    cta: 'Request investor materials — seed round closing Q3 2026',
  },
  agent: {
    headline: 'DFW real estate agents leave $4,200/transaction in unrealized service value',
    stats: [
      { label: 'DFW home transactions annually', value: '112,000′ },
      { label: 'Avg service calls per transaction', value: '6.4′ },
      { label: 'Agent referral income per transaction', value: '$0 today' },
      { label: 'Potential partner income per transaction', value: '$340+' },
    ],
    insight: 'Real estate agents refer contractors constantly — inspectors, handymen, HVAC techs — and earn nothing from it. ProLnk\’s partner model pays agents for every homeowner they originate, every contractor they recruit, and every service job completed on homes they bring in. A 20-transaction/year agent could earn $6,800+/yr in passive partner income.',
    cta: 'Join the agent partner program — founding rates available',
  },
};

const MARKET_FACTS = [
  { icon: '📍', label: 'Market', value: 'Dallas-Fort Worth Metro' },
  { icon: '🏘️', label: 'Total Homes', value: '3.2M' },
  { icon: '💵', label: 'Annual Spend', value: '$2.1 Billion' },
  { icon: '📞', label: 'Daily Service Calls', value: '42,000′ },
  { icon: '📈', label: 'Growth Rate', value: '8% Annually' },
  { icon: '🏗️', label: 'New Homes/Yr', value: '48,000′ },
];

export default function DFWProLnkMarketOpportunity() {
  const [selected, setSelected] = useState<string | null>(null);
  const opp = selected ? OPPORTUNITY[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>📊 DFW Market Opportunity</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>$2.1B market. 3.2M homes. 42,000 daily service calls. Zero dominant marketplace.</p>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Select your role to see the opportunity from your perspective</p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
          {MARKET_FACTS.map((f) => (
            <div key={f.label} style={{ background: '#1e2d45', borderRadius: 10, padding: '12px 16px', flex: '1 1 120px' }}>
              <div style={{ fontSize: 20 }}>{f.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 800 }}>{f.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>{f.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>👤 What is your role?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {STAKEHOLDERS.map((s) => (
              <button key={s.key} onClick={() => setSelected(s.key === selected ? null : s.key)} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === s.key ? '#F5E642' : '#0A1628'}`, background: selected === s.key ? '#0A1628′ : '#0d1f38', cursor: ’pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: selected === s.key ? '#F5E642′ : '#e2e8f0', fontWeight: selected === s.key ? 700 : 400, fontSize: 14 }}>{s.label}</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {opp && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 800, marginBottom: 16 }}>{opp.headline}</h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              {opp.stats.map((s) => (
                <div key={s.label} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', flex: '1 1 140px' }}>
                  <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{opp.insight}</p>
            <div style={{ background: '#F5E642', borderRadius: 8, padding: '12px 16px', color: '#0A1628', fontWeight: 800, fontSize: 14 }}>
              🚀 {opp.cta}
            </div>
          </div>
        )}

        {!opp && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
            <div style={{ fontSize: 15 }}>Select your role above to see the market opportunity from your perspective</div>
          </div>
        )}
      </div>
    </div>
  );
}
