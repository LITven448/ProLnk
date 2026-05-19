import { useState } from 'react';

const inspectionTypes = [
  { type: 'General Home Inspection (includes roof)', cost: '$0 incremental', range: 'Included in $350–600 home inspection', covers: 'Visual walk-on inspection, basic condition, obvious defects', limit: 'Limited depth — inspectors flag big issues but miss granule loss, boot condition, flashing details' },
  { type: 'Standalone Roofing Inspection', cost: '$150–300', range: '$150–300 in DFW', covers: 'Full shingle-by-shingle assessment, flashing, boots, valleys, penetrations, attic from inside', limit: 'Some free inspections from roofers may be biased toward recommending replacement' },
  { type: 'Drone Roof Inspection', cost: '$150–350', range: '$150–350 in DFW', covers: 'High-resolution aerial imagery, hard-to-access areas, useful for steep or high roofs', limit: 'Cannot assess granule adhesion or boot elasticity — requires visual touch-points' },
  { type: 'Insurance Claim Inspection', cost: '$0', range: 'Free (adjuster)', covers: 'Storm damage assessment for hail, wind — focused on claim-qualifying damage', limit: 'Adjuster works for insurer — consider hiring a public adjuster for large claims' },
];

const purposes = [
  { label: 'Buying a home', rec: 'Standalone Roofing Inspection', why: 'A general inspection may miss expensive issues. A dedicated roofing inspector catches flashing failures, boot aging, and hail damage the general inspector will miss. Well worth $200 in DFW.' },
  { label: 'After a DFW hail storm', rec: 'Insurance Claim Inspection + Standalone', why: 'File an insurance claim immediately (DFW averages 5+ hail events per year). Have an independent roofer document damage before the adjuster arrives.' },
  { label: 'Roof is 10–15 years old', rec: 'Standalone Roofing Inspection', why: 'At 10–15 years in DFW heat, granule loss and boot degradation are common. A $150–200 inspection can catch issues before they become $10,000 water damage.' },
  { label: 'Steep or hard-to-access roof', rec: 'Drone Inspection', why: 'Drone inspection is safer and captures areas difficult for a walker — great for steep DFW roofs or homes with complex rooflines.' },
  { label: 'Annual maintenance check', rec: 'Standalone Roofing Inspection', why: 'Many DFW roofers offer annual inspection programs for $100–200. Catching small issues annually beats a full replacement by years.' },
];

export default function DFWRoofInspectionCost() {
  const [purpose, setPurpose] = useState('');
  const [result, setResult] = useState<null | typeof purposes[0]>(null);

  function recommend() {
    const match = purposes.find(p => p.label === purpose);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ROOF GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Roof Inspection Costs in DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: 32 }}>
          DFW ranks among the top US markets for roofing activity — 5+ hail events per year, extreme UV exposure, and strong storm seasons make roof maintenance critical. Here is what different inspection types cost and cover.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 32, fontWeight: 700 }}>
          📌 Standalone roofing inspection in DFW: $150–$300 · Most roofers offer free inspections (with bias risk)
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Inspection Types Compared</h2>
        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {inspectionTypes.map(t => (
            <div key={t.type} style={{ background: '#111F3A', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.type}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{t.cost}</div>
              </div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>COVERS: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{t.covers}</span>
              </div>
              <div>
                <span style={{ color: '#FF9900', fontSize: 12, fontWeight: 700 }}>LIMIT: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{t.limit}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏠 Get a DFW Inspection Recommendation</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 8 }}>What is your situation?</label>
          <select value={purpose} onChange={e => setPurpose(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, marginBottom: 14, boxSizing: 'border-box' }}>
            <option value="">Select your situation...</option>
            {purposes.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
          </select>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Recommended: {result.rec}</div>
              <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{result.why}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111F3A', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Roof Inspection Red Flags</div>
          <ul style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Free inspection from a roofer who immediately recommends full replacement</li>
            <li>Inspector does not go on the roof (drive-by inspections miss most defects)</li>
            <li>No written report with photos — verbal-only assessments are unverifiable</li>
            <li>Company not licensed in Texas (required for paid roofing inspections)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
