import { useState } from 'react';

const questions = [
  { q: 'Shingle age?', opts: ['Under 8 years', '8–15 years', '15–20 years', 'Over 20 years'] },
  { q: 'Shingle type?', opts: ['Class 4 impact resistant', 'Class 3 impact resistant', 'Standard 3-tab', 'Unknown / original'] },
  { q: 'Ridge cap condition?', opts: ['New or excellent', 'Intact but aging', 'Cracked or lifting', 'Missing sections'] },
  { q: 'Flashing condition (chimney, vents, edges)?', opts: ['Sealed and intact', 'Minor gaps — monitored', 'Active gaps or rust', 'No visible flashing'] },
  { q: 'Attic ventilation?', opts: ['Ridge + soffit vents — clear', 'Some vents — not fully clear', 'Vents blocked or insufficient', 'Unknown / no attic access'] },
  { q: 'Any visible granule loss?', opts: ['None observed', 'Minor — normal wear', 'Significant bald spots', 'Heavy — bare mat showing'] },
  { q: 'Gutters and downspouts?', opts: ['Clean — last 6 months', 'Clean — over 1 year ago', 'Partial clogs visible', 'Overflowing or damaged'] },
  { q: 'Fascia and soffit condition?', opts: ['Good — no rot', 'Minor soft spots', 'Active rot in one area', 'Extensive rot or damage'] },
  { q: 'Visible roof sag or waviness?', opts: ['None — flat plane', 'Slight — possibly normal', 'Clear sag — one area', 'Multiple areas sagging'] },
  { q: 'History of hail damage?', opts: ['None known', 'Minor — repaired', 'Impact marks visible', 'Never inspected post-storm'] },
  { q: 'Attic temperature in summer?', opts: ['Under 120°F (well ventilated)', '120–140°F (marginal)', '140–160°F (poor ventilation)', 'Unknown'] },
  { q: 'Skylights or penetrations sealed?', opts: ['Yes — all sealed', 'Some — not all checked', 'Known seal failure', 'No skylights'] },
  { q: 'Drip edge installed?', opts: ['Yes — full perimeter', 'Partial', 'None visible', 'Unknown'] },
  { q: 'Evidence of moss or algae?', opts: ['None', 'Minor — treated', 'Moderate growth', 'Heavy — unchecked'] },
  { q: 'Last professional roof inspection?', opts: ['Within 2 years', '2–5 years ago', 'At purchase only', 'Never / unknown'] },
];

const weights = [
  [0, 4, 10, 20], [0, 2, 6, 12], [0, 3, 10, 18],
  [0, 4, 12, 15], [0, 3, 10, 8], [0, 2, 8, 18],
  [0, 2, 5, 12], [0, 2, 8, 18], [0, 3, 15, 25],
  [0, 3, 12, 10], [0, 2, 8, 15], [0, 2, 10, 0],
  [0, 3, 8, 5], [0, 2, 6, 12], [0, 3, 8, 14],
];

function grade(score: number) {
  if (score <= 12) return { letter: 'A', label: 'Excellent', color: '#22C55E' };
  if (score <= 30) return { letter: 'B', label: 'Good', color: '#86EFAC' };
  if (score <= 60) return { letter: 'C', label: 'Fair — Monitor Closely', color: '#F5E642' };
  if (score <= 95) return { letter: 'D', label: 'Poor — Replace Soon', color: '#F97316' };
  return { letter: 'F', label: 'Failing — Immediate Replacement', color: '#EF4444' };
}

function hailRating(a: number[]) {
  const hailScore = (a[1] === 2 || a[1] === 3 ? 3 : 0) + (a[9] === 2 ? 4 : a[9] === 3 ? 2 : 0) + (a[0] >= 2 ? 2 : 0);
  if (hailScore >= 7) return { label: 'High Hail Risk', color: '#EF4444', desc: 'DFW is in "Hail Alley" — non-impact-rated shingles on aging roof are high-claim territory' };
  if (hailScore >= 3) return { label: 'Moderate Hail Risk', color: '#F97316', desc: 'Consider Class 4 upgrade — DFW averages 4 significant hail events per year' };
  return { label: 'Low Hail Risk', color: '#22C55E', desc: 'Impact-resistant shingles and young roof reduce hail claim likelihood' };
}

function uvRating(a: number[]) {
  const uvScore = (a[10] >= 2 ? 3 : 0) + (a[4] >= 2 ? 2 : 0) + (a[5] >= 2 ? 2 : 0);
  if (uvScore >= 5) return { label: 'High UV Degradation', color: '#EF4444', desc: 'Poor ventilation trapping heat is accelerating shingle breakdown — DFW UV index 10–11 from May–Sept' };
  if (uvScore >= 2) return { label: 'Moderate UV Impact', color: '#F5E642', desc: 'Improve ventilation to reduce attic heat load and extend shingle life' };
  return { label: 'UV Well Managed', color: '#22C55E', desc: 'Good ventilation is protecting shingles from DFW heat degradation' };
}

export default function DFWRoofInspectionScore() {
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(-1));
  const [result, setResult] = useState<null | { score: number; grade: ReturnType<typeof grade>; hail: ReturnType<typeof hailRating>; uv: ReturnType<typeof uvRating>; priorities: string[] }>(null);

  function setAnswer(qi: number, ai: number) {
    const next = [...answers];
    next[qi] = ai;
    setAnswers(next);
  }

  function calculate() {
    if (answers.some(a => a === -1)) return;
    const score = answers.reduce((sum, ai, qi) => sum + weights[qi][ai], 0);
    const g = grade(score);
    const hail = hailRating(answers);
    const uv = uvRating(answers);
    const priorities: string[] = [];
    if (answers[8] >= 2) priorities.push('🚨 Roof sag indicates structural failure — do not delay, this is a safety issue');
    if (answers[2] === 3) priorities.push('🔴 Missing ridge cap — primary moisture entry point, replace immediately');
    if (answers[3] === 2) priorities.push('⚠️ Flashing gaps — seal before next storm. DFW spring storms guarantee water intrusion');
    if (answers[5] === 3) priorities.push('🔴 Bare mat visible — shingles at end of life, full replacement needed');
    if (answers[7] === 2) priorities.push('🪵 Active fascia rot — water is getting behind gutters, repair before mold spreads');
    if (answers[0] === 3 && answers[1] >= 2) priorities.push('📅 20+ year non-impact shingles — replacement overdue in DFW\’s hail environment');
    if (priorities.length === 0) priorities.push('✅ No critical issues found — maintain annual inspection schedule');
    setResult({ score, grade: g, hail, uv, priorities });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW ROOFING GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🏠 Roof Inspection Score</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>15-question DFW roof assessment — hail alley risk rating, UV degradation score, and priority actions.</p>

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
              <div style={{ color: '#94A3B8', marginTop: '0.25rem' }}>Risk Score: {result.score} / 199</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ background: '#1A3050', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: result.hail.color, fontWeight: 700, marginBottom: '0.4rem' }}>⛈️ {result.hail.label}</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{result.hail.desc}</div>
              </div>
              <div style={{ background: '#1A3050', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: result.uv.color, fontWeight: 700, marginBottom: '0.4rem' }}>☀️ {result.uv.label}</div>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{result.uv.desc}</div>
              </div>
            </div>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>Priority Actions</h3>
            {result.priorities.map((p, i) => <div key={i} style={{ background: '#1A3050', borderRadius: 8, padding: '0.75rem', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{p}</div>)}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Roof Inspection Score · Informational only — get a licensed roofer for official inspection and insurance claims</div>
      </div>
    </div>
  );
}
