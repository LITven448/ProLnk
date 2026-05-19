import { useState } from 'react';

const rugMaterials = {
  allergy: {
    wool: { score: 6, note: 'Natural but traps allergens — vacuum 2x/week' },
    nylon: { score: 9, note: 'Low allergen retention, easy to clean' },
    polyester: { score: 8, note: 'Synthetic, resists dust mites, affordable' },
    sisal: { score: 7, note: 'Natural fiber, low pile — good airflow' },
    polypropylene: { score: 9, note: 'Best for DFW allergies — moisture & allergen resistant' },
  },
  pets: {
    wool: { score: 5, note: 'Fur embeds deeply — not ideal for dogs/cats' },
    nylon: { score: 9, note: 'Best for pet fur — releases easily, durable' },
    polyester: { score: 7, note: 'Fur releases but pills with heavy pet traffic' },
    sisal: { score: 4, note: 'Fur weaves into texture — hard to clean' },
    polypropylene: { score: 8, note: 'Easy clean, pet-safe, water resistant' },
  },
  outdoor: {
    wool: { score: 2, note: 'Not UV resistant — fades and degrades fast in DFW sun' },
    nylon: { score: 6, note: 'OK indoors but fades outdoors without UV treatment' },
    polyester: { score: 7, note: 'Better UV resistance than nylon for patios' },
    sisal: { score: 3, note: 'Absorbs moisture — mold risk in DFW humidity' },
    polypropylene: { score: 10, note: 'Top outdoor choice — UV stable, water proof, DFW proven' },
  },
};

const sizingGuide = {
  living: 'DFW open plans: 9×12 minimum — all sofa legs on rug',
  dining: '8×10 for standard table — chairs stay on rug when pulled out',
  bedroom: '8×10 under queen, 9×12 under king — 18–24" exposed floor on sides',
  patio: 'Match seating area — polypropylene only, 8×10 most common DFW covered patio',
  entryway: '2×3 or 3×5 — weather-resistant critical for DFW mud/rain entries',
};

export default function DFWTextileAndRugGuide() {
  const [room, setRoom] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [result, setResult] = useState<null | { material: string; score: number; note: string; size: string }>(null);

  function getRecommendation() {
    if (!room || !lifestyle) return;
    const category = lifestyle as keyof typeof rugMaterials;
    const materials = rugMaterials[category];
    const best = Object.entries(materials).sort((a, b) => b[1].score - a[1].score)[0];
    setResult({
      material: best[0].charAt(0).toUpperCase() + best[0].slice(1),
      score: best[1].score,
      note: best[1].note,
      size: sizingGuide[room as keyof typeof sizingGuide] || 'Measure your space — allow 18" clearance on all sides',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠🧶</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Area Rug Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Hardwood + rug outperforms wall-to-wall carpet in DFW — better air quality, easier allergen control, and replaceable when worn.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ Why DFW Homes Need the Right Rug</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW cedar pollen peaks Feb–Mar — low-pile rugs trap less</li>
            <li>Summer heat + AC cycling creates dry indoor air — synthetic fibers handle swings better than wool</li>
            <li>Covered patios need UV-rated polypropylene — standard rugs fade in 1 DFW summer</li>
            <li>Dog/cat fur in DFW heat = more shedding — nylon releases fur better than looped textures</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Get Your Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Room Type</label>
            <select value={room} onChange={e => setRoom(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select room...</option>
              <option value="living">Living Room</option>
              <option value="dining">Dining Room</option>
              <option value="bedroom">Bedroom</option>
              <option value="patio">Covered Patio</option>
              <option value="entryway">Entryway</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>DFW Lifestyle Priority</label>
            <select value={lifestyle} onChange={e => setLifestyle(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select priority...</option>
              <option value="allergy">Allergy Management</option>
              <option value="pets">Pet Fur Control</option>
              <option value="outdoor">Outdoor / UV Durability</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get DFW Rug Recommendation</button>
        </div>

        {result && (
          <div style={{ background: '#1a3a5c', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>✅ Best Choice: {result.material}</h3>
            <p style={{ color: '#cbd5e1', marginBottom: 8 }}>Score: {'⭐'.repeat(Math.round(result.score / 2))} ({result.score}/10)</p>
            <p style={{ color: '#94a3b8', marginBottom: 12 }}>{result.note}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>📐 Sizing for your room:</p>
              <p style={{ color: '#cbd5e1' }}>{result.size}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
