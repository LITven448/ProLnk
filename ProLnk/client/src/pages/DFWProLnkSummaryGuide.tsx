import { useState } from 'react';

const USER_SUMMARIES: Record<string, { summary: string[]; nextAction: string }> = {
  homeowner: {
    summary: [
      'Submit your home service need and DFW zip code on the waitlist',
      'ProLnk matches you with vetted, licensed DFW professionals',
      'Receive competitive quotes — no cold calls, no spam',
      'Home data stored securely in your Home Health Vault',
      'DFW launch: vetted pros in HVAC, plumbing, roofing, foundation, electrical',
    ],
    nextAction: 'Join the homeowner waitlist at prolnk.io — takes 90 seconds',
  },
  partner: {
    summary: [
      'Partners earn through 5 income streams simultaneously',
      'Stream 1: Direct commission (12-70% based on tier) per match',
      'Stream 2: Network override — earn on pros you recruit (4 levels deep)',
      'Stream 3: Subscription override — 10% recurring on pros you refer',
      'Stream 4 & 5: Homeowner + Home Origination overrides — permanent revenue',
    ],
    nextAction: 'Apply for Charter Partner status — only 25 spots at this tier',
  },
  pro: {
    summary: [
      'TrustyPro: access vetted homeowner leads in your DFW service area',
      'No cold calling — homeowners request your trade, you receive the lead',
      'Subscription model: $149/mo for lead access + platform tools',
      'Leads delivered by ZIP code, trade, and availability match',
      'Build your ProLnk reputation score to unlock premium lead priority',
    ],
    nextAction: 'Apply for the TrustyPro waitlist — DFW launch cohort is limited',
  },
};

const HOW_IT_WORKS = [
  { icon: '🏘️', step: 'Homeowner submits', desc: 'Home address, service needed, preferred timeline' },
  { icon: '🤖', step: 'AI matches', desc: 'ProLnk scores and routes lead to top-matched licensed pros' },
  { icon: '🔧', step: 'Pro contacts homeowner', desc: 'Licensed, vetted pro reaches out within the agreed window' },
  { icon: '✅', step: 'Job complete', desc: 'Both parties rate experience — data improves future matches' },
];

const INCOME_STREAMS = [
  { icon: '💵', name: 'Direct Commission', desc: '12-70% per match depending on your tier' },
  { icon: '🔗', name: 'Network Override', desc: '7/4/2/1% on jobs done by your recruited pros (4 levels)' },
  { icon: '🔄', name: 'Subscription Override', desc: '12/6/3/1.5% recurring on pros you refer' },
  { icon: '🏠', name: 'Homeowner Override', desc: 'Per-lead fee for homeowners you source' },
  { icon: '🏛️', name: 'Home Origination', desc: 'Permanent share of platform fees for homes you add to the Vault' },
];

export default function DFWProLnkSummaryGuide() {
  const [userType, setUserType] = useState<string>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>ProLnk — Complete Summary</h1>
          <p style={{ color: '#a0aec0', margin: 0 }}>Everything you need to know about ProLnk on one page</p>
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.15rem' }}>⚙️ How ProLnk Works</h2>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 22, minWidth: 30 }}>{step.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem' }}>Step {i + 1}: {step.step}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.85rem', lineHeight: 1.5 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.15rem' }}>💰 5 Income Streams</h2>
          {INCOME_STREAMS.map((stream, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: i < INCOME_STREAMS.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 20 }}>{stream.icon}</span>
              <div>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem' }}>{stream.name}: </span>
                <span style={{ color: '#cbd5e0', fontSize: '0.875rem' }}>{stream.desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.15rem' }}>🎯 Your ProLnk Summary</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.875rem', margin: '0 0 1rem' }}>Select your role to see what ProLnk means for you:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {[['homeowner', '🏡 Homeowner'], ['partner', '🤝 Partner'], ['pro', '🔧 Pro/Contractor']].map(([val, label]) => (
              <button key={val} onClick={() => setUserType(val)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: userType === val ? '#F5E642′ : '#1e3a5f', background: userType === val ? '#F5E642' : ’transparent', color: userType === val ? '#0A1628′ : '#e2e8f0', fontWeight: 700, cursor: ’pointer', fontSize: '0.875rem' }}>
                {label}
              </button>
            ))}
          </div>
          {userType && (
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: '1.25rem' }}>
              {USER_SUMMARIES[userType].summary.map((point, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.45rem 0', fontSize: '0.875rem', borderBottom: i < USER_SUMMARIES[userType].summary.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span>✅</span><span style={{ color: '#e2e8f0′ }}>{point}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#F5E642', borderRadius: 8, textAlign: 'center' }}>
                <span style={{ color: '#0A1628', fontWeight: 700, fontSize: '0.9rem' }}>👉 {USER_SUMMARIES[userType].nextAction}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
