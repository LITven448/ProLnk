import { useState } from 'react';

const TYPES = ['Tank (Gas)', 'Tank (Electric)', 'Tankless (Gas)', 'Tankless (Electric)', 'Heat Pump Water Heater'];
const BASE_LIFE: Record<string, number> = {
  'Tank (Gas)': 10, 'Tank (Electric)': 11, 'Tankless (Gas)': 18, 'Tankless (Electric)': 16, 'Heat Pump Water Heater': 13,
};
const COST: Record<string, number> = {
  'Tank (Gas)': 1100, 'Tank (Electric)': 950, 'Tankless (Gas)': 2800, 'Tankless (Electric)': 2400, 'Heat Pump Water Heater': 2100,
};
const WATER: Record<string, number> = { 'Soft (filtered)': 1, 'Moderate': 0, 'Hard (DFW typical)': -1, 'Very Hard (North DFW)': -2 };
const HOUSEHOLD: Record<number, string> = { 1: '1-2 People', 2: '3-4 People', 3: '5+ People' };

export default function DFWWaterHeaterAgeCalculator() {
  const [installYear, setInstallYear] = useState(2016);
  const [type, setType] = useState('Tank (Gas)');
  const [water, setWater] = useState('Hard (DFW typical)');
  const [household, setHousehold] = useState(2);

  const currentYear = 2026;
  const age = currentYear - installYear;
  const adjLife = BASE_LIFE[type] + WATER[water];
  const yearsLeft = Math.max(0, adjLife - age);
  const cost = COST[type] + (household === 3 ? 400 : 0);
  const monthly = Math.round(cost / Math.max(yearsLeft * 12, 1));
  const urgency = age >= adjLife ? 'urgent' : age >= adjLife - 2 ? 'soon' : 'ok';
  const urgencyColor = urgency === 'urgent' ? '#d32f2f' : urgency === 'soon' ? '#e65100' : '#1b5e20';

  const isTankless = type.startsWith('Tankless');
  const recommendation = isTankless
    ? 'Tankless units are ideal for DFW — no standby loss in summer, scale-resistant with annual flush.'
    : 'Consider upgrading to tankless on replacement — lower long-term cost in DFW climate.';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚿</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>DFW Water Heater Age Calculator</h1>
          <p style={{ color: '#8899bb', marginTop: '0.5rem' }}>DFW hard water accelerates wear — know your timeline</p>
        </div>

        <div style={{ background: '#132038', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Install Year</label>
              <input type="range" min={2000} max={2025} step={1} value={installYear}
                onChange={e => setInstallYear(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{installYear} ({age} yrs old)</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Household Size</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                {[1, 2, 3].map(h => (
                  <button key={h} onClick={() => setHousehold(h)}
                    style={{ flex: 1, padding: '0.6rem', borderRadius: 8, border: `2px solid ${household === h ? '#F5E642' : '#2a3a5c'}`, background: household === h ? '#1e3a5f' : 'transparent', color: household === h ? '#F5E642' : '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                    {HOUSEHOLD[h]}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>DFW Water Hardness</label>
              <select value={water} onChange={e => setWater(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.9rem' }}>
                {Object.keys(WATER).map(w => <option key={w}>{w}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Unit Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {TYPES.map(t => (
                <div key={t} onClick={() => setType(t)}
                  style={{ padding: '0.65rem 0.75rem', borderRadius: 10, cursor: 'pointer', border: `2px solid ${type === t ? '#F5E642' : '#2a3a5c'}`, background: type === t ? '#1e3a5f' : 'transparent', fontWeight: 700, fontSize: '0.85rem', color: type === t ? '#F5E642' : '#fff' }}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: urgencyColor, borderRadius: 16, padding: '1.25rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {urgency === 'urgent' ? '🚨 Replace Now — Risk of Failure' : urgency === 'soon' ? '⚠️ Plan Replacement Within 2 Years' : '✅ Within Expected Lifespan'}
          </div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.9 }}>{age} years old · {adjLife}-yr adjusted life for your DFW water hardness</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>{yearsLeft}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Years Remaining</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>${cost.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Replacement Cost</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>${monthly}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Save Monthly</div>
          </div>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>💡 DFW Recommendation</div>
          <div style={{ color: '#aab4cc', fontSize: '0.9rem', lineHeight: 1.6 }}>{recommendation}</div>
        </div>
        <p style={{ textAlign: 'center', color: '#445577', fontSize: '0.75rem', marginTop: '1.5rem' }}>DFW water hardness averages 17-20 grains per gallon — among the hardest in Texas.</p>
      </div>
    </div>
  );
}
