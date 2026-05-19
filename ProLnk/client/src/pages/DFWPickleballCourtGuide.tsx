import { useState } from 'react';

const SURFACE_OPTIONS: Record<string, { name: string; cost: string; pros: string }> = {
  cushioned_acrylic: { name: 'Cushioned Acrylic on Concrete', cost: '$8–$14/sq ft', pros: 'Best joint protection, tournament-grade, weather-resistant' },
  post_tension: { name: 'Post-Tension Concrete + Acrylic', cost: '$6–$10/sq ft', pros: 'DFW soil movement resistant, long lifespan' },
  sport_tiles: { name: 'Modular Sport Tiles', cost: '$3–$6/sq ft', pros: 'DIY-friendly, removable, good for driveway conversion' },
};

const COURT_TYPES: Record<string, { label: string; minSpace: number; cost: string; note: string }> = {
  full_doubles: { label: 'Full Doubles Court (20×44 ft)', minSpace: 880, cost: '$15,000–$35,000', note: 'Ideal setup, room for out-of-bounds sidelines' },
  single_play: { label: 'Singles/Practice Court (20×34 ft)', minSpace: 680, cost: '$10,000–$22,000', note: 'Great for practice, limited doubles play' },
  multi_sport: { label: 'Multi-Sport Overlay', minSpace: 1200, cost: '$20,000–$45,000', note: 'Add basketball or tennis lines to existing pad' },
};

export default function DFWPickleballCourtGuide() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [budget, setBudget] = useState('');
  const [surface, setSurface] = useState('');
  const [result, setResult] = useState<{ type: string; surface: string; cost: string; note: string; hoaNote: string } | null>(null);

  function calculate() {
    const sqft = parseInt(length) * parseInt(width);
    const bud = parseInt(budget);
    let type = 'full_doubles';
    if (sqft < 680) type = '';
    else if (sqft < 880) type = 'single_play';
    else if (sqft >= 1200 && bud >= 20000) type = 'multi_sport';
    const surf = surface || 'cushioned_acrylic';
    const ct = COURT_TYPES[type];
    const so = SURFACE_OPTIONS[surf];
    setResult({
      type: ct ? ct.label : 'Space Too Small',
      surface: so.name,
      cost: ct ? `${ct.cost} installed + ${so.cost} surface` : 'N/A',
      note: ct ? ct.note : 'Minimum 20×34 ft required for a practice court.',
      hoaNote: 'Most DFW HOAs require architectural review. Submit court layout + color palette. Neutral gray/green surfaces typically approved.',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>🏓 DFW Pickleball Court Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>Fastest-growing sport in DFW — install your own court</div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📐 Standard Court Dimensions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#CBD5E1′ }}>
            <div>Doubles court: <strong style={{ color: '#fff' }}>20 × 44 ft</strong></div>
            <div>Kitchen (NVZ): <strong style={{ color: '#fff' }}>7 ft each side</strong></div>
            <div>Recommended space: <strong style={{ color: '#fff' }}>30 × 60 ft</strong></div>
            <div>Net height: <strong style={{ color: '#fff' }}>34 in center / 36 in sides</strong></div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌙 Lighting for DFW Evening Play</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW heat pushes play to evenings year-round. LED pole lights (4 poles, 1500W total) run $3,000–$8,000 installed. Use warm 3000K to minimize glare. Check DFW city ordinances — most suburbs cap light height at 20 ft and require shields to prevent neighbor spillover.
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Court Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Available Length (ft)</div>
              <input value={length} onChange={e => setLength(e.target.value)} placeholder="e.g. 50″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Available Width (ft)</div>
              <input value={width} onChange={e => setWidth(e.target.value)} placeholder="e.g. 30″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Budget ($)</div>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 20000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Preferred Surface</div>
              <select value={surface} onChange={e => setSurface(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Auto-select</option>
                {Object.entries(SURFACE_OPTIONS).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{result.type}</div>
              <div style={{ color: '#CBD5E1′ }}>Surface: {result.surface}</div>
              <div style={{ color: '#CBD5E1′ }}>Estimated Cost: {result.cost}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.9rem' }}>{result.note}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>🏘️ HOA: {result.hoaNote}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW court installation pros · prolnk.io</div>
      </div>
    </div>
  );
}
