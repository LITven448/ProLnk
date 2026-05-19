import { useState } from 'react';

const citySpecs: Record<string, { size: string; height: string; style: string }> = {
  Dallas: { size: '4″ min characters', height: '3-5 ft from grade', style: 'Contrasting color required' },
  Plano: { size: '3″ min characters', height: '3-6 ft from grade', style: 'Reflective or illuminated required' },
  Frisco: { size: '4″ min characters', height: '4-6 ft from grade', style: 'HOA approval often required' },
  McKinney: { size: '3.5″ min characters', height: '3-5 ft from grade', style: 'Address post or facade mount' },
  Allen: { size: '3″ min characters', height: '3-5 ft from grade', style: 'Visible from street required' },
  Southlake: { size: '4″ min characters', height: '4-6 ft from grade', style: 'Illuminated preferred by HOAs' },
  Colleyville: { size: '3″ min characters', height: '3-5 ft from grade', style: 'Stone or brick surrounds popular' },
  Flower_Mound: { size: '3″ min characters', height: '3-6 ft from grade', style: 'Trail-side addresses need dual posting' },
};

const homeStyleRec: Record<string, { type: string; mounting: string; cost: string }> = {
  Traditional: { type: 'Cast aluminum or bronze numbers', mounting: 'Brick mortar or address post', cost: '$50–$200′ },
  Modern: { type: 'Illuminated LED address sign', mounting: 'Flush wall mount or post', cost: '$150–$500′ },
  Ranch: { type: 'Reflective stake numbers + mailbox', mounting: 'Mailbox post or landscape stake', cost: '$30–$120′ },
  Mediterranean: { type: 'Tile or ceramic address plaque', mounting: 'Stone surround or address column', cost: '$100–$400′ },
};

export default function DFWHouseNumbersGuide() {
  const [city, setCity] = useState('');
  const [homeStyle, setHomeStyle] = useState('');
  const [result, setResult] = useState<null | { specs: typeof citySpecs[string]; rec: typeof homeStyleRec[string] }>(null);

  function calculate() {
    const key = city.replace(' ', '_');
    const specs = citySpecs[key] || citySpecs[city];
    const rec = homeStyleRec[homeStyle];
    if (specs && rec) setResult({ specs, rec });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏠 DFW House Numbers Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>911 visibility matters — DFW requires street-visible address numbers for emergency response. Get city specs and style recommendations.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📋 DFW 911 Requirements</div>
          <ul style={{ color: '#94a3b8', lineHeight: 2, paddingLeft: '1.2rem' }}>
            <li>Numbers must be visible from the street in both directions</li>
            <li>Illuminated or reflective required in most DFW cities for nighttime response</li>
            <li>Minimum 3–4 inch character height (varies by city)</li>
            <li>Must contrast with background surface</li>
            <li>Dual posting required on corner lots</li>
            <li>HOA approval may be needed for style changes</li>
          </ul>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🔍 Get My Recommendation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select city...</option>
                {Object.keys(citySpecs).map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Home Style</label>
              <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ width: '100%', marginTop: 4, padding: '0.6rem', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8 }}>
                <option value=''>Select style...</option>
                {Object.keys(homeStyleRec).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Specs</button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>✅ Your City + Style Results</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>City Requirements</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  <div>📏 Size: {result.specs.size}</div>
                  <div>📐 Height: {result.specs.height}</div>
                  <div>🎨 Style: {result.specs.style}</div>
                </div>
              </div>
              <div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Recommended Solution</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  <div>🔢 Type: {result.rec.type}</div>
                  <div>🔩 Mount: {result.rec.mounting}</div>
                  <div>💰 Cost: {result.rec.cost}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>⚠️ Common Mistakes</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Numbers hidden by landscaping • Font too decorative to read quickly • Single post only on corner lot • Non-reflective in unlit rural areas • Skipping HOA approval before installation
          </div>
        </div>
      </div>
    </div>
  );
}
