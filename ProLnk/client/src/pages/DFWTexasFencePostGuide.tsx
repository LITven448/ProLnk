import { useState } from 'react';

const SOIL_LEVELS = ['Light', 'Moderate', 'Heavy', 'Severe'];
const FENCE_TYPES = ['Wood Privacy', 'Chain Link', 'Ornamental Iron', 'Split Rail'];

const recs: Record<string, Record<string, { post: string; depth: string; cost: string }>> = {
  'Wood Privacy': {
    Light: { post: '4x4 Cedar', depth: '36 inches', cost: '$8-12/post' },
    Moderate: { post: '4x4 Cedar w/ concrete', depth: '38 inches', cost: '$12-18/post' },
    Heavy: { post: '6x6 Cedar w/ concrete', depth: '40 inches', cost: '$18-25/post' },
    Severe: { post: '6x6 Cedar w/ helical anchor', depth: '42 inches', cost: '$30-45/post' },
  },
  'Chain Link': {
    Light: { post: '2" steel pipe', depth: '36 inches', cost: '$10-14/post' },
    Moderate: { post: '2" steel w/ concrete', depth: '38 inches', cost: '$14-20/post' },
    Heavy: { post: '2.5" steel w/ concrete', depth: '40 inches', cost: '$20-28/post' },
    Severe: { post: '2.5" steel w/ helical', depth: '42 inches', cost: '$35-50/post' },
  },
  'Ornamental Iron': {
    Light: { post: 'Standard steel', depth: '36 inches', cost: '$15-22/post' },
    Moderate: { post: 'Heavy-gauge steel', depth: '38 inches', cost: '$22-30/post' },
    Heavy: { post: 'Heavy-gauge w/ concrete', depth: '40 inches', cost: '$30-40/post' },
    Severe: { post: 'Oversized w/ helical', depth: '42 inches', cost: '$50-70/post' },
  },
  'Split Rail': {
    Light: { post: 'Pine post', depth: '36 inches', cost: '$6-10/post' },
    Moderate: { post: 'Cedar post', depth: '38 inches', cost: '$10-15/post' },
    Heavy: { post: 'Cedar w/ gravel base', depth: '40 inches', cost: '$15-22/post' },
    Severe: { post: 'Cedar w/ concrete', depth: '42 inches', cost: '$22-32/post' },
  },
};

export default function DFWTexasFencePostGuide() {
  const [fenceType, setFenceType] = useState('Wood Privacy');
  const [soilLevel, setSoilLevel] = useState('Moderate');
  const rec = recs[fenceType]?.[soilLevel];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🌵 DFW Fence Post Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          DFW clay soil (Vertisols) shifts up to 4 inches seasonally — the #1 cause of fence failure in North Texas. Proper post selection and depth are critical.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>⚠️ Why DFW Clay Destroys Fences</div>
          <ul style={{ color: '#94A3B8', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Clay swells 40-60% when wet, contracts when dry — creates lateral and vertical post stress</li>
            <li>Pine posts rot in 3-5 years from DFW moisture cycles; cedar lasts 10-15 years</li>
            <li>Concrete footings under 36 inches heave out of ground over 2-3 summers</li>
            <li>Gravel-set posts drain better, reducing heave in moderate clay areas</li>
            <li>Helical anchors resist both uplift and lateral movement in severe clay zones</li>
          </ul>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔧 Get Your Post Recommendation</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Fence Type</div>
              <select value={fenceType} onChange={e => setFenceType(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {FENCE_TYPES.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW Clay Severity</div>
              <select value={soilLevel} onChange={e => setSoilLevel(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {SOIL_LEVELS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem' }}>
              {[['📦 Post Type', rec.post], ['📏 Required Depth', rec.depth], ['💰 Est. Cost', rec.cost]].map(([label, val]) => (
                <div key={String(label)} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.3rem' }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>📋 DFW Concrete vs Gravel vs Helical</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.8rem' }}>
            {[
              { type: 'Gravel Set', best: 'Light/Moderate clay', pro: 'Drains well, less heave', con: 'Less rigid in high wind' },
              { type: 'Concrete Set', best: 'Moderate/Heavy clay', pro: 'Strong, stable', con: 'Can heave if too shallow' },
              { type: 'Helical Anchor', best: 'Heavy/Severe clay', pro: 'Max stability, no heave', con: 'Requires special equipment' },
            ].map(item => (
              <div key={item.type} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>{item.type}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Best for: {item.best}</div>
                <div style={{ color: '#22C55E', fontSize: '0.8rem' }}>✅ {item.pro}</div>
                <div style={{ color: '#EF4444', fontSize: '0.8rem' }}>⚠️ {item.con}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted fence professionals who know local clay conditions.
        </div>
      </div>
    </div>
  );
}
