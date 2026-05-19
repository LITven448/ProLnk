import { useState } from 'react';

export default function DFWInvestmentPropertyCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(320000);
  const [downPayment, setDownPayment] = useState(25);
  const [monthlyRent, setMonthlyRent] = useState(2400);
  const [vacancyRate, setVacancyRate] = useState(6);
  const [monthlyExpenses, setMonthlyExpenses] = useState(400);
  const [interestRate, setInterestRate] = useState(7.5);
  const [appreciationRate, setAppreciationRate] = useState(4.5);

  const downAmt = purchasePrice * (downPayment / 100);
  const loanAmount = purchasePrice - downAmt;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const monthlyPI = loanAmount > 0 ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) : 0;
  const monthlyTax = (purchasePrice * 2.3 / 100) / 12;
  const monthlyInsurance = purchasePrice * 0.006 / 12;
  const grossRent = monthlyRent * (1 - vacancyRate / 100);
  const totalMonthlyExpenses = monthlyPI + monthlyTax + monthlyInsurance + monthlyExpenses;
  const monthlyCashFlow = grossRent - totalMonthlyExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const annualGrossRent = grossRent * 12;
  const annualNOI = annualGrossRent - (monthlyTax + monthlyInsurance + monthlyExpenses) * 12;
  const capRate = (annualNOI / purchasePrice * 100).toFixed(2);
  const cashOnCash = downAmt > 0 ? (annualCashFlow / downAmt * 100).toFixed(2) : '0';
  const totalROI = ((annualCashFlow + purchasePrice * appreciationRate / 100) / downAmt * 100).toFixed(1);

  const value5 = purchasePrice * Math.pow(1 + appreciationRate / 100, 5);
  let balance5 = loanAmount;
  for (let i = 0; i < 60; i++) {
    const interest = balance5 * monthlyRate;
    const principal = monthlyPI - interest;
    balance5 = Math.max(0, balance5 - principal);
  }
  const equity5 = value5 - balance5;
  const cashFlow5 = annualCashFlow * 5;
  const totalReturn5 = equity5 - downAmt + cashFlow5;

  const fmt = (n: number) => '$' + Math.round(Math.abs(n)).toLocaleString();
  const positive = monthlyCashFlow >= 0;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📈 DFW Investment Property Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>DFW defaults: 4.5% appreciation, 6% vacancy, 2.3% property tax</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '🏠 Purchase Price', value: purchasePrice, min: 100000, max: 2000000, step: 5000, set: setPurchasePrice, prefix: '$' },
            { label: '💰 Down Payment %', value: downPayment, min: 15, max: 50, step: 1, set: setDownPayment, suffix: '%' },
            { label: '🏘️ Monthly Rent', value: monthlyRent, min: 500, max: 10000, step: 50, set: setMonthlyRent, prefix: '$' },
            { label: '📭 Vacancy Rate %', value: vacancyRate, min: 0, max: 20, step: 1, set: setVacancyRate, suffix: '%' },
            { label: '🔧 Monthly Expenses', value: monthlyExpenses, min: 0, max: 2000, step: 50, set: setMonthlyExpenses, prefix: '$' },
            { label: '📈 Interest Rate %', value: interestRate, min: 4, max: 14, step: 0.1, set: setInterestRate, suffix: '%' },
            { label: '🏙️ Appreciation Rate %', value: appreciationRate, min: 0, max: 10, step: 0.5, set: setAppreciationRate, suffix: '%' },
          ].map(({ label, value, min, max, step, set, prefix, suffix }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', background: '#0A1628', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                {prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}{suffix}
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 6 }}>Monthly Cash Flow</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: positive ? '#4ade80′ : '#f87171' }}>
              {positive ? '+' : '-'}{fmt(monthlyCashFlow)}/mo
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Gross Rent (adj. vacancy)</div>
              <div style={{ color: '#4ade80', fontSize: 18, fontWeight: 700 }}>+{fmt(grossRent)}/mo</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Total Expenses</div>
              <div style={{ color: '#f87171', fontSize: 18, fontWeight: 700 }}>-{fmt(totalMonthlyExpenses)}/mo</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Cap Rate', val: `${capRate}%` },
              { label: 'Cash-on-Cash', val: `${cashOnCash}%` },
              { label: 'Total ROI', val: `${totalROI}%` },
              { label: 'Annual NOI', val: fmt(annualNOI) },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>{label}</div>
                <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>🏗️ 5-Year Equity Build (DFW {appreciationRate}% appreciation)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Home Value in 5 Yrs', val: fmt(value5) },
              { label: 'Total Equity', val: fmt(equity5) },
              { label: 'Total Return', val: fmt(totalReturn5) },
            ].map(({ label, val }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#16a34a' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: 12, padding: 16, fontSize: 13, color: '#713f12′ }}>
          💡 <strong>DFW Investor Tip:</strong> DFW's {appreciationRate}% avg appreciation + population growth makes appreciation often larger than cash flow. Many DFW investors accept minimal cash flow to capture equity upside in high-growth corridors like Frisco, McKinney, and Prosper.
        </div>
      </div>
    </div>
  );
}
