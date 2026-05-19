import { useState } from 'react';

const SUBMARKET_RATES: Record<string, number> = {
  'Frisco/Prosper': 0.072,
  'Plano': 0.061,
  'McKinney': 0.065,
  'Dallas (Uptown/Knox)': 0.055,
  'Fort Worth': 0.051,
  'Allen/Murphy': 0.063,
  'Denton': 0.058,
  'Arlington': 0.048,
  'Mansfield/Midlothian': 0.056,
  'Celina/Anna': 0.078,
};

function calcEquity(price: number, down: number, rate: number, extraPmt: number, years: number, appRate: number) {
  const loan = price - down;
  const monthlyRate = 0.07 / 12;
  const payments = 30 * 12;
  const monthlyPmt = loan * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
  let balance = loan;
  const months = years * 12;
  for (let i = 0; i < months; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPmt - interest + extraPmt;
    balance = Math.max(0, balance - principal);
  }
  const appreciatedValue = price * Math.pow(1 + appRate, years);
  const equity = appreciatedValue - balance;
  const paydown = loan - balance;
  const appreciation = appreciatedValue - price;
  return { equity: Math.round(equity), paydown: Math.round(paydown), appreciation: Math.round(appreciation), value: Math.round(appreciatedValue) };
}

export default function DFWHomeEquityGrowthProjector() {
  const [price, setPrice] = useState(425000);
  const [downPct, setDownPct] = useState(10);
  const [submarket, setSubmarket] = useState('Frisco/Prosper');
  const [extraPmt, setExtraPmt] = useState(0);

  const appRate = SUBMARKET_RATES[submarket];
  const down = Math.round(price * downPct / 100);
  const milestones = [1, 3, 5, 10].map(y => ({ year: y, ...calcEquity(price, down, 0.07, extraPmt, y, appRate) }));

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#1a1a1a', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>📈</div>
        <h1 style={{ color: '#0A1628', fontSize: '1.8rem', marginBottom: 4 }}>DFW Home Equity Growth Projector</h1>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>See how your equity builds over 1, 3, 5, and 10 years with DFW submarket appreciation rates.</p>

        <div style={{ background: '#fff', borderRadius: 10, padding: '1.4rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <label style={{ fontWeight: 600 }}>Purchase Price: {fmt(price)}</label>
          <input type="range" min={200000} max={1200000} step={5000} value={price} onChange={e => setPrice(Number(e.target.value))}
            style={{ width: '100%', margin: '6px 0 14px', accentColor: '#0A1628′ }} />

          <label style={{ fontWeight: 600 }}>Down Payment: {downPct}% ({fmt(down)})</label>
          <input type="range" min={3} max={30} value={downPct} onChange={e => setDownPct(Number(e.target.value))}
            style={{ width: '100%', margin: '6px 0 14px', accentColor: '#0A1628′ }} />

          <label style={{ fontWeight: 600 }}>DFW Submarket</label>
          <select value={submarket} onChange={e => setSubmarket(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 6, border: '1px solid #ddd', marginTop: 6, marginBottom: 14 }}>
            {Object.keys(SUBMARKET_RATES).map(s => <option key={s}>{s} — {(SUBMARKET_RATES[s]*100).toFixed(1)}%/yr</option>)}
          </select>

          <label style={{ fontWeight: 600 }}>Extra Monthly Principal: ${extraPmt.toLocaleString()}</label>
          <input type="range" min={0} max={2000} step={50} value={extraPmt} onChange={e => setExtraPmt(Number(e.target.value))}
            style={{ width: '100%', margin: '6px 0 4px', accentColor: '#0A1628′ }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {milestones.map(m => (
            <div key={m.year} style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', color: '#fff' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Year {m.year}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 6 }}>{fmt(m.equity)}</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa' }}>Home value: {fmt(m.value)}</div>
              <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
                <div><div style={{ fontSize: '0.75rem', color: '#aaa' }}>Paydown</div><div style={{ fontWeight: 600, color: '#6ee7b7′ }}>{fmt(m.paydown)}</div></div>
                <div><div style={{ fontSize: '0.75rem', color: '#aaa' }}>Appreciation</div><div style={{ fontWeight: 600, color: '#F5E642′ }}>{fmt(m.appreciation)}</div></div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', background: '#fff', borderRadius: 8, padding: '0.9rem', color: '#666', fontSize: '0.82rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          🏠 Rates: 7% fixed 30-yr mortgage assumed. Appreciation from {submarket} historical avg ({(appRate*100).toFixed(1)}%/yr).
        </div>
      </div>
    </div>
  );
}
