import { useState } from 'react';

type Role = 'Homeowner' | 'Service Pro' | 'Scout / Referrer';

const AREAS: string[] = [
  'Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney',
  'Allen', 'Richardson', 'Carrollton', 'Irving', 'Arlington',
  'Denton', 'Lewisville', 'Garland', 'Grand Prairie', 'Mesquite',
];

type Pitch = {
  headline: string;
  why: string[];
  whatHappensNext: string[];
  urgency: string;
  cta: string;
};

const PITCHES: Record<Role, Pitch> = {
  Homeowner: {
    headline: 'Free access to 2,600+ DFW home resources + vetted local pros',
    why: [
      'Get matched with verified DFW contractors — no random searches, no unvetted referrals',
      'Access the full ProLnk resource library: guides, calculators, and checklists built for North Texas',
      'Homeowner accounts are and always will be free',
      'Your home data stays private in your Home Health Vault — never sold',
    ],
    whatHappensNext: [
      'Join the waitlist in 60 seconds',
      'Receive your ProLnk welcome email with early access details',
      'When the platform launches, you get first access to the DFW pro network',
      'Start using the resource library immediately — no waiting',
    ],
    urgency: 'Charter waitlist closes at 500 applications — locks in permanent free homeowner status.',
    cta: 'Join Free as a Homeowner',
  },
  'Service Pro': {
    headline: 'Lock in Charter Pro status before 500 applications close the waitlist',
    why: [
      'Charter Pros (/mo): Locked rate forever — price never increases after you join',
      'Earn through 5 income streams: direct commissions, network overrides, subscription referrals, lead sourcing, and origination rights',
      'Build a network — earn 7/4/2/1% on jobs from Pros you recruit, 4 levels deep',
      'DFW market is wide open: 7M+ residents, underserved demand for vetted home service pros',
    ],
    whatHappensNext: [
      'Submit your application in 2 minutes',
      'Receive Charter Pro confirmation email with your position number',
      'Complete your profile when the platform opens (May 2026)',
      'First leads delivered to Charter Pros before general waitlist members',
    ],
    urgency: 'Only 500 Charter Pro spots available. 400 applications already in. 100 spots remain.',
    cta: 'Secure My Charter Pro Spot',
  },
  'Scout / Referrer': {
    headline: 'Earn recurring income by building your DFW ProLnk network',
    why: [
      'Scouts earn on every Pro they refer: 12% subscription override + network job commissions',
      'Origination rights: refer a homeowner, earn a permanent share of platform fees from their home — forever',
      '4-level deep network means your referred Pros can recruit too — you earn from their recruits',
      'No license required — Scouts are community builders, not agents',
    ],
    whatHappensNext: [
      'Join the Scout waitlist — free to join, no commitment',
      'Receive your unique referral link for DFW homeowners and pros',
      'Start sharing — every qualified referral is tracked from day one',
      'Get your first commission report when the platform launches',
    ],
    urgency: 'Scout network income compounds over time — earliest scouts build the deepest networks.',
    cta: 'Join as a DFW Scout',
  },
};

const STATS = [
  { label: 'Charter Spots Remaining', value: '~100' },
  { label: 'DFW Homeowners Waiting', value: '5,000+' },
  { label: 'Waitlist Closes At', value: '500 Pros' },
];

export default function DFWProLnkJoinNow() {
  const [role, setRole] = useState<Role | ''>('');
  const [area, setArea] = useState('');
  const pitch = role ? PITCHES[role] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚡</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>Join ProLnk Before Waitlist Closes</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '1.05rem' }}>The DFW home services platform built around you — Charter spots are limited</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#1e2d47', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Get Your Personalized Pitch</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>I Am A...</label>
              <select value={role} onChange={e => setRole(e.target.value as Role)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select your role...</option>
                {(['Homeowner', 'Service Pro', 'Scout / Referrer'] as Role[]).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.875rem' }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
                <option value=''>Select area...</option>
                {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>

          {pitch && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 1rem' }}>{area ?  : }</h3>
              <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: '0.75rem' }}>{pitch.headline}</p>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>WHY JOIN NOW</div>
                {pitch.why.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span> {w}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.5rem' }}>WHAT HAPPENS NEXT</div>
                {pitch.whatHappensNext.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: '#F5E642', flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span> {step}
                  </div>
                ))}
              </div>
              <div style={{ background: '#1e2d47', borderRadius: 8, padding: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ color: '#F5E642' }}>⏰ </span>
                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>{pitch.urgency}</span>
              </div>
              <a href='/signup' style={{ display: 'block', background: '#F5E642', color: '#0A1628', padding: '0.875rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', textAlign: 'center', fontSize: '1.05rem' }}>
                {pitch.cta} →
              </a>
            </div>
          )}
        </div>

        {!pitch && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Choose your role above to see why ProLnk is built for you.</p>
            <a href='/signup' style={{ background: '#F5E642', color: '#0A1628', padding: '0.875rem 2.5rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem' }}>
              Join the ProLnk Waitlist →
            </a>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: '1.25rem', marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            ProLnk is a DFW-first platform. Charter waitlist closes at 500 Pro applications. Homeowner access is always free.
            Questions? <a href='mailto:hello@prolnk.io' style={{ color: '#F5E642' }}>hello@prolnk.io</a>
          </p>
        </div>
      </div>
    </div>
  );
}
