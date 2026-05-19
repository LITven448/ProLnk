import { useState } from 'react';

const treeSpecies = [
  { name: 'Live Oak', type: 'Evergreen', growth: 'Moderate (1–2 ft/yr)', mature: '40–80 ft tall, 60–100 ft spread', soil: 'Excellent — tolerates DFW clay', shade: '⭐⭐⭐⭐⭐', foundation: '20+ ft', drought: '⭐⭐⭐⭐⭐', note: 'Texas state champion tree — perfect for DFW. Root spread can exceed canopy, maintain safe distance.' },
  { name: 'Cedar Elm', type: 'Deciduous', growth: 'Fast (2–3 ft/yr)', mature: '50–90 ft tall', soil: 'Excellent — native to DFW blackland', shade: '⭐⭐⭐⭐⭐', foundation: '20+ ft', drought: '⭐⭐⭐⭐⭐', note: 'Most well-adapted large tree to DFW conditions. Drops leaves in winter = ideal for south/west placement.' },
  { name: 'Sycamore', type: 'Deciduous', growth: 'Fast (3–5 ft/yr)', mature: '75–100 ft tall', soil: 'Good — prefers moist but tolerates clay', shade: '⭐⭐⭐⭐⭐', foundation: '30+ ft', drought: '⭐⭐⭐', note: 'Stunning shade tree. Needs more water but grows faster than most. Keep farther from foundation.' },
  { name: 'Pecan', type: 'Deciduous', growth: 'Moderate (2–3 ft/yr)', mature: '70–100 ft tall', soil: 'Good with amendments', shade: '⭐⭐⭐⭐', foundation: '25+ ft', drought: '⭐⭐⭐', note: 'Texas state tree — produces nuts, great shade. Deep taproot is better for foundations than spreading roots.' },
  { name: 'Texas Red Oak', type: 'Deciduous', growth: 'Moderate (1.5–2.5 ft/yr)', mature: '40–60 ft tall', soil: 'Excellent in DFW clay', shade: '⭐⭐⭐⭐', foundation: '20+ ft', drought: '⭐⭐⭐⭐', note: 'Brilliant fall color. Well-adapted to DFW soils and heat. Great ornamental + shade value.' },
  { name: 'Bald Cypress', type: 'Deciduous', growth: 'Fast (2–3 ft/yr)', mature: '50–70 ft tall', soil: 'Loves DFW clay and moist areas', shade: '⭐⭐⭐⭐', foundation: '25+ ft', drought: '⭐⭐', note: 'Beautiful for low spots or near drainage areas. Not drought-tolerant — needs regular water.' },
];

const placementRules = [
  { icon: '⬅️', direction: 'West Side', priority: '1 — Highest Impact', reason: 'Afternoon sun (2–7pm) is most intense in DFW. A tree on the west side blocks the hottest rays during peak heat.', savings: '15–25% cooling reduction' },
  { icon: '↙️', direction: 'Southwest Side', priority: '2 — Very High Impact', reason: 'Southwest exposure catches late afternoon sun from May–September. Second most important placement.', savings: '10–20% cooling reduction' },
  { icon: '⬆️', direction: 'South Side', priority: '3 — Seasonal', reason: 'Deciduous trees on the south let winter sun warm the house and block summer sun with full leaf-out.', savings: '8–15% combined heating/cooling' },
  { icon: '➡️', direction: 'East Side', priority: '4 — Morning Shade', reason: 'Morning sun is gentler but east shade can reduce morning cooling load. Lower priority than west.', savings: '5–10% cooling reduction' },
];

