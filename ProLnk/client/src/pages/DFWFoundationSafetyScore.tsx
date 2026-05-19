import { useState } from 'react';

const questions = [
  { id: 1, text: 'Have you observed cracks in interior drywall or plaster?', options: ['None', 'Hairline — cosmetic only', 'Diagonal at corners', 'Wide stair-step or horizontal'], scores: [10, 7, 3, 0] },
  { id: 2, text: 'Do you have a foundation watering system or routine?', options: ['Yes — consistent year-round', 'Seasonal only', 'Rarely or never', 'No landscaping near foundation'], scores: [10, 6, 2, 8] },
  { id: 3, text: 'How does water drain away from your foundation?', options: ['Slopes away on all sides', 'Mostly slopes away', 'Flat or toward foundation', 'Pooling occurs'], scores: [10, 7, 2, 0] },
  { id: 4, text: 'How close are trees to your foundation?', options: ['Over 20 ft away', '10–20 ft', '5–10 ft', 'Under 5 ft or root evidence'], scores: [10, 7, 3, 0] },
  { id: 5, text: 'Has the foundation had prior pier repairs?', options: ['No repairs needed', 'Repaired — with warranty', 'Repaired — no warranty', 'Unsure'], scores: [10, 7, 4, 5] },
  { id: 6, text: 'Do you have an active foundation warranty?', options: ['Yes — transferable', 'Yes — non-transferable', 'Expired', 'None / never repaired'], scores: [10, 7, 3, 6] },
  { id: 7, text: 'Do interior doors stick or fail to close properly?', options: ['None', 'One occasionally', 'Multiple doors', 'Most doors affected'], scores: [10, 6, 2, 0] },
  { id: 8, text: 'Do windows stick or show gaps in their frames?', options: ['No issues', 'One window', 'Several windows', 'Most windows affected'], scores: [10, 7, 3, 0] },
  { id: 9, text: 'Have you noticed exterior brick cracks or separation?', options: ['None', 'Hairline in mortar', 'Stair-step cracks', 'Wide gaps or bowing'], scores: [10, 7, 3, 0] },
  { id: 10, text: 'How old is your home?', options: ['Under 10 years', '10–25 years', '25–40 years', 'Over 40 years'], scores: [10, 7, 5, 3] },
  { id: 11, text: 'Have you had a professional foundation inspection?', options: ['Within 2 years', '2–5 years ago', 'Never', 'Unsure'], scores: [10, 6, 2, 4] },
  { id: 12, text: 'Is there a sump pump or interior drainage system?', options: ['Yes — functioning', 'Installed — unknown status', 'Not installed', 'Not applicable'], scores: [10, 6, 5, 8] },
  { id: 13, text: 'Do gutters and downspouts direct water away from the foundation?', options: ['Yes — extended 6+ ft', 'Ends at foundation edge', 'No gutters', 'Directed toward foundation'], scores: [10, 5, 3, 0] },
  { id: 14, text: 'Are crawl spaces or pier-and-beam areas dry and accessible?', options: ['Dry and inspected', 'Dry — not inspected', 'Moisture present', 'Slab foundation'], scores: [10, 6, 1, 8] },
  { id: 15, text: 'Has your home experienced significant drought periods recently?', options: ['No notable droughts', 'Mild drought last 2 years', 'Severe drought — no watering', 'Severe — foundation movement noted'], scores: [10, 6, 2, 0] },
];

export default function DFWFoundationSafetyScore() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const pct = Math.round((totalScore / maxScore) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 75 ? 'B' : pct >= 60 ? 'C' : pct >= 45 ? 'D' : 'F';
  const gradeColor = pct >= 90 ? '#22c55e' : pct >= 75 ? '#84cc16' : pct >= 60 ? '#eab308' : pct >= 45 ? '#f97316' : '#ef4444';

  const clayRisk = pct >= 75 ? 'Managed' : pct >= 55 ? 'Elevated' : 'Critical';
  const clayColor = clayRisk === 'Managed' ? '#22c55e' : clayRisk === 'Elevated' ? '#eab308' : '#ef4444';

  const dfwRisks = [
    answers[2] <= 2 && 'Inconsistent watering — DFW expansive clay soil (CH classification) shrinks in drought, swells in rain',
    answers[3] <= 2 && 'Poor drainage — DFW flash flood events saturate clay, causing upward heave',
    answers[4] <= 3 && 'Trees too close — Live oak and cedar roots in North Texas are among the most aggressive',
    answers[15] <= 2 && 'Recent severe drought — DFW 2022–2023 drought caused record foundation movement claims',
  ].filter(Boolean);

  const priorities = questions.filter(q => (answers[q.id] ?? 10) < 5).map(q => q.text);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0' }}>DFW Foundation Safety Score</h1>
          <p style={{ color: '#94a3b8' }}>15-question clay soil foundation assessment</p>
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
                <span style={{ color: '#94a3b8' }}>Clay Soil Risk: </span>
                <span style={{ color: clayColor, fontWeight: 700 }}>{clayRisk}</span>
              </div>
            </div>
            {dfwRisks.length > 0 && (
              <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, marginBottom: 16, textAlign: 'left' }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>⚠️ DFW Clay Soil Risks</h3>
                {dfwRisks.map((r, i) => <p key={i} style={{ color: '#fca5a5', marginBottom: 8 }}>• {r}</p>)}
              </div>
            )}
            {priorities.length > 0 && (
              <div style={{ background: '#0f2038', borderRadius: 12, padding: 20, textAlign: 'left' }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 Priority Monitoring / Repairs</h3>
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
