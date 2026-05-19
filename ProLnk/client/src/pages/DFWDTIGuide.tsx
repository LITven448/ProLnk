import { useState } from 'react';

export default function DFWDTIGuide() {
  const [income, setIncome] = useState('');
  const [carPayment, setCarPayment] = useState('');
  const [studentLoan, setStudentLoan] = useState('');
  const [creditCards, setCreditCards] = useState('');
  const [otherDebts, setOtherDebts] = useState('');
  const [homePrice, setHomePrice] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const inc = parseFloat(income) || 0;
    const hp = parseFloat(homePrice) || 0;
    if (!inc || !hp) return;
    const rate = 0.07 / 12;
    const loanAmt = hp * 0.95;
    const months = 360;
    const pi = loanAmt * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const taxes = (hp * 0.022) / 12;
    const insurance = (hp * 0.012) / 12;
    const housing = pi + taxes + insurance;
    const allDebts = housing + (parseFloat(carPayment) || 0) + (parseFloat(studentLoan) || 0) + (parseFloat(creditCards) || 0) + (parseFloat(otherDebts) || 0);
    const frontEnd = ((housing / inc) * 100).toFixed(1);
    const backEnd = ((allDebts / inc) * 100).toFixed(1);
    const convFront = 28, convBack = 43, fhaFront = 31, fhaBack = 50;
    setResult({ housing: Math.round(housing), allDebts: Math.round(allDebts), frontEnd, backEnd, convFront, convBack, fhaFront, fhaBack, taxes: Math.round(taxes), pi: Math.round(pi), insurance: Math.round(insurance) });
  };

  const tiers = [
    { label: 'Front-End (Housing)', limit: 28, fha: 31, desc: 'Mortgage + taxes + insurance only' },
    { label: 'Back-End (All Debts)', limit: 43, fha: 50, desc: 'Housing + all monthly debt payments' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW BUYER EDUCATION</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Debt-to-Income Ratio Guide for DFW Homebuyers</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>DTI is the #1 reason mortgages get denied. In DFW, high property taxes make this calculation uniquely challenging.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'What is DTI?', icon: '📊', body: 'DTI = your monthly debt payments ÷ gross monthly income. Lenders use it to assess how much of your income goes to debt repayment.' },
            { label: 'Why DFW Is Different', icon: '🏛️', body: 'Texas property taxes (avg 2.0–2.5%) are included in your housing payment. On a $390K home, that\’s $650–$813/mo extra — dramatically affecting your front-end DTI.' },
          ].map(c => (
            <div key={c.label} style={{ background: '#fff', borderRadius: 12, padding: 22, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 8px' }}>{c.label}</h3>
              <p style={{ color: '#475569', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DTI Limits by Loan Type</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Ratio', 'Conventional Max', 'FHA Max', 'What It Covers'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tiers.map(t => (
                  <tr key={t.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600 }}>{t.label}</td>
                    <td style={{ padding: '12px 14px', color: '#0369a1' }}>{t.limit}%</td>
                    <td style={{ padding: '12px 14px', color: '#7c3aed' }}>{t.fha}%</td>
                    <td style={{ padding: '12px 14px', color: '#64748b' }}>{t.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>🧮 Calculate Your DTI</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter your financials to see your DTI and whether you qualify.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Gross Monthly Income ($)', val: income, set: setIncome, ph: '8000' },
              { label: 'Target Home Price ($)', val: homePrice, set: setHomePrice, ph: '390000' },
              { label: 'Car Payment(s) ($)', val: carPayment, set: setCarPayment, ph: '450' },
              { label: 'Student Loans ($)', val: studentLoan, set: setStudentLoan, ph: '350' },
              { label: 'Credit Card Minimums ($)', val: creditCards, set: setCreditCards, ph: '150' },
              { label: 'Other Monthly Debts ($)', val: otherDebts, set: setOtherDebts, ph: '0' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate My DTI</button>

          {result && (
            <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 10, padding: 22 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Your Results</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#fff', borderRadius: 8, padding: 14, textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>HOUSING PAYMENT</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>${result.housing.toLocaleString()}/mo</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>P&I ${result.pi} + Tax ${result.taxes} + Ins ${result.insurance}</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 8, padding: 14, textAlign: 'center', border: parseFloat(result.frontEnd) > 28 ? '2px solid #fca5a5' : '2px solid #86efac' }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>FRONT-END DTI</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: parseFloat(result.frontEnd) > 28 ? '#dc2626' : '#16a34a' }}>{result.frontEnd}%</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>Limit: 28% conv / 31% FHA</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 8, padding: 14, textAlign: 'center', border: parseFloat(result.backEnd) > 43 ? '2px solid #fca5a5' : '2px solid #86efac' }}>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>BACK-END DTI</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: parseFloat(result.backEnd) > 43 ? '#dc2626' : '#16a34a' }}>{result.backEnd}%</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>Limit: 43% conv / 50% FHA</div>
                </div>
              </div>
              {(parseFloat(result.backEnd) > 43) && (
                <div style={{ background: '#fef2f2', borderRadius: 8, padding: 16, border: '1px solid #fca5a5' }}>
                  <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: 8 }}>⚠️ Over the limit — here's how to fix it:</div>
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#7f1d1d', fontSize: 14, lineHeight: 1.8 }}>
                    <li>Pay down high-balance credit cards before applying</li>
                    <li>Pay off or refinance car loan if possible</li>
                    <li>Lower your target home price by $20–30K</li>
                    <li>Increase your down payment to reduce loan amount</li>
                    <li>Co-borrower with higher income can reduce DTI</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
