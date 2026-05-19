import { useState } from 'react';

const data = {
  renovateCases: [
    { label: 'Love your location', detail: 'Great school district, commute, neighbors' },
    { label: 'Equity < 40%', detail: 'Not enough gain to fund a meaningful upgrade' },
    { label: 'Targeted needs', detail: 'One or two specific improvements needed' },
    { label: 'DFW market hot', detail: 'Replacement cost > move-up cost in your area' },
  ],
  buyCases: [
    { label: 'Major layout issue', detail: "Can't fix structural flow without full rebuild" },
    { label: 'Neighborhood plateau', detail: 'Area appreciation lagging DFW average' },
    { label: 'Equity ≥ 40%', detail: 'Strong down payment for step-up home' },
    { label: 'Life stage change', detail: 'School district, commute, or size needs shifted' },
  ],
  dfwCosts: [
    { item: 'Kitchen remodel (full)', cost: '$55K–$90K', recoup: '62–68%' },
    { item: 'Primary bath remodel', cost: '$25K–$45K', recoup: '58–64%' },
    { item: 'Addition (per sq ft)', cost: '$180–$240', recoup: '50–60%' },
    { item: 'HVAC replacement', cost: '$12K–$18K', recoup: '85–95%' },
  ],
};

export default function DFWBuyingVsRenovatingGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [renovationCost, setRenovationCost] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [result, setResult] = useState<null | { verdict: string; detail: string }>(null);

  function analyze() {
    const hv = parseFloat(homeValue) || 0;
    const rc = parseFloat(renovationCost) || 0;
    const tp = parseFloat(targetPrice) || 0;
    if (!hv || !rc || !tp) return;
    const renovatedValue = hv + rc * 0.65;
    const moveCost = tp * 0.08;
    const totalBuyCost = tp + moveCost;
    const totalRenovateCost = hv + rc;
    if (totalRenovateCost < totalBuyCost && renovatedValue >= tp * 0.9) {
      setResult({ verdict: '🏠 Renovate', detail: `Renovating costs ~$${Math.round(totalRenovateCost / 1000)}K total vs buying at ~$${Math.round(totalBuyCost / 1000)}K all-in. Your renovated home would be worth ~$${Math.round(renovatedValue / 1000)}K, close to your target. In DFW, staying and improving often pencils out better than moving.` });
    } else {
      setResult({ verdict: '🔑 Buy New', detail: `Your target home at $${Math.round(tp / 1000)}K (with ~$${Math.round(moveCost / 1000)}K in closing/move costs) is competitive vs. pouring $${Math.round(rc / 1000)}K into renovations that only recoup ~65 cents on the dollar in DFW. Time to move up.` });
    }
  }

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Buy New or Renovate?<br />The DFW Decision Framework</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 40, lineHeight: 1.7 }}>In a market where DFW home prices have risen 40%+ since 2020, the buy-vs-renovate math looks very different than it did five years ago. Here's how to think through it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ background: '#fff', border: '2px solid #e0e0e0', borderRadius: 12, padding: 28 }}>
            <h2 style={{ fontSize: 20, color: '#0A1628', marginBottom: 16 }}>🔨 Stay & Renovate When...</h2>
            {data.renovateCases.map((c, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{c.label}</div>
                <div style={{ color: '#666', fontSize: 14 }}>{c.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, color: '#fff' }}>
            <h2 style={{ fontSize: 20, color: '#F5E642', marginBottom: 16 }}>🏡 Buy New When...</h2>
            {data.buyCases.map((c, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#F5E642′ }}>{c.label}</div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 20 }}>📊 DFW Renovation Cost Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {data.dfwCosts.map((r, i) => (
              <div key={i} style={{ background: '#F8F6F0', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.item}</div>
                <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>{r.cost}</div>
                <div style={{ color: '#888', fontSize: 13 }}>Recoup: {r.recoup}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 8 }}>🧮 Your DFW Buy vs. Renovate Analysis</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>Enter your numbers to get a personalized recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            {[{ label: 'Current Home Value ($)', val: homeValue, set: setHomeValue }, { label: 'Renovation Budget ($)', val: renovationCost, set: setRenovationCost }, { label: 'Target Home Price ($)', val: targetPrice, set: setTargetPrice }].map((f, i) => (
              <div key={i}>
                <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder="e.g. 450000″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Analyze My Situation</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 24, color: '#fff' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{result.verdict}</div>
              <div style={{ lineHeight: 1.7, color: '#ccc' }}>{result.detail}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
