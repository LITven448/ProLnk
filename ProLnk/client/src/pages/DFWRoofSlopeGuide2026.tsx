import { useState } from 'react';

const pitchCategories = [
  { range: '1:12 – 2:12', label: 'Very Low', icon: '📉', color: '#ef4444', shingles: false, material: 'Modified bitumen, TPO, or EPDM only', hail: 'High risk — flat pooling', cost: 'Premium (specialty system)', drainage: 'Poor', note: 'Standard shingles void warranty below 2:12. DFW hail damage risk is elevated on low-slope roofs.' },
  { range: '2:12 – 4:12', label: 'Low Slope', icon: '📊', color: '#f97316', shingles: true, material: 'Self-adhered cap + ice & water standard', hail: 'Elevated — slower runoff', cost: 'Moderate + underlayment upgrade', drainage: 'Fair', note: 'Shingles allowed but require modified installation. DFW roofers should apply self-adhered underlayment full-field.' },
  { range: '4:12 – 8:12', label: 'Standard', icon: '✅', color: '#22c55e', shingles: true, material: 'Standard shingles + synthetic underlayment', hail: 'Standard DFW exposure', cost: 'Standard market rate', drainage: 'Good', note: 'The most common DFW pitch range. Any qualified DFW roofer can work this slope comfortably.' },
  { range: '8:12 – 12:12', label: 'Steep', icon: '📈', color: '#F5E642', shingles: true, material: 'Standard shingles, steep-slope rated', hail: 'Lower — faster runoff', cost: '15–25% premium (safety/setup)', drainage: 'Excellent', note: 'Excellent drainage clears DFW hail quickly. Roofers charge a premium for safety equipment and fall protection required at this pitch.' },
  { range: '>12:12', label: 'Very Steep', icon: '🏔️', color: '#60a5fa', shingles: true, material: 'Steep-slope specialty shingles', hail: 'Minimal dwell time', cost: '30–50% premium', drainage: 'Superior', note: 'Rare in DFW. Exceptional drainage but very high labor cost due to extreme pitch safety requirements. Often requires specialized rigging.' },
];

export default function DFWRoofSlopeGuide2026() {
  const [rise, setRise] = useState('');
  const [showResult, setShowResult] = useState(false);

  const riseNum = parseFloat(rise);
  const matched = riseNum > 0 ? pitchCategories.find(p => {
    const [lo, hi] = p.range.replace('>', '').split(' – ').map(v => parseFloat(v.split(':')[0]));
    if (p.range.startsWith('>')) return riseNum > 12;
    return riseNum >= lo && riseNum < (hi ?? 99);
  }) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📐</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roof Pitch & Slope Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>How roof pitch affects materials, hail risk, and cost in North Texas</p>
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #60a5fa' }}>
          <p style={{ margin: '0 0 8px', color: '#60a5fa', fontWeight: 600 }}>📐 How to Measure Pitch: Pitch = rise over run, expressed as X:12. A 4:12 pitch rises 4 inches for every 12 inches of horizontal run. To measure: place a level on your roof, measure 12" from the wall, then measure the vertical distance from the level to the roof surface.</p>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {pitchCategories.map(p => (
            <div key={p.range} style={{ background: '#1a2744', borderRadius: 12, padding: 20, border: `1px solid ${p.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 32 }}>{p.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, color: '#F5E642' }}>{p.range}</h3>
                    <span style={{ fontSize: 12, background: p.color, color: '#0A1628', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>{p.label}</span>
                  </div>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 13 }}>{p.note}</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 10 }}>
                {[['🏗️ Material', p.material], ['⛈️ DFW Hail Risk', p.hail], ['💰 Cost Impact', p.cost], ['🌊 Drainage', p.drainage]].map(([label, val]) => (
                  <div key={String(label)} style={{ background: '#0A1628', padding: '8px 10px', borderRadius: 8 }}>
                    <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{label}</p>
                    <p style={{ margin: '2px 0 0', fontSize: 12, color: '#cbd5e1' }}>{val}</p>
                  </div>
                ))}
              </div>
              {!p.shingles && <div style={{ padding: '8px 12px', background: '#ef444422', borderRadius: 8, borderLeft: '3px solid #ef4444' }}><p style={{ margin: 0, color: '#ef4444', fontSize: 13, fontWeight: 600 }}>⚠️ Standard shingles NOT allowed at this pitch — specialty system required</p></div>}
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, border: '1px solid #2a3a5c' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 My Roof Pitch Lookup</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Enter the rise (first number of your pitch ratio). Example: for a 6:12 pitch, enter 6.</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#94a3b8', fontSize: 14 }}>Rise (X in X:12 pitch)</label>
              <input type="number" value={rise} onChange={e => { setRise(e.target.value); setShowResult(false); }} placeholder="e.g. 6" min="1" max="24" style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#fff', fontSize: 16, boxSizing: 'border-box' }} />
            </div>
            <div style={{ padding: '10px 16px', background: '#0A1628', border: '1px solid #2a3a5c', borderRadius: 8, color: '#94a3b8', fontSize: 14, whiteSpace: 'nowrap' }}>:12 run</div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!rise || riseNum <= 0} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: rise ? 'pointer' : 'not-allowed', opacity: rise ? 1 : 0.5 }}>Look Up My Pitch</button>
          {showResult && matched && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: `4px solid ${matched.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{matched.icon}</span>
                <div><p style={{ margin: 0, color: '#94a3b8', fontSize: 12 }}>YOUR {rise}:12 PITCH IS</p><p style={{ margin: 0, color: matched.color, fontWeight: 700, fontSize: 20 }}>{matched.label} Slope</p></div>
              </div>
              <p style={{ margin: '0 0 8px', color: '#94a3b8', fontSize: 12, fontWeight: 600 }}>REQUIRED MATERIAL</p>
              <p style={{ margin: '0 0 12px', color: '#F5E642', fontWeight: 600 }}>{matched.material}</p>
              <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>{matched.note}</p>
            </div>
          )}
          {showResult && !matched && <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8 }}><p style={{ margin: 0, color: '#ef4444' }}>Please enter a rise value between 1 and 24.</p></div>}
        </div>
      </div>
    </div>
  );
}