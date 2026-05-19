import { useState } from 'react';

const questions = [
  { id: 'ac', text: 'AC system serviced this spring (filter changed, coils cleaned, refrigerant checked)?', weight: 12 },
  { id: 'ac_age', text: 'AC unit less than 10 years old or recently inspected by HVAC pro?', weight: 8 },
  { id: 'roof', text: 'Roof inspected after spring hail storms?', weight: 10 },
  { id: 'attic', text: 'Attic insulation R-38+ and no air leaks?', weight: 7 },
  { id: 'foundation', text: 'Foundation watering system set up and on schedule?', weight: 9 },
  { id: 'pest', text: 'Pest control service current (DFW termite season peaks in summer)?', weight: 6 },
  { id: 'pool', text: 'Pool chemicals balanced and equipment inspected (if applicable, skip if no pool)?', weight: 5 },
  { id: 'backup_power', text: 'Backup power plan in place (generator, battery, or agreement with neighbor)?', weight: 8 },
  { id: 'gutters', text: 'Gutters cleared and downspouts directed away from foundation?', weight: 6 },
  { id: 'outdoor_faucets', text: 'Outdoor faucets and irrigation system working properly?', weight: 5 },
  { id: 'windows', text: 'Windows and doors sealed — no drafts letting heat in?', weight: 6 },
  { id: 'smoke', text: 'Smoke and CO detectors tested and batteries replaced?', weight: 7 },
  { id: 'surge', text: 'Whole-home surge protector installed?', weight: 5 },
  { id: 'emergency', text: 'Emergency water and food supply stocked for 72-hour power outage?', weight: 6 },
  { id: 'contractors', text: 'At least one trusted HVAC and one trusted electrician saved in your contacts?', weight: 4 },
];

const totalWeight = questions.reduce((s, q) => s + q.weight, 0);

export default function DFWSummerReadinessScore2026() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string, val: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const answered = Object.keys(answers).length;
  const score = Math.round(
    (questions.reduce((s, q) => s + (answers[q.id] === true ? q.weight : 0), 0) / totalWeight) * 100
  );

  const scoreColor = score >= 80 ? '#22c55e' : score >= 55 ? '#F5E642′ : '#ef4444';
  const label = score >= 80 ? 'Summer Ready ☀️' : score >= 55 ? 'Needs Attention ⚠️' : 'At Risk 🔴';

  const priorities = questions
    .filter(q => answers[q.id] === false)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Summer Readiness Score 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>
            15 questions · DFW-specific · Takes ~3 minutes
          </p>
        </div>

        {questions.map((q, i) => (
          <div key={q.id} style={{ background: '#111f3a', borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
            <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {q.text}
              <span style={{ color: '#64748b', fontSize: 11, marginLeft: 6 }}>(weight {q.weight})</span>
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => toggle(q.id, v)} style={{
                  padding: '6px 18px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: answers[q.id] === v ? (v ? '#22c55e' : '#ef4444') : '#1e3a5f',
                  color: answers[q.id] === v ? '#fff' : '#94a3b8',
                }}>
                  {v ? '✅ Yes' : '❌ No'}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => setSubmitted(true)} disabled={answered < 15}
          style={{ width: '100%', marginTop: 20, padding: '14px', borderRadius: 10, border: 'none', cursor: answered < 15 ? 'not-allowed' : 'pointer',
            background: answered < 15 ? '#1e3a5f' : '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16 }}>
          {answered < 15 ? `Answer all questions (${answered}/15)` : 'Get My Summer Score'}
        </button>

        {submitted && (
          <div style={{ marginTop: 28, background: '#111f3a', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: scoreColor }}>{score}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: scoreColor, marginBottom: 8 }}>{label}</div>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: priorities.length ? 20 : 0 }}>
              DFW summers are brutal — your AC and foundation are everything.
            </p>
            {priorities.length > 0 && (
              <>
                <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>Top Priority Fixes</h3>
                {priorities.map(p => (
                  <div key={p.id} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, textAlign: 'left', fontSize: 13 }}>
                    🔧 {p.text}
                  </div>
                ))}
              </>
            )}
            <p style={{ color: '#F5E642', fontSize: 13, marginTop: 16 }}>ProLnk connects you to vetted DFW pros — no cold calls needed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
