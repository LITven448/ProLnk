import { useState } from 'react';

const ccpaRights = [
  'Right to know what personal information is collected, used, shared, or sold',
  'Right to delete personal information held by businesses',
  'Right to opt-out of the sale of personal information',
  'Right to non-discrimination for exercising CCPA rights',
  'Right to correct inaccurate personal information',
  'Right to limit use and disclosure of sensitive personal information',
];

const sections = [
  {
    id: 'collect',
    label: '📥 What We Collect',
    icon: '📥',
  },
  {
    id: 'dont',
    label: '🚫 What We Don’t Do',
    icon: '🚫',
  },
  {
    id: 'use',
    label: '⚙️ How It’s Used',
    icon: '⚙️',
  },
  {
    id: 'rights',
    label: '✅ Your Rights',
    icon: '✅',
  },
];

export default function TrustyProDataPrivacy() {
  const [activeSection, setActiveSection] = useState('collect');

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', color: '#111827', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🔒</span>
          <span style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 2 }}>Privacy Policy</span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
          TrustyPro Data Privacy
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 48 }}>
          Your Home Data Belongs to You
        </p>

        <div style={{ background: '#eff6ff', borderRadius: 12, padding: 24, marginBottom: 48, border: '1px solid #bfdbfe' }}>
          <p style={{ color: '#1e40af', lineHeight: 1.7, fontWeight: 500 }}>
            🛡️ We built TrustyPro with a simple principle: the data about your home is yours. You control who sees it, you can download it, and you can delete it. We earn your trust by being explicit about what we do and don't do.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                background: activeSection === s.id ? '#1e40af' : '#ffffff',
                color: activeSection === s.id ? '#ffffff' : '#374151',
                border: '1px solid',
                borderColor: activeSection === s.id ? '#1e40af' : '#d1d5db',
                borderRadius: 8,
                padding: '10px 18px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {activeSection === 'collect' && (
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '📍', title: 'Home Address', desc: 'Used for local pro matching. Never displayed publicly or sold.' },
              { icon: '📷', title: 'Photos You Upload', desc: 'Analyzed by AI only. Never shared publicly or shown to other homeowners. Stored encrypted.' },
              { icon: '📋', title: 'Service History', desc: 'Stored in your vault. Visible only to you. Shared with a pro only when you initiate a booking.' },
              { icon: '💯', title: 'Home Health Scores', desc: 'Your data, your control. You decide if and when to share scores with a pro or buyer.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#ffffff', borderRadius: 10, padding: 22, border: '1px solid #e5e7eb', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'dont' && (
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '💸', title: 'Never Sell Your Data', desc: 'Your personal information is never sold to data brokers, advertisers, or third parties. Period.' },
              { icon: '👁️', title: 'Never Show Your Photos', desc: 'Your home photos are never shown to other homeowners, real estate agents, or the public.' },
              { icon: '🏠', title: 'Never Share Your Address Early', desc: 'Your address is not shared with any contractor until you explicitly book an appointment.' },
              { icon: '🎯', title: 'Never Use for Ad Targeting', desc: 'We do not use your home data to serve you ads, and we do not allow third-party ad pixels in the app.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#ffffff', borderRadius: 10, padding: 22, border: '1px solid #e5e7eb', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'use' && (
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '🤖', title: 'AI Analysis', desc: 'Your photos are processed by our AI models to detect issues and generate health scores. This is done computationally — no TrustyPro employee sees your photos unless you request human review.' },
              { icon: '📊', title: 'Aggregate Insights (Anonymous)', desc: 'ZIP-level health trends are computed from anonymized data across all homes in an area. No individual home is identifiable in these reports. These power neighborhood health alerts.' },
              { icon: '🔗', title: 'Pro Matching', desc: 'Your trade needs (e.g., "HVAC repair", "roof inspection") are used to match you with relevant verified local pros. Pros see your service request — not your full profile or address — until you accept.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#ffffff', borderRadius: 10, padding: 22, border: '1px solid #e5e7eb', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'rights' && (
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { icon: '⬇️', title: 'Download Your Data', desc: 'Request a full export of all your home data at any time from your account settings. Delivered within 48 hours.' },
              { icon: '🗑️', title: 'Delete Your Account', desc: 'All your data is permanently deleted within 30 days of your request. No hidden backups, no residual data in partner systems.' },
              { icon: '🔕', title: 'Opt Out of Aggregate Data', desc: 'You can remove yourself from neighborhood trend data at any time from Privacy Settings. Your data will no longer contribute to area-level analytics.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#ffffff', borderRadius: 10, padding: 22, border: '1px solid #e5e7eb', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 48, background: '#ffffff', borderRadius: 12, padding: 28, border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', marginBottom: 16 }}>🌟 California Residents — CCPA Rights</h2>
          <p style={{ color: '#6b7280', marginBottom: 16 }}>In addition to the above, California residents have specific rights under the California Consumer Privacy Act:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {ccpaRights.map(right => (
              <li key={right} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #f3f4f6', color: '#374151', fontSize: 14, lineHeight: 1.6 }}>
                <span style={{ color: '#2563eb', flexShrink: 0 }}>✓</span>
                {right}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 32, background: '#f0fdf4', borderRadius: 12, padding: 24, border: '1px solid #bbf7d0' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#166534', marginBottom: 8 }}>🔐 Security</h3>
          <p style={{ color: '#15803d', lineHeight: 1.7 }}>
            SOC 2 Type II audit currently in progress. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Our infrastructure is hosted in US-based data centers with regular penetration testing.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: '#6b7280', marginBottom: 20 }}>Questions about your data? Email us at privacy@trustypro.io</p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#2563eb', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}
          >
            Join the Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
