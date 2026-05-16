import { useState } from 'react';

export default function DFWRadiantBarrierROI2026() {
  const [sqft, setSqft] = useState('');
  const [bill, setBill] = useState('');

  const calcROI = () => {
    const s = parseInt(sqft) || 0;
    const b = parseInt(bill) || 0;
    if (!s || !b) return null;
    const annualBill = b * 12;
    const savings = Math.round(annualBill * 0.075);
    const installCost = Math.round(s * 0.65);
    const clamped = Math.max(1000, Math.min(installCost, 2000));
    const payback = Math.round((clamped / savings) * 10) / 10;
    const tenYearNet = Math.round(savings * 10 - clamped);
    return { savings, installCost: clamped, payback, tenYearNet };
  };

  const result = calcROI();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>☀️</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>DFW Radiant Barrier ROI Calculator 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Is a radiant barrier worth the investment in the DFW heat?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
          {[
            { emoji: '🌡️', stat: '140°F', label: 'DFW Attic Summer Temp' },
            { emoji: '🛡️', stat: '97%', label: 'Radiant Heat Blocked' },
            { emoji: '❄️', stat: '5-10%', label: 'AC Load Reduction' },
            { emoji: '📅', stat: '5-8 yrs', label: 'Payback Period (DFW)' },
          ].map(item => (
            <div key={item.stat} style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontSize: '24px', fontWeight: 700 }}>{item.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🧮 Calculate Your DFW Radiant Barrier ROI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px' }}>🏠 Home Size (sq ft)</label>
              <input
                type='number'
                placeholder='e.g. 2000'
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', border: '2px solid #F5E642', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px' }}>⚡ Monthly Electric Bill ($)</label>
              <input
                type='number'
                placeholder='e.g. 280'
                value={bill}
                onChange={e => setBill(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0A1628', border: '2px solid #F5E642', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '16px', textAlign: 'center' }}>Your DFW Radiant Barrier ROI</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Annual Savings</div>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '20px' }}>${result.savings}/yr</div>
                </div>
                <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Install Cost</div>
                  <div style={{ color: '#f97316', fontWeight: 700, fontSize: '20px' }}>${result.installCost}</div>
                </div>
                <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Payback Period</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '20px' }}>{result.payback} yrs</div>
                </div>
                <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>10-Year Net Gain</div>
                  <div style={{ color: result.tenYearNet > 0 ? '#22c55e' : '#ef4444', fontWeight: 700, fontSize: '20px' }}>${result.tenYearNet}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2540', borderRadius: '10px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', marginBottom: '12px' }}>📋 DFW Radiant Barrier Tips</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Best installed on attic rafters (not attic floor) for DFW performance</li>
            <li>Perforated foil required in humid DFW climate — prevents condensation</li>
            <li>Combine with R-38+ blown-in insulation for maximum DFW summer savings</li>
            <li>Oncor rebate: up to $300 available — check current year eligibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}