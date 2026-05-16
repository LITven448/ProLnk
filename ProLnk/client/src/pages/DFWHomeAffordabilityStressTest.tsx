import { useState } from 'react';

const DFW_TAX_RATES: Record<string, number> = {
  Dallas: 0.0223,
  'Fort Worth': 0.0234,
  Plano: 0.0198,
  Frisco: 0.0212,
  McKinney: 0.0205,
  Arlington: 0.0241,
  Irving: 0.0219,
  Denton: 0.0188,
};

function calcDTI(income: number, debts: number, homePrice: number, rate: number, taxRate: number) {
  const loan = homePrice * 0.9;
  const monthlyRate = rate / 12;
  const payments = 360;
  const piti = loan * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
  const taxes = (homePrice * taxRate) / 12;
  const insurance = (homePrice * 0.0055) / 12;
  const totalHousing = piti + taxes + insurance;
  const totalDTI = (totalHousing + debts) / income;
  const housingRatio = totalHousing / income;
  return { piti: Math.round(piti), taxes: Math.round(taxes), insurance: Math.round(insurance), total: Math.round(totalHousing), totalDTI, housingRatio };
}

export default function DFWHomeAffordabilityStressTest() {
  const [income, setIncome] = useState(9000);
  const [debts, setDebts] = useState(600);
  const [homePrice, setHomePrice] = useState(380000);
  const [rate, setRate] = useState(7.0);
  const [city, setCity] = useState('Dallas');

  const taxRate = DFW_TAX_RATES[city];
  const base = calcDTI(income, debts, homePrice, rate / 100, taxRate);
  const rateStress = calcDTI(income, debts, homePrice, (rate + 2) / 100, taxRate);
  const incomeStress = calcDTI(income * 0.8, debts, homePrice, rate / 100, taxRate);
  const taxStress = calcDTI(income, debts, homePrice, rate / 100, taxRate * 1.15);

  const passBase = base.totalDTI < 0.43 && base.housingRatio < 0.28;
  const passRate = rateStress.totalDTI < 0.43;
  const passIncome = incomeStress.totalDTI < 0.43;
  const passTax = taxStress.totalDTI < 0.43;

  const score = [passBase, passRate, passIncome, passTax].filter(Boolean).length;
  const scoreColor = score === 4 ? '#16a34a' : score >= 2 ? '#d97706' : '#dc2626';
  const scoreLabel = score === 4 ? 'Strong' : score >= 2 ? 'Moderate' : 'Risky';

  const scenarios = [
    { label: '✅ Base Case', sub: `${rate}% rate, full income, current taxes`, pass: passBase, dti: base.totalDTI },
    { label: '📈 Rate +2%', sub: `If rates rise to ${(rate+2).toFixed(1)}%`, pass: passRate, dti: rateStress.totalDTI },
    { label: '📉 Income -20%', sub: 'Job change or reduction', pass: passIncome, dti: incomeStress.totalDTI },
    { label: '🏛️ Taxes +15%', sub: 'DFW reassessment scenario', pass: passTax, dti: taxStress.totalDTI },
  ];

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa', color: '#1a1a1a', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>🏦</div>
        <h1 style={{ color: '#0A1628', fontSize: '1.8rem', marginBottom: 4 }}>DFW Affordability Stress Test</h1>
        <p style={{ color: '#555', marginBottom: '1.5rem' }}>Test your home purchase against DFW market scenarios: rate spikes, income dips, and tax reassessments.</p>

        <div style={{ background: '#fff', borderRadius: 10, padding: '1.4rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Monthly Income: {fmt(income)}</label>
              <input type="range" min={3000} max={30000} step={250} value={income} onChange={e => setIncome(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: '#0A1628' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Monthly Debts: {fmt(debts)}</label>
              <input type="range" min={0} max={5000} step={50} value={debts} onChange={e => setDebts(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: '#0A1628' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Home Price: {fmt(homePrice)}</label>
              <input type="range" min={200000} max={1200000} step={5000} value={homePrice} onChange={e => setHomePrice(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: '#0A1628' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Rate: {rate.toFixed(1)}%</label>
              <input type="range" min={5.0} max={10.5} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))}
                style={{ width: '100%', marginTop: 6, accentColor: '#0A1628' }} />
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', marginTop: 6 }}>
              {Object.keys(DFW_TAX_RATES).map(c => <option key={c}>{c} — {(DFW_TAX_RATES[c]*100).toFixed(2)}% tax</option>)}
            </select>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.2rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#aaa', fontSize: '0.82rem' }}>Base Payment (PITI)</div>
            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{fmt(base.total)}/mo</div>
            <div style={{ color: '#888', fontSize: '0.78rem' }}>P&I {fmt(base.piti)} · Tax {fmt(base.taxes)} · Ins {fmt(base.insurance)}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#aaa', fontSize: '0.82rem' }}>Resilience Score</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: scoreColor }}>{score}/4</div>
            <div style={{ fontSize: '0.9rem', color: scoreColor, fontWeight: 600 }}>{scoreLabel}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {scenarios.map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: '0.9rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: `4px solid ${s.pass ? '#16a34a' : '#dc2626'}` }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#777' }}>{s.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: s.pass ? '#16a34a' : '#dc2626' }}>{s.pass ? 'PASS' : 'FAIL'}</div>
                <div style={{ fontSize: '0.75rem', color: '#888' }}>DTI: {(s.dti * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', background: '#fff', borderRadius: 8, padding: '0.9rem', color: '#666', fontSize: '0.8rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          📊 Pass criteria: total DTI below 43%, housing ratio below 28%. 10% down assumed.
        </div>
      </div>
    </div>
  );
}
