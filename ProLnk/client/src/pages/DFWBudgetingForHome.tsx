import { useState } from 'react';

export default function DFWBudgetingForHome() {
  const [targetPrice, setTargetPrice] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const hp = parseFloat(targetPrice) || 390000;
    const sav = parseFloat(currentSavings) || 0;
    const inc = parseFloat(monthlyIncome) || 0;
    const dp = hp * 0.05;
    const loan = hp - dp;
    const r = 0.07 / 12;
    const pi = Math.round(loan * (r * Math.pow(1 + r, 360)) / (Math.pow(1 + r, 360) - 1));
    const taxes = Math.round((hp * 0.022) / 12);
    const insurance = Math.round((hp * 0.012) / 12);
    const hoa = 150;
    const maintenance = Math.round(hp * 0.01 / 12);
    const pmi = Math.round(loan * 0.0085 / 12);
    const total = pi + taxes + insurance + hoa + maintenance + pmi;
    const closingCosts = Math.round(hp * 0.03);
    const needed = dp + closingCosts;
    const savingsGap = Math.max(0, needed - sav);
    const incomeNeeded = Math.round((total / 0.28) * 1.2);
    const monthsToSave = savingsGap > 0 && inc > 0 ? Math.ceil(savingsGap / (inc * 0.15)) : 0;
    setResult({ hp, dp: Math.round(dp), loan: Math.round(loan), pi, taxes, insurance, hoa, maintenance, pmi, total, closingCosts, needed: Math.round(needed), savingsGap, incomeNeeded, monthsToSave, sav, inc });
  };

  const lineItems = result ? [
    { label: 'Principal & Interest (P&I)', amount: result.pi, note: '5% down at 7.0%' },
    { label: 'Property Taxes', amount: result.taxes, note: '~2.2% annual — DFW avg', highlight: true },
    { label: 'Homeowners Insurance', amount: result.insurance, note: '~1.2% annual' },
    { label: 'HOA Fees (estimated)', amount: result.hoa, note: 'Avg DFW community' },
    { label: 'PMI (until 20% equity)', amount: result.pmi, note: 'Removed when LTV < 80%', highlight: true },
    { label: 'Maintenance Reserve', amount: result.maintenance, note: '1% of home value/yr' },
  ] : [];

  const prepSteps = [
    { month: '1–2', title: 'Pull your credit report', detail: 'Free at AnnualCreditReport.com. Dispute any errors immediately.' },
    { month: '3–4', title: 'Open a dedicated savings account', detail: 'Separate account for down payment only. Automate transfers.' },
    { month: '5–6', title: 'Reduce credit card utilization below 30%', detail: 'Pay down balances to improve credit score before pre-approval.' },
    { month: '7–8', title: 'Get pre-approved', detail: 'Talk to 2–3 lenders. Compare rates, fees, and loan types.' },
    { month: '9–10', title: 'Research DFW neighborhoods and school districts', detail: 'Visit target areas, check flood maps, research property tax rates by ZIP.' },
    { month: '11–12', title: 'Start actively touring homes', detail: 'You\’re financially ready. Find a buyer\’s agent and begin serious search.' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW BUYER EDUCATION</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Budgeting for Homeownership in DFW</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>DFW property taxes alone add $650–$800/month to your payment. Know the true cost before you commit.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>🧮 Calculate True Monthly Cost</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter your details to see the complete cost breakdown and what income you need.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Target Home Price ($)', val: targetPrice, set: setTargetPrice, ph: '390000' },
              { label: 'Current Savings ($)', val: currentSavings, set: setCurrentSavings, ph: '30000' },
              { label: 'Gross Monthly Income ($)', val: monthlyIncome, set: setMonthlyIncome, ph: '9000' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate My Budget</button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Total Monthly Cost', value: `$${result.total.toLocaleString()}`, sub: 'All-in ownership cost', color: '#0A1628' },
                  { label: 'Income Needed', value: `$${result.incomeNeeded.toLocaleString()}/mo`, sub: 'Gross to stay under 28% DTI', color: result.inc >= result.incomeNeeded ? '#16a34a' : '#dc2626' },
                  { label: 'Savings Needed to Close', value: `$${result.needed.toLocaleString()}`, sub: `5% down + closing costs`, color: result.sav >= result.needed ? '#16a34a' : '#b45309' },
                ].map(card => (
                  <div key={card.label} style={{ background: '#f8fafc', borderRadius: 10, padding: 16, border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{card.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: card.color }}>{card.value}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{card.sub}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Monthly Cost Breakdown</h3>
              {lineItems.map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 14 }}>{item.label}</span>
                    {item.highlight && <span style={{ marginLeft: 8, fontSize: 11, background: '#fef9c3', color: '#92400e', borderRadius: 4, padding: '2px 6px' }}>DFW specific</span>}
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.note}</div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>${item.amount.toLocaleString()}/mo</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: '2px solid #0A1628', marginTop: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 800 }}>Total Monthly Cost</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#0A1628' }}>${result.total.toLocaleString()}/mo</span>
              </div>
              {result.savingsGap > 0 && (
                <div style={{ background: '#fef9c3', borderRadius: 8, padding: 16, marginTop: 12, border: '1px solid #fde68a' }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>💰 Savings Gap: ${result.savingsGap.toLocaleString()}</div>
                  <div style={{ fontSize: 14, color: '#92400e' }}>{result.monthsToSave > 0 ? `Saving 15% of income monthly, you could close this gap in ~${result.monthsToSave} months.` : 'Enter your income to calculate your savings timeline.'}</div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📅 12-Month Preparation Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {prepSteps.map(step => (
              <div key={step.month} style={{ display: 'flex', gap: 16, padding: 16, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 10px', fontWeight: 800, fontSize: 13, whiteSpace: 'nowrap', height: 'fit-content' }}>Mo {step.month}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
