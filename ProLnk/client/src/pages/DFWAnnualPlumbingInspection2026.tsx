import { useState } from 'react';

const ageRanges = ['0-10 years', '11-25 years', '26-40 years', '40+ years'];

const priorityMap: Record<string, string[]> = {
  '0-10 years': [
    '🔵 Inspect all supply lines under sinks (look for early corrosion)',
    '🔵 Test all shutoff valves — turn off/on to verify operation',
    '🔵 Flush water heater sediment (annual)',
    '🔵 Check water heater anode rod condition',
    '🔵 Inspect washing machine hoses for bulging or cracking',
    '🔵 Run all faucets and check for slow drains',
    '🟡 Locate main water shutoff and verify it operates',
  ],
  '11-25 years': [
    '🔴 Replace all braided supply lines under sinks and toilets (proactive)',
    '🔴 Water heater full inspection — sediment flush, anode, TPR valve test',
    '🟡 Check pressure reducing valve (PRV) — test and note water pressure',
    '🟡 Inspect all shutoff valves for seize or drip',
    '🟡 Camera inspection of main sewer line recommended',
    '🔵 Check hose bibs for dripping after winter',
    '🔵 Inspect dishwasher water supply connection',
  ],
  '26-40 years': [
    '🔴 Camera inspection of sewer line (cast iron begins to fail)',
    '🔴 Replace galvanized supply lines if not already done',
    '🔴 Water heater replacement assessment (10-15 yr lifespan)',
    '🔴 PRV replacement assessment (15-20 yr lifespan)',
    '🟡 Check all shutoffs — many will have mineral buildup or seize',
    '🟡 Pier and beam: inspect crawl space pipes for corrosion',
    '🟡 Check all drain traps under sinks for leaks',
  ],
  '40+ years': [
    '🔴 Full plumbing assessment by licensed plumber strongly recommended',
    '🔴 Sewer camera inspection — cast iron likely failing',
    '🔴 Replace all galvanized or lead supply lines immediately',
    '🔴 Water heater replacement (likely overdue)',
    '🔴 Pier and beam: full crawl space inspection for pipe corrosion',
    '🟡 Check all angle stops — may be original and near failure',
    '🟡 Test all fixtures for adequate water pressure',
  ],
};

const legendItems = [
  { color: '#EF4444', label: 'High Priority' },
  { color: '#F5E642', label: 'Monitor / Plan' },
  { color: '#3B82F6', label: 'Routine Check' },
];

export default function DFWAnnualPlumbingInspection2026() {
  const [age, setAge] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) =>
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));

  const items = age ? priorityMap[age] : [];
  const done = items.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#E8F4FD' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Annual Plumbing Inspection Checklist 2026</h1>
          <p style={{ color: '#8BA3BC', fontSize: 14 }}>What to check annually — select your home age for a priority-ranked inspection list</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Home Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {ageRanges.map(a => (
              <button key={a} onClick={() => { setAge(a); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1E3A5F', background: age === a ? '#F5E642' : 'transparent', color: age === a ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          {legendItems.map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: l.color }} />
              <span style={{ color: '#8BA3BC', fontSize: 13 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {age && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>Inspection List — {age} Home</h2>
              <span style={{ color: done === items.length ? '#4ADE80' : '#8BA3BC', fontWeight: 600 }}>{done}/{items.length} ✓</span>
            </div>
            {items.map(item => (
              <div key={item} onClick={() => toggle(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#1E3A5F', background: checked[item] ? '#F5E642' : 'transparent', flexShrink: 0 }} />
                <span style={{ color: checked[item] ? '#8BA3BC' : '#E8F4FD', textDecoration: checked[item] ? 'line-through' : 'none', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>💡 DFW Plumbing Tips</h2>
          <p style={{ color: '#E8F4FD', fontSize: 13, lineHeight: 1.6 }}>DFW clay soil movement stresses pier-and-beam plumbing more than slab. Supply lines under sinks are a top cause of interior flooding — replace braided hoses every 5-7 years. DFW water hardness averages 250-350 ppm; flush water heaters annually to prevent sediment buildup and extend lifespan by 3-5 years.</p>
        </div>

        <p style={{ textAlign: 'center', color: '#3D5A80', fontSize: 12, marginTop: 24 }}>ProLnk · DFW Plumbing Inspection Guide 2026</p>
      </div>
    </div>
  );
}