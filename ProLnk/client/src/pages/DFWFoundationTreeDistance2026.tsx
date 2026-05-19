import { useState } from 'react';

const TREE_SIZES = [
  { label: 'Small (under 20 ft mature)', minDist: 10, examples: 'Crape Myrtle, Yaupon Holly, Possumhaw' },
  { label: 'Medium (20–40 ft mature)', minDist: 15, examples: 'Cedar Elm, Texas Ash, Vitex' },
  { label: 'Large (40+ ft mature)', minDist: 25, examples: 'Live Oak, Pecan, Bur Oak, Sycamore' },
  { label: 'Palm Trees', minDist: 5, examples: 'Texas Sabal, Windmill Palm, Mexican Fan' },
];

const FOUNDATION_TYPES = [
  { label: 'Post-tension slab (most DFW homes)', risk: 'high', note: 'Roots can stress post-tension cables' },
  { label: 'Conventional slab', risk: 'medium', note: 'Clay soil movement + roots = elevated risk' },
  { label: 'Pier & beam', risk: 'low', note: 'More tolerant but moisture still matters' },
];

const SPECIES_MAP: Record<string, { size: number; safe: boolean; note: string }> = {
  'Live Oak': { size: 2, safe: false, note: 'Aggressive surface roots — plant 30+ ft from foundation' },
  'Crape Myrtle': { size: 0, safe: true, note: 'Safe choice for DFW — non-invasive roots' },
  'Pecan': { size: 2, safe: false, note: 'Large spreading root zone — keep 30+ ft away' },
  'Vitex': { size: 1, safe: true, note: 'Good mid-size option, plant 15+ ft' },
  'Cedar Elm': { size: 1, safe: true, note: 'Moderate risk, keep 15-20 ft' },
  'Palm Tree': { size: 3, safe: true, note: 'Fibrous roots — very foundation friendly' },
};

export default function DFWFoundationTreeDistance2026() {
  const [species, setSpecies] = useState('');
  const [foundationIdx, setFoundationIdx] = useState(0);
  const [result, setResult] = useState<null | { dist: number; note: string; safe: boolean }>(null);

  function calculate() {
    if (!species || !SPECIES_MAP[species]) return;
    const s = SPECIES_MAP[species];
    const base = TREE_SIZES[s.size].minDist;
    const extra = FOUNDATION_TYPES[foundationIdx].risk === 'high' ? 5 : 0;
    setResult({ dist: base + extra, note: s.note, safe: s.safe });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌳</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Foundation Tree Distance Chart 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Recommended planting distances for DFW's expansive clay soil — protect your slab from root and moisture damage.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📏 Distance Guidelines by Tree Size</h2>
          {TREE_SIZES.map(t => (
            <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{t.examples}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap', marginLeft: 16 }}>{t.minDist}+ ft</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏗️ Foundation Type Risk Factors</h2>
          {FOUNDATION_TYPES.map(f => (
            <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{f.label}</span>
                <span style={{ color: f.risk === 'high' ? '#EF4444′ : f.risk === ’medium' ? '#F59E0B' : '#22C55E', fontWeight: 700, textTransform: 'uppercase', fontSize: 12 }}>{f.risk}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌱 Planting Distance Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Tree Species</label>
              <select value={species} onChange={e => setSpecies(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select species...</option>
                {Object.keys(SPECIES_MAP).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Foundation Type</label>
              <select value={foundationIdx} onChange={e => setFoundationIdx(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15 }}>
                {FOUNDATION_TYPES.map((f, i) => <option key={f.label} value={i}>{f.label}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              Get Recommended Distance
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Recommended Minimum Distance</div>
                <div style={{ color: '#F5E642', fontSize: 40, fontWeight: 700 }}>{result.dist} ft</div>
              </div>
              <div style={{ background: result.safe ? '#14532D22′ : '#7F1D1D22', border: `1px solid ${result.safe ? '#22C55E' : '#EF4444'}`, borderRadius: 8, padding: 14, color: '#E8EDF5' }}>
                {result.safe ? '✅' : '⚠️'} {result.note}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW Foundation Specialists · Get matched with a local foundation expert</div>
      </div>
    </div>
  );
}