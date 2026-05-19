import { useState } from 'react';

const lockOptions = [
  { period: '30-day lock', cost: 'Free at most lenders', risk: 'Tight — works only if closing is on schedule', best: 'Clear-to-close loan, builder ready' },
  { period: '45-day lock', cost: 'Free or $250–$500', risk: 'Comfortable buffer for most purchases', best: 'Standard resale purchase in DFW' },
  { period: '60-day lock', cost: '$500–$1,500', risk: 'Good for new construction or delayed closings', best: 'New builds, complex transactions' },
  { period: 'Float down option', cost: '+0.25% added to rate', risk: 'Allows rate drop capture if market improves', best: 'When rates are trending down' },
];

export default function DFWMortgageRateLockGuide() {
  const [closingDays, setClosingDays] = useState('');
  const [rateTrend, setRateTrend] = useState('');
  const [result, setResult] = useState<null | { rec: string; reason: string; risk: string }>(null);

  function recommend() {
    const days = parseInt(closingDays);
    let rec = '';
    let reason = '';
    let risk = '';

    if (days <= 30) {
      rec = '30-Day Lock';
      reason = 'Your closing timeline is tight — a 30-day lock is free and appropriate.';
      risk = 'Low — but any closing delay could expire the lock and require an extension fee.';
    } else if (days <= 45) {
      rec = '45-Day Lock';
      reason = 'Standard choice for DFW resale purchases with a 4–6 week closing window.';
      risk = 'Low to moderate — standard buffer for most transactions.';
    } else if (days <= 60) {
      rec = '60-Day Lock';
      reason = 'Appropriate for new construction or complex deals. Worth the $500–$1,500 cost for certainty.';
      risk = 'Moderate — you pay a premium but avoid rate risk.';
    } else {
      rec = 'Extended lock or consider float';
      reason = 'For closings beyond 60 days, evaluate extended lock options or builder-specific lock programs.';
      risk = 'Higher — extended locks are expensive; discuss builder lock programs with your lender.';
    }

    if (rateTrend === 'falling' && days <= 45) {
      rec += ' + Float Down Option';
      reason += ' With rates trending down, add a float-down option to capture any rate improvement.';
    }

    setResult({ rec, reason, risk });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Mortgage Rate Lock Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Protect your rate while closing — timing matters in DFW.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 What Is a Rate Lock?</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>A rate lock guarantees your interest rate for a specified period while your loan processes. If rates rise after you lock, your rate stays fixed. If rates fall, you are locked in — unless you added a float-down option.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗓️ DFW Rate Lock Options</h2>
          {lockOptions.map(opt => (
            <div key={opt.period} style={{ background: '#F9FAFB', borderRadius: 8, padding: 14, marginBottom: 10, border: '1px solid #E2E8F0′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>{opt.period}</span>
                <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>{opt.cost}</span>
              </div>
              <div style={{ color: '#64748B', fontSize: 13, marginBottom: 3 }}>Risk: {opt.risk}</div>
              <div style={{ color: '#374151', fontSize: 13 }}>Best for: {opt.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>⚠️ What Happens If Closing Is Delayed?</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>In DFW, closing delays are common — title issues, HOA docs, repair negotiations. Rate lock extensions typically cost 0.125–0.25% of the loan amount per week. A 30-day extension on a $500K loan can cost $1,250–$2,500. Build buffer into your lock period.</p>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Lock Period Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Days until expected closing</label>
              <input type="number" value={closingDays} onChange={e => setClosingDays(e.target.value)} placeholder="e.g. 35″ style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Rate trend expectation</label>
              <select value={rateTrend} onChange={e => setRateTrend(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="rising">Rising — lock now</option>
                <option value="stable">Stable — standard lock</option>
                <option value="falling">Falling — consider float</option>
              </select>
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Lock Recommendation</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{result.rec}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 6 }}>{result.reason}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Risk note: {result.risk}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}