import { useState } from 'react';

const data = {
  heloc: {
    label: 'HELOC',
    rate: 0.085,
    secured: true,
    flexible: true,
    pros: ['Lower interest rate', 'Flexible draw as needed', 'Interest-only draw period', 'Tax-deductible interest (consult CPA)'],
    cons: ['Home as collateral', 'Variable rate risk', 'Requires sufficient equity', 'Closing costs $500–$1,500'],
  },
  personal: {
    label: 'Personal Loan',
    rate: 0.15,
    secured: false,
    flexible: false,
    pros: ['No home collateral risk', 'Fixed rate & payment', 'Faster approval', 'No equity required'],
    cons: ['Higher interest rate', 'Lower loan limits ($50K typical)', 'Can\’t redraw funds', 'No tax benefit'],
  },
};

function calcMonthly(principal: number, rate: number, months: number) {
  const r = rate / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function DFWHELOCVsPersonalLoan() {
  const [cost, setCost] = useState(30000);
  const [equity, setEquity] = useState(80000);
  const [score, setScore] = useState(720);
  const [term, setTerm] = useState(60);

  const helocEligible = equity >= cost && score >= 620;
  const helocMonthly = helocEligible ? calcMonthly(cost, data.heloc.rate, term) : null;
  const helocTotal = helocMonthly ? helocMonthly * term : null;
  const personalMonthly = calcMonthly(cost, data.personal.rate + (score < 680 ? 0.04 : score < 720 ? 0.02 : 0), term);
  const personalTotal = personalMonthly * term;
  const savings = helocTotal ? personalTotal - helocTotal : 0;
  const winner = helocEligible && helocTotal && helocTotal < personalTotal ? 'HELOC' : 'Personal Loan';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem 2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>🏠 HELOC vs Personal Loan</div>
          <div style={{ color: '#CBD5E1', marginTop: 6 }}>DFW Home Renovation Financing Comparison</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {Object.values(data).map(opt => (
            <div key={opt.label} style={{ background: '#fff', borderRadius: 10, padding: '1.25rem', border: `2px solid ${winner === opt.label ? '#F5E642' : '#E2E8F0'}` }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{opt.label} {winner === opt.label ? '⭐' : ''}</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8 }}>{opt.secured ? '🔒 Secured by home' : '🔓 Unsecured'} · {opt.flexible ? '🔄 Flexible draw' : '📌 Fixed amount'}</div>
              <div style={{ marginBottom: 6 }}>
                {opt.pros.map(p => <div key={p} style={{ fontSize: 13, color: '#16A34A', marginBottom: 2 }}>✓ {p}</div>)}
              </div>
              {opt.cons.map(c => <div key={c} style={{ fontSize: 13, color: '#DC2626', marginBottom: 2 }}>✗ {c}</div>)}
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #E2E8F0′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>🔢 Your DFW Renovation Calculator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Renovation Cost ($)', value: cost, set: setCost, min: 5000, max: 200000, step: 1000 },
              { label: 'Available Home Equity ($)', value: equity, set: setEquity, min: 0, max: 400000, step: 5000 },
              { label: 'Credit Score', value: score, set: setScore, min: 580, max: 850, step: 10 },
              { label: 'Repayment Term (months)', value: term, set: setTerm, min: 12, max: 120, step: 12 },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.label}: <span style={{ color: '#6366F1′ }}>{f.value.toLocaleString()}</span></div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.5rem', color: '#fff' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>📊 Results</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>HELOC {helocEligible ? '' : '❌ Not eligible'}</div>
              {helocEligible && helocMonthly ? <>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>Monthly: <span style={{ color: '#F5E642', fontWeight: 700 }}>${helocMonthly.toFixed(0)}</span></div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>Total cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>${helocTotal?.toFixed(0)}</span></div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>Rate: 8.5% variable</div>
              </> : <div style={{ fontSize: 13, color: '#F87171′ }}>Insufficient equity or credit score below 620</div>}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Personal Loan</div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>Monthly: <span style={{ color: '#F5E642', fontWeight: 700 }}>${personalMonthly.toFixed(0)}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>Total cost: <span style={{ color: '#F5E642', fontWeight: 700 }}>${personalTotal.toFixed(0)}</span></div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>Rate: {((data.personal.rate + (score < 680 ? 0.04 : score < 720 ? 0.02 : 0)) * 100).toFixed(1)}% fixed</div>
            </div>
          </div>
          {helocEligible && savings > 0 && (
            <div style={{ marginTop: 12, background: 'rgba(245,230,66,0.15)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 HELOC saves you ${savings.toFixed(0)} over {term} months</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
