import { useState } from 'react';

const questions = [
  { id: 'panelAge', label: 'How old is your electrical panel?', options: ['Under 15 years', '15–25 years', '26–40 years', 'Over 40 years or unknown'], scores: [12, 9, 5, 2] },
  { id: 'panelBrand', label: 'Do you know your panel brand?', options: ['Siemens, Square D, or Eaton', 'Leviton or Murray', 'Federal Pacific or Zinsco', 'Unknown'], scores: [12, 10, 2, 8] },
  { id: 'flickering', label: 'Do you experience flickering or dimming lights?', options: ['Never', 'Rarely and briefly', 'Regularly in one area', 'Frequent throughout home'], scores: [12, 9, 5, 2] },
  { id: 'breakers', label: 'How often do breakers trip?', options: ['Never or rarely', 'A few times per year', 'Monthly', 'Weekly or more'], scores: [12, 9, 5, 1] },
  { id: 'smell', label: 'Have you noticed a burning smell near outlets or panel?', options: ['Never', 'Once or twice, long ago', 'Occasionally', 'Recently or ongoing'], scores: [12, 8, 4, 1] },
  { id: 'hotOutlets', label: 'Do any outlets feel warm or hot to the touch?', options: ['No outlets feel warm', 'One outlet once', 'A few outlets warm', 'Multiple hot outlets'], scores: [12, 9, 5, 1] },
  { id: 'aluminum', label: 'Suspicion of aluminum branch wiring (pre-1972 home)?', options: ['Confirmed copper only', 'Home built after 1975', 'Home built 1965–1975, unknown wiring', 'Confirmed or suspected aluminum wiring'], scores: [12, 12, 5, 2] },
  { id: 'gfci', label: 'Are GFCI outlets present in bathrooms, kitchen, and garage?', options: ['Yes, confirmed in all wet areas', 'In most areas', 'Only one or two', 'None that I know of'], scores: [12, 9, 5, 2] },
];

const getRisk = (pct: number) => {
  if (pct >= 85) return { label: 'Low Risk', color: '#22c55e', action: 'Schedule a routine panel inspection every 5 years.' };
  if (pct >= 65) return { label: 'Moderate Risk', color: '#f59e0b', action: 'Book an electrical inspection — address panel age or GFCI gaps.' };
  if (pct >= 45) return { label: 'Elevated Risk', color: '#f97316', action: 'Call a licensed electrician within 30 days. Multiple concerns flagged.' };
  return { label: 'High Risk 🚨', color: '#ef4444', action: 'Contact a licensed electrician immediately. Potential fire or shock hazard.' };
};

export default function DFWElectricalHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 12;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const answered = Object.keys(answers).length;
  const risk = getRisk(percentage);

  const recs: Record<string, string> = {
    panelAge: 'Panels over 25 years should be inspected by a licensed electrician',
    panelBrand: 'Federal Pacific and Zinsco panels have known defects — replace immediately',
    flickering: 'Flickering lights can indicate loose connections or overloaded circuits',
    breakers: 'Frequent tripping means circuits are overloaded or breakers are failing',
    smell: 'Burning smell is a fire hazard — call an electrician today',
    hotOutlets: 'Hot outlets indicate wiring issues — unplug devices and call an electrician',
    aluminum: 'Aluminum wiring requires special connectors or rewiring — consult an electrician',
    gfci: 'GFCI outlets are required by code in wet areas — install immediately',
  };

  const lowItems = questions.filter(q => (answers[q.id] ?? 12) <= 5);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Electrical Health Check</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Electrical issues are the #2 cause of house fires. Check your risk in 2 minutes.</p>
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
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My Electrical Score'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: risk.color }}>{percentage}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: risk.color }}>{risk.label}</div>
              <p style={{ color: '#94a3b8', marginTop: 12, fontSize: 15 }}>{risk.action}</p>
            </div>
            {lowItems.length > 0 && (
              <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>⚡ Priority Actions</h3>
                {lowItems.map(q => <div key={q.id} style={{ color: '#cbd5e1', marginBottom: 8 }}>• {recs[q.id]}</div>)}
              </div>
            )}
            <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>Score Breakdown</h3>
              {questions.map(q => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{q.label}</span>
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
