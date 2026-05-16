import { useState } from 'react';

const concreteTypes = ['Garage Floor', 'Driveway', 'Patio', 'Basement Floor', 'Pool Deck'];
const sunExposures = ['Full Sun (8+ hrs)', 'Partial Sun (4-8 hrs)', 'Shaded (0-4 hrs)'];

const recommendations: Record<string, Record<string, { coating: string; prep: string; cost: string; note: string }>> = {
  'Garage Floor': {
    'Full Sun (8+ hrs)': { coating: 'Polyurea or Polyaspartic Coating', prep: 'Diamond grind + acid etch', cost: '$3–$7/sq ft installed', note: 'Epoxy yellows and peels in DFW UV — skip it for garage floors in sun' },
    'Partial Sun (4-8 hrs)': { coating: '100% Solids Epoxy or Polyurea', prep: 'Acid etch + TSP clean', cost: '$2–$5/sq ft installed', note: 'Epoxy viable if mostly shaded; polyurea preferred for longevity' },
    'Shaded (0-4 hrs)': { coating: '100% Solids Epoxy (2-coat)', prep: 'Acid etch + moisture test', cost: '$2–$4/sq ft installed', note: 'Fully shaded garages are ideal for standard epoxy systems' },
  },
  'Driveway': {
    'Full Sun (8+ hrs)': { coating: 'Elastomeric Masonry Coating', prep: 'Pressure wash + etch + crack fill', cost: '$0.80–$1.80/sq ft DIY', note: 'Standard exterior paint fails within 1 season in DFW summer heat — use elastomeric only' },
    'Partial Sun (4-8 hrs)': { coating: 'Elastomeric or Concrete Stain + Sealer', prep: 'Pressure wash + etch', cost: '$0.60–$1.40/sq ft DIY', note: 'Stain + penetrating sealer combo lasts 3–5 years in DFW conditions' },
    'Shaded (0-4 hrs)': { coating: 'Acrylic Concrete Paint or Stain', prep: 'Pressure wash + light etch', cost: '$0.40–$1.00/sq ft DIY', note: 'Shaded driveways tolerate standard acrylic — still etch first for adhesion' },
  },
  'Patio': {
    'Full Sun (8+ hrs)': { coating: 'Cool Deck Coating or Elastomeric', prep: 'Acid etch + clean', cost: '$1.00–$2.50/sq ft DIY', note: 'Cool Deck reduces surface temp 30°F+ — critical for barefoot comfort in DFW summers' },
    'Partial Sun (4-8 hrs)': { coating: 'Elastomeric Acrylic or Stamped Overlay', prep: 'Acid etch + crack repair', cost: '$0.80–$2.00/sq ft DIY', note: 'Anti-slip additive mandatory for DFW rain events — patios get slick fast' },
    'Shaded (0-4 hrs)': { coating: 'Acrylic Concrete Paint + Anti-Slip Additive', prep: 'Light etch + clean', cost: '$0.40–$1.00/sq ft DIY', note: 'Shaded patios stay cooler — standard acrylic works well with annual recoat' },
  },
  'Basement Floor': {
    'Full Sun (8+ hrs)': { coating: '100% Solids Epoxy (moisture barrier)', prep: 'Moisture vapor test + grind + etch', cost: '$2–$4/sq ft installed', note: 'DFW clay soil drives moisture vapor — test MVER before any coating' },
    'Partial Sun (4-8 hrs)': { coating: '100% Solids Epoxy', prep: 'Acid etch + moisture test', cost: '$2–$4/sq ft installed', note: 'Basements rarely have sun issues — moisture is the main DFW concern' },
    'Shaded (0-4 hrs)': { coating: '100% Solids Epoxy or Polyurea', prep: 'Acid etch + MVER test', cost: '$2–$5/sq ft installed', note: 'Excellent environment for epoxy — focus prep on moisture, not UV' },
  },
  'Pool Deck': {
    'Full Sun (8+ hrs)': { coating: 'Kool Deck or Acrylic Overlay + Non-Slip', prep: 'Acid etch + crack fill + clean', cost: '$2–$5/sq ft installed', note: 'Pool decks reach 150°F+ in DFW August — Kool Deck or similar is non-negotiable' },
    'Partial Sun (4-8 hrs)': { coating: 'Acrylic Overlay or Stamped Texture', prep: 'Etch + clean', cost: '$1.50–$3.50/sq ft installed', note: 'Anti-slip texture is a must — DFW pool decks are constantly wet' },
    'Shaded (0-4 hrs)': { coating: 'Acrylic Overlay + Anti-Slip Additive', prep: 'Light etch + clean', cost: '$1.00–$2.50/sq ft DIY', note: 'Mold/mildew resistance additive recommended for shaded DFW pool decks' },
  },
};

export default function DFWConcretePaintingGuide() {
  const [concreteType, setConcreteType] = useState('');
  const [sunExposure, setSunExposure] = useState('');
  const result = concreteType && sunExposure ? recommendations[concreteType]?.[sunExposure] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎨</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          DFW Concrete Painting Guide
        </h1>
        <p style={{ color: '#aac', marginBottom: '2rem', lineHeight: 1.6 }}>
          Standard exterior paint fails fast in DFW heat. Elastomeric coatings, proper etching, and slip-resistant finishes are essential for North Texas concrete surfaces.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🌡️ Why DFW Is Different</h2>
          <ul style={{ color: '#ccd', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>Surface temps exceed 150°F in summer — most paints bubble and peel</li>
            <li>UV index is extreme March–October — standard latex fades in one season</li>
            <li>DFW clay soil movement causes micro-cracks — coatings must be flexible</li>
            <li>Sudden thunderstorms create slip hazards on smooth painted surfaces</li>
            <li>Acid etching is mandatory before any coating — DFW concrete has high pH</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔧 Get Your Recommendation</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Concrete Surface Type</label>
            <select value={concreteType} onChange={e => setConcreteType(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
              <option value=''>Select surface...</option>
              {concreteTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#aac', marginBottom: '0.4rem', fontSize: '0.9rem' }}>DFW Sun Exposure</label>
            <select value={sunExposure} onChange={e => setSunExposure(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#1a2a4a', color: '#fff', border: '1px solid #334' }}>
              <option value=''>Select exposure...</option>
              {sunExposures.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <div style={{ background: '#122040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Recommended for {concreteType} in {sunExposure}</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#aac' }}>Coating: </span><strong>{result.coating}</strong></div>
              <div><span style={{ color: '#aac' }}>Prep Steps: </span><strong>{result.prep}</strong></div>
              <div><span style={{ color: '#aac' }}>Estimated Cost: </span><strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', color: '#cce', fontSize: '0.9rem' }}>
                💡 {result.note}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>📋 DFW Concrete Prep Checklist</h2>
          <ol style={{ color: '#ccd', lineHeight: 2.2, paddingLeft: '1.25rem', margin: 0 }}>
            <li>Pressure wash — remove all dirt, oil, and efflorescence</li>
            <li>Acid etch with muriatic acid (10:1 water) — rinse thoroughly</li>
            <li>Moisture vapor emission test (MVER) — critical for garages and basements</li>
            <li>Fill cracks with flexible polyurethane caulk — not rigid epoxy</li>
            <li>Apply in temps 50–90°F — avoid DFW afternoon heat (coat early morning)</li>
            <li>Add anti-slip additive to topcoat for any outdoor surface</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
