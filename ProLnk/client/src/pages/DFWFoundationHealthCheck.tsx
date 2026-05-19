import { useState } from 'react';

const questions = [
  { id: 'cracks', label: 'Visible cracks in walls or foundation?', options: ['None visible', 'Hairline cracks only', 'Cracks wider than 1/4 inch', 'Stair-step or horizontal cracks'], scores: [10, 7, 4, 1] },
  { id: 'crackLocation', label: 'Where are cracks located?', options: ['No cracks', 'Interior drywall only', 'Exterior brick or block', 'Foundation slab or stem wall'], scores: [10, 8, 5, 1] },
  { id: 'doors', label: 'Do interior doors align properly?', options: ['All doors open and close perfectly', 'Minor sticking in one area', 'Multiple doors sticking', 'Doors will not close or have large gaps'], scores: [10, 7, 4, 1] },
  { id: 'windows', label: 'Do windows open and close easily?', options: ['All windows work freely', 'One or two sticky', 'Several windows stuck or difficult', 'Windows cracked or frames warped'], scores: [10, 7, 4, 1] },
  { id: 'floors', label: 'Are floors level throughout the home?', options: ['Floors feel flat and even', 'Slight slope in one area', 'Noticeable sloping or bouncing', 'Visible humps, dips, or separation'], scores: [10, 7, 4, 1] },
  { id: 'drainage', label: 'Drainage and grading around foundation?', options: ['Water drains away from home', 'Mostly good, some flat spots', 'Water pools near foundation after rain', 'Water consistently collects against foundation'], scores: [10, 8, 4, 1] },
  { id: 'watering', label: 'Do you maintain consistent foundation watering in DFW summers?', options: ['Yes, soaker hose system in place', 'Occasional manual watering', 'Rarely water the foundation', 'Never — did not know this was needed'], scores: [10, 7, 4, 2] },
  { id: 'trees', label: 'Large trees within 15 feet of foundation?', options: ['No large trees nearby', 'One small tree at distance', 'One or more large trees close by', 'Multiple large trees very close'], scores: [10, 8, 5, 2] },
  { id: 'repairs', label: 'Has foundation repair been done before?', options: ['No repairs needed', 'Minor cosmetic repair', 'Pier or beam repair done professionally', 'Multiple repairs or ongoing issues'], scores: [10, 8, 4, 1] },
  { id: 'engineer', label: 'Has a structural engineer ever evaluated the foundation?', options: ['Evaluated and passed', 'Evaluated with minor notes', 'Never evaluated', 'Evaluated and had significant findings'], scores: [10, 7, 5, 1] },
];

export default function DFWFoundationHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const answered = Object.keys(answers).length;

  const getRisk = (pct: number) => {
    if (pct >= 85) return { label: 'Low Risk', color: '#22c55e', needsEngineer: false };
    if (pct >= 65) return { label: 'Moderate Risk', color: '#f59e0b', needsEngineer: false };
    if (pct >= 45) return { label: 'Elevated Risk', color: '#f97316', needsEngineer: true };
    return { label: 'High Risk', color: '#ef4444', needsEngineer: true };
  };

  const risk = getRisk(percentage);
  const lowItems = questions.filter(q => (answers[q.id] ?? 10) <= 4);

  const recs: Record<string, string> = {
    cracks: 'Document crack width and location — monitor over 30 days',
    crackLocation: 'Exterior or slab cracks need structural evaluation',
    doors: 'Multiple sticking doors is a classic DFW foundation warning sign',
    windows: 'Warped frames may indicate movement — get evaluated',
    floors: 'Sloping floors in DFW clay soil often mean pier settlement',
    drainage: 'Regrade soil to slope away from foundation at least 6 inches over 10 feet',
    watering: 'Install a soaker hose on a timer — DFW clay expands and contracts dramatically',
    trees: 'Consider root barriers or removal of trees close to the slab',
    repairs: 'Document prior repairs and share with any inspector or buyer',
    engineer: 'A structural engineer evaluation costs $300–500 and is worth it',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Foundation Health Check</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>DFW's expansive clay soil is the #1 cause of foundation problems in Texas. Check yours now.</p>
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
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My Foundation Score'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: risk.color }}>{percentage}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: risk.color }}>{risk.label}</div>
              {risk.needsEngineer && <div style={{ marginTop: 12, background: '#ef444420', border: '1px solid #ef4444', borderRadius: 8, padding: '8px 16px', color: '#fca5a5', fontSize: 14 }}>⚠️ Structural engineer evaluation recommended</div>}
            </div>
            {lowItems.length > 0 && (
              <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔩 Priority Actions</h3>
                {lowItems.map(q => <div key={q.id} style={{ color: '#cbd5e1', marginBottom: 8 }}>• {recs[q.id]}</div>)}
              </div>
            )}
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              {questions.map(q => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{q.label}</span>
                  <span style={{ color: (answers[q.id] ?? 0) <= 4 ? '#ef4444′ : '#22c55e', fontWeight: 600 }}>{answers[q.id]}/10</span>
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
