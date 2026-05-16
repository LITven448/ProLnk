import { useState } from 'react';

const finishLevels: Record<string, { mult: number; label: string }> = {
  standard: { mult: 150, label: 'Standard Finish ($150/sq ft)' },
  mid: { mult: 200, label: 'Mid-Range Finish ($200/sq ft)' },
  high: { mult: 260, label: 'High-End Finish ($260/sq ft)' },
  luxury: { mult: 310, label: 'Luxury Finish ($310/sq ft)' },
};

const dfwLocations: Record<string, { taxRate: number; label: string; ceiling: string }> = {
  dallas: { taxRate: 2.5, label: 'Dallas City', ceiling: '$450K–$600K' },
  plano: { taxRate: 2.1, label: 'Plano / Allen', ceiling: '$550K–$800K' },
  frisco: { taxRate: 2.3, label: 'Frisco / McKinney', ceiling: '$600K–$900K' },
  fortworth: { taxRate: 2.2, label: 'Fort Worth', ceiling: '$380K–$520K' },
  arlington: { taxRate: 2.4, label: 'Arlington / Grand Prairie', ceiling: '$360K–$480K' },
};

export default function DFWBedroomAdditionCost() {
  const [sqft, setSqft] = useState(200);
  const [finish, setFinish] = useState('mid');
  const [location, setLocation] = useState('plano');

  const fl = finishLevels[finish];
  const loc = dfwLocations[location];
  const costLow = sqft * fl.mult;
  const costHigh = sqft * (fl.mult * 1.2);
  const annualTaxIncrease = Math.round(((costLow + costHigh) / 2) * (loc.taxRate / 100));
  const valueAdd = Math.round(costLow * 0.65);
  const valueAddHigh = Math.round(costHigh * 0.8);

  const buyBiggerLow = costLow + 15000;
  const buyBiggerHigh = costHigh + 25000;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bedroom Addition Cost Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth · 2026 · Home Addition vs. Moving Comparison</p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Addition Size: {sqft} sq ft</label>
          <input type="range" min={100} max={600} step={25} value={sqft} onChange={e => setSqft(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', marginBottom: '0.25rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.78rem' }}>
            <span>100 sq ft (small bedroom)</span><span>600 sq ft (master suite)</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Finish Level</label>
            <select value={finish} onChange={e => setFinish(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              {Object.entries(finishLevels).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              {Object.entries(dfwLocations).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>📊 Full Analysis</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
            <span style={{ color: '#cbd5e1' }}>Addition Cost ({sqft} sq ft)</span>
            <span style={{ fontWeight: 700 }}>${costLow.toLocaleString()} – ${costHigh.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
            <span style={{ color: '#cbd5e1' }}>Estimated Value Added</span>
            <span style={{ fontWeight: 700, color: '#4ade80' }}>+${valueAdd.toLocaleString()} – ${valueAddHigh.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
            <span style={{ color: '#cbd5e1' }}>Annual Tax Increase ({loc.taxRate}% rate)</span>
            <span style={{ fontWeight: 700, color: '#f87171' }}>+${annualTaxIncrease.toLocaleString()}/yr</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #2d3f5e' }}>
            <span style={{ color: '#cbd5e1' }}>Neighborhood Value Ceiling</span>
            <span style={{ fontWeight: 700, color: '#fbbf24' }}>{loc.ceiling}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', fontSize: '0.85rem' }}>
            <span style={{ color: '#64748b' }}>vs. Buying Bigger (move + transaction costs)</span>
            <span style={{ color: '#64748b' }}>${buyBiggerLow.toLocaleString()} – ${buyBiggerHigh.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>💡 Add vs. Move Decision Framework</div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0 0 0.75rem' }}>If your home is already near the neighborhood ceiling ({loc.ceiling}), the addition may not fully recoup its cost at resale. In that case, buying a larger home in the same area may yield better returns — though agent fees, moving costs, and mortgage resets often total $25K–$50K+.</p>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>If you plan to stay 7+ years, the addition almost always wins on quality-of-life and cost basis.</p>
        </div>
      </div>
    </div>
  );
}
