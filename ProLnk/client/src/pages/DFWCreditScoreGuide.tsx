import { useState } from 'react';

export default function DFWCreditScoreGuide() {
  const [score, setScore] = useState('');
  const [result, setResult] = useState<any>(null);

  const tiers = [
    { min: 760, label: 'Excellent', color: '#16a34a', bg: '#f0fdf4', rate: 6.75, desc: 'Best rates available. You qualify for every loan type.' },
    { min: 720, label: 'Very Good', color: '#0369a1', bg: '#f0f9ff', rate: 7.00, desc: 'Excellent rates, all loan types available.' },
    { min: 680, label: 'Good', color: '#0369a1', bg: '#f0f9ff', rate: 7.375, desc: 'All loan types available. Near-best rates.' },
    { min: 640, label: 'Fair', color: '#b45309', bg: '#fef9c3', rate: 7.875, desc: 'Conventional available. FHA preferred. Higher rates.' },
    { min: 620, label: 'Marginal', color: '#b45309', bg: '#fef9c3', rate: 8.375, desc: 'Conventional minimum. FHA strongly recommended.' },
    { min: 580, label: 'Poor', color: '#dc2626', bg: '#fef2f2', rate: 8.875, desc: 'FHA only (3.5% down). Work on improving before buying.' },
    { min: 0, label: 'Very Poor', color: '#dc2626', bg: '#fef2f2', rate: 0, desc: 'Below FHA minimum. Focus on credit repair for 6–12 months.' },
  ];

  const calculate = () => {
    const s = parseInt(score);
    if (!s || s < 300 || s > 850) return;
    const tier = tiers.find(t => s >= t.min) || tiers[tiers.length - 1];
    const loanAmt = 370500;
    const r = tier.rate / 100 / 12;
    const monthly = tier.rate > 0 ? Math.round(loanAmt * (r * Math.pow(1 + r, 360)) / (Math.pow(1 + r, 360) - 1)) : 0;
    const bestTier = tiers[0];
    const rBest = bestTier.rate / 100 / 12;
    const monthlyBest = Math.round(loanAmt * (rBest * Math.pow(1 + rBest, 360)) / (Math.pow(1 + rBest, 360) - 1));
    const monthlySavings = monthly - monthlyBest;
    const lifetimeSavings = monthlySavings * 360;
    setResult({ tier, s, monthly, monthlySavings, lifetimeSavings, rate: tier.rate });
  };

  const improvements = [
    { action: 'Pay down credit cards below 30% utilization', impact: '+20–80 pts', time: '1–2 months' },
    { action: 'Become an authorized user on a family member\’s old card', impact: '+10–30 pts', time: '1 month' },
    { action: 'Dispute errors on your credit report (free at AnnualCreditReport.com)', impact: '+10–50 pts', time: '30–60 days' },
    { action: 'Don\’t close old credit cards — length of history matters', impact: '+5–15 pts', time: 'Ongoing' },
    { action: 'Stop applying for new credit 6 months before buying', impact: 'Prevents drops', time: 'Now' },
    { action: 'Set up automatic payments to eliminate late payments', impact: 'Prevents drops', time: 'Now' },
    { action: 'Pay collections under $500 that are still reporting', impact: '+10–40 pts', time: '1–3 months' },
  ];

  const donts = [
    'Don\’t open new credit cards or car loans',
    'Don\’t make large cash deposits without documentation',
    'Don\’t co-sign any loans for others',
    'Don\’t miss any payments — even one is devastating',
    'Don\’t close existing credit accounts',
    'Don\’t max out existing credit lines',
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DFW BUYER EDUCATION</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Credit Score Guide for DFW Homebuyers</h1>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>A 80-point difference in credit score can cost you $200+/mo on a DFW mortgage. Know where you stand and how to improve.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #e2e8f0′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>📊 Check Your Score Tier</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Based on a $390K DFW home with 5% down ($370,500 loan) at current rates.</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Credit Score (300–850)</label>
              <input value={score} onChange={e => setScore(e.target.value)} placeholder="720″ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap' }}>See My Options</button>
          </div>

          {result && (
            <div style={{ background: result.tier.bg, borderRadius: 10, padding: 22, border: `2px solid ${result.tier.color}20` }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ background: result.tier.color, color: '#fff', borderRadius: 10, padding: '10px 20px', textAlign: 'center', minWidth: 90 }}>
                  <div style={{ fontSize: 28, fontWeight: 900 }}>{result.s}</div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{result.tier.label}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{result.tier.desc}</div>
                  {result.tier.rate > 0 ? (
                    <>
                      <div style={{ fontSize: 14, color: '#475569', marginBottom: 8 }}>Estimated rate: <strong>{result.rate}%</strong> → <strong>${result.monthly.toLocaleString()}/mo</strong> (P&I only)</div>
                      {result.monthlySavings > 0 && (
                        <div style={{ background: '#fef9c3', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#92400e' }}>
                          ⚡ Improving to 760+ could save <strong>${result.monthlySavings}/mo</strong> = <strong>${result.lifetimeSavings.toLocaleString()}</strong> over 30 years
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ fontSize: 14, color: '#dc2626′ }}>Below minimum for most loan programs. Focus on credit repair before applying.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #e2e8f0′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📈 How to Improve Your Score</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {improvements.map(imp => (
              <div key={imp.action} style={{ display: 'flex', gap: 14, padding: 14, background: '#f8fafc', borderRadius: 8, alignItems: 'center' }}>
                <div style={{ minWidth: 80, textAlign: 'center', background: '#f0fdf4', borderRadius: 6, padding: '4px 8px', fontSize: 12, fontWeight: 700, color: '#16a34a' }}>{imp.impact}</div>
                <div style={{ flex: 1, fontSize: 14 }}>{imp.action}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', whiteSpace: 'nowrap' }}>{imp.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fef2f2', borderRadius: 12, padding: 28, border: '1px solid #fca5a5′ }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#991b1b' }}>🚫 While You're Buying — Never Do This</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {donts.map(d => (
              <div key={d} style={{ fontSize: 14, color: '#7f1d1d', padding: '8px 12px', background: '#fff', borderRadius: 6, border: '1px solid #fca5a5′ }}>❌ {d}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
