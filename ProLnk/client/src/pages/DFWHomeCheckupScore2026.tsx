import { useState } from 'react';

const SYSTEMS = [
  { key: 'hvac', label: 'HVAC', icon: '❄️' },
  { key: 'plumbing', label: 'Plumbing', icon: '🚿' },
  { key: 'electrical', label: 'Electrical', icon: '⚡' },
  { key: 'roof', label: 'Roof', icon: '🏠' },
  { key: 'foundation', label: 'Foundation', icon: '🏗️' },
  { key: 'pest', label: 'Pest', icon: '🐛' },
];

function grade(score: number) {
  if (score >= 4.5) return { letter: 'A', color: '#22c55e' };
  if (score >= 3.5) return { letter: 'B', color: '#84cc16′ };
  if (score >= 2.5) return { letter: 'C', color: '#eab308′ };
  if (score >= 1.5) return { letter: 'D', color: '#f97316′ };
  return { letter: 'F', color: '#ef4444′ };
}

export default function DFWHomeCheckupScore2026() {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const rated = SYSTEMS.filter(s => ratings[s.key]);
  const avg = rated.length ? rated.reduce((a, s) => a + ratings[s.key], 0) / rated.length : 0;
  const g = grade(avg);

  const priorities = SYSTEMS
    .filter(s => ratings[s.key] && ratings[s.key] <= 2)
    .map(s => s.label);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏡</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW Home Checkup Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Rate each system 1–5 to calculate your overall home health score.</p>
        </div>
        {!submitted ? (
          <>
            {SYSTEMS.map(s => (
              <div key={s.key} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.1rem' }}>{s.icon} <strong>{s.label}</strong></span>
                <div style={{ display: 'flex', gap: '.35rem' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setRatings(r => ({ ...r, [s.key]: n }))}
                      style={{ width: 34, height: 34, borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: ratings[s.key] === n ? '#F5E642′ : '#1e3a5f',
                        color: ratings[s.key] === n ? '#0A1628′ : '#fff', fontWeight: ’bold', fontSize: '.9rem' }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={rated.length < 6}
              style={{ width: '100%', padding: '1rem', background: rated.length >= 6 ? '#F5E642′ : '#1e3a5f',
                color: '#0A1628', border: 'none', borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold', cursor: rated.length >= 6 ? 'pointer' : 'not-allowed' }}>
              Calculate Score →
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ fontSize: '1.3rem', color: '#94a3b8', marginBottom: '1rem' }}>Overall Home Health Score: {avg.toFixed(1)} / 5.0</div>
            {priorities.length > 0 ? (
              <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem', textAlign: 'left' }}>
                <div style={{ color: '#F5E642', fontWeight: 'bold', marginBottom: '.5rem' }}>⚠️ Priority Actions</div>
                {priorities.map(p => <div key={p} style={{ color: '#f97316', marginBottom: '.25rem' }}>• Inspect & repair {p}</div>)}
              </div>
            ) : (
              <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', color: '#22c55e' }}>✅ Great shape! Schedule annual maintenance to maintain your score.</div>
            )}
            <button onClick={() => { setRatings({}); setSubmitted(false); }}
              style={{ padding: '.75rem 2rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}