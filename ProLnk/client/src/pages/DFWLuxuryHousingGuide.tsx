import { useState } from 'react';

const LUXURY_SUBURBS = [
  { name: 'Westlake', minPrice: 1800000, vibe: 'Ultra-exclusive enclave', dom: 62, features: ['Gated communities', 'Horse properties', 'Vaquero Club access'], schools: 'A+' },
  { name: 'Southlake', minPrice: 1200000, vibe: 'Prestige family suburb', dom: 48, features: ['Dragon stadium culture', 'Town Square', 'Top-ranked schools'], schools: 'A+' },
  { name: 'Highland Park', minPrice: 2200000, vibe: 'Old-money Dallas', dom: 55, features: ['Walkable village', 'HP schools', 'Historic estates'], schools: 'A+' },
  { name: 'Colleyville', minPrice: 950000, vibe: 'Upscale entry luxury', dom: 38, features: ['Grapevine Lake access', 'Luxury new builds', 'Low density'], schools: 'A' },
  { name: 'Frisco Estates', minPrice: 1100000, vibe: 'New luxury growth', dom: 42, features: ['Smart home standard', 'Private pools', 'Premium HOA amenities'], schools: 'A+' },
];

const LUXURY_FEATURES = ['Pool / Outdoor Kitchen', 'Smart Home System', 'Chef Kitchen / Quartzite', 'Home Theater', 'Wine Cellar', 'Guest House'];

export default function DFWLuxuryHousingGuide() {
  const [luxBudget, setLuxBudget] = useState(1500000);
  const [lifestyle, setLifestyle] = useState('family');
  const [results, setResults] = useState<typeof LUXURY_SUBURBS>([]);

  function findLuxuryOptions() {
    let filtered = LUXURY_SUBURBS.filter(s => s.minPrice <= luxBudget);

    if (lifestyle === 'family') filtered = filtered.sort((a, b) => b.schools.localeCompare(a.schools));
    else if (lifestyle === 'social') filtered = filtered.sort((a, b) => a.dom - b.dom);
    else filtered = filtered.sort((a, b) => a.minPrice - b.minPrice);

    setResults(filtered);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>💎 DFW Luxury Housing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The $1M+ market: suburbs, expectations, and what your budget actually buys</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🏷️ Luxury Entry Point', value: '$950K', sub: 'Colleyville / select Frisco' },
            { label: '⏱️ Avg Days on Market', value: '49 days', sub: 'Longer than standard market' },
            { label: '📈 $1M+ Volume', value: '+12% YoY', sub: 'Luxury outperforming mid-market' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#111f3d', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{s.label}</p>
              <p style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0' }}>{s.value}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏆 What Luxury Buyers Expect in 2026</h2>
            {LUXURY_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#F5E642', fontSize: '0.875rem' }}>✦</span>
                <span style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 Luxury vs Standard Market Differences</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Longer days on market — luxury buyers shop longer</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Less price sensitive — lifestyle drives decisions</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Off-market deals more common above $2M</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Seller concessions rare — negotiate upgrades instead</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>• Jumbo mortgage rates ~0.25% above conventional</p>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>• Cash buyers represent 40%+ above $2M threshold</p>
          </div>
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>🎯 Find Your Luxury Suburb</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Luxury Budget</label>
              <select value={luxBudget} onChange={e => setLuxBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={1000000}>$950K–$1.2M</option>
                <option value={1500000}>$1.2M–$1.8M</option>
                <option value={2500000}>$1.8M–$2.5M</option>
                <option value={5000000}>$2.5M+</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Lifestyle Priority</label>
              <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="family">Best Schools / Family</option>
                <option value="social">Vibrant Social Scene</option>
                <option value="value">Best Value at Price</option>
              </select>
            </div>
          </div>
          <button onClick={findLuxuryOptions} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Show Luxury Options →</button>
        </div>

        {results.length > 0 && (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>💎 Recommended Luxury Submarkets</h3>
            {results.map((s, i) => (
              <div key={s.name} style={{ borderBottom: i < results.length - 1 ? '1px solid #1e3a5f' : 'none', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '1.05rem' }}>{s.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>From ${(s.minPrice / 1000000).toFixed(1)}M</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.25rem 0' }}>{s.vibe} · {s.dom} avg days on market · Schools: {s.schools}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                  {s.features.map(f => <span key={f} style={{ background: '#1e3a5f', color: '#e2e8f0', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem' }}>{f}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
