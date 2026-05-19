import { useState } from 'react';

type UserType = 'homeowner' | 'contractor' | 'partner';

const PROMISES: Record<UserType, { headline: string; points: string[] }> = {
  homeowner: {
    headline: 'You will never wonder if your contractor is trustworthy.',
    points: [
      '✅ Every contractor is licensed, insured, and background-checked before you see their name.',
      '✅ The price you’re quoted is the price you pay — no surprise upcharges.',
      '✅ Your home’s data lives in the Home Health Vault, owned by you, never sold.',
      '✅ If a match doesn’t feel right, you can decline with zero consequences.',
      '✅ DFW-local contractors who know your neighborhood, code requirements, and weather.',
    ],
  },
  contractor: {
    headline: 'You will never pay for a lead you didn’t earn.',
    points: [
      '✅ Match-only revenue model: you pay only when you win the job.',
      '✅ No bidding wars. Homeowners see your credentials, not your ad budget.',
      '✅ Your license and insurance are verified once — permanently on your profile.',
      '✅ AI pre-qualifies homeowners so you arrive at serious, ready-to-hire jobs.',
      '✅ Every job you complete builds your permanent DFW reputation score.',
    ],
  },
  partner: {
    headline: 'You will build income that outlasts any single referral.',
    points: [
      '✅ Charter rates are locked in — national expansion cannot raise your costs.',
      '✅ Four-level cascade pays you every time anyone in your network closes a job.',
      '✅ Origination rights are permanent — homes you bring in pay you forever.',
      '✅ Full commission transparency: every payout is auditable in real time.',
      '✅ You grow by helping others succeed — alignment is built into the math.',
    ],
  },
};

const PILLARS = [
  { emoji: '🔒', label: 'Vetted Quality', blurb: 'No contractor enters without passing a 12-point check.' },
  { emoji: '💰', label: 'Fair Income', blurb: 'Partners and pros earn what the platform earns.' },
  { emoji: '📊', label: 'Transparent Pricing', blurb: 'Every fee is public. No hidden charges ever.' },
  { emoji: '🛡️', label: 'Privacy-First Data', blurb: 'Your home data is yours. ProLnk never sells it.' },
  { emoji: '🔄', label: 'Continuous Improvement', blurb: 'AI match quality improves every week automatically.' },
];

export default function DFWProLnkBrandPromise() {
  const [userType, setUserType] = useState<UserType>('homeowner');

  const labels: Record<UserType, string> = { homeowner: 'Homeowner', contractor: 'Contractor', partner: 'Partner' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🤝</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>The ProLnk Brand Promise</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>What it means to be in the ProLnk DFW network.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 32 }}>
          {(['homeowner', 'contractor', 'partner'] as UserType[]).map(t => (
            <button key={t} onClick={() => setUserType(t)}
              style={{ padding: '10px 22px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: userType === t ? '#F5E642' : '#1e3a5f', color: userType === t ? '#0A1628' : '#94a3b8' }}>
              {labels[t]}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, marginBottom: 28, borderTop: '4px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', margin: '0 0 20px' }}>{PROMISES[userType].headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PROMISES[userType].points.map((p, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#e2e8f0', fontSize: 14 }}>{p}</div>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Brand Pillars</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {PILLARS.map(p => (
            <div key={p.label} style={{ background: '#112240', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 15 }}>{p.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{p.blurb}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
