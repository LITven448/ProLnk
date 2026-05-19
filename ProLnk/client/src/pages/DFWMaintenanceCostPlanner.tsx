import { useState } from 'react';

const MAINTENANCE_BASE = [
  { year: 1, label: 'Year 1', items: ['HVAC filter/service', 'Roof inspection', 'Pest control', 'Gutters'], pct: 0.008 },
  { year: 2, label: 'Year 2', items: ['Water heater flush', 'Dryer vent', 'Caulking/sealing', 'HVAC tune-up'], pct: 0.009 },
  { year: 3, label: 'Year 3', items: ['Exterior paint touch-up', 'Garage door service', 'Plumbing inspection'], pct: 0.012 },
  { year: 4, label: 'Year 4', items: ['HVAC replacement (if old)', 'Deck/fence repair', 'Driveway seal'], pct: 0.018 },
  { year: 5, label: 'Year 5', items: ['Roof eval/repair', 'Water heater replacement', 'Full exterior paint'], pct: 0.022 },
];

const AGE_MULTIPLIERS: Record<string, number> = {
  'New (0–5 yrs)': 0.6,
  'Mid (6–15 yrs)': 1.0,
  'Older (16–25 yrs)': 1.4,
  'Aging (25+ yrs)': 1.9,
};

const FEATURE_COSTS: Record<string, number> = {
  Pool: 2200,
  'Sprinkler System': 400,
  'Wood Deck': 600,
  'Detached Garage': 350,
  'Fireplace': 250,
};

export default function DFWMaintenanceCostPlanner() {
  const [homeValue, setHomeValue] = useState(350000);
  const [homeAge, setHomeAge] = useState('Mid (6–15 yrs)');
  const [features, setFeatures] = useState<Record<string, boolean>>({ Pool: false, 'Sprinkler System': false, 'Wood Deck': false, 'Detached Garage': false, 'Fireplace': false });

  const ageMult = AGE_MULTIPLIERS[homeAge];
  const featureExtra = Object.entries(features).filter(([, v]) => v).reduce((s, [k]) => s + FEATURE_COSTS[k], 0);

  const yearlyData = MAINTENANCE_BASE.map(row => ({
    ...row,
    cost: Math.round(homeValue * row.pct * ageMult) + featureExtra,
  }));

  const total5yr = yearlyData.reduce((s, r) => s + r.cost, 0);
  const monthlySavings = Math.round(total5yr / 60);

  const toggleFeature = (f: string) => setFeatures(prev => ({ ...prev, [f]: !prev[f] }));

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a1a', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>🗓️</div>
        <h1 style={{ color: '#0A1628', fontSize: '1.8rem', marginBottom: 4 }}>DFW 5-Year Maintenance Cost Planner</h1>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>Plan ahead for DFW home maintenance costs with year-by-year capital expense timing.</p>

        <div style={{ background: '#fff', borderRadius: 10, padding: '1.2rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Home Value: ${homeValue.toLocaleString()}</label>
          <input type="range" min={150000} max={900000} step={10000} value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#0A1628′ }} />

          <label style={{ display: 'block', marginTop: '1rem', marginBottom: 6, fontWeight: 600 }}>Home Age</label>
          <select value={homeAge} onChange={e => setHomeAge(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #ddd' }}>
            {Object.keys(AGE_MULTIPLIERS).map(a => <option key={a}>{a}</option>)}
          </select>

          <label style={{ display: 'block', marginTop: '1rem', marginBottom: 8, fontWeight: 600 }}>Special Features</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.keys(FEATURE_COSTS).map(f => (
              <button key={f} onClick={() => toggleFeature(f)}
                style={{ padding: '6px 14px', borderRadius: 20, border: '1px solid #0A1628', background: features[f] ? '#0A1628′ : '#fff', color: features[f] ? '#F5E642' : '#0A1628', cursor: ’pointer', fontWeight: 600 }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {yearlyData.map(row => (
          <div key={row.year} style={{ background: '#fff', borderRadius: 8, padding: '1rem', marginBottom: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#0A1628′ }}>{row.label}</div>
              <div style={{ fontSize: '0.8rem', color: '#777′ }}>{row.items.join(' · ')}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0A1628′ }}>${row.cost.toLocaleString()}</div>
          </div>
        ))}

        <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 10, padding: '1.2rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: '0.85rem', color: '#aaa' }}>5-Year Total</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${total5yr.toLocaleString()}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.85rem', color: '#aaa' }}>Monthly Savings Needed</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${monthlySavings.toLocaleString()}</div></div>
        </div>
      </div>
    </div>
  );
}
