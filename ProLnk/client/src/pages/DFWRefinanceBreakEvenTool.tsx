import { useState } from 'react';

export default function DFWRefinanceBreakEvenTool() {
  const [currentRate, setCurrentRate] = useState('');
  const [newRate, setNewRate] = useState('');
  const [loanBalance, setLoanBalance] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [results, setResults] = useState<null | {
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    breakEvenMonths: number;
    fiveYearSavings: number;
    recommendation: string;
  }>(null);

  function calcMonthlyPayment(balance: number, annualRate: number, years = 30) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return balance / n;
    return (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  function calculate() {
    const cr = parseFloat(currentRate) || 0;
    const nr = parseFloat(newRate) || 0;
    const lb = parseFloat(loanBalance.replace(/,/g, '')) || 0;
    const cc = parseFloat(closingCosts.replace(/,/g, '')) || 0;
    const currentPayment = calcMonthlyPayment(lb, cr);
    const newPayment = calcMonthlyPayment(lb, nr);
    const monthlySavings = currentPayment - newPayment;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(cc / monthlySavings) : 999;
    const fiveYearSavings = monthlySavings * 60 - cc;
    let recommendation = '';
    if (monthlySavings <= 0) recommendation = '⛔ New rate is higher — do not refinance.';
    else if (breakEvenMonths <= 24) recommendation = '✅ Strong refi case — break even in under 2 years.';
    else if (breakEvenMonths <= 48) recommendation = '🟡 Decent refi — worth it if you stay 4+ years.';
    else recommendation = '⏳ Long break-even — consider waiting for rates to drop further.';
    setResults({ currentPayment, newPayment, monthlySavings, breakEvenMonths, fiveYearSavings, recommendation });
  }

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔄📉</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Refinance Break-Even Tool</h1>
          <p style={{ color: '#4B5563', fontSize: 15 }}>Find out if refinancing pencils out in Dallas-Fort Worth</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 24 }}>
          {[
            { label: 'Current Interest Rate (%)', value: currentRate, set: setCurrentRate, placeholder: '7.25' },
            { label: 'New Interest Rate (%)', value: newRate, set: setNewRate, placeholder: '6.50' },
            { label: 'Remaining Loan Balance ($)', value: loanBalance, set: setLoanBalance, placeholder: '320,000' },
            { label: 'Estimated Closing Costs ($)', value: closingCosts, set: setClosingCosts, placeholder: '8,500' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</label>
              <input
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          ))}
          <div style={{ background: '#FEF9C3', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#92400E', marginBottom: 16 }}>
            💡 DFW tip: Avg closing costs run 1.5–2.5% of loan balance in North Texas
          </div>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate Break-Even 🔍
          </button>
        </div>

        {results && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ background: results.monthlySavings > 0 ? '#F0FDF4' : '#FEF2F2', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontWeight: 600, fontSize: 15 }}>
              {results.recommendation}
            </div>
            {[
              { label: 'Current Monthly Payment', value: fmt(results.currentPayment) },
              { label: 'New Monthly Payment', value: fmt(results.newPayment) },
              { label: 'Monthly Savings', value: fmt(results.monthlySavings), highlight: true },
              { label: 'Break-Even Point', value: results.breakEvenMonths < 999 ? `${results.breakEvenMonths} months` : 'N/A' },
              { label: '5-Year Net Savings', value: fmt(results.fiveYearSavings), highlight: results.fiveYearSavings > 0 },
            ].map(({ label, value, highlight }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontWeight: 500 }}>{label}</span>
                <span style={{ fontWeight: 700, fontSize: 17, background: highlight ? '#F5E642' : 'transparent', padding: highlight ? '2px 8px' : '0', borderRadius: 4 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
