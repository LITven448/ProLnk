import { useState } from 'react';

const reactivationSteps = [
  { day: 'Day 1', action: 'Send a personal voice message or video — not a text', emoji: '🎙️' },
  { day: 'Day 3', action: 'Share a team win screenshot — show what they are missing', emoji: '📸' },
  { day: 'Day 7', action: 'Send a specific challenge: "Can you get 1 homeowner this week?"', emoji: '🎯' },
  { day: 'Day 14', action: 'Offer a 20-min coaching call — listen, do not pitch', emoji: '📞' },
  { day: 'Day 21', action: 'Final outreach: invite to a live team Zoom with testimonials', emoji: '💻' },
];

const incentives = [
  { label: 'Monthly Cash Bonus', desc: 'Top recruiter each month wins $100 gift card. Post results publicly.', works: true },
  { label: 'Leaderboard Visibility', desc: 'Public team ranking shown in partner app. Names drive pride.', works: true },
  { label: 'Milestone Badges', desc: 'Digital badges for 1st partner, 5th partner, first $1K month.', works: true },
  { label: 'Discounted Subscription', desc: 'Reduce their fee for hitting targets. Only works short-term.', works: false },
  { label: 'Generic Email Blasts', desc: '"You can do it!" messages without personalization. Ineffective.', works: false },
];

const healthQuestions = [
  'Have you spoken 1-on-1 with every sub-partner in the last 2 weeks?',
  'Does each partner know their personal income goal?',
  'Has your team had at least one group call this month?',
  'Do you celebrate wins publicly (group chat, leaderboard)?',
  'Have all your partners completed the onboarding checklist?',
  'Do you have a clear reactivation plan for inactive partners?',
  'Are you tracking each partner\’s monthly homeowner signups?',
  'Has anyone on your team referred a new partner in the last 30 days?',
];

const getHealthLabel = (score: number) => {
  if (score >= 7) return { label: 'Thriving Team 🌟', color: '#16A34A', bg: '#F0FDF4', action: 'Keep it up! Focus on scaling to L3 and beyond.' };
  if (score >= 5) return { label: 'Developing Team 🌱', color: '#D97706', bg: '#FFFBEB', action: 'Prioritize weekly check-ins and celebrate every win loudly.' };
  return { label: 'At-Risk Team ⚠️', color: '#DC2626', bg: '#FEF2F2', action: 'Start your 5-touch reactivation sequence today for inactive partners.' };
};

const signs = [
  { sign: 'No logins in 10+ days', severity: 'high' },
  { sign: 'Missed 2+ weekly check-ins', severity: 'high' },
  { sign: 'No homeowner signups in 30 days', severity: 'medium' },
  { sign: 'Unread messages in group chat', severity: 'medium' },
  { sign: 'Not attending team calls', severity: 'medium' },
  { sign: 'Asking about cancellation', severity: 'high' },
  { sign: 'Shorter reply times than usual', severity: 'low' },
];

export default function PartnerRetentionGuide() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const score = Object.values(answers).filter(Boolean).length;
  const answered = Object.keys(answers).length;
  const health = getHealthLabel(score);

  const toggle = (i: number) => setAnswers(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: 0 }}>Partner Retention Guide</h1>
          <p style={{ color: '#64748B', fontSize: 15, marginTop: 10 }}>Keep your team active, engaged, and earning. Retention is your highest-ROI activity.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 32, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', margin: '0 0 20px' }}>🚨 Signs of Partner Disengagement</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {signs.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 10,
                background: s.severity === 'high' ? '#FEF2F2′ : s.severity === ’medium' ? '#FFFBEB' : '#F0FDF4',
                border: `1px solid ${s.severity === 'high' ? '#FECACA' : s.severity === 'medium' ? '#FDE68A' : '#BBF7D0'}`,
              }}>
                <span style={{ fontSize: 16 }}>{s.severity === 'high' ? '🔴' : s.severity === 'medium' ? '🟡' : '🟢'}</span>
                <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{s.sign}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 32, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', margin: '0 0 20px' }}>📲 5-Touch Reactivation Sequence</h2>
          <div style={{ position: 'relative' }}>
            {reactivationSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {step.emoji}
                  </div>
                  {i < reactivationSteps.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: '#E2E8F0', marginTop: 4, marginBottom: -4 }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < reactivationSteps.length - 1 ? 20 : 0 }}>
                  <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13 }}>{step.day}</div>
                  <div style={{ color: '#334155', fontSize: 14, marginTop: 2 }}>{step.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 32, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0A1628', margin: '0 0 6px' }}>🏆 Incentives That Work (and Don't)</h2>
          <p style={{ color: '#64748B', fontSize: 14, marginBottom: 20 }}>Not all incentives are equal. Focus on what actually drives retention.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {incentives.map((inc, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                padding: '12px 16px',
                borderRadius: 12,
                background: inc.works ? '#F0FDF4′ : '#FEF2F2',
                border: `1px solid ${inc.works ? '#BBF7D0' : '#FECACA'}`,
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{inc.works ? '✅' : '❌'}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14 }}>{inc.label}</div>
                  <div style={{ color: '#64748B', fontSize: 13, marginTop: 2 }}>{inc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, margin: '0 0 6px' }}>🩺 Team Health Check</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 24 }}>Answer 8 quick questions to see your team's retention health score.</p>

          {healthQuestions.map((q, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                padding: '12px 0',
                borderBottom: i < healthQuestions.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: answers[i] ? 'none' : '2px solid #334155',
                background: answers[i] ? '#F5E642′ : ’transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: 13,
                color: '#0A1628',
                marginTop: 1,
              }}>
                {answers[i] ? '✓' : ''}
              </div>
              <span style={{ color: '#E2E8F0', fontSize: 14, lineHeight: 1.5 }}>{q}</span>
            </div>
          ))}

          <button
            onClick={() => setShowScore(true)}
            disabled={answered < 8}
            style={{
              marginTop: 24,
              background: answered >= 8 ? '#F5E642′ : '#334155',
              color: answered >= 8 ? '#0A1628′ : '#94A3B8',
              border: 'none',
              borderRadius: 10,
              padding: '12px 28px',
              fontWeight: 700,
              fontSize: 15,
              cursor: answered >= 8 ? 'pointer' : 'not-allowed',
              width: '100%',
            }}
          >
            {answered < 8 ? `Answer all 8 questions (${answered}/8)` : 'See My Team Health Score →'}
          </button>

          {showScore && answered >= 8 && (
            <div style={{ marginTop: 20, background: health.bg, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, color: health.color, fontSize: 20 }}>{health.label}</div>
              <div style={{ color: '#334155', marginTop: 4, fontSize: 14 }}>Score: {score}/8 · {health.action}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
