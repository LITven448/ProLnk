import { useState } from 'react';

const stages = [
  { id: 'searching', label: '🔍 Still Searching', desc: 'Looking for reliable contractors' },
  { id: 'first', label: '🤝 First Job Done', desc: 'Just used a new contractor' },
  { id: 'repeat', label: '🔄 Repeat Customer', desc: 'Used them 2–3 times' },
  { id: 'partner', label: '🏆 Long-Term Partner', desc: 'They're my go-to for the trade' },
];

const guides: Record<string, { title: string; tips: string[] }> = {
  searching: {
    title: 'Finding Your First Great DFW Contractor',
    tips: [
      'ProLnk Charter Pros are verified, licensed, and DFW-native',
      'Read reviews for communication, punctuality, and cleanup',
      'Get 2–3 quotes for any job over $500',
      'Check license numbers at Texas Dept of Licensing (TDLR)',
      'Prefer contractors who ask questions before quoting',
    ],
  },
  first: {
    title: 'After the First Job — Build the Relationship',
    tips: [
      'Leave a detailed, honest review — pros prioritize reviewers',
      'Save their contact in ProLnk for direct rebooking',
      'Ask about their seasonal availability and booking lead time',
      'Pay promptly — pros remember and prioritize fast-pay clients',
      'Share one piece of feedback constructively if anything was off',
    ],
  },
  repeat: {
    title: 'Repeat Customer Advantages',
    tips: [
      'Repeat clients get priority scheduling during DFW summer rush',
      'Charter Pros offer loyalty pricing: 5–15% off repeat visits',
      'Pros remember your home — faster assessment, fewer surprises',
      'Ask for a preventive walkthrough during each visit',
      'ProLnk logs your service history automatically in the Vault',
    ],
  },
  partner: {
    title: 'Long-Term Partner — Maximum Value',
    tips: [
      'Your pro is now a teammate — share annual plans with them',
      'Ask for referrals to their trusted network (plumber → electrician)',
      'Co-schedule seasonal maintenance in advance each year',
      'Partners often provide emergency response priority',
      'ProLnk Vault captures the full history for resale documentation',
    ],
  },
};

export default function DFWContractorRelationshipGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui,sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: 0 }}>DFW Contractor Relationship Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>Great contractors are earned. Here's how to build relationships that save you time and money.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>💡 What DFW Pros Want From You</p>
          {['Clear scope before the job starts', 'Payment within 24 hours of completion', 'Honest and specific reviews', 'Reasonable access and scheduling windows', 'Repeat business over one-time urgency calls'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '.75rem', marginBottom: '.5rem' }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#cbd5e1' }}>{item}</span>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>Where are you in your contractor relationship?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '1rem', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontSize: '.85rem', opacity: .8, marginTop: '.25rem' }}>{s.desc}</div>
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{guide.title}</h2>
            {guide.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '.75rem', marginBottom: '.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642' }}>✓</span>
                <span style={{ color: '#cbd5e1' }}>{tip}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: '#1e3a5f', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.5rem' }}>🏅 ProLnk Charter Pros Are Built for Long-Term Relationships</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '.9rem' }}>Charter Pros commit to DFW homeowners — verified, local, and invested in your home long-term.</p>
        </div>
      </div>
    </div>
  );
}
