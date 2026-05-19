import { useState } from 'react';

const checklist = [
  { id: 1, label: 'AC filter replaced (1-inch filters every 30 days in DFW summer)', tip: 'DFW dust and pollen clog filters fast — check monthly.' },
  { id: 2, label: 'Outdoor condenser unit cleared of debris (2-ft clearance all sides)', tip: 'Hail and storms leave debris that restricts airflow.' },
  { id: 3, label: 'Thermostat tested and cooling confirmed below 75°F', tip: 'Test before the first 100°F day, not during it.' },
  { id: 4, label: 'Refrigerant levels verified by licensed HVAC tech', tip: 'Low refrigerant is the #1 reason DFW ACs fail in June.' },
  { id: 5, label: 'Condensate drain line flushed and clear', tip: 'Drain clogs cause water damage and shutdown — flush with vinegar quarterly.' },
  { id: 6, label: 'Evaporator coil inspected for ice or buildup', tip: 'Frozen coils in summer = refrigerant issue or airflow blockage.' },
  { id: 7, label: 'All vents open and unobstructed in every room', tip: 'Closing vents unbalances pressure and strains the system.' },
  { id: 8, label: 'Attic insulation verified at R-38 or higher', tip: 'DFW attics hit 150°F in summer — inadequate insulation kills efficiency.' },
  { id: 9, label: 'Smart thermostat programmed for DFW summer schedule', tip: 'Set 78°F when home, 85°F when away to cut bills 15-20%.' },
  { id: 10, label: 'Emergency HVAC contact saved and ProLnk account ready', tip: 'When your AC fails at 105°F, you need a pro in 60 minutes, not 6 hours.' },
];

export default function DFWHVACSummerReady() {
  const [checked, setChecked] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: number) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = Math.round((checked.length / checklist.length) * 100);
  const missing = checklist.filter(item => !checked.includes(item.id));

  const scoreColor = score >= 80 ? '#22c55e' : score >= 50 ? '#F5E642' : '#ef4444';
  const scoreLabel = score >= 80 ? '🌬️ Summer Ready' : score >= 50 ? '⚠️ Partially Ready' : '🔥 Not Ready';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>
            Is Your DFW HVAC Summer Ready?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            DFW summers hit 110°F. Your AC has one job. Make sure it's ready.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              style={{
                background: checked.includes(item.id) ? '#0f2a4a' : '#0d1f38',
                border: `1px solid ${checked.includes(item.id) ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer',
                transition: 'all 0.2s'
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
          ☀️ Get My Summer Readiness Score
        </button>

        {showResults && (
          <div style={{ marginTop: '2rem', background: '#0d1f38', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: scoreColor }}>{score}%</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{scoreLabel}</div>
            </div>
            {missing.length > 0 && (
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Still Needed:</div>
                {missing.map(item => (
                  <div key={item.id} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f' }}>
                    ❌ {item.label}
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '1rem', background: '#F5E642', borderRadius: 8, padding: '0.75rem', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
              🔗 Get a DFW HVAC Pro on ProLnk → prolnk.io
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
