import { useState } from 'react';

const situations = [
  {
    id: 'income',
    label: 'Talking about income potential',
    compliant: 'Many of our partners earn meaningful supplemental income — results depend on effort, market, and consistency.',
    avoid: 'You can make $5,000/month easily. This is passive income.',
    rule: 'Never guarantee specific dollar amounts. Always include results-may-vary context.',
  },
  {
    id: 'recruiting',
    label: 'Recruiting a new partner',
    compliant: 'I want to share an opportunity. There\’s no obligation and I\’ll show you exactly how it works before you decide.',
    avoid: 'You\’d be crazy not to join. Everyone who signs up makes money.',
    rule: 'Full disclosure required: explain the structure, costs, and realistic expectations upfront.',
  },
  {
    id: 'testimonial',
    label: 'Sharing your own results',
    compliant: 'Here\’s what I\’ve personally earned in my first 3 months — my experience may not be typical.',
    avoid: 'I made $3,000 last month and you can too.',
    rule: 'Personal testimonials must include "results not typical" or equivalent disclaimer.',
  },
  {
    id: 'social',
    label: 'Posting on social media',
    compliant: 'Excited about my side project with ProLnk. Happy to share details — DM me. #ad',
    avoid: 'ProLnk changed my life. Join my team and quit your job.',
    rule: 'FTC requires #ad or #sponsored on paid/referral posts. No lifestyle income claims.',
  },
];

export default function PartnerComplianceGuide() {
  const [selected, setSelected] = useState(situations[0].id);
  const item = situations.find(s => s.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>Partner Compliance Guide</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>What to say — and what not to say — when recruiting and sharing ProLnk</p>
        </div>

        <div style={{ background: '#FEF9C3', border: '2px solid #F5E642', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 14, marginBottom: 6 }}>📌 Core FTC Rule</div>
          <div style={{ color: '#374151', fontSize: 13, lineHeight: 1.6 }}>Any income claim — even implied — must be substantiated and include "results not typical" or equivalent. Sharing your lifestyle without disclosure violates FTC guidelines and can expose you and ProLnk to liability.</div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>🎯 Choose Your Recruiting Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642' : '#E5E7EB', background: selected === s.id ? '#FEFCE8' : '#fff', color: '#0A1628', fontWeight: selected === s.id ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
          <div style={{ background: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: 13, marginBottom: 8 }}>✅ Compliant Language</div>
            <div style={{ color: '#15803D', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{item.compliant}"</div>
          </div>
          <div style={{ background: '#FEF2F2', border: '2px solid #FCA5A5', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#991B1B', fontSize: 13, marginBottom: 8 }}>🚫 What to Avoid</div>
            <div style={{ color: '#DC2626', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{item.avoid}"</div>
          </div>
          <div style={{ background: '#EFF6FF', border: '2px solid #93C5FD', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, color: '#1D4ED8', fontSize: 13, marginBottom: 8 }}>📖 The Rule</div>
            <div style={{ color: '#1E40AF', fontSize: 14, lineHeight: 1.6 }}>{item.rule}</div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '18px 24px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🛡️ When in Doubt</div>
          <div style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1.6 }}>Add "results may vary" to any income reference. Disclose your relationship with ProLnk. Never make guarantees. Contact compliance@prolnk.io with specific questions before posting.</div>
        </div>
      </div>
    </div>
  );
}
