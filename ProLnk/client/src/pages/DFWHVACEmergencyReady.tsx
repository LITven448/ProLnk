import { useState } from 'react';

const checklist = [
  { id: 1, label: 'Emergency HVAC pro contact saved (ProLnk or direct)', tip: 'When your AC fails at 108°F, every minute matters. Have the number now.' },
  { id: 2, label: 'Know your breaker panel — HVAC breakers labeled and accessible', tip: 'If your AC trips a breaker, you need to reset it yourself while waiting for a pro.' },
  { id: 3, label: 'Portable fans or window unit on hand for AC failure backup', tip: 'DFW heat kills. A $50 box fan buys you 24 hours until a pro can arrive.' },
  { id: 4, label: 'Smoke/CO detectors tested and batteries replaced in last 12 months', tip: 'Furnace cracks and refrigerant leaks produce CO — detectors are your early warning.' },
  { id: 5, label: 'HVAC unit location and model number documented', tip: 'Techs can pre-stage parts if they know your model before arriving — cuts repair time in half.' },
  { id: 6, label: 'Homeowners insurance policy reviewed — HVAC coverage confirmed', tip: 'Most policies exclude AC failure — know your coverage before you have a $5,000 replacement claim.' },
];

export default function DFWHVACEmergencyReady() {
  const [checked, setChecked] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: number) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = Math.round((checked.length / checklist.length) * 100);
  const missing = checklist.filter(item => !checked.includes(item.id));
  const scoreColor = score >= 80 ? '#22c55e' : score >= 50 ? '#F5E642′ : '#ef4444';
  const scoreLabel = score >= 80 ? '🚨 Emergency Ready' : score >= 50 ? '⚠️ Partially Prepared' : '🆘 Not Ready — High Risk';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🚨</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0′ }}>
            Is Your DFW HVAC Emergency Plan in Place?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            HVAC emergencies in DFW happen at the worst times — 108°F in July, ice storm in February. Are you ready?
          </p>
        </div>

        <div style={{ background: '#1a0000', border: '1px solid #7c0000', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#f87171′ }}>
          🚨 DFW averages 20+ days above 100°F per summer. An AC failure becomes a health emergency in under 4 hours for vulnerable family members.
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
          🚨 Get My Emergency Readiness Score
        </button>

        {showResults && (
          <div style={{ marginTop: '2rem', background: '#0d1f38', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: scoreColor }}>{score}%</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{scoreLabel}</div>
            </div>
            {missing.length > 0 && (
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Critical Gaps:</div>
                {missing.map(item => (
                  <div key={item.id} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>
                    ❌ {item.label}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '1rem', background: '#F5E642', borderRadius: 8, padding: '0.75rem', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
              🔗 Add a DFW HVAC Pro to Your Emergency Plan → prolnk.io
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
