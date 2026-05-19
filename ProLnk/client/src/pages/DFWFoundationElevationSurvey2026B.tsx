import { useState } from 'react';

export default function DFWFoundationElevationSurvey2026B() {
  const [finding, setFinding] = useState('');
  const [differential, setDifferential] = useState('');
  const [result, setResult] = useState('');

  function interpret() {
    if (!finding || !differential) { setResult('Please select both a finding type and differential range.'); return; }
    const guides: Record<string, Record<string, string>> = {
      highpoint: {
        low: 'A high point with under 1 inch differential across 20 feet is within normal DFW clay movement range. No structural action needed — monitor quarterly. Document with photos and compare at next survey.',
        moderate: '1–1.5 inch differential with a centered high point suggests the slab is humping — classic DFW post-tension response to moisture variation. Engineer review recommended. Piers may be placed at low edges to support perimeter drop.',
        high: 'High point differential over 1.5 inches in DFW typically signals upheaval from tree root moisture or plumbing leak. Stop any irrigation near the high zone. Emergency engineer consultation needed — do not delay.',
      },
      lowpoint: {
        low: 'A perimeter low point under 1 inch is common in DFW homes over 15 years. Soil desiccation along foundation edge is the cause. Maintain consistent drip irrigation 18 inches from perimeter. Re-survey in 6 months.',
        moderate: '1–1.5 inch low point differential indicates active settlement. In DFW this often means pier support is needed at the low corners. Engineer will identify optimal pier placement locations based on the full elevation map.',
        high: 'Over 1.5 inches of perimeter low point differential is serious DFW foundation settlement. Expect 4–12 piers depending on affected section. Get 3 quotes. Pier placement should follow the elevation map — target the lowest reading points first.',
      },
      uniform: {
        low: 'Uniform low readings across the slab under 1 inch suggest the entire home has settled slightly — typical for DFW clay after 20+ years. Cosmetic only if doors close and no interior cracks. Annual monitoring is sufficient.',
        moderate: 'Uniform settlement of 1–1.5 inches with consistent readings means global movement, not differential stress. Still warrants engineer review in DFW — perimeter piers may be pre-emptive protection against future differential shift.',
        high: 'Uniform settlement over 1.5 inches is unusual and may indicate a deeper soil issue — DFW limestone or expansive clay sublayer. Geotechnical investigation may be warranted before any pier installation. Do not proceed without a soil report.',
      },
    };
    const r = guides[finding]?.[differential];
    setResult(r || 'Consult a licensed DFW foundation engineer for your specific reading pattern.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>📐</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Floor Elevation Survey Interpretation Guide 2026 — Part 2</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>Reading a floor elevation report — what the numbers mean for DFW clay soil foundations and where to place piers.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 DFW Elevation Reading Basics</h2>
          {['Normal DFW movement: 1 inch per 20 feet of span — anything greater warrants review','High point (hump) = upheaval — often caused by moisture under slab from trees or plumbing','Low point (settlement) = soil compression — typical DFW perimeter desiccation issue','Piers go at the lowest readings, not the high points — they lift, not push down','Always compare to a baseline survey — one reading alone has no context'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#c8d8ec', fontSize: 14 }}><span style={{ color: '#F5E642′ }}>📏</span>{f}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Interpret Your Elevation Report</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Reading Pattern</label>
          <select value={finding} onChange={e => setFinding(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select pattern...</option>
            <option value="highpoint">High Point (Hump / Upheaval)</option>
            <option value="lowpoint">Low Point (Settlement / Drop)</option>
            <option value="uniform">Uniform Settlement (All Low)</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Max Differential</label>
          <select value={differential} onChange={e => setDifferential(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select differential...</option>
            <option value="low">Under 1 inch</option>
            <option value="moderate">1 to 1.5 inches</option>
            <option value="high">Over 1.5 inches</option>
          </select>
          <button onClick={interpret} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Interpret Report 📐</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.6, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Foundation Elevation Guide Part 2 · 2026</div>
      </div>
    </div>
  );
}
