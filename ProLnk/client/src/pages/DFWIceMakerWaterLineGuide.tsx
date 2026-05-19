import { useState } from 'react';

const recommendations = [
  { hardness: 'very-hard', age: 'old', line: 'Braided Stainless Steel', filter: 'Inline Reverse Osmosis', shutoff: 'Angle stop valve (1/4 turn)', maintenance: 'Filter every 6 months, flush line annually', score: 10, cost: '$80–$150 installed', note: 'Critical — very hard DFW water + old ice maker = filter or replace soon' },
  { hardness: 'very-hard', age: 'new', line: 'Braided Stainless Steel', filter: 'Inline Carbon + Sediment Filter', shutoff: 'Angle stop valve (1/4 turn)', maintenance: 'Filter every 6 months', score: 9, cost: '$60–$120 installed', note: 'DFW hard water requires filtration to protect new ice maker investment' },
  { hardness: 'hard', age: 'old', line: 'Braided Stainless Steel', filter: 'Inline Carbon Filter', shutoff: 'Angle stop valve (1/4 turn)', maintenance: 'Filter every 6–9 months', score: 8, cost: '$50–$100 installed', note: 'Good DFW protection — upgrade filter if ice tastes off' },
  { hardness: 'hard', age: 'new', line: 'Braided Stainless Steel', filter: 'Inline Sediment Filter', shutoff: 'Angle stop valve (1/4 turn)', maintenance: 'Filter every 9–12 months', score: 7, cost: '$40–$80 installed', note: 'Braided line + basic filter — solid DFW setup for newer ice makers' },
  { hardness: 'moderate', age: 'any', line: 'Braided Stainless or Copper', filter: 'Inline Sediment Filter (recommended)', shutoff: 'Angle stop valve', maintenance: 'Filter annually', score: 6, cost: '$30–$70 installed', note: 'Fort Worth / Arlington range — still benefit from basic filtration' },
];

export default function DFWIceMakerWaterLineGuide() {
  const [hardness, setHardness] = useState('');
  const [iceMakerAge, setIceMakerAge] = useState('');
  const [result, setResult] = useState<typeof recommendations[0] | null>(null);

  function getRecommendation() {
    if (!hardness || !iceMakerAge) return;
    let match = recommendations.find(r => r.hardness === hardness && (r.age === iceMakerAge || r.age === 'any'));
    if (!match) match = recommendations.find(r => r.hardness === hardness) || recommendations[0];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🧊 DFW Plumbing Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Ice Maker Water Line Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>DFW hard water destroys ice makers without filtration. The right line + filter extends ice maker life by years.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚠️ DFW Ice Maker Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🧊 Hard Water Damage', 'DFW calcium scales ice maker coils — shortens life from 10yr to 3yr'],['🔗 Line Type Matters', 'Plastic lines crack; copper corrodes — braided stainless is safest in DFW'],['🔧 Shutoff Required', 'Always install angle stop shutoff valve — required for service access'],['💧 Filtration Critical', 'DFW water with 300+ mg/L hardness must be filtered at source']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>🔍 DFW Ice Maker Water Line Selector</h2>
          <p style={{ color: '#8B9CC8', fontSize: 13, marginBottom: 16 }}>Check your city's annual water quality report for exact hardness levels.</p>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>DFW WATER HARDNESS</label>
            <select value={hardness} onChange={e => setHardness(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select hardness</option>
              <option value='very-hard'>Very hard (300+ mg/L — Frisco, McKinney, Allen, Lewisville)</option>
              <option value='hard'>Hard (200–300 mg/L — Dallas, Plano, Garland, Irving)</option>
              <option value='moderate'>Moderate (100–200 mg/L — Fort Worth, Arlington, Mansfield)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>ICE MAKER AGE</label>
            <select value={iceMakerAge} onChange={e => setIceMakerAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select age</option>
              <option value='new'>New (0–3 years old)</option>
              <option value='mid'>Mid-age (3–7 years old)</option>
              <option value='old'>Older (7+ years or producing cloudy/small ice)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Ice Maker Setup →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ DFW RECOMMENDED SETUP</div>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>🔗 Line Type: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.line}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>💧 Filter: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.filter}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>🔧 Shutoff Valve: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.shutoff}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>📅 Maintenance: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.maintenance}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>💰 Installed Cost: </span><span style={{ color: '#E8EAF0', fontSize: 13 }}>{result.cost}</span></div>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>💡 DFW Pro Tips</h2>
          {['Cloudy or small ice cubes = DFW hard water scaling — filter now before full failure','Never use the saddle valve that comes in ice maker kits — they fail and leak in DFW','Turn off ice maker water line before DFW freeze events — water in line can freeze','Replace braided line every 5 years regardless — small insurance against big leak'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#8B9CC8', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
