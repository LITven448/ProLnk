import { useState } from 'react';

const DFW_AREAS = [
  { name: 'Frisco', phase: 1, status: 'First' },
  { name: 'Plano', phase: 1, status: 'First' },
  { name: 'McKinney', phase: 1, status: 'First' },
  { name: 'Allen', phase: 1, status: 'First' },
  { name: 'Prosper', phase: 2, status: 'Phase 2' },
  { name: 'Celina', phase: 2, status: 'Phase 2' },
  { name: 'Little Elm', phase: 2, status: 'Phase 2' },
  { name: 'Wylie', phase: 2, status: 'Phase 2' },
];

const CONTENT: Record<string, { headline: string; points: string[] }> = {
  partner: {
    headline: 'Launch Day = First Leads Go Out',
    points: [
      '🎯 Your first homeowner match requests arrive in your lead feed',
      '📱 SMS and email alerts activate for new job opportunities',
      '💰 Commission tracking dashboard goes live — every match logged',
      '🏆 Charter and Founding members get priority match queue position',
      '📊 Your territory map activates in DFW Phase 1 zones first',
    ],
  },
  homeowner: {
    headline: 'Launch Day = Your First Matched Pro',
    points: [
      '🔧 Receive your first vetted professional matches within hours',
      '📋 Quote requests go live — pros compete for your project',
      '⭐ Review and rating system activates for every completed job',
      '🏠 Your home enters the Health Vault for future service history',
      '📍 Priority matching if you’re in Frisco, Plano, McKinney, or Allen',
    ],
  },
};

export default function ProLnkLaunchDayPage() {
  const [userType, setUserType] = useState<'partner' | 'homeowner'>('partner');
  const content = CONTENT[userType];

  return (
    <div style={{ minHeight: '100vh', background: '#060d1a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '80px 24px 48px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🚀</div>
        <h1 style={{ fontSize: '52px', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
          ProLnk Launch Day
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '520px', margin: '0 auto', marginBottom: '40px' }}>
          Launch happens when the waitlist closes and the matching engine activates. Here's exactly what that means for you.
        </p>
        <div style={{ display: 'inline-flex', background: '#111827', borderRadius: '12px', padding: '6px', gap: '4px' }}>
          {(['partner', 'homeowner'] as const).map(t => (
            <button key={t} onClick={() => setUserType(t)} style={{ padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '15px', background: userType === t ? '#f59e0b' : 'transparent', color: userType === t ? '#0a0f1e' : '#64748b', transition: 'all 0.2s' }}>
              {t === 'partner' ? '🔧 I\’m a Partner Pro' : '🏠 I\’m a Homeowner'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: '16px', padding: '40px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b', marginBottom: '24px', textAlign: 'center' }}>{content.headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {content.points.map((pt, i) => (
              <div key={i} style={{ background: '#0a0f1e', borderRadius: '10px', padding: '16px 20px', fontSize: '15px', color: '#e2e8f0', lineHeight: 1.5 }}>{pt}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#f59e0b', marginBottom: '20px', textAlign: 'center' }}>📍 DFW Launch Areas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {DFW_AREAS.map((area, i) => (
              <div key={i} style={{ background: '#111827', border: `2px solid ${area.phase === 1 ? '#f59e0b' : '#1e3a5f'}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{area.phase === 1 ? '🟡' : '🔵'}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#e2e8f0' }}>{area.name}</div>
                <div style={{ fontSize: '11px', color: area.phase === 1 ? '#f59e0b' : '#64748b', marginTop: '4px' }}>{area.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '80px' }}>
          <a href="/apply" style={{ display: 'inline-block', background: '#f59e0b', color: '#0a0f1e', padding: '18px 48px', borderRadius: '12px', fontWeight: 800, fontSize: '18px', textDecoration: 'none' }}>
            Get Ready for Launch →
          </a>
          <p style={{ color: '#475569', fontSize: '13px', marginTop: '14px' }}>Join waitlist · Be first when matching activates</p>
        </div>
      </div>
    </div>
  );
}
