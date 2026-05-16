import { useState } from 'react';

const phases = [
  {
    quarter: 'Q2 2026',
    title: 'Platform Launch',
    status: 'live',
    color: '#16a34a',
    bgColor: '#f0fdf4',
    emoji: '✅',
    items: [
      'Homeowner and Pro waitlist open',
      'AI matching engine beta (invite-only)',
      'Network income system activated',
      'Dallas-Fort Worth market focus',
      'Email confirmation and onboarding flows',
    ],
  },
  {
    quarter: 'Q3 2026',
    title: 'Mobile and Payments',
    status: 'building',
    color: '#d97706',
    bgColor: '#fffbeb',
    emoji: '🔨',
    items: [
      'iOS and Android apps for pros and homeowners',
      'Stripe payment integration',
      'Commission payout automation',
      'Real-time match notifications via SMS',
      'Pro verification and rating system',
    ],
  },
  {
    quarter: 'Q4 2026',
    title: 'Texas Expansion',
    status: 'planned',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    emoji: '📋',
    items: [
      'Houston metro market launch',
      'Austin market launch',
      'San Antonio pilot program',
      'Pro recruitment campaign statewide',
      'Series A fundraising round open',
    ],
  },
  {
    quarter: '2027',
    title: 'National Scale',
    status: 'planned',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    emoji: '🚀',
    items: [
      'Home Health Vault — 50M property dataset',
      'TrustyPro nationwide scan network',
      'AI visual property assessment (beta)',
      'National expansion to 15+ metro markets',
      'B2B data licensing program launch',
    ],
  },
];

const statusLabel: Record<string, string> = {
  live: 'Live Now',
  building: 'In Progress',
  planned: 'Planned',
};

export default function ProLnkRoadmap() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#f1f5f9' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#f1f5f9', marginBottom: 16 }}>Product Roadmap</h1>
          <p style={{ fontSize: 20, color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            We build in public. Here is exactly where we are and where we are going — no fluff, no vague timelines.
          </p>
        </div>

        <div style={{ position: 'relative', marginBottom: 64 }}>
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: '#334155' }} />

          {phases.map((phase, i) => (
            <div key={phase.quarter} style={{ marginBottom: 24, paddingLeft: 72, position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 14, top: 20,
                width: 30, height: 30, borderRadius: '50%',
                background: phase.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, zIndex: 1,
              }}>
                {phase.emoji}
              </div>

              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  background: '#1e293b',
                  borderRadius: 14,
                  padding: '24px 28px',
                  cursor: 'pointer',
                  border: open === i ? '2px solid ' + phase.color : '2px solid transparent',
                  transition: 'border 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open === i ? 20 : 0 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {phase.quarter}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>{phase.title}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{
                      background: phase.color + '22',
                      color: phase.color,
                      borderRadius: 20, padding: '4px 14px',
                      fontSize: 13, fontWeight: 700,
                    }}>
                      {statusLabel[phase.status]}
                    </span>
                    <span style={{ color: '#64748b', fontSize: 18 }}>{open === i ? '▲' : '▼'}</span>
                  </div>
                </div>

                {open === i && (
                  <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'none' }}>
                    {phase.items.map(item => (
                      <li key={item} style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 2.0, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: phase.color, fontSize: 16, marginTop: 4, flexShrink: 0 }}>◆</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 48 }}>
          {[
            { color: '#16a34a', label: 'Live Now' },
            { color: '#d97706', label: 'In Progress' },
            { color: '#7c3aed', label: 'Planned' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1e293b', borderRadius: 10, padding: '14px 20px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: '#94a3b8' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💡</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Have a Feature Request?</h3>
          <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.7 }}>
            We build based on what real pros and homeowners need. Join the waitlist and tell us what matters most to you.
          </p>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Join Waitlist and Share Feedback
          </button>
        </div>

      </div>
    </div>
  );
}
