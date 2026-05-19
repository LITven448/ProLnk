import { useState } from 'react';

const FOUNDATION_PROFILES: Record<string, { profile: string; risk: string; action: string }> = {
  'pre-1960': { profile: 'Pier-and-beam with wood posts — pre-slab era', risk: 'Wood rot, termite damage to posts, sagging floors. Crawl space moisture common. Shifting less dramatic than slab but cumulative damage severe.', action: 'Annual crawl space inspection, treat for termites, sister joists if floor soft' },
  '1960–1985': { profile: 'Post-tension or conventional slab — builder-grade engineering', risk: 'Post-tension cables corrode from chloride infiltration. Conventional slabs lack modern drainage design. Peak settlement era for DFW.', action: 'Professional engineer assessment if cracks > 1/4 inch or doors binding' },
  '1985–2000': { profile: 'Conventional slab — volume builder era', risk: 'Many built on marginal lots without proper clay management. Drainage often poor. Settlement common in 20–30 year range — exactly now.', action: 'Watering program critical — 18-inch moisture barrier around perimeter year-round' },
  '2000–2015': { profile: 'Post-tension slab — engineered for DFW clay', risk: 'Better than prior eras but still clay-dependent. Drought years 2011 and 2022 caused widespread settlement in this vintage.', action: 'Soaker hose system + moisture meter monitoring around perimeter' },
  '2015–present': { profile: 'Engineered post-tension or ribbed slab with geo report', risk: 'Lowest risk — built to modern standards with required geo reports. Still needs moisture management in DFW clay.', action: 'Maintain consistent moisture — smart irrigation controller highly recommended' },
};

const DFW_AREAS = ['North Dallas', 'South Dallas', 'East Fort Worth', 'West Fort Worth', 'Plano/Allen', 'Frisco/McKinney', 'Arlington/Mansfield', 'Irving/Grand Prairie'];

export default function DFWFoundationSummary2026() {
  const [vintage, setVintage] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const eraKey = Object.keys(FOUNDATION_PROFILES).find(k => {
    if (!vintage) return false;
    const yr = parseInt(vintage);
    if (k === 'pre-1960') return yr < 1960;
    if (k === '1960–1985') return yr >= 1960 && yr <= 1985;
    if (k === '1985–2000') return yr > 1985 && yr <= 2000;
    if (k === '2000–2015') return yr > 2000 && yr <= 2015;
    if (k === '2015–present') return yr > 2015;
    return false;
  });

  const profile = eraKey ? FOUNDATION_PROFILES[eraKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 28 }}>🏗️</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Foundation Knowledge Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>Clay soil mechanics, pier types, watering requirements — everything DFW homeowners need to protect their foundation.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🌍', title: 'DFW Clay Mechanics', body: 'Expansive Blackland Prairie clay shrinks 2–4 inches in drought and swells when wet. This seasonal movement is the root cause of virtually all DFW foundation movement — not poor construction.' },
            { icon: '💧', title: 'Moisture Management', body: 'The #1 foundation intervention: uniform moisture. Run soaker hoses 18 inches from foundation during drought. Never let one side wet, one dry — differential movement causes cracks.' },
            { icon: '🔩', title: 'Pier Types', body: 'Steel pressed piers: fast, load-tested, ~$1,500/pier. Concrete piers: slower cure, cheaper per unit, ~$900/pier. Helical piers: best for soft soil, ~$2,000/pier. All require eng. approval.' },
            { icon: '📐', title: 'Engineer vs. Company', body: 'Foundation companies have financial incentive to recommend more piers. Always get a structural engineer report ($400–800) before any repair — their recommendation is your negotiating anchor.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Personalized Foundation Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <input placeholder="Home build year (e.g. 1989)" value={vintage} onChange={e => setVintage(e.target.value)} style={{ flex: 1, minWidth: 180, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }} />
            <select value={area} onChange={e => setArea(e.target.value)} style={{ flex: 1, minWidth: 160, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select DFW area</option>
              {DFW_AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Generate</button>
          </div>
          {submitted && profile && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>Era: {eraKey} — {profile.profile}</div>
              <div style={{ color: '#FF8C69', marginBottom: 6, fontSize: 14 }}>⚠️ {profile.risk}</div>
              <div style={{ color: '#6EE7B7', fontSize: 14 }}>✅ {profile.action}</div>
              {area && <div style={{ marginTop: 10, color: '#8B9BB4', fontSize: 13 }}>📍 {area}: DFW clay density varies by sub-area. Frisco/McKinney and north Dallas corridors have some of the most expansive Blackland Prairie clay in the metro — moisture management is non-negotiable.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🤝 ProLnk Foundation Partners</div>
          <p style={{ color: '#8B9BB4', fontSize: 14, margin: 0 }}>ProLnk vets every foundation contractor for TBPE compliance, warranty terms (10-year transferable minimum), and engineer-first approach. We never list companies who skip engineering assessments.</p>
        </div>
      </div>
    </div>
  );
}
