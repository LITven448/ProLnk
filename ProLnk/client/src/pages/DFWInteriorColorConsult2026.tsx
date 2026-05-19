import { useState } from 'react';

export default function DFWInteriorColorConsult2026() {
  const [orientation, setOrientation] = useState('south');
  const [style, setStyle] = useState('warm');

  const getDirection = () => {
    if (orientation === 'north' && style === 'cool') {
      return { direction: 'Warm it up — avoid cool grays', palette: 'SW Accessible Beige, SW Antique White, Benjamin Moore Pale Oak', warning: 'North-facing DFW rooms read dark and cool — blue-grays will feel cold. Use warm taupes and creamy whites.' };
    }
    if (orientation === 'south' || orientation === 'west') {
      return { direction: 'Any palette works — south/west light is forgiving', palette: 'SW Agreeable Gray, SW Repose Gray, BM Gray Owl', warning: 'South and west DFW rooms get intense afternoon light — test sample boards at 3pm before committing.' };
    }
    if (style === 'bold') {
      return { direction: 'Use bold as accent, neutral as field', palette: 'Navy, Terracotta, Forest Green as accent walls; SW Alabaster or Accessible Beige as field color', warning: 'DFW resale data favors neutral field colors with bold accents. Avoid full-room saturated colors in main living areas.' };
    }
    return { direction: 'Warm neutral is the DFW standard', palette: 'SW Agreeable Gray (SW 7029), SW Accessible Beige (SW 7036), SW Balanced Beige', warning: 'East-facing DFW rooms get bright morning light — samples will look different at noon. Test at multiple times.' };
  };

  const rec = getDirection();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Interior Color Consultation Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How DFW light, exposure, and style preferences affect which colors work in North Texas homes.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Room Orientation + Style → Color Direction</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Room Faces</label>
              <select value={orientation} onChange={e => setOrientation(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="south">South</option>
                <option value="west">West</option>
                <option value="east">East</option>
                <option value="north">North</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Style Preference</label>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="warm">Warm / Earthy</option>
                <option value="cool">Cool / Modern</option>
                <option value="bold">Bold / Colorful</option>
              </select>
            </div>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {rec.direction}</div>
            <div style={{ marginBottom: 8 }}><strong>Palette:</strong> {rec.palette}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>⚠️ {rec.warning}</div>
          </div>
        </div>

        {[
          { icon: '🌡️', title: 'DFW Light Temperature Reality', body: 'DFW sits at 32° latitude — intense, warm sunlight dominates. Colors that look neutral in a Pacific Northwest showroom can appear orange or yellow in a DFW home. Always test with 12″x12″ sample boards for 48 hours before committing to a gallon.' },
          { icon: '🏘️', title: 'What DFW Buyers Want', body: 'Agreeable Gray and Accessible Beige dominate DFW resale listings. Warm gray-taupes photograph well, read neutral, and pair with the tan brick, warm wood floors, and brown granite common in DFW suburban homes built 2000-2020.' },
          { icon: '💡', title: 'Lighting Temperature Matters', body: '2700K warm LED bulbs push yellows — great with warm grays. 3000K bulbs are more neutral. 5000K daylight bulbs will make warm paints look muddy. If updating paint, update bulbs at the same time to get accurate color reads during selection.' },
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

