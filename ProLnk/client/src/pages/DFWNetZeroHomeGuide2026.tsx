import { useState } from 'react';

export default function DFWNetZeroHomeGuide2026() {
  const [sqft, setSqft] = useState('');

  const calcNetZero = () => {
    const s = parseInt(sqft) || 0;
    if (!s) return null;
    const solarKW = Math.round((s / 250) * 10) / 10;
    const solarCost = Math.round(solarKW * 3200);
    const batteryCost = 12000;
    const hpHVAC = Math.round(s * 4.5);
    const hpWaterHeater = 1800;
    const evCharger = 1200;
    const totalCost = solarCost + batteryCost + hpHVAC + hpWaterHeater + evCharger;
    const taxCredit = Math.round((solarCost + batteryCost) * 0.30);
    const netCost = totalCost - taxCredit;
    const annualSavings = Math.round(s * 1.85);
    const payback = Math.round((netCost / annualSavings) * 10) / 10;
    return { solarKW, solarCost, batteryCost, hpHVAC, totalCost, taxCredit, netCost, annualSavings, payback };
  };

  const result = calcNetZero();

  const steps = [
    { num: 1, emoji: '🔒', title: 'Air Seal & Insulate First', desc: 'Reduce load before adding solar. DFW net zero starts with a tight building envelope.' },
    { num: 2, emoji: '🌀', title: 'Heat Pump HVAC', desc: 'Replace gas furnace + AC with all-electric heat pump. SEER2 18+ for DFW heat.' },
    { num: 3, emoji: '🚿', title: 'Heat Pump Water Heater', desc: 'Replaces gas water heater. 3x more efficient. DFW savings: $400-600/yr.' },
    { num: 4, emoji: '☀️', title: 'Solar PV System', desc: 'DFW avg: 8-10kW system. 229 sunny days makes DFW ideal — top 10% solar resource in US.' },
    { num: 5, emoji: '🔋', title: 'Battery Backup', desc: 'Essential in DFW after 2021 freeze. 10-13.5 kWh protects critical loads for 1-2 days.' },
    { num: 6, emoji: '🚗', title: 'EV Charger (Level 2)', desc: 'Complete all-electric transition. Charge from solar during DFW peak sun hours.' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>DFW Net Zero Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>DFW gets 229 sunny days/year — ideal conditions to achieve net zero energy</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '28px' }}>
          {[
            { emoji: '☀️', stat: '229', label: 'Sunny Days/Year in DFW' },
            { emoji: '⚡', stat: '8-10 kW', label: 'Typical DFW Solar Size' },
            { emoji: '💰', stat: '30%', label: 'Federal Solar Tax Credit' },
          ].map(item => (
            <div key={item.stat} style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{item.emoji}</div>
              <div style={{ color: '#F5E642', fontSize: '22px', fontWeight: 700 }}>{item.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🛣️ Net Zero Upgrade Sequence for DFW</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {steps.map(step => (
              <div key={step.num} style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '16px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>{step.num}</div>
                <div>
                  <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>{step.emoji} {step.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '14px' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🧮 DFW Net Zero Cost Estimator</h2>
          <label style={{ color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px' }}>🏠 Home Size (sq ft)</label>
          <input type='number' placeholder='e.g. 2200' value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '2px solid #F5E642', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '16px', boxSizing: 'border-box', marginBottom: '16px' }} />
          {result && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: , val: , color: '#f97316' },
                { label: 'Battery Backup', val: , color: '#f97316' },
                { label: 'Heat Pump HVAC', val: , color: '#f97316' },
                { label: 'Federal Tax Credit (30%)', val: , color: '#22c55e' },
                { label: 'Net Cost After Credits', val: , color: '#F5E642' },
                { label: 'Annual Savings', val: , color: '#22c55e' },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: item.color, fontWeight: 700, fontSize: '16px' }}>{item.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}