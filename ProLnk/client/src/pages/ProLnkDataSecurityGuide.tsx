import { useState } from 'react';

const dataConcerns = [
  {
    label: 'What data you collect',
    icon: '📋',
    answer: 'ProLnk collects your name, service address, service type needed, contact information (phone/email), and job details you provide when posting. We do not collect payment information from homeowners, Social Security numbers, or financial account data.',
  },
  {
    label: 'How it is used',
    icon: '🎯',
    answer: 'Your data is used exclusively for matching you with qualified service partners. We use your location to identify nearby licensed pros, your service type to filter by trade, and your contact info to connect you with your matched partner. We do not use your data for advertising targeting or sell it to third parties.',
  },
  {
    label: 'Who can see my address',
    icon: '🏠',
    answer: 'Your full address is only shared with a confirmed matched partner — not with all applicants. Partners who are browsing or in queue see only your general area (zip code or neighborhood). Full address is released only upon match confirmation.',
  },
  {
    label: 'Is my data sold',
    icon: '🚫',
    answer: 'No. ProLnk does not sell, rent, or license homeowner data to lead resellers, advertisers, or third-party marketers. Selling data would directly undermine the business model — our revenue comes from partner match fees, not data monetization.',
  },
  {
    label: 'How it is protected',
    icon: '🔐',
    answer: 'Data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access to homeowner records is restricted to authenticated platform systems and authorized engineering staff. Database access is logged and audited. Partners cannot export homeowner data from the platform.',
  },
  {
    label: 'How to delete my data',
    icon: '🗑️',
    answer: 'You can request full account and data deletion at any time. Under CCPA (California) and GDPR, you have the right to access, correct, and delete your personal data. Submit a deletion request via the account settings page or email privacy@prolnk.io. Deletion is completed within 30 days.',
  },
  {
    label: 'CCPA / GDPR rights',
    icon: '⚖️',
    answer: 'You have the right to know what data is collected, request a copy of your data, correct inaccurate data, and request deletion. California residents have full CCPA rights. EU residents have full GDPR rights including data portability. ProLnk honors these rights regardless of your location.',
  },
];

export default function ProLnkDataSecurityGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Data Security Guide</h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 540, margin: '0 auto' }}>
            What ProLnk collects, how it's used, how it's protected, and your full rights over your own data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '📦', title: 'What we collect', items: ['Name', 'Service address', 'Service type', 'Phone / Email', 'Job details'] },
            { icon: '🎯', title: 'How it is used', items: ['Matching only', 'Location routing', 'Trade filtering', 'Partner connection', 'Rating improvements'] },
            { icon: '🚫', title: 'What we never do', items: ['Sell your data', 'Share with advertisers', 'Cold call you', 'Expose full address early', 'Store payment data'] },
          ].map((col) => (
            <div key={col.title} style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{col.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: '#0A1628' }}>{col.title}</div>
              {col.items.map((item) => (
                <div key={item} style={{ fontSize: 13, color: '#555', marginBottom: 6, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#0077cc' }}>•</span> {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🔐', title: 'Encryption', desc: 'TLS 1.3 in transit. AES-256 at rest. All homeowner records encrypted end-to-end.' },
            { icon: '👁️', title: 'Access controls', desc: 'Partners cannot export your data. Staff access is role-restricted and audit-logged.' },
            { icon: '⚖️', title: 'CCPA / GDPR', desc: 'Full compliance. Right to access, correct, and delete your data — honored in 30 days.' },
            { icon: '🗑️', title: 'Data deletion', desc: 'Request via settings or privacy@prolnk.io. Full deletion completed within 30 days.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: 12, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: '#0A1628' }}>{item.title}</div>
                <div style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628' }}>🔎 Your Data Concern</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Select a topic to get a specific, direct answer about how ProLnk handles that data.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {dataConcerns.map((d, i) => (
              <button key={d.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642' : '2px solid #ddd', background: selected === i ? '#0A1628' : '#fff', color: selected === i ? '#F5E642' : '#333', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                {d.icon} {d.label}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ background: '#f0f9ff', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#0077cc' }}>{dataConcerns[selected].icon} {dataConcerns[selected].label}</div>
              <div style={{ color: '#333', fontSize: 15, lineHeight: 1.7 }}>{dataConcerns[selected].answer}</div>
            </div>
          )}

          <div style={{ marginTop: 28, padding: 16, background: '#f8f9fa', borderRadius: 10, fontSize: 13, color: '#888', textAlign: 'center' }}>
            Questions not answered here? Contact us at <span style={{ color: '#0077cc' }}>privacy@prolnk.io</span>
          </div>
        </div>

      </div>
    </div>
  );
}
