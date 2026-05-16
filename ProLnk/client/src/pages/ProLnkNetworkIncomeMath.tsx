import { useState } from 'react';

export default function ProLnkNetworkIncomeMath() {
  const [recruits, setRecruits] = useState(10);
  const monthlyFee = 149;
  const subRate = 0.12;
  const l2Rate = 0.06;
  const l3Rate = 0.03;
  const l1 = recruits;
  const l2 = Math.round(recruits * 2);
  const l3 = Math.round(recruits * 4);
  const subIncome = Math.round(l1 * monthlyFee * subRate);
  const jobAvg = 850;
  const jobsPerMo = 8;
  const jobL1 = Math.round(l1 * jobsPerMo * jobAvg * 0.07);
  const jobL2 = Math.round(l2 * jobsPerMo * jobAvg * 0.04);
  const jobL3 = Math.round(l3 * jobsPerMo * jobAvg * 0.02);
  const total = subIncome + jobL1 + jobL2 + jobL3;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          💰 THE ACTUAL MATH
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Network Income Math</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40 }}>
          This is what 4-level compound override income looks like in real numbers. Not projections — math.
        </p>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
            Pros you directly recruit: <span style={{ color: '#F5E642' }}>{recruits}</span>
          </label>
          <input type="range" min={1} max={25} value={recruits} onChange={e => setRecruits(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { level: 'L1', label: 'Your direct recruits', count: l1, subRate: '12%', jobRate: '7%', subIncome, jobIncome: jobL1 },
            { level: 'L2', label: 'Their recruits', count: l2, subRate: '6%', jobRate: '4%', subIncome: Math.round(l2 * monthlyFee * l2Rate), jobIncome: jobL2 },
            { level: 'L3', label: '3rd level', count: l3, subRate: '3%', jobRate: '2%', subIncome: Math.round(l3 * monthlyFee * l3Rate), jobIncome: jobL3 },
            { level: 'L4', label: '4th level', count: l3 * 2, subRate: '1.5%', jobRate: '1%', subIncome: Math.round(l3 * 2 * monthlyFee * 0.015), jobIncome: Math.round(l3 * 2 * jobsPerMo * jobAvg * 0.01) },
          ].map(r => (
            <div key={r.level} style={{ background: '#111d2e', borderRadius: 10, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontWeight: 800, fontSize: 13 }}>{r.level}</span>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{r.count} pros</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 10 }}>{r.label}</div>
              <div style={{ fontSize: 13 }}>Sub override ({r.subRate}): <span style={{ color: '#4ade80', fontWeight: 700 }}>${r.subIncome}/mo</span></div>
              <div style={{ fontSize: 13 }}>Job override ({r.jobRate}): <span style={{ color: '#4ade80', fontWeight: 700 }}>${r.jobIncome}/mo</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 16, marginBottom: 8 }}>Total Monthly Network Income</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#F5E642' }}>${total.toLocaleString()}</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>assuming avg $850 job value, 8 jobs/mo per pro</div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>📐 The Compound Effect</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
            You recruit {recruits} pros. Each recruits 2. Each of those recruits 4 more. That is {l1 + l2 + l3} pros across 3 levels — all generating subscription + job commission overrides directly to you, every month, automatically.
          </div>
        </div>
      </div>
    </div>
  );
}