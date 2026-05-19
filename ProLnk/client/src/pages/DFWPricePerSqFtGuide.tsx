import { useState } from 'react';

const DFW_AREAS = ['Uptown/Highland Park', 'Frisco/Prosper', 'Plano/Allen', 'McKinney/Celina', 'Arlington/Grand Prairie', 'Mesquite/Garland', 'Denton/Lewisville', 'Fort Worth Inner Loop', 'Mansfield/Midlothian', 'Rockwall/Royse City'];

const TIERS: Record<string, { label: string; range: string; finishes: string; lots: string; note: string }> = {
  low: { label: '$120–$149/sqft', range: '120-149', finishes: 'Builder-grade cabinets, LVP or carpet, standard fixtures', lots: 'Typical suburban lots 0.15–0.25 acres', note: 'Common in outer suburbs — Denton, Mesquite, Mansfield' },
  mid: { label: '$150–$199/sqft', range: '150-199', finishes: 'Quartz counters, wood floors, upgraded appliances', lots: 'Moderate lots, some master-planned communities', note: 'Bread-and-butter DFW: Plano, Allen, Frisco resale' },
  high: { label: '$200–$249/sqft', range: '200-249', finishes: 'Custom cabinetry, hardwood, high-end baths, smart home', lots: 'Premium lots or smaller newer builds', note: 'New construction in Prosper, McKinney, Fort Worth Proper' },
  luxury: { label: '$250+/sqft', range: '250+', finishes: 'Designer finishes, chef kitchen, premium everything', lots: 'Often smaller lot with premium location', note: 'Highland Park, Uptown, lakefront, or trophy custom homes' },
};

export default function DFWPricePerSqFtGuide() {
  const [area, setArea] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState<null | { low: number; high: number; tier: string }>(null);

  function calculate() {
    const size = parseInt(sqft);
    if (!size || size < 500) return;
    const areaMultipliers: Record<string, [number, number]> = {
      'Uptown/Highland Park': [280, 420], 'Frisco/Prosper': [210, 270], 'Plano/Allen': [175, 225],
      'McKinney/Celina': [165, 215], 'Arlington/Grand Prairie': [140, 175], 'Mesquite/Garland': [130, 165],
      'Denton/Lewisville': [145, 185], 'Fort Worth Inner Loop': [155, 200], 'Mansfield/Midlothian': [148, 190],
      'Rockwall/Royse City': [155, 195],
    };
    const [lo, hi] = areaMultipliers[area] || [150, 200];
    const tier = lo >= 250 ? 'luxury' : lo >= 200 ? 'high' : lo >= 150 ? 'mid' : 'low';
    setResult({ low: Math.round(size * lo / 1000) * 1000, high: Math.round(size * hi / 1000) * 1000, tier });
  }

  const t = result ? TIERS[result.tier] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>📐 DFW Market Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Price Per Square Foot in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>What $150, $200, and $250+/sqft actually means in Dallas-Fort Worth — and why price/sqft is not the whole story.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {Object.entries(TIERS).map(([k, v]) => (
            <div key={k} style={{ background: '#0f1f3a', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{v.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Finishes: {v.finishes}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>Area: {v.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3a', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Why Price/SqFt Is Not Everything</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 0 }}>Lot size, location premium, age, and finishes all skew the number. A 4,000 sqft home on a 1-acre lot in Celina may show a lower dollar-per-sqft than a 1,800 sqft patio home in Plano — but both can be fairly priced. Always compare apples to apples: similar age, similar area, similar lot type.</p>
        </div>

        <div style={{ background: '#0f1f3a', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>DFW Area + Size — Expected Price Range</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value=''>Select area...</option>
                {DFW_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size (sqft)</label>
              <input type='number' value={sqft} onChange={e => setSqft(e.target.value)} placeholder='e.g. 2400' style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>Calculate Range</button>
          {result && t && (
            <div style={{ marginTop: 20, padding: 20, background: '#0A1628', borderRadius: 12 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>${result.low.toLocaleString()} to ${result.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>Price tier: <span style={{ color: '#F5E642' }}>{t.label}</span></div>
              <div style={{ color: '#64748b', fontSize: 13 }}>Typical finishes: {t.finishes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}