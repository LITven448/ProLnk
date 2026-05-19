import { useState } from 'react';

const approaches = [
  {
    duration: 'short',
    lastEngagement: 'signed-up',
    label: 'Went quiet shortly after signing up',
    reason: 'Most likely: overwhelm, life interference, or didn\’t know what to do first.',
    sequence: [
      { msg: 1, content: '"Hey [Name]! I know getting started can feel like a lot — totally normal. What\’s one thing I can help clarify for you this week?"', timing: 'Day 1' },
      { msg: 2, content: '"Quick follow-up — if you\’ve got 15 minutes, I can walk you through the first 3 steps. Would [Tuesday/Thursday] work?"', timing: 'Day 4' },
      { msg: 3, content: '"Last check-in for now — I\’ll be here when timing is better. Want me to flag any platform updates that might interest you?"', timing: 'Day 10' },
    ],
    invest: true,
    note: 'High priority — still warm. One conversation usually unlocks momentum.',
  },
  {
    duration: 'short',
    lastEngagement: 'conversation',
    label: 'Was engaged in conversation, then ghosted',
    reason: 'Most likely: lost enthusiasm, competing priority, or felt unprepared to move forward.',
    sequence: [
      { msg: 1, content: '"Hey [Name], following up from our chat. Did you get a chance to look at the partner page I sent?"', timing: 'Day 2' },
      { msg: 2, content: '"No pressure — just want to make sure I didn\’t lose you in a spam folder! Happy to hop on a quick call if that\’s easier."', timing: 'Day 6' },
      { msg: 3, content: '"Checking in one last time — the waitlist is filling. Happy to reconnect whenever the timing works for you."', timing: 'Day 12' },
    ],
    invest: true,
    note: 'Use a different channel for Message 2 if available (text vs email).',
  },
  {
    duration: 'long',
    lastEngagement: 'active',
    label: 'Was active for months, then disappeared',
    reason: 'Most likely: hit a plateau, had a personal disruption, or lost confidence after a few rejections.',
    sequence: [
      { msg: 1, content: '"[Name], I\’ve been thinking about you — it\’s been a while. How are things going outside of ProLnk?"', timing: 'Week 1' },
      { msg: 2, content: '"When you were active, you were doing well. What changed? I\’d love to understand and see if there\’s a way to reignite things."', timing: 'Week 2' },
      { msg: 3, content: '"I want to be honest — I think you have what it takes but I don\’t want to push if it\’s not the right season. What would need to be true for this to work again?"', timing: 'Week 3' },
    ],
    invest: true,
    note: 'Worth significant investment — these partners know the system. Often just need a reset conversation.',
  },
  {
    duration: 'long',
    lastEngagement: 'signed-up',
    label: 'Signed up long ago, never really started',
    reason: 'Most likely: never found the activation energy. Possibly wrong fit.',
    sequence: [
      { msg: 1, content: '"Hey [Name], I realized we never really got you started with ProLnk. Is this still something you\’re interested in or should I take you off my list?"', timing: 'Week 1' },
      { msg: 2, content: '"No hard feelings either way — just want to be respectful of your time. If yes, I\’ll send a quick 3-step starter guide."', timing: 'Week 2' },
    ],
    invest: false,
    note: 'Low investment recommended. Offer a clear exit and move on if no response.',
  },
];

export default function PartnerWinBackGuide() {
  const [duration, setDuration] = useState('short');
  const [lastEngagement, setLastEngagement] = useState('signed-up');

  const item = approaches.find(a => a.duration === duration && a.lastEngagement === lastEngagement) || approaches[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🔄</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>Win-Back Guide</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>Reactivate inactive partners with the right approach and message sequence</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🎯 Describe the Situation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>How long have they been inactive?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ val: 'short', label: 'Less than 1 month' }, { val: 'long', label: '1+ months' }].map(opt => (
                <button key={opt.val} onClick={() => setDuration(opt.val)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: duration === opt.val ? '#F5E642' : '#E5E7EB', background: duration === opt.val ? '#FEFCE8' : '#fff', color: '#0A1628', fontWeight: duration === opt.val ? 700 : 500, cursor: 'pointer', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>What was their last engagement?</label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[{ val: 'signed-up', label: 'Just signed up' }, { val: 'conversation', label: 'Had a conversation' }, { val: 'active', label: 'Was active' }].map(opt => (
                <button key={opt.val} onClick={() => setLastEngagement(opt.val)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: lastEngagement === opt.val ? '#F5E642' : '#E5E7EB', background: lastEngagement === opt.val ? '#FEFCE8' : '#fff', color: '#0A1628', fontWeight: lastEngagement === opt.val ? 700 : 500, cursor: 'pointer', fontSize: 13 }}>{opt.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: `2px solid ${item.invest ? '#F5E642' : '#E5E7EB'}`, borderRadius: 12, padding: '18px 20px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14, marginBottom: 4 }}>{item.label}</div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 10 }}>{item.reason}</div>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: item.invest ? '#FEF9C3' : '#F3F4F6', color: item.invest ? '#92400E' : '#6B7280', fontSize: 12, fontWeight: 700 }}>{item.invest ? '⭐ Invest Time' : '⏭️ Low Investment'}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {item.sequence.map(s => (
            <div key={s.msg} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 700, color: '#0A1628', fontSize: 13 }}>Message {s.msg}</span>
                <span style={{ fontSize: 12, color: '#6B7280', background: '#F3F4F6', padding: '2px 10px', borderRadius: 20 }}>{s.timing}</span>
              </div>
              <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>{s.content}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '18px 24px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📌 Key Note</div>
          <div style={{ color: '#E5E7EB', fontSize: 14, lineHeight: 1.6 }}>{item.note}</div>
        </div>
      </div>
    </div>
  );
}
