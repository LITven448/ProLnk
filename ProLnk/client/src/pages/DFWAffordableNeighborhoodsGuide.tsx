import { useState } from 'react';

const NEIGHBORHOODS = [
  { name: 'Forney', medianPrice: 265000, schools: 'B+', safety: 'B+', commute: 'Dallas 35 min', appreciation: '+4.8%', tradeoff: 'Far east, longer commute' },
  { name: 'Kaufman Area', medianPrice: 240000, schools: 'B', safety: 'B', commute: 'Dallas 45 min', appreciation: '+5.1%', tradeoff: 'Rural feel, limited amenities' },
  { name: 'Duncanville', medianPrice: 255000, schools: 'B', safety: 'B', commute: 'Dallas 20 min', appreciation: '+3.9%', tradeoff: 'Older homes, updating needed' },
  { name: 'Cedar Hill', medianPrice: 270000, schools: 'B+', safety: 'B+', commute: 'Dallas 25 min', appreciation: '+4.2%', tradeoff: 'Limited nightlife / dining' },
  { name: 'Seagoville', medianPrice: 215000, schools: 'C+', safety: 'B-', commute: 'Dallas 30 min', appreciation: '+4.4%', tradeoff: 'Lower schools, industrial nearby' },
  { name: 'Cleburne', medianPrice: 230000, schools: 'B', safety: 'B+', commute: 'FW 40 min', appreciation: '+4.6%', tradeoff: 'Slower growth, smaller city feel' },
];

export default function DFWAffordableNeighborhoodsGuide() {
  const [maxBudget, setMaxBudget] = useState(280000);
  const [mustHave, setMustHave] = useState('schools');
  const [matches, setMatches] = useState<typeof NEIGHBORHOODS>([]);

  function findMatches() {
    let filtered = NEIGHBORHOODS.filter(n => n.medianPrice <= maxBudget);

    if (mustHave === 'schools') filtered = [...filtered].sort((a, b) => b.schools.localeCompare(a.schools));
    else if (mustHave === 'safety') filtered = [...filtered].sort((a, b) => b.safety.localeCompare(a.safety));
    else if (mustHave === 'commute') filtered = [...filtered].sort((a, b) => a.commute.localeCompare(b.commute));
    else filtered = [...filtered].sort((a, b) => parseFloat(b.appreciation) - parseFloat(a.appreciation));

    setMatches(filtered.slice(0, 5));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>💰 DFW Affordable Neighborhoods 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Best under-$300K neighborhoods with good schools, safety, and growth potential</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🏷️ Avg Under-$300K', value: '$248K', sub: 'These 6 neighborhoods' },
            { label: '📈 Avg Appreciation', value: '+4.5%', sub: 'Above DFW average' },
            { label: '🏫 Avg School Rating', value: 'B / B+', sub: 'Solid for price point' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111f3d', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0' }}>{stat.value}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>📌 What You Give Up vs Premium Suburbs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#4ade80', marginBottom: '0.5rem', fontSize: '0.95rem' }}>✅ What You Keep</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Texas school districts still rated B or better</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Safe, family-friendly neighborhoods</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• More sq footage for your dollar</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Above-average appreciation potential</p>
            </div>
            <div>
              <h4 style={{ color: '#f87171', marginBottom: '0.5rem', fontSize: '0.95rem' }}>❌ What You Trade Off</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Longer commutes (25–45 min to core)</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Fewer walkable restaurants / retail</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Older housing stock in some areas</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>• Less name-brand suburb cachet</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🎯 Find Your Top 5 Affordable DFW Neighborhoods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Max Budget</label>
              <select value={maxBudget} onChange={e => setMaxBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={230000}>Under $230K</option>
                <option value={260000}>Under $260K</option>
                <option value={280000}>Under $280K</option>
                <option value={300000}>Under $300K</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Must-Have Priority</label>
              <select value={mustHave} onChange={e => setMustHave(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="schools">Best Schools</option>
                <option value="safety">Best Safety</option>
                <option value="commute">Shortest Commute</option>
                <option value="appreciation">Highest Appreciation</option>
              </select>
            </div>
          </div>
          <button onClick={findMatches} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Show My Matches →</button>
        </div>

        {matches.length > 0 && (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏆 Your Top Affordable Neighborhoods</h3>
            {matches.map((n, i) => (
              <div key={n.name} style={{ borderBottom: i < matches.length - 1 ? '1px solid #1e3a5f' : 'none', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>#{i + 1} {n.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>${n.medianPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>🏫 {n.schools}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>🛡️ {n.safety}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>🚗 {n.commute}</span>
                  <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>📈 {n.appreciation}</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>⚠️ {n.tradeoff}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
