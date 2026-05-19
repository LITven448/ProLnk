import { useState } from 'react';

const FINISH_TYPES = [
  { id: 'standard', label: 'Standard Broom Finish', costPerSqft: 6 },
  { id: 'stamped', label: 'Stamped Concrete', costPerSqft: 14 },
  { id: 'exposed', label: 'Exposed Aggregate', costPerSqft: 10 },
  { id: 'stained', label: 'Acid Stained', costPerSqft: 12 },
  { id: 'overlay', label: 'Decorative Overlay', costPerSqft: 8 },
];

const SHADE_OPTIONS = [
  { id: 'none', label: 'No shade structure', heatNote: 'Dark concrete will reach 160°F+ — light colors required in DFW.' },
  { id: 'pergola', label: 'Pergola / Shade sail', heatNote: 'Partial shade helps but surface still heats significantly. Use light gray or buff colors.' },
  { id: 'covered', label: 'Covered patio / Roof', heatNote: 'Full cover dramatically reduces heat — wider color options available.' },
];

export default function DFWPatioConcreteGuide() {
  const [size, setSize] = useState('');
  const [finish, setFinish] = useState('');
  const [shade, setShade] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!size || !finish || !shade) return;
    const sqft = parseFloat(size) || 0;
    const ft = FINISH_TYPES.find(x => x.id === finish);
    const sh = SHADE_OPTIONS.find(x => x.id === shade);
    const baseTotal = sqft * ft.costPerSqft;
    const low = Math.round(baseTotal * 0.9);
    const high = Math.round(baseTotal * 1.3);
    const jointCount = Math.ceil(sqft / 100);
    setResult({ low, high, sqft, heatNote: sh.heatNote, joints: jointCount });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW OUTDOOR LIVING GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>☀️ Patio Concrete Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's extreme heat requires specific concrete decisions that northern climate guides don’t cover. Color choice, expansion joint placement, and shade integration are critical for usable outdoor space that lasts.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌡️', title: 'DFW Heat: Color is Critical', desc: 'Standard gray concrete in DFW summer reaches 140–160°F — dangerous for pets and bare feet. Light buff, cream, or white finishes reflect more heat. Stamped concrete with dark release agents is a comfort mistake in DFW.' },
            { icon: '📐', title: 'Expansion Joints Are Non-Negotiable', desc: 'DFW summer temps swing 70°F+ from night to day. Without expansion joints every 8–10 feet, concrete slabs crack within 2–3 seasons. DFW contractors who skip joints are cutting corners dangerously.' },
            { icon: '📉', title: 'Slope Away from Foundation', desc: 'All DFW patios must slope minimum 1/8″ per foot away from the house. DFW clay soil doesn’t drain well — water pooling against foundation causes movement and structural damage over time.' },
            { icon: '🌿', title: 'Shade Structure Integration', desc: 'Plan shade structure footings during concrete pour — retrofitting posts into cured concrete is expensive. DFW outdoor spaces without shade lose half their usability June–September.' },
            { icon: '🏗️', title: 'Standard vs Stamped vs Aggregate', desc: 'Standard: most durable, lowest cost, best for full-sun. Stamped: beautiful but requires resealing every 2 years in DFW UV. Exposed aggregate: good texture, moderate heat retention, excellent durability.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', border: '1px solid #1e3a5f', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Patio Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Patio Size (sq ft)</label>
              <input type="number" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. 400″ style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Finish Type</label>
              <select value={finish} onChange={e => setFinish(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select finish...</option>
                {FINISH_TYPES.map(f => <option key={f.id} value={f.id}>{f.label} (${f.costPerSqft}/sqft)</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Shade Plan</label>
              <select value={shade} onChange={e => setShade(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select shade option...</option>
                {SHADE_OPTIONS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Estimate</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Estimated installation cost for {result.sqft} sq ft</div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, color: '#F5E642′ }}>⚠️ DFW Heat Advisory</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{result.heatNote}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Recommended expansion joints: <strong style={{ color: '#fff' }}>{result.joints}</strong> joints minimum for this patio size</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Best pour windows in DFW: October–April. Summer pours require shade tents, wet curing blankets, and night pours to prevent premature curing. Contractors who pour in August afternoon sun are creating a slab that will fail within 3 years.</div>
        </div>
      </div>
    </div>
  );
}
