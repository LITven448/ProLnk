import { useState } from 'react';

export default function DFWHomeAffordabilityCalculator() {
  const [grossIncome, setGrossIncome] = useState(8000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(30000);
  const [interestRate, setInterestRate] = useState(6.8);
  const [propertyTaxRate, setPropertyTaxRate] = useState(2.3);

  const maxHousingPayment = grossIncome * 0.28;
  const maxTotalDebt = grossIncome * 0.43;
  const maxFromDTI = maxTotalDebt - monthlyDebts;
  const maxPI = Math.min(maxHousingPayment, maxFromDTI);

  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const loanFactor = (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);

  const monthlyInsuranceFactor = 0.006 / 12;
  const monthlyTaxFactor = propertyTaxRate / 100 / 12;
  const totalFactor = loanFactor + monthlyTaxFactor + monthlyInsuranceFactor;

  const maxHomeFromPI = maxPI / totalFactor;
  const maxHomePriceFull = maxHomeFromPI + downPayment / (1 + monthlyTaxFactor / loanFactor);
  const maxHomePrice = Math.max(0, (maxPI + downPayment * totalFactor) / (totalFactor + downPayment * loanFactor / (downPayment + 1)));

  const calcMaxHome = () => {
    let lo = 50000, hi = 5000000;
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2;
      const loan = mid - downPayment;
      if (loan <= 0) { hi = mid; continue; }
      const pi = loan * loanFactor;
      const tax = mid * monthlyTaxFactor;
      const ins = mid * monthlyInsuranceFactor;
      const pmi = (downPayment / mid < 0.20) ? loan * 0.008 / 12 : 0;
      const total = pi + tax + ins + pmi;
      if (total > maxPI) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  };

  const maxHome = calcMaxHome();
  const conservativeHome = maxHome * 0.85;
  const loanAmount = maxHome - downPayment;
  const monthlyPayment = loanAmount > 0 ? loanAmount * loanFactor + maxHome * monthlyTaxFactor + maxHome * monthlyInsuranceFactor : 0;
  const taxImpact = maxHome * propertyTaxRate / 100;

  const nationalTaxRate = 1.07;
  const nationalTaxAmt = maxHome * nationalTaxRate / 100;
  const dfwTaxPenalty = taxImpact - nationalTaxAmt;

  const extraBuyingPower = dfwTaxPenalty / (interestRate / 100 / 12);

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();
  const dtiRatio = ((monthlyDebts + monthlyPayment) / grossIncome * 100).toFixed(0);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>💡 DFW Home Affordability Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>See how DFW's high property taxes reduce your buying power vs. other states</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '💼 Monthly Gross Income', value: grossIncome, min: 2000, max: 50000, step: 250, set: setGrossIncome, prefix: '$' },
            { label: '💳 Monthly Debt Payments', value: monthlyDebts, min: 0, max: 5000, step: 50, set: setMonthlyDebts, prefix: '$' },
            { label: '💰 Down Payment Available', value: downPayment, min: 0, max: 500000, step: 2500, set: setDownPayment, prefix: '$' },
            { label: '📈 Interest Rate %', value: interestRate, min: 3, max: 12, step: 0.1, set: setInterestRate, suffix: '%' },
            { label: '🏛️ DFW Property Tax %', value: propertyTaxRate, min: 1.5, max: 3.5, step: 0.1, set: setPropertyTaxRate, suffix: '%' },
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
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20, textAlign: 'center' }}>🏠 Your DFW Buying Power</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🏆 Max Home Price</div>
              <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 700 }}>{fmt(maxHome)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>at 43% total DTI</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>✅ Recommended Price</div>
              <div style={{ color: '#4ade80', fontSize: 32, fontWeight: 700 }}>{fmt(conservativeHome)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>comfortable with cushion</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 16 }}>
            {[
              { label: '💵 Monthly Payment', val: fmt(monthlyPayment) },
              { label: '🏦 Loan Amount', val: fmt(Math.max(0, loanAmount)) },
              { label: '📊 DTI Ratio', val: `${dtiRatio}%` },
            ].map(({ label, val }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#991b1b', marginBottom: 10 }}>⚠️ DFW Property Tax Reality Check</div>
          <div style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.6 }}>
            <div>Annual DFW property taxes on {fmt(maxHome)}: <strong>{fmt(taxImpact)}</strong></div>
            <div>National avg property taxes (1.07%): <strong>{fmt(nationalTaxAmt)}</strong></div>
            <div style={{ marginTop: 8, fontWeight: 600 }}>You're paying {fmt(dfwTaxPenalty)}/yr MORE than the national avg — that’s equivalent to {fmt(dfwTaxPenalty / 12)}/mo in buying power redirected to taxes.</div>
          </div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 16, fontSize: 13, color: '#166534′ }}>
          💡 <strong>Income needed to buy comfortably:</strong> To buy a {fmt(conservativeHome)} home in DFW with no other debts, you'd need at least {fmt((conservativeHome * (loanFactor + monthlyTaxFactor + monthlyInsuranceFactor) * (1 - (downPayment / conservativeHome))) / 0.28)} gross monthly income.
        </div>
      </div>
    </div>
  );
}
