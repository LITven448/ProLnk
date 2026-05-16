import { useState } from 'react';

const trees = [
  {
    name: 'Live Oak',
    icon: '🌳',
    timing: 'Winter Only (December – January)',
    detail: 'Live oaks in DFW are highly susceptible to oak wilt — a devastating fungal disease. NEVER prune February through June when beetles are most active and spread spores. Winter pruning minimizes disease risk. Always paint cuts immediately with wound sealant.'
  },
  {
    name: 'Post Oak / Red Oak',
    icon: '🌲',
    timing: 'NEVER February – June — Winter Only',
    detail: 'All oaks in DFW face oak wilt risk. The nitidulid beetle that spreads the fungus peaks February–June. Wait until July or December–January for any pruning. If a tree is already infected, do not prune at all — contact an arborist immediately.'
  },
  {
    name: 'Cedar Elm',
    icon: '🍂',
    timing: 'Fall or Winter (October – February)',
    detail: 'Cedar elm is DFW's most common native elm. Prune in fall or winter when the tree is dormant and Dutch elm disease pressure is lowest. Remove deadwood and crossing branches. Cedar elms are tough — they tolerate significant pruning.'
  },
  {
    name: 'Crepe Myrtle',
    icon: '🌸',
    timing: 'Light Pruning — Late Winter (February – March)',
    detail: 'NEVER "crepe murder" — do not top or heavily cut back. Remove only crossing branches, dead branches, and seed heads. Light shaping is acceptable in late winter before bud break. Topping destroys natural form and creates weak regrowth.'
  },
  {
    name: 'Pecan',
    icon: '🌰',
    timing: 'Winter Dormancy (December – February)',
    detail: 'Prune pecans during dormancy to avoid stress and disease entry. Remove water sprouts, crossing branches, and dead wood. DFW pecans are large — hire a certified arborist for any work over 15 feet. Do not prune after bud break.'
  },
  {
    name: 'Redbud',
    icon: '🌺',
    timing: 'After Bloom (April – May)',
    detail: 'Eastern redbud blooms in early spring on bare wood. Prune lightly immediately after blooming ends. Avoid heavy pruning — redbuds are susceptible to fungal cankers that enter through large cuts. Remove only dead or rubbing branches.'
  },
];

export default function DFWTreePruningSeasonGuide2026() {
  const [selected, setSelected] = useState(0);
  const t = trees[selected];
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>✂️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Tree Pruning Season Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>When to prune specific DFW trees — timing is everything in North Texas</p>
        </div>
        <div style={{ background: '#1a0a0a', border: '1px solid #7f1d1d', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#fca5a5', fontSize: 14, margin: 0 }}>⛔ DFW Oak Wilt Alert: NEVER prune any oak species February – June. Oak wilt has killed thousands of DFW trees. When in doubt, wait until winter.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {trees.map((tr, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{tr.icon} {tr.name}</button>
          ))}
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>{t.icon} {t.name}</h2>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>Best Window: </span>
            <span style={{ color: '#e2e8f0', fontSize: 13 }}>{t.timing}</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7 }}>{t.detail}</p>
        </div>
        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>ProLnk — Connecting DFW Homeowners with Certified Arborists</p>
      </div>
    </div>
  );
}
