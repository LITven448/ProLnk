import { useState } from 'react';

const plants = {
  'full-sun-low': [
    { name: 'Blackfoot Daisy', water: 'Very Low', bloom: 'Spring-Fall', notes: 'Drought-tolerant, attracts pollinators' },
    { name: 'Indian Blanket (Gaillardia)', water: 'Very Low', bloom: 'Spring-Summer', notes: 'Texas wildflower, vibrant red-yellow' },
    { name: 'Texas Sage (Cenizo)', water: 'Very Low', bloom: 'After rain', notes: 'Purple blooms, silver foliage, xeric' },
  ],
  'full-sun-medium': [
    { name: 'Salvia greggii', water: 'Low', bloom: 'Spring-Fall', notes: 'Hummingbird magnet, many colors' },
    { name: 'Yucca', water: 'Very Low', bloom: 'Spring', notes: 'Dramatic structure, wildlife habitat' },
    { name: 'Lantana', water: 'Low', bloom: 'Summer-Fall', notes: 'Native variety, butterfly attractor' },
  ],
  'part-shade-low': [
    { name: 'Turks Cap', water: 'Low', bloom: 'Summer-Fall', notes: 'Shade tolerant, hummingbird fave' },
    { name: 'Inland Sea Oats', water: 'Low', bloom: 'Foliage year-round', notes: 'Graceful grass, woodland edges' },
  ],
  'part-shade-medium': [
    { name: 'Flame Acanthus', water: 'Low', bloom: 'Summer-Fall', notes: 'Thrives in DFW heat, orange blooms' },
    { name: 'Autumn Sage', water: 'Low', bloom: 'Spring-Fall', notes: 'Long season, deer resistant' },
  ],
};

export default function DFWNativeGardenGuide() {
  const [zone, setZone] = useState('full-sun');
  const [water, setWater] = useState('low');
  const [showResults, setShowResults] = useState(false);

  const key = `${zone}-${water}`;
  const recommendations = plants[key as keyof typeof plants] || [];
  const savings = water === 'low' ? '60–70%' : '40–55%';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          🌿 DFW NATIVE GARDEN GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Native Plant Garden Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Replace thirsty turf with Texas natives that evolved to thrive in DFW heat and clay — zero irrigation once established.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '☀️', title: 'Blackfoot Daisy', desc: 'Blooms 9+ months, zero supplemental water needed after Year 1' },
            { icon: '🌺', title: 'Salvia greggii', desc: 'Hummingbird magnet, 20+ color varieties, survives DFW winters' },
            { icon: '🌵', title: 'Yucca', desc: 'Zero water, dramatic structure, wildlife nesting habitat' },
            { icon: '🌸', title: 'Indian Blanket', desc: 'Texas state wildflower, reseeds freely, full sun xeric champion' },
          ].map(p => (
            <div key={p.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌱 Lawn Conversion Process</h2>
          {[
            { step: '1', title: 'Sheet Mulch', desc: 'Lay cardboard over existing lawn, wet thoroughly, cover with 4" mulch. Kills grass without chemicals.' },
            { step: '2', title: 'Plant in Fall', desc: 'Oct–Nov is best for DFW natives — roots establish during mild winter before brutal summer.' },
            { step: '3', title: 'Water Year 1 Only', desc: 'Deep water weekly first summer. After that: zero irrigation needed for most natives.' },
            { step: '4', title: 'Navigate HOA', desc: 'Frame as "low-water landscape." Show neighbors\’ examples. Most HOAs allow if kept tidy.' },
          ].map(s => (
            <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{s.step}</div>
              <div><div style={{ fontWeight: 700 }}>{s.title}</div><div style={{ color: '#94A3B8', fontSize: 14 }}>{s.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Plant Finder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Sun Exposure</label>
              <select value={zone} onChange={e => { setZone(e.target.value); setShowResults(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="full-sun">Full Sun (6+ hrs)</option>
                <option value="part-shade">Part Shade (3–6 hrs)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Water Goal</label>
              <select value={water} onChange={e => { setWater(e.target.value); setShowResults(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="low">Extremely Low (xeric)</option>
                <option value="medium">Low (occasional deep watering)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find My Plants 🌿
          </button>
          {showResults && (
            <div style={{ marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642' }}>💧 Estimated Water Savings: {savings} vs. traditional lawn</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>After establishment period (Year 1)</div>
              </div>
              {recommendations.length > 0 ? recommendations.map(r => (
                <div key={r.name} style={{ background: '#162032', borderRadius: 8, padding: '1rem', marginBottom: 10 }}>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Bloom: {r.bloom} · Water: {r.water}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{r.notes}</div>
                </div>
              )) : <div style={{ color: '#94A3B8' }}>Try another combination for more results.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#162032', borderRadius: 10, padding: '1rem 1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Need help designing your native garden?</div>
          <div style={{ color: '#94A3B8', fontSize: 14 }}>ProLnk connects you with DFW landscapers who specialize in native plant conversions.</div>
        </div>
      </div>
    </div>
  );
}
