import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const formatNumber = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);

export default function DFWHomeAffordabilityGuide() {
  const [grossIncome, setGrossIncome] = useState(8000);
  const [monthlyDebts, setMonthlyDebts] = useState(400);
  const [downPayment, setDownPayment] = useState(40000);
  const [rate, setRate] = useState(7.0);

  const maxHousingPayment28 = grossIncome * 0.28;
  const maxTotalDebt36 = grossIncome * 0.36;
  const maxHousingAfterDebts = maxTotalDebt36 - monthlyDebts;
  const maxHousingPayment = Math.min(maxHousingPayment28, maxHousingAfterDebts);

  const dfwTaxInsuranceHOA = 650;
  const availableForPITI = maxHousingPayment - dfwTaxInsuranceHOA;
  const monthlyRate = rate / 100 / 12;
  const numPayments = 360;
  const loanAmount =
    availableForPITI > 0
      ? (availableForPITI * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate
      : 0;
  const maxHomePrice = loanAmount + downPayment;

  const actualMonthlyPayment =
    loanAmount > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))
      : 0;
  const totalMonthly = actualMonthlyPayment + dfwTaxInsuranceHOA;

  const affordabilityScore = Math.min(100, Math.round((maxHomePrice / 400000) * 70 + (downPayment / maxHomePrice) * 30));

  const scoreLabel = affordabilityScore >= 80 ? 'Strong' : affordabilityScore >= 55 ? 'Moderate' : 'Stretched';
  const scoreColor = affordabilityScore >= 80 ? '#22c55e' : affordabilityScore >= 55 ? '#F5E642′ : '#ef4444';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          DFW Home Affordability Guide 2026
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          Understand your true buying power using the 28% and 36% rules — with DFW property tax reality baked in.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📐 The 28% Rule</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
              Housing costs (P+I+T+I) should not exceed 28% of gross monthly income.
            </p>
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 12, fontSize: 14, color: '#475569′ }}>
              At {formatCurrency(grossIncome)}/mo income → max housing: <strong style={{ color: '#0A1628′ }}>{formatCurrency(maxHousingPayment28)}/mo</strong>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>📊 The 36% Total Debt Rule</h2>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>
              All debt (housing + car + student loans) should not exceed 36% of gross income.
            </p>
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 12, fontSize: 14, color: '#475569′ }}>
              After other debts → max housing: <strong style={{ color: '#0A1628′ }}>{formatCurrency(maxHousingAfterDebts)}/mo</strong>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff3cd', borderRadius: 12, padding: 20, marginBottom: 40, borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Property Tax Reality Check</h3>
          <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>
            Texas has no state income tax but property taxes average <strong>2.1–2.8%</strong> of home value — among the highest in the nation.
            On a $400K home, expect <strong>$700–$933/mo</strong> in taxes alone, plus homeowner's insurance (~$150–200/mo) and potential HOA fees.
            This adds <strong>$400–800/mo</strong> vs. states like Colorado or Arizona at similar home prices.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Your DFW Affordability Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                Gross Monthly Income
              </label>
              <input
                type="number"
                value={grossIncome}
                onChange={e => setGrossIncome(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                Other Monthly Debts (car, student loans)
              </label>
              <input
                type="number"
                value={monthlyDebts}
                onChange={e => setMonthlyDebts(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                Down Payment ($)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={e => setDownPayment(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1″
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, color: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Max Home Price</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{formatCurrency(maxHomePrice)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Est. Total Monthly</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800 }}>{formatCurrency(totalMonthly)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>DFW Affordability</div>
                <div style={{ color: scoreColor, fontSize: 26, fontWeight: 800 }}>{scoreLabel}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: 16, fontSize: 13, color: '#94a3b8′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Principal & Interest</span><span style={{ color: '#fff' }}>{formatCurrency(actualMonthlyPayment)}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>DFW Property Tax + Insurance + HOA (est.)</span><span style={{ color: '#fff' }}>{formatCurrency(dfwTaxInsuranceHOA)}/mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Loan Amount</span><span style={{ color: '#fff' }}>{formatCurrency(loanAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0′ }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 DFW Homebuyer Checklist</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14, color: '#475569′ }}>
            {['✅ Budget for 2.1–2.8% annual property tax','✅ Add homeowner\’s insurance ($150–200/mo)','✅ Check HOA fees in target neighborhoods','✅ Budget 1% home value/yr for maintenance','✅ Consider Texas homestead exemption savings','✅ Get pre-approved before touring homes'].map(item => (
              <div key={item} style={{ padding: '8px 12px', background: '#F9FAFB', borderRadius: 8 }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
