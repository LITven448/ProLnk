import { useState } from 'react';

const trees: Record<string, { rootPattern: string; safeDistance: string; dfwRisk: string }> = {
  'Live Oak': { rootPattern: 'Aggressive lateral spreading — roots can extend 2-3x the canopy radius at shallow depths', safeDistance: '20-25 ft from foundation minimum', dfwRisk: 'Very High — most common foundation-damaging tree in DFW due to clay soil + aggressive roots' },
  'Post Oak': { rootPattern: 'Deep taproot with lateral spread — less aggressive than live oak but still significant', safeDistance: '15-20 ft from foundation', dfwRisk: 'High — native to DFW, thrives in clay soil, deep roots can exploit cracks' },
  'Bradford Pear': { rootPattern: 'Shallow, fast-growing root system — structurally weak tree with aggressive surface roots', safeDistance: '10-15 ft from foundation', dfwRisk: 'Moderate — invasive species; shallow roots lift sidewalks and driveways more than foundations' },
  'Chinese Tallow': { rootPattern: 'Invasive, very aggressive root system — fast growth means rapid root expansion', safeDistance: '20-25 ft from foundation', dfwRisk: 'Very High — invasive in DFW, should be removed if near structure; roots seek moisture aggressively' },
  'Cedar Elm': { rootPattern: 'Moderate lateral roots — native DFW tree with manageable root spread relative to canopy', safeDistance: '12-15 ft from foundation', dfwRisk: 'Moderate — native and drought-tolerant, less aggressive than oaks on clay expansive soil' },
  'Hackberry': { rootPattern: 'Aggressive surface roots — common "volunteer" tree in DFW yards, fast growing', safeDistance: '15-20 ft from foundation', dfwRisk: 'High — often self-seeds near structures; surface roots can damage walkways and affect moisture around slab' },
  'Pecan': { rootPattern: 'Deep taproot with wide lateral roots — can reach 2x canopy width', safeDistance: '20-30 ft from foundation', dfwRisk: 'High — large mature pecans in DFW are beautiful but roots go very wide; significant moisture draw in drought' },
  'Crepe Myrtle': { rootPattern: 'Non-invasive, surface-oriented root system — one of the safest ornamental trees', safeDistance: '5-8 ft from foundation', dfwRisk: 'Low — popular in DFW for good reason; roots rarely cause foundation problems' },
};

const riskLevels = [
  { label: 'Low Risk', color: '#1A6B4A', bg: '#F0FFF4', action: 'Monitor annually. No immediate action required. Consider root barrier as preventive measure if within 10 ft.' },
  { label: 'Moderate Risk', color: '#B7791F', bg: '#FFFBEB', action: 'Install root barrier within 12 months. Have foundation inspected every 2 years. Consider removing if within 8 ft.' },
  { label: 'High Risk', color: '#C53030', bg: '#FFF5F5', action: 'Immediate action recommended. Get foundation inspection now. Strongly consider tree removal or aggressive root barrier + pier installation.' },
  { label: 'Very High Risk', color: '#742A2A', bg: '#FFF5F5', action: 'Urgent: consult a structural engineer AND arborist within 30 days. If roots already visible near slab, removal likely required to prevent major foundation repair ($8K-$25K+).' },
];

const getRisk = (tree: string, distance: number) => {
  const t = trees[tree];
  if (!t) return riskLevels[0];
  const safe = parseInt(t.safeDistance);
  if (distance >= safe * 1.5) return riskLevels[0];
  if (distance >= safe) return riskLevels[1];
  if (distance >= safe * 0.6) return riskLevels[2];
  return riskLevels[3];
};

export default function DFWTreeRootsGuide() {
  const [treeType, setTreeType] = useState('Live Oak');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState<null | { risk: typeof riskLevels[0]; tree: typeof trees[string] }>(null);

  const assess = () => {
    const d = parseFloat(distance) || 0;
    setResult({ risk: getRisk(treeType, d), tree: trees[treeType] });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌳 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tree Roots & Foundation Guide for DFW</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '2rem' }}>The #1 question DFW homeowners ask: "Is this tree too close to my foundation?" DFW's expansive clay soil makes this especially critical — roots pull moisture from soil causing slab movement.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🏚 Why DFW Is Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['🧱 Expansive Clay Soil', 'DFW sits on some of the most expansive clay soil in the US. Clay shrinks in drought and expands in rain — tree roots accelerate this cycle.'], ['☀️ Drought Cycles', 'Severe droughts (2011, 2022-23) cause clay to shrink dramatically. Roots near your foundation make this worse.'], ['🌳 Live Oak Problem', 'Live oaks are beautiful and beloved in DFW — and the single most common cause of tree-related foundation damage in the region.'], ['💸 Foundation Cost', 'Foundation repair in DFW averages $8K-$25K. Prevention via root management is far cheaper.']].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ fontSize: '0.82rem', color: '#9BA3B8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Foundation Risk Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Tree type</label>
              <select value={treeType} onChange={e => { setTreeType(e.target.value); setResult(null); }} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
                {Object.keys(trees).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Distance from foundation (feet)</label>
              <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 12" style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Assess Risk</button>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ background: result.risk.bg, borderRadius: 8, padding: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                <div style={{ color: result.risk.color, fontSize: '1.4rem', fontWeight: 800 }}>{result.risk.label}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>🌳 Root Pattern</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.9rem' }}>{result.tree.rootPattern}</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>📏 Recommended Safe Distance</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.9rem' }}>{result.tree.safeDistance}</div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>✅ Recommended Action</div>
                <div style={{ color: '#9BA3B8', fontSize: '0.9rem' }}>{result.risk.action}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🛡 Root Barrier Options</h2>
          {[['🧱 Linear Root Barrier', '$500-$2,500 — HDPE panels installed 18-24 inches deep to redirect root growth. Most effective for prevention.'], ['💧 Deep Watering', '$0-$200/yr — Consistent deep watering during drought reduces root moisture-seeking near foundation.'], ['🌿 Root Pruning', '$300-$1,500 — Mechanical or chemical root pruning. Temporary — roots regrow.'], ['🏚 Foundation Piers', '$8,000-$20,000+ — For damage already done. Steel or concrete piers stabilize the slab. Not a root solution.']].map(([icon, desc]) => (
            <div key={icon} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #1E3A5F' }}>
              <span style={{ minWidth: 28 }}>{icon}</span>
              <span style={{ color: '#9BA3B8', fontSize: '0.85rem' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
