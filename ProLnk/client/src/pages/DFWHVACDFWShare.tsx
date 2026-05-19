import { useState } from 'react';

const situations = [
  {
    label: 'Nextdoor Post',
    icon: '📱',
    how: 'Nextdoor is the #1 channel for DFW HVAC word-of-mouth. A simple post like "Just found a great DFW HVAC resource — prolnk.io, it has seasonal guides and helps you find vetted contractors" will get engagement.',
    template: '"DFW neighbors — found this amazing free HVAC resource at prolnk.io. Seasonal checklists, contractor matching, energy tips — all DFW-specific. Worth bookmarking before summer hits."',
  },
  {
    label: 'HOA Meeting',
    icon: '🏛️',
    how: 'HOA meetings are the perfect moment to share HVAC knowledge. Bring up seasonal maintenance timing, common DFW issues, and how ProLnk helps the whole neighborhood find trustworthy contractors.',
    template: '"One quick thing — there\’s a free DFW HVAC library at ProLnk that covers everything from seasonal tune-ups to emergency protocols. I\’ve found it really useful and thought I\’d pass it along."',
  },
  {
    label: 'Word of Mouth',
    icon: '💬',
    how: 'The most powerful sharing is personal. When a neighbor mentions HVAC problems, mention ProLnk. When someone asks for a contractor recommendation, share what you\’ve learned from the library.',
    template: '"I actually just learned a lot about DFW HVAC from prolnk.io — they have a library with seasonal guides and you can match with verified contractors. Might help you."',
  },
  {
    label: 'ProLnk Referral',
    icon: '💰',
    how: 'Referring neighbors and contractors to ProLnk isn\’t just helpful — it\’s income. The Network Income System pays you for homeowner referrals and contractor referrals through a 5-stream income structure.',
    template: 'Sign up at prolnk.io, get your referral link, and share it. Every homeowner and contractor you bring in creates a recurring income stream in your ProLnk network.',
  },
];

export default function DFWHVACDFWShare() {
  const [selected, setSelected] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  function copyTemplate() {
    if (selected !== null) {
      navigator.clipboard.writeText(situations[selected].template).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>📣</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '16px 0 8px' }}>
            Share DFW HVAC Knowledge
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            The value of HVAC knowledge multiplies when it spreads. Every neighbor you inform
            is a home that won't get blindsided by a summer breakdown or a winter failure.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 16, padding: 24, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 8 }}>🌟 Why Sharing Matters in DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            DFW summers are brutal. A neighbor who knows to schedule their tune-up in March instead of June
            avoids a 3-week wait during peak season. A community where everyone knows the right contractors
            raises the bar for service quality across the board. Your knowledge is a community resource.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, textAlign: 'center', marginBottom: 8 }}>
          What's Your Sharing Situation?
        </h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 20 }}>
          Select your channel — get an exact script and strategy for sharing DFW HVAC knowledge.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {situations.map((s, i) => (
            <button
              key={i}
              onClick={() => { setSelected(selected === i ? null : i); setCopied(false); }}
              style={{
                background: selected === i ? '#F5E642′ : '#1e3a5f',
                color: selected === i ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 12, padding: '20px 16px',
                cursor: 'pointer', fontSize: 15, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0f1f3d', border: '1px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 28 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 18 }}>
              {situations[selected].icon} {situations[selected].label} Strategy
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{situations[selected].how}</p>
            <div style={{ background: '#162544', borderRadius: 8, padding: '14px 16px', color: '#94a3b8', fontSize: 14, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>
              {situations[selected].template}
            </div>
            <button
              onClick={copyTemplate}
              style={{ background: copied ? '#22c55e' : '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}
            >
              {copied ? '✅ Copied!' : '📋 Copy Script'}
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 14 }}>
          ProLnk • DFW HVAC Knowledge Sharing • 2026 • prolnk.io
        </div>
      </div>
    </div>
  );
}
