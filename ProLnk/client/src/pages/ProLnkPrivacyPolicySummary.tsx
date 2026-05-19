import { useState } from 'react';

const concerns = ['data collection', 'data sharing', 'your rights', 'data deletion'] as const;
type Concern = typeof concerns[number];

const sections: Record<Concern, { emoji: string; summary: string; details: string[]; action: string }> = {
  'data collection': {
    emoji: '📥',
    summary: 'What ProLnk collects about you',
    details: [
      '🏠 Property address and service history you provide during signup',
      '📞 Contact info: name, email, phone — used for match notifications only',
      '📍 Approximate location to route leads to nearby partners',
      '⭐ Ratings and reviews you leave after job completion',
      '🖥️ Usage data: pages visited, time on site, device type (anonymized)',
    ],
    action: 'Review your data: log into your ProLnk account → Settings → My Data',
  },
  'data sharing': {
    emoji: '🤝',
    summary: 'Who sees your information',
    details: [
      '🔧 Matched contractors see your name, phone, and job description only',
      '🤖 AI matching system uses anonymized job data to improve accuracy',
      '📊 Aggregate analytics shared with investors — never individual records',
      '🚫 ProLnk does NOT sell your data to advertisers or data brokers',
      '⚖️ Law enforcement access requires valid court order — you are notified',
    ],
    action: 'Limit sharing: Account → Settings → Data Sharing → turn off optional analytics',
  },
  'your rights': {
    emoji: '⚖️',
    summary: 'Your data rights under CCPA and Texas law',
    details: [
      '📋 Right to know: request a full export of your data at any time',
      '✏️ Right to correct: fix inaccurate info in your profile within 5 days',
      '🚫 Right to opt out: stop marketing emails instantly via unsubscribe link',
      '🔒 Right to restrict: limit how your data is used for AI training',
      '👶 No data collected from users under 18 — accounts auto-flagged',
    ],
    action: 'Exercise rights: email privacy@prolnk.io with subject line "Data Rights Request"',
  },
  'data deletion': {
    emoji: '🗑️',
    summary: 'How to delete your data',
    details: [
      '⏱️ Deletion requests processed within 30 days of confirmation',
      '📁 Active transaction records retained 7 years for tax compliance',
      '🗑️ All other data permanently deleted — not archived or anonymized',
      '📧 You receive email confirmation when deletion is complete',
      '🔄 Deleting account does not forfeit owed commissions — paid first',
    ],
    action: 'Request deletion: Account → Settings → Delete My Account, or email privacy@prolnk.io',
  },
};

export default function ProLnkPrivacyPolicySummary() {
  const [selected, setSelected] = useState<Concern>('data collection');
  const s = sections[selected];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔒</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Privacy Policy Summary</h1>
          <p style={{ color: '#64748B', marginTop: 8 }}>Plain language — no legalese. Select what you want to understand.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
          {concerns.map(c => (
            <button key={c} onClick={() => setSelected(c)} style={{
              padding: '8px 18px', borderRadius: 24, border: '2px solid',
              borderColor: selected === c ? '#0A1628′ : '#CBD5E1',
              background: selected === c ? '#0A1628′ : ’white',
              color: selected === c ? 'white' : '#0A1628',
              fontWeight: 700, cursor: 'pointer', fontSize: 13, textTransform: 'capitalize',
            }}>{c}</button>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 28, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 28 }}>{s.emoji}</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', margin: 0 }}>{s.summary}</h2>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0′ }}>
            {s.details.map((d, i) => (
              <li key={i} style={{ padding: '10px 0', borderBottom: i < s.details.length - 1 ? '1px solid #F1F5F9′ : ’none', color: '#1E293B', fontSize: 15 }}>{d}</li>
            ))}
          </ul>
          <div style={{ background: '#F0FDF4', borderRadius: 10, padding: '12px 16px', borderLeft: '4px solid #22C55E' }}>
            <p style={{ margin: 0, color: '#15803D', fontSize: 14, fontWeight: 600 }}>✅ How to act on this:</p>
            <p style={{ margin: '4px 0 0', color: '#166534', fontSize: 13 }}>{s.action}</p>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '16px 20px' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>
            🛡️ ProLnk is compliant with CCPA, Texas HB 4 (TDPSA), and GDPR where applicable. Full policy: prolnk.io/privacy
          </p>
        </div>
      </div>
    </div>
  );
}
