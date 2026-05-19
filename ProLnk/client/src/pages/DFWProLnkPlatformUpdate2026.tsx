import { useState } from 'react';

export default function DFWProLnkPlatformUpdate2026() {
  const [stakeholder, setStakeholder] = useState('');
  const [result, setResult] = useState('');

  const stakeholders = [
    { id: 'charter-pro', label: '🔨 Charter Pro (joining the platform)' },
    { id: 'homeowner', label: '🏠 Homeowner (looking for service pros)' },
    { id: 'investor', label: '💼 Investor (evaluating the platform)' },
    { id: 'developer', label: '💻 Developer (contributing to build)' },
  ];

  const guide: Record<string, string> = {
    'charter-pro': 'Charter Pro verification system is enhanced — faster approval, clearer milestone tracking. Matching algorithm refinement means better lead quality for DFW trades. Mobile app in development for real-time lead alerts. Lock in your $149/mo Charter rate before waitlist closes at 500 applications.',
    'homeowner': '5,400+ pages of DFW home service content now live. Health Vault schema updated to capture more property detail for better pro matching. Submit your home service request now — Charter Pros in your DFW area are being vetted and ready to respond at launch.',
    'investor': 'Platform milestone: 5,400+ content pages in GitHub demonstrate content moat. Render AI credits application ready to submit (major cost reduction). Matching algorithm v2 refined. Health Vault data schema expanded. Charter Pro waitlist building toward 500-app close threshold.',
    'developer': '5,400+ TSX pages committed to LITven448/ProLnk on main branch. Health Vault schema in drizzle/schema.ts updated. 9 routers pending connection, 26 pages pending routing. Next: connect remaining tRPC routers, complete mobile React Native scaffold, submit Render AI credits.',
  };

  function handleSelect(id: string) {
    setStakeholder(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>📡 PLATFORM UPDATE · MAY 17, 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ProLnk Platform Update — May 17, 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Major milestones across content, infrastructure, and platform features. The ProLnk ecosystem is accelerating toward full launch with significant updates across all tracks.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '📄', stat: '5,400+', label: 'DFW content pages live in GitHub' },
            { icon: '🔧', stat: 'Enhanced', label: 'Charter Pro verification system' },
            { icon: '📱', stat: 'In Dev', label: 'Mobile app for real-time lead alerts' },
            { icon: '☁️', stat: 'Ready', label: 'Render AI credits application' },
          ].map(m => (
            <div key={m.label} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 24 }}>{m.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{m.stat}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642′ }}>🔍 Your Role → What This Means for You</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {stakeholders.map(s => (
            <button key={s.id} onClick={() => handleSelect(s.id)}
              style={{ background: stakeholder === s.id ? '#F5E642′ : '#1e2d45', color: stakeholder === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {s.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8′ }}>
          🚀 ProLnk — DFW home services platform. Charter Pro waitlist open now at prolnk.io.
        </div>
      </div>
    </div>
  );
}
