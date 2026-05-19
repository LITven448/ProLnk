import { useState } from 'react';

const phases = [
  {
    id: 'setup',
    label: 'Account Setup',
    emoji: '⚙️',
    items: [
      'Complete your ProLnk partner profile with photo and bio',
      'Set your service area and target zip codes',
      'Connect your payout method (bank or PayPal)',
      'Download the ProLnk Partner mobile app',
      'Set up your referral link and custom landing page',
    ],
  },
  {
    id: 'training',
    label: 'Platform Training',
    emoji: '📚',
    items: [
      'Watch the 20-min Partner Orientation video',
      'Complete the Network Income System module',
      'Review the Partner Script Library',
      'Take the platform quiz (80% to pass)',
      'Schedule your 1-on-1 onboarding call with your upline',
      'Join the ProLnk Partner Slack workspace',
    ],
  },
  {
    id: 'outreach',
    label: 'First Prospect Outreach',
    emoji: '📣',
    items: [
      'Build your warm list of 25 potential partners',
      'Send your first 10 outreach messages using the script library',
      'Post in one local Facebook group or Nextdoor community',
      'Follow up with anyone who opened but did not respond',
    ],
  },
  {
    id: 'signup',
    label: 'First Partner Sign-Up',
    emoji: '🤝',
    items: [
      'Walk your first partner through the sign-up page together',
      'Send them the Partner Orientation video link',
      'Add them to your team tracking sheet',
      'Schedule a weekly 15-min check-in call',
      'Celebrate their first commission in the group chat',
    ],
  },
  {
    id: 'scale',
    label: 'Team Building',
    emoji: '🚀',
    items: [
      'Recruit your second and third partner within 30 days',
      'Host your first virtual team call',
      'Share your first month income screenshot in the community',
      'Set your 90-day partner recruitment goal',
      'Review your team leaderboard weekly',
      'Nominate a top performer for Partner of the Month',
    ],
  },
];

export default function PartnerOnboardingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [openPhase, setOpenPhase] = useState<string>('setup');

  const totalItems = phases.reduce((sum, p) => sum + p.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const phaseProgress = (phase: typeof phases[0]) => {
    const done = phase.items.filter((_, i) => checked[`${phase.id}-${i}`]).length;
    return Math.round((done / phase.items.length) * 100);
  };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Onboarding Checklist</h1>
          <p style={{ color: '#64748B', fontSize: 15, marginTop: 10 }}>5 phases to your first commission. Track your progress below.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 24, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>Overall Progress</span>
            <span style={{ fontWeight: 800, color: '#0A1628', fontSize: 20 }}>{progress}%</span>
          </div>
          <div style={{ background: '#E2E8F0', borderRadius: 999, height: 12, overflow: 'hidden' }}>
            <div
              style={{
                background: progress === 100 ? '#22C55E' : '#F5E642',
                width: `${progress}%`,
                height: '100%',
                borderRadius: 999,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#64748B' }}>
            {checkedCount} of {totalItems} items complete
            {progress === 100 && (
              <span style={{ marginLeft: 10, color: '#16A34A', fontWeight: 700 }}>🎉 Onboarding Complete!</span>
            )}
          </div>
        </div>

        {phases.map(phase => {
          const pp = phaseProgress(phase);
          const isOpen = openPhase === phase.id;
          return (
            <div
              key={phase.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                marginBottom: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: isOpen ? '2px solid #F5E642' : '2px solid transparent',
                overflow: 'hidden',
              }}
            >
              <div
                onClick={() => setOpenPhase(isOpen ? '' : phase.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', cursor: 'pointer' }}
              >
                <div style={{ fontSize: 26 }}>{phase.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 15 }}>{phase.label}</div>
                  <div style={{ height: 6, background: '#E2E8F0', borderRadius: 999, marginTop: 6, width: 180, overflow: 'hidden' }}>
                    <div style={{ background: pp === 100 ? '#22C55E' : '#F5E642', width: `${pp}%`, height: '100%', borderRadius: 999 }} />
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#94A3B8', minWidth: 60, textAlign: 'right' }}>
                  {phase.items.filter((_, i) => checked[`${phase.id}-${i}`]).length}/{phase.items.length}
                  <span style={{ display: 'block', fontSize: 16 }}>{isOpen ? '▲' : '▼'}</span>
                </div>
              </div>

              {isOpen && (
                <div style={{ borderTop: '1px solid #F1F5F9', padding: '16px 20px' }}>
                  {phase.items.map((item, i) => {
                    const key = `${phase.id}-${i}`;
                    const done = !!checked[key];
                    return (
                      <div
                        key={i}
                        onClick={() => toggle(key)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          padding: '10px 0',
                          borderBottom: i < phase.items.length - 1 ? '1px solid #F8FAFC' : 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          border: done ? 'none' : '2px solid #CBD5E1',
                          background: done ? '#F5E642' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                          fontWeight: 800,
                          fontSize: 13,
                          color: '#0A1628',
                        }}>
                          {done ? '✓' : ''}
                        </div>
                        <span style={{ fontSize: 14, color: done ? '#94A3B8' : '#334155', textDecoration: done ? 'line-through' : 'none', lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
