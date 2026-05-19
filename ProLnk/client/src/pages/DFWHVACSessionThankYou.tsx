import { useState } from 'react';

const contributions = [
  { id: 'read', label: 'I read and learned', message: 'Thank you for investing time in understanding your DFW home. Knowledge is the first defense against overpriced repairs and failed systems. You now know more than 90% of DFW homeowners — use it. ProLnk is here when you are ready to act.' },
  { id: 'shared', label: 'I shared this with neighbors', message: 'Thank you for spreading the word. Every DFW homeowner who finds ProLnk is one fewer person getting taken advantage of by unvetted contractors. You made a real difference in your neighborhood today.' },
  { id: 'signup', label: 'I joined the waitlist', message: 'Thank you — and welcome to the founding community. You will have priority access at launch, founding-member pricing, and direct input into how ProLnk grows. We do not take that trust lightly.' },
  { id: 'referred', label: 'I referred a pro or homeowner', message: 'Thank you for building ProLnk with us. Referrals are how we grow without compromising quality. When your referral joins and activates, your Network Income account credits automatically — no forms, no chasing.' },
];

export default function DFWHVACSessionThankYou() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = contributions.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>💛</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Thank You, DFW</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
            For your time. For caring about your home. For being part of the ProLnk community.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏠', label: '2.8M', sub: 'DFW homes protected' },
            { icon: '🔧', label: '50K+', sub: 'HVAC pros in our network' },
            { icon: '⭐', label: '97%', sub: 'satisfaction on matched jobs' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>A Personal Thank You</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk was built because DFW homeowners deserve better. Every page of HVAC content, every vetted pro, every matched job — it is all in service of that mission. You are the reason this exists.
          </p>
          <p style={{ color: '#cbd5e1', marginBottom: 20, fontSize: 15 }}>What was your contribution today?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contributions.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{ background: selected === c.id ? '#F5E642′ : '#1e3a5f', color: selected === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '14px 20px', cursor: 'pointer', textAlign: 'left', fontSize: 15, fontWeight: 600, transition: 'all 0.2s' }}>
                {c.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 15, color: '#e2e8f0', lineHeight: 1.8 }}>{result.message}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '28px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Until Next Time</div>
          <div style={{ fontSize: 15, color: '#0A1628′ }}>ProLnk will be here — growing, improving, and protecting DFW homes. See you on the other side of launch.</div>
        </div>
      </div>
    </div>
  );
}
