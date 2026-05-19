import { useState } from 'react';

const phases = [
  {
    emoji: '🌱',
    phase: 'Phase 1',
    title: 'Seed Your Network (Days 1–30)',
    goal: 'Land your first 5 active recruits',
    actions: [
      'Identify 20 people in your trade who are hungry to earn more',
      'Lead with your own earnings story — show your dashboard, not a pitch deck',
      'Host a 30-min Zoom walkthrough for groups of 3–5 to maximize your time',
      'Follow up within 24 hours — most sign-ups happen in the first conversation',
      'Activate each recruit immediately: help them log in and see their first lead',
    ],
    metric: '5 active recruits in downline',
  },
  {
    emoji: '🌿',
    phase: 'Phase 2',
    title: 'Duplicate the System (Days 31–90)',
    goal: 'Each of your 5 recruits recruits 5 more',
    actions: [
      'Send your recruits the same onboarding materials you used — make it copy-paste simple',
      'Run a weekly 20-min team call to share wins and coach objections',
      'Create a shared group chat for your immediate downline',
      'Celebrate every sign-up publicly in the group — momentum is contagious',
      'Track your Level 2 recruits in your dashboard weekly',
    ],
    metric: '25 total in downline (5×5)',
  },
  {
    emoji: '🌳',
    phase: 'Phase 3',
    title: 'Scale with Systems (Days 91–180)',
    goal: 'Build passive override income from Levels 3 & 4',
    actions: [
      'Identify your top 2–3 Level 2 performers and invest extra coaching time',
      'Create short video walkthroughs your team can share without you',
      'Set a monthly "network challenge" with a small prize to keep engagement high',
      'Review your earnings report monthly: override income should be growing',
      'Recruit outside your immediate trade — HVAC pros can recruit plumbers, etc.',
    ],
    metric: '100+ in total network',
  },
  {
    emoji: '🏔️',
    phase: 'Phase 4',
    title: 'Reach Tier 5 Status (Month 6+)',
    goal: '500+ matches → 70% direct commission + full override stack',
    actions: [
      'Prioritize high-volume service areas: HVAC, plumbing, roofing generate more leads',
      'Negotiate homeowner origination deals in dense zip codes',
      'Host quarterly in-person meetups to deepen loyalty in your network',
      'Apply for Charter or Founding tier benefits if not already locked in',
      'Document your journey — your story becomes your best recruiting asset',
    ],
    metric: '500 matches, Tier 5 commission',
  },
];

const incomeStreams = [
  { stream: 'Direct Commission', range: '12–70%', note: 'Per match; grows with your tier' },
  { stream: 'Pro Override (L1)', range: '1%', note: 'Of every match your recruits close' },
  { stream: 'Pro Override (L2)', range: '0.5%', note: 'Your recruits\’s recruits' },
  { stream: 'Pro Override (L3)', range: '0.25%', note: '3 levels deep' },
  { stream: 'Pro Override (L4)', range: '0.1%', note: '4 levels deep' },
  { stream: 'Subscription Override', range: '10%', note: 'Recurring monthly from referred pros' },
  { stream: 'Homeowner Origination', range: '$25–100', note: 'Per qualified homeowner you source' },
  { stream: 'Home Vault Origination', range: 'Permanent share', note: 'Recurring once home is in vault' },
];

const objections = [
  {
    q: '"This sounds like MLM."',
    a: 'You earn primarily from direct job commissions — up to 70%. Override income from your network is a bonus, not the foundation. It\’s a contractor income system with a referral layer.',
  },
  {
    q: '"I don\’t have time to recruit."',
    a: 'One group Zoom call per week takes 20 minutes. After your first 5 recruits are active, the system duplicates itself. Your time investment drops as your override income climbs.',
  },
  {
    q: '"I already get leads elsewhere."',
    a: 'ProLnk leads are pre-qualified homeowners actively requesting your trade. You can use multiple sources — this adds to your pipeline, not replaces it.',
  },
  {
    q: '"What if leads dry up in my area?"',
    a: 'Your network override income is geography-independent. If your Level 2 recruit in another state closes jobs, you earn on those regardless of your local market.',
  },
];

