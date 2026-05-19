import { useState } from 'react';

const phases = [
  {
    label: 'Day 1–7: Setup & Learning',
    color: '#F5E642',
    tasks: [
      'Complete your partner profile and bio',
      'Watch the Partner Orientation video series',
      'Download the ProLnk Partner app',
      'Join the Partner Community Slack channel',
      'Review your commission structure and earning tiers',
      'Set your service area and availability',
      'Connect with your assigned Partner Success Manager',
    ],
  },
  {
    label: 'Day 8–14: First Conversations',
    color: '#FBB040',
    tasks: [
      'Make a list of 20 people in your network who own homes',
      'Send 5 warm outreach messages using the Partner Marketing Kit',
      'Attend your first weekly Partner Webinar',
      'Practice explaining the Home Health Vault value proposition',
      'Post your first social media piece using provided templates',
      'Schedule 3 one-on-one informational calls',
      'Log your first prospect interaction in your tracker',
    ],
  },
  {
    label: 'Day 15–21: First Sign-Ups',
    color: '#10B981',
    tasks: [
      'Convert your first homeowner sign-up',
      'Walk a homeowner through the Home Health Vault setup',
      'Refer your first pro candidate to the platform',
      'Track your first commission calculation in the dashboard',
      'Share your success story in the Partner Community',
      'Ask a signed homeowner for a testimonial',
      'Set a 60-day income goal with your Partner Success Manager',
    ],
  },
  {
    label: 'Day 22–30: Build Momentum',
    color: '#6366F1',
    tasks: [
      'Recruit your first sub-partner and explain the override system',
      'Reach 3+ signed homeowners this week',
      'Post twice more on social media with results and storytelling',
      'Review your Month 1 earnings summary',
      'Identify your top 3 referral sources',
      'Set Month 2 recruiting and sign-up targets',
      'Celebrate your first 30 days — you are building something real',
    ],
  },
];

export default function PartnerFirst30Days() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const total = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>🗓️</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>
              Your First 30 Days as a ProLnk Partner
            </h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
            Follow this roadmap to go from zero to momentum. Check off each task as you complete it.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '16px 20px', marginBottom: 32, border: '1px solid #E2E8F0′ }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: '#0A1628′ }}>Overall Progress</span>
            <span style={{ fontWeight: 700, color: '#0A1628′ }}>{done}/{total} tasks · {pct}%</span>
          </div>
          <div style={{ height: 10, backgroundColor: '#E2E8F0', borderRadius: 99 }}>
            <div style={{ height: 10, backgroundColor: '#F5E642', borderRadius: 99, width: `${pct}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {phases.map((phase, pi) => {
          const phaseDone = phase.tasks.filter((_, ti) => checked[`${pi}-${ti}`]).length;
          return (
            <div key={pi} style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E2E8F0′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: phase.color, flexShrink: 0 }} />
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', margin: 0 }}>{phase.label}</h2>
                <span style={{ marginLeft: 'auto', fontSize: 13, color: '#64748B' }}>{phaseDone}/{phase.tasks.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {phase.tasks.map((task, ti) => {
                  const key = `${pi}-${ti}`;
                  return (
                    <label key={ti} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!checked[key]}
                        onChange={() => toggle(key)}
                        style={{ marginTop: 2, accentColor: '#F5E642', width: 16, height: 16, flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 14, color: checked[key] ? '#94A3B8′ : '#0A1628', textDecoration: checked[key] ? ’line-through' : 'none' }}>
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {pct === 100 && (
          <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>You crushed your first 30 days!</h3>
            <p style={{ color: '#0A1628', margin: 0, fontSize: 14 }}>Your network is now taking shape. Keep recruiting — income compounds from here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
