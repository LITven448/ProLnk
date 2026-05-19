import { useState } from 'react';

type Q = { label: string; icon: string; options: { label: string; pts: number }[] };

const QUESTIONS: Q[] = [
  { label: 'Pipe Material & Age', icon: '🔧', options: [{ label: 'PEX < 15 yrs', pts: 5 }, { label: 'Copper < 30 yrs', pts: 4 }, { label: 'Copper 30+ yrs', pts: 2 }, { label: 'Galvanized', pts: 0 }] },
  { label: 'Water Pressure', icon: '💧', options: [{ label: '45–75 PSI', pts: 5 }, { label: '75–90 PSI', pts: 2 }, { label: 'Under 40 PSI', pts: 1 }, { label: 'Over 90 PSI', pts: 0 }] },
  { label: 'Water Quality (TDS)', icon: '🧪', options: [{ label: 'Under 300 ppm', pts: 5 }, { label: '300–500 ppm', pts: 3 }, { label: '500+ ppm', pts: 1 }] },
  { label: 'Water Heater Age', icon: '♨️', options: [{ label: 'Under 8 yrs', pts: 5 }, { label: '8–12 yrs', pts: 3 }, { label: '12+ yrs', pts: 0 }] },
  { label: 'Past Slab Leaks', icon: '🚨', options: [{ label: 'Never', pts: 5 }, { label: 'Once (repaired)', pts: 2 }, { label: 'Multiple', pts: 0 }] },
];

const MAX_PTS = 25;

function grade(pts: number) {
  const r = pts / MAX_PTS;
  if (r >= 0.88) return { letter: 'A', color: '#22c55e', action: 'Excellent plumbing health. Maintain annual flush & anode rod checks.' };
  if (r >= 0.72) return { letter: 'B', color: '#84cc16', action: 'Good shape. Install whole-home filter if TDS is borderline.' };
  if (r >= 0.52) return { letter: 'C', color: '#eab308', action: 'Schedule plumber inspection within 6 months.' };
  if (r >= 0.32) return { letter: 'D', color: '#f97316', action: 'Priority repairs needed — pressure regulator, water heater, or repiping.' };
  return { letter: 'F', color: '#ef4444', action: 'Urgent: slab leak risk or galvanized pipes — contact a plumber immediately.' };
}

export default function DFWPlumbingHealthScore2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const g = grade(total);
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🚿</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW Plumbing Health Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Rate your plumbing system to identify slab leak and pipe risks.</p>
        </div>
        {!submitted ? (
          <>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '.75rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '.6rem', color: '#F5E642′ }}>{q.icon} {q.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                  {q.options.map(o => (
                    <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [i]: o.pts }))}
                      style={{ padding: '.45rem .9rem', borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: answers[i] === o.pts ? '#F5E642′ : '#1e3a5f',
                        color: answers[i] === o.pts ? '#0A1628′ : '#fff', fontWeight: '600', fontSize: '.85rem' }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
              style={{ width: '100%', padding: '1rem', background: allAnswered ? '#F5E642′ : '#1e3a5f',
                color: '#0A1628', border: 'none', borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold', cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
              Score My Plumbing →
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>{total} / {MAX_PTS} points</div>
            <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', marginBottom: '1.25rem', color: '#e2e8f0′ }}>{g.action}</div>
            <button onClick={() => { setAnswers({}); setSubmitted(false); }}
              style={{ padding: '.75rem 2rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}