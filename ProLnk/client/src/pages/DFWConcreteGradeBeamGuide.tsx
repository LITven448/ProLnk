import { useState } from 'react';

const buildingTypes = ['Single-family residential', 'Older commercial/retail', 'Industrial/warehouse', 'Multi-family (pre-1980)', 'Custom/luxury home'];
const observations = ['Exposed concrete beam at perimeter', 'Crawl space with beams visible', 'Significant exterior elevation variation', 'Brick veneer on raised concrete lip', 'Visible pier-and-beam hybrid'];

const recs: Record<string, string> = {
  'Single-family residential|Exposed concrete beam at perimeter': 'Classic grade beam slab. In DFW clay, perimeter beam transfers load to deeper stable soil. Check for diagonal cracking at beam corners during drought cycles.',
  'Single-family residential|Crawl space with beams visible': 'Likely pier-and-beam, not grade beam. Inspect for wood rot, standing moisture, pier settlement — common in Oak Cliff and older East Dallas neighborhoods.',
  'Single-family residential|Significant exterior elevation variation': 'Grade variation may indicate a deep grade beam designed for sloped DFW lots. Monitor for soil separation at foundation edges after prolonged dry spells.',
  'Older commercial/retail|Exposed concrete beam at perimeter': 'Commercial grade beams often extend 24-36 inches deep in DFW. Inspect weep holes for drainage — clay expansion heavily damages shallow commercial slabs.',
  'Older commercial/retail|Brick veneer on raised concrete lip': 'Brick ledge integral to grade beam — common pre-1990 DFW construction. Verify brick ties intact and no mortar joint separation from clay movement.',
  'Industrial/warehouse|Exposed concrete beam at perimeter': 'Heavy-load grade beams may be post-tensioned. Never cut, drill, or excavate near perimeter without structural engineering review.',
};

const fallback = (b: string, o: string) =>
  `For ${b} with that observation: DFW Blackland Prairie clay makes deep grade beams critical. Consult a Texas-licensed structural engineer for precise identification before any repair decisions.`;

export default function DFWConcreteGradeBeamGuide() {
  const [building, setBuilding] = useState('');
  const [observation, setObservation] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!building || !observation) return;
    setResult(recs[`${building}|${observation}`] || fallback(building, observation));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🏗️ DFW Grade Beam Foundation Guide</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Grade beams vs. floating slabs in DFW Blackland Prairie clay</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>What Is a Grade Beam?</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            A grade beam is a reinforced concrete beam poured at ground level connecting piers and forming the foundation perimeter.
            Unlike a floating slab that sits on compacted soil, grade beams transfer structural loads to stable soil or bedrock —
            critical in DFW where Blackland Prairie clay shrinks and swells 4-6 inches seasonally.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚡ When Grade Beams Outperform in DFW</div>
            <ul style={{ color: '#CBD5E8', paddingLeft: '1.25rem', lineHeight: 1.8, margin: 0 }}>
              <li>Sloped lots with 12+ inch elevation change</li>
              <li>High-plasticity clay (PI over 35)</li>
              <li>Commercial loads over 10 PSF</li>
              <li>Lots adjacent to creeks or drainage</li>
              <li>Pre-1975 DFW construction</li>
            </ul>
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ DFW Maintenance Essentials</div>
            <ul style={{ color: '#CBD5E8', paddingLeft: '1.25rem', lineHeight: 1.8, margin: 0 }}>
              <li>Maintain consistent soil moisture year-round</li>
              <li>Soaker hoses during summer drought</li>
              <li>Gutters draining away from beam</li>
              <li>Inspect weep holes every spring</li>
              <li>Annual plumbing leak check under slab</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Identify Your Foundation Type</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Building Type</label>
          <select value={building} onChange={e => setBuilding(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select building type...</option>
            {buildingTypes.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>What do you observe?</label>
          <select value={observation} onChange={e => setObservation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select observation...</option>
            {observations.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Analyze Foundation</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642' }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          Consult a Texas-licensed structural engineer before any foundation repair. Misidentification leads to costly incorrect repair methods.
        </p>
      </div>
    </div>
  );
}
