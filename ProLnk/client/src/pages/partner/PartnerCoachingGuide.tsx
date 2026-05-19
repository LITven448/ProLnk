import { useState } from 'react';

const situations = [
  {
    id: 'quiet',
    label: 'Partner went quiet after signing up',
    approach: 'Curiosity Check-In',
    description: 'Assume good intent — life gets busy. Reach out with genuine curiosity, not pressure.',
    starter: '"Hey [Name], just checking in — how are things going on your end? Any questions come up since we last talked?"',
    avoid: 'Asking "Why haven\’t you done anything yet?"',
    tip: 'Give them a low-barrier first win: "Can you share the landing page with one person this week?"',
  },
  {
    id: 'struggling',
    label: 'Partner is trying but not converting',
    approach: 'Discovery Coaching',
    description: 'Ask questions before giving advice. Understand where the breakdown is happening.',
    starter: '"Walk me through your last three conversations — who did you talk to and how did it go?"',
    avoid: 'Jumping straight to telling them what to do differently.',
    tip: 'Listen for: wrong audience, weak framing, or skipping qualification. Coach the skill, not the result.',
  },
  {
    id: 'frustrated',
    label: 'Partner is frustrated or losing faith',
    approach: 'Validate First',
    description: 'Frustration is a signal — don\’t rush to fix it. Acknowledge before pivoting.',
    starter: '"I hear you — it can feel slow at first. What part feels most discouraging right now?"',
    avoid: 'Toxic positivity ("It\’ll happen, just believe!") or dismissing their concern.',
    tip: 'Share a specific story of someone who hit a wall early and turned it around. Real examples matter.',
  },
  {
    id: 'personality',
    label: 'High-energy partner who burns out fast',
    approach: 'Sustainable Pace',
    description: 'Help them channel energy into systems, not just sprints.',
    starter: '"You\’ve had a great start. How do we build a rhythm that keeps working even on your slower weeks?"',
    avoid: 'Matching their energy and encouraging more unsustainable hustle.',
    tip: 'Give them a weekly checklist with 3 non-negotiable activities. Structure replaces motivation.',
  },
];

export default function PartnerCoachingGuide() {
  const [selected, setSelected] = useState(situations[0].id);
  const item = situations.find(s => s.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>Partner Coaching Guide</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>How to coach sub-partners without micromanaging them</p>
        </div>

        <div style={{ background: '#EFF6FF', border: '2px solid #93C5FD', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#1D4ED8', fontSize: 14, marginBottom: 6 }}>💡 Coaching vs. Accountability</div>
          <div style={{ color: '#1E40AF', fontSize: 13, lineHeight: 1.6 }}>Accountability = tracking outcomes and holding people to commitments. Coaching = asking questions that help people find their own answers. Do both — but lead with coaching. People implement solutions they discover themselves.</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🎯 Select the Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#E5E7EB', background: selected === s.id ? '#FEFCE8' : '#fff', color: '#0A1628', fontWeight: selected === s.id ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14, marginBottom: 4 }}>📌 Approach: {item.approach}</div>
            <div style={{ color: '#374151', fontSize: 14, lineHeight: 1.6 }}>{item.description}</div>
          </div>

          <div style={{ background: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: 13, marginBottom: 8 }}>💬 Conversation Starter</div>
            <div style={{ color: '#15803D', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>{item.starter}</div>
          </div>

          <div style={{ background: '#FEF2F2', border: '2px solid #FCA5A5', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 13, marginBottom: 8 }}>🚫 Avoid This</div>
            <div style={{ color: '#DC2626', fontSize: 14, lineHeight: 1.6 }}>{item.avoid}</div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>⚡ Pro Coaching Tip</div>
            <div style={{ color: '#E5E7EB', fontSize: 14, lineHeight: 1.6 }}>{item.tip}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
