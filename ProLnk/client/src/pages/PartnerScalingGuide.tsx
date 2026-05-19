import { useState } from 'react';

const phases = [
  {
    label: 'Phase 1',
    range: 'Month 1–3',
    target: '$1,000–$2,000/mo',
    color: '#10B981',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    focus: 'Job Commission Focus',
    steps: [
      'Perfect your photo process — capture every job site before, during, and after.',
      'Build a consistent weekly photo upload habit. Consistency beats volume.',
      'Maximize AI detection — ensure good lighting and full coverage of systems.',
      'Focus on your primary trade. Don’t spread thin in the first 90 days.',
      'Request reviews from every satisfied customer immediately after the job.',
    ],
  },
  {
    label: 'Phase 2',
    range: 'Month 3–6',
    target: '$3,000–$5,000/mo',
    color: '#3B82F6',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    focus: 'Network Building',
    steps: [
      'Recruit 1 quality partner per week. Quality over quantity — teach before you recruit more.',
      'Teach your first 3 partners the exact photo process that worked for you.',
      'Choose trade partners that complement yours (if you’re HVAC, recruit plumbers and electricians).',
      'Track your network income weekly — let the numbers motivate your recruits.',
      'Host a simple monthly call with your team to share wins and troubleshoot.',
    ],
  },
  {
    label: 'Phase 3',
    range: 'Month 6–12',
    target: '$7,000–$12,000/mo',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    focus: 'Leverage & Origination',
    steps: [
      'Let your recruits recruit. Your job is coaching, not direct outreach at this stage.',
      'Add 20+ homes to the vault. Foundation and HVAC pros see the best AI detection accuracy.',
      'Focus on high-value origination rights — permanent revenue share on every future service at those homes.',
      'Use your income statements to recruit new partners. Real numbers convert better than promises.',
      'Identify your top 2 performers and invest time in accelerating them.',
    ],
  },
];

const projections = [
  { month: 'Month 1', low: 400, mid: 800, high: 1200 },
  { month: 'Month 3', low: 1200, mid: 2000, high: 3200 },
  { month: 'Month 6', low: 2800, mid: 4500, high: 6500 },
  { month: 'Month 9', low: 4500, mid: 7000, high: 9500 },
  { month: 'Month 12', low: 6000, mid: 8400, high: 12000 },
];

export default function PartnerScalingGuide() {
  const [openPhase, setOpenPhase] = useState<number | null>(0);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#0F2027', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 13, color: '#34D399', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Partner Playbook</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,50px)', fontWeight: 800, color: '#FFFFFF', margin: '0 auto 20px', maxWidth: 700, lineHeight: 1.15 }}>
          How to Scale Your ProLnk Business to $10,000/Month
        </h1>
        <p style={{ fontSize: 18, color: '#9CA3AF', maxWidth: 560, margin: '0 auto 32px' }}>
          A proven 12-month roadmap. No hype — just the exact actions that drive income at each stage.
        </p>
        <div style={{ display: 'inline-block', background: '#10B981', color: '#FFFFFF', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8 }}>
          Partners who follow this earn avg $8,400/mo by month 12
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 24px' }}>

        {/* Phase accordion */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 8 }}>The 3 Phases</h2>
        <p style={{ color: '#6B7280', marginBottom: 32 }}>Expand each phase for your action checklist.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
          {phases.map((p, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${p.border}`, borderRadius: 14, overflow: 'hidden' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '22px 28px', cursor: 'pointer', background: openPhase === i ? p.bg : '#FFFFFF' }}
                onClick={() => setOpenPhase(openPhase === i ? null : i)}
              >
                <span style={{ background: p.color, color: '#FFF', fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 20 }}>{p.label}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: 16 }}>{p.focus}</div>
                  <div style={{ fontSize: 13, color: '#6B7280′ }}>{p.range} · Target: {p.target}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9CA3AF', transform: openPhase === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>⌄</span>
              </div>
              {openPhase === i && (
                <div style={{ padding: '8px 28px 28px' }}>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {p.steps.map((s, j) => (
                      <li key={j} style={{ color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 8 }}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Income projection table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 8 }}>12-Month Income Projection</h2>
        <p style={{ color: '#6B7280', marginBottom: 20 }}>Based on partners following the phase system exactly.</p>
        <div style={{ overflowX: 'auto', marginBottom: 56 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}>
            <thead>
              <tr style={{ background: '#F3F4F6′ }}>
                <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#374151′ }}>Milestone</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#374151′ }}>Conservative</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#10B981′ }}>On Track</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#8B5CF6′ }}>Top Performer</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #F3F4F6′ }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: '#111827′ }}>{row.month}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', color: '#6B7280′ }}>${row.low.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: '#10B981′ }}>${row.mid.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 700, color: '#8B5CF6′ }}>${row.high.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div style={{ background: '#0F2027', borderRadius: 16, padding: '40px 36px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Ready to start your Phase 1?</div>
          <p style={{ color: '#9CA3AF', marginBottom: 24 }}>Apply now. Charter partner spots are limited and waitlist closes at 500 applications.</p>
          <a href="/apply" style={{ display: 'inline-block', background: '#10B981', color: '#FFFFFF', fontWeight: 700, fontSize: 16, padding: '14px 40px', borderRadius: 8, textDecoration: 'none' }}>
            Apply as a Partner →
          </a>
        </div>
      </div>
    </div>
  );
}
