import { useState } from 'react';

const SUBMARKETS = [
  { name: 'Frisco / McKinney', type: 'Suburb Growth', dom: 18, trend: 'Seller', appreciation: '+5.2%' },
  { name: 'Plano / Allen', type: 'Established Suburb', dom: 22, trend: 'Neutral', appreciation: '+3.8%' },
  { name: 'Fort Worth Core', type: 'Urban Revital.', dom: 28, trend: 'Buyer', appreciation: '+2.9%' },
  { name: 'East Dallas / Garland', type: 'Emerging', dom: 20, trend: 'Neutral', appreciation: '+4.1%' },
  { name: 'Arlington / Mansfield', type: 'Value Suburb', dom: 25, trend: 'Neutral', appreciation: '+3.5%' },
];

export default function DFWHousingMarket2026Guide() {
  const [homeType, setHomeType] = useState('single');
  const [budget, setBudget] = useState(400000);
  const [timeline, setTimeline] = useState('6mo');
  const [advice, setAdvice] = useState<null | { timing: string; submarket: string; detail: string }>(null);

  function getAdvice() {
    let timing = '';
    let submarket = '';
    let detail = '';

    if (budget < 350000) {
      submarket = 'Fort Worth Core or Arlington';
      detail = 'Inventory has improved in this range. Buyers have more negotiating room in 2026 vs 2024 peak.';
    } else if (budget < 550000) {
      submarket = 'Plano / Allen or East Dallas';
      detail = 'Mid-range is the most competitive band. Expect to move fast — average 20-22 days on market.';
    } else {
      submarket = 'Frisco / McKinney or Colleyville';
      detail = 'Upper-tier still moves well. New construction is your friend — negotiate upgrades, not price.';
    }

    if (timeline === 'now') timing = 'Buy now — rates are unlikely to drop significantly in 2026. Waiting costs more than a rate reduction would save.';
    else if (timeline === '6mo') timing = 'Start shopping now, close in 6 months. Inventory is at its highest in spring — ideal search window.';
    else timing = 'You have time to be selective. Watch for builder incentives on excess inventory in Q3-Q4 2026.';

    setAdvice({ timing, submarket, detail });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>📊 DFW Housing Market 2026 Outlook</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Current conditions, forecasts, and timing guidance by submarket</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🏷️ Median Price', value: '$390K', sub: '+3.8% YoY' },
            { label: '⏱️ Days on Market', value: '23 avg', sub: 'Up from 18 in 2024' },
            { label: '📦 Inventory', value: '3.1 months', sub: 'Slight buyer favor' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111f3d', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{stat.label}</p>
              <p style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0' }}>{stat.value}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{stat.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🗺️ Submarket Snapshot</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Submarket', 'Type', 'Days on Mkt', 'Conditions', 'Appreciation'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: '#94a3b8', fontSize: '0.8rem', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBMARKETS.map((s, i) => (
                  <tr key={i}>
                    <td style={{ padding: '0.625rem 0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>{s.name}</td>
                    <td style={{ padding: '0.625rem 0.75rem', color: '#94a3b8', fontSize: '0.85rem' }}>{s.type}</td>
                    <td style={{ padding: '0.625rem 0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>{s.dom} days</td>
                    <td style={{ padding: '0.625rem 0.75rem' }}>
                      <span style={{ color: s.trend === 'Seller' ? '#4ade80' : s.trend === 'Buyer' ? '#60a5fa' : '#e2e8f0', fontSize: '0.85rem' }}>{s.trend}</span>
                    </td>
                    <td style={{ padding: '0.625rem 0.75rem', color: '#F5E642', fontSize: '0.9rem' }}>{s.appreciation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem' }}>⏰ Market Timing Advisor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="single">Single Family</option>
                <option value="condo">Condo / Townhome</option>
                <option value="new">New Construction</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Budget</label>
              <select value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value={300000}>Under $350K</option>
                <option value={400000}>$350K–$550K</option>
                <option value={700000}>$550K+</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Buy Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6 }}>
                <option value="now">Ready Now</option>
                <option value="6mo">Within 6 Months</option>
                <option value="1yr">Within 1 Year+</option>
              </select>
            </div>
          </div>
          <button onClick={getAdvice} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get Market Advice →</button>
        </div>

        {advice && (
          <div style={{ background: '#111f3d', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📍 Your 2026 Market Strategy</h3>
            <p style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}><strong style={{ color: '#F5E642' }}>Timing:</strong> {advice.timing}</p>
            <p style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}><strong style={{ color: '#F5E642' }}>Best Submarket:</strong> {advice.submarket}</p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{advice.detail}</p>
          </div>
        )}
      </div>
    </div>
  );
}
