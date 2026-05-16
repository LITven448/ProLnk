import { useState } from 'react';

export default function DFWInsulationMaterialsGuide2026() {
  const [location, setLocation] = useState('attic');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, string> = {
      attic: 'Blown fiberglass R-38 to R-60 + radiant barrier foil. Radiant barrier blocks DFW's 140°F attic heat — biggest single ROI upgrade for DFW homes. Install radiant barrier first if budget is limited.',
      walls: 'Fiberglass batt R-13 (2x4) or R-19 (2x6) is code minimum. Upgrade to R-15 mineral wool for better fire/sound. Closed-cell spray foam (R-6.5/inch) for maximum air seal on exterior walls.',
      crawlspace: 'Closed-cell spray foam under floor joists (R-19 minimum). Seals air and moisture — critical given DFW clay soil moisture movement. Condition the crawlspace if possible.',
      basement: 'Rigid foam (XPS) R-10 on interior foundation walls + unfaced fiberglass in stud cavities. DFW basements rare but moisture management is key with TX clay soils.',
      exterior: 'Rigid foam continuous sheathing (EPS R-4 to XPS R-10) over framing. Breaks thermal bridging through studs — especially effective in DFW where studs are 20% of wall area.',
      garage: 'R-13 fiberglass batt in walls, R-19 in ceiling if living space above. Insulated garage door (R-16+) has highest ROI for DFW attached garages — reduces thermal load on adjacent rooms.',
    };
    setResult(map[location] || 'Select a location for DFW insulation recommendations.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🌡️ DFW Insulation Materials Deep Dive 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Choosing insulation for DFW — radiant barriers are DFW-specific, attic R-value is where you get the most ROI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌀', label: 'Fiberglass Batt', desc: 'R-13 walls, R-38 attic code min. Cost-effective, DIY-friendly. Most common DFW insulation.', star: false },
            { icon: '💨', label: 'Blown Fiberglass', desc: 'Attic fill to R-49-60. Settles over time. Fast install. $0.50-1.20/sq ft DFW.', star: false },
            { icon: '🔵', label: 'Open-Cell Spray Foam', desc: 'R-3.7/inch. Best for interior air seal. Not vapor barrier. $1-1.50/sq ft DFW.', star: false },
            { icon: '🟡', label: 'Closed-Cell Spray Foam', desc: 'R-6.5/inch. Vapor barrier + air seal. Best for DFW crawlspaces. $1.50-3/sq ft.', star: false },
            { icon: '📦', label: 'Rigid Foam (XPS/EPS)', desc: 'R-4 to R-10. Continuous exterior sheathing breaks thermal bridging in DFW walls.', star: false },
            { icon: '☀️', label: 'Radiant Barrier', desc: 'DFW-specific. Blocks radiant heat from 140°F attic. Reduces cooling load 10-15%. Must-have.', star: true },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642' : '#fff' }}>{t.label}{t.star ? ' ⭐ DFW Must-Have' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Location-Specific DFW Insulation Advice</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>LOCATION IN HOME</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14, maxWidth: 300 }}>
              <option value="attic">Attic</option>
              <option value="walls">Exterior Walls</option>
              <option value="crawlspace">Crawlspace / Pier & Beam</option>
              <option value="basement">Basement (rare in DFW)</option>
              <option value="exterior">Exterior Continuous Sheathing</option>
              <option value="garage">Attached Garage</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get DFW Recommendation →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600, lineHeight: 1.5 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified insulation contractors. DFW energy code: IECC 2021, R-38 attic minimum.
        </div>
      </div>
    </div>
  );
}