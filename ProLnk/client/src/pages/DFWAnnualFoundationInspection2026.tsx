import { useState } from 'react';

const foundationTypes = ['Slab (Post-Tension)', 'Slab (Conventional)', 'Pier and Beam'];

const checklistMap: Record<string, { freq: string; items: string[] }> = {
  'Slab (Post-Tension)': {
    freq: 'Monthly visual + annual professional inspection recommended',
    items: [
      '🚪 Check all interior doors — do they open/close without sticking?',
      '🪟 Check all windows — do they open smoothly?',
      '🔍 Walk perimeter — look for new vertical or diagonal cracks in brick or siding',
      '💧 Verify positive drainage — water should flow away from foundation',
      '🌿 Check soil moisture 12-18 inches from foundation (should be consistently damp)',
      '🔧 Inspect PT cable end caps on foundation edge — no corrosion or pop-outs',
      '📐 Check garage door alignment — gaps or binding indicate movement',
      '🏠 Interior: look for new diagonal cracks at window/door corners',
      '💦 Ensure gutters discharge 6+ feet from foundation',
      '🌳 Check for large trees within 20 feet — roots pull soil moisture',
    ],
  },
  'Slab (Conventional)': {
    freq: 'Monthly visual + professional inspection every 2-3 years or after drought',
    items: [
      '🚪 Test all doors and windows for smooth operation',
      '🔍 Perimeter walk — new cracks in brick mortar joints or foundation walls',
      '💧 Drainage audit — soil slope should be 6 inches drop over 10 feet',
      '🌿 Soil moisture check around perimeter (DFW clay shrinks in drought)',
      '📐 Garage door gap inspection — uneven gaps indicate movement',
      '🏠 Interior: diagonal cracks at corners, stair-step cracks in tile',
      '💦 Downspout extension check — must carry water away from slab',
      '🌳 Tree proximity review — remove or root-barrier trees near foundation',
      '🔭 Consider annual soil moisture monitoring with a probe',
    ],
  },
  'Pier and Beam': {
    freq: 'Annual crawl space inspection + professional check every 3-5 years',
    items: [
      '🚪 All doors and windows: smooth operation test',
      '🔍 Perimeter walk for new exterior cracks',
      '💧 Drainage and grading check around perimeter',
      '🏗️ Crawl space inspection: check wood piers for rot or insect damage',
      '🔩 Concrete piers: look for tilting or cracking',
      '💨 Crawl space ventilation: verify vents are open and clear',
      '💧 Check for standing water in crawl space after rain',
      '🐜 Inspect wood members for termite tubes or damage',
      '🔧 Check beam and joist connections for sagging',
      '📋 Document pier heights annually — settlement is trackable',
    ],
  },
};

export default function DFWAnnualFoundationInspection2026() {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleItem = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const data = selected ? checklistMap[selected] : null;
  const items = data?.items || [];
  const doneCount = items.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual Foundation Inspection Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW expansive clay soil is the #1 foundation threat in Texas — consistent monitoring is your best protection.</p>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Fact: </span>
          <span style={{ color: '#CBD5E1', fontSize: 14 }}>North Texas expansive clay (Blackland Prairie) can shift 4+ inches seasonally. Consistent soil moisture — not just repair — is the long-term solution.</span>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Your Foundation Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {foundationTypes.map(t => (
              <button key={t} onClick={() => { setSelected(t); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === t ? '#F5E642′ : '#1E3A5F', background: selected === t ? '#F5E642' : ’transparent', color: selected === t ? '#0A1628′ : '#94A3B8', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Frequency: </span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{data.freq}</span>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>{selected} Checklist</h2>
                <span style={{ background: doneCount === items.length ? '#16A34A' : '#1E3A5F', color: doneCount === items.length ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{items.length}</span>
              </div>
              {items.map(item => (
                <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642′ : '#334155', background: checked[item] ? '#F5E642' : ’transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {checked[item] && <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{ color: checked[item] ? '#64748B' : '#E2E8F0', fontSize: 14, textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW foundation specialists — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
