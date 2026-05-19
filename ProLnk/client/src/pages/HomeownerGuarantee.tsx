import { useState } from 'react';

const GUARANTEES = [
  {
    id: 'quotes',
    icon: '📋',
    title: '3 Verified Quotes in 24 Hours',
    detail: 'Submit your job and we\’ll deliver 3 quotes from background-checked, insured pros within 24 hours. If we can\’t find 3 qualified pros in your area, we\’ll let you know and expand the search.',
    badge: 'Core Guarantee',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
  },
  {
    id: 'background',
    icon: '✅',
    title: 'Background-Checked Pros Only',
    detail: 'Every pro on ProLnk has passed a criminal background check, verified their trade license, and provided proof of insurance before they can receive a single match. You never see an unvetted pro.',
    badge: 'Core Guarantee',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
  },
  {
    id: 'nospam',
    icon: '🔕',
    title: 'No Spam Calls',
    detail: 'Your phone number is never sold or shared with third parties. Only the 3 matched pros see your contact info — and only after you\’ve reviewed their profile and accepted the match.',
    badge: 'Core Guarantee',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
  },
  {
    id: 'cancel',
    icon: '🚪',
    title: 'Cancel Any Time',
    detail: 'No contracts, no cancellation fees, no minimum commitments. Cancel or close your request at any time before a job starts with zero obligation.',
    badge: 'Core Guarantee',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
  },
  {
    id: 'fees',
    icon: '💰',
    title: 'No Hidden Fees',
    detail: 'ProLnk is free for homeowners. You pay the pro directly for the work. ProLnk never adds a fee, service charge, or markup to your quote. What you see is what you pay.',
    badge: 'Core Guarantee',
    badgeColor: '#0369a1',
    badgeBg: '#e0f2fe',
  },
  {
    id: 'response',
    icon: '⚡',
    title: 'Fast Response Time Tracking',
    detail: 'We track how fast each pro responds and surface it on their profile. You can always see response time averages so you know who\’s reliable before you commit.',
    badge: 'Quality Signal',
    badgeColor: '#15803d',
    badgeBg: '#dcfce7',
  },
];

const NOT_GUARANTEED = [
  { icon: '🔨', item: 'Quality of work performed', reason: 'The work is between you and the pro. ProLnk vets pros but cannot supervise individual jobs.' },
  { icon: '💲', item: 'Lowest possible price', reason: 'We surface 3 competitive quotes. The market sets the price, not ProLnk.' },
  { icon: '🗓️', item: 'Exact scheduling commitments', reason: 'Pros set their own availability. ProLnk cannot guarantee a specific time slot will be available.' },
  { icon: '⚠️', item: 'Warranty on completed work', reason: 'Warranties are between you and the pro. Ask your pro directly about their warranty policy.' },
];

export default function HomeownerGuarantee() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const prioritized = [
    ...GUARANTEES.filter(g => selected.includes(g.id)),
    ...GUARANTEES.filter(g => !selected.includes(g.id)),
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif', color: '#111827′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            🏡 For Homeowners
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>
          The ProLnk<br />Homeowner Guarantee
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 40 }}>
          We're not just a directory. We’re a promise. Here’s exactly what we guarantee — and what we don’t.
        </p>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>🎯 What Matters Most to You?</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 18 }}>Select the guarantees that matter most and we'll highlight them for you.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {GUARANTEES.map(g => (
              <button
                key={g.id}
                onClick={() => toggle(g.id)}
                style={{
                  padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  border: `2px solid ${selected.includes(g.id) ? '#0369a1' : '#e5e7eb'}`,
                  background: selected.includes(g.id) ? '#e0f2fe' : '#fff',
                  color: selected.includes(g.id) ? '#0369a1′ : '#374151',
                }}
              >
                {g.icon} {g.title.split(' ').slice(0, 3).join(' ')}...
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {prioritized.map(g => (
            <div key={g.id} style={{
              background: '#fff',
              border: `2px solid ${selected.includes(g.id) ? '#0369a1' : '#e5e7eb'}`,
              borderRadius: 12, padding: 24,
              boxShadow: selected.includes(g.id) ? '0 4px 12px rgba(3,105,161,0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>{g.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{g.title}</h3>
                    <span style={{ background: g.badgeBg, color: g.badgeColor, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                      {g.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.7 }}>{g.detail}</p>
                </div>
                <div style={{ fontSize: 20, color: '#15803d', flexShrink: 0 }}>✓</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>⚠️ What ProLnk Doesn't Guarantee</h2>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 18 }}>
            We believe in transparency. Here's what falls outside our promise — and why.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {NOT_GUARANTEED.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 16, background: '#fafafa', border: '1px solid #f3f4f6', borderRadius: 10 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.item}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>{item.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 8px', color: '#1e40af' }}>📞 If We Fall Short</h3>
          <p style={{ fontSize: 14, color: '#1e40af', margin: 0, lineHeight: 1.7 }}>
            If ProLnk fails to deliver 3 verified quotes within 24 hours, or if any matched pro does not meet our vetting standards, contact our support team. We will prioritize your request personally and make it right. Your trust is the product.
          </p>
        </div>
      </div>
    </div>
  );
}
