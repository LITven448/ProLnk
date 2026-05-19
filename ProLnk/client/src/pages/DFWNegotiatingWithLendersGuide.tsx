import { useState } from 'react';

const negotiables = [
  { item: 'Origination fee', typical: '0.5–1% of loan', notes: 'Often reducible by 0.25–0.5% with competing offers' },
  { item: 'Discount points', typical: '1 point = 0.25% rate reduction', notes: 'Negotiate how many points are required' },
  { item: 'Rate lock fee', typical: '$500–$1,500', notes: 'Many lenders waive this to win your business' },
  { item: 'Appraisal fee', typical: '$500–$800', notes: 'Some lenders cover this upfront to compete' },
  { item: 'Processing fee', typical: '$300–$900', notes: 'Fully negotiable — often waived for strong profiles' },
];

export default function DFWNegotiatingWithLendersGuide() {
  const [loanType, setLoanType] = useState('');
  const [creditScore, setCreditScore] = useState('');
  const [result, setResult] = useState<null | { leverage: string[]; savings: number }>(null);

  function calculate() {
    const score = parseInt(creditScore);
    const leverage: string[] = [];
    let savings = 0;

    if (score >= 760) { leverage.push('Excellent credit — demand 0.25% rate reduction or full fee waiver'); savings += 2000; }
    else if (score >= 720) { leverage.push('Strong credit — negotiate origination fee down by 50%'); savings += 1200; }
    else { leverage.push('Work on credit score before negotiating for best results'); }

    if (loanType === 'conventional') { leverage.push('Get quotes from 3+ lenders — DFW market is competitive for conventional loans'); savings += 1500; }
    if (loanType === 'jumbo') { leverage.push('Jumbo borrowers have strong negotiating power — lenders compete heavily for these loans'); savings += 3000; }
    if (loanType === 'fha') { leverage.push('FHA terms are set — focus negotiation on lender fees, not rate'); savings += 800; }

    leverage.push('Request Loan Estimates from all lenders on the same day for true comparison');
    setResult({ leverage, savings });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>Negotiating With Mortgage Lenders in DFW</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>DFW lenders compete hard for your business — use that leverage.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 What Is Negotiable</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0A1628′ }}>
                  <th style={{ color: '#F5E642', padding: '10px 12px', textAlign: 'left', borderRadius: '6px 0 0 0′ }}>Item</th>
                  <th style={{ color: '#F5E642', padding: '10px 12px', textAlign: 'left' }}>Typical Cost</th>
                  <th style={{ color: '#F5E642', padding: '10px 12px', textAlign: 'left', borderRadius: '0 6px 0 0′ }}>Negotiation Tip</th>
                </tr>
              </thead>
              <tbody>
                {negotiables.map((row, i) => (
                  <tr key={row.item} style={{ background: i % 2 === 0 ? '#F9FAFB' : '#fff' }}>
                    <td style={{ padding: '10px 12px', color: '#0A1628', fontWeight: 600 }}>{row.item}</td>
                    <td style={{ padding: '10px 12px', color: '#374151′ }}>{row.typical}</td>
                    <td style={{ padding: '10px 12px', color: '#374151′ }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🚫 What Lenders Will Not Budge On</h2>
          {['Government-set FHA/VA funding fees', 'Third-party title insurance rates (set by state)', 'Property tax escrow requirements', 'Mandatory PMI until 20% LTV (conventional)'].map(pt => (
            <div key={pt} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>❌</span>
              <span style={{ color: '#374151', fontSize: 14 }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>💡 DFW Market Advantage</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>DFW is one of the highest-volume mortgage markets in the US. Lenders — from community banks to national chains — actively compete for DFW borrowers. This gives you real negotiating power, especially on jumbo loans and conventional purchases above $400K.</p>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Your Negotiation Leverage Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Loan type</label>
              <select value={loanType} onChange={e => setLoanType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="conventional">Conventional</option>
                <option value="fha">FHA</option>
                <option value="va">VA</option>
                <option value="jumbo">Jumbo</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Credit score</label>
              <input type="number" value={creditScore} onChange={e => setCreditScore(e.target.value)} placeholder="e.g. 740″ style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show My Leverage Points</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Estimated negotiable savings: ${result.savings.toLocaleString()}</div>
              {result.leverage.map(l => (
                <div key={l} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#F5E642', fontSize: 14 }}>→</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14 }}>{l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}