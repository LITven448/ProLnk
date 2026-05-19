import { useState } from 'react';

const questions = [
  { id: 'cracks', label: 'Visible wall/floor cracks?', options: ['None', 'Hairline only', 'Moderate (<1/4″)', 'Wide (>1/4″)'] },
  { id: 'pattern', label: 'Crack pattern type?', options: ['None', 'Vertical', 'Diagonal/Stair-step', 'Horizontal'] },
  { id: 'movement', label: 'Differential movement observed?', options: ['None', 'Slight', 'Moderate', 'Severe'] },
  { id: 'doors', label: 'Doors/windows sticking or misaligned?', options: ['Never', 'Occasionally', 'Frequently', 'Always'] },
  { id: 'floors', label: 'Floor levelness?', options: ['Level', 'Slight slope', 'Noticeable slope', 'Severe slope'] },
  { id: 'watering', label: 'Foundation watering consistency?', options: ['Year-round system', 'Manual but consistent', 'Inconsistent', 'Never water'] },
  { id: 'drainage', label: 'Drainage away from foundation?', options: ['Excellent', 'Good', 'Fair', 'Poor/pooling'] },
  { id: 'gutters', label: 'Gutters and downspouts working?', options: ['Yes, extended away', 'Yes, no extension', 'Partial', 'Missing/broken'] },
  { id: 'trees', label: 'Tree proximity to foundation?', options: ['None within 20ft', '20-30ft', '10-20ft', 'Within 10ft'] },
  { id: 'plumbing', label: 'Any known plumbing leaks under slab?', options: ['None known', 'Repaired', 'Suspected', 'Active leak'] },
  { id: 'repairs', label: 'Prior foundation repairs?', options: ['None needed', 'Minor cosmetic', 'Pier installation', 'Major structural'] },
  { id: 'warranty', label: 'Repair warranty status?', options: ['Active warranty', 'Expired warranty', 'No repairs done', 'No warranty'] },
  { id: 'age', label: 'Home age?', options: ['<10 years', '10-25 years', '25-50 years', '>50 years'] },
  { id: 'soil', label: 'Expansive clay soil indicators visible?', options: ['None', 'Minor shrinkage', 'Moderate cracking', 'Severe upheaval'] },
  { id: 'inspection', label: 'Last professional inspection?', options: ['<1 year', '1-3 years', '3-5 years', 'Never/unknown'] },
];

const weights = [0, 1, 2, 3];

export default function DFWFoundationInspectionScore() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; risk: string; actions: string[] } | null>(null);

  const allAnswered = Object.keys(answers).length === questions.length;

  function calculate() {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const max = questions.length * 3;
    const score = Math.round(100 - (total / max) * 100);
    const risk = total <= 10 ? 'Low DFW Clay Risk' : total <= 25 ? 'Moderate Clay Expansion Risk' : 'High Structural Risk — Clay Soil Alert';
    const actions: string[] = [];
    if (answers['watering'] >= 2) actions.push('Install soaker hose system — DFW clay requires consistent moisture year-round');
    if (answers['drainage'] >= 2) actions.push('Regrade soil to ensure 6″ drop in first 10ft from foundation');
    if (answers['trees'] >= 2) actions.push('Root barrier installation or tree removal consultation needed');
    if (answers['cracks'] >= 2) actions.push('Schedule licensed foundation inspector within 30 days');
    if (answers['plumbing'] >= 2) actions.push('Slab leak detection test — common DFW cause of foundation failure');
    if (actions.length === 0) actions.push('Maintain current watering schedule', 'Annual inspection recommended', 'Monitor for seasonal movement each spring/fall');
    setResult({ score, risk, actions });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>🏠 DFW HOME HEALTH</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Foundation Inspection Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>15-question assessment calibrated for North Texas expansive clay soil conditions.</p>
        </div>

        {questions.map((q, qi) => (
          <div key={q.id} style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
            <p style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{qi + 1}. {q.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map((opt, oi) => (
                <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: weights[oi] }))}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                    borderColor: answers[q.id] === weights[oi] ? '#F5E642′ : '#1e3a5f',
                    background: answers[q.id] === weights[oi] ? 'rgba(245,230,66,0.12)' : 'transparent',
                    color: answers[q.id] === weights[oi] ? '#F5E642′ : '#94a3b8',
                    cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate} disabled={!allAnswered}
          style={{ width: '100%', padding: '16px', background: allAnswered ? '#F5E642′ : '#1e3a5f',
            color: allAnswered ? '#0A1628′ : '#4a6080', border: ’none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: allAnswered ? 'pointer' : 'not-allowed', marginTop: 8 }}>
          {allAnswered ? 'Calculate Foundation Score →' : `Answer ${questions.length - Object.keys(answers).length} more question(s)`}
        </button>

        {result && (
          <div style={{ marginTop: 24, background: '#0f1f3a', borderRadius: 16, padding: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: result.score >= 70 ? '#22c55e' : result.score >= 45 ? '#f59e0b' : '#ef4444′ }}>
                {result.score}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Foundation Health Score</div>
              <div style={{ display: 'inline-block', background: 'rgba(245,230,66,0.15)', color: '#F5E642', padding: '6px 16px', borderRadius: 20, fontSize: 13 }}>
                ⚠️ {result.risk}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 Priority Actions</div>
              {result.actions.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span>{a}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
