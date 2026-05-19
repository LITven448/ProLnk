import { useState } from 'react';

const yardSizes = ['Small (<1/4 acre)', 'Medium (1/4–1/2 acre)', 'Large (>1/2 acre)'];
const conditions = ['Full Sun', 'Partial Shade', 'Clay Soil', 'Poor Drainage', 'Deer Pressure', 'Wildlife Friendly'];

const trees = [
  { name: 'Eastern Redbud', emoji: '🌸', size: 'Small-Medium (15–25 ft)', blooms: 'Feb–March (before leaves)', native: true, deer: 'Low resistance', drainage: 'Good drainage needed', sun: 'Full sun to part shade', water: 'Low once established', desc: "Texas's most beloved spring tree — vivid magenta blooms cover bare branches before the leaves emerge, creating a stunning February display.", planting: 'Plant Oct–Nov or Feb–March. Stake first year. Mulch heavily to protect roots.' },
  { name: 'Mexican Plum', emoji: '🌼', size: 'Small (15–20 ft)', blooms: 'Feb–March', native: true, deer: 'Moderate resistance', drainage: 'Tolerates clay', sun: 'Full sun to part shade', water: 'Very low once established', desc: 'Fragrant white blooms in late winter, red-orange fall color, small plums attract birds. Remarkably tough in DFW clay.', planting: 'Plant in fall. Needs no amended soil — thrives in native DFW conditions.' },
  { name: 'Rusty Blackhaw Viburnum', emoji: '🌿', size: 'Small (8–15 ft)', blooms: 'March–April', native: true, deer: 'High resistance', drainage: 'Tolerates clay and poor drainage', sun: 'Full sun to full shade', water: 'Very low once established', desc: 'White clusters in spring, deep blue-black berries in fall that birds love. One of the most adaptable DFW natives.', planting: 'Fall planting ideal. Works under large trees or as understory. Virtually maintenance-free.' },
  { name: 'Possumhaw Holly', emoji: '🔴', size: 'Small (7–15 ft)', blooms: 'April (small white)', native: true, deer: 'Moderate resistance', drainage: 'Tolerates wet soil', sun: 'Full sun to part shade', water: 'Low once established', desc: 'Spring blooms minor but brilliant red-orange winter berries make this a DFW standout. Birds descend in winter. Female plants needed for berries.', planting: 'Plant male + female for berries. Fall planting best. Tolerates DFW wet spots.' },
];

export default function DFWSpringTreeGuide() {
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [showResults, setShowResults] = useState(false);

  function filteredTrees() {
    if (!condition) return trees;
    return trees.filter(t => {
      if (condition === 'Clay Soil') return t.drainage.toLowerCase().includes('clay');
      if (condition === 'Poor Drainage') return t.drainage.toLowerCase().includes('poor') || t.drainage.toLowerCase().includes('wet');
      if (condition === 'Deer Pressure') return t.deer.toLowerCase().includes('high') || t.deer.toLowerCase().includes('moderate');
      if (condition === 'Wildlife Friendly') return t.native;
      return true;
    });
  }

  const results = filteredTrees();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌸 DFW TREE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Spring Flowering Trees for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          DFW springs are spectacular. The right flowering trees turn a yard into a showstopper from February through April — and these native selections thrive in DFW clay without babysitting.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📅 DFW Spring Bloom Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['Feb–March', 'Eastern Redbud, Mexican Plum'], ['March', 'Rusty Blackhaw Viburnum'], ['April', 'Possumhaw Holly (small white flowers)'], ['Year-round', 'Bird habitat from native berries + seeds']].map(([time, plant]) => (
              <div key={time} style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600 }}>{time}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{plant}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Find Your Tree</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Yard size:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {yardSizes.map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ background: size === s ? '#F5E642' : '#1e3a5f', color: size === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>DFW conditions:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {conditions.map(c => (
                <button key={c} onClick={() => setCondition(c)} style={{ background: condition === c ? '#F5E642' : '#1e3a5f', color: condition === c ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{c}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!size || !condition} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: (!size || !condition) ? 0.5 : 1 }}>Show Recommendations</button>
        </div>

        {showResults && (
          <div style={{ display: 'grid', gap: 12 }}>
            {results.map(tree => (
              <div key={tree.name} style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{tree.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{tree.name} {tree.native ? <span style={{ color: '#F5E642', fontSize: 12 }}>NATIVE</span> : ''}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{tree.size} • Blooms: {tree.blooms}</div>
                  </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12 }}>{tree.desc}</p>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>PLANTING GUIDE</div>
                  <div style={{ color: '#e2e8f0', fontSize: 13 }}>{tree.planting}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
