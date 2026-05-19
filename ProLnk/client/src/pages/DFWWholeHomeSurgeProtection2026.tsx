import { useState } from 'react';

export default function DFWWholeHomeSurgeProtection2026() {
  const [value, setValue] = useState(0);

  const tiers = [
    { min: 0, max: 10000, label: 'Under $10K Electronics', risk: 'Moderate', rec: 'Individual surge strips ($30–80 each) may suffice.', roi: 'Protect each device individually. Whole-home still recommended for HVAC and appliances.' },
    { min: 10001, max: 30000, label: '$10K–30K Electronics', risk: 'High', rec: 'Whole-home surge protector strongly recommended.', roi: 'One ERCOT grid event could cost $5K–15K. $400 installed = clear ROI.' },
    { min: 30001, max: 75000, label: '$30K–75K Electronics', risk: 'Very High', rec: 'Whole-home surge protector + point-of-use on servers/TVs/audio.', roi: 'Single lightning strike could cause $15K–40K damage. Layered protection essential.' },
    { min: 75001, max: 999999, label: 'Over $75K Electronics', risk: 'Critical', rec: 'Whole-home surge protector + UPS for critical equipment.', roi: 'Home theater, recording studio, smart home hub: budget for $1,200+ in layered protection.' },
  ];

  const tier = tiers.find(t => value >= t.min && value <= t.max) || tiers[0];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛡️</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW Whole-Home Surge Protection 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>ERCOT grid events + DFW thunderstorms = highest surge risk in Texas</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '⛈️', label: 'DFW Risk Level', value: 'Very High' },
            { icon: '💵', label: 'Installed Cost', value: '$300–500' },
            { icon: '🔌', label: 'Protects', value: 'Whole Panel' },
            { icon: '📅', label: 'Install Time', value: '1–2 Hours' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 8px' }}>💡 Calculate Your Surge Protection ROI</h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 20px' }}>Estimate total value of home electronics (TVs, HVAC, appliances, computers, audio)</p>
          <div style={{ marginBottom: '16px' }}>
            <input type='range' min='0' max='100000' step='5000' value={value} onChange={e => setValue(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642', cursor: 'pointer' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '12px', marginTop: '4px' }}>
              <span>$0</span><span>$25K</span><span>$50K</span><span>$75K</span><span>$100K+</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: '#F5E642', fontWeight: '700', fontSize: '18px' }}>{tier.label}</span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', backgroundColor: '#1e3a5f', color: '#60a5fa', fontWeight: '600', fontSize: '13px' }}>Risk: {tier.risk}</span>
            </div>
            <p style={{ color: '#cbd5e1', margin: '0 0 10px', lineHeight: '1.6' }}>{tier.rec}</p>
            <p style={{ color: '#94a3b8', margin: 0, lineHeight: '1.6', fontSize: '14px' }}>{tier.roi}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 14px' }}>🆚 Whole-Home vs. Power Strips</h2>
          {[
            { feature: 'Protects HVAC & appliances', whole: true, strip: false },
            { feature: 'Installed at breaker panel', whole: true, strip: false },
            { feature: 'Handles direct lightning transients', whole: true, strip: false },
            { feature: 'Stops surges at entry point', whole: true, strip: false },
            { feature: 'Portable / plug-in', whole: false, strip: true },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px', padding: '10px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none', alignItems: 'center' }}>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{row.feature}</span>
              <span style={{ textAlign: 'center', color: row.whole ? '#4ade80' : '#ef4444' }}>{row.whole ? '✅' : '❌'}</span>
              <span style={{ textAlign: 'center', color: row.strip ? '#4ade80' : '#ef4444' }}>{row.strip ? '✅' : '❌'}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}