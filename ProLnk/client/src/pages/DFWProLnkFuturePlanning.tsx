import { useState } from 'react';

const situations = [
  {
    id: 'early',
    label: '🌱 Just Getting Started',
    projection: '$0–$800/mo at 12 months | $3,000–$8,000/mo at 3 years',
    buildNow: [
      'Join as a Charter Partner — $149/mo locked forever, highest rates',
      'Add 10+ homes to the Vault in your first 90 days for origination rights',
      'Recruit 5 active partners in your first 6 months to unlock network income',
      'Make your first 10 matches to hit Builder tier and unlock bonus eligibility',
      'Document everything — your story becomes your recruiting tool',
    ],
    longTerm: 'Origination rights from your first 10 homes will still pay you in year 5. The earlier you add homes and build your network, the more compounding works in your favor.',
  },
  {
    id: 'builder',
    label: '📈 Building Momentum',
    projection: '$2,000–$5,000/mo now | $8,000–$20,000/mo at 2 years',
    buildNow: [
      'Push to 50+ homes in the Vault — origination rights are permanent',
      'Focus on activating partners, not just recruiting them',
      'Work toward 50+ matches to reach Connector tier',
      'Coach your top 3 partners toward Builder status — their growth = your override',
      'Review your 5-stream income monthly — identify which stream to grow next',
    ],
    longTerm: 'Partners who reach Connector tier in year 1 typically see 3–5x income growth by year 3 from network effects alone.',
  },
  {
    id: 'stepback',
    label: '🧘 Want to Step Back',
    projection: 'Passive income continues based on what you built',
    buildNow: [
      'Origination rights never expire — homes you added keep paying you',
      'Network override income continues as long as your recruits stay active',
      'Subscription overrides continue for every partner you brought in',
      'The more you built before stepping back, the more income persists',
      'Build now so stepping back later still means income, not zero',
    ],
    longTerm: 'Unlike a job, ProLnk income does not stop when you do. Origination rights and network overrides are perpetual. The key is building enough assets before stepping back.',
  },
  {
    id: 'fulltime',
    label: '🚀 Going Full-Time',
    projection: '$10,000–$30,000+/mo within 18–24 months',
    buildNow: [
      'Target 100+ homes in Vault within 12 months — origination rights compound',
      'Build a network of 25+ active partners before going full-time',
      'Reach Champion tier (100 matches + 50 partners) for top-tier income',
      'Diversify across all 5 streams — no single stream should exceed 60% of income',
      'Set income targets by stream and review monthly against projections',
    ],
    longTerm: 'Full-time ProLnk partners who reach Champion tier within 18 months and maintain a network of 50+ active partners are building an asset, not just income.',
  },
];

export default function DFWProLnkFuturePlanning() {
  const [selected, setSelected] = useState(situations[0]);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔭</div>
          <h1 style={{ fontSize: '2rem', color: '#F5E642', margin: '0.5rem 0 0' }}>DFW Future Planning Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: '0.5rem' }}>How to plan your ProLnk income for long-term goals in the DFW market</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s)} style={{ padding: '0.5rem 1rem', borderRadius: 6, border: `2px solid ${selected.id === s.id ? '#F5E642' : '#1E3A5F'}`, backgroundColor: selected.id === s.id ? '#1E3A5F' : 'transparent', color: selected.id === s.id ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #F5E64240', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>📊 Income Projection</div>
          <div style={{ color: '#CBD5E1', fontSize: '1rem' }}>{selected.projection}</div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏗 What to Build Now</div>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {selected.buildNow.map((item, i) => (
              <li key={i} style={{ color: '#CBD5E1', marginBottom: '0.6rem', lineHeight: 1.55 }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1.25rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🌊 Long-Term Compounding</div>
          <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{selected.longTerm}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[['🏠', 'Origination Rights', 'Permanent — every home you add pays forever'], ['👥', 'Network Overrides', 'Continues as long as your partners are active'], ['📅', 'Subscription Override', '10% recurring on every partner you brought in']].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#0F2040', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginTop: 4, fontSize: '0.85rem' }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: 4, lineHeight: 1.4 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
