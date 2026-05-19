import { useState } from 'react';

const suburbs = [
  { rank: 1, name: 'Frisco', safety: 95, schools: 98, medianPrice: 620000, commuteDallas: 35, commuteFW: 50, growth: 92, amenities: 90 },
  { rank: 2, name: 'Southlake', safety: 97, schools: 99, medianPrice: 900000, commuteDallas: 38, commuteFW: 20, growth: 72, amenities: 88 },
  { rank: 3, name: 'Allen', safety: 94, schools: 96, medianPrice: 520000, commuteDallas: 32, commuteFW: 52, growth: 85, amenities: 85 },
  { rank: 4, name: 'McKinney', safety: 93, schools: 94, medianPrice: 460000, commuteDallas: 40, commuteFW: 55, growth: 88, amenities: 92 },
  { rank: 5, name: 'Prosper', safety: 96, schools: 95, medianPrice: 580000, commuteDallas: 45, commuteFW: 58, growth: 96, amenities: 78 },
  { rank: 6, name: 'Colleyville', safety: 96, schools: 93, medianPrice: 750000, commuteDallas: 35, commuteFW: 22, growth: 68, amenities: 82 },
  { rank: 7, name: 'Flower Mound', safety: 94, schools: 95, medianPrice: 560000, commuteDallas: 35, commuteFW: 28, growth: 74, amenities: 84 },
  { rank: 8, name: 'Celina', safety: 95, schools: 88, medianPrice: 380000, commuteDallas: 52, commuteFW: 65, growth: 98, amenities: 62 },
  { rank: 9, name: 'Keller', safety: 93, schools: 92, medianPrice: 480000, commuteDallas: 38, commuteFW: 18, growth: 70, amenities: 80 },
  { rank: 10, name: 'Coppell', safety: 95, schools: 97, medianPrice: 590000, commuteDallas: 22, commuteFW: 30, growth: 60, amenities: 88 },
];

export default function DFWBestSuburbsGuide() {
  const [budget, setBudget] = useState(550000);
  const [priority, setPriority] = useState('schools');

  const filtered = suburbs.filter(s => s.medianPrice <= budget);
  const scored = filtered.map(s => {
    let score = 0;
    if (priority === 'schools') score = s.schools;
    else if (priority === 'commute') score = 100 - s.commuteDallas;
    else if (priority === 'community') score = s.amenities;
    else score = 100 - (s.medianPrice / 10000);
    return { ...s, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Best DFW Suburbs 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 18 }}>Top 10 Dallas–Fort Worth suburbs ranked by safety, schools, price, commute & growth</p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F5E642', color: '#0A1628′ }}>
                {['#', 'Suburb', '🛡️ Safety', '🎓 Schools', '💰 Median Price', '🚗 To Dallas', '📈 Growth', '🎉 Amenities'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suburbs.map((s, i) => (
                <tr key={s.name} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <td style={{ padding: '10px 12px', color: '#F5E642', fontWeight: 700 }}>{s.rank}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '10px 12px', color: s.safety >= 95 ? '#22c55e' : '#94a3b8′ }}>{s.safety}/100</td>
                  <td style={{ padding: '10px 12px', color: s.schools >= 95 ? '#22c55e' : '#94a3b8′ }}>{s.schools}/100</td>
                  <td style={{ padding: '10px 12px' }}>${s.medianPrice.toLocaleString()}</td>
                  <td style={{ padding: '10px 12px' }}>{s.commuteDallas} min</td>
                  <td style={{ padding: '10px 12px', color: s.growth >= 90 ? '#f59e0b' : '#94a3b8′ }}>{s.growth}/100</td>
                  <td style={{ padding: '10px 12px' }}>{s.amenities}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🎯 Find Your Perfect Suburb</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Budget (max home price)</label>
              <input type="range" min={380000} max={900000} step={10000} value={budget} onChange={e => setBudget(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>${budget.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 13 }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid rgba(245,230,66,0.4)', borderRadius: 8, padding: '8px 12px' }}>
                <option value="schools">🎓 Schools</option>
                <option value="commute">🚗 Commute</option>
                <option value="community">🎉 Community & Amenities</option>
                <option value="price">💰 Best Value</option>
              </select>
            </div>
          </div>
          {scored.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {scored.map((s, i) => (
                <div key={s.name} style={{ background: i === 0 ? 'rgba(245,230,66,0.15)' : 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 16, border: i === 0 ? '1px solid #F5E642′ : '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: i === 0 ? '#F5E642′ : '#fff' }}>{s.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>${s.medianPrice.toLocaleString()} median</div>
                  <div style={{ color: '#22c55e', fontSize: 13 }}>Score: {Math.round(s.score)}/100</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: 24 }}>Increase your budget to see recommendations</div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#64748b', fontSize: 13 }}>
          Data reflects 2026 market conditions. Home prices are median estimates. Commute times are off-peak averages.
        </div>
      </div>
    </div>
  );
}
