import { useState } from 'react';

const locations = ['North Dallas / Plano / Frisco', 'Fort Worth / West DFW', 'East DFW / Rockwall / Mesquite', 'Southlake / Keller / Colleyville', 'Arlington / Mansfield', 'McKinney / Allen / Prosper'];
const homeStyles = ['Ranch / Traditional', 'Colonial / Georgian', 'Mediterranean / Spanish', 'Modern / Contemporary', 'Craftsman / Bungalow'];
const budgets = ['Under $10,000', '$10,000–$25,000', '$25,000–$60,000', '$60,000+'];

const hailData: Record<string, { zone: string; avgClaims: string; recommendation: string }> = {
  'North Dallas / Plano / Frisco': { zone: 'High Risk', avgClaims: '3–5 claims/decade', recommendation: 'Brick strongly preferred — insurance carriers in this zone often charge 15–25% higher premiums for stucco homes.' },
  'Fort Worth / West DFW': { zone: 'High Risk', avgClaims: '4–6 claims/decade', recommendation: 'Brick is dominant for good reason. Fort Worth is in one of the most active hail corridors in the US.' },
  'East DFW / Rockwall / Mesquite': { zone: 'Very High Risk', avgClaims: '5–7 claims/decade', recommendation: 'Brick is the only sensible choice for new construction or residing. Stucco repairs in this zone are frequent and costly.' },
  'Southlake / Keller / Colleyville': { zone: 'High Risk', avgClaims: '3–5 claims/decade', recommendation: 'High-end stucco exists in this market but requires Class 4 impact-rated products to be insurable at reasonable rates.' },
  'Arlington / Mansfield': { zone: 'Moderate-High Risk', avgClaims: '3–4 claims/decade', recommendation: 'Brick preferred. If stucco, use 3-coat hard coat stucco (not EIFS/synthetic) and specify Class 4 impact resistance.' },
  'McKinney / Allen / Prosper': { zone: 'High Risk', avgClaims: '3–5 claims/decade', recommendation: 'New construction here is predominantly brick for insurance and resale reasons. Stucco accent walls are common but full stucco exteriors are rare.' },
};

const materialComparison = [
  { category: 'Hail Resistance', brick: '⭐⭐⭐⭐⭐ Excellent', stucco: '⭐⭐ Poor (EIFS) / ⭐⭐⭐ Moderate (hard coat)' },
  { category: 'DFW Resale Preference', brick: '⭐⭐⭐⭐⭐ Strong buyer preference', stucco: '⭐⭐⭐ Neutral to slight negative' },
  { category: 'Maintenance (20 yr)', brick: '$500–$2,000', stucco: '$3,000–$12,000′ },
  { category: 'Insurance Premium', brick: 'Standard rates', stucco: '+10–25% in high-hail zones' },
  { category: 'Install Cost', brick: '$15–$30/sq ft', stucco: '$8–$20/sq ft' },
  { category: 'Heat Performance', brick: 'Excellent thermal mass', stucco: 'Good with proper insulation' },
];

export default function DFWStuccoVsBrickGuide() {
  const [location, setLocation] = useState('');
  const [homeStyle, setHomeStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { hail: typeof hailData[string]; costNote: string }>(null);

  function calculate() {
    if (!location || !homeStyle || !budget) return;
    const hail = hailData[location] || hailData['North Dallas / Plano / Frisco'];
    const costNote = budget === 'Under $10,000'
      ? 'At this budget, focus on repairs and painting rather than full re-siding. Repointing brick or patching stucco is achievable.'
      : budget === '$10,000–$25,000'
      ? 'Sufficient for partial brick veneer accent work or full stucco re-coat with repairs on a typical home.'
      : 'Full exterior residing or brick veneer on most DFW homes is achievable. Get 3 contractor bids.';
    setResult({ hail, costNote });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642′ }}>🧱 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Stucco vs Brick — DFW Exterior Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6′ }}>In a region that takes a direct hailstorm hit every 2–3 years, exterior material choice is one of the most consequential decisions a DFW homeowner makes.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>📊 Side-by-Side Comparison</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {materialComparison.map(row => (
              <div key={row.category} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
                <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.category}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div><span style={{ color: '#F5E642', fontSize: '11px', fontWeight: '600′ }}>BRICK: </span><span style={{ color: '#CBD5E1', fontSize: '13px' }}>{row.brick}</span></div>
                  <div><span style={{ color: '#94A3B8', fontSize: '11px', fontWeight: '600′ }}>STUCCO: </span><span style={{ color: '#CBD5E1', fontSize: '13px' }}>{row.stucco}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>🌩️ The Stucco Insurance Problem in DFW</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7', marginBottom: '12px' }}>Several major insurers have stopped writing policies on EIFS (synthetic stucco) homes in DFW altogether. Traditional 3-coat hard coat stucco is more insurable but still carries premium surcharges in high-hail zip codes. If you're buying a stucco home in DFW, verify insurability before closing.</p>
          <div style={{ backgroundColor: '#7F1D1D', borderRadius: '8px', padding: '14px' }}>
            <div style={{ color: '#FCA5A5', fontWeight: '600', marginBottom: '4px' }}>⚠️ EIFS Warning</div>
            <p style={{ color: '#FCA5A5', fontSize: '13px', margin: 0 }}>EIFS (Exterior Insulation and Finish System / synthetic stucco) looks identical to hard coat but has essentially zero hail resistance. Hail damage in DFW can be total after a single storm. Know which type you have before buying or building.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Material Recommendation</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your DFW location...</option>
              {locations.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={homeStyle} onChange={e => setHomeStyle(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select home style...</option>
              {homeStyles.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your budget...</option>
              {budgets.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get Material Recommendation →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>✅ Your DFW Area Assessment</h2>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>Hail Risk Zone</div>
              <div style={{ color: '#EF4444', fontWeight: '700', fontSize: '18px', marginBottom: '8px' }}>{result.hail.zone} — {result.hail.avgClaims}</div>
              <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>{result.hail.recommendation}</p>
            </div>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '16px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', marginBottom: '4px' }}>Budget Note</div>
              <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>{result.costNote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
