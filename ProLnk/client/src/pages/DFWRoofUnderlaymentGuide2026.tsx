import { useState } from 'react';

const underlayments = [
  { id: 'synthetic', name: 'Synthetic Underlayment', icon: '🏆', tag: 'BEST FOR DFW', color: '#F5E642', desc: 'High-density polyethylene or polypropylene — dramatically outperforms felt in DFW UV and heat', temp: '250°F+', uv: 'Excellent', moisture: 'Excellent', cost: '$0.15–0.25/sqft', lifespan: '25–50 years' },
  { id: 'felt15', name: '#15 Felt Paper', icon: '📄', tag: null, color: '#94a3b8', desc: 'Traditional asphalt-saturated felt; adequate for mild climates but struggles under DFW UV', temp: '180°F', uv: 'Poor', moisture: 'Moderate', cost: '$0.05–0.10/sqft', lifespan: '5–10 years' },
  { id: 'felt30', name: '#30 Felt Paper', icon: '📋', tag: null, color: '#94a3b8', desc: 'Heavier felt; better than #15 but still degrades faster than synthetic in DFW summers', temp: '200°F', uv: 'Fair', moisture: 'Moderate', cost: '$0.08–0.15/sqft', lifespan: '8–15 years' },
  { id: 'selfadhered', name: 'Self-Adhered (Peel & Stick)', icon: '🛡️', tag: 'EAVES & VALLEYS', color: '#60a5fa', desc: 'Ice & water shield for critical areas — eaves, valleys, penetrations; DFW code may require at eaves', temp: '220°F', uv: 'Good', moisture: 'Superior', cost: '$0.40–0.80/sqft', lifespan: '20–30 years' },
];

const projects = ['Full Roof Replacement', 'Partial Re-roof (storm damage)', 'New Construction', 'Overlay (over existing shingles)', 'Flat / Low-Slope Area'];

export default function DFWRoofUnderlaymentGuide2026() {
  const [project, setProject] = useState('');
  const [showSpec, setShowSpec] = useState(false);

  const getSpec = () => {
    if (project === 'Full Roof Replacement') return { primary: 'Synthetic (30-lb equiv)', ice: 'Yes — first 3 ft at eaves + all valleys', note: 'DFW code requires ice & water at eaves despite no freeze risk — moisture barrier benefit.' };
    if (project === 'Partial Re-roof (storm damage)') return { primary: 'Synthetic to match or upgrade', ice: 'At all disturbed valley areas', note: 'Match existing wherever possible; upgrade to synthetic at repair zones for longevity.' };
    if (project === 'New Construction') return { primary: 'Synthetic HDP (house wrap compatible)', ice: 'Yes — eaves, valleys, skylights, pipes', note: 'Spec synthetic from day one; no reason to use felt in new DFW construction.' };
    if (project === 'Overlay (over existing shingles)') return { primary: 'Synthetic slip-sheet', ice: 'N/A — adding over existing layer', note: 'Overlay limits future inspection; synthetic slip sheet reduces heat transfer to existing layer.' };
    if (project === 'Flat / Low-Slope Area') return { primary: 'Modified bitumen or TPO — NOT standard underlayment', ice: 'Full coverage self-adhered cap sheet', note: 'Standard underlayment is insufficient for slopes under 2:12. Requires specialty flat-roof system.' };
    return null;
  };

  const spec = getSpec();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roofing Underlayment Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Choose the right underlayment for North Texas heat and UV conditions</p>
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #F5E642' }}>
          <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>☀️ DFW Climate Reality: Attic temperatures regularly exceed 150°F in summer. Felt paper degrades in 3–5 years under these conditions. Synthetic is not a luxury — it's the correct specification for North Texas.</p>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {underlayments.map(u => (
            <div key={u.id} style={{ background: '#1a2744', borderRadius: 12, padding: 20, border: `1px solid ${u.color}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{u.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, color: '#F5E642' }}>{u.name}</h3>
                    {u.tag && <span style={{ fontSize: 11, background: u.color, color: '#0A1628', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>{u.tag}</span>}
                  </div>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 14 }}>{u.desc}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {[['🌡️ Max Temp', u.temp], ['☀️ UV Resist', u.uv], ['💧 Moisture', u.moisture], ['💰 Cost', u.cost], ['📅 Lifespan', u.lifespan]].map(([label, val]) => (
                  <div key={String(label)} style={{ background: '#0A1628', padding: '8px', borderRadius: 8, textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 Underlayment Specification Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 14 }}>Your Roofing Project</label>
            <select value={project} onChange={e => { setProject(e.target.value); setShowSpec(false); }} style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff' }}>
              <option value="">Select project type</option>
              {projects.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={() => setShowSpec(true)} disabled={!project} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: project ? 'pointer' : 'not-allowed', opacity: project ? 1 : 0.5 }}>Get Underlayment Spec</button>
          {showSpec && spec && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ marginBottom: 12 }}><p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 12 }}>PRIMARY UNDERLAYMENT</p><p style={{ margin: 0, color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{spec.primary}</p></div>
              <div style={{ marginBottom: 12 }}><p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 12 }}>ICE & WATER SHIELD</p><p style={{ margin: 0, color: '#60a5fa', fontWeight: 600 }}>{spec.ice}</p></div>
              <div><p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: 12 }}>DFW NOTE</p><p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>{spec.note}</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}