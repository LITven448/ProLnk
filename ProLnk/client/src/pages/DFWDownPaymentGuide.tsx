import { useState } from 'react';

export default function DFWDownPaymentGuide() {
  const [savings, setSavings] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [result, setResult] = useState<any>(null);

  const calcPMI = (ltv: number, loanAmt: number) => ltv > 0.80 ? Math.round(loanAmt * 0.0085 / 12) : 0;
  const calcPI = (loan: number) => {
    const r = 0.07 / 12;
    return Math.round(loan * (r * Math.pow(1 + r, 360)) / (Math.pow(1 + r, 360) - 1));
  };

  const calculate = () => {
    const sav = parseFloat(savings) || 0;
    const hp = parseFloat(targetPrice) || 390000;
    const taxes = Math.round((hp * 0.022) / 12);
    const insurance = Math.round((hp * 0.012) / 12);
    const closingCosts = Math.round(hp * 0.03);
    const scenarios = [
      { name: 'FHA 3.5%', pct: 0.035, note: '580+ credit score, mortgage insurance required' },
      { name: 'Conventional 3%', pct: 0.03, note: '620+ credit score, strong credit preferred' },
      { name: 'Conventional 5%', pct: 0.05, note: 'Lower PMI rate, more manageable' },
      { name: 'Conventional 10%', pct: 0.10, note: 'Significant PMI reduction' },
      { name: 'Conventional 20%', pct: 0.20, note: 'No PMI — saves $200–$300/mo' },
    ].map(s => {
      const dp = Math.round(hp * s.pct);
      const loan = hp - dp;
      const pmi = calcPMI(loan / hp, loan);
      const pi = calcPI(loan);
      const totalMonthly = pi + taxes + insurance + pmi;
      const canAfford = sav >= (dp + closingCosts);
      return { ...s, dp, loan, pmi, pi, totalMonthly, canAfford };
    });
    setResult({ scenarios, taxes, insurance, closingCosts, hp });
  };

  const programs = [
    { name: 'My First Texas Home', org: 'Texas State Affordable Housing Corp', benefit: 'Up to 5% down payment assistance + 30-yr fixed rate', link: '#' },
    { name: 'DFW Down Payment Assistance', org: 'City of Dallas / Fort Worth', benefit: 'Up to $25,000 forgivable loan for qualifying buyers', link: '#' },
    { name: 'Homes for Texas Heroes', org: 'TSAHC', benefit: 'Down payment grants for teachers, firefighters, nurses', link: '#' },
    { name: 'USDA Rural Loan', org: 'USDA', benefit: '0% down in eligible DFW suburbs like Melissa, Waxahachie', link: '#' },
    { name: 'VA Loan', org: 'VA / Lenders', benefit: '0% down for veterans — no PMI ever', link: '#' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW BUYER EDUCATION</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Down Payment Guide for DFW Homebuyers</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>DFW median home price is ~$390K. Here's exactly what each down payment option costs — and what assistance is available.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>🧮 Compare Your Down Payment Options</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter your available savings and target price to see which scenarios you can afford.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Available Savings ($)', val: savings, set: setSavings, ph: '25000' },
              { label: 'Target Home Price ($)', val: targetPrice, set: setTargetPrice, ph: '390000' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Compare Scenarios</button>

          {result && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>Closing costs estimated at ~${result.closingCosts.toLocaleString()} (3% of price). Taxes: ${result.taxes}/mo. Insurance: ${result.insurance}/mo.</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {result.scenarios.map((s: any) => (
                  <div key={s.name} style={{ background: s.canAfford ? '#f0fdf4' : '#f8fafc', borderRadius: 10, padding: 18, border: s.canAfford ? '2px solid #86efac' : '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name} {s.canAfford ? '✅' : '❌'}</div>
                        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{s.note}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, fontWeight: 800 }}>${s.totalMonthly.toLocaleString()}/mo</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>Down: ${s.dp.toLocaleString()} + Closing: ${result.closingCosts.toLocaleString()}</div>
                      </div>
                    </div>
                    {s.pmi > 0 && <div style={{ marginTop: 8, fontSize: 13, color: '#b45309', background: '#fef9c3', borderRadius: 6, padding: '6px 12px', display: 'inline-block' }}>⚠️ PMI: ${s.pmi}/mo until 20% equity reached</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🤝 Down Payment Assistance Programs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {programs.map(p => (
              <div key={p.name} style={{ background: '#f8fafc', borderRadius: 10, padding: 18, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Offered by: {p.org}</div>
                <div style={{ fontSize: 14, color: '#0A1628' }}>🎁 {p.benefit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
