import { useState } from 'react';

const SCENARIOS = {
  conservative: { jobs: 4, avgJob: 600, recruits: 1, homeowners: 2, origHomes: 3, label: 'Conservative' },
  realistic:    { jobs: 10, avgJob: 900, recruits: 3, homeowners: 6, origHomes: 10, label: 'Realistic' },
  optimistic:   { jobs: 20, avgJob: 1200, recruits: 8, homeowners: 15, origHomes: 25, label: 'Optimistic' },
};

function calcStreams(
  jobs: number,
  avgJob: number,
  recruits: number,
  homeowners: number,
  origHomes: number
) {
  const s1 = jobs * avgJob * 0.10 * 0.72;
  const s2 = recruits * (jobs * avgJob * 0.10 * 0.72) * 0.07;
  const s3 = recruits * 149 * 0.12;
  const s4 = homeowners * 50;
  const s5 = origHomes * 2 * 800 * 0.015;
  return { s1, s2, s3, s4, s5, total: s1 + s2 + s3 + s4 + s5 };
}

function buildMonths(
  jobs: number, avgJob: number, recruits: number, homeowners: number, origHomes: number
) {
  return Array.from({ length: 12 }, (_, i) => {
    const rampFactor = Math.min(1, (i + 1) / 3);
    const accumulatedRecruits = recruits * Math.min(1, (i + 1) / 2);
    const activeRecruits = accumulatedRecruits * rampFactor;
    return calcStreams(jobs, avgJob, activeRecruits, homeowners, origHomes * rampFactor);
  });
}

