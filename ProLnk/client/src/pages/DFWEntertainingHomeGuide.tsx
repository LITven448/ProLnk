import { useState } from 'react';

const upgrades = [
  { name: 'Outdoor Kitchen', roi: '80-150%', cost: '$8,000-25,000', impact: 'DFW entertaining centerpiece — 9 months of use', icon: '🔥' },
  { name: 'Kitchen Island Expansion', roi: '70-100%', cost: '$5,000-15,000', impact: 'Seating for 6-8, doubles prep space', icon: '🍽️' },
  { name: 'Covered Patio / Pergola', roi: '60-80%', cost: '$10,000-35,000', impact: 'Extends outdoor season to 10+ months', icon: '⛱️' },
  { name: 'Bar / Beverage Station', roi: '50-75%', cost: '$3,000-12,000', impact: 'Wet bar or butler pantry transforms flow', icon: '🍹' },
  { name: 'Open Floor Plan Modification', roi: '65-90%', cost: '$8,000-20,000', impact: 'Remove non-load-bearing walls, open kitchen to living', icon: '🏠' },
  { name: 'Pool & Spa', roi: '50-70%', cost: '$35,000-80,000', impact: 'DFW summer essential, 6-month active use', icon: '🏊' },
];

export default function DFWEntertainingHomeGuide() {
  const [homeSqft, setHomeSqft] = useState('2500');
  const [frequency, setFrequency] = useState('monthly');
  const [style, setStyle] = useState('indoor-outdoor');
  const [result, setResult] = useState<null | { topUpgrades: typeof upgrades; totalInvest: string; roi: string; note: string }>(null);

  function calculate() {
    const sqft = parseInt(homeSqft) || 2500;
    let selected = [...upgrades];
    if (style === 'indoor') selected = upgrades.filter(u => !['Outdoor Kitchen', 'Pool & Spa', 'Covered Patio / Pergola'].includes(u.name));
    if (style === 'outdoor') selected = upgrades.filter(u => ['Outdoor Kitchen', 'Pool & Spa', 'Covered Patio / Pergola'].includes(u.name));
    if (sqft < 2000) selected = selected.slice(0, 3);
    const topUpgrades = selected.slice(0, 4);
    const low = topUpgrades.reduce((acc, u) => acc + parseInt(u.cost.replace(/\D.*/, '')), 0);
    const high = topUpgrades.reduce((acc, u) => acc + parseInt(u.cost.split('-')[1]?.replace(/\D/g, '') || '0'), 0);
    const roi = frequency === 'weekly' ? '85-120%' : frequency === 'monthly' ? '65-95%' : '45-70%';
    const note = style === 'indoor-outdoor'
      ? 'DFW homes with indoor-outdoor flow sell 12% faster and at 8% premium — investing here pays off at resale.'
      : style === 'outdoor'
      ? 'DFW outdoor kitchens have highest ROI in Sunbelt markets — weather enables 9-month use.'
      : 'Interior entertaining upgrades add immediate daily value and appeal to all-weather buyers.';
    setResult({ topUpgrades, totalInvest: `$${low.toLocaleString()} – $${high.toLocaleString()}`, roi, note });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Entertaining Home Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW has one of the strongest entertaining cultures in the country. 9 months of outdoor weather + large homes = the perfect setup. These upgrades pay back.</p>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: '16px 20px', marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
          <div><div style={{ fontSize: 24, marginBottom: 4 }}>🌞</div><div style={{ fontWeight: 700 }}>9 Months</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Outdoor season in DFW</div></div>
          <div><div style={{ fontSize: 24, marginBottom: 4 }}>📈</div><div style={{ fontWeight: 700 }}>8% Premium</div><div style={{ fontSize: 12, color: '#94a3b8' }}>For indoor-outdoor flow homes</div></div>
          <div><div style={{ fontSize: 24, marginBottom: 4 }}>🏠</div><div style={{ fontWeight: 700 }}>2,500+ sqft</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Avg DFW home size</div></div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 Top Entertaining Upgrades (DFW)</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 36 }}>
          {upgrades.map(u => (
            <div key={u.name} style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', border: '1px solid #334155', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <span style={{ fontSize: 24 }}>{u.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700 }}>{u.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{u.cost}</span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>{u.impact}</div>
                <div style={{ fontSize: 12, color: '#4ade80' }}>ROI at resale: {u.roi}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Entertaining Investment Calculator</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Home Size (sqft)</label>
              <input type="number" value={homeSqft} onChange={e => setHomeSqft(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Entertaining Frequency</label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="weekly">Weekly (active host)</option>
                <option value="monthly">Monthly (regular)</option>
                <option value="occasional">Occasional (holidays)</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Entertaining Style</label>
            <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value="indoor-outdoor">Both (maximize DFW season)</option>
              <option value="outdoor">Outdoor focused</option>
              <option value="indoor">Indoor focused</option>
            </select>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Build My Entertaining Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>🎉 Your DFW Entertaining Plan</h3>
            <div style={{ marginBottom: 16 }}>{result.topUpgrades.map(u => (
              <div key={u.name} style={{ padding: '10px 0', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{u.icon} {u.name}</span><span style={{ color: '#F5E642' }}>{u.cost}</span>
              </div>
            ))}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Total Investment: </span>{result.totalInvest}</div>
              <div style={{ marginTop: 6 }}><span style={{ color: '#4ade80', fontWeight: 700 }}>📈 Expected ROI: </span>{result.roi}</div>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>{result.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}
