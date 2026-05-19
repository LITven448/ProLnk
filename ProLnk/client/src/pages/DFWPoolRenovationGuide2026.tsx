import { useState } from 'react';

export default function DFWPoolRenovationGuide2026() {
  const [poolAge, setPoolAge] = useState('');
  const [condition, setCondition] = useState('');
  const [finishType, setFinishType] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const getScope = () => {
    const age = parseInt(poolAge) || 0;
    const scopes: string[] = [];
    const costs: string[] = [];

    if (age >= 10 || condition === 'rough') {
      scopes.push('🪨 Replaster or Pebble Finish Replacement');
      costs.push(finishType === 'plaster' ? ',000–,000′ : finishType === ’pebble' ? ',000–,000′ : ',000–,000');
    }
    if (age >= 15 || condition === 'rough') {
      scopes.push('🔲 Tile Line Replacement');
      costs.push(',000–,000');
    }
    if (age >= 20) {
      scopes.push('🏗️ Coping Replacement (bullnose or travertine)');
      costs.push(',000–,000');
    }
    if (age >= 8) {
      scopes.push('💡 LED Light Upgrade (replace incandescent)');
      costs.push('– per light');
    }
    if (condition === 'rough') {
      scopes.push('🔍 Structural Inspection for cracks/settling');
      costs.push('– inspection');
    }
    scopes.push('🎨 Waterline Tile Refresh (optional aesthetic)');
    costs.push('–,000');

    return scopes.map((s, i) => ({ scope: s, cost: costs[i] }));
  };

  const finishComparison = [
    { name: 'Standard Plaster', life: '8–12 yrs', cost: '–8K', look: 'Classic white, shows age faster' },
    { name: 'Quartz Aggregate', life: '12–18 yrs', cost: '–12K', look: 'Subtle sparkle, very popular in DFW' },
    { name: 'Pebble Tec / Pebble Fina', life: '20–25 yrs', cost: '–18K', look: 'Premium look, rough texture, top DFW choice' },
    { name: 'Exposed Aggregate', life: '15–20 yrs', cost: '–15K', look: 'Natural stone look, durable in TX heat' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Renovation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Average DFW pool replaster: ,000–,000 — here's what to expect</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🪨 Finish Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642′ }}>
                  {['Finish', 'Lifespan', 'Cost', 'Look'].map(h => (
                    <th key={h} style={{ color: '#F5E642', textAlign: 'left', padding: '8px 12px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finishComparison.map((f, i) => (
                  <tr key={f.name} style={{ background: i % 2 === 0 ? '#0A1628′ : ’transparent' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{f.name}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8′ }}>{f.life}</td>
                    <td style={{ padding: '8px 12px', color: '#F5E642′ }}>{f.cost}</td>
                    <td style={{ padding: '8px 12px', color: '#94a3b8′ }}>{f.look}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔍 Get Your Renovation Scope</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Age (years)</label>
              <input type='number' value={poolAge} onChange={e => setPoolAge(e.target.value)} placeholder='e.g. 15′ style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px', boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select</option>
                <option value='good'>Good (cosmetic only)</option>
                <option value='fair'>Fair (some staining/wear)</option>
                <option value='rough'>Rough (scaling/cracks)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Desired Finish</label>
              <select value={finishType} onChange={e => setFinishType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
                <option value=''>Select</option>
                <option value='plaster'>Standard Plaster</option>
                <option value='quartz'>Quartz Aggregate</option>
                <option value='pebble'>Pebble Tec / Premium</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!poolAge || !condition || !finishType} style={{ background: poolAge && condition && finishType ? '#F5E642′ : '#334155', color: '#0A1628', fontWeight: 700, border: ’none', borderRadius: 8, padding: '12px 28px', cursor: poolAge && condition && finishType ? 'pointer' : 'not-allowed' }}>
            Get My Renovation Plan →
          </button>
        </div>

        {showPlan && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📋 Recommended Renovation Scope</h2>
            {getScope().map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14 }}>{item.scope}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 12 }}>{item.cost}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
