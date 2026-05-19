import { useState } from 'react';

const questions = [
  { q: 'Main pipe material?', opts: ['Copper (excellent)', 'CPVC / PEX (good)', 'Galvanized steel (aging)', 'Polybutylene (bad)'] },
  { q: 'Pipe age?', opts: ['Under 15 years', '15–30 years', '30–50 years', 'Over 50 or unknown'] },
  { q: 'Water pressure at fixtures?', opts: ['Good (40–80 psi)', 'Low (under 40 psi)', 'High (over 80 psi)', 'Unknown / varies a lot'] },
  { q: 'Thermal expansion tank on water heater?', opts: ['Yes — inspected', 'Yes — never inspected', 'None / not sure', 'Closed system with no tank'] },
  { q: 'Water softener or filter?', opts: ['Yes — maintained < 1 year', 'Yes — not maintained', 'None installed', 'Well water / unknown'] },
  { q: 'Water heater age?', opts: ['Under 6 years', '6–10 years', '10–15 years', 'Over 15 years'] },
  { q: 'Any slow drains?', opts: ['None', 'One fixture', '2–3 fixtures', 'Multiple or whole house slow'] },
  { q: 'Noticed any water stains on ceilings or walls?', opts: ['None', 'Old stain — repaired', 'Current stain — active', 'Multiple stains'] },
  { q: 'Outdoor hose bibs / irrigation shutoffs?', opts: ['All freeze-protected', 'Some protected', 'None protected', 'No outdoor plumbing'] },
  { q: 'Water heater anode rod condition?', opts: ['Replaced in last 5 years', 'Never replaced, under 8 yrs', 'Never replaced, over 8 yrs', 'Unknown'] },
  { q: 'Any visible pipe corrosion under sinks?', opts: ['None visible', 'Minor — surface only', 'Active corrosion / green stain', 'Unknown / not checked'] },
  { q: 'Foundation slab plumbing concern?', opts: ['No known issues', 'Minor settling — monitored', 'Known leak / repair history', 'Unknown — never inspected'] },
  { q: 'DFW hard water impact on fixtures?', opts: ['Regularly descaled', 'Some scaling visible', 'Heavy buildup on fixtures', 'Unknown'] },
  { q: 'Sewer clean-out accessible?', opts: ['Yes, marked and accessible', 'Think so / not sure', 'No visible clean-out', 'Recently serviced'] },
  { q: 'Last full plumbing inspection?', opts: ['Within 3 years', '3–10 years ago', 'At purchase only', 'Never / unknown'] },
];

const weights = [
  [0, 2, 12, 25], [0, 3, 10, 18], [0, 4, 8, 10],
  [0, 3, 8, 12], [0, 2, 8, 6], [0, 3, 8, 18],
  [0, 4, 8, 15], [0, 2, 15, 20], [0, 4, 10, 0],
  [0, 4, 10, 8], [0, 3, 12, 6], [0, 4, 15, 10],
  [0, 4, 10, 8], [0, 4, 8, 2], [0, 3, 8, 14],
];

function grade(score: number) {
  if (score <= 12) return { letter: 'A', label: 'Excellent', color: '#22C55E' };
  if (score <= 30) return { letter: 'B', label: 'Good', color: '#86EFAC' };
  if (score <= 55) return { letter: 'C', label: 'Fair — Schedule Service', color: '#F5E642′ };
  if (score <= 85) return { letter: 'D', label: 'Poor — Act Soon', color: '#F97316′ };
  return { letter: 'F', label: 'Failing — Immediate Action', color: '#EF4444′ };
}

export default function DFWPlumbingInspectionScore() {
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(-1));
  const [result, setResult] = useState<null | { score: number; grade: ReturnType<typeof grade>; priorities: string[]; dfwRisks: string[] }>(null);

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
    const dfwRisks: string[] = [];

    if (answers[0] === 3) priorities.push('🚨 Polybutylene pipe — recall material, replace immediately. Catastrophic failure risk.');
    if (answers[7] === 2) priorities.push('🔴 Active water stain indicates current leak — find source before mold sets in (DFW humidity accelerates mold growth)');
    if (answers[5] === 3) priorities.push('⚠️ Water heater over 15 years — DFW hard water deposits accelerate failure, replace proactively');
    if (answers[11] === 2) priorities.push('🏚️ Known slab leak history — pressure test annually. DFW clay movement stresses slab plumbing');
    if (answers[2] === 2) priorities.push('💧 High pressure — install PRV. DFW municipal pressure runs 90–110 psi in many areas, damaging fixtures');
    if (answers[3] === 3) priorities.push('⚡ Closed system without expansion tank — thermal expansion will damage water heater and PRV');
    if (priorities.length === 0) priorities.push('✅ No critical issues — maintain current schedule');

    dfwRisks.push(answers[12] >= 2 ? '💎 Hard Water: Significant mineral buildup detected — accelerating fixture and appliance wear' : '💎 Hard Water: DFW water averages 250–400 ppm hardness. Monitor annually.');
    dfwRisks.push(answers[11] >= 1 ? '🏗️ Clay Soil: Slab movement history noted — inspect foundation plumbing every 3 years' : '🏗️ Clay Soil: DFW Blackland Prairie clay expands 4–6″ seasonally — slab plumbing at moderate risk');

    setResult({ score, grade: g, priorities, dfwRisks });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🔧 Plumbing Inspection Score</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>15-question DFW plumbing assessment — hard water risk, clay soil impact, and priority actions.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          {questions.map((item, qi) => (
            <div key={qi} style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{qi + 1}. {item.q}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {item.opts.map((opt, ai) => (
                  <button key={ai} onClick={() => setAnswer(qi, ai)} style={{ background: answers[qi] === ai ? '#F5E642′ : '#1A3050', color: answers[qi] === ai ? '#0A1628' : '#E8F0FE', border: '1px solid #2A4060', borderRadius: 6, padding: '0.5rem 0.75rem', cursor: ’pointer', fontSize: '0.82rem', textAlign: 'left', fontWeight: answers[qi] === ai ? 700 : 400 }}>
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
              <div style={{ color: '#94A3B8', marginTop: '0.25rem' }}>Risk Score: {result.score} / 192</div>
            </div>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>Priority Actions</h3>
            {result.priorities.map((p, i) => <div key={i} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{p}</div>)}
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem', marginTop: '1rem' }}>DFW-Specific Risk Factors</h3>
            {result.dfwRisks.map((r, i) => <div key={i} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{r}</div>)}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Plumbing Inspection Score · Informational only — get a licensed plumber for official assessment</div>
      </div>
    </div>
  );
}
