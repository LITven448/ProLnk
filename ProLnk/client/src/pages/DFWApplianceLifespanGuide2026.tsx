import { useState } from 'react';

const APPLIANCES = [
  { name: 'Dishwasher', national: 12, hardWaterImpact: -3, dfwNote: 'Hard water destroys seals and spray arms', icon: '🍽️' },
  { name: 'Washing Machine', national: 14, hardWaterImpact: -3, dfwNote: 'Hard water clogs hoses and damages drum bearings', icon: '👕' },
  { name: 'Ice Maker (Built-in)', national: 10, hardWaterImpact: -3, dfwNote: 'Scale buildup is the #1 failure cause in DFW', icon: '🧊' },
  { name: 'Refrigerator', national: 17, hardWaterImpact: -0.5, dfwNote: 'Minimal hard water impact — compressor is key factor', icon: '🧊' },
  { name: 'Gas Range', national: 20, hardWaterImpact: 0, dfwNote: 'DFW homes cook often — gas is very durable', icon: '🍳' },
  { name: 'Electric Range', national: 16, hardWaterImpact: 0, dfwNote: 'Standard lifespan, no hard water effect', icon: '🍳' },
  { name: 'Microwave (Built-in)', national: 10, hardWaterImpact: 0, dfwNote: 'Standard lifespan regardless of water quality', icon: '📡' },
  { name: 'Garbage Disposal', national: 12, hardWaterImpact: -2, dfwNote: 'Hard water accelerates corrosion of grinding components', icon: '🗑️' },
  { name: 'Water Softener', national: 15, hardWaterImpact: 0, dfwNote: 'Essential in DFW — extends all other appliance lifespans', icon: '💧' },
  { name: 'Dryer (Gas/Electric)', national: 16, hardWaterImpact: 0, dfwNote: 'No hard water impact — lint trap maintenance is key', icon: '🌀' },
];

const WATER_HARDNESS = [
  { label: 'Soft (0–60 ppm)', multiplier: 0 },
  { label: 'Moderate (61–120 ppm)', multiplier: 0.5 },
  { label: 'Hard (121–180 ppm) — Most DFW', multiplier: 1.0 },
  { label: 'Very Hard (180+ ppm) — Some DFW suburbs', multiplier: 1.3 },
];

const MAINTENANCE = [
  'Use water softener or filter',
  'Annual descaling/deliming',
  'Monthly vinegar cycle (dishwasher/washer)',
  'Replace water filters every 6 months',
];

export default function DFWApplianceLifespanGuide2026() {
  const [appliance, setAppliance] = useState('');
  const [hardness, setHardness] = useState('');
  const [age, setAge] = useState('');

  const app = APPLIANCES.find(a => a.name === appliance);
  const hw = WATER_HARDNESS.find(h => h.label === hardness);
  const ageNum = parseInt(age);

  const adjusted = (app && hw) ? Math.max(5, app.national + Math.round(app.hardWaterImpact * hw.multiplier)) : null;
  const remaining = (adjusted !== null && !isNaN(ageNum)) ? Math.max(0, adjusted - ageNum) : null;
  const pct = (adjusted && !isNaN(ageNum)) ? Math.min(100, Math.round((ageNum / adjusted) * 100)) : null;
  const statusColor = remaining === null ? '#aaa' : remaining === 0 ? '#ef4444′ : remaining <= 2 ? '#f97316' : '#22c55e';
  const statusLabel = remaining === null ? '' : remaining === 0 ? 'Replace Now' : remaining <= 2 ? 'Replace Soon' : remaining <= 5 ? 'Plan Ahead' : 'Still Good';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Appliance Lifespan Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>DFW hard water shortens appliance life 20–30%. Know your real lifespan.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Appliance Type', value: appliance, setter: setAppliance, options: APPLIANCES.map(a => a.name), icon: '🔧' },
            { label: 'DFW Water Hardness', value: hardness, setter: setHardness, options: WATER_HARDNESS.map(h => h.label), icon: '💧' },
          ].map(({ label, value, setter, options, icon }) => (
            <div key={label} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#F5E642', marginBottom: 6, fontWeight: 600 }}>{icon} {label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
                <option value="">-- Select --</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <label style={{ display: 'block', color: '#F5E642', marginBottom: 6, fontWeight: 600 }}>📅 Current Age (years)</label>
          <input type="number" min={0} max={50} placeholder="e.g. 7″ value={age} onChange={e => setAge(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
        </div>

        {app && adjusted !== null && remaining !== null && pct !== null && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{app.icon} {app.name} Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['National Avg', `${app.national} yrs`], ['DFW Adjusted', `${adjusted} yrs`], ['Years Remaining', `${remaining} yrs`]].map(([l, v]) => (
                <div key={l} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{l}</div>
                  <div style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 10, background: '#1e3a5f', borderRadius: 5, marginBottom: '0.75rem' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: statusColor, borderRadius: 5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem' }}>
              <span style={{ color: '#94a3b8′ }}>Status</span>
              <span style={{ color: statusColor, fontWeight: 700, fontSize: '1.1rem' }}>{statusLabel}</span>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', background: '#0A1628', padding: '0.75rem', borderRadius: 8, marginBottom: '1rem' }}>📍 {app.dfwNote}</div>
            <div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🛠️ DFW Maintenance to Extend Life</div>
              {MAINTENANCE.map(m => <div key={m} style={{ color: '#cbd5e1', fontSize: '0.85rem', padding: '0.3rem 0′ }}>✓ {m}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>All DFW Appliance Lifespans (Hard Water Adjusted)</h3>
          {APPLIANCES.map(a => (
            <div key={a.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#e2e8f0′ }}>{a.icon} {a.name}</span>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{a.national + Math.round(a.hardWaterImpact)} yrs (DFW)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
