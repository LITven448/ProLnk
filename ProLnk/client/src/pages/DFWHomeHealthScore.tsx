import { useState } from 'react';

const questions = [
  { id: 'roof', label: 'Roof Age', options: ['Under 5 years', '5–10 years', '11–20 years', 'Over 20 years'], scores: [10, 8, 5, 2] },
  { id: 'hvac', label: 'HVAC System Age', options: ['Under 5 years', '5–10 years', '11–15 years', 'Over 15 years'], scores: [10, 8, 5, 2] },
  { id: 'foundation', label: 'Foundation Status', options: ['No issues visible', 'Minor cosmetic cracks', 'Doors/windows sticking', 'Major cracks or shifting'], scores: [10, 7, 4, 1] },
  { id: 'electrical', label: 'Electrical Panel', options: ['Updated within 10 years', '11–25 years old', 'Over 25 years old', 'Unknown/Federal Pacific'], scores: [10, 7, 4, 1] },
  { id: 'plumbing', label: 'Plumbing Type', options: ['PEX or copper (recent)', 'Copper (older)', 'Galvanized steel', 'Polybutylene/unknown'], scores: [10, 7, 4, 1] },
  { id: 'insulation', label: 'Insulation Level', options: ['Well insulated, low bills', 'Adequate, average bills', 'Some gaps, higher bills', 'Poor, very high bills'], scores: [10, 7, 4, 2] },
  { id: 'drainage', label: 'Drainage / Grading', options: ['Water drains away from home', 'Mostly OK', 'Some pooling near foundation', 'Standing water regularly'], scores: [10, 7, 4, 1] },
  { id: 'pest', label: 'Pest History', options: ['No history', 'Treated, resolved', 'Ongoing minor issues', 'Active termites or major pest issue'], scores: [10, 8, 4, 1] },
  { id: 'windows', label: 'Window Condition', options: ['Double pane, good seals', 'Single pane but intact', 'Fogging / broken seals', 'Damaged frames or gaps'], scores: [10, 7, 4, 2] },
  { id: 'maintenance', label: 'Overall Maintenance History', options: ['Regular professional maintenance', 'Some maintenance done', 'Minimal maintenance', 'Deferred/neglected'], scores: [10, 7, 4, 1] },
];

export default function DFWHomeHealthScore() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getLabel = (pct: number) => {
    if (pct >= 85) return { label: 'Excellent', color: '#22c55e' };
    if (pct >= 70) return { label: 'Good', color: '#84cc16' };
    if (pct >= 50) return { label: 'Fair', color: '#f59e0b' };
    return { label: 'At Risk', color: '#ef4444' };
  };

  const categoryScores = questions.map(q => ({
    label: q.label,
    score: answers[q.id] ?? null,
    max: 10,
  }));

  const lowCategories = categoryScores.filter(c => c.score !== null && c.score <= 4);
  const rating = getLabel(percentage);
  const answered = Object.keys(answers).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Health Score</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Answer 10 questions to get your home's health score and priority recommendations.</p>
        </div>

        {!submitted ? (
          <>
            {questions.map((q, qi) => (
              <div key={q.id} style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <p style={{ fontWeight: 600, marginBottom: 12, color: '#e2e8f0' }}>{qi + 1}. {q.label}</p>
                {q.options.map((opt, oi) => (
                  <label key={oi} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                    <input type="radio" name={q.id} checked={answers[q.id] === q.scores[oi]} onChange={() => setAnswers(prev => ({ ...prev, [q.id]: q.scores[oi] }))} />
                    <span style={{ color: '#cbd5e1' }}>{opt}</span>
                  </label>
                ))}
              </div>
            ))}
            <button
              onClick={() => answered === questions.length && setSubmitted(true)}
              style={{ width: '100%', padding: '14px', background: answered === questions.length ? '#F5E642' : '#334155', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 10, cursor: answered === questions.length ? 'pointer' : 'not-allowed' }}
            >
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Calculate My Score'}
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24 }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: rating.color }}>{percentage}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: rating.color }}>{rating.label}</div>
              <div style={{ color: '#94a3b8', marginTop: 8 }}>out of 100</div>
            </div>
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'left' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>Category Breakdown</h3>
              {categoryScores.map(c => (
                <div key={c.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#cbd5e1' }}>{c.label}</span>
                  <span style={{ color: c.score !== null && c.score <= 4 ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{c.score}/10</span>
                </div>
              ))}
            </div>
            {lowCategories.length > 0 && (
              <div style={{ background: '#1a0a0a', border: '1px solid #ef4444', borderRadius: 12, padding: 20, textAlign: 'left', marginBottom: 24 }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ Priority Recommendations</h3>
                {lowCategories.map(c => (
                  <div key={c.label} style={{ color: '#fca5a5', marginBottom: 6 }}>• Address your <strong>{c.label}</strong> — scored {c.score}/10</div>
                ))}
              </div>
            )}
            <button onClick={() => { setAnswers({}); setSubmitted(false); }} style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 10, cursor: 'pointer' }}>Retake Assessment</button>
          </div>
        )}
      </div>
    </div>
  );
}
