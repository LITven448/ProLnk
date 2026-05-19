import { useState } from 'react';

type Field = { label: string; options: { label: string; points: number }[] };

const FIELDS: Field[] = [
  { label: 'System Age', options: [{ label: 'Under 10 yrs', points: 4 }, { label: '10–15 yrs', points: 2 }, { label: '15+ yrs', points: 0 }] },
  { label: 'SEER Rating', options: [{ label: '18+ (A)', points: 4 }, { label: '15–17 (B)', points: 3 }, { label: '12–14 (C)', points: 1 }, { label: 'Under 12', points: 0 }] },
  { label: 'Annual Maintenance', options: [{ label: 'Yes — biannual', points: 3 }, { label: 'Once a year', points: 2 }, { label: 'Never', points: 0 }] },
  { label: 'Filter Changes', options: [{ label: 'Monthly', points: 3 }, { label: 'Quarterly', points: 2 }, { label: 'Rarely', points: 0 }] },
  { label: 'Zoning / Smart Thermostat', options: [{ label: 'Yes', points: 2 }, { label: 'No', points: 0 }] },
];

const MAX_POINTS = 16;

function letterGrade(pts: number) {
  const pct = pts / MAX_POINTS;
  if (pct >= 0.9) return { letter: 'A', color: '#22c55e', rec: 'Top-tier efficiency. No action needed — keep up maintenance.' };
  if (pct >= 0.75) return { letter: 'B', color: '#84cc16', rec: 'Good efficiency. Consider upgrading thermostat to smart controls.' };
  if (pct >= 0.55) return { letter: 'C', color: '#eab308', rec: 'Average. Budget for replacement within 3–5 years; tune-up now.' };
  if (pct >= 0.35) return { letter: 'D', color: '#f97316', rec: 'Below average. High energy waste — plan replacement this year.' };
  return { letter: 'F', color: '#ef4444', rec: 'Critical. Replace immediately — likely driving high utility bills.' };
}

export default function DFWHVACEfficiencyScore2026() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const g = letterGrade(total);
  const allAnswered = Object.keys(answers).length === FIELDS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>❄️</div>
          <h1 style={{ fontSize: '1.6rem', color: '#F5E642', margin: '.5rem 0 .25rem' }}>DFW HVAC Efficiency Score 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '.9rem' }}>Answer 5 questions to score your DFW HVAC system efficiency.</p>
        </div>
        {!submitted ? (
          <>
            {FIELDS.map((f, i) => (
              <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '.75rem' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '.6rem', color: '#F5E642' }}>{f.label}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
                  {f.options.map(o => (
                    <button key={o.label} onClick={() => setAnswers(a => ({ ...a, [i]: o.points }))}
                      style={{ padding: '.45rem .9rem', borderRadius: 6, border: 'none', cursor: 'pointer',
                        background: answers[i] === o.points ? '#F5E642' : '#1e3a5f',
                        color: answers[i] === o.points ? '#0A1628' : '#fff', fontWeight: '600', fontSize: '.85rem' }}>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={!allAnswered}
              style={{ width: '100%', padding: '1rem', background: allAnswered ? '#F5E642' : '#1e3a5f',
                color: '#0A1628', border: 'none', borderRadius: 10, fontSize: '1.1rem', fontWeight: 'bold', cursor: allAnswered ? 'pointer' : 'not-allowed' }}>
              Get My HVAC Score →
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 'bold', color: g.color }}>{g.letter}</div>
            <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>{total} / {MAX_POINTS} points</div>
            <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.25rem', marginBottom: '1.25rem', color: '#e2e8f0' }}>{g.rec}</div>
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