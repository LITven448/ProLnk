import { useState } from 'react';

const homeTypes = ['Single Family (Slab)', 'Single Family (Pier and Beam)', 'Townhome/Condo', 'Ranch/Acreage'];
const pestHistories = ['No known issues', 'Prior termite activity', 'Rodent history', 'Fire ant problems'];

const baseGuide = [
  '🐜 Annual termite inspection (fall = best — swarming season over)',
  '🔥 Fire ant broadcast treatment (March before populations explode)',
  '🦟 Mosquito season prep: eliminate standing water in March',
  '🐭 Fall rodent exclusion: seal gaps over 1/4 inch before November',
  '🕷️ Brown recluse sweep in attic, garage, and closets (spring)',
  '🐝 Inspect eaves and overhangs for wasp nest establishment (April)',
  '🪲 Treat wood mulch within 12 inches of foundation (termite risk)',
  '🌿 Keep vegetation 12 inches from siding and foundation',
];

const typeExtras: Record<string, string[]> = {
  'Single Family (Slab)': [
    '🏗️ Check slab perimeter for termite mud tubes at foundation edge',
    '💧 Ensure no moisture accumulation near slab (termites seek moisture)',
  ],
  'Single Family (Pier and Beam)': [
    '🏠 Annual crawl space termite and rodent inspection — critical',
    '💨 Check crawl space vents — blocked vents create moisture and pest entry',
    '🔍 Wood pier inspection for subterranean termite galleries',
  ],
  'Townhome/Condo': [
    '🤝 Confirm HOA pest contract covers your unit perimeter',
    '🧱 Party wall gaps: inspect for rodent or pest entry from adjacent units',
  ],
  'Ranch/Acreage': [
    '🌾 Fire ant mound treatment across property (broadcast + mound drench)',
    '🐍 Copperhead exclusion: check woodpiles, rock piles, and brush',
    '🦌 Check for armadillo activity (rooting damages foundation and plumbing)',
  ],
};

const historyExtras: Record<string, string[]> = {
  'No known issues': [],
  'Prior termite activity': [
    '⚠️ Annual termite bond inspection is non-negotiable — get written report',
    '🔍 Re-inspect all previously treated areas for new activity',
    '🏗️ Confirm bait stations or liquid barrier is still active',
  ],
  'Rodent history': [
    '🐭 Inspect all prior exclusion points for re-entry after winter',
    '🧲 Check snap traps in attic and crawl space monthly October-March',
    '🔦 Attic inspection: look for new gnawing on insulation or wiring',
  ],
  'Fire ant problems': [
    '🔥 Two-step program: broadcast granule bait in April + October',
    '💧 Individual mound drench for fast knockdown near high-traffic areas',
    '🌧️ Treat after rain when ants are foraging — not during drought',
  ],
};

export default function DFWAnnualPestInspection2026() {
  const [homeType, setHomeType] = useState('');
  const [history, setHistory] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const extra1 = homeType ? typeExtras[homeType] : [];
  const extra2 = history ? historyExtras[history] : [];
  const allItems = [...baseGuide, ...extra1, ...extra2];

  const toggleItem = (item: string) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const doneCount = allItems.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#E2E8F0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🐜</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Annual Pest Inspection Checklist 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>DFW hosts termites, fire ants, mosquitoes, and rodents year-round — timing your treatments correctly makes the difference.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Select Home Type</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {homeTypes.map(t => (
              <button key={t} onClick={() => { setHomeType(t); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: homeType === t ? '#F5E642' : '#1E3A5F', background: homeType === t ? '#F5E642' : 'transparent', color: homeType === t ? '#0A1628' : '#94A3B8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {t}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>Pest History</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {pestHistories.map(h => (
              <button key={h} onClick={() => { setHistory(h); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: history === h ? '#F5E642' : '#1E3A5F', background: history === h ? '#F5E642' : 'transparent', color: history === h ? '#0A1628' : '#94A3B8', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        {(homeType || history) && allItems.length > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: 0 }}>Your Pest Inspection Guide</h2>
              <span style={{ background: doneCount === allItems.length ? '#16A34A' : '#1E3A5F', color: doneCount === allItems.length ? '#fff' : '#94A3B8', borderRadius: 20, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{doneCount}/{allItems.length}</span>
            </div>
            {allItems.map(item => (
              <div key={item} onClick={() => toggleItem(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#334155', background: checked[item] ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {checked[item] && <span style={{ color: '#0A1628', fontSize: 13, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{ color: checked[item] ? '#64748B' : '#E2E8F0', fontSize: 14, textDecoration: checked[item] ? 'line-through' : 'none' }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>📅 DFW Pest Treatment Calendar</h3>
          <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
            <div><span style={{ color: '#F5E642' }}>March: </span>Mosquito prevention, fire ant broadcast, wasp nest watch</div>
            <div><span style={{ color: '#F5E642' }}>April-May: </span>Termite swarm season — inspect and treat</div>
            <div><span style={{ color: '#F5E642' }}>October: </span>Rodent exclusion, second fire ant treatment</div>
            <div><span style={{ color: '#F5E642' }}>November: </span>Fall termite inspection (best annual timing)</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk connects you with vetted DFW pest control pros — prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
