import { useState } from 'react';

type Q = { label: string; icon: string; options: { label: string; pts: number }[] };

const QUESTIONS: Q[] = [
  { label: 'Panel Brand & Age', icon: '🔌', options: [{ label: 'Modern < 20 yrs', pts: 5 }, { label: '20–40 yrs, safe brand', pts: 3 }, { label: 'FPE / Zinsco (any age)', pts: 0 }, { label: '40+ yrs unknown', pts: 1 }] },
  { label: 'Amperage', icon: '⚡', options: [{ label: '200A+', pts: 5 }, { label: '150A', pts: 3 }, { label: '100A', pts: 1 }, { label: '60A or less', pts: 0 }] },
  { label: 'GFCI Coverage', icon: '🛁', options: [{ label: 'All wet areas', pts: 5 }, { label: 'Most', pts: 3 }, { label: 'Few or none', pts: 0 }] },
  { label: 'Aluminum Branch Wiring', icon: '🚨', options: [{ label: 'None / copper', pts: 5 }, { label: 'Some aluminum (treated)', pts: 2 }, { label: 'Untreated aluminum', pts: 0 }] },
  { label: 'Age of Service Entrance', icon: '🏚️', options: [{ label: 'Under 20 yrs', pts: 5 }, { label: '20–40 yrs', pts: 3 }, { label: '40+ yrs', pts: 0 }] },
];

const MAX_PTS = 25;

function grade(pts: number) {
  const r = pts / MAX_PTS;
  if (r >= 0.88) return { letter: 'A', color: '#22c55e', upgrade: 'Safe and modern — add AFCI breakers for full protection.' };
  if (r >= 0.72) return { letter: 'B', color: '#84cc16', upgrade: 'Good. Add GFCI to remaining wet areas and review in 5 yrs.' };
  if (r >= 0.52) return { letter: 'C', color: '#eab308', upgrade: 'Schedule electrician inspection within 6 months.' };
  if (r >= 0.32) return { letter: 'D', color: '#f97316', upgrade: 'Panel upgrade or rewiring needed — get 2–3 bids this year.' };
  return { letter: 'F', color: '#ef4444', upgrade: 'SAFETY RISK: FPE panel or untreated aluminum wiring — act immediately.' };
}

export default function DFWElectricalHealthScore2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const g = grade(total);
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>⚡</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW Electrical Health Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Identify panel hazards and safety gaps in your DFW home.</p>
        </div>
        {!submitted ? (
          <>
            {QUESTIONS.map((q, i) => (
              <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '.75rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '.6rem', color: '#F5E642' }}>{q.icon} {q.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                  {q.options.map(o => (
                    <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [i]: o.pts }))}
                      style={{ padding: '.45rem .9rem', borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: answers[i] === o.pts ? '#F5E642' : '#1e3a5f',
                        color: answers[i] === o.pts ? '#0A1628' : '#fff', fontWeight: '600', fontSize: '.85rem' }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
              style={{ width: '100%', padding: '1rem', background: allAnswered ? '#F5E642' : '#1e3a5f',
                color: '#0A1628', border: 'none', borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold', cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
              Score My Electrical →
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>{total} / {MAX_PTS} points</div>
            <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', marginBottom: '1.25rem', color: '#e2e8f0' }}>{g.upgrade}</div>
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