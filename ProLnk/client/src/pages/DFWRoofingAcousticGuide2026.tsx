import { useState } from 'react';

export default function DFWRoofingAcousticGuide2026() {
  const [noiseConcern, setNoiseConcern] = useState('');
  const [roofType, setRoofType] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    rain: {
      metal: 'DFW rain on metal roofs is a known issue — especially during spring storm season. Solution: add 1.5-inch closed-cell spray foam insulation directly to the underside of metal panels. Reduces noise 15-20 dB. Alternatively, install mass loaded vinyl (MLV) barrier beneath the metal during reroofing. Budget $1.50-2.50/sq ft for foam application.',
      shingle: 'Architectural shingles are naturally quieter in DFW rain than 3-tab. The extra mass and irregular surface diffuse impact noise. If rain is still loud, your attic insulation may be thin — R-30 minimum in DFW. Add blown cellulose for best acoustic effect.',
      tile: 'Concrete and clay tile create air gaps that actually reduce rain noise more than shingles. If DFW rain still penetrates as sound, check the underlayment — synthetic underlayment is quieter than felt. Add attic baffles to break the sound path.',
    },
    hail: {
      metal: 'Metal roofs amplify hail impact significantly in DFW — we average 5 hail events over 1 inch annually. Standing seam performs better than exposed fastener. Best solution: install MLV on rafters and 5/8-inch drywall ceiling below. The combination drops hail impact noise 12-18 dB.',
      shingle: 'Class 4 impact-resistant shingles (required by many DFW insurers) are also noticeably quieter in hail. The rubberized SBS-modified asphalt absorbs energy. Pair with dense-pack cellulose in attic for best results in DFW.',
      tile: 'Tile is dense and does not resonate with hail. The primary noise path is through attic air space. Adding R-49 blown insulation in the attic is the most cost-effective DFW noise fix — also lowers cooling bills.',
    },
    traffic: {
      metal: 'Traffic noise enters through the attic, not the roof deck. Metal roofing has no special advantage here. Focus on attic air sealing — plug all penetrations with acoustic sealant — and add R-49 attic insulation. For extreme DFW highway noise, consider a spray foam lid for the entire attic floor.',
      shingle: 'Shingle mass does little for low-frequency traffic noise. Best DFW approach: dense-pack blown-in attic insulation (cellulose preferred over fiberglass for sound) and acoustic drywall on top-floor ceilings. Budget $2,000-4,500 for a 2,000 sq ft home.',
      tile: 'Same attic-path solution applies. Tile provides marginally better isolation due to mass but the difference is small. Prioritize attic air sealing and insulation depth over roof material choice for DFW traffic noise.',
    },
  };

  function getGuide() {
    if (!noiseConcern || !roofType) { setGuide('Please select both a noise concern and a roof type.'); return; }
    const g = guides[noiseConcern]?.[roofType];
    setGuide(g || 'Contact a DFW roofing or acoustic specialist for your specific combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>🔇</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Roofing for Noise Reduction Guide 2026</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>Quieter roofing options for DFW — material comparisons, underlayment upgrades, and attic acoustic treatments.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 DFW Roofing Noise Facts</h2>
          {['Architectural shingles absorb 15-20% more noise than 3-tab due to extra mass and irregular surface','Metal roofs amplify DFW hail and rain — closed-cell foam underside application is the fix','Mass loaded vinyl (MLV) underlayment is the best single acoustic upgrade during any reroofing','R-49 attic insulation is the most cost-effective noise fix regardless of roof material','DFW averages 5 hail events over 1 inch annually — Class 4 shingles are both quieter and insurance-favorable'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#c8d8ec', fontSize: 14 }}><span style={{ color: '#F5E642' }}>🔈</span>{f}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎚️ Get Your Acoustic Improvement Guide</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Noise Concern</label>
          <select value={noiseConcern} onChange={e => setNoiseConcern(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select concern...</option>
            <option value="rain">Rain Noise</option>
            <option value="hail">Hail Impact Noise</option>
            <option value="traffic">Traffic / Exterior Noise</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current or Planned Roof Type</label>
          <select value={roofType} onChange={e => setRoofType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select roof type...</option>
            <option value="metal">Metal (Standing Seam or Exposed Fastener)</option>
            <option value="shingle">Asphalt Shingles (3-tab or Architectural)</option>
            <option value="tile">Concrete or Clay Tile</option>
          </select>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Get Acoustic Guide 🔇</button>
          {guide && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.6, borderLeft: '3px solid #F5E642' }}>{guide}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Roofing Acoustic Guide 2026</div>
      </div>
    </div>
  );
}
