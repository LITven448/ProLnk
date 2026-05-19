import { useState } from 'react';

const MATERIALS = [
  { name: 'Brick Veneer', install: 18, maintenance: 0.8, lifespan: 75, hailRating: 'Excellent', hoa: 'Always', beauty: '★★★★☆' },
  { name: 'Fiber Cement (HardiePlank)', install: 10, maintenance: 1.2, lifespan: 50, hailRating: 'Very Good', hoa: 'Usually', beauty: '★★★★☆' },
  { name: 'Vinyl Siding', install: 5, maintenance: 0.3, lifespan: 30, hailRating: 'Poor', hoa: 'Sometimes', beauty: '★★★☆☆' },
  { name: 'Stucco / EIFS', install: 12, maintenance: 1.8, lifespan: 30, hailRating: 'Poor', hoa: 'Usually', beauty: '★★★★☆' },
  { name: 'Wood Siding', install: 14, maintenance: 3.5, lifespan: 25, hailRating: 'Fair', hoa: 'Usually', beauty: '★★★★★' },
  { name: 'Stone Veneer (MSV)', install: 20, maintenance: 1.0, lifespan: 40, hailRating: 'Fair', hoa: 'Varies', beauty: '★★★★★' },
  { name: 'Natural Stone', install: 45, maintenance: 0.5, lifespan: 100, hailRating: 'Excellent', hoa: 'Always', beauty: '★★★★★' },
];

const RECOMMENDATIONS: Record<string, Record<string, { topPick: string; runner: string; avoid: string; rationale: string }>> = {
  low: {
    durability: { topPick: 'Fiber Cement (HardiePlank)', runner: 'Vinyl Siding', avoid: 'Wood Siding', rationale: 'Fiber cement gives DFW homeowners the best value — resists hail, UV, and termites at a fraction of brick cost. Vinyl is acceptable but hail rating is poor for DFW storm seasons.' },
    beauty: { topPick: 'Fiber Cement (HardiePlank)', runner: 'Vinyl Siding', avoid: 'Stucco / EIFS', rationale: 'Fiber cement offers painted wood aesthetics at lower cost. Avoid stucco in this budget range — installation corners get cut and DFW moisture causes failure within 10 years.' },
    resale: { topPick: 'Fiber Cement (HardiePlank)', runner: 'Brick Veneer (partial)', avoid: 'Vinyl Siding', rationale: 'Fiber cement adds more resale value per dollar spent than vinyl. Even partial brick accent (front facade) boosts DFW appraisals significantly.' },
  },
  medium: {
    durability: { topPick: 'Brick Veneer', runner: 'Fiber Cement (HardiePlank)', avoid: 'Stucco / EIFS', rationale: 'At mid-range budget, brick veneer is the clear DFW choice. 75-year lifespan, excellent hail resistance, and low maintenance offset the higher install cost over 20 years.' },
    beauty: { topPick: 'Stone Veneer (MSV)', runner: 'Brick Veneer', avoid: 'Vinyl Siding', rationale: 'MSV delivers premium aesthetics. Ensure proper flashing and drainage plane in DFW installs — MSV moisture failure is expensive.' },
    resale: { topPick: 'Brick Veneer', runner: 'Stone Veneer (MSV)', avoid: 'Stucco / EIFS', rationale: 'Brick consistently tops DFW resale value studies. Buyers recognize brick’s permanence. Stucco/EIFS actually discounts some DFW buyers due to known failure issues.' },
  },
  high: {
    durability: { topPick: 'Natural Stone', runner: 'Brick Veneer', avoid: 'Stucco / EIFS', rationale: 'Natural limestone (DFW native) lasts 100+ years with minimal maintenance. Install cost is high but 20-year total cost is often lower than alternatives due to near-zero maintenance.' },
    beauty: { topPick: 'Natural Stone', runner: 'Stone Veneer (MSV)', avoid: 'Vinyl Siding', rationale: 'Natural stone is the DFW luxury exterior standard. Quarried Texas limestone weathers authentically and is always HOA-approved.' },
    resale: { topPick: 'Natural Stone', runner: 'Brick Veneer', avoid: 'Vinyl Siding', rationale: 'Natural stone + brick are the two highest DFW resale performers. Natural stone luxury homes in Southlake, Frisco, and Prosper command 8-15% premium over comparable vinyl exteriors.' },
  },
};