export default function NetworkGrowthPlaybook() {
  const [activePhase, setActivePhase] = useState<number | null>(0);
  const [activeObjection, setActiveObjection] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#1E293B', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🚀</div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, color: '#0F172A' }}>
            Network Growth Playbook
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', marginTop: 12, maxWidth: 620, margin: '12px auto 0′ }}>
            A step-by-step system for building a 4-level income network on ProLnk — from your first recruit to passive override income.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
            {['4 Growth Phases', '8 Income Streams', 'Objection Scripts'].map(tag => (
              <span key={tag} style={{ background: '#EFF6FF', color: '#2563EB', padding: '6px 18px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: '1px solid #BFDBFE' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Income Streams */}
        <div style={{ background: '#0F172A', borderRadius: 20, padding: 36, marginBottom: 56 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 8px', color: '#FFFFFF' }}>💰 Your 8 Income Streams</h2>
          <p style={{ color: '#94A3B8', marginTop: 0, marginBottom: 24, fontSize: 15 }}>Every dollar your network earns compounds across all streams simultaneously.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {incomeStreams.map((s, i) => (
              <div key={i} style={{ background: '#1E293B', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#34D399', fontSize: 20, marginBottom: 4 }}>{s.range}</div>
                <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: 14, marginBottom: 4 }}>{s.stream}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Phases */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0F172A' }}>📈 The 4 Growth Phases</h2>
          <p style={{ color: '#64748B', marginBottom: 28, fontSize: 15 }}>Click each phase to expand the action plan.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {phases.map((p, i) => {
              const isOpen = activePhase === i;
              return (
                <div
                  key={i}
                  style={{ background: '#FFFFFF', border: `2px solid ${isOpen ? '#2563EB' : '#E2E8F0'}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer', boxShadow: isOpen ? '0 4px 20px rgba(37,99,235,0.12)' : '0 1px 4px rgba(0,0,0,0.06)' }}
                  onClick={() => setActivePhase(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                      {p.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: '#2563EB', fontWeight: 700, marginBottom: 2 }}>{p.phase}</div>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#0F172A' }}>{p.title}</div>
                      <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Goal: {p.goal}</div>
                    </div>
                    <div style={{ background: '#EFF6FF', color: '#2563EB', borderRadius: 8, padding: '4px 12px', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                      {isOpen ? '▲ Collapse' : '▼ Expand'}
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 24px 24px 88px', borderTop: '1px solid #E2E8F0′ }}>
                      <div style={{ paddingTop: 20 }}>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: 12, fontSize: 15 }}>Action Items:</div>
                        <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
                          {p.actions.map((a, j) => (
                            <li key={j} style={{ color: '#475569', marginBottom: 10, fontSize: 14, lineHeight: 1.6 }}>{a}</li>
                          ))}
                        </ul>
                        <div style={{ marginTop: 20, background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '10px 16px' }}>
                          <span style={{ fontWeight: 700, color: '#166534′ }}>✅ Success Metric: </span>
                          <span style={{ color: '#166534', fontSize: 14 }}>{p.metric}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Objection Handling */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#0F172A' }}>🛡️ Objection Handling Scripts</h2>
          <p style={{ color: '#64748B', marginBottom: 28, fontSize: 15 }}>The same questions come up every time. Know these cold.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {objections.map((o, i) => {
              const isOpen = activeObjection === i;
              return (
                <div
                  key={i}
                  style={{ background: '#FFFFFF', border: `1px solid ${isOpen ? '#2563EB' : '#E2E8F0'}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setActiveObjection(isOpen ? null : i)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#DC2626', fontSize: 15 }}>{o.q}</div>
                    <div style={{ color: '#2563EB', fontSize: 18 }}>{isOpen ? '▲' : '▼'}</div>
                  </div>
                  {isOpen && (
                    <div style={{ padding: '0 20px 20px', borderTop: '1px solid #F1F5F9′ }}>
                      <div style={{ paddingTop: 14, color: '#374151', fontSize: 14, lineHeight: 1.7 }}>
                        <span style={{ fontWeight: 700, color: '#166534′ }}>Your response: </span>{o.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Rhythm */}
        <div style={{ background: '#EFF6FF', borderRadius: 20, padding: 36, marginBottom: 48, border: '1px solid #BFDBFE' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 20px', color: '#1E40AF' }}>🗓️ Weekly Rhythm</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { day: 'Monday', task: 'Review your downline dashboard — who needs activation?' },
              { day: 'Wednesday', task: '20-min team call — share a win, coach one objection' },
              { day: 'Friday', task: 'Send 3 new outreach messages to potential recruits' },
              { day: 'Monthly', task: 'Review override earnings report and identify top performers' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#2563EB', fontSize: 13, marginBottom: 6 }}>{item.day}</div>
                <div style={{ color: '#374151', fontSize: 13, lineHeight: 1.6 }}>{item.task}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1E40AF, #7C3AED)', borderRadius: 20, padding: 44, textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 16 }}>🌐</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
            Ready to Build Your Network?
          </h2>
          <p style={{ color: '#C7D2FE', fontSize: 16, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Lock in your Charter or Founding tier position before the waitlist closes at 500 applications.
          </p>
          <button
            style={{ background: '#FFFFFF', color: '#1E40AF', border: 'none', borderRadius: 10, padding: '14px 40px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}
            onClick={() => window.location.href = '/partner/signup'}
          >
            Claim Your Spot →
          </button>
        </div>

      </div>
    </div>
  );
}
