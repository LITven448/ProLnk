import { useState } from 'react';

const RATE_OPTIONS = ['5.5%', '6.0%', '6.5%', '7.0%', '7.5%', '8.0%'];
const PRICE_OPTIONS = [
  '$300,000', '$350,000', '$400,000', '$420,000 (DFW Median)',
  '$450,000', '$500,000', '$600,000', '$750,000',
];

function parsePrice(p: string): number {
  return parseInt(p.replace(/[$,]/g, '').replace(' (DFW Median)', ''));
}

function parseRate(r: string): number {
  return parseFloat(r.replace('%', '')) / 100;
}

function monthlyPayment(principal: number, annualRate: number, years = 30): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function buyingPower(targetPayment: number, annualRate: number, years = 30): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return targetPayment * n;
  return (targetPayment * (1 - Math.pow(1 + r, -n))) / r;
}

export default function DFWInterestRateImpactGuide() {
  const [rate, setRate] = useState('');
  const [price, setPrice] = useState('');
  const downPercent = 20;

  const principal = price ? parsePrice(price) * (1 - downPercent / 100) : 0;
  const annualRate = rate ? parseRate(rate) : 0;
  const basePayment = principal && annualRate ? monthlyPayment(principal, annualRate) : 0;

  const rateComparisons = rate && price ? RATE_OPTIONS.map(r => {
    const rVal = parseRate(r);
    const pmt = monthlyPayment(principal, rVal);
    const diff = pmt - basePayment;
    return { r, pmt, diff };
  }) : [];

  const dfwMedian = 420000;
  const dfwMedianPrincipal = dfwMedian * 0.8;

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#1E5FA8', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          📊 DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', marginBottom: 12, lineHeight: 1.2 }}>
          Interest Rate Impact Guide — DFW 2026
        </h1>
        <p style={{ color: '#64748B', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          In DFW where the median home sits near $420K, a 1% rate change shifts your monthly payment by ~$230 and your buying power by $35-45K. Here's how to navigate rates as a DFW homebuyer.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🏠', label: 'DFW Median Price 2026', value: '$420,000', note: 'Up from $310K in 2020' },
            { icon: '📉', label: '1% Rate Change Impact', value: '~$230/mo', note: 'At $420K, 20% down' },
            { icon: '💪', label: 'Buying Power Shift', value: '~$38,000', note: 'Per 1% rate difference' },
            { icon: '🔒', label: 'Lock Window', value: '30-60 days', note: 'Standard in DFW market' },
          ].map(({ icon, label, value, note }) => (
            <div key={label} style={{ background: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1E5FA8', marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>🧮 Calculate Your Rate Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 8, fontWeight: 500 }}>Current Rate / Rate You're Quoting</label>
              <select value={rate} onChange={e => setRate(e.target.value)}
                style={{ width: '100%', background: '#F8FAFC', color: '#1E293B', border: '1.5px solid #CBD5E1', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select rate...</option>
                {RATE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', display: 'block', marginBottom: 8, fontWeight: 500 }}>Target Home Price</label>
              <select value={price} onChange={e => setPrice(e.target.value)}
                style={{ width: '100%', background: '#F8FAFC', color: '#1E293B', border: '1.5px solid #CBD5E1', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select price...</option>
                {PRICE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {basePayment > 0 && (
            <>
              <div style={{ background: '#EFF6FF', borderRadius: 10, padding: 20, marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#1E5FA8', fontWeight: 600, marginBottom: 4 }}>Your Estimated Monthly Payment (P&I, 20% down, 30yr)</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#0F172A' }}>${Math.round(basePayment).toLocaleString()}/mo</div>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Loan amount: ${principal.toLocaleString()} at {rate}</div>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>How This Changes at Different Rates</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {rateComparisons.map(({ r, pmt, diff }) => {
                  const isSelected = r === rate;
                  const isBetter = diff < 0;
                  return (
                    <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: isSelected ? '#EFF6FF' : '#F8FAFC', borderRadius: 8, border: isSelected ? '1.5px solid #1E5FA8' : '1px solid #E2E8F0' }}>
                      <div style={{ minWidth: 50, fontSize: 14, fontWeight: 700, color: '#1E5FA8' }}>{r}</div>
                      <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: '#0F172A' }}>${Math.round(pmt).toLocaleString()}/mo</div>
                      {!isSelected && (
                        <div style={{ fontSize: 13, fontWeight: 600, color: isBetter ? '#16A34A' : '#DC2626' }}>
                          {isBetter ? '↓' : '↑'} ${Math.abs(Math.round(diff)).toLocaleString()}/mo
                        </div>
                      )}
                      {isSelected && <div style={{ fontSize: 12, color: '#1E5FA8', fontWeight: 600 }}>YOUR RATE</div>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>📈 How DFW Prices Have Responded to Rate Changes</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { period: '2020-2021 (rates 2.5-3.5%)', impact: 'DFW prices surged 25-35%. Low rates + remote work migration created demand shock. $310K median → $420K peak.', color: '#16A34A' },
              { period: '2022-2023 (rates 6.5-7.5%)', impact: 'DFW prices corrected 5-10% in some submarkets but never crashed. Population growth absorbed rate shock better than most metros.', color: '#D97706' },
              { period: '2024-2025 (rates 6.0-7.0%)', impact: 'Stabilization. Inventory rose in exurbs (Celina, Prosper) as builders competed. DFW core remained resilient near $420K median.', color: '#1E5FA8' },
              { period: '2026 Outlook (rates 6.0-6.5%)', impact: 'Corporate relocations continue providing demand floor. Sub-6% rates would likely re-accelerate prices 8-12% in growth corridors.', color: '#7C3AED' },
            ].map(({ period, impact, color }) => (
              <div key={period} style={{ padding: 14, background: '#F8FAFC', borderRadius: 8, borderLeft: `4px solid ${color}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 6 }}>{period}</div>
                <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5 }}>{impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F172A', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔒 When to Lock Your Rate in DFW</h2>
          {['Lock as soon as you go under contract — DFW deals move fast and float risk isn\’t worth it in volatile rate environments.', 'If rates drop after locking, ask about float-down options — some lenders offer one-time adjustment at no cost.', 'Pre-underwritten approval (not just pre-qual) lets you lock faster when you find the right home.', 'In DFW\’s fast market, being locked gives sellers confidence — treat it as a negotiating asset.'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 24, height: 24, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#0A1628', marginTop: 1 }}>{i + 1}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
