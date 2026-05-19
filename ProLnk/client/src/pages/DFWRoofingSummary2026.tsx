import { useState } from 'react';

const ROOF_AGES: Record<string, { material: string; status: string; action: string }> = {
  '0-5': { material: 'Near-new roof', status: 'Low risk — inspect after every hail event over 3/4 inch. Document condition with photos annually.', action: 'Annual inspection + hail monitoring app. File insurance claim if Class 4 impact found.' },
  '6-10': { material: 'Mid-life roof', status: 'Peak insurance claim window in DFW. One good hail storm may qualify for full replacement at no cost if you have RCV policy.', action: 'Verify you have Replacement Cost Value (not ACV) insurance. Get inspection after next storm.' },
  '11-15': { material: 'Aging roof', status: 'Granule loss accelerating in DFW heat. Valleys and penetrations likely showing wear. Insurance renewals may require inspection.', action: 'Professional inspection now. Plan replacement budget: $12K–$22K for average DFW home.' },
  '16-20': { material: 'Near-end-of-life', status: 'Asphalt shingles last 15–20 years in DFW UV/heat cycle — shorter than northern US. Replacement is imminent.', action: 'Replace before next hail season (April–June). Class 4 impact-resistant = 20–40% insurance discount.' },
  '20+': { material: 'Past useful life', status: 'Structural risk — decking may be compromised. Insurance non-renewal common. Leaks likely active or developing.', action: 'Emergency replacement — do not wait. Get 3 bids, verify decking inspection is included.' },
};

const DFW_AREAS = ['North Dallas', 'South Dallas', 'East Fort Worth', 'West Fort Worth', 'Plano/Allen', 'Frisco/McKinney', 'Arlington/Mansfield', 'Irving/Grand Prairie'];

export default function DFWRoofingSummary2026() {
  const [roofAge, setRoofAge] = useState('');
  const [area, setArea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const ageKey = Object.keys(ROOF_AGES).find(k => {
    if (!roofAge) return false;
    const yr = parseInt(roofAge);
    if (k === '0-5') return yr >= 0 && yr <= 5;
    if (k === '6-10') return yr >= 6 && yr <= 10;
    if (k === '11-15') return yr >= 11 && yr <= 15;
    if (k === '16-20') return yr >= 16 && yr <= 20;
    if (k === '20+') return yr > 20;
    return false;
  });

  const profile = ageKey ? ROOF_AGES[ageKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 28 }}>🏠</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Roofing Knowledge Summary 2026</h1>
          <p style={{ color: '#8B9BB4', margin: 0 }}>Hail alley, material options, Class 4 impact ratings, insurance implications, and how to vet DFW roofers.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🌨️', title: 'Hail Alley Reality', body: 'DFW sits at the core of the most hail-active corridor in the US. Average 3–5 hail events per year. Storms in April–June 2024 caused $4B+ in insured roofing losses across North Texas.' },
            { icon: '🛡️', title: 'Class 4 Impact-Resistant', body: 'Class 4 shingles (UL 2218 rated) withstand 2-inch steel ball drops. Most DFW insurers offer 20–40% premium discount. Pays back in 2–4 years on average DFW policy.' },
            { icon: '📋', title: 'Insurance Implications', body: 'ACV vs RCV policy is the critical distinction. ACV subtracts depreciation — a 15-year-old roof may net you $3K on a $20K replacement. RCV pays full replacement cost. Check your policy today.' },
            { icon: '⚠️', title: 'Vetting DFW Roofers', body: '"Storm chasers" flood DFW after every hail event — unlicensed, uninsured, gone before leaks appear. Require: Texas contractor registration, 10-year workmanship warranty, local references, and pull permit.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2140', borderRadius: 10, padding: 18, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 14, color: '#A8B8CC', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 18 }}>🏠 Personalized Roofing Summary</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <input placeholder="Roof age in years (e.g. 12)" value={roofAge} onChange={e => setRoofAge(e.target.value)} style={{ flex: 1, minWidth: 180, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }} />
            <select value={area} onChange={e => setArea(e.target.value)} style={{ flex: 1, minWidth: 160, background: '#0A1628', border: '1px solid #2A4A6F', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 14 }}>
              <option value="">Select DFW area</option>
              {DFW_AREAS.map(a => <option key={a}>{a}</option>)}
            </select>
            <button onClick={() => setSubmitted(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>Generate</button>
          </div>
          {submitted && profile && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>Age: {ageKey} years — {profile.material}</div>
              <div style={{ color: '#FF8C69', marginBottom: 6, fontSize: 14 }}>⚠️ {profile.status}</div>
              <div style={{ color: '#6EE7B7', fontSize: 14 }}>✅ {profile.action}</div>
              {area && <div style={{ marginTop: 10, color: '#8B9BB4', fontSize: 13 }}>📍 {area}: All DFW areas face similar hail exposure. North Dallas and Plano corridors average slightly higher severity per storm track data. Always verify Class 4 rating before replacing post-storm.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>🤝 ProLnk Roofing Partners</div>
          <p style={{ color: '#8B9BB4', fontSize: 14, margin: 0 }}>ProLnk only lists Texas-registered roofing contractors with verified insurance, local reviews, and warranty documentation. No storm chasers. Warranty transfers are confirmed in writing before listing.</p>
        </div>
      </div>
    </div>
  );
}
