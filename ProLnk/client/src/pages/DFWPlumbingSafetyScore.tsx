import { useState } from 'react';

const questions = [
  { id: 1, text: 'What material are your water supply pipes?', options: ['Copper', 'CPVC / PEX', 'Galvanized steel', 'Polybutylene (gray/blue)'], scores: [10, 9, 4, 0] },
  { id: 2, text: 'Do you have a thermal expansion tank on your water heater?', options: ['Yes', 'Unsure', 'No'], scores: [10, 5, 1] },
  { id: 3, text: 'What is your home water pressure?', options: ['40–80 PSI (ideal)', '80–100 PSI', 'Over 100 PSI', 'Never tested'], scores: [10, 5, 1, 4] },
  { id: 4, text: 'Do you have polybutylene (Poly-B) piping?', options: ['No', 'Unsure', 'Yes — partially replaced', 'Yes — all original'], scores: [10, 5, 4, 0] },
  { id: 5, text: 'Has your slab ever had a leak or repair?', options: ['Never', 'Once — repaired', 'Multiple times', 'Unsure'], scores: [10, 6, 2, 5] },
  { id: 6, text: 'How old is your water softener (if any)?', options: ['Under 5 years', '5–10 years', 'Over 10 years', 'No softener'], scores: [10, 7, 3, 8] },
  { id: 7, text: 'What temperature is your water heater set to?', options: ['120°F (safe)', '130–140°F', 'Over 140°F', 'Unknown'], scores: [10, 6, 2, 4] },
  { id: 8, text: 'Do you have a pressure-reducing valve (PRV)?', options: ['Yes, serviced recently', 'Yes, unknown service', 'No', 'Unsure'], scores: [10, 6, 2, 4] },
  { id: 9, text: 'How old is your water heater?', options: ['Under 6 years', '6–10 years', '10–12 years', 'Over 12 years'], scores: [10, 7, 4, 1] },
  { id: 10, text: 'Do you notice low water pressure in any fixtures?', options: ['Never', 'Rarely', 'Sometimes', 'Often'], scores: [10, 7, 4, 1] },
  { id: 11, text: 'Have you had any drain backups in the last 2 years?', options: ['None', 'One minor', 'Multiple', 'Sewage backup'], scores: [10, 6, 3, 0] },
  { id: 12, text: 'Do faucets drip or toilets run constantly?', options: ['None', 'One minor drip', 'Multiple fixtures', 'Yes, ongoing'], scores: [10, 7, 3, 1] },
  { id: 13, text: 'Do you see any visible pipe corrosion or staining?', options: ['No', 'Minor surface rust', 'Significant corrosion', 'Active leaks'], scores: [10, 6, 2, 0] },
  { id: 14, text: 'When was your sewer line last inspected (camera)?', options: ['Within 3 years', '3–7 years ago', 'Never', 'Unsure'], scores: [10, 6, 2, 4] },
  { id: 15, text: 'Do you have a whole-home water shutoff valve you can access?', options: ['Yes, tested recently', 'Yes, location known', 'Unsure location', 'No'], scores: [10, 7, 3, 1] },
];

export default function DFWPlumbingSafetyScore() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 45 ? 'D' : 'F';
  const gradeColor = pct >= 90 ? '#22c55e' : pct >= 75 ? '#84cc16' : pct >= 60 ? '#eab308' : pct >= 45 ? '#f97316' : '#ef4444';

  const dfwRisks = [
    answers[4] === 0 && 'Poly-B piping — epidemic failure in DFW 1978–1995 homes',
    answers[5] <= 2 && 'Slab leak history — DFW clay soil movement is the #1 plumbing risk',
    answers[3] === 1 && 'High water pressure damages fixtures — DFW mains commonly run high',
    answers[9] <= 4 && 'Aging water heater — hard DFW water accelerates anode rod failure',
  ].filter(Boolean);

  const priorities = questions
    .filter(q => (answers[q.id] ?? 10) < 5)
    .map(q => q.text);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0' }}>DFW Plumbing Safety Score</h1>
          <p style={{ color: '#94a3b8' }}>15-question assessment for Dallas-Fort Worth homes</p>
        </div>

        {!submitted ? (
          <>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ background: '#0f2038', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <p style={{ fontWeight: 600, marginBottom: 12, color: '#F5E642' }}>{qi + 1}. {q.text}</p>
                <div style={{ display: 'grid', gap: 8 }}>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: q.scores[oi] }))}
                      style={{ background: answers[q.id] === q.scores[oi] ? '#F5E642' : '#1e3a5f', color: answers[q.id] === q.scores[oi] ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 500 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}
              style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 12, padding: '16px', fontSize: 18, fontWeight: 700, cursor: 'pointer', opacity: Object.keys(answers).length < questions.length ? 0.5 : 1 }}>
              Calculate My Score ({Object.keys(answers).length}/{questions.length} answered)
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#0f2038', borderRadius: 16, padding: 32, marginBottom: 24 }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: gradeColor }}>{grade}</div>
              <div style={{ fontSize: 48, fontWeight: 700, color: '#F5E642' }}>{pct}%</div>
              <p style={{ color: '#94a3b8' }}>{totalScore} / {maxScore} points</p>
            </div>
            {dfwRisks.length > 0 && (
              <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'left' }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ DFW-Specific Concerns</h3>
                {dfwRisks.map((r, i) => <p key={i} style={{ color: '#fca5a5', marginBottom: 8 }}>• {r}</p>)}
              </div>
            )}
            {priorities.length > 0 && (
              <div style={{ background: '#0f2038', borderRadius: 12, padding: 20, textAlign: 'left' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 What to Address First</h3>
                {priorities.map((p, i) => <p key={i} style={{ color: '#cbd5e1', marginBottom: 8 }}>• {p}</p>)}
              </div>
            )}
            <button onClick={() => { setAnswers({}); setSubmitted(false); }}
              style={{ marginTop: 24, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 12, padding: '12px 32px', fontWeight: 700, cursor: 'pointer' }}>
              Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
