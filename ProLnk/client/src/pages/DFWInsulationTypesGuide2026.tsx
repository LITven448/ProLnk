import { useState } from 'react';

export default function DFWInsulationTypesGuide2026() {
  const [location, setLocation] = useState('');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState('');

  const recs: Record<string, Record<string, string>> = {
    attic: { none: 'Blown-in fiberglass to R-49 — highest ROI in DFW. Add radiant barrier. Cost: $1,500–2,500.', partial: 'Top up to R-49 with blown-in fiberglass. Add radiant barrier foil if absent. Cost: $800–1,500.', full: 'Add radiant barrier if not present — blocks 97% radiant heat. Cost: $600–1,200.' },
    walls: { none: 'Blown-in retrofit (drill & fill) for existing walls or spray foam for open walls. Cost: $1,500–4,000.', partial: 'Rigid foam exterior sheathing during re-siding — R-5 to R-10 boost. Cost: $2,000–5,000.', full: 'Air seal penetrations — caulk and foam any gaps. Cost: $300–800.' },
    crawl: { none: 'Spray foam underfloor for DFW clay soil moisture control + R-19 thermal. Cost: $2,000–4,000.', partial: 'Vapor barrier + add fiberglass batts to R-19. Cost: $800–2,000.', full: 'Inspect for moisture intrusion annually — DFW clay shifts seasonally.' },
    basement: { none: 'Rigid foam on interior walls (R-10 min) + vapor barrier on floor. Cost: $1,200–2,500.', partial: 'Mineral wool batts — fire resistant, moisture tolerant, R-15 easily.', full: 'Excellent — ensure vapor barrier is intact and check for gaps.' },
  };

  function recommend() {
    if (!location || !current) { setResult('Select both options'); return; }
    setResult(recs[location]?.[current] || 'Consult an insulation professional');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW INSULATION GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Insulation Types Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Right insulation for the right location. In DFW heat, attic insulation delivers the highest ROI of any home upgrade.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { icon: '💨', name: 'Blown-In Fiberglass', r: 'R-2.5/inch', best: 'Attic floors', cost: '$0.50–1.00/sq ft' },
            { icon: '🟡', name: 'Spray Foam', r: 'R-6/inch (closed)', best: 'Air sealing, crawls', cost: '$1.50–3.00/sq ft' },
            { icon: '🟦', name: 'Rigid Foam', r: 'R-5/inch', best: 'Exterior walls', cost: '$0.80–1.50/sq ft' },
            { icon: '🪨', name: 'Mineral Wool', r: 'R-3.7/inch', best: 'Fire zones, basements', cost: '$1.00–1.80/sq ft' },
            { icon: '✨', name: 'Radiant Barrier', r: 'Reflects 97% heat', best: 'DFW attics', cost: '$0.15–0.40/sq ft' },
            { icon: '🌾', name: 'Cellulose', r: 'R-3.7/inch', best: 'Attic, wall retrofit', cost: '$0.50–0.90/sq ft' },
          ].map((c) => (
            <div key={c.name} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.3rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', margin: '0.3rem 0' }}>{c.name}</div>
              <div style={{ color: '#4ade80', fontSize: '0.75rem' }}>{c.r}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Best: {c.best}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧮 Upgrade Recommendation Tool</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Location</option>
              <option value="attic">Attic</option>
              <option value="walls">Exterior Walls</option>
              <option value="crawl">Crawl Space</option>
              <option value="basement">Basement</option>
            </select>
            <select value={current} onChange={e => setCurrent(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', flex: 1 }}>
              <option value="">Current Insulation</option>
              <option value="none">None or minimal</option>
              <option value="partial">Partial (some exists)</option>
              <option value="full">Fully insulated</option>
            </select>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🌡️ DFW Attic Priority</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>DFW attics reach 140–160°F in summer. Blown-in fiberglass to R-49 plus a radiant barrier typically reduces cooling costs 15–25%. This single upgrade often pays back in 3–5 years. Most DFW homes built before 2000 have only R-19 in the attic — half the recommended level.</p>
        </div>
      </div>
    </div>
  );
}