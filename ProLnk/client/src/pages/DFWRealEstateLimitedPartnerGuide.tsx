import { useState } from 'react';

const HOW_LP_WORKS = [
  { icon: '📋', title: 'Structure', detail: 'A general partner (GP) sources, acquires, and operates the property. Limited partners (LPs) contribute capital and receive pro-rata shares of cash flow and appreciation — with no day-to-day obligations.' },
  { icon: '🔒', title: 'Liability Protection', detail: 'LP liability is capped at the amount invested. You cannot lose more than your initial contribution, unlike direct ownership where debt recourse can exceed equity.' },
  { icon: '💸', title: 'Passive Income', detail: 'LPs typically receive preferred returns (6–8% annually) before the GP earns performance fees. Distributions may be monthly or quarterly depending on the deal structure.' },
  { icon: '📑', title: 'Accredited Investor Requirement', detail: 'Most DFW syndications require accredited status: net worth over $1M (excluding primary residence) or income over $200K single / $300K joint for the past two years.' },
];

const DFW_MARKET = 'DFW is one of the most active syndication markets in the US. Population growth, corporate relocations (Toyota, Goldman Sachs HQ moves), and strong rent fundamentals attract institutional and retail LP capital into multifamily, industrial, and mixed-use projects across Tarrant, Collin, and Dallas counties.';

export default function DFWRealEstateLimitedPartnerGuide() {
  const [investAmount, setInvestAmount] = useState('');
  const [holdYears, setHoldYears] = useState('5');
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    const inv = parseFloat(investAmount.replace(/,/g, '')) || 0;
    const yrs = parseInt(holdYears) || 5;
    if (inv < 25000) {
      setResult('Most DFW syndications have a $25K minimum — enter at least that amount.');
      return;
    }
    const prefReturn = 0.07;
    const equityMultiple = 1.75;
    const lpAnnualCash = inv * prefReturn;
    const lpTotalReturn = inv * equityMultiple;
    const stockAnnual = inv * Math.pow(1.10, yrs);
    const directOwnershipEquity = inv * Math.pow(1.08, yrs);
    setResult(
      `LP preferred return: $${lpAnnualCash.toLocaleString('en-US', { maximumFractionDigits: 0 })}/yr — ` +
      `Projected total return over ${yrs}yr: $${lpTotalReturn.toLocaleString('en-US', { maximumFractionDigits: 0 })} (${equityMultiple}x equity multiple) — ` +
      `S&P 500 comparison: $${stockAnnual.toLocaleString('en-US', { maximumFractionDigits: 0 })} — ` +
      `Direct ownership comparison: $${directOwnershipEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    );
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8eaf6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤝</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>DFW Real Estate Limited Partner Guide</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.05rem' }}>Invest in larger DFW real estate projects without being the operator</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>🏙️ The DFW Syndication Market</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>{DFW_MARKET}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {HOW_LP_WORKS.map((item) => (
            <div key={item.title} style={{ background: '#111d35', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.92rem', lineHeight: 1.65 }}>{item.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.15rem' }}>📈 What Returns to Expect</h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.7 }}>DFW multifamily syndications typically target 7–9% preferred returns, 15–20% IRR, and 1.6–2.2x equity multiples over 3–7 year hold periods. Industrial and NNN deals run lower yields but higher stability. Always verify the GP's track record, underwriting assumptions, and exit strategy before committing capital.</p>
        </div>
        <div style={{ background: '#111d35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.15rem' }}>📊 LP Return Estimator</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem', color: '#a0aec0′ }}>Investment Amount ($)</label>
              <input value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} placeholder="e.g. 100000″ style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ display: 'block', marginBottom: 4, fontSize: '0.9rem', color: '#a0aec0′ }}>Hold Period (years)</label>
              <select value={holdYears} onChange={(e) => setHoldYears(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2d3748', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}>
                {['3','5','7','10'].map((y) => <option key={y} value={y}>{y} years</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Compare Returns
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#F5E642', fontWeight: 600, fontSize: '0.93rem' }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
