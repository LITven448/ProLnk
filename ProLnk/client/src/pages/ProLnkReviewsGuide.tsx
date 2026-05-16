import { useState } from 'react';

const scenarios = [
  { label: '5-Star Glowing Review', guide: 'Respond with genuine thanks. Mention one specific detail they praised to show you read it. Keep it under 3 sentences.' },
  { label: '4-Star with Minor Critique', guide: 'Thank them, acknowledge the critique, and explain what you will do differently. Shows professionalism.' },
  { label: '3-Star Vague Feedback', guide: 'Respond publicly, then message privately to understand what went wrong. Offer to make it right.' },
  { label: '1-Star Unfair Review', guide: 'Stay calm. State facts only. Never argue. ProLnk allows dispute filing if the review violates policy.' },
  { label: 'No Response from Customer', guide: 'Politely remind the homeowner to rate — one message max. Never pressure or incentivize.' },
];

const rules = [
  { icon: '⭐', rule: 'Homeowners rate after every completed job — 1 to 5 stars plus optional written comment.' },
  { icon: '📊', rule: 'Your rating is a rolling 90-day weighted average. Recent jobs count more than old ones.' },
  { icon: '🔒', rule: 'Maintain 4.5+ average to keep Charter match priority. Below 4.0 triggers a performance review.' },
  { icon: '💬', rule: 'You can respond publicly to any review — homeowners and other pros can see your responses.' },
  { icon: '🚫', rule: 'ProLnk prohibits requesting or incentivizing specific ratings. Violation = account suspension.' },
];

export default function ProLnkReviewsGuide() {
  const [scenario, setScenario] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⭐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Reviews Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>How the review system works and how top pros use it to their advantage.</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {rules.map((r, i) => (
            <div key={i} style={{ background: '#0F2035', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <span style={{ color: '#B0C4D8', fontSize: 14, lineHeight: 1.6 }}>{r.rule}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>💡 Review Scenario — Best Response Guide</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {scenarios.map(s => (
              <button key={s.label} onClick={() => setScenario(s.label)} style={{
                background: scenario === s.label ? '#F5E642' : '#1A2F4A',
                color: scenario === s.label ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13
              }}>{s.label}</button>
            ))}
          </div>
          {scenario && (
            <div style={{ background: '#1A2F4A', borderRadius: 8, padding: 16, color: '#B0C4D8', fontSize: 14, lineHeight: 1.7 }}>
              💬 {scenarios.find(s => s.label === scenario)?.guide}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
