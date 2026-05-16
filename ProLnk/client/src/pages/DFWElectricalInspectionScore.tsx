import { useState } from 'react';

const questions = [
  { q: 'Panel brand?', opts: ['Square D / Siemens / Eaton (good)', 'Federal Pacific / Zinsco / Pushmatic (bad)', 'GE / Cutler-Hammer (ok)', 'Unknown'] },
  { q: 'Panel age?', opts: ['Under 10 years', '10–25 years', '25–40 years', 'Over 40 years'] },
  { q: 'Service size?', opts: ['200A or more', '150A', '100A', 'Under 100A or unknown'] },
  { q: 'Any double-tapped breakers?', opts: ['No / not visible', 'Yes — 1 or 2', 'Yes — several', 'Unknown'] },
  { q: 'GFCI outlets in kitchen and baths?', opts: ['Yes, all tested monthly', 'Yes but never tested', 'Some missing', 'None / unknown'] },
  { q: 'AFCI breakers installed?', opts: ['Yes — all bedroom circuits', 'Some circuits', 'None', 'Unknown'] },
  { q: 'Wiring material in home?', opts: ['Copper throughout', 'Copper + some aluminum', 'Aluminum branch circuit (pre-1973)', 'Knob-and-tube or unknown'] },
  { q: 'Outdoor outlets weatherproof?', opts: ['Yes, all GFCI and covered', 'Some covered', 'None covered', 'No outdoor outlets'] },
  { q: 'Smoke detectors working?', opts: ['All tested in 6 months', 'Some tested', 'Not tested / unsure', 'Missing in bedrooms'] },
  { q: 'Attic wiring condition?', opts: ['Inspected recently — good', 'Not inspected but home under 20 yrs', 'Not inspected, home 20+ yrs', 'Visible damage or rodents'] },
  { q: 'Breakers tripping in past year?', opts: ['None', '1–2 times', '3–5 times', 'Frequently'] },
  { q: 'Any outlets warm or discolored?', opts: ['None', 'One outlet', '2–3 outlets', 'Multiple or unknown'] },
  { q: 'Surge protection?', opts: ['Whole-home + point-of-use', 'Whole-home panel SPD only', 'Power strips only', 'None'] },
  { q: 'EV charger or major load added in last 5 yrs?', opts: ['Permitted and inspected', 'Installed, no permit', 'Planning to add', 'No major additions'] },
  { q: 'Last full electrical inspection?', opts: ['Within 5 years', '5–15 years ago', 'At purchase only', 'Never / unknown'] },
];

const weights = [
  [0, 20, 8, 12], [0, 4, 10, 20], [0, 4, 8, 15],
  [0, 5, 12, 6], [0, 3, 7, 12], [0, 3, 8, 10],
  [0, 6, 15, 20], [0, 3, 7, 0], [0, 2, 6, 10],
  [0, 3, 8, 20], [0, 2, 5, 12], [0, 4, 8, 12],
  [0, 2, 6, 10], [0, 4, 10, 2], [0, 3, 7, 12],
];

function grade(score: number) {
  if (score <= 10) return { letter: 'A', label: 'Excellent', color: '#22C55E' };
  if (score <= 25) return { letter: 'B', label: 'Good', color: '#86EFAC' };
  if (score <= 50) return { letter: 'C', label: 'Fair — Action Recommended', color: '#F5E642' };
  if (score <= 80) return { letter: 'D', label: 'Poor — Immediate Attention', color: '#F97316' };
  return { letter: 'F', label: 'Failing — Urgent Risk', color: '#EF4444' };
}

export default function DFWElectricalInspectionScore() {
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(-1));
  const [result, setResult] = useState<null | { score: number; grade: ReturnType<typeof grade>; priorities: string[] }>(null);

  function setAnswer(qi: number, ai: number) {
    const next = [...answers];
    next[qi] = ai;
    setAnswers(next);
  }

  function calculate() {
    if (answers.some(a => a === -1)) return;
    const score = answers.reduce((sum, ai, qi) => sum + weights[qi][ai], 0);
    const g = grade(score);
    const priorities: string[] = [];
    if (answers[0] === 1) priorities.push('🚨 Replace Federal Pacific / Zinsco / Pushmatic panel immediately — known failure risk');
    if (answers[6] === 2) priorities.push('⚠️ Aluminum branch wiring requires anti-oxidant treatment and CO/ALR outlets');
    if (answers[6] === 3) priorities.push('🚨 Knob-and-tube wiring must be evaluated for replacement — no ground, fire risk');
    if (answers[2] === 3) priorities.push('⚡ Under-100A service is insufficient for modern DFW home — upgrade to 200A');
    if (answers[9] === 3) priorities.push('🔥 Visible attic wiring damage in DFW heat — inspect and repair immediately');
    if (answers[11] === 3) priorities.push('🔴 Multiple warm outlets indicate overloaded circuits or loose connections');
    if (priorities.length === 0) priorities.push('✅ No critical priorities — schedule routine inspection within 5 years');
    setResult({ score, grade: g, priorities });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>📋 Electrical Inspection Score</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>15-question assessment for DFW homes — get your score, grade, and priority action list.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          {questions.map((item, qi) => (
            <div key={qi} style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {item.opts.map((opt, ai) => (
                  <button key={ai} onClick={() => setAnswer(qi, ai)} style={{ background: answers[qi] === ai ? '#F5E642' : '#1A3050', color: answers[qi] === ai ? '#0A1628' : '#E8F0FE', border: '1px solid #2A4060', borderRadius: 6, padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '0.82rem', textAlign: 'left', fontWeight: answers[qi] === ai ? 700 : 400 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', width: '100%', marginTop: '0.5rem' }}>Calculate My Score</button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: result.grade.color }}>{result.grade.letter}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: result.grade.color }}>{result.grade.label}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.25rem' }}>Risk Score: {result.score} / 188</div>
            </div>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>Priority Actions</h3>
            {result.priorities.map((p, i) => (
              <div key={i} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{p}</div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Electrical Inspection Score · Score is informational only — get a licensed inspection for official assessment</div>
      </div>
    </div>
  );
}
