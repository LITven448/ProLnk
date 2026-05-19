import { useState } from 'react';

const questions = [
  { id: 1, text: 'How old is your electrical panel?', options: ['Under 10 years', '10–25 years', '25–40 years', 'Over 40 years'], scores: [10, 7, 4, 1] },
  { id: 2, text: 'What brand is your panel?', options: ['Square D / Siemens / Eaton', 'GE / Cutler-Hammer', 'Federal Pacific (FPE)', 'Zinsco / Unknown'], scores: [10, 7, 1, 1] },
  { id: 3, text: 'Do you have GFCI outlets in kitchens and bathrooms?', options: ['All rooms', 'Most rooms', 'A few', 'None'], scores: [10, 7, 4, 1] },
  { id: 4, text: 'Does your home have aluminum wiring?', options: ['No', 'Unsure', 'Yes — treated', 'Yes — untreated'], scores: [10, 5, 4, 1] },
  { id: 5, text: 'How many smoke detectors are installed?', options: ['One per floor + bedrooms', 'One per floor', 'One total', 'None'], scores: [10, 7, 4, 1] },
  { id: 6, text: 'Do you have whole-home surge protection?', options: ['Yes, panel-level', 'Power strips only', 'No', 'Unsure'], scores: [10, 5, 2, 3] },
  { id: 7, text: 'Are outdoor outlets GFCI-protected?', options: ['All outdoor outlets', 'Some', 'None', 'No outdoor outlets'], scores: [10, 6, 1, 8] },
  { id: 8, text: 'Is your dryer vent clear of electrical components?', options: ['Yes, fully clear', 'Mostly clear', 'Close to panel', 'Unsure'], scores: [10, 7, 2, 4] },
  { id: 9, text: 'Have you had an electrical inspection in the last 5 years?', options: ['Yes', 'Over 5 years ago', 'Never', 'Unsure'], scores: [10, 6, 2, 4] },
  { id: 10, text: 'Do any outlets feel warm or emit burning smell?', options: ['Never', 'Rarely', 'Sometimes', 'Yes'], scores: [10, 6, 2, 0] },
  { id: 11, text: 'Do breakers trip frequently?', options: ['Never', 'Rarely', 'Monthly', 'Weekly'], scores: [10, 7, 3, 1] },
  { id: 12, text: 'Do lights flicker or dim unexpectedly?', options: ['Never', 'Rarely', 'Sometimes', 'Often'], scores: [10, 7, 3, 1] },
  { id: 13, text: 'How many 15A/20A circuits does your panel have?', options: ['30+', '20–29', '10–19', 'Under 10'], scores: [10, 8, 5, 2] },
  { id: 14, text: 'Is wiring visible in attic or crawlspace in good condition?', options: ['Yes, great condition', 'Minor wear', 'Cracked/frayed', 'Not checked'], scores: [10, 6, 1, 4] },
  { id: 15, text: 'Do you use extension cords as permanent solutions?', options: ['Never', 'Rarely', 'Sometimes', 'Always'], scores: [10, 7, 3, 0] },
];

export default function DFWElectricalSafetyScore() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 45 ? 'D' : 'F';
  const gradeColor = pct >= 90 ? '#22c55e' : pct >= 75 ? '#84cc16′ : pct >= 60 ? '#eab308' : pct >= 45 ? '#f97316' : '#ef4444';

  const dfwRisks = [
    answers[2] <= 1 && 'Federal Pacific or Zinsco panel — common DFW fire risk',
    answers[3] === 1 && 'No aluminum wiring mitigation — code issue in DFW pre-1975 homes',
    answers[6] <= 5 && 'DFW lightning storms demand surge protection at panel level',
    answers[1] <= 4 && 'Aging panel — DFW heat cycling accelerates wear',
  ].filter(Boolean);

  const priorities = questions
    .filter(q => (answers[q.id] ?? 10) < 5)
    .map(q => q.text);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0′ }}>DFW Electrical Safety Score</h1>
          <p style={{ color: '#94a3b8′ }}>15-question assessment for Dallas-Fort Worth homes</p>
        </div>

        {!submitted ? (
          <>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ background: '#0f2038', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <p style={{ fontWeight: 600, marginBottom: 12, color: '#F5E642′ }}>{qi + 1}. {q.text}</p>
                <div style={{ display: 'grid', gap: 8 }}>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: q.scores[oi] }))}
                      style={{ background: answers[q.id] === q.scores[oi] ? '#F5E642′ : '#1e3a5f', color: answers[q.id] === q.scores[oi] ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 500 }}>
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
              <div style={{ fontSize: 48, fontWeight: 700, color: '#F5E642′ }}>{pct}%</div>
              <p style={{ color: '#94a3b8′ }}>{totalScore} / {maxScore} points</p>
            </div>
            {dfwRisks.length > 0 && (
              <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'left' }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ DFW-Specific Risks Identified</h3>
                {dfwRisks.map((r, i) => <p key={i} style={{ color: '#fca5a5', marginBottom: 8 }}>• {r}</p>)}
              </div>
            )}
            {priorities.length > 0 && (
              <div style={{ background: '#0f2038', borderRadius: 12, padding: 20, textAlign: 'left' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 Priority Actions</h3>
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
