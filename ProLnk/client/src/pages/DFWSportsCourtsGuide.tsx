import { useState } from 'react';

const COURT_TYPES = [
  { id: 'basketball', label: '🏀 Basketball Court', fullSize: { w: 84, l: 50 }, halfSize: { w: 42, l: 50 }, concreteLow: 18000, concreteHigh: 32000, asphaltLow: 12000, asphaltHigh: 22000, tileLow: 22000, tileHigh: 40000, hoaLikelihood: 'moderate', note: 'Full NBA regulation 84x50 — most homeowners install half-court 42x50' },
  { id: 'pickleball', label: '🏓 Pickleball Court', fullSize: { w: 20, l: 44 }, halfSize: { w: 20, l: 44 }, concreteLow: 11000, concreteHigh: 20000, asphaltLow: 8000, asphaltHigh: 14000, tileLow: 14000, tileHigh: 24000, hoaLikelihood: 'high', note: 'Fastest growing sport in DFW — standard 20x44 ft with buffer zones' },
  { id: 'tennis', label: '🎾 Tennis Court', fullSize: { w: 36, l: 78 }, halfSize: { w: 36, l: 78 }, concreteLow: 30000, concreteHigh: 55000, asphaltLow: 20000, asphaltHigh: 38000, tileLow: 40000, tileHigh: 70000, hoaLikelihood: 'low', note: 'Requires large lot — 7,200 sqft minimum. Fencing adds $8,000–$18,000' },
  { id: 'multisport', label: '⚽ Multi-Sport Court', fullSize: { w: 50, l: 90 }, halfSize: { w: 50, l: 90 }, concreteLow: 25000, concreteHigh: 50000, asphaltLow: 18000, asphaltHigh: 35000, tileLow: 30000, tileHigh: 60000, hoaLikelihood: 'low', note: 'Combines basketball, pickleball, and volleyball — modular tile is ideal' },
];

const SURFACE_TYPES = [
  { id: 'concrete', label: 'Concrete', note: 'Best for DFW — stable in clay soil, requires 4" reinforced slab, lower maintenance' },
  { id: 'asphalt', label: 'Asphalt', note: 'Cheaper upfront, softens in DFW summer heat (115°F+ surface temps), cracks over time' },
  { id: 'tile', label: 'Modular Sport Tile', note: 'Snaps over concrete base, cushioned, ideal for multi-use, allows drainage' },
];

export default function DFWSportsCourtsGuide() {
  const [courtType, setCourtType] = useState(COURT_TYPES[0]);
  const [surface, setSurface] = useState(SURFACE_TYPES[0]);
  const [halfCourt, setHalfCourt] = useState(true);
  const [addLighting, setAddLighting] = useState(false);
  const [addFencing, setAddFencing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const baseLow = surface.id === 'concrete' ? courtType.concreteLow : surface.id === 'asphalt' ? courtType.asphaltLow : courtType.tileLow;
  const baseHigh = surface.id === 'concrete' ? courtType.concreteHigh : surface.id === 'asphalt' ? courtType.asphaltHigh : courtType.tileHigh;
  const halfMultiplier = halfCourt && courtType.id === 'basketball' ? 0.55 : 1;
  const lightingAdd = addLighting ? 12000 : 0;
  const fencingAdd = addFencing ? 10000 : 0;
  const sitePrepAdd = 4500;
  const totalLow = Math.round((baseLow * halfMultiplier) + lightingAdd + fencingAdd + sitePrepAdd);
  const totalHigh = Math.round((baseHigh * halfMultiplier) + lightingAdd + fencingAdd + sitePrepAdd);

  const hoaColor = courtType.hoaLikelihood === 'high' ? '#22c55e' : courtType.hoaLikelihood === 'moderate' ? '#f59e0b' : '#ef4444';
  const hoaText = courtType.hoaLikelihood === 'high' ? 'Likely Approved' : courtType.hoaLikelihood === 'moderate' ? 'Review Required' : 'Often Denied — Verify';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🏆 DFW SPORTS COURTS GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Sports Court Installation in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW clay soil and summer heat require specific site prep. Get your court right the first time with the right surface and base.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🌱 DFW Clay Soil: The Site Prep Challenge</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>Blackland Prairie clay in DFW expands and contracts significantly with moisture. A sports court built directly on unprepared clay will crack, heave, and become uneven within 2–3 years. Proper site prep includes: excavation to 8–12 inches, stabilization with crushed limestone base, compaction testing, and a 4-inch reinforced concrete slab. Budget $3,000–$6,000 for site prep alone — it's what makes the difference between a 30-year court and a 5-year headache.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🏅 Select Your Court Type</h2>
          {COURT_TYPES.map(c => (
            <div key={c.id} onClick={() => setCourtType(c)} style={{ background: courtType.id === c.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${courtType.id === c.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{c.label}</span>
                <span style={{ color: '#64748b', fontSize: 13 }}>{c.fullSize.w} x {c.fullSize.l} ft</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🏗️ Surface Options</h2>
          {SURFACE_TYPES.map(s => (
            <div key={s.id} onClick={() => setSurface(s)} style={{ background: surface.id === s.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${surface.id === s.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Cost Estimator</h2>
          {courtType.id === 'basketball' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <input type="checkbox" id="half" checked={halfCourt} onChange={e => setHalfCourt(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
              <label htmlFor="half" style={{ color: '#cbd5e1', cursor: 'pointer' }}>Half-court only (42x50 ft)</label>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <input type="checkbox" id="lighting" checked={addLighting} onChange={e => setAddLighting(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            <label htmlFor="lighting" style={{ color: '#cbd5e1', cursor: 'pointer' }}>Add LED court lighting (+$12,000)</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <input type="checkbox" id="fencing" checked={addFencing} onChange={e => setAddFencing(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            <label htmlFor="fencing" style={{ color: '#cbd5e1', cursor: 'pointer' }}>Add perimeter fencing (+$10,000 avg)</label>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Calculate Total Cost
          </button>
          {showResult && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: '2px solid #F5E642' }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642', marginBottom: 8 }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Includes site prep (~$4,500), {surface.label} surface, {addLighting ? 'lighting, ' : ''}{addFencing ? 'fencing, ' : ''}and court markings.</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>HOA approval likelihood:</span>
                <span style={{ background: hoaColor, color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{hoaText}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌡️ DFW Heat Considerations</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Asphalt surface temps can reach 155°F+ in summer — avoid barefoot play</li>
            <li>Concrete stays cooler but still 120°F+ — light-colored court coatings reduce heat 20–30°F</li>
            <li>Shade structure over seating area strongly recommended</li>
            <li>Lighting enables evening play when temps drop to comfortable levels (post-8pm in summer)</li>
            <li>Request a court coating with UV stabilizer — DFW sun fades color in 3–5 years otherwise</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
