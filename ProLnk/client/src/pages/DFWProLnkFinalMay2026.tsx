import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: 'Homeowner needing services', status: 'Join the ProLnk homeowner waitlist now. Add your home to Health Vault. When DFW launches, you get first access to verified pros at pre-launch rates.' },
  { id: 'pro', label: 'Home service professional', status: 'Charter tier is filling fast — only 500 spots. At $149/mo locked forever, you get 72% job revenue share + 4-level network income. Waitlist closes at 500 apps.' },
  { id: 'neighbor', label: 'Just heard about ProLnk', status: 'You\’re early. That\’s an advantage. Charter members who join before May close get locked rates and network income from everyone they refer. Go to prolnk.io.' },
  { id: 'investor', label: 'Considering investing or partnering', status: 'Waitlist approaching 500 Pros. DFW is the beachhead market. 85% margins at scale. Seed round open. Reach out via prolnk.io/contact.' },
  { id: 'skeptic', label: 'Skeptical — seen this before', status: 'Fair. ProLnk is waitlist-only right now — no money changes hands until matching goes live. Join free, get matched when we launch, decide then. Zero risk to try.' },
];

export default function DFWProLnkFinalMay2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = roles.find(r => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          🔗 ProLnk · May 2026 Status
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
          Where ProLnk Stands in May 2026
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          The waitlist is approaching 500 Charter members. DFW launch preparation is underway. Here's the full picture of where we are and what it means for you.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '📋', title: 'Waitlist Approaching 500', body: 'Charter tier closes at 500 Pro applications. When it closes, the founding rate of $149/mo locks in permanently for those members. New Pros will pay more.' },
            { icon: '🏙️', title: 'DFW Launch Preparation', body: 'Dallas-Fort Worth is ProLnk\’s first market. Territory mapping, Pro verification workflows, and first homeowner matches are in final build.' },
            { icon: '💛', title: 'Charter Tier Benefits Locked', body: 'Charter members: $149/mo forever, 72% job revenue, 4-level network income cascade, 1.5% origination rights on homes you add to Health Vault.' },
            { icon: '🏠', title: 'Home Health Vault Open', body: 'Homeowners can add their home now. Structural data, HVAC history, appliance records. Your data stays private but unlocks better matching when we go live.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Your Role → Your May 2026 ProLnk Status + Next Step
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{
                  background: selected === r.id ? '#F5E642' : '#1a3050',
                  color: selected === r.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>YOUR NEXT STEP</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.status}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk · DFW's home services marketplace · prolnk.io
        </div>
      </div>
    </div>
  );
}
