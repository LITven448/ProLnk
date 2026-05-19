import { useState } from 'react';

export default function DFWCreditScoreHomeGuide2026() {
  const [score, setScore] = useState(700);
  const [result, setResult] = useState('');

  const dfwMedianLoan = 380000;

  const tiers = [
    { range: '760–850', label: 'Excellent', rate: 6.25, color: '#4ade80', note: 'Best conventional rates. No PMI with 20% down.' },
    { range: '740–759', label: 'Very Good', rate: 6.50, color: '#86efac', note: 'Near-best rates. Small premium vs. top tier.' },
    { range: '720–739', label: 'Good', rate: 6.875, color: '#F5E642', note: 'Solid approval. Slightly higher rate.' },
    { range: '700–719', label: 'Fair-Good', rate: 7.125, color: '#fbbf24', note: 'Approved, but meaningful rate premium.' },
    { range: '680–699', label: 'Fair', rate: 7.50, color: '#fb923c', note: 'Approved. Consider FHA if struggling with down payment.' },
    { range: '660–679', label: 'Below Average', rate: 7.875, color: '#f87171', note: 'Higher cost. PMI required. Explore score improvement.' },
    { range: '620–659', label: 'Marginal', rate: 8.50, color: '#ef4444', note: 'FHA floor. Limited conventional options.' },
    { range: 'Below 620', label: 'Poor', rate: null, color: '#dc2626', note: 'Conventional not available. FHA requires 580 minimum. Work on credit first.' },
  ];

  const monthlyPayment = (rate: number) => {
    const r = rate / 100 / 12;
    const n = 360;
    return Math.round(dfwMedianLoan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
  };

  const analyze = () => {
    let tier: typeof tiers[0] | undefined;
    if (score >= 760) tier = tiers[0];
    else if (score >= 740) tier = tiers[1];
    else if (score >= 720) tier = tiers[2];
    else if (score >= 700) tier = tiers[3];
    else if (score >= 680) tier = tiers[4];
    else if (score >= 660) tier = tiers[5];
    else if (score >= 620) tier = tiers[6];
    else tier = tiers[7];

    if (!tier.rate) {
      setResult('🔴 Score below 620 — FHA requires 580 minimum. Focus on: paying down revolving balances (biggest quick win), disputing errors on credit report, asking for credit limit increases, and avoiding new hard inquiries for 6 months. Expect 6-12 months to improve 40-60 points.');
      return;
    }

    const payment = monthlyPayment(tier.rate);
    const bestPayment = monthlyPayment(6.25);
    const diff = payment - bestPayment;
    const improvement = score < 760 ? `Improving to 760+ saves ~$${diff}/mo ($${(diff * 360).toLocaleString()} over loan life).` : 'You are in the top tier — maximize by shopping 3+ lenders for best rate.';
    setResult(`${tier.label} credit (score ${score}): Est. rate ${tier.rate}% → ~$${payment}/mo on DFW median $380K loan. ${improvement} ${tier.note}`);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW CREDIT SCORE GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Credit Score and Home Buying Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>On a DFW median loan, a 620 vs 760 score means a difference of <strong style={{ color: '#F5E642' }}>+/mo</strong> — that's ,000+ over 30 years.</p>

        <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '2rem' }}>
          {tiers.map(t => (
            <div key={t.range} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ color: t.color, fontWeight: 700, marginRight: '0.75rem' }}>{t.range}</span>
                <span style={{ color: '#cbd5e1' }}>{t.label}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                {t.rate ? (
                  <><span style={{ color: t.color, fontWeight: 700 }}>{t.rate}%</span><span style={{ color: '#94a3b8', fontSize: '0.83rem', marginLeft: '0.5rem' }}>~${monthlyPayment(t.rate).toLocaleString()}/mo</span></>
                ) : <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>Not qualified</span>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>📊 Your Score Impact Calculator</h2>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Credit Score: <strong style={{ color: '#fff', fontSize: '1.2rem' }}>{score}</strong></label>
            <input type='range' min={500} max={850} value={score} onChange={e => setScore(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              <span>500</span><span>620 FHA</span><span>700</span><span>740</span><span>760</span><span>850</span>
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>Analyze My Rate</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.2rem', color: '#94a3b8', fontSize: '0.88rem' }}>
          💡 Rapid rescore services through your lender can update your score in 3-5 days after paying down balances — ask your loan officer before applying.
        </div>
      </div>
    </div>
  );
}