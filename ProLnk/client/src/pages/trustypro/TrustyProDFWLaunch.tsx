import { useState } from 'react';

const timeline = [
  { date: 'Q3 2026', label: 'Beta Launch', desc: 'First 500 charter pros + 5,000 homeowners get access. AI scan feature goes live across DFW metro.' },
  { date: 'Q4 2026', label: 'Full DFW Rollout', desc: 'All 32 DFW-area cities covered. Homeowner scan app available on iOS and Android.' },
  { date: 'Q1 2027', label: 'Texas Expansion', desc: 'Houston, Austin, and San Antonio markets open. Network income system activated for charter members.' },
  { date: 'Q3 2027', label: 'National Rollout', desc: 'TrustyPro expands to top 25 metros. Home Health Vault reaches 1M+ properties.' },
];

const benefits = [
  { icon: '🥇', label: 'Priority Matching', desc: 'Charter members get first access to every new lead in their territory.' },
  { icon: '💰', label: 'Locked Rate', desc: '$149/mo subscription rate locked for life — never increases as platform grows.' },
  { icon: '🌐', label: 'Territory Protection', desc: 'Early pros lock their service zip codes before the market fills up.' },
  { icon: '📈', label: 'Network Income', desc: 'Charter pros earn from referrals 4 levels deep. The earlier you join, the larger your network.' },
];

const stats = [
  { num: '3.2M', label: 'Homes in DFW metro' },
  { num: '42K', label: 'Service calls per day' },
  { num: '$4.8B', label: 'Annual home services spend' },
  { num: '68%', label: 'Homeowners use 1+ contractor/year' },
];

export default function TrustyProDFWLaunch() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #050d1a 60%)', padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ background: '#FACC15', color: '#050d1a', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 800, marginBottom: 24, letterSpacing: 1 }}>COMING TO DFW</div>
        <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 20, maxWidth: 800, margin: '0 auto 20px' }}>
          TrustyPro Launches in<br /><span style={{ color: '#4F46E5' }}>Dallas–Fort Worth</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 20, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>The AI-powered home services platform is starting in DFW — and we want you in before it opens to everyone.</p>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid #4F46E5', borderRadius: 14, padding: '20px 28px', minWidth: 140 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#FACC15' }}>{s.num}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 24px' }}>

        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 16 }}>Launch Timeline</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 48, fontSize: 16 }}>Here's what to expect — and when</p>

        <div style={{ position: 'relative', marginBottom: 80 }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: '#1e3a5f' }} />
          {timeline.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 32, marginBottom: 40, position: 'relative' }}>
              <div style={{ width: 50, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#4F46E5', border: '3px solid #050d1a', marginTop: 6, zIndex: 1 }} />
              </div>
              <div style={{ background: '#0f1e35', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', flex: 1 }}>
                <div style={{ fontSize: 12, color: '#4F46E5', fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>{t.date}</div>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{t.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>Early Access Benefits</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 80 }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{b.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e1b4b, #0f1e35)', borderRadius: 24, padding: 56, textAlign: 'center', border: '1px solid #4F46E5' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Get Priority Access</h2>
          <p style={{ color: '#a5b4fc', fontSize: 16, marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>Waitlist closes when we hit 500 charter pros + 5,000 homeowners. DFW goes first.</p>

          {!submitted ? (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '16px 20px', borderRadius: 10, border: '1px solid #1e3a5f', background: '#050d1a', color: '#fff', fontSize: 16, width: 280, outline: 'none' }} />
              <button onClick={() => email.includes('@') && setSubmitted(true)} style={{ background: '#FACC15', color: '#050d1a', border: 'none', borderRadius: 10, padding: '16px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
                Join DFW Waitlist →
              </button>
            </div>
          ) : (
            <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid #4ade80', borderRadius: 12, padding: '20px 32px', display: 'inline-block' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#4ade80' }}>You're on the DFW waitlist!</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 8 }}>We'll email you with launch details and your priority access link.</div>
            </div>
          )}

          <p style={{ color: '#475569', fontSize: 13, marginTop: 20 }}>No spam. No credit card. Unsubscribe anytime.</p>
        </div>

      </div>
    </div>
  );
}
