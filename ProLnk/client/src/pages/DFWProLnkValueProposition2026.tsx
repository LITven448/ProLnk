import { useState } from 'react';

type UserType = 'homeowner' | 'pro';

const homeownerValue = [
  { icon: '🔍', title: 'Verified Pros Only', desc: 'Every pro is licensed, insured, and background-checked before entering the DFW network.' },
  { icon: '⏱️', title: 'Fast Match', desc: 'Submit your need and get matched within hours — not days of back-and-forth.' },
  { icon: '💬', title: 'No Spam', desc: 'One matched pro per request. No 6 contractors calling you simultaneously.' },
  { icon: '⭐', title: 'Performance Scores', desc: 'Every pro rated on verified completed jobs — not self-selected testimonials.' },
  { icon: '🛡️', title: 'ProLnk Guarantee', desc: 'If a match goes wrong, ProLnk dispute resolution has your back.' },
  { icon: '🏠', title: 'Home Health Vault', desc: 'Your property data secured and used to improve every future match.' },
];

const proValue = [
  { icon: '💰', title: 'Stream 1: Job Commission', desc: '12–70% of match value depending on tier. Charter pros start earning Day 1.' },
  { icon: '🤝', title: 'Stream 2: Network Override', desc: 'Earn on every pro you recruit — 7/4/2/1% down 4 levels on all their job earnings.' },
  { icon: '🔄', title: 'Stream 3: Subscription Override', desc: '12% recurring of every pro subscription you refer. Forever.' },
  { icon: '🏘️', title: 'Stream 4: Homeowner Override', desc: 'Bring homeowners to the platform — earn per-lead fees you negotiate.' },
  { icon: '🏛️', title: 'Stream 5: Origination Rights', desc: '1.5% of all platform revenue from homes you originate. Permanent.' },
  { icon: '🏅', title: 'Charter Tier', desc: '$149/mo locked forever. Only 500 spots in DFW. Closes when full.' },
];

export default function DFWProLnkValueProposition2026() {
  const [userType, setUserType] = useState<UserType>('homeowner');
  const items = userType === 'homeowner' ? homeownerValue : proValue;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🏆</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.9rem', margin: '0.5rem 0' }}>Why ProLnk Wins — DFW 2026 Value Deep Dive</h1>
          <p style={{ color: '#94a3b8', maxWidth: 620, margin: '0 auto' }}>
            ProLnk is built for both sides. Homeowners get trust and speed. Pros get leads, income, and community.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {(['homeowner', 'pro'] as UserType[]).map((t) => (
            <button key={t} onClick={() => setUserType(t)}
              style={{ background: userType === t ? '#F5E642' : '#1e293b', color: userType === t ? '#0A1628' : '#f1f5f9', border: userType === t ? 'none' : '1px solid #334155', borderRadius: 10, padding: '0.7rem 2rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>
              {t === 'homeowner' ? '🏠 I\’m a Homeowner' : '🔧 I\’m a Pro'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {items.map((item) => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 12, padding: '1.3rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🏙️', 'DFW Focus', 'Built for North Texas trades and homeowners'], ['📡', 'AI Matching', 'Smart match engine improves with every job'], ['🔒', 'Data Secure', 'Home Health Vault privacy-first architecture'], ['🌐', '500 Charter', 'DFW founding spots — locked rate forever']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ background: '#1e293b', borderRadius: 10, padding: '1rem', textAlign: 'center', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', margin: '0.4rem 0 0.2rem' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', margin: '0 0 0.5rem', fontSize: '1.2rem' }}>
            {userType === 'homeowner' ? '🏠 Find a Verified DFW Pro' : '🔧 Join as a Charter Pro — $149/mo Locked'}
          </h3>
          <p style={{ color: '#0A1628', margin: '0 0 0.8rem', fontSize: '0.9rem' }}>
            {userType === 'homeowner'
              ? 'Submit your project and get matched with a verified, insured DFW professional today.'
              : 'Only 500 Charter spots available for DFW. Lock your rate before the waitlist closes.'}
          </p>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: '1.1rem' }}>prolnk.io</div>
        </div>
      </div>
    </div>
  );
}