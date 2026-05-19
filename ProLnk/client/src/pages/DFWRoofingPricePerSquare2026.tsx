import { useState } from 'react';

const MATERIALS = [
  { label: '3-Tab Shingles (basic)', matLow: 80, matHigh: 100, lifespan: '15-20 years' },
  { label: 'Architectural Shingles (most common)', matLow: 100, matHigh: 140, lifespan: '25-30 years' },
  { label: 'Class 4 Impact Resistant', matLow: 140, matHigh: 180, lifespan: '30-40 years' },
  { label: 'Metal Standing Seam', matLow: 250, matHigh: 400, lifespan: '40-70 years' },
];

const STORIES = [
  { label: 'Single story', pitchFactor: 1.0, laborAdj: 0 },
  { label: 'Two story', pitchFactor: 1.15, laborAdj: 15 },
];

export default function DFWRoofingPricePerSquare2026() {
  const [sqft, setSqft] = useState('');
  const [matIdx, setMatIdx] = useState(1);
  const [storyIdx, setStoryIdx] = useState(0);
  const [result, setResult] = useState<null | { squares: number; matCost: string; laborCost: string; tearoff: string; total: string }>(null);

  function calculate() {
    const area = parseFloat(sqft);
    if (!area || area < 200) return;
    const mat = MATERIALS[matIdx];
    const story = STORIES[storyIdx];
    const squares = Math.ceil((area * story.pitchFactor) / 100);
    const labor = 75 + story.laborAdj;
    const laborHigh = 125 + story.laborAdj;
    const matLow = squares * mat.matLow;
    const matHigh = squares * mat.matHigh;
    const labLow = squares * labor;
    const labHigh = squares * laborHigh;
    const tearLow = squares * 50;
    const tearHigh = squares * 75;
    const totalLow = matLow + labLow + tearLow;
    const totalHigh = matHigh + labHigh + tearHigh;
    const fmt = (n: number) => '$' + n.toLocaleString();
    setResult({
      squares: squares,
      matCost: `${fmt(matLow)} – ${fmt(matHigh)}`,
      laborCost: `${fmt(labLow)} – ${fmt(labHigh)}`,
      tearoff: `${fmt(tearLow)} – ${fmt(tearHigh)}`,
      total: `${fmt(totalLow)} – ${fmt(totalHigh)}`,
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏠</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roofing Price Per Square Guide 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Understand roofing costs in DFW using industry-standard "squares" — 1 square = 100 sq ft of roof surface.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>📐 Understanding Roofing Squares</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 16 }}>DFW homes are typically 20–30 squares. Your roof area is larger than floor area due to pitch. Roofers quote per square — always verify square count on your estimate.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ s: '1,500 sq ft home', q: '~17–20 squares' }, { s: '2,000 sq ft home', q: '~22–26 squares' }, { s: '2,500 sq ft home', q: '~27–33 squares' }, { s: '3,000 sq ft home', q: '~33–40 squares' }].map(i => (
              <div key={i.s} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{i.s}</div>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>{i.q}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>💰 DFW Material Cost Per Square</h2>
          {MATERIALS.map(m => (
            <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{m.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{m.lifespan}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', marginLeft: 12 }}>${m.matLow}–${m.matHigh}/sq</div>
            </div>
          ))}
          <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94A3B8' }}>Labor (per square)</span><span style={{ color: '#F5E642', fontWeight: 600 }}>$75–$125/sq</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}><span style={{ color: '#94A3B8' }}>Tear-off (per square)</span><span style={{ color: '#F5E642', fontWeight: 600 }}>$50–$75/sq</span></div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 DFW Roofing Cost Estimator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size (heated sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2200"
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Shingle Material</label>
              <select value={matIdx} onChange={e => setMatIdx(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                {MATERIALS.map((m, i) => <option key={m.label} value={i}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Stories</label>
              <select value={storyIdx} onChange={e => setStoryIdx(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                {STORIES.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              Estimate DFW Roofing Cost
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Roof Squares</div>
                <div style={{ color: '#F5E642', fontSize: 36, fontWeight: 700 }}>{result.squares} squares</div>
              </div>
              {[['Materials', result.matCost], ['Labor', result.laborCost], ['Tear-off', result.tearoff]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#94A3B8' }}>{label}</span>
                  <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{val}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total Installed</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{result.total}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW Roofing Contractors · Get matched with a licensed DFW roofer</div>
      </div>
    </div>
  );
}