import { useState } from 'react';

const situations = ['recruiting', 'homeowner conduct', 'violations', 'appeals'] as const;
type Situation = typeof situations[number];

const guides: Record<Situation, { emoji: string; title: string; guideline: string; what: string[]; consequence: string }> = {
  'recruiting': {
    emoji: '🤝',
    title: 'Honest Partner Recruiting',
    guideline: 'Share what ProLnk actually is — not what you wish it were',
    what: [
      '✅ DO: Show your real earnings dashboard when recruiting',
      '✅ DO: Explain that income varies by effort and market conditions',
      '✅ DO: Disclose the $149/mo subscription cost upfront',
      '🚫 DON\’T: Promise specific income amounts or minimum earnings',
      '🚫 DON\’T: Recruit in trades you know nothing about',
      '🚫 DON\’T: Pressure prospects who have said no',
    ],
    consequence: '⚠️ Misrepresentation: account review → commission hold → termination for repeat violations',
  },
  'homeowner conduct': {
    emoji: '🏠',
    title: 'Being a Great Homeowner',
    guideline: 'Accurate job descriptions and fair ratings make the platform work for everyone',
    what: [
      '✅ DO: Describe the job scope clearly — size, materials, access',
      '✅ DO: Be available by phone/text the day a match is made',
      '✅ DO: Leave a rating within 7 days of job completion',
      '🚫 DON\’T: Post a job you have no intention of completing',
      '🚫 DON\’T: Contact the same contractor outside ProLnk to avoid platform fees',
      '🚫 DON\’T: Leave retaliatory reviews based on price, not quality',
    ],
    consequence: '⚠️ Circumvention: $250 fee + account suspension; fraudulent reviews removed within 48 hours',
  },
  'violations': {
    emoji: '🚨',
    title: 'How Violations Are Handled',
    guideline: 'ProLnk uses a 3-strike system with escalating consequences',
    what: [
      '1️⃣ First violation: written warning + 7-day commission hold',
      '2️⃣ Second violation: 30-day account suspension + mandatory review',
      '3️⃣ Third violation: permanent ban + forfeiture of pending commissions',
      '🔴 Immediate ban: fraud, harassment, data theft, or criminal conduct',
      '📋 All violations logged — pattern detection runs weekly',
      '📧 You are notified by email within 24 hours of any action taken',
    ],
    consequence: '⚖️ All enforcement decisions are documented and reviewable on appeal',
  },
  'appeals': {
    emoji: '⚖️',
    title: 'Appealing a Decision',
    guideline: 'Every enforcement decision can be appealed within 30 days',
    what: [
      '📧 Email appeals@prolnk.io with subject: "Appeal – [Your Account ID]"',
      '📋 Include: what decision you are appealing, why you believe it was wrong',
      '📸 Attach any evidence: screenshots, messages, or documents',
      '⏱️ Appeals reviewed within 5 business days by a different team member',
      '✅ If upheld: penalties reversed, commissions restored, account reinstated',
      '🔒 If denied: written explanation provided, case closed permanently',
    ],
    consequence: '📝 Appeals decided on facts — not volume of complaints or relationship status',
  },
};

export default function ProLnkCommunityGuide() {
  const [selected, setSelected] = useState<Situation>('recruiting');
  const g = guides[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🌐</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Community Guidelines</h1>
          <p style={{ color: '#64748B', marginTop: 8 }}>How we stay a high-trust marketplace — select your situation</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {situations.map(s => (
            <button key={s} onClick={() => setSelected(s)} style={{
              padding: '8px 18px', borderRadius: 24, border: '2px solid',
              borderColor: selected === s ? '#0A1628′ : '#CBD5E1',
              background: selected === s ? '#0A1628′ : ’white',
              color: selected === s ? 'white' : '#0A1628',
              fontWeight: 700, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
            }}>{s}</button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>{g.emoji}</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', margin: 0 }}>{g.title}</h2>
          </div>
          <p style={{ color: '#64748B', fontSize: 14, marginBottom: 16, fontStyle: 'italic' }}>"{g.guideline}"</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0′ }}>
            {g.what.map((w, i) => (
              <li key={i} style={{ padding: '9px 0', borderBottom: i < g.what.length - 1 ? '1px solid #F1F5F9′ : ’none', color: '#1E293B', fontSize: 14 }}>{w}</li>
            ))}
          </ul>
          <div style={{ background: '#FEF3C7', borderRadius: 10, padding: '12px 16px', borderLeft: '4px solid #F59E0B' }}>
            <p style={{ margin: 0, color: '#92400E', fontSize: 13, fontWeight: 600 }}>{g.consequence}</p>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
            📋 Full community guidelines: prolnk.io/community — updated quarterly. Questions? community@prolnk.io
          </p>
        </div>
      </div>
    </div>
  );
}
