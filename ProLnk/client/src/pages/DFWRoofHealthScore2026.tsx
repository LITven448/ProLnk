import { useState } from 'react';

type Q = { label: string; icon: string; options: { label: string; pts: number }[] };

const QUESTIONS: Q[] = [
  { label: 'Roof Age', icon: '📅', options: [{ label: 'Under 10 yrs', pts: 5 }, { label: '10–15 yrs', pts: 4 }, { label: '15–20 yrs', pts: 2 }, { label: '20+ yrs', pts: 0 }] },
  { label: 'Shingle Type', icon: '🏠', options: [{ label: 'Impact-resistant Class 4', pts: 5 }, { label: '30-yr architectural', pts: 3 }, { label: '3-tab', pts: 1 }, { label: 'Rolled or foam', pts: 0 }] },
  { label: 'Hail Damage History', icon: '🌨️', options: [{ label: 'None known', pts: 5 }, { label: 'Minor (patched)', pts: 3 }, { label: 'Significant unreplaced', pts: 0 }] },
  { label: 'Flashing Condition', icon: '🔍', options: [{ label: 'Sealed and intact', pts: 5 }, { label: 'Some lifting', pts: 2 }, { label: 'Missing or rusted', pts: 0 }] },
  { label: 'Granule Loss in Gutters', icon: '🍂', options: [{ label: 'None', pts: 5 }, { label: 'Minimal', pts: 3 }, { label: 'Heavy', pts: 0 }] },
  { label: 'Attic Ventilation', icon: '💨', options: [{ label: 'Ridge and soffit vents', pts: 5 }, { label: 'Box vents only', pts: 2 }, { label: 'None or poor', pts: 0 }] },
];

const MAX_PTS = 30;

function grade(pts: number) {
  const r = pts / MAX_PTS;
  if (r >= 0.88) return { letter: 'A', color: '#22c55e', timeline: '10+ years', action: 'Excellent condition. Inspect after each major storm.' };
  if (r >= 0.72) return { letter: 'B', color: '#84cc16', timeline: '7–10 years', action: 'Good shape. Address flashing and granule loss proactively.' };
  if (r >= 0.52) return { letter: 'C', color: '#eab308', timeline: '3–7 years', action: 'Budget for replacement. Get inspection this season.' };
  if (r >= 0.32) return { letter: 'D', color: '#f97316', timeline: '1–3 years', action: 'Replacement needed soon. File insurance claim if hail damage exists.' };
  return { letter: 'F', color: '#ef4444', timeline: 'Now', action: 'Immediate replacement — leaks and major damage risk. Act now.' };
}

export default function DFWRoofHealthScore2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const g = grade(total);
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW Roof Health Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Assess your DFW roof condition and estimate replacement timeline.</p>
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
              Score My Roof
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ color: '#94a3b8', marginBottom: '.5rem' }}>{total} / {MAX_PTS} points</div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '.5rem 1rem', display: 'inline-block', marginBottom: '1rem', color: g.color, fontWeight: 'bold' }}>Replacement Timeline: {g.timeline}</div>
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