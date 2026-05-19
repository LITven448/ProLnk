import { useState } from 'react';

export default function DFWHELOCCalculator() {
  const [homeValue, setHomeValue] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [rate, setRate] = useState('8.5');
  const [results, setResults] = useState<null | {
    equity: number;
    availableHeloc: number;
    drawLimit: number;
    monthlyInterest: number;
  }>(null);

  const renovationExamples = [
    { label: 'Kitchen Remodel', pct: 0.4 },
    { label: 'Master Bath Reno', pct: 0.25 },
    { label: 'HVAC Replacement', pct: 0.15 },
    { label: 'Roof Replacement', pct: 0.2 },
  ];

  function calculate() {
    const hv = parseFloat(homeValue.replace(/,/g, '')) || 0;
    const mb = parseFloat(mortgageBalance.replace(/,/g, '')) || 0;
    const r = parseFloat(rate) || 8.5;
    const equity = hv - mb;
    const maxLtv = hv * 0.85;
    const availableHeloc = Math.max(0, maxLtv - mb);
    const drawLimit = availableHeloc * 0.9;
    const monthlyInterest = (drawLimit * (r / 100)) / 12;
    setResults({ equity, availableHeloc, drawLimit, monthlyInterest });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠💳</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW HELOC Calculator</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>Unlock your home equity in the Dallas-Fort Worth market</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          {[
            { label: 'Home Value ($)', value: homeValue, set: setHomeValue, placeholder: '450,000' },
            { label: 'Current Mortgage Balance ($)', value: mortgageBalance, set: setMortgageBalance, placeholder: '275,000' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          ))}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>HELOC Rate: {rate}%</label>
            <input type="range" min="6" max="13" step="0.25" value={rate} onChange={e => setRate(e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6B7280' }}>
              <span>6%</span><span>13%</span>
            </div>
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate My HELOC 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>📊 Your HELOC Summary</h2>
            {[
              { label: 'Home Equity', value: fmt(results.equity), sub: 'Current equity position' },
              { label: 'Available HELOC', value: fmt(results.availableHeloc), sub: 'At 85% LTV (DFW standard)' },
              { label: 'Estimated Draw Limit', value: fmt(results.drawLimit), sub: '90% of available line' },
              { label: 'Monthly Interest-Only', value: fmt(results.monthlyInterest), sub: `At ${rate}% on full draw` },
            ].map(({ label, value, sub }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                <div><div style={{ fontWeight: 600 }}>{label}</div><div style={{ fontSize: 12, color: '#6B7280' }}>{sub}</div></div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#0A1628' }}>{value}</div>
              </div>
            ))}
            <h3 style={{ fontWeight: 700, fontSize: 15, marginTop: 20, marginBottom: 12 }}>🛠️ What You Could Fund</h3>
            {renovationExamples.map(({ label, pct }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
                <span>{label}</span>
                <span style={{ fontWeight: 600, background: '#F5E642', padding: '2px 8px', borderRadius: 4 }}>{fmt(results.drawLimit * pct)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
