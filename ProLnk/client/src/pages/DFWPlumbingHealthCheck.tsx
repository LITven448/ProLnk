import { useState } from 'react';

const questions = [
  { id: 'pipes', label: 'What type of pipes does your home likely have?', options: ['PEX or copper (built after 1990)', 'Copper (built 1960–1990)', 'Galvanized steel (built before 1960)', 'Polybutylene (gray plastic, 1978–1995)'], scores: [12, 9, 4, 2] },
  { id: 'pressure', label: 'How is your water pressure?', options: ['Strong and consistent', 'Slightly weak in one fixture', 'Noticeably low throughout', 'Very low or fluctuates constantly'], scores: [12, 9, 5, 2] },
  { id: 'drains', label: 'Do drains empty slowly?', options: ['All drains are fast', 'One drain is slightly slow', 'Multiple slow drains', 'Drains back up regularly'], scores: [12, 9, 5, 1] },
  { id: 'color', label: 'Have you noticed water discoloration?', options: ['Always clear', 'Slight brownish tint initially after not using', 'Regularly discolored', 'Yellow, brown, or rust-colored often'], scores: [12, 8, 4, 1] },
  { id: 'bills', label: 'Has your water bill spiked unexpectedly?', options: ['Consistent and expected', 'Slightly higher one month', 'Noticeably higher for 2+ months', 'Major unexplained spike'], scores: [12, 9, 5, 2] },
  { id: 'sounds', label: 'Do you hear sounds in walls (banging, rushing water, dripping)?', options: ['No sounds', 'Occasional water hammer when valve closes', 'Regular sounds when no water is in use', 'Frequent or loud sounds in walls'], scores: [12, 9, 4, 1] },
  { id: 'heater', label: 'How old is your water heater?', options: ['Under 5 years', '5–10 years', '11–15 years', 'Over 15 years or unknown'], scores: [12, 10, 6, 2] },
  { id: 'outdoor', label: 'Condition of outdoor hose bibs and irrigation connections?', options: ['Good condition, no leaks', 'Minor drip at one connection', 'Visible leaks or rust', 'Have not inspected them'], scores: [12, 9, 4, 6] },
];

const getHardWaterRisk = () => 'High — DFW water is among the hardest in the US (300–500 ppm). Expect scale buildup in water heater, pipes, and appliances without filtration.';

const getRisk = (pct: number) => {
  if (pct >= 85) return { label: 'Good Shape', color: '#22c55e' };
  if (pct >= 65) return { label: 'Moderate Concern', color: '#f59e0b' };
  if (pct >= 45) return { label: 'Needs Attention', color: '#f97316' };
  return { label: 'Urgent Action Needed', color: '#ef4444' };
};

export default function DFWPlumbingHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 12;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const answered = Object.keys(answers).length;
  const risk = getRisk(percentage);

  const recs: Record<string, string> = {
    pipes: 'Galvanized and polybutylene pipes should be replaced — known failure points',
    pressure: 'Low pressure often means corroded pipes or a pressure regulator issue',
    drains: 'Multiple slow drains indicate a sewer line issue — call a plumber',
    color: 'Rust-colored water means corroding pipes — test your water immediately',
    bills: 'A spike could mean a slab leak — have a plumber do a pressure test',
    sounds: 'Sounds in walls with no active use is a red flag — check for slab leaks',
    heater: 'Water heaters over 12 years old are near end of life — replace proactively',
    outdoor: 'Inspect hose bibs annually — small leaks compound quickly',
  };

  const lowItems = questions.filter(q => (answers[q.id] ?? 12) <= 5);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Plumbing Health Check</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>DFW's hard water and aging infrastructure creates unique plumbing risks. Check yours now.</p>
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
            <button onClick={() => answered === questions.length && setSubmitted(true)} style={{ width: '100%', padding: '14px', background: answered === questions.length ? '#F5E642' : '#334155', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 10, cursor: answered === questions.length ? 'pointer' : 'not-allowed' }}>
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My Plumbing Score'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: risk.color }}>{percentage}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: risk.color }}>{risk.label}</div>
            </div>
            <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 8 }}>💧 DFW Hard Water Risk</h3>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{getHardWaterRisk()}</p>
            </div>
            {lowItems.length > 0 && (
              <div style={{ background: '#0f1a2e', border: '1px solid #ef4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h3 style={{ color: '#ef4444', marginBottom: 12 }}>🔧 Priority Actions</h3>
                {lowItems.map(q => <div key={q.id} style={{ color: '#cbd5e1', marginBottom: 8 }}>• {recs[q.id]}</div>)}
              </div>
            )}
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              {questions.map(q => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{q.label}</span>
                  <span style={{ color: (answers[q.id] ?? 0) <= 5 ? '#ef4444' : '#22c55e', fontWeight: 600 }}>{answers[q.id]}/12</span>
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
