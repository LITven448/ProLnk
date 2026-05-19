import { useState } from 'react';

const ADJUSTMENTS = [
  { factor: 'Pool (concrete, DFW)', impact: '+$18,000 – $35,000', note: 'Higher value in North DFW suburbs than urban core' },
  { factor: 'Kitchen remodel (full)', impact: '+$20,000 – $45,000', note: 'Appraiser applies 60-75% of cost' },
  { factor: 'Additional bathroom', impact: '+$8,000 – $22,000', note: 'Depends on size and finish level' },
  { factor: 'Lot size +5,000 sqft', impact: '+$5,000 – $18,000', note: 'Highly location-dependent; diminishing returns in suburbs' },
  { factor: 'Solar panels (owned)', impact: '+$12,000 – $28,000', note: 'DFW appraisers using PV Value method' },
  { factor: 'Garage (2-car vs none)', impact: '+$15,000 – $30,000', note: 'Major factor in DFW — almost all comps have garage' },
  { factor: 'Age difference (+10 yrs)', impact: '–$8,000 – –$20,000', note: 'Older home vs comp; condition can offset' },
  { factor: 'Condition (superior)', impact: '+$10,000 – $30,000', note: 'Appraiser subjective — keep home spotless for appraisal' },
];

const SIZES = [
  { label: 'Under 1,500 sqft', adj: -0.12 },
  { label: '1,500 – 2,000 sqft', adj: -0.05 },
  { label: '2,000 – 2,500 sqft', adj: 0 },
  { label: '2,500 – 3,000 sqft', adj: 0.06 },
  { label: '3,000 – 3,500 sqft', adj: 0.13 },
  { label: 'Over 3,500 sqft', adj: 0.21 },
];

const UPDATES = [
  { label: 'As-Is / No Updates', adj: -0.08 },
  { label: 'Minor Updates (paint, fixtures)', adj: 0 },
  { label: 'Kitchen or Bath Update', adj: 0.06 },
  { label: 'Full Interior Renovation', adj: 0.14 },
];

const POOLS = [
  { label: 'No Pool', adj: 0 },
  { label: 'Has Pool', adj: 0.04 },
];

const BASE_PPSF: Record<string, number> = {
  'Inner Dallas / Uptown': 340,
  'Park Cities / Preston Hollow': 390,
  'Far North Dallas / Frisco': 215,
  'Plano / Allen / McKinney': 200,
  'Flower Mound / Coppell / Southlake': 210,
  'Garland / Mesquite / Richardson': 165,
  'Fort Worth Core': 158,
  'Keller / Colleyville / NRH': 195,
};

export default function DFWComparableSalesGuide() {
  const [submarket, setSubmarket] = useState('Far North Dallas / Frisco');
  const [sqft, setSqft] = useState('2200');
  const [size, setSize] = useState(0);
  const [updates, setUpdates] = useState(0);
  const [pool, setPool] = useState(0);
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  function calculate() {
    const sf = parseInt(sqft) || 2000;
    const base = BASE_PPSF[submarket] ?? 200;
    const adj = 1 + size + updates + pool;
    const mid = base * adj * sf;
    setResult({ low: Math.round(mid * 0.93), high: Math.round(mid * 1.07) });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8e8e8' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Valuation Resource</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>Understanding Comparable Sales in DFW</h1>
          <p style={{ fontSize: 18, color: '#aab', lineHeight: 1.7 }}>Comps are the foundation of every home valuation in DFW — but DFW's rapid growth creates unique challenges. Here's how to read them like a pro.</p>
        </div>

        <section style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, color: '#fff', marginBottom: 14 }}>⚡ Why DFW Comps Are Tricky</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {[
              { icon: '📅', title: 'Rapid Appreciation', body: 'DFW prices moved 5-8% annually in recent years. A closed sale from 6 months ago can undervalue your home by $25,000–$60,000.' },
              { icon: '🏗️', title: 'New vs. Resale', body: 'New construction communities (Frisco, Celina) set comp prices that may not translate to resale homes 5 miles away.' },
              { icon: '🗺️', title: 'Micro-Market Variation', body: 'In DFW, crossing a major highway can mean $80,000 in value difference. Appraisers must stay within neighborhood boundaries.' },
              { icon: '🏊', title: 'Amenity Adjustments', body: 'Pools, 3-car garages, and large lots require manual adjustments. DFW appraisers use paired-sales analysis to quantify each feature.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 14 }}>
                <div style={{ fontSize: 26, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 6, color: '#fff' }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#99a', lineHeight: 1.6 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: '#fff' }}>🔧 Common Comp Adjustment Factors</h2>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'rgba(245,230,66,0.15)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Factor</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Typical DFW Adjustment</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#F5E642' }}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {ADJUSTMENTS.map((a, i) => (
                  <tr key={a.factor} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '11px 16px', fontWeight: 600 }}>{a.factor}</td>
                    <td style={{ padding: '11px 16px', color: '#F5E642', fontWeight: 700 }}>{a.impact}</td>
                    <td style={{ padding: '11px 16px', color: '#99a', fontSize: 13 }}>{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, color: '#fff', marginBottom: 12 }}>🔍 Finding Your Own Comps (DCAD.org)</h2>
          {['Go to DCAD.org (Dallas Central Appraisal District) or TAD.org for Tarrant County.', 'Search by address, then view "Sales History" for your property and neighbors.', 'Filter for sales within the past 90 days within 1 mile.', 'Match homes within 200 sq ft, similar age, lot size, and bedroom/bath count.', 'Adjust for condition and features using the table above as a guide.'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
              <div style={{ lineHeight: 1.7, color: '#ccd', fontSize: 15 }}>{step}</div>
            </div>
          ))}
        </section>

        <section style={{ background: 'rgba(245,230,66,0.08)', border: '2px solid #F5E642', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 20, color: '#fff' }}>🧮 Rough Value Estimator Using Comp Methodology</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 14 }}>
                {Object.keys(BASE_PPSF).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Home Size (sqft)</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Size vs Comps</label>
              <select onChange={e => setSize(parseFloat(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 14 }}>
                {SIZES.map(s => <option key={s.label} value={s.adj}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Update Level</label>
              <select onChange={e => setUpdates(parseFloat(e.target.value))} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 14 }}>
                {UPDATES.map(u => <option key={u.label} value={u.adj}>{u.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Pool?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {POOLS.map(p => <button key={p.label} onClick={() => setPool(p.adj)} style={{ padding: '8px 20px', borderRadius: 8, border: '2px solid', borderColor: pool === p.adj ? '#F5E642' : 'rgba(255,255,255,0.2)', background: pool === p.adj ? '#F5E642' : 'transparent', color: pool === p.adj ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>{p.label}</button>)}
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Estimate Value Range</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 18, display: 'flex', gap: 30 }}>
              <div><div style={{ fontSize: 13, color: '#99a', marginBottom: 4 }}>Estimated Low</div><div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>{fmt(result.low)}</div></div>
              <div><div style={{ fontSize: 13, color: '#99a', marginBottom: 4 }}>Estimated High</div><div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642' }}>{fmt(result.high)}</div></div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
