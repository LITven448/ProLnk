import { useState } from 'react';

const SUBMARKETS = [
  { name: 'Dallas Uptown / Midtown', sfr: 5.1, small_multi: 5.8, avg: 5.4 },
  { name: 'Far North Dallas / Frisco', sfr: 4.8, small_multi: 5.4, avg: 5.1 },
  { name: 'Plano / Allen / McKinney', sfr: 4.9, small_multi: 5.5, avg: 5.2 },
  { name: 'Fort Worth Core', sfr: 6.2, small_multi: 6.8, avg: 6.5 },
  { name: 'Garland / Mesquite', sfr: 6.8, small_multi: 7.2, avg: 7.0 },
  { name: 'Denton County Suburbs', sfr: 5.4, small_multi: 5.9, avg: 5.7 },
  { name: 'Southlake / Colleyville', sfr: 4.2, small_multi: 4.8, avg: 4.5 },
  { name: 'East Dallas / Oak Cliff', sfr: 5.6, small_multi: 6.1, avg: 5.9 },
  { name: 'Keller / N Richland Hills', sfr: 5.0, small_multi: 5.6, avg: 5.3 },
];

const RATE_SCENARIOS = [
  { rate: 5.5, target: '5.5–6.5%', note: 'Low-rate environment: compress cap rates, accept 5-5.5%' },
  { rate: 6.5, target: '5.8–6.8%', note: 'Moderate rates: standard DFW SFR target range' },
  { rate: 7.5, target: '6.5–7.5%', note: 'High-rate environment: need higher yields to justify vs risk-free rate' },
  { rate: 8.5, target: '7.0–8.5%', note: 'Elevated rates: cap rates must rise or prices must fall' },
];

export default function DFWCapRateGuide() {
  const [price, setPrice] = useState('');
  const [noi, setNoi] = useState('');
  const [result, setResult] = useState<{ capRate: number; coc: number; comparison: string } | null>(null);
  const [downPct, setDownPct] = useState('25');
  const [rate, setRate] = useState('7.0');

  function calculate() {
    const p = parseFloat(price.replace(/,/g, '')) || 0;
    const n = parseFloat(noi.replace(/,/g, '')) || 0;
    const down = parseFloat(downPct) / 100;
    const r = parseFloat(rate) / 100;
    if (!p || !n) return;
    const capRate = (n / p) * 100;
    const loanAmt = p * (1 - down);
    const monthlyRate = r / 12;
    const payments = 360;
    const monthlyPayment = loanAmt * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
    const annualDebtService = monthlyPayment * 12;
    const cashFlow = n - annualDebtService;
    const downAmt = p * down;
    const coc = (cashFlow / downAmt) * 100;
    const avgCap = 5.5;
    const comparison = capRate > avgCap + 1 ? 'Above DFW average — favorable risk-adjusted return' : capRate > avgCap - 0.5 ? 'Near DFW average — market-rate deal' : 'Below DFW average — may be priced for appreciation not cash flow';
    setResult({ capRate: Math.round(capRate * 100) / 100, coc: Math.round(coc * 100) / 100, comparison });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0066cc', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Investor Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>DFW Cap Rate Guide for Investors</h1>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7 }}>What cap rates actually mean, how they vary across DFW submarkets, how interest rates reshape targets, and when to use them — and when not to.</p>
        </div>

        <section style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 14 }}>📐 What Is a Cap Rate?</h2>
          <div style={{ background: '#f0f4ff', borderRadius: 10, padding: 18, marginBottom: 16, fontSize: 16, textAlign: 'center' }}>
            <strong>Cap Rate = Net Operating Income (NOI) ÷ Property Value × 100</strong>
          </div>
          <p style={{ lineHeight: 1.8, color: '#333', margin: 0 }}>Cap rate tells you the unlevered return — what you'd earn if you paid all cash. It's the universal comparison tool for income properties. A 6% cap means for every $100K invested, you earn $6K/year in NOI before financing costs. Lower cap rates reflect lower perceived risk (premium locations, strong demand). Higher cap rates indicate higher risk or distress — but more cash flow today.</p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>🗺️ DFW Cap Rates by Submarket</h2>
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0066cc', color: '#fff' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left' }}>Submarket</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>SFR Cap Rate</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Small Multi</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>Avg</th>
                </tr>
              </thead>
              <tbody>
                {SUBMARKETS.map((s, i) => (
                  <tr key={s.name} style={{ background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '11px 16px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: s.sfr >= 6.5 ? '#2a7a2a' : s.sfr <= 4.8 ? '#c00' : '#333', fontWeight: 700 }}>{s.sfr}%</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: '#555' }}>{s.small_multi}%</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', fontWeight: 700 }}>{s.avg}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#777', marginTop: 10 }}>Data Q2 2026. Green = above DFW average. Red = compressed — pricing for appreciation.</p>
        </section>

        <section style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 14 }}>📈 How Interest Rates Shift Cap Rate Targets</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {RATE_SCENARIOS.map(s => (
              <div key={s.rate} style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#0066cc', marginBottom: 6 }}>{s.rate}% mortgage</div>
                <div style={{ fontWeight: 700, marginBottom: 6, color: '#333' }}>Target cap: {s.target}</div>
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff8e1', border: '1px solid #f5c542', borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 12 }}>⚠️ When Cap Rate Doesn't Matter</h2>
          <div style={{ lineHeight: 1.8, color: '#333' }}>
            <p style={{ marginTop: 0 }}>Cap rate is irrelevant for <strong>value-add deals</strong> where current rents are below market. A distressed duplex with a 4% cap rate at current rents may have a 7.5% cap at stabilized market rents — but current cap rate would make it look like a bad deal. Always underwrite to <em>stabilized NOI</em> for value-add acquisitions in DFW gentrification neighborhoods like Oak Cliff, East Dallas, and South Fort Worth.</p>
          </div>
        </section>

        <section style={{ background: '#fff', border: '2px solid #0066cc', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🧮 Cap Rate + Cash-on-Cash Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Purchase Price</label>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 380000" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Annual NOI ($)</label>
              <input value={noi} onChange={e => setNoi(e.target.value)} placeholder="e.g. 22000" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Down Payment %</label>
              <select value={downPct} onChange={e => setDownPct(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15 }}>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
                <option value="100">100% (All Cash)</option>
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Mortgage Rate</label>
              <select value={rate} onChange={e => setRate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15 }}>
                {['6.0','6.5','7.0','7.5','8.0','8.5'].map(r => <option key={r} value={r}>{r}%</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0066cc', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Calculate Returns</button>
          {result && (
            <div style={{ marginTop: 22, background: '#f0f8ff', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 14 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>Cap Rate</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: result.capRate >= 5.5 ? '#2a7a2a' : '#c00' }}>{result.capRate}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>Cash-on-Cash Return</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: result.coc > 0 ? '#0066cc' : '#c00' }}>{result.coc}%</div>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 14, fontSize: 14, color: '#333', fontStyle: 'italic' }}>{result.comparison}</div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
