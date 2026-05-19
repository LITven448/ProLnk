import { useState } from 'react';

const situations = [
  { id: 'lean', label: '🏚️ Chimney Leaning Away', severity: 'HIGH', assessment: 'Classic DFW clay movement. The chimney footing moves independently from the main slab.', steps: ['Measure gap at top vs bottom — if wider at top, confirmed lean', 'Do NOT use fireplace until evaluated', 'Hire structural engineer with PE stamp', 'Options: tie-back system, helical piers under footing, or rebuild'], cost: '$3,000–$15,000 depending on severity and repair method' },
  { id: 'gap', label: '↔️ Gap Between Chimney and Wall', severity: 'MEDIUM', assessment: 'Separation at the junction. Common in DFW — clay shrinks in drought, swells in rain, causing differential movement.', steps: ['Photograph and measure the gap', 'Check if gap is consistent top-to-bottom or worse at top', 'Inspect interior for matching cracks near fireplace', 'Consult mason + structural engineer', 'Tuckpointing alone will not fix structural separation'], cost: '$500–$5,000 depending on cause' },
  { id: 'crack', label: '🧱 Cracks in Chimney Masonry', severity: 'MEDIUM', assessment: 'Could be cosmetic or structural. DFW freeze-thaw cycles are mild but clay movement is severe.', steps: ['Hairline cracks in mortar: likely cosmetic, repoint with matching mortar', 'Stair-step cracks: foundation movement, needs engineer eval', 'Horizontal cracks: structural concern, stop fireplace use', 'Spalling brick: moisture intrusion, address waterproofing'], cost: '$200–$8,000 depending on type' },
  { id: 'ok', label: '✅ Chimney Appears Normal', severity: 'LOW', assessment: 'Great — but DFW chimneys need regular monitoring due to clay soil movement.', steps: ['Annual chimney sweep (Level 1 inspection)', 'Check gap at chimney-to-wall junction each spring', 'Ensure chimney cap is in place and intact', 'Waterproof masonry every 5–7 years', 'Monitor after prolonged drought or heavy rain events'], cost: '$150–$400/year for maintenance' },
];

const colors: Record<string,string> = { HIGH: '#f87171', MEDIUM: '#fbbf24', LOW: '#4ade80′ };

export default function DFWFoundationChimney2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const sit = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0′ }}>DFW Foundation and Chimney Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>DFW clay soil moves independently under chimneys — the most misunderstood foundation issue in North Texas</p>
        </div>

        <div style={{ background: '#0f2233', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>Why DFW Chimneys Separate</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>Chimneys have their own footing separate from the main slab. DFW expansive clay causes the chimney footing to move at a different rate than the house, creating separation at the junction wall.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {situations.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: colors[s.severity], fontWeight: 700 }}>{s.severity} PRIORITY</div>
            </button>
          ))}
        </div>

        {sit && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5E642', margin: 0, fontSize: '1.1rem' }}>{sit.label}</h2>
              <span style={{ background: colors[sit.severity], color: '#000', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{sit.severity}</span>
            </div>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{sit.assessment}</p>
            <div style={{ marginBottom: '1rem' }}>
              {sit.steps.map((step, i) => <div key={i} style={{ color: '#cbd5e1', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>{i + 1}. {step}</div>)}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '0.8rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Typical Cost: </span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{sit.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
