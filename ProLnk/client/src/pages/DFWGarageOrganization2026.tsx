import { useState } from 'react';

const HEAT_RISKS = [
  { item: 'Candles & Wax', risk: 'HIGH', note: 'Melt at 130°F — DFW garage peaks at 160°F in summer' },
  { item: 'Electronics', risk: 'HIGH', note: 'Permanent damage above 95°F — use climate storage instead' },
  { item: 'Aerosol Cans', risk: 'HIGH', note: 'Explosion risk above 120°F — store in home or shed' },
  { item: 'Vinyl Records', risk: 'HIGH', note: 'Warp at 140°F — DFW garages routinely reach this' },
  { item: 'Wood Tools', risk: 'MED', note: 'Handles dry and crack — apply linseed oil annually' },
  { item: 'Tires', risk: 'LOW', note: 'Heat accelerates dry rot — shade and maintain 35 PSI' },
];

const SYSTEMS: Record<string, { title: string; items: string[]; cost: string; tip: string }> = {
  vehicles: { title: 'Vehicle-First Layout', items: ['Overhead ceiling storage for seasonal', 'Wall-mounted bike hoists', 'Slim rolling tool chest', 'Magnetic strip for small tools', 'Anti-fatigue mats at workbench'], cost: '$800–$1,800', tip: 'Keep 3-ft clearance on all vehicle sides. DFW hail events need fast entry.' },
  workshop: { title: 'Workshop Configuration', items: ['Pegboard tool walls (16 sqft min)', 'French cleat system for flexibility', 'Rolling workbench with drawers', 'Dust collection integration', 'Bright LED shop lights (5000K)'], cost: '$1,200–$3,500', tip: 'DFW dust storms (haboobs) infiltrate gaps — seal bottom of garage door.' },
  storage: { title: 'Maximum Storage System', items: ['Ceiling-mounted racks (holds 1,000 lbs)', 'Heavy-duty wire shelving units', 'Labeled plastic bins (stackable)', 'Zone map on wall', 'Step stool or rolling ladder'], cost: '$600–$2,000', tip: 'Keep 18 inches below sprinklers if applicable. Label all bins facing outward.' },
  gym: { title: 'Garage Gym Setup', items: ['Rubber flooring (3/4" min for DFW concrete)', 'Wall-mounted TV or mirror', 'Portable AC unit (essential May–Oct)', 'Equipment storage wall hooks', 'Fan system for airflow'], cost: '$1,500–$5,000', tip: 'DFW summers make gym unusable without cooling. Mini-split pays for itself in comfort.' },
};

const SIZES = ['1-car (200–250 sqft)', '2-car (400–500 sqft)', '3-car (600–900 sqft)', 'Oversized 3-car (900+)'];
const USES = ['vehicles', 'workshop', 'storage', 'gym'];
const USE_LABELS: Record<string, string> = { vehicles: 'Vehicles Priority', workshop: 'Workshop/Hobby', storage: 'Maximum Storage', gym: 'Home Gym' };

export default function DFWGarageOrganization2026() {
  const [size, setSize] = useState('');
  const [use, setUse] = useState('');
  const [result, setResult] = useState<null | typeof SYSTEMS[string]>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🚗</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Garage Organization 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Beat the heat. Maximize your DFW garage space.</p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#fff3cd', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⚠️ DFW Garage Heat Reality Check</div>
          <p style={{ color: '#475569', margin: 0, fontSize: 14 }}>DFW garages regularly hit 140–160°F in summer. Without ventilation or AC, your garage is hostile to many common stored items. Plan your storage zones accordingly.</p>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>What NOT to Store in a DFW Garage</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {HEAT_RISKS.map(r => (
            <div key={r.item} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <span style={{ background: r.risk === 'HIGH' ? '#fee2e2' : r.risk === 'MED' ? '#fef3c7' : '#dcfce7', color: r.risk === 'HIGH' ? '#dc2626' : r.risk === 'MED' ? '#d97706' : '#16a34a', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{r.risk}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{r.item}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 3 }}>{r.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Get Your Garage System</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Garage Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                <option value="">Select...</option>
                {SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Primary Use</label>
              <select value={use} onChange={e => setUse(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                <option value="">Select...</option>
                {USES.map(u => <option key={u} value={u}>{USE_LABELS[u]}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => use && setResult(SYSTEMS[use])} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My System</button>

          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.title}</div>
              <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>Estimated Cost: {result.cost}</div>
              {result.items.map(item => <div key={item} style={{ padding: '5px 0', color: '#475569' }}>✓ {item}</div>)}
              <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, fontSize: 14, color: '#0A1628', fontWeight: 600 }}>💡 {result.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
