import { useState } from 'react';

const data = {
  title: 'Bridge Loan Guide for DFW',
  subtitle: 'How to Buy Before You Sell in the DFW Market',
  sections: [
    {
      heading: '🌉 What Is a Bridge Loan?',
      body: 'A bridge loan is a short-term loan (6–12 months) secured against your current home that gives you cash to buy your next home before you sell. In DFW, where homes often move in 7–14 days, bridge loans let you compete like a non-contingent buyer.',
    },
    {
      heading: '💰 How Bridge Loan Costs Work',
      body: 'Interest rate: typically Prime + 2% (currently ~10.5%). Origination fee: 1–2 points. No payments often required during the loan term — interest accrues. You pay it off when your current home sells.',
    },
    {
      heading: '⚠️ Risk: What If Your Home Doesn\’t Sell?',
      body: 'If your DFW home sits unsold, you carry two mortgages plus bridge loan interest. DFW median days-on-market is under 30, but over-priced or condition-challenged homes can linger. Most lenders require a 20% equity cushion to approve.',
    },
    {
      heading: '🔄 Alternatives to Bridge Loans',
      body: '• HELOC: Tap existing equity at ~Prime+0.5%, but requires strong credit and income verification.\n• Contingency offer: Makes you less competitive but costs nothing.\n• Sale-leaseback: Sell first, rent back while you buy.\n• 401(k) loan: Use retirement funds temporarily (risky, consult a CPA).',
    },
    {
      heading: '🏡 DFW Market Speed Helps',
      body: 'The DFW metro consistently ranks top 5 nationally for home sale velocity. Frisco, McKinney, and Allen average under 20 days on market. This reduces bridge loan carry risk significantly compared to slower markets.',
    },
  ],
};

export default function DFWBridgeLoanGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [equity, setEquity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [result, setResult] = useState<null | { feasible: boolean; monthlyCost: number; risk: string; loanAmount: number }>(null);

  function calculate() {
    const hv = parseFloat(homeValue) || 0;
    const eq = parseFloat(equity) || 0;
    const pp = parseFloat(purchasePrice) || 0;
    const equityPct = hv > 0 ? eq / hv : 0;
    const feasible = equityPct >= 0.20 && eq > 0 && pp > 0;
    const loanAmount = Math.min(eq * 0.80, pp * 0.20);
    const monthlyRate = 0.105 / 12;
    const monthlyCost = loanAmount * monthlyRate;
    const risk = equityPct >= 0.40 ? 'Low' : equityPct >= 0.25 ? 'Moderate' : 'High';
    setResult({ feasible, monthlyCost, risk, loanAmount });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', color: '#111827', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#1e3a5f' }}>{data.title}</h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '2rem' }}>{data.subtitle}</p>
        {data.sections.map((s, i) => (
          <div key={i} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e3a5f' }}>{s.heading}</h2>
            <p style={{ color: '#374151', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{s.body}</p>
          </div>
        ))}
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#1e3a5f' }}>🧮 Bridge Loan Feasibility Calculator</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {[['Current Home Value ($)', homeValue, setHomeValue], ['Your Equity ($)', equity, setEquity], ['Target Purchase Price ($)', purchasePrice, setPurchasePrice]].map(([label, val, setter]: any) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem', color: '#374151′ }}>{label}</label>
                <input type="number" value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', boxSizing: 'border-box' }} placeholder="0″ />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#1e3a5f', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Calculate Feasibility</button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: result.feasible ? '#ecfdf5′ : '#fef2f2', borderRadius: '8px' }}>
              <p style={{ fontWeight: 700, color: result.feasible ? '#065f46′ : '#991b1b' }}>{result.feasible ? '✅ Bridge Loan Likely Feasible' : '❌ Bridge Loan May Not Be Approved'}</p>
              <p>Estimated Loan Amount: <strong>${result.loanAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}</strong></p>
              <p>Est. Monthly Interest Cost: <strong>${result.monthlyCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}/mo</strong></p>
              <p>Risk Level: <strong>{result.risk}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
