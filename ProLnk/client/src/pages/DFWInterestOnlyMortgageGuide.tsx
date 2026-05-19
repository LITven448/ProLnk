import { useState } from 'react';

export default function DFWInterestOnlyMortgageGuide() {
  const [purpose, setPurpose] = useState('');
  const [situation, setSituation] = useState('');
  const [loanAmount, setLoanAmount] = useState('500000');
  const [result, setResult] = useState<null | { rec: string; ioPayment: number; stdPayment: number; reason: string }>(null);

  function calculate() {
    const loan = parseInt(loanAmount) || 500000;
    const rate = 7.0;
    const ioPayment = Math.round(loan * rate / 100 / 12);
    const stdPayment = Math.round((loan * rate / 100 / 12) / (1 - Math.pow(1 + rate / 100 / 12, -360)));
    const isGoodFit = purpose === 'investment' || (purpose === 'primary' && situation === 'high-income-variable');
    setResult({
      rec: isGoodFit ? 'Interest-Only May Be Appropriate' : 'Standard Mortgage Recommended',
      ioPayment,
      stdPayment,
      reason: isGoodFit
        ? 'Your use case aligns with IO loan strengths — lower initial payments with capital deployed elsewhere.'
        : 'Standard amortization builds equity and is better suited to your situation.',
    });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>💰</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Interest-Only Mortgage Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>When IO loans make sense — and when they do not — in the DFW market.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 How Interest-Only Loans Work</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>During the IO period (typically 5–10 years), you pay only the interest — no principal reduction. After the IO period ends, the loan fully amortizes over the remaining term, causing a significant payment increase.</p>
          <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: 8, padding: 12 }}>
            <strong style={{ color: '#92400E' }}>Key risk:</strong> <span style={{ color: '#92400E', fontSize: 14 }}>You build zero equity during the IO period unless the property appreciates.</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>✅ When IO Loans Make Sense in DFW</h2>
          {[
            'Investment properties — maximize cash flow during hold period',
            'High-income professionals with variable bonuses using capital elsewhere',
            'Short-term hold strategy in rapidly appreciating DFW submarkets',
            'Bridge financing during transition periods',
          ].map(pt => (
            <div key={pt} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
              <span style={{ color: '#374151', fontSize: 14 }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏦 DFW Lender Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Min Credit Score', value: '720+' },
              { label: 'Down Payment', value: '20–30%' },
              { label: 'Max LTV', value: '70–80%' },
              { label: 'Reserve Requirement', value: '12–24 months' },
            ].map(item => (
              <div key={item.label} style={{ background: '#F9FAFB', borderRadius: 8, padding: 12, border: '1px solid #E2E8F0′ }}>
                <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#0A1628', fontSize: 16, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 IO vs Standard Payment Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Loan purpose</label>
              <select value={purpose} onChange={e => setPurpose(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="investment">Investment property</option>
                <option value="primary">Primary residence</option>
                <option value="second">Second home</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Financial situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                <option value="high-income-variable">High income, variable cash flow</option>
                <option value="stable-salaried">Stable salaried income</option>
                <option value="self-employed">Self-employed / business owner</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Loan amount ($)</label>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Compare Payments</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.rec}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 8 }}>
                <div style={{ background: '#0A1628', borderRadius: 6, padding: 10 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>IO Monthly Payment</div>
                  <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>${result.ioPayment.toLocaleString()}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 6, padding: 10 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>Standard Monthly Payment</div>
                  <div style={{ color: '#CBD5E1', fontSize: 20, fontWeight: 700 }}>${result.stdPayment.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.reason}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}