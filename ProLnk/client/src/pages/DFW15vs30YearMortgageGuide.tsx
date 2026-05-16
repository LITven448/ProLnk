import { useState } from 'react';

function pmt(principal: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export default function DFW15vs30YearMortgageGuide() {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [rate30, setRate30] = useState('7.0');
  const [rate15, setRate15] = useState('6.4');
  const [result, setResult] = useState<null | any>(null);

  function compare() {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const r30 = parseFloat(rate30);
    const r15 = parseFloat(rate15);
    if (!p || !r30 || !r15) return;
    const loan = p - d;
    const mp30 = pmt(loan, r30, 360);
    const mp15 = pmt(loan, r15, 180);
    const total30 = mp30 * 360;
    const total15 = mp15 * 180;
    const interest30 = total30 - loan;
    const interest15 = total15 - loan;
    const diff = mp15 - mp30;
    // Break-even: months to recoup higher 15yr payment via interest savings
    const monthlyInterestSaving = interest30 / 360 - interest15 / 180;
    setResult({ loan, mp30, mp15, interest30, interest15, diff, monthlyInterestSaving });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⏱️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>15 vs 30 Year Mortgage — DFW Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>DFW median home: $410K. See exactly what each term costs you, and when the 15-year pays off.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '🏃', label: '15-Year', pros: ['60% less interest paid', 'Build equity 2x faster', 'Lower rate by ~0.6%'], cons: ['Higher monthly payment', 'Less cash flow flexibility'] },
            { icon: '🚶', label: '30-Year', pros: ['Lower monthly payment', 'Invest the difference', 'More flexibility for job changes'], cons: ['2–3x more total interest', 'Slower equity growth'] },
          ].map(opt => (
            <div key={opt.label} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{opt.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#0A1628', marginBottom: 10 }}>{opt.label}</div>
              {opt.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#16A34A', marginBottom: 3 }}>✅ {p}</div>)}
              {opt.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#DC2626', marginBottom: 3 }}>❌ {c}</div>)}
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>🧮 DFW Payment Calculator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Home Price ($) <span style={{ color: '#94A3B8', fontWeight: 400 }}>DFW median: $410,000</span></label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="410000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>Down Payment ($)</label>
              <input type="number" value={down} onChange={e => setDown(e.target.value)} placeholder="e.g. 82000 (20%)" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>30-Year Rate (%)</label>
                <input type="number" value={rate30} onChange={e => setRate30(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 4 }}>15-Year Rate (%)</label>
                <input type="number" value={rate15} onChange={e => setRate15(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
          <button onClick={compare} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Compare Terms →</button>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: '30-Year Payment', value: `$${Math.round(result.mp30).toLocaleString()}/mo`, sub: `$${Math.round(result.interest30).toLocaleString()} total interest`, color: '#3B82F6' },
                { label: '15-Year Payment', value: `$${Math.round(result.mp15).toLocaleString()}/mo`, sub: `$${Math.round(result.interest15).toLocaleString()} total interest`, color: '#F5E642' },
              ].map(c => (
                <div key={c.label} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', borderTop: `3px solid ${c.color}` }}>
                  <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600, marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: '#0A1628' }}>{c.value}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#92400E', marginBottom: 6 }}>⚡ Key Insight</div>
              <div style={{ fontSize: 13, color: '#78350F', lineHeight: 1.7 }}>
                The 15-year payment is <strong>${Math.round(result.diff).toLocaleString()}/mo more</strong> — but saves you <strong>${Math.round(result.interest30 - result.interest15).toLocaleString()}</strong> in interest. In DFW, where appreciation is strong, the 30-year + invest-the-difference strategy often wins for investors. Own-to-live buyers typically benefit from the 15-year.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
