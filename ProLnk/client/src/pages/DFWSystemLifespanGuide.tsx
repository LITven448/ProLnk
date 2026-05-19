import { useState } from 'react';

const SYSTEMS = [
  { name: 'HVAC System', national: 15, dfwAdjust: -2.5, icon: '❄️', hailRisk: false },
  { name: 'Roof (Asphalt)', national: 25, dfwAdjust: -3, icon: '🏠', hailRisk: true },
  { name: 'Water Heater (Tank)', national: 12, dfwAdjust: -1, icon: '🚿', hailRisk: false },
  { name: 'Water Heater (Tankless)', national: 20, dfwAdjust: -1.5, icon: '💧', hailRisk: false },
  { name: 'Electrical Panel', national: 40, dfwAdjust: 0, icon: '⚡', hailRisk: false },
  { name: 'Plumbing (Copper)', national: 50, dfwAdjust: -5, icon: '🔧', hailRisk: false },
  { name: 'Foundation (Slab)', national: 100, dfwAdjust: -15, icon: '🏗️', hailRisk: false },
  { name: 'Garage Door', national: 30, dfwAdjust: 0, icon: '🚗', hailRisk: true },
  { name: 'Windows (Double Pane)', national: 25, dfwAdjust: -3, icon: '🪟', hailRisk: true },
  { name: 'Insulation (Attic)', national: 40, dfwAdjust: -5, icon: '🌡️', hailRisk: false },
];

export default function DFWSystemLifespanGuide() {
  const [selectedSystem, setSelectedSystem] = useState('');
  const [installYear, setInstallYear] = useState('');
  const currentYear = 2026;

  const system = SYSTEMS.find(s => s.name === selectedSystem);
  const age = installYear ? currentYear - parseInt(installYear) : null;
  const dfwLifespan = system ? Math.round(system.national + system.dfwAdjust) : null;
  const remaining = (system && age !== null) ? Math.max(0, dfwLifespan! - age) : null;
  const pct = (system && age !== null && dfwLifespan) ? Math.min(100, Math.round((age / dfwLifespan) * 100)) : null;

  const statusColor = remaining === null ? '#aaa' : remaining <= 2 ? '#ef4444′ : remaining <= 5 ? '#f97316' : '#22c55e';
  const statusLabel = remaining === null ? '' : remaining === 0 ? 'Replace Now' : remaining <= 2 ? 'Replace Soon' : remaining <= 5 ? 'Plan Replacement' : 'Good Shape';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Home System Lifespan Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>DFW climate-adjusted lifespans — extreme heat, hail, and expansive clay soil all factor in</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>Select System</label>
          <select value={selectedSystem} onChange={e => setSelectedSystem(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', marginBottom: '1rem' }}>
            <option value="">-- Choose a system --</option>
            {SYSTEMS.map(s => <option key={s.name} value={s.name}>{s.icon} {s.name}</option>)}
          </select>

          <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>Install Year</label>
          <input type="number" placeholder="e.g. 2010″ min={1950} max={currentYear} value={installYear}
            onChange={e => setInstallYear(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
        </div>

        {system && age !== null && dfwLifespan !== null && remaining !== null && pct !== null && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{system.icon} {system.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['National Avg', `${system.national} yrs`], ['DFW Lifespan', `${dfwLifespan} yrs`], ['Your Age', `${age} yrs`]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
                  <div style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 700 }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Lifespan Used</span>
                <span style={{ color: statusColor, fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 10, background: '#1e3a5f', borderRadius: 5 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: statusColor, borderRadius: 5, transition: 'width 0.3s' }} />
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW Years Remaining</div>
                <div style={{ color: statusColor, fontSize: '1.8rem', fontWeight: 700 }}>{remaining} yrs</div>
              </div>
              <div style={{ background: statusColor, color: '#000', padding: '0.5rem 1rem', borderRadius: 8, fontWeight: 700 }}>{statusLabel}</div>
            </div>
            {system.hailRisk && <div style={{ marginTop: '0.75rem', color: '#f97316', fontSize: '0.85rem' }}>⚠️ Hail risk in DFW can reduce this system's lifespan — inspect after major storm events.</div>}
            {system.dfwAdjust < 0 && <div style={{ marginTop: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>📍 DFW climate reduces lifespan by ~{Math.abs(system.dfwAdjust)} years vs national average.</div>}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>All DFW System Lifespans</h3>
          {SYSTEMS.map(s => (
            <div key={s.name} onClick={() => setSelectedSystem(s.name)}
              style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3a5f', cursor: 'pointer' }}>
              <span style={{ color: '#e2e8f0′ }}>{s.icon} {s.name}</span>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{Math.round(s.national + s.dfwAdjust)} yrs {s.hailRisk ? '🌨️' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