export default function DFWTreePlantingGuide() {
  const [orientation, setOrientation] = useState('south-facing');
  const [lotSize, setLotSize] = useState('');
  const [result, setResult] = useState<{ trees: Array<{ species: string; placement: string; distance: string; cost: string }>; totalSavings: string } | null>(null);

  function calculate() {
    const lot = parseFloat(lotSize) || 7500;
    const recs: Array<{ species: string; placement: string; distance: string; cost: string }> = [];
    if (lot >= 5000) recs.push({ species: 'Cedar Elm', placement: 'West side — 25 ft from home, 20 ft from foundation', distance: '20 ft min from foundation', cost: '$200–$600 installed' });
    if (lot >= 6000) recs.push({ species: 'Live Oak', placement: 'Southwest corner — 30 ft from home', distance: '20 ft min from foundation', cost: '$300–$800 installed' });
    if (lot >= 8000) recs.push({ species: 'Texas Red Oak', placement: 'South side — 20 ft from home, deciduous for winter sun', distance: '20 ft min from foundation', cost: '$200–$500 installed' });
    if (lot >= 12000) recs.push({ species: 'Pecan', placement: 'Northwest — gives shade + fruit, deep taproot', distance: '25 ft min from foundation', cost: '$400–$1,000 installed' });
    setResult({ trees: recs, totalSavings: `$${Math.round(recs.length * 500 * 0.22)}–$${Math.round(recs.length * 800 * 0.30)}/yr estimated cooling savings` });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#0f2210 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌳</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Strategic Tree Planting Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>The right tree in the right place saves 20–30% on cooling costs — and lasts 50–100 years. Here's where to plant in DFW.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a2d1a,#0f2010)', border: '1px solid #2d5a2d', borderRadius: 16, padding: 24, margin: '40px 0 0' }}>
          <h2 style={{ color: '#4ADE80', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>🌡️ Shade Trees Reduce Cooling 20–30% in DFW</h2>
          <p style={{ color: '#86EFAC', margin: 0 }}>Strategic tree placement is one of the highest-ROI home improvements in DFW. A $400 cedar elm planted on the west side provides $200+/year in cooling savings for the next 50 years. Keep large trees 20+ feet from your foundation — DFW clay soil shrinks and swells, and roots exploit foundation cracks.</p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Placement Priority by Sun Direction</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
          {placementRules.map(p => (
            <div key={p.direction} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{p.direction}</div>
              <div style={{ color: '#60A5FA', fontSize: 13, marginBottom: 8 }}>{p.priority}</div>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 8px' }}>{p.reason}</p>
              <div style={{ color: '#4ADE80', fontSize: 13, fontWeight: 600 }}>💰 {p.savings}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Best Trees for DFW Clay Soil</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
          {treeSpecies.map(t => (
            <div key={t.name} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 18, marginBottom: 4 }}>{t.name}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>{t.type} • Grows {t.growth} • Matures: {t.mature}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10, fontSize: 13 }}>
                <div><span style={{ color: '#64748B' }}>Shade:</span> {t.shade}</div>
                <div><span style={{ color: '#64748B' }}>Drought:</span> {t.drought}</div>
                <div><span style={{ color: '#64748B' }}>Foundation safe:</span> <span style={{ color: '#F87171' }}>{t.foundation}</span></div>
                <div><span style={{ color: '#64748B' }}>DFW soil:</span> <span style={{ color: '#4ADE80' }}>{t.soil.split(' ')[0]}</span></div>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 12, margin: 0, fontStyle: 'italic' }}>{t.note}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>Tree Placement Recommender</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Get species recommendations and optimal placement for your DFW lot.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 520 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Home Orientation</label>
          <select value={orientation} onChange={e => setOrientation(e.target.value)}
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16 }}>
            <option value="south-facing">Front faces South</option>
            <option value="north-facing">Front faces North</option>
            <option value="east-facing">Front faces East</option>
            <option value="west-facing">Front faces West</option>
          </select>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Lot Size (sq ft)</label>
          <input type="number" value={lotSize} onChange={e => setLotSize(e.target.value)} placeholder="e.g. 8500"
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Get My Tree Planting Plan
          </button>
        </div>
        {result && (
          <div style={{ marginTop: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 24px', border: '1px solid #4ADE80', marginBottom: 16 }}>
              <div style={{ color: '#4ADE80', fontWeight: 700 }}>Estimated Annual Cooling Savings</div>
              <div style={{ color: '#E8EDF5', fontSize: 20, fontWeight: 800 }}>{result.totalSavings}</div>
            </div>
            {result.trees.map((t, i) => (
              <div key={t.species} style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 20px', border: '1px solid #2A3F5C', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginRight: 10 }}>{i + 1}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{t.species}</span>
                  </div>
                  <span style={{ color: '#4ADE80', fontSize: 13 }}>{t.cost}</span>
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 8 }}>📍 {t.placement}</div>
                <div style={{ color: '#F87171', fontSize: 13, marginTop: 4 }}>⚠️ Foundation safety: {t.distance}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
