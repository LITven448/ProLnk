import { useState } from 'react';

const ductTypes = ['Flex Duct', 'Rigid Metal (Sheet Metal)', 'Fiberduct (Ductboard)'];
const conditions = ['Standard Attic (120-150°F)', 'Extreme Attic (150°F+)', 'Interior Walls', 'Crawl Space'];

const assessments: Record<string, Record<string, { rating: string; notes: string; cost: string }>> = {
  'Flex Duct': {
    'Standard Attic (120-150°F)': { rating: '⚠️ Marginal', notes: 'Flex duct degrades faster in DFW heat. Inspect every 5 years. Ensure R-8 insulation. Avoid sharp bends.', cost: '$8–$12 per linear ft installed' },
    'Extreme Attic (150°F+)': { rating: '🔴 Poor Choice', notes: 'At 150°F+, flex duct liner deteriorates rapidly. Expect 10–15 year lifespan. Replace with rigid metal.', cost: '$8–$12 per linear ft (replace sooner)' },
    'Interior Walls': { rating: '✅ Acceptable', notes: 'Protected from DFW heat extremes. Flex works well in conditioned spaces.', cost: '$6–$10 per linear ft installed' },
    'Crawl Space': { rating: '⚠️ Marginal', notes: 'Moisture risk in DFW humidity. Ensure vapor barrier below. Check annually for sags and disconnects.', cost: '$8–$12 per linear ft installed' },
  },
  'Rigid Metal (Sheet Metal)': {
    'Standard Attic (120-150°F)': { rating: '✅ Best Choice', notes: 'Gold standard for DFW attics. Withstands 150°F+ indefinitely. Requires external R-8 wrap insulation.', cost: '$18–$28 per linear ft installed' },
    'Extreme Attic (150°F+)': { rating: '✅ Best Choice', notes: 'Only material that performs reliably at extreme DFW attic temps. Lasts 30+ years.', cost: '$18–$28 per linear ft installed' },
    'Interior Walls': { rating: '✅ Excellent', notes: 'Durable, low leakage. Best long-term option for interior runs.', cost: '$15–$25 per linear ft installed' },
    'Crawl Space': { rating: '✅ Excellent', notes: 'Moisture-resistant. Pair with R-6 wrap minimum. Check for condensation on cold surfaces.', cost: '$18–$28 per linear ft installed' },
  },
  'Fiberduct (Ductboard)': {
    'Standard Attic (120-150°F)': { rating: '⚠️ Marginal', notes: 'Fiberduct absorbs moisture and can delaminate in DFW humidity. Lifespan 15–20 years in attic conditions.', cost: '$10–$16 per linear ft installed' },
    'Extreme Attic (150°F+)': { rating: '🔴 Poor Choice', notes: 'Delamination risk high above 140°F. Not recommended for DFW extreme attic spaces.', cost: '$10–$16 per linear ft (replace proactively)' },
    'Interior Walls': { rating: '✅ Acceptable', notes: 'Works well in conditioned spaces. Built-in R-value. Less common than flex or metal.', cost: '$10–$15 per linear ft installed' },
    'Crawl Space': { rating: '🔴 Poor Choice', notes: 'High moisture absorption risk in crawl space. Avoid in DFW crawl spaces entirely.', cost: 'Not recommended' },
  },
};

export default function DFWHVACDuctMaterialGuide() {
  const [ductType, setDuctType] = useState('');
  const [condition, setCondition] = useState('');
  const result = ductType && condition ? assessments[ductType]?.[condition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌡️ Duct Material Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW attics reach 150°F in summer. Not all duct materials handle that heat equally. Use this guide to assess your duct material choice for your specific installation location.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Key DFW Duct Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>DFW attic temps: 130–150°F in July–August</li>
            <li>R-8 minimum insulation required for attic ducts in DFW climate zone</li>
            <li>Flex duct lifespan in DFW attics: 15–20 years (vs 30+ for rigid metal)</li>
            <li>Every inch of uninsulated duct in a 150°F attic loses conditioned air efficiency</li>
          </ul>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Material Assessment Tool</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your duct material</label>
          <select value={ductType} onChange={e => setDuctType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value=''>Select duct type...</option>
            {ductTypes.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Installation location</label>
          <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value=''>Select location...</option>
            {conditions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{result.rating}</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>{result.notes}</p>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 Cost: {result.cost}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Get a free duct inspection from a ProLnk-verified DFW HVAC contractor. Compare quotes with no obligation.</p>
        </div>
      </div>
    </div>
  );
}