function totalCost(mat: typeof MATERIALS[0], sqft: number) {
  const install = mat.install * sqft;
  const maintenance20 = mat.maintenance * sqft * 20;
  return Math.round(install + maintenance20);
}

export default function DFWExteriorMaterialCostGuide() {
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const [sqft, setSqft] = useState(2000);
  const [result, setResult] = useState<{ topPick: string; runner: string; avoid: string; rationale: string } | null>(null);

  function analyze() {
    const data = RECOMMENDATIONS[budget]?.[priority];
    setResult(data ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>💰 DFW EXTERIOR COST GUIDE</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.75rem' }}>DFW Exterior Material Cost Comparison</h1>
          <p style={{ color: '#8899AA', lineHeight: 1.6, margin: 0 }}>
            Compare every major exterior material by DFW-specific install cost, 20-year maintenance, lifespan, hail rating, and HOA acceptance. Get a material recommendation matched to your budget and priorities.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1E3A5F' }}>
                {['Material', 'Install $/sq ft', 'Maint $/sq ft/yr', 'DFW Lifespan', 'Hail Rating', 'HOA', 'Curb Appeal'].map(h => (
                  <th key={h} style={{ color: '#F5E642', fontWeight: 700, padding: '0.6rem 0.75rem', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map((m, i) => (
                <tr key={m.name} style={{ background: i % 2 === 0 ? '#111E35′ : '#0D1929', borderBottom: '1px solid #1E3A5F' }}>
                  <td style={{ padding: '0.65rem 0.75rem', fontWeight: 600, color: '#E8EDF5', whiteSpace: 'nowrap' }}>{m.name}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#4CAF50', fontWeight: 700 }}>${m.install}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#C5D3E0′ }}>${m.maintenance}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#C5D3E0′ }}>{m.lifespan} yrs</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: m.hailRating === 'Excellent' ? '#4CAF50′ : m.hailRating === ’Poor' ? '#FF6B6B' : '#F5E642′ }}>{m.hailRating}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#C5D3E0′ }}>{m.hoa}</td>
                  <td style={{ padding: '0.65rem 0.75rem', color: '#C5D3E0′ }}>{m.beauty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 0.75rem' }}>🧮 20-Year Total Cost Calculator</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <label style={{ color: '#8899AA', fontSize: '0.85rem' }}>Exterior sq ft:</label>
            <input type='number' value={sqft} onChange={e => setSqft(Number(e.target.value))} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.4rem 0.75rem', width: '100px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.65rem' }}>
            {MATERIALS.map(m => (
              <div key={m.name} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.75rem' }}>
                <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.3rem' }}>{m.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem' }}>${totalCost(m, sqft).toLocaleString()}</div>
                <div style={{ color: '#8899AA', fontSize: '0.7rem' }}>20-year total</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, margin: '0 0 1.25rem' }}>🏆 Material Recommendation Engine</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select budget</option>
                <option value='low'>Low — under $12/sq ft</option>
                <option value='medium'>Medium — $12-25/sq ft</option>
                <option value='high'>High — $25+/sq ft</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>Top Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '6px', color: '#E8EDF5', padding: '0.5rem' }}>
                <option value=''>Select priority</option>
                <option value='durability'>Durability / hail resistance</option>
                <option value='beauty'>Curb appeal / aesthetics</option>
                <option value='resale'>Resale value / appraisal</option>
              </select>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.65rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
            Get My Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.75rem' }}>
              {[['✅ Top Pick', result.topPick], ['🥈 Runner-Up', result.runner], ['❌ Avoid', result.avoid], ['💡 DFW Rationale', result.rationale]].map(([label, val]) => (
                <div key={label as string} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', padding: '0.85rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.4rem' }}>{label}</div>
                  <div style={{ color: '#C5D3E0', fontSize: '0.875rem', lineHeight: 1.6 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
