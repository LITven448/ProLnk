import { useState } from 'react';

const MATERIALS: Record<string, { life: number; cost: number; label: string }> = {
  '3-Tab Asphalt Shingles': { life: 17, cost: 8500, label: 'Budget option, common in DFW' },
  'Architectural Shingles': { life: 22, cost: 13000, label: 'Most popular in DFW suburbs' },
  'Impact-Resistant Shingles': { life: 25, cost: 17000, label: 'Class 4 — insurance discount eligible' },
  'Metal Roofing': { life: 45, cost: 28000, label: 'Best long-term value for DFW heat' },
  'Tile (Clay/Concrete)': { life: 40, cost: 32000, label: 'Premium; heavier structural load' },
};

const HAIL_EVENTS = ['None in 10 Years', '1-2 Events', '3-4 Events (moderate)', '5+ Events (heavy)'];
const HAIL_ADJ: Record<string, number> = { 'None in 10 Years': 0, '1-2 Events': -2, '3-4 Events (moderate)': -4, '5+ Events (heavy)': -7 };

export default function DFWRoofAgeCalculator() {
  const [installYear, setInstallYear] = useState(2012);
  const [material, setMaterial] = useState('Architectural Shingles');
  const [hail, setHail] = useState('1-2 Events');

  const currentYear = 2026;
  const age = currentYear - installYear;
  const mat = MATERIALS[material];
  const adjLife = mat.life + HAIL_ADJ[hail];
  const yearsLeft = Math.max(0, adjLife - age);
  const monthly = Math.round(mat.cost / Math.max(yearsLeft * 12, 1));
  const urgency = age >= adjLife ? 'urgent' : age >= adjLife - 3 ? 'soon' : 'ok';
  const urgencyColor = urgency === 'urgent' ? '#d32f2f' : urgency === 'soon' ? '#e65100' : '#1b5e20';
  const urgencyEmoji = urgency === 'urgent' ? '🚨' : urgency === 'soon' ? '⚠️' : '✅';

  const bestMonths = ['April', 'May', 'September', 'October'];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>DFW Roof Age Calculator</h1>
          <p style={{ color: '#8899bb', marginTop: '0.5rem' }}>DFW hail + heat is brutal on roofs — know where you stand</p>
        </div>

        <div style={{ background: '#132038', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Roof Install Year</label>
              <input type="range" min={1985} max={2025} step={1} value={installYear}
                onChange={e => setInstallYear(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{installYear} ({age} yrs old)</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>DFW Hail History</label>
              <select value={hail} onChange={e => setHail(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.9rem' }}>
                {HAIL_EVENTS.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.75rem', fontSize: '0.85rem' }}>Roof Material</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {Object.keys(MATERIALS).map(m => (
                <div key={m} onClick={() => setMaterial(m)}
                  style={{ padding: '0.75rem', borderRadius: 10, cursor: 'pointer', border: `2px solid ${material === m ? '#F5E642' : '#2a3a5c'}`, background: material === m ? '#1e3a5f' : 'transparent' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: material === m ? '#F5E642' : '#fff' }}>{m}</div>
                  <div style={{ fontSize: '0.72rem', color: '#7a8faa', marginTop: '0.15rem' }}>{MATERIALS[m].label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: urgencyColor, borderRadius: 16, padding: '1.25rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{urgencyEmoji} {urgency === 'urgent' ? 'Replace Immediately' : urgency === 'soon' ? 'Plan Replacement Soon' : 'Still Within Lifespan'}</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem', opacity: 0.9 }}>{age} years old · {adjLife}-yr adjusted lifespan for DFW conditions</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>{yearsLeft}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Years Remaining</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>${mat.cost.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Replacement Est.</div>
          </div>
          <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642' }}>${monthly}</div>
            <div style={{ fontSize: '0.8rem', color: '#8899bb' }}>Save Monthly</div>
          </div>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.75rem' }}>📅 Best Months to Replace in DFW</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {bestMonths.map(m => <span key={m} style={{ background: '#1e3a5f', color: '#fff', padding: '0.4rem 0.9rem', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600 }}>{m}</span>)}
          </div>
          <div style={{ color: '#7a8faa', fontSize: '0.8rem', marginTop: '0.75rem' }}>Avoid July–August (heat) and December–January (freeze risk). Spring/fall = best contractor availability + pricing.</div>
        </div>
        <p style={{ textAlign: 'center', color: '#445577', fontSize: '0.75rem', marginTop: '1.5rem' }}>DFW averages 3+ hail events per year. Impact-resistant shingles may qualify for insurance discounts.</p>
      </div>
    </div>
  );
}
