import { useState } from 'react';

const PROJECT_TYPES: Record<string, { low: number; mid: number; high: number }> = {
  HVAC: { low: 4500, mid: 8500, high: 14000 },
  Roofing: { low: 7000, mid: 12000, high: 22000 },
  Foundation: { low: 5000, mid: 15000, high: 35000 },
  Plumbing: { low: 1200, mid: 4500, high: 9000 },
  Electrical: { low: 1500, mid: 5000, high: 12000 },
  Painting: { low: 2000, mid: 5500, high: 10000 },
  Flooring: { low: 3000, mid: 7000, high: 14000 },
  Kitchen: { low: 15000, mid: 35000, high: 75000 },
  Bathroom: { low: 8000, mid: 18000, high: 40000 },
  Landscaping: { low: 2500, mid: 8000, high: 20000 },
};

const AREA_MULTIPLIERS: Record<string, number> = {
  'Dallas Proper': 1.15,
  'Fort Worth': 0.95,
  'Plano/Frisco': 1.2,
  'Arlington': 1.0,
  'McKinney/Allen': 1.1,
  'Irving/Grand Prairie': 0.97,
  'Denton': 0.92,
  'Garland/Mesquite': 0.93,
};

const SIZE_MULTIPLIERS: Record<string, number> = {
  'Under 1,500 sqft': 0.8,
  '1,500–2,500 sqft': 1.0,
  '2,500–4,000 sqft': 1.25,
  '4,000+ sqft': 1.6,
};

export default function DFWContractorCostEstimator() {
  const [project, setProject] = useState('HVAC');
  const [area, setArea] = useState('Dallas Proper');
  const [size, setSize] = useState('1,500–2,500 sqft');
  const [scope, setScope] = useState(50);

  const base = PROJECT_TYPES[project];
  const areaMult = AREA_MULTIPLIERS[area];
  const sizeMult = SIZE_MULTIPLIERS[size];
  const scopeMult = 0.6 + (scope / 100) * 0.8;

  const low = Math.round(base.low * areaMult * sizeMult * scopeMult / 100) * 100;
  const mid = Math.round(base.mid * areaMult * sizeMult * scopeMult / 100) * 100;
  const high = Math.round(base.high * areaMult * sizeMult * scopeMult / 100) * 100;

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 4 }}>DFW Contractor Cost Estimator</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Estimate project costs across DFW submarkets for 10 major trade categories.</p>

        <label style={{ display: 'block', marginBottom: 6, color: '#F5E642′ }}>Project Type</label>
        <select value={project} onChange={e => setProject(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginBottom: '1.2rem' }}>
          {Object.keys(PROJECT_TYPES).map(p => <option key={p}>{p}</option>)}
        </select>

        <label style={{ display: 'block', marginBottom: 6, color: '#F5E642′ }}>DFW Submarket</label>
        <select value={area} onChange={e => setArea(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginBottom: '1.2rem' }}>
          {Object.keys(AREA_MULTIPLIERS).map(a => <option key={a}>{a}</option>)}
        </select>

        <label style={{ display: 'block', marginBottom: 6, color: '#F5E642′ }}>Home Size</label>
        <select value={size} onChange={e => setSize(e.target.value)}
          style={{ width: '100%', padding: '0.6rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginBottom: '1.2rem' }}>
          {Object.keys(SIZE_MULTIPLIERS).map(s => <option key={s}>{s}</option>)}
        </select>

        <label style={{ display: 'block', marginBottom: 6, color: '#F5E642′ }}>Project Scope: {scope}%</label>
        <input type="range" min={10} max={100} value={scope} onChange={e => setScope(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '2rem', accentColor: '#F5E642′ }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          {[{ label: '📉 Low', val: low, bg: '#0d2a1a' }, { label: '📊 Mid', val: mid, bg: '#1a2a0d' }, { label: '📈 High', val: high, bg: '#2a1a0d' }].map(({ label, val, bg }) => (
            <div key={label} style={{ background: bg, border: '1px solid #2a3a54', borderRadius: 10, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F5E642′ }}>{fmt(val)}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', background: '#1a2a44', borderRadius: 8, padding: '1rem', color: '#aaa', fontSize: '0.85rem' }}>
          💡 Estimates reflect {area} labor rates and {size} home complexity. Actual quotes may vary 15–20%.
        </div>
      </div>
    </div>
  );
}
