import { useState } from 'react';

export default function DFWMortgagePaymentCalculator() {
  const [homePrice, setHomePrice] = useState(380000);
  const [downPayment, setDownPayment] = useState(10);
  const [interestRate, setInterestRate] = useState(6.8);
  const [county, setCounty] = useState('Dallas');
  const [hoa, setHoa] = useState(0);
  const [extraPayment, setExtraPayment] = useState(0);

  const countyTaxRates: Record<string, number> = {
    'Dallas': 2.32, 'Tarrant': 2.25, 'Collin': 2.01, 'Denton': 2.18,
    'Rockwall': 2.11, 'Ellis': 2.29, 'Johnson': 2.17, 'Kaufman': 2.41,
  };

  const taxRate = countyTaxRates[county] || 2.3;
  const downAmt = homePrice * (downPayment / 100);
  const loanAmount = homePrice - downAmt;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) || 0;
  const monthlyTax = (homePrice * taxRate / 100) / 12;
  const monthlyInsurance = homePrice * 0.006 / 12;
  const monthlyPMI = downPayment < 20 ? loanAmount * 0.008 / 12 : 0;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI + hoa;

  const totalPaid = monthlyPI * 360;
  const totalInterest = totalPaid - loanAmount;

  const extraRate = monthlyRate;
  let extraMonths = 0;
  let balance = loanAmount;
  while (balance > 0 && extraMonths < 360) {
    const interest = balance * extraRate;
    const principal = monthlyPI + extraPayment - interest;
    balance -= principal;
    extraMonths++;
  }
  const monthsSaved = 360 - extraMonths;
  const interestSaved = (monthlyPI * 360) - (monthlyPI * extraMonths + extraPayment * extraMonths);

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();
  const fmtDec = (n: number) => '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏦 DFW Mortgage Payment Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>True monthly cost including DFW county property taxes</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#0A1628', marginBottom: 12 }}>🏛️ DFW County</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Object.keys(countyTaxRates).map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{
                padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: county === c ? '#0A1628' : '#f1f5f9', color: county === c ? '#F5E642' : '#475569',
              }}>{c} ({countyTaxRates[c]}%)</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '🏡 Home Price', value: homePrice, min: 100000, max: 2000000, step: 5000, set: setHomePrice, prefix: '$' },
            { label: '📉 Down Payment %', value: downPayment, min: 3, max: 50, step: 1, set: setDownPayment, suffix: '%' },
            { label: '📈 Interest Rate %', value: interestRate, min: 3, max: 12, step: 0.1, set: setInterestRate, suffix: '%' },
            { label: '🏘️ HOA Monthly', value: hoa, min: 0, max: 1500, step: 25, set: setHoa, prefix: '$' },
            { label: '➕ Extra Principal/mo', value: extraPayment, min: 0, max: 2000, step: 50, set: setExtraPayment, prefix: '$' },
          ].map(({ label, value, min, max, step, set, prefix, suffix }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', background: '#0A1628', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                {prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}{suffix}
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', textAlign: 'center', marginBottom: 20 }}>
            Total Monthly: {fmtDec(totalMonthly)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: '💵 Principal & Interest', val: monthlyPI },
              { label: '🏛️ Property Tax', val: monthlyTax },
              { label: '🛡️ Homeowner Insurance', val: monthlyInsurance },
              { label: '📋 PMI', val: monthlyPMI, note: downPayment >= 20 ? '(not required)' : '' },
              { label: '🏘️ HOA', val: hoa },
            ].map(({ label, val, note }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{label} {note}</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{fmt(val)}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          {[
            { label: '💰 Total Interest', val: fmt(totalInterest), sub: 'over 30 years' },
            { label: extraPayment > 0 ? '⏩ Months Saved' : '📅 Loan Term', val: extraPayment > 0 ? `${monthsSaved} mo` : '360 mo', sub: extraPayment > 0 ? 'with extra payment' : '30 years' },
            { label: extraPayment > 0 ? '💸 Interest Saved' : '🏦 Loan Amount', val: extraPayment > 0 ? fmt(Math.max(interestSaved, 0)) : fmt(loanAmount), sub: extraPayment > 0 ? 'by paying extra' : 'after down payment' },
          ].map(({ label, val, sub }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0A1628' }}>{val}</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{sub}</div>
            </div>
          ))}
        </div>

        {downPayment < 20 && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: 16, fontSize: 13, color: '#991b1b' }}>
            ⚠️ <strong>PMI Alert:</strong> With {downPayment}% down, you'll pay {fmt(monthlyPMI)}/mo in PMI until you reach 20% equity. Put 20% down to save {fmt(monthlyPMI * 12)}/year.
          </div>
        )}
      </div>
    </div>
  );
}
