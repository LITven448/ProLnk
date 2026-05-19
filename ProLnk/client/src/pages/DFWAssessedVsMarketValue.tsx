import { useState } from 'react';

const COUNTIES = ['Dallas CAD', 'Tarrant CAD', 'Collin CAD', 'Denton CAD', 'Rockwall CAD', 'Johnson CAD', 'Ellis CAD', 'Kaufman CAD'];

function getCapRate(county: string): number {
  const caps: Record<string, number> = { 'Dallas CAD': 10, 'Tarrant CAD': 10, 'Collin CAD': 10, 'Denton CAD': 10, 'Rockwall CAD': 10, 'Johnson CAD': 10, 'Ellis CAD': 10, 'Kaufman CAD': 10 };
  return caps[county] || 10;
}

function getProtestPotential(assessed: number, market: number): { rating: string; color: string; description: string } {
  const gap = ((market - assessed) / assessed) * 100;
  if (gap < 5) return { rating: 'Low', color: '#dc2626', description: 'Assessed value is close to market — protest may not yield significant savings' };
  if (gap < 15) return { rating: 'Moderate', color: '#d97706', description: 'Reasonable case for protest — gather comps and schedule hearing' };
  if (gap < 30) return { rating: 'Good', color: '#16a34a', description: 'Strong protest candidate — documented gap supports a reduction argument' };
  return { rating: 'Excellent', color: '#15803d', description: 'Very strong case — large gap between assessed and market means substantial tax savings possible' };
}

export default function DFWAssessedVsMarketValue() {
  const [assessed, setAssessed] = useState('');
  const [market, setMarket] = useState('');
  const [county, setCounty] = useState('');
  const [result, setResult] = useState<null | { gap: number; pct: number; taxSavings: number; protest: ReturnType<typeof getProtestPotential> }>(null);

  function calculate() {
    const a = parseInt(assessed.replace(/,/g, ''));
    const m = parseInt(market.replace(/,/g, ''));
    if (!a || !m || a < 50000) return;
    const gap = m - a;
    const pct = Math.round(((m - a) / a) * 1000) / 10;
    const taxRate = 0.022;
    const taxSavings = Math.round(gap * taxRate * 0.8);
    setResult({ gap, pct, taxSavings, protest: getProtestPotential(a, m) });
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#1e40af', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>🏛️ DFW Property Tax Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Assessed Value vs Market Value in DFW</h1>
        <p style={{ color: '#64748b', marginBottom: 32 }}>Why your CAD assessed value often lags your real market value in DFW — and how to use that gap to protest your property taxes.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Texas 10% Cap Rule', desc: 'Your assessed value cannot increase more than 10% per year (homestead exemption), even if market value surges 30%.' },
            { label: 'Non-Disclosure State', desc: 'Texas does not require sale price disclosure — CADs rely on models that often lag real prices by 1-2 years.' },
            { label: 'Protest Deadline', desc: 'DFW counties: protest deadline is May 15 or 30 days after notice arrives, whichever is later. Miss it and wait a year.' },
            { label: 'Informal vs Formal', desc: 'Most DFW protests resolve at informal hearing. Bring 3-5 comparable sales (comps) showing lower $/sqft than your assessed rate.' },
          ].map(item => (
            <div key={item.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#1e40af', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 14, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 6 }}>What Buyers Should Know About Assessed Value</div>
          <p style={{ color: '#78350f', fontSize: 14, marginBottom: 0 }}>In DFW, assessed value is NOT a reliable indicator of fair market value. It can be 10-25% below market in fast-appreciating areas. Do not use CAD assessed value to negotiate purchase price — use recent comparable sales. However, a low assessed value benefits you post-purchase by keeping property taxes lower until the CAD catches up.</p>
        </div>

        <div style={{ background: '#fff', border: '2px solid #1e40af', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#0f172a', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Protest Potential Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#64748b', fontSize: 13, display: 'block', marginBottom: 6 }}>CAD Assessed Value ($)</label>
              <input type='text' value={assessed} onChange={e => setAssessed(e.target.value)} placeholder='e.g. 380000′ style={{ width: '100%', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#0f172a', fontSize: 14, boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 13, display: 'block', marginBottom: 6 }}>Estimated Market Value ($)</label>
              <input type='text' value={market} onChange={e => setMarket(e.target.value)} placeholder='e.g. 450000′ style={{ width: '100%', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#0f172a', fontSize: 14, boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ color: '#64748b', fontSize: 13, display: 'block', marginBottom: 6 }}>County</label>
              <select value={county} onChange={e => setCounty(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, color: '#0f172a', fontSize: 13 }}>
                <option value=''>Select...</option>
                {COUNTIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#1e40af', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>Analyze Gap</button>
          {result && (
            <div style={{ marginTop: 20, background: '#f8fafc', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
                <div><div style={{ color: '#64748b', fontSize: 12 }}>Value Gap</div><div style={{ color: '#0f172a', fontSize: 20, fontWeight: 800 }}>${result.gap.toLocaleString()}</div><div style={{ color: '#64748b', fontSize: 12 }}>{result.pct}% below market</div></div>
                <div><div style={{ color: '#64748b', fontSize: 12 }}>Est. Annual Tax Savings (if protest wins)</div><div style={{ color: '#15803d', fontSize: 20, fontWeight: 800 }}>${result.taxSavings.toLocaleString()}/yr</div></div>
                <div><div style={{ color: '#64748b', fontSize: 12 }}>Protest Potential</div><div style={{ color: result.protest.color, fontSize: 20, fontWeight: 800 }}>{result.protest.rating}</div></div>
              </div>
              <div style={{ background: '#fff', borderRadius: 8, padding: 14, border: `1px solid ${result.protest.color}20` }}>
                <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>Recommendation:</div>
                <div style={{ color: '#1e293b', fontSize: 14 }}>{result.protest.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}