import { useState } from 'react';

export default function DFWJobMarketImpactOnHousing2026() {
  const [selected, setSelected] = useState('Toyota HQ');

  const employers = [
    { name: 'Toyota HQ', city: 'Plano', jobs: 9000, emoji: '🚗', bestNeighborhoods: ['Plano', 'Frisco', 'Allen'], priceRange: '$450K–$700K', commute: '10–20 min' },
    { name: 'Goldman Sachs', city: 'Richardson', jobs: 5000, emoji: '💼', bestNeighborhoods: ['Richardson', 'Garland', 'Allen'], priceRange: '$380K–$600K', commute: '8–18 min' },
    { name: 'Charles Schwab', city: 'Westlake', jobs: 7000, emoji: '📈', bestNeighborhoods: ['Southlake', 'Keller', 'Colleyville'], priceRange: '$550K–$900K', commute: '10–25 min' },
    { name: 'Amazon Fulfillment', city: 'Grand Prairie', jobs: 12000, emoji: '📦', bestNeighborhoods: ['Grand Prairie', 'Arlington', 'Mansfield'], priceRange: '$280K–$420K', commute: '10–20 min' },
    { name: 'Medical District', city: 'Dallas', jobs: 28000, emoji: '🏥', bestNeighborhoods: ['Oak Cliff', 'Uptown', 'Irving'], priceRange: '$320K–$650K', commute: '5–20 min' },
  ];

  const emp = employers.find(e => e.name === selected) || employers[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💼 DFW Jobs & Housing 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Major employers shaping DFW housing demand — find where to live based on where you work</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Fortune 500 HQs in DFW', value: '24', icon: '🏢' },
            { label: 'Jobs Added 2025–2026', value: '89K', icon: '💼' },
            { label: 'Unemployment Rate', value: '3.1%', icon: '📊' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060′ }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3060′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📍 Key Employer Campuses</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {employers.map(e => (
              <button key={e.name} onClick={() => setSelected(e.name)}
                style={{ padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: selected === e.name ? '#F5E642′ : '#1E3060',
                  color: selected === e.name ? '#0A1628′ : '#fff', fontWeight: 700, fontSize: 13 }}>
                {e.emoji} {e.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{emp.emoji}</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{emp.name}</h2>
          <div style={{ color: '#8899BB', marginBottom: 20 }}>📍 {emp.city} campus — {emp.jobs.toLocaleString()} employees</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#8899BB', fontSize: 12, marginBottom: 4 }}>TYPICAL HOME PRICE RANGE</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{emp.priceRange}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#8899BB', fontSize: 12, marginBottom: 4 }}>TYPICAL COMMUTE TIME</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{emp.commute}</div>
            </div>
          </div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Best neighborhoods for employees:</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {emp.bestNeighborhoods.map(n => (
              <span key={n} style={{ background: '#132040', padding: '6px 14px', borderRadius: 20, fontSize: 14, color: '#F5E642', fontWeight: 600 }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
