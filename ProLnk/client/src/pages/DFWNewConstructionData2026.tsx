import { useState } from 'react';

export default function DFWNewConstructionData2026() {
  const [budget, setBudget] = useState(400000);
  const [timeline, setTimeline] = useState<'now'|'6mo'|'12mo'>('now');

  const builders = [
    { name: 'D.R. Horton', share: 18, specialty: 'Entry-level & move-up', emoji: '🏗' },
    { name: 'Lennar', share: 12, specialty: 'Everything included', emoji: '🏠' },
    { name: 'Meritage Homes', share: 9, specialty: 'Energy-efficient builds', emoji: '🌿' },
    { name: 'Highland Homes', share: 8, specialty: 'Custom-feel production', emoji: '⭐' },
    { name: 'Perry Homes', share: 7, specialty: 'Texas-based, flexible plans', emoji: '🤠' },
  ];

  const cities = [
    { name: 'Celina', permits: 4800, growth: '+38%', emoji: '🚀' },
    { name: 'Haslet', permits: 3200, growth: '+31%', emoji: '📈' },
    { name: 'Midlothian', permits: 2900, growth: '+27%', emoji: '🌱' },
    { name: 'Anna', permits: 2600, growth: '+24%', emoji: '🏡' },
    { name: 'Forney', permits: 2300, growth: '+19%', emoji: '🔨' },
  ];

  const getRecommendation = () => {
    if (budget < 300000 && timeline === 'now') return { rec: 'Resale', reason: 'New construction hard to find under $300K in DFW — resale is your best bet right now' };
    if (budget < 300000) return { rec: 'Wait for Incentives', reason: 'Builder incentives on spec homes can close the gap — check D.R. Horton & Lennar clearance events' };
    if (budget >= 300000 && budget < 450000 && timeline !== '12mo') return { rec: 'New Construction', reason: 'Sweet spot — Celina, Anna, Haslet have strong inventory in this range from top builders' };
    if (budget >= 450000) return { rec: 'New Construction', reason: 'Excellent selection from premium builders; consider Prosper or Southlake for resale value' };
    return { rec: 'Either Works', reason: 'Both markets have good options at your budget — compare total cost of ownership' };
  };

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗 DFW New Construction 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>42,000 new homes permitted in DFW — builders, growth cities, and what to expect</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Permits Pulled', value: '42,000', icon: '📋' },
            { label: 'Active Communities', value: '380+', icon: '🏘' },
            { label: 'Avg New Home Price', value: '$428K', icon: '💰' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060′ }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060′ }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏆 Top Builders by Volume</h2>
            {builders.map(b => (
              <div key={b.name} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{b.emoji} {b.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{b.share}%</span>
                </div>
                <div style={{ color: '#8899BB', fontSize: 12, marginTop: 2 }}>{b.specialty}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060′ }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚀 Top Growth Cities</h2>
            {cities.map(c => (
              <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span>{c.emoji} {c.name}</span>
                <span style={{ color: '#8899BB', fontSize: 13 }}>{c.permits.toLocaleString()} permits</span>
                <span style={{ color: '#4CAF50', fontWeight: 700 }}>{c.growth}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 New vs Resale Advisor</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#8899BB', fontSize: 13, display: 'block', marginBottom: 4 }}>Budget: ${(budget/1000).toFixed(0)}K</label>
            <input type="range" min={200000} max={800000} step={25000} value={budget} onChange={e=>setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }}/>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['now','6mo','12mo'] as const).map(t => (
              <button key={t} onClick={()=>setTimeline(t)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: timeline===t ? '#F5E642′ : '#1E3060', color: timeline===t ? '#0A1628' : '#fff', fontWeight: 700 }}>{t===’now'?'Buy Now':t==='6mo'?'6 Months':'12 Months'}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Recommendation: {rec.rec}</div>
            <div style={{ color: '#8899BB' }}>{rec.reason}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