export default function NetworkIncomeCalculatorAdvanced() {
  const [scenario, setScenario] = useState<'conservative' | 'realistic' | 'optimistic'>('realistic');
  const s = SCENARIOS[scenario];
  const [jobs, setJobs] = useState(s.jobs);
  const [avgJob, setAvgJob] = useState(s.avgJob);
  const [recruits, setRecruits] = useState(s.recruits);
  const [homeowners, setHomeowners] = useState(s.homeowners);
  const [origHomes, setOrigHomes] = useState(s.origHomes);

  const applyScenario = (key: 'conservative' | 'realistic' | 'optimistic') => {
    const sc = SCENARIOS[key];
    setScenario(key);
    setJobs(sc.jobs);
    setAvgJob(sc.avgJob);
    setRecruits(sc.recruits);
    setHomeowners(sc.homeowners);
    setOrigHomes(sc.origHomes);
  };

  const monthly = calcStreams(jobs, avgJob, recruits, homeowners, origHomes);
  const months = buildMonths(jobs, avgJob, recruits, homeowners, origHomes);
  const annualTotal = months.reduce((acc, m) => acc + m.total, 0);

  const streams = [
    { label: 'Stream 1: Direct Job Commission', val: monthly.s1, desc: `${jobs} jobs × $${avgJob} × 10% fee × 72% keep` },
    { label: 'Stream 2: Recruit Override', val: monthly.s2, desc: `${recruits} recruits × their earnings × 7%` },
    { label: 'Stream 3: Subscription Override', val: monthly.s3, desc: `${recruits} recruits × $149/mo × 12%` },
    { label: 'Stream 4: Homeowner Referrals', val: monthly.s4, desc: `${homeowners} referrals × $50 avg fee` },
    { label: 'Stream 5: Origination Rights', val: monthly.s5, desc: `${origHomes} homes × 2 jobs/yr × $800 × 1.5% ÷ 12` },
  ];

  const compoundY1 = recruits * 3;
  const compoundY2 = compoundY1 * 3;
  const compoundIncome = calcStreams(jobs, avgJob, compoundY1 + compoundY2, homeowners, origHomes);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1a202c', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            💰 ProLnk Network Income
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 14px', color: '#1a202c' }}>
            Advanced Network Income Calculator
          </h1>
          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 580, margin: '0 auto' }}>
            Model all 5 ProLnk income streams with 12-month growth trajectory
          </p>
        </div>

        {/* Scenario Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40 }}>
          {(['conservative', 'realistic', 'optimistic'] as const).map(key => (
            <button
              key={key}
              onClick={() => applyScenario(key)}
              style={{ padding: '10px 24px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 14, borderColor: scenario === key ? '#6366f1′ : '#e2e8f0', background: scenario === key ? '#6366f1' : '#fff', color: scenario === key ? '#fff' : '#64748b', transition: ’all 0.2s' }}
            >
              {SCENARIOS[key].label}
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 24px' }}>Adjust Your Inputs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { label: 'Jobs completed per month', val: jobs, set: setJobs, min: 1, max: 40, fmt: (v: number) => v },
              { label: 'Average job value ($)', val: avgJob, set: setAvgJob, min: 200, max: 3000, fmt: (v: number) => `$${v}` },
              { label: 'Active recruits', val: recruits, set: setRecruits, min: 0, max: 20, fmt: (v: number) => v },
              { label: 'Homeowner referrals/month', val: homeowners, set: setHomeowners, min: 0, max: 30, fmt: (v: number) => v },
              { label: 'Origination homes in vault', val: origHomes, set: setOrigHomes, min: 0, max: 100, fmt: (v: number) => v },
            ].map(({ label, val, set, min, max, fmt }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{label}</label>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#6366f1′ }}>{fmt(val)}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={val}
                  onChange={e => set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1′ }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stream Breakdown */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>Monthly Income Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {streams.map((st, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1a202c' }}>{st.label}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8′ }}>{st.desc}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#6366f1′ }}>${Math.round(st.val).toLocaleString()}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#6366f1', width: `${monthly.total > 0 ? Math.min(100, (st.val / monthly.total) * 100) : 0}%`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '2px solid #e2e8f0', marginTop: 20, paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Total Monthly Income</span>
            <span style={{ fontSize: 28, fontWeight: 800, color: '#6366f1′ }}>${Math.round(monthly.total).toLocaleString()}</span>
          </div>
        </div>

        {/* 12-Month Projection */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, marginBottom: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>12-Month Growth Trajectory</h2>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 20px' }}>Recruits ramp to full productivity over 60 days</p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 140 }}>
            {months.map((m, i) => {
              const maxVal = Math.max(...months.map(x => x.total));
              const pct = maxVal > 0 ? (m.total / maxVal) * 100 : 0;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', background: '#6366f1', borderRadius: '4px 4px 0 0', height: `${pct}%`, minHeight: 4 }} />
                  <span style={{ fontSize: 10, color: '#94a3b8′ }}>M{i + 1}</span>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <div style={{ fontSize: 13, color: '#64748b' }}>Projected Annual Income</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a' }}>${Math.round(annualTotal).toLocaleString()}</div>
          </div>
        </div>

        {/* Compound Effect */}
        <div style={{ background: '#f0fdf4', borderRadius: 16, border: '1px solid #86efac', padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px', color: '#15803d' }}>🌱 The Compound Effect</h2>
          <p style={{ fontSize: 13, color: '#166534', margin: '0 0 16px' }}>
            You recruit {recruits} people. They each recruit 3. Their recruits each recruit 3.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{recruits}</div>
              <div style={{ fontSize: 12, color: '#166534′ }}>Your direct recruits</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{compoundY1}</div>
              <div style={{ fontSize: 12, color: '#166534′ }}>Level 2 network</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>{compoundY2}</div>
              <div style={{ fontSize: 12, color: '#166534′ }}>Level 3 network</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, padding: '14px', background: '#dcfce7', borderRadius: 10 }}>
            <div style={{ fontSize: 13, color: '#166534′ }}>Potential monthly income with full network active</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#15803d' }}>${Math.round(compoundIncome.total).toLocaleString()}/mo</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#6366f1', color: '#fff', fontWeight: 800, padding: '16px 48px', borderRadius: 10, textDecoration: 'none', fontSize: 17 }}
          >
            Apply to Join ProLnk →
          </a>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>Charter membership — waitlist closes at 500 applications</p>
        </div>
      </div>
    </div>
  );
}
