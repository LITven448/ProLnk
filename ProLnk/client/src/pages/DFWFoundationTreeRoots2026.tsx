import { useState } from 'react';

export default function DFWFoundationTreeRoots2026() {
  const [treeSize, setTreeSize] = useState('medium');
  const [proximity, setProximity] = useState(15);

  const getImpact = () => {
    const veryClose = proximity <= 5;
    const close = proximity <= 10;
    if (treeSize === 'large' && veryClose) return { label: '🚨 High Soil Drying Risk', detail: 'Large trees within 5 ft actively dry DFW expansive clay beneath your foundation. This causes differential settlement. Consult both an arborist and a foundation engineer immediately.' };
    if (treeSize === 'large' && close) return { label: '⚠️ Moderate Risk — Monitor Seasonally', detail: 'Large root systems extend 2–3x the canopy radius. They extract moisture from DFW clay, causing seasonal movement. Annual foundation elevation surveys recommended.' };
    if (treeSize === 'medium' && veryClose) return { label: '🟡 Caution — Root Drying Possible', detail: 'Medium trees within 5 ft can still dry the clay layer under your slab. Watch for diagonal cracks at door corners and sticking doors as early signs.' };
    if (treeSize === 'small' || proximity > 20) return { label: '✅ Low Risk', detail: 'Small trees or trees 20+ ft away pose minimal foundation risk in most DFW conditions. Maintain normal watering program around perimeter.' };
    return { label: '🟢 Manageable — Preventive Action', detail: 'Maintain consistent perimeter watering (soaker hose 18 inches from foundation) to counteract clay moisture loss from tree roots.' };
  };

  const impact = getImpact();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>🌳 DFW Foundation and Tree Root Interaction</h1>
        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>How trees affect DFW expansive clay foundations — and when to call a pro.</p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 Key Facts</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>Roots rarely <em>pierce</em> concrete — compressive strength is too high</li>
            <li>The real risk: roots <strong style={{ color: '#fff' }}>dry DFW clay</strong>, causing soil shrinkage and settlement</li>
            <li>Older trees have root systems extending 2–3x canopy radius</li>
            <li>DFW black clay is extremely moisture-sensitive — 3% moisture change moves slabs inches</li>
            <li>Signs of root drying: diagonal cracks, sticking doors, sloped floors</li>
            <li>Removing the tree does not immediately fix moisture — rehydration takes years</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌱 Root Impact Guide</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Tree Size</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['small', 'medium', 'large'] as const).map(s => (
                <button key={s} onClick={() => setTreeSize(s)} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', background: treeSize === s ? '#F5E642′ : '#1e3a5f', color: treeSize === s ? '#0A1628' : '#fff', fontWeight: 700, cursor: ’pointer', textTransform: 'capitalize' }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>
              Distance from Foundation: <strong style={{ color: '#F5E642′ }}>{proximity} ft</strong>
            </label>
            <input type="range" min={2} max={40} value={proximity} onChange={e => setProximity(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b' }}>
              <span>2 ft</span><span>40 ft</span>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{impact.label}</div>
            <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6 }}>{impact.detail}</div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏠 When to Call Professionals</div>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>🌳 <strong>Arborist</strong>: tree health, root zone mapping, removal options</li>
            <li>🏗️ <strong>Foundation Engineer</strong>: elevation survey, settlement assessment, pier recommendation</li>
            <li>💧 <strong>Plumber</strong>: if slab movement may have stressed water or drain lines</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0', borderTop: '1px solid #1e3a5f' }}>
          <span style={{ color: '#475569', fontSize: 12 }}>ProLnk © 2026 · DFW Home Services Platform</span>
        </div>
      </div>
    </div>
  );
}
