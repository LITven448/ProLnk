import { useState } from 'react';

const armTypes = [
  { label: '5/1 ARM', fixed: 5, typical: 6.1, risk: 'Moderate' },
  { label: '7/1 ARM', fixed: 7, typical: 6.4, risk: 'Lower' },
  { label: '10/1 ARM', fixed: 10, typical: 6.7, risk: 'Lowest' },
];

export default function DFWAdjustableRateMortgageGuide() {
  const [timeline, setTimeline] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [loanAmount, setLoanAmount] = useState('400000');
  const [result, setResult] = useState<null | { type: string; reason: string; savings: number }>(null);

  function calculate() {
    const tl = parseInt(timeline);
    const loan = parseInt(loanAmount) || 400000;
    const fixedRate = 7.1;
    const armRate = 6.1;
    const monthlyFixed = (loan * fixedRate / 100 / 12) / (1 - Math.pow(1 + fixedRate / 100 / 12, -360));
    const monthlyArm = (loan * armRate / 100 / 12) / (1 - Math.pow(1 + armRate / 100 / 12, -360));
    const months = Math.min(tl * 12, 60);
    const savings = Math.round((monthlyFixed - monthlyArm) * months);

    if (tl <= 7 && riskTolerance !== 'low') {
      setResult({ type: 'ARM may work', reason: `If you plan to sell or refi within ${tl} years, you could save ~$${savings.toLocaleString()} before rates adjust.`, savings });
    } else {
      setResult({ type: 'Fixed-rate recommended', reason: 'Your timeline or low risk tolerance favors the stability of a 30-year fixed.', savings: 0 });
    }
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Adjustable Rate Mortgage Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>ARM vs Fixed — making the right call in the Dallas-Fort Worth market.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 ARM Types Available in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {armTypes.map(arm => (
              <div key={arm.label} style={{ background: '#F9FAFB', borderRadius: 8, padding: 16, border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#F5E642', background: '#0A1628', borderRadius: 6, padding: '4px 10px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{arm.label}</div>
                <div style={{ color: '#0A1628', fontSize: 13 }}>Fixed period: <strong>{arm.fixed} yrs</strong></div>
                <div style={{ color: '#0A1628', fontSize: 13 }}>Avg rate: <strong>{arm.typical}%</strong></div>
                <div style={{ color: '#64748B', fontSize: 12 }}>Risk: {arm.risk}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>✅ Who ARMs Make Sense For in DFW</h2>
          {['Planning to sell or move within 5–7 years', 'Expecting income growth that allows refinancing', 'Buying in a high-appreciation DFW corridor (Frisco, McKinney, Prosper)', 'Investors using short-term hold strategies'].map(pt => (
            <div key={pt} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>✓</span>
              <span style={{ color: '#374151', fontSize: 14 }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>⚠️ Rate Adjustment Risk</h2>
          <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>After the fixed period, your rate adjusts annually based on the SOFR index plus a margin (typically 2.5–3%). DFW appreciation may support refinancing before adjustments hit, but rates are never guaranteed. Caps: typically 2% per adjustment, 6% lifetime max.</p>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 ARM vs Fixed Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Planned years in home</label>
              <input type="number" value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="e.g. 6" style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Loan amount ($)</label>
              <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Risk tolerance</label>
            <select value={riskTolerance} onChange={e => setRiskTolerance(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="low">Low — I want predictability</option>
              <option value="medium">Medium — I can handle some uncertainty</option>
              <option value="high">High — I am comfortable with rate risk</option>
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get ARM Recommendation</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{result.type}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.reason}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}