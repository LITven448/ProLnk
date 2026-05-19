import { useState } from 'react';

const tubTypes = [
  { type: '4-Person Plug-and-Play', seats: 4, cost: '$3,500–6,000', electric: '120V standard outlet', jets: '10–20 jets', best: 'Tight spaces, renters, entry-level' },
  { type: '6-Person Lounger', seats: 6, cost: '$7,000–12,000', electric: '240V / 50-amp GFCI', jets: '30–50 jets', best: 'Family use, entertaining' },
  { type: '7-Person Therapy/Swim Spa', seats: 7, cost: '$12,000–25,000', electric: '240V / 60-amp', jets: '50–80 jets', best: 'Therapy, year-round fitness' },
  { type: 'Saltwater Hot Tub', seats: '5–7', cost: '$9,000–18,000', electric: '240V / 50-amp', jets: '40–60 jets', best: 'Low maintenance, skin-friendly' },
];

const placements: Record<string, string> = {
  privacy: 'Place in far corner of yard behind fence/landscaping. Add lattice screen on prevailing north wind side. DFW north winds in December hit 25 mph — a windbreak drops perceived temp 15°F.',
  family: 'Near back door or outdoor kitchen for easy access. DFW mosquito season is May–October — consider screening or pergola overhead. Keep 10ft clearance from pool edge per DFW code.',
  therapy: 'Away from noise and traffic. Level pad required — DFW expansive clay soil causes settling. Concrete pad (4-inch minimum) recommended. Close enough to house for easy morning/night access.',
};

const electricReqs: Record<string, string> = {
  small: '120V standard 20-amp outlet if within 20ft of house. No permit required for plug-and-play.',
  medium: '240V / 50-amp GFCI disconnect within 5ft of tub, 6+ ft from water. DFW permit required — typical $150–300.',
  large: '240V / 60-amp dedicated circuit. Licensed electrician required. DFW inspection required. Plan for 2–4 week permit processing.',
};

export default function DFWHotTubGuide() {
  const [yardSpace, setYardSpace] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState('');
  const [electric, setElectric] = useState('');

  function getRecommendation() {
    if (!yardSpace || !priority) return;
    const placement = placements[priority] || '';
    const elec = electricReqs[yardSpace] || '';
    const tubRec = yardSpace === 'small'
      ? '4-Person Plug-and-Play ($3,500–6,000) — fits 7x7ft footprint, no electrician needed.'
      : yardSpace === 'medium'
        ? '6-Person Lounger ($7,000–12,000) — fits 8x8ft footprint, most popular DFW size.'
        : '7-Person Therapy Spa ($12,000–20,000) — 9x9ft footprint, full therapy + family use.';
    setResult(`Tub: ${tubRec}\n\nPlacement: ${placement}`);
    setElectric(elec);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🛁 DFW HOT TUB GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Hot Tubs in DFW: Complete Buyer's Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW hot tubs are most-used October through March when air temps drop to 40–65°F. Summer soaking works
          at lower water temps (95–98°F) for a refreshing contrast to 105°F air.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>📅 DFW Hot Tub Usage by Season</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 28 }}>
          {[
            { season: 'Oct–Mar ⭐⭐⭐⭐⭐', note: 'Peak DFW use — crisp air, perfect 102°F soak' },
            { season: 'Apr–May ⭐⭐⭐', note: 'Great evenings, occasional cold front surprises' },
            { season: 'Jun–Sep ⭐⭐', note: 'Set water to 95°F — refreshing contrast therapy' },
            { season: 'Year-Round', note: 'DFW climate makes year-round ownership worthwhile' },
          ].map(s => (
            <div key={s.season} style={{ background: '#1e2d45', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>{s.season}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛁 Hot Tub Types</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {tubTypes.map(t => (
            <div key={t.type} style={{ background: '#1e2d45', borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <strong style={{ color: '#F5E642' }}>{t.type}</strong>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{t.seats} seats · {t.jets} · {t.electric}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>💰 {t.cost}</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>Best for: {t.best}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Find Your DFW Setup</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Yard Space</label>
              <select value={yardSpace} onChange={e => setYardSpace(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select</option>
                <option value='small'>Small patio / tight backyard</option>
                <option value='medium'>Medium backyard</option>
                <option value='large'>Large yard / pool already present</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select</option>
                <option value='privacy'>Privacy / Relaxation</option>
                <option value='family'>Family & Entertaining</option>
                <option value='therapy'>Therapy / Fitness</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get My DFW Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ Your DFW Hot Tub Plan</div>
              <p style={{ color: '#cbd5e1', whiteSpace: 'pre-line', margin: '0 0 8px' }}>{result}</p>
              {electric && <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Electrical: {electric}</p>}
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>💡 DFW Maintenance Note</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            DFW hard water (400+ ppm TDS in many areas) deposits scale quickly on jets and heaters.
            Use a pre-filter on fill hose and test water weekly. Drain and refill every 3–4 months vs the standard 6.
          </p>
        </div>
      </div>
    </div>
  );
}
