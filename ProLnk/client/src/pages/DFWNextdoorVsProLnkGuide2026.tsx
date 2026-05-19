import { useState } from 'react';

const concerns = [
  {
    id: 'licensing',
    label: '🪪 Is the pro licensed?',
    nextdoor: 'No way to verify. Neighbors vouch informally.',
    prolnk: 'License number verified with state database before activation.',
  },
  {
    id: 'insurance',
    label: '🛡️ Are they insured?',
    nextdoor: 'Self-reported only. No proof required.',
    prolnk: 'Certificate of insurance on file. Renewed annually.',
  },
  {
    id: 'background',
    label: '🔍 Background check?',
    nextdoor: 'None. Anyone can create a profile.',
    prolnk: 'Criminal background screen run at onboarding.',
  },
  {
    id: 'accountability',
    label: '📋 Accountability if job goes wrong?',
    nextdoor: 'Post a frustrated comment. That\’s it.',
    prolnk: 'ProLnk dispute system, performance score, potential deactivation.',
  },
  {
    id: 'reviews',
    label: '⭐ Review authenticity?',
    nextdoor: 'Friends and family can easily manipulate.',
    prolnk: 'Reviews tied to verified completed jobs only.',
  },
];

export default function DFWNextdoorVsProLnkGuide2026() {
  const [selected, setSelected] = useState('licensing');
  const concern = concerns.find((c) => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🏘️</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>ProLnk vs Nextdoor for Home Services — DFW 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 580, margin: '0 auto' }}>
            Neighborhood recommendations feel safe. But are they? See what&apos;s actually being checked.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {concerns.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#1e293b', color: selected === c.id ? '#0A1628' : '#f1f5f9', border: selected === c.id ? 'none' : '1px solid #334155', borderRadius: 10, padding: '0.8rem 1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>{concern.label}</h3>
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.4rem' }}>🏘️ Nextdoor</div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', color: '#f1f5f9', lineHeight: 1.6 }}>{concern.nextdoor}</div>
            </div>
            <div>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.4rem' }}>✅ ProLnk</div>
              <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', color: '#f1f5f9', lineHeight: 1.6 }}>{concern.prolnk}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[['🔍', '100%', 'License Verified'], ['🛡️', '100%', 'Insurance on File'], ['📋', '5-Star', 'Verified Review System']].map(([icon, val, label]) => (
            <div key={String(label)} style={{ background: '#1e293b', borderRadius: 10, padding: '1.2rem', textAlign: 'center', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.8rem' }}>{icon}</div>
              <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', fontSize: '0.9rem' }}>
          🏆 DFW homeowners deserve verified pros — not just neighbors&apos; opinions. prolnk.io
        </p>
      </div>
    </div>
  );
}