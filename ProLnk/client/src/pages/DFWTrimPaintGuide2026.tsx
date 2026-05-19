import { useState } from 'react';

export default function DFWTrimPaintGuide2026() {
  const [condition, setCondition] = useState('good');
  const [style, setStyle] = useState('modern');

  const getGuide = () => {
    if (condition === 'rough') {
      return { finish: 'Semi-Gloss', primer: 'Oil-based primer first — fills imperfections', paint: 'SW ProClassic Alkyd Semi-Gloss', tip: 'Sand between coats for smooth result' };
    }
    if (style === 'traditional') {
      return { finish: 'Gloss', primer: 'Latex primer if new wood', paint: 'SW Emerald Urethane Trim Enamel — Gloss', tip: 'Gloss amplifies detail on crown molding' };
    }
    return { finish: 'Semi-Gloss', primer: 'Skip if existing paint is intact', paint: 'SW Emerald Urethane Trim Enamel — Semi-Gloss', tip: 'Semi-gloss is the DFW standard for trim — cleans easily' };
  };

  const guide = getGuide();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Interior Trim Paint Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Semi-gloss vs gloss, alkyd vs latex, and the best trim colors for Dallas–Fort Worth homes.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Get Your Trim Paint Guide</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Trim Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="good">Good — minor wear</option>
                <option value="rough">Rough — chipped or cracked</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8' }}>Home Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="modern">Modern / Contemporary</option>
                <option value="traditional">Traditional / Craftsman</option>
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ RECOMMENDED: {guide.finish} Finish</div>
            <div style={{ marginBottom: 6 }}><strong>Paint:</strong> {guide.paint}</div>
            <div style={{ marginBottom: 6 }}><strong>Primer:</strong> {guide.primer}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {guide.tip}</div>
          </div>
        </div>

        {[
          { icon: '🏆', title: '#1 White in DFW: SW Alabaster', body: 'Sherwin-Williams Alabaster (SW 7012) dominates DFW trim — warm white that pairs with the warm neutral walls common in North Texas homes. Cooler whites like Pure White can read blue in south-facing DFW rooms.' },
          { icon: '⚗️', title: 'Alkyd vs Latex for Trim', body: 'Alkyd (oil-based) levels beautifully — fewer brush marks, harder cure. Latex dries faster and cleans with water. SW Emerald Urethane bridges the gap: latex cleanup with alkyd hardness. Best choice for DFW cabinet and trim work.' },
          { icon: '🚪', title: 'Painting Doors vs Pre-Primed', body: 'Pre-primed doors from Home Depot save 1-2 hours per door. If painting existing doors, degrease with TSP substitute, sand lightly, prime bare spots, then apply 2 coats semi-gloss. Remove hardware — never paint around it.' },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.icon} {card.title}</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🖌️</div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Need a DFW Painting Pro?</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with vetted local painters — free quotes, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}

