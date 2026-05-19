import { useState } from 'react';

export default function DFWRoofingProtectiveOverlay2026() {
  const [roofType, setRoofType] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const roofTypes = ['TPO flat roof', 'EPDM flat roof', 'Metal roof', 'Asphalt shingles'];
  const conditions = ['Good (5-10 years old)', 'Fair (10-15 years old)', 'Poor (15+ years, leaking)'];

  const guide: Record<string, string> = {
    'TPO flat roof|Good (5-10 years old)': 'TPO reflective coating is excellent for DFW. A white elastomeric coating adds 5-10 years of life and reduces cooling load 15-20% in DFW heat. Cost: $0.75-1.25/sq ft vs $4-7/sq ft for replacement. Do it now before damage occurs.',
    'TPO flat roof|Fair (10-15 years old)': 'Worth coating if no active leaks. Repair all seams and penetrations first ($500-1,500), then coat. If coating fails within 2 years you are replacing anyway — factor that into your decision. Get a professional moisture scan first ($300-500).',
    'TPO flat roof|Poor (15+ years, leaking)': 'Coating is not recommended. DFW sun degrades TPO membranes past the point where coating adheres properly. Replace the membrane — partial replacement often costs nearly as much as full. Budget $4-7/sq ft for full TPO replacement.',
    'EPDM flat roof|Good (5-10 years old)': 'EPDM coating with elastomeric is highly effective in DFW. EPDM is black and absorbs DFW heat — a white coating dramatically reduces cooling costs. Lap sealant on all seams before coating. Cost: $1.00-1.50/sq ft.',
    'EPDM flat roof|Fair (10-15 years old)': 'Coating can work if membrane is intact. DFW UV causes EPDM to chalk — clean thoroughly before coating or adhesion fails. Butyl tape all seams. Get 10-year coating warranty in writing. Borderline decision — get 2 opinions.',
    'EPDM flat roof|Poor (15+ years, leaking)': 'Replace, do not coat. Failed EPDM in DFW often has subsurface moisture that prevents coating adhesion. Replacement cost: $3.50-6/sq ft. Consider TPO upgrade for better DFW heat resistance.',
    'Metal roof|Good (5-10 years old)': 'Elastomeric acrylic coating is ideal for DFW metal roofs. Stops thermal expansion noise, adds insulation value, extends life 15+ years. White or light gray for maximum solar reflectance. Cost: $1.50-2.50/sq ft. Excellent ROI in DFW.',
    'Metal roof|Fair (10-15 years old)': 'Coat if no rust-through. Clean rust spots, treat with rust inhibitor primer, then elastomeric topcoat. DFW metal roofs often show fastener rust first — replace rusted screws before coating. Cost: $2.00-3.50/sq ft with prep.',
    'Metal roof|Poor (15+ years, leaking)': 'Assess first. If rust-through is isolated, coating can work with proper prep. If rust is widespread, replacement is necessary. DFW hail damage often causes hidden fastener issues — inspect all penetrations carefully.',
    'Asphalt shingles|Good (5-10 years old)': 'Shingle coating in DFW is controversial. DFW heat causes shingles to expand/contract more than coatings can handle — most coatings fail within 3-5 years. Better investment: shade trees or radiant barrier in attic. Do not waste money on shingle coating.',
    'Asphalt shingles|Fair (10-15 years old)': 'Not recommended in DFW. Shingle coatings are marketed aggressively but rarely perform in DFW climate. The UV and thermal cycling breaks adhesion. If trying to extend life, ensure attic is well ventilated — that has more impact than surface coating.',
    'Asphalt shingles|Poor (15+ years, leaking)': 'Replace the shingles. Do not coat failing asphalt shingles in DFW — you are adding cost with no meaningful life extension. Class 4 impact-rated shingles (Malarkey, GAF Timberline) may reduce insurance premiums significantly in DFW.',
  };

  function handleCheck() {
    if (!roofType || !condition) return;
    const key = roofType + '|' + condition;
    setResult(guide[key] || 'No data for this combination.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏠🎨</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Roof Protective Overlay Coating Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Roof coatings can extend life and cut cooling costs in DFW — but results depend heavily on roof type and current condition.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Roof Type + Condition → Coating Feasibility</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Type</label>
            <select
              value={roofType}
              onChange={e => { setRoofType(e.target.value); setResult(''); }}
              style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14 }}
            >
              <option value="">Select roof type...</option>
              {roofTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Condition</label>
            <select
              value={condition}
              onChange={e => { setCondition(e.target.value); setResult(''); }}
              style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14 }}
            >
              <option value="">Select condition...</option>
              {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Get Coating Feasibility Guide
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Coating Facts</h2>
          {[
            'DFW averages 230+ sunny days/year — white coatings reduce roof temps 40-60°F',
            'Flat roofs benefit most — steeper slopes shed water so coating adds less value',
            'Always get a moisture scan before coating — trapped moisture will cause coating failure',
            'Warranty: require manufacturer-backed 10-year warranty, not just contractor warranty',
            'Energy Star certified coatings may qualify for federal tax credits in 2026',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
