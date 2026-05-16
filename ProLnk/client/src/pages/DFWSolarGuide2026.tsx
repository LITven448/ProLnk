import { useState } from 'react';

export default function DFWSolarGuide2026() {
  const [homeSize, setHomeSize] = useState(2000);
  const [electricBill, setElectricBill] = useState(200);

  const systemKw = Math.round((electricBill * 12) / 1400 * 10) / 10;
  const grossCost = Math.round(systemKw * 3000 / 500) * 500;
  const afterItc = Math.round(grossCost * 0.7 / 500) * 500;
  const annualSavings = electricBill * 12 * 0.85;
  const payback = Math.round(afterItc / annualSavings * 10) / 10;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>☀️</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW Solar Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything DFW homeowners need to know about going solar in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌤️', label: 'Sunny Days/Year', value: '229' },
            { icon: '💰', label: 'Avg System Cost', value: '$17,500' },
            { icon: '📅', label: 'Typical Payback', value: '7–9 yrs' },
          ].map(card => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642' }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{card.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Key DFW Solar Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Oncor net metering credits excess power at avoided-cost rate (~$0.03/kWh)</li>
            <li>TX law prohibits HOAs from banning solar — they may regulate aesthetics only</li>
            <li>30% federal ITC applies through 2032 — no income cap for homeowners</li>
            <li>Typical DFW 2,000 sqft home needs 8–10 kW system</li>
            <li>Panels last 25–30 years; inverters 10–15 years</li>
          </ul>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Solar ROI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Home Size (sqft)</label>
              <input type="range" min={1000} max={5000} step={100} value={homeSize}
                onChange={e => setHomeSize(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeSize.toLocaleString()} sqft</div>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13 }}>Monthly Electric Bill ($)</label>
              <input type="range" min={50} max={500} step={10} value={electricBill}
                onChange={e => setElectricBill(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${electricBill}/mo</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { label: 'System Size', value: `${systemKw} kW` },
              { label: 'Gross Cost', value: `$${grossCost.toLocaleString()}` },
              { label: 'After 30% ITC', value: `$${afterItc.toLocaleString()}` },
              { label: 'Payback', value: `${payback} yrs` },
            ].map(r => (
              <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{r.value}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
