import { useState } from 'react';

const CLIMATE_ZONES = ['Dallas/Fort Worth Core', 'Outer Suburbs (Rockwall, McKinney)', 'Far North (Frisco, Prosper)'];
const SYSTEM_COST: Record<string, number> = { 'Central Air + Furnace': 8500, 'Heat Pump': 7200, 'Mini-Split': 5500, 'Package Unit': 6800 };
const BASE_LIFE: Record<string, number> = { 'Central Air + Furnace': 15, 'Heat Pump': 14, 'Mini-Split': 18, 'Package Unit': 13 };

export default function DFWHvacAgeCalculator() {
  const [installYear, setInstallYear] = useState(2014);
  const [sqft, setSqft] = useState(2200);
  const [zone, setZone] = useState(CLIMATE_ZONES[0]);
  const [systemType, setSystemType] = useState('Central Air + Furnace');

  const currentYear = 2026;
  const age = currentYear - installYear;
  const baseLife = BASE_LIFE[systemType];
  const zoneAdj = zone.includes('Far North') ? 1 : zone.includes('Outer') ? 0 : -1;
  const lifespan = baseLife + zoneAdj;
  const yearsLeft = Math.max(0, lifespan - age);
  const cost = SYSTEM_COST[systemType] + Math.round(sqft * 0.5);
  const monthlySave = Math.round(cost / Math.max(yearsLeft * 12, 1));
  const urgency = age >= lifespan ? 'urgent' : age >= lifespan - 2 ? 'soon' : 'planning';
  const urgencyColor = urgency === 'urgent' ? '#d32f2f' : urgency === 'soon' ? '#f57c00′ : '#2e7d32';
  const urgencyLabel = urgency === 'urgent' ? '🚨 Replace Now' : urgency === 'soon' ? '⚠️ Plan Soon' : '✅ Still Good';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❄️</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>DFW HVAC Age Calculator</h1>
          <p style={{ color: '#8899bb', marginTop: '0.5rem' }}>Plan your replacement before the Texas heat forces your hand</p>
        </div>

        <div style={{ background: '#132038', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Install Year</label>
              <input type="range" min={1995} max={2025} step={1} value={installYear}
                onChange={e => setInstallYear(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{installYear} ({age} yrs old)</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Home Size (sq ft)</label>
              <input type="range" min={800} max={6000} step={100} value={sqft}
                onChange={e => setSqft(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{sqft.toLocaleString()} sq ft</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>DFW Climate Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.9rem' }}>
                {CLIMATE_ZONES.map(z => <option key={z}>{z}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>System Type</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.9rem' }}>
                {Object.keys(SYSTEM_COST).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: urgencyColor, borderRadius: 16, padding: '1.25rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{urgencyLabel}</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.9 }}>System is {age} years old — estimated {lifespan}-year lifespan in DFW</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642′ }}>{yearsLeft}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Years Remaining</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>${cost.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Est. Replacement Cost</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642′ }}>${monthlySave}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Save Monthly Now</div>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#445577', fontSize: '0.75rem', marginTop: '1.5rem' }}>DFW averages 100+ days above 90°F annually — plan before peak season.</p>
      </div>
    </div>
  );
}
