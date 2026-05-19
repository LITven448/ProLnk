import { useState } from 'react';

export default function DFWHVACAirSourceVsGround() {
  const [budget, setBudget] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [result, setResult] = useState<null | 'air' | 'ground'>(null);

  function getRec() {
    const b = parseInt(budget);
    if (!b || !lotSize) return;
    if (b < 20000 || lotSize === 'small') setResult('air');
    else if (b >= 25000 && (lotSize === 'large' || lotSize === 'half')) setResult('ground');
    else setResult('air');
  }

  const compare = [
    { feature: 'Upfront Cost', air: '$6,000–$15,000', ground: '$20,000–$45,000' },
    { feature: 'DFW Installation', air: '1–2 days, standard', ground: '3–7 days, drilling required' },
    { feature: 'DFW Clay Soil Impact', air: 'None', ground: 'High — DFW clay shifts, affects loop field longevity' },
    { feature: 'Efficiency (COP)', air: '2.5–4.5', ground: '3.5–5.5' },
    { feature: 'Winter Performance', air: 'Excellent (DFW rarely below 20°F)', ground: 'Excellent (ground temp stable 65°F year-round)' },
    { feature: 'Annual Energy Savings', air: '$600–$1,200 vs gas', ground: '$1,200–$2,200 vs gas' },
    { feature: 'Payback Period in DFW', air: '4–7 years', ground: '12–20 years' },
    { feature: 'Rebates Available', air: '$500–$2,000 (utility + federal)', ground: '$2,000–$5,000 (federal 30% ITC)' },
    { feature: 'Maintenance', air: 'Annual tune-up', ground: 'Loop field lasts 50+ years; indoor unit same as air source' },
    { feature: 'Best For', air: 'Most DFW homes', ground: 'Large lots, long-term owners, high energy users' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>🌡️ HEAT PUMP COMPARISON</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Air Source vs Ground Source Heat Pumps in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>Ground source sounds appealing — but DFW's clay soil and mild winters change the math significantly. Here's the honest comparison.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏠 Get Your DFW Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Your Budget</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 15000" style={{ width: '100%', background: '#0A1628', border: '1px solid #1a3a5c', borderRadius: 8, padding: '0.6rem', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1a3a5c', borderRadius: 8, padding: '0.6rem', color: '#fff', fontSize: '0.95rem' }}>
                <option value="">Select lot size</option>
                <option value="small">Small (&lt;0.2 acres)</option>
                <option value="quarter">Quarter acre (0.2–0.4)</option>
                <option value="half">Half acre (0.4–0.75)</option>
                <option value="large">Large (0.75+ acres)</option>
              </select>
            </div>
          </div>
          <button onClick={getRec} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Recommendation</button>
          {result === 'air' && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>✅ Recommendation: Air Source Heat Pump</div>
              <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>For most DFW homes, air source delivers the best ROI. DFW's winters rarely stress air source systems, and payback is 4–7 years versus 12–20 for ground source. Your budget or lot size supports this choice. A modern inverter-driven air source unit will outperform ground source on pure economics for most DFW situations.</div>
            </div>
          )}
          {result === 'ground' && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>⚠️ Ground Source Could Work — With Caution</div>
              <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>You have the budget and lot size. But DFW's clay soil can shift loop fields over decades — get a geothermal specialist to assess your specific soil before committing. Expect $25,000–$45,000 installed, with 12–20 year payback. The 30% federal tax credit helps. Best for long-term owners with high energy usage.</div>
            </div>
          )}
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F5E642' }}>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#94a3b8' }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#F5E642' }}>✈️ Air Source</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#60a5fa' }}>🌍 Ground Source</th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row, i) => (
                <tr key={row.feature} style={{ background: i % 2 === 0 ? '#0F2040' : '#0A1628' }}>
                  <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{row.feature}</td>
                  <td style={{ padding: '0.75rem', color: '#e2e8f0' }}>{row.air}</td>
                  <td style={{ padding: '0.75rem', color: '#e2e8f0' }}>{row.ground}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get DFW Heat Pump Quotes</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>ProLnk connects you with licensed DFW pros who specialize in both air and ground source heat pump systems.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Compare Heat Pump Quotes →</button>
        </div>
      </div>
    </div>
  );
}
