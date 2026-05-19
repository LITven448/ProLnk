import { useState } from 'react';

const COUNTIES: Record<string, number> = {
  'Dallas County': 0.02075,
  'Tarrant County': 0.02240,
  'Collin County': 0.01820,
  'Denton County': 0.01950,
  'Rockwall County': 0.02010,
  'Kaufman County': 0.02180,
  'Ellis County': 0.02050,
};

const GROWTH_RATE = 0.065;

export default function DFWPropertyTaxProjection() {
  const [value, setValue] = useState(450000);
  const [county, setCounty] = useState('Dallas County');
  const [homestead, setHomestead] = useState(true);
  const [protest, setProtest] = useState(false);

  const rate = COUNTIES[county];
  const exemption = homestead ? 100000 : 0;
  const taxableValue = Math.max(0, value - exemption);
  const currentTax = Math.round(taxableValue * rate);
  const monthlyEscrow = Math.round(currentTax / 12);
  const protestSaving = protest ? Math.round(currentTax * 0.12) : 0;
  const effectiveTax = currentTax - protestSaving;

  const projections = Array.from({ length: 5 }, (_, i) => {
    const projValue = Math.round(value * Math.pow(1 + GROWTH_RATE, i + 1));
    const projTaxable = Math.max(0, projValue - exemption);
    return {
      year: 2027 + i,
      value: projValue,
      tax: Math.round(projTaxable * rate),
    };
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏛️</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2744', margin: 0 }}>DFW Property Tax Projection</h1>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>Know what's coming before the DCAD notice arrives</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Appraised Value</label>
              <input type="range" min={100000} max={2000000} step={10000} value={value}
                onChange={e => setValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1a2744′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#1a2744', fontSize: '1.1rem' }}>${value.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.85rem' }}>County</label>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #ddd', background: '#fff', color: '#1a2744', fontSize: '0.9rem' }}>
                {Object.keys(COUNTIES).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#1a2744′ }}>
              <input type="checkbox" checked={homestead} onChange={e => setHomestead(e.target.checked)} style={{ accentColor: '#1a2744', width: 18, height: 18 }} />
              Homestead Exemption ($100K)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#1a2744′ }}>
              <input type="checkbox" checked={protest} onChange={e => setProtest(e.target.checked)} style={{ accentColor: '#1a2744', width: 18, height: 18 }} />
              Model Protest Impact (~12% reduction)
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.25rem', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F5E642′ }}>${effectiveTax.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>2026 Tax Bill{protest ? ' (after protest)' : ''}</div>
          </div>
          <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.25rem', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F5E642′ }}>${monthlyEscrow}</div>
            <div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>Monthly Escrow Needed</div>
          </div>
          <div style={{ background: protest ? '#2e7d32′ : '#1a2744', borderRadius: 12, padding: '1.25rem', textAlign: ’center', color: '#fff' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F5E642′ }}>${protestSaving.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>Protest Savings Est.</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: '#1a2744′ }}>📈 5-Year Projection ({(GROWTH_RATE * 100).toFixed(1)}% annual growth)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
            {projections.map(p => (
              <div key={p.year} style={{ textAlign: 'center', padding: '0.75rem', background: '#f0f2f5', borderRadius: 10 }}>
                <div style={{ fontWeight: 700, color: '#1a2744', fontSize: '0.85rem' }}>{p.year}</div>
                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.25rem' }}>${Math.round(p.value / 1000)}K</div>
                <div style={{ fontWeight: 800, color: '#d32f2f', fontSize: '1rem' }}>${p.tax.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.75rem', marginTop: '1.5rem' }}>DFW appraisal districts cap homestead increases at 10%/yr. Projection assumes market rate growth.</p>
      </div>
    </div>
  );
}
