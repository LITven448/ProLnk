import { useState } from 'react';

type Indicator = { label: string; icon: string; options: { label: string; points: number }[] };

const INDICATORS: Indicator[] = [
  { label: 'Visible Cracks', icon: '🔍', options: [{ label: 'None', points: 5 }, { label: 'Hairline only', points: 3 }, { label: 'Stair-step / diagonal', points: 1 }, { label: 'Wide or horizontal', points: 0 }] },
  { label: 'Door & Window Operation', icon: '🚪', options: [{ label: 'All smooth', points: 5 }, { label: '1–2 sticky', points: 3 }, { label: 'Multiple sticking', points: 1 }] },
  { label: 'Floor Levelness', icon: '📐', options: [{ label: 'Flat & level', points: 5 }, { label: 'Slight slope', points: 3 }, { label: 'Noticeable slope', points: 0 }] },
  { label: 'Drainage Around Home', icon: '💧', options: [{ label: 'Excellent', points: 5 }, { label: 'Pools occasionally', points: 2 }, { label: 'Standing water', points: 0 }] },
  { label: 'Foundation Watering Compliance', icon: '🌿', options: [{ label: 'Year-round consistent', points: 5 }, { label: 'Seasonal', points: 3 }, { label: 'Rarely', points: 0 }] },
];

const MAX_PTS = 25;

function grade(pts: number) {
  const pct = pts / MAX_PTS;
  if (pct >= 0.88) return { letter: 'A', color: '#22c55e', urgency: 'Low', action: 'Annual monitoring only. Keep watering consistent.' };
  if (pct >= 0.72) return { letter: 'B', color: '#84cc16', urgency: 'Low–Moderate', action: 'Monitor cracks; improve drainage. Schedule inspection in 12 months.' };
  if (pct >= 0.52) return { letter: 'C', color: '#eab308', urgency: 'Moderate', action: 'Book a foundation inspection within 6 months.' };
  if (pct >= 0.32) return { letter: 'D', color: '#f97316', urgency: 'High', action: 'Schedule structural engineer evaluation within 90 days.' };
  return { letter: 'F', color: '#ef4444', urgency: 'Critical', action: 'Immediate professional inspection required — do not delay.' };
}

export default function DFWFoundationHealthScore2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const g = grade(total);
  const allAnswered = Object.keys(answers).length === INDICATORS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏗️</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW Foundation Health Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Rate your foundation indicators to assess DFW soil movement risk.</p>
        </div>
        {!submitted ? (
          <>
            {INDICATORS.map((ind, i) => (
              <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '.75rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '.6rem', color: '#F5E642′ }}>{ind.icon} {ind.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                  {ind.options.map(o => (
                    <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [i]: o.points }))}
                      style={{ padding: '.45rem .9rem', borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: answers[i] === o.points ? '#F5E642′ : '#1e3a5f',
                        color: answers[i] === o.points ? '#0A1628′ : '#fff', fontWeight: '600', fontSize: '.85rem' }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
              style={{ width: '100%', padding: '1rem', background: allAnswered ? '#F5E642′ : '#1e3a5f',
                color: '#0A1628', border: 'none', borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold', cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
              Score My Foundation →
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ color: '#94a3b8', marginBottom: '.5rem' }}>{total} / {MAX_PTS} pts</div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '.5rem 1rem', display: 'inline-block', marginBottom: '1rem', color: g.color, fontWeight: 'bold' }}>Urgency: {g.urgency}</div>
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