import { useState } from 'react';

const sizePricing: Record<string, { occupied: [number, number]; vacant: [number, number] }> = {
  'Under 1,000 sq ft': { occupied: [1500, 2500], vacant: [2000, 3500] },
  '1,000–2,000 sq ft': { occupied: [2000, 3500], vacant: [3000, 5000] },
  '2,000–3,000 sq ft': { occupied: [2500, 4500], vacant: [4000, 6500] },
  '3,000–4,000 sq ft': { occupied: [3500, 5000], vacant: [5500, 8000] },
  '4,000+ sq ft': { occupied: [4500, 7000], vacant: [7000, 12000] },
};

export default function DFWHomeStagingCostGuide() {
  const [size, setSize] = useState('');
  const [type, setType] = useState<'occupied' | 'vacant' | ''>('');
  const [showResult, setShowResult] = useState(false);

  const calculate = () => {
    if (size && type) setShowResult(true);
  };

  const getResult = () => {
    if (!size || !type) return null;
    const range = sizePricing[size][type];
    const midCost = (range[0] + range[1]) / 2;
    const saleGain = midCost * 3.5;
    const roi = ((saleGain - midCost) / midCost * 100).toFixed(0);
    const diy = midCost < 3000;
    return { range, saleGain, roi, diy };
  };

  const result = showResult ? getResult() : null;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>
            DFW Home Staging Cost Guide
          </h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 600, margin: '0 auto' }}>
            Everything DFW sellers need to know about staging costs, ROI, and whether to DIY or hire a pro.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 48 }}>
          {[
            { icon: '📦', label: 'Occupied Staging', value: '$1,500–$5,000', sub: 'Work with existing furniture' },
            { icon: '🏚️', label: 'Vacant Staging', value: '$2,000–$8,000', sub: 'Furnish entire home' },
            { icon: '⚡', label: 'Sell Faster', value: '15–20%', sub: 'Quicker in DFW market' },
            { icon: '💰', label: 'Avg ROI', value: '250–300%', sub: 'Return on staging investment' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#f8f9ff', borderRadius: 12, padding: 24, textAlign: 'center', border: '1px solid #e0e4ff' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', backgroundColor: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#888′ }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>🏠 Occupied Staging</h2>
            <p style={{ color: '#555', marginBottom: 12 }}>You still live there — a stager works with your existing furniture, declutters, rearranges, and adds accent pieces.</p>
            <ul style={{ paddingLeft: 20, color: '#444', lineHeight: 2 }}>
              <li>Initial consultation: $150–$300</li>
              <li>Full occupied staging: $1,500–$5,000</li>
              <li>Ongoing monthly fee: $500–$1,000</li>
              <li>Best for: Homes with quality existing furniture</li>
            </ul>
          </div>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>🏚️ Vacant Staging</h2>
            <p style={{ color: '#555', marginBottom: 12 }}>Home is empty — stager brings in furniture, decor, and art to make it feel lived-in and aspirational.</p>
            <ul style={{ paddingLeft: 20, color: '#444', lineHeight: 2 }}>
              <li>Full vacant staging: $2,000–$8,000</li>
              <li>Monthly furniture rental: $1,000–$2,500</li>
              <li>Key rooms only: $1,200–$3,000</li>
              <li>Best for: Already-moved-out sellers</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff8e1', borderRadius: 16, padding: 32, marginBottom: 48, border: '1px solid #ffe082′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>🌟 DFW Market Specifics</h2>
          <p style={{ color: '#555', marginBottom: 16 }}>DFW buyers in 2026 expect move-in ready. The Metroplex has one of the most competitive resale markets in the South — staged homes consistently outperform unstaged listings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              '🏅 Plano & Frisco buyers expect pristine presentation',
              '📸 Staged homes photograph better — critical for online buyers',
              '🕐 DFW staged homes average 9 days on market vs 27 unstaged',
              '💵 Staged DFW homes sell for 1–5% more on average',
            ].map(tip => (
              <div key={tip} style={{ backgroundColor: '#ffffff', borderRadius: 8, padding: 12, fontSize: 14, color: '#444′ }}>{tip}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 16, padding: 32, marginBottom: 32, color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Staging Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Home Size</label>
              <select value={size} onChange={e => { setSize(e.target.value); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#1a2a40', color: '#fff', border: '1px solid #2a3a50', fontSize: 14 }}>
                <option value="">Select size</option>
                {Object.keys(sizePricing).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#ccc', fontSize: 14 }}>Staging Type</label>
              <select value={type} onChange={e => { setType(e.target.value as 'occupied' | 'vacant'); setShowResult(false); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, backgroundColor: '#1a2a40', color: '#fff', border: '1px solid #2a3a50', fontSize: 14 }}>
                <option value="">Select type</option>
                <option value="occupied">Occupied (I still live there)</option>
                <option value="vacant">Vacant (I've moved out)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} disabled={!size || !type}
            style={{ padding: '12px 32px', backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: size && type ? 'pointer' : 'not-allowed', opacity: size && type ? 1 : 0.5 }}>
            Estimate My Staging Cost
          </button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#1a2a40', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Your Staging Estimate</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>STAGING COST</div>
                  <div style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>${result.range[0].toLocaleString()}–${result.range[1].toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>EST. SALE GAIN</div>
                  <div style={{ color: '#4ade80', fontSize: 22, fontWeight: 800 }}>+${Math.round(result.saleGain).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: 12, marginBottom: 4 }}>ESTIMATED ROI</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.roi}%</div>
                </div>
              </div>
              <div style={{ marginTop: 16, padding: 16, backgroundColor: result.diy ? '#1a3a1a' : '#1a1a3a', borderRadius: 8, borderLeft: `4px solid ${result.diy ? '#4ade80' : '#818cf8'}` }}>
                <strong style={{ color: result.diy ? '#4ade80′ : '#818cf8' }}>{result.diy ? '✅ DIY-Friendly' : '🏆 Hire a Pro'}</strong>
                <p style={{ color: '#ccc', fontSize: 13, marginTop: 4 }}>
                  {result.diy ? 'Your home size is manageable for DIY staging. Invest in key pieces: fresh linens, neutral throw pillows, and a declutter day can go a long way.' : 'At this scale, a professional stager will pay for themselves. DFW staging pros know what Metroplex buyers respond to.'}
                </p>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#888', fontSize: 13 }}>
          ⚠️ Estimates based on 2026 DFW market averages. Actual costs vary by stager and location.
        </p>
      </div>
    </div>
  );
}
