import { useState } from 'react';

const improvements = [
  { id: 'solar', label: '☀️ Solar Panels', rate: 0.30, cap: 0, note: 'No cap — 30% of installation cost' },
  { id: 'battery', label: '🔋 Battery Storage', rate: 0.30, cap: 0, note: 'No cap — must pair with solar or standalone' },
  { id: 'hvac', label: '🌡️ Heat Pump HVAC', rate: 0.30, cap: 2000, note: '$2,000/yr max credit' },
  { id: 'waterheater', label: '💧 Heat Pump Water Heater', rate: 0.30, cap: 600, note: '$600/yr max credit' },
  { id: 'envelope', label: '🏠 Insulation / Windows / Doors', rate: 0.30, cap: 1200, note: '$1,200/yr max (windows $600, doors $500 each)' },
];

export default function DFWTexasRebatesGuide2026() {
  const [selected, setSelected] = useState('solar');
  const [cost, setCost] = useState('20000');

  const item = improvements.find(i => i.id === selected)!;
  const num = parseFloat(cost.replace(/[^0-9.]/g, '')) || 0;
  const raw = num * item.rate;
  const credit = item.cap > 0 ? Math.min(raw, item.cap) : raw;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🇺🇸 Federal IRA Credits · Texas 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>Texas State Rebates for Home Improvements 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Federal Inflation Reduction Act credits still active for DFW homeowners. Select an improvement to calculate your credit.</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {improvements.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)} style={{ padding: '0.5rem 1rem', borderRadius: '999px', border: 'none', cursor: 'pointer', backgroundColor: selected === i.id ? '#F5E642' : '#1e3a5f', color: selected === i.id ? '#0A1628' : '#e2e8f0', fontWeight: 600 }}>{i.label}</button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>💰 Project Cost (USD)</label>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: '8px', border: '1px solid #1e3a5f', backgroundColor: '#0A1628', color: '#e2e8f0', fontSize: '1.1rem' }} />
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>ℹ️ {item.note}</div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Estimated Federal Tax Credit</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F5E642' }}>${credit.toLocaleString('en-US', { minimumFractionDigits: 0 })}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Claimed on IRS Form 5695 · Not a refund, reduces tax owed</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📋 Quick Reference — Annual Limits</div>
          {improvements.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>
              <span>{i.label}</span>
              <span style={{ color: '#F5E642' }}>{i.cap > 0 ? `Up to $${i.cap.toLocaleString()}` : '30% — no cap'}</span>
            </div>
          ))}
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>Credits reset annually. Consult a tax professional for eligibility confirmation.</div>
        </div>
      </div>
    </div>
  );
}
