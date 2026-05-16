import { useState } from 'react';

const ZIP_TIERS: Record<string, { label: string; multiplier: number }> = {
  premium: { label: 'Premium (Southlake, Highland Park, Westlake)', multiplier: 1.0 },
  high: { label: 'High (Frisco, Plano, Allen)', multiplier: 0.82 },
  mid: { label: 'Mid (McKinney, Flower Mound, Prosper)', multiplier: 0.68 },
  standard: { label: 'Standard (Garland, Mesquite, Irving)', multiplier: 0.52 },
  value: { label: 'Value (South Dallas, Balch Springs)', multiplier: 0.38 },
};

const CONDITION: Record<string, { label: string; factor: number }> = {
  excellent: { label: 'Excellent / Updated', factor: 1.12 },
  good: { label: 'Good / Move-in Ready', factor: 1.0 },
  fair: { label: 'Fair / Needs Minor Updates', factor: 0.93 },
  poor: { label: 'Poor / Needs Major Work', factor: 0.82 },
};

export default function DFWHomeValueCalculatorGuide() {
  const [sqft, setSqft] = useState('2000');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [zipTier, setZipTier] = useState('mid');
  const [condition, setCondition] = useState('good');
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  const BASE_PSF: Record<string, number> = {
    premium: 420, high: 310, mid: 235, standard: 175, value: 130,
  };

  function calculate() {
    const sf = parseInt(sqft) || 2000;
    const b = parseInt(beds) || 3;
    const ba = parseFloat(baths) || 2;
    const basePsf = BASE_PSF[zipTier];
    const cond = CONDITION[condition].factor;
    const bedBonus = (b - 3) * 6000;
    const bathBonus = (ba - 2) * 5000;
    const base = sf * basePsf * cond + bedBonus + bathBonus;
    setResult({ low: Math.round(base * 0.93), high: Math.round(base * 1.07) });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <p style={{ color: '#8B5E3C', fontWeight: 700, letterSpacing: 2, fontSize: 12, marginBottom: 8 }}>DFW HOME VALUE GUIDE</p>
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          What Is My DFW Home Actually Worth?
        </h1>
        <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          Zillow Zestimate, Redfin Estimate, and Realtor.com AVM tools are typically off by
          3–8% in DFW — sometimes more in fast-moving markets. Here is how to get a sharper number.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 32, border: '1px solid #e8e3d9' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🏠 Why AVMs Miss in DFW</h2>
          <ul style={{ fontSize: 15, lineHeight: 2, color: '#444', paddingLeft: 20 }}>
            <li>DFW has hyper-local micro-markets — street-to-street value swings are common</li>
            <li>Rapid appreciation (some areas 15–25%/yr) makes sold data stale within 60 days</li>
            <li>Custom builds and lot premiums confuse automated models</li>
            <li>Active listings, not just closed sales, signal where the market is today</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, marginBottom: 32, border: '1px solid #e8e3d9' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 DFW Value Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Square Footage</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Bedrooms</label>
              <input type="number" value={beds} onChange={e => setBeds(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Bathrooms</label>
              <input type="number" value={baths} onChange={e => setBaths(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15, boxSizing: 'border-box' }}>
                {Object.entries(CONDITION).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Neighborhood Tier</label>
            <select value={zipTier} onChange={e => setZipTier(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', fontSize: 15 }}>
              {Object.entries(ZIP_TIERS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <button onClick={calculate}
            style={{ background: '#8B5E3C', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Estimate My Home Value
          </button>
          {result && (
            <div style={{ marginTop: 24, background: '#FFF8F0', borderRadius: 10, padding: 24, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>Estimated DFW Market Value Range</p>
              <p style={{ fontSize: 36, fontWeight: 800, color: '#8B5E3C' }}>{fmt(result.low)} – {fmt(result.high)}</p>
              <p style={{ fontSize: 13, color: '#999', marginTop: 8 }}>For a precise CMA, request a free analysis from a local DFW agent who can review active listings in your specific neighborhood.</p>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 32, border: '1px solid #e8e3d9' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>📋 How to Get a Better Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { icon: '🏘️', title: 'Active Listings', desc: 'Compare against homes currently for sale — not just sold — to see where buyers are pricing today.' },
              { icon: '📄', title: 'Agent CMA', desc: 'A Comparative Market Analysis from a local DFW agent is free and typically far more accurate than any AVM.' },
              { icon: '🔍', title: 'Appraisal', desc: 'A licensed appraiser (–600) is the gold standard when precision matters — refinance, estate, or legal dispute.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#F8F6F0', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
