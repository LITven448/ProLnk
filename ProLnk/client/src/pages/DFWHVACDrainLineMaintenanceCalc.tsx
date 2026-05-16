import { useState } from 'react';

const riskFactors = [
  { icon: '💧', label: '2-5 gallons/day', detail: 'Average DFW HVAC condensate output in summer. Drain lines must be clear.' },
  { icon: '🦠', label: 'Algae in 30-60 days', detail: "DFW's heat + moisture grows algae in drain lines faster than most US markets." },
  { icon: '🏠', label: '#1 DFW HVAC emergency', detail: 'Drain line clogs cause water damage to ceilings, walls, and subflooring.' },
  { icon: '⚠️', label: '$2,000-8,000 damage', detail: 'Average water damage cost when overflow is caught late or float switch fails.' },
];

const locations = ['Attic air handler', 'Closet air handler', 'Garage air handler', 'Basement/crawlspace'];
const usages = ['Year-round AC (typical DFW)', 'Summer-only use', 'Seasonal with long breaks'];

function getRiskAndSchedule(location: string, usage: string) {
  const isAttic = location === 'Attic air handler';
  const isYearRound = usage === 'Year-round AC (typical DFW)';

  if (isAttic && isYearRound) {
    return {
      risk: 'HIGH',
      color: '#ef4444',
      treatment: 'Monthly flush (May–Sep), every 2 months off-season',
      product: 'Distilled white vinegar (1 cup) or AC Safe drain tabs',
      float: 'Install secondary float switch immediately if not present',
      note: 'Attic clogs drain into living space ceiling — most expensive DFW damage scenario.',
    };
  }
  if (isAttic) {
    return {
      risk: 'MEDIUM-HIGH',
      color: '#f97316',
      treatment: 'Every 2 months during use, inspect at season start',
      product: 'Distilled white vinegar or commercial algaecide tabs',
      float: 'Float switch strongly recommended for attic units',
      note: 'Even seasonal attic units can clog — inspect drain pan before each season.',
    };
  }
  if (isYearRound) {
    return {
      risk: 'MEDIUM',
      color: '#F5E642',
      treatment: 'Every 3 months year-round',
      product: 'Distilled white vinegar (1 cup per flush)',
      float: 'Float switch recommended but less critical than attic',
      note: 'Closet/garage units are easier to monitor — check drain pan monthly in summer.',
    };
  }
  return {
    risk: 'LOWER',
    color: '#22c55e',
    treatment: 'Flush at season start and midpoint',
    product: 'Distilled white vinegar',
    float: 'Float switch still recommended as low-cost protection',
    note: 'Inspect drain line and pan before every cooling season startup.',
  };
}

export default function DFWHVACDrainLineMaintenanceCalc() {
  const [location, setLocation] = useState('');
  const [usage, setUsage] = useState('');
  const result = location && usage ? getRiskAndSchedule(location, usage) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Drain Line Maintenance for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW HVAC systems produce 2-5 gallons of condensate daily in summer. Drain line clogs are the #1 HVAC emergency in the area — and entirely preventable with a simple schedule.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
          {riskFactors.map(r => (
            <div key={r.label} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{r.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{r.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🧮 Calculate Your DFW Drain Line Risk</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Air Handler Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select location...</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Usage Pattern</label>
              <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select usage...</option>
                {usages.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: result.color }}>Risk Level: {result.risk}</div>
              <div style={{ display: 'grid', gap: 10 }}>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Treatment schedule: </span><span style={{ color: '#fff', fontSize: 14 }}>{result.treatment}</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Recommended product: </span><span style={{ color: '#fff', fontSize: 14 }}>{result.product}</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Float switch: </span><span style={{ color: '#F5E642', fontSize: 14 }}>{result.float}</span></div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4, paddingTop: 10, borderTop: '1px solid #1e3a5f' }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Get a DFW HVAC Pro to Inspect Your Drain System</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>A 15-minute drain line inspection can prevent thousands in water damage.</div>
        </div>
      </div>
    </div>
  );
}
