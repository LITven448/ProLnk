import { useState } from 'react';

const LOANS = [
  { id: 'heloc', label: 'HELOC', baseRate: 8.5, term: 120, flex: 'High', note: 'Draw as needed; variable rate' },
  { id: 'heloan', label: 'Home Equity Loan', baseRate: 8.0, term: 120, flex: 'Medium', note: 'Fixed rate, lump sum' },
  { id: 'personal', label: 'Personal Loan', baseRate: 12.0, term: 60, flex: 'High', note: 'No equity needed; fast funding' },
  { id: 'cashout', label: 'Cash-Out Refi', baseRate: 7.2, term: 360, flex: 'Low', note: 'Resets mortgage; lowest rate' },
  { id: 'k203', label: 'FHA 203(k)', baseRate: 7.5, term: 360, flex: 'Low', note: 'Includes purchase + reno; FHA rules apply' },
  { id: 'cc', label: 'Credit Card', baseRate: 22.0, term: 24, flex: 'Very High', note: 'Only for small, short-term needs' },
];

function monthlyPayment(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export default function DFWHomeRenovationLoanComparison() {
  const [amount, setAmount] = useState('');
  const [equity, setEquity] = useState('');
  const [score, setScore] = useState('good');
  const [results, setResults] = useState<null | typeof LOANS>(null);

  function compare() {
    if (!amount) return;
    const amt = parseFloat(amount);
    const eq = parseFloat(equity) || 0;
    const scoreAdj = score === 'excellent' ? -0.5 : score === 'fair' ? 1.5 : 0;
    const filtered = LOANS.map(l => ({
      ...l,
      adjustedRate: Math.max(l.baseRate + scoreAdj, 3),
      available: l.id === 'heloc' || l.id === 'heloan' || l.id === 'cashout' ? eq >= amt * 0.8 : true,
    }));
    setResults(filtered as any);
  }

  const amt = parseFloat(amount) || 0;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏦</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>DFW Renovation Loan Comparison</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Compare 6 financing options side-by-side for your DFW home renovation project.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>🔢 Your Renovation Details</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Renovation Budget ($)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 35000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Home Equity Available ($)</label>
              <input type="number" value={equity} onChange={e => setEquity(e.target.value)} placeholder="e.g. 80000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Credit Score Range</label>
              <select value={score} onChange={e => setScore(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
                <option value="excellent">Excellent (750+)</option>
                <option value="good">Good (700–749)</option>
                <option value="fair">Fair (640–699)</option>
              </select>
            </div>
          </div>
          <button onClick={compare} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Compare Financing Options →</button>
        </div>

        {results && (
          <div style={{ display: 'grid', gap: 12 }}>
            {(results as any[]).sort((a: any, b: any) => {
              const ma = monthlyPayment(amt, a.adjustedRate, a.term);
              const mb = monthlyPayment(amt, b.adjustedRate, b.term);
              return ma - mb;
            }).map((loan: any, i: number) => {
              const mp = monthlyPayment(amt, loan.adjustedRate, loan.term);
              const total = mp * loan.term;
              const interest = total - amt;
              return (
                <div key={loan.id} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderLeft: i === 0 ? '4px solid #F5E642' : '4px solid #E2E8F0', opacity: loan.available ? 1 : 0.5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0A1628' }}>{i === 0 ? '🥇 ' : ''}{loan.label}</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{loan.note}</div>
                      {!loan.available && <div style={{ fontSize: 11, color: '#EF4444', marginTop: 4 }}>⚠️ Requires more equity</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: '#0A1628' }}>${mp.toFixed(0)}<span style={{ fontSize: 12, fontWeight: 400 }}>/mo</span></div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{loan.adjustedRate.toFixed(1)}% · {loan.term}mo</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 16 }}>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Total interest: <strong>${Math.round(interest).toLocaleString()}</strong></div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Flexibility: <strong>{loan.flex}</strong></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
