import { useState } from 'react';

const homeAges = ['Under 10 years', '10-25 years', '26-40 years', '40+ years'];

const checklists: Record<string, { label: string; items: string[] }[]> = {
  'Under 10 years': [
    { label: '✅ Standard Annual Safety Checks', items: [
      '🔌 Test all GFCI outlets (press Test then Reset)',
      '🔥 Test smoke detectors (all levels)',
      '☁️ Test CO detectors (near bedrooms and gas appliances)',
      '📋 Check panel — any tripping patterns or warm breakers?',
      '🌡️ Check outlet cover plates for warmth (indicator of overload)',
    ]},
  ],
  '10-25 years': [
    { label: '⚠️ Priority Safety Checks', items: [
      '🔌 Test all GFCI outlets and replace any that fail to trip',
      '🔥 Replace smoke detector batteries; replace units over 10 years old',
      '☁️ Test CO detectors — replace units over 7 years old',
      '📋 Panel review — watch for double-tapped breakers',
      '🌡️ Inspect cover plates at switches and outlets for heat or discoloration',
      '💡 Check for any flickering lights (loose connections)',
      '🏠 Verify bathroom and kitchen GFCI protection is complete',
    ]},
  ],
  '26-40 years': [
    { label: '🚨 Elevated Risk Checks', items: [
      '🔌 Full GFCI audit — many homes this age lack full coverage',
      '🔥 Replace all smoke detectors if original (unit life is 10 years)',
      '☁️ Replace CO detectors if original',
      '📋 Panel inspection by electrician — Federal Pacific and Zinsco panels are fire hazards',
      '🌡️ Inspect for aluminum branch wiring (common 1965-1973) — requires CO/ALR devices',
      '💡 Check for two-prong ungrounded outlets — update to GFCI type or ground',
      '🏠 Verify AFCI protection in bedrooms per current code',
    ]},
  ],
  '40+ years': [
    { label: '🔴 Critical Inspection Items', items: [
      '🔌 Full electrical inspection by licensed electrician strongly recommended',
      '🔥 Replace all smoke and CO detectors — likely original or outdated',
      '📋 Panel replacement evaluation — 150A minimum for modern loads',
      '🌡️ Knob-and-tube wiring assessment if pre-1950s home',
      '💡 Aluminum wiring inspection and pigtailing where needed',
      '🏠 GFCI and AFCI upgrade throughout — required by current NEC',
      '🔧 Service entrance inspection (weatherhead, mast, meter base)',
      '⚡ Whole-home surge protector installation recommended',
    ]},
  ],
};

export default function DFWAnnualElectricalInspection2026() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const groups = selected ? checklists[selected] : [];
  const allItems = groups.flatMap(g => g.items);
  const doneCount = allItems.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual Electrical Safety Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Electrical fires are largely preventable — here is what to check every year in your DFW home.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Your Home Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {homeAges.map(a => (
              <button key={a} onClick={() => { setSelected(a); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === a ? '#F5E642' : '#1E3A5F', background: selected === a ? '#F5E642' : 'transparent', color: selected === a ? '#0A1628' : '#94A3B8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>Checklist — {selected}</h2>
              <span style={{ background: doneCount === allItems.length && allItems.length > 0 ? '#16A34A' : '#1E3A5F', color: doneCount === allItems.length && allItems.length > 0 ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{allItems.length}</span>
            </div>
            {groups.map(group => (
              <div key={group.label} style={{ marginBottom: 20 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{group.label}</div>
                {group.items.map(item => (
                  <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#334155', background: checked[item] ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
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
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>⚡ Monthly Tasks (Takes 2 Minutes)</h3>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
            <div>Press Test on every GFCI outlet — verify it trips and resets</div>
            <div>Press Test on smoke detectors (chirp = working)</div>
            <div>Look at panel — any breaker in the middle (tripped) position?</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW electricians — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
