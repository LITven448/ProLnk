import { useState } from 'react';

const problemAreas = ['Deep Shade', 'Steep Slope', 'Dry Shade', 'Wet Area', 'High-Foot-Traffic Edge', 'Tree Root Zone'];
const sunLevels = ['Full Sun (6+ hrs)', 'Partial Shade (3–6 hrs)', 'Full Shade (<3 hrs)'];

const recommendations: Record<string, Record<string, { cover: string; desc: string; install: string; cost: string }>> = {
  'Deep Shade': {
    'Full Shade (<3 hrs)': { cover: 'Asian Jasmine', desc: "DFW's most popular ground cover — thrives in deep shade, spreads aggressively, evergreen.", install: 'Plant plugs 12–18" apart in fall or spring. Water weekly first season.', cost: '$0.50–1.00/plug' },
    'Partial Shade (3–6 hrs)': { cover: 'Liriope', desc: 'Grass-like, purple blooms in summer, nearly indestructible in DFW conditions.', install: 'Plant 12" apart, divide clumps every 3–4 years. Cut back in late Feb.', cost: '$3–6/plant' },
    'Full Sun (6+ hrs)': { cover: 'Monkey Grass (Ophiopogon)', desc: 'Handles sun to part shade, low-growing, forms dense mat.', install: 'Plant 6–8" apart. Very low water once established.', cost: '$2–4/plant' },
  },
  'Steep Slope': {
    'Full Sun (6+ hrs)': { cover: 'Lantana (Groundcover Type)', desc: 'Covers slopes fast, drought-tolerant, attracts butterflies — DFW native-friendly.', install: 'Plant 24–36" apart. No irrigation needed after first season.', cost: '$8–15/plant' },
    'Partial Shade (3–6 hrs)': { cover: 'Asian Jasmine', desc: 'Roots hold slopes well, spreads to fill gaps, minimal maintenance after establishment.', install: 'Plant plugs 12" apart, water deeply weekly until established.', cost: '$0.50–1.00/plug' },
    'Full Shade (<3 hrs)': { cover: 'Liriope', desc: 'Handles slopes in shade, clumping habit stabilizes soil.', install: 'Stagger rows on slopes, plant 12" apart.', cost: '$3–6/plant' },
  },
  'Dry Shade': {
    'Full Shade (<3 hrs)': { cover: 'Cast Iron Plant', desc: "Virtually indestructible in DFW dry shade — no water, no fuss.", install: 'Plant 18–24" apart. Extremely slow growing — be patient.', cost: '$15–25/plant' },
    'Partial Shade (3–6 hrs)': { cover: 'Asian Jasmine', desc: 'Handles dry shade better than most ground covers in DFW.', install: 'Establish with weekly watering for first summer, then drought-tolerant.', cost: '$0.50–1.00/plug' },
    'Full Sun (6+ hrs)': { cover: 'Decomposed Granite', desc: 'Non-plant option — best for impossibly dry sunny spots. Pairs with natives.', install: '3–4" depth over landscape fabric, edge with steel banding.', cost: '$1.50–3.00/sq ft installed' },
  },
};

const fallback = { cover: 'Asian Jasmine', desc: 'A great all-around DFW ground cover for most conditions.', install: 'Plant plugs 12–18" apart. Water weekly first season.', cost: '$0.50–1.00/plug' };

export default function DFWGroundCoverGuide() {
  const [area, setArea] = useState('');
  const [sun, setSun] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = recommendations[area]?.[sun] ?? fallback;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🌿 DFW LAWN GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Ground Covers for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Grass struggles in DFW shade, on slopes, and under trees. The right ground cover saves water, reduces mowing, and looks great year-round. Here's what works in North Texas.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏆 DFW Most Popular: Asian Jasmine</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            Asian Jasmine dominates DFW landscapes for good reason — it handles shade, drought, slopes, clay soil, and tree competition better than almost anything else. Once established, it needs virtually no irrigation. It spreads aggressively via runners, filling bare spots within 2–3 seasons.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Recommendation</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Problem area type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {problemAreas.map(a => (
                <button key={a} onClick={() => setArea(a)} style={{ background: area === a ? '#F5E642' : '#1e3a5f', color: area === a ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{a}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Sun exposure in that spot:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sunLevels.map(s => (
                <button key={s} onClick={() => setSun(s)} style={{ background: sun === s ? '#F5E642' : '#1e3a5f', color: sun === s ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!area || !sun} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', opacity: (!area || !sun) ? 0.5 : 1 }}>Get Recommendation</button>
        </div>

        {showResult && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ {result.cover}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 12 }}>{result.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>INSTALLATION</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8 }}>{result.install}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>COST ESTIMATE</div>
              <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 600 }}>{result.cost}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
