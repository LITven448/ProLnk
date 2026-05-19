import { useState } from 'react';

const BUILD_TYPES = ['Standard Wood Frame', 'Brick Veneer', 'Full Brick Masonry', 'Custom / High-End', 'Manufactured Home'];
const HOME_SIZES = ['Under 1,500 sqft', '1,500-2,500 sqft', '2,500-3,500 sqft', '3,500-5,000 sqft', 'Over 5,000 sqft'];

const costPerSqft: Record<string, number> = {
  'Standard Wood Frame': 155,
  'Brick Veneer': 175,
  'Full Brick Masonry': 210,
  'Custom / High-End': 260,
  'Manufactured Home': 85,
};

const sizeMidpoints: Record<string, number> = {
  'Under 1,500 sqft': 1200,
  '1,500-2,500 sqft': 2000,
  '2,500-3,500 sqft': 3000,
  '3,500-5,000 sqft': 4200,
  'Over 5,000 sqft': 6000,
};

function formatDollars(n: number) {
  return '$' + n.toLocaleString();
}

export default function DFWHomeReplacementCostGuide() {
  const [buildType, setBuildType] = useState('Brick Veneer');
  const [homeSize, setHomeSize] = useState('2,500-3,500 sqft');
  const [currentCoverage, setCurrentCoverage] = useState('350000');

  const sqft = sizeMidpoints[homeSize] ?? 2000;
  const rate = costPerSqft[buildType] ?? 155;
  const replacementCost = sqft * rate;
  const coverage = parseFloat(currentCoverage.replace(/[^0-9.]/g, '')) || 0;
  const gap = replacementCost - coverage;
  const coverageStatus = coverage >= replacementCost ? 'adequate' : coverage >= replacementCost * 0.8 ? 'marginal' : 'underinsured';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🏠 DFW Home Replacement Cost Guide
        </div>
        <p style={{ color: '#94A3B8', marginBottom: '1.5rem' }}>
          In DFW, your home's market value (what you’d sell for) and replacement cost (what it costs to rebuild) can differ by 30-60%. Most DFW homeowners are significantly underinsured — especially after DFW home values surged.
        </p>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.8rem' }}>💡 Market Value vs Replacement Cost in DFW</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem' }}>
            {[
              { label: 'Market Value', desc: 'What buyers will pay — includes land, location, DFW appreciation. Insurance does NOT cover land.' },
              { label: 'Replacement Cost', desc: 'Labor + materials to rebuild the same structure. DFW construction costs: $150-260/sqft depending on quality.' },
              { label: 'DFW Appreciation Risk', desc: 'DFW values up 40%+ since 2020 — many policies set before appreciation are now 30% short.' },
              { label: 'Coinsurance Penalty', desc: 'If insured below 80% of replacement cost, insurance may only pay a portion of your claim — even for partial losses.' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</div>
                <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.3rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔧 Replacement Cost Calculator</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Build Type</div>
              <select value={buildType} onChange={e => setBuildType(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {BUILD_TYPES.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Home Size</div>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem' }}>
                {HOME_SIZES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Current Coverage ($)</div>
              <input
                type="number"
                value={currentCoverage}
                onChange={e => setCurrentCoverage(e.target.value)}
                placeholder="e.g. 350000″
                style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D4060', borderRadius: 6, padding: '0.5rem', width: 130 }}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Est. DFW Replacement Cost</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.3rem', marginTop: '0.3rem' }}>{formatDollars(replacementCost)}</div>
              <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{formatDollars(rate)}/sqft × {sqft.toLocaleString()} sqft</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Coverage Status</div>
              <div style={{ color: coverageStatus === 'adequate' ? '#22C55E' : coverageStatus === 'marginal' ? '#F59E0B' : '#EF4444', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.3rem' }}>
                {coverageStatus === 'adequate' ? '✅ Adequate' : coverageStatus === 'marginal' ? '⚠️ Marginal' : '🚨 Underinsured'}
              </div>
              {gap > 0 && <div style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.3rem' }}>Gap: {formatDollars(gap)}</div>}
              {gap <= 0 && <div style={{ color: '#22C55E', fontSize: '0.8rem', marginTop: '0.3rem' }}>Surplus: {formatDollars(Math.abs(gap))}</div>}
            </div>
          </div>
          {coverageStatus !== 'adequate' && (
            <div style={{ background: '#3A1E1E', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#EF4444', fontWeight: 600, marginBottom: '0.5rem' }}>🚨 Action Required</div>
              <ul style={{ color: '#94A3B8', paddingLeft: '1.5rem', lineHeight: 1.8, fontSize: '0.85rem' }}>
                <li>Contact your insurer to request a replacement cost estimator (free)</li>
                <li>Ask about guaranteed replacement cost or extended replacement cost endorsements</li>
                <li>Review your policy annually — especially after DFW appreciation cycles</li>
                {coverageStatus === 'underinsured' && <li>Consider hiring a licensed appraiser for a formal replacement cost appraisal (~$300-500)</li>}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.5rem' }}>📊 DFW Construction Cost Benchmarks (2026)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.6rem' }}>
            {BUILD_TYPES.map(bt => (
              <div key={bt} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ color: '#E8EDF5', fontSize: '0.85rem' }}>{bt}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{formatDollars(costPerSqft[bt])}/sqft</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: '#64748B', fontSize: '0.8rem', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted insurance consultants and licensed appraisers.
        </div>
      </div>
    </div>
  );
}
