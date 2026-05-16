import { useState } from 'react';

const featureMap: Record<string, { icon: string; items: string[] }> = {
  Matching: {
    icon: '🎯',
    items: ['Instant push notification when a match is found', 'One-tap accept or decline from lock screen', 'Match score and homeowner preview before committing', 'Live availability toggle — go online or offline instantly'],
  },
  Messaging: {
    icon: '💬',
    items: ['In-app chat with homeowners — no number sharing', 'Photo uploads for job scoping and estimates', 'Read receipts and typing indicators', 'Message templates for common replies'],
  },
  'Job Tracking': {
    icon: '📍',
    items: ['Real-time job status updates visible to both sides', 'GPS check-in when you arrive on site', 'Job timer and invoice generation from mobile', 'Photo documentation before and after job'],
  },
  Vault: {
    icon: '🏡',
    items: ['Access your Home Health Vault from anywhere', 'Upload appliance receipts and warranties by photo', 'Maintenance reminders synced across devices', 'Share vault access with your pro securely'],
  },
};

const timeline = [
  { phase: 'Q2 2026', label: 'Beta Testing', desc: 'Invite-only beta for founding pros', done: false },
  { phase: 'Q3 2026', label: 'iOS Launch', desc: 'App Store release for iPhone users', done: false },
  { phase: 'Q3 2026', label: 'Android Launch', desc: 'Google Play release alongside iOS', done: false },
  { phase: 'Q4 2026', label: 'Full Feature Set', desc: 'All vault and AI features live on mobile', done: false },
];

export default function ProLnkMobileAppComingSoon() {
  const [feature, setFeature] = useState<string>('Matching');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Mobile App Coming Soon</h1>
          <div style={{ display: 'inline-block', background: '#1e3a5f', color: '#F5E642', fontWeight: 700, fontSize: 13, padding: '6px 18px', borderRadius: 20, marginBottom: 16 }}>
            🚀 Estimated Launch: Q3 2026
          </div>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Native iOS and Android apps that put ProLnk's full power in your pocket — matches, messaging, tracking, and vault access.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>📲 Explore App Features</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select a feature area to see what the app will do:</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {Object.keys(featureMap).map(f => (
              <button key={f} onClick={() => setFeature(f)}
                style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: feature === f ? '#F5E642' : '#1e3a5f', color: feature === f ? '#0A1628' : '#fff' }}>
                {featureMap[f].icon} {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {featureMap[feature].items.map((item, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 10, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>✅ {item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🗓️ Launch Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ background: '#162033', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{t.phase}</div>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}