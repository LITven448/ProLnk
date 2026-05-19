import { useState } from 'react';

const nativePlants = [
  { name: 'Mountain Laurel', type: 'Shrub', water: 'Low', sun: 'Full Sun', color: 'Purple', height: '8–15 ft', bloom: 'March–April', notes: 'Extremely drought-tolerant, fragrant flowers. Toxic to pets.' },
  { name: 'Texas Sage (Cenizo)', type: 'Shrub', water: 'Low', sun: 'Full Sun', color: 'Purple/Lavender', height: '3–8 ft', bloom: 'After rain', notes: '"Barometer bush" — blooms after rainfall. Zero water once established.' },
  { name: 'Blackfoot Daisy', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'White/Yellow', height: '1–2 ft', bloom: 'March–November', notes: 'Blooms nearly year-round, great for rock gardens.' },
  { name: 'Yaupon Holly', type: 'Shrub/Tree', water: 'Low–Medium', sun: 'Full Sun to Shade', color: 'Red berries', height: '10–25 ft', bloom: 'Winter berries', notes: 'Only native caffeinated plant. Birds love berries. Extremely adaptable.' },
  { name: "Turk's Cap", type: 'Perennial', water: 'Low–Medium', sun: 'Shade to Part Sun', color: 'Red', height: '3–6 ft', bloom: 'May–November', notes: 'Best native for shade. Hummingbirds love it.' },
  { name: 'Mexican Feathergrass', type: 'Ornamental Grass', water: 'Low', sun: 'Full Sun', color: 'Golden/Bronze', height: '2–3 ft', bloom: 'Spring–Fall', notes: 'Billowy texture, glows in evening light. May reseed aggressively.' },
  { name: 'Autumn Sage', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'Red/Pink/White', height: '2–3 ft', bloom: 'Spring–Fall', notes: 'Long bloom season, attracts hummingbirds. Very heat-tolerant.' },
  { name: 'Inland Sea Oats', type: 'Ornamental Grass', water: 'Medium', sun: 'Shade to Part Sun', color: 'Green/Copper', height: '3–4 ft', bloom: 'Summer', notes: 'Best native grass for shade. Spreads by seed.' },
  { name: 'Rock Rose (Pavonia)', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'Pink', height: '3–4 ft', bloom: 'May–October', notes: 'Blooms prolifically all summer, very heat-tolerant.' },
  { name: 'Flame Acanthus', type: 'Perennial', water: 'Low', sun: 'Full Sun to Part Shade', color: 'Orange-Red', height: '3–5 ft', bloom: 'June–October', notes: 'Hummingbird magnet, blooms all summer in DFW heat.' },
  { name: 'Texas Lantana', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'Orange/Yellow', height: '3–4 ft', bloom: 'April–Frost', notes: 'Native lantana — far superior to tropical varieties for DFW.' },
  { name: 'Salvia greggii', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'Red/Pink/White', height: '2–3 ft', bloom: 'Spring–Fall', notes: 'Autumn sage relative, extremely long bloom season.' },
  { name: 'Mealy Blue Sage', type: 'Perennial', water: 'Low', sun: 'Full Sun', color: 'Blue', height: '2–3 ft', bloom: 'Spring–Fall', notes: 'Adds rare blue to landscape. Butterflies love it.' },
  { name: 'Cedar Sage', type: 'Perennial', water: 'Low', sun: 'Part Shade', color: 'Red', height: '1–2 ft', bloom: 'March–May', notes: 'Rare early spring bloomer, great under cedar trees.' },
  { name: 'Possumhaw Holly', type: 'Shrub/Tree', water: 'Low–Medium', sun: 'Full Sun to Part Shade', color: 'Red/Orange berries', height: '7–15 ft', bloom: 'Winter berries', notes: 'Stunning winter interest, birds flock to it. Deciduous.' },
];

