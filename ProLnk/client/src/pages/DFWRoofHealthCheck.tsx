import { useState } from 'react';

const questions = [
  { id: 'age', label: 'How old is your current roof?', options: ['Under 5 years', '5–10 years', '11–18 years', 'Over 18 years'], scores: [12, 10, 6, 2] },
  { id: 'inspection', label: 'When was your last roof inspection?', options: ['Within the last 2 years', '3–5 years ago', 'At purchase only', 'Never or unknown'], scores: [12, 8, 5, 2] },
  { id: 'shingles', label: 'Visible shingle damage (curling, cracking, missing)?', options: ['No visible damage', 'Minor edge curling on a few shingles', 'Noticeable damage in one area', 'Missing shingles or widespread damage'], scores: [12, 9, 5, 1] },
  { id: 'granules', label: 'Granule loss in gutters or downspouts?', options: ['No granules noticed', 'Small amount after major storm', 'Regular amount after rain', 'Heavy granule loss consistently'], scores: [12, 9, 5, 2] },
  { id: 'stains', label: 'Interior water stains on ceilings or in attic?', options: ['No stains anywhere', 'Old stain, repaired', 'Active stain in one area', 'Multiple stains or ongoing leaks'], scores: [12, 8, 4, 1] },
  { id: 'hail', label: 'Major hail events since roof installation?', options: ['None that I know of', 'One minor event', 'One or more significant hail events', 'Multiple major hail storms'], scores: [12, 9, 5, 2] },
  { id: 'ventilation', label: 'Attic ventilation status?', options: ['Good — ridge vents and soffit vents', 'Some venting but not ideal', 'Minimal ventilation', 'No ventilation or unknown'], scores: [12, 9, 5, 2] },
  { id: 'flashing', label: 'Condition of flashing around chimney, vents, and skylights?', options: ['Inspected and in good shape', 'Appears fine but not recently inspected', 'Visible rust or gaps', 'Missing flashing or significant damage'], scores: [12, 8, 4, 1] },
];

const getClaimWorthiness = (pct: number, hailScore: number) => {
  if (hailScore <= 5 && pct < 70) return { worthy: true, note: 'Hail damage + multiple concerns — an insurance inspection is strongly recommended.' };
  if (pct < 60) return { worthy: true, note: 'Multiple factors suggest an insurance inspection or public adjuster review may be worthwhile.' };
  return { worthy: false, note: 'Your roof appears to be in good condition relative to insurance claims.' };
};

const getUrgency = (pct: number) => {
  if (pct >= 85) return { label: 'Low — Annual visual check sufficient', color: '#22c55e' };
  if (pct >= 65) return { label: 'Moderate — Schedule inspection within 6 months', color: '#f59e0b' };
  if (pct >= 45) return { label: 'High — Schedule inspection within 30 days', color: '#f97316' };
  return { label: 'Critical — Contact a roofer immediately', color: '#ef4444' };
};

export default function DFWRoofHealthCheck() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 12;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const answered = Object.keys(answers).length;
  const urgency = getUrgency(percentage);
  const claim = getClaimWorthiness(percentage, answers['hail'] ?? 12);

  const recs: Record<string, string> = {
    age: 'DFW roofs typically last 20–25 years — budget for replacement if over 18 years',
    inspection: 'DFW hail storms make annual inspections essential — especially after spring storms',
    shingles: 'Missing or damaged shingles are active leak pathways — repair immediately',
    granules: 'Heavy granule loss accelerates shingle degradation — have a roofer evaluate',
    stains: 'Active ceiling stains mean active water intrusion — call a roofer today',
    hail: 'File a claim within 1 year of a major hail event — DFW insurers require prompt reporting',
    ventilation: 'Poor ventilation traps heat, shortens shingle life, and increases energy costs',
    flashing: 'Failed flashing around penetrations is the #1 cause of roof leaks — repair now',
  };

  const lowItems = questions.filter(q => (answers[q.id] ?? 12) <= 5);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏚️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Roof Health Check</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>DFW leads the nation in hail damage claims. Know where your roof stands before the next storm.</p>
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
              {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My Roof Score'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: urgency.color }}>{percentage}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: urgency.color }}>{urgency.label}</div>
            </div>
            <div style={{ background: claim.worthy ? '#1a0a0a' : '#0a1a0a', border: `1px solid ${claim.worthy ? '#f59e0b' : '#22c55e'}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: claim.worthy ? '#f59e0b' : '#22c55e', marginBottom: 8 }}>🛡️ Insurance Claim Worthiness</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{claim.note}</p>
            </div>
            {lowItems.length > 0 && (
              <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔨 Priority Actions</h3>
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
