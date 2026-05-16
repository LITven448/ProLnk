import { useState } from 'react';

const NEIGHBORHOOD_TIERS: Record<string, { label: string; expectedPool: boolean; baseImpact: number }> = {
  luxury: { label: 'Luxury (Southlake, Westlake, Highland Park)', expectedPool: true, baseImpact: 50000 },
  upscale: { label: 'Upscale (Frisco Estates, Prosper, Celina)', expectedPool: true, baseImpact: 35000 },
  midrange: { label: 'Mid-Range (McKinney, Flower Mound, Keller)', expectedPool: false, baseImpact: 22000 },
  standard: { label: 'Standard (Garland, Richardson, Euless)', expectedPool: false, baseImpact: 14000 },
  entry: { label: 'Entry Level (South Dallas, Mesquite)', expectedPool: false, baseImpact: 8000 },
};

const POOL_SIZES: Record<string, { label: string; factor: number }> = {
  small: { label: 'Small (< 400 sq ft)', factor: 0.75 },
  medium: { label: 'Medium (400–600 sq ft)', factor: 1.0 },
  large: { label: 'Large (600–900 sq ft)', factor: 1.25 },
  resort: { label: 'Resort Style (900+ sq ft + spa)', factor: 1.55 },
};

const POOL_CONDITIONS: Record<string, { label: string; factor: number; annualCost: number }> = {
  new: { label: 'New / Excellent (< 3 years)', factor: 1.1, annualCost: 2400 },
  good: { label: 'Good (3–10 years)', factor: 1.0, annualCost: 3200 },
  fair: { label: 'Fair (10–20 years, dated equipment)', factor: 0.82, annualCost: 4800 },
  poor: { label: 'Poor (20+ years, needs resurfacing)', factor: 0.55, annualCost: 7500 },
};

export default function DFWPoolValueGuide() {
  const [tier, setTier] = useState('midrange');
  const [size, setSize] = useState('medium');
  const [cond, setCond] = useState('good');
  const [result, setResult] = useState<{ value: number; cost: number; ratio: number; expected: boolean } | null>(null);

  function calculate() {
    const t = NEIGHBORHOOD_TIERS[tier];
    const s = POOL_SIZES[size];
    const c = POOL_CONDITIONS[cond];
    const value = Math.round(t.baseImpact * s.factor * c.factor);
    const cost = c.annualCost;
    const ratio = parseFloat((value / cost).toFixed(1));
    setResult({ value, cost, ratio, expected: t.expectedPool });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '52px 24px' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW POOL VALUE GUIDE</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
          Does a Pool Add Value in DFW?
        </h1>
        <p style={{ fontSize: 17, color: '#b0bdd4', lineHeight: 1.7, marginBottom: 40 }}>
          In DFW, a pool can add $10,000–$50,000 to your home value — but only in the right neighborhood.
          In luxury markets it is expected. In entry-level markets, it may not move the needle much.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏊', title: 'Where Pools Are Expected', desc: 'Southlake, Westlake, Frisco Estates, Celina — buyers in these markets expect a pool. A home without one may sit longer.' },
            { icon: '💰', title: 'Where Pools Are Nice-to-Have', desc: 'Mid-range suburbs — McKinney, Flower Mound, Keller — a pool is a differentiator that helps, but does not make or break a sale.' },
            { icon: '🔧', title: 'Maintenance Costs Matter', desc: 'DFW pools cost $2,400–$7,500/year to maintain depending on age. Older pools with dated equipment erode the value premium.' },
            { icon: '📉', title: 'Pool Condition on Resale', desc: 'A cracked plaster pool needing resurfacing ($10K–$20K) can actually hurt your net proceeds. Buyers will discount aggressively.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#12213A', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#8a9fc0', lineHeight: 1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#12213A', borderRadius: 14, padding: 32, marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🏊 Pool Value Impact Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Neighborhood Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(NEIGHBORHOOD_TIERS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Pool Size</label>
              <select value={size} onChange={e => setSize(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(POOL_SIZES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8a9fc0', display: 'block', marginBottom: 6 }}>Pool Condition</label>
              <select value={cond} onChange={e => setCond(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a4a7f', background: '#0A1628', color: '#fff', fontSize: 13, boxSizing: 'border-box' }}>
                {Object.entries(POOL_CONDITIONS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
            Calculate Pool Value Impact
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#8a9fc0', marginBottom: 4 }}>Estimated Value Added</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{fmt(result.value)}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#8a9fc0', marginBottom: 4 }}>Annual Maintenance Cost</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{fmt(result.cost)}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 12, color: '#8a9fc0', marginBottom: 4 }}>Value-to-Cost Ratio</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: result.ratio > 10 ? '#6af26a' : '#f87171' }}>{result.ratio}x</p>
                </div>
              </div>
              {result.expected && (
                <p style={{ marginTop: 16, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>⚠️ In this market tier, buyers expect a pool. A home without one may face longer days on market.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
