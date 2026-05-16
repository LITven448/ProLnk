import { useState } from 'react';

const checklist = [
  { id: 1, label: 'Furnace or heat pump tested — confirmed heating to 68°F+', tip: 'Test your heat in October, not when a DFW ice storm hits in February.' },
  { id: 2, label: 'Heat exchanger inspected for cracks (carbon monoxide risk)', tip: 'Cracked heat exchangers are a silent CO hazard — inspect annually.' },
  { id: 3, label: 'Outdoor heat pump coils clear and unobstructed', tip: 'Frozen coils in a DFW ice event will shut down your heat entirely.' },
  { id: 4, label: 'Pipe insulation in place on exterior and attic lines', tip: 'February 2021 showed DFW how fast pipes burst — wrap before December.' },
  { id: 5, label: 'Emergency heat (backup heat strips) confirmed functional', tip: 'If your heat pump freezes, backup strips are your only fallback.' },
  { id: 6, label: 'Smart thermostat set to hold 68°F minimum during freezes', tip: 'Never let your home drop below 55°F even when away during a freeze event.' },
  { id: 7, label: 'Attic hatch sealed and weatherstripped', tip: 'An unsealed attic hatch can drop your home temp 10°F overnight in a DFW freeze.' },
  { id: 8, label: 'ProLnk emergency HVAC contact confirmed and ready', tip: 'DFW pros get booked within hours of a freeze warning — don't wait.' },
];

export default function DFWHVACWinterReady() {
  const [checked, setChecked] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: number) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = Math.round((checked.length / checklist.length) * 100);
  const missing = checklist.filter(item => !checked.includes(item.id));
  const scoreColor = score >= 80 ? '#22c55e' : score >= 50 ? '#F5E642' : '#ef4444';
  const scoreLabel = score >= 80 ? '❄️ Winter Ready' : score >= 50 ? '⚠️ Partially Ready' : '🧊 Not Ready — Risk of Freeze Damage';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧊</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>
            Is Your DFW HVAC Winter Ready?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            DFW winters are unpredictable — ice storms, freezes, and 80°F days all in one week. Is your HVAC ready?
          </p>
        </div>

        <div style={{ background: '#1a0a00', border: '1px solid #7c3a00', borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#fbbf24' }}>
          ⚠️ After Winter Storm Uri (Feb 2021), over 100,000 DFW HVAC systems failed. Don't be unprepared again.
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
          ❄️ Get My Winter Readiness Score
        </button>

        {showResults && (
          <div style={{ marginTop: '2rem', background: '#0d1f38', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: scoreColor }}>{score}%</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{scoreLabel}</div>
            </div>
            {missing.length > 0 && (
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Gaps to Close Before Winter:</div>
                {missing.map(item => (
                  <div key={item.id} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>
                    ❌ {item.label}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '1rem', background: '#F5E642', borderRadius: 8, padding: '0.75rem', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
              🔗 Book a DFW HVAC Winter Tune-Up via ProLnk → prolnk.io
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
