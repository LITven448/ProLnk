import { useState } from 'react';

const homeAges = ['Under 10 years', '10-25 years', '26-40 years', '40+ years'];

const priorityLists: Record<string, { label: string; items: string[] }[]> = {
  'Under 10 years': [
    { label: '✅ Standard Annual Checks', items: [
      '💧 Water heater sediment flush (1x/year)',
      '🔧 Verify all shutoffs operate smoothly',
      '🔍 Inspect supply lines under sinks for signs of swelling',
      '🚿 Check showerhead and faucet aerators for buildup',
      '🪣 Inspect p-traps under sinks for slow drains',
    ]},
  ],
  '10-25 years': [
    { label: '⚠️ Priority Checks', items: [
      '💧 Water heater anode rod inspection (replace if depleted)',
      '🔧 Test all shutoffs — stuck valves are a flood risk',
      '🔍 Braided supply lines: check for bulging or corrosion',
      '🚿 Check water pressure (should be 40-80 PSI)',
      '🪣 Inspect cleanout access and ensure it is clear',
      '🔩 Check toilet fill valves and flappers for silent leaks',
    ]},
  ],
  '26-40 years': [
    { label: '🚨 Elevated Risk Checks', items: [
      '💧 Water heater likely due for replacement (avg 8-12 yr life)',
      '🔧 Gate valves should be replaced with ball valves',
      '🔍 Galvanized pipe inspection — reduced flow means corrosion buildup',
      '🏠 Crawl space pipe check (pier and beam homes)',
      '🚿 Pressure regulator test and possible replacement',
      '🪣 Sewer scope recommended (root intrusion risk)',
      '🔩 Wax ring and shut-off valve check at all toilets',
    ]},
  ],
  '40+ years': [
    { label: '🔴 Critical Inspection Items', items: [
      '💧 Water heater replacement almost certainly needed',
      '🔧 Full shutoff replacement — originals fail silently',
      '🔍 Galvanized or cast iron pipe evaluation for replacement',
      '🏠 Full crawl space inspection for pier and beam homes',
      '🚿 Pressure regulator replacement (20-30 yr service life)',
      '🪣 Sewer scope strongly recommended — root intrusion likely',
      '⚡ Check for polybutylene pipe (gray, recalled in 1995)',
      '🔩 All fixture supply lines and shutoffs: replace proactively',
    ]},
  ],
};

export default function DFWAnnualPlumbingInspection2026() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const groups = selected ? priorityLists[selected] : [];
  const allItems = groups.flatMap(g => g.items);
  const doneCount = allItems.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual Plumbing Inspection Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW hard water and clay soil create unique stress on home plumbing — know what to check and when.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Your Home Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {homeAges.map(a => (
              <button key={a} onClick={() => { setSelected(a); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === a ? '#F5E642′ : '#1E3A5F', background: selected === a ? '#F5E642' : ’transparent', color: selected === a ? '#0A1628′ : '#94A3B8', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>Inspection Priorities — {selected}</h2>
              <span style={{ background: doneCount === allItems.length && allItems.length > 0 ? '#16A34A' : '#1E3A5F', color: doneCount === allItems.length && allItems.length > 0 ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{allItems.length}</span>
            </div>
            {groups.map(group => (
              <div key={group.label} style={{ marginBottom: 20 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{group.label}</div>
                {group.items.map(item => (
                  <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642′ : '#334155', background: checked[item] ? '#F5E642' : ’transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {checked[item] && <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 900 }}>✓</span>}
                    </div>
                    <span style={{ color: checked[item] ? '#64748B' : '#E2E8F0', fontSize: 14, textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>💡 DFW-Specific Plumbing Facts</h3>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
            <div>Hard water (300+ mg/L) accelerates water heater sediment buildup</div>
            <div>DFW clay soil movement stresses sewer lines year-round</div>
            <div>Annual sewer scope saves thousands vs emergency excavation</div>
            <div>City of Dallas offers free water pressure check at the meter</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW plumbers — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
