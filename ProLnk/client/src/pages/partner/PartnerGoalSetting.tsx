import { useState } from 'react';

const COMMISSION_RATES = {
  l1: 0.07,
  l2: 0.04,
  l3: 0.02,
};

const AVG_JOB_VALUE = 850;
const AVG_JOBS_PER_PARTNER_PER_MONTH = 2.4;

function calcIncome(
  targetMonthly: number
): {
  l1: number;
  l2: number;
  l3: number;
  jobsPerMonth: number;
  weeklyRecruits: number;
} {
  const jobsNeeded = targetMonthly / (AVG_JOB_VALUE * COMMISSION_RATES.l1);
  const l1Needed = Math.ceil(jobsNeeded / AVG_JOBS_PER_PARTNER_PER_MONTH);
  const l2Needed = Math.ceil(l1Needed * 3);
  const l3Needed = Math.ceil(l2Needed * 3);
  const weeklyRecruits = Math.ceil(l1Needed / 12);

  return {
    l1: l1Needed,
    l2: l2Needed,
    l3: l3Needed,
    jobsPerMonth: Math.round(jobsNeeded),
    weeklyRecruits: Math.max(1, weeklyRecruits),
  };
}

const milestones = (targetMonthly: number) => [
  {
    label: '30 Days',
    emoji: '🌱',
    income: Math.round(targetMonthly * 0.12),
    desc: 'First partner signed. Platform trained. Script practiced. Goal: 1 active L1.',
  },
  {
    label: '60 Days',
    emoji: '🌿',
    income: Math.round(targetMonthly * 0.28),
    desc: 'First commission hit. 3–5 active partners. Weekly team check-in established.',
  },
  {
    label: '90 Days',
    emoji: '🌳',
    income: Math.round(targetMonthly * 0.5),
    desc: 'Referral rhythm locked in. First L2 sub-partners earning. System self-propagating.',
  },
  {
    label: '180 Days',
    emoji: '🚀',
    income: Math.round(targetMonthly * 0.78),
    desc: 'L3 tree forming. Income compounding. Time-per-dollar ratio improving monthly.',
  },
  {
    label: '365 Days',
    emoji: '🏆',
    income: targetMonthly,
    desc: 'Target income hit. Network largely self-sustaining. Focus shifts to L3/L4 optimization.',
  },
];

export default function PartnerGoalSetting() {
  const [targetInput, setTargetInput] = useState('3200');
  const target = Math.max(100, parseInt(targetInput.replace(/\D/g, '')) || 3200);
  const calc = calcIncome(target);
  const ms = milestones(target);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>90/180/365 Goal Planner</h1>
          <p style={{ color: '#64748B', fontSize: 15, marginTop: 10 }}>Enter your target monthly income and see exactly what it takes to get there.</p>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 12 }}>
            TARGET MONTHLY INCOME
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>$</span>
            <input
              type="text"
              value={targetInput}
              onChange={e => setTargetInput(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '2px solid rgba(245,230,66,0.4)',
                borderRadius: 12,
                padding: '14px 18px',
                fontSize: 28,
                fontWeight: 800,
                color: '#F5E642',
                width: 200,
                outline: 'none',
              }}
              placeholder="3200″
            />
            <span style={{ color: '#94A3B8', fontSize: 16 }}>/month</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
            {[
              { label: 'L1 Partners Needed', value: calc.l1, emoji: '👤', desc: 'Direct recruits' },
              { label: 'L2 Partners', value: calc.l2, emoji: '👥', desc: 'Their recruits' },
              { label: 'L3 Partners', value: calc.l3, emoji: '🌐', desc: 'L2\’s recruits' },
              { label: 'Jobs / Month', value: calc.jobsPerMonth, emoji: '🔧', desc: 'Across all L1s' },
              { label: 'Recruits / Week', value: calc.weeklyRecruits, emoji: '📅', desc: 'To hit in 12 mo' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 14px' }}>
                <div style={{ fontSize: 20 }}>{stat.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, marginTop: 6 }}>{stat.value.toLocaleString()}</div>
                <div style={{ color: '#94A3B8', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{stat.label}</div>
                <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{stat.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 16px', marginTop: 16 }}>
            <p style={{ color: '#475569', fontSize: 12, margin: 0 }}>
              Assumes avg job value of ${AVG_JOB_VALUE}, {AVG_JOBS_PER_PARTNER_PER_MONTH} jobs/mo per active L1 partner, and 7% L1 commission rate. L2 partners each recruit 3 of their own. L3 partners each recruit 3 more.
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', margin: '0 0 6px' }}>📈 Income Milestone Roadmap</h2>
          <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 24px' }}>Based on consistent weekly recruitment and team activation. Most partners hit these ranges within the timeframes below.</p>
        </div>

        <div style={{ position: 'relative' }}>
          {ms.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: i === ms.length - 1 ? '#F5E642′ : '#0A1628',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                  {m.emoji}
                </div>
                {i < ms.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: '#E2E8F0', margin: '6px 0′ }} />
                )}
              </div>
              <div style={{
                flex: 1,
                background: '#fff',
                borderRadius: 14,
                padding: '18px 22px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                marginBottom: i < ms.length - 1 ? 0 : 0,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontWeight: 800, color: '#0A1628', fontSize: 16 }}>{m.label}</div>
                  <div style={{ background: '#F5E642', borderRadius: 999, padding: '4px 12px', fontWeight: 800, color: '#0A1628', fontSize: 14 }}>
                    ${m.income.toLocaleString()}/mo
                  </div>
                </div>
                <p style={{ color: '#64748B', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
                <div style={{ marginTop: 12 }}>
                  <div style={{ background: '#F1F5F9', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                    <div style={{
                      background: '#0A1628',
                      width: `${Math.round((m.income / target) * 100)}%`,
                      height: '100%',
                      borderRadius: 999,
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                    {Math.round((m.income / target) * 100)}% of ${target.toLocaleString()} goal
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 14, padding: 22, marginTop: 8 }}>
          <div style={{ fontWeight: 700, color: '#15803D', fontSize: 15, marginBottom: 6 }}>
            💡 Pro Tip: Compounding is the real asset.
          </div>
          <p style={{ color: '#166534', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            At month 3 most partners feel frustrated — income is modest but the system is being built. At month 6, compounding kicks in as L2 and L3 partners become active. The partners who stay consistent through month 4 almost universally hit their 12-month target.
          </p>
        </div>
      </div>
    </div>
  );
}
