import { useState } from 'react';

export default function DFWHomeSalesDataQ1_2026() {
  const [budget, setBudget] = useState(350000);

  const areas = [
    { name: 'Frisco', dom: 18, medianPrice: 520000, emoji: '🏆' },
    { name: 'Prosper', dom: 21, medianPrice: 580000, emoji: '🌟' },
    { name: 'Celina', dom: 24, medianPrice: 445000, emoji: '🚀' },
    { name: 'McKinney', dom: 27, medianPrice: 430000, emoji: '🏘' },
    { name: 'Allen', dom: 29, medianPrice: 410000, emoji: '📈' },
    { name: 'Plano', dom: 31, medianPrice: 480000, emoji: '🏙' },
  ];

  const getHomesAvailable = (b: number) => {
    if (b < 250000) return { count: 320, desc: 'townhomes & condos in outer suburbs' };
    if (b < 350000) return { count: 1240, desc: 'starter homes in Mesquite, Garland, Lancaster' };
    if (b < 450000) return { count: 3800, desc: 'mid-range homes in Celina, Anna, Forney' };
    if (b < 550000) return { count: 2900, desc: 'move-up homes in Frisco, McKinney, Allen' };
    return { count: 1650, desc: 'luxury homes in Prosper, Southlake, Westlake' };
  };

  const result = getHomesAvailable(budget);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📊 DFW Home Sales Q1 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Dallas-Fort Worth residential market performance — January through March 2026</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Median Sale Price', value: '$385K', icon: '💰' },
            { label: 'Homes Sold', value: '12,450', icon: '🏠' },
            { label: 'Avg Days on Market', value: '32 DOM', icon: '📅' },
            { label: '% of List Price', value: '94%', icon: '🎯' },
            { label: 'Months of Inventory', value: '1.8 mo', icon: '📦' },
            { label: 'YoY Price Change', value: '+4.2%', icon: '📈' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3060' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏆 Fastest Moving Markets — Q1 2026</h2>
          {areas.map(a => (
            <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E3060' }}>
              <span style={{ fontWeight: 600 }}>{a.emoji} {a.name}</span>
              <span style={{ color: '#8899BB' }}>Median: <strong style={{ color: '#fff' }}>${(a.medianPrice / 1000).toFixed(0)}K</strong></span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{a.dom} days avg</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>🔍 Budget Explorer</h2>
          <p style={{ color: '#8899BB', marginBottom: 16, fontSize: 14 }}>Slide to see what your budget gets you in DFW Q1 2026</p>
          <input type="range" min={150000} max={900000} step={25000} value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: 16 }} />
          <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${(budget / 1000).toFixed(0)}K Budget</div>
          <div style={{ fontSize: 18, color: '#fff', marginBottom: 4 }}>~{result.count.toLocaleString()} homes available</div>
          <div style={{ color: '#8899BB', fontSize: 14 }}>Typical options: {result.desc}</div>
        </div>
      </div>
    </div>
  );
}
