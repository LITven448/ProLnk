import { useState } from 'react';

const roles = [
  {
    id: 'partner',
    label: 'Partner / Contractor',
    benefits: [
      'Charter Partner pricing locked at $149/mo — never increases',
      'First access to match algorithm before public launch',
      'Direct input on features that affect your workflow',
      'Founding Member badge on your profile permanently',
      'Priority match routing during launch period',
    ],
    cta: 'Apply for charter partner status at prolnk.io/partner-signup',
  },
  {
    id: 'homeowner',
    label: 'Homeowner',
    benefits: [
      'Get matched before public homeowners — shorter wait times',
      'Influence homeowner features through early feedback',
      'Free Home Health scan for beta participants in DFW',
      'Preferred rate on match facilitation fee at launch',
      'Direct line to ProLnk team during beta period',
    ],
    cta: 'Join the homeowner waitlist at prolnk.io/homeowner-signup',
  },
  {
    id: 'investor',
    label: 'Investor',
    benefits: [
      'Early access to traction data and match volume metrics',
      'Seed round information package before public announcement',
      'Intro call with founder before round closes',
      'First look at network income system live performance data',
      'Demo access to admin dashboard and match flow',
    ],
    cta: 'Express interest at prolnk.io/investors',
  },
];

export default function ProLnkBetaWaitlistPage() {
  const [active, setActive] = useState(roles[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, letterSpacing: 2, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
            BETA ACCESS
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>Join the ProLnk Beta</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Beta means early — before the public launch. You help shape the platform, and you lock in terms that public users will never see.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
          {[
            { emoji: '📅', label: 'Beta Duration', value: 'May – July 2026′ },
            { emoji: '🔒', label: 'Partner Spots', value: '500 max' },
            { emoji: '🏠', label: 'Home Spots', value: '5,000 max' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#111c2e', borderRadius: 12, padding: '20px', textAlign: 'center', border: '1px solid #1e2d45′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 16 }}>Select your role to see your beta benefits</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setActive(r)}
                style={{ padding: '9px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === r.id ? '#F5E642′ : '#1e2d45', color: active.id === r.id ? '#0A1628' : '#94a3b8' }}>
                {r.label}
              </button>
            ))}
          </div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {active.benefits.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: i < active.benefits.length - 1 ? '1px solid #1e2d45′ : ’none' }}>
                <span style={{ color: '#F5E642', fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 24, padding: 16, background: '#0A1628', borderRadius: 10, fontSize: 13, color: '#F5E642′ }}>
            → {active.cta}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#111c2e', borderRadius: 12, padding: '28px 20px', border: '1px solid #1e2d45′ }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>What happens after beta?</div>
          <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
            At the end of beta, ProLnk opens to the public. Beta pricing freezes at your entry rate. The match algorithm goes live with real homeowner-contractor connections. Beta users get first priority in match routing.
          </p>
        </div>
      </div>
    </div>
  );
}

