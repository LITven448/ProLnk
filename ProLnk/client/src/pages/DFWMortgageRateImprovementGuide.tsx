import { useState } from 'react';

const SCORE_TIERS = [
  { min: 760, max: 850, label: 'Excellent', rate: 6.25, color: '#22c55e' },
  { min: 740, max: 759, label: 'Very Good', rate: 6.50, color: '#84cc16' },
  { min: 720, max: 739, label: 'Good', rate: 6.75, color: '#a3e635' },
  { min: 700, max: 719, label: 'Fair-Good', rate: 7.00, color: '#eab308' },
  { min: 680, max: 699, label: 'Fair', rate: 7.40, color: '#f97316' },
  { min: 660, max: 679, label: 'Below Average', rate: 7.90, color: '#ef4444' },
  { min: 620, max: 659, label: 'Poor', rate: 8.50, color: '#dc2626' },
];

function monthlyPayment(principal: number, annualRate: number, years = 30) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function DFWMortgageRateImprovementGuide() {
  const [creditScore, setCreditScore] = useState(680);
  const [downPct, setDownPct] = useState(10);
  const [loanAmount, setLoanAmount] = useState(350000);
  const [pointsBuy, setPointsBuy] = useState(0);

  const getTier = (s: number) => SCORE_TIERS.find(t => s >= t.min && s <= t.max) || SCORE_TIERS[SCORE_TIERS.length - 1];
  const tier = getTier(creditScore);
  const nextTier = SCORE_TIERS[Math.max(0, SCORE_TIERS.indexOf(tier) - 1)];

  const baseRate = tier.rate - (downPct >= 20 ? 0.125 : 0) - (pointsBuy * 0.25);
  const nextRate = nextTier ? nextTier.rate - (downPct >= 20 ? 0.125 : 0) : baseRate;

  const currentPayment = monthlyPayment(loanAmount, baseRate);
  const nextPayment = monthlyPayment(loanAmount, nextRate);
  const savingsPerMonth = currentPayment - nextPayment;
  const savingsPerYear = savingsPerMonth * 12;
  const savings30yr = savingsPerMonth * 360;

  const pointCost = loanAmount * 0.01;
  const rateWithPoint = baseRate - 0.25;
  const savingsWithPoint = monthlyPayment(loanAmount, baseRate) - monthlyPayment(loanAmount, rateWithPoint);
  const breakEvenMonths = pointCost / savingsWithPoint;

  const ltv = 100 - downPct;
  const pmi = ltv > 80 ? Math.round(loanAmount * 0.008 / 12) : 0;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>📉 DFW Mortgage Rate Improvement Guide</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>What drives your rate, how to get a better one, and the real cost of your credit score in DFW.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🎯 Your Loan Profile</h2>
          <label style={{ fontWeight: 600 }}>Credit Score: <span style={{ color: tier.color, background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>{creditScore} — {tier.label}</span></label>
          <input type="range" min={620} max={850} value={creditScore} onChange={e => setCreditScore(+e.target.value)} style={{ width: '100%', margin: '0.5rem 0', accentColor: '#F5E642' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Loan Amount ($)</label>
              <input type="number" value={loanAmount} onChange={e => setLoanAmount(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Down Payment %: {downPct}%</label>
              <input type="range" min={3} max={30} value={downPct} onChange={e => setDownPct(+e.target.value)} style={{ width: '100%', margin: '0.75rem 0', accentColor: '#F5E642' }} />
            </div>
          </div>
          {pmi > 0 && <div style={{ background: '#fef3c7', borderRadius: 8, padding: '0.75rem', fontSize: 14, color: '#92400e' }}>⚠️ PMI applies at {downPct}% down (~${pmi}/mo). Reach 20% down to eliminate it.</div>}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🏦 Rate Tier Comparison</h2>
          {SCORE_TIERS.map((t, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.6rem 0.75rem', borderRadius: 8, marginBottom: 6,
              background: t.label === tier.label ? '#fefce8' : '#f8fafc',
              border: t.label === tier.label ? '2px solid #F5E642' : '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                <span style={{ fontWeight: t.label === tier.label ? 700 : 400 }}>{t.min}-{t.max} ({t.label})</span>
                {t.label === tier.label && <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 10, padding: '1px 6px', borderRadius: 8 }}>YOU</span>}
              </div>
              <div style={{ fontWeight: 700, color: t.color }}>{t.rate.toFixed(2)}%</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>⚡ Buying Points Analysis</h2>
          <label style={{ fontWeight: 600 }}>Points to Buy: <span style={{ color: '#F5E642', background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>{pointsBuy}</span></label>
          <input type="range" min={0} max={4} step={0.5} value={pointsBuy} onChange={e => setPointsBuy(+e.target.value)} style={{ width: '100%', margin: '0.5rem 0', accentColor: '#F5E642' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>1 Point Upfront Cost</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>${pointCost.toLocaleString()}</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Monthly Savings (1pt)</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>${Math.round(savingsWithPoint)}/mo</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Break-Even</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{Math.round(breakEvenMonths)} months</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Rate with Points</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#22c55e' }}>{rateWithPoint.toFixed(2)}%</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642' }}>💰 Cost of Your Current Score</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div><div style={{ fontSize: 36, fontWeight: 800 }}>{baseRate.toFixed(2)}%</div><div style={{ color: '#94a3b8' }}>Your rate</div></div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642' }}>${Math.round(currentPayment).toLocaleString()}/mo</div><div style={{ color: '#94a3b8' }}>Monthly payment</div></div>
          </div>
          {nextTier && nextTier !== tier && (
            <div style={{ background: '#1e293b', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Improve to {nextTier.label} tier ({nextTier.min}+ score):</div>
              <div style={{ color: '#22c55e', fontSize: 18, fontWeight: 700 }}>Save ${Math.round(savingsPerMonth)}/mo · ${Math.round(savingsPerYear).toLocaleString()}/yr · ${Math.round(savings30yr).toLocaleString()} over 30 years</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
