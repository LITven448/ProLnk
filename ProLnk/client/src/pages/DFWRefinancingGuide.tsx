import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function DFWRefinancingGuide() {
  const [currentBalance, setCurrentBalance] = useState(290000);
  const [currentRate, setCurrentRate] = useState(7.5);
  const [newRate, setNewRate] = useState(6.4);
  const [closingCosts, setClosingCosts] = useState(5500);
  const [remainingYears, setRemainingYears] = useState(26);

  const currentMonthlyRate = currentRate / 100 / 12;
  const newMonthlyRate = newRate / 100 / 12;
  const remainingPayments = remainingYears * 12;

  const currentPayment = currentBalance > 0
    ? (currentBalance * currentMonthlyRate) / (1 - Math.pow(1 + currentMonthlyRate, -remainingPayments))
    : 0;
  const newPayment = currentBalance > 0
    ? (currentBalance * newMonthlyRate) / (1 - Math.pow(1 + newMonthlyRate, -remainingPayments))
    : 0;

  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 999;
  const tenYearSavings = monthlySavings * 120 - closingCosts;
  const rateDiff = currentRate - newRate;

  const worthIt = breakEvenMonths <= 36 && monthlySavings > 0;

  const currentTotalInterest = currentPayment * remainingPayments - currentBalance;
  const newTotalInterest = newPayment * remainingPayments - currentBalance;
  const totalInterestSaved = currentTotalInterest - newTotalInterest;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🔄</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Mortgage Refinancing Guide 2026
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          DFW home values have surged — find out if refinancing your mortgage makes financial sense and calculate your exact break-even point.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[
            { icon: '📏', label: '1% Rate Reduction Rule', desc: 'Traditional threshold — refinancing typically makes sense when you can lower your rate by at least 1 percentage point.' },
            { icon: '📅', label: 'Break-Even Analysis', desc: 'Divide closing costs by monthly savings to find break-even. Under 36 months = likely worth it. Under 24 = strong yes.' },
            { icon: '🏠', label: 'DFW Cash-Out Opportunity', desc: 'DFW values up 40%+ since 2020. Many homeowners have $80K–$200K in accessible equity for cash-out refinancing.' },
          ].map(card => (
            <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔄 Rate-and-Term Refi</h3>
            <div style={{ fontSize: 14, color: '#475569' }}>
              <p style={{ marginBottom: 8 }}>Lower your interest rate or change loan length (30→15 yr). Keeps your loan balance the same.</p>
              <div style={{ background: '#dcfce7', borderRadius: 8, padding: 12 }}>
                <strong style={{ color: '#166534' }}>Best for:</strong> Reducing monthly payment or total interest paid when rates have dropped from your original loan.
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💵 Cash-Out Refi</h3>
            <div style={{ fontSize: 14, color: '#475569' }}>
              <p style={{ marginBottom: 8 }}>Borrow more than you owe and take the difference in cash. Creates a new, larger loan.</p>
              <div style={{ background: '#fef3c7', borderRadius: 8, padding: 12 }}>
                <strong style={{ color: '#92400e' }}>Best for:</strong> Home improvements, debt consolidation, or investment if the net rate beats alternatives. Higher risk — don't use for lifestyle expenses.
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff3cd', borderRadius: 12, padding: 20, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>💰 Typical DFW Refinancing Costs (2026)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, color: '#475569' }}>
            {[
              'Origination fee: 0.5–1% of loan amount',
              'Appraisal: $400–700 (DFW rates)',
              'Title insurance: $1,000–2,500',
              'Recording fees: $50–150',
              'Attorney/closing fees: $500–1,000',
              'Total typical range: $3,000–8,000',
            ].map(item => (
              <div key={item} style={{ background: '#fffbeb', padding: '6px 10px', borderRadius: 6 }}>📌 {item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Refinance Break-Even Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {[
              { label: 'Current Loan Balance ($)', value: currentBalance, setValue: setCurrentBalance, step: 5000 },
              { label: 'Current Interest Rate (%)', value: currentRate, setValue: setCurrentRate, step: 0.1 },
              { label: 'New Rate (%)', value: newRate, setValue: setNewRate, step: 0.1 },
              { label: 'Closing Costs ($)', value: closingCosts, setValue: setClosingCosts, step: 500 },
              { label: 'Remaining Loan Years', value: remainingYears, setValue: setRemainingYears, step: 1 },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type="number"
                  step={field.step}
                  value={field.value}
                  onChange={e => field.setValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ background: worthIt ? '#0A1628' : '#7f1d1d', borderRadius: 12, padding: 28, color: '#fff', marginBottom: 16 }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: worthIt ? '#F5E642' : '#fca5a5', marginBottom: 4 }}>
                {worthIt ? '✅ Refinancing Likely Makes Sense' : monthlySavings <= 0 ? '❌ Rate Increase — Not Worth It' : '⚠️ Long Break-Even — Evaluate Carefully'}
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>Rate reduction: {rateDiff.toFixed(2)} percentage points</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Monthly Savings</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{formatCurrency(Math.max(0, monthlySavings))}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Break-Even</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{breakEvenMonths < 999 ? `${breakEvenMonths} mo` : 'N/A'}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>10-Year Net Savings</div>
                <div style={{ color: tenYearSavings > 0 ? '#F5E642' : '#ef4444', fontSize: 24, fontWeight: 800 }}>{formatCurrency(tenYearSavings)}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: 16, marginTop: 20, fontSize: 13, color: '#94a3b8', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>Current payment: <span style={{ color: '#fff' }}>{formatCurrency(currentPayment)}/mo</span></div>
              <div>New payment: <span style={{ color: '#fff' }}>{formatCurrency(newPayment)}/mo</span></div>
              <div>Total interest saved: <span style={{ color: '#fff' }}>{formatCurrency(Math.max(0, totalInterestSaved))}</span></div>
              <div>Closing costs: <span style={{ color: '#fff' }}>{formatCurrency(closingCosts)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
