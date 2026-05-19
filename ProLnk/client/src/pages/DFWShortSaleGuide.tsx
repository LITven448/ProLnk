import { useState } from 'react';

const sections = [
  {
    icon: '📉',
    heading: 'What Is a Short Sale?',
    body: 'A short sale occurs when you sell your home for less than you owe on the mortgage, with lender approval. The lender agrees to accept less than the full payoff. In DFW, short sales are less common in appreciating markets but relevant if you bought at peak, did a cash-out refi, or face sudden hardship.',
  },
  {
    icon: '⏳',
    heading: 'Lender Approval Process and Timeline',
    body: '1. Submit hardship letter + financial package to lender.\n2. Lender assigns a negotiator (often a third-party loss mitigation firm).\n3. BPO (Broker Price Opinion) ordered — takes 1–2 weeks.\n4. Lender reviews and counters or approves — 30–90 days.\n5. Close once approved. Total timeline: 3–6 months typical.',
  },
  {
    icon: '💳',
    heading: 'Credit Impact vs. Foreclosure',
    body: 'Short sale: typically reported as "settled for less than amount owed." Credit score drop: 100–150 points. Fannie Mae waiting period: 2 years (with hardship documented) to 4 years.\nForeclosure: 150–200 point drop. 7-year public record. Fannie Mae waiting period: 7 years. Short sale is meaningfully better for your financial future.',
  },
  {
    icon: '💰',
    heading: 'Tax Implications of Short Sales',
    body: 'Forgiven debt may be taxable income (IRS Form 1099-C). Mortgage Debt Relief Act exclusions expired and are now extended year-to-year — check current status with a CPA. Texas has no state income tax, but federal tax still applies. Exception: principal residence + insolvency may qualify for exclusion.',
  },
  {
    icon: '⚖️',
    heading: 'Deficiency Risk in Texas',
    body: 'Texas law is borrower-friendly. Lenders CAN pursue a deficiency judgment after short sale, but typically waive it in the short sale agreement. Always negotiate a "full release of deficiency" in your short sale approval letter. Get it in writing or you may owe the difference years later.',
  },
];

export default function DFWShortSaleGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [hardship, setHardship] = useState('');
  const [result, setResult] = useState<null | {
    shortfall: number; shortSaleScore: number; foreclosureScore: number;
    ssTl: string; fcTl: string; defRisk: string; recommendation: string;
  }>(null);

  function calculate() {
    const hv = parseFloat(homeValue) || 0;
    const mort = parseFloat(mortgage) || 0;
    const shortfall = mort - hv;
    if (shortfall <= 0) {
      setResult({ shortfall: 0, shortSaleScore: 0, foreclosureScore: 0, ssTl: '', fcTl: '', defRisk: '', recommendation: 'Your home has positive equity — a short sale is not needed. You can sell normally and pay off the mortgage at closing.' });
      return;
    }
    const hardshipMap: Record<string, string> = {
      'Job Loss': 'Strong hardship case — lenders typically approve quickly.',
      'Divorce': 'Qualifying hardship, may require additional documentation.',
      'Medical': 'Strong case if documented. Include hospital bills.',
      'Rate Adjustment': 'Moderate case — lenders may offer modification first.',
      'Other': 'Submit detailed hardship letter with financial statements.',
    };
    const defRisk = shortfall > 100000 ? 'High — negotiate full release explicitly' : shortfall > 30000 ? 'Moderate — request waiver in approval letter' : 'Low — most lenders waive small deficiencies';
    setResult({
      shortfall,
      shortSaleScore: 660 - 125,
      foreclosureScore: 660 - 175,
      ssTl: '3–6 months',
      fcTl: '6–24 months + 7-year record',
      defRisk,
      recommendation: hardshipMap[hardship] || 'Document your hardship clearly and engage a HUD-approved housing counselor.',
    });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F5E642′ }}>Short Sale Guide — DFW</h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', marginBottom: '2rem' }}>When you owe more than your DFW home is worth: your options, process, and outcomes</p>
        {sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5E642′ }}>{s.icon} {s.heading}</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#0f2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🧮 Short Sale vs. Foreclosure Comparison</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {[['Home Value ($)', homeValue, setHomeValue], ['Mortgage Balance ($)', mortgage, setMortgage]].map(([label, val, setter]: any) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>{label}</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="0″ />
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#9ca3af' }}>Hardship Type</label>
              <select value={hardship} onChange={e => setHardship(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #374151', backgroundColor: '#1a2e4a', color: '#e5e7eb', fontSize: '1rem' }}>
                <option value="">Select...</option>
                {['Job Loss', 'Divorce', 'Medical', 'Rate Adjustment', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Compare Options</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#1a2e4a', borderRadius: '8px', border: '1px solid #374151′ }}>
              {result.shortfall === 0 ? (
                <p style={{ color: '#4ade80', fontWeight: 700 }}>✅ {result.recommendation}</p>
              ) : (
                <>
                  <p>Mortgage Shortfall: <strong style={{ color: '#f87171′ }}>${result.shortfall.toLocaleString(’en-US', { maximumFractionDigits: 0 })}</strong></p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                    <div style={{ padding: '0.75rem', backgroundColor: '#052e16', borderRadius: '8px' }}>
                      <p style={{ fontWeight: 700, color: '#4ade80′ }}>Short Sale</p>
                      <p>Timeline: {result.ssTl}</p>
                      <p>Credit Drop: ~125 pts</p>
                      <p>Buy Again: 2–4 yrs</p>
                    </div>
                    <div style={{ padding: '0.75rem', backgroundColor: '#3b0000', borderRadius: '8px' }}>
                      <p style={{ fontWeight: 700, color: '#f87171′ }}>Foreclosure</p>
                      <p>Timeline: {result.fcTl}</p>
                      <p>Credit Drop: ~175 pts</p>
                      <p>Buy Again: 7 yrs</p>
                    </div>
                  </div>
                  <p style={{ marginTop: '0.75rem' }}>Deficiency Risk: <strong>{result.defRisk}</strong></p>
                  <p style={{ marginTop: '0.5rem', color: '#9ca3af' }}>{result.recommendation}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
