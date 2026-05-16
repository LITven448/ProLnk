import { useState } from 'react';

const questions = [
  { id: 1, text: 'How old is your roof?', options: ['Under 5 years', '5–10 years', '10–20 years', 'Over 20 years'], scores: [10, 8, 5, 1] },
  { id: 2, text: 'When was your last professional roof inspection?', options: ['Within 2 years', '2–5 years ago', 'Over 5 years ago', 'Never'], scores: [10, 7, 3, 0] },
  { id: 3, text: 'Has your roof sustained hail damage in the last 5 years?', options: ['No damage', 'Minor — no claim', 'Repaired via insurance', 'Damaged — not repaired'], scores: [10, 6, 5, 0] },
  { id: 4, text: 'What is the condition of your ridge cap shingles?', options: ['Excellent — flat and sealed', 'Minor curl or gap', 'Significant separation', 'Missing / unknown'], scores: [10, 7, 2, 1] },
  { id: 5, text: 'How is your attic ventilation?', options: ['Ridge + soffit vents', 'Power vent only', 'Minimal venting', 'None / unknown'], scores: [10, 7, 3, 1] },
  { id: 6, text: 'What is the condition of roof flashing (chimney, vents, valleys)?', options: ['Tight and sealed', 'Minor rust / gap', 'Lifting or cracked', 'Unsure / never checked'], scores: [10, 6, 1, 3] },
  { id: 7, text: 'What is the condition of your gutters?', options: ['Clean and secure', 'Minor debris', 'Sagging or clogged', 'Detached / missing'], scores: [10, 7, 3, 0] },
  { id: 8, text: 'What shingle type is on your roof?', options: ['Class 4 impact-resistant', 'Standard 3-tab', 'Wood shake', 'Unknown'], scores: [10, 6, 4, 3] },
  { id: 9, text: 'Do you have any active leaks or ceiling stains?', options: ['None', 'Old stain — repaired', 'Active minor leak', 'Multiple leaks'], scores: [10, 5, 1, 0] },
  { id: 10, text: 'Are there any missing or cracked shingles visible?', options: ['None visible', '1–3 shingles', '4–10 shingles', 'Widespread damage'], scores: [10, 6, 2, 0] },
  { id: 11, text: 'Is there granule loss (black grit in gutters)?', options: ['None', 'Minor', 'Moderate — visible bare spots', 'Heavy'], scores: [10, 7, 3, 0] },
  { id: 12, text: 'Do you have roof-to-wall intersections sealed properly?', options: ['Yes, sealed with kickout flashing', 'Sealed but no kickout', 'Open / unsure', 'No sealing visible'], scores: [10, 7, 3, 1] },
  { id: 13, text: 'Has your roof deck (plywood) ever shown signs of rot or sag?', options: ['No', 'Minor — repaired', 'Active sag / soft spot', 'Unsure'], scores: [10, 5, 0, 4] },
  { id: 14, text: 'Do you have any penetrations (skylights, pipes) sealed properly?', options: ['All sealed / no penetrations', 'Most sealed', 'Some gaps', 'Unsure'], scores: [10, 7, 2, 4] },
  { id: 15, text: 'Have you had a roof replaced and received an insurance discount?', options: ['Yes — Class 4 discount', 'Replaced — no discount', 'Not replaced', 'Unsure'], scores: [10, 7, 4, 5] },
];

export default function DFWRoofSafetyScore() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 45 ? 'D' : 'F';
  const gradeColor = pct >= 90 ? '#22c55e' : pct >= 75 ? '#84cc16' : pct >= 60 ? '#eab308' : pct >= 45 ? '#f97316' : '#ef4444';

  const hailRisk = pct >= 75 ? 'Low' : pct >= 55 ? 'Moderate' : 'High';
  const hailColor = hailRisk === 'Low' ? '#22c55e' : hailRisk === 'Moderate' ? '#eab308' : '#ef4444';

  const dfwRisks = [
    answers[8] === 6 && 'Standard 3-tab shingles — DFW hail alley demands Class 4 impact-resistant shingles',
    answers[3] <= 2 && 'Hail damage not addressed — DFW averages 8+ hail events/year in Collin/Denton counties',
    answers[5] <= 1 && 'Poor attic ventilation — DFW summer heat (110°F+) destroys roof decking from below',
    answers[6] <= 3 && 'Failing flashing — Dallas-area storms drive 3"+ rain events that exploit every gap',
  ].filter(Boolean);

  const priorities = questions.filter(q => (answers[q.id] ?? 10) < 5).map(q => q.text);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0' }}>DFW Roof Safety Score</h1>
          <p style={{ color: '#94a3b8' }}>15-question hail alley roof assessment</p>
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
              <div style={{ marginTop: 16, padding: '8px 20px', background: '#0A1628', borderRadius: 8, display: 'inline-block' }}>
                <span style={{ color: '#94a3b8' }}>Hail Alley Risk: </span>
                <span style={{ color: hailColor, fontWeight: 700 }}>{hailRisk}</span>
              </div>
            </div>
            {dfwRisks.length > 0 && (
              <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'left' }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ DFW Hail Alley Risks</h3>
                {dfwRisks.map((r, i) => <p key={i} style={{ color: '#fca5a5', marginBottom: 8 }}>• {r}</p>)}
              </div>
            )}
            {priorities.length > 0 && (
              <div style={{ background: '#0f2038', borderRadius: 12, padding: 20, textAlign: 'left' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🏗️ Priority Repairs</h3>
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
