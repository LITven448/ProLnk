import { useState } from 'react';

export default function ProLnkCharterTierGuide() {
  const [recruits, setRecruits] = useState(5);
  const [jobsPerMonth, setJobsPerMonth] = useState(8);
  const avgJobValue = 850;
  const subOverride = recruits * 149 * 0.12;
  const jobOverride = recruits * jobsPerMonth * avgJobValue * 0.07;
  const total = Math.round(subOverride + jobOverride);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontWeight: 700, marginBottom: 16 }}>
          🏆 CHARTER TIER — CLOSES AT 500 PROS
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Charter Tier Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 40 }}>
          The first 500 pros to join ProLnk lock in Charter status — the highest tier, forever, at $149/mo.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[
            { label: 'Monthly Fee', charter: '$149/mo locked', founding: '$149/mo locked' },
            { label: 'Subscription Override', charter: '12% of referred pros', founding: '6%' },
            { label: 'Network Job Override', charter: '7% / 4% / 2% / 1%', founding: '4% / 2% / 1% / 0.5%' },
            { label: 'Origination Rights', charter: '1.5% permanent', founding: '1.5% permanent' },
            { label: 'Network Cap', charter: '25 direct recruits', founding: '100 direct recruits' },
            { label: 'Rate Lock', charter: '✅ Never increases', founding: '✅ Never increases' },
          ].map(r => (
            <div key={r.label} style={{ background: '#111d2e', borderRadius: 8, padding: '16px' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>{r.label}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 2 }}>CHARTER</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.charter}</div>
                </div>
                <div style={{ flex: 1, opacity: 0.6 }}>
                  <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, marginBottom: 2 }}>FOUNDING</div>
                  <div style={{ fontSize: 13 }}>{r.founding}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d2e', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📊 Your Charter Income Estimate</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Pros you recruit: {recruits}</label>
            <input type="range" min={1} max={25} value={recruits} onChange={e => setRecruits(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Avg jobs/mo per recruit: {jobsPerMonth}</label>
            <input type="range" min={2} max={20} value={jobsPerMonth} onChange={e => setJobsPerMonth(+e.target.value)}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 20, textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Estimated Monthly Network Income</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#F5E642′ }}>${total.toLocaleString()}</div>
            <div style={{ color: '#64748b', fontSize: 12 }}>subscription overrides + job overrides</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 8, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>⏰ Charter closes at 500 pros — join now to lock your rate forever.</div>
          <div style={{ fontSize: 14 }}>After 500, all new pros enter Founding tier at reduced override rates.</div>
        </div>
      </div>
    </div>
  );
}