import { useState } from 'react';

const questions = [
  { id: 'age', label: 'How old is your HVAC system?', options: ['Under 5 years', '5–10 years', '11–15 years', 'Over 15 years'], scores: [12, 10, 6, 2] },
  { id: 'tuneup', label: 'When was your last professional tune-up?', options: ['Within the last year', '1–2 years ago', '3–5 years ago', 'Never or unknown'], scores: [12, 9, 5, 2] },
  { id: 'cooling', label: 'Summer cooling performance in DFW heat?', options: ['Cools to set temp quickly', 'Struggles on hottest days', 'Runs constantly, barely keeps up', 'Cannot maintain set temp'], scores: [12, 8, 5, 2] },
  { id: 'heating', label: 'Winter heating performance?', options: ['Heats promptly and evenly', 'Takes longer than expected', 'Uneven heat between rooms', 'Does not heat adequately'], scores: [12, 8, 5, 2] },
  { id: 'filter', label: 'How often do you change the air filter?', options: ['Every 1–2 months', 'Every 3 months', 'Every 6+ months', 'Rarely or never'], scores: [12, 9, 5, 2] },
  { id: 'sounds', label: 'Unusual sounds (banging, grinding, squealing)?', options: ['No unusual sounds', 'Occasional clicking at startup', 'Regular unusual noises', 'Loud or constant abnormal sounds'], scores: [12, 9, 5, 1] },
  { id: 'smells', label: 'Unusual smells from vents?', options: ['No unusual smells', 'Musty odor occasionally', 'Regular musty or moldy smell', 'Burning or chemical smell'], scores: [12, 8, 4, 1] },
  { id: 'bills', label: 'Energy bill trend over the past year?', options: ['Stable or lower', 'Slightly higher than expected', 'Noticeably higher', 'Dramatically higher'], scores: [12, 9, 5, 2] },
];

const urgencyLevels = [
  { min: 85, label: 'Low — Annual tune-up recommended', color: '#22c55e', emoji: '✅' },
  { min: 65, label: 'Moderate — Schedule a tune-up soon', color: '#84cc16', emoji: '🟡' },
  { min: 45, label: 'High — Service needed within 30 days', color: '#f59e0b', emoji: '⚠️' },
  { min: 0, label: 'Critical — Call an HVAC tech today', color: '#ef4444', emoji: '🚨' },
];

export default function DFWHVACHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 12;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const urgency = urgencyLevels.find(u => percentage >= u.min) ?? urgencyLevels[urgencyLevels.length - 1];
  const answered = Object.keys(answers).length;

  const actions: Record<string, string> = {
    age: 'Budget for HVAC replacement within 2–3 years',
    tuneup: 'Schedule a DFW HVAC tune-up before summer peak',
    cooling: 'Have refrigerant levels and coils inspected',
    heating: 'Have heat exchanger and burners inspected',
    filter: 'Set a monthly reminder to replace your filter',
    sounds: 'Have bearings, belts, and blower checked immediately',
    smells: 'Inspect for mold in ducts or burning motor components',
    bills: 'Have system efficiency tested — consider new equipment',
  };

  const lowItems = questions.filter(q => (answers[q.id] ?? 12) <= 5);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>❄️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Health Check</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>8 questions to assess your HVAC system before the Texas summer hits.</p>
        </div>

        {!submitted ? (
          <>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <p style={{ fontWeight: 600, marginBottom: 12, color: '#e2e8f0′ }}>{qi + 1}. {q.label}</p>
                {q.options.map((opt, oi) => (
                  <label key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                    <input type="radio" name={q.id} checked={answers[q.id] === q.scores[oi]} onChange={() => setAnswers(prev => ({ ...prev, [q.id]: q.scores[oi] }))} />
                    <span style={{ color: '#cbd5e1′ }}>{opt}</span>
                  </label>
                ))}
              </div>
            ))}
            <button onClick={() => answered === questions.length && setSubmitted(true)} style={{ width: '100%', padding: '14px', background: answered === questions.length ? '#F5E642′ : '#334155', color: '#0A1628', fontWeight: 700, fontSize: 16, border: ’none', borderRadius: 10, cursor: answered === questions.length ? 'pointer' : 'not-allowed' }}>
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My HVAC Score'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: urgency.color }}>{percentage}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: urgency.color }}>{urgency.emoji} {urgency.label}</div>
              <div style={{ color: '#94a3b8', marginTop: 8 }}>HVAC Health Score out of 100</div>
            </div>
            {lowItems.length > 0 && (
              <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 Recommended Actions</h3>
                {lowItems.map(q => (
                  <div key={q.id} style={{ color: '#cbd5e1', marginBottom: 8 }}>• {actions[q.id]}</div>
                ))}
              </div>
            )}
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>Score Breakdown</h3>
              {questions.map(q => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#94a3b8′ }}>{q.label}</span>
                  <span style={{ color: (answers[q.id] ?? 0) <= 5 ? '#ef4444′ : '#22c55e', fontWeight: 600 }}>{answers[q.id]}/12</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setAnswers({}); setSubmitted(false); }} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 10, cursor: 'pointer' }}>Retake Assessment</button>
          </div>
        )}
      </div>
    </div>
  );
}
