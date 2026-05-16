import { useState } from 'react';

const LOAN_TYPES = [
  { name: 'FHA', minDown: 3.5, minScore: 580, maxLoan: 472030, pmiRate: 0.55, note: 'Best for lower credit scores' },
  { name: 'Conventional', minDown: 3, minScore: 620, maxLoan: 766550, pmiRate: 0.5, note: 'PMI drops at 20% equity' },
  { name: 'VA', minDown: 0, minScore: 580, maxLoan: 766550, pmiRate: 0, note: 'Veterans only, no PMI ever' },
  { name: 'Jumbo', minDown: 10, minScore: 720, maxLoan: 9999999, pmiRate: 0.3, note: 'Loans above $766,550' },
];

const RATES = { '30yr': 6.85, '15yr': 6.15 };

const DFW_ASSISTANCE = [
  { name: 'TSAHC Home Sweet Texas', benefit: 'Up to 5% down payment grant', income: '$97,200 (family of 4)', link: 'tsahc.org' },
  { name: 'TDHCA My First TX Home', benefit: '30-yr fixed + down payment assistance', income: '$97,200 limit', link: 'tdhca.state.tx.us' },
  { name: 'City of Dallas DPA', benefit: 'Up to $60,000 forgivable loan', income: '80% AMI limit', link: 'dallashousingpolicy.com' },
  { name: 'Tarrant County HAP', benefit: 'Down payment + closing cost help', income: 'Varies by family size', link: 'tarrantcounty.com' },
];

export default function DFWMortgageGuide2026() {
  const [homePrice, setHomePrice] = useState(420000);
  const [downPct, setDownPct] = useState(10);
  const [creditScore, setCreditScore] = useState(700);
  const [term, setTerm] = useState<'30yr' | '15yr'>('30yr');

  const downPayment = homePrice * (downPct / 100);
  const loanAmount = homePrice - downPayment;
  const rate = RATES[term] / 100 / 12;
  const months = term === '30yr' ? 360 : 180;
  const monthlyPI = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

  const eligible = LOAN_TYPES.filter(lt =>
    creditScore >= lt.minScore &&
    downPct >= lt.minDown &&
    loanAmount <= lt.maxLoan
  );
  const recommended = eligible[eligible.length - 1] || LOAN_TYPES[0];
  const pmiMonthly = downPct < 20 ? loanAmount * (recommended.pmiRate / 100 / 12) : 0;
  const taxes = homePrice * 0.0225 / 12;
  const insurance = homePrice * 0.006 / 12;
  const totalMonthly = monthlyPI + pmiMonthly + taxes + insurance;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏡</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW Mortgage Guide 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          Current rates, loan types & down payment programs for Dallas-Fort Worth
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#0A1628' }}>📊 DFW Market Snapshot 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
            {[
              { label: 'Median Home Price', value: '$420,000' },
              { label: '30-yr Fixed Rate', value: '6.85%' },
              { label: '15-yr Fixed Rate', value: '6.15%' },
              { label: 'Conforming Limit', value: '$766,550' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>🧮 Monthly Payment Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { label: 'Home Price', key: 'homePrice', value: homePrice, min: 200000, max: 2000000, step: 10000, fmt: (v: number) => `$${v.toLocaleString()}`, set: setHomePrice },
              { label: `Down Payment (${downPct}%)`, key: 'down', value: downPct, min: 0, max: 50, step: 1, fmt: (v: number) => `${v}% = $${(homePrice * v / 100).toLocaleString()}`, set: setDownPct },
              { label: 'Credit Score', key: 'credit', value: creditScore, min: 500, max: 850, step: 10, fmt: (v: number) => `${v}`, set: setCreditScore },
            ].map(f => (
              <div key={f.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                  <span style={{ fontWeight: 600 }}>{f.label}</span>
                  <span style={{ color: '#0A1628', fontWeight: 700 }}>{f.fmt(f.value)}</span>
                </div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                  onChange={e => f.set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642' }} />
              </div>
            ))}
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Loan Term</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {(['30yr', '15yr'] as const).map(t => (
                  <button key={t} onClick={() => setTerm(t)}
                    style={{ flex: 1, padding: '10px', borderRadius: 8, border: '2px solid', cursor: 'pointer',
                      borderColor: term === t ? '#0A1628' : '#E2E8F0',
                      background: term === t ? '#0A1628' : '#fff',
                      color: term === t ? '#F5E642' : '#0A1628', fontWeight: 700, fontSize: 15 }}>
                    {t === '30yr' ? '30-Year (6.85%)' : '15-Year (6.15%)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: 10, padding: '20px', marginTop: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>Your Estimated Monthly Payment</div>
            {[
              { label: 'Principal & Interest', value: monthlyPI },
              { label: `PMI (${downPct < 20 ? recommended.pmiRate + '% — drops at 20% equity' : 'None — you\'re at 20%+ down ✅'})`, value: pmiMonthly },
              { label: 'Property Taxes (~2.25%)', value: taxes },
              { label: 'Home Insurance (~0.6%)', value: insurance },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #E2E8F0', fontSize: 14 }}>
                <span style={{ color: '#475569' }}>{row.label}</span>
                <span style={{ fontWeight: 600 }}>${row.value.toFixed(0)}/mo</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 20, fontWeight: 700 }}>
              <span>Total</span>
              <span style={{ color: '#0A1628' }}>${totalMonthly.toFixed(0)}/mo</span>
            </div>
            <div style={{ marginTop: 12, background: '#F5E642', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
              <strong>Recommended Loan:</strong> {recommended.name} — {recommended.note}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>💰 DFW Down Payment Assistance Programs</h2>
          {DFW_ASSISTANCE.map(p => (
            <div key={p.name} style={{ borderLeft: '4px solid #F5E642', padding: '12px 16px', marginBottom: 12, background: '#F8FAFC', borderRadius: '0 8px 8px 0' }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
              <div style={{ color: '#0A1628', fontWeight: 600, marginTop: 2 }}>✅ {p.benefit}</div>
              <div style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>Income limit: {p.income} · {p.link}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>📋 Loan Type Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0A1628', color: '#fff' }}>
                  {['Type', 'Min Down', 'Min Score', 'Max Loan', 'PMI'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOAN_TYPES.map((lt, i) => (
                  <tr key={lt.name} style={{ background: i % 2 === 0 ? '#F8FAFC' : '#fff' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>{lt.name}</td>
                    <td style={{ padding: '10px 12px' }}>{lt.minDown}%</td>
                    <td style={{ padding: '10px 12px' }}>{lt.minScore}</td>
                    <td style={{ padding: '10px 12px' }}>{lt.maxLoan === 9999999 ? 'No limit' : `$${lt.maxLoan.toLocaleString()}`}</td>
                    <td style={{ padding: '10px 12px' }}>{lt.pmiRate === 0 ? 'None' : `${lt.pmiRate}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 24 }}>
          Rates as of May 2026. Estimates for informational purposes only. Consult a licensed mortgage professional.
        </p>
      </div>
    </div>
  );
}
