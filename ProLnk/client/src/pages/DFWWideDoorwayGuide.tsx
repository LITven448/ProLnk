import { useState } from 'react';

const SOLUTIONS = [
  { name: 'Standard Widening (Non-Load-Bearing)', cost: '$800–$1,800/doorway', time: '1–2 days', desc: 'Remove framing, widen rough opening, install new header. Straightforward for interior non-structural walls.' },
  { name: 'Load-Bearing Widening', cost: '$2,000–$5,000/doorway', time: '3–5 days', desc: 'Requires temporary support, engineered beam, permit. Common in DFW homes with open floor plans.' },
  { name: 'Pocket Door Conversion', cost: '$600–$1,500/doorway', time: '2–3 days', desc: 'No swing clearance needed. Gains 2–4\’ of usable space. Requires wall depth of 4″+.' },
  { name: 'Barn Door', cost: '$400–$1,200/doorway', time: '1 day', desc: 'Surface-mounted, no wall modification. Easiest install. Not fully ADA compliant but adds clearance.' },
];

function getEstimate(count: string, age: string) {
  const n = parseInt(count) || 1;
  const isOld = age === 'Pre-1980';
  const loadBearingRisk = isOld ? 'Higher probability of plaster walls + knob-and-tube wiring — inspection recommended before opening walls' : 'Standard drywall construction — lower risk';
  const low = n * 800;
  const high = n * (isOld ? 4000 : 1800);
  return {
    doorways: n,
    loadBearingRisk,
    costRange: `$${low.toLocaleString()}–$${high.toLocaleString()}`,
    permitNote: 'Structural doorway widening requires permit in all DFW cities. Non-structural may be exempt.',
    adaNote: 'ADA requires 36″ clear width. Standard doors are 32″ — widening adds $800–$5K per opening.',
  };
}

export default function DFWWideDoorwayGuide() {
  const [count, setCount] = useState('3');
  const [age, setAge] = useState('Post-1980');
  const [result, setResult] = useState<ReturnType<typeof getEstimate> | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🚪 Doorway Widening Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>Standard doors are 32" — ADA recommends 36″ clear width. Learn your options: full widening, pocket doors, or barn doors, and how home age affects complexity.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: '📏 Standard Door Width', val: '32″ — below ADA 36″ recommendation' },
            { label: '⚠️ Load-Bearing Check', val: 'Required before widening any doorway' },
            { label: '🚪 Best Alternative', val: 'Pocket doors — zero swing clearance needed' },
            { label: '📋 Permit', val: 'Required for structural widening in DFW' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0F2035', borderRadius: 8, padding: '1rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 13, color: '#8A9BB5', marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 600, color: '#E8EDF5′ }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔧 Widening Options</h2>
          {SOLUTIONS.map(s => (
            <div key={s.name} style={{ background: '#0F2035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5′ }}>{s.name}</span>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{s.cost}</span>
              </div>
              <div style={{ color: '#8A9BB5', fontSize: 13 }}>{s.desc}</div>
              <div style={{ color: '#6B8FBF', fontSize: 12, marginTop: 4 }}>⏱ {s.time}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Get Your Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Number of Doorways</label>
              <input type="number" value={count} onChange={e => setCount(e.target.value)} min={1} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Home Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Pre-1980</option><option>Post-1980</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(getEstimate(count, age))} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Calculate →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📐 Estimate for {result.doorways} Doorway{result.doorways > 1 ? 's' : ''}</h3>
            {[['Cost Range', result.costRange], ['Load-Bearing Risk', result.loadBearingRisk], ['Permit', result.permitNote], ['ADA Note', result.adaNote]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ color: '#8A9BB5', fontSize: 13, minWidth: 120 }}>{k}</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600, textAlign: 'right', maxWidth: '65%' }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
