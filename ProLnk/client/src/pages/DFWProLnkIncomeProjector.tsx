import { useState } from 'react';

const STREAM_RATES = { directPct: 0.072, l1Pct: 0.07, l2Pct: 0.04, l3Pct: 0.02, originationPct: 0.015 };

export default function DFWProLnkIncomeProjector() {
  const [jobsPerMonth, setJobsPerMonth] = useState(12);
  const [avgJobValue, setAvgJobValue] = useState(4500);
  const [directPartners, setDirectPartners] = useState(4);
  const [partnerJobs, setPartnerJobs] = useState(8);

  const direct = Math.round(jobsPerMonth * avgJobValue * STREAM_RATES.directPct);
  const l1Override = Math.round(directPartners * partnerJobs * avgJobValue * STREAM_RATES.l1Pct);
  const l2Override = Math.round(directPartners * 2 * partnerJobs * avgJobValue * STREAM_RATES.l2Pct);
  const l3Override = Math.round(directPartners * 4 * partnerJobs * avgJobValue * STREAM_RATES.l3Pct);
  const origination = Math.round(jobsPerMonth * avgJobValue * STREAM_RATES.originationPct);
  const monthlyTotal = direct + l1Override + l2Override + l3Override + origination;

  const months = Array.from({ length: 12 }, (_, i) => {
    const growthMult = 1 + i * 0.05;
    return {
      month: i + 1,
      label: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
      income: Math.round(monthlyTotal * growthMult),
    };
  });

  const maxIncome = Math.max(...months.map(m => m.income));
  const annualProjected = months.reduce((s, m) => s + m.income, 0);

  const streams = [
    { label: '🎯 Direct Match', val: direct, desc: `${jobsPerMonth} jobs × $${avgJobValue.toLocaleString()} × 7.2%` },
    { label: '👤 L1 Override', val: l1Override, desc: `${directPartners} partners × ${partnerJobs} jobs × 7%` },
    { label: '👥 L2 Override', val: l2Override, desc: `${directPartners*2} L2 partners × ${partnerJobs} jobs × 4%` },
    { label: '🌐 L3 Override', val: l3Override, desc: `${directPartners*4} L3 partners × ${partnerJobs} jobs × 2%` },
    { label: '🏠 Origination', val: origination, desc: `${jobsPerMonth} home transactions × 1.5%` },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>💰</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 4 }}>ProLnk Income Projector</h1>
        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Model your 5-stream ProLnk income with 12-month growth trajectory.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Jobs Matched / Month', val: jobsPerMonth, min: 1, max: 60, set: setJobsPerMonth, fmt: (v: number) => `${v} jobs` },
            { label: 'Avg Job Value', val: avgJobValue, min: 500, max: 25000, step: 250, set: setAvgJobValue, fmt: (v: number) => `$${v.toLocaleString()}` },
            { label: 'Direct Partners Recruited', val: directPartners, min: 0, max: 30, set: setDirectPartners, fmt: (v: number) => `${v} partners` },
            { label: "Avg Partner's Jobs/Month", val: partnerJobs, min: 1, max: 40, set: setPartnerJobs, fmt: (v: number) => `${v} jobs` },
          ].map(({ label, val, min, max, step, set, fmt }) => (
            <div key={label} style={{ background: '#1a2a44', borderRadius: 8, padding: '1rem' }}>
              <label style={{ color: '#F5E642', fontSize: '0.82rem', fontWeight: 600 }}>{label}: {fmt(val)}</label>
              <input type="range" min={min} max={max} step={step || 1} value={val} onChange={e => set(Number(e.target.value))}
                style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {streams.map(s => (
            <div key={s.label} style={{ background: '#1a2a44', borderRadius: 8, padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#888′ }}>{s.desc}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#F5E642′ }}>${s.val.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2a44', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ color: '#aaa', fontSize: '0.82rem', marginBottom: 8 }}>12-Month Projection (5% growth/mo)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 70 }}>
            {months.map(m => {
              const h = Math.round((m.income / maxIncome) * 64);
              return <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: '100%', height: h, background: m.month === 12 ? '#F5E642′ : '#3a6aaa', borderRadius: 2 }} />
                <div style={{ fontSize: '0.6rem', color: '#666′ }}>{m.label.slice(0,1)}</div>
              </div>;
            })}
          </div>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Month 1 Total</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${monthlyTotal.toLocaleString()}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Year 1 Projected</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${annualProjected.toLocaleString()}</div></div>
        </div>
      </div>
    </div>
  );
}