const yardZones = ['Front Yard (Street View)', 'Backyard', 'Side Yard (Narrow)', 'Slope/Erosion Area', 'Near Foundation', 'Patio/Courtyard'];
const sunExposures = ['Full Sun (6+ hrs)', 'Part Sun (3-6 hrs)', 'Shade (under 3 hrs)', 'Mixed (varies)'];
const colorPreferences = ['Purple/Blue', 'Red/Orange', 'Yellow/White', 'Pink', 'Natural/Green/Texture', 'Mixed Colors'];

export default function DFWTexasLandscapingPlants() {
  const [zone, setZone] = useState('');
  const [sun, setSun] = useState('');
  const [color, setColor] = useState('');
  const [showRecs, setShowRecs] = useState(false);

  const getRecommendations = () => {
    let filtered = nativePlants;
    if (sun === 'Full Sun (6+ hrs)') filtered = filtered.filter(p => p.sun.includes('Full Sun'));
    if (sun === 'Shade (under 3 hrs)') filtered = filtered.filter(p => p.sun.includes('Shade'));
    if (sun === 'Part Sun (3-6 hrs)') filtered = filtered.filter(p => p.sun.includes('Part'));
    if (color === 'Purple/Blue') filtered = filtered.filter(p => p.color.includes('Purple') || p.color.includes('Blue') || p.color.includes('Lavender'));
    if (color === 'Red/Orange') filtered = filtered.filter(p => p.color.includes('Red') || p.color.includes('Orange'));
    if (color === 'Yellow/White') filtered = filtered.filter(p => p.color.includes('Yellow') || p.color.includes('White') || p.color.includes('Golden'));
    if (color === 'Pink') filtered = filtered.filter(p => p.color.includes('Pink'));
    return filtered.slice(0, 5);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌵</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>Texas Native Plants for DFW Landscaping</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>15 native plants that thrive in DFW with minimal water and care</p>
        </div>

        <div style={{ background: '#1e3a2a', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid #2d5a3d' }}>
          <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '4px' }}>💚 Why Native Plants Win in DFW</div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8′ }}>Native plants evolved in North Texas conditions — they handle DFW’s clay soil, summer heat above 100°F, drought, and occasional freezes. Once established, most need zero supplemental water. They also support local pollinators and songbirds.</div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🌿 Top 15 Native Plants for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {nativePlants.map(p => (
              <div key={p.name} style={{ background: '#0A1628', borderRadius: '8px', padding: '14px', border: '1px solid #2d3f5e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.95rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', background: '#1e2d45', padding: '2px 6px', borderRadius: '4px' }}>{p.type}</div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '2px' }}>💧 Water: {p.water} &nbsp;☀️ {p.sun}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '2px' }}>🎨 {p.color} &nbsp;📏 {p.height}</div>
                <div style={{ fontSize: '0.8rem', color: '#4ade80', marginBottom: '4px' }}>🌸 Blooms: {p.bloom}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Get Personalized Plant Recommendations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Yard Zone</label>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select zone...</option>
                {yardZones.map(z => <option key={z}>{z}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Sun Exposure</label>
              <select value={sun} onChange={e => setSun(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select sun...</option>
                {sunExposures.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Color Preference</label>
              <select value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select color...</option>
                {colorPreferences.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowRecs(true)} disabled={!zone || !sun} style={{ background: zone && sun ? '#F5E642′ : '#2d3f5e', color: zone && sun ? '#0A1628' : '#64748b', border: ’none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: zone && sun ? 'pointer' : 'not-allowed' }}>
            Show My Plant Recommendations
          </button>
          {showRecs && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px' }}>🌿 Top Picks for Your {zone}</div>
              {getRecommendations().map(p => (
                <div key={p.name} style={{ padding: '10px 0', borderBottom: '1px solid #1e2d45′ }}>
                  <div style={{ fontWeight: 700, marginBottom: '2px' }}>{p.name} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({p.type})</span></div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8′ }}>💧 {p.water} water · ☀️ {p.sun} · 📏 {p.height} · 🌸 {p.bloom}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>{p.notes}</div>
                </div>
              ))}
              {getRecommendations().length === 0 && <div style={{ color: '#94a3b8′ }}>Try different filters — all 15 plants work in DFW with the right placement.</div>}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Native Plant Resource</div>
      </div>
    </div>
  );
}
