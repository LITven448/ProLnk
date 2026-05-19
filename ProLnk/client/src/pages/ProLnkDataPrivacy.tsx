import { useState } from 'react';

const DATA_COLLECTED = [
  { icon: '👤', category: 'Identity', items: ['Full name', 'Email address', 'Phone number'], why: 'Account creation, match delivery, support' },
  { icon: '🏠', category: 'Property', items: ['Home address', 'Property type', 'Service area'], why: 'Match you with nearby pros for your job type' },
  { icon: '🔧', category: 'Service Info', items: ['Job descriptions', 'Trade category', 'Urgency level'], why: 'Qualify and route your request to the right pros' },
  { icon: '📊', category: 'Usage Data', items: ['Pages visited', 'Match history', 'Review submissions'], why: 'Improve the platform, detect fraud, optimize matches' },
  { icon: '📍', category: 'Location', items: ['General city/ZIP (not precise GPS)', 'Service area preferences'], why: 'Geographic matching only' },
  { icon: '💳', category: 'Payment (if applicable)', items: ['Billing info (processed by Stripe)', 'Transaction history'], why: 'Subscription and payout processing' },
];

const WHO_SEES = [
  { icon: '✅', party: 'Matched Pros', what: 'First name, job description, address, phone (after match acceptance)', scope: 'Only your 3 matched pros for that specific job' },
  { icon: '✅', party: 'ProLnk Employees', what: 'Full account data for support, compliance, and fraud review', scope: 'Limited to staff with a need-to-know basis' },
  { icon: '❌', party: 'Advertisers', what: 'Nothing — we do not serve ads or sell ad-targeting data', scope: 'Never' },
  { icon: '❌', party: 'Third Parties', what: 'Not sold or shared for marketing purposes', scope: 'Never' },
  { icon: '⚠️', party: 'Legal Authorities', what: 'Only with a valid court order, subpoena, or legal obligation', scope: 'Only when legally required' },
];

const YOUR_RIGHTS = [
  { icon: '🔍', right: 'Access Your Data', detail: 'Request a full export of all data ProLnk holds about you.', action: 'Account Settings → Privacy → Download My Data' },
  { icon: '✏️', right: 'Correct Inaccuracies', detail: 'Update or correct any inaccurate personal information at any time.', action: 'Account Settings → Profile' },
  { icon: '🗑️', right: 'Delete Your Account', detail: 'Request full data deletion within 30 days (some financial data retained 7 years per IRS rules).', action: 'Account Settings → Privacy → Delete Account' },
  { icon: '🚫', right: 'Opt Out of Non-Essential Communications', detail: 'Unsubscribe from marketing emails. Transactional emails (match alerts, receipts) cannot be opted out of.', action: 'Email footer → Unsubscribe or Account Settings → Notifications' },
  { icon: '📤', right: 'Data Portability', detail: 'Receive your data in a machine-readable format (JSON or CSV).', action: 'Account Settings → Privacy → Export' },
];

export default function ProLnkDataPrivacy() {
  const [activeTab, setActiveTab] = useState<'collect' | 'who' | 'rights' | 'security'>('collect');

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'collect', label: '📋 What We Collect' },
    { id: 'who', label: '👁️ Who Sees It' },
    { id: 'rights', label: '⚖️ Your Rights' },
    { id: 'security', label: '🔒 Security' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif', color: '#111827′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            🔒 Data Privacy
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>
          How ProLnk<br />Protects Your Data
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 24 }}>
          Your data belongs to you. We collect only what's needed, protect it with enterprise-grade security, and never sell it. Here’s everything, plainly explained.
        </p>

        <div style={{ display: 'flex', gap: 2, background: '#e5e7eb', borderRadius: 10, padding: 4, marginBottom: 32, flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: activeTab === tab.id ? '#fff' : 'transparent',
                color: activeTab === tab.id ? '#111827′ : '#6b7280',
                boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'collect' && (
          <div>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>We collect only what's necessary to deliver ProLnk’s matching service. Here’s each category, what’s collected, and why.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {DATA_COLLECTED.map(cat => (
                <div key={cat.category} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{cat.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{cat.category}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                        {cat.items.map(item => (
                          <span key={item} style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: 20, fontSize: 12, color: '#374151′ }}>{item}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 13, color: '#9ca3af' }}>Why: {cat.why}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: 18, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10 }}>
              <p style={{ fontSize: 13, color: '#166534', margin: 0 }}>
                ✅ ProLnk does not collect Social Security Numbers, financial account details (Stripe handles this separately), biometric data, or precise real-time GPS location.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'who' && (
          <div>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>Strict access controls govern who can see your data and when.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {WHO_SEES.map(row => (
                <div key={row.party} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{row.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{row.party}</div>
                    <div style={{ fontSize: 14, color: '#374151', margin: '6px 0 4px', lineHeight: 1.5 }}>{row.what}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>Scope: {row.scope}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rights' && (
          <div>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>
              You have full rights over your data under CCPA (California) and GDPR (EU/UK). All users get these rights regardless of location.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {YOUR_RIGHTS.map(right => (
                <div key={right.right} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{right.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{right.right}</div>
                      <p style={{ fontSize: 14, color: '#6b7280', margin: '6px 0 10px', lineHeight: 1.6 }}>{right.detail}</p>
                      <div style={{ background: '#eff6ff', padding: '8px 12px', borderRadius: 8, fontSize: 13, color: '#1d4ed8', fontWeight: 500 }}>
                        📍 {right.action}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🔐', title: 'Encryption in Transit', detail: 'All data transmitted between your browser and ProLnk servers is encrypted with TLS 1.3. Your connection is always HTTPS.' },
              { icon: '💾', title: 'Encryption at Rest', detail: 'All data stored in ProLnk\’s database is encrypted at rest using AES-256. Even if hardware were compromised, your data cannot be read.' },
              { icon: '🏛️', title: 'SOC 2 Infrastructure', detail: 'ProLnk is hosted on infrastructure providers that maintain SOC 2 Type II certification. Data centers have physical access controls, redundancy, and 24/7 monitoring.' },
              { icon: '📋', title: 'Annual Security Audits', detail: 'We conduct annual third-party security audits and penetration tests. Critical findings are addressed within 30 days.' },
              { icon: '🚨', title: 'Breach Notification', detail: 'In the unlikely event of a data breach affecting your account, we will notify you within 72 hours per GDPR requirements and within legally required windows per state law.' },
              { icon: '🔑', title: 'Access Controls', detail: 'Employee access to user data is role-based and logged. Access is granted on a need-to-know basis and reviewed quarterly.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.7 }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 40, background: '#f3f4f6', borderRadius: 12, padding: 24 }}>
          <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
            For privacy questions or to exercise your rights, contact privacy@prolnk.io. Last updated May 2026. ProLnk does not sell personal data to any third party, ever.
          </p>
        </div>
      </div>
    </div>
  );
}
