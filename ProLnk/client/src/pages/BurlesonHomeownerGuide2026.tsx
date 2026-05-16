import { useState } from 'react';

const propertyTypes = [
  { id: 'single', label: '🏠 Single Family', tips: ['Inspect roof every spring — hail season starts March', 'Service propane tank + lines annually if not on city gas', 'Test well water quarterly for bacteria & nitrates', 'Check septic system every 3 years, pump every 5', 'HVAC filter monthly — clay dust clogs faster than city homes'] },
  { id: 'newer', label: '🏗️ 2010s+ Build', tips: ['Foundation still adjusting — watch for sticking doors/windows', 'HOA landscaping rules often restrict xeriscaping — check first', 'Energy audit to confirm builder insulation is code-compliant', 'Smart irrigation controller saves 30%+ on water bills', 'Verify builder warranty coverage before it expires at year 1'] },
  { id: 'rural', label: '🌾 Rural/Acreage', tips: ['Propane delivery schedule: order before winter, not during', 'Well pump pressure tank replace at 10-15 years', 'Septic field inspection critical before adding square footage', 'Fence line maintenance: Johnson County ag-exempt rules apply', 'Generator hookup recommended — power outages longer in rural areas'] },
  { id: 'townhome', label: '🏘️ Townhome/Patio', tips: ['Shared walls mean neighbor HVAC noise — check refrigerant lines', 'HOA dues cover exterior but verify roof responsibility in docs', 'Slab foundation — watch for moisture intrusion at grade level', 'Party wall cracks: document and notify HOA immediately', 'Pest control quarterly — shared structures increase exposure'] },
];

export default function BurlesonHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · Johnson County · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          🏡 Burleson TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Burleson sits at the southern edge of the Metroplex in Johnson County — a fast-growing suburb with a rural-suburban character, propane infrastructure, and well water in many neighborhoods. Select your property type for a tailored 2026 maintenance guide.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {propertyTypes.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642' : '#111f38',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === p.id ? ' #F5E642' : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Burleson Maintenance Priorities
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < active.tips.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span style={{ color: '#F5E642', fontSize: 18, minWidth: 24 }}>✓</span>
                  <span style={{ color: '#ccd9e8', lineHeight: 1.5 }}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '32px', textAlign: 'center', color: '#8899aa' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>Select your property type above to see your personalized Burleson maintenance checklist.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Burleson TX · Johnson County · Pop. 47,000+ · Avg home age: 15-20 yrs · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
