import { useState } from 'react';

const checklist = [
  { id: 1, label: 'You own a home in DFW (or manage one)', tip: 'ProLnk serves homeowners, landlords, and property managers in the DFW metro.' },
  { id: 2, label: 'Your HVAC system is 2 years or older', tip: 'Systems under 2 years old are typically under warranty — ProLnk is for maintenance and repairs outside warranty.' },
  { id: 3, label: 'You've had an HVAC service need in the last 3 years', tip: 'If your system is running perfectly, ProLnk is still the fastest way to get quotes when you do need service.' },
  { id: 4, label: 'You've ever waited more than 24 hours for an HVAC tech to show up', tip: 'ProLnk connects you with available DFW pros — not a dispatcher queue.' },
  { id: 5, label: 'You want price transparency before a tech shows up', tip: 'ProLnk shows you upfront quotes from multiple DFW pros so you negotiate from knowledge, not desperation.' },
  { id: 6, label: 'You want to choose your pro based on reviews and credentials', tip: 'Every ProLnk HVAC pro is license-verified, insured, and rated by DFW homeowners like you.' },
  { id: 7, label: 'You're open to scheduling maintenance before it becomes an emergency', tip: 'ProLnk makes it easy to schedule tune-ups, so you're never booking from a crisis.' },
  { id: 8, label: 'You have a smartphone and 5 minutes to describe your HVAC need', tip: 'That's all it takes to get matched with a verified DFW HVAC pro on ProLnk.' },
];

export default function DFWHVACProLnkReady() {
  const [checked, setChecked] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: number) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = Math.round((checked.length / checklist.length) * 100);
  const missing = checklist.filter(item => !checked.includes(item.id));
  const scoreColor = score >= 80 ? '#22c55e' : score >= 50 ? '#F5E642' : '#3b82f6';
  const scoreLabel = score >= 80 ? '🔗 ProLnk Ready — Let's Go!' : score >= 50 ? '⚡ Almost Ready' : '📋 A Few Steps First';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔗</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>
            Are You Ready for ProLnk?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            ProLnk connects DFW homeowners with verified HVAC pros — fast, transparent, and on your terms. Let's see if you're ready.
          </p>
        </div>

        <div style={{ background: '#001a4a', border: '1px solid #1e3a8a', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#93c5fd' }}>
          🔗 ProLnk is currently accepting DFW homeowners on the early-access waitlist. Spots are limited to the first 5,000 homes.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                background: checked.includes(item.id) ? '#0f2a4a' : '#0d1f38',
                border: `1px solid ${checked.includes(item.id) ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem', marginTop: 2 }}>
                  {checked.includes(item.id) ? '✅' : '⬜'}
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>💡 {item.tip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowResults(true)}
          style={{
            width: '100%', padding: '1rem', background: '#F5E642', color: '#0A1628',
            border: 'none', borderRadius: 10, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer'
          }}
        >
          🔗 See My ProLnk Readiness Score
        </button>

        {showResults && (
          <div style={{ marginTop: '2rem', background: '#0d1f38', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: scoreColor }}>{score}%</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{scoreLabel}</div>
            </div>
            {missing.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📋 To Complete Your Readiness:</div>
                {missing.map(item => (
                  <div key={item.id} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>
                    → {item.label}
                  </div>
                ))}
              </div>
            )}
            <div style={{ background: '#F5E642', borderRadius: 8, padding: '0.75rem', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
              🔗 Join the DFW ProLnk Waitlist Now → prolnk.io
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
