import { useState } from 'react';

const NEIGHBORHOODS = [
  { name: 'East Dallas', note: 'Lakewood-adjacent streets with 1950s–70s ranch homes; ARVs $350K–$550K, margins 12–18% when bought right.' },
  { name: 'Oak Cliff', note: 'Gentrification belt from Bishop Arts northeast; rapid ARV appreciation, tighter inventory.' },
  { name: 'Older Garland', note: 'High volume of aged housing stock, lower acquisition costs, solid rental demand as backstop.' },
];

const MARKET_NOTE = '2026 DFW flip market: margins have compressed from pandemic highs. Days-on-market for flipped properties average 28–45 days. Carrying costs are the silent killer — every extra month costs 1–2% of project cost. Speed of execution is now the primary competitive advantage.';

export default function DFWFixAndFlipGuide2026() {
  const [purchase, setPurchase] = useState('');
  const [reno, setReno] = useState('');
  const [arv, setArv] = useState('');
  const [months, setMonths] = useState('4');
  const [result, setResult] = useState<{ profit: number; roi: number; risk: string; sellDays: string } | null>(null);

  function calculate() {
    const p = parseFloat(purchase.replace(/,/g, '')) || 0;
    const r = parseFloat(reno.replace(/,/g, '')) || 0;
    const a = parseFloat(arv.replace(/,/g, '')) || 0;
    const m = parseInt(months) || 4;
    if (!p || !r || !a) { return; }
    const hardMoneyCost = p * 0.12 * (m / 12);
    const holdingCosts = (p + r) * 0.015 * m;
    const closingCosts = a * 0.08;
    const totalCost = p + r + hardMoneyCost + holdingCosts + closingCosts;
    const profit = a - totalCost;
    const roi = ((profit / (p + r)) * 100);
    const risk = profit < 0 ? 'High — deal loses money at these numbers' : profit < 20000 ? 'Moderate — thin margin, execution must be perfect' : 'Acceptable — solid deal if ARV holds';
    const sellDays = a > 500000 ? '45–75 days' : a > 350000 ? '28–45 days' : '14–30 days';
    setResult({ profit, roi, risk, sellDays });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔨</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Fix & Flip Guide 2026</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.05rem' }}>Current market conditions, best neighborhoods, and profit analysis for DFW flippers</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>📰 2026 DFW Market Conditions</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>{MARKET_NOTE}</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📍 Best DFW Flip Neighborhoods</h2>
          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} style={{ marginBottom: '0.85rem', paddingBottom: '0.85rem', borderBottom: '1px solid #1e2d45′ }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>{n.name}: </span>
              <span style={{ color: '#a0aec0′ }}>{n.note}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>📐 ARV & Carrying Costs 101</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>ARV (After-Repair Value) is determined by pulling comps within 0.5 miles, same bed/bath, updated in the last 90 days. In DFW, always verify comps against NTREIS MLS data. Carrying costs include hard money interest (10–14% annualized), insurance, utilities, property taxes (~2.1% annually in DFW), and HOA if applicable.</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📊 Flip Profit Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {[
              { label: 'Purchase Price ($)', val: purchase, set: setPurchase, ph: '200000′ },
              { label: 'Renovation Budget ($)', val: reno, set: setReno, ph: '60000′ },
              { label: 'Target ARV ($)', val: arv, set: setArv, ph: '340000′ },
            ].map((f) => (
              <div key={f.label}>
                <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', color: '#a0aec0′ }}>{f.label}</label>
                <input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.85rem', color: '#a0aec0′ }}>Hold Period (months)</label>
              <select value={months} onChange={(e) => setMonths(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '0.95rem', boxSizing: 'border-box' }}>
                {['3','4','5','6','8','12'].map((m) => <option key={m} value={m}>{m} months</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Analyze Deal
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: result.profit >= 20000 ? '#4ade80′ : result.profit >= 0 ? '#facc15' : '#f87171', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                Net Profit: ${result.profit.toLocaleString('en-US', { maximumFractionDigits: 0 })} ({result.roi.toFixed(1)}% ROI)
              </div>
              <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Risk: {result.risk}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>Estimated days to sell: {result.sellDays}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
